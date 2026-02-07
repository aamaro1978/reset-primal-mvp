# 📱 RESET PRIMAL - MARKETING SQUAD BRIEF

**Data:** FEB 6, 2026
**Projeto:** Reset Primal MVP
**Launch:** FEB 11, 2026 (5 dias)
**Status:** Infraestrutura ✅ | Marketing 🔄 Revisão

---

## 📊 MARKETING ASSETS PRONTOS PARA REVISÃO

### 1. **Copy - 13,182 palavras** ✅
**Estrutura:** 3 séries temáticas

#### Serie A: Mental Clarity
- 10 Instagram Posts (gatilhos psicológicos para clareza mental)
- 1 Advertorial (3,247 palavras)
- Foco: Foco, clareza, concentração

#### Serie B: Peso/Weight Loss
- 10 Instagram Posts (gatilhos para perda de peso)
- 1 Advertorial (3,289 palavras)
- Foco: Energia, vitalidade, transformação do corpo

#### Serie C: Síndrome Metabólica
- 10 Instagram Posts (gatilhos para síndrome metabólica)
- 1 Advertorial (3,156 palavras)
- Foco: Saúde metabólica, prevenção, qualidade de vida

**Métricas Copy:**
- 30 Instagram Posts: 3,794 palavras
- 3 Advertorials: 9,692 palavras
- Triggers psicológicos: 28-29 de 30 por advertorial
- Status: Validação Hopkins em progresso

---

### 2. **Landing Pages - 3 versões HTML** ✅
**Estrutura:** Responsivo mobile + Desktop

#### Landing Page 1: Mental Clarity
- Arquivo: `landing-pages/mental-clarity/index.html`
- Copy integrado: Serie A copy
- CTA: Link para Hotmart (purchase flow)
- Tracking: GA4 + Meta Pixel (snippets sendo adicionados agora)

#### Landing Page 2: Peso/Weight Loss
- Arquivo: `landing-pages/weight-loss/index.html`
- Copy integrado: Serie B copy
- CTA: Link para Hotmart
- Tracking: GA4 + Meta Pixel

#### Landing Page 3: Síndrome Metabólica
- Arquivo: `landing-pages/metabolic-syndrome/index.html`
- Copy integrado: Serie C copy
- CTA: Link para Hotmart
- Tracking: GA4 + Meta Pixel

**Especificações:**
- Responsivo: Mobile, tablet, desktop
- Performance: Otimizado para velocidade
- Acessibilidade: WCAG 2.1 AA
- SEO: Meta tags, schema.org, keywords

---

### 3. **Assets** 📁
**Estrutura:** Criada, pronta para mídia

#### Imagens (Requeridas):
- Thumbnails Instagram (1080x1080px)
- Hero images Landing Pages (1920x600px+)
- Benefit/product images
- Avatar images (se houver)

#### Vídeos (Opcional):
- Testimonio videos
- Demo videos
- Intro videos

#### Fontes:
- Tipografia customizada
- Ícones SVG

---

## 🎯 TAREFAS PARA MARKETING SQUAD

### PRIORITÁRIO (FEB 6-7):

**1. COPY REVIEW**
- [ ] Revisar 30 Instagram Posts
  - Verificar tone of voice consistência
  - Otimizar CTAs
  - Adicionar emojis/hashtags estratégicos
- [ ] Revisar 3 Advertorials
  - Fluxo de persuasão
  - Objection handling
  - Call-to-action clarity
- [ ] Documentar improvements em `/docs/copy-improvements.md`

**2. LANDING PAGE OPTIMIZATION**
- [ ] Teste A/B para títulos (headline variations)
- [ ] Teste A/B para CTAs (button text/color)
- [ ] Otimizar form fields (se houver)
- [ ] Melhorar social proof sections
- [ ] Documentar em `/docs/ab-testing-plan.md`

**3. ASSET GATHERING**
- [ ] Coletar/criar imagens Instagram
- [ ] Coletar/criar hero images
- [ ] Criar/otimizar thumbnails
- [ ] Adicionar em `/assets/`

### SECUNDÁRIO (FEB 7-8):

**4. INTEGRAÇÕES VERIFICAR**
- [ ] GA4 tracking funcionando em landing pages
- [ ] Meta Pixel events disparing
- [ ] Email links funcionando (Brevo)
- [ ] Hotmart purchase flow
- [ ] Documentar em `/docs/integration-validation.md`

**5. EMAIL SEQUENCES COMPLEMENTAR**
- [ ] Design template para 5 emails
- [ ] Copy optimization
- [ ] Layout responsivo
- [ ] Links funcionando
- [ ] Documentar em `/docs/email-templates.md`

---

## 📈 MÉTRICAS DE SUCESSO

### Copy Quality:
- ✅ 28-30 triggers psicológicos por advertorial (target: 30)
- ✅ Tone of voice consistente across all 3 series
- ✅ CTAs claros e acionáveis

### Landing Page Performance:
- ✅ Page Load < 3s (Core Web Vitals)
- ✅ Mobile conversion rate optimized
- ✅ Form completion > 40%
- ✅ GA4 tracking 100% operational

### Overall Marketing Readiness:
- ✅ Copy + LPs + Assets coordenados
- ✅ Tracking funcionando (GA4 + Meta)
- ✅ Email sequences ready
- ✅ Hotmart integration tested

---

## 📂 ESTRUTURA DE PASTAS

```
RESET-PRIMAL-MVP/
├── copy/                    ← 30 Posts + 3 Advertorials
│   ├── instagram-posts.md
│   ├── advertorial-mental-clarity.md
│   ├── advertorial-weight-loss.md
│   └── advertorial-metabolic-syndrome.md
│
├── landing-pages/           ← 3 versões HTML
│   ├── mental-clarity/
│   │   ├── index.html
│   │   └── styles.css
│   ├── weight-loss/
│   │   ├── index.html
│   │   └── styles.css
│   └── metabolic-syndrome/
│       ├── index.html
│       └── styles.css
│
├── assets/                  ← Mídia (imagens, vídeos, fontes)
│   ├── images/
│   ├── videos/
│   └── fonts/
│
└── docs/                    ← Documentação marketing
    ├── copy-improvements.md
    ├── ab-testing-plan.md
    ├── integration-validation.md
    └── email-templates.md
```

---

## 🔗 CONTEXTO TÉCNICO

### Integrações Ativos:
- **Hotmart:** Payment gateway (webhook configured)
- **GA4:** Event tracking (snippets being installed)
- **Meta Pixel:** Conversion tracking (snippets being installed)
- **Brevo:** Email delivery (API configured)
- **Supabase:** User data (auth + storage)

### Timeline Dependências:
- **FEB 6 (Hoje):** Copy + LP ready for review ← YOU ARE HERE
- **FEB 7:** Snippets installed + tracking live
- **FEB 8:** Full integration testing
- **FEB 9:** Final validations
- **FEB 11:** LAUNCH

---

## 💡 NOTAS IMPORTANTES

1. **Copy foi validada com 28-30 triggers** - Hopkins pode dar mais sugestões
2. **Landing pages estão prontas** - Esperando snippets de @dev
3. **Tracking vai estar 100% ativo em FEB 7** - Você vai poder monitorar performance real
4. **Não mexer em:** Infraestrutura, app, test infrastructure
5. **Focar em:** Copy optimization, landing page UX, asset quality

---

## 📞 NEXT STEPS

**Immediately:**
1. Revisar copy (Instagram posts + advertorials)
2. Revisar landing pages (design, copy flow, CTAs)
3. Listar assets necessários

**By FEB 7:**
1. Implementar improvements
2. Testar tracking (GA4 + Meta)
3. Validar email sequences

**By FEB 8:**
1. Final optimization
2. A/B testing results
3. Performance metrics

---

**Documento criado:** FEB 6, 2026, 10:50 AM
**Próxima atualização:** FEB 7, 20:00 (daily standup)
**Status:** 🚀 READY FOR MARKETING SQUAD REVIEW
