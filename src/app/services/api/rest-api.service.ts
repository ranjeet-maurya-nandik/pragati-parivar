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
constructor(private http: HttpClient, private storage: StorageService) {}


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
      .pipe(delay(100),map((data: any) => (data)),catchError(this.handleError));
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
    
    if(auth_token) {
      headers = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${auth_token}`,
      });
      
    }
    
    return {
      headers: headers,
    };

  }
  
  public login(data:{}): any {
    return this.post(this.getApiUrl('login/'), data);
  }
  public userProfileApi(): any {
    return this.get(this.getApiUrl('profile/'));
  }

  // user management //

  public createUserApi(data:any){
    return this.post(this.getApiUrl('register/'),data)
  }

  public deleteUserApi(id:number){
    return this.post(this.getApiUrl(`user-profiles/delete/${id}/`), {})
  }
  public userDetailsApi(id:number){
    return this.get(this.getApiUrl(`user-profiles/details/${id}/`))
  }

  public userUpdateApi(id:number,data:{}){
    return this.post(this.getApiUrl(`user-profiles/update/${id}/`),data)
  }

  public userListAPi(){
    return this.get(this.getApiUrl('profile/list/'))
  }


  public r2bApi(){
    return this.get(this.getApiUrl('r2bform/list/?type=1'))
  }

  public referenceExchangedApi(){
    return this.get(this.getApiUrl('Reference/list/?type=1'))
  }

  public businessReportingApi(){
    return this.get(this.getApiUrl('BusinessReport/list/?type=1'))
  }

  public giveAskApi(){
    return this.get(this.getApiUrl('give-ask/list/?type=1'))
  }


}
