import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostCommentComponent } from '../post-comment/post-comment.component';
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  panelOpenState = true;
  isMore = false;
  moreButtonTitle = "MORE";
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
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
