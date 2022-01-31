import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgExtCoreModule } from '@ng-ext/core';
import { NgExtFormsModule } from '@ng-ext/forms';
import { SubFormComponent } from './components/sub-form/sub-form.component';
import { TestFormsComponent } from './test-forms.component';

@NgModule({
  declarations: [
    SubFormComponent,
    TestFormsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgExtFormsModule,
    NgExtCoreModule.forRoot(),
    ReactiveFormsModule
  ]
})
export class TestFormsModule { }
