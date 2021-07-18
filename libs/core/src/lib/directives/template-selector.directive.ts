/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[templateSelector]',
})
export class TemplateSelectorDirective {
  @Input('templateSelector') public name?: string;

  constructor(public template: TemplateRef<any>) { }

  public getType(): string {
    if (this.name) {
      return this.name;
    } else {
      throw new Error('Template not initialized');
    }
  }
}
