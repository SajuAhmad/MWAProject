import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PostCommentComponent } from '../post-comment/post-comment.component';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/service/post.service';



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
  private subscription: Subscription;
  constructor(private route: ActivatedRoute, public dialog: MatDialog, public postService: PostService) {

  }

  ngOnInit() {


    const id = this.route.params['_value']['id'];
    if (id != "") {
      this.subscription = this.postService.getSpecificPost(id).subscribe(res => {
        console.log(res);
        if (res['status'] == 200) {
          this.postItem = res['data'];
        }
      });
    }


  }



  openDialog(): void {
    const dialogRef = this.dialog.open(PostCommentComponent, {
      width: '250px',
      // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
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
