import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterseptor implements HttpInterceptor {
  constructor(private router: Router, private spinner: NgxSpinnerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const customRequest = req.clone({
      headers: req.headers.append('Accept', 'application/json'),
    });

    return next.handle(customRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        this.spinner.hide();
        if (error.status === 401 || error.status === 403) {
          this.router.navigate(['/']);
          return throwError(error);
        }
        return throwError(error);
      })
    );
  }
}
