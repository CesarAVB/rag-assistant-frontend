import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// Espelha a entidade ArquivoImportado.java do backend
export interface ArquivoImportado {
  id: number;
  filename: string;
  ingestedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private readonly apiUrl = `${environment.apiUrl}/api/documents`;

  constructor(private http: HttpClient) {}

  // ========================================
  // list - Retorna todos os documentos
  // importados na base de conhecimento.
  // ========================================
  list(): Observable<ArquivoImportado[]> {
    return this.http.get<ArquivoImportado[]>(this.apiUrl);
  }

  // ========================================
  // delete - Exclui o documento pelo ID
  // da tabela de controle e do PGVector.
  // ========================================
  delete(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}