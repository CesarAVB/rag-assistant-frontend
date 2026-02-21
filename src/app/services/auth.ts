import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = `${environment.apiUrl}/api/auth`;
  private readonly TOKEN_KEY = 'auth_token';

  constructor(private http: HttpClient, private router: Router) {}

  // ========================================
  // login - Envia a senha ao backend e salva
  // o token retornado no sessionStorage.
  // O token some automaticamente ao fechar o navegador.
  // ========================================
  login(password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { password }).pipe(
      tap(response => {
        if (response.token) {
          sessionStorage.setItem(this.TOKEN_KEY, response.token);
        }
      })
    );
  }

  // ========================================
  // logout - Remove o token do sessionStorage
  // e redireciona para a página inicial.
  // ========================================
  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/chat']);
  }

  // ========================================
  // getToken - Retorna o token salvo no
  // sessionStorage ou null se não existir.
  // Usado pelo interceptor em cada requisição.
  // ========================================
  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  // ========================================
  // isAuthenticated - Verifica se o usuário
  // possui um token válido salvo na sessão.
  // Usado pelo AuthGuard para proteger rotas.
  // ========================================
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}