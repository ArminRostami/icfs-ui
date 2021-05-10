import { User } from '@icfs/types/user';
import { UserService } from '@icfs/services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  loggedIn = false;
  activeUser = new User();
  private unsub = new Subject();

  constructor(private us: UserService, private router: Router) {}

  ngOnInit(): void {
    this.checkUser();
  }

  ngOnDestroy() {
    this.unsub.next();
    this.unsub.complete();
  }

  checkUser() {
    this.us.getUser$.pipe(takeUntil(this.unsub)).subscribe((user) => {
      console.log('user is ', user);

      if (user.id !== '') {
        this.activeUser = user;
        console.log('changed user to ', this.activeUser);

        this.loggedIn = true;
        return;
      }
      this.us
        .fetchUser()
        .pipe(takeUntil(this.unsub))
        .subscribe(
          (resp) => {
            if (!resp.ok) {
              this.router.navigateByUrl('auth/login');
            }
          },
          (_) => {
            this.router.navigateByUrl('auth/login');
          }
        );
    });
  }
}
