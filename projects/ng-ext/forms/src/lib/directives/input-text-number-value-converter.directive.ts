import { NumberFormatStyle } from '@angular/common';
import { DEFAULT_CURRENCY_CODE, Directive, ElementRef, Inject, Input, LOCALE_ID, Renderer2 } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import '@ng-ext/core';
import { ControlValueConverterBaseDirective } from './control-value-converter-base.directive';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'input[type=text][numberConverter]',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: InputTextNumberValueConverterDirective, multi: true },
    { provide: NG_VALIDATORS, useExisting: InputTextNumberValueConverterDirective, multi: true },
  ],
})
export class InputTextNumberValueConverterDirective extends ControlValueConverterBaseDirective<string, number | undefined> {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('numberConverter') public digitsInfo?: string;
  @Input() public format?: NumberFormatStyle;
  @Input() public locale?: string;
  @Input() public currency?: string;

  public constructor(
    renderer: Renderer2,
    elementRef: ElementRef,
    @Inject(LOCALE_ID) private defaultLocale: string,
    @Inject(DEFAULT_CURRENCY_CODE) private defaultCurrencyCode: string
  ) {
    super(renderer, elementRef);
  }

  protected override controlToModel(control: string): number | undefined {
    // const format = this.format ?? NumberFormatStyle.Decimal;
    // const locale = this.locale ?? this.defaultLocale;
    // const a = getLocaleNumberFormat(locale, format);
    return control.convertToNumber();
  }

  protected override modelToControl(value: number | undefined): string {
    if (value !== undefined) {
      const format = this.format ?? NumberFormatStyle.Decimal;
      const locale = this.locale ?? this.defaultLocale;
      if (format === NumberFormatStyle.Currency) {
        return value.formatToString(format, locale, this.currency ?? this.defaultCurrencyCode, undefined, this.digitsInfo) ?? '';
      } else {
        return value.formatToString(format, locale, this.digitsInfo) ?? '';
      }
    } else {
      return '';
    }
  }

  protected override validateValue(value: string): ValidationErrors | null {
    if (!value) {
      return null;
    }

    return null; //moment(value, this.format, true).isValid() ? null : { invalid: true };
  }
}
