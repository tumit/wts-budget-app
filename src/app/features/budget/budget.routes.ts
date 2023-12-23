import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'requirements',
    loadComponent: () =>
      import(
        './pages/requirement-entry/requirement-entry.component'
      ),
  },
  {
    path: 'requirements/add',
    loadComponent: () =>
      import(
        './pages/requirement-form/requirement-form.component'
      ),
  },
  {
    path: 'requirements/edit/:id',
    loadComponent: () =>
      import(
        './pages/requirement-form/requirement-form.component'
      ),
  },

];

export default routes;
