import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlBaseComponent, FormControlExt } from '@ng-ext/forms';
import { FormControlBaseComponentConfig } from '../../../../../../../ng-ext/forms/src/lib/controls/models/controls.model';

@Component({
  selector: 'app-sub-form',
  templateUrl: './sub-form.component.html',
  styleUrls: ['./sub-form.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: SubFormComponent, multi: true },
    { provide: NG_VALIDATORS, useExisting: SubFormComponent, multi: true },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubFormComponent extends FormControlBaseComponent<SubFormModel, SubFormValues, SubFormControls> {
  private field1;
  private field2;

  public constructor() {
    super();
    this.field1 = 2;
    this.field2 = 'ciao ';
  }

  public multipleChanges(): void {
    if (this.form.v.n1 === '4') {
      this.form.c.s.setValue('quattro');
      this.form.c.s.setValue('quattro 2');
    }

    // this.notifyChanges();
  }

  protected override configure(config: FormControlBaseComponentConfig): void {
    config.initFormOn = 'ngOnInit';
    config.notifyChangesMode = 'automatic';
  }

  protected override initForm(): SubFormControls {
    return {
      s: new FormControlExt(''),
      n1: new FormControlExt(''),
    };
  }

  protected override modelToForm(model: SubFormModel): SubFormValues {
    return {
      n1: model.n1?.toString() ?? '',
      s: model.s + this.field2,
    };
  }

  protected override formToModel(values: SubFormValues): SubFormModel {
    return {
      s: values.s,
      n1: (values.n1.convertToNumber() ?? 0) * this.field1,
    };
  }
}

export interface SubFormModel {
  s: string;
  n1?: number;
}

interface SubFormValues {
  s: string;
  n1: string;
}
type SubFormControls = Required<{ [key in keyof SubFormValues]: FormControlExt<SubFormValues[key]> }>;
