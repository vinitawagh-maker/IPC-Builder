# IPC-Builder (WBS Terminal v1.0)

**A zero-build, single-page web application for generating Work Breakdown Structures (WBS) for engineering infrastructure projects.**

🌐 **Live App:** https://mjamiv.github.io/IPC-Builder/

---

## Overview

IPC-Builder provides a terminal-themed interface for project planning, budgeting, and schedule management with AI-powered features. It's designed specifically for infrastructure projects including highways, bridges, drainage systems, and transit facilities.

---

## Features

### 6-Step Wizard Interface

| Step | Name | Description |
|------|------|-------------|
| 1 | **PHASES** | Define project phases (e.g., Base, ESDC, TSCD, As-Builts) with quick-add tags and project templates |
| 2 | **DISCIPLINES** | Select from 18+ engineering disciplines with custom discipline support |
| 3 | **PACKAGES** | Define deliverable milestones (Preliminary, Interim, Final, RFC, As-Built) |
| 4 | **BUDGET** | Set total budget per discipline with integrated cost estimator |
| 5 | **CLAIMING** | Set claiming % per package with preset distribution schemes |
| 6 | **SCHEDULE** | Set start/end dates with AI-powered schedule generation |

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

| Feature | Description |
|---------|-------------|
| **AI Chat Assistant** | Natural language WBS editing via draggable chat panel |
| **AI Schedule Generation** | Optimized schedules considering discipline dependencies |
| **AI Insights Panel** | Risk scoring, cost/schedule forecasting, budget health analysis |
| **RFP Wizard** | PDF import with AI extraction of quantities and project scope |

### Visualization

- **Gantt Chart** - Discipline/package timelines with collapsible rows
- **Performance Charts** - Line/bar charts, cumulative/monthly views, phase/discipline filters

### WBS Inline Editing

- Edit budgets, claiming %, schedule dates directly on results page
- Add/remove disciplines, packages, phases
- Recalculate from industry standards

### Export & Sharing

- CSV Export (WBS table or full project data)
- PDF Report with charts
- Import from CSV
- Shareable URL generation

### Persistence & Multi-Project Management

- Auto-save to localStorage
- Recovery modal for unsaved work
- Save, load, duplicate, delete, and compare projects

---

## Tech Stack

- **HTML5** - Single-file application
- **CSS3** - Modular architecture with CSS variables
- **Vanilla JavaScript** - No frameworks required
- **Chart.js** - Data visualization
- **PDF.js** - PDF parsing for RFP import
- **html2pdf.js** - PDF export
- **OpenAI API** - AI features (user-provided key)

---

## Project Structure

```
IPC-Builder/
├── index.html                    # Main application
├── css/                          # Modular CSS architecture
│   ├── main.css                  # Entry point
│   ├── base/                     # Foundation (variables, reset, typography)
│   ├── components/               # Reusable UI (buttons, cards, modals, tables)
│   ├── features/                 # Feature styles (calculator, chat, gantt, etc.)
│   └── layout/                   # Page layout (terminal, progress, responsive)
├── benchmarking/                 # Historical project data (14 JSON files)
├── CLAUDE.md                     # Developer documentation
├── CODE_REVIEW_ANALYSIS.md       # Code quality review
└── REORGANIZATION_PLAN.md        # Architecture improvement plan
```

---

## Getting Started

### Option 1: Use the Live App
Visit https://mjamiv.github.io/IPC-Builder/

### Option 2: Run Locally

No build step required:

```bash
# Clone the repository
git clone https://github.com/mjamiv/IPC-Builder.git
cd IPC-Builder

# Open directly in browser
open index.html

# Or serve via local server
python3 -m http.server 8000
# Navigate to http://localhost:8000
```

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

Font: JetBrains Mono (monospace)

---

## Benchmarking Data

The `benchmarking/` folder contains historical project data for man-hour estimation across 14 disciplines:

- Bridges, Drainage, Roadway, Track
- Traffic, Utilities, Geotechnical
- Retaining Walls, Misc Structures
- MOT, Systems, ESDC, TSDC

Each file includes production rates (MH per unit) from real infrastructure projects.

---

## Documentation

| File | Description |
|------|-------------|
| `CLAUDE.md` | Comprehensive developer guide (~630 lines) |
| `CODE_REVIEW_ANALYSIS.md` | Code quality audit with improvement recommendations |
| `REORGANIZATION_PLAN.md` | Modularization roadmap |

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

Contributions welcome! Please see `CLAUDE.md` for development guidelines and `CODE_REVIEW_ANALYSIS.md` for known issues.
