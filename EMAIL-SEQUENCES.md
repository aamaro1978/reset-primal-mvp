# 📧 RESET PRIMAL - AUTOMATED EMAIL SEQUENCES

**Status:** 🟢 READY FOR IMPLEMENTATION
**Date:** February 7, 2026
**Integration:** Brevo SMTP + API
**Trigger:** Hotmart webhook on successful purchase

---

## 📊 SEQUENCE OVERVIEW

```
Purchase ✓
   ↓
Email 1: Welcome (IMMEDIATE - 0 min)
   ↓ 1 hour later
Email 2: How to Access (1h after purchase)
   ↓ 23 hours later
Email 3: First Lesson (Day 1 - next morning)
   ↓ 48 hours later
Email 4: Implementation Tips (Day 3 - afternoon)
   ↓ 48 hours later
Email 5: Feedback + Upsell (Day 5 - morning)
```

---

## 📋 EMAIL SEQUENCE DETAILS

### EMAIL 1: WELCOME + APP LINK
**Sent:** Immediately upon purchase (0 min)
**Subject:** "Parabéns! Seu acesso ao Reset Primal foi confirmado 🎉"
**Goal:** Build excitement, provide immediate value, drive app download

**Template Structure:**
```
FROM: noreply@resetprimal.com
TO: {customer_email}
SUBJECT: Parabéns! Seu acesso ao Reset Primal foi confirmado 🎉

BODY (HTML):
1. Hero image (app screenshot)
2. Welcome headline: "Bem-vindo ao Reset Primal!"
3. What they got: Quick wins checklist
4. Call-to-Action: Download App Button
5. Direct access link: [APP_LINK]
6. Footer with support contact

VARIABLES:
- {first_name}: Customer first name
- {customer_email}: Customer email
- {app_link}: Deep link to app
- {support_email}: Support email
```

**Metrics to Track:**
- ✅ Open rate (target: >45%)
- ✅ Click rate (target: >25%)
- ✅ App download conversion (target: >35%)

---

### EMAIL 2: HOW TO ACCESS
**Sent:** 1 hour after purchase
**Subject:** "3 passos para começar seu Reset Primal (levam 2 min)"
**Goal:** Remove friction, ensure they can access the app

**Template Structure:**
```
FROM: noreply@resetprimal.com
TO: {customer_email}
SUBJECT: 3 passos para começar seu Reset Primal (levam 2 min)

BODY (HTML):
1. Quick note: "Aqui está o guia rápido"
2. Step 1: Download app from [LINK]
3. Step 2: Login with {customer_email}
4. Step 3: Click "Acessar Conteúdo"
5. Video tutorial: [EMBEDDED VIDEO OR LINK]
6. Common issues FAQ (expandable)
7. Direct support: "Não conseguiu? Responda este email"

VARIABLES:
- {customer_email}: Pre-filled login email
- {app_download_link}: Direct app store link
- {video_tutorial_link}: Recorded tutorial

CONDITIONAL:
- If user already downloaded app → Show "Next Step" email instead
```

**Metrics to Track:**
- ✅ Open rate (target: >35%)
- ✅ Click-through rate (target: >20%)
- ✅ Support tickets (target: <5%)

---

### EMAIL 3: FIRST LESSON CONTENT
**Sent:** 1 day after purchase (next morning, 8:00 AM)
**Subject:** "Seu primeiro vídeo está esperando (assista agora - 15 min)"
**Goal:** Drive engagement, demonstrate value, start content consumption

**Template Structure:**
```
FROM: noreply@resetprimal.com
TO: {customer_email}
SUBJECT: Seu primeiro vídeo está esperando (assista agora - 15 min)

BODY (HTML):
1. Personal greeting: "Oi {first_name}!"
2. Urgency: "Seus 21 dias começam agora"
3. Video embed or thumbnail with link
4. Video title: "Síndrome Metabólica - O que realmente importa"
5. Preview: 3-line summary of video content
6. Call-to-action: "Assistir Agora" (links to app)
7. Bonus: "Próximo vídeo sai amanhã"
8. Progress tracker: "Dia 1 de 21"

VARIABLES:
- {first_name}: Customer first name
- {video_title}: Content title
- {video_summary}: 3-line preview
- {video_link}: Deep link to app
- {day_number}: Current day in challenge (1)

PERSONALIZATION:
- If Mental Clarity series: Show mental clarity video
- If Weight Loss series: Show weight loss video
- If Metabolic Syndrome: Show metabolic video
```

**Metrics to Track:**
- ✅ Open rate (target: >40%)
- ✅ Video completion rate (target: >50%)
- ✅ Next-day return rate (target: >45%)

---

### EMAIL 4: IMPLEMENTATION TIPS
**Sent:** 3 days after purchase (afternoon, 3:00 PM)
**Subject:** "O erro que 90% cometem (e como você evita)"
**Goal:** Provide implementation guidance, prevent dropoff

**Template Structure:**
```
FROM: noreply@resetprimal.com
TO: {customer_email}
SUBJECT: O erro que 90% cometem (e como você evita)

BODY (HTML):
1. Progress update: "Dia 3 de 21 - Parabéns!"
2. Common mistake callout: Red box with "❌ Erro"
3. Why it matters: Consequence of the mistake
4. The solution: "✅ Aqui está o que fazer"
5. Implementation steps: Numbered checklist
6. Success metric: "Você vai notar em..."
7. Advanced tip: For engaged users
8. Next milestone: "Dia 5 você consegue..."
9. Support: "Dúvidas? Responda este email"

VARIABLES:
- {day_number}: Current day (3)
- {common_mistake}: Series-specific common mistake
- {implementation_steps}: Specific guidance
- {expected_result}: What to expect

DYNAMIC CONTENT:
- If Mental Clarity: "Mistake: Not doing morning meditation"
- If Weight Loss: "Mistake: Eating carbs at night"
- If Metabolic: "Mistake: Not fasting long enough"
```

**Metrics to Track:**
- ✅ Open rate (target: >38%)
- ✅ Click rate (target: >18%)
- ✅ App engagement (target: >60% check-in same day)

---

### EMAIL 5: FEEDBACK + UPSELL
**Sent:** 5 days after purchase (morning, 9:00 AM)
**Subject:** "Como vai sua transformação? (e uma oferta especial)"
**Goal:** Get feedback, introduce upgrade/upsell, maintain momentum

**Template Structure:**
```
FROM: noreply@resetprimal.com
TO: {customer_email}
SUBJECT: Como vai sua transformação? (e uma oferta especial)

BODY (HTML):
1. Milestone: "Dia 5 de 21 - Você já conquistou 24%! 🏆"
2. Quick poll: "Como está se sentindo?" (3 emoji buttons)
3. Share testimonial: "Clique aqui para compartilhar seu resultado"
4. UGC prompt: "Envie uma foto/vídeo e ganhe acesso VIP"
5. Separator: "---"
6. Upsell pitch: New offer or premium upgrade
7. Limited time: Countdown timer or deadline
8. Bonus: "Bônus exclusivo para primeiros 50"
9. Closing: "Você merece melhor acesso"

VARIABLES:
- {day_number}: Current day (5)
- {progress_percentage}: % of course complete (24%)
- {upsell_title}: New offer title
- {upsell_price}: Price (if applicable)
- {upsell_deadline}: When offer expires
- {upsell_link}: Purchase/upgrade link

SEGMENTS:
- If high engagement: Premium tier offer
- If medium engagement: Accountability partner option
- If low engagement: "Come back" incentive offer
```

**Metrics to Track:**
- ✅ Open rate (target: >42%)
- ✅ Poll response rate (target: >15%)
- ✅ UGC submission rate (target: >8%)
- ✅ Upsell conversion (target: >3-5%)

---

## 🔧 TECHNICAL IMPLEMENTATION

### Trigger Setup (Hotmart Webhook)
```
Event: Purchase Successful
Endpoint: {YOUR_DOMAIN}/webhooks/hotmart
Method: POST
Payload includes:
  - customer_email
  - customer_name
  - product_id
  - purchase_timestamp
```

### Email Service Integration (Brevo)
```
API Endpoint: https://api.brevo.com/v3/smtp/email
Method: POST
Headers:
  - Content-Type: application/json
  - api-key: {BREVO_API_KEY}
```

### Sequence Automation
```javascript
// Pseudocode for email sequence trigger
webhook('/hotmart', (event) => {
  const customer = {
    email: event.customer_email,
    name: event.customer_name,
    purchaseTime: event.timestamp
  };

  // Email 1: Immediate
  sendEmail(email1Template, customer, 'immediate');

  // Email 2: 1 hour later
  scheduleEmail(email2Template, customer, '+1h');

  // Email 3: 24 hours later
  scheduleEmail(email3Template, customer, '+24h');

  // Email 4: 72 hours later
  scheduleEmail(email4Template, customer, '+72h');

  // Email 5: 120 hours later
  scheduleEmail(email5Template, customer, '+120h');
});
```

### Brevo API Integration
```javascript
const sendEmail = async (template, customer, delay) => {
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.BREVO_API_KEY
    },
    body: JSON.stringify({
      to: [{ email: customer.email, name: customer.name }],
      sender: {
        email: process.env.BREVO_SENDER_EMAIL,
        name: 'Reset Primal'
      },
      subject: template.subject,
      htmlContent: template.html(customer),
      params: {
        first_name: customer.name.split(' ')[0],
        customer_email: customer.email
      }
    })
  });
  return response.json();
};
```

---

## 📈 SUCCESS METRICS

### Email Sequence KPIs
| Metric | Email 1 | Email 2 | Email 3 | Email 4 | Email 5 |
|--------|---------|---------|---------|---------|---------|
| Open Rate | 45% | 35% | 40% | 38% | 42% |
| Click Rate | 25% | 20% | 15% | 18% | 12% |
| Engagement | App DL | App Login | Video Play | Check-in | Poll Vote |
| Target Metric | >35% DL | >30% Login | >50% Viewed | >60% Check | >15% Vote |

### Overall Funnel Goals
```
100 Customers Purchase
  ↓ (45% open Email 1)
45 Open Email 1
  ↓ (25% of opens click)
11 Download App
  ↓ (30% of downloads login)
3 Login to App
  ↓ (50% watch first video)
2 Start Learning
  ↓ (Continue engagement...)
1-2 Complete 21 Days
```

---

## 📝 TEMPLATES STATUS

| Email | Template | Status | Ready? |
|-------|----------|--------|--------|
| Email 1: Welcome | HTML + Variables | ✅ READY | Yes |
| Email 2: Access | HTML + FAQ | ✅ READY | Yes |
| Email 3: Content | HTML + Video | ✅ READY | Yes |
| Email 4: Tips | HTML + Personalized | ✅ READY | Yes |
| Email 5: Feedback | HTML + Poll | ✅ READY | Yes |

---

## 🚀 DEPLOYMENT CHECKLIST

- [ ] Email 1 template created in Brevo
- [ ] Email 2 template created in Brevo
- [ ] Email 3 template created in Brevo
- [ ] Email 4 template created in Brevo
- [ ] Email 5 template created in Brevo
- [ ] Webhook endpoint created (receives Hotmart events)
- [ ] Brevo API integration tested
- [ ] Email scheduling tested with test addresses
- [ ] Personalization variables confirmed
- [ ] Tracking pixels installed (GA4 + Meta)
- [ ] Unsubscribe link working in all emails
- [ ] Mobile responsive design verified
- [ ] Send test to yourself
- [ ] Monitor first real sequence (Email 1)
- [ ] Adjust based on performance metrics

---

## 📞 SUPPORT

**Questions about setup?**
- Brevo docs: https://developers.brevo.com/docs
- Email sequence best practices: [Link]
- Troubleshooting: [Support email]

**Created:** February 7, 2026
**Next Review:** February 8, 2026 (after first live test)
**Status:** 🟢 READY FOR IMPLEMENTATION
