import { RouterModule, Routes, PreloadAllModules } from "@angular/router";
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/register/signup.component';
import { HomeComponent } from '../components/home/home.component';
import { PostDetailComponent } from '../components/post/post-detail/post-detail.component';
import { AdminPanelComponent } from '../components/userlist/adminpanel.component';
import { PostListComponent } from '../components/post/post-list/post-list.component';
import { TokenGuard } from '../guards/tokenguard.guard';
import { AdminGuard } from '../guards/admin.guard';


const MY_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', loadChildren: () => import('../modules/logout.module').then(m => m.LogoutModule) },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: PostListComponent },
  { path: 'home/:id', component: PostDetailComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', loadChildren: () => import('../modules/admin.module').then(m => m.AdminModule) },
  { path: '**', redirectTo: 'home' }
];

export const myRoutes = RouterModule.forRoot(MY_ROUTES, { preloadingStrategy: PreloadAllModules });
