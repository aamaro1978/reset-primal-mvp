# 🎯 Marketing Squad - API Integration Guide

**Para**: Time de Marketing  
**Objetivo**: Usar a API para gerar e publicar conteúdo automaticamente  
**Timeline**: FEB 6-11, 2026

---

## 📋 Visão Geral

Você tem **30 posts** de Instagram, **5 emails**, e **3 vídeos** para publicar em FEB 11.

Em vez de:
- ❌ Usar ferramentas manuais de design (2 min × 30 = 60 min)
- ❌ Gerar conteúdo por platform manualmente (3 horas)
- ❌ Publicar manualmente em cada channel (1 hora)

Você agora pode:
- ✅ Enviar **copy** para a API
- ✅ A API **gera imagens** (DALL-E 3) + **vídeos** (FFmpeg)
- ✅ A API **publica** automaticamente (Instagram, Email, YouTube)
- ✅ **Tempo total**: 15 minutos para 38 assets! 🚀

---

## 🎯 Seu Processo - Dia a Dia

### **FEB 6 - Segunda (Hoje)**

**O que você faz:**
1. Organizar todos os 30 posts em planilha CSV:
   ```
   campaign_id, copy, cta, cta_url, platform, series
   reset-primal-mvp, "Seu cérebro confuso?...", "Clique aqui", https://..., instagram, mental-clarity
   ```

2. Passar a planilha para @dev

**O que @dev faz:**
- Configura API keys
- Testa endpoints

---

### **FEB 7 - Terça**

**O que você faz:**
1. Review primeiras 5 imagens geradas
2. Aprovar ou solicitar ajustes

**O que @dev faz:**
- Gera primeiras imagens (DALL-E 3)
- Ajusta prompts se necessário

---

### **FEB 8 - Quarta**

**O que você faz:**
- Monitor geração de imagens
- Review qualidade

**O que @dev faz:**
- Gera todas as 30 imagens
- Gera 3 vídeos
- Setup publicação

---

### **FEB 9 - Quinta**

**O que você faz:**
- Fazer dry-run (publicar 3 posts de teste)
- Verificar aparência em cada channel

**O que @dev faz:**
- Setup publicação em todos channels
- Testa fluxo end-to-end

---

### **FEB 10 - Sexta**

**O que você faz:**
- Final QA checklist
- Aprovação final

**O que @dev faz:**
- Monitoramento setup
- Incident response plan

---

### **FEB 11 - Sábado (GO LIVE)**

**O que você faz:**
- 🎉 Apertar o botão "PUBLISH ALL"

**Sistema faz:**
- 📸 30 posts em Instagram
- 📧 5 emails
- 🎬 3 vídeos em YouTube
- 💰 Meta Ads
- ✅ **Tudo ao mesmo tempo**

---

## 📊 Formato de Dados - Como enviar copy

### Option 1: CSV (Recomendado para volume)

Criar arquivo `marketing-content.csv`:

```csv
campaign_id,series,copy,cta,cta_url,platform,style,hashtags
reset-primal-mvp,mental-clarity,"Você sente seu cérebro confuso? Isso é...",Clique aqui,https://resetprimal.com,instagram,minimalist,"#mentalhealth,#reset"
reset-primal-mvp,mental-clarity,"Transforme sua clareza mental...",Saiba mais,https://resetprimal.com/clarity,email,professional,"#brain,#focus"
reset-primal-mvp,energy-boost,"Cansaço que não passa?...",Descubra,https://resetprimal.com/energy,instagram,vibrant,"#energy,#motivation"
```

### Option 2: JSON (Para integrações diretas)

```json
{
  "campaign_id": "reset-primal-mvp",
  "posts": [
    {
      "series": "mental-clarity",
      "copy": "Você sente seu cérebro confuso?",
      "cta": "Clique aqui",
      "cta_url": "https://resetprimal.com",
      "platform": "instagram",
      "style": "minimalist"
    }
  ]
}
```

---

## 🚀 Como usar a API - Passo a Passo

### **Passo 1: Gerar Imagens**

Você envia:
```
Copy: "Transforme sua clareza mental em 30 dias"
Platform: Instagram
Style: Minimalist
```

API retorna:
```
Job ID: 550e8400-...
Status: Generating
Image URL: https://d123456789.cloudfront.net/img.jpg ✅
```

**Tempo**: 2-3 minutos por imagem

### **Passo 2: Gerar Vídeos (Opcional)**

Você envia:
```
Images: [img1.jpg, img2.jpg, img3.jpg]
Duration: 30 segundos
```

API retorna:
```
Job ID: 660e8400-...
Video URL: https://d123456789.cloudfront.net/video.mp4 ✅
```

**Tempo**: 5-10 minutos por vídeo

### **Passo 3: Publicar em Todos Canais**

Você envia:
```
Campaign: reset-primal-mvp
Assets: [posts com imagens]
Channels: [instagram, email, meta_ads, youtube]
```

API faz:
```
✅ Instagram post criado
✅ Email enviado
✅ Meta Ads creative criado
✅ YouTube vídeo uploaded
✅ Tracking ativado
```

**Tempo**: < 1 minuto para todos os canals

---

## 📱 Resultado Final - O que você vê

### Instagram
```
[Imagem]
"Transforme sua clareza mental em 30 dias 🧠"
#mentalhealth #reset
👉 Link na bio

📊 Automático: 
- Hashtags otimizadas
- Melhor horário (IA)
- Rastreamento de CTR
```

### Email
```
From: noreply@resetprimal.com
Subject: Clareza Mental em 30 Dias

[Imagem responsiva]
Transforme sua clareza mental...
[CTA Button]

✅ Automático:
- Segmentação
- A/B Testing
- Analytics
```

### YouTube
```
[Vídeo com transições]
Título: Clareza Mental em 30 Dias
Descrição: [Auto-generated]
Tags: #mentalhealth #reset

✅ Automático:
- Captions
- Thumbnail
- Playlist automática
```

---

## ✅ QA Checklist - O que você precisa verificar

### **FEB 8 - First Batch (5 posts)**

- [ ] Imagens geradas com qualidade?
- [ ] Copy aparece correto?
- [ ] Cores/style match brand guidelines?
- [ ] CTAs estão visíveis?
- [ ] Links funcionam?

### **FEB 9 - Dry Run (3 posts)**

- [ ] Instagram post publicado?
- [ ] Email entregue?
- [ ] Meta Ads creative criado?
- [ ] YouTube video uploaded?
- [ ] Analytics tracking ok?

### **FEB 10 - Final Approval**

- [ ] Todos 30 posts aprovados?
- [ ] Todos 5 emails prontos?
- [ ] Todos 3 vídeos prontos?
- [ ] Schedules alinhados?
- [ ] Backup feito?

### **FEB 11 - Pre-Launch**

- [ ] API rodando sem erros?
- [ ] Redis/Queues ok?
- [ ] Monitoring ativo?
- [ ] Team available?
- [ ] Rollback plan ready?

---

## 📊 Monitoramento em Tempo Real

### Dashboard de Jobs

Acesso: `http://localhost:3001/bull`

Você vê:
- ✅ Quantos posts geraram com sucesso
- ⏳ Quantos estão gerando
- ❌ Quantos falharam
- ⏱️ Quanto tempo cada um levou

### Métricas Importantes

```
Total Assets: 38
├─ Images: 30 (2.5 min cada)
├─ Videos: 3 (8 min cada)
└─ Publish jobs: 1 (1 min)

Timeline:
├─ Image generation: 75 min
├─ Video generation: 24 min
└─ Publishing: 1 min
Total: ~100 min (1h40min)
```

### Alertas

Sistema alerta você se:
- ❌ Imagem falhar após 3 tentativas
- ⚠️ Publicação falhar
- 🔴 API down
- 💾 Disco cheio
- 🚨 Memory leak

---

## 🆘 Problemas Comuns

### "Imagem não se parece com o esperado"

**Solução:**
1. Revisar copy - está clara a intenção visual?
2. Ajustar "style" (minimalist → vibrant, etc)
3. Regenerar

### "Email não foi entregue"

**Solução:**
1. Verificar lista de emails válidos
2. Testar com seu próprio email
3. Verificar folder de spam

### "Instagram post não apareceu"

**Solução:**
1. Verificar token Meta (validade)
2. Verificar bot permissions
3. Aguardar 15 min (às vezes leva tempo)

### "Video muito grande/pequeno"

**Solução:**
1. Ajustar duration
2. Ajustar resolução
3. Comprimir no FFmpeg

---

## 📈 Métricas que você pode rastrear

### Geração
- Tempo médio por imagem
- Taxa de sucesso
- Número de variações geradas

### Publicação
- Posts por channel
- Taxa de entrega
- Engagement rate

### Conversão
- CTR por campanha
- Taxa de conversão
- ROI por channel

---

## 🎓 Treinamento - Quanto Tempo Leva

| Módulo | Tempo | Quem |
|--------|-------|------|
| Visão Geral | 15 min | Product Manager |
| Como usar API | 30 min | @dev |
| QA & Testing | 30 min | QA Team |
| Monitoring | 15 min | @dev |
| **Total** | **90 min** | **Team** |

---

## 🚀 Próximos Passos

### **Hoje (FEB 6)**
- [ ] Ler este documento
- [ ] Preparar CSV com 30 posts
- [ ] Passar para @dev

### **Amanhã (FEB 7)**
- [ ] Review primeiras 5 imagens
- [ ] Feedback para ajustes
- [ ] Prepare emails

### **FEB 8-10**
- [ ] Monitor geração
- [ ] QA checklist
- [ ] Aprovação final

### **FEB 11**
- [ ] 🎉 Publicar tudo!

---

## 📞 Contatos

| Papel | Responsável | Slack |
|-------|------------|-------|
| API Tech | @dev | #engineering |
| Marketing | @po | #marketing |
| QA | @qa | #qa |
| Product | PM | #product |

---

## 📋 Documentação Completa

- **Para Developers**: `README.md` + `api/README.md`
- **Para Deploy**: `DEPLOYMENT-CHECKLIST.md`
- **Para Começar**: `QUICK-START.md`
- **Para Marketing**: Este documento!

---

## ✨ Summary

**Antes**: 4 horas de trabalho manual  
**Depois**: 15 minutos para apertar o botão 🚀

**Você ganha:**
- ⏰ 3h45min por campanha
- 📊 Dados & Analytics automáticos
- 🎯 Publicação simultânea
- 🔄 Fácil repetir no futuro

---

**Status**: Ready para FEB 11 🎉

Alguma dúvida? Abra uma issue ou chame @dev no Slack!
