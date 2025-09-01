import { Component, OnInit } from '@angular/core';
import { RewardsService, Reward } from '../../../core/rewards.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

/**
 * RewardsListComponent:
 * - Chama GET /admin/rewards
 * - Mostra tabela simples
 * - Botões para editar/excluir
 */
@Component({
  selector: 'app-rewards-list',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="container">
    <h2>Recompensas (Admin)</h2>
    <button (click)="new()">Nova recompensa</button>

    <div *ngIf="loading">Carregando...</div>
    <div class="error" *ngIf="error">{{error}}</div>

    <table *ngIf="!loading && !error">
      <thead>
        <tr>
          <th>Título</th><th>Custo</th><th>Estoque</th><th>Ativa</th><th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let r of items">
          <td>{{r.title}}</td>
          <td>{{r.costPoints}}</td>
          <td>{{r.stock}}</td>
          <td>{{r.active ? 'Sim' : 'Não'}}</td>
          <td>
            <button (click)="edit(r)">Editar</button>
            <button (click)="remove(r)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  `,
  styles: [`.container{max-width:900px;margin:24px auto}
            table{width:100%;border-collapse:collapse} th,td{border:1px solid #ddd;padding:8px}
            th{background:#f3f3f3;text-align:left} .error{color:#b00020;margin-top:12px}`]
})
export class RewardsListComponent implements OnInit {
  items: Reward[] = [];
  loading = true;
  error?: string;

  constructor(private svc: RewardsService, private router: Router) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true; this.error = undefined;
    this.svc.listAll().subscribe({
      next: (list) => { this.items = list; this.loading = false; },
      error: () => { this.error = 'Erro ao carregar recompensas.'; this.loading = false; }
    });
  }

  new() { this.router.navigateByUrl('/admin/rewards/new'); }

  edit(r: Reward) { this.router.navigateByUrl(`/admin/rewards/${r.id}`); }

  remove(r: Reward) {
    if (!r.id) return;
    if (!confirm(`Excluir "${r.title}"?`)) return;
    this.svc.delete(r.id).subscribe({
      next: () => this.load(),
      error: () => alert('Erro ao excluir.')
    });
  }
}
