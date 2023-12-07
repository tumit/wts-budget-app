import { Routes } from '@angular/router';
import RequirementEntryComponent from './features/budget/pages/requirement-entry/requirement-entry.component';

export const routes: Routes = [
  // { path: 'budget/requirements', component: RequirementEntryComponent }
  {
    path: 'budget/requirements',
    loadComponent: () =>
      import(
        './features/budget/pages/requirement-entry/requirement-entry.component'
      ),
  },
];
