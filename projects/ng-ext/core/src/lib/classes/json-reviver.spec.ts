import moment from 'moment';
import { JsonReviverBuilder } from './json-reviver';

describe('json-reviver.class', () => {
  it('dateParser - from stringify', () => {
    const reviver = new JsonReviverBuilder().addDateParser().build();

    const input = { str: 's1', date: new Date() };
    const inputString = JSON.stringify(input);

    const result = JSON.parse(inputString, reviver);

    expect(result.str).toBe(input.str);
    expect(moment(input.date).isSame(result.date)).toBe(true);
  });

  it('dateParser - dateOnly', () => {
    const inputDateString = "2022-01-31";

    const result1 = JSON.parse(`{ "date": "${inputDateString}" }`, new JsonReviverBuilder().addDateParser(true).build());

    expect(result1.date instanceof Date).toBe(true);
    expect(moment(inputDateString).isSame(result1.date)).toBe(true);


    const result2 = JSON.parse(`{ "date": "${inputDateString}" }`, new JsonReviverBuilder().addDateParser(false).build());

    expect(typeof result2.date === 'string').toBe(true);
    expect(result2.date).toBe(inputDateString);
  });
});
