import { Observable, of } from 'rxjs';
import { API } from './api';
import { user } from '@icfs/types/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

const JWT = 'jwt';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _activeUser: user | null = null;

  constructor(private http: HttpClient) {}

  // getUser(): Observable<user> {
  //   if (this.activeUser != null) return of(this.activeUser);

  // }

  userExists(): boolean {
    return this.activeUser != null;
  }

  fetchUser(): Observable<HttpResponse<user>> {
    return this.http
      .get<user>(API.users, { observe: 'response', withCredentials: true })
      .pipe(
        tap((resp) => {
          if (resp.body != null && resp.ok) this._activeUser = resp.body;
        })
      );
  }

  login(user: string, pass: string): Observable<HttpResponse<user>> {
    return this.http
      .post<user>(
        API.login,
        { username: user, password: pass },
        { observe: 'response', withCredentials: true }
      )
      .pipe(
        tap((resp) => {
          if (resp.body != null && resp.ok) this._activeUser = resp.body;
        })
      );
  }

  get activeUser(): user | null {
    return this._activeUser;
  }
}
