import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostCommentComponent } from '../../post/post-comment/post-comment.component';
import { PostCreateComponent } from '../../post/post-create/post-create.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openPostDialog(): void {
    const dialogRef = this.dialog.open(PostCreateComponent, {
      width: '500px',
      height: '500px',
      // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}
