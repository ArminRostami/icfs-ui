import { API } from './api';
import { CookieService } from 'ngx-cookie-service';
import { user } from './../types/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const JWT = "jwt"

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _activeUser!: user;

  constructor(
    private cookieService: CookieService,
    private httpClient: HttpClient
  ) { }

  fetchUser() {
    if (this.activeUser == null) {
      return this.httpClient.get<user>(API.users)
    }
    return
  }

  login(user: string, pass: string) {
    return this.httpClient.post<string>(API.login, { username: user, password: pass })
  }

  get activeUser() {
    return this._activeUser
  }

  set activeUser(u: user) {
    this._activeUser = u
  }
}
