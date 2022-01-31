
class SwitchExecutorAsync<TValue, TResult> implements SwitchCaseAsync<TValue, TResult>, SwitchDefaultCaseAsync<TResult> {
  private foundResultPromise?: Promise<TResult | undefined>;

  public constructor(private valueToEvaluate: TValue) { }

  public case(
    caseEvaluator: (value: TValue) => boolean,
    caseResult: (value: TValue) => Promise<TResult> | TResult
  ): SwitchCaseAsync<TValue, TResult> {
    if (!this.foundResultPromise && caseEvaluator(this.valueToEvaluate)) {
      this.foundResultPromise = Promise.resolve(caseResult(this.valueToEvaluate));
    }

    return this;
  }

  public caseTyped<TValue2 extends TValue>(
    typeEvaluator: (value: TValue) => value is TValue2,
    caseEvaluator: (value: TValue2) => boolean,
    caseResult: (value: TValue2) => Promise<TResult> | TResult
  ): SwitchCaseAsync<TValue, TResult> {
    if (!this.foundResultPromise && typeEvaluator(this.valueToEvaluate) && caseEvaluator(this.valueToEvaluate)) {
      this.foundResultPromise = Promise.resolve(caseResult(this.valueToEvaluate));
    }

    return this;
  }

  public default(caseResult: (value: TValue) => Promise<TResult> | TResult): SwitchDefaultCaseAsync<TResult> {
    if (!this.foundResultPromise) {
      this.foundResultPromise = Promise.resolve(caseResult(this.valueToEvaluate));
    }

    return this;
  }

  public executeAsync(): Promise<TResult>;
  public async executeAsync(): Promise<TResult | undefined> {
    return Promise.resolve(this.foundResultPromise);
  }
}

export class SwitchAsync<TValue> {

  private constructor(private valueToEvaluate: TValue) {
  }

  public static from<TValue>(value: TValue): SwitchAsync<TValue> {
    return new SwitchAsync(value);
  }

  public case<TResult>(
    caseEvaluator: (value: TValue) => boolean,
    caseResult: (value: TValue) => Promise<TResult> | TResult
  ): SwitchCaseAsync<TValue, TResult> {
    return new SwitchExecutorAsync<TValue, TResult>(this.valueToEvaluate).case(caseEvaluator, caseResult);
  }

  public caseTyped<TValue2 extends TValue, TResult>(
    typeEvaluator: (value: TValue) => value is TValue2,
    caseEvaluator: (value: TValue2) => boolean,
    caseResult: (value: TValue2) => Promise<TResult> | TResult
  ): SwitchCaseAsync<TValue, TResult> {
    return new SwitchExecutorAsync<TValue, TResult>(this.valueToEvaluate).caseTyped(typeEvaluator, caseEvaluator, caseResult);
  }
}

export interface SwitchCaseAsync<TValue, TResult> {
  case: (caseEvaluator: (value: TValue) => boolean, caseResult: (value: TValue) => Promise<TResult> | TResult) => SwitchCaseAsync<TValue, TResult>;

  caseTyped: <TValue2 extends TValue>(
    typeEvaluator: (value: TValue) => value is TValue2,
    caseEvaluator: (value: TValue2) => boolean,
    caseResult: (value: TValue2) => Promise<TResult> | TResult
  ) => SwitchCaseAsync<TValue, TResult>;

  default: (caseResult: (value: TValue) => Promise<TResult> | TResult) => SwitchDefaultCaseAsync<TResult>;

  executeAsync: () => Promise<TResult | undefined>;
}

export interface SwitchDefaultCaseAsync<TResult> {
  executeAsync: () => Promise<TResult>;
}
