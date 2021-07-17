import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[templateSelector]'
})
export class TemplateSelectorDirective {
  @Input('templateSelector') name?: string;

  constructor(public template: TemplateRef<any>) { }

  getType(): string {
    if (this.name) {
      return this.name;
    } else {
      throw new Error('Template not initialized');
    }
  }
}
