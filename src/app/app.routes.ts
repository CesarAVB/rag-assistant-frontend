import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'chat',
    pathMatch: 'full'
  },
  {
    path: 'chat',
    loadComponent: () =>
      import('./pages/chat/chat').then(m => m.ChatComponent)
  },
  {
    path: 'upload',
    loadComponent: () =>
      import('./pages/upload/upload').then(m => m.UploadComponent)
  },
  {
    path: '**',
    redirectTo: 'chat'
  }
];