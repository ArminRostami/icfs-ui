import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@icfs/services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginFormGroup: FormGroup;
  private unsub = new Subject();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private msg: NzMessageService
  ) {
    this.loginFormGroup = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  ngOnInit() {
    this.checkMode();
  }

  ngOnDestroy() {
    this.unsub.next();
    this.unsub.complete();
  }

  checkMode() {
    this.route.params.subscribe((params) => {
      if (params['mode'] == 'logout') {
        this.userService
          .logout()
          .pipe(takeUntil(this.unsub))
          .subscribe(
            (resp) => {
              console.log(resp.body);
              this.msg.success('Logout successful.');
            },
            (_) => {
              this.msg.error('Logout failed.');
            }
          );
      }
    });
  }

  submitForm(): void {
    const username = this.loginFormGroup.controls['username'];
    const password = this.loginFormGroup.controls['password'];

    for (const i in this.loginFormGroup.controls) {
      this.loginFormGroup.controls[i].markAsDirty();
      this.loginFormGroup.controls[i].updateValueAndValidity();
    }

    if (username.valid && password.valid) {
      console.log(username.value);
      console.log(password.value);
      this.userService
        .login(username.value, password.value)
        .pipe(takeUntil(this.unsub))
        .subscribe(
          (resp) => {
            if (resp.body != null && resp.ok) {
              this.msg.success('Login successful.');
              this.router.navigateByUrl('home');
            } else {
              this.msg.error('Login failed! check you username and password.');
            }
          },
          (_) => {
            this.msg.error('Login failed! check you username and password.');
          }
        );
    }
  }
}
