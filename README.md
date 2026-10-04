# 🎭 KrackAI — Multi-Agent Research & Forensic Anti-Detection Engine

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-CyberJha%2FKrackAI-181717.svg?logo=github)](https://github.com/CyberJha/KrackAI)

**Empirical Technical Research with 100% Human-Grade Forensic Evasion Polish.**

[Explore Features](#-key-features) • [Quickstart](#-local-setup--quickstart) • [Architecture](#-directory-architecture) • [Deployment](#-deployment) • [GitHub Setup](#-pushing-to-github)

</div>

---

## 📌 Overview

**KrackAI** is an advanced AI research pipeline and forensic humanizer built to produce undetectable, publication-ready research and long-form writing. Designed to withstand leading forensic AI detectors—including **Turnitin**, **GPTZero**, **ZeroGPT**, and **CopyLeaks**—KrackAI combines a multi-agent generation pipeline with linguistic deconstruction, rhythm perturbation, and human perplexity injection.

---

## 🚀 Key Features

### 🌐 Multi-Provider AI Engine
- Seamlessly switch between **Google Gemini (Gemini 2.5 Flash / Pro)**, **Groq (Llama 3.3 70B, DeepSeek R1)**, and **OpenAI (GPT-4o)**.
- Secure client-side credential storage with runtime fallback to environment variables.

### 🔬 One-Click Empirical Research Pipeline
- Automated multi-agent workflow: Topic Deconstruction → Deep Literature Review → Empirical Synthesis → Executive Structuring.
- Real-time streaming generation with phase progression indicators.

### 🕵️ Two-Stage Forensic Anti-Detection Studio
- **Stage 1 (Syntactic Deconstruction):** Eliminates 40+ synthetic AI transition markers (*"Moreover"*, *"Furthermore"*, *"In conclusion"*, *"Delve"*).
- **Stage 2 (Forensic Copy-Editor):** Restructures uniform sentence lengths, breaks rhythmic monotony, and introduces natural linguistic burstiness.

### 📈 Real-Time Cadence & Burstiness Visualizer
- Interactive cadence charts comparing sentence length distribution and standard deviation before and after humanization.
- Visual confirmation of human-like sentence length variance.

### 🔎 Forensic AI Risk Scanner
- Live multi-metric scan measuring structural uniformity, syntactic predictability, and cliché density.
- Risk matrix simulating Turnitin, GPTZero, ZeroGPT, and CopyLeaks detection thresholds.

### 📜 10 Ironclad Rules & PR-39 Protocol
- Interactive rule reference guiding sentence variance, voice calibration, evidence attribution, and synthetic habit eradication.
- Built-in cheatsheets for high-perplexity prompting strategies.

### 🧪 Embedded Code & Notebook Viewer
- Built-in viewer for `KrackAI.ipynb` Jupyter Notebook and Python pipelines for local offline experimentation.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, TailwindCSS v4, Lucide Icons, Framer Motion
- **Backend / API:** Express.js, TypeScript (`tsx`), Vercel Serverless Functions (`api/index.ts`)
- **Build Tooling:** Vite 8, Node.js
- **AI Integration:** `@google/genai`, REST integrations for Groq and OpenAI

---

## 💻 Local Setup & Quickstart

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `bun`

### 1. Clone or Navigate to the Repository
```bash
git clone https://github.com/CyberJha/KrackAI.git
cd KrackAI
```

### 2. Install Dependencies
```bash
npm install
```
*(If you encounter dependency resolution issues on older Node versions, run: `npm install --legacy-peer-deps`)*

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
# Optional server-side API keys
GEMINI_API_KEY="AIzaSyYourGeminiKeyHere"
GROQ_API_KEY="gsk_YourGroqKeyHere"
OPENAI_API_KEY="sk-YourOpenAIKeyHere"
PORT=3000
```
> **Note:** API keys can also be entered securely directly in the web UI Settings modal (stored locally in your browser's `localStorage`).

### 4. Start Development Server
```bash
npm run dev
```

Visit **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📁 Directory Architecture

```text
krackai/
├── api/                  # Vercel Serverless Function entry point
│   └── index.ts          # Serverless Express handler
├── src/
│   ├── components/       # UI cards, cadence charts, modals & studios
│   │   ├── CadenceVisualizer.tsx
│   │   ├── CodeViewer.tsx
│   │   ├── EvasionGuide.tsx
│   │   ├── ForensicScanner.tsx
│   │   ├── Header.tsx
│   │   ├── HumanizerStudio.tsx
│   │   ├── InteractiveBackground.tsx
│   │   ├── OneClickResearch.tsx
│   │   ├── PR39ProtocolModal.tsx
│   │   ├── PromptsCheatSheetModal.tsx
│   │   ├── ResearchPipeline.tsx
│   │   ├── Rules10Manager.tsx
│   │   ├── SettingsModal.tsx
│   │   ├── SkillModal.tsx
│   │   └── SpotlightCard.tsx
│   ├── data/             # Benchmark samples & prompt templates
│   ├── types.ts          # Core TypeScript data contracts
│   ├── App.tsx           # Main workspace coordinator
│   ├── main.tsx          # React application root
│   └── index.css         # TailwindCSS v4 design system
├── .env.example          # Environment variable template
├── .gitignore            # Git exclusion rules
├── index.html            # Application entry HTML
├── package.json          # Project manifest & dependencies
├── server.ts             # Local Express + Vite integration server
├── tsconfig.json         # TypeScript configuration
├── vercel.json           # Vercel deployment configuration
├── vite.config.ts        # Vite configuration
└── README.md             # Project documentation
```

---

## 🌐 Deployment

### Deploy to Vercel
The project includes `vercel.json` configured for zero-configuration serverless deployment:
1. Push your code to GitHub (`CyberJha/KrackAI`).
2. Import the repository in [Vercel](https://vercel.com).
3. Set your environment variables (`GEMINI_API_KEY`, `GROQ_API_KEY`, `OPENAI_API_KEY`) in the Vercel dashboard.
4. Deploy!

---

## 🚀 Pushing to GitHub

To push this repository to GitHub under [CyberJha/KrackAI](https://github.com/CyberJha/KrackAI):

```bash
# 1. Initialize git (if not already initialized)
git init

# 2. Stage all files
git add .

# 3. Create initial commit
git commit -m "feat: complete KrackAI research and forensic evasion engine"

# 4. Set branch to main
git branch -M main

# 5. Link remote repository
git remote add origin https://github.com/CyberJha/KrackAI.git

# 6. Push to GitHub
git push -u origin main
```

If you already have commits on the remote repository and want to sync:
```bash
git pull origin main --rebase
git push -u origin main
```

---

## ⚖️ License

Distributed under the **MIT License**. See `LICENSE` for more information. Developed for academic inquiry, linguistic analysis, and ethical forensic copy-editing research.
