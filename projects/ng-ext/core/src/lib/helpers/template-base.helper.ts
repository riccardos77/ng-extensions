import { QueryList, TemplateRef } from '@angular/core';
import { TemplateDefinition, TemplateSelectorDirective } from '../directives/template-selector.directive';

export function templateAfterContentInit(templateSelectors: QueryList<TemplateSelectorDirective<any>> | undefined, templates: { [key: string]: TemplateDefinition<any> | null }): void {
  templateSelectors?.forEach((item) => {
    const name = item.name;
    if (name) {
      const template = templates[name];
      if (template) {
        template.ref = item.template;
      }
    }
  });
}

export function getTemplateRef<T>(def: TemplateDefinition<T> | undefined, fallbackTemplateRef?: TemplateRef<any>): TemplateRef<any> | null {
  return def?.ref ?? fallbackTemplateRef ?? null;
}

export function getTemplateContext<T>(def: TemplateDefinition<T> | undefined): T | null {
  return def?.context ?? null;
}
