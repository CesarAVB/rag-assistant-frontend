# 💬 RAG Sales Assistant — Frontend

[![Angular](https://img.shields.io/badge/Angular-19-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.x-purple.svg)](https://getbootstrap.com/)
[![Font Awesome](https://img.shields.io/badge/Font%20Awesome-6.x-228BE6.svg)](https://fontawesome.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Interface web do assistente de vendas com IA generativa. Permite conversas com memoria de sessao e upload de documentos para a base de conhecimento RAG.

<img width="1919" height="864" alt="image" src="https://github.com/user-attachments/assets/07862d82-a96e-4b44-9b94-7279368c7a82" />

---

## 🧱 Tecnologias

| Tecnologia | Versao | Funcao |
|---|---|---|
| Angular | 19 | Framework frontend |
| TypeScript | 5.x | Linguagem |
| Bootstrap | 5.x | Estilizacao e layout |
| Font Awesome | 6.x | Icones |
| UUID | — | Geracao de ID de sessao |

---

## 🗂️ Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   └── login-modal/             # Modal de autenticacao por senha
│   ├── layout/
│   │   ├── header/                  # Barra de navegacao
│   │   └── footer/                  # Rodape minimalista
│   ├── pages/
│   │   ├── chat/                    # Pagina de conversa com o assistente
│   │   ├── upload/                  # Pagina de upload de documentos
│   │   └── documents/               # Pagina de listagem e exclusao de documentos
│   ├── services/
│   │   ├── auth.service.ts          # Gerencia token no sessionStorage
│   │   ├── auth-modal.service.ts    # Controla abertura do modal via Subject
│   │   ├── auth.guard.ts            # Protege rotas autenticadas
│   │   ├── auth.interceptor.ts      # Injeta token em todas as requisicoes HTTP
│   │   ├── chat.service.ts          # Comunicacao com /api/chat
│   │   ├── upload.service.ts        # Comunicacao com /api/documents/upload
│   │   └── document.service.ts      # Comunicacao com /api/documents
│   ├── app.component.ts
│   ├── app.routes.ts
│   └── app.config.ts
└── environments/
    ├── environment.ts               # Producao
    └── environment.development.ts   # Local
```

---

## ⚙️ Configuracao

### Pre-requisitos

- Node.js 20+
- Angular CLI 19+

### Instalacao

```bash
# Clone o repositorio
git clone https://github.com/cesaravb/rag-sales-assistant-frontend.git
cd rag-sales-assistant-frontend

# Instale as dependencias
npm install
```

### Environments

**`src/environments/environment.development.ts`** (local):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};
```

**`src/environments/environment.ts`** (producao):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://rag-api.cesaravb.com.br'
};
```

---

## 🚀 Como executar

```bash
# Desenvolvimento (usa environment.development.ts)
ng serve

# Build de producao (usa environment.ts)
ng build
```

Acesse em: [http://localhost:4200](http://localhost:4200)

---

## 🔐 Autenticacao

Ao acessar qualquer rota protegida sem estar autenticado, um modal de login e exibido automaticamente por cima da pagina.

**Fluxo:**
```
Usuario acessa /chat, /upload ou /documents
  → AuthGuard verifica se ha token no sessionStorage
  → Se nao houver, AuthModalService emite evento para abrir o modal
  → Usuario digita a senha no modal
  → AuthService envia para o backend e salva o token retornado
  → Modal fecha e acesso e liberado
```

O token some automaticamente ao fechar o navegador (sessionStorage).

---

## 📄 Paginas

### 💬 Chat (`/chat`)

- Interface de conversa com o assistente de vendas
- Memoria de conversa por sessao (UUID gerado automaticamente)
- Indicador de digitacao animado
- Envio com Enter · Nova linha com Shift+Enter
- Botao para reiniciar a conversa

### 📂 Upload (`/upload`)

- Area de drag and drop para envio de documentos
- Suporte a PDF, DOC, DOCX, XLS, XLSX e TXT
- Status individual por arquivo (pendente, enviando, sucesso, erro)
- Envio em lote de multiplos arquivos

### 🗄️ Base de Conhecimento (`/documents`)

- Listagem de todos os documentos importados
- Icone por tipo de arquivo
- Data de importacao
- Exclusao individual com confirmacao
- Remove o documento da tabela de controle e do PGVector

---

## 📡 Integracao com o Backend

| Acao | Metodo | Endpoint |
|---|---|---|
| Login | POST | `/api/auth/login` |
| Enviar mensagem | POST | `/api/chat` |
| Upload de documento | POST | `/api/documents/upload` |
| Listar documentos | GET | `/api/documents` |
| Excluir documento | DELETE | `/api/documents/{id}` |

---

## 🔄 Fluxo do Chat

```
Usuario digita mensagem
  → AuthInterceptor injeta o token no header Authorization
  → ChatService envia POST /api/chat com { message, conversationId }
  → Backend processa com RAG + memoria de sessao
  → Resposta exibida no balao do assistente
```

---

## 🚀 Melhorias Futuras

- **Pagina de monitoramento de sessoes** — exibir as conversas ativas com historico de mensagens, timestamps e consumo estimado de tokens por sessao (requer integracao com Redis no backend)
- **Streaming de respostas** — exibir a resposta do assistente palavra por palavra em tempo real usando Server-Sent Events, tornando a experiencia mais fluida e natural
- **Tema escuro** — adicionar suporte a dark mode com alternancia pelo header, salvando a preferencia no localStorage
- **Historico de conversas** — permitir que o usuario retome conversas anteriores com listagem e busca por data ou palavra-chave
- **Exportar conversa** — botao para baixar o historico da conversa em PDF ou TXT diretamente pela interface
- **Feedback nas respostas** — botoes de polegar para cima/baixo em cada resposta para coleta de feedback sobre a qualidade do assistente
- **Preview de documentos** — exibir uma previa do conteudo do documento antes do upload, com informacoes como numero de paginas e tamanho
- **Notificacoes em tempo real** — alertas via WebSocket quando um novo documento for processado e disponibilizado na base de conhecimento
- **Responsividade mobile** — otimizar a interface do chat e upload para dispositivos moveis com layout adaptativo
- **Testes automatizados** — adicionar testes unitarios com Jest e testes end-to-end com Cypress para os fluxos principais de chat e upload

---

## 👤 Autor

**Cesar Augusto Vieira Bezerra**
[portfolio.cesaraugusto.dev.br](https://portfolio.cesaraugusto.dev.br/)
