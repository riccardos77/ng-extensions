import './string.extension';

describe('string.extension', () => {
  it('convertToNumber(integer) - string with number', () => {
    const testedValue = '10';

    expect(testedValue.convertToNumber()).toBe(10);

    expect(testedValue.convertToNumber('integer', true, false, 10)).toBe(10);
    expect(testedValue.convertToNumber('integer', true, true, 10)).toBe(10);
    expect(testedValue.convertToNumber('integer', false, false, 10)).toBe(10);
    expect(testedValue.convertToNumber('integer', false, true, 10)).toBe(10);

    expect(testedValue.convertToNumber('integer', true, false, 16)).toBe(0x10);
    expect(testedValue.convertToNumber('integer', true, true, 16)).toBe(0x10);
    expect(testedValue.convertToNumber('integer', false, false, 16)).toBe(0x10);
    expect(testedValue.convertToNumber('integer', false, true, 16)).toBe(0x10);
  });

  it('convertToNumber(integer) - empty string', () => {
    const testedValue = '';

    expect(testedValue.convertToNumber('integer', true, false, 10)).toBe(undefined);
    expect(testedValue.convertToNumber('integer', true, true, 10)).toBe(undefined);
    expect(testedValue.convertToNumber('integer', false, false, 10)).toBe(NaN);
    expect(testedValue.convertToNumber('integer', false, true, 10)).toBe(NaN);

    expect(testedValue.convertToNumber('integer', true, false, 16)).toBe(undefined);
    expect(testedValue.convertToNumber('integer', true, true, 16)).toBe(undefined);
    expect(testedValue.convertToNumber('integer', false, false, 16)).toBe(NaN);
    expect(testedValue.convertToNumber('integer', false, true, 16)).toBe(NaN);
  });

  it('convertToNumber(integer) - ciao string', () => {
    const testedValue = 'ciao';

    expect(testedValue.convertToNumber('integer', true, false, 10)).toBe(undefined);
    expect(testedValue.convertToNumber('integer', true, true, 10)).toBe(undefined);
    expect(testedValue.convertToNumber('integer', false, false, 10)).toBe(NaN);
    expect(testedValue.convertToNumber('integer', false, true, 10)).toBe(NaN);

    expect(testedValue.convertToNumber('integer', true, false, 16)).toBe(0xc);
    expect(testedValue.convertToNumber('integer', true, true, 16)).toBe(undefined);
    expect(testedValue.convertToNumber('integer', false, false, 16)).toBe(0xc);
    expect(testedValue.convertToNumber('integer', false, true, 16)).toBe(NaN);
  });

  it('convertToNumber(integer) - 10a string', () => {
    const testedValue = '10a';

    expect(testedValue.convertToNumber('integer', true, false, 10)).toBe(10);
    expect(testedValue.convertToNumber('integer', true, true, 10)).toBe(undefined);
    expect(testedValue.convertToNumber('integer', false, false, 10)).toBe(10);
    expect(testedValue.convertToNumber('integer', false, true, 10)).toBe(NaN);

    expect(testedValue.convertToNumber('integer', true, false, 16)).toBe(0x10a);
    expect(testedValue.convertToNumber('integer', true, true, 16)).toBe(undefined);
    expect(testedValue.convertToNumber('integer', false, false, 16)).toBe(0x10a);
    expect(testedValue.convertToNumber('integer', false, true, 16)).toBe(NaN);
  });

  it('convertToNumber(float) - string with number', () => {
    expect('10'.convertToNumber('float', true)).toBe(10);
    expect('10'.convertToNumber('float', false)).toBe(10);

    expect('10.4'.convertToNumber('float', true)).toBe(10.4);
    expect('10.4'.convertToNumber('float', false)).toBe(10.4);

    expect('-10.4'.convertToNumber('float', true)).toBe(-10.4);
    expect('-10.4'.convertToNumber('float', false)).toBe(-10.4);
  });

  it('convertToNumber(float) - invalid strings', () => {
    expect(''.convertToNumber('float', true)).toBe(undefined);
    expect(''.convertToNumber('float', false)).toBe(NaN);

    expect('abc'.convertToNumber('float', true)).toBe(undefined);
    expect('abc'.convertToNumber('float', false)).toBe(NaN);
  });

  it('convertToNumber(float) - 10a', () => {
    expect('10a'.convertToNumber('float', true)).toBe(10);
    expect('10a'.convertToNumber('float', false)).toBe(10);
  });
});
