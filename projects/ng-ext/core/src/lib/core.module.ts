import { ModuleWithProviders, NgModule } from '@angular/core';
import { MouseDirective } from './directives/mouse.directive';
import { TemplateSelectorDirective } from './directives/template-selector.directive';

@NgModule({
  declarations: [
    MouseDirective,
    TemplateSelectorDirective
  ],
  imports: [],
  exports: [
    MouseDirective,
    TemplateSelectorDirective
  ],
})
export class NgExtCoreModule {
  public static forRoot(): ModuleWithProviders<NgExtCoreModule> {
    return {
      ngModule: NgExtCoreModule,
      providers: [],
    };
  }
}
