/* eslint-disable @angular-eslint/prefer-on-push-component-change-detection */
/* eslint-disable @angular-eslint/use-component-selector */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, Routes, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import '../extensions/router.extension';
import { ILeavePage, LeavePageGuard } from '../guards/leave-page.guard';
import { NgExtRouterModule } from '../router.module';

@Component({ template: '' })
class TestHomeComponent {}

@Component({ template: '' })
class TestLeavePageComponent implements ILeavePage {
  public canLeavePageValue = false;

  public canUnloadWindow(): boolean {
    return this.canLeavePageValue;
  }

  public canDeactivateRoute(
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<UrlTree | boolean> | Promise<UrlTree | boolean> | UrlTree | boolean {
    return this.canLeavePageValue;
  }
}

@Component({ template: `<router-outlet></router-outlet>` })
class TestAppComponent {}

const testRoutes: Routes = [
  { path: 'home', component: TestHomeComponent },
  { path: 'leave-page-01', component: TestLeavePageComponent, canDeactivate: [LeavePageGuard] },
];

describe('router.extension', () => {
  function setupTest(): Router {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(testRoutes), NgExtRouterModule.forRoot()],
      declarations: [TestAppComponent, TestHomeComponent],
    });

    const router = TestBed.inject(Router);
    router.initialNavigation();
    const fixture = TestBed.createComponent(TestAppComponent);
    return router;
  }

  it('getComponent from router after navigation', fakeAsync(() => {
    const router = setupTest();

    router.navigate(['/home']);
    tick();
    expect(router.getActiveComponent<TestHomeComponent>()).toBeInstanceOf(TestHomeComponent);
  }));
});
