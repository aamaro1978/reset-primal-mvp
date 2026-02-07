# 📑 ÍNDICE - MAPA DE NAVEGAÇÃO

**Use este arquivo como seu GPS. Tudo está aqui.**

---

## 🚀 ONDE COMEÇAR

### Se é MANHÃ e você acordou:
1. Abra `STATUS.md` (2 min)
2. Saiba o que fazer hoje
3. Faça

### Se está PERDIDO:
1. Abra `ROADMAP-5DIAS.md` (5 min)
2. Encontre o dia de hoje
3. Siga as ações listadas

### Se está DOENTE E QUER ENTENDER:
1. Abra `README.md` (5 min)
2. Leia a visão geral
3. Abra `ARQUITETURA.md` (15 min)
4. Entenda a visão maior

---

## 📚 DOCUMENTO POR DOCUMENTO

### 🗺️ CONSOLIDATION-MAP.md
**O quê:** Mapa de consolidação completo (onde cada componente está)  
**Por quê:** Saber onde cada coisa está (copy, app, LPs, etc)  
**Quando:** Quando precisar localizar um componente  
**Tempo:** 10 minutos  

→ **Contém:**
- Localização exata de cada componente
- Estrutura do projeto espalhado
- Referências a pastas externas
- Checklist de consolidação

---

### 🎯 README.md
**O quê:** Visão geral do projeto  
**Por quê:** Entender o contexto  
**Quando:** Quando acordar ou quando novo  
**Tempo:** 5 minutos  

→ **Contém:**
- O que é Reset Primal MVP
- Estrutura de pastas
- Quick start
- Próximas ações

---

### 📊 STATUS.md
**O quê:** Dashboard diário  
**Por quê:** Saber exatamente onde você está  
**Quando:** TODOS OS DIAS (8 AM e 8 PM)  
**Tempo:** 2-3 minutos  

→ **Contém:**
- Status de cada componente
- O que está pronto
- O que está em progresso
- Bloqueadores (se houver)
- Checklist de hoje
- Progresso visual

---

### 📅 ROADMAP-5DIAS.md
**O quê:** Ações específicas por dia  
**Por quê:** Saber EXATAMENTE o que fazer cada dia  
**Quando:** Quando precisar de direcionamento  
**Tempo:** 5-10 minutos (seção do dia)  

→ **Contém:**
- FEB 6 (hoje): Validação Tier 3
- FEB 7: Infrastructure T1
- FEB 8: Infrastructure T2
- FEB 9: Testes E2E
- FEB 10: Descanso
- FEB 11: Launch
- Cada dia com ações específicas
- Responsáveis por ação
- Timeline

---

### 🏗️ ARQUITETURA.md
**O quê:** Visão de longo prazo (a PLATAFORMA)  
**Por quê:** Entender que Reset Primal é apenas MVP  
**Quando:** Quando quiser inspiração ou contexto  
**Tempo:** 15-20 minutos  

→ **Contém:**
- Grande objetivo (plataforma)
- Como Reset Primal encaixa
- Arquitetura atual vs futura
- Modelo de negócio
- Fases de desenvolvimento
- Stack técnico
- Próximos passos

---

### 🎯 CHECKLIST-LANCAMENTO.md
**O quê:** 117 itens para validar antes de lançar  
**Por quê:** Não esquecer nada  
**Quando:** FEB 9-10 (antes de launch)  
**Tempo:** 30-45 minutos (completo)  

→ **Contém:**
- Copy validation
- Infrastructure validation
- Landing page validation
- App validation
- Analytics validation
- Email validation
- Payment validation
- Marketing validation

---

## 📁 PASTAS E CONTEÚDO

### `/copy/` - Copy Pronto para Publicar
```
/copy/
├── instagram-30posts.md
│   ├── Series A: Mental (10 posts)
│   ├── Series B: Peso (10 posts)
│   └── Series C: Síndrome (10 posts)
│
├── advertorial-mental.md (3,247 palavras)
├── advertorial-peso.md (3,289 palavras)
└── advertorial-sindrome.md (3,156 palavras)

STATUS: ✅ 100% PRONTO
QUALIDADE: 9.3/10
PRÓXIMO: Publicar no Instagram (FEB 11)
```

---

### `/app/` - Tracker App
```
/app/
└── Link simbólico para /reset-primal-tracker/

CONTÉM:
├── Next.js 14 app
├── Supabase database
├── Daily checklist
├── Weekly metrics
├── 21-day timeline
└── Mobile responsive

STATUS: ✅ 100% PRONTO
PRÓXIMO: Deploy em Vercel (FEB 7)
```

---

### `/landing-pages/` - 3 Versões LP
```
/landing-pages/
├── /mental/
│   └── index.html (Mental Clarity LP)
│
├── /peso/
│   └── index.html (Weight Loss LP)
│
└── /sindrome/
    └── index.html (Síndrome Metabólica LP)

STATUS: ✅ 100% PRONTO
PRÓXIMO: Linkar com Hotmart (FEB 7)
```

---

### `/infrastructure/` - Setup Instructions
```
/infrastructure/
├── HOTMART-SETUP.md
│   └─ Como criar 3 produtos + webhooks
│
├── GA4-SETUP.md
│   └─ Como instalar tracking em LPs
│
├── EMAIL-SETUP.md
│   └─ Como criar 3 sequences
│
└── PAYMENT-SETUP.md
    └─ Como integrar Stripe

STATUS: ⏳ 30% PRONTO
PRÓXIMO: Implement FEB 7-8
```

---

### `/assets/` - Imagens e Recursos
```
/assets/
├── /images/ (logos, banners)
├── /downloads/ (PDFs, templates)
└── /videos/ (se houver)

STATUS: ⏳ EM CONSTRUÇÃO
PRÓXIMO: Adicionar conforme necessário
```

---

### `/docs/` - Documentação Técnica
```
/docs/
├── API-REFERENCE.md (endpoints)
├── DATABASE-SCHEMA.md (Supabase)
├── DEPLOYMENT-GUIDE.md (Vercel + Railway)
└── TROUBLESHOOTING.md (common issues)

STATUS: ⏳ EM CONSTRUÇÃO
PRÓXIMO: Criar conforme implementar
```

---

## 🎯 ARQUIVOS MAIS IMPORTANTES

Leia nesta ordem:

1. **README.md** (contexto) → 5 min
2. **STATUS.md** (onde você está) → 2 min
3. **ROADMAP-5DIAS.md** (o que fazer hoje) → 5 min
4. **ARQUITETURA.md** (visão maior) → 15 min
5. **CHECKLIST-LANCAMENTO.md** (antes de lançar) → 30 min

---

## 🔄 PADRÃO DE USO

**DIARIAMENTE (8 AM):**
```
1. Abra STATUS.md
2. Leia resumo do dia
3. Abra ROADMAP-5DIAS.md
4. Siga as ações
5. Trabalhe
```

**DIARIAMENTE (8 PM):**
```
1. Abra STATUS.md
2. Atualize com o que fez
3. Documente bloqueadores
4. Revise próximo dia
5. Durma sabendo que progrediu
```

**QUANDO PERDIDO:**
```
1. Abra ROADMAP-5DIAS.md
2. Encontre o dia de hoje
3. Siga as ações específicas
4. Pronto
```

---

## 👥 QUEM FAZE O QUÊ

| Squad | Membro | Task | Timeline |
|-------|--------|------|----------|
| Copy | Jon Benson | 30 posts | ✅ DONE |
| Copy | Gary Halbert | 3 advertorials | ✅ DONE |
| Validation | Claude Hopkins | A/B testing | FEB 6-10 |
| Infrastructure | Gage (DevOps) | Hotmart, GA4, Payment | FEB 7-8 |
| Infrastructure | Dex (Dev) | Email, App | FEB 7-8 |
| QA | Quinn (QA) | Testing | FEB 8-9 |
| Coordination | Você | Orquestra tudo | FEB 6-11 |

---

## ⚡ QUICK REFERENCE

**Preciso saber o STATUS agora:**
→ Abra `STATUS.md`

**Não sei o que fazer hoje:**
→ Abra `ROADMAP-5DIAS.md` e encontre seu dia

**Estou com dúvida sobre a visão:**
→ Abra `ARQUITETURA.md`

**Vou lançar em breve:**
→ Abra `CHECKLIST-LANCAMENTO.md`

**Preciso entender o que é Reset Primal:**
→ Abra `README.md`

---

## 🚀 PRÓXIMA AÇÃO

1. Você está aqui (INDEX.md) ← AGORA
2. Vá para `STATUS.md` ← PRÓXIMO
3. Depois `ROADMAP-5DIAS.md` ← DEPOIS
4. Trabalhe ← FINALMENTE

---

**Este é seu mapa. Use-o.**

Você não está perdido. Você tem um caminho claro.

Vamos lançar isto em 5 dias. 🚀
