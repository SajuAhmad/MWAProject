import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(public http: HttpClient) { }

  createPost(data: string) {
    return this.http.post('http://localhost:1000/api/post/create', data);
  }

}
