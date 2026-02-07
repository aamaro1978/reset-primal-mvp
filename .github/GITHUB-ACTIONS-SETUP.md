# GitHub Actions Setup - Automation 24/7

**Arquivo:** `.github/workflows/integrations-automation.yml`

Este workflow automatiza:
- ✅ Health check a cada 1 hora
- ✅ Auto-recovery a cada 30 minutos
- ✅ Alertas por Slack automáticos
- ✅ Logs e artifacts históricos

---

## 🔧 Setup (5 minutos)

### Step 1: Adicionar GitHub Secrets

Vá para: **GitHub → Seu Repository → Settings → Secrets and variables → Actions**

Clique **"New repository secret"** e adicione CADA uma dessas 14 variáveis:

#### Integração Credentials

```
Nome: HOTMART_API_KEY
Valor: [Sua API key do Hotmart]

Nome: HOTMART_WEBHOOK_SECRET
Valor: [Seu webhook secret do Hotmart]

Nome: GA4_MEASUREMENT_ID
Valor: G-XXXXXXXXXX

Nome: GA4_API_SECRET
Valor: [Seu API secret do GA4]

Nome: BREVO_API_KEY
Valor: [Sua API key do Brevo]

Nome: BREVO_SENDER_EMAIL
Valor: seu@email.com

Nome: AIRTABLE_API_TOKEN
Valor: patXXXXXXXXXXXXXX

Nome: AIRTABLE_BASE_ID
Valor: appXXXXXXXXXXXXXX

Nome: SUPABASE_URL
Valor: https://seu-projeto.supabase.co

Nome: SUPABASE_ANON_KEY
Valor: [Sua anon key]

Nome: SUPABASE_SERVICE_ROLE_KEY
Valor: [Sua service role key]

Nome: META_PIXEL_ID
Valor: 123456789012345

Nome: ZAPIER_WEBHOOK_URL
Valor: https://hooks.zapier.com/hooks/catch/XXXXX/XXXXX
```

#### Slack Integration (Opcional mas Recomendado)

```
Nome: SLACK_WEBHOOK_URL
Valor: https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

**Como obter Slack Webhook:**
1. Ir para: https://api.slack.com/apps
2. Create New App → From scratch
3. Nome: "Reset Primal Alerts"
4. Workspace: selecione seu workspace
5. Features → Incoming Webhooks → Activate
6. Add New Webhook to Workspace
7. Selecione canal (ex: #devops ou #alerts)
8. Copiar URL do webhook
9. Adicionar como SLACK_WEBHOOK_URL acima

### Step 2: Verificar Workflow

Vá para: **GitHub → Seu Repository → Actions**

Você deve ver:
```
Reset Primal - Integrations Automation
  ├─ Health Check (roda a cada 1 hora)
  ├─ Auto-Recovery (roda a cada 30 min)
  └─ Summary
```

Se não aparecer, clique em **"Workflows"** no menu lateral.

### Step 3: Testar Workflow (Opcional)

Clique no workflow → **"Run workflow"** → **"Run workflow"**

Resultado esperado:
- ✅ Health Check executa em ~2 minutos
- ✅ Auto-Recovery executa em ~1 minuto
- ✅ Logs salvos em Artifacts
- ✅ Slack recebe notificação (se configurado)

---

## 📊 Como Funciona

### Schedule

```yaml
Health Check:  0 * * * *        → A cada 1 hora (no topo da hora)
Auto-Recovery: */30 * * * *     → A cada 30 minutos

Exemplo:
  00:00 → Health Check
  00:30 → Auto-Recovery
  01:00 → Health Check
  01:30 → Auto-Recovery
  ...continues 24/7
```

### Secrets Loading

O workflow carrega automaticamente todas as 14 variáveis de GitHub Secrets e cria um `.env` file temporário.

**Importante:** Secrets são criptografados e nunca aparecem em logs!

### Status & Alerts

**Health Check Result:**
- ✅ SUCCESS: Todas as integrações UP
- ❌ FAILURE: Alguma integração DOWN
- → Slack alert enviado

**Auto-Recovery Result:**
- ✅ SUCCESS: Problemas corrigidos
- ⚠️ WARNING: Necessário intervenção manual
- → Slack alert enviado com detalhes

### Logs & Artifacts

Cada execução salva:
- `health-check-logs-{run_id}` → Logs completos do health check
- `auto-recovery-logs-{run_id}` → Logs completos do auto-recovery

Retenção: 30 dias

---

## 🔍 Monitorando Executions

### Via GitHub Actions UI

1. **Repository → Actions**
2. Clique no workflow mais recente
3. Ver status de health-check e auto-recovery
4. Clicar em cada job para ver output detalhado

### Via Slack

Se configurado, você receberá:

**✅ Sucesso:**
```
✅ All Integrations Healthy & Auto-Recovery Complete
Failed count: 0
```

**⚠️ Aviso:**
```
⚠️ Auto-Recovery Needs Manual Intervention
Services needing manual fix: 1
Check logs: infrastructure/logs/auto-recovery-YYYY-MM-DD.json
```

**❌ Falha:**
```
🚨 Health Check FAILED
```

---

## 🛠️ Troubleshooting

### "Secrets not found"

**Problema:** Workflow executa mas variáveis estão vazias

**Solução:**
1. Verificar que adicionou TODAS as 14 secrets
2. Verificar que os nomes estão EXATAMENTE como acima
3. Aguardar 1 minuto após adicionar secrets
4. Rodar workflow novamente

### "Permission denied" em logs

**Problema:** Node script não consegue ler .env

**Solução:**
- Normal em GitHub Actions
- .env é criado automaticamente por cada workflow
- Verificar que credentials estão em GitHub Secrets

### "Workflow not triggering"

**Problema:** Schedule não está executando

**Solução:**
- GitHub Actions schedules usam UTC
- Verificar que repository está público (ou Actions habilitado em private)
- Verificar que branch é `main`
- Modificar arquivo em infraestructure/ para forçar execução

### Logs não aparecem

**Problema:** Artifacts não salvam logs

**Solução:**
- Verificar que health-check.js e auto-recovery.js criaram logs em `logs/`
- Logs só aparecem se scripts executaram
- Verificar output do job para ver errors

---

## 📈 Timeline

```
FEB 6:
  ✅ Adicione 14 GitHub Secrets
  ✅ Commit .github/workflows/integrations-automation.yml
  ✅ Push to main
  ✅ Verify workflow aparece em Actions

FEB 6-11:
  ✅ Workflow roda automaticamente 24/7
  ✅ health-check a cada 1 hora
  ✅ auto-recovery a cada 30 min
  ✅ Slack alerts se algo quebrar
  ✅ Logs salvos para análise

FEB 11:
  🚀 Launch com automação completa em background
```

---

## ✅ Checklist de Setup

- [ ] Adicioei TODOS os 14 GitHub Secrets
- [ ] Workflow arquivo commitado e pusheado
- [ ] Workflow aparece em Actions tab
- [ ] Testei workflow manualmente (opcional)
- [ ] Slack webhook configurado (opcional)
- [ ] Recebi 1º alert do Slack (se configurado)
- [ ] Verificar logs em artifacts

---

## 🎯 O Que Você Ganha

**Automação Completa:**
- ✅ Monitoramento a cada 1 hora (24/7)
- ✅ Recuperação a cada 30 min (24/7)
- ✅ Alertas automáticos por Slack
- ✅ Histórico de logs por 30 dias
- ✅ Zero ação manual necessária

**Setup Time:**
- 5 minutos (adicionar secrets)
- 1 minuto (push workflow)
- Pronto!

**Resultado:**
```
Seu sistema fica monitorado 24/7 automaticamente
Problemas são detectados em ≤ 1 hora
Problemas são consertados automaticamente
Você é alertado por Slack se precisa intervir
```

---

## 💡 Próximos Passos

1. **Adicione os 14 GitHub Secrets** (5 min)
2. **Commit e push do workflow** (1 min)
3. **Teste workflow manualmente** (2 min - opcional)
4. **Pronto!** Sistema roda automaticamente

---

**Status:** ✅ Automation Ready
**Próximo:** Setup será automático FEB 6-11

Assim que você commitar este arquivo, o workflow começará a rodar automaticamente! 🚀
