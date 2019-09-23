import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostListItemComponent } from '../post-list-item/post-list-item.component'
import { PostService } from 'src/app/service/post.service';
import { Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }


  private subscription: Subscription;
  posts$;
  constructor(private postService: PostService, ) {

  }

  ngOnInit() {
    this.getPostList();

    this.subscription = this.postService.emitter.subscribe(() => {
      this.getPostList();
    });

  }

  getPostList() {
    this.posts$ = this.postService.getTopTenPostList().pipe(filter(res => {
      if (res['status'] == 200) {
        return true;
      }
      return false;
    }),
      map(res => res['data'])
    );
  }
}
