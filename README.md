# 📝 Fullstack CI/CD Note-Taking App

A complete fullstack TypeScript application with an automated CI/CD pipeline demonstrating modern DevOps practices.

## 🎯 Project Overview

**Frontend:** React + TypeScript + Vite  
**Backend:** Express + TypeScript + SQLite  
**Testing:** Vitest (Frontend) + Jest (Backend)  
**CI/CD:** GitHub Actions  
**Deployment:** Vercel (Frontend) + Render (Backend)

## 📋 What You'll Learn

This project demonstrates:
- ✅ Continuous Integration (CI) - Automated testing and building
- ✅ Continuous Deployment (CD) - Automated deployments to production
- ✅ Monorepo structure with npm workspaces
- ✅ TypeScript across the stack
- ✅ Automated testing with coverage
- ✅ Code quality checks (linting)
- ✅ Multi-environment deployments

## 🏗️ Project Structure

```
fullstack-cicd-app/
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # CI/CD Pipeline
├── backend/
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   ├── models/            # Database models
│   │   ├── routes/            # API routes
│   │   ├── tests/             # Backend tests
│   │   ├── app.ts             # Express app
│   │   └── server.ts          # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── jest.config.js
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── services/          # API calls
│   │   ├── types/             # TypeScript types
│   │   ├── __tests__/         # Frontend tests
│   │   ├── App.tsx            # Main component
│   │   └── main.tsx           # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── package.json               # Root package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd fullstack-cicd-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   
   # Frontend
   cp frontend/.env.example frontend/.env
   ```

4. **Run development servers**
   ```bash
   # Run both frontend and backend
   npm run dev
   
   # Or run separately
   npm run dev:backend  # Backend on http://localhost:3001
   npm run dev:frontend # Frontend on http://localhost:3000
   ```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
cd backend && npm run test:watch
cd frontend && npm run test:watch
```

## 🔍 Understanding the CI/CD Pipeline

### Pipeline Overview

The CI/CD pipeline in `.github/workflows/ci-cd.yml` runs automatically on:
- **Pull Requests** to `main` → Runs tests and builds
- **Pushes to `main`** → Runs tests, builds, AND deploys

### Pipeline Stages

```
┌─────────────────────────────────────────┐
│  1. Code Push or Pull Request          │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  2. Parallel Jobs                       │
│     ├─ Backend: Lint → Test → Build    │
│     └─ Frontend: Lint → Test → Build   │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  3. Upload Build Artifacts              │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  4. Deploy (only on main branch)        │
│     ├─ Deploy Backend to Render         │
│     └─ Deploy Frontend to Vercel        │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  5. Deployment Summary                  │
└─────────────────────────────────────────┘
```

### What Each Job Does

#### **Backend Job**
1. Checks out code
2. Sets up Node.js with caching
3. Installs dependencies
4. Runs ESLint
5. Runs Jest tests with coverage
6. Builds TypeScript to JavaScript
7. Uploads build artifacts

#### **Frontend Job**
1. Checks out code
2. Sets up Node.js with caching
3. Installs dependencies
4. Runs ESLint
5. Runs Vitest tests
6. Builds React app with Vite
7. Uploads build artifacts

#### **Deploy Jobs** (only on `main` branch)
- Downloads build artifacts
- Deploys to production platforms

## 🔧 Setting Up Deployment

### Deploy Backend to Render

1. Create account at [render.com](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure:
   - **Build Command:** `cd backend && npm install && npm run build`
   - **Start Command:** `cd backend && npm start`
   - **Environment:** Node 20
5. Get your deploy hook URL
6. Add to GitHub Secrets as `RENDER_DEPLOY_HOOK`

### Deploy Frontend to Vercel

1. Create account at [vercel.com](https://vercel.com)
2. Install Vercel CLI: `npm i -g vercel`
3. Link project: `cd frontend && vercel link`
4. Get your tokens:
   ```bash
   vercel whoami  # Get your account
   ```
5. Add to GitHub Secrets:
   - `VERCEL_TOKEN` - Your Vercel token
   - `VERCEL_ORG_ID` - Your organization ID
   - `VERCEL_PROJECT_ID` - Your project ID

### Required GitHub Secrets

Go to **Settings → Secrets and variables → Actions** and add:

| Secret | Description | Required |
|--------|-------------|----------|
| `RENDER_DEPLOY_HOOK` | Render deploy hook URL | For backend deployment |
| `VERCEL_TOKEN` | Vercel authentication token | For frontend deployment |
| `VERCEL_ORG_ID` | Vercel organization ID | For frontend deployment |
| `VERCEL_PROJECT_ID` | Vercel project ID | For frontend deployment |
| `VITE_API_URL` | Production backend URL | Optional, defaults to `/api` |

## 📊 Pipeline Features

### ✅ Continuous Integration Features

- **Parallel Testing:** Frontend and backend tests run simultaneously
- **Code Quality:** ESLint checks enforce code standards
- **Test Coverage:** Jest/Vitest generate coverage reports
- **Build Verification:** Ensures code compiles successfully
- **Fast Feedback:** Developers know within minutes if code passes

### ✅ Continuous Deployment Features

- **Automatic Deployment:** Push to main = automatic production deploy
- **Environment Separation:** PRs test but don't deploy
- **Artifact Management:** Build artifacts cached between jobs
- **Deployment Gating:** Only deploys if all tests pass
- **Rollback Support:** Previous versions available in platforms

## 🎓 Learning Exercises

Try these to deepen your understanding:

1. **Add a Staging Environment**
   - Deploy PRs to staging URLs
   - Require approval before production

2. **Add More Tests**
   - Increase test coverage to 90%
   - Add E2E tests with Playwright

3. **Add Security Scanning**
   - Use `npm audit` in pipeline
   - Add Dependabot for dependency updates

4. **Add Performance Monitoring**
   - Integrate Lighthouse CI
   - Track bundle sizes

5. **Try Jenkins**
   - Set up a local Jenkins instance
   - Recreate this pipeline in Jenkins

## 🐛 Troubleshooting

### Tests Failing in CI but Passing Locally
- Clear node_modules and reinstall
- Check for environment-specific code
- Verify Node version matches CI

### Deployment Failing
- Check GitHub Secrets are set correctly
- Verify deploy hook URLs are valid
- Check deployment platform logs

### Build Artifacts Not Found
- Ensure upload-artifact step succeeded
- Check retention period hasn't expired
- Verify path in download step matches upload

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Express Documentation](https://expressjs.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Push and create a Pull Request
5. Watch the CI/CD pipeline run!

## 📝 License

MIT License - feel free to use this project for learning!

---

**Built with ❤️ to teach CI/CD concepts**
