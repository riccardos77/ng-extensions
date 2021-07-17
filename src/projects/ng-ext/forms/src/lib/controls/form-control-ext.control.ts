import { AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn } from '@angular/forms';
import { enableDisableControl, suspendResumeAsyncValidators, suspendResumeValidators } from './helpers/control.helpers';
import { ControlStateOptions, ControlValueOptions } from './models/controls.model';


export class FormControlExt<TValue> extends FormControl {
  private suspendedValidator: ValidatorFn | null = null;
  private suspendedAsyncValidator: AsyncValidatorFn | null = null;

  public get v(): TValue { return this.value; }

  constructor(formState: TValue, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
    super(formState, validatorOrOpts, asyncValidator);
  }

  public setValue(value: TValue, options?: ControlValueOptions): void {
    super.setValue(value, options);
  }

  public patchValue(value: TValue, options?: ControlValueOptions): void {
    super.patchValue(value, options);
  }

  public enableDisable(enable: boolean, resetOnDisable = true, resetValue?: TValue, options?: ControlStateOptions): void {
    enableDisableControl(this, enable, resetOnDisable, resetValue, options);
  }

  public suspendResumeValidators(suspend: boolean, enforceOnResume = true): void {
    this.suspendedValidator = suspendResumeValidators(this, this.suspendedValidator, suspend, enforceOnResume);
  }

  public suspendResumeAsyncValidators(suspend: boolean, enforceOnResume = true): void {
    this.suspendedAsyncValidator = suspendResumeAsyncValidators(this, this.suspendedAsyncValidator, suspend, enforceOnResume);
  }
}
