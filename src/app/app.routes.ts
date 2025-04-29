import {Routes} from '@angular/router';
import {LoginComponent} from './modules/auth/components/login/login.component';
import {SignupComponent} from './modules/auth/components/signup/signup.component';
import {SelectPlataformComponent} from './modules/auth/components/select-plataform/select-plataform.component';
import {MainComponent} from './modules/pages/main/main.component';
import {HomeComponent} from './modules/auth/components/home/home.component';

export const routes: Routes = [

  {
    path: 'auth',
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'platform-selector', component: SelectPlataformComponent},
      {path: '', redirectTo: 'login', pathMatch: 'full'},
    ],
  }, {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      }
    ]
  },
  {path: '', redirectTo: 'auth/login', pathMatch: 'full'},
  {path: '**', redirectTo: 'auth/login'},
];
