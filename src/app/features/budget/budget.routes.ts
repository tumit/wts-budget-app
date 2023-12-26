import { Routes } from '@angular/router';
import { loggedInGuard } from '../../auth/guards/logged-in.guard';
import { adminGuard } from '../../auth/guards/admin.guard';

export const routes: Routes = [

  {
    path: 'requirements',
    loadComponent: () =>
      import(
        './pages/requirement-entry/requirement-entry.component'
      ),
    canActivate: [loggedInGuard]
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
  {
    path: 'requirements/approval',
    loadComponent: () =>
      import(
        './pages/requirement-approval/requirement-approval.component'
      ),
    canActivate: [loggedInGuard, adminGuard]
  },

];

export default routes;
