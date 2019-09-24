import { Component, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { PostCreateComponent } from '../../post/post-create/post-create.component';
import { MatDialog } from '@angular/material';
import { LogincontrolService } from 'src/app/service/logincontrol.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  @Output() public sidenavToggle = new EventEmitter();
  constructor(private loginControll: LogincontrolService, public dialog: MatDialog) { }

  openPostDialog(): void {
    const dialogRef = this.dialog.open(PostCreateComponent, {
      width: '800px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
    });
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  isAdmin() { return this.loginControll.isAdmin() }
  isVisitor() { return this.loginControll.isVisitor() }
  isUser() { return this.loginControll.isUser() }
  isLogedin() { return this.loginControll.isLogedin() }

}
