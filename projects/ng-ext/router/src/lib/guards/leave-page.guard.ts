import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import '../extensions/router.extension';

@Injectable()
export class LeavePageGuard implements CanDeactivate<ILeavePage>, OnDestroy {
  constructor(private router: Router) {
    window.addEventListener(
      'beforeunload',
      this.beforeUnloadHandler.bind(this)
    );
  }

  public ngOnDestroy(): void {
    window.removeEventListener('beforeunload', this.beforeUnloadHandler);
  }

  public canDeactivate(component: ILeavePage, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (component && component.canDeactivateRoute) {
      return component.canDeactivateRoute(currentRoute, currentState, nextState);
    } else {
      return true;
    }
  }

  private beforeUnloadHandler(event: BeforeUnloadEvent): void {
    const component = this.router.getActiveComponent<ILeavePage>();

    let canUnload = true;

    if (component && component.canUnloadWindow) {
      canUnload = component?.canUnloadWindow();
    }

    if (component && !canUnload) {
      event.preventDefault();
      event.returnValue = '';
    }
  }
}

export interface ILeavePage {
  canUnloadWindow: () => boolean;
  canDeactivateRoute: (currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot) => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
}
