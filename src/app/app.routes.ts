import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { SignupComponent } from './modules/auth/components/signup/signup.component';
import { SelectPlataformComponent } from './modules/pages/select-plataform/select-plataform.component';
import { MainComponent } from './modules/pages/main/main.component';
import { NotFoundComponent } from './modules/auth/components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'platform-selector', component: SelectPlataformComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  {
    path: 'plataform',
    component: MainComponent,
    children: [
      {
        path: 'bit-class',
        loadChildren: () =>
          import('./modules/bit-class/bit-class.module')
            .then(m => m.BitClassModule)
      },
      // Aqui você pode adicionar as outras duas plataformas
      // {
      //   path: 'bit-school',
      //   loadChildren: () => import('./modules/bit-school/bit-school.module').then(m => m.BitSchoolModule)
      // },
      // {
      //   path: 'bit-notes',
      //   loadChildren: () => import('./modules/bit-notes/bit-notes.module').then(m => m.BitNotesModule)
      // }
    ]
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];
