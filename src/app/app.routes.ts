import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './login/signup.component';
import { ProtectedComponent } from './protected.component';
import { AuthGuard } from './service/auth.guard';


const MY_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'client/protected', component: ProtectedComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/' }
];

export const myRoutes = RouterModule.forRoot(MY_ROUTES);
