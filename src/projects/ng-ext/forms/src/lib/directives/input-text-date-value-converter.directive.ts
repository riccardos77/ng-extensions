import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import '@ng-ext/core';
import { ControlValueConverterBaseDirective } from './control-value-converter-base.directive';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'input[type=text][dateConverter]',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputTextDateValueConverterDirective), multi: true }
  ]
})
export class InputTextDateValueConverterDirective extends ControlValueConverterBaseDirective<string, Date | undefined> {
  // tslint:disable-next-line:no-input-rename
  @Input('dateConverter') format?: string;

  protected controlToModel(control: string): Date | undefined {
    if (this.format) {
      return control.convertToDate(this.format);
    } else {
      throw new Error('Format not specified');
    }
  }

  protected modelToControl(value: Date | undefined): string {
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
}
