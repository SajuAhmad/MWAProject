import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignupService } from '../../service/signup.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-protected',
  template: `
  <br/>
    <div *ngFor="let item of items | keyvalue">
      {{item.key}}: {{item.value.username}}
    </div>
  `,
  providers: [SignupService]
})

export class HomeComponent implements OnDestroy {
  public items: Object;
  private subscription: Subscription;

  constructor(private service: SignupService) {
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
