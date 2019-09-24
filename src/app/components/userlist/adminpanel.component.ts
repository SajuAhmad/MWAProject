import { Component, OnDestroy, Input } from '@angular/core';
import { SignupService } from 'src/app/service/signup.service';
import { Subscription, Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css'],
  providers: [SignupService]
})
export class AdminPanelComponent implements OnDestroy {
  private subscription: Subscription;
  users: any;
  categories: any;
  myForm: FormGroup;

  constructor(private service: SignupService, private formBuilder: FormBuilder) {
    this.getUserList()
    this.getCategories()

    this.myForm = formBuilder.group({
      name: ['', Validators.required, this.asyncCategoryValidator.bind(this), Validators.minLength(3)],
    });
  }

  getUserList(): void {
    // console.log('UserlistComponent.constructor()')
    this.subscription = this.service.getUserList().subscribe((data: any) => {
      this.users = data;
    });
  }

  getCategories(): void {
    this.subscription = this.service.getCategories({}).subscribe((data: any) => {
      this.categories = data;
    });
  }

  ngOnDestroy() {
    // console.log('protected onDestroy');
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  onRoleChange(user): void {
    // console.log('AdminPanelComponent.onRoleChange()')
    user.role = (user.role === 'admin') ? 'user' : 'admin';
    this.subscription = this.service.updateUser(user).subscribe((data: any) => {
      this.getUserList()
    });
  }

  onStatusChange(user): void {
    // console.log('AdminPanelComponent.onStatusChange()')
    user.active = !user.active;
    this.subscription = this.service.updateUser(user).subscribe((data: any) => {
      this.getUserList()
    });
  }

  addCategory(data): void {
    // console.log('AdminPanelComponent.addCategory():' + JSON.stringify(this.myForm.value))
    this.subscription = this.service.addCategory(this.myForm.value).subscribe((data: any) => {
      this.getCategories()
      this.myForm.reset()
    });
  }

  deleteCategory(data): void {
    // console.log('AdminPanelComponent.deleteCategory():' + JSON.stringify(this.myForm.value))
    this.subscription = this.service.deleteCategory(this.myForm.value).subscribe((data: any) => {
      this.getCategories()
      this.myForm.reset()
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.myForm.controls; }

  asyncCategoryValidator(control: FormControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.service.getCategories({ name: control.value })
      .pipe(debounceTime(500), map((category: any) => {
        if (category.length > 0) {
          return {
            isExist: true
          };
        }
        return null;
      }));
  }

}
