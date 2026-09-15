---
title: "SOC Investigation & Reporting Assistant"
description: "An analyst productivity and reporting platform designed for SOC Tier-1 and Tier-2 teams, transforming raw security observations into validated findings and ticket-ready reports."
date: "2026-09-10"
github: "https://github.com/Mabdelnaby1924/SOC-Investigation-and-Reporting-Assistant"
published: true
tags:
  - SOC Automation
  - Incident Response
  - Threat Investigation
  - Next.js
  - TypeScript
  - SQLite
stack:
  - Next.js 16
  - React 19
  - TypeScript
  - Tailwind CSS v4
  - SQLite
  - Zod
---

# SOC Investigation & Reporting Assistant

An analyst productivity and reporting platform designed for Security Operations Center (SOC) teams, particularly Tier-1 and Tier-2 analysts. Built around a structured, behavior-first investigation methodology, the assistant transforms raw security observations into validated findings, AI-augmented analytical assessments, and professional ticket-ready reports.

---

## Key Features

- **One-Page Investigation Worksheet**: Digitize and accelerate investigations across all 11 canonical stages:
  1. **Alert** (Detection, Source, Initial Trigger, Initial Time)
  2. **Entity** (User, Host, Source IP, Destination, Process, Hash, Domain/URL)
  3. **Observed Behavior** (Behavior-first description without premature conclusions)
  4. **Timeline** (Chronological event sequencing with sources)
  5. **Relationship** (WHO, WHAT, WHEN, WHERE, and related events)
  6. **Context** (Baseline vs. anomalous behavior, user & host context)
  7. **Hypotheses** (Status tracking: Unverified, Supported, Weakly Supported, Disproved)
  8. **Evidence** (Traceable question → evidence → finding → source matrix)
  9. **Scope** (Multi-pivot blast radius: same user, host, IP, hash, command)
  10. **Verdict** (Defensible classification, confidence level, and impact assessment)
  11. **Action** (Response actions, isolation, containment, and task ownership)
- **⚡ Pre-Populated Demo Case**: One-click demo investigation (Brute-Force logon followed by Encoded PowerShell execution and C2 callback on WS-10) for instant evaluation.
- **Deterministic Validation Engine**: Real-time analysis for missing required data, weak investigation coverage, contradictions, unsupported verdicts, and action consistency.
- **Data Normalization & Correlation**: Automated normalization of process names, event IDs, IPv4/IPv6 addresses, defanged URLs, and cryptographic hashes, combined with a multi-dimensional correlation engine.
- **Traceable Findings**: Transparent reasoning layer linking correlation patterns directly to concrete evidence items and timeline entries.
- **Grounded AI Architecture with Zero-Key Fallback**: Fully functional out of the box with zero external dependencies via the deterministic template fallback provider. Optional OpenAI-compatible provider for enhanced analysis.
- **Multi-Format Reporting & Export**:
  - Full executive & technical report mode
  - Compact ticket-ready mode for ITSM/ticketing systems (Jira, ServiceNow)
  - Interactive inline report editing (analyst edits remain authoritative)
  - One-click Copy to Clipboard, Markdown export (.md), and PDF generation (.pdf)
- **Full Lifecycle Case Persistence**: Built-in SQLite database storing every stage of the case lifecycle (Draft → Completed → Analyzed → Generated → Reviewed → Finalized) with full-text search and filtering.

---

## Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) + React 19 + TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 (SOC console dark theme)
- **Validation**: [Zod](https://zod.dev/) runtime schema validation
- **Database**: SQLite via [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) (zero external database server required)
- **Export**: Client-side Markdown generation and PDF compilation via `html2pdf.js`
- **Testing**: Native Node 24 test runner via `tsx`

---

## Architecture Overview

```text
Investigation UI (All 11 Worksheet Sections)
      ↓
Structured Case (Zod Schema Validation)
      ↓
Deterministic Validation Engine
      ↓
Normalization Layer (Processes, IPs, Hashes, Domains)
      ↓
Correlation Engine (WHO / WHAT / WHEN / WHERE / Context)
      ↓
Traceable Findings Matrix
      ↓
AI Reasoning Layer (OpenAI-compatible OR Zero-Key Fallback)
      ↓
Report Generator (Full Report & Ticket Update Modes)
      ↓
Analyst Review & Inline Editing (Authoritative)
      ↓
Export (Clipboard / Markdown / PDF) & Case History DB
```

### Separation of Concerns & Grounding

The assistant adheres strictly to defensive AI principles:

- **Analyst as Source of Truth**: The analyst's entered evidence and finalized verdicts are authoritative. AI cannot alter verified facts or invent nonexistent indicators.
- **Air-Gapped / Offline Ready**: The system operates at 100% capacity using the deterministic fallback engine if no external AI API key is configured.
- **Data Privacy**: All AI calls are executed server-side; API secrets are never transmitted to or accessible by client browsers.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20.x or v24.x
- `npm` v10+

### Installation

1. Clone the repository and navigate to the project directory:

   ```bash
   git clone https://github.com/Mabdelnaby1924/SOC-Investigation-and-Reporting-Assistant.git
   cd SOC-Investigation-and-Reporting-Assistant
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Environment Configuration

Copy the example environment file or configure `.env`:

```bash
# SQLite database storage path (defaults to ./data/soc.db)
DATABASE_PATH=./data/soc.db

# Optional AI Configuration (leave empty to use deterministic No-AI fallback)
AI_PROVIDER=fallback       # 'fallback' or 'openai'
OPENAI_API_KEY=            # Required only if AI_PROVIDER=openai
OPENAI_MODEL=gpt-4o-mini   # Optional (defaults to gpt-4o-mini)
OPENAI_BASE_URL=           # Optional custom endpoint (e.g., Azure OpenAI or local Ollama)
```

### Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The application will redirect directly to `/investigation`.

### Testing

Run the automated test suite covering validation, normalization, correlation, findings, fallback report generation, and database CRUD:

```bash
npm test
```

### Production Build

Verify strict TypeScript compilation and produce the optimized bundle:

```bash
npm run build
npm start
```

---

## Project Structure

```text
├── docs/
│   ├── PROJECT_SPEC.md                   # Complete architectural and functional specification
│   ├── One-Page Investigation Worksheet.md # Canonical 11-section investigation model
│   ├── implementation_plan.md            # Detailed technical roadmap
│   └── task.md                           # Progress and task tracking
├── tests/
│   └── test-pipeline.ts                  # Automated test suite
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Dark SOC-console shell and global navigation
│   │   ├── page.tsx                      # Root route redirect → /investigation
│   │   ├── investigation/page.tsx        # Page 1: One-Page Investigation Worksheet
│   │   ├── report/page.tsx               # Page 2: Report Viewer, Editor, & Export
│   │   ├── history/page.tsx              # Page 3: Historical Case Search & Filter
│   │   └── api/
│   │       ├── cases/route.ts            # Case CRUD (List, Create)
│   │       ├── cases/[id]/route.ts       # Case CRUD (Get, Update)
│   │       └── analyze/route.ts          # Analytical pipeline (Server-side)
│   ├── components/
│   │   ├── investigation/                # All 11 worksheet UI section cards
│   │   │   ├── AlertSection.tsx
│   │   │   ├── EntitySection.tsx
│   │   │   ├── BehaviorSection.tsx
│   │   │   ├── TimelineEditor.tsx
│   │   │   ├── RelationshipSection.tsx
│   │   │   ├── ContextSection.tsx
│   │   │   ├── HypothesisEditor.tsx
│   │   │   ├── EvidenceEditor.tsx
│   │   │   ├── ScopeSection.tsx
│   │   │   ├── VerdictSection.tsx
│   │   │   └── ActionSection.tsx
│   │   ├── validation/
│   │   │   └── ValidationPanel.tsx       # Real-time validation error/warning badges
│   │   └── ui/
│   │       └── SectionCard.tsx           # Collapsible dark console container
│   ├── lib/
│   │   ├── db.ts                         # SQLite persistence & lifecycle operations
│   │   ├── demo-case.ts                  # Canonical brute-force & PowerShell demo case
│   │   ├── validation/engine.ts          # Deterministic investigation validation rules
│   │   ├── normalization/normalizer.ts   # Process, IP, hash, domain normalizer
│   │   ├── correlation/engine.ts         # Multi-pivot correlation engine
│   │   ├── analysis/findings.ts          # Traceable findings constructor
│   │   ├── ai/
│   │   │   ├── provider.ts               # AI provider interface
│   │   │   ├── fallback-provider.ts      # Deterministic zero-key fallback provider
│   │   │   └── openai-provider.ts        # Structured OpenAI-compatible provider
│   │   └── export/
│   │       ├── markdown.ts               # Clean Markdown report formatter
│   │       └── pdf.ts                    # Client-side PDF export generator
│   ├── prompts/
│   │   ├── analysis.ts                   # Strict AI analysis prompt
│   │   ├── report.ts                     # AI report formatting prompt
│   │   └── next-checks.ts                # "What Should I Investigate Next?" prompt
│   ├── schemas/
│   │   └── case-schema.ts                # Zod runtime data validation schemas
│   └── types/
│       └── case.ts                       # TypeScript interfaces for the full lifecycle
```

---

## Future Extension Points

1. **Direct SIEM / EDR Ingestion**: Webhook listeners to populate worksheet sections directly from Microsoft Defender, CrowdStrike Falcon, or Splunk alerts.
2. **PostgreSQL Migration**: The `better-sqlite3` schema mirrors PostgreSQL table definitions and JSON columns, allowing easy migration for multi-analyst enterprise deployments.
3. **MITRE ATT&CK Auto-Mapping**: Enhanced correlation mapping observed behaviors and command lines to technique IDs (e.g., T1059.001 PowerShell, T1110 Brute Force).
4. **Automated SOAR Action Triggers**: Webhook integration from the Action section directly into Cortex XSOAR, Tines, or Torq to trigger host isolation or credential reset.
