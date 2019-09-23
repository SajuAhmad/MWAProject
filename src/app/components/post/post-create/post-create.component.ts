import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import {
  FormControl, Validators, FormGroup,
  FormBuilder,
  FormArray
} from '@angular/forms';
import { PostService } from 'src/app/service/post.service';
import { AuthService } from 'src/app/service/auth.service';
import { SignupService } from 'src/app/service/signup.service';



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

  categories;
  constructor(private router: Router, private authService: AuthService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<PostCreateComponent>,
    private postService: PostService,
    private route: ActivatedRoute,
    private signupService: SignupService,
  ) {

    this.myForm = formBuilder.group({
      title: ['', Validators.required],
      desc: ['', Validators.required],
      img: ['', Validators.nullValidator],
      category: ['', Validators.required]
    });
  }




  ngOnInit() {
    this.signupService.getCategories(
      {}
    ).subscribe(res => {
      console.log(res);
      this.categories = res;
    })
  }

  onPost(): void {

    const obj = {
      ...this.myForm.value,
      username: this.authService.getUsername(),
      'like': 0, 'unlike': 0, commends: []
    };

    this.subscription = this.postService.createPost(obj).subscribe(data => {

      if (data['status'] == 200) {
        this.dialogRef.close();
        this.postService.finishCreatePostRequest();
        this.router.navigate(['home']);

        console.log(window.location.href);
      }
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
