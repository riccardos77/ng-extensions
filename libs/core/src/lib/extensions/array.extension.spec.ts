import './array.extension';

describe('array.extension', () => {
  it('convertToObject - number array', () => {
    const input = [1, 2, 3];
    const result = input.convertToObject(n => `k${n}`, n => n * 2);

    expect(result).toStrictEqual({ k1: 2, k2: 4, k3: 6 });
  });

  it('convertToObject - object array', () => {
    const input = [
      { id: 1, value: 'a' },
      { id: 2, value: 'b' },
      { id: 3, value: 'c' }
    ];
    const result = input.convertToObject(a => `k${a.id}${a.value}`, a => a);

    expect(result).toStrictEqual({ k1a: { id: 1, value: 'a' }, k2b: { id: 2, value: 'b' }, k3c: { id: 3, value: 'c' } });
  });
});
