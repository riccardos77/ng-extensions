import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ILeavePage, LeavePageGuard } from './lib/guards/leave-page.guard';

@Component({ template: '' })
export class TestHomeComponent { }

@Component({ template: '' })
export class TestLeavePageComponent implements ILeavePage {
  public canLeavePageValue = false;

  public canUnloadWindow(): boolean {
    return this.canLeavePageValue;
  }

  public canDeactivateRoute(currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canLeavePageValue;
  }
}

@Component({ template: `<router-outlet></router-outlet>` })
export class TestAppComponent { }

export const testRoutes: Routes = [
  { path: 'home', component: TestHomeComponent },
  { path: 'leave-page-01', component: TestLeavePageComponent, canDeactivate: [LeavePageGuard] },
];
