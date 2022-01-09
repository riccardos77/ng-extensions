import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { enableDisableControl } from '../controls/helpers/control.helpers';

export type FormSectionState = 'enabledRequired' | 'enabledOptional' | 'readOnlyValueAllowed' | 'readOnlyValueForbidden' | 'hiddenValueAllowed' | 'hiddenValueForbidden';

export const FormSectionStates = {
  enabledRequired: 'enabledRequired' as FormSectionState,
  enabledOptional: 'enabledOptional' as FormSectionState,
  readOnlyValueAllowed: 'readOnlyValueAllowed' as FormSectionState,
  readOnlyValueForbidden: 'readOnlyValueForbidden' as FormSectionState,
  hiddenValueAllowed: 'hiddenValueAllowed' as FormSectionState,
  hiddenValueForbidden: 'hiddenValueForbidden' as FormSectionState
};

export function manageSectionControls(controls: AbstractControl[], sectionState: FormSectionState, additionalValidators: ValidatorFn[] = []): void {
  controls.forEach(c => {
    switch (sectionState) {
      case FormSectionStates.enabledRequired:
        enableDisableControl(c, true, false);
        c.setValidators([...additionalValidators, Validators.required]);
        break;
      case FormSectionStates.enabledOptional:
        enableDisableControl(c, true, false);
        c.setValidators(additionalValidators);
        break;
      case FormSectionStates.hiddenValueAllowed:
      case FormSectionStates.readOnlyValueAllowed:
        enableDisableControl(c, false, false);
        c.clearValidators();
        break;
      case FormSectionStates.hiddenValueForbidden:
      case FormSectionStates.readOnlyValueForbidden:
        enableDisableControl(c, false, true);
        c.clearValidators();
        break;
    }

    c.updateValueAndValidity();
  });
}

export function isSectionEnabled(section: FormSectionState): boolean {
  return section === FormSectionStates.enabledRequired || section === FormSectionStates.enabledOptional;
}

export function isSectionVisible(section: FormSectionState): boolean {
  return section !== FormSectionStates.hiddenValueAllowed && section !== FormSectionStates.hiddenValueForbidden;
}

export function isSectionValueAllowed(section: FormSectionState): boolean {
  return section === FormSectionStates.enabledRequired || section === FormSectionStates.enabledOptional || section === FormSectionStates.hiddenValueAllowed;
}
