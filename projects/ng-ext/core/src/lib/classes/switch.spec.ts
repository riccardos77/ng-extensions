import { Switch } from './switch';

describe('switch.class', () => {
  it('case match', () => {
    expect.hasAssertions();

    const result = Switch.from(10)
      .case(
        i => i === 1,
        () => 'uno'
      )
      .case(
        i => i % 2 === 0,
        i => `${i} è pari`
      )
      .execute();
    expect(result).toBe('10 è pari');
  });

  it('stop after first match', () => {
    expect.hasAssertions();

    const result1 = Switch.from(1)
      .case(
        i => i === 1,
        () => 'uno'
      )
      .case(
        i => i === 1,
        () => 'uno bis'
      )
      .execute();
    expect(result1).toBe('uno');

    const result2 = Switch.from(1).case(1, 'uno').case(1, 'uno bis').execute();
    expect(result2).toBe('uno');
  });

  it('default must be ignored when case found', () => {
    expect.hasAssertions();

    const result1 = Switch.from(1)
      .case(
        i => i === 1,
        () => 'uno'
      )
      .default(() => 'due')
      .execute();
    expect(result1).toBe('uno');

    const result2 = Switch.from(1).case(1, 'uno').default('due').execute();
    expect(result2).toBe('uno');
  });

  it('no match without default', () => {
    expect.hasAssertions();

    const result1 = Switch.from(2)
      .case(
        i => i === 1,
        () => 'uno'
      )
      .execute();
    expect(result1).toBeUndefined();

    const result2 = Switch.from(2).case(1, 'uno').execute();
    expect(result2).toBeUndefined();
  });

  it('no match with default', () => {
    expect.hasAssertions();

    const result1 = Switch.from(2)
      .case(
        i => i === 1,
        () => 'uno'
      )
      .default(() => 'def')
      .execute();
    expect(result1).toBe('def');

    const result2 = Switch.from(2).case(1, 'uno').default('def').execute();
    expect(result2).toBe('def');
  });

  it('case returns null as result', () => {
    expect.hasAssertions();

    const result1 = Switch.from(1)
      .case<string | null>(
        i => i === 1,
        () => null
      )
      .default(() => 'def')
      .execute();
    expect(result1).toBeNull();

    const result2 = Switch.from(1).case<string | null>(1, null).default('def').execute();
    expect(result2).toBeNull();
  });

  it('case with type guard in first case', () => {
    expect.hasAssertions();

    const a: TestType1 = { stringValue: 'abc', numberValue: 123 } as TestType2;

    const result1 = Switch.from(a)
      .caseTyped(
        (o): o is TestType2 => 'numberValue' in o,
        o => o.numberValue === 123,
        () => 'o is TestType2 and numberValue is 123'
      )
      .case(
        o => o.stringValue === 'a',
        () => 'a'
      )
      .execute();
    expect(result1).toBe('o is TestType2 and numberValue is 123');

    const result2 = Switch.from(a)
      .caseTyped(
        (o): o is TestType2 => 'numberValue' in o,
        o => o.numberValue === 123,
        'o is TestType2 and numberValue is 123'
      )
      .case(o => o.stringValue === 'a', 'a')
      .execute();
    expect(result2).toBe('o is TestType2 and numberValue is 123');
  });

  it('case with type guard in other cases', () => {
    expect.hasAssertions();

    const a: TestType1 = { stringValue: 'abc', numberValue: 123 } as TestType2;

    const result1 = Switch.from(a)
      .case(
        o => o.stringValue === '1',
        () => 'uno'
      )
      .caseTyped(
        (o): o is TestType2 => 'numberValue' in o,
        o => o.numberValue === 123,
        () => 'o is TestType2 and numberValue is 123'
      )
      .execute();
    expect(result1).toBe('o is TestType2 and numberValue is 123');

    const result2 = Switch.from(a)
      .case(o => o.stringValue === '1', 'uno')
      .caseTyped(
        (o): o is TestType2 => 'numberValue' in o,
        o => o.numberValue === 123,
        'o is TestType2 and numberValue is 123'
      )
      .execute();
    expect(result2).toBe('o is TestType2 and numberValue is 123');
  });
});

interface TestType1 {
  stringValue: string;
}

interface TestType2 extends TestType1 {
  numberValue: number;
}
