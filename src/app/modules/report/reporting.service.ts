import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IReportFullData, IResponse } from 'src/app/repository/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportingService {
  constructor(private http: HttpClient) {}

  getReport(id: number): Observable<IResponse<IReportFullData>> {
    return this.http.get<IResponse<IReportFullData>>(
      `${environment.apiUrl}/reports/${id}`
    );
  }

  sendEmail(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/reports/${id}/send-email`);
  }
}
