import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'budget',
    loadChildren: () => import('./features/budget/budget.routes'),
  },
];
