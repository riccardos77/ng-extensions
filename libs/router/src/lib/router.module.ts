import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LeavePageGuard } from './guards/leave-page.guard';

@NgModule({
  declarations: [],
  imports: [
    RouterModule
  ],
  exports: [],
})
export class NgExtRouterModule {
  public static forRoot(): ModuleWithProviders<NgExtRouterModule> {
    return {
      ngModule: NgExtRouterModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: (leavePage: LeavePageGuard) => {
            return () => Promise.resolve();
          },
          deps: [LeavePageGuard],
          multi: true,
        },
        LeavePageGuard,
      ],
    };
  }
}
