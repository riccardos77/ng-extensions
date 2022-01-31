/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractControl, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { ControlStateOptions } from '../models/controls.model';

export function enableDisableControl(
  control: AbstractControl,
  enable: boolean,
  resetOnDisable = true,
  resetValue?: unknown,
  opts?: ControlStateOptions
): void {
  if (enable) {
    if (!control.enabled) {
      control.enable(opts);
    }
  } else {
    if (resetOnDisable) {
      control.reset(resetValue, opts);
    }

    if (!control.disabled) {
      control.disable(opts);
    }
  }
}

export function suspendResumeValidators(
  control: AbstractControl,
  suspendedValidator: ValidatorFn | null,
  suspend: boolean,
  enforceOnResume = true
): ValidatorFn | null {
  if (suspend) {
    if (control.validator) {
      const newSuspendedValidator = control.validator;
      control.validator = null;
      return newSuspendedValidator;
    }
  } else {
    if (suspendedValidator && !control.validator) {
      control.validator = suspendedValidator;

      if (enforceOnResume) {
        control.updateValueAndValidity();
      }
    }
  }

  return null;
}

export function suspendResumeAsyncValidators(
  control: AbstractControl,
  suspendedValidator: AsyncValidatorFn | null,
  suspend: boolean,
  enforceOnResume = true
): AsyncValidatorFn | null {
  if (suspend) {
    if (control.asyncValidator) {
      const newSuspendedValidator = control.asyncValidator;
      control.validator = null;
      return newSuspendedValidator;
    }
  } else {
    if (suspendedValidator && !control.asyncValidator) {
      control.asyncValidator = suspendedValidator;

      if (enforceOnResume) {
        control.updateValueAndValidity();
      }
    }
  }

  return null;
}
