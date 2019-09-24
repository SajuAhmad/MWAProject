import { RouterModule, Routes, PreloadAllModules } from "@angular/router";
import { PostDetailComponent } from '../components/post/post-detail/post-detail.component';
import { PostListComponent } from '../components/post/post-list/post-list.component';


const MY_ROUTES: Routes = [
  { path: 'login', loadChildren: () => import('../modules/login.module').then(m => m.LoginModule) },
  { path: 'logout', loadChildren: () => import('../modules/logout.module').then(m => m.LogoutModule) },
  { path: 'signup', loadChildren: () => import('../modules/signup.module').then(m => m.SignupModule) },
  { path: 'home', component: PostListComponent },
  { path: 'home/:id', component: PostDetailComponent },
  { path: 'admin', loadChildren: () => import('../modules/admin.module').then(m => m.AdminModule) },
  { path: '**', redirectTo: 'home' }
];

export const myRoutes = RouterModule.forRoot(MY_ROUTES, { preloadingStrategy: PreloadAllModules });
