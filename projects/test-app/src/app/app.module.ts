import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgExtCoreModule } from '@ng-ext/core';
import { NgExtRouterModule } from '@ng-ext/router';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './features/home/home.module';
import { TestFormsModule } from './features/test-forms/test-forms.module';
import { TestRouterModule } from './features/test-router/test-router.module';
import { TestStringTemplateComponent } from './features/test-string-template/test-string-template.component';

registerLocaleData(localeIt, 'it');

@NgModule({
  declarations: [AppComponent, TestStringTemplateComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { enableTracing: false }),
    HomeModule,
    TestFormsModule,
    TestRouterModule,
    NgExtCoreModule.forRoot(),
    NgExtRouterModule.forRoot(),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'it' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
