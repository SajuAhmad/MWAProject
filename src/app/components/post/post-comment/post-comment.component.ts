import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PostService } from 'src/app/service/post.service';
import { AuthService } from 'src/app/service/auth.service';
import { Subscription } from 'rxjs';

export interface DialogData {
  id: string;
}

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent implements OnDestroy {
  private subscription: Subscription;
  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
  myForm: FormGroup;

  height = '80px';
  constructor(private dialogRef: MatDialogRef<PostCommentComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthService, private postService: PostService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.myForm = formBuilder.group({
      comment: ['', Validators.required],
    });
  }

  getErrorMessage() {
    return 'You must enter a value';
  }

  cancel() {
    this.dialogRef.close();
  }

  onComment() {
    let username = this.authService.getUsername();
    const obj = {
      username: username,
      ...this.myForm.value,
      ...this.data
    }
    //console.log(obj);
    this.subscription = this.postService.commendPost(obj).subscribe(data => {
      if (data['status'] == 200) {
        this.dialogRef.close();
        this.postService.finishCreateCommendRequest();
        //  console.log(window.location.href);
      }
    });
  }
}
