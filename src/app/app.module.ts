import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { PostCreateComponent } from './components/post/post-create/post-create.component';
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
import { DirectivesModule } from './modules/directives.module';
// import { TextareaAutosizeDirective } from './directives/textarea-autosize.directive';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    SidenavListComponent,
    PostCreateComponent,
    // TextareaAutosizeDirective,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    myRoutes,
    BrowserAnimationsModule,
    DirectivesModule
  ],

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
  entryComponents: [PostCreateComponent],
  
  bootstrap: [AppComponent]
})

export class AppModule { }
