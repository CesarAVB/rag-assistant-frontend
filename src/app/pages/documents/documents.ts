import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentService, ArquivoImportado } from '../../services/document';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './documents.html',
  styleUrl: './documents.css'
})
export class DocumentsComponent implements OnInit {

  documents: ArquivoImportado[] = [];
  isLoading: boolean = false;
  deletingId: number | null = null;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private documentService: DocumentService) {}

  // ========================================
  // ngOnInit - Carrega a lista de documentos
  // ao abrir a página.
  // ========================================
  ngOnInit(): void {
    this.loadDocuments();
  }

  // ========================================
  // loadDocuments - Busca todos os documentos
  // importados na base de conhecimento.
  // ========================================
  loadDocuments(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.documentService.list().subscribe({
      next: (docs) => {
        this.documents = docs;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar documentos. Tente novamente.';
        this.isLoading = false;
      }
    });
  }

  // ========================================
  // delete - Exclui o documento da base
  // de conhecimento após confirmação do usuário.
  // Remove da tabela de controle e do PGVector.
  // ========================================
  delete(doc: ArquivoImportado): void {
    if (!confirm(`Deseja excluir "${doc.filename}"? Esta ação removerá o documento da base de conhecimento.`)) {
      return;
    }

    this.deletingId = doc.id;
    this.errorMessage = '';
    this.successMessage = '';

    this.documentService.delete(doc.id).subscribe({
      next: () => {
        this.documents = this.documents.filter(d => d.id !== doc.id);
        this.successMessage = `Documento "${doc.filename}" excluído com sucesso.`;
        this.deletingId = null;

        // Remove a mensagem de sucesso após 4 segundos
        setTimeout(() => this.successMessage = '', 4000);
      },
      error: () => {
        this.errorMessage = `Erro ao excluir "${doc.filename}". Tente novamente.`;
        this.deletingId = null;
      }
    });
  }

  // ========================================
  // getFileIcon - Retorna o ícone Font Awesome
  // adequado para cada extensão de arquivo.
  // ========================================
  getFileIcon(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':  return 'fa-file-pdf text-danger';
      case 'doc':
      case 'docx': return 'fa-file-word text-primary';
      case 'xls':
      case 'xlsx': return 'fa-file-excel text-success';
      case 'txt':  return 'fa-file-alt text-secondary';
      default:     return 'fa-file text-muted';
    }
  }

  // ========================================
  // formatDate - Formata a data de importação
  // para exibição amigável na tabela.
  // ========================================
  formatDate(date: string): string {
    return new Date(date).toLocaleString('pt-BR');
  }
}