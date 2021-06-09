import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@icfs/services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class RegisterComponent implements OnDestroy {
  registerFormGroup: FormGroup;
  private unsub = new Subject();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private msg: NzMessageService
  ) {
    this.registerFormGroup = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      username: [null, [Validators.required]],
      agree: [false],
    });
  }

  ngOnDestroy() {
    this.unsub.next();
    this.unsub.complete();
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() =>
      this.registerFormGroup.controls.checkPassword.updateValueAndValidity()
    );
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.registerFormGroup.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  resetFields() {
    for (const i in this.registerFormGroup.controls) {
      this.registerFormGroup.controls[i].reset();
    }
  }

  submitForm(): void {
    for (const i in this.registerFormGroup.controls) {
      const control = this.registerFormGroup.controls[i];
      control.markAsDirty();
      control.updateValueAndValidity();
      if (!control.valid) {
        return;
      }
    }

    if (!this.registerFormGroup.controls['agree'].value) {
      return;
    }

    const username = this.registerFormGroup.controls['username'].value;
    const password = this.registerFormGroup.controls['password'].value;
    const email = this.registerFormGroup.controls['email'].value;

    console.log(username, password, email);

    this.userService
      .register(username, password, email)
      .pipe(takeUntil(this.unsub))
      .subscribe(
        (resp) => {
          console.log(resp);
          this.resetFields();
          this.msg.success('Registration done.');
        },
        (err) => {
          console.log(err);
          this.msg.error('Failed to register.');
        }
      );
  }
}
