import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, ValidationErrors, Validator } from '@angular/forms';
import { wrapIntoObservable, wrapIntoPromise } from '@ng-ext/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FormArrayExt } from './form-array-ext.control';
import { FormControlExt } from './form-control-ext.control';
import { FormGroupExt } from './form-group-ext.control';
import { enableDisableControl } from './helpers/control.helpers';
import { FormControlBaseComponentConfig } from './models/controls.model';

// eslint-disable-next-line @angular-eslint/use-component-selector
@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class FormControlBaseComponent<
  TModel,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TFormValues extends { [key in keyof TFormValues]: any },
  TFormControls extends {
    [key in keyof TFormValues]:
      | FormArrayExt<TFormValues[key]>
      | FormControlExt<TFormValues[key]>
      | FormGroupExt<TFormValues[key]>;
  }
> implements OnInit, OnDestroy, ControlValueAccessor, Validator
{
  public formInitialized$ = new BehaviorSubject<boolean>(false);

  private configuration: FormControlBaseComponentConfig = { initFormOn: 'ctor', notifyChangesMode: 'automatic' };
  private onChangeFn?: (_: unknown) => void;
  private onTouchedFn?: () => void;
  private onValidatorChangeFn?: () => void;
  private valueChangedSubscription?: Subscription;
  private statusChangedSubscription?: Subscription;
  private _form?: FormGroupExt<TFormValues, TFormControls>;

  public constructor() {
    this.configure(this.configuration);
    if (this.configuration.initFormOn === 'ctor') {
      this.doInitForm();
    }
  }

  public get form(): FormGroupExt<TFormValues, TFormControls> {
    if (this._form) {
      return this._form;
    } else {
      throw new Error('Control not initialized');
    }
  }

  public get formInitialized(): boolean {
    return this.formInitialized$.value;
  }

  public ngOnInit(): void {
    if (this.configuration.initFormOn === 'ngOnInit') {
      this.doInitForm();
    }
  }

  public ngOnDestroy(): void {
    this.valueChangedSubscription?.unsubscribe();
    this.statusChangedSubscription?.unsubscribe();
    this.formInitialized$.unsubscribe();
  }

  public writeValue(obj: unknown): void {
    const value = obj as TModel;
    const modelToForm$ = wrapIntoObservable(this.modelToForm(value));
    modelToForm$.subscribe(model => {
      this.form.patchValue(model);
      this.form.markAsPristine();
      this.form.markAsUntouched();

      if (!this.formInitialized && !this.formInitialized$.isStopped) {
        this.formInitialized$.next(true);
      }
    });
  }

  public registerOnChange(fn: (_: unknown) => void): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public validate(control: AbstractControl): ValidationErrors | null {
    return this.form.invalid ? { hasErrors: true } : null;
  }

  public registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChangeFn = fn;
  }

  public enableDisableControl(control: AbstractControl, enable: boolean, resetOnDisable = true, resetValue?: unknown): void {
    enableDisableControl(control, enable, resetOnDisable, resetValue);
  }

  public async notifyChangesAsync(): Promise<void> {
    await this.formValueChangedAsync();
    this.formStatusChanged();
  }

  public notifyChanges(): void {
    this.formValueChangedAsync().then(_ => {
      this.formStatusChanged();
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  protected configure(config: FormControlBaseComponentConfig): void {}

  private doInitForm(): void {
    const initFormResult = this.initForm();

    if (initFormResult instanceof FormGroupExt) {
      this._form = initFormResult;
    } else {
      this._form = new FormGroupExt<TFormValues, TFormControls>(initFormResult);
    }

    if (this.configuration.notifyChangesMode === 'automatic') {
      this.valueChangedSubscription = this.form.valueChanges.subscribe(() => {
        this.formValueChangedAsync();
      });

      this.statusChangedSubscription = this.form.statusChanges.subscribe(() => {
        this.formStatusChanged();
      });
    }
  }

  private async formValueChangedAsync(): Promise<void> {
    const result = await wrapIntoPromise(this.formToModel(this.form.rv));
    if (this.onChangeFn) {
      this.onChangeFn(result);
    }

    if (this.onTouchedFn) {
      this.onTouchedFn();
    }
  }

  private formStatusChanged(): void {
    if (this.onValidatorChangeFn) {
      this.onValidatorChangeFn();
    }
  }

  protected abstract initForm(): FormGroupExt<TFormValues, TFormControls> | TFormControls;
  protected abstract modelToForm(model: TModel): Observable<TFormValues> | Promise<TFormValues> | TFormValues;
  protected abstract formToModel(values: TFormValues): Observable<TModel> | Promise<TModel> | TModel;
}
