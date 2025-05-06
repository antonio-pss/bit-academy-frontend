import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authChildrenGuard: CanActivateChildFn = async (childRoute, state) => {
  const router = inject(Router);

  try {
    const token = sessionStorage.getItem('auth-token');
    if (!token) {
      await router.navigate(['auth/login']);
      return false;
    }

    // Simplificando: se temos um token válido, permitimos o acesso
    return true;
  } catch (error) {
    console.error('Erro no guard de autenticação:', error);
    await router.navigate(['auth', 'login']);
    return false;
  }
};
