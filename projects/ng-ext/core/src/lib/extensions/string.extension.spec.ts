import './string.extension';

describe('string.extension', () => {
  it('convertToNumber - string with number', () => {
    const testedValue = '10';

    expect(testedValue.convertToNumber()).toBe(10);

    expect(testedValue.convertToNumber(10)).toBe(10);
    expect(testedValue.convertToNumber(10, true)).toBe(10);
    expect(testedValue.convertToNumber(10, false)).toBe(10);

    expect(testedValue.convertToNumber(16)).toBe(0x10);
    expect(testedValue.convertToNumber(16, true)).toBe(0x10);
    expect(testedValue.convertToNumber(16, false)).toBe(0x10);
  });

  it('convertToNumber - empty string', () => {
    const testedValue = '';

    expect(testedValue.convertToNumber()).toBe(undefined);
    expect(testedValue.convertToNumber(undefined, true)).toBe(undefined);
    expect(testedValue.convertToNumber(undefined, false)).toBe(NaN);
  });

  it('convertToNumber - ciao string', () => {
    const testedValue = 'ciao';

    expect(testedValue.convertToNumber()).toBe(undefined);
    expect(testedValue.convertToNumber(undefined, true)).toBe(undefined);
    expect(testedValue.convertToNumber(undefined, false)).toBe(NaN);
  });
});
