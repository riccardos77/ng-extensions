import moment from 'moment';
import { JsonReviverBuilder } from './json-reviver';

describe('json-reviver.class', () => {
  it('dateParser', () => {
    const reviver = new JsonReviverBuilder().addDateParser().build();

    const input = {
      str: 's1',
      date: new Date()
    };
    const result = JSON.parse(JSON.stringify(input), reviver);

    expect(result.str).toBe(input.str);
    expect(moment(input.date).isSame(result.date)).toBe(true);
  });
});
