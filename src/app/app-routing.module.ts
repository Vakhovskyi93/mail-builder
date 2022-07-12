import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuards } from './auth.guard';
import { LoginedGuards } from './logined.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [LoginedGuards]
  },
   
  {
    path: 'projects',
    loadChildren: () => import('./modules/projects-list/projects-list.module').then((m) => m.ProjectsListModule),
    canActivate: [AuthGuards]
  },
  
  {
    path: 'report/:id',
    loadChildren: () => import('./modules/report/reporting.module').then((m) => m.ReportingModule),
    canActivate: [AuthGuards]
  }
  ,
  
  {
    path: '**',
    loadChildren: () => import('./modules/404/not-found.module').then((m) => m.NotFoundModule),
    canActivate: [AuthGuards]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
