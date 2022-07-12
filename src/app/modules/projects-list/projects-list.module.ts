import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiComponentsModule } from 'src/app/components/ui-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectsListComponent } from './page/projects-list/projects-list.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CustomSlicePipe } from 'src/app/utils/custom-slice.pipe';
import { ProjectsComponent } from './components/projects/projects.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    ProjectsListComponent,
    CustomSlicePipe,
    ProjectsComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    UiComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: ProjectsListComponent }]),
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
  ],
  exports: [RouterModule],
})
export class ProjectsListModule {}
