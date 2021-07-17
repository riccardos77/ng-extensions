import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormArrayExt, FormControlExt, FormGroupExt } from '@ng-ext/forms';

@Component({
  selector: 'app-test-forms',
  templateUrl: './test-forms.component.html',
  styleUrls: ['./test-forms.component.scss']
})
export class TestFormsComponent {
  public form: FormGroupExt<TestFormValues, TestFormControls>;

  constructor(fb: FormBuilder) {
    this.form = new FormGroupExt<TestFormValues, TestFormControls>({
      text1: new FormControlExt(''),
      num1: new FormControlExt(0, [Validators.required, Validators.max(2)]),
      date1: new FormControlExt(undefined, [Validators.required]),
      // obj1: new FormControlExt({ innerNum: 1, innerString: '' })
      obj1: new FormGroupExt({
        innerNum: new FormControlExt(1),
        innerString: new FormControlExt('')
      }),
      arrText1: new FormArrayExt(
        [
          new FormControlExt(''),
          new FormControlExt('')
        ]
      ),
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
    console.log('1'.convertToNumber());
    console.log('ciao'.convertToNumber());

    let s: string | undefined = '1';

    if (s) {
      s = undefined;
    }
    console.log(s?.convertToNumber());
  }

  public setDate(): void {
    this.form.c.date1.setValue(new Date());
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
  // arrObj1: InnerObjectValues[];
}

type TestFormControls = {
  text1: FormControlExt<string>;
  num1: FormControlExt<number>;
  date1: FormControlExt<Date | undefined>;
  obj1: FormGroupExt<InnerObjectValues>;
  arrText1: FormArrayExt<string[]>
  // arrObj1: FormArrayExt<InnerObjectValues[], InnerObjectValues, FormGroupExt<InnerObjectValues>>;
};
