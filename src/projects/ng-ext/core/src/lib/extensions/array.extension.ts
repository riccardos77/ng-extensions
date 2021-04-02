export { };

declare global {
  interface Array<T> {
    toObject<TValue>(
      keyFunc: (item: T) => string,
      valueFunc: (item: T) => TValue,
      defaultValue?: { [key: string]: TValue }
    ): { [key: string]: TValue };
  }
}

Array.prototype.toObject = function <T, TValue>(
  this: Array<T>,
  keyFunc: (item: T) => string,
  valueFunc: (item: T) => TValue,
  defaultValue: { [key: string]: TValue; } = {}
): { [key: string]: TValue; } {
  if (this) {
    return this.reduce(
      (acc, item) => ({ ...acc, [keyFunc(item)]: valueFunc(item) }),
      {} as { [key: string]: TValue; });
  } else {
    return defaultValue;
  }
};
