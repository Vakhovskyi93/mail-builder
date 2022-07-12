import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { PATTERN_FOR_EMAIL } from 'src/app/app.constants';
import { IProjectData, IProjectReport } from 'src/app/repository/interfaces';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { ProjectService } from '../../repository/projects.service';

export type IProjectReportWithName = IProjectReport & { project_name: string };

export const EMAIL_UPDATE_ERROR = 'Email has not been changed!';
export const EMAIL_UPDATE_SUCCESS = "Client's email has successfully changed.";
export const NAME_UPDATE_SUCCESS = "Client's name has successfully changed.";
export const NAME_UPDATE_ERROR = 'Name has not been changed!';
export const REPORT_DELETE_SUCCESS = 'Report has successfully deleted.';
export const REPORT_DELETE_ERROR = 'Report has not been deleted!';
export const REPORT_UPDATE_SUCCESS = "Report's data has successfully changed.";
export const REPORT_UPDATE_ERROR = "Report's data has not been changed!";
@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent implements OnInit, OnDestroy {
  none = false;
  viewMode = true;
  projectsListView = false;
  removeList: Array<number> = [];
  removeItemsCounter = 0;

  // FORM
  form!: FormArray;

  // PAGINATION
  paginationLength!: number;
  pageIndex = 0;
  pageAmount!: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // PROJECT
  @ViewChild('projectList')
  projectListTemplate!: ElementRef;
  projectListScroll = 0;

  // DATA
  data!: IProjectData[];
  dataSub!: Subscription;
  selectedReport!: IProjectData[];
  selectionIndex = 0;

  dataSource!: MatTableDataSource<IProjectReport>;
  selection = new SelectionModel<IProjectReport>(true, []);

  constructor(
    private spinner: NgxSpinnerService,
    private projectService: ProjectService,
    private snackbar: SnackBarService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.dataSub = this.projectService.getProjects().subscribe((res) => {
      this.spinner.hide();
      this.data = res.data;
      this.selectedReport = [res.data[0]];
      this.initForm();
    });
  }
  ngOnDestroy() {
    this.dataSub?.unsubscribe();
  }

  selectProject(item: IProjectData, index: any) {
    this.removeList = [];
    if (!item) {
      alert('No projects!');
      return;
    }

    this.selectionIndex = index;
    this.dataSource = new MatTableDataSource<IProjectReport>(
      this.data[this.selectionIndex].reports
    );
    this.removeItemsCounter = 0;
    this.selection.clear();
    this.selectedReport[0] = item;
  }

  countItemForRemove() {
    this.removeItemsCounter = this.selection.selected.length;
  }

  getControl(index: number, field: string): FormControl {
    return this.form.at(index).get(field) as FormControl;
  }

  emailUpdate(e: Event) {
    this.updateEmail(Number(e), 'email');
  }

  updateEmail(index: number, field: string) {
    console.log('1');
    // client_email
    
    

    const control = this.getControl(index, 'email');
    console.log(control.value, this.data[this.selectionIndex].client_email);
    
    if (control.valid && (control.value !== this.data[this.selectionIndex].client_email) ) {
      this.spinner.show();
      const formData = new FormData();
      formData.append('client_email', control.value);

      this.projectService
        .updateEmail(formData, this.data[this.selectionIndex].id)
        .subscribe(
          (data) => {
            this.data = this.data.map((e, i) => {
              if (index === i) {
                e.client_email = control.value;
                this.snackbar.openSnackBar({
                  message: EMAIL_UPDATE_SUCCESS,
                  class: 'success',
                });
              }
              return e;
            });
            this.spinner.hide();
          },
          (err) => {
            this.snackbar.openSnackBar({
              message: EMAIL_UPDATE_ERROR,
              class: 'danger',
            });
          }
        );
    }
  }

  viewList() {
    this.projectsListView = !this.projectsListView;
    
    if(this.data){
      !this.projectsListView
      ? this.projectListTemplate.nativeElement.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      : null;
    }
     
  }

  updateselection(e: number) {
    this.selectionIndex = e;
  }

  private initForm(): void {
    const toGroups = this.data.map((item, index) => {
      return new FormGroup({
        email: new FormControl(item.client_email, [
          Validators.required,
          Validators.pattern(PATTERN_FOR_EMAIL),
        ]),
        client_name: new FormControl(item.client_name, [
          Validators.required,
          Validators.required,
        ]),
      });
    });
    this.form = new FormArray(toGroups);
    this.getControl(0, 'email');
  }
}
