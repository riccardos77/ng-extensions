import { NumberFormatStyle, registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import './number.extension';

registerLocaleData(localeIt, 'it');

describe('number.extension', () => {
  it('convertToString - base', () => {
    const input = 1.12345;
    const result1 = input.formatToString(NumberFormatStyle.Currency, 'it', 'EUR');
    const result2 = input.formatToString(NumberFormatStyle.Decimal, 'it');

  });
});
