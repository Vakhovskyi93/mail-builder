import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, tap } from 'rxjs/operators';
import { IProjectData, IProjectReport, IReportFullData } from 'src/app/repository/interfaces';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import {
  NAME_UPDATE_ERROR,
  NAME_UPDATE_SUCCESS,
  REPORT_UPDATE_ERROR,
  REPORT_UPDATE_SUCCESS,
  REPORT_DELETE_SUCCESS,
  REPORT_DELETE_ERROR,
} from '../../page/projects-list/projects-list.component';
import { ProjectService } from '../../repository/projects.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() removeItemsCounter!: number;
  @Input() paginationLength!: number;
  @Input() form!: FormArray;
  @Input() data!: IProjectData[];
  @Input() selectionIndex!: number;
  @Input() dataSource!: MatTableDataSource<IProjectReport>;
  @Input() selection!: SelectionModel<IProjectReport>;
  @Output() updateselection: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  removeList: Array<number> = [];
  pageIndex = 0;
  pageAmount!: any;
  selectedReport!: IProjectData[];
  displayedColumns: string[] = [
    'selecte',
    'project_name',
    'client_name',
    'start_date',
    'end_date',
    'position',
    'symbol',
  ];
 

  @ViewChild('updateBtn') updateBtnTemplate!: ElementRef;
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private projectService: ProjectService,
    private snackbar: SnackBarService
  ) {}

  ngOnInit(): void {
    this.initTableData();
    
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  updateTickTime(item: IProjectData, e: HTMLButtonElement) {
    e.disabled = true;
    this.projectService
      .updateReportData(item.id)
      .pipe(
        finalize(() => {
          setTimeout(() => (e.disabled = false), 15000);
        })
      )
      .subscribe(
        () => {
          e.disabled = false;
          
          this.snackbar.openSnackBar({
            message: REPORT_UPDATE_SUCCESS,
            class: 'success',
          });
        },
        () => {
          this.snackbar.openSnackBar({
            message: REPORT_UPDATE_ERROR,
            class: 'danger',
          });
        }
      );
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.removeList = [];
    } else {
      const res = this.dataSource.data.slice(
        this.paginator.pageIndex * this.paginator.pageSize,
        (this.paginator.pageIndex + 1) * this.paginator.pageSize
      );

      res.forEach((row) => {
        this.selection.select(row);
        if (this.removeList.find((i) => i === row.id)) {
          null;
        } else {
          this.addToremoveList(row.id);
        }
      });
    }

    this.countItemForRemove();
  }

  previwEmail(item: IProjectReport) {
    this.router.navigate([`report/${item.id}`]);
  }

  delete() {
    const formData = new FormData();
    for (let i = 0; i < this.removeList.length; i++) {
      formData.append('ids[]', `${this.removeList[i]}`);
    }

    this.projectService.removeReport(formData).subscribe(
      () => {
        this.snackbar.openSnackBar({
          message: REPORT_DELETE_SUCCESS,
          class: 'success',
        });
        this.removeList.map((item) => {
          this.dataSource.data = this.dataSource.data.filter(
            (i) => i.id !== item
          );
          this.data.map((i) => {
            i.reports.map((e, ind) =>
              e.id === item ? i.reports.splice(ind, 1) : null
            );
          });
        });

        this.removeList = [];
        this.selection.clear();
        this.countItemForRemove();
      },
      (err) => {
        this.snackbar.openSnackBar({
          message: REPORT_DELETE_ERROR,
          class: 'danger',
        });
      }
    );
  }

  updateName(index: number, field: string) {
    const control = this.getControl(index, field);
    if (!control.valid) {
      return;
    }

    const name =
      control.value[0].toUpperCase() +
      control.value.slice(1, control.value.length).toLowerCase();

    const formData = new FormData();
    formData.append('client_name', name);

    this.spinner.show();
    this.projectService
      .updateName(formData, this.data[this.selectionIndex].id)
      .subscribe(
        (data) => {
          this.data = this.data.map((e, i) => {
            if (index === i) {
              e.client_name = name;
            }
            return e;
          });

          this.snackbar.openSnackBar({
            message: NAME_UPDATE_SUCCESS,
            class: 'success',
          });

          this.spinner.hide();
        },
        () => {
          this.snackbar.openSnackBar({
            message: NAME_UPDATE_ERROR,
            class: 'danger',
          });
        }
      );
  }

  getControl(index: number, field: string): FormControl {
    return this.form.at(index).get(field) as FormControl;
  }

  selectionClick(e: any, item: IProjectReport) {
    this.isAllSelected();
    this.selection.toggle(item);
    this.checkDoublItemsInRemoveList(item.id);
    this.countItemForRemove();
  }
  checkboxLabel(row?: IProjectReport): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }

  private initTableData(): void { 
    this.dataSource = new MatTableDataSource<IProjectReport>(
      this.data[this.selectionIndex].reports
    );
    
    this.paginationLength = this.dataSource.data.length;
  }

  private countItemForRemove() {
    this.removeItemsCounter = this.selection.selected.length;
  }

  private addToremoveList(id: number) {
    this.removeList.push(id);
  }

  private isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;
  }

  private checkDoublItemsInRemoveList(id: number): void {
    const res = this.removeList.find((i) => i === id);

    if (res) {
      this.removeList = this.removeList.filter((i) => i !== res);
    } else {
      this.addToremoveList(id);
    }
    this.countItemForRemove();
  }
}
