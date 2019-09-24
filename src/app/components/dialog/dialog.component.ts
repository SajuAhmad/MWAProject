import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  template: `
    <h1 mat-dialog-title>Registration Successfully</h1>
    <mat-dialog-content>
      Registered...:)
    </mat-dialog-content>
    <mat-dialog-actions>
    </mat-dialog-actions>
  `
})
export class DialogComponent {

  constructor(public router: Router, public authService: AuthService) { }

}
