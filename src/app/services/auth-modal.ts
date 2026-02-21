import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthModalService {

  // ========================================
  // openModal$ - Subject que emite um sinal
  // para abrir o modal de login.
  // O AppComponent escuta esse evento.
  // ========================================
  private openModalSubject = new Subject<void>();
  openModal$ = this.openModalSubject.asObservable();

  // ========================================
  // open - Emite o sinal para abrir o modal.
  // Chamado pelo AuthGuard quando o usuário
  // tenta acessar uma rota protegida sem token.
  // ========================================
  open(): void {
    this.openModalSubject.next();
  }
}