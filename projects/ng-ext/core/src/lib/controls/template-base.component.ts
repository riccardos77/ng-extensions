import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, QueryList } from '@angular/core';
import { TemplateDefinition, TemplateSelectorDirective } from '../directives/template-selector.directive';
import { getTemplateContext, getTemplateRef, hasTemplateRef, templateAfterContentInit } from '../helpers/template-base.helper';

// eslint-disable-next-line @angular-eslint/use-component-selector
@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class TemplateBaseComponent<
  TTemplateDefinitions extends { [key in keyof TTemplateDefinitions]: TemplateDefinition | null }
> implements AfterContentInit
{
  @ContentChildren(TemplateSelectorDirective)
  public templateSelectors?: QueryList<TemplateSelectorDirective>;
  public getTemplateRef = getTemplateRef;
  public getTemplateContext = getTemplateContext;
  public hasTemplateRef = hasTemplateRef;

  public templates: TTemplateDefinitions;

  public constructor() {
    this.templates = this.initTemplates();
  }

  public ngAfterContentInit(): void {
    templateAfterContentInit(this.templateSelectors, this.templates);
  }

  protected abstract initTemplates(): TTemplateDefinitions;
}
