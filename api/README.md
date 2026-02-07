# 🚀 Reset Primal API - Image & Video Generation + Publishing

Automação completa para gerar imagens e vídeos com IA, e publicar automaticamente em múltiplos canais.

---

## 📋 Visão Geral

Este servidor API fornece 3 endpoints principais:

1. **POST /api/v1/generate/image** - Gera imagens com DALL-E 3
2. **POST /api/v1/generate/video** - Gera vídeos com FFmpeg
3. **POST /api/v1/publish/campaign** - Publica em Instagram, Email, Landing Pages, Meta Ads, YouTube

Todos os endpoints são **assíncronos** com suporte a **polling** e **webhooks**.

---

## 🔧 Instalação

### 1. Instalar Dependências

```bash
cd api
npm install
```

### 2. Configurar Variáveis de Ambiente

Edite `../.env` com suas credenciais:

```bash
# OpenAI (DALL-E 3)
OPENAI_API_KEY=sk_test_...

# AWS S3
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
S3_BUCKET=reset-primal-assets

# Meta (Instagram + Ads)
META_ACCESS_TOKEN=EAABsbCS...
INSTAGRAM_BUSINESS_ACCOUNT_ID=17841400000000000
META_AD_ACCOUNT_ID=act_...

# YouTube
YOUTUBE_ACCESS_TOKEN=ya29.a0AfH6SMBx...

# Brevo (Email)
BREVO_API_KEY=xkeysib_...

# Redis (Queue)
REDIS_HOST=localhost
REDIS_PORT=6379

# API
API_PORT=3001
NODE_ENV=production
```

### 3. Iniciar Redis

```bash
# macOS (Homebrew)
brew services start redis

# Or Docker
docker run -d -p 6379:6379 redis:latest
```

### 4. Iniciar Servidor

```bash
npm start

# Development (com auto-reload)
npm run dev
```

Servidor rodando em: `http://localhost:3001`

---

## 📡 ENDPOINT 1: Generate Images

### Request

```bash
POST /api/v1/generate/image
Content-Type: application/json

{
  "campaign_id": "reset-primal-mvp",
  "copy": "Você sente seu cérebro confuso? Reset Primal é...",
  "series": "mental-clarity",
  "platform": "instagram",
  "style": "minimalist",
  "generate_variations": 3
}
```

### Response (202 Accepted)

```json
{
  "status": "generating",
  "job_id": "550e8400-e29b-41d4-a716-446655440000",
  "campaign_id": "reset-primal-mvp",
  "platform": "instagram",
  "estimated_time": "120s",
  "polling_url": "/api/v1/jobs/550e8400-e29b-41d4-a716-446655440000"
}
```

### Monitorar Progresso

```bash
GET /api/v1/jobs/550e8400-e29b-41d4-a716-446655440000
```

Response:

```json
{
  "job_id": "550e8400-e29b-41d4-a716-446655440000",
  "campaign_id": "reset-primal-mvp",
  "status": "completed",
  "progress": 100,
  "result": {
    "success": true,
    "images": [
      {
        "variation": 1,
        "generated_prompt": "...",
        "processed_urls": {
          "s3_url": "https://...",
          "cdn_url": "https://..."
        }
      }
    ],
    "processing_time_ms": 85000
  }
}
```

---

## 🎬 ENDPOINT 2: Generate Videos

### Request

```bash
POST /api/v1/generate/video
Content-Type: application/json

{
  "campaign_id": "reset-primal-mvp",
  "images": [
    "https://d123456789.cloudfront.net/.../img1.jpg",
    "https://d123456789.cloudfront.net/.../img2.jpg",
    "https://d123456789.cloudfront.net/.../img3.jpg"
  ],
  "duration": 30,
  "music": "upbeat",
  "captions": true
}
```

### Response (202 Accepted)

```json
{
  "status": "generating",
  "job_id": "660e8400-e29b-41d4-a716-446655440001",
  "campaign_id": "reset-primal-mvp",
  "estimated_time": "120s",
  "polling_url": "/api/v1/jobs/660e8400-e29b-41d4-a716-446655440001"
}
```

### Resultado Completo

```json
{
  "status": "completed",
  "result": {
    "success": true,
    "video": {
      "duration": 30,
      "format": "mp4",
      "s3_url": "https://s3.amazonaws.com/...",
      "cdn_url": "https://d123456789.cloudfront.net/...",
      "file_size": 15000000
    }
  }
}
```

---

## 📢 ENDPOINT 3: Publish Campaign

### Request

```bash
POST /api/v1/publish/campaign
Content-Type: application/json

{
  "campaign_id": "reset-primal-mvp",
  "channels": ["instagram", "email", "meta_ads", "youtube"],
  "assets": [
    {
      "id": "post_1",
      "image_url": "https://d123456789.cloudfront.net/.../img1.jpg",
      "caption": "Transforme sua clareza mental em 30 dias",
      "cta": "Clique aqui",
      "cta_url": "https://resetprimal.com",
      "tags": ["#mentalhealth", "#reset"]
    }
  ],
  "simultaneous": true,
  "tracking": {
    "ga4": true,
    "meta_pixel": true
  }
}
```

### Response (202 Accepted)

```json
{
  "status": "publishing",
  "job_id": "770e8400-e29b-41d4-a716-446655440002",
  "campaign_id": "reset-primal-mvp",
  "assets_count": 1,
  "channels": ["instagram", "email", "meta_ads", "youtube"],
  "polling_url": "/api/v1/jobs/770e8400-e29b-41d4-a716-446655440002"
}
```

### Resultado Completo

```json
{
  "status": "completed",
  "result": {
    "campaign_id": "reset-primal-mvp",
    "published_count": 4,
    "channels_results": [
      {
        "asset_id": "post_1",
        "channels": [
          {
            "platform": "instagram",
            "media_id": "17999999999999999",
            "url": "https://instagram.com/p/...",
            "status": "published"
          },
          {
            "platform": "email",
            "message_id": "20230101120000123",
            "status": "sent"
          }
        ]
      }
    ]
  }
}
```

---

## 📊 Job Status & Monitoring

### Get Job Status

```bash
GET /api/v1/jobs/{job_id}
```

### List All Jobs

```bash
GET /api/v1/jobs
GET /api/v1/jobs?status=completed
GET /api/v1/jobs?status=failed
```

### Get Campaign Jobs

```bash
GET /api/v1/jobs/campaign/reset-primal-mvp
```

### Cancel Job

```bash
DELETE /api/v1/jobs/{job_id}
```

---

## 🔗 Webhooks

Registrar webhook para notificações de conclusão:

```bash
POST /api/v1/jobs/{job_id}/webhook
Content-Type: application/json

{
  "webhook_url": "https://seu-server.com/webhooks/job-complete",
  "events": ["completed", "failed"]
}
```

Seu endpoint receberá:

```json
{
  "event": "completed",
  "job_id": "550e8400-e29b-41d4-a716-446655440000",
  "campaign_id": "reset-primal-mvp",
  "result": { ... }
}
```

---

## ⚙️ Configuração por Plataforma

### Instagram (Meta Business API)

1. Criar Business Account em facebook.com/business
2. Conectar conta de Instagram
3. Gerar Access Token: facebook.com/developers
4. Obter Instagram Business Account ID
5. Colocar em `.env`:

```
META_ACCESS_TOKEN=EAABsbCS...
INSTAGRAM_BUSINESS_ACCOUNT_ID=17841400000000000
```

### Email (Brevo)

1. Criar conta em brevo.com
2. Gerar API Key
3. Colocar em `.env`:

```
BREVO_API_KEY=xkeysib_...
BREVO_SENDER_EMAIL=noreply@resetprimal.com
```

### YouTube

1. Criar projeto em console.cloud.google.com
2. Ativar YouTube Data API v3
3. Criar credenciais OAuth 2.0
4. Gerar Access Token
5. Colocar em `.env`:

```
YOUTUBE_ACCESS_TOKEN=ya29.a0AfH6SMBx...
```

### AWS S3

1. Criar bucket S3
2. Criar IAM user com S3 access
3. Gerar Access Key + Secret
4. Colocar em `.env`:

```
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
S3_BUCKET=reset-primal-assets
```

---

## 🚦 Health Check

```bash
GET /health
```

Response:

```json
{
  "status": "ok",
  "timestamp": "2026-02-06T14:30:00Z",
  "environment": "production"
}
```

---

## 📈 Métricas & Monitoramento

Integrado com:
- **GA4** - Rastrear eventos de publicação
- **Meta Pixel** - Rastrear conversões
- **CloudWatch** - Logs AWS
- **Bull UI** - Dashboard de jobs (http://localhost:3001/bull)

---

## ❌ Troubleshooting

### "OpenAI API key not configured"

Verify in `.env`:
```
OPENAI_API_KEY=sk_test_...
```

### "Redis connection refused"

Ensure Redis is running:
```bash
redis-cli ping
# Should output: PONG
```

### "S3 upload failed"

Check AWS credentials:
```bash
export AWS_ACCESS_KEY_ID=...
export AWS_SECRET_ACCESS_KEY=...
```

### "Instagram publishing failed"

Check token validity:
```bash
curl "https://graph.instagram.com/me?access_token=YOUR_TOKEN"
```

---

## 📋 Timeline de Implementação

- ✅ **FEB 6-7**: Setup inicial + API endpoints
- ✅ **FEB 8**: Image generation (DALL-E 3)
- ✅ **FEB 9**: Video generation (FFmpeg) + Publishing
- 🔜 **FEB 11**: GO LIVE - Publicar 30 posts + 5 emails + 3 vídeos

---

## 📞 Suporte

Issues ou dúvidas: Abra uma issue no GitHub ou entre em contato.

---

**API Version**: 1.0.0 | **Status**: Production Ready 🚀
