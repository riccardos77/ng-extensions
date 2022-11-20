export {};

declare global {
  interface Array<T> {
    convertToObject: <TValue>(
      keyFunc: (item: T) => number | string,
      valueFunc: (item: T) => TValue,
      defaultValue?: Record<number | string, TValue>
    ) => Record<number | string, TValue>;

    merge: (
      other: T[],
      keySelector: keyof T | ((item: T) => unknown),
      action: 'keepExisting' | 'mergeWithAssign' | 'override' | ((original: T, other: T) => T)
    ) => T[];

    single: (predicate: (value: T, index: number, obj: T[]) => unknown) => T;
  }
}

Array.prototype.convertToObject = function <T, TValue>(
  this: T[],
  keyFunc: (item: T) => number | string,
  valueFunc: (item: T) => TValue,
  defaultValue: Record<number | string, TValue> = {}
): Record<number | string, TValue> {
  if (this !== undefined) {
    return this.reduce<Record<string, TValue>>((acc, item) => ({ ...acc, [keyFunc(item)]: valueFunc(item) }), {});
  } else {
    return defaultValue;
  }
};

Array.prototype.merge = function <T>(
  this: T[],
  otherArray: T[],
  keySelector: keyof T | ((item: T) => unknown),
  conflctAction: 'keepExisting' | 'mergeWithAssign' | 'override' | ((original: T, other: T) => T)
): T[] {
  if (this !== undefined) {
    const keySelectorPredicate = typeof keySelector === 'function' ? keySelector : (i: T): unknown => i[keySelector];

    const list1 = this.map(originalItem => {
      const originalItemKey = keySelectorPredicate(originalItem);
      const otherItem = otherArray.find(o => keySelectorPredicate(o) === originalItemKey);

      if (otherItem !== undefined) {
        switch (conflctAction) {
          case 'keepExisting':
            return originalItem;
          case 'override':
            return otherItem;
          case 'mergeWithAssign':
            return Object.assign({}, originalItem, otherItem);
          default:
            return conflctAction(originalItem, otherItem);
        }
      } else {
        return originalItem;
      }
    });

    const list2 = otherArray.filter(o => !list1.some(l => keySelectorPredicate(l) === keySelectorPredicate(o)));

    return [...list1, ...list2];
  } else {
    return otherArray;
  }
};

Array.prototype.single = function <T>(this: T[], predicate: (value: T, index: number, obj: T[]) => unknown): T {
  if (this !== undefined) {
    const results = this.filter(predicate);
    if (results.length === 1) {
      return results[0];
    } else {
      throw new Error('predicate must match exactly one item');
    }
  } else {
    throw new Error('this is undefined');
  }
};
