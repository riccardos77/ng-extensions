import { NgModule } from '@angular/core';
import { InputTextDateValueConverterDirective } from './directives/input-text-date-value-converter.directive';
import { SelectPlaceholderDirective } from './directives/select-placeholder.directive';

@NgModule({
  declarations: [
    InputTextDateValueConverterDirective,
    SelectPlaceholderDirective
  ],
  imports: [],
  exports: [
    InputTextDateValueConverterDirective,
    SelectPlaceholderDirective
  ],
})
export class NgExtFormsModule { }
