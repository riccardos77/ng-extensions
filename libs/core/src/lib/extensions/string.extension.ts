import * as moment from 'moment';

export { };

declare global {
  interface String {
    convertToDate(momentFormat: string): Date | undefined;
    convertToNumber(
      radix?: number,
      treatNanAsUndefined?: boolean
    ): number | undefined;
  }
}

// tslint:disable-next-line:space-before-function-paren
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

// tslint:disable-next-line:space-before-function-paren
String.prototype.convertToNumber = function (
  this: string,
  radix: number = 10,
  treatNanAsUndefined: boolean = true
): number | undefined {
  if (this !== undefined) {
    const result = parseInt(this, radix);
    if (isNaN(result) && treatNanAsUndefined) {
      return undefined;
    } else {
      return result;
    }
  } else {
    return undefined;
  }
};
