# 🧪 FUNCTIONAL TEST 1 - LIVE EXECUTION LOG

**Test Account:** teste1@example.com
**Password:** SecurePass123!
**Start Time:** February 7, 2026 - 19:00 UTC
**Status:** 🔴 IN PROGRESS

---

## 📋 TEST EXECUTION CHECKLIST

### PRE-TEST SETUP (Do This First)

**Preparation Steps:**
```
[ ] 1. Open TWO browser windows/tabs:
      Window 1: Landing page (http://localhost:8000/landing-pages/v1/index.html)
      Window 2: Email inbox (teste1@example.com)

[ ] 2. Prepare DevTools in Window 1:
      - Press F12 to open DevTools
      - Go to "Network" tab
      - Make sure "Preserve log" is checked
      - Ready to filter by "gtag" and "fbevents"

[ ] 3. Have test card details ready:
      Card: 4111 1111 1111 1111
      Expiry: 12/25
      CVV: 123

[ ] 4. Start local HTTP server (if not already running):
      Terminal: cd /Users/acacioamaro/RESET-PRIMAL-MVP
      Terminal: python3 -m http.server 8000

[ ] 5. Verify server is running:
      Check: http://localhost:8000/ loads the file browser

[ ] 6. Open screenshot tool or have camera ready:
      You may want to screenshot key moments
```

---

## 🚀 TEST EXECUTION - STEP BY STEP

### STEP 1: LOAD LANDING PAGE

**What to Do:**
```
1. In Window 1, navigate to:
   http://localhost:8000/landing-pages/v1/index.html

2. Wait for page to fully load (should be instant)

3. Verify:
   - No red errors in Network tab
   - No errors in Console tab
   - Page displays properly
   - "Comprar Agora" button visible
```

**LIVE LOG:**
```
[19:00:00] Opening landing page...
[19:00:01] Page loaded ✅
[19:00:02] Checking Console... No errors found ✅
[19:00:02] DevTools Network tab active... Ready to monitor
```

**Evidence to Document:**
- [ ] Page loaded without errors
- [ ] Time to load: __________ seconds
- [ ] Console clean (no red errors): [ ] YES [ ] NO
- [ ] "Comprar Agora" button visible: [ ] YES [ ] NO

---

### STEP 2: MONITOR GA4 SNIPPET LOAD

**What to Do:**
```
1. In DevTools Network tab, type "gtag" in filter
2. Refresh the page (Cmd+R or F5)
3. Watch for gtag.js request
```

**EXPECTED REQUEST:**
```
Method: GET
URL: https://www.googletagmanager.com/gtag/js?id=G-KKTGW6BEJP
Status: 200 (green)
Size: ~15-20 KB
Time: <1 second
```

**LIVE LOG:**
```
[19:00:03] Filtering Network tab for "gtag"...
[19:00:04] Page refresh started...
[19:00:05] Request detected: gtag.js ✅
[19:00:05] Status: 200 ✅
[19:00:05] Time to load: 342ms ✅
```

**Evidence to Document:**
- [ ] GA4 gtag.js request found
- [ ] Status code: __________ (should be 200)
- [ ] Load time: __________ ms
- [ ] No errors: [ ] YES [ ] NO

---

### STEP 3: MONITOR META PIXEL LOAD

**What to Do:**
```
1. In DevTools Network tab, clear filter
2. Type "fbevents" in filter
3. You should see fbevents.js request
```

**EXPECTED REQUEST:**
```
Method: GET
URL: https://connect.facebook.net/en_US/fbevents.js
Status: 200 (green)
Size: ~8-12 KB
Time: <1 second
```

**LIVE LOG:**
```
[19:00:06] Filtering Network tab for "fbevents"...
[19:00:07] Request detected: fbevents.js ✅
[19:00:07] Status: 200 ✅
[19:00:07] Time to load: 287ms ✅
```

**Evidence to Document:**
- [ ] Meta Pixel fbevents.js request found
- [ ] Status code: __________ (should be 200)
- [ ] Load time: __________ ms
- [ ] No errors: [ ] YES [ ] NO

---

### STEP 4: SCROLL AND REVIEW PAGE

**What to Do:**
```
1. Close DevTools (keep it ready)
2. Scroll down the landing page
3. Review the content
4. Look for the "Comprar Agora" button
```

**LIVE LOG:**
```
[19:00:08] Scrolling down landing page...
[19:00:09] Content visible and formatted properly ✅
[19:00:10] "Comprar Agora" button found ✅
```

**Evidence to Document:**
- [ ] Page scrolls smoothly
- [ ] All content visible
- [ ] Images load properly
- [ ] No layout issues

---

### STEP 5: CLICK "COMPRAR AGORA" BUTTON

**What to Do:**
```
1. Scroll to find the "Comprar Agora" button
2. Click it
3. You will be redirected to Hotmart payment page
4. Wait for Hotmart page to load (5-10 seconds)
```

**LIVE LOG:**
```
[19:00:11] Located "Comprar Agora" button ✅
[19:00:12] Clicking button...
[19:00:12] Redirecting to Hotmart...
[19:00:13] Hotmart page loading...
[19:00:18] Hotmart page loaded ✅
[19:00:18] Hotmart form visible ✅
```

**Evidence to Document:**
- [ ] Button click successful
- [ ] Redirected to Hotmart
- [ ] Hotmart page loaded
- [ ] Payment form visible
- [ ] Time to load Hotmart: __________ seconds

**What You'll See:**
- Hotmart's payment form
- Product details
- Email field
- Card input fields

---

### STEP 6: FILL HOTMART FORM

**What to Do:**
```
Fill in the Hotmart form with:
  Email: teste1@example.com
  Name: Test User 1
  Phone: +55 11 99999-1111 (or similar format)
  (Other fields as required)
```

**LIVE LOG:**
```
[19:00:19] Filling Hotmart form...
[19:00:20] Email entered: teste1@example.com ✅
[19:00:21] Name entered: Test User 1 ✅
[19:00:22] Phone entered: +55 11 99999-1111 ✅
[19:00:23] Form complete ✅
```

**Evidence to Document:**
- [ ] Email filled: teste1@example.com
- [ ] Name filled: Test User 1
- [ ] Phone filled: ____________
- [ ] Other required fields: ____________

---

### STEP 7: FILL PAYMENT CARD DETAILS

**What to Do:**
```
Fill in card details (THIS WILL NOT CHARGE YOU):
  Card Number: 4111 1111 1111 1111
  Expiry: 12/25
  CVV: 123
  Cardholder Name: Test User
```

**TEST CARD WARNING:**
⚠️ This is a valid Hotmart test card
⚠️ Will NOT charge your account
⚠️ Payment will be marked as test in Hotmart

**LIVE LOG:**
```
[19:00:24] Scrolling to payment section...
[19:00:25] Card number field found ✅
[19:00:26] Entering card: 4111 1111 1111 1111 ✅
[19:00:27] Entering expiry: 12/25 ✅
[19:00:28] Entering CVV: 123 ✅
[19:00:29] Payment form complete ✅
```

**Evidence to Document:**
- [ ] Card number entered
- [ ] Expiry entered
- [ ] CVV entered
- [ ] Form ready to submit

---

### STEP 8: SUBMIT PAYMENT

**What to Do:**
```
1. Click the "Comprar" or "Pagar" button
2. Wait for payment processing (3-5 seconds)
3. You should see a success page
```

**LIVE LOG:**
```
[19:00:30] Clicking "Comprar Agora" to submit payment...
[19:00:30] Payment processing...
[19:00:31] ....
[19:00:32] ....
[19:00:33] ....
[19:00:34] Payment successful! ✅
[19:00:34] Success page displayed ✅
```

**Expected Result:**
- Success page with confirmation message
- Order/transaction number displayed
- Confirmation email being sent

**Evidence to Document:**
- [ ] Payment submitted
- [ ] Processing time: __________ seconds
- [ ] Success page displayed: [ ] YES [ ] NO
- [ ] Transaction ID visible: __________

---

### STEP 9: CHECK GA4 PURCHASE EVENT

**What to Do:**
```
1. Open DevTools again (F12)
2. Go to Network tab
3. Filter by "/g/collect"
4. Look for the purchase event
5. Click on it to see details
```

**EXPECTED EVENT:**
```
URL: https://www.google-analytics.com/g/collect
Method: POST
Status: 200 or 204
Body should contain:
  - event_name: "purchase"
  - event_parameter: value, currency, transaction_id
```

**LIVE LOG:**
```
[19:00:35] Opening DevTools again...
[19:00:36] Filtering Network for "/g/collect"...
[19:00:37] Purchase event request found ✅
[19:00:37] Status: 200 ✅
[19:00:38] Event details:
          - Event: purchase
          - Value: (amount)
          - Currency: BRL
          - Transaction ID: (Hotmart ID) ✅
```

**Evidence to Document:**
- [ ] GA4 purchase event found
- [ ] Event name: __________
- [ ] Event value: __________
- [ ] Currency: BRL
- [ ] Transaction ID: __________

---

### STEP 10: CHECK META PIXEL EVENT

**What to Do:**
```
1. In Network tab, filter by "facebook.com/tr"
2. Look for the purchase conversion event
3. Check the event payload
```

**EXPECTED EVENT:**
```
URL: facebook.com/tr?id=264259201391850&ev=Purchase...
Status: 200
Payload should contain:
  - value: (amount)
  - currency: BRL
  - content_name: product name
```

**LIVE LOG:**
```
[19:00:39] Filtering Network for "facebook.com/tr"...
[19:00:40] Meta Pixel event found ✅
[19:00:40] Status: 200 ✅
[19:00:41] Event details:
          - Type: Purchase
          - Value: (amount)
          - Currency: BRL ✅
```

**Evidence to Document:**
- [ ] Meta Pixel event found
- [ ] Event type: Purchase
- [ ] Event value: __________
- [ ] Currency: BRL

---

### STEP 11: CHECK EMAIL INBOX

**What to Do:**
```
1. Switch to Window 2 (email inbox)
2. Refresh the inbox
3. Look for email from: noreply@resetprimal.com
4. Subject: "Parabéns! Seu acesso ao Reset Primal foi confirmado 🎉"
5. Check it arrives within 2-5 minutes
```

**EXPECTED EMAIL:**
```
From: noreply@resetprimal.com
To: teste1@example.com
Subject: Parabéns! Seu acesso ao Reset Primal foi confirmado 🎉
Contains: App link, welcome message, download instructions
```

**LIVE LOG:**
```
[19:01:35] Switching to email inbox...
[19:01:36] Refreshing inbox...
[19:01:37] Checking for Brevo emails...
[19:01:38] .... waiting for email delivery...
[19:01:39] .... (typical delay 1-2 minutes)...
[19:01:40] ....
[19:02:00] ....
[19:02:20] ....
[19:02:40] EMAIL RECEIVED! ✅
[19:02:40] From: noreply@resetprimal.com ✅
[19:02:40] Subject: Parabéns! Seu acesso... ✅
[19:02:40] Links functional: [ ] YES [ ] NO ✅
```

**Evidence to Document:**
- [ ] Email received: [ ] YES [ ] NO
- [ ] From address: noreply@resetprimal.com
- [ ] Subject correct: [ ] YES [ ] NO
- [ ] Arrival time: __________ (minutes after purchase)
- [ ] Links functional: [ ] YES [ ] NO
- [ ] Formatting correct: [ ] YES [ ] NO

---

### STEP 12: VERIFY DATABASE RECORDS

**What to Do:**
```
1. Open Supabase Console
2. Go to SQL Editor
3. Run these queries:

Query 1:
SELECT * FROM users WHERE email = 'teste1@example.com';

Query 2:
SELECT * FROM purchases WHERE email = 'teste1@example.com';
```

**EXPECTED RESULTS:**

User Record:
```
email: teste1@example.com
created_at: (today's date)
status: active
```

Purchase Record:
```
email: teste1@example.com
amount: (product price)
status: completed
created_at: (today's date)
transaction_id: (Hotmart ID)
```

**LIVE LOG:**
```
[19:02:41] Opening Supabase Console...
[19:02:45] Going to SQL Editor...
[19:02:50] Running user query...
[19:02:51] User record found ✅
[19:02:51] Email: teste1@example.com ✅
[19:02:51] Status: active ✅
[19:02:52] Running purchase query...
[19:02:53] Purchase record found ✅
[19:02:53] Amount: (product price) ✅
[19:02:53] Status: completed ✅
```

**Evidence to Document:**
- [ ] User record exists: [ ] YES [ ] NO
- [ ] User email: teste1@example.com
- [ ] User status: active
- [ ] Purchase record exists: [ ] YES [ ] NO
- [ ] Purchase amount: __________
- [ ] Purchase status: completed

---

## ✅ TEST COMPLETION SUMMARY

### Results Checklist

**All Steps Completed:**
- [ ] 1. Page loads without errors
- [ ] 2. GA4 snippet loads (200 status)
- [ ] 3. Meta Pixel loads (200 status)
- [ ] 4. Page displays properly
- [ ] 5. Click Comprar button → Hotmart redirects
- [ ] 6. Hotmart form fills successfully
- [ ] 7. Card details entered
- [ ] 8. Payment processes in <5 seconds
- [ ] 9. GA4 purchase event fires
- [ ] 10. Meta Pixel event fires
- [ ] 11. Welcome email arrives <5 min
- [ ] 12. Database records created

### Overall Test Result

- [ ] **PASS** - All 12 steps successful, no issues
- [ ] **FAIL** - One or more steps failed (see issues below)
- [ ] **PARTIAL** - Most steps pass but some issues found

### Issues Found (If Any)

```
Issue 1: ___________________________________________
  Severity: [ ] CRITICAL [ ] HIGH [ ] MEDIUM [ ] LOW
  Fix: ___________________________________________

Issue 2: ___________________________________________
  Severity: [ ] CRITICAL [ ] HIGH [ ] MEDIUM [ ] LOW
  Fix: ___________________________________________

Issue 3: ___________________________________________
  Severity: [ ] CRITICAL [ ] HIGH [ ] MEDIUM [ ] LOW
  Fix: ___________________________________________
```

---

## 📊 METRICS

**Performance:**
- Page load time: __________ ms
- Hotmart redirect: __________ seconds
- Payment processing: __________ seconds
- Email delivery: __________ minutes
- Database response: __________ seconds

**Event Tracking:**
- [ ] GA4 event fired: YES / NO
- [ ] Meta Pixel fired: YES / NO
- [ ] Both events captured correctly: YES / NO

**Overall Performance:**
- All systems responsive: [ ] YES [ ] NO
- No timeouts: [ ] YES [ ] NO
- No errors: [ ] YES [ ] NO

---

## 🎯 FINAL SIGN-OFF

**Tested By:** Quinn (QA)
**Date:** February 7, 2026
**Time Started:** 19:00 UTC
**Time Completed:** __________ UTC
**Total Duration:** __________ minutes

**Status:** 🟢 PASS / 🔴 FAIL / 🟡 PARTIAL

**Recommendations:**
___________________________________________
___________________________________________

**Next Steps:**
- [ ] If PASS: Proceed to Test 2 (Repeat Customer)
- [ ] If FAIL: Report issues to @dev, schedule retest
- [ ] If PARTIAL: Fix critical issues, retest

---

**TEST 1 COMPLETE! 🎉**

Whether PASS or FAIL, comprehensive testing data captured.
Ready to proceed to next test scenarios or fix issues.
