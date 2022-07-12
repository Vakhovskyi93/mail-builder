import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { UiComponentsModule } from 'src/app/components/ui-components.module';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    UiComponentsModule,
    RouterModule.forChild([{ path: '', component: NotFoundComponent }]),
  ],
  exports: [RouterModule],
})
export class NotFoundModule {}
