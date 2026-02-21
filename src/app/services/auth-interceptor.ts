import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth';
import { Router } from '@angular/router';

// ========================================
// authInterceptor - Intercepta todas as
// requisições HTTP e injeta o token no
// header Authorization automaticamente.
// Se o backend retornar 401, redireciona
// para o login e limpa a sessão.
// ========================================
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  // Clona a requisição adicionando o header Authorization se houver token
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Token expirado ou inválido — força logout e abre o modal de login
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/chat']);
      }
      return throwError(() => error);
    })
  );
};