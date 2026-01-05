# 🚀 Quick Start Guide

Get the app running in 5 minutes!

## 📦 What You Got

A complete fullstack TypeScript application with:
- ✅ React frontend with tests
- ✅ Express backend with tests
- ✅ Complete CI/CD pipeline with GitHub Actions
- ✅ Ready for deployment to Vercel + Render

## ⚡ Fast Setup

### 1. Install Dependencies (2 minutes)

```bash
cd fullstack-cicd-app
npm install
```

This installs dependencies for both frontend and backend.

### 2. Run the App (30 seconds)

```bash
npm run dev
```

That's it! This starts both:
- Backend: http://localhost:3001
- Frontend: http://localhost:3000

### 3. Try It Out (1 minute)

1. Open http://localhost:3000
2. Click "New Note"
3. Create a note
4. Edit it, delete it, have fun!

## 🧪 Run Tests

```bash
npm test
```

This runs all tests for both frontend and backend.

## 📤 Deploy to Production

### Quick Version:

1. Push your code to GitHub
2. Set up Render for backend (5 min)
3. Set up Vercel for frontend (5 min)
4. Add GitHub Secrets
5. Push to main branch → Auto-deploys! 🎉

### Detailed Version:

See `DEPLOYMENT_GUIDE.md` for step-by-step instructions.

## 🔍 Understand the CI/CD Pipeline

Every time you push code or create a pull request:

1. **Tests run automatically** ✅
2. **Code gets built** 🏗️
3. **If on main branch** → **Deploys to production** 🚀

Check `.github/workflows/ci-cd.yml` to see how it works!

## 📚 Learn More

- `README.md` - Full project documentation
- `DEPLOYMENT_GUIDE.md` - Deployment instructions
- `.github/workflows/ci-cd.yml` - The CI/CD pipeline

## 🎯 Next Learning Steps

1. **Make a change** and watch the CI/CD pipeline run
2. **Break a test** and see the pipeline fail
3. **Add a new feature** with tests
4. **Deploy it** and see it go live automatically

## 💡 Key Files to Explore

### Backend
- `backend/src/app.ts` - Express app setup
- `backend/src/controllers/notesController.ts` - API logic
- `backend/src/tests/notes.test.ts` - Backend tests

### Frontend
- `frontend/src/App.tsx` - Main React component
- `frontend/src/services/api.ts` - API calls
- `frontend/src/__tests__/App.test.tsx` - Frontend tests

### CI/CD
- `.github/workflows/ci-cd.yml` - The pipeline that does everything!

## 🆘 Need Help?

Common commands:

```bash
# Development
npm run dev              # Run both frontend and backend
npm run dev:frontend     # Run only frontend
npm run dev:backend      # Run only backend

# Testing
npm test                 # Run all tests
npm run lint            # Check code quality

# Building
npm run build           # Build both projects
```

---

**Happy Learning! 🎓**

Remember: The best way to learn CI/CD is to break things and see what happens. The pipeline will help you catch mistakes before they reach production!
