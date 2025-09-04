import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'accesspoint',
    loadComponent: async () => {
      const m = await import('./components/body/body');
      return m.Body;
    }
  },
  {
    path: '',
    pathMatch: 'full',
    loadComponent: async () => {
      const m = await import('./components/login/login');
      return m.Login;
    }
  }
];
