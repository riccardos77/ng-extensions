import { Component, OnInit } from '@angular/core';
import { ILeavePage } from '@ng-ext/router';

@Component({
  selector: 'app-test-router',
  templateUrl: './test-router.component.html',
  styleUrls: ['./test-router.component.scss']
})
export class TestRouterComponent implements OnInit, ILeavePage {
  public canLeavePageValue = true;

  constructor() { }

  ngOnInit(): void {
  }

  canLeavePage(): boolean {
    return this.canLeavePageValue;
  }
}
