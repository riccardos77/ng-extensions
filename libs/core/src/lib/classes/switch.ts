export class Switch<TValue> {

  private constructor(private valueToEvaluate: TValue) {
  }

  public static from<TValue>(value: TValue): Switch<TValue> {
    return new Switch(value);
  }

  public case<TResult>(caseEvaluator: (value: TValue) => boolean, caseResult: (value: TValue) => TResult): SwitchCase<TValue, TResult> {
    return new SwitchExecutor<TValue, TResult>(this.valueToEvaluate).case(caseEvaluator, caseResult);
  }

  public caseTyped<TValue2 extends TValue, TResult>(typeEvaluator: (value: TValue) => value is TValue2, caseEvaluator: (value: TValue2) => boolean, caseResult: (value: TValue2) => TResult): SwitchCase<TValue, TResult> {
    return new SwitchExecutor<TValue, TResult>(this.valueToEvaluate).caseTyped(typeEvaluator, caseEvaluator, caseResult);
  }
}

class SwitchExecutor<TValue, TResult> implements SwitchCase<TValue, TResult>, SwitchDefaultCase<TResult> {
  private foundResult: TResult | undefined;

  constructor(private valueToEvaluate: TValue) {
  }

  case(caseEvaluator: (value: TValue) => boolean, caseResult: (value: TValue) => TResult): SwitchCase<TValue, TResult> {
    if (!this.foundResult && caseEvaluator(this.valueToEvaluate)) {
      this.foundResult = caseResult(this.valueToEvaluate);
    }

    return this;
  }

  caseTyped<TValue2 extends TValue>(typeEvaluator: (value: TValue) => value is TValue2, caseEvaluator: (value: TValue2) => boolean, caseResult: (value: TValue2) => TResult): SwitchCase<TValue, TResult> {
    if (!this.foundResult && typeEvaluator(this.valueToEvaluate) && caseEvaluator(this.valueToEvaluate)) {
      this.foundResult = caseResult(this.valueToEvaluate);
    }

    return this;
  }

  default(caseResult: (value: TValue) => TResult): SwitchDefaultCase<TResult> {
    if (!this.foundResult) {
      this.foundResult = caseResult(this.valueToEvaluate);
    }

    return this;
  }

  execute(): TResult
  execute(): TResult | undefined {
    return this.foundResult;
  }
}

export interface SwitchCase<TValue, TResult> {
  case(caseEvaluator: (value: TValue) => boolean, caseResult: (value: TValue) => TResult): SwitchCase<TValue, TResult>;
  caseTyped<TValue2 extends TValue>(typeEvaluator: (value: TValue) => value is TValue2, caseEvaluator: (value: TValue2) => boolean, caseResult: (value: TValue2) => TResult): SwitchCase<TValue, TResult>;

  default(caseResult: (value: TValue) => TResult): SwitchDefaultCase<TResult>;

  execute(): TResult | undefined;
}

export interface SwitchDefaultCase<TResult> {
  execute(): TResult;
}
