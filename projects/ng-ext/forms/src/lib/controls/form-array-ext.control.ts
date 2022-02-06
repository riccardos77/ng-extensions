import { AbstractControlOptions, AsyncValidatorFn, FormArray, ValidatorFn } from '@angular/forms';
import { FormControlExt } from './form-control-ext.control';
import { FormGroupExt } from './form-group-ext.control';
import { enableDisableControl, suspendResumeAsyncValidators, suspendResumeValidators } from './helpers/control.helpers';
import { ControlStateOptions, ControlValueOptions } from './models/controls.model';

type Unpacked<T> = T extends (infer U)[] ? U : T;

export class FormArrayExt<
  TValueArray extends TValue[],
  TValue = Unpacked<TValueArray>,
  TControl extends FormControlExt<TValue> | FormGroupExt<TValue> = FormControlExt<TValue>
> extends FormArray {
  private suspendedValidator: ValidatorFn | null = null;
  private suspendedAsyncValidator: AsyncValidatorFn | null = null;

  public constructor(
    controls: TControl[],
    validatorOrOpts?: AbstractControlOptions | ValidatorFn | ValidatorFn[] | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(controls, validatorOrOpts, asyncValidator);
  }

  public get c(): TControl[] {
    return this.controls as TControl[];
  }
  public get rv(): TValueArray {
    return this.getRawValue() as TValueArray;
  }
  public get v(): TValueArray {
    return this.value as TValueArray;
  }

  public override setValue(value: TValueArray, options?: ControlValueOptions): this {
    super.setValue(value, options);
    return this;
  }

  public override patchValue(value: TValueArray, options?: ControlValueOptions): this {
    super.patchValue(value, options);
    return this;
  }

  public override at(index: number): TControl {
    return super.at(index) as TControl;
  }

  public override push(control: TControl): this {
    super.push(control);
    return this;
  }

  public pushAll(control: TControl[]): this {
    control.forEach(c => this.push(c));
    return this;
  }

  public override insert(index: number, control: TControl): this {
    super.insert(index, control);
    return this;
  }

  public override setControl(index: number, control: TControl): this {
    super.setControl(index, control);
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
