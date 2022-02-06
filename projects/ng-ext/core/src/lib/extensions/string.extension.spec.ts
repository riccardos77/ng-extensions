import './string.extension';

describe('string.extension', () => {
  it('convertToNumber(integer) - string with number', () => {
    expect.hasAssertions();

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
    expect.hasAssertions();

    const testedValue = '';

    expect(testedValue.convertToNumber('integer', true, false, 10)).toBeUndefined();
    expect(testedValue.convertToNumber('integer', true, true, 10)).toBeUndefined();
    expect(testedValue.convertToNumber('integer', false, false, 10)).toBeNaN();
    expect(testedValue.convertToNumber('integer', false, true, 10)).toBeNaN();

    expect(testedValue.convertToNumber('integer', true, false, 16)).toBeUndefined();
    expect(testedValue.convertToNumber('integer', true, true, 16)).toBeUndefined();
    expect(testedValue.convertToNumber('integer', false, false, 16)).toBeNaN();
    expect(testedValue.convertToNumber('integer', false, true, 16)).toBeNaN();
  });

  it('convertToNumber(integer) - ciao string', () => {
    expect.hasAssertions();

    const testedValue = 'ciao';

    expect(testedValue.convertToNumber('integer', true, false, 10)).toBeUndefined();
    expect(testedValue.convertToNumber('integer', true, true, 10)).toBeUndefined();
    expect(testedValue.convertToNumber('integer', false, false, 10)).toBeNaN();
    expect(testedValue.convertToNumber('integer', false, true, 10)).toBeNaN();

    expect(testedValue.convertToNumber('integer', true, false, 16)).toBe(0xc);
    expect(testedValue.convertToNumber('integer', true, true, 16)).toBeUndefined();
    expect(testedValue.convertToNumber('integer', false, false, 16)).toBe(0xc);
    expect(testedValue.convertToNumber('integer', false, true, 16)).toBeNaN();
  });

  it('convertToNumber(integer) - 10a string', () => {
    expect.hasAssertions();

    const testedValue = '10a';

    expect(testedValue.convertToNumber('integer', true, false, 10)).toBe(10);
    expect(testedValue.convertToNumber('integer', true, true, 10)).toBeUndefined();
    expect(testedValue.convertToNumber('integer', false, false, 10)).toBe(10);
    expect(testedValue.convertToNumber('integer', false, true, 10)).toBeNaN();

    expect(testedValue.convertToNumber('integer', true, false, 16)).toBe(0x10a);
    expect(testedValue.convertToNumber('integer', true, true, 16)).toBeUndefined();
    expect(testedValue.convertToNumber('integer', false, false, 16)).toBe(0x10a);
    expect(testedValue.convertToNumber('integer', false, true, 16)).toBeNaN();
  });

  it('convertToNumber(float) - string with number', () => {
    expect.hasAssertions();

    expect('10'.convertToNumber('float', true)).toBe(10);
    expect('10'.convertToNumber('float', false)).toBe(10);

    expect('10.4'.convertToNumber('float', true)).toBe(10.4);
    expect('10.4'.convertToNumber('float', false)).toBe(10.4);

    expect('-10.4'.convertToNumber('float', true)).toBe(-10.4);
    expect('-10.4'.convertToNumber('float', false)).toBe(-10.4);
  });

  it('convertToNumber(float) - invalid strings', () => {
    expect.hasAssertions();

    expect(''.convertToNumber('float', true)).toBeUndefined();
    expect(''.convertToNumber('float', false)).toBeNaN();

    expect('abc'.convertToNumber('float', true)).toBeUndefined();
    expect('abc'.convertToNumber('float', false)).toBeNaN();
  });

  it('convertToNumber(float) - 10a', () => {
    expect.hasAssertions();

    expect('10a'.convertToNumber('float', true)).toBe(10);
    expect('10a'.convertToNumber('float', false)).toBe(10);
  });
});
