import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../shared/api.config';
import { tap } from 'rxjs/operators';

/**
 * Serviço de autenticação:
 * - login(): chama /auth/login e guarda token (apenas no browser)
 * - token(): lê token (apenas no browser)
 * - logout(): apaga token (apenas no browser)
 *
 * Observação importante (SSR):
 *  - No servidor NÃO existe localStorage. Então, quando não for browser,
 *    simplesmente não salva/lê token (retorna null).
 */
type LoginRequest = { email: string; password: string };
type AuthResponse = {
  token: string; id: number; name: string; email: string; role: 'USER' | 'ADMIN';
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  /** Helper: true quando estamos no navegador (e existe window/localStorage). */
  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId) && typeof window !== 'undefined' && !!window.localStorage;
  }

  /** Faz login e salva o token (apenas no browser). */
  login(payload: LoginRequest) {
    return this.http.post<AuthResponse>(`${BASE_URL}/auth/login`, payload).pipe(
      tap(res => {
        if (this.isBrowser) {
          window.localStorage.setItem(this.TOKEN_KEY, res.token);
        }
      })
    );
  }

  /** Remove token (logout) — no SSR não faz nada. */
  logout() {
    if (this.isBrowser) {
      window.localStorage.removeItem(this.TOKEN_KEY);
    }
  }

  /** Lê token (no SSR retorna null). */
  get token(): string | null {
    return this.isBrowser ? window.localStorage.getItem(this.TOKEN_KEY) : null;
  }

  /** True se houver token (no SSR sempre false). */
  isLogged(): boolean {
    return !!this.token;
  }
}
