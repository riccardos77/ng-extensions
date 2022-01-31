import { AbstractControlOptions, AsyncValidatorFn, FormGroup, ValidatorFn } from '@angular/forms';
import { FormArrayExt } from './form-array-ext.control';
import { FormControlExt } from './form-control-ext.control';
import { enableDisableControl, suspendResumeAsyncValidators, suspendResumeValidators } from './helpers/control.helpers';
import { ControlStateOptions } from './models/controls.model';

export class FormGroupExt<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TGroupValues extends { [key in keyof TGroupValues]: any },
  TGroupControls extends { [key in keyof TGroupValues]: FormArrayExt<TGroupValues[key]> | FormControlExt<TGroupValues[key]> | FormGroupExt<TGroupValues[key]>; } = { [key in keyof TGroupValues]: FormControlExt<TGroupValues[key]> }> extends FormGroup {
  private suspendedValidator: ValidatorFn | null = null;
  private suspendedAsyncValidator: AsyncValidatorFn | null = null;

  public constructor(
    controls: TGroupControls,
    validatorOrOpts?: AbstractControlOptions | ValidatorFn | ValidatorFn[] | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(controls, validatorOrOpts, asyncValidator);
  }

  public get c(): TGroupControls {
    return this.controls as TGroupControls;
  }
  public get rv(): TGroupValues {
    return this.getRawValue() as TGroupValues;
  }
  public get v(): TGroupValues {
    return this.value as TGroupValues;
  }

  public override setValue(value: TGroupValues, options?: ControlStateOptions): this {
    super.setValue(value, options);
    return this;
  }

  public override patchValue(value: Partial<TGroupValues>, options?: ControlStateOptions): this {
    super.patchValue(value, options);
    return this;
  }

  public enableDisable(enable: boolean, resetOnDisable = true, resetValue?: Partial<TGroupValues>, options?: ControlStateOptions): this {
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
