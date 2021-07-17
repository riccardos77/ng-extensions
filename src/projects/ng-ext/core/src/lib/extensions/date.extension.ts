import * as moment from 'moment';

export { };

declare global {
  interface Date {
    formatToString(momentFormat: string): string | undefined;
  }
}

// tslint:disable-next-line:space-before-function-paren
Date.prototype.formatToString = function (
  this: string,
  momentFormat: string
): string | undefined {
  if (this) {
    return moment(this).format(momentFormat);
  } else {
    return undefined;
  }
};
