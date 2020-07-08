import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpClient, HttpParams } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { Gremling } from './gremling'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    // 'Authorization': 'my-auth-token'
  })
};


@Injectable()
export class GremlingService {

  private REST_API_SERVER = environment.apiUrl+"/countGremlings";
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('GremlingService');
  
    }

  // countGremlings (): Observable<Gremling>{
  //   return this.http.get<Gremling>(this.REST_API_SERVER)
  //     .pipe(
  //       catchError(this.handleError('countGremlings', []))
  //   );
  // }

  getGremlings() {
    return this.http.get<Gremling>(this.REST_API_SERVER)
      .pipe(
        catchError(this.handleError('getGremlings'))
      );
  }

}
