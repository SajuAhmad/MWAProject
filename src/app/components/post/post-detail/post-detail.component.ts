import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PostCommentComponent } from '../post-comment/post-comment.component';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/service/post.service';
import { AuthService } from 'src/app/service/auth.service';

export interface PostItem {
  desc: string,
  img: string,
  title: string,
  username: string,
  _id: string,
  category: string,
  likes: [Object],
  commends: [Object]
}

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  postItem: PostItem = {
    desc: '',
    img: '',
    title: '',
    _id: '',
    username: '',
    category: '',
    likes: [Object],
    commends: [Object]
  };

  panelOpenState = true;
  isMore = false;
  moreButtonTitle = "MORE";
  private id: string;
  liked = false;
  count: number;
  private subscription: Subscription;
  constructor(private route: ActivatedRoute,
    private authService: AuthService, public dialog: MatDialog,
    public postService: PostService) { }

  ngOnInit() {
    this.postService.emitterComment.subscribe(() => {
      this.getDetail();
    })
    this.getDetail();
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  getDetail() {
    this.id = this.route.params['_value']['id'];
    if (this.id != "") {
      this.subscription = this.postService.getSpecificPost(this.id).subscribe(res => {
        // console.log(res);
        if (res['status'] == 200) {
          this.postItem = res['data'];
          this.filterLike();
        }
      });
    }
  }

  filterLike() {
    this.count = this.postItem['likes'].length;
    for (const o of this.postItem['likes']) {
      // console.log(o);
      if (o["username"] == this.authService.getUsername()) {
        this.liked = true;
        break;
      } else {
        this.liked = false;
      }
    }
  }

  like() {
    const obj = {
      'id': this.id,
      'username': this.authService.getUsername(),
    }

    if (this.liked == false) {
      this.subscription = this.postService.likeRequest(obj).subscribe(res => {
        if (res['status'] == 200) {
          this.liked = true;
          this.count++;
        }
      });
    } else {
      this.subscription = this.postService.unlikeRequest(obj).subscribe(res => {
        if (res['status'] == 200) {
          this.liked = false;
          this.count--;
        }
      });
    }
  }

  openCommentDialog(): void {
    if (this.authService.getUsername() !== "") {
      const dialogRef = this.dialog.open(PostCommentComponent, {
        width: '500px',
        data: { id: this.id }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    } else {
      alert("Please Login In First");
    }
  }

  more() {
    if (this.moreButtonTitle === "MORE") {
      this.moreButtonTitle = "LESS";
    } else {
      this.moreButtonTitle = "MORE";
    }
    this.isMore = !this.isMore;
  }
}
