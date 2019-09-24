import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: ``,
  styles: []
})
export class LogoutComponent implements OnInit {
  constructor(private route: Router) { }

  ngOnInit() {
    localStorage.removeItem('userToken');
    this.route.navigate(['/']);
  }
}
