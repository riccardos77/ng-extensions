/* eslint-disable @typescript-eslint/method-signature-style */
import { formatCurrency, formatNumber, formatPercent, NumberFormatStyle } from '@angular/common';

export {};

declare global {
  interface Number {
    formatToString(
      format: NumberFormatStyle.Currency,
      locale: string,
      currency: string,
      currencyCode?: string,
      digitsInfo?: string
    ): string | undefined;
    formatToString(
      format: NumberFormatStyle.Decimal | NumberFormatStyle.Percent | NumberFormatStyle.Scientific,
      locale: string,
      digitsInfo?: string
    ): string | undefined;
  }
}

Number.prototype.formatToString = function (
  this: number,
  format: NumberFormatStyle,
  locale: string,
  arg1?: string,
  arg2?: string,
  arg3?: string
): string | undefined {
  if (this) {
    switch (format) {
      case NumberFormatStyle.Decimal:
      case NumberFormatStyle.Scientific:
        return formatNumber(this, locale, arg1);
      case NumberFormatStyle.Percent:
        return formatPercent(this, locale, arg1);
      case NumberFormatStyle.Currency:
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return formatCurrency(this, locale, arg1!, arg2, arg3);
      default:
        throw new Error('invalid format');
    }
  } else {
    return undefined;
  }
};
