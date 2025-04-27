import {Routes} from '@angular/router';
import {LoginComponent} from './modules/auth/components/login/login.component';
import {SignupComponent} from './modules/auth/components/signup/signup.component';
import {SelectPlataformComponent} from './modules/auth/components/select-plataform/select-plataform.component';
import {ClassroomComponent} from './modules/bit-class/components/classroom/classroom.component';

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
        path: 'platform-selector',
        component: SelectPlataformComponent,
      },
      {
        path: 'classroom',
        component: ClassroomComponent,
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ]
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  }
];
