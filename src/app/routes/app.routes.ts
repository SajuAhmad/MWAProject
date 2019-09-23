import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/register/signup.component';
import { HomeComponent } from '../components/home/home.component';
import { PostDetailComponent } from '../components/post/post-detail/post-detail.component';
import { UserlistComponent } from '../components/userlist/userlist.component';
import { LogoutComponent } from '../components/logout/logout.component';
import { PostListComponent } from '../components/post/post-list/post-list.component';
import { TokenGuard } from '../guards/tokenguard.guard';
import { AdminGuard } from '../guards/admin.guard';
import { UserGuard } from '../guards/user.guard';


const MY_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'signup', component: SignupComponent },
  // { path: 'home', component: HomeComponent },
  { path: 'users', component: UserlistComponent, canActivate: [TokenGuard, AdminGuard] },
  { path: 'home', component: PostListComponent },
  { path: 'home/:id', component: PostDetailComponent },
  { path: '**', redirectTo: 'home' }
];

export const myRoutes = RouterModule.forRoot(MY_ROUTES);
