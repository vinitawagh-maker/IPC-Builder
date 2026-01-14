# IPC-Builder (WBS Terminal v2.0)

**A modern Vite-powered web application for generating Work Breakdown Structures (WBS) for engineering infrastructure projects.**



---

## Overview

IPC-Builder provides a terminal-themed interface for project planning, budgeting, and schedule management with AI-powered features. It's designed specifically for infrastructure projects including highways, bridges, drainage systems, and transit facilities.

---

## Features

### 7-Step Wizard Interface

| Step | Name | Description |
|------|------|-------------|
| 1 | **PHASES** | Define project phases (e.g., Base, ESDC, TSCD, As-Builts) with quick-add tags and project templates |
| 2 | **DISCIPLINES** | Select from 18+ engineering disciplines with custom discipline support |
| 3 | **PACKAGES** | Define deliverable milestones (Preliminary, Interim, Final, RFC, As-Built) |
| 4 | **BUDGET** | Set total budget per discipline with integrated cost estimator |
| 5 | **CLAIMING** | Set claiming % per package with preset distribution schemes |
| 6 | **SCHEDULE** | Set start/end dates with AI-powered schedule generation |
| 7 | **PROJECT** | Enter project details, key dates, and organizational info for the Design Fee Book |

### Project Templates

Pre-configured templates for quick project setup:
- Highway Reconstruction
- Bridge Replacement
- Drainage Improvement
- Intersection Improvement
- Multi-Discipline Infrastructure
- Transit/Rail Station

### Cost Estimator

- Calculate budgets based on Total Construction Cost and Design Fee %
- Project types: Bridge, Highway/Roadway, Drainage/Utilities
- Industry-standard distribution percentages
- Real-time variance indicators (↑ above range, ↓ below range, • within range)
- Complexity override per discipline

### MH Benchmark Estimator

Estimates man-hours based on historical project data:
- 17 discipline categories with account codes
- Historical benchmarks from 10+ major infrastructure projects
- Quantity-based estimation (LF, AC, SF, EA, etc.)
- Configurable hourly rate (default $150/hr)

### Claiming Scheme Presets

- **Linear/Even** - Equal distribution
- **Front-Loaded** - Higher claiming early (30%, 25%, 20%, 15%, 10%)
- **Back-Loaded** - Higher claiming late (10%, 15%, 20%, 25%, 30%)
- **Bell Curve** - Peak in middle packages (15%, 25%, 30%, 20%, 10%)

### AI-Powered Features

*Requires OpenAI API key*

| Feature | Model | Description |
|---------|-------|-------------|
| **AI Chat Assistant** | GPT-5.2-chat-latest | Natural language WBS editing via draggable chat panel |
| **AI Schedule Generation** | GPT-5.2 | Optimized schedules considering discipline dependencies |
| **AI Insights Panel** | GPT-5.2 | Risk scoring, cost/schedule forecasting, budget health analysis |
| **RFP Wizard** | GPT-5.2 | PDF import with AI extraction of quantities, commercial terms, and project scope |

### Visualization

- **Gantt Chart** - Discipline/package timelines with collapsible rows
- **Performance Charts** - Line/bar charts, cumulative/monthly views, phase/discipline filters

### WBS Inline Editing

- Edit budgets, claiming %, schedule dates directly on results page
- Add/remove disciplines, packages, phases
- Recalculate from industry standards

### Export & Sharing

- **Design Fee Book** - Professional 7-chapter PDF report (black/white, print-ready) per KEG standards:
  - **Chapter 1.0 - Project Overview**: Project info, key dates, evaluation criteria, DBE/SBE goals
  - **Chapter 2.0 - Commercial Status**: Owner commercial terms, liability, insurance, indemnification
  - **Chapter 3.0 - Team Organization and Scope**: Design scope of work, project organization
  - **Chapter 4.0 - Schedule**: Summary schedule, package fragnet, performance charts
  - **Chapter 5.0 - Design Fee Estimate**: MH benchmarking, WBS breakdown, cost curves
  - **Chapter 6.0 - Resource Evaluation**: Design FTEs by discipline (placeholder)
  - **Chapter 7.0 - Risk Review**: Design risk register sorted by severity
  - **Appendix A**: AI Insights and recommendations
  - **Appendix B**: Complete WBS Table
- Import from CSV
- Shareable URL generation

### Persistence & Multi-Project Management

- Auto-save to localStorage
- Recovery modal for unsaved work
- Save, load, duplicate, delete, and compare projects

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Build Tool** | Vite 5.x with HMR |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (ES Modules) |
| **CSS Processing** | PostCSS, Autoprefixer, cssnano |
| **Charts** | Chart.js 4.x (npm) |
| **PDF Parsing** | PDF.js 3.11.174 (npm + CDN worker) |
| **PDF Export** | html2pdf.js (npm) |
| **AI Integration** | OpenAI API (user-provided key) |
| **CI/CD** | GitHub Actions |
| **Hosting** | GitHub Pages |

---

## Project Structure

```
IPC-Builder/
├── index.html                    # Main HTML entry point
├── package.json                  # Dependencies and scripts
├── vite.config.js                # Vite configuration
├── postcss.config.js             # PostCSS configuration
├── .eslintrc.json                # ESLint configuration
├── .prettierrc.json              # Prettier configuration
├── CLAUDE.md                     # AI assistant context
├── README.md                     # This file
│
├── src/
│   ├── main.js                   # Application entry point
│   ├── App.js                    # Main app controller
│   ├── core/                     # Core modules
│   │   ├── constants.js          # Application constants
│   │   └── state.js              # Global state management
│   ├── utils/                    # Utility functions
│   │   ├── format.js             # Formatting helpers
│   │   └── dom.js                # DOM manipulation
│   ├── services/                 # External services
│   │   ├── api/openai.js         # OpenAI integration
│   │   ├── storage/localStorage.js
│   │   └── export/               # CSV, URL exports
│   ├── legacy/
│   │   └── app-legacy.js         # Legacy code (being modularized)
│   └── styles/                   # Modular CSS architecture
│       ├── main.css              # CSS entry point
│       ├── base/                 # Variables, reset, typography
│       ├── components/           # Buttons, cards, modals, tables
│       ├── features/             # Calculator, chat, gantt, etc.
│       └── layout/               # Terminal, progress, responsive
│
├── public/
│   └── data/
│       └── benchmarking/         # Historical project data (14 JSON files)
│
├── docs/
│   ├── README.md                 # Documentation index
│   ├── CODE_REVIEW_ANALYSIS.md   # Code quality review
│   ├── REORGANIZATION_PLAN.md    # Architecture improvement plan
│   ├── VITE_MIGRATION_PLAN.md    # Vite migration documentation
│   └── reference/                # Backup/historical files
│
├── .github/
│   └── workflows/
│       ├── ci.yml                # Continuous integration
│       └── deploy.yml            # GitHub Pages deployment
│
└── dist/                         # Production build output
```

---

## Getting Started

### Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **npm 9+** (included with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/mjamiv/IPC-Builder.git
cd IPC-Builder

# Install dependencies
npm install
```

### Development

```bash
# Start dev server with hot reload
npm run dev
# → Opens http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### All Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Create production build in `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run build:analyze` | Build with bundle size analysis |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues automatically |
| `npm run format` | Format code with Prettier |

---

## Design System

Terminal/console dark theme with gold accents:

| Element | Color |
|---------|-------|
| Background | `#0a0a0a` |
| Terminal | `#0d0d0d` |
| Cards | `#1a1a1a` |
| Primary/Accent | `#ffd700` (gold) |
| Success | `#00ff00` |
| Error | `#ff4444` |

**Font:** JetBrains Mono (monospace)

---

## Benchmarking Data

The `public/data/benchmarking/` folder contains historical project data for man-hour estimation across 14 disciplines:

- Bridges, Drainage, Roadway, Track
- Traffic, Utilities, Geotechnical
- Retaining Walls, Misc Structures
- MOT, Systems, ESDC, TSDC

Each file includes production rates (MH per unit) from real infrastructure projects.

---

## CI/CD Pipeline

The project uses GitHub Actions for automated workflows:

### Continuous Integration (`ci.yml`)
- Runs on every push and pull request
- Lints code with ESLint
- Builds production bundle
- Validates build success

### Deployment (`deploy.yml`)
- Triggers on push to `main` branch
- Builds production bundle
- Deploys to GitHub Pages

---

## Documentation

| File | Description |
|------|-------------|
| `CLAUDE.md` | Comprehensive AI assistant context and developer guide |
| `docs/CODE_REVIEW_ANALYSIS.md` | Code quality audit with improvement recommendations |
| `docs/REORGANIZATION_PLAN.md` | Modularization roadmap |
| `docs/VITE_MIGRATION_PLAN.md` | Vite migration documentation |
| `docs/reference/` | Historical/backup files |

---

## Browser Compatibility

Modern browsers (Chrome, Firefox, Safari, Edge) with ES6+ support.

---

## Known Limitations

- Client-side only (no server persistence)
- Single-user (no real-time collaboration)
- OpenAI API key stored in localStorage
- No undo/redo functionality

---

## License

MIT

---

## Contributing

Contributions welcome! Please see `CLAUDE.md` for development guidelines and `docs/CODE_REVIEW_ANALYSIS.md` for known issues.
