/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectionStrategy, Component, Injector, Input, OnChanges, TemplateRef } from '@angular/core';
import { StringTemplate, stringTemplateBinder } from '../helpers/string-template.helper';

@Component({
  selector: 'ngext-string-template',
  template: `
    <ng-container *ngIf="finalTemplate; else fallbackTemplateRef">
      <div [class]="class" [innerHTML]="finalTemplate | safe: 'html'"></div>
    </ng-container>
    <ng-template #fallbackTemplateRef>
      <ng-template [ngTemplateOutlet]="fallbackTemplate"></ng-template>
    </ng-template>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StringTemplateComponent<TBindingContext> implements OnChanges {
  @Input() public stringTemplate: StringTemplate<TBindingContext> | undefined;
  @Input() public bindingContext: TBindingContext | undefined;
  @Input() public fallbackTemplate: TemplateRef<any> | null = null;
  @Input() public class: string = '';

  public finalTemplate: string | undefined;

  public constructor(private injector: Injector) {}

  public ngOnChanges(): void {
    if (this.stringTemplate) {
      this.finalTemplate = stringTemplateBinder(this.stringTemplate, this.bindingContext, this.injector);
    } else {
      this.finalTemplate = undefined;
    }
  }
}
