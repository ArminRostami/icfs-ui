import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@icfs/services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit, OnDestroy {
  validateForm!: FormGroup;
  tabIndex = 0;
  private unsub = new Subject();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.checkMode();
    this.setValidators();
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
          .subscribe((resp) => {
            console.log(resp.body);
          });
      }
    });
  }

  setValidators() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  submitForm(): void {
    const username = this.validateForm.controls['userName'];
    const password = this.validateForm.controls['password'];

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (username.valid && password.valid) {
      console.log('API base:', environment.baseUrl);

      console.log(username.value);
      console.log(password.value);
      this.userService
        .login(username.value, password.value)
        .pipe(takeUntil(this.unsub))
        .subscribe((resp) => {
          if (resp.body != null && resp.ok) {
            this.router.navigateByUrl('home');
          }
        });
    }
  }
}
