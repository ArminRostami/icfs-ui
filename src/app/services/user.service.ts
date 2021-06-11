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
  private userStream: BehaviorSubject<User>;
  userStream$: Observable<User>;

  constructor(private http: HttpClient) {
    this.userStream = new BehaviorSubject<User>(new User());
    this.userStream$ = this.userStream.asObservable();
  }

  fetchUser(): Observable<HttpResponse<User>> {
    return this.http.get<User>(API.users, { observe: 'response', withCredentials: true }).pipe(
      tap((resp) => {
        if (resp.body != null && resp.ok) this.setActiveUser('fetch', resp.body);
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
            this.setActiveUser('login', resp.body);
          }
        })
      );
  }

  logout(): Observable<HttpResponse<any>> {
    return this.http.post(API.logout, {}, { observe: 'response', withCredentials: true }).pipe(
      tap((resp) => {
        if (resp.ok) {
          this.setActiveUser('logout', new User());
        }
      })
    );
  }

  register(username: string, password: string, email: string): Observable<HttpResponse<any>> {
    return this.http.post(API.register, { username, password, email }, { observe: 'response' });
  }

  setActiveUser(caller: string, user: User) {
    this.userStream.next(user);
    console.log(`user being emitted from ${caller}: `, user);
  }
}
