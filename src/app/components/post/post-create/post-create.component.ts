import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  title = new FormControl('', [Validators.required]);
  img = new FormControl('');
  desc = new FormControl('', [Validators.required]);

  constructor() { }


  ngOnInit() {
  }


  textAreaAdjust(e,o) {
    console.log(o);
    // o.style.height = "1px";
    // o.style.height = (25 + o.scrollHeight) + "px";
  }


  getErrorMessage() {
    return 'You must enter a value';
  }

}
