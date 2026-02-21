import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat';
import { v4 as uuidv4 } from 'uuid';

// Representa uma mensagem individual no chat
interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css']
})
export class ChatComponent implements OnInit {

  // Referência ao container de mensagens para controle de scroll automático
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  @ViewChild('chatInput') chatInput!: ElementRef<HTMLTextAreaElement>;

  messages: Message[] = [];
  userInput: string = '';
  isLoading: boolean = false;

  // ID único da sessão — gerado uma vez por visita e mantido durante a conversa
  conversationId: string = '';

  constructor(private chatService: ChatService) {}

  // Handler para arquivo selecionado (placeholder)
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    // comportamento de upload pode ser implementado no ChatService
    this.messages.push({ role: 'user', content: `📎 Enviado: ${file.name}`, timestamp: new Date() });
    this.scrollToBottom();
  }

  ngOnInit(): void {
    // Gera o ID da sessão ao abrir a página
    this.conversationId = uuidv4();

    // Mensagem inicial do assistente
    this.messages.push({
      role: 'assistant',
      content: 'Olá! Sou o assistente virtual. Como posso te ajudar hoje?',
      timestamp: new Date()
    });
  }

  sendMessage(): void {
    const text = this.userInput.trim();
    if (!text || this.isLoading) return;

    // Adiciona a mensagem do usuário na tela
    this.messages.push({ role: 'user', content: text, timestamp: new Date() });
    this.userInput = '';
    this.isLoading = true;
    this.scrollToBottom();
    this.focusInput();

    // Envia para o backend e aguarda a resposta
    this.chatService.sendMessage(text, this.conversationId).subscribe({
      next: (response) => {
        this.messages.push({
          role: 'assistant',
          content: response.response,
          timestamp: new Date()
        });
        this.isLoading = false;
        this.scrollToBottom();
        this.focusInput();
      },
      error: () => {
        this.messages.push({
          role: 'assistant',
          content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.',
          timestamp: new Date()
        });
        this.isLoading = false;
        this.scrollToBottom();
        this.focusInput();
      }
    });
  }

  private focusInput(): void {
    setTimeout(() => {
      try {
        this.chatInput?.nativeElement?.focus();
      } catch (e) {
        // ignore if element not available
      }
    }, 50);
  }

  // Permite enviar mensagem com Enter (Shift+Enter para quebrar linha)
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  // Limpa o histórico visual e gera um novo ID de sessão
  clearChat(): void {
    this.messages = [];
    this.conversationId = uuidv4();
    this.messages.push({
      role: 'assistant',
      content: 'Conversa reiniciada. Como posso te ajudar?',
      timestamp: new Date()
    });
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const el = this.messagesContainer?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    }, 100);
  }
}