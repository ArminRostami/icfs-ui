import { UserService } from '@icfs/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { User } from '@icfs/types/user';

@Component({
  selector: 'app-home',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
})
export class LayoutComponent implements OnInit {
  private unsub = new Subject();
  isCollapsed = false;
  activeUser = new User();

  constructor(private us: UserService, private router: Router, private msg: NzMessageService) {}

  ngOnInit() {
    this.checkUser();
  }

  checkUser() {
    this.us.userStream$.pipe(takeUntil(this.unsub)).subscribe((user) => {
      if (user.username !== '') {
        this.activeUser = user;
        return;
      }
      this.us
        .fetchUser()
        .pipe(takeUntil(this.unsub))
        .subscribe(
          (user) => {
            if (user.username === '') {
              this.router.navigateByUrl('/login');
            }
          },
          (_) => {
            this.router.navigateByUrl('/login');
          }
        );
    });
  }

  logout() {
    console.log('logout pressed');
    this.us
      .logout()
      .pipe(takeUntil(this.unsub))
      .subscribe(
        (resp) => {
          console.log(resp.body);
          this.msg.success('Logout successful.');
          this.router.navigateByUrl('/login');
        },
        (_) => {
          this.msg.error('Logout failed.');
        }
      );
  }
}
