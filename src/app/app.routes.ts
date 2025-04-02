import {Routes} from '@angular/router';
import {LoginComponent} from './pages/auth/login/login.component';
import {SignupComponent} from './pages/auth/signup/signup.component';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      }
    ]
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  }
];
