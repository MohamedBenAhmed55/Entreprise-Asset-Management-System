import { Routes } from '@angular/router';
import { AssetDashboardComponent } from './pages/asset-dashboard/asset-dashboard.component';

export const assetRoutes: Routes = [
  {
    path: '', // The default path when someone navigates to /assets
    component: AssetDashboardComponent
  }
];
