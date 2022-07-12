import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IProjectData,
  IProjectDataUpdated,
  IReportFullData,
  IResponse,
} from 'src/app/repository/interfaces';
import { ENVIRONMENT, IEnvironment } from 'src/app/tokens/environment.token';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(
    private http: HttpClient,
    @Inject(ENVIRONMENT) private environment: IEnvironment
  ) {}

  getProjects(): Observable<IResponse<IProjectData[]>> {
    return this.http.get<IResponse<IProjectData[]>>(
      `${this.environment.apiUrl}/projects`
    );
  }

  removeReport(removeId: FormData): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.environment.apiUrl}/reports/delete`,
      removeId
    );
  }

  updateEmail(
    data: FormData,
    id: number
  ): Observable<IResponse<IProjectDataUpdated>> {
    return this.http.post<IResponse<IProjectDataUpdated>>(
      `${this.environment.apiUrl}/projects/${id}`,
      data
    );
  }

  updateName(
    data: FormData,
    id: number
  ): Observable<IResponse<IProjectDataUpdated>> {
    return this.http.post<IResponse<IProjectDataUpdated>>(
      `${this.environment.apiUrl}/projects/${id}`,
      data
    );
  }

  updateReportData(id: number): Observable<IResponse<IReportFullData>> {
    return this.http.post<IResponse<IReportFullData>>(
      `${this.environment.apiUrl}/reports/${id}`,
      {}
    );
  }
}
