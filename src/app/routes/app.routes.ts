import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/register/signup.component';
import { HomeComponent } from '../components/home/home.component';
import { AuthGuard } from '../guards/auth.guard';
import { TestComponent } from '../components/test/test.component';
import { PostDetailComponent } from '../components/post/post-detail/post-detail.component';
import { UserlistComponent } from '../components/userlist/userlist.component';
import { LogoutComponent } from '../components/logout/logout.component';


const MY_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UserlistComponent, canActivate: [AuthGuard] },
  { path: 'test', component: PostDetailComponent },
  { path: '**', redirectTo: '/' }
];

export const myRoutes = RouterModule.forRoot(MY_ROUTES);
