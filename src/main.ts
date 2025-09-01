// src/main.ts

// [Eu explicando]
// Ponto de entrada. Aqui o Angular inicializa a aplicação.
// IMPORTANTE: passamos o appConfig para registrar Router/HttpClient.
import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
