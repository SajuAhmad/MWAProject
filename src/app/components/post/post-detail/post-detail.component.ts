import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PostCommentComponent } from '../post-comment/post-comment.component';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/service/post.service';
import { AuthService } from 'src/app/service/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

export interface PostItem {
  desc: string,
  img: string,
  title: string,
  _id: string,
  like: number,
  unlike: number,
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
    like: 0,
    unlike: 0,
    commends: [Object]
  };
  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  panelOpenState = true;
  isMore = false;
  moreButtonTitle = "MORE";
  private id;
  private subscription: Subscription;
  constructor(private route: ActivatedRoute, private authService: AuthService, public dialog: MatDialog, public postService: PostService) {

  }

  ngOnInit() {
    this.postService.emitterComment.subscribe(() => {
      this.getDetail();
    })
    this.getDetail();
  }


  getDetail() {
    this.id = this.route.params['_value']['id'];
    if (this.id != "") {
      this.subscription = this.postService.getSpecificPost(this.id).subscribe(res => {
        console.log(res);
        if (res['status'] == 200) {
          this.postItem = res['data'];
        }
      });
    }
  }


  openCommentDialog(): void {

    // console.log()
    if (this.authService.getUsername() !== "") {
      const dialogRef = this.dialog.open(PostCommentComponent, {
        width: '500px',
        data: { id: this.id }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // this.animal = result;
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
