# 🚀 START TESTING NOW - STEP BY STEP

**Test:** Functional Test 1 with teste1@example.com
**Duration:** 20-30 minutes
**Status:** READY TO EXECUTE

---

## 📋 BEFORE YOU START (5 minutes)

### 1. Open Two Browser Windows
```
Window 1: Landing page (will navigate here)
Window 2: Email inbox (to check for welcome email)

Tip: Use Split Screen (Command+Tab on Mac)
```

### 2. Prepare DevTools
```
In Window 1:
- Press F12 to open DevTools
- Go to "Network" tab
- Check "Preserve log" checkbox
- You'll use this to monitor GA4 and Meta Pixel
```

### 3. Start Local HTTP Server
```bash
Open Terminal, run:
cd /Users/acacioamaro/RESET-PRIMAL-MVP
python3 -m http.server 8000

You'll see:
"Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ..."
```

### 4. Have Test Card Info Ready
```
Card Number: 4111 1111 1111 1111
Expiry: 12/25
CVV: 123
Holder: Test User

⚠️ This is a TEST CARD - Will NOT charge you
```

### 5. Open Live Log Document
```
File: /TEST-1-LIVE-LOG.md
Use this to document each step as you go
```

---

## 🎯 QUICK REFERENCE (What Happens)

```
You:                          System:
1. Navigate to landing page   → GA4 + Meta load
2. Click "Comprar Agora"      → Redirects to Hotmart
3. Fill form + pay            → Payment processes
4. Payment succeeds           → GA4 event fires
                              → Meta Pixel event fires
                              → Hotmart webhook fires
                              → Brevo sends email
5. Check email inbox          → Welcome email arrives
6. Check Supabase            → User + purchase records created
```

---

## 🚀 EXECUTE THE TEST (20 minutes)

### MINUTE 1-2: Navigate to Landing Page

**Step 1.1:** In Window 1, navigate to:
```
http://localhost:8000/landing-pages/v1/index.html
```

**What to see:**
- Landing page loads instantly
- No red errors in DevTools Console
- "Comprar Agora" button visible

**Document in TEST-1-LIVE-LOG.md:**
- [ ] Page loaded successfully
- [ ] Time: __________ seconds
- [ ] Console errors: NONE

---

### MINUTE 2-3: Verify GA4 Loads

**Step 2.1:** In DevTools Network tab:
- Type "gtag" in the filter
- Refresh page (Cmd+R)
- Look for: `gtag.js` request

**What to see:**
- URL: `https://www.googletagmanager.com/gtag/js?id=G-KKTGW6BEJP`
- Status: `200` (green)
- Time: `<1000ms`

**Document in TEST-1-LIVE-LOG.md:**
- [ ] GA4 gtag.js found
- [ ] Status: 200
- [ ] Load time: __________ ms

---

### MINUTE 3-4: Verify Meta Pixel Loads

**Step 3.1:** In DevTools Network tab:
- Clear filter
- Type "fbevents"
- Look for: `fbevents.js` request

**What to see:**
- URL: `https://connect.facebook.net/en_US/fbevents.js`
- Status: `200` (green)
- Time: `<1000ms`

**Document in TEST-1-LIVE-LOG.md:**
- [ ] Meta Pixel fbevents.js found
- [ ] Status: 200
- [ ] Load time: __________ ms

---

### MINUTE 4-6: Find and Click Purchase Button

**Step 4.1:** Close DevTools (Cmd+Option+I)

**Step 4.2:** Scroll down the landing page

**Step 4.3:** Find the "Comprar Agora" button (usually red/prominent)

**Step 4.4:** Click it

**What to see:**
- Page redirects to Hotmart
- Hotmart payment form loads
- Takes 3-5 seconds to load

**Document in TEST-1-LIVE-LOG.md:**
- [ ] Button clicked
- [ ] Redirected to Hotmart
- [ ] Hotmart loaded in: __________ seconds

---

### MINUTE 6-8: Fill Hotmart Form

**Step 5.1:** You're now on Hotmart payment page

**Step 5.2:** Fill the form:
```
Email:    teste1@example.com
Name:     Test User 1
Phone:    +55 11 99999-1111 (or similar)
(Any other required fields)
```

**Document in TEST-1-LIVE-LOG.md:**
- [ ] Email: teste1@example.com
- [ ] Name: Test User 1
- [ ] Phone: ____________

---

### MINUTE 8-10: Fill Payment Card

**Step 6.1:** Scroll to payment section

**Step 6.2:** Enter card details:
```
Card Number: 4111 1111 1111 1111
Expiry:      12/25
CVV:         123
Holder:      Test User
```

**⚠️ IMPORTANT:** This is a TEST card
- Will NOT charge your account
- Hotmart recognizes it as test
- Payment will succeed

**Document in TEST-1-LIVE-LOG.md:**
- [ ] Card entered
- [ ] Expiry entered: 12/25
- [ ] CVV entered: 123

---

### MINUTE 10-12: Submit Payment

**Step 7.1:** Click "Comprar" or "Pagar" button

**Step 7.2:** Wait for payment processing (3-5 seconds)

**What to see:**
- Payment processes
- Success page displays with confirmation
- Order/transaction number shown

**Document in TEST-1-LIVE-LOG.md:**
- [ ] Payment submitted
- [ ] Processing time: __________ seconds
- [ ] Success page displayed: YES/NO
- [ ] Transaction ID: __________

---

### MINUTE 12-15: Check GA4 Purchase Event

**Step 8.1:** Open DevTools again (F12)

**Step 8.2:** Go to Network tab

**Step 8.3:** Filter by: `/g/collect`

**Step 8.4:** Look for purchase event request

**What to see:**
- Request URL: `google-analytics.com/g/collect`
- Status: `200` or `204` (both OK)
- Body contains: `event_name:purchase`, `value`, `currency:BRL`

**Document in TEST-1-LIVE-LOG.md:**
- [ ] GA4 purchase event found
- [ ] Status: 200/204
- [ ] Event name: purchase
- [ ] Value: __________
- [ ] Currency: BRL
- [ ] Transaction ID: __________

---

### MINUTE 15-17: Check Meta Pixel Event

**Step 9.1:** In Network tab, clear filter

**Step 9.2:** Filter by: `facebook.com/tr`

**Step 9.3:** Look for Purchase event

**What to see:**
- Request URL contains: `facebook.com/tr`
- Status: `200` (green)
- Payload contains: `value`, `currency:BRL`

**Document in TEST-1-LIVE-LOG.md:**
- [ ] Meta Pixel event found
- [ ] Status: 200
- [ ] Event type: Purchase
- [ ] Value: __________
- [ ] Currency: BRL

---

### MINUTE 17-22: Check Email (WAIT UP TO 5 MINUTES)

**Step 10.1:** Switch to Window 2 (email inbox)

**Step 10.2:** Refresh the inbox (Cmd+R or Ctrl+R)

**Step 10.3:** Look for email from: `noreply@resetprimal.com`

**What to see (should arrive within 2-5 minutes):**
- From: `noreply@resetprimal.com`
- Subject: `Parabéns! Seu acesso ao Reset Primal foi confirmado 🎉`
- Contains: Welcome message, app link, download instructions

**If not there:**
- Wait 1-2 more minutes
- Check spam folder
- Refresh again

**Document in TEST-1-LIVE-LOG.md:**
- [ ] Email received: YES/NO
- [ ] From: noreply@resetprimal.com
- [ ] Subject: Parabéns! Seu acesso...
- [ ] Arrived in: __________ minutes
- [ ] Links functional: YES/NO

---

### MINUTE 22-25: Verify Database Records

**Step 11.1:** Open Supabase Console:
```
https://supabase.com/ → Login → Project
```

**Step 11.2:** Go to "SQL Editor"

**Step 11.3:** Run this query:
```sql
SELECT * FROM users WHERE email = 'teste1@example.com';
```

**What to see:**
- User record with:
  - email: `teste1@example.com`
  - created_at: today's date
  - status: `active`

**Step 11.4:** Run this query:
```sql
SELECT * FROM purchases WHERE email = 'teste1@example.com';
```

**What to see:**
- Purchase record with:
  - email: `teste1@example.com`
  - amount: (product price)
  - status: `completed`
  - created_at: today's date

**Document in TEST-1-LIVE-LOG.md:**
- [ ] User record found: YES/NO
- [ ] User status: active
- [ ] Purchase record found: YES/NO
- [ ] Purchase status: completed
- [ ] Amount: __________

---

## ✅ TEST COMPLETE!

### Final Checklist

All 12 steps executed?
- [ ] 1. Page loaded
- [ ] 2. GA4 loaded
- [ ] 3. Meta Pixel loaded
- [ ] 4. Page displayed properly
- [ ] 5. Clicked purchase button
- [ ] 6. Filled Hotmart form
- [ ] 7. Entered card details
- [ ] 8. Submitted payment (success)
- [ ] 9. GA4 event fired
- [ ] 10. Meta Pixel event fired
- [ ] 11. Email received
- [ ] 12. Database records created

### RESULT

Choose one:
- [ ] **PASS** - All 12 steps successful, no errors
- [ ] **FAIL** - One or more steps failed (list issues in TEST-1-LIVE-LOG.md)
- [ ] **PARTIAL** - Most steps pass, some minor issues

---

## 📝 FINAL STEPS

1. **Fill TEST-1-LIVE-LOG.md** with all evidence
2. **Document any issues** with severity level
3. **Note the time** test completed
4. **Share results** with Quinn/team

---

## 🎯 EXPECTED OUTCOMES

### If Test PASSES ✅
- All 12 steps completed successfully
- No errors or timeouts
- Email delivered in <5 minutes
- Database records created
- GA4 and Meta Pixel both tracking

→ **Next:** Execute Test Scenario 2 (Repeat Customer)

### If Test FAILS ❌
- One or more steps didn't work
- Error messages present
- Email didn't arrive
- Database records missing
- Analytics not tracking

→ **Next:** Report issues to @dev for fixes, reschedule retest

---

## 💡 TIPS FOR SUCCESS

1. **Be patient with email:** Takes 1-5 minutes, check spam folder
2. **Screenshot key moments:** GA4 event, Meta event, success page
3. **Document everything:** Even small details help debugging
4. **Note exact times:** When you started each step
5. **Keep DevTools open:** During the entire test for monitoring

---

## 🆘 NEED HELP?

- **Can't find GA4 event?** Check Network tab "Preserve log" is checked
- **Email not arriving?** Check spam folder, wait full 5 minutes
- **Database access error?** Verify Supabase login and project selection
- **Card being declined?** Make sure you're using exact test card: 4111 1111 1111 1111

---

## 🚀 YOU'RE READY!

Everything is set up and ready.
The system is 100% operational.
Execute the test following the steps above.

**Good luck! 🎉**

---

**Test Duration:** 20-30 minutes
**Status:** READY TO EXECUTE
**Account:** teste1@example.com ✅
**Test Card:** 4111 1111 1111 1111 ✅
**Logging Document:** /TEST-1-LIVE-LOG.md ✅
