import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: async () => {
      const m = await import('./components/body/body');
      return m.Body;
    }
  },
  {
    path: 'login',
    loadComponent: async () => {
      const m = await import('./components/login/login');
      return m.Login;
    }
  }
];
