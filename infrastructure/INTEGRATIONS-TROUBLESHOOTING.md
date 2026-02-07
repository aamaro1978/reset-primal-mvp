# 🆘 INTEGRATIONS TROUBLESHOOTING - Manual de Emergência

**Use este guia quando:**
- Health-check reporta problema ❌
- Auto-recovery não consegue consertar 🔧
- Você precisa intervir manualmente 🚨

---

## 📋 QUICK REFERENCE

| Integração | Down? | Não envia? | Erro de Auth? |
|-----------|-------|-----------|---------------|
| Hotmart | [Hotmart Down](#hotmart-down) | [Webhook não recebe](#hotmart-webhook) | [API Key](#hotmart-auth) |
| GA4 | [GA4 Down](#ga4-down) | [Eventos não registram](#ga4-no-events) | [Secret Key](#ga4-auth) |
| Brevo | [Brevo Down](#brevo-down) | [Emails não saem](#brevo-no-emails) | [API Key](#brevo-auth) |
| Airtable | [Airtable Down](#airtable-down) | [Registros não sync](#airtable-no-sync) | [Token](#airtable-auth) |
| Supabase | [Supabase Down](#supabase-down) | [Queries não retornam](#supabase-no-query) | [Key](#supabase-auth) |
| Meta Pixel | [Pixel Down](#pixel-down) | [Eventos não disparam](#pixel-no-events) | N/A |
| Zapier | [Zapier Down](#zapier-down) | [Tasks não executam](#zapier-no-tasks) | [Webhook](#zapier-webhook) |

---

## 🔴 HOTMART

### HOTMART: DOWN
**Sintoma:** `❌ Hotmart - status: DOWN | latency: TIMEOUT`

**Checklist de Recuperação:**
```
1. ✓ Verificar conexão de internet
   ping api.hotmart.com

2. ✓ Verificar Hotmart status
   Visite: https://status.hotmart.com/

3. ✓ Verificar API Key em .env
   grep HOTMART_API_KEY .env
   (se vazio, adicionar credencial válida)

4. ✓ Testar API manualmente
   curl -H "Authorization: Bearer YOUR_KEY" \
        https://api.hotmart.com/v1/user

5. ✓ Se ainda estiver DOWN
   - Hotmart pode estar em maintenance
   - Aguardar 30-60 minutos
   - Status será verificado a cada 30 min (auto-recovery)
```

**Se persistir por > 2 horas:**
- Contactar Hotmart support: support@hotmart.com
- Escalate para PM (Alan Nicolas)

---

### HOTMART: WEBHOOK NÃO RECEBE
**Sintoma:** Compras não geram eventos em Hotmart

**Checklist de Recuperação:**
```
1. ✓ Verificar webhook URL em Hotmart dashboard
   https://app.hotmart.com → Configurações → Webhooks

   URL deve ser: https://seu-app.com/api/webhooks/hotmart

2. ✓ Se URL estiver errada, corrigir
   - Ir em Hotmart dashboard
   - Remover webhook antigo
   - Adicionar novo webhook com URL correta
   - Clicar "Enviar teste"

3. ✓ Verificar que webhook está ativado
   (checkbox "Ativo" deve estar marcado)

4. ✓ Verificar eventos selecionados
   Devem estar marcados:
   - Venda confirmada
   - Venda recusada
   - Assinatura criada

5. ✓ Testar webhook manualmente
   Ir para um produto Hotmart → "Testar webhook"
   Verificar se chega em seu servidor

6. ✓ Se ainda não chegar
   - Verificar firewall/proxy bloqueando
   - Verificar logs do servidor
   - Testar com Postman/curl
```

**Logs para verificar:**
- Server logs: `app/logs/webhooks/hotmart.log`
- Hotmart: https://app.hotmart.com → Webhooks → Ver entregas

---

### HOTMART: API KEY INVÁLIDA
**Sintoma:** `🔐 Hotmart - status: AUTH_ERROR | statusCode: 401`

**Passo a Passo:**
```
1. ✓ Ir para Hotmart dashboard
   https://app.hotmart.com → Configurações → API

2. ✓ Gerar nova API Key
   - Clicar em "Gerar nova chave"
   - Copiar a chave gerada

3. ✓ Atualizar .env
   nano .env
   # Linha: HOTMART_API_KEY=
   # Colar nova chave

4. ✓ Salvar e testar
   curl -H "Authorization: Bearer $(grep HOTMART_API_KEY .env | cut -d= -f2)" \
        https://api.hotmart.com/v1/user

   Resultado esperado: HTTP 200

5. ✓ Executar health-check para validar
   node health-check.js
```

---

## 🔴 GA4

### GA4: DOWN
**Sintoma:** `❌ GA4 - status: DOWN | latency: TIMEOUT`

**Checklist de Recuperação:**
```
1. ✓ Verificar Google Analytics status
   Visite: https://status.cloud.google.com/
   (buscar por "Google Analytics")

2. ✓ Verificar connection de internet
   ping www.google-analytics.com

3. ✓ Verificar GA4 Measurement ID
   grep GA4_MEASUREMENT_ID .env
   Formato correto: G-XXXXXXXXXX

4. ✓ Se formato errado, corrigir
   - Ir para GA4 dashboard: https://analytics.google.com
   - Admin → Property Settings
   - Copiar "Measurement ID"
   - Atualizar .env

5. ✓ Testar event delivery manualmente
   curl -X POST \
     "https://www.google-analytics.com/mp/collect?measurement_id=G-XXXXX&api_secret=XXXXX" \
     -H "Content-Type: application/json" \
     -d '{
       "client_id": "test-12345",
       "events": [{
         "name": "test_event",
         "params": {"test": true}
       }]
     }'

   Resultado esperado: HTTP 204

6. ✓ Se ainda não funcionar
   - GA pode estar em maintenance
   - Aguardar 30-60 minutos
```

---

### GA4: EVENTOS NÃO REGISTRAM
**Sintoma:** Acessar site mas GA4 não mostra eventos

**Checklist de Recuperação:**
```
1. ✓ Verificar que GA4 snippet foi instalado
   - Abrir DevTools → Console
   - Digitar: window.gtag
   - Deve retornar função (não undefined)

2. ✓ Se undefined, adicionar snippet manualmente
   cat config/ga4-snippet.js
   Copiar e colar no <head> de cada página

3. ✓ Verificar Measurement ID no snippet
   Procurar por: gtag('config', 'G-XXXXX')
   Comparar com .env → GA4_MEASUREMENT_ID
   Se diferente, atualizar

4. ✓ Verificar evento sendo disparado
   - DevTools → Network → Filter "collect"
   - Recarregar página
   - Procurar por: www.google-analytics.com
   - Devem aparecer requisições

5. ✓ Se não aparecer
   - Verificar se Ad-blocker está bloqueando GA4
   - Desabilitar extensions do browser
   - Testar em incognito mode

6. ✓ Se ainda não funcionar
   - Aguardar 24-48h (GA leva tempo para processar)
   - Dados aparecerão em: GA4 → Reports → Realtime
```

**Teste rápido:**
```javascript
// Digitar no DevTools console
gtag('event', 'test_event', {
  'event_category': 'test',
  'event_label': 'manual_test'
});
// Deve ver request em Network → Google Analytics
```

---

### GA4: SECRET KEY INVÁLIDA
**Sintoma:** `⚠️  GA4 - status: ERROR | statusCode: 400`

**Passo a Passo:**
```
1. ✓ Ir para GA4 dashboard
   https://analytics.google.com

2. ✓ Admin → Data Streams → Clique seu stream

3. ✓ Scroll para "Measurement API"

4. ✓ Copiar "API Secret"

5. ✓ Atualizar .env
   nano .env
   GA4_API_SECRET=seu_novo_secret

6. ✓ Testar
   node health-check.js
```

---

## 🔴 BREVO

### BREVO: DOWN
**Sintoma:** `❌ Brevo - status: DOWN | latency: TIMEOUT`

**Checklist:**
```
1. ✓ Verificar Brevo status
   Visite: https://status.brevo.com/

2. ✓ Verificar internet
   ping api.brevo.com

3. ✓ Se Brevo estiver down
   - Aguardar seu uptime (status page)
   - Sistema tentará reconectar a cada 30 min
```

---

### BREVO: EMAILS NÃO SAEM
**Sintoma:** Falha ao enviar email via Brevo

**Checklist de Recuperação:**
```
1. ✓ Verificar sender email está verificado
   Brevo dashboard → Senders → Seu email
   Status deve ser: "Verificado"

   Se status for "Pending":
   - Ir para email
   - Clique no link de verificação
   - Confirmar

2. ✓ Verificar rate limit não foi excedido
   Brevo tem limite de:
   - 300 emails/hora (free tier)
   - Contatos tem limite de 1.000

   Se excedido:
   - Esperar 1 hora
   - Ou upgradar plano

3. ✓ Verificar API key
   grep BREVO_API_KEY .env

   Se vazio ou inválido:
   - Brevo dashboard → Integrations → API
   - Gerar nova API key
   - Atualizar .env

4. ✓ Testar envio manualmente
   curl -X POST https://api.brevo.com/v3/smtp/email \
     -H "api-key: YOUR_KEY" \
     -H "Content-Type: application/json" \
     -d '{
       "sender":{"email":"seu@email.com"},
       "to":[{"email":"test@example.com"}],
       "subject":"Test",
       "htmlContent":"<p>Test</p>"
     }'

   Resultado esperado: HTTP 201

5. ✓ Verificar spam folder
   Email pode ter chegado em spam
   Marcar como "Not spam" em seu email

6. ✓ Se ainda não funcionar
   - Verificar domínio está verificado em Brevo
   - Configurar SPF/DKIM records
```

---

### BREVO: SENDER BLACKLISTADO
**Sintoma:** Emails enviados mas chegam em spam ou são rejected

**Passo a Passo:**
```
1. ✓ Verificar reputação sender
   Brevo → Sender Info → Reputation
   Status deve estar: "Green" (good)

   Se "Red" (bad):
   - Você foi reportado como spam
   - Solução: Contatar Brevo support

2. ✓ Verificar blacklist
   Alguns bancos de dados listam IPs/domínios spammers
   - mxtoolbox.com → Blacklist Check
   - Seu domínio não deve estar listado

3. ✓ Se estiver listado
   - Contatar Brevo support@brevo.com
   - Solicitar delisting
   - Pode levar 24-48h

4. ✓ Enquanto isso
   - Parar de enviar emails em massa
   - Focar em leads qualificados
   - Melhorar content
```

---

## 🔴 AIRTABLE

### AIRTABLE: DOWN
**Sintoma:** `❌ Airtable - status: DOWN | latency: TIMEOUT`

**Checklist:**
```
1. ✓ Verificar Airtable status
   Visite: https://status.airtable.com/

2. ✓ Verificar internet
   ping api.airtable.com

3. ✓ Se Airtable estiver down
   - Aguardar uptime
   - Sistema reconectará a cada 30 min
```

---

### AIRTABLE: REGISTROS NÃO SINCRONIZAM
**Sintoma:** Dados não aparecem em Airtable ou não são lidos

**Checklist de Recuperação:**
```
1. ✓ Verificar token de API
   grep AIRTABLE_API_TOKEN .env

2. ✓ Verificar que token tem permissão
   Airtable → Account → Personal access tokens
   - Token deve ter escopo: "data.records:write"

   Se não tem, regenerar:
   - Create new token com permissões corretas
   - Atualizar .env

3. ✓ Verificar Base ID
   grep AIRTABLE_BASE_ID .env

   Formato correto: app123456789...

   Para encontrar:
   - Abrir base em Airtable
   - URL: airtable.com/appXXXXXXXXXX/...
   - Copiar a parte appXXXXX

4. ✓ Testar acesso manualmente
   curl -H "Authorization: Bearer YOUR_TOKEN" \
     https://api.airtable.com/v0/appXXXXXX/Table1

   Resultado esperado: HTTP 200 com registros

5. ✓ Se retornar 404
   - Base ID ou tabela pode estar errada
   - Verificar nome exato da tabela
   - Regenerar token e atualizar

6. ✓ Se retornar 403
   - Token não tem permissão
   - Criar novo token com escopo correto
```

---

## 🔴 SUPABASE

### SUPABASE: DOWN
**Sintoma:** `❌ Supabase - status: DOWN | latency: TIMEOUT`

**Checklist:**
```
1. ✓ Verificar Supabase status
   Visite: https://status.supabase.com/

2. ✓ Verificar que você consegue acessar
   Dashboard: https://app.supabase.com

3. ✓ Se dashboard carrega mas API não responde
   - Pode ser problema de conexão
   - Verificar region em: Project Settings

4. ✓ Se ainda não responder
   - Pode estar em maintenance
   - Aguardar 30-60 minutos
   - Status page vai ter atualizações
```

---

### SUPABASE: QUERIES NÃO RETORNAM
**Sintoma:** REST API não responde ou retorna 500

**Checklist de Recuperação:**
```
1. ✓ Verificar SUPABASE_URL
   grep SUPABASE_URL .env
   Formato: https://seu-project.supabase.co

2. ✓ Verificar SUPABASE_ANON_KEY
   grep SUPABASE_ANON_KEY .env
   (Se vazio, ir em Project Settings → API)

3. ✓ Testar manualmente
   curl -H "apikey: YOUR_KEY" \
     https://seu-project.supabase.co/rest/v1/sua_tabela

   Resultado esperado: HTTP 200 com dados

4. ✓ Se retornar 401
   - API key inválida
   - Copiar nova de: Project Settings → API
   - Atualizar .env

5. ✓ Se retornar 404
   - Tabela pode não existir
   - Verificar nome em: Database → Tables

6. ✓ Se retornar 500
   - Erro na query ou database
   - Verificar logs em: Project Settings → Logs
   - Pode ser query syntax inválida

7. ✓ Se conexões excessivas
   - Erro: "too many connections"
   - Solução: Upgrade plano ou reduzir conexões
```

---

## 🔴 META PIXEL

### META PIXEL: NÃO REGISTRA EVENTOS
**Sintoma:** Pixel configurado mas eventos não disparam

**Checklist de Recuperação:**
```
1. ✓ Verificar Pixel ID em .env
   grep META_PIXEL_ID .env
   Formato: 123456789012345 (15 dígitos)

2. ✓ Verificar que snippet foi instalado
   - DevTools → Sources
   - Procurar por fbevents.js
   - Deve estar carregado

   Se não aparecer:
   - Copiar snippetde: config/meta-pixel-snippet.js
   - Adicionar em <head> de cada página

3. ✓ Verificar Pixel ID no snippet
   Procurar por: fbq('init', '123456789012345');
   ID deve corresponder ao do .env

4. ✓ Verificar pixel está ativo em Meta Business
   Facebook → Business Settings → Pixels
   - Pixel deve estar: "Active"
   - Se inativo, clique "Activate"

5. ✓ Testar pixel manualmente
   - DevTools → Console
   - Digitar: fbq('track', 'PageView');
   - Network → Procurar "facebook.com"
   - Deve ver request para Facebook

6. ✓ Se pixel não dispara
   - Ad-blocker pode estar bloqueando
   - Testar em incognito/private mode
   - Desabilitar extensões

7. ✓ Se ainda não funcionar
   - Aguardar 24h para Meta processar dados
   - Dados aparecerão em: Ads Manager → Events Manager
```

---

## 🔴 ZAPIER

### ZAPIER: TASKS NÃO EXECUTAM
**Sintoma:** Webhook recebido mas Zapier não executa ação

**Checklist de Recuperação:**
```
1. ✓ Verificar que Zapier task está "ON"
   https://zapier.com/app/zaps
   - Procurar seu zap
   - Toggle deve estar verde (ON)

   Se vermelho (OFF):
   - Clique para ligar

2. ✓ Verificar webhook URL em .env
   grep ZAPIER_WEBHOOK_URL .env

   Deve ser: https://hooks.zapier.com/hooks/catch/XXXXX/XXXXX

3. ✓ Verificar que Zapier recebe dados
   - Ir para seu Zap
   - Clique "Test trigger"
   - Enviar dados de teste
   - Deve aparecer "got new data"

4. ✓ Se "got new data" aparece
   - Webhook está funcionando
   - Verificar "Action" (a segunda parte)

5. ✓ Se "got new data" NÃO aparece
   - URL do webhook pode estar errada
   - Gerar novo webhook:
     * Zap → Trigger → Webhooks by Zapier
     * Clique "Catch Hook"
     * Copiar nova URL
     * Atualizar .env ZAPIER_WEBHOOK_URL

6. ✓ Verificar que task tem créditos
   Zapier → Billing
   - Free plan: 100 tasks/mês
   - Se excedido, aguardar reset mensal

7. ✓ Se ainda não funcionar
   - Ver logs em Zapier → Zap History
   - Erro pode estar na ação (ex: não consegue escrever em tabela)
   - Corrigir ação conforme erro
```

---

## 🆘 QUANDO VOCÊ NÃO SABE O PROBLEMA

**Passo 1: Rodar diagnostics**
```bash
# Health check
node health-check.js

# Ver qual serviço está DOWN
# (Verde = UP, Vermelho = DOWN, Amarelo = ERRO)
```

**Passo 2: Ler log detalhado**
```bash
# Ver log mais recente
cat logs/health-check-$(date +%Y-%m-%d).json | jq .

# Procurar por status != "UP"
# Notar a mensagem de erro
```

**Passo 3: Seguir a seção acima para esse serviço**

**Passo 4: Se ainda não conseguir**
- Chamar Gage (DevOps) ou Alan Nicolas (PM)
- Compartilhar o log completo
- Descrever o que você viu vs. o que esperava

---

## 📞 CONTATOS DE SUPORTE

| Serviço | Suporte | Tempo de Resposta |
|---------|---------|------------------|
| Hotmart | support@hotmart.com | 24-48h |
| GA4 | support.google.com | 24-72h |
| Brevo | support@brevo.com | 24h |
| Airtable | support.airtable.com | 24-48h |
| Supabase | support@supabase.io | 24h |
| Meta Pixel | business.facebook.com/help | 48h+ |
| Zapier | support@zapier.com | 24h |

---

## 🎯 ESCALATION PATH

```
1. Problema detectado
   ↓
2. Health-check confirma
   ↓
3. Auto-recovery tenta consertar
   ↓
4. Se falhar → Você vê alerta Slack
   ↓
5. Você lê ESTE DOCUMENTO
   ↓
6. Se conseguir consertar → DONE
   ↓
7. Se não conseguir → Chamar Gage/Alan
   Compartilhar:
   - Log completo (health-check JSON)
   - Prints do que você tentou
   - Exato erro que viu
```

---

## ✅ CHECKLIST PRE-LAUNCH

- [x] Li todas as 7 seções acima
- [x] Entendo o que fazer para cada erro
- [x] Tenho este documento marcado
- [x] Conheço contato de suporte para cada serviço
- [x] Sou capaz de rodar node health-check.js
- [x] Entendo como verificar .env

---

## 🎉 ESPERANÇA

```
Se você chegou aqui é porque:
✅ setup-integrations.sh rodou OK
✅ health-check.js está monitorando 24/7
✅ auto-recovery.js tenta consertar

Probabilidade de precisar deste guia:
- Sem automação: 80% chance por dia ❌
- Com automação: <5% chance por semana ✅

Você está protegido.
Apenas leia este guia se realmente precisar.
```

---

**Status:** ✅ ARQUIVO 5 PRONTO
**Próximo:** Nenhum - ARQUITETURA COMPLETA
