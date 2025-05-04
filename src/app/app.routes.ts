import {Routes} from '@angular/router';
import {LoginComponent} from './modules/auth/components/login/login.component';
import {SignupComponent} from './modules/auth/components/signup/signup.component';
import {SelectPlataformComponent} from './modules/pages/select-plataform/select-plataform.component';

export const routes: Routes = [
  {path: '', redirectTo: 'auth/login', pathMatch: 'full'},
  {
    path: 'auth',
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'platform-selector', component: SelectPlataformComponent},
    ],
  },
  {
    path: 'class',
    loadChildren: () =>
      import('./modules/bit-class/bit-class.module').then(m => m.BitClassModule),
  },
  // },
  // {
  //   path: 'notes',
  //   loadChildren: () =>
  //     import('./modules/bit-notes/bit-notes.module').then(m => m.BitNotesModule),
  // },
  // {
  //   path: 'school',
  //   loadChildren: () =>
  //     import('./modules/bit-school/bit-school.module').then(m => m.BitSchoolModule),
  // },
  {path: '**', redirectTo: 'not-found'},
];

