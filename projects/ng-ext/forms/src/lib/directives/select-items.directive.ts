import { Directive, Input } from '@angular/core';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: 'select[items]' })
export class SelectItemsDirective {
  @Input() public items?: string;

  // private placeholderOption: HTMLOptionElement;
  // private className = 'select-placeholder-directive';

  // constructor(private el: ElementRef<HTMLSelectElement>) {
  //   this.placeholderOption = this.createPlaceholderOption();
  // }

  // public ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['placeholder']) {
  //     this.placeholderOption.text = this.placeholder ?? '';
  //   }

  //   if (changes['placeholderValue']) {
  //     this.placeholderOption.value = this.placeholderValue ?? '';
  //   }
  // }

  // public ngAfterContentInit(): void {
  //   this.ensureStyle();

  //   this.el.nativeElement.options.add(this.placeholderOption, 0);
  //   this.el.nativeElement.setAttribute('required', '');
  //   this.el.nativeElement.classList.add(this.className);
  //   this.el.nativeElement.selectedIndex = 0;
  // }

  // private ensureStyle(): void {
  //   const styleName = `${this.className}-style`;
  //   let style = document.getElementById(styleName) as HTMLStyleElement;

  //   if (!style) {
  //     style = document.createElement('style');
  //     style.id = styleName;
  //     document.head.appendChild(style);

  //     if (style.sheet) {
  //       style.sheet.insertRule('.select-placeholder-directive:required:invalid { color: gray; }');
  //       style.sheet.insertRule('.select-placeholder-directive option { color: initial; }');
  //     }
  //   }
  // }

  // private createPlaceholderOption(): HTMLOptionElement {
  //   const o = document.createElement('option');
  //   o.setAttribute('value', '');
  //   o.setAttribute('disabled', '');
  //   o.setAttribute('hidden', '');
  //   o.setAttribute('selected', '');

  //   return o;
  // }
}
