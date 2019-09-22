import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormControl, Validators, FormGroup,
  FormBuilder,
  FormArray
} from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  myForm: FormGroup;
  // title = new FormControl('', [Validators.required]);
  // img = new FormControl('', [Validators.nullValidator]);
  // desc = new FormControl('', [Validators.required]);
  height = '80px';
  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<PostCreateComponent>) {

    this.myForm = formBuilder.group({});
    this.myForm = formBuilder.group({
      title: ['', Validators.required],
      desc: ['', Validators.required],
      img: ['', Validators.nullValidator],
      category: ['', Validators.required]
    });

    this.myForm.valueChanges.subscribe(
      (data: any) => {
        console.log(data)

        // console.log(this.myForm.get("title").invalid);
      }
    );

  }




  ngOnInit() {
  }

  onPost() {
    console.log(this.myForm);
  }

  cancel() {
    this.dialogRef.close();
  }


  getErrorMessage() {
    return 'You must enter a value';
  }

}
