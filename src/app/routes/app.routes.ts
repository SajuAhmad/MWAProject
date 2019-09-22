import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/register/signup.component';
import { HomeComponent } from '../components/home/home.component';
import { AuthGuard } from '../guards/auth.guard';
import { TestComponent } from '../components/test/test.component';
import { PostDetailComponent } from '../components/post/post-detail/post-detail.component';
import { PostListComponent } from '../components/post/post-list/post-list.component';


const MY_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'client/protected', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'post/list', component: PostListComponent },
  { path: 'post/detail', component: PostDetailComponent },
  { path: '**', redirectTo: '/' }
];

export const myRoutes = RouterModule.forRoot(MY_ROUTES);
