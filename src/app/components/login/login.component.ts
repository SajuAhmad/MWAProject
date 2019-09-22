import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../../service/signup.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'login-app',
  template: `
  <div class="container">
  <div class="row">
      <div class="col-xs-10">
          <h1>Login Form</h1>
          <hr>
            <form [formGroup]="loginForm" (ngSubmit) = "onSubmit()">
              Username:<br>
              <input formControlName="username" type="text"><br>
              Password:<br>
              <input formControlName="password" type="password">
              <br><br>
              <input [disabled]="!loginForm.valid" type="submit" value="Login">
              <a routerLink="/signup" class="btn btn-link">Register</a>
            </form>
          <hr>
      </div>
  </div>
</div>
  `,
  providers: [SignupService],
  styles: []
})

export class LoginComponent implements OnDestroy {
  public loginForm: FormGroup;
  private subscription: Subscription;

  constructor(private fb: FormBuilder, private chkSignup: SignupService) {
    this.loginForm = fb.group({
      'username': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    console.log('login onsubmit');
    this.subscription = this.chkSignup.loginCheck(this.loginForm.value).subscribe((data: any) => {
      if (data.token) {
        localStorage.setItem('userToken', data.token);
      } else {
        console.log('user not valid');
      }
    });
  }

  ngOnDestroy(): void {
    console.log('service ondestroy');
    if (this.subscription !== undefined) { this.subscription.unsubscribe(); }
  }

}
