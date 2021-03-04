import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  tabIndex = 0

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    const username = this.validateForm.controls["userName"]
    const password = this.validateForm.controls["password"]

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (username.valid && password.valid) {
      console.log(username.value)
      console.log(password.value)
      this.userService.login(username.value, password.value).subscribe(str => console.log(str))
    }
  }
}
