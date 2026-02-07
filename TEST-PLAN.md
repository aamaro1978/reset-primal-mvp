# 🧪 RESET PRIMAL MVP - COMPREHENSIVE TEST PLAN

**Status:** 🟢 READY FOR EXECUTION
**Date:** February 7, 2026
**Timeline:** FEB 7-10 (3 days execution)
**Deadline:** FEB 11 (Launch day - 4 days from now)

---

## 📊 TEST PLAN OVERVIEW

```
Test Categories:
├─ FUNCTIONAL (5 scenarios)      → Happy path + edge cases
├─ ERROR HANDLING (4 scenarios)  → What breaks & recovery
├─ LOAD TESTING (50 users)       → Scalability validation
├─ MULTI-DEVICE (3 platforms)    → Desktop, mobile, tablet
└─ SECURITY (3 checks)           → Auth, access, data protection
```

**Total Test Cases:** 25+
**Estimated Execution Time:** 8-10 hours
**Resource Required:** 5 test accounts + monitoring tools

---

## 1️⃣ FUNCTIONAL TESTING - Purchase Flow (5 Scenarios)

### Scenario 1: Success Flow - Complete Purchase
**Goal:** Verify happy path from landing page to email confirmation
**Steps:**
1. Navigate to landing page (v1 or v2)
2. Scroll through content (verify GA4 pageview tracking)
3. Click "Comprar Agora" button
4. Fill Hotmart form:
   - Email: `teste1@example.com`
   - Name: "Test User 1"
   - Phone: "+55 11 99999-1111"
5. Complete payment (test card: 4111 1111 1111 1111)
6. Verify Hotmart success page displays
7. Verify GA4 purchase event fires
8. Verify Meta Pixel conversion tracks
9. Check email received (Brevo)
10. Click app link in email
11. Verify app opens with correct email pre-filled

**Expected Results:**
- ✅ Purchase completes in <5 seconds
- ✅ GA4 event logged: `{event: 'purchase', value: X, currency: 'BRL'}`
- ✅ Meta Pixel event logged: Purchase conversion
- ✅ Email arrives within 2 minutes
- ✅ App link directs to correct destination
- ✅ No console errors (F12 DevTools)

**Pass/Fail:** [ ] Pass [ ] Fail [ ] Partial
**Notes:** ___________________________________________

---

### Scenario 2: Partial Payment - Incomplete Transaction
**Goal:** Verify system handles abandoned cart

**Steps:**
1. Navigate to landing page
2. Click "Comprar Agora"
3. Fill form but stop before payment
4. Close browser or navigate away
5. Return to landing page after 5 minutes
6. Try to access restricted content (should redirect)

**Expected Results:**
- ✅ No purchase event fires in GA4
- ✅ Meta Pixel does NOT log purchase
- ✅ Email NOT sent
- ✅ App access requires full payment
- ✅ Graceful error message on page

**Pass/Fail:** [ ] Pass [ ] Fail [ ] Partial
**Notes:** ___________________________________________

---

### Scenario 3: Multiple Purchases - Same Email
**Goal:** Verify system handles repeat customers

**Steps:**
1. Complete purchase with `teste2@example.com`
2. Wait for Email 1 (Welcome)
3. Complete ANOTHER purchase with same email
4. Verify system handles duplicate

**Expected Results:**
- ✅ Both purchases logged in Hotmart
- ✅ Email sequences don't duplicate
- ✅ App recognizes existing user
- ✅ No database conflicts
- ✅ Access maintains for both orders

**Pass/Fail:** [ ] Pass [ ] Fail [ ] Partial
**Notes:** ___________________________________________

---

### Scenario 4: Email Sequence Delivery
**Goal:** Verify all 5 emails send at correct times

**Steps:**
1. Complete purchase with `teste3@example.com` at T=0
2. Monitor inbox for Email 1 (immediate)
3. Wait 1h 5min, verify Email 2 arrives
4. Wait 24h, verify Email 3 arrives
5. Wait 48h, verify Email 4 arrives
6. Wait 48h, verify Email 5 arrives

**Expected Results:**
- ✅ Email 1: Arrives within 2 minutes
- ✅ Email 2: Arrives at T+60min ±5min
- ✅ Email 3: Arrives at T+24h ±30min
- ✅ Email 4: Arrives at T+72h ±30min
- ✅ Email 5: Arrives at T+120h ±30min
- ✅ All emails formatted correctly
- ✅ All links functional
- ✅ Unsubscribe link works
- ✅ No broken images

**Pass/Fail:** [ ] Pass [ ] Fail [ ] Partial
**Notes:** ___________________________________________

---

### Scenario 5: Analytics Tracking End-to-End
**Goal:** Verify GA4 + Meta Pixel track entire user journey

**Steps:**
1. Open Chrome DevTools (F12)
2. Go to Network tab + Console tab
3. Navigate to landing page
4. Verify GA4 snippet loads (check Network for gtag.js)
5. Click "Comprar Agora" button
6. Verify GA4 event fires (check Network for `/g/collect`)
7. Complete purchase
8. Verify purchase event in GA4 (value, currency, transaction_id)
9. Verify Meta Pixel loads (fbevents.js in Network)
10. Verify Meta Pixel PageView fires
11. Verify purchase event fires in Meta Pixel

**Expected Results:**
- ✅ GA4 gtag.js loads within 2s
- ✅ GA4 config event fires (page_path, page_title)
- ✅ GA4 purchase event includes: value, currency, transaction_id
- ✅ Meta Pixel fbevents.js loads within 2s
- ✅ Meta Pixel PageView fires
- ✅ Meta Pixel purchase event fires with value
- ✅ No console errors
- ✅ No network errors (200/204 status codes)

**Pass/Fail:** [ ] Pass [ ] Fail [ ] Partial
**Notes:** ___________________________________________

---

## 2️⃣ ERROR HANDLING - What Breaks? (4 Scenarios)

### Scenario 1: Invalid Email
**Steps:**
1. Try to purchase with invalid email: "notanemail"
2. Submit form

**Expected Results:**
- ✅ Form validation error appears
- ✅ Helpful error message: "Email inválido"
- ✅ Payment NOT processed
- ✅ No GA4 purchase event fires

**Pass/Fail:** [ ] Pass [ ] Fail [ ] Partial

---

### Scenario 2: Duplicate Email Purchase
**Steps:**
1. Purchase with `teste1@example.com`
2. Immediately try to purchase again with same email
3. Verify system response

**Expected Results:**
- ✅ Either accepts new purchase OR
- ✅ Shows helpful message: "Email já registrado"
- ✅ No payment charged twice
- ✅ System state consistent

**Pass/Fail:** [ ] Pass [ ] Fail [ ] Partial

---

### Scenario 3: Payment Card Decline
**Steps:**
1. Navigate to Hotmart form
2. Use test card: 4000 0000 0000 0002 (decline)
3. Submit payment

**Expected Results:**
- ✅ Payment declines gracefully
- ✅ Error message: "Cartão recusado"
- ✅ User can retry
- ✅ No partial transaction created
- ✅ No email sent

**Pass/Fail:** [ ] Pass [ ] Fail [ ] Partial

---

### Scenario 4: Network Timeout During Purchase
**Steps:**
1. Open Chrome DevTools (F12)
2. Go to Network tab
3. Throttle connection: Slow 3G
4. Start purchase
5. Verify timeout handling

**Expected Results:**
- ✅ Graceful timeout error
- ✅ User can retry
- ✅ No duplicate transactions
- ✅ Helpful message: "Conexão lenta. Tente novamente"

**Pass/Fail:** [ ] Pass [ ] Fail [ ] Partial

---

## 3️⃣ LOAD TESTING - 50 Concurrent Users

### Setup
**Tool:** Apache JMeter or Locust
**Scenario:** 50 users simultaneously viewing landing page + completing purchase
**Duration:** 5 minutes
**Ramp-up:** 30 seconds (add 10 users every 6 seconds)

### Test Cases

**Case 1: Page Load Under Load**
```
50 users → Load landing page simultaneously
Expected: All pages load within 3 seconds
Target: 95th percentile response time < 2s
Success Rate: >99%
```

**Case 2: Purchase Endpoint Under Load**
```
50 users → Submit purchase form simultaneously
Expected: All purchases process within 5 seconds
Target: No timeouts, no failures
Success Rate: >99.5%
```

**Case 3: Email Service Under Load**
```
50 purchases within 1 minute
Expected: All 50 welcome emails queue successfully
Target: No failures, no duplicate sends
Success Rate: 100%
```

**Case 4: Analytics Service Under Load**
```
50 users × 5 events = 250 events
Expected: All events logged without loss
Target: No sampling, no dropped events
Success Rate: 100%
```

**Load Test Results:**
- [ ] Page load <3s for 95% of requests
- [ ] Purchase processing <5s for 95% of requests
- [ ] Email queue success: 100%
- [ ] Analytics loss: 0%
- [ ] Server CPU: <70%
- [ ] Memory usage: <2GB

**Pass/Fail:** [ ] Pass [ ] Fail [ ] Partial
**Notes:** ___________________________________________

---

## 4️⃣ MULTI-DEVICE TESTING

### Desktop Testing
**Browser:** Chrome (latest)
**Resolution:** 1920x1080
**Steps:**
1. Navigate to landing page
2. Scroll through all content
3. Click purchase button
4. Complete purchase flow
5. Verify all elements display correctly
6. Open DevTools - verify no console errors

**Desktop Results:**
- [ ] Page loads correctly
- [ ] All images display
- [ ] Buttons responsive
- [ ] Forms functional
- [ ] No console errors
- [ ] GA4 tracking works
- [ ] Meta Pixel loads

**Pass/Fail:** [ ] Pass [ ] Fail [ ] Partial

---

### Mobile Testing
**Device:** iPhone 12 (or similar)
**Browser:** Safari
**Resolution:** 390x844
**Steps:**
1. Navigate to landing page via mobile
2. Scroll through all content
3. Verify text readability
4. Click purchase button
5. Complete purchase (use mobile payment)
6. Verify email received on mobile device
7. Click app link from email

**Mobile Results:**
- [ ] Page loads correctly
- [ ] Text readable (no overflow)
- [ ] Buttons clickable (>44px)
- [ ] Images optimized (not bloated)
- [ ] Forms functional
- [ ] Hotmart form responsive
- [ ] No horizontal scroll
- [ ] GA4 tracking works

**Pass/Fail:** [ ] Pass [ ] Fail [ ] Partial

---

### Tablet Testing
**Device:** iPad (or similar)
**Browser:** Safari
**Resolution:** 768x1024
**Steps:**
1. Navigate to landing page
2. Verify layout (between mobile and desktop)
3. Test landscape and portrait modes
4. Complete purchase
5. Verify all functional

**Tablet Results:**
- [ ] Page displays correctly in portrait
- [ ] Page displays correctly in landscape
- [ ] Layout adapts well
- [ ] All buttons accessible
- [ ] Forms work correctly

**Pass/Fail:** [ ] Pass [ ] Fail [ ] Partial

---

## 5️⃣ SECURITY TESTING

### Test 1: Authentication & Authorization
**Goal:** Verify only paid users can access content

**Steps:**
1. Try to access app content WITHOUT purchasing
2. Verify you're redirected to login/payment
3. Purchase and login
4. Verify content accessible
5. Logout
6. Try to access content - should require login again

**Expected Results:**
- ✅ Unpaid users cannot access content
- ✅ Logout properly clears session
- ✅ Cannot access with invalid token
- ✅ Token expires after X hours
- ✅ No sensitive data exposed in URLs

**Pass/Fail:** [ ] Pass [ ] Fail [ ] Partial

---

### Test 2: Data Protection
**Goal:** Verify customer data is encrypted and secure

**Steps:**
1. Complete purchase (check email in form)
2. Open DevTools → Network tab
3. Search for your email in request payloads
4. Verify data is encrypted (HTTPS, not plain text)
5. Check that passwords/tokens are never logged

**Expected Results:**
- ✅ All requests use HTTPS
- ✅ Email addresses encrypted in transit
- ✅ No passwords in URLs
- ✅ No sensitive data in console logs
- ✅ Session tokens are secure
- ✅ No API keys exposed

**Pass/Fail:** [ ] Pass [ ] Fail [ ] Partial

---

### Test 3: CSRF & XSS Protection
**Goal:** Verify protection against common attacks

**Steps:**
1. Check Hotmart form for CSRF token
2. Try to submit form with modified values (DevTools)
3. Try to inject JavaScript: `<script>alert('xss')</script>`
4. Verify input is sanitized

**Expected Results:**
- ✅ CSRF tokens present and validated
- ✅ Form cannot be submitted from external site
- ✅ JavaScript input is escaped/sanitized
- ✅ No alerts execute
- ✅ HTML entities encoded

**Pass/Fail:** [ ] Pass [ ] Fail [ ] Partial

---

## 📝 TEST ACCOUNT SETUP

### Test Accounts to Create
```
Account 1: teste1@example.com
  - Purpose: Happy path testing
  - Password: SecurePass123!
  - Status: Active
  - Created: [DATE]

Account 2: teste2@example.com
  - Purpose: Repeat customer testing
  - Password: SecurePass123!
  - Status: Active
  - Created: [DATE]

Account 3: teste3@example.com
  - Purpose: Email sequence testing (24h)
  - Password: SecurePass123!
  - Status: Active
  - Created: [DATE]

Account 4: teste4@example.com
  - Purpose: Load testing
  - Password: SecurePass123!
  - Status: Active
  - Created: [DATE]

Account 5: teste5@example.com
  - Purpose: Security testing
  - Password: SecurePass123!
  - Status: Active
  - Created: [DATE]
```

### Account Creation Checklist
- [ ] Create account 1 in app
- [ ] Verify email confirmation
- [ ] Create account 2
- [ ] Verify email confirmation
- [ ] Create account 3
- [ ] Verify email confirmation
- [ ] Create account 4
- [ ] Verify email confirmation
- [ ] Create account 5
- [ ] Verify email confirmation
- [ ] All 5 accounts in Supabase
- [ ] All 5 accounts in Airtable CRM (if applicable)

---

## 🛠️ MONITORING & TOOLS

### Tools Required
1. **Chrome DevTools** (F12)
   - Network tab (check GA4, Meta Pixel, Brevo)
   - Console tab (check for errors)
   - Performance tab (measure load time)

2. **Apache JMeter** or **Locust**
   - Load testing tool
   - Simulate 50 concurrent users
   - Monitor response times

3. **Postman** or **Insomnia**
   - Test API endpoints
   - Verify webhook payloads
   - Check error responses

4. **Database Inspector** (Supabase)
   - Verify user data stored correctly
   - Check purchase records
   - Monitor query performance

5. **Email Testing**
   - Monitor inbox for Brevo emails
   - Check email formatting
   - Verify all links functional

### Monitoring Checklist
- [ ] Chrome DevTools installed
- [ ] JMeter installed and configured
- [ ] Postman collection created
- [ ] Supabase access configured
- [ ] Email inbox ready for testing
- [ ] Slack alerts configured (if applicable)

---

## 📊 TEST EXECUTION SCHEDULE

| Date | Phase | Duration | Owner |
|------|-------|----------|-------|
| FEB 7 (TODAY) | Setup accounts + tools | 2h | Quinn |
| FEB 7 | Functional testing (Scenarios 1-5) | 3h | Quinn |
| FEB 8 | Error handling (Scenarios 1-4) | 1h | Quinn |
| FEB 8 | Load testing (50 users) | 1h | Quinn |
| FEB 9 | Multi-device testing | 2h | Quinn |
| FEB 9 | Security testing | 1h | Quinn |
| FEB 10 | Regression testing + final checks | 2h | Quinn |
| FEB 10 | Bug fixes (if any issues found) | 2h | Dex + Quinn |
| FEB 11 | LAUNCH DAY | - | 🚀 |

**Total Testing Time:** ~14 hours over 4 days

---

## ✅ TEST COMPLETION CRITERIA

All of the following must be true to pass:

### Functional Testing
- [ ] All 5 functional scenarios PASS
- [ ] 100% of happy path flows work
- [ ] All analytics events fire
- [ ] All emails deliver on time

### Error Handling
- [ ] All 4 error scenarios handled gracefully
- [ ] No system crashes
- [ ] Helpful error messages display
- [ ] User can recover and retry

### Load Testing
- [ ] 50 concurrent users supported
- [ ] Page load <3s (95th percentile)
- [ ] Purchase processing <5s (95th percentile)
- [ ] 0% data loss
- [ ] Zero email duplicates

### Multi-Device
- [ ] Desktop: Full functionality
- [ ] Mobile: Responsive design works
- [ ] Tablet: Proper layout
- [ ] All devices: No console errors

### Security
- [ ] Authentication prevents unauthorized access
- [ ] Data encrypted in transit (HTTPS)
- [ ] CSRF protection active
- [ ] XSS attacks prevented
- [ ] No sensitive data exposure

---

## 🎯 GO/NO-GO DECISION

**Ready to Launch if:**
- ✅ All 5 functional scenarios PASS
- ✅ All 4 error scenarios handled properly
- ✅ Load test shows >99% success rate
- ✅ All devices tested and working
- ✅ Zero critical security issues
- ✅ Email sequences verified (at least Email 1)

**BLOCKERS (Must fix before launch):**
- ❌ Any CRITICAL security vulnerability
- ❌ Purchase flow fails
- ❌ Email service down
- ❌ GA4/Meta Pixel not tracking
- ❌ Load test fails >10% error rate

---

## 📞 ESCALATION CONTACTS

| Issue | Contact | Escalation |
|-------|---------|-----------|
| Purchase flow broken | @dev (Dex) | Payment provider |
| Email not sending | @dev (Dex) | Brevo support |
| GA4 not tracking | @dev (Dex) | Google Analytics |
| Load test fails | @architect (Aria) | Infrastructure scaling |
| Security issue | @qa (Quinn) | Security audit |

---

## 📋 SIGN-OFF

**Test Plan Created By:** Quinn (QA)
**Date:** February 7, 2026
**Status:** 🟢 READY FOR EXECUTION
**Approval:** Pending user confirmation

**Next Steps:**
1. ✅ Setup test accounts (teste1-5@example.com)
2. ✅ Install monitoring tools
3. ✅ Execute functional testing (Scenarios 1-5)
4. ✅ Execute error handling tests
5. ✅ Run load testing
6. ✅ Multi-device verification
7. ✅ Security validation
8. ✅ Generate final QA report

---

**Status:** 🚀 Ready to begin testing on FEB 7
**Est. Completion:** FEB 10, 18:00
**Launch:** FEB 11, 00:00 🎉
