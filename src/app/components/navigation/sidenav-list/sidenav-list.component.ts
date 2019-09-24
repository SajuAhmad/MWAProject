import { Component, Output, EventEmitter } from '@angular/core';
import { LogincontrolService } from 'src/app/service/logincontrol.service';
import { MatDialog } from '@angular/material';
import { PostCreateComponent } from '../../post/post-create/post-create.component';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent {
  @Output() sidenavClose = new EventEmitter();

  constructor(private loginControll: LogincontrolService, public dialog: MatDialog) { }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  openPostDialog(): void {
    const dialogRef = this.dialog.open(PostCreateComponent, {
      width: '800px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('SidenavListComponent.openPostDialog():The dialog was closed');
    });
  }

  isAdmin() { return this.loginControll.isAdmin() }
  isVisitor() { return this.loginControll.isVisitor() }
  isUser() { return this.loginControll.isUser() }
  isLogedin() { return this.loginControll.isLogedin() }

}
