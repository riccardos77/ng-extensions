import './array.extension';

describe('array.extension', () => {
  it('convertToObject - number array with string key', () => {
    const input = [1, 2, 3];
    const result = input.convertToObject(n => `k${n}`, n => n * 2);

    expect(result).toStrictEqual({ k1: 2, k2: 4, k3: 6 });
  });

  it('convertToObject - number array with number key', () => {
    const input = [1, 2, 3];
    const result = input.convertToObject(n => n, n => n * 2);

    expect(result).toStrictEqual({ 1: 2, 2: 4, 3: 6 });
  });

  it('convertToObject - object array with string key', () => {
    const input = [
      { id: 1, value: 'a' },
      { id: 2, value: 'b' },
      { id: 3, value: 'c' }
    ];
    const result = input.convertToObject(a => `k${a.id}${a.value}`, a => a);

    expect(result).toStrictEqual({ k1a: { id: 1, value: 'a' }, k2b: { id: 2, value: 'b' }, k3c: { id: 3, value: 'c' } });
  });

  it('convertToObject - object array with number key', () => {
    const input = [
      { id: 1, value: 'a' },
      { id: 2, value: 'b' },
      { id: 3, value: 'c' }
    ];
    const result = input.convertToObject(a => a.id, a => a);

    expect(result).toStrictEqual({ 1: { id: 1, value: 'a' }, 2: { id: 2, value: 'b' }, 3: { id: 3, value: 'c' } });
  });

  it('merge - override', () => {
    const input1: MergeInput[] = [
      { id: 1, value: 'a' },
      { id: 2, value: 'b', otherProp: 'zz' }
    ];

    const input2: MergeInput[] = [
      { id: 2, value: 'b1', otherProp: 'yy' },
      { id: 3, value: 'c' }
    ];

    const expectedResult: MergeInput[] = [
      { id: 1, value: 'a' },
      { id: 2, value: 'b1', otherProp: 'yy' },
      { id: 3, value: 'c' }
    ];

    expect(input1.merge(input2, 'id', 'override')).toStrictEqual(expectedResult);
    expect(input1.merge(input2, a => a.id, 'override')).toStrictEqual(expectedResult);
  });

  it('merge - keepExisting', () => {
    const input1: MergeInput[] = [
      { id: 1, value: 'a' },
      { id: 2, value: 'b', otherProp: 'zz' }
    ];

    const input2: MergeInput[] = [
      { id: 2, value: 'b1', otherProp: 'yy' },
      { id: 3, value: 'c' }
    ];

    const expectedResult: MergeInput[] = [
      { id: 1, value: 'a' },
      { id: 2, value: 'b', otherProp: 'zz' },
      { id: 3, value: 'c' }
    ];

    expect(input1.merge(input2, 'id', 'keepExisting')).toStrictEqual(expectedResult);
    expect(input1.merge(input2, a => a.id, 'keepExisting')).toStrictEqual(expectedResult);
  });

  it('merge - mergeWithAssign', () => {
    const input1: MergeInput[] = [
      { id: 1, value: 'a' },
      { id: 2, value: 'b', otherProp: 'zz' }
    ];

    const input2: MergeInput[] = [
      { id: 2, value: 'b1' },
      { id: 3, value: 'c' }
    ];

    const expectedResult: MergeInput[] = [
      { id: 1, value: 'a' },
      { id: 2, value: 'b1', otherProp: 'zz' },
      { id: 3, value: 'c' }
    ];

    expect(input1.merge(input2, 'id', 'mergeWithAssign')).toStrictEqual(expectedResult);
    expect(input1.merge(input2, a => a.id, 'mergeWithAssign')).toStrictEqual(expectedResult);
  });

  it('merge - custom', () => {
    const input1: MergeInput[] = [
      { id: 1, value: 'a' },
      { id: 2, value: 'b', otherProp: 'zz' }
    ];

    const input2: MergeInput[] = [
      { id: 2, value: 'b1', otherProp: 'yy' },
      { id: 3, value: 'c' }
    ];

    const expectedResult: MergeInput[] = [
      { id: 1, value: 'a' },
      { id: 2, value: 'b1', otherProp: 'zz_yy' },
      { id: 3, value: 'c' }
    ];

    const conflictFn = (i: MergeInput, o: MergeInput): MergeInput => ({ id: i.id, value: o.value, otherProp: `${i.otherProp ?? ''}_${o.otherProp ?? ''}` } as MergeInput);
    expect(input1.merge(input2, 'id', conflictFn)).toStrictEqual(expectedResult);
    expect(input1.merge(input2, a => a.id, conflictFn)).toStrictEqual(expectedResult);
  });
});

interface MergeInput {
  id: number;
  value: string;
  otherProp?: string;
}
