import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  auth_token: any;
  constructor(private http: HttpClient, private storage: StorageService) { }


  private getApiUrl(endpoint: string): any {
    return `${environment.api.url}${endpoint}`;
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    } else {
      if (error.status == 401) {
        localStorage.clear();
        window.location.reload();
      }

    }

    return throwError(error);

  }

  private get(endpoint: string): any {
    return this.http.get(endpoint, this.reqHeaders())
      .pipe(delay(100), map((data: any) => (data)), catchError(this.handleError));
  }

  private get_non(endpoint: string): any {
    return this.http.get(endpoint, this.reqHeaders())
      .pipe(catchError(this.handleError));
  }

  private postNon(endpoint: string): any {
    return this.http.post(endpoint, this.reqHeaders())
      .pipe(
        delay(100),
        map((data: any) => (data || data)),
        catchError(this.handleError)
      );
  }
  private post(endpoint: string, body: {}): any {
    return this.http.post(endpoint, body, this.reqHeaders())
      .pipe(
        delay(100),
        map((data: any) => (data || data)),
        catchError(this.handleError)
      );
  }

  private reqHeaders() {
    const auth_token = this.storage.get('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (auth_token) {
      headers = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${auth_token}`,
      });

    }

    return {
      headers: headers,
    };

  }



  public login(data: {}): any {
    return this.post(this.getApiUrl('login'), data);
  }
  public userProfileApi(): any {
    return this.get(this.getApiUrl('profile/'));
  }

  // dashboard //

  public dashboardApi(data:any) {
    return this.get(this.getApiUrl(`web/home/dashboard?r2b_frequency=${data.r2b_frequency}&br_frequency=${data.br_frequency}&ref_ex_frequency=${data.ref_ex_frequency}&wing_id=${data.wing_id}`))
  }

  // user management //


  public userListAPi() {
    return this.get(this.getApiUrl('user/list'))
  }
  public userDetailsApi(id: number) {
    return this.get(this.getApiUrl(`user/details/${id}`))
  }

  public deleteUserApi(id: number) {
    return this.get(this.getApiUrl(`user/delete/${id}`))
  }

  public createUserApi(data: any) {
    return this.post(this.getApiUrl('user/register'), data)
  }


  // wing mangement //
  wingListApi() {
    return this.get(this.getApiUrl('web/wing/list'))
  }
  public createWingApi(data: any) {
    return this.post(this.getApiUrl('web/wing/create'), data)
  }

  public wingDetailsApi(id: number) {
    return this.get(this.getApiUrl(`web/wing/details/${id}`))
  }

  public deleteWingApi(id: number) {
    return this.get(this.getApiUrl(`web/wing/delete/${id}`))
  }


  // wing mangement //
  meetingListApi() {
    return this.get(this.getApiUrl('web/meeting/list'))
  }

  public createMeetingApi(data: any) {
    return this.post(this.getApiUrl('web/meeting/create'), data)
  }

  public meetingDetailsApi(id: number) {
    return this.get(this.getApiUrl(`web/meeting/details/${id}`))
  }

  public deleteMeetingApi(id: number) {
    return this.get(this.getApiUrl(`web/meeting/delete/${id}`))
  }


  // r2b //


  public r2bApi(data: any) {
    return this.get(this.getApiUrl(`web/r2b/list?date=${data.date}`))
  }

  public r2bDetailsApi(id: number) {
    return this.get(this.getApiUrl(`web/r2b/details/${id}`))
  }

  public referenceExchangedApi(data: any) {
    return this.get(this.getApiUrl(`web/refernce/list?date=${data.date}`))
  }
  public referenceDetailsApi(id: number) {
    return this.get(this.getApiUrl(`web/refernce/details/${id}`))
  }
  public businessReportingApi(data: any) {
    return this.get(this.getApiUrl(`web/b_report/list?date=${data.date}`))
  }
  public bReportingDetailsApi(id: number) {
    return this.get(this.getApiUrl(`web/b_report/details/${id}`))
  }

  public giveAskApi(data: any) {
    return this.get(this.getApiUrl(`web/give_ask/list?date=${data.date}`))
  }
  public giveAskDetailsApi(id: number) {
    return this.get(this.getApiUrl(`web/give_ask/details/${id}`))
  }


  // total report count //
  public reportCountApi() {
    return this.get(this.getApiUrl(`web/reports/count`))
  }

   //  reports //

  public r2bReportApi() {
    return this.get(this.getApiUrl(`web/reports/r2b_summary`))
  }

  public r2bReportSummeryApi(data:{user_id:number,type:number}) {
    return this.get(this.getApiUrl(`web/reports/r2b_summary/userwise?user_id=${data.user_id}&type=${data.type}`))
  }
  public referenceReportApi() {
    return this.get(this.getApiUrl(`web/reports/ref_ex_summary`))
  }
  public referenceReportSummeryApi(data:{user_id:number,type:number}) {
    return this.get(this.getApiUrl(`web/reports/ref_ex_summary/userwise?user_id=${data.user_id}&type=${data.type}`))
  }
  
  public businessReportApi() {
    return this.get(this.getApiUrl(`web/reports/b_reporting/summary`))
  }
  public businessReportSummeryApi(data:{user_id:number,type:number}) {
    return this.get(this.getApiUrl(`web/reports/b_reporting/userwise?user_id=${data.user_id}&type=${data.type}`))
  }
  
}
