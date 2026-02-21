import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {
  // Lista de features para exibir na dashboard
  features = [
    { title: 'Chat assistido', desc: 'Converse com o assistente e receba respostas rápidas.', icon: 'comments', route: '/chat' },
    { title: 'Upload de documentos', desc: 'Envie PDFs e outros arquivos para consulta e análise.', icon: 'file-upload', route: '/upload' },
    { title: 'Relatórios simples', desc: 'Resumos e estatísticas básicas.', icon: 'chart-line', route: '' }
  ];
}
