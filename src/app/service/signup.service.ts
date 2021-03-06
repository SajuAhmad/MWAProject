import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SignupService {
  constructor(public http: HttpClient) { }

  isExist(data: Object) {
    //debug('SignupService.isExist():' + { data });
    return this.http.post('http://localhost:1000/api/user/check', data);
  }

  insertUser(data: Object) {
    //console.debug('SignupService.insertUser():' + data);
    return this.http.post('http://localhost:1000/api/user/insert', data);
  }

  loginCheck(data: Object) {
    //console.debug('SignupService.loginCheck():' + data);
    return this.http.post('http://localhost:1000/api/user/login', data);
  }

  getUserList() {
    //console.debug('SignupService.getUserList()');
    return this.http.get('http://localhost:1000/api/user');
  }

  updateUser(data: object) {
    //console.debug('SignupService.getUserList()');
    return this.http.post('http://localhost:1000/api/user', data);
  }

  getCategories(data: object) {
    //console.debug('SignupService.getCategories()');
    return this.http.post('http://localhost:1000/api/category/get', data);
  }

  addCategory(data: object) {
    //console.debug('SignupService.addCategory():' + data);
    return this.http.post('http://localhost:1000/api/category/post', data);
  }

  deleteCategory(data: object) {
    //console.debug('SignupService.deleteCategory():' + data);
    return this.http.post('http://localhost:1000/api/category/delete', data);
  }

}
