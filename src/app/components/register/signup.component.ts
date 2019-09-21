/*import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { SignupService } from '../../service/signup.service';
import { Subscription, Observable } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'signup-app',
  templateUrl: './signup.component.html',
  providers: [SignupService]
})

export class SignupComponent implements OnDestroy, OnInit {
  public signUpForm: FormGroup;
  private subscription1: Subscription;
  private subscription2: Subscription;

  constructor(private fb: FormBuilder, private chkSignup: SignupService) {
    const me = this;
    this.signUpForm = fb.group({
      username: ['', [Validators.required]],
      email: ['saju@example.com',
        [Validators.required,
        Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')]
        , this.asyncEmailValidator.bind(this)],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {

  }

  onSubmit(): void {
    console.log('signup onsubmit');
    this.subscription1 = this.chkSignup.checkEmail(this.signUpForm.get('email').value).subscribe((data: any) => {
      if (data.isExist !== true) {
        this.subscription2 = this.chkSignup.insertUser(this.signUpForm.value).subscribe(data => console.log(data));
      }
    });
  }

  asyncEmailValidator(control: FormControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.chkSignup.checkEmail(control.value)
      .pipe(debounceTime(200), map((emailExists: any) => {
        console.log("sds")
        if (emailExists.isExist === true) {
          return {
            isExist: true
          };
        }
        return null;
      }));
  }

  ngOnDestroy(): void {
    console.log('service ondestroy');
    if (this.subscription1 !== undefined)
      this.subscription1.unsubscribe();
    if (this.subscription1 !== undefined)
      this.subscription2.unsubscribe();
  }

}
*/

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { SignupService } from '../../service/signup.service';
import { Subscription, Observable } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

//import { AlertService, UserService, AuthenticationService } from '@/_services';

@Component({
  selector: 'signup-app',
  templateUrl: './signup.component.html',
  providers: [SignupService]
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  private subscription1: Subscription;
  private subscription2: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private chkSignup: SignupService,
    private authService: AuthService,
    //private userService: UserService,
    //private alertService: AlertService
  ) {

    this.registerForm = this.formBuilder.group({
      email: ['saju@example.com',
        [Validators.required,
        Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')]
        , this.asyncEmailValidator.bind(this)],
      username: ['', Validators.required, this.asyncUsernameValidator.bind(this)],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm.statusChanges.subscribe((data: any) => {
      console.log('registerForm.statusChanges():' + data)
    })

  }

  ngOnInit() {

  }
  ngOnDestroy(): void {
    console.log('service ondestroy');
    if (this.subscription1 !== undefined)
      this.subscription1.unsubscribe();
    if (this.subscription2 !== undefined)
      this.subscription2.unsubscribe();
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  /*
    onSubmit() {
      this.submitted = true;
  
      // reset alerts on submit
      this.alertService.clear();
  
      // stop here if form is invalid
      if (this.registerForm.invalid) {
        return;
      }
  
      this.loading = true;
      this.userService.register(this.registerForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('Registration successful', true);
            this.router.navigate(['/login']);
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
    }*/
  onSubmit(): void {
    console.log('signup onsubmit');
    this.subscription1 = this.chkSignup.checkEmail(this.registerForm.get('email').value).subscribe((data: any) => {
      if (data.isExist !== true) {
        console.error('SignupComponent.onSubmit().true:'+data);
        this.subscription2 = this.chkSignup.insertUser(this.registerForm.value).subscribe(data => {
          console.log('chkSignup.insertUser():'+data)
        
        });
      }else{
        console.error('SignupComponent.onSubmit().else:'+data);
      }
    });

    // redirect to home if already logged in
    if (this.authService.getToken() != null) {
      console.log('authService.getToken():' + this.authService.getToken())
      this.router.navigate(['/']);
    }

  }

  asyncEmailValidator(control: FormControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    console.log('SignupComponent.asyncEmailValidator().control.value:' + control.value)
    return this.chkSignup.checkEmail(control.value)
      .pipe(debounceTime(200), map((emailExists: any) => {

        if (emailExists.isExist === true) {
          console.log('emailExists.isExist === true')
          return {
            isExist: true
          };
        }
        console.log('emailExists.isExist === false')
        return null;
      }));
  }

  asyncUsernameValidator(control: FormControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    console.log('SignupComponent.asyncUsernameValidator().control.value:' + control.value)
    return this.chkSignup.checkUsername(control.value)
      .pipe(debounceTime(200), map((userExist: any) => {

        if (userExist.isExist === true) {
          console.log('userExist.isExist === true')
          return {
            isExist: true
          };
        }
        console.log('userExist.isExist === false')
        return null;
      }));
  }
}
