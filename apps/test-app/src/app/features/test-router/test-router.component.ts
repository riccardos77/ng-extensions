import { Component } from '@angular/core';
import { ILeavePage } from '@ng-ext/router';

@Component({
  selector: 'app-test-router',
  templateUrl: './test-router.component.html',
  styleUrls: ['./test-router.component.scss'],
})
export class TestRouterComponent implements ILeavePage {
  public canLeavePageValue = true;

  public canLeavePage(): boolean {
    return this.canLeavePageValue;
  }
}
