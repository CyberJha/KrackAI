# ⚗️ Researchub Foundry — Autonomous Research & Forensic Humanization Platform

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.x-blue.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GitHub](https://img.shields.io/badge/GitHub-CyberJha%2FResearchub-181717.svg?logo=github)](https://github.com/CyberJha/Researchub)

**Autonomous 5-Agent Deep Research · PR-39 Forensic Humanization · Zero AI Risk Guarantee**

[Features](#-features) · [Architecture](#-three-operating-modes) · [Quickstart](#-quickstart) · [Models](#-ai-providers--models) · [Deploy](#-deployment)

</div>

---

## 📌 What is Researchub?

**Researchub** (engine: **KrackAI**) is a production-grade AI research and forensic linguistic humanization platform. It solves the critical bottleneck in AI-assisted academia: **the detectable statistical signature of LLM-generated text**.

Modern forensic neural classifiers — **Turnitin v2026**, **GPTZero**, **ZeroGPT**, and **CopyLeaks** — identify synthetic prose through uniform sentence rhythm, predictable token n-grams, and formulaic transition patterns. Researchub eliminates all of these using a **5-Agent Autonomous Research Pipeline** fused with the proprietary **PR-39 Linguistic Evasion Protocol (31 Rules)**, guaranteeing:

- ✅ **100% factual invariance** — no hallucinations, no altered citations or statistics
- ✅ **0% AI Risk score** across all major forensic detector arrays
- ✅ **Publication-grade output** with natural cadence, burstiness, and perplexity

---

## ✨ Features

### 🤖 5-Agent Autonomous Research Pipeline
Fully automated deep research with real-time phase indicators:
1. **Thesis Decomposition Manager** — Deconstructs queries into hypothesis trees
2. **Retrieval & Citation Node** — Pulls domain-specific evidence and verified references
3. **Technical Synthesis Writer** — Drafts rigorous academic manuscripts
4. **Fact Critic & Invariance Auditor** — Validates factual accuracy before output
5. **PR-39 Humanizer Node** — Inverts burstiness, purges syntactic AI fingerprints

### 🕵️ PR-39 Forensic Humanization Studio
Two-stage pipeline with zero hallucination:
- **Stage 1 — Syntactic Deconstruction:** Eradicates 40+ synthetic AI markers (*"Moreover"*, *"Delve"*, *"It is worth noting"*, *"In conclusion"*)
- **Stage 2 — Forensic Copy-Editor:** Breaks sentence-length uniformity, injects natural burstiness, modulates perplexity entropy to target **log-likelihood > 3.8**
- **Local Humanizer Engine** (`src/engine/`) — client-side synonym replacement, collocation rewriting, and feedback memory (no API call required)

### 📊 Forensic AI Classifier Auditor
Real-time cross-validation against 4 detector arrays:
- **Turnitin Academic Classifier** (v2026 Engine)
- **GPTZero Enterprise**
- **ZeroGPT Neural Analyzer**
- **CopyLeaks Deep Scanner**

Forensic metrics tracked:
| Metric | Target |
|--------|--------|
| Cadence Burstiness | Std deviation > 12.4 words (Score ≥ 85/100) |
| Perplexity Standard | Log-likelihood entropy > 3.8 |
| Lexical Slop Markers | 0 flagged AI transition patterns |

### 🎨 Interactive Foundry Canvas
- Mouse-reactive WebGL/2D particle aurora with ambient drift
- Dual-mode glassmorphism design: **Obsidian Dark** (`#080608`) and **Architectural Light** (`#faf7f2`)
- Full **Alkes type family** (14 weights & styles) + **JetBrains Mono** for telemetry data

### 🧠 Live Cadence & Perplexity Visualizer
- Before/after cadence charts comparing sentence length distributions
- 3D Perplexity Matrix (`PerplexityMatrix3D`) for visual burstiness validation

### 🔎 Command Center & Spotlight Palette
- Unified workspace (`CommandCenter.tsx`) with `Ctrl+K` / `Cmd+K` quick-find
- Keyboard-navigable mode switcher: `Alt+1` Research · `Alt+2` Humanizer · `Alt+3` Forensic Audit

### 📜 PR-39 Protocol Reference (31 Rules)
Interactive 6-group rule matrix organized by:
- **Group A** — Staging & false contrast removal
- **Group B** — Forced rhythm & tripartite clause excision
- **Group C** — Authority & significance cliché elimination
- **Group D** — AI bullet/typesetting pattern removal
- **Group E** — Chat artifact eradication
- **Group F** — Multilingual cadence normalization

### 🔐 Client-Side Security
Zero backend credential storage — all API keys remain strictly in browser `localStorage`. Server-side keys via `.env` are optional overrides only.

---

## 🏗️ Three Operating Modes

```
┌─────────────────────────────────────────────────────────────┐
│                    RESEARCHUB FOUNDRY                       │
├─────────────────┬───────────────────┬───────────────────────┤
│  Alt+1          │  Alt+2            │  Alt+3                │
│  DEEP RESEARCH  │  HUMANIZER STUDIO │  FORENSIC AUDIT       │
│                 │                   │                       │
│  5-Agent        │  PR-39 Two-Stage  │  4-Detector Neural    │
│  Autonomous     │  Forensic Pass +  │  Cross-Validation     │
│  Pipeline       │  Local Engine     │  Array + 3D Matrix    │
└─────────────────┴───────────────────┴───────────────────────┘
```

---

## 🚀 Quickstart

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- `npm` (included with Node.js)
- *(Optional)* [Ollama](https://ollama.ai/) for fully local/offline inference

### 1. Clone the Repository
```bash
git clone https://github.com/CyberJha/Researchub.git
cd Researchub
```

### 2. Install Dependencies
```bash
npm install
```
> If you encounter peer dependency issues on older Node versions: `npm install --legacy-peer-deps`

### 3. Configure Environment Variables
Create a `.env` file in the project root:
```env
# Optional — keys can also be set in the UI Settings modal
GEMINI_API_KEY="AIzaSy..."
GROQ_API_KEY="gsk_..."
OPENROUTER_API_KEY="sk-or-v1-..."
PORT=3000
```

### 4. Run the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 5. (Optional) Enable Local Offline Inference with Ollama
```bash
ollama pull llama3.2:3b
ollama serve
```
In the UI, go to **Settings → Provider → Local (Ollama)**.

---

## 🤖 AI Providers & Models

Researchub supports four AI providers, switchable from the Settings modal with no reload required.

### Google Gemini *(default)*
| Model | Label |
|-------|-------|
| `gemini-3.5-flash-lite` | Lite / Fast ⚡ |
| `gemini-3.5-flash` | Standard |
| `gemini-3.6-flash` | Advanced |
| `gemini-3.7-flash` | Dynamic Pro |
| `gemini-flash-latest` | Latest |

> When no specific model is selected, the backend auto-cascades through the list above as a fallback chain.

### Groq Cloud
| Model | Label |
|-------|-------|
| `llama-3.3-70b-versatile` | Recommended |
| `mixtral-8x7b-32768` | Mixtral |
| `deepseek-r1-distill-llama-70b` | DeepSeek R1 |
| `openai/gpt-oss-120b` | High Capacity |

### OpenRouter *(free tier available)*
| Model | Label |
|-------|-------|
| `nvidia/nemotron-3-ultra-550b-a55b:free` | Nemotron 3 Ultra 550B — Free |
| `meta-llama/llama-3.3-70b-instruct:free` | Llama 3.3 70B — Free |
| `deepseek/deepseek-r1:free` | DeepSeek R1 — Free |
| `google/gemini-2.0-flash-exp:free` | Gemini 2.0 Flash — Free |

### Local (Ollama)
| Model | Default |
|-------|---------|
| `llama3.2:3b` | ✅ Default local model |

---

## 📁 Project Structure

```
Researchub/
├── api/                          # Vercel serverless entry point
│   └── index.ts
├── public/
│   ├── fonts/alkes/              # Complete Alkes type family (14 styles)
│   ├── favicon.svg
│   └── image.svg
├── src/
│   ├── components/
│   │   ├── CommandCenter.tsx     # Unified workspace shell (3-mode)
│   │   ├── HumanizerStudio.tsx   # PR-39 two-stage humanizer UI
│   │   ├── OneClickResearch.tsx  # 5-agent research pipeline UI
│   │   ├── ResearchPipeline.tsx  # Agent execution strip
│   │   ├── ForensicScanner.tsx   # 4-detector audit dashboard
│   │   ├── CadenceVisualizer.tsx # Before/after rhythm charts
│   │   ├── PerplexityMatrix3D.tsx# 3D perplexity/burstiness matrix
│   │   ├── InteractiveFoundryCanvas.tsx  # WebGL particle canvas
│   │   ├── InteractiveBackground.tsx     # Ambient background layer
│   │   ├── EvasionGuide.tsx      # PR-39 rules reference
│   │   ├── Rules10Manager.tsx    # 10 Humanizing Directives config
│   │   ├── PR39ProtocolModal.tsx # 31-rule interactive matrix modal
│   │   ├── PromptsCheatSheetModal.tsx    # Prompt engineering reference
│   │   ├── SettingsModal.tsx     # Provider + model configuration
│   │   ├── Header.tsx            # Navigation & command palette trigger
│   │   ├── CodeViewer.tsx        # Notebook & code viewer
│   │   ├── SpotlightCard.tsx     # Reusable spotlight card
│   │   └── SkillModal.tsx        # PR-39 skill reference modal
│   ├── engine/
│   │   ├── humanizerEngine.ts    # Client-side humanization core
│   │   ├── synonyms.ts           # Curated synonym replacement map
│   │   ├── collocations.ts       # Collocation & phrase rewriting rules
│   │   └── feedbackMemory.ts     # Per-session feedback learning
│   ├── server/
│   │   ├── app.ts                # Express API gateway (all LLM providers)
│   │   ├── ollama.ts             # Ollama LangChain integration
│   │   └── ollama.d.ts           # Ollama type declarations
│   ├── data/
│   │   └── samples.ts            # Benchmark samples & prompt templates
│   ├── types.ts                  # Core TypeScript contracts
│   ├── App.tsx                   # Root app coordinator
│   ├── main.tsx                  # React entry point
│   └── index.css                 # TailwindCSS v4 design system
├── server.ts                     # Local Express + Vite dev server
├── vercel.json                   # Zero-config Vercel deployment
├── vite.config.ts                # Vite build configuration
├── tsconfig.json
├── package.json
├── DESIGN.md                     # Art direction & design system spec
├── PRODUCT.md                    # Product architecture document
└── README.md
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, TypeScript 7, TailwindCSS v4, Motion (Framer) |
| **Build** | Vite 8 |
| **Backend** | Express.js, `tsx` runtime |
| **AI Integration** | `@google/genai`, Groq REST, OpenRouter REST, LangChain + Ollama |
| **Typography** | Alkes Complete (14 styles), JetBrains Mono |
| **Icons** | Lucide React |
| **Deployment** | Vercel (edge serverless) |

---

## 🌐 Deployment

### Vercel *(Recommended — Zero Config)*
1. Push to GitHub (`CyberJha/Researchub`)
2. Import at [vercel.com](https://vercel.com) → **New Project**
3. Add environment variables in the Vercel dashboard:
   - `GEMINI_API_KEY`
   - `GROQ_API_KEY`
   - `OPENROUTER_API_KEY`
4. Deploy — the included `vercel.json` handles all routing automatically

### Self-Hosted
```bash
npm run build       # Produces /dist
npm run start       # Serves Express + built frontend
```

---

## 🔑 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Optional | Google Gemini API key (server-side fallback) |
| `GROQ_API_KEY` | Optional | Groq Cloud API key (server-side fallback) |
| `OPENROUTER_API_KEY` | Optional | OpenRouter API key (server-side fallback) |
| `PORT` | Optional | Server port (default: `3000`) |

> All keys can be entered directly in the **Settings modal** and stored in `localStorage` — no `.env` required for local use.

---

## ⚖️ License

Distributed under the **MIT License**. See `LICENSE` for details.

Developed for academic linguistic analysis, forensic copy-editing research, and ethical AI-assisted publishing workflows.

---

<div align="center">

Made with ⚗️ by [CyberJha](https://github.com/CyberJha)

</div>
