import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { getTemplateContext, getTemplateRef, hasTemplateRef, templateAfterContentInit, TemplateDefinition, TemplateSelectorDirective } from '@ng-ext/core';
import { FormArrayExt } from './form-array-ext.control';
import { FormControlBaseComponent } from './form-control-base.component';
import { FormControlExt } from './form-control-ext.control';
import { FormGroupExt } from './form-group-ext.control';

@Component({ template: '' })
export abstract class TemplatedFormControlBaseComponent<
  TTemplateDefinitions extends { [key: string]: TemplateDefinition<any> | null },
  TModel,
  TFormValues extends { [key: string]: any },
  TFormControls extends {
    [key in keyof TFormValues]:
    | FormControlExt<TFormValues[key]>
    | FormGroupExt<TFormValues[key]>
    | FormArrayExt<TFormValues[key]>;
  } = { [key in keyof TFormValues]: FormControlExt<TFormValues[key]> },
  > extends FormControlBaseComponent<TModel, TFormValues, TFormControls> implements AfterContentInit {

  @ContentChildren(TemplateSelectorDirective)
  public templateSelectors?: QueryList<TemplateSelectorDirective<any>>;

  public templates: TTemplateDefinitions

  constructor() {
    super();
    this.templates = this.initTemplates();
  }

  abstract initTemplates(): TTemplateDefinitions;

  public ngAfterContentInit(): void {
    templateAfterContentInit(this.templateSelectors, this.templates);
  }

  public getTemplateRef = getTemplateRef;
  public getTemplateContext = getTemplateContext;
  public hasTemplateRef = hasTemplateRef;
}
