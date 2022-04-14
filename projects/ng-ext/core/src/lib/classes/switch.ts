import { evaluateSwitchCase, getSwitchCaseResult, SwitchCaseEvaluator, SwitchCaseResult } from './switch-common';

class SwitchExecutor<TValue, TResult> implements SwitchCase<TValue, TResult>, SwitchDefaultCase<TResult> {
  private foundResult: TResult | undefined;
  private caseFound = false;

  public constructor(private valueToEvaluate: TValue) {}

  public case(
    caseEvaluator: SwitchCaseEvaluator<TValue>,
    caseResult: SwitchCaseResult<TValue, TResult>
  ): SwitchCase<TValue, TResult> {
    if (!this.caseFound && evaluateSwitchCase(caseEvaluator, this.valueToEvaluate)) {
      this.caseFound = true;
      this.foundResult = getSwitchCaseResult(caseResult, this.valueToEvaluate);
    }

    return this;
  }

  public caseTyped<TValue2 extends TValue>(
    typeEvaluator: (value: TValue) => value is TValue2,
    caseEvaluator: SwitchCaseEvaluator<TValue2>,
    caseResult: SwitchCaseResult<TValue2, TResult>
  ): SwitchCase<TValue, TResult> {
    if (!this.caseFound && typeEvaluator(this.valueToEvaluate) && evaluateSwitchCase(caseEvaluator, this.valueToEvaluate)) {
      this.caseFound = true;
      this.foundResult = getSwitchCaseResult(caseResult, this.valueToEvaluate);
    }

    return this;
  }

  public default(caseResult: SwitchCaseResult<TValue, TResult>): SwitchDefaultCase<TResult> {
    if (!this.caseFound) {
      this.foundResult = getSwitchCaseResult(caseResult, this.valueToEvaluate);
    }

    return this;
  }

  public execute(): TResult;
  public execute(): TResult | undefined {
    return this.foundResult;
  }
}

export class Switch<TValue> {
  private constructor(private valueToEvaluate: TValue) {}

  public static from<TValue>(value: TValue): Switch<TValue> {
    return new Switch(value);
  }

  public case<TResult>(
    caseEvaluator: SwitchCaseEvaluator<TValue>,
    caseResult: SwitchCaseResult<TValue, TResult>
  ): SwitchCase<TValue, TResult> {
    return new SwitchExecutor<TValue, TResult>(this.valueToEvaluate).case(caseEvaluator, caseResult);
  }

  public caseTyped<TValue2 extends TValue, TResult>(
    typeEvaluator: (value: TValue) => value is TValue2,
    caseEvaluator: SwitchCaseEvaluator<TValue2>,
    caseResult: SwitchCaseResult<TValue2, TResult>
  ): SwitchCase<TValue, TResult> {
    return new SwitchExecutor<TValue, TResult>(this.valueToEvaluate).caseTyped(typeEvaluator, caseEvaluator, caseResult);
  }
}

export interface SwitchCase<TValue, TResult> {
  case: (
    caseEvaluator: SwitchCaseEvaluator<TValue>,
    caseResult: SwitchCaseResult<TValue, TResult>
  ) => SwitchCase<TValue, TResult>;

  caseTyped: <TValue2 extends TValue>(
    typeEvaluator: (value: TValue) => value is TValue2,
    caseEvaluator: SwitchCaseEvaluator<TValue2>,
    caseResult: SwitchCaseResult<TValue2, TResult>
  ) => SwitchCase<TValue, TResult>;

  default: (caseResult: SwitchCaseResult<TValue, TResult>) => SwitchDefaultCase<TResult>;

  execute: () => TResult | undefined;
}

export interface SwitchDefaultCase<TResult> {
  execute: () => TResult;
}
