import { evaluateSwitchCase, getSwitchCaseResultAsync, SwitchCaseEvaluator, SwitchCaseResultAsync } from './switch-common';

class SwitchExecutorAsync<TValue, TResult> implements SwitchCaseAsync<TValue, TResult>, SwitchDefaultCaseAsync<TResult> {
  private foundResultPromise?: Promise<TResult | undefined>;
  private caseFound = false;

  public constructor(private valueToEvaluate: TValue) {}

  public case(
    caseEvaluator: SwitchCaseEvaluator<TValue>,
    caseResult: SwitchCaseResultAsync<TValue, TResult>
  ): SwitchCaseAsync<TValue, TResult> {
    if (!this.caseFound && evaluateSwitchCase(caseEvaluator, this.valueToEvaluate)) {
      this.caseFound = true;
      this.foundResultPromise = getSwitchCaseResultAsync(caseResult, this.valueToEvaluate);
    }

    return this;
  }

  public caseTyped<TValue2 extends TValue>(
    typeEvaluator: (value: TValue) => value is TValue2,
    caseEvaluator: SwitchCaseEvaluator<TValue2>,
    caseResult: SwitchCaseResultAsync<TValue2, TResult>
  ): SwitchCaseAsync<TValue, TResult> {
    if (!this.caseFound && typeEvaluator(this.valueToEvaluate) && evaluateSwitchCase(caseEvaluator, this.valueToEvaluate)) {
      this.caseFound = true;
      this.foundResultPromise = getSwitchCaseResultAsync(caseResult, this.valueToEvaluate);
    }

    return this;
  }

  public default(caseResult: SwitchCaseResultAsync<TValue, TResult>): SwitchDefaultCaseAsync<TResult> {
    if (!this.caseFound) {
      this.foundResultPromise = getSwitchCaseResultAsync(caseResult, this.valueToEvaluate);
    }

    return this;
  }

  public executeAsync(): Promise<TResult>;
  public async executeAsync(): Promise<TResult | undefined> {
    return Promise.resolve(this.foundResultPromise);
  }
}

export class SwitchAsync<TValue> {
  private constructor(private valueToEvaluate: TValue) {}

  public static from<TValue>(value: TValue): SwitchAsync<TValue> {
    return new SwitchAsync(value);
  }

  public case<TResult>(
    caseEvaluator: SwitchCaseEvaluator<TValue>,
    caseResult: SwitchCaseResultAsync<TValue, TResult>
  ): SwitchCaseAsync<TValue, TResult> {
    return new SwitchExecutorAsync<TValue, TResult>(this.valueToEvaluate).case(caseEvaluator, caseResult);
  }

  public caseTyped<TValue2 extends TValue, TResult>(
    typeEvaluator: (value: TValue) => value is TValue2,
    caseEvaluator: SwitchCaseEvaluator<TValue2>,
    caseResult: SwitchCaseResultAsync<TValue2, TResult>
  ): SwitchCaseAsync<TValue, TResult> {
    return new SwitchExecutorAsync<TValue, TResult>(this.valueToEvaluate).caseTyped(typeEvaluator, caseEvaluator, caseResult);
  }
}

export interface SwitchCaseAsync<TValue, TResult> {
  case: (
    caseEvaluator: SwitchCaseEvaluator<TValue>,
    caseResult: SwitchCaseResultAsync<TValue, TResult>
  ) => SwitchCaseAsync<TValue, TResult>;

  caseTyped: <TValue2 extends TValue>(
    typeEvaluator: (value: TValue) => value is TValue2,
    caseEvaluator: SwitchCaseEvaluator<TValue2>,
    caseResult: SwitchCaseResultAsync<TValue2, TResult>
  ) => SwitchCaseAsync<TValue, TResult>;

  default: (caseResult: SwitchCaseResultAsync<TValue, TResult>) => SwitchDefaultCaseAsync<TResult>;

  executeAsync: () => Promise<TResult | undefined>;
}

export interface SwitchDefaultCaseAsync<TResult> {
  executeAsync: () => Promise<TResult>;
}
