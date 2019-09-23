import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { SignupService } from '../../service/signup.service';
import { Subscription, Observable } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

//import { AlertService, UserService, AuthenticationService } from '@/_services';

@Component({
  selector: 'signup-app',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  private subscription1: Subscription;
  private subscription2: Subscription;
  dialogRef: MatDialogRef<DialogComponent>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private chkSignup: SignupService,
    private authService: AuthService,
    private dialog: MatDialog
    //private userService: UserService,
    //private alertService: AlertService
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

    // this.registerForm.statusChanges.subscribe((data: any) => {
    //   console.log('registerForm.statusChanges():' + data)
    // })

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

  openDialog() {
    this.dialogRef = this.dialog.open(DialogComponent);
  }
  onSubmit(): void {
    console.log('SignupComponent.onSubmit()');

    this.subscription2 = this.chkSignup
      .insertUser(this.registerForm.value)
      .subscribe(data => {
        console.log('chkSignup.insertUser():' + data)
        //this.alertService.success('Registration successful', true);
        this.openDialog()
        setTimeout(() => {
          this.router.navigate(['login']);
          this.dialogRef.close();
        }, 2500);
        //new DialogComponent(this.router,this.authService, this)


      }, err => {
        //this.alertService.error(err);
      });

    // redirect to home if already logged in
    if (this.authService.getToken() != null) {
      console.log('authService.getToken():' + this.authService.getToken())
      this.router.navigate(['home']);
    }

  }

  asyncEmailValidator(control: FormControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    //console.log('SignupComponent.asyncEmailValidator()')
    return this.chkSignup.isExist({ 'email': control.value })
      .pipe(debounceTime(200), map((emailExists: any) => {
        if (emailExists.isExist === true) {
          //console.log('emailExists.isExist === true')
          return {
            isExist: true
          };
        }
        //console.log('emailExists.isExist === false')
        return null;
      }));
  }

  asyncUsernameValidator(control: FormControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    //console.log('SignupComponent.asyncUsernameValidator()')
    return this.chkSignup.isExist({ 'username': control.value })
      .pipe(debounceTime(200), map((emailExists: any) => {

        if (emailExists.isExist === true) {
          //console.log('emailExists.isExist === true')
          return {
            isExist: true
          };
        }
        //console.log('emailExists.isExist === false')
        return null;
      }));
  }
}
