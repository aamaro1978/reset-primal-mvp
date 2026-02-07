# 🤖 GITHUB ACTIONS SETUP

**Objetivo:** Automatizar testes e deploys para garantir qualidade e velocidade.
**Responsável:** Infrastructure Squad (DevOps)
**Status:** ⏳ COPIAR E COLAR

---

## 📋 VISÃO GERAL DO PIPELINE

Nós vamos criar 2 workflows principais:

1.  **PR Check (CI):** Roda em todo Pull Request.
    *   Linting (ESLint)
    *   Build Check (Next.js build)
    *   Unit Tests (Jest - *se houver*)

2.  **Deploy (CD):** Roda quando mergeia na `main`.
    *   Trigger Vercel Deployment (Frontend)
    *   Trigger Railway Deployment (Backend/Webhooks)

---

## 🛠️ PASSO 1: CRIAR ARQUIVO DE CI

Crie o arquivo `.github/workflows/ci.yml`:

```yaml
name: CI Check

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  quality:
    name: Quality Check
    runs-on: ubuntu-latest
    
    steps:
      - name: 📥 Checkout code
        uses: actions/checkout@v4

      - name: 🟢 Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: 📦 Install dependencies
        run: npm ci

      - name: 🎨 Lint Check
        run: npm run lint
        # Certifique-se que existe um script "lint": "next lint" no package.json

      - name: 🏗️ Build Check
        run: npm run build
        # Garante que o projeto compila sem erros
```

---

## 🚀 PASSO 2: DEPLOY AUTOMÁTICO (VERCEL)

Para o Frontend, a Vercel já tem integração nativa com GitHub, o que é **melhor** que usar Actions manuais.

**Configuração na Vercel:**
1.  Vá em **Project Settings** > **Git**
2.  Conecte o repositório `RESET-PRIMAL-MVP`
3.  **Production Branch:** `main`
4.  **Ative:** "Automatically deploy when a PR is merged"

**Resultado:**
*   Push na `main` → Deploy Production
*   Pull Request → Deploy Preview (com URL única para QA)

---

## 🔄 PASSO 3: DEPLOY AUTOMÁTICO (RAILWAY/BACKEND)

Se estiver usando Railway para uma API separada ou Webhooks:

1.  Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: 📥 Checkout
        uses: actions/checkout@v4

      - name: 🚂 Railway Deploy
        uses: bervProject/railway-deploy@main
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: "webhooks-service"
          detach: true
```

2.  **Adicione o Secret:**
    *   Vá no GitHub > Settings > Secrets > Actions
    *   Adicione `RAILWAY_TOKEN` (pegue no Railway > Project Settings > Tokens)

---

## 🧪 PASSO 4: VALIDAÇÃO

Para testar se funcionou:

1.  Crie uma nova branch: `git checkout -b feature/setup-ci`
2.  Faça um commit "vazio" ou altere um README.
3.  Abra um Pull Request para `main`.
4.  Veja a aba **Actions** no GitHub.
    *   ✅ **CI Check** deve ficar verde.
    *   ✅ **Vercel** deve comentar com link de preview.

---

## 📝 NOTAS FINAIS

*   **Não bloqueie a main ainda:** Nesta fase MVP, permita merges mesmo se o CI falhar (basta urgência).
*   **Velocidade > Perfeição:** Se o linter estiver reclamando muito de código legado/rapido, desative a regra no `.eslintrc` em vez de refatorar tudo agora.
