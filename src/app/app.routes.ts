import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { SignupComponent } from './modules/auth/components/signup/signup.component';
import { SelectPlataformComponent } from './modules/pages/select-plataform/select-plataform.component';
import { authGuard } from './shared/guards/auth.guard';
import { authChildrenGuard } from './shared/guards/auth-children.guard';
import { NotFoundComponent } from './modules/auth/components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      {
        path: 'platform-selector',
        component: SelectPlataformComponent,
        canActivate: [authGuard]
      },
    ],
  },
  {
    path: 'class',
    canActivate: [authGuard], // Adicionando proteção na rota pai também
    canActivateChild: [authChildrenGuard],
    loadChildren: () =>
      import('./modules/bit-class/bit-class.module').then(m => m.BitClassModule),
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];
