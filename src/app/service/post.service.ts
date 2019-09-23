import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  emitter = new EventEmitter();
  emitterComment = new EventEmitter();
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

  commendPost(data: string) {
    return this.http.post('http://localhost:1000/api/post/comment', data);
  }

  likeRequest(data: any) {
    console.log(data);
    return this.http.post('http://localhost:1000/api/post/like', data);
  }

  unlikeRequest(data: any) {
    console.log(data);
    return this.http.post('http://localhost:1000/api/post/unlike', data);
  }

  getCategory() {
    
    return this.http.post('http://localhost:1000/api/post/getCategories', {});
  }

  finishCreatePostRequest() {
    this.emitter.emit();
  }

  finishCreateCommendRequest() {
    this.emitterComment.emit();
  }


}
