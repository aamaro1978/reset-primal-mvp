# 🚀 API DEPLOYMENT CHECKLIST

**Status**: Ready for FEB 11 GO LIVE  
**Last Updated**: FEB 6, 2026

---

## ✅ PRE-DEPLOYMENT (FEB 7)

### Infrastructure Setup

- [ ] **Redis Installation**
  - [ ] Install Redis locally or in Docker
  - [ ] Test: `redis-cli ping` → PONG
  - [ ] Set Redis credentials in `.env`
  - [ ] Configure persistence (AOF or RDB)

- [ ] **AWS S3 Setup**
  - [ ] Create S3 bucket: `reset-primal-assets`
  - [ ] Enable versioning
  - [ ] Configure CORS for CDN access
  - [ ] Create IAM user with S3 permissions
  - [ ] Generate Access Key + Secret
  - [ ] Set in `.env`: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
  - [ ] Setup CloudFront CDN (optional but recommended)

- [ ] **Environment Variables**
  - [ ] Copy `.env.example` to `.env`
  - [ ] Add all API keys from credential store
  - [ ] Test: `node -e "require('dotenv').config(); console.log(process.env.OPENAI_API_KEY)"`
  - [ ] Verify no keys hardcoded in code (security scan)

### Dependencies Installation

- [ ] `npm install` in `/api` directory
- [ ] Verify all packages installed: `npm list`
- [ ] Check for vulnerabilities: `npm audit`
- [ ] Lock versions: `npm ci`

### API Keys & Credentials

#### OpenAI (DALL-E 3)
- [ ] Generate API key: https://platform.openai.com/api-keys
- [ ] Test connection: 
  ```bash
  curl https://api.openai.com/v1/models \
    -H "Authorization: Bearer sk_test_..."
  ```
- [ ] Set quota limit to prevent unexpected charges
- [ ] Enable billing alerts

#### Meta (Instagram + Facebook Ads)
- [ ] Create Business Account: facebook.com/business
- [ ] Connect Instagram Account
- [ ] Generate Access Token: developers.facebook.com
- [ ] Get Instagram Business Account ID
- [ ] Get Meta Ad Account ID
- [ ] Test token validity:
  ```bash
  curl "https://graph.instagram.com/me?access_token=..."
  ```
- [ ] Set app permissions: `instagram_basic,instagram_content_publish`

#### YouTube
- [ ] Create Cloud project: console.cloud.google.com
- [ ] Enable YouTube Data API v3
- [ ] Create OAuth 2.0 credentials
- [ ] Whitelist redirect URIs
- [ ] Get refresh token via OAuth flow
- [ ] Test access:
  ```bash
  curl "https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true" \
    -H "Authorization: Bearer ..."
  ```

#### Brevo (Email)
- [ ] Create account: brevo.com
- [ ] Generate API key from settings
- [ ] Verify sender email
- [ ] Setup SMTP credentials (optional)
- [ ] Test email sending:
  ```bash
  curl -X POST https://api.brevo.com/v3/smtp/email \
    -H "api-key: xkeysib_..." \
    -H "Content-Type: application/json" \
    -d '{"to":[{"email":"test@example.com"}],...}'
  ```

---

## 🧪 TESTING (FEB 8)

### Unit Tests

- [ ] Image generation endpoint
  - [ ] Test with valid copy
  - [ ] Test with invalid campaign_id (should fail)
  - [ ] Test with missing fields
  - [ ] Verify job created in queue

- [ ] Video generation endpoint
  - [ ] Test with sample images
  - [ ] Verify video output format (MP4)
  - [ ] Check file size limits

- [ ] Publishing endpoint
  - [ ] Test single channel publish
  - [ ] Test multi-channel simultaneous publish
  - [ ] Verify webhook registration

### Integration Tests

- [ ] Test full pipeline (image → video → publish)
  ```bash
  # 1. Generate image
  JOB_ID=$(curl ... /api/v1/generate/image | jq -r .job_id)
  
  # 2. Wait for completion
  curl /api/v1/jobs/$JOB_ID
  
  # 3. Get image URL and use for video
  # 4. Publish to all channels
  ```

- [ ] Test all publishing channels:
  - [ ] Instagram post created
  - [ ] Email sent successfully
  - [ ] Meta Ads creative generated
  - [ ] YouTube video upload initiated

- [ ] Test error scenarios:
  - [ ] Invalid API keys
  - [ ] Network timeout
  - [ ] S3 upload failure
  - [ ] Job cancellation

### Load Testing

- [ ] Test with 30 concurrent image generations
- [ ] Test with 5 concurrent video generations
- [ ] Monitor Redis queue: `redis-cli --stat`
- [ ] Monitor memory usage: `top`
- [ ] Monitor disk space (especially for tmp videos)

---

## 🔒 SECURITY (FEB 9)

### Code Security

- [ ] Run security audit: `npm audit`
- [ ] Check for hardcoded secrets: `git log -p` grep for keys
- [ ] Verify `.env` not in git: check `.gitignore`
- [ ] Enable request validation on all endpoints
- [ ] Implement rate limiting per IP
- [ ] Add CORS restrictions if needed

### API Security

- [ ] Setup HTTPS (required for production)
- [ ] Enable authentication (optional JWT for internal)
- [ ] Add request size limits: `express.json({limit: '50mb'})`
- [ ] Sanitize user input
- [ ] Log all API calls (audit trail)
- [ ] Monitor for suspicious activity

### Credential Management

- [ ] Rotate API keys every 30 days
- [ ] Never commit `.env` to Git
- [ ] Use secrets manager (AWS Secrets Manager, etc.)
- [ ] Implement key rotation automation
- [ ] Delete test/old API keys

### Infrastructure

- [ ] Setup AWS S3 bucket encryption
- [ ] Enable bucket versioning (for recovery)
- [ ] Setup S3 access logs
- [ ] Restrict S3 access to least privilege IAM user
- [ ] Enable CloudTrail for audit logging

---

## 📊 MONITORING (FEB 10)

### Logging Setup

- [ ] Configure Winston or Pino logger
- [ ] Setup log rotation (daily, keep 7 days)
- [ ] Stream logs to CloudWatch (if using AWS)
- [ ] Setup error alerting (Sentry, etc.)
- [ ] Monitor API latency

### Queue Monitoring

- [ ] Setup Bull UI dashboard: http://localhost:3001/bull
- [ ] Monitor queue depth (pending jobs)
- [ ] Monitor job success rate
- [ ] Setup alerts for failed jobs
- [ ] Monitor retry attempts

### Resource Monitoring

- [ ] Monitor CPU usage (alert if > 80%)
- [ ] Monitor memory usage (alert if > 85%)
- [ ] Monitor Redis memory (alert if > 1GB)
- [ ] Monitor disk space (alert if < 10% free)
- [ ] Monitor network I/O

### Application Performance

- [ ] Monitor API response times (target: < 200ms)
- [ ] Monitor image generation time (target: 2-3 min)
- [ ] Monitor video generation time (target: 5-10 min)
- [ ] Monitor publishing time (target: < 10s per asset)
- [ ] Track success rates (target: > 99%)

---

## 🚀 LAUNCH DAY (FEB 11)

### Pre-Launch Checklist

- [ ] All tests passing
- [ ] All credentials verified and working
- [ ] Monitoring and alerting active
- [ ] Backup/recovery procedures documented
- [ ] Team trained on runbook
- [ ] Incident response plan ready

### During Launch

- [ ] Monitor all metrics in real-time
- [ ] Watch error logs for issues
- [ ] Be ready to rollback if needed
- [ ] Document any issues
- [ ] Communicate status to team

### Post-Launch

- [ ] Verify all 30 posts published
- [ ] Verify all 5 emails sent
- [ ] Verify all 3 videos uploaded
- [ ] Check analytics for engagement
- [ ] Document lessons learned
- [ ] Plan for optimization

---

## 🔄 POST-LAUNCH MONITORING (FEB 11+)

- [ ] Daily health checks for 1 week
- [ ] Monitor publishing success rate
- [ ] Monitor API performance metrics
- [ ] Check for any failed jobs
- [ ] Review logs for errors
- [ ] Rotate API keys if needed
- [ ] Plan for optimization based on metrics

---

## 📋 Runbook for Issues

### API Not Responding

```bash
# 1. Check if server is running
ps aux | grep node

# 2. Check logs
tail -f logs/api.log

# 3. Restart server
npm start

# 4. Check Redis
redis-cli ping
```

### S3 Upload Failing

```bash
# 1. Verify AWS credentials
aws s3 ls

# 2. Check bucket exists
aws s3api head-bucket --bucket reset-primal-assets

# 3. Check IAM permissions
# Verify policy includes s3:PutObject, s3:GetObject
```

### Instagram Publishing Failing

```bash
# 1. Check token validity
curl "https://graph.instagram.com/me?access_token=..."

# 2. Check token permissions
curl "https://graph.instagram.com/me/permissions?access_token=..."

# 3. Regenerate token if expired
# Go to facebook.com/developers → get new token
```

### High Memory Usage

```bash
# 1. Check Node process
ps aux | grep node | grep -v grep

# 2. Check Redis memory
redis-cli info memory

# 3. Clear completed jobs
redis-cli DEL bull:image-generation:* 

# 4. Restart if needed
pkill -f "node server.js"
npm start
```

---

## ✅ Sign-off

- [ ] Infrastructure Lead: _____________ Date: _____
- [ ] Security Lead: __________________ Date: _____
- [ ] Product Manager: _______________ Date: _____
- [ ] Engineering Lead: ______________ Date: _____

**Status**: Ready for Production ✅
