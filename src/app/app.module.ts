import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';

import { myRoutes } from './routes/app.routes';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { TokenGuard } from './guards/tokenguard.guard';
import { UserGuard } from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';

import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { PostDetailComponent } from './components/post/post-detail/post-detail.component';
import { PostListItemComponent } from './components/post/post-list-item/post-list-item.component';
import { PostCreateComponent } from './components/post/post-create/post-create.component';
import { PostCommentComponent } from './components/post/post-comment/post-comment.component';
import { PostListComponent } from './components/post/post-list/post-list.component';
import { TextareaAutosizeDirective } from './directives/textarea-autosize.directive';


@NgModule({
  declarations: [
    AppComponent,
    PostDetailComponent,
    PostCommentComponent,
    PostListComponent,
    LayoutComponent,
    HeaderComponent,
    SidenavListComponent,
    PostCreateComponent,
    TextareaAutosizeDirective,
    PostListItemComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    myRoutes,
    BrowserAnimationsModule,
    MaterialModule
  ],
  entryComponents: [PostCommentComponent, PostCreateComponent],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    TokenGuard,
    UserGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
