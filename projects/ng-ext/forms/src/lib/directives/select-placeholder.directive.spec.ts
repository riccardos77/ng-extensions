import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  `,
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
  changeDetection: ChangeDetectionStrategy.Default,
})
class TestSelectPlaceholderDirectiveComponent {
  public placeholderText = 'test-text';
  public placeholderValue = 'test-value';
  public selectedValue: string | undefined;
}

describe('select-placeholder-directive', () => {
  async function setupComponentAsync(): Promise<ComponentFixture<TestSelectPlaceholderDirectiveComponent>> {
    await TestBed.configureTestingModule({
      declarations: [TestSelectPlaceholderDirectiveComponent, SelectPlaceholderDirective],
    }).compileComponents();

    return TestBed.createComponent(TestSelectPlaceholderDirectiveComponent);
  }

  it('check placeholder will be added and updated', async () => {
    expect.hasAssertions();

    const fixture = await setupComponentAsync();
    const selectEl = fixture.debugElement.query(By.css('select')).nativeElement as HTMLSelectElement;
    const component = fixture.componentInstance;

    const originalOptions = selectEl.options.length;

    fixture.detectChanges();
    await fixture.whenStable();

    expect(selectEl.options).toHaveLength(originalOptions + 1);
    expect(selectEl.options[0].textContent).toBe(component.placeholderText);
    expect(selectEl.options[0].value).toBe(component.placeholderValue);

    component.placeholderText = 'new-text';
    fixture.detectChanges();
    await fixture.whenStable();

    expect(selectEl.options[0].textContent).toBe(component.placeholderText);

    component.placeholderValue = 'new-value';
    fixture.detectChanges();
    expect(selectEl.options[0].value).toBe(component.placeholderValue);
  });
});
