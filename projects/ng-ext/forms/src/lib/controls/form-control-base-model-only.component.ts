import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControlBaseComponent } from './form-control-base.component';
import { FormControlExt } from './form-control-ext.control';

// eslint-disable-next-line @angular-eslint/use-component-selector
@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class FormControlBaseComponentModelOnly<TModel> extends FormControlBaseComponent<
  TModel,
  TModel,
  Required<{ [key in keyof TModel]: FormControlExt<TModel[key]> }>
> {
  protected override modelToForm(model: TModel): TModel | Observable<TModel> | Promise<TModel> {
    return model;
  }

  protected override formToModel(values: TModel): TModel | Observable<TModel> | Promise<TModel> {
    return values;
  }
}
