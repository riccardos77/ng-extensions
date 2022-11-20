import moment from 'moment';

export class JsonReviverBuilder {
  private reviverPipeline: JsonReviverFunction[] = [];

  public add(reviverFunction: JsonReviverFunction): this {
    this.reviverPipeline.push(reviverFunction);
    return this;
  }

  public addDateParser(includeDateOnly: boolean = false): this {
    const dateParserFn: JsonReviverFunction = (k, v) => {
      if (typeof v === 'string') {
        const formats = ['YYYY-MM-DDTHH:mm:ssZ', 'YYYY-MM-DDTHH:mm:ss.SSSSZ'];
        if (includeDateOnly) {
          formats.push('YYYY-MM-DD');
        }

        for (const format of formats) {
          const m = moment(v, format, true);
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
        return this.reviverPipeline.reduce((prev, pipelineFn) => pipelineFn(k, prev), v);
      } else {
        return v;
      }
    };
  }
}

export type JsonReviverFunction = (key: string, value: unknown) => unknown;
