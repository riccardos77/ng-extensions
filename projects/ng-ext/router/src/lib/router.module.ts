import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LeavePageGuard } from './guards/leave-page.guard';

@NgModule({
  declarations: [],
  imports: [RouterModule],
  exports: [],
})
export class NgExtRouterModule {
  public static forRoot(): ModuleWithProviders<NgExtRouterModule> {
    return {
      ngModule: NgExtRouterModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          // LeavePageGuard is injected to force Guard constructor execution
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          useFactory: (leavePage: LeavePageGuard) => {
            return async () => Promise.resolve();
          },
          deps: [LeavePageGuard],
          multi: true,
        },
        LeavePageGuard,
      ],
    };
  }
}
