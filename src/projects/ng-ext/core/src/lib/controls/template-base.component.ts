import { AfterContentInit, Component, ContentChildren, QueryList, TemplateRef } from '@angular/core';
import { TemplateSelectorDirective } from '../directives/template-selector.directive';

@Component({ template: '' })
export abstract class TemplateBaseComponent<
  TTemplateNames extends string,
  TTemplateRefs extends { [key: string]: TemplateRef<any> | null } = { [key in TTemplateNames]: TemplateRef<any> | null }
  > implements AfterContentInit {

  @ContentChildren(TemplateSelectorDirective) public templates?: QueryList<TemplateSelectorDirective>;

  public templateRefs: TTemplateRefs = {} as TTemplateRefs;

  ngAfterContentInit(): void {
    this.templates?.forEach((item) => {
      const name = item.getType();
      if (name) {
        (this.templateRefs as any)[name] = item.template;
      }
    });
  }
}
