import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { SignupService } from '../../service/signup.service';
import { Subscription, Observable } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'signup-app',
  templateUrl: 'signup.component.html',
  providers: [SignupService]
})

export class SignupComponent implements OnDestroy, OnInit {
  public signUpForm: FormGroup;
  private subscription1: Subscription;
  private subscription2: Subscription;

  constructor(private fb: FormBuilder, private chkSignup: SignupService) {
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
