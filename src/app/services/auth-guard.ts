import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth';
import { AuthModalService } from './auth-modal';

// ========================================
// authGuard - Protege as rotas do chat e upload.
// Em vez de redirecionar para /login,
// abre o modal de login por cima da página atual.
// ========================================
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const authModalService = inject(AuthModalService);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Abre o modal e bloqueia a navegação
  authModalService.open();
  return false;
};