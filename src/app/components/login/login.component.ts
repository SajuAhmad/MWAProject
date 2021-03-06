import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../../service/signup.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'login-app',
  template: `
  <div class="container">
  <div class="row">
      <div class="col-xs-10">
          <h1>Login</h1>
          <hr>
            <form [formGroup]="loginForm" (ngSubmit) = "onSubmit()">
              Username:<br>
              <input formControlName="username" type="text"><br>
              Password:<br>
              <input formControlName="password" type="password" autocomplete="on">
              <br><br>
              <input [disabled]="!loginForm.valid" type="submit" value="Login">
              <a routerLink="/signup" class="btn btn-link">Register</a>
            </form>
          <hr>
          <pre>{{error_text}}</pre>
      </div>
  </div>
</div>
  `,
  styles: ['pre { font-weight: bold; color:red }']
})

export class LoginComponent implements OnDestroy {
  public loginForm: FormGroup;
  private subscription: Subscription;
  error_text;


  constructor(private fb: FormBuilder, private chkSignup: SignupService, private route: Router, private authService: AuthService) {
    this.loginForm = fb.group({
      'username': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    });
    this.error_text = ''
  }

  onSubmit(): void {
    //console.log('LoginComponent.onSubmit()');
    this.subscription = this.chkSignup.loginCheck(this.loginForm.value).subscribe((data: any) => {
      if (data.token) {
        this.authService.setToken(data.token)
        //console.log('LoginComponent.onSubmit().token:' + data.token);
        this.route.navigate(['home']);
      } else {
        this.error_text = 'Username or(and) password is not correct!!!'
        //console.log('LoginComponent.onSubmit(). NO TOKEN');
      }
    });
  }

  ngOnDestroy(): void {
    //console.log('LoginComponent.ngOnDestroy()');
    if (this.subscription !== undefined) { this.subscription.unsubscribe(); }
  }

}
