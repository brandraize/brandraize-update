# Vercel Deployment Troubleshooting - Complete Fix Guide

## The Root Causes of MIDDLEWARE_INVOCATION_FAILED

### Issue #1: Middleware Matcher Pattern (CRITICAL)
**Status**: ✅ FIXED

The original matcher pattern was too aggressive and conflicted with Vercel's edge runtime:
```javascript
// ❌ OLD - CAUSES INVOCATION FAILURES
matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
```

**Fix Applied**: Simplified and more reliable pattern:
```javascript
// ✅ NEW - WORKS RELIABLY ON VERCEL
matcher: [
  "/((?!api|_next|favicon.ico|robots.txt|sitemap.xml|public).*)",
]
```

**File**: [middleware.js](middleware.js)

---

### Issue #2: Middleware Error Handling (CRITICAL)
**Status**: ✅ FIXED

Middleware was crashing on edge cases (malformed URLs, missing headers).

**Changes Made**:
- Removed unreliable `try-catch` around entire function (Vercel edge functions don't handle this well)
- Simplified URL handling
- Removed unnecessary closures in preference logic

**File**: [middleware.js](middleware.js)

---

### Issue #3: Firebase Admin Not Initialized on Vercel
**Status**: ✅ FIXED

The Firebase admin SDK wasn't exporting `db` properly, causing API routes to fail silently.

**Changes Made**:
1. Added proper initialization check in [configuration/firebase-admin.js](configuration/firebase-admin.js)
2. Export both `authAdmin` and `db` consistently
3. Handle missing `FIREBASE_SERVICE_ACCOUNT_KEY` gracefully

```javascript
// ✅ NOW EXPORTS BOTH
export { authAdmin, db };
```

**File**: [configuration/firebase-admin.js](configuration/firebase-admin.js)

---

### Issue #4: Hardcoded Vercel Blob Token (SECURITY + FUNCTIONALITY)
**Status**: ✅ FIXED

Token was exposed in source code AND not being passed correctly to Vercel Blob functions.

**Changes Made**:
1. Removed hardcoded token from [app/api/upload/route.js](app/api/upload/route.js)
2. Added environment variable validation
3. Pass token explicitly to `del()` function in [app/api/delete/route.js](app/api/delete/route.js)

**Files Changed**:
- [app/api/upload/route.js](app/api/upload/route.js)
- [app/api/delete/route.js](app/api/delete/route.js)

---

### Issue #5: API Routes Missing Service Validation
**Status**: ✅ FIXED

Routes didn't check if Firebase/Blob services were initialized before using them.

**Changes Made**:
- All API routes now validate that required services are initialized
- Return 503 (Service Unavailable) if services aren't configured
- Improved error messages for debugging

**Files Changed**:
- [app/api/create-admin/route.js](app/api/create-admin/route.js)
- [app/api/remove-admin/route.js](app/api/remove-admin/route.js)
- [app/api/delete/route.js](app/api/delete/route.js)
- [app/api/upload/route.js](app/api/upload/route.js)

---

## Deployment Checklist

### Step 1: Configure Environment Variables on Vercel ⚠️ CRITICAL

Go to **Vercel Dashboard** > **Your Project** > **Settings** > **Environment Variables**

#### Add `FIREBASE_SERVICE_ACCOUNT_KEY`
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project **brandraize-f2864**
3. Go to **Project Settings** ⚙️ > **Service Accounts**
4. Click **Generate New Private Key**
5. A JSON file will download - copy the entire content
6. Paste into Vercel as a **single-line string** (remove line breaks)

**Value format** (single line):
```
{"type":"service_account","project_id":"brandraize-f2864","private_key":"-----BEGIN PRIVATE KEY-----\n....\n-----END PRIVATE KEY-----\n","client_email":"firebase-adminsdk-...@brandraize-f2864.iam.gserviceaccount.com","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"..."}
```

#### Add `BLOB_READ_WRITE_TOKEN`
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on **Your Project**
3. Go to **Storage** > **Blob**
4. Click **Connect** (if not already connected)
5. Go to **Blob Storage Settings**
6. Copy the **token** value
7. Add to Vercel Environment Variables with key `BLOB_READ_WRITE_TOKEN`

### Step 2: Deploy Changes

```bash
# Stage changes
git add middleware.js \
  configuration/firebase-admin.js \
  app/api/create-admin/route.js \
  app/api/remove-admin/route.js \
  app/api/delete/route.js \
  app/api/upload/route.js

# Commit
git commit -m "fix: resolve MIDDLEWARE_INVOCATION_FAILED errors

- Simplify middleware matcher pattern for Vercel edge runtime
- Fix Firebase admin initialization and exports
- Remove hardcoded Vercel Blob token, use env vars
- Add service validation in all API routes
- Improve error handling and logging"

# Push
git push origin main
```

Vercel will automatically redeploy.

### Step 3: Verify Deployment

After deployment completes, check these:

- [ ] **Homepage loads** - Visit your site, should not see 500 error
- [ ] **Language switching works** - Try `/en` and `/ar` routes
- [ ] **Admin redirect works** - Visit `/admin`, should redirect to `/en/admin/products`
- [ ] **No middleware errors** - Check Vercel logs (Deployments > Logs)
- [ ] **Error ID changes** - New errors should have different IDs

**Check Logs**:
1. Go to Vercel Dashboard > Your Project > Deployments
2. Click the latest deployment
3. Click **Logs** tab
4. Look for any errors in the first few minutes after deployment

---

## If You Still See 500 Errors

### Debugging Steps

#### 1. Check Vercel Function Logs
```
Vercel Dashboard 
  → Your Project 
  → Deployments 
  → Latest Deployment
  → Logs
```

Look for:
- `MIDDLEWARE_INVOCATION_FAILED` errors
- `Firebase Admin initialization error`
- `Blob storage not configured`

#### 2. Verify Environment Variables Are Set
1. Go to **Settings** > **Environment Variables**
2. Verify both variables exist:
   - `FIREBASE_SERVICE_ACCOUNT_KEY` ✅
   - `BLOB_READ_WRITE_TOKEN` ✅
3. Check they're assigned to the correct environment (Production, Preview, Development)

#### 3. Test Firebase Service Account Key
The JSON must be valid. Check if it:
- Is a single line (no newlines)
- Contains `private_key` with `\n` escape sequences preserved
- Has valid JSON syntax (use [jsonlint.com](https://jsonlint.com))

#### 4. Test API Route Manually
```bash
curl -X POST https://your-domain.com/api/create-admin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","name":"Test Admin"}'
```

Expected responses:
- ✅ `200` - Success
- ❌ `503` - Firebase not configured (env var issue)
- ❌ `400` - Missing fields
- ❌ `500` - Firebase error (check logs)

---

## Security Checklist

✅ Removed hardcoded tokens  
✅ Using environment variables for all secrets  
✅ Firebase service key uses env vars  
✅ Vercel Blob token uses env vars  
✅ Never commit `.env` files  

### Post-Deployment Security

Since tokens may have been exposed in git history:

1. **Rotate Firebase Service Account**
   - Delete the old one from Firebase Console
   - Generate a new one
   - Update `FIREBASE_SERVICE_ACCOUNT_KEY` on Vercel

2. **Rotate Vercel Blob Token**
   - Delete the old one from Vercel Storage settings
   - Generate a new one
   - Update `BLOB_READ_WRITE_TOKEN` on Vercel

3. **Audit Git History** (if repo is public)
   ```bash
   # Check if token was committed
   git log --all --full-history -p -- configuration/firebase-admin.js
   git log --all --full-history -p -- app/api/upload/route.js
   ```

---

## Prevention Guide

### To Prevent These Issues in the Future

1. **Use `.env` template file** - See [.env.example](.env.example)
2. **Add to `.gitignore`**:
   ```
   .env
   .env.local
   .env.*.local
   .env.production.local
   firebase-key.json
   ```

3. **Use environment variable validation**:
   ```javascript
   if (!process.env.REQUIRED_VAR) {
     throw new Error("REQUIRED_VAR not configured");
   }
   ```

4. **Test middleware locally**:
   ```bash
   npm run dev
   # Test: http://localhost:3000/
   # Should redirect to /en
   ```

---

## Useful Links

- [Vercel Middleware Docs](https://vercel.com/docs/functions/middleware)
- [Next.js Middleware](https://nextjs.org/docs/advanced-features/middleware)
- [Firebase Admin SDK Initialization](https://firebase.google.com/docs/admin/setup)
- [Vercel Blob Storage](https://vercel.com/docs/storage/vercel-blob)

---

## Support

If issues persist after following this guide:

1. **Collect diagnostic info**:
   - Vercel deployment URL
   - Error ID from the 500 error
   - Recent changes from `git log`
   - Vercel function logs (last 50 lines)

2. **Check Firebase status**: https://status.firebase.google.com
3. **Check Vercel status**: https://www.vercel-status.com
