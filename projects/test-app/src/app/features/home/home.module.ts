import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgExtCoreModule } from '@ng-ext/core';
import { TestTemplateComponent } from './components/test-template/test-template.component';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent, TestTemplateComponent],
  imports: [CommonModule, NgExtCoreModule],
})
export class HomeModule {}
