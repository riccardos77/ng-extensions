/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive()
export abstract class ControlValueConverterBaseDirective<TControlValue, TModelValue> implements ControlValueAccessor {
  private onChangeFn?: (_: any) => void;
  private onTouchedFn?: () => void;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  protected abstract controlToModel(control: TControlValue): TModelValue;
  protected abstract modelToControl(value: TModelValue): TControlValue;

  public writeValue(obj: any): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'value',
      this.modelToControl(obj)
    );
  }

  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'disabled',
      isDisabled
    );
  }

  @HostListener('input', ['$event.target'])
  public onInput(target: any): void {
    this.onChangeFn?.(this.controlToModel(target.value));
  }

  @HostListener('blur')
  public onBlur(): void {
    this.onTouchedFn?.();
  }
}
