import { NumberFormatStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormArrayExt, FormControlExt, FormGroupExt } from '@ng-ext/forms';
import { SubFormModel } from './components/sub-form/sub-form.component';

@Component({
  selector: 'app-test-forms',
  templateUrl: './test-forms.component.html',
  styleUrls: ['./test-forms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestFormsComponent {
  public form: FormGroupExt<TestFormValues, TestFormControls>;
  public selectSelectedValue?: string;

  public constructor() {
    this.form = new FormGroupExt<TestFormValues, TestFormControls>({
      text1: new FormControlExt(''),
      num1: new FormControlExt(0, [Validators.required, Validators.max(2000)]),
      date1: new FormControlExt(undefined, [Validators.required]),
      // obj1: new FormControlExt({ innerNum: 1, innerString: '' })
      obj1: new FormGroupExt({
        innerNum: new FormControlExt(1),
        innerString: new FormControlExt(''),
      }),
      arrText1: new FormArrayExt([new FormControlExt(''), new FormControlExt('')]),
      subObj: new FormControlExt<SubFormModel>({ s: '' }),
      // arrObj1: new FormArrayExt(
      //   [
      //     new FormGroupExt({
      //       innerString: new FormControlExt(''),
      //       innerNum: new FormControlExt(0)
      //     })
      //   ]
      // )
    });
  }

  public log(): void {
    console.log(this.form.v);

    const n = 1.23456;
    console.log(n.formatToString(NumberFormatStyle.Currency, 'it', '€', 'eur'));

    let s: string | undefined = '1';

    if (s) {
      s = undefined;
    }
    console.log(s?.convertToNumber());
  }

  public logSubObj(): void {
    console.log(this.form.v.subObj);
  }

  public setDate(): void {
    this.form.c.date1.setValue(new Date());
  }

  public selectChanged(event: Event): void {
    this.selectSelectedValue = (event.target as HTMLSelectElement).value;
  }
}

interface InnerObjectValues {
  innerString: string;
  innerNum: number;
}

interface TestFormValues {
  text1: string;
  num1: number;
  date1: Date | undefined;
  obj1: InnerObjectValues;
  arrText1: string[];
  subObj: SubFormModel;
  // arrObj1: InnerObjectValues[];
}

interface TestFormControls {
  text1: FormControlExt<string>;
  num1: FormControlExt<number>;
  date1: FormControlExt<Date | undefined>;
  obj1: FormGroupExt<InnerObjectValues>;
  arrText1: FormArrayExt<string[]>;
  subObj: FormControlExt<SubFormModel>;
  // arrObj1: FormArrayExt<InnerObjectValues[], InnerObjectValues, FormGroupExt<InnerObjectValues>>;
}
