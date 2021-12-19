import moment from 'moment';

export class JsonReviverBuilder {
  private reviverPipeline: JsonReviverFunction[] = [];

  public addDateParser(): JsonReviverBuilder {
    const dateParserFn: JsonReviverFunction = (k, v) => {
      if (typeof v === 'string') {
        let m = moment(v, 'YYYY-MM-DDTHH:mm:ssZ', true);
        if (m.isValid()) {
          return m.toDate();
        } else {
          m = moment(v, 'YYYY-MM-DDTHH:mm:ss.SSSSZ', true);
          if (m.isValid()) {
            return m.toDate();
          }
        }
      }

      return v;
    };

    this.reviverPipeline.push(dateParserFn);
    return this;
  }

  public build(): JsonReviverFunction {
    return (k, v) => {
      if (this.reviverPipeline.length > 0) {
        return this.reviverPipeline.reduce(
          (prev, pipelineFn) => pipelineFn(k, prev),
          v);
      } else {
        return v;
      }
    };
  }
}

export type JsonReviverFunction = (key: string, value: unknown) => unknown;
