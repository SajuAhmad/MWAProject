import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private helper = new JwtHelperService();

  getToken() {
    return localStorage.getItem('userToken');
  }

  setToken(token: string) {
    localStorage.setItem('userToken', token);
  }

  getUsername() {
    if (this.getToken()) {
      const decoded = this.helper.decodeToken(this.getToken());
      return decoded.username;
    } else {
      return 'visitor';
    }
  }

  getRole() {
    if (this.getToken()) {
      const decoded = this.helper.decodeToken(this.getToken());
      return decoded.role;
    } else {
      return 'visitor';
    }
  }

  isTokenExpired(): boolean {
    return this.helper.isTokenExpired(this.getToken())
  }

}
