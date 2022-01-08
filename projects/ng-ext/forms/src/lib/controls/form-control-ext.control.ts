import { AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn } from '@angular/forms';
import { enableDisableControl, suspendResumeAsyncValidators, suspendResumeValidators } from './helpers/control.helpers';
import { ControlStateOptions, ControlValueOptions } from './models/controls.model';

export class FormControlExt<TValue> extends FormControl {
  private suspendedValidator: ValidatorFn | null = null;
  private suspendedAsyncValidator: AsyncValidatorFn | null = null;

  public get v(): TValue {
    return this.value;
  }

  constructor(
    formState: TValue,
    validatorOrOpts?:
      | ValidatorFn
      | ValidatorFn[]
      | AbstractControlOptions
      | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(formState, validatorOrOpts, asyncValidator);
  }

  public override setValue(
    value: TValue,
    options?: ControlValueOptions
  ): FormControlExt<TValue> {
    super.setValue(value, options);
    return this;
  }

  public override patchValue(
    value: TValue,
    options?: ControlValueOptions
  ): FormControlExt<TValue> {
    super.patchValue(value, options);
    return this;
  }

  public enableDisable(
    enable: boolean,
    resetOnDisable = true,
    resetValue?: TValue,
    options?: ControlStateOptions
  ): FormControlExt<TValue> {
    enableDisableControl(this, enable, resetOnDisable, resetValue, options);
    return this;
  }

  public suspendResumeValidators(
    suspend: boolean,
    enforceOnResume = true
  ): FormControlExt<TValue> {
    this.suspendedValidator = suspendResumeValidators(
      this,
      this.suspendedValidator,
      suspend,
      enforceOnResume
    );
    return this;
  }

  public suspendResumeAsyncValidators(
    suspend: boolean,
    enforceOnResume = true
  ): FormControlExt<TValue> {
    this.suspendedAsyncValidator = suspendResumeAsyncValidators(
      this,
      this.suspendedAsyncValidator,
      suspend,
      enforceOnResume
    );
    return this;
  }
}
