import { Component } from '@angular/core';
import { ValidatorsExt } from '@ng-ext/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'test-app';

  constructor() {
    const a = ValidatorsExt.fiscalCodePattern();
  }
}
