import { SwitchAsync } from './switch-async';

function promiseTimeout<T>(resolvedValue: T): Promise<T> {
  return new Promise(resolve =>
    setTimeout(() => resolve(resolvedValue), 1000)
  );
}

describe('SwitchAsync.class', () => {
  it('case match', async () => {
    const result = await SwitchAsync.from(10)
      .case(i => i % 2 === 0, i => promiseTimeout(`${i} è pari`))
      .executeAsync();

    expect(result).toBe('10 è pari');
  });

  it('case result can use async', async () => {
    const result = await SwitchAsync.from(10)
      .case(i => i % 2 === 0, async i => await promiseTimeout(`${i} è pari`))
      .executeAsync();

    expect(result).toBe('10 è pari');
  });

  it('case result can also be a non Promise', async () => {
    const result = await SwitchAsync.from(1)
      .case(i => i === 1, i => 'uno')
      .case(i => i === 1, i => 'uno bis')
      .executeAsync();

    expect(result).toBe('uno');
  });

  it('stop after first match', async () => {
    const result = await SwitchAsync.from(1)
      .case(i => i === 1, async i => await promiseTimeout('uno'))
      .case(i => i === 1, _ => { throw new Error('This must not be evaluated '); })
      .executeAsync();

    expect(result).toBe('uno');
  });

  it('default must be ignored when case found', async () => {
    const result = await SwitchAsync.from(1)
      .case(i => i === 1, i => 'uno')
      .default(i => 'due')
      .executeAsync();

    expect(result).toBe('uno');
  });

  it('no match without default', async () => {
    const result = await SwitchAsync.from(2)
      .case(i => i === 1, async i => await promiseTimeout('uno'))
      .executeAsync();

    expect(result).toBe(undefined);
  });

  it('no match with default', async () => {
    const result = await SwitchAsync.from(2)
      .case(i => i === 1, async i => await promiseTimeout('uno'))
      .default(async i => await promiseTimeout('def'))
      .executeAsync();

    expect(result).toBe('def');
  });

  it('case with type guard in first case', async () => {
    const a: TestType1 = { stringValue: 'abc', numberValue: 123 } as TestType2;
    const result = await SwitchAsync.from(a)
      .caseTyped((o): o is TestType2 => 'numberValue' in o, o => o.numberValue === 123, async o => await promiseTimeout('o is TestType2 and numberValue is 123'))
      .case(o => o.stringValue === '1', async i => await promiseTimeout('uno'))
      .executeAsync();

    expect(result).toBe('o is TestType2 and numberValue is 123');
  });

  it('case with type guard in other cases', async () => {
    const a: TestType1 = { stringValue: 'abc', numberValue: 123 } as TestType2;
    const result = await SwitchAsync.from(a)
      .case(o => o.stringValue === '1', async i => await promiseTimeout('uno'))
      .caseTyped((o): o is TestType2 => 'numberValue' in o, o => o.numberValue === 123, async o => await promiseTimeout('o is TestType2 and numberValue is 123'))
      .executeAsync();

    expect(result).toBe('o is TestType2 and numberValue is 123');
  });

});

interface TestType1 {
  stringValue: string;
}

interface TestType2 extends TestType1 {
  numberValue: number;
}
