import { NumberFormatStyle, registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import './number.extension';

describe('number.extension', () => {
  it('convertToString - base', () => {
    expect.hasAssertions();

    registerLocaleData(localeIt, 'it');

    const input = 1.12345;

    expect(input.formatToString(NumberFormatStyle.Currency, 'it', 'EUR')).toBe('1,12 EUR');
    expect(input.formatToString(NumberFormatStyle.Decimal, 'it')).toBe('1,123');
  });
});
