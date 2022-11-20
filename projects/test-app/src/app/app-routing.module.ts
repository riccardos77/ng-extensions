import { Routes } from '@angular/router';
import { LeavePageGuard } from '@ng-ext/router';
import { HomeComponent } from './features/home/home.component';
import { TestFormsComponent } from './features/test-forms/test-forms.component';
import { TestRouterComponent } from './features/test-router/test-router.component';
import { TestStringTemplateComponent } from './features/test-string-template/test-string-template.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'test-router',
    component: TestRouterComponent,
    canDeactivate: [LeavePageGuard],
  },
  {
    path: 'test-forms',
    component: TestFormsComponent,
    canDeactivate: [LeavePageGuard],
  },
  {
    path: 'test-string-template',
    component: TestStringTemplateComponent,
    canDeactivate: [LeavePageGuard],
  },
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes, { enableTracing: false })],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}
