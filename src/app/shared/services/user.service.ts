import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { User } from '../models/user.model';
import {Observable} from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {MessagesService} from './messages.service';
import {appConfig} from '../../app.config';
import {catchError, map, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class UserService {
  private token: string;
  constructor(private messagesService: MessagesService,
              private http: HttpClient) { }

  private log(message: string): void {
    this.messagesService.add('UserService' + message);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getUser(_id: string): Observable<User> {
    const url = `${appConfig.apiUrl + '/users'}/${_id}`;
    return this.http.get<User>(url).pipe(
      tap(() => this.log(`fetched user id=${_id}`)),
      catchError(this.handleError<User>(`getUser id=${_id}`))
    );
  }
  updateUser(user: User): Observable<any> {
    return this.http.put(appConfig.apiUrl + '/users', user, httpOptions).pipe(
      tap(() => this.log(`updated user id=${user._id}`)),
      catchError(this.handleError<any>(`updateUser`))
    );
  }
  deleteUser(user: User | string): Observable<User> {
    const id = typeof user === 'string' ? user : user._id;
    const url = `${appConfig.apiUrl + '/users'}/${id}`;

    return this.http.delete<User>(url, httpOptions).pipe(
      tap(() => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>(`deleteUser`))
    );
  }
  addUser(user: User): Observable<User> {
    return this.http.post<User>(appConfig.apiUrl + '/users', user, httpOptions).pipe(
      tap(() => this.log(`added user id=${user._id}`)),
      catchError(this.handleError<User>(`addUser`))
    );
  }
  getAll() {
    return this.http.get<User[]>(appConfig.apiUrl + '/users');
  }
  getUserByEmail(email: string): Observable<User> {
    const url = `${appConfig.apiUrl + '/emailvalid'}/${email}`;
    return this.http.get(url)
      .map((user: User[]) => user[0] ? user[0] : undefined);
  }
  resetPassword(email: string) {
    const url = appConfig.apiUrl + '/reset';
    const formData: FormData = new FormData();
    formData.append('email', email);
    return this.http.post(url, formData);
  }
  updatePassword(user: User): Observable<any> {
    return this.http.put(appConfig.apiUrl + '/passwordUpdate', user, httpOptions).pipe(
      tap(() => this.log(`updated user id=${user._id}`)),
      catchError(this.handleError<any>(`updateUser`))
    );
  }
  postSocialUser(user: any) {
    return this.http.post<any>(appConfig.apiUrl + '/usersSocial', user, httpOptions)
      .map(data => {
        if (data && data.token) {
          localStorage.setItem('currentUser', JSON.stringify(data));
        }
        return data;
      });
  }
}
