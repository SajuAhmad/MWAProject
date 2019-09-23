import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(public http: HttpClient) { }

  createPost(data: string) {
    return this.http.post('http://localhost:1000/api/post', data);
  }

  getTopTenPostList() {
    return this.http.get('http://localhost:1000/api/post');
  }

  getSpecificPost(data: string) {
    const url = 'http://localhost:1000/api/post/' + data;
    console.log(url)
    return this.http.get(url);
  }

}
