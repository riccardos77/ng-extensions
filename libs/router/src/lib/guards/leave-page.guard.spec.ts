import { Location } from '@angular/common';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TestAppComponent, TestHomeComponent, TestLeavePageComponent, testRoutes } from '../../test-common.helper';
import '../extensions/router.extension';
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
