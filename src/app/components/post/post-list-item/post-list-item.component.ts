import { Component, Input } from '@angular/core';

export interface PostItem {
  desc: string,
  img: string,
  title: string,
  _id: string
}

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent {
  @Input() item: PostItem
}
