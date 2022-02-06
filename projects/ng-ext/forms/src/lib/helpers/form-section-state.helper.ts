import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { enableDisableControl } from '../controls/helpers/control.helpers';

export type FormSectionState =
  | 'enabledOptional'
  | 'enabledRequired'
  | 'hiddenValueAllowed'
  | 'hiddenValueForbidden'
  | 'readOnlyValueAllowed'
  | 'readOnlyValueForbidden';

export const formSectionStates = {
  enabledRequired: 'enabledRequired' as FormSectionState,
  enabledOptional: 'enabledOptional' as FormSectionState,
  readOnlyValueAllowed: 'readOnlyValueAllowed' as FormSectionState,
  readOnlyValueForbidden: 'readOnlyValueForbidden' as FormSectionState,
  hiddenValueAllowed: 'hiddenValueAllowed' as FormSectionState,
  hiddenValueForbidden: 'hiddenValueForbidden' as FormSectionState,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export function manageSectionControls(
  controls: AbstractControl[],
  sectionState: FormSectionState,
  additionalValidators: ValidatorFn[] = [],
  resetValue?: unknown
): void {
  controls.forEach(c => {
    switch (sectionState) {
      case formSectionStates.enabledRequired:
        enableDisableControl(c, true, false);
        c.setValidators([...additionalValidators, Validators.required]);
        break;
      case formSectionStates.enabledOptional:
        enableDisableControl(c, true, false);
        c.setValidators(additionalValidators);
        break;
      case formSectionStates.hiddenValueAllowed:
      case formSectionStates.readOnlyValueAllowed:
        enableDisableControl(c, false, false);
        c.clearValidators();
        break;
      case formSectionStates.hiddenValueForbidden:
      case formSectionStates.readOnlyValueForbidden:
        enableDisableControl(c, false, true, resetValue);
        c.clearValidators();
        break;
    }

    c.updateValueAndValidity();
  });
}

export function isSectionEnabled(section: FormSectionState): boolean {
  return section === formSectionStates.enabledRequired || section === formSectionStates.enabledOptional;
}

export function isSectionVisible(section: FormSectionState): boolean {
  return section !== formSectionStates.hiddenValueAllowed && section !== formSectionStates.hiddenValueForbidden;
}

export function isSectionValueAllowed(section: FormSectionState): boolean {
  return (
    section === formSectionStates.enabledRequired ||
    section === formSectionStates.enabledOptional ||
    section === formSectionStates.hiddenValueAllowed
  );
}
