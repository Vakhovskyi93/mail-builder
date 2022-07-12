import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IUser, IResponse } from 'src/app/repository/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}

  login(data: FormData): Observable<IResponse<IUser>> {
    return this.http.post<IResponse<IUser>>(
      `${environment.apiUrl}/login`,
      data
    );
  }
}
