import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRouterComponent } from './test-router.component';

describe('TestRouterComponent', () => {
  let component: TestRouterComponent;
  let fixture: ComponentFixture<TestRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestRouterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
