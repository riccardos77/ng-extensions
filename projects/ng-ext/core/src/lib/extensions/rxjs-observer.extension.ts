import { Subscriber } from 'rxjs';

export { };

declare module 'rxjs' {
  interface Subscriber<T> {
    nextAndComplete(value?: T): void;
  }
}

// tslint:disable-next-line:space-before-function-paren
Subscriber.prototype.nextAndComplete = function <T>(
  this: Subscriber<T>,
  value?: T
): void {
  if (this) {
    this.next(value);
    this.complete();
  }
};
