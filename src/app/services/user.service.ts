import { BehaviorSubject, Observable } from 'rxjs';
import { API } from './api';
import { User } from '@icfs/types/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private activeUser = new BehaviorSubject<User>(new User());

  constructor(private http: HttpClient) {}

  getUser(): Observable<User> {
    return this.activeUser.asObservable();
  }

  fetchUser(): Observable<HttpResponse<User>> {
    return this.http.get<User>(API.users, { observe: 'response', withCredentials: true }).pipe(
      tap((resp) => {
        if (resp.body != null && resp.ok) this.activeUser.next(resp.body);
      })
    );
  }

  login(user: string, pass: string): Observable<HttpResponse<User>> {
    return this.http
      .post<User>(
        API.login,
        { username: user, password: pass },
        { observe: 'response', withCredentials: true }
      )
      .pipe(
        tap((resp) => {
          if (resp.body != null && resp.ok) {
            this.activeUser.next(resp.body);
            console.log('from login: ', resp.body);
          }
        })
      );
  }

  logout(): Observable<HttpResponse<any>> {
    return this.http.post(API.logout, {}, { observe: 'response', withCredentials: true }).pipe(
      tap((resp) => {
        if (resp.ok) {
          this.activeUser.next(new User());
        }
      })
    );
  }
}
