import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import '@ng-ext/core';
import { NgExtRouterModule } from '@ng-ext/router';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './features/home/home.module';
import { TestFormsModule } from './features/test-forms/test-forms.module';
import { TestRouterModule } from './features/test-router/test-router.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { enableTracing: false }),
    HomeModule,
    TestRouterModule,
    TestFormsModule,
    NgExtRouterModule.forRoot(),
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
