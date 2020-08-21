import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from './user'
import { Response } from './response'

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  private apiServer = "https://reqres.in/api/users";
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  create(user): Observable<User> {
    return this.httpClient.post<User>(this.apiServer, JSON.stringify(user), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAll(): Observable<Response> {
    return this.httpClient.get<Response>(this.apiServer, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  update(id, user): Observable<boolean> {
    return this.httpClient.put<boolean>(this.apiServer, JSON.stringify(user), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.apiServer + '/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
}
