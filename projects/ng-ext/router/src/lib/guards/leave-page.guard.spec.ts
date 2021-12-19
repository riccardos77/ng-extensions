import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, Routes, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import '../extensions/router.extension';
import { ILeavePage, LeavePageGuard } from '../guards/leave-page.guard';
import { NgExtRouterModule } from '../router.module';

describe('leave-page.guard', () => {
  let location: Location;
  let router: Router;
  let fixture: TestAppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(testRoutes),
        NgExtRouterModule.forRoot()
      ],
      declarations: [TestAppComponent, TestHomeComponent, TestLeavePageComponent]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(TestAppComponent);
    router.initialNavigation();
  });

  it('navigate in and out LeavePageComponent with guard disabled', fakeAsync(() => {
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

@Component({ template: '' })
class TestHomeComponent { }

@Component({ template: '' })
class TestLeavePageComponent implements ILeavePage {
  public canLeavePageValue = false;

  public canUnloadWindow(): boolean {
    return this.canLeavePageValue;
  }

  public canDeactivateRoute(currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canLeavePageValue;
  }
}

@Component({ template: `<router-outlet></router-outlet>` })
class TestAppComponent { }

const testRoutes: Routes = [
  { path: 'home', component: TestHomeComponent },
  { path: 'leave-page-01', component: TestLeavePageComponent, canDeactivate: [LeavePageGuard] },
];
