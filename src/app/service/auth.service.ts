import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor() { }

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
}
