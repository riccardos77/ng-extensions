import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { StringTemplateComponent } from './controls/string-template.component';
import { MouseDirective } from './directives/mouse.directive';
import { TemplateSelectorDirective } from './directives/template-selector.directive';
import { HasFlagsPipe } from './pipes/hasFlags.pipe';
import { ngCommonPipes } from './pipes/ng-common-pipes';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [HasFlagsPipe, MouseDirective, SafePipe, StringTemplateComponent, TemplateSelectorDirective],
  exports: [HasFlagsPipe, MouseDirective, SafePipe, StringTemplateComponent, TemplateSelectorDirective],
})
export class NgExtCoreModule {
  public static forRoot(options?: { provideAngularCommonPipes: boolean }): ModuleWithProviders<NgExtCoreModule> {
    const providers = options?.provideAngularCommonPipes ? [...Object.values(ngCommonPipes)] : [];

    return {
      ngModule: NgExtCoreModule,
      providers,
    };
  }
}
