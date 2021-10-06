import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SelectPlaceholderDirective } from './select-placeholder.directive';

@Component({
  selector: 'ng-ext-unittest-select-placeholder-directive',
  template: `
    <select [placeholder]="placeholderText" [placeholderValue]="placeholderValue" (change)="selectedValue = $event">
      <option value="a">a</option>
      <option value="b">b</option>
    </select>
    `
})
class TestSelectPlaceholderDirectiveComponent {
  public placeholderText = 'test-text';
  public placeholderValue = 'test-value';
  public selectedValue: string | undefined;
}

describe('select-placeholder-directive', () => {
  let component: TestSelectPlaceholderDirectiveComponent;
  let componentDe: DebugElement;
  let fixture: ComponentFixture<TestSelectPlaceholderDirectiveComponent>;

  beforeEach(async () => {
    await TestBed
      .configureTestingModule({ declarations: [TestSelectPlaceholderDirectiveComponent, SelectPlaceholderDirective] })
      .compileComponents();

    fixture = TestBed.createComponent(TestSelectPlaceholderDirectiveComponent);
    component = fixture.componentInstance;
    componentDe = fixture.debugElement;
  });

  it('check placeholder will be added and updated', async () => {
    const selectDe = componentDe.query(By.css('select'));
    const selectEl: HTMLSelectElement = selectDe.nativeElement;

    const originalOptions = selectEl.options.length;

    fixture.detectChanges();
    await fixture.whenStable();

    expect(selectEl.options.length).toBe(originalOptions + 1);
    expect(selectEl.options[0].textContent).toBe(component.placeholderText);
    expect(selectEl.options[0].value).toBe(component.placeholderValue);

    component.placeholderText = "new-text";
    fixture.detectChanges();
    expect(selectEl.options[0].textContent).toBe(component.placeholderText);

    component.placeholderValue = "new-value";
    fixture.detectChanges();
    expect(selectEl.options[0].value).toBe(component.placeholderValue);
  });
});
