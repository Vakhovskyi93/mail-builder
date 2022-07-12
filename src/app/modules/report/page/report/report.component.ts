import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { iif, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { PATTERN_FOR_EMAIL } from 'src/app/app.constants';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { SendMailModalComponent } from 'src/app/components/send-mail-modal/send-mail-modal.component';
import {
  EMAIL_UPDATE_ERROR,
  EMAIL_UPDATE_SUCCESS,
} from 'src/app/modules/projects-list/page/projects-list/projects-list.component';
import { ProjectService } from 'src/app/modules/projects-list/repository/projects.service';
import {
  IReportFullData,
  IUserRecordData,
} from 'src/app/repository/interfaces';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { WINDOW } from 'src/app/tokens/window.token';
import { ReportingService } from '../../reporting.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  @ViewChild('button') button!: ElementRef;

  sendButtonValue = 'Send';
  buttonIcon = 'send';
  emailPlaceholder = 'Please enter email addresses of the destination';
  logoColor = 'white';
  disabled = false;

  data!: IReportFullData;
  dataSub!: Subscription;
  reports!: IUserRecordData[];
  projectId!: number;
  errorMessage?: HttpErrorResponse;

  constructor(
    private reportService: ReportingService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private snackbar: SnackBarService,
    private router: Router,
    private projectService: ProjectService,
    @Inject(WINDOW) public window: Window
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.dataSub = this.activatedRoute.params
      .pipe(
        tap((params) => {
          this.spinner.show();
          this.projectId = params.id;
        }),
        switchMap(() => {
          return this.reportService.getReport(this.projectId);
        })
      )
      .subscribe(
        (res) => {
          this.data = res.data;
          this.reports = this.data.entries;
          this.spinner.hide();
          this.initForm();
        },
        (err) => {
          this.spinner.hide();
          this.errorMessage = err;
        }
      );
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
  }

  updateField() {
    this.spinner.show();
    const formData = new FormData();
    formData.append('client_email', this.form.value.email);
    this.projectService.updateEmail(formData, this.data.project.id).subscribe(
      (data) => {
        this.data.project.client_email = this.form.value.email;
        this.spinner.hide();
        this.snackbar.openSnackBar({
          message: EMAIL_UPDATE_SUCCESS,
          class: 'success',
        });
      },
      (err) => {
        this.spinner.hide();
        this.snackbar.openSnackBar({
          message: EMAIL_UPDATE_ERROR,
          class: 'danger',
        });
      }
    );
  }

  closeModal() {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { component: SendMailModalComponent },
    });

    dialogRef
      .afterClosed()
      
      .subscribe(
        (data)=>{
          this.spinner.show();
          this.disabled = true;
           if(data){
             this.sendEmail()
           }
           else{
            this.disabled = false;
            this.spinner.hide();
           }
        }
      );
  }
  sendEmail(){
    this.reportService.sendEmail(this.data.id).subscribe(
      (result) => {
        this.spinner.hide();
        this.window.scrollTo({ top: 0 });
        this.snackbar.openSnackBar({
          message: `Report "${this.data.project.name}" has been sent`,
          class: 'success',
        });
        this.disabled = false;
        this.router.navigate(['/projects']);
      },
      (err) => {
        this.disabled = false;
        this.snackbar.openSnackBar({
          message: `Report "${this.data.project.name}" has no been sent`,
          class: 'danger',
        });
      }
    );
  }

  private initForm() {
    

    this.form = new FormGroup({
      email: new FormControl(this.data.project.client_email, [
        Validators.required,
        Validators.pattern(PATTERN_FOR_EMAIL),
      ]),
    });
  }
}
