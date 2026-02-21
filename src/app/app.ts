import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header';
import { FooterComponent } from './layout/footer/footer';
import { LoginModalComponent } from './components/login-modal/login-modal';
import { AuthModalService } from './services/auth-modal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent, LoginModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {

  // Controla a visibilidade do modal
  showLoginModal = false;

  constructor(private authModalService: AuthModalService) {}

  // ========================================
  // ngOnInit - Escuta o evento do AuthGuard
  // para abrir o modal quando necessário.
  // ========================================
  ngOnInit(): void {
    this.authModalService.openModal$.subscribe(() => {
      this.showLoginModal = true;
    });
  }

  // ========================================
  // onModalClosed - Fecha o modal após
  // login bem-sucedido emitido pelo componente.
  // ========================================
  onModalClosed(): void {
    this.showLoginModal = false;
  }
}