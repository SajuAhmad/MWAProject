import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignupService } from 'src/app/service/signup.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
  providers: [SignupService]
})
export class UserlistComponent implements OnDestroy {

  public items: Object;
  private subscription: Subscription;

  constructor(private service: SignupService) {
    console.log('home component');
    this.subscription = this.service.getUserList().subscribe((data: any) => {
      this.items = data;
    });
  }

  ngOnDestroy() {
    console.log('protected onDestroy');
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

}
