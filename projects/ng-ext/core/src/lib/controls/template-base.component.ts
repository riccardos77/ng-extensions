import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { TemplateDefinition, TemplateSelectorDirective } from '../directives/template-selector.directive';
import { getTemplateContext, getTemplateRef, templateAfterContentInit } from '../helpers/template-base.helper';

@Component({ template: '' })
export abstract class TemplateBaseComponent<
  TTemplateDefinitions extends { [key: string]: TemplateDefinition<any> | null }
  > implements AfterContentInit {

  @ContentChildren(TemplateSelectorDirective)
  public templateSelectors?: QueryList<TemplateSelectorDirective<any>>;

  public templates: TTemplateDefinitions

  constructor() {
    this.templates = this.initTemplates();
  }

  abstract initTemplates(): TTemplateDefinitions;


  public ngAfterContentInit(): void {
    templateAfterContentInit(this.templateSelectors, this.templates);
  }

  public getTemplateRef = getTemplateRef;
  public getTemplateContext = getTemplateContext;
}
