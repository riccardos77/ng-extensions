import moment from 'moment';
import { JsonReviverBuilder } from './json-reviver';

describe('json-reviver.class', () => {
  it('dateParser - from stringify', () => {
    expect.hasAssertions();

    const reviver = new JsonReviverBuilder().addDateParser().build();

    const input = { str: 's1', date: new Date() };
    const inputString = JSON.stringify(input);

    const result = JSON.parse(inputString, reviver) as DeserializedResult;

    expect(result.str).toBe(input.str);
    expect(moment(input.date).isSame(result.date)).toBe(true);
  });

  it('dateParser - dateOnly', () => {
    expect.hasAssertions();

    const inputDateString = '2022-01-31';

    const result1 = JSON.parse(
      `{ "date": "${inputDateString}" }`,
      new JsonReviverBuilder().addDateParser(true).build()
    ) as DeserializedResult;

    expect(result1.date instanceof Date).toBe(true);
    expect(moment(inputDateString).isSame(result1.date)).toBe(true);

    const result2 = JSON.parse(
      `{ "date": "${inputDateString}" }`,
      new JsonReviverBuilder().addDateParser(false).build()
    ) as DeserializedResult;

    expect(typeof result2.date).toBe('string');
    expect(result2.date).toBe(inputDateString);
  });

  it('custom function', () => {
    expect.hasAssertions();

    const inputDateString = '2022-01-31';

    const result1 = JSON.parse(
      `{ "str": "${inputDateString}", "date": "${inputDateString}" }`,
      new JsonReviverBuilder()
        .add((key: string, value: unknown) => (key === 'date' && typeof value === 'string' ? value.replace(/-/g, '/') : value))
        .build()
    ) as DeserializedResult2;

    expect(result1.date).toBe('2022/01/31');
    expect(result1.str).toBe(inputDateString);
  });
});

interface DeserializedResult {
  str?: string;
  date: Date;
}

interface DeserializedResult2 {
  str?: string;
  date: string;
}
