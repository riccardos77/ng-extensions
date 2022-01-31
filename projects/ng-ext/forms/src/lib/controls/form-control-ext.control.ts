import { AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn } from '@angular/forms';
import { enableDisableControl, suspendResumeAsyncValidators, suspendResumeValidators } from './helpers/control.helpers';
import { ControlStateOptions, ControlValueOptions } from './models/controls.model';

export class FormControlExt<TValue> extends FormControl {
  private suspendedValidator: ValidatorFn | null = null;
  private suspendedAsyncValidator: AsyncValidatorFn | null = null;

  public constructor(
    formState: TValue,
    validatorOrOpts?: AbstractControlOptions | ValidatorFn | ValidatorFn[] | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(formState, validatorOrOpts, asyncValidator);
  }

  public get v(): TValue {
    return this.value as TValue;
  }

  public override setValue(value: TValue, options?: ControlValueOptions): this {
    super.setValue(value, options);
    return this;
  }

  public override patchValue(value: TValue, options?: ControlValueOptions): this {
    super.patchValue(value, options);
    return this;
  }

  public enableDisable(enable: boolean, resetOnDisable = true, resetValue?: TValue, options?: ControlStateOptions): this {
    enableDisableControl(this, enable, resetOnDisable, resetValue, options);
    return this;
  }

  public suspendResumeValidators(suspend: boolean, enforceOnResume = true): this {
    this.suspendedValidator = suspendResumeValidators(this, this.suspendedValidator, suspend, enforceOnResume);
    return this;
  }

  public suspendResumeAsyncValidators(suspend: boolean, enforceOnResume = true): this {
    this.suspendedAsyncValidator = suspendResumeAsyncValidators(this, this.suspendedAsyncValidator, suspend, enforceOnResume);
    return this;
  }
}
