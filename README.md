# SkillStack (EduNest R23) - Production & Deployment Guide

SkillStack is a full-stack academic platform featuring interactive R23 syllabus exploration, AI-assisted video tutorials (Manim & Synthesia avatars), an integrated coding exam engine, and a human-like AI academic collaborator.

---

## 🚀 Environment Configuration

Copy `.env.example` to `.env` or configure environment variables in your deployment dashboard:

| Variable | Description | Default / Example |
|---|---|---|
| `PORT` | Web server listening port (automatically set by PaaS hosts) | `5000` |
| `MONGO_URI` | MongoDB Atlas Database Connection URI | `mongodb+srv://...` |
| `GEMINI_API_KEY` | Gemini API Key for SkillStack AI Tutor Chat | `AIzaSy...` |
| `SYNTHESIA_API_KEY` | Synthesia API Key (Optional for AI Avatar generation) | `your_key_here` |
| `VITE_API_BASE_URL` | Frontend API Base URL (leave empty for single-server deployment) | `""` |

---

## 🛠️ Local Development & Testing

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Mode**:
   ```bash
   # Terminal 1: Run Express Backend API (Port 5000)
   npm run server

   # Terminal 2: Run Vite React Frontend (Port 5173 with proxy)
   npm run dev
   ```

3. **Verify Production Build**:
   ```bash
   npm run build
   npm start
   ```

4. **Run Automated Test Suite (11/11 Pass)**:
   ```bash
   npm test
   ```

---

## 🌐 Cloud Deployment Options

### Option 1: Vercel Deployment (Full-Stack Monorepo)

1. **Via Vercel CLI**:
   ```bash
   npm i -g vercel
   vercel
   ```
2. **Via Vercel Web Dashboard**:
   - Push code to GitHub.
   - Go to [Vercel Dashboard](https://vercel.com/new) -> **Import Git Repository**.
   - Framework Preset: **Vite** (auto-detected).
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variables: Add `MONGO_URI` and `GEMINI_API_KEY`.
   - Click **Deploy**. Vercel will automatically compile the frontend UI and route all `/api/*` requests to serverless functions via `api/index.js` and `vercel.json`!

---

### Option 2: Render.com (Recommended - Single Web Service)

1. Push your code to GitHub.
2. Go to [Render Dashboard](https://dashboard.render.com/) -> **New** -> **Blueprint**.
3. Connect your repository. Render will automatically detect `render.yaml`.
4. Fill in the environment variables (`MONGO_URI`, `GEMINI_API_KEY`).
5. Click **Apply**. Render will automatically build the React app (`npm run build`) and start the Node server (`npm start`).

---

### Option 3: Heroku / Railway / Dokku

1. Ensure `Procfile` is present (`web: node server.js`).
2. Set Build Command: `npm install && npm run build`
3. Set Start Command: `npm start`
4. Set Environment Variables in settings (`MONGO_URI`, `GEMINI_API_KEY`).

---

### Option 4: Docker Container Deployment (Cloud Run / AWS ECS)

1. **Build Docker Image**:
   ```bash
   docker build -t skillstack-edunest .
   ```

2. **Run Docker Container Locally**:
   ```bash
   docker run -p 5000:5000 -e MONGO_URI="<your-mongo-uri>" -e GEMINI_API_KEY="<your-gemini-key>" skillstack-edunest
   ```

---

## 🧪 Verification & Build Commands

- `npm run build`: Compiles React SPA to `./dist` using Vite.
- `npm run lint`: Runs Oxlint code quality verification.
- `npm test`: Runs automated test suite (11/11 passing tests).
- `npm start`: Launches Node/Express server serving both `/api/*` endpoints and static frontend from `./dist`.
