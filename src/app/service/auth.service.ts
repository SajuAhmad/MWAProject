import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private helper = new JwtHelperService();
  constructor() {
    // console.log(this.helper.decodeToken(this.getToken()));
  }

  getToken() {
    return localStorage.getItem('userToken');
  }

  setToken(token: string) {
    localStorage.setItem('userToken', token);
  }

  setUsername(username: string) {
    localStorage.setItem('username', username);
  }

  getUsername() {
    return localStorage.getItem('username');
  }
  getRole() {
    if (this.getToken()) {
      const decoded = this.helper.decodeToken(this.getToken());
      // console.log(decoded.role);
      return decoded.role;
    } else {
      return 'visitor';
    }
  }

  isTokenExpired(): boolean {
    return this.helper.isTokenExpired(this.getToken())
  }

}