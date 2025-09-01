import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../shared/api.config';
import { Observable } from 'rxjs';

/**
 * Tipagem da recompensa (espelha a entidade do backend)
 * - Usar tipo ajuda a ter autocomplete, validações e menos erros de string.
 */
export type Reward = {
  id?: number;
  title: string;
  costPoints: number;
  stock: number;
  active: boolean;
};

@Injectable({ providedIn: 'root' })
export class RewardsService {
  constructor(private http: HttpClient) {}

  listAll(): Observable<Reward[]> {
    // Endpoints admin -> protegidos por ROLE_ADMIN
    return this.http.get<Reward[]>(`${BASE_URL}/admin/rewards`);
  }

  create(body: Reward): Observable<Reward> {
    return this.http.post<Reward>(`${BASE_URL}/admin/rewards`, body);
  }

  update(id: number, body: Reward): Observable<Reward> {
    return this.http.put<Reward>(`${BASE_URL}/admin/rewards/${id}`, body);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/admin/rewards/${id}`);
  }
}
