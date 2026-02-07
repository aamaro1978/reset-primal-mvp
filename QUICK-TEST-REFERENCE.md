# 🧪 QUICK TEST REFERENCE - FUNCTIONAL TEST 1

**Test Account:** teste1@example.com
**Password:** SecurePass123!
**Duration:** 20 minutes
**File:** `/FUNCTIONAL-TEST-1-EXECUTION.md`

---

## 🚀 QUICK START (5 STEPS)

### 1️⃣ Open Landing Page
```bash
cd /Users/acacioamaro/RESET-PRIMAL-MVP
python3 -m http.server 8000
# Then open: http://localhost:8000/landing-pages/v1/index.html
```

### 2️⃣ Open DevTools (F12)
- Go to **Network** tab
- Filter by "gtag" → should load GA4
- Filter by "fbevents" → should load Meta Pixel

### 3️⃣ Click "Comprar Agora" Button
- Redirects to Hotmart payment page
- Fill form:
  - Email: `teste1@example.com`
  - Card: `4111 1111 1111 1111` (test card - won't charge)
  - Expiry: `12/25`
  - CVV: `123`

### 4️⃣ Verify Events in DevTools
- **Network** tab → look for `/g/collect` (GA4 purchase event)
- **Network** tab → look for `facebook.com/tr` (Meta Pixel)
- **Console** tab → check for errors

### 5️⃣ Check Email Inbox
- Look for email from: `noreply@resetprimal.com`
- Subject: "Parabéns! Seu acesso ao Reset Primal foi confirmado 🎉"
- Should arrive within 2-5 minutes

---

## ✅ EXPECTED RESULTS

| Component | Expected | How to Verify |
|-----------|----------|---------------|
| **Page Load** | <3s | DevTools Network tab |
| **GA4** | Loads from gtag.js | Filter "gtag" in Network |
| **Meta Pixel** | Loads fbevents.js | Filter "fbevents" in Network |
| **Payment** | Success page displayed | Hotmart redirect URL |
| **GA4 Event** | Purchase event sent | Filter `/g/collect` in Network |
| **Meta Event** | Conversion tracked | Look in Network or Console |
| **Email** | Arrives in inbox | Check email folder |
| **Database** | User + purchase created | Supabase SQL query |

---

## 🔧 TEST CARD DETAILS

⚠️ **These are TEST cards - will NOT charge your account:**

```
Card Number:    4111 1111 1111 1111
Expiry:         12/25 (any future date works)
CVV:            123 (any 3 digits)
Card Holder:    Test User
```

---

## 📊 SUCCESS CRITERIA

✅ **Test PASSES if:**
- [ ] Page loads without errors
- [ ] GA4 snippet loads (200 status)
- [ ] Meta Pixel loads (200 status)
- [ ] Hotmart payment succeeds
- [ ] GA4 purchase event fires
- [ ] Meta Pixel conversion tracks
- [ ] Email arrives within 2-5 minutes
- [ ] Database records created
- [ ] No console errors (F12)

❌ **Test FAILS if:**
- [ ] Page load >3s
- [ ] GA4 doesn't load (404/error)
- [ ] Meta Pixel doesn't load (404/error)
- [ ] Payment fails with error
- [ ] No GA4 event in Network
- [ ] No Meta event in Network
- [ ] Email doesn't arrive after 5 minutes
- [ ] Database records missing
- [ ] Console has errors

---

## 📋 CHECKLIST

**Before Starting:**
- [ ] Browser updated (Chrome recommended)
- [ ] Local server running (or file path ready)
- [ ] teste1@example.com account created ✅ (already done)
- [ ] Email inbox open in another tab
- [ ] Test card info saved (above)

**During Test:**
- [ ] DevTools open (F12)
- [ ] Network tab filtering setup
- [ ] Console tab checked
- [ ] Payment form filled correctly
- [ ] Email monitored

**After Test:**
- [ ] All 9 steps documented
- [ ] Screenshots/evidence collected
- [ ] Issues logged (if any)
- [ ] Status marked (PASS/FAIL/PARTIAL)

---

## 🆘 TROUBLESHOOTING

| Issue | Solution |
|-------|----------|
| Page won't load | Check HTTP server is running on port 8000 |
| GA4 not loading | Check internet connection, check Network tab |
| Meta Pixel not loading | Check internet connection, verify pixel ID in code |
| Payment page blank | Clear browser cache (Cmd+Shift+Delete) |
| Email not arriving | Check spam folder, wait 5 minutes, verify email correct |
| Database records missing | Check Supabase is accessible, verify email format |
| Console errors | Open F12 → Console → screenshot the error, report to @dev |

---

## 📞 IF ISSUES FOUND

**Critical Issues (blocks launch):**
- Payment flow fails
- GA4 not tracking
- Meta Pixel not tracking
- Email service down

→ Report to: **@dev (Dex)** immediately

**Non-Critical Issues:**
- UI display problems
- Email formatting
- Minor analytics delay

→ Report to: **@qa (Quinn)** for next steps

---

## ⏱️ TIME BREAKDOWN

| Step | Time |
|------|------|
| Setup + page load | 2 min |
| DevTools verification | 3 min |
| Hotmart form + payment | 5 min |
| Event verification | 3 min |
| Email check | 2-5 min |
| Database verification | 2 min |
| **Total** | **~20 min** |

---

## 📝 DETAILED GUIDE

For full step-by-step instructions with evidence capture:
→ See: `/FUNCTIONAL-TEST-1-EXECUTION.md`

---

**Status:** 🟢 READY TO TEST
**Account:** teste1@example.com ✅ Created
**Next Step:** Execute test following steps above

**Good luck! 🚀**
