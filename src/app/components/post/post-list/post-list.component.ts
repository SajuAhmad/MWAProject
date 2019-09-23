import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostListItemComponent } from '../post-list-item/post-list-item.component'
import { PostService } from 'src/app/service/post.service';
import { Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { SignupService } from 'src/app/service/signup.service';
export interface Food {
  value: string;
  viewValue: string;
}
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
  categories;

  private subscription: Subscription;
  posts$;
  constructor(private postService: PostService, private signupService: SignupService, ) {
    this.postService.getCategory(
    ).subscribe(res => {
      console.log(res);
      if (res['status'] == 200) {
        this.categories = res["data"];
      }

    })
  }

  getTop() {
    this.getPostList();
  }

  ngOnInit() {
    this.getPostList();

    this.subscription = this.postService.emitter.subscribe(() => {
      this.getPostList();
    });

  }

  valueChange(o) {
    console.log(o);

    this.posts$ = this.postService.getCategoryList({ category: o }).pipe(filter(res => {

      if (res['status'] == 200) {
        return true;
      }
      return false;
    }),
      map(res => res['data'])
    );
  
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
