import { Component, OnInit } from '@angular/core';
import { LogoutService } from 'src/app/service/logout.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-logout',
  template: ``,
  styles: []
})

export class LogoutComponent implements OnInit {

  constructor(private logoutService: LogoutService, private route: Router) { }

  ngOnInit() {
    localStorage.removeItem('userToken');
    this.route.navigate(['/']);
  }

}
