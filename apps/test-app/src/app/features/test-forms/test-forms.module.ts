import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgExtFormsModule } from '@ng-ext/forms';
import { TestFormsComponent } from './test-forms.component';

@NgModule({
  declarations: [
    TestFormsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgExtFormsModule
  ],
})
export class TestFormsModule { }
