import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadService } from '../../services/upload';

// Representa um arquivo selecionado pelo usuário com seu status de upload
interface UploadFile {
  file: File;
  status: 'pending' | 'uploading' | 'success' | 'error';
  message: string;
}

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload.html',
  styleUrl: './upload.css'
})
export class UploadComponent {

  // Lista de arquivos selecionados pelo usuário
  files: UploadFile[] = [];

  // Controla se está arrastando um arquivo sobre a área de drop
  isDragging: boolean = false;

  // Formatos aceitos
  acceptedFormats = '.pdf,.doc,.docx,.xls,.xlsx,.txt';

  constructor(private uploadService: UploadService) {}

  // Acionado quando o usuário seleciona arquivos pelo input
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(Array.from(input.files));
    }
  }

  // Acionado quando o usuário solta arquivos na área de drag and drop
  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer?.files) {
      this.addFiles(Array.from(event.dataTransfer.files));
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(): void {
    this.isDragging = false;
  }

  // Adiciona arquivos à lista com status inicial "pending"
  private addFiles(newFiles: File[]): void {
    const mapped: UploadFile[] = newFiles.map(file => ({
      file,
      status: 'pending',
      message: 'Aguardando envio'
    }));
    this.files = [...this.files, ...mapped];
  }

  // Remove um arquivo da lista antes do envio
  removeFile(index: number): void {
    this.files.splice(index, 1);
  }

  // Envia todos os arquivos com status "pending" para o backend
  uploadAll(): void {
    const pending = this.files.filter(f => f.status === 'pending');
    if (pending.length === 0) return;

    pending.forEach(uploadFile => {
      uploadFile.status = 'uploading';

      this.uploadService.upload(uploadFile.file).subscribe({
        next: (message) => {
          uploadFile.status = 'success';
          uploadFile.message = message;
        },
        error: () => {
          uploadFile.status = 'error';
          uploadFile.message = 'Erro ao enviar o arquivo. Tente novamente.';
        }
      });
    });
  }

  // Limpa da lista apenas os arquivos já enviados com sucesso
  clearSuccess(): void {
    this.files = this.files.filter(f => f.status !== 'success');
  }

  // Retorna o ícone Font Awesome adequado para cada extensão de arquivo
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

  // Retorna o ícone e classe Bootstrap para cada status de upload
  getStatusIcon(status: string): string {
    switch (status) {
      case 'uploading': return 'fa-spinner fa-spin text-primary';
      case 'success':   return 'fa-circle-check text-success';
      case 'error':     return 'fa-circle-xmark text-danger';
      default:          return 'fa-clock text-muted';
    }
  }

  // Formata o tamanho do arquivo em KB ou MB
  formatSize(bytes: number): string {
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  get hasPending(): boolean {
    return this.files.some(f => f.status === 'pending');
  }

  get hasSuccess(): boolean {
    return this.files.some(f => f.status === 'success');
  }
}