import { Switch } from './switch';

describe('switch.class', () => {
  it('case match', () => {
    const result = Switch.from(10)
      .case(i => i === 1, i => 'uno')
      .case(i => i % 2 === 0, i => `${i} è pari`)
      .execute();

    expect(result).toBe('10 è pari');
  });

  it('stop after first match', () => {
    const result = Switch.from(1)
      .case(i => i === 1, i => 'uno')
      .case(i => i === 1, i => 'uno bis')
      .execute();

    expect(result).toBe('uno');
  });

  it('default must be ignored when case found', () => {
    const result = Switch.from(1)
      .case(i => i === 1, i => 'uno')
      .default(i => 'due')
      .execute();

    expect(result).toBe('uno');
  });

  it('no match without default', () => {
    const result = Switch.from(2)
      .case(i => i === 1, i => 'uno')
      .execute();

    expect(result).toBe(undefined);
  });

  it('no match with default', () => {
    const result = Switch.from(2)
      .case(i => i === 1, i => 'uno')
      .default(i => 'def')
      .execute();

    expect(result).toBe('def');
  });

  it('case returns null as result', () => {
    const result = Switch.from(1)
      .case<string | null>(i => i === 1, i => null)
      .default(i => 'def')
      .execute();

    expect(result).toBeNull();
  });

  it('case with type guard in first case', () => {
    const a: TestType1 = { stringValue: 'abc', numberValue: 123 } as TestType2;
    const result = Switch.from(a)
      .caseTyped((o): o is TestType2 => 'numberValue' in o, o => o.numberValue === 123, o => 'o is TestType2 and numberValue is 123')
      .case(o => o.stringValue === 'a', o => 'a')
      .execute();

    expect(result).toBe('o is TestType2 and numberValue is 123');
  });

  it('case with type guard in other cases', () => {
    const a: TestType1 = { stringValue: 'abc', numberValue: 123 } as TestType2;
    const result = Switch.from(a)
      .case(o => o.stringValue === '1', i => 'uno')
      .caseTyped((o): o is TestType2 => 'numberValue' in o, o => o.numberValue === 123, o => 'o is TestType2 and numberValue is 123')
      .execute();

    expect(result).toBe('o is TestType2 and numberValue is 123');
  });

});

interface TestType1 {
  stringValue: string;
}

interface TestType2 extends TestType1 {
  numberValue: number;
}
