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

  public canDeactivate(
    component: ILeavePage,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canLeavePage(component);
  }

  private beforeUnloadHandler(event: BeforeUnloadEvent): void {
    const component = this.router.getActiveComponent<ILeavePage>();

    if (component && !this.canLeavePage(component)) {
      event.preventDefault();
      event.returnValue = '';
    }
  }

  private canLeavePage(component: ILeavePage): boolean {
    if (component && component.canLeavePage) {
      return component.canLeavePage();
    } else {
      return true;
    }
  }
}

export interface ILeavePage {
  canLeavePage: () => boolean;
}
