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

    const b = [1, 2, 3].toObject<number>(
      (n) => `k${n}`,
      (n) => n * 2
    );
    console.log(b);
  }
}
