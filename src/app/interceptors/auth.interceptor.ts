import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  userToken?: string | null;
  constructor(private userService: UserService) {
    this.userService.isAuth.subscribe((user) => {
      this.userToken = user;
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let customRequest = req.clone();

    if (this.userToken) {
      customRequest = req.clone({
        headers: req.headers.append(
          'Authorization',
          `Bearer ${this.userToken}`
        ),
      });
    }

    return next.handle(customRequest).pipe();
  }
}
