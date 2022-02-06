import { NgModule } from '@angular/core';
import { InputTextDateValueConverterDirective } from './directives/input-text-date-value-converter.directive';
import { InputTextNumberValueConverterDirective } from './directives/input-text-number-value-converter.directive';
import { SelectPlaceholderDirective } from './directives/select-placeholder.directive';

@NgModule({
  declarations: [InputTextDateValueConverterDirective, InputTextNumberValueConverterDirective, SelectPlaceholderDirective],
  imports: [],
  exports: [InputTextDateValueConverterDirective, InputTextNumberValueConverterDirective, SelectPlaceholderDirective],
})
export class NgExtFormsModule {}
