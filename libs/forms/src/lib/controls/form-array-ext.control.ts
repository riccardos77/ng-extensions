import { AbstractControlOptions, AsyncValidatorFn, FormArray, ValidatorFn } from '@angular/forms';
import { FormControlExt } from './form-control-ext.control';
import { FormGroupExt } from './form-group-ext.control';
import { enableDisableControl, suspendResumeAsyncValidators, suspendResumeValidators } from './helpers/control.helpers';
import { ControlStateOptions, ControlValueOptions } from './models/controls.model';

type Unpacked<T> = T extends (infer U)[] ? U : T;

export class FormArrayExt<
  TValueArray extends Array<TValue>,
  TValue = Unpacked<TValueArray>,
  TControl extends
  | FormControlExt<TValue>
  | FormGroupExt<TValue> = FormControlExt<TValue>
  > extends FormArray {
  private suspendedValidator: ValidatorFn | null = null;
  private suspendedAsyncValidator: AsyncValidatorFn | null = null;

  public get c(): TControl[] {
    return this.controls as TControl[];
  }
  public get rv(): TValueArray {
    return this.getRawValue() as TValueArray;
  }
  public get v(): TValueArray {
    return this.value;
  }

  constructor(
    controls: TControl[],
    validatorOrOpts?:
      | ValidatorFn
      | ValidatorFn[]
      | AbstractControlOptions
      | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(controls, validatorOrOpts, asyncValidator);
  }

  public setValue(value: TValueArray, options?: ControlValueOptions): void {
    super.setValue(value, options);
  }

  public patchValue(value: TValueArray, options?: ControlValueOptions): void {
    super.patchValue(value, options);
  }

  public at(index: number): TControl {
    return super.at(index) as TControl;
  }

  public push(control: TControl): void {
    super.push(control);
  }

  public insert(index: number, control: TControl): void {
    super.insert(index, control);
  }

  public setControl(index: number, control: TControl): void {
    super.setControl(index, control);
  }

  public enableDisable(
    enable: boolean,
    resetOnDisable = true,
    resetValue?: TValue,
    options?: ControlStateOptions
  ): void {
    enableDisableControl(this, enable, resetOnDisable, resetValue, options);
  }

  public suspendResumeValidators(
    suspend: boolean,
    enforceOnResume = true
  ): void {
    this.suspendedValidator = suspendResumeValidators(
      this,
      this.suspendedValidator,
      suspend,
      enforceOnResume
    );
  }

  public suspendResumeAsyncValidators(
    suspend: boolean,
    enforceOnResume = true
  ): void {
    this.suspendedAsyncValidator = suspendResumeAsyncValidators(
      this,
      this.suspendedAsyncValidator,
      suspend,
      enforceOnResume
    );
  }
}
