import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';

import { myRoutes } from './routes/app.routes';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './service/auth.service';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { MaterialModule } from './modules/material/material.module';
import { TokenGuard } from './guards/tokenguard.guard';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/register/signup.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { PostDetailComponent } from './components/post/post-detail/post-detail.component';
import { PostListItemComponent } from './components/post/post-list-item/post-list-item.component';
import { PostCreateComponent } from './components/post/post-create/post-create.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PostCommentComponent } from './components/post/post-comment/post-comment.component';
import { PostListComponent } from './components/post/post-list/post-list.component';
import { DialogComponent } from './components/dialog.component';
import { TextareaAutosizeDirective } from './directives/textarea-autosize.directive';
import { UserGuard } from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    PostDetailComponent,
    PostCommentComponent,
    PostListComponent,
    LayoutComponent,
    HeaderComponent,
    SidenavListComponent,
    PostCommentComponent,
    PostDetailComponent,
    UserlistComponent,
    LogoutComponent,
    DialogComponent,
    PostCreateComponent,
    TextareaAutosizeDirective,
    UserlistComponent,
    LogoutComponent,
    PostListItemComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    myRoutes,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MaterialModule,
    FlexLayoutModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule,
  ],

  entryComponents: [PostCommentComponent, PostCreateComponent, DialogComponent],
  providers: [
    AuthService,
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
