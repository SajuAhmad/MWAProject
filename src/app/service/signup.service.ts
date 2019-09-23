import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SignupService {

  constructor(public http: HttpClient) {
  }

  isExist(data: Object) {
    console.debug('SignupService.isExist():'+{data});
    return this.http.post('http://localhost:1000/api/check', data );
  }

  insertUser(data: Object) {
    console.debug('SignupService.insertUser():'+data);
    return this.http.post('http://localhost:1000/api/insert', data);
  }

  loginCheck(data: Object) {
    console.debug('SignupService.loginCheck():'+data);
    return this.http.post('http://localhost:1000/api/login', data);
  }

  getUserList() {
    console.debug('SignupService.getUserList()');
    return this.http.get('http://localhost:1000/api/protected');
  }

  getCategories() {
    console.debug('SignupService.getUserList()');
    return this.http.get('http://localhost:1000/api/categories');
  }
  
}
