import { ChildrenOutletContexts, Router } from '@angular/router';

export { };

declare module '@angular/router' {
  interface Router {
    getActiveComponent<T>(): T | undefined;
  }
}

// tslint:disable-next-line:space-before-function-paren
Router.prototype.getActiveComponent = function <T>(
  this: Router
): T | undefined {
  if (this) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rootContexts = (this as any).rootContexts as ChildrenOutletContexts;
    return rootContexts.getContext(this.routerState.root.outlet)?.outlet?.component as T;
  } else {
    return undefined;
  }
};
