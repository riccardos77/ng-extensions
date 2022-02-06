/* eslint-disable @angular-eslint/prefer-on-push-component-change-detection */
/* eslint-disable @angular-eslint/use-component-selector */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Location } from '@angular/common';
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

describe('leave-page.guard', () => {
  function setupTest(): { router: Router; location: Location; fixture: TestAppComponent } {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(testRoutes), NgExtRouterModule.forRoot()],
      declarations: [TestAppComponent, TestHomeComponent, TestLeavePageComponent],
    });

    const router = TestBed.inject(Router);
    router.initialNavigation();

    return {
      router,
      location: TestBed.inject(Location),
      fixture: TestBed.createComponent(TestAppComponent),
    };
  }

  it('navigate in and out LeavePageComponent with guard disabled', fakeAsync(() => {
    const { router, location } = setupTest();

    router.navigate(['/leave-page-01']);
    tick();
    expect(location.path()).toBe('/leave-page-01');

    const component = router.getActiveComponent<TestLeavePageComponent>();
    expect(component).toBeTruthy();
    if (component) {
      component.canLeavePageValue = true;
    }

    router.navigate(['/home']);
    tick();
    expect(location.path()).toBe('/home');
  }));

  it('navigate in and out LeavePageComponent with guard enabled', fakeAsync(() => {
    const { router, location } = setupTest();

    router.navigate(['/leave-page-01']);
    tick();
    expect(location.path()).toBe('/leave-page-01');

    const component = router.getActiveComponent<TestLeavePageComponent>();
    expect(component).toBeTruthy();
    if (component) {
      component.canLeavePageValue = false;
    }

    router.navigate(['/home']);
    tick();
    expect(location.path()).toBe('/leave-page-01');
  }));
});
