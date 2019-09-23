import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignupService } from 'src/app/service/signup.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
  providers: [SignupService]
})

export class UserlistComponent implements OnInit ,OnDestroy{
  private subscription: Subscription;
  users: any;
  categories: any;

  constructor(private service: SignupService) {
    console.log('UserlistComponent.constructor()')
    this.subscription = this.service.getUserList().subscribe((data: any) => {
      this.users = data;
      console.log('UserlistComponent.users'+this.users)
    });

    this.subscription = this.service.getCategories().subscribe((data: any) => {
      this.users = data;
      console.log('UserlistComponent.users'+this.users)
    });

  }
  removeUser(data: object):void {
    console.log('UserlistComponent.removeUser()')
  }

  ngOnInit(): void {
    
  }
  ngOnDestroy() {
    console.log('protected onDestroy');
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
