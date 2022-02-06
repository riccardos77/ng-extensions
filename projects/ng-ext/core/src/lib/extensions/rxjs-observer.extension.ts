import { Subscriber } from 'rxjs';

export {};

declare module 'rxjs' {
  interface Subscriber<T> {
    nextAndComplete: (value?: T) => void;
  }
}

Subscriber.prototype.nextAndComplete = function <T>(this: Subscriber<T>, value?: T): void {
  if (this !== undefined) {
    this.next(value);
    this.complete();
  }
};
