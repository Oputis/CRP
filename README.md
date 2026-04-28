# CreditPro

CreditPro is a credit repair workflow automation platform for consultants and consumers.

The product direction is not “AI fixes credit.” It is structured workflow software:

- Intake facts
- Identify dispute targets
- Generate letters
- Track timelines
- Prepare escalation summaries
- Export packets later

## Sprint 1: Refactor Foundation

This repo contains a Next.js app shell with separated data, utilities, and tab components.

## Sprint 2: Backend Foundation

The app now includes server-side API routes for the next backend layer:

```txt
app/api/chat/route.js
app/api/generate-letter/route.js
app/api/cases/route.js
app/api/disputes/route.js
lib/anthropic.js
lib/env.js
lib/http.js
lib/memoryStore.js
```

### Environment setup

Copy `.env.example` into `.env.local`:

```bash
cp .env.example .env.local
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Then add your provider key:

```bash
ANTHROPIC_API_KEY=your_key_here
ANTHROPIC_MODEL=claude-3-5-sonnet-latest
```

Never expose provider keys to browser code.

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Current structure

```txt
app/
  api/
    cases/route.js
    chat/route.js
    disputes/route.js
    generate-letter/route.js
  layout.jsx
  page.jsx
  globals.css
components/
  AppShell.jsx
  HeaderTabs.jsx
  tabs/
    ChatTab.jsx
    QuickTab.jsx
    LettersTab.jsx
    TrackerTab.jsx
    TimelineTab.jsx
    CFPBTab.jsx
    SimulatorTab.jsx
data/
  bureaus.js
  disputeTypes.js
  escalationScenarios.js
  faq.js
  fieldLabels.js
  prompts.js
  scoreFactors.js
  templates.js
  timelineSteps.js
lib/
  anthropic.js
  env.js
  http.js
  memoryStore.js
utils/
  cfpbBuilder.js
  letterGenerator.js
  scoreSimulator.js
```

## Security note

Sprint 1 intentionally avoids collecting highly sensitive identity numbers in public frontend forms. Secure identity workflows should be added later behind authentication, encryption, database access controls, and audit logging.
