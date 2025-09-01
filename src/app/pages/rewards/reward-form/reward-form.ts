import { Component, OnInit } from '@angular/core';
import { RewardsService, Reward } from '../../../core/rewards.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * RewardFormComponent:
 * - Cria/edita recompensas
 * - Usa [(ngModel)] para 2-way binding (enunciado pede!)
 * - Para editar, poderíamos carregar por ID (GET /admin/rewards/{id}),
 *   mas mantive simples. Você pode estender depois.
 */
@Component({
  selector: 'app-reward-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="container">
    <h2>{{id ? 'Editar' : 'Nova'}} Recompensa</h2>

    <form (ngSubmit)="save()" #f="ngForm">
      <label>Título</label>
      <input [(ngModel)]="model.title" name="title" required />

      <label>Custo (pontos)</label>
      <input type="number" [(ngModel)]="model.costPoints" name="costPoints" required min="1" />

      <label>Estoque</label>
      <input type="number" [(ngModel)]="model.stock" name="stock" required min="0" />

      <label>Ativa</label>
      <input type="checkbox" [(ngModel)]="model.active" name="active" />

      <div class="actions">
        <button type="submit">Salvar</button>
        <button type="button" (click)="back()">Voltar</button>
      </div>

      <div class="error" *ngIf="error">{{error}}</div>
    </form>
  </div>
  `,
  styles: [`.container{max-width:520px;margin:24px auto;display:flex;flex-direction:column;gap:12px}
            label{font-weight:600} input{width:100%;padding:8px}
            .actions{display:flex;gap:8px;margin-top:8px} .error{color:#b00020}`]
})
export class RewardFormComponent implements OnInit {
  id?: number;
  model: Reward = { title: '', costPoints: 1, stock: 0, active: true };
  error?: string;

  constructor(private svc: RewardsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    this.id = param ? +param : undefined;

    // Se quiser buscar por ID aqui, implemente GET /admin/rewards/{id} no back e consuma.
  }

  save() {
    this.error = undefined;
    const req = this.model;

    const op = this.id
      ? this.svc.update(this.id, req)
      : this.svc.create(req);

    op.subscribe({
      next: () => this.router.navigateByUrl('/admin/rewards'),
      error: () => this.error = 'Erro ao salvar recompensa.'
    });
  }

  back() { this.router.navigateByUrl('/admin/rewards'); }
}
