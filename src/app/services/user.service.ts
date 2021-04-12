import { Observable } from 'rxjs';
import { API } from './api';
import { user } from '@icfs/types/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

const JWT = "jwt"

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _activeUser!: user;

  constructor(
    private http: HttpClient
  ) { }

  userExists(): boolean {
    return this.activeUser != undefined
  }

  fetchUser(): Observable<user> {
    return this.http.get<user>(API.users, { withCredentials: true })
      .pipe(tap(u => this._activeUser = u))
  }

  login(user: string, pass: string): Observable<HttpResponse<user>> {
    return this.http.post<user>(
      API.login,
      { username: user, password: pass },
      { observe: 'response', withCredentials: true })
      .pipe(tap(resp => {
        if (resp.body != null && resp.ok)
          this._activeUser = resp.body
      }))
  }

  get activeUser(): user {
    return this._activeUser
  }

}
