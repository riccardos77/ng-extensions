import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ILeavePage, LeavePageGuard } from './lib/guards/leave-page.guard';

@Component({ template: '' })
export class TestHomeComponent { }

@Component({ template: '' })
export class TestLeavePageComponent implements ILeavePage {
  public canLeavePageValue = false;

  public canLeavePage(): boolean { return this.canLeavePageValue; }
}

@Component({ template: `<router-outlet></router-outlet>` })
export class TestAppComponent { }

export const testRoutes: Routes = [
  { path: 'home', component: TestHomeComponent },
  { path: 'leave-page-01', component: TestLeavePageComponent, canDeactivate: [LeavePageGuard] },
];
