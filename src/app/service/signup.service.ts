import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SignupService {

  constructor(public http: HttpClient) {
    console.log('service constructor');
  }

  checkEmail(email: string) {
    console.log('service checkEmail()');
    return this.http.get('http://localhost:1000/api/checkemail', { params: { email } });
  }

  insertUser(data: Object) {
    console.log('service insertUser()');
    return this.http.post('http://localhost:1000/api/insert', data);
  }

  loginCheck(data: Object) {
    let myParams = new URLSearchParams();
    console.log('service checkEmail()');
    return this.http.post('http://localhost:1000/api/login', data);
  }

  getUserList() {
    console.log('service getUserList()');
    return this.http.get('http://localhost:1000/api/protected');
  }

}
