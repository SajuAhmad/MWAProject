import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <div class="row">
        <div class="col-xs-10">
            <h1>Routing Links!</h1>
            <hr>
            <a [routerLink]="['login']">Login</a> |
            <a [routerLink]="['signup']">Signup</a> |
            <a [routerLink]="['client','protected']">Get User List</a>
            <hr>
            <router-outlet></router-outlet>
        </div>
    </div>
</div>
  `
})

export class AppComponent {
  title = 'loginClient';
}
