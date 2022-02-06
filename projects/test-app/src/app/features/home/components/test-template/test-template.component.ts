import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TemplateBaseComponent, TemplateDefinition } from '@ng-ext/core';

@Component({
  selector: 'app-test-template',
  templateUrl: './test-template.component.html',
  styleUrls: ['./test-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestTemplateComponent extends TemplateBaseComponent<TestTemplateTemplates> implements OnInit {
  public ngOnInit(): void {
    this.templates.t1.context = {
      $implicit: {
        text: 'abc',
        number: 123,
      },
    };
  }

  protected override initTemplates(): { t1: TemplateDefinition<ContextT1>; t2: TemplateDefinition } {
    return { t1: { name: 't1' }, t2: { name: 't2' } };
  }
}

interface TestTemplateTemplates {
  t1: TemplateDefinition<ContextT1>;
  t2: TemplateDefinition;
}
export interface ContextT1 {
  $implicit: { text: string; number: number };
}
