import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StringTemplate } from '@ng-ext/core';

@Component({
  selector: 'app-test-string-template',
  templateUrl: './test-string-template.component.html',
  styleUrls: ['./test-string-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestStringTemplateComponent implements OnInit {
  public stringTemplate: StringTemplate<User> | undefined;
  public stringTemplateWithoutContext: StringTemplate | undefined;

  public bindingContext: User = { name: 'Pluto' };

  public ngOnInit(): void {
    this.stringTemplate = {
      stringTemplate: '<p>ciao <br>{name|uppercase}</br></p>',
      placeholderBindings: [{ name: 'name', value: b => b.name }],
    };

    this.stringTemplateWithoutContext = {
      stringTemplate: '<p>ciao <br>anonimo</br></p>',
    };
  }
}

interface User {
  name: string;
}
