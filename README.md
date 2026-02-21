# 💬 RAG Sales Assistant — Frontend

Microservico de assistente de vendas com IA generativa, RAG e memoria de conversas para suporte ao cliente via chat.

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
Usuario acessa /chat ou /upload ou /documents
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

## 🌐 Deploy

- **URL do Frontend:** https://rag.cesaravb.com.br
- **Plataforma:** Coolify
- **Projeto:** REDELOGNET - RAG ASSISTANT

---

## 👤 Autor

**Cesar Augusto Vieira Bezerra**
[portfolio.cesaraugusto.dev.br](https://portfolio.cesaraugusto.dev.br/)