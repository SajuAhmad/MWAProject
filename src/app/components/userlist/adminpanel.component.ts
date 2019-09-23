import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostBinding } from '@angular/core';
import { SignupService } from 'src/app/service/signup.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css'],
  providers: [SignupService]
})

export class AdminPanelComponent implements OnInit ,OnDestroy{
  private subscription: Subscription;
  users: any;
  categories: any;

  constructor(private service: SignupService) {
    this.getUserList()
    this.getCategories()
  }

  getUserList(): void{
    console.log('UserlistComponent.constructor()')
    this.subscription = this.service.getUserList().subscribe((data: any) => {
      this.users = data;
      //console.log('UserlistComponent.users'+this.users)
    });
  }

  getCategories(): void{
    this.subscription = this.service.getCategories().subscribe((data: any) => {
      this.categories = data;
      //console.log('UserlistComponent.categories'+this.categories)
    });
  }



  ngOnInit(): void {
    
  }

  ngOnDestroy() {
    console.log('protected onDestroy');
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  onRoleChange(user): void{
    console.log('AdminPanelComponent.onRoleChange()')
    user.role = (user.role === 'admin') ? 'user' : 'admin';
    this.subscription = this.service.updateUser(user).subscribe((data: any) => {
      this.getUserList()
      //this.users = data;
      //console.log('UserlistComponent.users'+this.users)
    });
  }

  onStatusChange(user): void{
    console.log('AdminPanelComponent.onStatusChange()')
    user.active = !user.active;
    this.subscription = this.service.updateUser(user).subscribe((data: any) => {
      this.getUserList()
      //this.users = data;
      //console.log('UserlistComponent.users'+this.users)
    });
  }

  addCategory(name): void{
    console.log('AdminPanelComponent.addCategory():'+name)
    this.subscription = this.service.addCategory('name').subscribe((data: any) => {
      //this.categories = data;
      this.getCategories()
      //console.log('UserlistComponent.categories'+this.categories)
    });
  }

}
