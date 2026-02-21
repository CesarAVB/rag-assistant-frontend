import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private readonly apiUrl = `${environment.apiUrl}/api/documents/upload`;

  constructor(private http: HttpClient) {}

  // ========================================
  // upload - Envia um único arquivo ao backend via multipart/form-data.
  // O backend (DocumentImportController) processa o arquivo com o Tika,
  // divide em chunks e salva no PGVector.
  // Retorna a mensagem de sucesso enviada pelo backend como string.
  // ========================================
  upload(file: File): Observable<string> {
    // FormData é necessário para envio de arquivos (multipart/form-data)
    // O campo "file" deve bater com @RequestParam("file") do backend
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.apiUrl, formData, { responseType: 'text' }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  // ========================================
  // handleError - Trata erros HTTP retornados pelo backend.
  // Converte o erro em uma mensagem legível para exibição na tela.
  // ========================================
  private handleError(error: HttpErrorResponse): Observable<never> {
    const message = error.error instanceof ErrorEvent
      ? `Erro de conexão: ${error.error.message}`
      : `Erro ${error.status}: ${error.error || 'Falha ao enviar arquivo'}`;

    return throwError(() => new Error(message));
  }
}