import { Component, OnInit } from '@angular/core';
import { PostListItemComponent } from '../post-list-item/post-list-item.component'
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  names = ["123", "232", "43", "123", "232", "43", "123", "232", "43",""];
  constructor() {
  
  }

  ngOnInit() {
  }

}
