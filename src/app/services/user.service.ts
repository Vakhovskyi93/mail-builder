import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../repository/interfaces';

@Injectable()
export class UserService {
  private user = new BehaviorSubject<IUser | null>(null);
  userObservable: Observable<IUser | null> = this.user.asObservable();

  private getToken = new BehaviorSubject<string | null>(null);

  get isAuth(): Observable<string | null> {
    return this.getToken.asObservable();
  }

  get userName(): Observable<IUser | null> {
    return this.user;
  }

  set setToken(value: string | null) {
    this.getToken.next(value);
  }

  set setTokenToLocalStorage(token: string) {
    localStorage.setItem('mail_builder_token', token);
  }

  constructor(private router: Router) {
    this.setToken = localStorage.getItem('mail_builder_token');
    if (localStorage.getItem('user-name')) {
      this.user.next({
        name: localStorage.getItem('user-name') as string,
        access_token: '',
      });
    }
  }

  setUserInfo(user: IUser): void {
    this.user.next(user);
    this.setTokenToLocalStorage = user.access_token;
    localStorage.setItem('user-name', user.name);
    this.setToken = user.access_token;
  }

  removeToken() {
    localStorage.removeItem('mail_builder_token');
    this.setToken = null;
    void this.router.navigateByUrl('/');
  }
}
