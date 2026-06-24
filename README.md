# RecruitFlow AI

**RecruitFlow AI** is a production-quality AI Recruitment Copilot SaaS demo — an AI operating layer for modern recruitment teams. It targets high-volume technical and infrastructure recruitment sectors (Telecommunications, Data Centres, Energy Infrastructure) in the Australian market.

This is not a chatbot. It is a suite of specialized AI workflow agents that execute core recruitment tasks — sourcing, screening, outreach, and reporting — reducing hours of manual work to minutes.

---

## 🚀 Features Overview

| Module | Route | Description |
|---|---|---|
| **Dashboard** | `/dashboard` | Central overview with weekly impact metrics and agent status cards |
| **Job Intelligence Agent** | `/agents/job-intelligence` | Parses job descriptions into structured role intelligence |
| **Candidate Match Agent** | `/agents/candidate-match` | Scores candidate profiles against job requirements |
| **Outreach Agent** | `/agents/outreach` | Generates personalized multi-channel outreach sequences |
| **Client Update Agent** | `/agents/client-update` | Transforms raw notes into polished client pipeline reports |
| **Workflow Automation Map** | `/workflow-map` | Interactive before/after process review with ROI analysis |

---

## 🎨 Design System

The UI uses a custom **Warm-Cream Editorial Aesthetic** (inspired by Cursor's design language), deliberately avoiding generic dark/blue/purple AI themes.

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--canvas` | `#f7f7f4` | Page background |
| `--canvas-soft` | `#fafaf7` | Subtle alternate background |
| `--surface-card` | `#ffffff` | Card surfaces |
| `--surface-strong` | `#e6e5e0` | Hover/emphasis backgrounds |
| `--ink` | `#26251e` | Primary text |
| `--body` | `#5a5852` | Body text |
| `--muted` | `#807d72` | Secondary/caption text |
| `--hairline` | `#e6e5e0` | Borders (1px only, no box-shadows) |
| `--primary` | `#f54e00` | RecruitFlow Orange — CTA accent |
| `--primary-active` | `#d04200` | Hover/active state |
| `--success` | `#1f8a65` | Positive indicators |
| `--error` | `#cf2d56` | Error states |

### AI Timeline Pill Palette

Each agent stage uses a distinct pastel color rendered as rounded pills:

| Stage | Color | Hex |
|---|---|---|
| Analyzing | Peach | `#dfa88f` |
| Sourcing | Mint | `#9fc9a2` |
| Matching | Blue | `#9fbbe0` |
| Generating | Lavender | `#c0a8dd` |
| Complete | Gold | `#c08532` |

### Typography

- **Sans-serif:** `Inter` (weight 400, negative letter-spacing for editorial feel)
- **Monospace:** `JetBrains Mono` (for code/data outputs like boolean strings)
- Both loaded via `next/font/google` with CSS variable injection.

### Design Rules

- **No box-shadows** — depth conveyed through 1px hairline borders only
- **No glassmorphism** — clean, flat surfaces
- **Spacing scale** defined as custom CSS tokens (`--spacing-xxs` through `--spacing-section`)
- **Border-radius scale** defined as tokens (`--radius-xs` through `--radius-pill`)
- Custom scrollbars styled to match the cream theme

---

## 🏗️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.2.9 (Turbopack) | App Router framework |
| React | 19.2.4 | UI library |
| TypeScript | ^5 | Type safety |
| Tailwind CSS | v4 | Utility-first styling |
| shadcn/ui | ^4.11.0 | Accessible UI primitives |
| Framer Motion | ^12.41.0 | Animations & transitions |
| Lucide React | ^1.21.0 | Icon library |
| tw-animate-css | ^1.4.0 | Tailwind animation utilities |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| Next.js API Routes | — | Serverless API endpoints (App Router `route.ts`) |
| OpenAI Node SDK | ^6.44.0 | LLM integration |
| Model | `gpt-4o-mini` | AI completion model |

### Utilities

| Package | Purpose |
|---|---|
| `class-variance-authority` | Component variant management |
| `clsx` | Conditional className composition |
| `tailwind-merge` | Intelligent Tailwind class deduplication |

---

## 🔧 Backend Architecture

### API Routes

All AI operations run server-side through Next.js App Router API routes. The API key never reaches the browser.

#### `POST /api/analyze-role`
- **Input:** `{ jobDescription: string }`
- **System Prompt:** `prompts/roleAnalyzer.ts` — Instructs the model to act as a senior recruitment consultant specializing in telecom/data centres/energy in Australia
- **Output Type:** `RoleAnalysis`
  ```typescript
  {
    roleSummary: string;
    criticalSkills: string[];
    niceToHaveSkills: string[];
    candidatePersona: string;
    booleanSearchStrings: string;
    targetCompanies: string[];
    screeningQuestions: string[];
  }
  ```

#### `POST /api/match-candidate`
- **Input:** `{ jobDescription: string, candidateProfile: string }`
- **System Prompt:** `prompts/candidateMatcher.ts` — Compares candidate against JD with realistic scoring (not everyone is a 95)
- **Output Type:** `CandidateMatch`
  ```typescript
  {
    candidateName: string;
    matchScore: number;           // 0-100
    recommendation: "Strong Candidate" | "Moderate Match" | "Weak Match";
    strengths: string[];
    missingSkills: string[];
    recruiterSummary: string;
    interviewQuestions: string[];
  }
  ```

#### `POST /api/generate-outreach`
- **Input:** `{ candidateInfo: string, jobInfo: string }`
- **System Prompt:** `prompts/outreachAgent.ts` — Explicit anti-patterns enforced (never says "I hope this email finds you well", never uses "leverage", never says "I came across your profile")
- **Output Type:** `OutreachMessages`
  ```typescript
  {
    linkedinMessage: string;      // < 300 chars
    emailMessage: string;         // < 150 words
    followUpMessage: string;
  }
  ```

#### `POST /api/client-update`
- **Input:** `{ activityData: string }`
- **System Prompt:** `prompts/clientReporter.ts` — Structures pipeline as Contacted → Screened → Interviews Scheduled
- **Output Type:** `ClientUpdate`
  ```typescript
  {
    subjectLine: string;
    emailBody: string;
    nextSteps: string;
  }
  ```

### OpenAI Integration (`lib/openai.ts`)

A generic helper function `generateStructuredAI<T>()` powers all four agents:

- Initializes the OpenAI client from `OPENAI_API_KEY` environment variable
- Uses `response_format: { type: "json_object" }` to enforce valid JSON output
- Sends a two-message conversation: system prompt (from `prompts/`) + user message (from client input)
- Temperature set to `0.7` for balanced creativity
- Parses the response and casts it to the expected TypeScript interface
- Includes error handling with console logging and user-friendly error messages

### Input Validation

Every API route validates incoming request bodies:
- Checks for missing or empty fields before calling OpenAI
- Returns `400 Bad Request` with descriptive error messages for invalid input
- Returns `500 Internal Server Error` with safe messages on OpenAI failures

---

## 🖥️ Frontend Architecture

### Layout System

The app uses a fixed viewport layout with three zones:

```
┌─────────────┬────────────────────────────────────────┐
│             │           Header (sticky)              │
│   Sidebar   ├────────────────────────────────────────┤
│   (sticky,  │                                        │
│   w-64,     │       Main Content (scrollable)        │
│   shrink-0) │       via PageWrapper                  │
│             │       max-w-1200px, centered            │
│             │                                        │
└─────────────┴────────────────────────────────────────┘
```

- **`app/layout.tsx`** — Root layout with `h-full` + `overflow-hidden` body to lock the viewport
- **`components/layout/Sidebar.tsx`** — Fixed 256px sidebar with navigation, branding, and user avatar. Uses `shrink-0` to prevent flex compression
- **`components/layout/Header.tsx`** — Dynamic header that shows contextual breadcrumbs ("AI Agents" or "Process Strategy") based on route
- **`components/layout/PageWrapper.tsx`** — Framer Motion-wrapped scrollable content area with `fadeIn` entrance animation

### Reusable Agent Components

| Component | File | Description |
|---|---|---|
| `PromptInput` | `components/agents/PromptInput.tsx` | Textarea with character counter, "Use Example" prefill button, and "Clear" action |
| `ResultPanel` | `components/agents/ResultPanel.tsx` | Collapsible accordion panel with Framer Motion `AnimatePresence` animations and skeleton loading state |
| `LoadingState` | `components/agents/LoadingState.tsx` | Animated timeline pill progression (Analyzing → Sourcing → Matching → Generating → Complete) |
| `CandidateScore` | `components/agents/CandidateScore.tsx` | Animated SVG ring gauge with `useSpring` number animation, color-coded by score threshold (green ≥ 75, gold ≥ 50, red < 50) |
| `CopyButton` | `components/agents/CopyButton.tsx` | Clipboard copy with visual success feedback (icon swap + green border) |
| `ExportButton` | `components/agents/ExportButton.tsx` | Blob-based file download for exporting AI outputs as `.json` or `.txt` files |

### Dashboard Components

| Component | File | Description |
|---|---|---|
| `MetricCard` | `components/dashboard/MetricCard.tsx` | Stat card with Framer Motion `useSpring` animated number counters and trend indicators |
| `AgentCard` | `components/dashboard/AgentCard.tsx` | Agent summary card with live status indicator (pulsing green dot), stage pill, and hover-reveal "Open Agent" CTA |

### Page-Specific Implementations

- **Job Intelligence** — Single textarea input → structured output panels (Role Summary, Critical Skills as pills, Boolean Search in monospace code block with hover copy, Target Companies, Screening Questions)
- **Candidate Match** — Split-panel input (JD + Resume side-by-side) → animated score ring + recommendation badge + strengths/gaps lists + interview questions
- **Outreach** — Split-panel input (Candidate Context + Job Context) → tabbed output (LinkedIn InMail / Cold Email / Follow-up) with per-tab character counts
- **Client Update** — Single textarea input → formatted email preview with subject line header, body, and next steps section
- **Workflow Map** — Interactive left-rail stepper (4 stages) + right-panel before/after comparison with time savings and direct links to relevant agents. Includes aggregate "~5.5 hrs/role" time savings summary.

### Animations

Custom CSS keyframe animations defined in `globals.css`:
- `fadeInUp` — 0.4s ease-out entrance for result panels
- `pulsePill` — 2s infinite ease-in-out scale pulse for the active AI timeline pill

Framer Motion is used for:
- Page entrance transitions (`PageWrapper`)
- Accordion expand/collapse (`ResultPanel`)
- Spring-based number counters (`MetricCard`, `CandidateScore`)
- SVG stroke animation (`CandidateScore` ring gauge)

---

## 📁 Project Structure

```
RecruitFlow AI/
├── app/
│   ├── layout.tsx                 # Root layout (fonts, sidebar, header)
│   ├── page.tsx                   # Root redirect → /dashboard
│   ├── globals.css                # Design tokens, theme, animations
│   ├── icon.png                   # Favicon (auto-detected by Next.js)
│   ├── dashboard/
│   │   └── page.tsx               # Dashboard with metrics + agent cards
│   ├── agents/
│   │   ├── job-intelligence/
│   │   │   └── page.tsx           # Job Intelligence Agent UI
│   │   ├── candidate-match/
│   │   │   └── page.tsx           # Candidate Match Agent UI
│   │   ├── outreach/
│   │   │   └── page.tsx           # Outreach Agent UI
│   │   └── client-update/
│   │       └── page.tsx           # Client Update Agent UI
│   ├── workflow-map/
│   │   └── page.tsx               # Workflow Automation Map
│   └── api/
│       ├── analyze-role/
│       │   └── route.ts           # POST — Job Intelligence backend
│       ├── match-candidate/
│       │   └── route.ts           # POST — Candidate Match backend
│       ├── generate-outreach/
│       │   └── route.ts           # POST — Outreach backend
│       └── client-update/
│           └── route.ts           # POST — Client Update backend
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx            # Navigation sidebar
│   │   ├── Header.tsx             # Dynamic page header
│   │   └── PageWrapper.tsx        # Animated content wrapper
│   ├── dashboard/
│   │   ├── MetricCard.tsx         # Animated stat card
│   │   └── AgentCard.tsx          # Agent summary card
│   ├── agents/
│   │   ├── PromptInput.tsx        # Textarea input with helpers
│   │   ├── ResultPanel.tsx        # Collapsible result accordion
│   │   ├── LoadingState.tsx       # Timeline pill animation
│   │   ├── CandidateScore.tsx     # SVG score ring gauge
│   │   ├── CopyButton.tsx         # Clipboard copy button
│   │   └── ExportButton.tsx       # File download button
│   └── ui/
│       └── button.tsx             # shadcn/ui base button
├── lib/
│   ├── openai.ts                  # OpenAI client + generateStructuredAI<T>()
│   └── utils.ts                   # cn() utility (clsx + tailwind-merge)
├── prompts/
│   ├── roleAnalyzer.ts            # Job Intelligence system prompt
│   ├── candidateMatcher.ts        # Candidate Match system prompt
│   ├── outreachAgent.ts           # Outreach system prompt
│   └── clientReporter.ts          # Client Update system prompt
├── types/
│   └── recruitment.ts             # TypeScript interfaces for all AI outputs
├── public/
│   └── logo.png                   # Brand logo
└── .env                           # OPENAI_API_KEY (not committed)
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js v18+
- npm
- An OpenAI API key with access to `gpt-4o-mini`

### Environment Setup

Create a `.env` file in the project root:

```env
OPENAI_API_KEY=sk-your-key-here
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the app redirects to `/dashboard` automatically.

### Production Build

```bash
npm run build
npm start
```

---

## 📝 Notes

- All AI calls happen server-side via Next.js API routes — the OpenAI key never reaches the browser
- Each agent page includes a "Use Example" button with realistic pre-filled data for quick demos
- The Workflow Automation Map is a static strategic module (no AI calls) designed to showcase the business case for automation
- System prompts are tailored for the Australian recruitment market (references Telstra, Optus, Equinix, NextDC)
