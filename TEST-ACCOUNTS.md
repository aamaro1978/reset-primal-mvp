# 🔐 TEST ACCOUNTS - SETUP & MANAGEMENT

**Status:** Ready for creation
**Date:** February 7, 2026
**Total Accounts:** 5
**Lifespan:** FEB 7 - FEB 11 (then delete)

---

## 📝 TEST ACCOUNT REGISTRY

### Test Account 1: teste1@example.com
```
Email:           teste1@example.com
Password:        SecurePass123!
Purpose:         FUNCTIONAL - Happy path testing
Purchase Flow:   Complete (success scenario)
Status:          [ ] Not Created [ ] Created [ ] Active [ ] Tested
Date Created:    ___________
Notes:           First purchase test - should receive all 5 emails
```

### Test Account 2: teste2@example.com
```
Email:           teste2@example.com
Password:        SecurePass123!
Purpose:         FUNCTIONAL - Repeat customer testing
Purchase Flow:   Multiple purchases
Status:          [ ] Not Created [ ] Created [ ] Active [ ] Tested
Date Created:    ___________
Notes:           Test duplicate email handling
```

### Test Account 3: teste3@example.com
```
Email:           teste3@example.com
Password:        SecurePass123!
Purpose:         FUNCTIONAL - Email sequence timing test (24h duration)
Purchase Flow:   Complete with email tracking
Status:          [ ] Not Created [ ] Created [ ] Active [ ] Tested
Date Created:    ___________
Notes:           Monitor for all 5 emails arriving on schedule
Email 1:         [ ] Received at T+2min
Email 2:         [ ] Received at T+1h
Email 3:         [ ] Received at T+24h
Email 4:         [ ] Received at T+72h
Email 5:         [ ] Received at T+120h
```

### Test Account 4: teste4@example.com
```
Email:           teste4@example.com
Password:        SecurePass123!
Purpose:         LOAD TESTING - Concurrent user simulation
Purchase Flow:   Rapid/concurrent purchases
Status:          [ ] Not Created [ ] Created [ ] Active [ ] Tested
Date Created:    ___________
Notes:           Used for JMeter load testing (50 concurrent users)
```

### Test Account 5: teste5@example.com
```
Email:           teste5@example.com
Password:        SecurePass123!
Purpose:         SECURITY - Authorization & data protection testing
Purchase Flow:   Security validation scenarios
Status:          [ ] Not Created [ ] Created [ ] Active [ ] Tested
Date Created:    ___________
Notes:           Token testing, data encryption validation, session management
```

---

## ✅ ACCOUNT CREATION CHECKLIST

### Pre-Creation
- [ ] Backup existing user data
- [ ] Ensure Supabase is accessible
- [ ] Ensure Hotmart sandbox mode (if available)
- [ ] Have Brevo email inbox open for monitoring

### Create Account 1: teste1@example.com
```
STEP 1: Create in Supabase
  - Table: users
  - Email: teste1@example.com
  - Password: SecurePass123! (hashed)
  - Created_at: 2026-02-07
  - Status: active

STEP 2: Verify email confirmation
  - Check Brevo inbox
  - Verify confirmation email received
  - Click confirmation link (if applicable)

STEP 3: Complete first purchase
  - Navigate to landing page
  - Click "Comprar Agora"
  - Use test card: 4111 1111 1111 1111
  - Verify Hotmart webhook fires
  - Verify user data updated

STEP 4: Verify in databases
  - Supabase: Check user row created
  - Airtable: Check lead created
  - Check purchase recorded

Status: [ ] Complete
Date: ___________
Issues: ___________________________________________
```

### Create Account 2: teste2@example.com
```
STEP 1: Create in Supabase
  - Table: users
  - Email: teste2@example.com
  - Password: SecurePass123!
  - Created_at: 2026-02-07
  - Status: active

STEP 2: Verify email
  - Check confirmation email

STEP 3: Complete first purchase
  - Use test card payment

STEP 4: Complete SECOND purchase (same email)
  - Test duplicate email handling
  - Verify no errors

Status: [ ] Complete
Date: ___________
Issues: ___________________________________________
```

### Create Account 3: teste3@example.com
```
STEP 1: Create account
  - Email: teste3@example.com
  - Password: SecurePass123!

STEP 2: Complete purchase
  - Record timestamp: ___________

STEP 3: Monitor email arrival
  - Email 1 (immediate): [ ] Received at ___________
  - Email 2 (1h later): [ ] Received at ___________
  - Email 3 (24h later): [ ] Received at ___________
  - Email 4 (72h later): [ ] Received at ___________
  - Email 5 (120h later): [ ] Received at ___________

Status: [ ] Complete
Date: ___________
Issues: ___________________________________________
```

### Create Account 4: teste4@example.com
```
STEP 1: Create account
  - Email: teste4@example.com
  - Password: SecurePass123!

STEP 2: Note: Used in JMeter script
  - Do not manually test
  - Will be used for load testing

Status: [ ] Complete
Date: ___________
Issues: ___________________________________________
```

### Create Account 5: teste5@example.com
```
STEP 1: Create account
  - Email: teste5@example.com
  - Password: SecurePass123!

STEP 2: Security testing
  - Test authentication flows
  - Test authorization checks
  - Test data protection

Status: [ ] Complete
Date: ___________
Issues: ___________________________________________
```

---

## 🔍 POST-CREATION VERIFICATION

### Verification Checklist
- [ ] All 5 accounts created in Supabase
- [ ] All 5 accounts in user table
- [ ] All passwords are hashed (never plaintext)
- [ ] All status fields set to "active"
- [ ] All created_at timestamps logged
- [ ] All accounts can login successfully
- [ ] Test purchase works for account 1
- [ ] Hotmart webhook integrates correctly
- [ ] Email service receives purchase event
- [ ] First email delivered within 2 minutes

### Database Verification (Supabase)
```sql
-- Check all test accounts exist
SELECT email, status, created_at
FROM users
WHERE email LIKE 'teste%@example.com'
ORDER BY created_at;

-- Check purchase records
SELECT user_id, email, purchase_date, status
FROM purchases
WHERE email LIKE 'teste%@example.com';

-- Check email logs
SELECT email, email_type, sent_at, status
FROM email_logs
WHERE email LIKE 'teste%@example.com'
ORDER BY sent_at;
```

---

## 📊 ACCOUNT LIFECYCLE

| Date | Phase | Action | Status |
|------|-------|--------|--------|
| FEB 7 | Setup | Create 5 accounts | [ ] Pending |
| FEB 7 | Test | Functional testing | [ ] Pending |
| FEB 8 | Test | Error handling + Load | [ ] Pending |
| FEB 9 | Test | Multi-device + Security | [ ] Pending |
| FEB 10 | Verify | Final validation | [ ] Pending |
| FEB 11 | Launch | LIVE | 🚀 |
| FEB 12 | Cleanup | Delete test accounts | [ ] Pending |

---

## 🗑️ CLEANUP (POST-LAUNCH)

### Delete Test Data
```sql
-- Delete test accounts after FEB 11
DELETE FROM users
WHERE email LIKE 'teste%@example.com';

-- Delete test purchases
DELETE FROM purchases
WHERE email LIKE 'teste%@example.com';

-- Delete test email logs
DELETE FROM email_logs
WHERE email LIKE 'teste%@example.com';

-- Verify deletion
SELECT COUNT(*) FROM users
WHERE email LIKE 'teste%@example.com';
-- Should return: 0
```

### Cleanup Checklist
- [ ] All test users deleted from Supabase
- [ ] All test purchases deleted from Hotmart
- [ ] All test data cleared from Airtable
- [ ] All test emails removed from Brevo
- [ ] Verify no test accounts remain
- [ ] Verify production user count unchanged

---

## ⚠️ IMPORTANT NOTES

1. **Never use real emails** - Always use teste@example.com format
2. **Don't use production data** - Keep test data isolated
3. **Use secure passwords** - Even for test accounts
4. **Log everything** - Track creation/deletion dates
5. **Clean up after** - Delete accounts after FEB 11
6. **Monitor carefully** - Watch for unexpected behavior
7. **Report issues** - Document any anomalies

---

## 📋 ACCOUNT SIGN-OFF

**Created By:** Quinn (QA)
**Date:** February 7, 2026
**Status:** Ready for account creation
**Next Step:** Create 5 test accounts following checklist above

---

**Timeline:** FEB 7 (create) → FEB 7-10 (test) → FEB 12 (cleanup)
**Status:** 🟢 READY FOR IMPLEMENTATION
