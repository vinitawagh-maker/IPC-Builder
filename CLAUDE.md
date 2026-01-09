# CLAUDE.md - IPC Builder

This file provides guidance to Claude Code when working with the IPC Builder (WBS Terminal) codebase.

## Project Overview

**WBS Terminal v1.0** is a zero-build, single-page web application for generating Work Breakdown Structures (WBS) for engineering projects. It provides a terminal-themed interface for project planning, budgeting, and schedule management with AI-powered features.

**Location:** `/Volumes/mjamiv_2/claude-code/ipc-builder/`
**GitHub:** https://github.com/mjamiv/IPC-Builder
**Live URL:** https://mjamiv.github.io/IPC-Builder/

## Tech Stack

- **HTML5** - Single-file application (~14,000+ lines)
- **CSS3** - Terminal/console theme with dark background and gold accents
- **Vanilla JavaScript** - No frameworks
- **Chart.js** (via CDN) - Data visualization
- **PDF.js** (via CDN) - PDF parsing for RFP import
- **html2pdf.js** (via CDN) - PDF export functionality
- **Google Fonts** - JetBrains Mono (monospace)
- **OpenAI API** - AI chat assistant and analytics (requires user API key)

## Running the Application

```bash
# No build step required
open index.html
```

Or serve via local server:
```bash
python3 -m http.server 8000
# Navigate to http://localhost:8000
```

Or access the live deployment at: https://mjamiv.github.io/IPC-Builder/

## Application Architecture

### Single-File Structure
All code is contained in `index.html`:
- Lines 1-2100: CSS styles (including modals, chat, Gantt, insights panels)
- Lines 2100-3800: HTML markup (terminal UI, forms, tables, modals)
- Lines 3800-14300+: JavaScript application logic

### Data Model

```javascript
projectData = {
    phases: [],        // Project phases (e.g., "Base", "ESDC", "TSCD")
    disciplines: [],   // Engineering disciplines (e.g., "Structures", "Civil")
    packages: [],      // Deliverable milestones (e.g., "Preliminary", "Interim", "Final", "RFC")
    budgets: {},       // { discipline: totalBudget }
    claiming: {},      // { "discipline-package": claimPercentage }
    dates: {},         // { "discipline-package": { start, end } }
    calculator: {      // Cost estimator data
        totalConstructionCost: 0,
        designFeePercent: 15,
        projectType: 'Highway/Roadway',
        totalDesignFee: 0,
        complexityOverrides: {},  // Manual complexity settings per discipline
        isCalculated: false,
        manualEdits: {}          // Track which budgets were manually edited
    },
    // RFP-extracted data
    projectScope: '',           // Project scope description from RFP
    scheduleNotes: '',          // Schedule notes from RFP analysis
    disciplineScopes: {}        // Per-discipline scope descriptions
}
```

## Key Features

### 6-Step Wizard Interface
1. **PHASES** - Define project phases (comma-separated) with template selector
2. **DISCIPLINES** - Select engineering disciplines (grid selection)
3. **PACKAGES** - Define deliverable packages/milestones
4. **BUDGET** - Set total budget per discipline (with cost estimator)
5. **CLAIMING** - Set claiming % per package (with scheme presets)
6. **SCHEDULE** - Set start/end dates (with AI schedule generation)

### Project Templates
Pre-configured project templates for quick setup:
- **Highway Reconstruction** - Highway widening/improvement projects
- **Bridge Replacement** - Bridge design/rehabilitation
- **Drainage Improvement** - Stormwater management projects
- **Intersection Improvement** - Traffic signal/safety improvements
- **Multi-Discipline Infrastructure** - Large-scale projects
- **Transit/Rail Station** - Transit infrastructure

Templates include: phases, disciplines, packages, construction cost, design fee %, and claiming scheme.

### Persistence System
Auto-save functionality with localStorage:
- **Debounced autosave** - Saves 1 second after last change
- **Recovery modal** - Prompts to restore unsaved work on page load
- **Form state persistence** - Preserves input values across sessions
- **Version compatibility** - Storage version checking

### Multi-Project Manager
Save and manage multiple projects:
- **Save named projects** - Save current project with custom name
- **Load projects** - Restore previously saved projects
- **Duplicate projects** - Create copies of existing projects
- **Delete projects** - Remove unwanted projects
- **Compare view** - Side-by-side project comparison

### Cost Estimator (Step 4: Budget)

**Purpose:** Calculate discipline budgets based on industry standards with real-time variance indicators.

**Calculator Inputs:**
- Total Construction Cost ($)
- Design Fee (% of Construction)
- Project Type (Bridge, Highway/Roadway, Drainage/Utilities)
- Project Complexity (Low, Medium, High - reference only)

**Industry Comparison Indicators:**
- **↑** (red) - Above industry range (tooltip shows variance %)
- **↓** (green) - Below industry range (tooltip shows variance %)
- **•** (gold) - Within industry range

### MH Benchmark Cost Estimator

**Purpose:** Estimate man-hours for design disciplines based on historical project data.

**Features:**
- 17 discipline categories with account codes
- Historical benchmark data loaded from external JSON files (`benchmarking/` folder)
- **Statistical estimation using avg ± std_dev formula**
- Multiple calculation types: matrix, benchmark, percentage
- Quantity-based estimation (LF, AC, SF, EA, etc.)
- Project selection for custom rate calculation
- Export to budget table with configurable hourly rate
- MH range tooltips showing confidence bounds

**Benchmarking Data Files:**
Located in `benchmarking/` folder:
- `benchmarking-bridges.json` - Bridge deck area (SF)
- `benchmarking-drainage.json` - Project area (AC)
- `benchmarking-roadway.json` - Alignment length (LF)
- `benchmarking-traffic.json` - Alignment length (LF)
- `benchmarking-utilities.json` - Relocation count (EA)
- `benchmarking-retainingwalls.json` - Wall area (SF)
- `benchmarking-geotechnical.json` - Structure count (EA)
- `benchmarking-mot.json` - Alignment length (LF)
- `benchmarking-miscstructures.json` - Based on RDWY+DRN+TRF MH
- `benchmarking-systems.json` - Track alignment (TF)
- `benchmarking-track.json` - Track alignment (TF)
- `benchmarking-esdc.json` - Project cost percentage (K$)
- `benchmarking-tsdc.json` - Project cost percentage (K$)
- `benchmarking-template.json` - Empty template for new disciplines

**JSON Structure:**
```json
{
  "discipline": "Discipline Name",
  "eqty_metric": { "name": "Quantity Description", "uom": "Unit" },
  "projects": [
    {
      "project": "Project Name",
      "fct_mhrs": 12345,
      "eqty": 100,
      "uom": "UOM",
      "production_mhrs_per_ea": 123.45
    }
  ]
}
```

**Statistical Calculation:**
- Mean rate = average of all project production rates
- Std Dev = standard deviation of production rates
- Lower bound = quantity × (mean - std_dev)
- Upper bound = quantity × (mean + std_dev)
- Estimate = quantity × mean

**Disciplines Covered:**
- Digital Delivery, Drainage, Environmental, MOT
- Roadway, Traffic, Utilities, Retaining Walls
- Noise Walls, Bridges (PC Girder, Steel, Rehab)
- Misc Structures, Geotechnical, Systems, Track
- ESDC, TSCD

### Claiming Scheme Presets (Step 5)
Distribution pattern presets:
- **Linear/Even** - Equal distribution across packages
- **Front-Loaded** - Higher claiming early (descending)
- **Back-Loaded** - Higher claiming late (ascending)
- **Bell Curve** - Peak in middle packages
- Preview before applying

### AI Schedule Generation (Step 6)
Uses OpenAI API to generate optimized schedules:
- Configure project start date
- Set project duration
- AI considers discipline dependencies and industry standards
- One-click application to schedule table

### AI Chat Assistant
Floating chat interface with natural language editing:
- **Context-aware** - Knows current step and project data
- **Tool calling** - Can modify budgets, add/remove disciplines, adjust schedules
- **Draggable panel** - Position persists across sessions
- **API key management** - Secure local storage

**Available Tools:**
- `adjustBudget` - Modify discipline budgets
- `addDiscipline` - Add new disciplines to project
- `removeDiscipline` - Remove disciplines from project
- `modifySchedule` - Change schedule dates
- `whatIf` - Run scenario analysis
- `getProjectSummary` - Generate project overview

### AI Insights Panel
Predictive analytics on results page:
- **Risk Score** - Calculated from disciplines, budget concentration, schedule density
- **Cost Forecast** - Projection with contingency
- **Schedule Forecast** - Estimated completion with buffer
- **Budget Health** - Analysis of budget distribution
- **AI Suggestions** - Generated recommendations (requires API key)

### RFP Wizard
Import project data from RFP documents:
- **PDF Import** - Drag & drop or file selection
- **Page Range Selection** - Process specific pages
- **Text Preview** - Review extracted content
- **AI Analysis** - Extract quantities and project info using GPT-5.2
- **Chunked Processing** - Handles large documents efficiently
- **Quantity Extraction** - Roadway length, bridge area, utilities, etc.
- **AI Reasoning Commentary** - Each quantity includes AI explanation of how it was derived
- **Construction Cost Reasoning** - AI explains cost estimation methodology
- **Schedule Reasoning** - AI explains design duration estimates
- **Apply to Estimator** - Transfer quantities to MH estimator AND Budget Calculator
- **Usage Statistics** - Track API token usage and cost

### Gantt Chart
Visual timeline view of project schedule:
- Discipline-level collapsible rows
- Package-level detail bars
- Current date marker
- Hover tooltips with dates and budget
- Expand/collapse all controls

### WBS Inline Editing
Direct editing on the results page:
- Edit discipline budgets inline
- Modify claiming percentages
- Update schedule dates
- Add/remove disciplines, packages, phases
- Recalculate budgets from industry standards
- Clear WBS and start over

### Export Options
Multiple export formats from Reports panel:
- **CSV Export** - WBS structure table
- **Full Data CSV** - Complete project data including calculator settings
- **PDF Report** - Professional project summary with charts
- **Import CSV** - Restore project from exported data
- **Share URL** - Generate shareable project link
- **RFP Data Export** - Export extracted RFP quantities

### Data Visualization
- **Chart Types:** Line or bar charts (including stacked)
- **Views:** Cumulative or monthly
- **Filters:** By phase, discipline
- **Data:** BCWS (Planned) vs ACWP (Actual - TBD)
- **Discipline colors** - 18-color palette for visibility

## Recent Changes

### Latest: External Benchmarking Data & Statistical Estimation (January 2026)
- **Refactored benchmarking data to external JSON files** in `benchmarking/` folder
- 14 discipline-specific JSON files with historical project data
- **Statistical estimation using avg ± std_dev formula**:
  - Mean and standard deviation calculated from applicable projects
  - MH estimates include confidence range (lower/upper bounds)
  - Tooltips show statistical range on MH values
- Dynamic loading of benchmark data at application startup
- Backward compatible with static fallback data
- New `BenchmarkStats` utility for statistical calculations
- Enhanced UI showing estimation ranges in status bar

### Previous: MH Benchmark Cost Estimator (January 2026)
- Added comprehensive man-hour estimation system
- Historical benchmark data from 10+ major infrastructure projects
- 17 discipline categories with quantity-based calculation
- Project-specific rate customization
- Integration with budget table

### Previous: AI Features & RFP Import
- AI Chat Assistant with natural language WBS editing
- AI-powered schedule generation
- AI Insights panel with predictive analytics
- RFP Wizard for PDF document import and analysis

### Previous: Persistence & Templates
- Auto-save to localStorage with recovery
- Multi-project manager
- 6 project templates
- Claiming scheme presets

### Previous: Cost Estimator Feature
- Collapsible calculator with 4 inputs
- 3 project types with auto-complexity mapping
- Industry-standard distribution percentages
- Real-time budget calculation with normalization
- Industry comparison indicators

## Default Values

### Default Phases
- **Input default:** `"Base,"` - Minimal default, user expected to customize
- **Quick-add tags:** Base, ESDC, TSCD, As-Builts, Closeout

### Default Packages
- **Input default:** `"Preliminary, Interim, Final, RFC, As-Buit"` (Note: "As-Buit" has a typo)
- **Quick-add tags:** Preliminary, Interim, Final, RFC, As-Built

### Pre-selected Disciplines
Only 2 disciplines are pre-selected by default:
- Structures
- Design Management

### Claiming Scheme Presets
- **Linear:** Equal distribution
- **Front-Loaded:** `[30, 25, 20, 15, 10]` descending
- **Back-Loaded:** `[10, 15, 20, 25, 30]` ascending
- **Bell Curve:** `[15, 25, 30, 20, 10]` center-weighted

### MH Estimator Configuration
- **Historical Projects:** IH 820, BC Highway 1/5, Federal Way Link Extension, Foothill LRT, I-15/I-17, Ottawa LRT, US 97, 264th Street, 30 Crossing, and more
- **Default hourly rate:** $150/hr for budget conversion
- **Complexity levels:** Low, Medium, High

## Color Palette

Terminal/console theme with gold accents:
- **Background:** `#0a0a0a` (body), `#0d0d0d` (terminal), `#1a1a1a` (cards)
- **Primary accent:** `#ffd700` (gold)
- **Text:** `#ffd700` (gold), `#fff` (white), `#888` (gray)
- **Borders:** `#333`, `#444`
- **Status indicators:** `#00ff00` (ok/low risk), `#ff4444` (error/high risk)
- **Risk colors:** Green (low), Gold (medium), Red (high)

## Key Functions

### Navigation
- `goToStep(step)` - Jump to specific step
- `nextStep()` - Validate and advance
- `prevStep()` - Go back
- `showStep(step)` - Display step content

### Persistence
- `saveToLocalStorage()` - Save project to localStorage
- `loadFromLocalStorage()` - Load saved data
- `triggerAutosave()` - Trigger debounced save
- `showRecoveryModal()` - Display recovery options
- `checkForSavedData()` - Check for recoverable data

### Project Management
- `saveNamedProject()` - Save project with name
- `loadProject(projectId)` - Load saved project
- `duplicateProject(projectId)` - Create project copy
- `deleteProject(projectId)` - Remove project
- `populateProjectsList()` - Render project list

### Templates
- `toggleTemplateSelector()` - Show/hide template selector
- `populateTemplates()` - Render template cards
- `applyTemplate(templateId)` - Apply template to wizard

### Cost Estimator
- `initCalculator()` - Initialize calculator inputs
- `calculateBudgets()` - Main calculation logic
- `updateIndustryIndicators()` - Update variance indicators
- `updateCalculatorTotal()` - Calculate total design fee

### MH Benchmark Estimator
- `loadBenchmarkData()` - Async load benchmark data from JSON files
- `getBenchmarkDataSync(disciplineId)` - Get cached benchmark data
- `initMHEstimator()` - Initialize MH estimator UI
- `estimateMH(disciplineId, quantity, selectedProjects, useStatistical)` - Calculate man-hours with statistical bounds
- `calculateWeightedRate(projects, method)` - Calculate rate ('average', 'weighted', 'median', 'statistical')
- `generateFullMHEstimate(quantities)` - Full project MH estimate
- `applyMHEstimate()` - Apply to budget table
- `showBenchmarkSelection()` - Show project selection modal

### Statistical Functions (BenchmarkStats)
- `BenchmarkStats.mean(values)` - Calculate average
- `BenchmarkStats.stdDev(values)` - Calculate standard deviation
- `BenchmarkStats.calculateRateStats(projects)` - Get rate mean, stdDev, lower, upper
- `BenchmarkStats.estimateWithBounds(quantity, rateStats)` - Estimate MH with range

### Claiming Presets
- `toggleClaimingPresets()` - Show/hide presets panel
- `previewScheme()` - Preview selected scheme
- `applyClaimingScheme()` - Apply to all disciplines
- `adjustSchemeToPackageCount()` - Adapt scheme to package count

### AI Features
- `toggleChat()` - Open/close chat panel
- `sendMessage()` - Send message to AI
- `executeToolCall(name, args)` - Execute AI tool call
- `generateAIInsights()` - Generate AI recommendations
- `generateAISchedule()` - Generate AI-optimized schedule
- `calculateBasicInsights()` - Calculate risk and forecasts

### RFP Wizard
- `openRfpWizard()` - Open RFP import modal
- `handleRfpUpload(file)` - Process uploaded PDF
- `extractPdfText(file, pageNumbers)` - Extract text from PDF
- `analyzeRfpDocument()` - AI analysis of RFP content (with reasoning extraction)
- `applyRfpData()` - Apply extracted data to project
- `applyRfpQuantitiesToEstimator()` - Transfer to MH estimator and Budget Calculator
- `reapplyRfpQuantitiesToMHEstimator()` - Re-apply quantities when navigating to Step 4
- `displayProjectInfoReasoning()` - Display AI reasoning for cost/schedule estimates
- `showQuantityReasoning(key, label)` - Show quantity reasoning popup

### Gantt Chart
- `buildGanttChart()` - Generate Gantt visualization
- `toggleGanttDiscipline(discipline)` - Expand/collapse discipline
- `expandAllGantt()` / `collapseAllGantt()` - Bulk expand/collapse
- `showGanttTooltip(e)` - Show bar tooltip

### WBS Editing
- `toggleWBSEditMode()` - Enter/exit edit mode
- `buildWBSTableEditable()` - Build editable table
- `editDisciplineBudget()` - Inline budget editing
- `editClaimPercent()` - Inline claiming editing
- `confirmAddDiscipline()` / `confirmDeleteDiscipline()` - Add/remove disciplines
- `recalculateBudgets()` - Recalculate from industry standards

### Export
- `exportCSV()` - Export WBS table
- `exportAllDataCSV()` - Export complete project data
- `exportProjectSummary()` - Generate PDF report
- `printReport()` - Print/PDF export
- `importData()` - Import CSV file
- `shareProjectUrl()` - Generate shareable URL

## UI Components

### Progress Bar
- 6-step indicator at top
- States: `active`, `completed`, default
- Click to navigate back to completed steps

### Terminal Header
- Application title: "WBS TERMINAL v1.0"
- Reports button (visible on results page)
- Autosave indicator

### Template Selector
- Collapsible section on Step 1
- Card grid with project templates
- Stats showing phases, disciplines, packages count

### Cost Estimator Calculator
- Collapsible section with header
- 2-column grid layout (responsive)
- Total Design Fee display
- Advanced settings for complexity overrides

### MH Estimator
- Collapsible panel in Budget step
- Discipline-by-discipline quantity inputs
- Historical project selection
- Apply to budget button

### Claiming Presets Panel
- Collapsible section in Claiming step
- Radio button scheme selection
- Preview table before applying

### AI Chat Panel
- Floating panel (fixed position, draggable)
- Message history with markdown support
- Context badge showing current state
- Settings button for API key

### AI Insights Panel
- Collapsible panel on results page
- 4-card grid: Risk, Cost Forecast, Schedule Forecast, Budget Health
- AI suggestions section with loading state

### RFP Wizard Modal
- 3-stage wizard: Upload → Configure → Review
- Drag & drop file zone
- Page range selector
- Quantity extraction display
- Usage statistics

### Gantt Chart
- Horizontal timeline with month columns
- Discipline rows with expand/collapse
- Package bars with hover tooltips
- Current date marker

### KPI Cards
- 4-card grid showing:
  - Total Budget
  - WBS Elements count
  - Disciplines count
  - Project duration (months)

### Recovery Modal
- Auto-shown on page load if unsaved data exists
- Preview of saved data summary
- Restore, Dismiss, or Discard options

### Project Manager Modal
- Save project form
- Project list with load/duplicate/delete actions
- Compare view toggle

## Responsive Design

Breakpoint: `768px`
- KPI grid: 4 columns → 2 columns
- Filters: 4 columns → 2 columns
- Disciplines grid: auto-fill → 2 columns
- Calculator grid: 2 columns → 1 column
- Complexity override grid: 3 columns → 1 column
- Insights grid: 4 columns → 2 columns

Breakpoint: `480px`
- Chat panel: Full width with auto margins
- Chat FAB: Adjusted position

## Code Conventions

### Indentation
- 4 spaces for HTML/CSS
- 4 spaces for JavaScript

### Naming Conventions
- `kebab-case` for IDs and classes
- `camelCase` for JavaScript variables/functions
- `UPPERCASE` for constants and button labels

### Comments
- Section markers: `// ============================================`
- JSDoc style comments for functions
- Inline comments for complex logic

### State Management
- Global state objects: `projectData`, `chatState`, `rfpState`, `mhEstimateState`
- Constants for configuration: `DISCIPLINE_CONFIG`, `HISTORICAL_BENCHMARKS`, `projectTemplates`

## Development Guidelines

### Making Changes

1. **UI Styling**
   - All styles in `<style>` block (lines 11-2100)
   - Use existing color variables
   - Maintain terminal aesthetic
   - Follow card-base and modal-base patterns

2. **Business Logic**
   - Modify functions in `<script>` block
   - Maintain data model structure
   - Update validation as needed
   - Trigger autosave on data changes

3. **Adding New Modals**
   - Use `modal-base` class system
   - Include header with close button
   - Add keyboard escape handler

4. **Adding New Features**
   - Group related functions with section comments
   - Add state tracking if needed
   - Include persistence integration
   - Update AI context if relevant

### Testing Checklist

**Basic Navigation:**
- [ ] All 6 steps navigate correctly
- [ ] Budget totals calculate properly
- [ ] Claiming percentages validate (100% per discipline)
- [ ] Date ranges calculate duration correctly
- [ ] WBS table generates with correct numbering
- [ ] Chart displays with filters working
- [ ] CSV export downloads correctly
- [ ] Responsive breakpoints work
- [ ] Edit mode returns to wizard

**Persistence:**
- [ ] Auto-save triggers on data changes
- [ ] Recovery modal appears with saved data
- [ ] Restore, Dismiss, Discard all work correctly
- [ ] Project manager save/load functions

**Cost Estimator:**
- [ ] Calculator expands on first visit
- [ ] All 3 project types calculate correctly
- [ ] Industry indicators update in real-time
- [ ] Manual edits preserved during recalculation

**MH Estimator:**
- [ ] All disciplines calculate correctly
- [ ] Project selection modal works
- [ ] Quantities apply to calculations
- [ ] Apply to budget updates table

**AI Features:**
- [ ] Chat opens/closes correctly
- [ ] Messages send and receive
- [ ] Tool calls execute properly
- [ ] Insights panel calculates correctly
- [ ] Schedule generation applies dates

**RFP Wizard:**
- [ ] PDF upload and parsing works
- [ ] Page range selection functions
- [ ] AI analysis extracts quantities
- [ ] Apply data populates estimator

**Gantt Chart:**
- [ ] Timeline renders correctly
- [ ] Expand/collapse disciplines
- [ ] Tooltips display on hover

## Known Limitations

1. **No server persistence** - All data stored client-side in localStorage
2. **No actual cost tracking** - ACWP always shows $0
3. **No user authentication** - Client-side only
4. **API key exposure risk** - OpenAI key stored in localStorage
5. **No real-time collaboration** - Single-user only
6. **No undo/redo** - Changes are immediate
7. **Large file size** - 14,000+ lines in single file

## Future Enhancement Ideas

- Server-side persistence with user accounts
- Real-time collaboration features
- Actual cost tracking integration
- Database integration for budgets and benchmarks
- Gantt chart drag-and-drop editing
- Resource allocation tracking
- Template library expansion
- Print/PDF export improvements
- Fix typo in default packages ("As-Buit" → "As-Built")
- Split into multiple files for maintainability
- Add unit tests

## Performance Considerations

- All calculations happen client-side
- Chart re-renders on filter change
- PDF.js loaded only when RFP wizard used
- Debounced autosave prevents excessive writes
- Large documents chunked for AI processing
- Gantt chart virtualization for large projects

## Accessibility

- Semantic HTML elements
- Keyboard navigation supported
- Color contrast: Gold (#ffd700) on black (#0a0a0a) meets WCAG AA
- Hover states for interactive elements
- Focus states for inputs
- ARIA labels on interactive elements

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires ES6+ support
- Libraries loaded via CDN:
  - Chart.js 4.x
  - PDF.js 3.11.174
  - html2pdf.js 0.10.1
- No polyfills included

## Deployment

### GitHub Pages
- Push to main branch
- Enable GitHub Pages from repository settings
- No build process required

### Custom Domain
- Add CNAME file if needed
- Configure DNS settings

## Key Files

- `index.html` - Complete application (only file needed)
- `README.md` - Basic project description
- `CLAUDE.md` - This documentation file

## Security Considerations

- OpenAI API key stored in localStorage (user-provided)
- No sensitive data transmitted to external servers except OpenAI API
- PDF processing happens client-side
- URL sharing exposes project data in URL parameters
