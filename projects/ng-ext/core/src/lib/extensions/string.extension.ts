/* eslint-disable @typescript-eslint/method-signature-style */

import moment from 'moment';

export { };

declare global {
  interface String {
    convertToDate(momentFormat: string): Date | undefined;
    convertToNumber(format?: 'integer', treatNanAsUndefined?: boolean, strictCheck?: boolean, radix?: number): number | undefined;
    convertToNumber(format?: 'float', treatNanAsUndefined?: boolean): number | undefined;
  }
}

String.prototype.convertToDate = function (
  this: string,
  momentFormat: string
): Date | undefined {
  if (this) {
    return moment(this, momentFormat).toDate();
  } else {
    return undefined;
  }
};

String.prototype.convertToNumber = function (
  this: string,
  format: 'float' | 'integer' = 'integer',
  treatNanAsUndefined: boolean = true,
  strictCheck: boolean = true,
  radix: number = 10
): number | undefined {
  if (this !== undefined) {
    let result = NaN;

    if (format === 'integer') {
      if (!strictCheck || /^[-+]?\d+$/.test(this)) {
        result = parseInt(this, radix);
      }
    } else {
      result = parseFloat(this);
    }

    if (isNaN(result) && treatNanAsUndefined) {
      return undefined;
    } else {
      return result;
    }
  } else {
    return undefined;
  }


};
