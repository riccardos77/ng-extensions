import { ModuleWithProviders, NgModule } from '@angular/core';
import { MouseDirective } from './directives/mouse.directive';
import { TemplateSelectorDirective } from './directives/template-selector.directive';
import { HasFlagsPipe } from './pipes/hasFlags.pipe';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  imports: [],
  declarations: [HasFlagsPipe, MouseDirective, SafePipe, TemplateSelectorDirective],
  exports: [HasFlagsPipe, MouseDirective, SafePipe, TemplateSelectorDirective],
})
export class NgExtCoreModule {
  public static forRoot(): ModuleWithProviders<NgExtCoreModule> {
    return {
      ngModule: NgExtCoreModule,
      providers: [],
    };
  }
}
