import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import '@ng-ext/core';
import moment from 'moment';
import { ControlValueConverterBaseDirective } from './control-value-converter-base.directive';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'input[type=text][dateConverter]',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: InputTextDateValueConverterDirective, multi: true },
    { provide: NG_VALIDATORS, useExisting: InputTextDateValueConverterDirective, multi: true },
  ],
})
export class InputTextDateValueConverterDirective extends ControlValueConverterBaseDirective<string, Date | undefined> {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('dateConverter') public format?: string;

  protected override controlToModel(control: string): Date | undefined {
    if (this.format) {
      return control.convertToDate(this.format);
    } else {
      throw new Error('Format not specified');
    }
  }

  protected override modelToControl(value: Date | undefined): string {
    if (value) {
      if (this.format) {
        return value.formatToString(this.format) ?? '';
      } else {
        throw new Error('Format not specified');
      }
    } else {
      return '';
    }
  }

  protected override validateValue(value: string): ValidationErrors | null {
    if (!value) {
      return null;
    }

    return moment(value, this.format, true).isValid() ? null : { invalid: true };
  }
}
