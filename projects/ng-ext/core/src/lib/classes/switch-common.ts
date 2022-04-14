export type SwitchCaseEvaluator<TValue> = TValue | ((value: TValue) => boolean);
export type SwitchCaseResult<TValue, TResult> = TResult | ((value: TValue) => TResult);
export type SwitchCaseResultAsync<TValue, TResult> = Promise<TResult> | TResult | ((value: TValue) => Promise<TResult> | TResult);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isFunction(value: unknown): value is (...args: any[]) => any {
  return typeof value === 'function';
}

export function evaluateSwitchCase<TValue>(caseEvaluator: SwitchCaseEvaluator<TValue>, valueToEvaluate: TValue): boolean {
  if (isFunction(caseEvaluator)) {
    return caseEvaluator(valueToEvaluate);
  } else {
    return caseEvaluator === valueToEvaluate;
  }
}

export function getSwitchCaseResult<TValue, TResult>(
  caseResult: SwitchCaseResult<TValue, TResult>,
  valueToEvaluate: TValue
): TResult {
  if (isFunction(caseResult)) {
    return caseResult(valueToEvaluate);
  } else {
    return caseResult;
  }
}

export async function getSwitchCaseResultAsync<TValue, TResult>(
  caseResult: SwitchCaseResultAsync<TValue, TResult>,
  valueToEvaluate: TValue
): Promise<TResult> {
  if (isFunction(caseResult)) {
    return Promise.resolve(caseResult(valueToEvaluate));
  } else {
    return Promise.resolve(caseResult);
  }
}
