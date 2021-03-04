import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkCookie()
  }

  checkCookie() {
    if (!this.cookieService.check("jwt")) {
      this.router.navigateByUrl("login")
    }
  }
}
