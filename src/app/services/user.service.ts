import { Observable } from 'rxjs';
import { API } from './api';
import { user } from './../types/user';
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
  }

  login(user: string, pass: string): Observable<HttpResponse<user>> {
    return this.http.post<user>(
      API.login,
      { username: user, password: pass },
      { observe: 'response', withCredentials: true })
      .pipe(tap(userResp => console.log("headers:", userResp.headers)))
  }

  get activeUser(): user {
    return this._activeUser
  }

  set activeUser(u: user) {
    this._activeUser = u
  }
}
