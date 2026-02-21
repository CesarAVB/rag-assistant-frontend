import { Routes } from '@angular/router';
import { authGuard } from './services/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard').then((m) => m.DashboardComponent),
  },
  {
    path: 'chat',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/chat/chat').then((m) => m.ChatComponent),
  },
  {
    path: 'documents',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/documents/documents').then((m) => m.DocumentsComponent),
  },
  {
    path: 'upload',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/upload/upload').then((m) => m.UploadComponent),
  },
  {
    path: '**',
    redirectTo: 'chat',
  },
];
