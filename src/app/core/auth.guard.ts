import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Guard de autenticação:
 * - No SSR (server) → sempre permite (não dá pra ler localStorage).
 * - No browser      → exige token e redireciona para /login se faltar.
 */
export const authGuard: CanActivateFn = () => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);
  const auth = inject(AuthService);

  // SSR? libera passagem sem checar token
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  // Browser: precisa estar logado
  if (auth.isLogged()) {
    return true;
  }

  router.navigateByUrl('/login');
  return false;
};
