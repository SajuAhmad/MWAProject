import { RouterModule, Routes, PreloadAllModules } from "@angular/router";


const MY_ROUTES: Routes = [
  { path: 'login', loadChildren: () => import('../modules/login.module').then(m => m.LoginModule) },
  { path: 'logout', loadChildren: () => import('../modules/logout.module').then(m => m.LogoutModule) },
  { path: 'signup', loadChildren: () => import('../modules/signup.module').then(m => m.SignupModule) },
  { path: 'admin', loadChildren: () => import('../modules/admin.module').then(m => m.AdminModule) },
  { path: 'home', loadChildren: () => import('../modules/post.module').then(m => m.PostModule) },
  { path: '**', redirectTo: 'home' }
];

export const myRoutes = RouterModule.forRoot(MY_ROUTES, { preloadingStrategy: PreloadAllModules });
