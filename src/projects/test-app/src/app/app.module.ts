import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import '@ng-ext/core';
import { NgExtRouterModule } from '@ng-ext/router';
import { AppRoutingModule } from './app-routing.module';
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
    AppRoutingModule,
    HomeModule,
    TestRouterModule,
    TestFormsModule,
    NgExtRouterModule.forRoot()
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
