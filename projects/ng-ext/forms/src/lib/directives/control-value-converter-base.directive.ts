/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { AbstractControl, ControlValueAccessor, ValidationErrors, Validator } from '@angular/forms';

@Directive()
export abstract class ControlValueConverterBaseDirective<TControlValue, TModelValue> implements ControlValueAccessor, Validator {
  private onChangeFn?: (_: any) => void;
  private onTouchedFn?: () => void;

  public constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  @HostListener('input', ['$event.target'])
  public onInput(target: any): void {
    if (this.validateValue(target.value) === null) {
      this.onChangeFn?.(this.controlToModel(target.value));
    }
  }

  @HostListener('blur')
  public onBlur(): void {
    this.onTouchedFn?.();
  }

  public writeValue(obj: any): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.modelToControl(obj as TModelValue));
  }

  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    return this.validateValue(control.value);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected validateValue(value: TControlValue): ValidationErrors | null {
    return null;
  }
  protected abstract controlToModel(control: TControlValue): TModelValue;
  protected abstract modelToControl(value: TModelValue): TControlValue;
}
