import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TestAppComponent, TestHomeComponent, testRoutes } from '../../test-common.helper';
import '../extensions/router.extension';
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
