import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { RewardsListComponent } from './pages/rewards/rewards-list/rewards-list';
import { RewardFormComponent } from './pages/rewards/reward-form/reward-form';


import { authGuard } from './core/auth.guard';

/**
 * Rotas principais:
 * - /login (pública)
 * - /admin/** (protegida pelo authGuard)
 */
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    canActivate: [authGuard],
    children: [
      { path: 'rewards', component: RewardsListComponent },
      { path: 'rewards/new', component: RewardFormComponent },
      { path: 'rewards/:id', component: RewardFormComponent },
      { path: '', pathMatch: 'full', redirectTo: 'rewards' },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: 'admin/rewards' },
  { path: '**', redirectTo: '' },
];
