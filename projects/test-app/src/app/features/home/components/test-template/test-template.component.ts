import { Component } from '@angular/core';
import { TemplateBaseComponent } from '@ng-ext/core';

@Component({
  selector: 'app-test-template',
  templateUrl: './test-template.component.html',
  styleUrls: ['./test-template.component.scss'],
})
export class TestTemplateComponent extends TemplateBaseComponent<'t1' | 't2'> {
  public ctx1 = {
    text: 'abc',
    number: 123,
  };

  constructor() {
    super();
  }
}
