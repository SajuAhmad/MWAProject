import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostListItemComponent } from '../post-list-item/post-list-item.component'
import { PostService } from 'src/app/service/post.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {


  private subscription: Subscription;
  posts = [Object];
  constructor(private postService: PostService) {

  }

  ngOnInit() {
    this.subscription = this.postService.getTopTenPostList().subscribe(res => {
      console.log(res);
      if (res['status'] == 200) {
        this.posts = res['data'];
      }
    })
  }
  ngOnDestroy(): void {
    if (this.subscription !== undefined) { this.subscription.unsubscribe(); }
  }
}
