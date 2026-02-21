import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// Espelha o ChatResponse.java do backend
interface ChatResponse {
  conversationId: string;
  response: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private readonly apiUrl = `${environment.apiUrl}/api/chat`;

  constructor(private http: HttpClient) {}

  // ========================================
  // sendMessage - Envia a mensagem do usuário ao backend e retorna
  // a resposta do assistente vinculada à sessão pelo conversationId.
  // O backend usa esse ID para manter o histórico da conversa.
  // ========================================
  sendMessage(message: string, conversationId: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(this.apiUrl, { message, conversationId });
  }
}