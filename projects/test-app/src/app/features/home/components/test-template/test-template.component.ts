import { Component, OnInit } from '@angular/core';
import { TemplateBaseComponent, TemplateDefinition } from '@ng-ext/core';

@Component({
  selector: 'app-test-template',
  templateUrl: './test-template.component.html',
  styleUrls: ['./test-template.component.scss'],
})
export class TestTemplateComponent extends TemplateBaseComponent<{
  t1: TemplateDefinition<ContextT1>,
  t2: TemplateDefinition<any>
}> implements OnInit {

  override initTemplates(): { t1: TemplateDefinition<ContextT1>, t2: TemplateDefinition<any> } {
    return { t1: { name: 't1' }, t2: { name: 't2' } };
  }

  public ngOnInit(): void {
    this.templates.t1.context = {
      $implicit: {
        text: 'abc',
        number: 123,
      }
    };
  }
}

export type ContextT1 = { $implicit: { text: string, number: number } };
