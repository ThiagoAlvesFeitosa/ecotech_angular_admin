import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * AppComponent:
 * - Componente raiz da aplicação
 * - Renderiza as rotas via <router-outlet>
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class AppComponent {}
