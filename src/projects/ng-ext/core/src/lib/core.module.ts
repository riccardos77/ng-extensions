import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule({
  declarations: [
  ],
  imports: [
  ],
  exports: [
  ]
})
export class NgExtCoreModule {
  public static forRoot(): ModuleWithProviders<NgExtCoreModule> {
    return {
      ngModule: NgExtCoreModule,
      providers: [
      ]
    };
  }
}
