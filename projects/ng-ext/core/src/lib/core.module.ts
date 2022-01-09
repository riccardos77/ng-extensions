import { ModuleWithProviders, NgModule } from '@angular/core';
import { MouseDirective } from './directives/mouse.directive';
import { TemplateSelectorDirective } from './directives/template-selector.directive';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  imports: [],
  declarations: [
    MouseDirective,
    SafePipe,
    TemplateSelectorDirective
  ],
  exports: [
    MouseDirective,
    SafePipe,
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
