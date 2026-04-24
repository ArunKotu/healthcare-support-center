# 🏥 Healthcare Support Center

> A mini web app prototype for healthcare NGOs — patient intake forms, volunteer registration, and an AI-powered FAQ chatbot.

---

## 🔗 Links

| | |
|---|---|
| **Live Demo** | `https://healthcare-support-center.vercel.app/` |
| **GitHub Repo** | `https://github.com/ArunKotu/healthcare-support-center`|

---

## 📸 Preview

The app has four tabs:

```
[ ♥ Patient Support ]  [ ★ Volunteer ]  [ ✉ Contact ]  [ ◉ AI Assistant (AI) ]
```

Each tab opens a form or the HealthBot chatbot inside a clean card UI.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18 (functional components + hooks) |
| **Build Tool** | Vite 5 |
| **Styling** | Plain CSS (no UI library) |
| **AI Integration** | Anthropic Claude API (`claude-sonnet-4-20250514`) |
| **Deployment** | Vercel / Netlify (static SPA) |
| **Language** | JavaScript (JSX) |

No backend. No database. Fully client-side — zero server cost for the NGO to run.

---

## 🤖 AI Idea — HealthBot FAQ Chatbot

### What it does
The **AI Assistant** tab features **HealthBot**, a chatbot that answers common patient questions instantly — without a human operator.

### Two modes

**Mode 1 — Offline FAQ matching (default)**
A keyword-matching engine handles the 8 most common patient questions:

| Keyword | Response covers |
|---|---|
| `appointment` | How to book via portal or phone |
| `insurance` | Accepted plans (Medicare, Medicaid, Blue Cross, etc.) |
| `emergency` | Call 911, urgent care hours |
| `prescription` | Refill process, 48–72hr turnaround |
| `records` | HIPAA 30-day window, portal or in-person |
| `telehealth` | Video link sent 15 min before appointment |
| `hours` | Clinic, urgent care, and ER schedules |
| `volunteer` | Redirect to volunteer form |

Greetings, thank-yous, and pain/illness messages are also handled with empathetic fallbacks.

**Mode 2 — Live Claude AI (toggle on)**
A checkbox enables real-time Anthropic API calls. The system prompt constrains Claude to:
- 2–4 sentence replies only
- Healthcare-only scope (no personal medical advice)
- Emergency redirect to 911

### Why this matters for NGOs
NGOs often lack 24/7 staff. This chatbot answers the top patient questions at any hour, reduces front-desk call volume, and can be extended with real appointment-booking APIs.

---

## 🧑‍💼 NGO Use-Case

**Target organization type:** Community health clinic, patient advocacy nonprofit, or rural healthcare NGO.

**Problems this solves:**

1. **Patient intake is slow** — The Patient Support form digitizes triage: name, DOB, contact info, and type of support needed are captured and routed to a patient advocate. No paper forms.

2. **Volunteer recruitment is scattered** — The Volunteer Registration form collects area of interest, availability, and experience in one place, replacing email-based sign-ups.

3. **Staff answer the same 8 questions all day** — HealthBot handles FAQs automatically, freeing staff for higher-value tasks.

4. **No IT budget** — The app is a static site (React + Vite). Hosting on Vercel or Netlify is free. There is no backend server, no database, no maintenance overhead.

**Example NGO fit:** A free clinic serving 500+ patients/month could deploy this as their homepage contact hub, saving an estimated 2–3 hours/day of staff time on FAQ calls and paper intake.

---

## 📁 Project Structure

```
healthcare-support-app/
├── index.html              # HTML entry point
├── vite.config.js          # Vite build config
├── package.json            # Dependencies
├── netlify.toml            # Netlify deployment config
├── vercel.json             # Vercel deployment config
├── README.md               # This file
└── src/
    ├── main.jsx            # React root mount
    ├── App.jsx             # All components (forms + chatbot)
    └── App.css             # All styles
```

---

## 🚀 Running Locally

```bash
# 1. Clone
git clone https://github.com/your-username/healthcare-support-app.git
cd healthcare-support-app

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open in browser
# → http://localhost:5173
```

---

## ☁️ Deploying to Vercel (Recommended — Free)

### Option A: Vercel CLI
```bash
npm install -g vercel
vercel
# Follow the prompts — framework auto-detected as Vite
```

### Option B: Vercel Dashboard
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repo
4. Framework preset: **Vite**
5. Build command: `npm run build`
6. Output directory: `dist`
7. Click **Deploy** — live in ~60 seconds

---

## ☁️ Deploying to Netlify (Alternative — Also Free)

### Option A: Netlify CLI
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### Option B: Netlify Dashboard
1. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import from Git**
2. Connect your GitHub repo
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **Deploy site**

The included `netlify.toml` handles the SPA redirect automatically.

---

## ⚙️ Enabling Live Claude AI

The chatbot works offline by default. To enable real Claude AI responses:

1. Get an API key at [console.anthropic.com](https://console.anthropic.com)
2. In the live app, click the **"Use Claude AI"** checkbox in the AI Assistant tab
3. The app calls `api.anthropic.com/v1/messages` directly from the browser

> **Note for production:** For a real deployment, proxy the API call through a serverless function (Vercel Edge Function or Netlify Function) so the API key is never exposed in the browser. This prototype calls the API directly for simplicity.

---

## ✅ Features Checklist

- [x] Patient Support intake form (with validation + success state)
- [x] Volunteer Registration form (with info banner + success state)
- [x] Contact form (with subject dropdown + success state)
- [x] AI chatbot with keyword FAQ matching (offline, no API key needed)
- [x] Live Claude AI toggle (online mode)
- [x] Suggested quick-questions for chatbot
- [x] Typing indicator animation
- [x] Responsive design (mobile-friendly)
- [x] Emergency info footer strip
- [x] Zero backend / zero cost hosting

---

## 🙏 Acknowledgements

Built as a concept prototype demonstrating how AI can reduce operational burden for healthcare NGOs. Inspired by the real challenges faced by free clinics and community health organizations operating with limited staff.

---

*Built with React + Vite + Claude AI · Deployed on Vercel*
