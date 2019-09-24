import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PostDetailComponent } from '../components/post/post-detail/post-detail.component';
import { PostListComponent } from '../components/post/post-list/post-list.component';
// import { TextareaAutosizeDirective } from '../directives/textarea-autosize.directive';
import { DirectivesModule } from '../modules/directives.module';
import { PostListItemComponent } from '../components/post/post-list-item/post-list-item.component';
// import { PostCreateComponent } from '../components/post/post-create/post-create.component';
import { PostCommentComponent } from '../components/post/post-comment/post-comment.component';

import { MaterialModule } from '../modules/material.module';

@NgModule({
  declarations: [
    PostDetailComponent,
    // TextareaAutosizeDirective,
    PostCommentComponent,
    PostListComponent,
    // PostCreateComponent,
    PostListItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    DirectivesModule,
    RouterModule.forChild([{ path: '', component: PostListComponent },
    { path: ':id', component: PostDetailComponent }
  ])
  ],
  entryComponents: [PostCommentComponent],
})
export class PostModule { }
