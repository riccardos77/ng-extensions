/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[templateSelector]',
})
export class TemplateSelectorDirective<TTemplate = any> {
  @Input('templateSelector') public info?: TemplateDefinition<TTemplate>;

  public constructor(public template: TemplateRef<any>) {}

  public get name(): string {
    if (this.info?.name) {
      return this.info.name;
    } else {
      throw new Error('Template not defined');
    }
  }

  public static ngTemplateContextGuard<TTemplate>(dir: TemplateSelectorDirective<TTemplate>, ctx: unknown): ctx is TTemplate {
    return true;
  }
}

export interface TemplateDefinition<T = any> {
  name: string;
  context?: T;
  ref?: TemplateRef<any>;
}
