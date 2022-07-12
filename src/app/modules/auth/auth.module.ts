import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiComponentsModule } from 'src/app/components/ui-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './page/login/login.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [LoginComponent, FormComponent],
  imports: [
    CommonModule,
    UiComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: LoginComponent }]),
  ],
  exports: [RouterModule],
})
export class AuthModule {}
