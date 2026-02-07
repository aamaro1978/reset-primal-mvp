# 🚀 Quick Start Guide - Reset Primal API

Começa aqui! 5 minutos para sua primeira automação.

---

## 1️⃣ Setup (2 minutos)

### Instalar e iniciar

```bash
# Clonar repo (se não tiver)
cd RESET-PRIMAL-MVP

# Instalar dependências
cd api
npm install

# Configurar .env
cp ../.env .env  # or edit ../.env with your keys

# Iniciar Redis (noutra janela)
redis-server

# Iniciar API
npm start
```

Você deve ver:
```
✅ Reset Primal API Server running on port 3001
📍 Health check: http://localhost:3001/health
```

---

## 2️⃣ Testar Health Check (30 segundos)

```bash
curl http://localhost:3001/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2026-02-06T14:30:00Z",
  "environment": "development"
}
```

✅ API está rodando!

---

## 3️⃣ Gerar sua Primeira Imagem (1 minuto)

### Request

```bash
curl -X POST http://localhost:3001/api/v1/generate/image \
  -H "Content-Type: application/json" \
  -d '{
    "campaign_id": "reset-primal-mvp",
    "copy": "Transforme sua clareza mental em 30 dias com Reset Primal",
    "series": "mental-clarity",
    "platform": "instagram",
    "style": "minimalist",
    "generate_variations": 1
  }'
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

Copie o `job_id` para o próximo passo.

---

## 4️⃣ Monitorar Progresso (30 segundos)

```bash
# Substituir JOB_ID com o que você recebeu acima
curl http://localhost:3001/api/v1/jobs/550e8400-e29b-41d4-a716-446655440000
```

### Respostas possíveis

**Gerando** (status: 202):
```json
{
  "job_id": "550e8400-e29b-41d4-a716-446655440000",
  "campaign_id": "reset-primal-mvp",
  "status": "generating",
  "progress": 45
}
```

**Concluído** (status: 200):
```json
{
  "job_id": "550e8400-e29b-41d4-a716-446655440000",
  "campaign_id": "reset-primal-mvp",
  "status": "completed",
  "result": {
    "success": true,
    "images": [
      {
        "variation": 1,
        "generated_prompt": "Minimalist design...",
        "processed_urls": {
          "s3_url": "https://s3.amazonaws.com/reset-primal-assets/...",
          "cdn_url": "https://d123456789.cloudfront.net/..."
        }
      }
    ]
  }
}
```

Copie a `cdn_url` para o próximo passo.

---

## 5️⃣ Gerar Vídeo (com a imagem) - BÔNUS

### Request

```bash
curl -X POST http://localhost:3001/api/v1/generate/video \
  -H "Content-Type: application/json" \
  -d '{
    "campaign_id": "reset-primal-mvp",
    "images": [
      "https://d123456789.cloudfront.net/.../img.jpg"
    ],
    "duration": 10,
    "music": "upbeat",
    "captions": true
  }'
```

### Response

```json
{
  "status": "generating",
  "job_id": "660e8400-e29b-41d4-a716-446655440001",
  "estimated_time": "75s"
}
```

Monitore com:
```bash
curl http://localhost:3001/api/v1/jobs/660e8400-e29b-41d4-a716-446655440001
```

---

## 6️⃣ Publicar em Múltiplos Canais - BÔNUS 2

### Request

```bash
curl -X POST http://localhost:3001/api/v1/publish/campaign \
  -H "Content-Type: application/json" \
  -d '{
    "campaign_id": "reset-primal-mvp",
    "channels": ["instagram", "email"],
    "assets": [
      {
        "id": "post_1",
        "image_url": "https://d123456789.cloudfront.net/.../img.jpg",
        "caption": "Transforme sua clareza mental em 30 dias 🧠",
        "cta": "Clique aqui",
        "cta_url": "https://resetprimal.com/mental-clarity",
        "tags": ["#mentalhealth", "#reset"]
      }
    ]
  }'
```

### Response

```json
{
  "status": "publishing",
  "job_id": "770e8400-e29b-41d4-a716-446655440002",
  "assets_count": 1,
  "channels": ["instagram", "email"]
}
```

Monitor com:
```bash
curl http://localhost:3001/api/v1/jobs/770e8400-e29b-41d4-a716-446655440002
```

---

## 📊 Exemplo Completo - Fluxo Total

```bash
#!/bin/bash

# 1. Gerar imagem
echo "🎨 Gerando imagem..."
IMAGE_JOB=$(curl -s -X POST http://localhost:3001/api/v1/generate/image \
  -H "Content-Type: application/json" \
  -d '{
    "campaign_id": "reset-primal-mvp",
    "copy": "Reset Primal - Clareza Mental em 30 Dias",
    "platform": "instagram",
    "style": "minimalist"
  }' | jq -r .job_id)

echo "Job ID: $IMAGE_JOB"

# 2. Esperar conclusão (máx 3 minutos)
echo "⏳ Esperando imagem..."
for i in {1..60}; do
  STATUS=$(curl -s http://localhost:3001/api/v1/jobs/$IMAGE_JOB | jq -r .status)
  if [ "$STATUS" = "completed" ]; then
    echo "✅ Imagem pronta!"
    break
  fi
  echo "Progresso: $STATUS..."
  sleep 3
done

# 3. Obter URL da imagem
IMAGE_URL=$(curl -s http://localhost:3001/api/v1/jobs/$IMAGE_JOB \
  | jq -r '.result.images[0].processed_urls.cdn_url')

echo "Imagem: $IMAGE_URL"

# 4. Publicar
echo "📢 Publicando..."
curl -X POST http://localhost:3001/api/v1/publish/campaign \
  -H "Content-Type: application/json" \
  -d "{
    \"campaign_id\": \"reset-primal-mvp\",
    \"channels\": [\"instagram\", \"email\"],
    \"assets\": [{
      \"image_url\": \"$IMAGE_URL\",
      \"caption\": \"Transforme sua clareza mental em 30 dias\",
      \"cta_url\": \"https://resetprimal.com\"
    }]
  }" | jq .

echo "✅ Publicação iniciada!"
```

Salvar como `auto-publish.sh` e rodar:
```bash
chmod +x auto-publish.sh
./auto-publish.sh
```

---

## 🛠️ Utilitários Úteis

### Listar todos os jobs

```bash
curl http://localhost:3001/api/v1/jobs
```

### Filtrar por status

```bash
curl http://localhost:3001/api/v1/jobs?status=completed
curl http://localhost:3001/api/v1/jobs?status=failed
```

### Ver todos os jobs de uma campanha

```bash
curl http://localhost:3001/api/v1/jobs/campaign/reset-primal-mvp
```

### Cancelar um job

```bash
curl -X DELETE http://localhost:3001/api/v1/jobs/550e8400-e29b-41d4-a716-446655440000
```

---

## 🐛 Troubleshooting

### "Cannot find module 'openai'"
```bash
cd api && npm install
```

### "Redis connection refused"
```bash
# Iniciar Redis em outra janela
redis-server

# Ou com Docker
docker run -d -p 6379:6379 redis:latest
```

### "OPENAI_API_KEY not configured"
```bash
# Editar .env e adicionar chave
export OPENAI_API_KEY=sk_test_...

# Ou adicionar em .env:
echo "OPENAI_API_KEY=sk_test_..." >> ../.env
```

### "S3 upload failed"
```bash
# Verificar credenciais AWS
aws s3 ls

# Testar bucket
aws s3api head-bucket --bucket reset-primal-assets
```

---

## 📋 Próximos Passos

1. ✅ Testar endpoints localmente
2. 🔧 Configurar todas as credenciais (OpenAI, AWS, Meta, YouTube, Brevo)
3. 📊 Rodar testes de carga
4. 🚀 Deploy para staging
5. 🎉 Deploy para produção (FEB 11)

---

## 📞 Precisa de ajuda?

- Dúvidas sobre endpoints? → Veja `README.md`
- Problemas de deploy? → Veja `DEPLOYMENT-CHECKLIST.md`
- Erros específicos? → Verifique os logs: `tail -f logs/api.log`

---

**Ready to go?** 🚀
```bash
npm start
```

Acesse: `http://localhost:3001/health`
