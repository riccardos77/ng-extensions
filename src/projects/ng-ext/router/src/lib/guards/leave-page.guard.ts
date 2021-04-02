import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, ChildrenOutletContexts, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class LeavePageGuard implements CanDeactivate<ILeavePage>, OnDestroy {
  constructor(private router: Router) {
    window.addEventListener('beforeunload', this.beforeUnloadHandler.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('beforeunload', this.beforeUnloadHandler);
  }

  canDeactivate(component: ILeavePage, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canLeavePage(component);
  }

  private beforeUnloadHandler(event: BeforeUnloadEvent): void {
    const rootContexts = (this.router as any).rootContexts as ChildrenOutletContexts;
    const component = rootContexts.getContext(this.router.routerState.root.outlet)?.outlet?.component as ILeavePage;

    if (!this.canLeavePage(component)) {
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
