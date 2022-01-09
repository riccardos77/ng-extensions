import { AfterContentInit, Component, ContentChildren, Inject, InjectionToken, QueryList } from '@angular/core';
import { TemplateDefinition, TemplateSelectorDirective } from '../directives/template-selector.directive';
import { getTemplateContext, getTemplateRef, templateAfterContentInit } from '../helpers/template-base.helper';

const token = new InjectionToken('TemplateDefs');

@Component({ template: '' })
export abstract class TemplateBaseComponent<
  TTemplateDefinitions extends { [key: string]: TemplateDefinition<any> | null }
  > implements AfterContentInit {

  @ContentChildren(TemplateSelectorDirective)
  public templateSelectors?: QueryList<TemplateSelectorDirective<any>>;

  constructor(@Inject(token) public templates: TTemplateDefinitions) { }

  public ngAfterContentInit(): void {
    templateAfterContentInit(this.templateSelectors, this.templates);
  }

  public getTemplateRef = getTemplateRef;
  public getTemplateContext = getTemplateContext;
}
