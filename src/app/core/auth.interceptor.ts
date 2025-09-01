// src/app/core/auth.interceptor.ts


// Interceptor executa ANTES de cada requisição HTTP.
// Objetivo: inserir "Authorization: Bearer <token>" em TODAS as chamadas,
// exceto nas rotas públicas /auth/**.

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  // Usa URL final resolvida
  const path = req.url;
  const isAuthRoute =
    path.includes('/auth/login') || path.includes('/auth/register');

  if (isAuthRoute) {
    // Rota pública: passa direto sem header Authorization
    return next(req);
  }

  const token = auth.token;
  if (!token) return next(req);

  const cloned = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });
  return next(cloned);
};
