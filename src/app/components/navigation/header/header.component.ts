import { Component, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { PostCreateComponent } from '../../post/post-create/post-create.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public role: string = '';

  @Output() public sidenavToggle = new EventEmitter();

  constructor(private atuhService: AuthService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  openPostDialog(): void {
    const dialogRef = this.dialog.open(PostCreateComponent, {
      width: '800px',
      height: 'auto',
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


  userType() {
    if (this.atuhService.getRole()) {
      return this.role = this.atuhService.getRole();
    } else {
      return this.role = 'visitor';
    }
  }

  isAdmin() {
    // console.log(this.atuhService.getRole());
    if (this.atuhService.getRole() !== 'null' && this.atuhService.getRole() !== 'admin') {
      return false
    } else {
      return true
    }
  }

  isVisitor() {
    if (localStorage.getItem('userToken')) {
      return false;
    } else {
      return true;
    }
  }

  isUser() {
    if (this.atuhService.getRole() !== 'null' && this.atuhService.getRole() !== 'user' || this.atuhService.getRole() !== 'admin') {
      return false;
    } else {
      return true;
    }
  }

  isLogedin() {
    if (!localStorage.getItem('userToken')) {
      return false;
    } else {
      return true;
    }
  }

}
