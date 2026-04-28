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

This repo now contains a Next.js app shell with separated data, utilities, and tab components.

### Structure

```txt
app/
  api/chat/route.js
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
utils/
  cfpbBuilder.js
  letterGenerator.js
  scoreSimulator.js
```

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Sprint 2 target

Move the placeholder `/api/chat` route to a real Anthropic backend proxy using `.env.local`.

Required environment variable later:

```bash
ANTHROPIC_API_KEY=your_key_here
```

Never expose provider keys to browser code.

## Security note

Sprint 1 intentionally avoids collecting highly sensitive identity numbers in public frontend forms. Secure identity workflows should be added later behind authentication, encryption, database access controls, and audit logging.
