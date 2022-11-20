import { Injector } from '@angular/core';
import { ngCommonPipes } from '../pipes/ng-common-pipes';

const placeholderRegex = /{(?<group1>\w+)(?:\|(?<group2>\w*)[\|]{0,1}(?<group3>.*?))*}/g;

export function stringTemplateBinder<TBindingContext>(
  input: StringTemplate<TBindingContext>,
  bindingContext: TBindingContext | undefined,
  injector: Injector
): string {
  let currentTemplate = input.stringTemplate;
  const placeholderBindings = input.placeholderBindings;

  if (bindingContext !== undefined && placeholderBindings !== undefined) {
    [...input.stringTemplate.matchAll(placeholderRegex)].forEach(result => {
      const completeMatch = result[0];
      const placeholderName = result[1];
      const formatterPipe = result[2] as string | undefined;
      const formatterArgs = result[3] as string | undefined;

      let placeholderValue = placeholderBindings.find(p => p.name === placeholderName)?.value(bindingContext);

      if (formatterPipe) {
        placeholderValue = injector
          .get(ngCommonPipes[formatterPipe])
          .transform(placeholderValue, formatterArgs?.split('|')) as string;
      }

      const placeholderFinalValue = placeholderValue?.toString() ?? '';

      currentTemplate = currentTemplate.replace(completeMatch, placeholderFinalValue);
    });
  }

  return currentTemplate;
}

export interface StringTemplate<TBindingContext = undefined> {
  stringTemplate: string;
  placeholderBindings?: StringTemplatePlaceholderBinding<TBindingContext>[];
}

export interface StringTemplatePlaceholderBinding<TBindingContext> {
  name: string;
  value: (bindingContext: TBindingContext) => StringTemplatePlaceholderValue;
}

export type StringTemplatePlaceholderValue = Date | bigint | boolean | number | string | null | undefined;
