// src/app/pages/login/login.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

// ⬇️ IMPORTAÇÕES NECESSÁRIAS para ngIf, ngForm e ngModel
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * LoginComponent:
 * - Formulário simples com e-mail/senha
 * - Chama AuthService.login()
 * - Se sucesso: redireciona para /admin/rewards
 * - Se erro: mostra mensagem
 */
@Component({
  selector: 'app-login',
  standalone: true,
  // ⬇️ Adiciona CommonModule e FormsModule, senão ngIf/ngModel não funcionam
  imports: [CommonModule, FormsModule],
  template: `
  <div class="container">
    <h2>Login (ADMIN)</h2>
    <!-- #f="ngForm" só funciona com FormsModule importado -->
    <form (ngSubmit)="submit()" #f="ngForm">
      <label>E-mail</label>
      <input name="email" [(ngModel)]="email" required type="email" />

      <label>Senha</label>
      <input name="password" [(ngModel)]="password" required type="password" />

      <button [disabled]="loading">Entrar</button>
      <!-- *ngIf precisa do CommonModule -->
      <div class="error" *ngIf="error">{{error}}</div>
    </form>
  </div>
  `,
  styles: [`.container{max-width:360px;margin:48px auto;display:flex;flex-direction:column;gap:12px}
            label{font-weight:600} input{width:100%;padding:8px} .error{color:#b00020}`]
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error?: string;

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.loading = true; this.error = undefined;
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigateByUrl('/admin/rewards'),
      error: () => {
        this.error = 'Falha ao logar. Verifique credenciais.';
        this.loading = false;
      }
    });
  }
}
