/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractControlOptions, AsyncValidatorFn, FormGroup, ValidatorFn } from '@angular/forms';
import { FormArrayExt } from './form-array-ext.control';
import { FormControlExt } from './form-control-ext.control';
import { enableDisableControl, suspendResumeAsyncValidators, suspendResumeValidators } from './helpers/control.helpers';
import { ControlStateOptions } from './models/controls.model';

export class FormGroupExt<
  TGroupValues extends { [key: string]: any },
  TGroupControls extends {
    [key in keyof TGroupValues]:
    | FormControlExt<TGroupValues[key]>
    | FormGroupExt<TGroupValues[key]>
    | FormArrayExt<TGroupValues[key]>;
  } = { [key in keyof TGroupValues]: FormControlExt<TGroupValues[key]> }
  > extends FormGroup {
  private suspendedValidator: ValidatorFn | null = null;
  private suspendedAsyncValidator: AsyncValidatorFn | null = null;

  public get c(): TGroupControls {
    return this.controls as any;
  }
  public get rv(): TGroupValues {
    return this.getRawValue();
  }
  public get v(): TGroupValues {
    return this.value;
  }

  constructor(
    controls: TGroupControls,
    validatorOrOpts?:
      | ValidatorFn
      | ValidatorFn[]
      | AbstractControlOptions
      | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(controls, validatorOrOpts, asyncValidator);
  }

  public override setValue(
    value: TGroupValues,
    options?: ControlStateOptions
  ): FormGroupExt<TGroupValues, TGroupControls> {
    super.setValue(value, options);
    return this;
  }

  public override patchValue(
    value: Partial<TGroupValues>,
    options?: ControlStateOptions
  ): FormGroupExt<TGroupValues, TGroupControls> {
    super.patchValue(value, options);
    return this;
  }

  public enableDisable(
    enable: boolean,
    resetOnDisable = true,
    resetValue?: Partial<TGroupValues>,
    options?: ControlStateOptions
  ): FormGroupExt<TGroupValues, TGroupControls> {
    enableDisableControl(this, enable, resetOnDisable, resetValue, options);
    return this;
  }

  public suspendResumeValidators(
    suspend: boolean,
    enforceOnResume = true
  ): FormGroupExt<TGroupValues, TGroupControls> {
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
  ): FormGroupExt<TGroupValues, TGroupControls> {
    this.suspendedAsyncValidator = suspendResumeAsyncValidators(
      this,
      this.suspendedAsyncValidator,
      suspend,
      enforceOnResume
    );
    return this;
  }
}
