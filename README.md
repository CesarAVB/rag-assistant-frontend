# 💬 RAG Sales Assistant — Frontend

Interface web do assistente de vendas com IA generativa, desenvolvida em **Angular 19** com componentes standalone.
Permite conversas com memória de sessão e upload de documentos para a base de conhecimento RAG.

---

## 🧱 Tecnologias

| Tecnologia | Versão | Função |
|---|---|---|
| Angular | 19 | Framework frontend |
| TypeScript | 5.x | Linguagem |
| Bootstrap | 5.x | Estilização e layout |
| Font Awesome | 6.x | Ícones |
| UUID | — | Geração de ID de sessão |

---

## 🗂️ Estrutura do Projeto

```
src/
├── app/
│   ├── layout/
│   │   ├── header/          # Barra de navegação
│   │   └── footer/          # Rodapé minimalista
│   ├── pages/
│   │   ├── chat/            # Página de conversa com o assistente
│   │   └── upload/          # Página de upload de documentos
│   ├── services/
│   │   ├── chat.service.ts  # Comunicação com /api/chat
│   │   └── upload.service.ts # Comunicação com /api/documents/upload
│   ├── app.component.ts
│   ├── app.routes.ts
│   └── app.config.ts
└── environments/
    ├── environment.ts              # Produção
    └── environment.development.ts  # Local
```

---

## ⚙️ Configuração

### Pré-requisitos

- Node.js 20+
- Angular CLI 19+

### Instalação

```bash
# Clone o repositório
git clone https://github.com/cesaravb/rag-sales-assistant-frontend.git
cd rag-sales-assistant-frontend

# Instale as dependências
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

**`src/environments/environment.ts`** (produção):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://sua-api-producao.com.br'
};
```

---

## 🚀 Como executar

```bash
# Desenvolvimento (usa environment.development.ts)
ng serve

# Build de produção (usa environment.ts)
ng build
```

Acesse em: [http://localhost:4200](http://localhost:4200)

---

## 📄 Páginas

### 💬 Chat (`/chat`)

- Interface de conversa com o assistente de vendas
- Memória de conversa por sessão (UUID gerado automaticamente)
- Indicador de digitação animado
- Envio com Enter · Nova linha com Shift+Enter
- Botão para reiniciar a conversa

### 📂 Upload (`/upload`)

- Área de drag and drop para envio de documentos
- Suporte a PDF, DOC, DOCX, XLS, XLSX e TXT
- Status individual por arquivo (pendente, enviando, sucesso, erro)
- Envio em lote de múltiplos arquivos

---

## 📡 Integração com o Backend

| Ação | Método | Endpoint |
|---|---|---|
| Enviar mensagem | POST | `/api/chat` |
| Upload de documento | POST | `/api/documents/upload` |

---

## 🔄 Fluxo do Chat

```
Usuário digita mensagem
  → ChatService envia POST /api/chat com { message, conversationId }
  → Backend processa com RAG + memória de sessão
  → Resposta exibida no balão do assistente
```

---

## 👤 Autor

**César Augusto Vieira Bezerra**
[portfolio.cesaraugusto.dev.br](https://portfolio.cesaraugusto.dev.br/)