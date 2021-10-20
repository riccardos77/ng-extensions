import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ILeavePage } from '@ng-ext/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test-router',
  templateUrl: './test-router.component.html',
  styleUrls: ['./test-router.component.scss'],
})
export class TestRouterComponent implements ILeavePage {
  public canLeavePageValue = true;

  public canUnloadWindow(): boolean {
    return this.canLeavePageValue;
  }

  public canDeactivateRoute(currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable(sub => {
      setTimeout(() => {
        sub.next(this.canLeavePageValue);
        sub.complete();
      }, 2000);
    })
  }
}
