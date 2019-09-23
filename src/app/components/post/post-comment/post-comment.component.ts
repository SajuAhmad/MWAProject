import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormControl, Validators, FormGroup,
  FormBuilder,
  FormArray
} from '@angular/forms';
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
export class PostCommentComponent implements OnInit {
  private subscription: Subscription;

  myForm: FormGroup;

  // title = new FormControl('', [Validators.required]);
  // img = new FormControl('', [Validators.nullValidator]);
  // desc = new FormControl('', [Validators.required]);
  height = '80px';
  constructor(private dialogRef: MatDialogRef<PostCommentComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthService, private postService: PostService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {


    this.myForm = formBuilder.group({
      comment: ['', Validators.required],
    });
  }

  ngOnInit() {

  }
  getErrorMessage() {
    return 'You must enter a value';
  }

  cancel() {
    this.dialogRef.close();
  }
  onComment() {
    // console.log(this.myForm.value);
    // console.log(this.data);

    let username = this.authService.getUsername();
    const obj = {
      username: username,
      ...this.myForm.value,
      ...this.data
    }
    console.log(obj);
    this.postService.commendPost(obj).subscribe(data => {

      if (data['status'] == 200) {
        this.dialogRef.close();
        this.postService.finishCreateCommendRequest();
      //  console.log(window.location.href);
      }
    })
  }
}
