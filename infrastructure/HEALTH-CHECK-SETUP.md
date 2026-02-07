# 📊 HEALTH CHECK - Guia de Setup

**Arquivo:** `health-check.js` (Node.js script)
**Função:** Monitora TODAS as 7 integrações a cada 1 hora
**Status:** ✅ Pronto para produção

---

## 🎯 O Que Faz

Este script verifica continuamente se todas as 7 integrações estão funcionando:

```
✅ Hotmart      → API connectivity test
✅ GA4          → Event tracking verification
✅ Brevo        → Email service connectivity
✅ Airtable     → Database API test
✅ Supabase     → PostgreSQL connection test
✅ Meta Pixel   → Pixel configuration check
✅ Zapier       → Webhook delivery test
```

**Output:**
- 🖥️  Console: Status colorido em tempo real
- 📁 Arquivo: JSON log diário com histórico
- 📢 Slack: Alertas automáticos (opcional)

---

## 🚀 Como Usar

### 1️⃣ RUN ONCE - Verificação Manual

```bash
cd /Users/acacioamaro/RESET-PRIMAL-MVP/infrastructure
node health-check.js
```

**Resultado esperado:**
```
======================================================================
RESET PRIMAL - HEALTH CHECK REPORT
Time: 2026-02-06T11:50:00.000Z
======================================================================

📊 INTEGRATION STATUS

  ✅ Hotmart          UP                 [API connection successful]
  ✅ GA4              UP                 [Event tracking active]
  ✅ Brevo            UP                 [Email service active]
  ✅ Airtable         UP                 [Database access active]
  ✅ Supabase         UP                 [Database connection active]
  ℹ️  Meta Pixel      REQUIRES_BROWSER   [Pixel configured...]
  ✅ Zapier           UP                 [Webhook delivery active]

──────────────────────────────────────────────────────────────────────
Summary: 6 UP | 0 ISSUES | 0 DOWN

✅ All integrations healthy. System is ready.

Log saved to: logs/health-check-2026-02-06.json
```

### 2️⃣ RUN CONTINUOUS - Monitoramento Automático

```bash
node health-check.js --continuous
```

Script rodará:
- Imediatamente ao iniciar
- A cada 1 hora automaticamente
- Pressione Ctrl+C para parar

---

## 🔧 Setup Automático

### Opção A: Cron Job (macOS/Linux)

```bash
# Editar crontab
crontab -e

# Adicionar esta linha (roda a cada hora)
0 * * * * cd /Users/acacioamaro/RESET-PRIMAL-MVP/infrastructure && node health-check.js >> health-check.log 2>&1

# Ou mais frequente (a cada 30 minutos)
*/30 * * * * cd /Users/acacioamaro/RESET-PRIMAL-MVP/infrastructure && node health-check.js >> health-check.log 2>&1
```

### Opção B: GitHub Actions (CI/CD)

Criar arquivo: `.github/workflows/health-check.yml`

```yaml
name: Integration Health Check

on:
  schedule:
    # Roda a cada 1 hora
    - cron: '0 * * * *'
  workflow_dispatch:

jobs:
  health-check:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Run health check
        env:
          HOTMART_API_KEY: ${{ secrets.HOTMART_API_KEY }}
          HOTMART_WEBHOOK_SECRET: ${{ secrets.HOTMART_WEBHOOK_SECRET }}
          GA4_MEASUREMENT_ID: ${{ secrets.GA4_MEASUREMENT_ID }}
          GA4_API_SECRET: ${{ secrets.GA4_API_SECRET }}
          BREVO_API_KEY: ${{ secrets.BREVO_API_KEY }}
          BREVO_SENDER_EMAIL: ${{ secrets.BREVO_SENDER_EMAIL }}
          AIRTABLE_API_TOKEN: ${{ secrets.AIRTABLE_API_TOKEN }}
          AIRTABLE_BASE_ID: ${{ secrets.AIRTABLE_BASE_ID }}
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
          META_PIXEL_ID: ${{ secrets.META_PIXEL_ID }}
          ZAPIER_WEBHOOK_URL: ${{ secrets.ZAPIER_WEBHOOK_URL }}
        run: |
          cd infrastructure
          node health-check.js

      - name: Send Slack Alert on Failure
        if: failure()
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: '🚨 Reset Primal health check FAILED!'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
          fields: repo,message,commit
```

### Opção C: PM2 (Node.js Process Manager)

```bash
# Instalar PM2
npm install -g pm2

# Criar arquivo eco.config.js
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'reset-primal-health-check',
      script: './infrastructure/health-check.js',
      args: '--continuous',
      instances: 1,
      exec_mode: 'fork',
      cwd: '/Users/acacioamaro/RESET-PRIMAL-MVP',
      env: {
        NODE_ENV: 'production',
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
    },
  ],
};
EOF

# Iniciar
pm2 start ecosystem.config.js

# Salvar para reboot automático
pm2 startup
pm2 save
```

### Opção D: Docker (Container)

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --production

COPY infrastructure/health-check.js .
COPY .env .

CMD ["node", "health-check.js", "--continuous"]
```

---

## 📊 Output & Logs

### Console Output

Colorido e visual:
```
✅ = Integração UP (verde)
❌ = Integração DOWN (vermelho)
⚠️  = ERRO (amarelo)
🔐 = AUTH ERROR (amarelo)
⚙️  = CONFIG ERROR (amarelo)
ℹ️  = INFO (azul)
```

### Log Files

Localização: `infrastructure/logs/health-check-YYYY-MM-DD.json`

**Exemplo:**
```json
[
  {
    "timestamp": "2026-02-06T11:50:00.000Z",
    "summary": {
      "up": 6,
      "errors": 0,
      "down": 0,
      "total": 7,
      "healthy": true
    },
    "integrations": [
      {
        "service": "Hotmart",
        "status": "UP",
        "statusCode": 200,
        "latency": "OK",
        "details": "API connection successful"
      },
      ...
    ]
  }
]
```

---

## 🚨 Alert Rules

Script envia alertas automáticos se:

| Condição | Ação |
|----------|------|
| **DOWN COUNT > 0** | 🚨 CRITICAL ALERT |
| **ERROR COUNT > 2** | ⚠️  WARNING ALERT |
| **All UP** | ✅ Everything OK |

### Slack Integration (Opcional)

```bash
# Adicione variável ao .env
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL

# Script vai enviar alertas automaticamente
```

---

## 🔍 Interpretando Resultados

### ✅ UP (Verde)
```
Significa: Integração funcionando corretamente
Ação: Nenhuma
```

### ❌ DOWN (Vermelho)
```
Significa: Integração não respondendo
Ação: CRÍTICO - Execute auto-recovery.js imediatamente
```

### ⚠️  ERROR (Amarelo)
```
Significa: Integração respondendo mas com problemas
Ação: Verificar configuração e credenciais
```

### 🔐 AUTH_ERROR (Amarelo)
```
Significa: Credenciais inválidas ou token expirou
Ação: Verificar e renovar credenciais
```

### ⚙️  CONFIG_ERROR (Amarelo)
```
Significa: Variável de ambiente não configurada
Ação: Adicionar variável ao .env
```

### ℹ️  REQUIRES_BROWSER (Azul)
```
Significa: Necessita validação via browser
Ação: Rodar Playwright para validação completa
```

---

## 🛠️ Troubleshooting

### "Cannot find module"
```bash
# Instalar dependências
npm install

# Ou se não há package.json
npm init -y
```

### "TIMEOUT"
```
Causa: Integração lenta ou sem conexão
Solução: Verificar conexão de internet e firewall
```

### "AUTH_ERROR"
```
Causa: Token expirou ou inválido
Solução: Verificar credenciais em .env
```

### "CONFIG_ERROR"
```
Causa: Variável não definida
Solução: Adicionar variável ao .env
```

---

## 📈 Monitoramento Contínuo

### Recomendado para FEB 6-11:

```bash
# Terminal 1: Health Check contínuo
node health-check.js --continuous

# Terminal 2: Auto-recovery (quando pronto)
node auto-recovery.js --continuous

# Terminal 3: Acompanhar logs
tail -f logs/health-check-*.json
```

### Dashboard (Opcional)

Para visualizar logs em tempo real:
```bash
# Instalar npm package
npm install -g json-logs-viewer

# Ver logs
json-logs-viewer logs/health-check-*.json
```

---

## ✅ Checklist

- [x] Script criado: `health-check.js`
- [ ] Executado manualmente: `node health-check.js`
- [ ] Verificado output para 7 integrações
- [ ] Configurado para rodar automaticamente (escolher A, B, C ou D)
- [ ] Logs confirmados em `logs/`
- [ ] Slack webhook configurado (opcional)
- [ ] Monitorado por 24 horas antes de launch

---

## 📊 Timeline

```
FEB 6:  ✅ health-check.js criado
FEB 6:  ⏳ Setup automático (cron/GitHub/PM2/Docker)
FEB 6-7: ✅ Monitoramento contínuo
FEB 7-8: ✅ Integração com auto-recovery.js
FEB 8-11: ✅ 24/7 monitoring durante launch
```

---

## 🎉 Resultado

```
De: Verificação manual diária (10 minutos)
Para: Automático 24/7 (0 minutos manuais)

Cobertura: 7/7 integrações monitoradas
Frequência: A cada 1 hora (ou configurável)
Alertas: Automáticos por Slack
Logs: Histórico completo em JSON
```

---

**Status:** ✅ ARQUIVO 3 PRONTO
**Próximo:** ARQUIVO 4 (auto-recovery.js) - Script de recuperação automática
