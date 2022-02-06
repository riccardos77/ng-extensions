import { QueryList, TemplateRef } from '@angular/core';
import { TemplateDefinition, TemplateSelectorDirective } from '../directives/template-selector.directive';

export function templateAfterContentInit(
  templateSelectors: QueryList<TemplateSelectorDirective> | undefined,
  templates: Record<string, TemplateDefinition | null>
): void {
  templateSelectors?.forEach(item => {
    const name = item.name;
    if (name) {
      const template = templates[name];
      if (template) {
        template.ref = item.template;
      }
    }
  });
}

export function getTemplateRef<T>(
  def: TemplateDefinition<T> | undefined,
  fallbackTemplateRef?: TemplateRef<unknown>
): TemplateRef<unknown> | null {
  return def?.ref ?? fallbackTemplateRef ?? null;
}

export function getTemplateContext<T>(def: TemplateDefinition<T> | undefined): T | null {
  return def?.context ?? null;
}

export function hasTemplateRef<T>(def: TemplateDefinition<T> | undefined): boolean {
  return !!def?.ref ?? false;
}
