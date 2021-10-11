
export { };

declare global {
  interface Array<T> {
    convertToObject<TValue>(
      keyFunc: (item: T) => string,
      valueFunc: (item: T) => TValue,
      defaultValue?: { [key: string]: TValue }
    ): { [key: string]: TValue };

    merge(
      other: ArrayLike<T>,
      keySelector: keyof T | ((item: T) => unknown),
      action: 'keepExisting' | 'override' | 'mergeWithAssign' | ((original: T, other: T) => T)
    ): T[];
  }
}

Array.prototype.convertToObject = function <T, TValue>(
  this: Array<T>,
  keyFunc: (item: T) => string,
  valueFunc: (item: T) => TValue,
  defaultValue: { [key: string]: TValue } = {}
): { [key: string]: TValue } {
  if (this) {
    return this.reduce(
      (acc, item) => ({ ...acc, [keyFunc(item)]: valueFunc(item) }),
      {} as { [key: string]: TValue }
    );
  } else {
    return defaultValue;
  }
};

Array.prototype.merge = function <T>(
  this: Array<T>,
  otherArray: T[],
  keySelector: keyof T | ((item: T) => unknown),
  conflctAction: 'keepExisting' | 'override' | 'mergeWithAssign' | ((original: T, other: T) => T)
): T[] {
  if (this) {
    const keySelectorPredicate = typeof keySelector === 'function' ? keySelector : ((i: T) => i[keySelector]);

    const list1 = this.map(originalItem => {
      const originalItemKey = keySelectorPredicate(originalItem);
      const otherItem = otherArray.find(o => keySelectorPredicate(o) === originalItemKey);

      if (otherItem) {
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
