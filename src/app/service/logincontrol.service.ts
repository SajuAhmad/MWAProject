import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogincontrolService {

  constructor(private atuhService: AuthService) { }

  isAdmin() {
    if (this.atuhService.getRole() !== 'null' && this.atuhService.getRole() !== 'admin') {
      return false
    } else {
      return true
    }
  }

  isVisitor() {
    if (localStorage.getItem('userToken')) {
      return false;
    } else {
      return true;
    }
  }

  isUser() {
    if (this.atuhService.getRole() !== 'null' && this.atuhService.getRole() !== 'visitor') {
      return true;
    } else {
      return false;
    }
  }

  isLogedin() {
    if (!localStorage.getItem('userToken')) {
      return false;
    } else {
      return true;
    }
  }
}
