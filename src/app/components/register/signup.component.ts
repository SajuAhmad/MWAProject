import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { SignupService } from '../../service/signup.service';
import { Subscription, Observable } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'signup-app',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  registerForm: FormGroup;
  private subscription1: Subscription;
  private subscription2: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private chkSignup: SignupService
  ) {

    this.registerForm = this.formBuilder.group({
      email: ['example@email.com',
        [Validators.required,
        Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')]
        , this.asyncEmailValidator.bind(this)],
      username: ['', Validators.required, this.asyncUsernameValidator.bind(this), Validators.minLength(3)],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnDestroy(): void {
    // console.log('service ondestroy');
    if (this.subscription1 !== undefined)
      this.subscription1.unsubscribe();
    if (this.subscription2 !== undefined)
      this.subscription2.unsubscribe();
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit(): void {
    // console.log('SignupComponent.onSubmit()');
    this.subscription2 = this.chkSignup
      .insertUser(this.registerForm.value)
      .subscribe(data => {
        alert('Registered successfully');
        this.router.navigate(['login']);
      }, err => {
        alert(' ohh...:( something went wrong!!!');
      });
  }

  asyncEmailValidator(control: FormControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.chkSignup.isExist({ 'email': control.value })
      .pipe(debounceTime(200), map((emailExists: any) => {
        if (emailExists.isExist === true) {
          return {
            isExist: true
          };
        }
        return null;
      }));
  }

  asyncUsernameValidator(control: FormControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.chkSignup.isExist({ 'username': control.value })
      .pipe(debounceTime(200), map((emailExists: any) => {
        if (emailExists.isExist === true) {
          return {
            isExist: true
          };
        }
        return null;
      }));
  }
}
