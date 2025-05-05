import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);

  // Evita loop infinito se já estiver na página de login
  if (state.url.includes('auth/login')) {
    return true;
  }

  try {
    const token = sessionStorage.getItem('auth-token');
    if (!token) {
      await router.navigate(['auth/login'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
    await router.navigate(['auth/login']);
    return false;
  }
};
