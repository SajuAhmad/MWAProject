import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {
  FormControl, Validators, FormGroup,
  FormBuilder,
  FormArray
} from '@angular/forms';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  private subscription: Subscription;

  myForm: FormGroup;
  // title = new FormControl('', [Validators.required]);
  // img = new FormControl('', [Validators.nullValidator]);
  // desc = new FormControl('', [Validators.required]);
  height = '80px';
  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<PostCreateComponent>,
    public postService: PostService
  ) {

    this.myForm = formBuilder.group({
      title: ['', Validators.required],
      desc: ['', Validators.required],
      img: ['', Validators.nullValidator],
      category: ['', Validators.required]
    });
  }




  ngOnInit() {
  }

  onPost() {

    this.subscription = this.postService.createPost(this.myForm.value).subscribe(data => {
      console.log(data);
    })

  }

  cancel() {
    this.dialogRef.close();
  }


  getErrorMessage() {
    return 'You must enter a value';
  }

  ngOnDestroy(): void {
    console.log('service ondestroy');
    if (this.subscription !== undefined) { this.subscription.unsubscribe(); }
  }
}
