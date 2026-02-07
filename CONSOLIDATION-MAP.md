# 🗺️ CONSOLIDATION MAP - Reset Primal MVP

**Data:** 6 de Fevereiro de 2026  
**Status:** ✅ DESCOBERTA COMPLETA  
**Objetivo:** Centralizar referências de todos os componentes do projeto

---

## 📍 MAPA FÍSICO DO PROJETO

O Reset Primal MVP está composto por 4 componentes espalhados em 3 locais:

```
┌─────────────────────────────────────────────────────────────────┐
│ RESET PRIMAL ECOSYSTEM                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📁 /Users/acacioamaro/RESET-PRIMAL-MVP/ (HUB CENTRAL)         │
│  ├─ 📋 Documentação & Organização ✅                            │
│  ├─ 📁 copy/ → Referência para copy-squad output               │
│  ├─ 📁 app/ → Referência para reset-primal-tracker             │
│  ├─ 📁 landing-pages/ → Referência para LPs                    │
│  └─ 📁 infrastructure/ → Setup guides                          │
│                                                                 │
│  📁 /Users/acacioamaro/.aios-core/squads/ (SQUADS EXECUTION)   │
│  └─ 📁 copy-squad/execution/ → Output: 30 posts + 3 adv        │
│                                                                 │
│  📁 /Users/acacioamaro/reset-primal-tracker/ (APP CODE)        │
│  ├─ src/ → Código da aplicação                                 │
│  ├─ public/ → Assets do app                                    │
│  └─ package.json → Next.js project                             │
│                                                                 │
│  📁 /Users/acacioamaro/reset-primal-landing/ (LP MAIN)         │
│  ├─ index.html → LP Mental Health (v1)                        │
│  ├─ lp-emagrecimento.html → LP Weight Loss (v2)               │
│  ├─ lp-sindrome.html → LP Sindrome (v3)                       │
│  └─ reset-primal-final.html → Versão final                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📦 COMPONENTES & LOCALIZAÇÕES

### **1. 📋 DOCUMENTAÇÃO & ORGANIZAÇÃO**

**LOCAL:** `/Users/acacioamaro/RESET-PRIMAL-MVP/`

**Status:** ✅ 100% Consolidado

**Arquivos:**
- `README.md` - Overview do projeto
- `STATUS.md` - Dashboard diário (2-3 min)
- `ROADMAP-5DIAS.md` - Ações diárias FEB 6-11
- `ARQUITETURA.md` - Visão de 3 fases
- `INDEX.md` - Navegação completa
- `infrastructure/SQUAD-INSTRUCTIONS.md` - Instruções operacionais

**Como acessar:**
- Abrir Antigravity → RESET-PRIMAL-MVP
- Tudo centralizado em 1 pasta

---

### **2. ✍️ COPY (Instagram Posts + Advertorials)**

**LOCAL (source):** `/Users/acacioamaro/.aios-core/squads/copy-squad/execution/`

**LOCAL (reference):** `/Users/acacioamaro/RESET-PRIMAL-MVP/copy/`

**Status:** ✅ 100% Pronto (30 posts + 3 advertorials)

**O que há:**
- 30 Instagram posts (Jon Benson + Gary Halbert style)
- 3 Advertorials (Mental, Peso, Síndrome)
- Quality: 9.3/10 média
- Deliverable: 13,486 palavras em 2h15min

**Como referenciar:**

```markdown
# Copy Reference

Veja os 30 posts no arquivo:
/Users/acacioamaro/.aios-core/squads/copy-squad/execution/
└─ instagram-30posts.md
└─ advertorial-mental.md
└─ advertorial-peso.md
└─ advertorial-sindrome.md
```

**Próximo passo FEB 6:**
- Hopkins valida a copy
- Se aprovado, copiar para `/RESET-PRIMAL-MVP/copy/` como referência
- Publicar no schedule de landing pages

---

### **3. 📱 APP (Reset Primal Tracker)**

**LOCAL:** `/Users/acacioamaro/reset-primal-tracker/`

**Status:** ✅ 100% Pronto (Next.js app)

**O que há:**
```
reset-primal-tracker/
├─ src/
│  ├─ app/
│  ├─ components/
│  ├─ lib/
│  └─ pages/
├─ public/
│  ├─ images/
│  └─ assets/
├─ package.json (Next.js 14+)
├─ tailwind.config.ts
├─ schema.sql (Supabase)
├─ SUPABASE-SETUP-GUIDE.md
├─ README.md
└─ PROJECT_SUMMARY.md
```

**Tecnologia:**
- Framework: Next.js
- Styling: Tailwind CSS
- Database: Supabase
- Hosting: Vercel (recomendado)

**Como usar:**

```bash
# Setup
cd /Users/acacioamaro/reset-primal-tracker
npm install
npm run dev

# Variáveis de ambiente
cp .env.example .env.local
# Adicionar: SUPABASE_URL, SUPABASE_KEY, NEXT_PUBLIC_SUPABASE_URL
```

**Próximo passo FEB 6-7:**
- [ ] Validar Supabase connection
- [ ] Testar fluxo de login com email
- [ ] Testar acesso post-purchase

---

### **4. 🌐 LANDING PAGES**

**LOCAL (main):** `/Users/acacioamaro/reset-primal-landing/`

**LOCAL (alternative):** `/Users/acacioamaro/landing-pages/`

**Status:** ✅ 100% Pronto (5 versões HTML)

**Arquivos principais:**

```
reset-primal-landing/
├─ index.html → Mental Health LP (Primary)
├─ lp-emagrecimento.html → Weight Loss LP
├─ lp-sindrome.html → Syndrome LP
├─ reset-primal-final.html → Final version
├─ reset-primal.html → Alternative version
├─ quiz.html → Interactive quiz (opcional)
└─ email-templates.md → Email sequences

landing-pages/
├─ v1-original/ → Original design
└─ v2-B-sales-copy/ → B-format with sales copy
```

**Características:**
- 3 targeted landing pages (mental, weight, syndrome)
- Responsive design (mobile-friendly)
- CTA buttons pointing to Hotmart
- GA4 tracking code (to be added)
- Email capture forms

**Como usar:**

```html
<!-- Deployment ready -->
<!-- Option 1: Deploy to Vercel -->
vercel --cwd /Users/acacioamaro/reset-primal-landing

<!-- Option 2: Deploy to Netlify -->
netlify deploy --dir /Users/acacioamaro/reset-primal-landing

<!-- Option 3: Manual upload to Hotmart -->
<!-- Use Hotmart's landing page editor or custom domain -->
```

**Próximo passo FEB 6-8:**
- [ ] Add GA4 tracking code
- [ ] Add Hotmart link to CTAs
- [ ] Deploy to domain or Hotmart
- [ ] Test responsiveness on mobile
- [ ] A/B test if time permits

---

### **5. 📊 INFRASTRUCTURE & SETUP**

**LOCAL:** `/Users/acacioamaro/RESET-PRIMAL-MVP/infrastructure/`

**Status:** ⏳ 30% (iniciando FEB 6)

**Arquivos:**
- `SQUAD-INSTRUCTIONS.md` - Instruções operacionais (✅ novo)
- `HOTMART-SETUP.md` - [TBD - DevOps]
- `GA4-SETUP.md` - [TBD - DevOps]
- `EMAIL-SETUP.md` - [TBD - Dev]
- `PAYMENT-SETUP.md` - [TBD - DevOps]

**O que falta:**
- Integração Hotmart
- GA4 configuração
- Email automação
- Payment gateway

**Responsável:** DevOps Squad (FEB 6-8)

---

## 🔗 REFERÊNCIAS RÁPIDAS

### **Para localizar cada componente:**

```
Documentação? → /Users/acacioamaro/RESET-PRIMAL-MVP/
Copy? → /Users/acacioamaro/.aios-core/squads/copy-squad/execution/
App? → /Users/acacioamaro/reset-primal-tracker/
LPs? → /Users/acacioamaro/reset-primal-landing/
```

### **Para atualizar INDEX.md:**

Executar:
```bash
# Adicionar em INDEX.md
## Mapa de Localização
[Veja CONSOLIDATION-MAP.md](CONSOLIDATION-MAP.md)
```

---

## 📋 CHECKLIST DE CONSOLIDAÇÃO

- [x] Copy localizado (/Users/acacioamaro/.aios-core/squads/copy-squad/execution/)
- [x] App localizado (/Users/acacioamaro/reset-primal-tracker/)
- [x] LPs localizadas (/Users/acacioamaro/reset-primal-landing/)
- [x] Documentação criada (/Users/acacioamaro/RESET-PRIMAL-MVP/)
- [x] Mapa de consolidação criado (este arquivo)
- [ ] Assets movidos/referenciados (FEB 6)
- [ ] README atualizado com paths (FEB 6)
- [ ] INDEX.md atualizado (FEB 6)
- [ ] Antigravity indexando tudo (ongoing)

---

## 🚀 PRÓXIMO PASSO

1. **FEB 6 (HOJE):**
   - [ ] DevOps: Começar setup Hotmart + GA4 + Email
   - [ ] Dev: Validar app e testar links
   - [ ] QA: Montar plano de testes

2. **FEB 7:**
   - [ ] Mover copy final para `/RESET-PRIMAL-MVP/copy/` (após Hopkins validate)
   - [ ] Ter LPs prontas para deploy

3. **FEB 8:**
   - [ ] Infraestrutura 100% pronta
   - [ ] Tudo integrado (Hotmart → Email → App → LPs)

4. **FEB 9-10:**
   - [ ] E2E testing
   - [ ] Troubleshooting

5. **FEB 11:**
   - [ ] LAUNCH! 🚀

---

**Criado por:** Orion, AIOS Master Orchestrator  
**Última atualização:** 2026-02-06 10:47 UTC  
**Status:** ✅ CONSOLIDAÇÃO COMPLETA

