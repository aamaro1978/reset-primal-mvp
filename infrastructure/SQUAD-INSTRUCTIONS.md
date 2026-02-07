# 📋 SQUAD INSTRUCTIONS - Reset Primal MVP

**Válido para:** FEB 6-11, 2026  
**Timeline:** 5 dias até launch  
**Modo:** AGRESSIVO - Sem prazos longos, ações atômicas  
**Dono:** Acácio Amaro

---

## 🎯 Objetivo Geral

Preparar Reset Primal para launch em 11 de fevereiro com 100% de funcionalidade e validação.

**Status atual:**
- ✅ Copy: 100% (30 posts + 3 advertorials - validando hoje)
- ✅ App: 100% (reset-primal-tracker pronto)
- ✅ Landing Pages: 100% (3 versões prontas)
- ⏳ Infraestrutura: 30% (iniciando hoje)
- ⏳ Testes: Aguardando para FEB 9

---

## 👥 SQUAD ASSIGNMENTS

```
┌─────────────────────────────────────────────────────────┐
│ DEVOPS SQUAD - Infraestrutura                          │
│ Responsável: [DevOps Lead]                             │
│ Prioridade: 🔴 CRÍTICA                                 │
├─────────────────────────────────────────────────────────┤
│ Dev SQUAD - Email & App Tweaks                         │
│ Responsável: [Dev Lead]                                │
│ Prioridade: 🟠 ALTA                                    │
├─────────────────────────────────────────────────────────┤
│ QA SQUAD - Testing & Validation                        │
│ Responsável: [QA Lead]                                 │
│ Prioridade: 🟠 ALTA                                    │
└─────────────────────────────────────────────────────────┘
```

---

# 🏗️ DEVOPS SQUAD INSTRUCTIONS

## Responsabilidade

Configurar infraestrutura para receber e processar vendas no launch.

## Timeline

- **FEB 6-7:** Tier 1 (Hotmart, GA4, Email)
- **FEB 8:** Tier 2 (Payment, Final tweaks)
- **FEB 9-10:** Validação e troubleshooting
- **FEB 11:** Launch mode (monitor 24h)

---

### ✅ AÇÕES DIÁRIAS

#### **FEB 6 (HOJE) - Kickoff**

**[ ] 1. Setup Hotmart**
- Plataforma: Hotmart
- Produto: Reset Primal MVP
- Preço: $297 (ou valor definido)
- Ações:
  1. Criar conta business (se não tiver)
  2. Criar produto "Reset Primal MVP"
  3. Gerar link de vendas
  4. Configurar redirecionamento pós-venda para email
  5. Testar fluxo de pagamento (cartão teste)
- Entrega: Link de vendas funcional
- Tempo estimado: 2h

**[ ] 2. Setup GA4**
- Platform: Google Analytics 4
- Objetivo: Rastrear visitantes landing pages
- Ações:
  1. Criar propriedade GA4 (se não tiver)
  2. Gerar código de rastreamento
  3. Adicionar a TODAS as 3 landing pages (mental, peso, sindrome)
  4. Configurar eventos de conversão (clique no CTA, compra)
  5. Testar com DevTools
- Entrega: GA4 rastreando cliques nas landing pages
- Tempo estimado: 1.5h

**[ ] 3. Setup Email Base**
- Plataforma: [Definir qual - Mailchimp, Brevo, outro]
- Objetivo: Enviar sequência de emails pós-venda
- Ações:
  1. Criar conta/workspace
  2. Criar lista de emails
  3. Criar template básico (bem-vindo, próximos passos)
  4. Gerar API key (para automação futura)
- Entrega: Conta pronta, template criado
- Tempo estimado: 1h

**Daily Status:** Reportar às 18h: "Hotmart [status], GA4 [status], Email [status]"

---

#### **FEB 7 - Tier 1 Completo**

**[ ] 1. Validar Hotmart**
- Testar compra completa (com cartão teste)
- Verificar se email de confirmação é enviado
- Confirmar redirecionamento pós-venda

**[ ] 2. Validar GA4**
- Abrir cada landing page
- Clicar nos CTAs
- Verificar se aparece em GA4 após 24h
- Documentar eventos registrados

**[ ] 3. Integração Email + Hotmart**
- Configurar webhook: Hotmart → Email automático
- Testar: Fazer compra teste, verificar se email é enviado automaticamente

**Daily Status:** Reportar às 18h: "Validações [completas/pendentes]"

---

#### **FEB 8 - Tier 2 (Payment + Final)**

**[ ] 1. Setup Payment Gateway (se Hotmart não for suficiente)**
- Se usar Stripe/PayPal paralelo:
  1. Criar conta
  2. Configurar SKU
  3. Testar transação
  4. Conectar webhook

**[ ] 2. Validação Final**
- [ ] Hotmart: 3 transações teste
- [ ] GA4: 10 cliques registrados
- [ ] Email: 3 emails automáticos entregues
- [ ] Redirecionamentos: Todos funcionando
- [ ] Variáveis UTM: Configuradas em todas as landing pages

**[ ] 3. Performance Check**
- [ ] Landing pages: <3s load time
- [ ] Email delivery: <5 minutos pós-compra
- [ ] GA4: Real-time events funcionando

**Daily Status:** Reportar às 18h: "Infraestrutura [✅ READY / ⚠️ ISSUES]"

---

#### **FEB 9-10 - Troubleshooting Mode**

**[ ] 1. Daily monitoring (9am + 5pm)**
- [ ] Todos os serviços online?
- [ ] Erros nos logs?
- [ ] Emails sendo entregues?

**[ ] 2. Corrigir issues**
- Prioridade 1: Fluxo de pagamento
- Prioridade 2: Email automático
- Prioridade 3: Analytics

**Daily Status:** Reportar: "Monitoring: [OK/ISSUES], Fixes: [list]"

---

#### **FEB 11 - LAUNCH DAY**

**[ ] 1. Pre-launch (8am)**
- [ ] Hotmart online?
- [ ] Landing pages online?
- [ ] Emails configurados?
- [ ] GA4 recebendo dados?

**[ ] 2. Durante launch (9am-8pm)**
- Monitor 24/7:
  - Hotmart transações
  - GA4 eventos
  - Email delivery
  - Erros de servidor

**[ ] 3. Incident response**
- Se algo cair: Ativar protocolo de emergência
- Comunicar Acácio imediatamente

---

### 📊 DEVOPS CHECKLIST

```
FEB 6:
[ ] Hotmart: Conta criada, produto listado, link gerado
[ ] GA4: Propriedade criada, código instalado, eventos configurados
[ ] Email: Conta criada, lista pronta, template criado

FEB 7:
[ ] Hotmart: Teste de compra bem-sucedido
[ ] GA4: Eventos sendo registrados
[ ] Email: Automação funcionando

FEB 8:
[ ] Payment: Validado
[ ] Performance: OK (<3s load)
[ ] Infraestrutura: 🟢 PRONTA PARA LAUNCH

FEB 9-10:
[ ] Diário: Monitoring, 0 erros críticos

FEB 11:
[ ] 8am: Pré-launch check-in
[ ] Ao longo do dia: 24/7 monitoring
```

---

---

# 💻 DEV SQUAD INSTRUCTIONS

## Responsabilidade

Finalizar app, email sequences, landing pages tweaks.

## Timeline

- **FEB 6-7:** Email setup, app final tweaks
- **FEB 8:** Integration testing
- **FEB 9:** Bug fixes
- **FEB 10-11:** Stability

---

### ✅ AÇÕES DIÁRIAS

#### **FEB 6 (HOJE) - Email Setup**

**[ ] 1. Email Sequences - Estrutura**
- Criar sequência de 5 emails pós-venda:
  1. Email 1 (1 min após compra): Bem-vindo + Link do app
  2. Email 2 (1h depois): Como acessar curso
  3. Email 3 (next day): Primeira lição (mental health)
  4. Email 4 (day 3): Dicas de implementação
  5. Email 5 (day 5): Feedback request + upgrade offer
- Entrega: Templates prontos
- Tempo: 4h

**[ ] 2. App Final Tweaks**
- [ ] Verificar se links em emails funcionam
- [ ] Testar autenticação com email do usuário
- [ ] Testar reset de senha
- Tempo: 2h

**Daily Status:** Reportar às 18h: "Email [estrutura pronta], App [status]"

---

#### **FEB 7 - Integration Testing**

**[ ] 1. Email + App Integration**
- Testar: Email → Link → App funciona?
- [ ] Email 1 enviado
- [ ] Link válido (não expira)
- [ ] App carrega corretamente
- [ ] Usuário consegue ver conteúdo

**[ ] 2. Landing Page Links**
- [ ] Todos os CTAs apontam corretamente
- [ ] Link Hotmart funciona
- [ ] Redirecionamento pós-compra funciona

**Daily Status:** Reportar às 18h: "Integrações [✅ OK]"

---

#### **FEB 8 - Finalizações**

**[ ] 1. Copy Review**
- [ ] Hopkins validou a copy? 
- [ ] Fazer ajustes se necessário
- [ ] Atualizar landing pages com copy final

**[ ] 2. App Edge Cases**
- [ ] Teste: User com email inválido
- [ ] Teste: User que comprou 2x
- [ ] Teste: User que tentou acessar sem pagar
- Documentar bugs → Priorizar para FEB 9

**Daily Status:** Reportar às 18h: "Copy [final], Bugs [list]"

---

#### **FEB 9-10 - Bug Fixes + Stability**

**[ ] 1. Diário: Bug Triage**
- Bugs críticos: Fix hoje
- Bugs médios: Fix amanhã
- Bugs baixos: Documentar para post-launch

**[ ] 2. Load Testing**
- Se espera >100 vendas no launch:
  - [ ] Testar app com 100 usuários simultâneos
  - [ ] Verificar performance

**Daily Status:** Reportar: "Bugs fixed: [count], Stability: [score]"

---

#### **FEB 11 - LAUNCH & SUPPORT**

**[ ] 1. Standby**
- Estar disponível se algo quebrar
- Monitor Slack/email para bugs reportados

**[ ] 2. Hot fixes**
- Se algo falhar: Fix e deploy em <30 min

---

### 📊 DEV CHECKLIST

```
FEB 6:
[ ] Email: 5 templates prontos
[ ] App: Links funcionando

FEB 7:
[ ] Email + App: Integração testada
[ ] Landing pages: CTAs OK

FEB 8:
[ ] Copy final integrada
[ ] Bugs documentados

FEB 9-10:
[ ] Bugs: Fixados (críticos e médios)
[ ] Estabilidade: ✅

FEB 11:
[ ] Standby: Pronto para responder bugs
```

---

---

# 🧪 QA SQUAD INSTRUCTIONS

## Responsabilidade

Testes end-to-end, validação de fluxo completo, garantir 0 erros no launch.

## Timeline

- **FEB 6-7:** Setup plano de testes
- **FEB 8:** Testes funcionais
- **FEB 9:** Testes de carga + UX
- **FEB 10:** Testes finais
- **FEB 11:** Monitor durante launch

---

### ✅ AÇÕES DIÁRIAS

#### **FEB 6 (HOJE) - Plano de Testes**

**[ ] 1. Criar Plano de Testes**
- Documento: Reset-Primal-MVP-TEST-PLAN.md
- Seções:
  1. Casos de teste (funcional)
  2. Casos de teste (segurança)
  3. Casos de teste (performance)
  4. Casos de teste (UX)
- Entrega: Plano documentado
- Tempo: 3h

**[ ] 2. Preparar Ambiente de Teste**
- [ ] Criar 5 contas teste (emails diferentes)
- [ ] Preparar dados de teste (produtos, usuários)
- [ ] Setup ferramentas: Postman (APIs), BrowserStack (multi-device)
- Tempo: 2h

**Daily Status:** Reportar às 18h: "Plano pronto, Ambiente OK"

---

#### **FEB 7 - Testes Funcionais**

**[ ] 1. Fluxo de Compra Completo**

Testar: Landing page → Hotmart → Email → App

```
Test Case 1: Compra com cartão válido
[ ] Abrir landing page
[ ] Clicar CTA
[ ] Preencher form (nome, email)
[ ] Realizar pagamento (cartão teste)
[ ] Receber email confirmação
[ ] Acessar app com email/senha
[ ] Visualizar conteúdo
Resultado: ✅ PASS / ❌ FAIL
```

**Repetir 5x com diferentes dados**

**[ ] 2. Fluxo de Erro**
- [ ] Cartão inválido → Mensagem clara?
- [ ] Email incorreto → Rejeita?
- [ ] Link expirado → Mensagem clara?

**Daily Status:** Reportar: "Testes funcionais: X% completo, [Lista de bugs]"

---

#### **FEB 8 - Testes de Carga + UX**

**[ ] 1. Load Testing**
- Simular 50 usuários acessando app simultaneamente
- [ ] Performance aceitável?
- [ ] Erros de servidor?
- [ ] Emails ainda sendo entregues?

**[ ] 2. Teste em Múltiplos Dispositivos**
- [ ] Desktop (Chrome, Safari)
- [ ] Mobile (iOS, Android)
- [ ] Tablet
- Layout responsivo? Tudo funciona?

**[ ] 3. Teste de Segurança Básica**
- [ ] Não consegue acessar app sem pagar
- [ ] Não consegue modificar outro usuário
- [ ] Senhas não aparecem em logs
- [ ] HTTPS em todas as páginas

**Daily Status:** Reportar: "Load: ✅/❌, UX: ✅/❌, Security: ✅/❌"

---

#### **FEB 9-10 - Testes Finais + Regression**

**[ ] 1. Regressão (verificar se nada quebrou)**
- Repetir todos os testes de FEB 7-8
- Novo build? Testar tudo novamente

**[ ] 2. Casos Edge**
- [ ] Usuário compra, espera 5 min, tenta acessar app
- [ ] Usuário refresha página durante compra
- [ ] Usuário fecha aba antes de confirmar pagamento
- [ ] Usuário recebe email em spam, clica link atrasado

**[ ] 3. Stress Testing (opcional se houver tempo)**
- [ ] 200 usuários simultâneos
- [ ] Sistema aguenta?

**Daily Status:** Reportar: "Status: [% completo], Issues: [count critical/medium/low]"

---

#### **FEB 11 - LAUNCH DAY**

**[ ] 1. Pre-launch (8am)**
- [ ] Suite de testes automáticos roda: ✅
- [ ] Manual sanity check: ✅
- [ ] Ambiente production pronto: ✅

**[ ] 2. Durante launch (9am-8pm)**
- Monitor:
  - Erros em production?
  - Usuários conseguem comprar?
  - Emails são entregues?
  - App funciona depois da compra?
- Reportar issues em <5 min

**[ ] 3. Incident response**
- Se bug encontrado durante venda:
  - Reportar a Dev/DevOps
  - Reexecutar teste após fix
  - Validar fix em production

---

### 📊 QA CHECKLIST

```
FEB 6:
[ ] Plano de testes: Pronto
[ ] Ambiente: Configurado
[ ] Contas teste: Criadas

FEB 7:
[ ] Fluxo de compra: 5 testes bem-sucedidos
[ ] Fluxos de erro: Documentados
[ ] Bugs: [count]

FEB 8:
[ ] Load test: <500ms response time
[ ] UX multi-device: ✅
[ ] Segurança básica: ✅

FEB 9-10:
[ ] Regressão: 0 bugs críticos
[ ] Edge cases: Testados
[ ] Status: 🟢 PRONTA PARA LAUNCH

FEB 11:
[ ] Pre-launch: ✅
[ ] Durante launch: Monitoring ativo
[ ] Tempo de resposta a bugs: <5 min
```

---

---

## 🔄 COMUNICAÇÃO ENTRE SQUADS

### Daily Sync (18h)

**Formato:**
```
DEVOPS: [Status Hotmart/GA4/Email], [Issues], [Bloqueios]
DEV: [Email setup/App status], [Issues], [Bloqueios]
QA: [Testes % completo], [Bugs found], [Bloqueios]
ACÁCIO: Decisões necessárias
```

### Status Updates

**Local:** #reset-primal-squad (Slack/Teams)

**Formato:**
```
🟢 PRONTA / 🟡 EM PROGRESSO / 🔴 BLOQUEADA
SQUAD: [Squad name]
STATUS: [Breve descrição]
PRÓXIMA AÇÃO: [O que fazer amanhã]
BLOQUEIOS: [Se houver]
```

---

## 🚨 PROTOCOLO DE EMERGÊNCIA

Se algo crítico quebra durante FEB 8-11:

1. **Reportar imediatamente** a Acácio
2. **P1 Bugs:** Dropar tudo, fix agora
3. **P2 Bugs:** Fila para próxima janela
4. **P3 Bugs:** Documentar para post-launch

---

## ✅ Próximos Passos

- [ ] Cada squad lê suas instruções (30 min)
- [ ] Cada squad reporta: "Pronto para começar"
- [ ] FEB 6: Kickoff de todas as tarefas

**Você está pronto para começar?**

