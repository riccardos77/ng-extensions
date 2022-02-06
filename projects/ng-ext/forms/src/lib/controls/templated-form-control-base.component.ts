import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, QueryList } from '@angular/core';
import {
  getTemplateContext,
  getTemplateRef,
  hasTemplateRef,
  templateAfterContentInit,
  TemplateDefinition,
  TemplateSelectorDirective,
} from '@ng-ext/core';
import { FormArrayExt } from './form-array-ext.control';
import { FormControlBaseComponent } from './form-control-base.component';
import { FormControlExt } from './form-control-ext.control';
import { FormGroupExt } from './form-group-ext.control';

// eslint-disable-next-line @angular-eslint/use-component-selector
@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class TemplatedFormControlBaseComponent<
    TTemplateDefinitions extends { [key in keyof TTemplateDefinitions]: TemplateDefinition | null },
    TModel,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TFormValues extends { [key in keyof TFormValues]: any },
    TFormControls extends {
      [key in keyof TFormValues]:
        | FormArrayExt<TFormValues[key]>
        | FormControlExt<TFormValues[key]>
        | FormGroupExt<TFormValues[key]>;
    }
  >
  extends FormControlBaseComponent<TModel, TFormValues, TFormControls>
  implements AfterContentInit
{
  @ContentChildren(TemplateSelectorDirective)
  public templateSelectors?: QueryList<TemplateSelectorDirective>;

  public getTemplateRef = getTemplateRef;
  public getTemplateContext = getTemplateContext;
  public hasTemplateRef = hasTemplateRef;
  public templates: TTemplateDefinitions;

  public constructor() {
    super();
    this.templates = this.initTemplates();
  }

  public ngAfterContentInit(): void {
    templateAfterContentInit(this.templateSelectors, this.templates);
  }

  protected abstract initTemplates(): TTemplateDefinitions;
}
