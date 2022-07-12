import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './page/report/report.component';
import { RouterModule } from '@angular/router';
import { UiComponentsModule } from 'src/app/components/ui-components.module';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    UiComponentsModule,
    MatIconModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: ReportComponent }]),
  ],
  exports: [RouterModule],
})
export class ReportingModule {}
