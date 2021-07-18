import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgExtFormsModule } from '@ng-ext/forms';
import { TestFormsComponent } from './test-forms.component';

describe('TestFormsComponent', () => {
  let component: TestFormsComponent;
  let fixture: ComponentFixture<TestFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestFormsComponent],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgExtFormsModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
