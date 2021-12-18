import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, Routes, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import '../extensions/router.extension';
import { ILeavePage, LeavePageGuard } from '../guards/leave-page.guard';
import { NgExtRouterModule } from '../router.module';

describe('router.extension', () => {
  let router: Router;
  let fixture: TestAppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(testRoutes),
        NgExtRouterModule.forRoot()
      ],
      declarations: [TestAppComponent, TestHomeComponent]
    });

    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(TestAppComponent);
    router.initialNavigation();
  });

  it('getComponent from router after navigation', fakeAsync(() => {
    router.navigate(['/home']);
    tick();
    expect(router.getActiveComponent<TestHomeComponent>()).toBeInstanceOf(TestHomeComponent);
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
