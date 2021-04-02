import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, ValidationErrors, Validator } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { enableDisableControl } from './helpers/control.helpers';
import { InitFormOn } from './models/controls.model';

@Component({ template: '' })
export abstract class FormControlBaseComponent<
  TModel,
  TFormValues = { [key: string]: any; },
  TFormControls extends { [key: string]: AbstractControl } = Required<{ [key in keyof TFormValues]: AbstractControl }>>
  implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  private onChangeFn?: (_: any) => void;
  private onTouchedFn?: () => void;
  private onValidatorChangeFn?: () => void;
  private valueChangedSubscription?: Subscription;
  private statusChangedSubscription?: Subscription;
  private initFormOn: InitFormOn = 'initForm';
  private initFormFn?: () => FormGroup | TFormControls;
  private modelToFormFn?: (model: TModel) => Observable<TFormValues>;
  private formToModelFn?: (values: TFormValues) => Observable<TModel>;
  private statusChanged = false;


  public form: FormGroup = new FormGroup({});
  public get formC(): TFormControls { return this.form.controls as any; }
  public get formV(): TFormValues { return this.form.getRawValue(); }

  public get formInitialized(): boolean { return this.formInitialized$.value; }
  public formInitialized$ = new BehaviorSubject<boolean>(false);

  constructor(protected fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.initFormOn === 'ngOnInit') {
      this.doInitForm();
    }

    this.valueChangedSubscription = this.form.valueChanges.subscribe(values => this.formUpdated());
    this.statusChangedSubscription = this.form.statusChanges.subscribe(values => { this.statusChanged = true; this.ensureStatusUpdated(); });
  }

  ngOnDestroy(): void {
    this.valueChangedSubscription?.unsubscribe();
    this.statusChangedSubscription?.unsubscribe();
    this.formInitialized$?.unsubscribe();
  }

  writeValue(obj: any): void {
    if (this.modelToFormFn) {
      this.modelToFormFn(obj).subscribe(model => {
        if (model) {
          this.form.patchValue(model);
          this.form.markAsPristine();
          this.form.markAsUntouched();
          this.formInitialized$.next(true);
        }
      });
    } else {
      throw new Error('Control not initialized');
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.form.invalid ? { hasErrors: true } : null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChangeFn = fn;
  }

  protected initForm(
    initFormFn: () => FormGroup | TFormControls,
    modelToFormFn: (model: TModel) => Observable<TFormValues>,
    formToModelFn: (values: TFormValues) => Observable<TModel>,
    initFormOn: InitFormOn = 'initForm'
  ): void {
    if (initFormFn) {
      this.initFormOn = initFormOn;
      this.initFormFn = initFormFn;
      this.modelToFormFn = modelToFormFn;
      this.formToModelFn = formToModelFn;

      if (initFormOn === 'initForm') {
        this.doInitForm();
        this.statusChanged = true;
      }
    } else {
      throw new Error('Missing required functions');
    }
  }

  protected enableDisableControl(control: AbstractControl, enable: boolean, resetOnDisable = true, resetValue?: any): void {
    enableDisableControl(control, enable, resetOnDisable, resetValue);
  }

  protected ensureStatusUpdated(): void {
    if (this.onValidatorChangeFn && this.statusChanged) {
      this.onValidatorChangeFn();
      this.statusChanged = false;
    }
  }

  private doInitForm(): void {
    if (this.initFormFn) {
      const result = this.initFormFn();

      if (result instanceof FormGroup) {
        this.form = result;
      } else {
        this.form = new FormGroup(result);
      }
    } else {
      throw new Error('Control not initialized');
    }
  }

  private formUpdated(): void {
    if (this.formToModelFn) {
      this.formToModelFn(this.formV).subscribe(result => {
        if (this.onChangeFn) {
          this.onChangeFn(result);
        }

        if (this.onTouchedFn) {
          this.onTouchedFn();
        }
      });
    } else {
      throw new Error('Control not initialized');
    }
  }
}
