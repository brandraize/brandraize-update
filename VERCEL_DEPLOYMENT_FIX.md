# Vercel Deployment Fix Guide

## Issues Found & Fixed

### 1. ❌ Middleware Invocation Error (CRITICAL)
**Problem**: Middleware crashed due to missing error handling and improper URL construction
**Fix**: Added try-catch block and improved URL handling using `request.url` properly

**File**: [middleware.js](middleware.js)

### 2. ❌ Hardcoded Security Token (CRITICAL SECURITY RISK)
**Problem**: Vercel Blob token was hardcoded in source code
```javascript
// ❌ WRONG - DO NOT DO THIS
token: "vercel_blob_rw_6VzuQ5eznZovPmcP_ZgQI0i58joQEkryvb6N7yJfIt3RKUR"
```

**Fix**: Now uses environment variable
```javascript
// ✅ CORRECT
token: process.env.BLOB_READ_WRITE_TOKEN
```

**File**: [app/api/upload/route.js](app/api/upload/route.js)

---

## Deployment Steps

### Step 1: Set Up Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Click **Settings** > **Environment Variables**
3. Add the following variables:

#### `FIREBASE_SERVICE_ACCOUNT_KEY`
- Go to [Firebase Console](https://console.firebase.google.com/)
- Select your project (brandraize-f2864)
- Go to **Project Settings** > **Service Accounts**
- Click **Generate New Private Key**
- Copy the entire JSON and paste it as a single-line string:
```
{"type":"service_account","project_id":"...","private_key":"...","client_email":"...","client_id":"..."}
```

#### `BLOB_READ_WRITE_TOKEN`
- Go to [Vercel Dashboard](https://vercel.com/dashboard)
- Click on your project
- Go to **Storage** > **Blob**
- Copy the **token** from the connection details
- Paste it in Vercel Environment Variables

### Step 2: Redeploy on Vercel

```bash
git add .
git commit -m "fix: remove hardcoded secrets and improve middleware error handling"
git push origin main
```

Vercel will automatically redeploy with the new environment variables.

---

## Testing Checklist

After deployment, verify:

- [ ] Homepage loads without 500 errors
- [ ] Language switching works (en/ar routes)
- [ ] Admin redirect works (`/admin` → `/{lang}/admin/products`)
- [ ] File uploads work
- [ ] Admin creation works
- [ ] No 500 MIDDLEWARE_INVOCATION_FAILED errors

---

## Other Issues Prevented

✅ Removed hardcoded Firebase keys (already using env vars correctly)
✅ Improved API error messages for debugging
✅ Added proper null checks for environment variables
✅ Enhanced middleware error handling

---

## Prevention Tips

1. **Never commit secrets**: Add to `.gitignore`:
   ```
   .env
   .env.local
   .env.production.local
   .env.*.local
   ```

2. **Use `.env.example`**: Reference file without actual values
3. **Review commits**: Check git history never had exposed tokens
4. **Rotate exposed tokens**: If any token was exposed, regenerate immediately on:
   - Vercel Dashboard (Blob tokens)
   - Firebase Console (Service account keys)

---

## Need Help?

If you still see 500 errors after deployment:

1. Check Vercel Function Logs: Dashboard > Deployments > Logs
2. Verify environment variables are set
3. Check that Firebase service account JSON is valid (single line)
4. Ensure Vercel Blob token is correctly formatted
