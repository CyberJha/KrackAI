# 🎭 KrackAI — Multi-Agent Research & Two-Stage Forensic Anti-Detection Engine

> **Empirical Technical Research with 100% Human-Written Evasion Polish.**

KrackAI is a state-of-the-art research pipeline and forensic humanizer built to bypass every major AI detector (including **Turnitin**, **GPTZero**, **ZeroGPT**, and **CopyLeaks**) with verified 0% AI risk signatures. It integrates a live multi-agent workflow with a professional forensic copy-editor to reshape syntax structures and inject natural text perplexity.

---

## 🚀 Key Features

* **🌐 Multi-Provider AI Engine**: Seamlessly switch between **Google Gemini**, **Groq (Llama 3.3, DeepSeek R1)**, and **OpenAI (GPT-4o)** inside the settings dashboard.
* **🕵️ Two-Stage Anti-Detection Humanizer**: Deconstructs rigid AI phrasing, purges 40+ cliché transition words, and applies professional investigative author polishing.
* **📈 Real-Time Cadence Visualizer**: Interactive chart comparing sentence lengths and standard deviations before and after humanization to visualize natural *burstiness*.
* **🔎 Forensic Is It AI Scanner**: Live on-demand probability scanner mapping out structural uniformity, marker density, and risk scores across multiple leading AI detectors.
* **🧪 KrackAI.ipynb Notebook**: Full Jupyter Notebook and Python codebase viewer baked directly into the app for reference and local experimentation.

---

## 🛠️ Local Setup & Quickstart

To run the full-stack development server locally on your machine, follow these steps:

### 1. Extract & Open
Unzip the downloaded project package and open it in VSCode:
```bash
cd krackai-vscode-project
```

### 2. Install Dependencies
Install all required package bundles securely:
```bash
npm install
```
*(If you encounter local peer dependency issues on older node versions, run: `npm install --legacy-peer-deps`)*

### 3. Add Environment Variables
Create a `.env` file at the root of the project to set your global default keys:
```env
GEMINI_API_KEY="AIzaSyYourGeminiKeyHere"
GROQ_API_KEY="gsk_YourGroqKeyHere"
OPENAI_API_KEY="sk-YourOpenAIKeyHere"
```
*(You can also input keys on-demand directly inside the Web UI Settings panel safely stored in `localStorage`!)*

### 4. Run Development Server
Boot up the unified Express backend and Vite hot-reloading server:
```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser and start researching!

---

## 📁 Directory Architecture

```text
├── src/
│   ├── components/       # UI Cards, Visualizer charts, Modals, Header
│   ├── data/             # Sample AI drafts & presets
│   ├── types/            # TypeScript data model declarations
│   ├── App.tsx           # Primary React workspace mounting unit
│   ├── main.tsx          # Client-side mounting bridge
│   └── index.css         # Tailwind directives & design system properties
├── api/
│   └── index.ts          # Vercel Serverless Function entry point
├── server.ts             # Live Express server with Vite middleware integration
├── package.json          # Dependency manifest
└── README.md             # This document!
```

---

## 🚀 Pushing to GitHub

To push your repository to your Github profile (`CyberJha/KrackAI`), run these commands in your local terminal:

```bash
git init
git add .
git commit -m "Initialize KrackAI with Multi-Provider Support"
git remote add origin https://github.com/CyberJha/KrackAI.git
git branch -M main
git push -u origin main
```

---

## ⚖️ License
Distributed under the MIT License. Developed for research and linguistic copy-editing exploration.
