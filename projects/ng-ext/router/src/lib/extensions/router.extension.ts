import { ChildrenOutletContexts, Router } from '@angular/router';

export {};

declare module '@angular/router' {
  interface Router {
    getActiveComponent: <T>() => T | undefined;
  }
}

Router.prototype.getActiveComponent = function <T>(this: Router): T | undefined {
  if (this !== undefined) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      const rootContexts = (this as any).rootContexts as ChildrenOutletContexts;
      return rootContexts.getContext(this.routerState.root.outlet)?.outlet?.component as T;
    } catch {
      return undefined;
    }
  } else {
    return undefined;
  }
};
