import { ModuleWithProviders, NgModule } from '@angular/core';
import { TemplateSelectorDirective } from './directives/template-selector.directive';

@NgModule({
  declarations: [TemplateSelectorDirective],
  imports: [],
  exports: [TemplateSelectorDirective],
})
export class NgExtCoreModule {
  public static forRoot(): ModuleWithProviders<NgExtCoreModule> {
    return {
      ngModule: NgExtCoreModule,
      providers: [],
    };
  }
}