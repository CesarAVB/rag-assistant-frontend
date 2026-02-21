import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { AuthModalService } from '../../services/auth-modal';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-modal.html',
  styleUrls: ['./login-modal.css']
})
export class LoginModalComponent {

  // ========================================
  // closed - Evento emitido ao AppComponent
  // para fechar o modal após login bem-sucedido.
  // ========================================
  @Output() closed = new EventEmitter<void>();

  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // ========================================
  // login - Envia a senha ao backend.
  // Se autenticado com sucesso, fecha o modal
  // e redireciona para o chat.
  // Se a senha estiver errada, exibe o erro.
  // ========================================
  login(): void {
    if (!this.password.trim() || this.isLoading) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.closed.emit();
        this.router.navigate(['/chat']);
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Senha incorreta. Tente novamente.';
        this.password = '';
      }
    });
  }

  // ========================================
  // onKeyDown - Permite enviar com Enter
  // sem precisar clicar no botão.
  // ========================================
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.login();
    }
  }

  // ========================================
  // cancel - Fecha o modal e redireciona para dashboard
  // ========================================
  cancel(): void {
    if (this.isLoading) return;
    this.errorMessage = '';
    this.password = '';
    this.closed.emit();
    this.router.navigate(['/dashboard']);
  }
}