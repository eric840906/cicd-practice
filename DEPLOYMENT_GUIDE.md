# 🚀 Deployment Guide

This guide walks you through deploying both the frontend and backend of your application.

## 📋 Prerequisites

- GitHub account with your repository
- Render account (for backend)
- Vercel account (for frontend)

## 🔙 Backend Deployment (Render)

### Step 1: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Authorize Render to access your repositories

### Step 2: Create a Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure the service:

   **Basic Settings:**

   - Name: `notes-app-backend` (or your choice)
   - Region: Choose closest to your users
   - Branch: `main`
   - Root Directory: `backend`
   - Runtime: `Node`

   **Build & Deploy:**

   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

   **Advanced:**

   - Auto-Deploy: `Yes` (deploys on every push to main)

4. Click **"Create Web Service"**

### Step 3: Get Deploy Hook

1. Go to your service → **Settings**
2. Scroll to **Deploy Hook**
3. Copy the deploy hook URL
4. Save it - you'll need it for GitHub Secrets

### Step 4: Add Environment Variables (Optional)

In Render dashboard → Environment:

```
NODE_ENV=production
PORT=3001
```

## 🎨 Frontend Deployment (Vercel)

### Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

### Step 2: Link Your Project

```bash
cd frontend
vercel login
vercel link
```

Follow the prompts:

- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N**
- Project name? `notes-app-frontend` (or your choice)
- In which directory? `./` (current directory)

### Step 3: Get Vercel Credentials

#### Get Vercel Token:

1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Click **"Create Token"**
3. Name it `GitHub Actions`
4. Click **Create**
5. Copy the token immediately (you won't see it again!)

#### Get Organization ID:

```bash
vercel whoami
# Note the "id" field
```

Or get it from your project settings URL:
`https://vercel.com/[ORG_ID]/[PROJECT_NAME]`
`https://vercel.com/erichchius-projects/cicd-pratice`

#### Get Project ID:

```bash
cd frontend
cat .vercel/project.json
```

Look for the `"projectId"` field.

### Step 4: Configure Environment Variables

In Vercel dashboard → Settings → Environment Variables:

```
VITE_API_URL=https://your-backend-url.onrender.com/api
VITE_API_URL=https://cicd-practice-o2r3.onrender.com/api
```

Replace `your-backend-url` with your Render service URL.

## 🔐 Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"** for each:

### Required Secrets:

| Secret Name          | Value                | Where to Get It                           |
| -------------------- | -------------------- | ----------------------------------------- |
| `RENDER_DEPLOY_HOOK` | Deploy hook URL      | Render dashboard → Settings → Deploy Hook |
| `VERCEL_TOKEN`       | Your Vercel token    | vercel.com/account/tokens                 |
| `VERCEL_ORG_ID`      | Your organization ID | From `vercel whoami` or project URL       |
| `VERCEL_PROJECT_ID`  | Your project ID      | From `.vercel/project.json`               |

### Optional Secrets:

| Secret Name    | Value       | Description                                                    |
| -------------- | ----------- | -------------------------------------------------------------- |
| `VITE_API_URL` | Backend URL | Production API URL (e.g., `https://your-app.onrender.com/api`) |

## ✅ Verify Setup

### Test Backend Deployment

1. Make a small change in `backend/src/server.ts`
2. Commit and push to main:
   ```bash
   git add .
   git commit -m "test: trigger backend deployment"
   git push origin main
   ```
3. Go to GitHub → Actions tab
4. Watch the pipeline run
5. Once complete, visit your Render service URL
6. Should see the API running at `/health`

### Test Frontend Deployment

1. Make a small change in `frontend/src/App.tsx`
2. Commit and push to main:
   ```bash
   git add .
   git commit -m "test: trigger frontend deployment"
   git push origin main
   ```
3. Go to GitHub → Actions tab
4. Watch the pipeline run
5. Once complete, visit your Vercel URL
6. Should see the app running

## 🔄 The Complete Deployment Flow

```
Developer pushes code to main
         ↓
GitHub Actions triggered
         ↓
┌────────┴────────┐
│  Run all tests  │
└────────┬────────┘
         ↓
     Tests pass?
         ↓ YES
┌────────┴────────┐
│  Build projects │
└────────┬────────┘
         ↓
┌────────┴────────────────────┐
│  Upload build artifacts     │
└────────┬────────────────────┘
         ↓
┌────────┴───────────────────────┐
│  Trigger Render Deploy Hook    │ → Render builds & deploys backend
└────────┬───────────────────────┘
         ↓
┌────────┴───────────────────────┐
│  Deploy to Vercel              │ → Vercel deploys frontend
└────────┬───────────────────────┘
         ↓
    ✅ DEPLOYED!
```

## 🎯 Testing Your Deployment

### 1. Test Backend API

```bash
# Health check
curl https://your-backend-url.onrender.com/health

# Get all notes
curl https://your-backend-url.onrender.com/api/notes

# Create a note
curl -X POST https://your-backend-url.onrender.com/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Note","content":"Testing deployment"}'
```

### 2. Test Frontend

1. Open your Vercel URL in a browser
2. Try creating a note
3. Try editing a note
4. Try deleting a note
5. Check browser console for errors

## 🐛 Common Issues

### Backend deployment fails

- **Check build logs in Render dashboard**
- Verify build command is correct
- Ensure all dependencies are in package.json
- Check Node version matches local development

### Frontend can't connect to backend

- **Check `VITE_API_URL` environment variable**
- Verify backend is deployed and running
- Check CORS settings in backend
- Look at browser console for errors

### GitHub Actions fails

- **Check GitHub Secrets are set correctly**
- Verify secret names match exactly (case-sensitive)
- Check token/hook URLs are valid
- Look at Action logs for specific errors

### Deploy hook doesn't trigger

- **Verify the hook URL is correct**
- Check Render dashboard for webhook logs
- Ensure secret is properly set in GitHub
- Try triggering deployment manually in Render

## 🔍 Monitoring Your Apps

### Render (Backend)

- Dashboard → Your Service → Logs
- Monitor for errors, performance
- Check deployment history

### Vercel (Frontend)

- Dashboard → Your Project → Deployments
- Monitor build times
- Check deployment previews
- Analytics (if enabled)

### GitHub Actions

- Repository → Actions tab
- View workflow runs
- Check job statuses
- Download logs for debugging

## 🎓 Next Steps

Once deployed:

1. **Set up monitoring**

   - Add error tracking (e.g., Sentry)
   - Set up uptime monitoring
   - Configure alerts

2. **Add staging environment**

   - Create separate Render/Vercel projects
   - Deploy from `develop` branch
   - Test before production

3. **Implement feature flags**

   - Safely roll out features
   - A/B testing
   - Quick rollbacks

4. **Add database**
   - Render PostgreSQL
   - MongoDB Atlas
   - Supabase

## 📚 Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [CI/CD Best Practices](https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment)

---

**Need help?** Check the logs in:

1. GitHub Actions (for CI/CD issues)
2. Render Dashboard (for backend issues)
3. Vercel Dashboard (for frontend issues)
