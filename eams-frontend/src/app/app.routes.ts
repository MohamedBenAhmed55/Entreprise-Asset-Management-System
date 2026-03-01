import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'assets', pathMatch: 'full' },
  {
    path: 'assets',
    loadChildren: () => import('./features/asset/asset.routes').then(m => m.assetRoutes)
  }
];
