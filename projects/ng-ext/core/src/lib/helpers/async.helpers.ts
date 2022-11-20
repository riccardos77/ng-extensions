/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { firstValueFrom, from, isObservable, Observable, of } from 'rxjs';

export function isPromise<T>(obj: any): obj is Promise<T> {
  // allow any Promise/A+ compliant thenable.
  // It's up to the caller to ensure that obj.then conforms to the spec
  return !!obj && typeof obj.then === 'function';
}

export function wrapIntoObservable<T>(value: Observable<T> | Promise<T> | T): Observable<T> {
  if (isObservable(value)) {
    return value;
  }

  if (isPromise<T>(value)) {
    return from(Promise.resolve(value));
  }

  return of(value);
}

export function wrapIntoPromise<T>(value: Observable<T> | Promise<T> | T): Promise<T> {
  if (isPromise<T>(value)) {
    return value;
  }

  if (isObservable(value)) {
    return firstValueFrom(value);
  }

  return Promise.resolve(value);
}
