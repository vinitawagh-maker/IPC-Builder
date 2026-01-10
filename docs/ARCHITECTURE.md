# IPC Builder - Architecture Diagram

This document provides visual network diagrams showing the architecture and data flow of the IPC Builder application.

## High-Level Architecture

```mermaid
graph TB
    subgraph "Browser Environment"
        subgraph "User Interface Layer"
            HTML[index.html<br/>Terminal UI]
            CSS[CSS Modules<br/>25 style files]
        end

        subgraph "Application Layer"
            Main[main.js<br/>Entry Point]
            Legacy[app-legacy.js<br/>Core Logic<br/>11,724 lines]

            subgraph "Core Modules"
                State[state.js<br/>Global State]
                Constants[constants.js<br/>Config]
            end

            subgraph "Utilities"
                Format[format.js<br/>Data Formatting]
                DOM[dom.js<br/>DOM Helpers]
            end

            subgraph "Services"
                Storage[localStorage.js<br/>Persistence]
                API[openai.js<br/>AI Integration]
                CSV[csv.js<br/>CSV Export]
                URL[url.js<br/>URL Sharing]
            end
        end

        subgraph "External Libraries"
            Chart[Chart.js<br/>Visualizations]
            PDF[PDF.js<br/>PDF Parsing]
            H2P[html2pdf.js<br/>PDF Export]
        end

        subgraph "Data Storage"
            LS[(localStorage<br/>Project Data<br/>API Keys<br/>Autosave)]
        end
    end

    subgraph "External Services"
        OpenAI[OpenAI API<br/>gpt-4o-mini<br/>Chat, Schedule, RFP Analysis]
        CDN[CDN<br/>PDF.js Worker<br/>Google Fonts]
    end

    subgraph "Static Assets"
        Benchmark[(Benchmark Data<br/>14 JSON Files<br/>Historical MH Data)]
    end

    %% Connections
    HTML --> Main
    Main --> CSS
    Main --> Legacy
    Main --> Chart
    Main --> PDF
    Main --> H2P

    Legacy --> State
    Legacy --> Constants
    Legacy --> Format
    Legacy --> DOM
    Legacy --> Storage
    Legacy --> API
    Legacy --> CSV
    Legacy --> URL
    Legacy --> Chart
    Legacy --> H2P
    Legacy --> PDF

    Storage --> LS
    API --> OpenAI
    PDF --> CDN
    Legacy --> Benchmark

    State -.->|window.projectData| Legacy

    style HTML fill:#1a1a1a,stroke:#ffd700,color:#ffd700
    style Main fill:#2a2a2a,stroke:#ffd700,color:#ffd700
    style Legacy fill:#ff4444,stroke:#ffd700,color:#fff
    style State fill:#00ff00,stroke:#000,color:#000
    style OpenAI fill:#74aa9c,stroke:#000,color:#fff
    style LS fill:#4169e1,stroke:#000,color:#fff
    style Benchmark fill:#9370db,stroke:#000,color:#fff
```

## Data Flow Architecture

```mermaid
graph LR
    subgraph "Input Sources"
        UI[User Input<br/>Forms & Buttons]
        URLParam[URL Parameters<br/>Shared Links]
        CSVFile[CSV Import]
        PDFFile[RFP PDF Upload]
    end

    subgraph "Processing Layer"
        Validate[Validation<br/>& Parsing]
        Calculate[Budget<br/>Calculator]
        MH[MH Estimator<br/>Benchmark Lookup]
        AIProc[AI Processing<br/>OpenAI API]
    end

    subgraph "State Management"
        ProjectData[projectData Object<br/>Central State<br/>Phases, Disciplines,<br/>Packages, Budgets,<br/>Claiming, Dates]
    end

    subgraph "Persistence"
        AutoSave[Auto-save<br/>Debounced 1s]
        LocalStore[(localStorage)]
        NamedProj[(Named Projects)]
    end

    subgraph "Output Destinations"
        WBSTable[WBS Table<br/>Interactive Display]
        Charts[Charts<br/>Performance & Gantt]
        DesignFeeBook[Design Fee Book PDF<br/>Professional Report]
        CSVExp[CSV Export]
        URLShare[Shareable URL<br/>Base64 Compressed]
    end

    %% Input Flow
    UI --> Validate
    URLParam --> Validate
    CSVFile --> Validate
    PDFFile --> AIProc

    %% Processing Flow
    Validate --> ProjectData
    Calculate --> ProjectData
    MH --> Calculate
    AIProc --> ProjectData

    %% Persistence Flow
    ProjectData --> AutoSave
    AutoSave --> LocalStore
    ProjectData --> NamedProj
    LocalStore --> ProjectData
    NamedProj --> ProjectData

    %% Output Flow
    ProjectData --> WBSTable
    ProjectData --> Charts
    ProjectData --> DesignFeeBook
    ProjectData --> CSVExp
    ProjectData --> URLShare

    style ProjectData fill:#ffd700,stroke:#000,color:#000
    style AutoSave fill:#00ff00,stroke:#000,color:#000
    style AIProc fill:#74aa9c,stroke:#000,color:#fff
    style DesignFeeBook fill:#ff69b4,stroke:#000,color:#fff
```

## Module Dependency Graph

```mermaid
graph TD
    subgraph "Entry Points"
        Index[index.html]
        MainJS[main.js]
    end

    subgraph "Core"
        State[state.js<br/>projectData<br/>currentStep]
        Const[constants.js<br/>Config & Templates]
    end

    subgraph "Utils"
        Format[format.js<br/>formatCurrency<br/>formatDate<br/>parseCurrency]
        DOM[dom.js<br/>$, qs, qsa<br/>show, hide<br/>createElement]
    end

    subgraph "Services"
        LS[localStorage.js<br/>saveToLocalStorage<br/>loadFromLocalStorage<br/>triggerAutosave]
        OAI[openai.js<br/>chatCompletion<br/>streamChatCompletion<br/>chatWithTools]
        CSVE[csv.js<br/>generateWBSCSV<br/>parseCSV<br/>downloadFile]
        URLE[url.js<br/>compressProjectData<br/>generateShareableURL]
    end

    subgraph "Legacy"
        AppLegacy[app-legacy.js<br/>253 Functions<br/>Complete App Logic]
    end

    subgraph "External Libs"
        ChartJS[Chart.js]
        PDFJS[PDF.js]
        H2PDF[html2pdf.js]
    end

    Index --> MainJS
    MainJS --> State
    MainJS --> Const
    MainJS --> Format
    MainJS --> DOM
    MainJS --> LS
    MainJS --> OAI
    MainJS --> CSVE
    MainJS --> URLE
    MainJS --> AppLegacy
    MainJS --> ChartJS
    MainJS --> PDFJS
    MainJS --> H2PDF

    AppLegacy --> State
    AppLegacy --> Const
    AppLegacy --> Format
    AppLegacy --> DOM
    AppLegacy --> LS
    AppLegacy --> OAI
    AppLegacy --> CSVE
    AppLegacy --> URLE
    AppLegacy --> ChartJS
    AppLegacy --> PDFJS
    AppLegacy --> H2PDF

    LS --> State
    OAI --> Const

    style MainJS fill:#ffd700,stroke:#000,color:#000
    style AppLegacy fill:#ff4444,stroke:#000,color:#fff
    style State fill:#00ff00,stroke:#000,color:#000
```

## Feature Architecture

```mermaid
graph TB
    subgraph "6-Step Wizard Flow"
        Step1[Step 1: PHASES<br/>Project Phases<br/>Templates Available]
        Step2[Step 2: DISCIPLINES<br/>18+ Engineering<br/>Disciplines]
        Step3[Step 3: PACKAGES<br/>Deliverable<br/>Milestones]
        Step4[Step 4: BUDGET<br/>Cost Calculator<br/>MH Estimator]
        Step5[Step 5: CLAIMING<br/>Distribution<br/>Schemes]
        Step6[Step 6: SCHEDULE<br/>AI Schedule<br/>Generation]

        Step1 --> Step2
        Step2 --> Step3
        Step3 --> Step4
        Step4 --> Step5
        Step5 --> Step6
    end

    subgraph "Cross-Cutting Features"
        Chat[AI Chat Assistant<br/>Natural Language WBS Editing]
        WBS[WBS Generation<br/>Interactive Table<br/>Editable Mode]
        Insights[AI Insights Panel<br/>Risk Scoring<br/>Forecasting]
        RFP[RFP Wizard<br/>PDF Import<br/>Quantity Extraction]
    end

    subgraph "Visualization Features"
        PerfChart[Performance Chart<br/>Line/Bar Charts<br/>Cumulative/Monthly]
        Gantt[Gantt Chart<br/>Timeline View<br/>Package Milestones]
    end

    subgraph "Export Features"
        DFB[Design Fee Book<br/>Professional PDF<br/>B/W Print-Ready]
        CSVExport[CSV Export<br/>WBS Table<br/>Full Data JSON]
        URLExport[URL Sharing<br/>Base64 Compressed]
    end

    Step4 --> WBS
    Step5 --> WBS
    Step6 --> WBS
    Step6 --> Gantt

    WBS --> PerfChart
    WBS --> DFB
    WBS --> CSVExport
    WBS --> URLExport

    Chat -.->|Modifies| Step1
    Chat -.->|Modifies| Step2
    Chat -.->|Modifies| Step3
    Chat -.->|Modifies| Step4
    Chat -.->|Modifies| Step5
    Chat -.->|Modifies| Step6

    RFP -.->|Populates| Step1
    RFP -.->|Populates| Step2
    RFP -.->|Populates| Step4

    Insights -.->|Analyzes| WBS

    style Chat fill:#74aa9c,stroke:#000,color:#fff
    style RFP fill:#9370db,stroke:#000,color:#fff
    style DFB fill:#ff69b4,stroke:#000,color:#fff
    style WBS fill:#ffd700,stroke:#000,color:#000
```

## State Object Structure

```mermaid
graph TD
    PD[projectData Object]

    PD --> Phases[phases: Array<br/>['Base', 'ESDC', 'TSCD']]
    PD --> Disciplines[disciplines: Array<br/>['Structures', 'Civil', 'Traffic']]
    PD --> Packages[packages: Array<br/>['Preliminary', 'Interim', 'Final']]
    PD --> Budgets[budgets: Object<br/>{discipline: amount}]
    PD --> Claiming[claiming: Object<br/>{discipline-package: percent}]
    PD --> Dates[dates: Object<br/>{discipline-package: {start, end}}]
    PD --> Calc[calculator: Object]
    PD --> Scope[projectScope: String]
    PD --> Notes[scheduleNotes: String]
    PD --> DScopes[disciplineScopes: Object]

    Calc --> TCC[totalConstructionCost: Number]
    Calc --> DFP[designFeePercent: Number]
    Calc --> PT[projectType: String]
    Calc --> TDF[totalDesignFee: Number]
    Calc --> CO[complexityOverrides: Object]
    Calc --> IC[isCalculated: Boolean]
    Calc --> ME[manualEdits: Object]

    style PD fill:#ffd700,stroke:#000,color:#000
    style Calc fill:#ff69b4,stroke:#000,color:#fff
```

## External API Integration

```mermaid
sequenceDiagram
    participant User
    participant App as IPC Builder App
    participant LS as localStorage
    participant API as OpenAI API
    participant BM as Benchmark Data

    Note over User,BM: Initialization Flow
    User->>App: Load Application
    App->>LS: Check for saved data
    LS-->>App: Return projectData
    App->>User: Show recovery modal (if data exists)

    Note over User,BM: AI Chat Flow
    User->>App: Send chat message
    App->>LS: Get API key
    App->>App: Build context (WBS, budget, current step)
    App->>API: streamChatCompletion(message, context)
    API-->>App: Stream response chunks
    App-->>User: Display AI response
    User->>App: Apply AI suggestions
    App->>LS: Auto-save (debounced)

    Note over User,BM: Budget Calculation Flow
    User->>App: Input construction cost
    App->>App: Calculate budgets by discipline
    App->>BM: Load benchmark data (14 JSON files)
    BM-->>App: Return historical MH data
    App->>App: Calculate variance indicators
    App-->>User: Display budgets & indicators
    App->>LS: Auto-save

    Note over User,BM: RFP Import Flow
    User->>App: Upload RFP PDF
    App->>App: Parse PDF with PDF.js
    App->>API: Analyze extracted text
    API-->>App: Return structured data
    App->>App: Apply to projectData
    App-->>User: Show populated wizard
    App->>LS: Auto-save

    Note over User,BM: Export Flow
    User->>App: Generate Design Fee Book
    App->>App: Render report HTML
    App->>App: Convert with html2pdf.js
    App-->>User: Download PDF
```

## Build & Deployment Pipeline

```mermaid
graph LR
    subgraph "Development"
        Dev[Developer<br/>npm run dev]
        Vite[Vite Dev Server<br/>localhost:3000<br/>HMR Enabled]
        Browser[Browser<br/>Live Reload]

        Dev --> Vite
        Vite --> Browser
    end

    subgraph "Code Quality"
        ESLint[ESLint<br/>Code Linting]
        Prettier[Prettier<br/>Code Formatting]
    end

    subgraph "Build Process"
        Build[npm run build]
        ViteBuild[Vite Build]
        PostCSS[PostCSS<br/>Autoprefixer<br/>cssnano]
        Terser[Terser<br/>JS Minification]
        Dist[dist/ Output<br/>Vendor Chunks<br/>Feature Chunks]

        Build --> ViteBuild
        ViteBuild --> PostCSS
        ViteBuild --> Terser
        ViteBuild --> Dist
    end

    subgraph "CI/CD GitHub Actions"
        Push[git push]
        CI[ci.yml<br/>Lint & Build]
        Deploy[deploy.yml<br/>Build & Deploy]
        GHPages[GitHub Pages<br/>mjamiv.github.io/IPC-Builder]

        Push --> CI
        Push --> Deploy
        Deploy --> Dist
        Dist --> GHPages
    end

    style Vite fill:#646cff,stroke:#000,color:#fff
    style ViteBuild fill:#646cff,stroke:#000,color:#fff
    style GHPages fill:#00ff00,stroke:#000,color:#000
```

## Key Technologies

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Build** | Vite 5.x | Fast dev server, HMR, production bundling |
| **CSS** | PostCSS + Autoprefixer + cssnano | Browser compatibility, minification |
| **State** | Vanilla JS | Global `projectData` object |
| **Storage** | localStorage | Client-side persistence |
| **Charts** | Chart.js 4.x | Performance & financial charts |
| **PDF Parse** | PDF.js 3.11.174 | RFP import functionality |
| **PDF Export** | html2pdf.js 0.10.1 | Design Fee Book generation |
| **AI** | OpenAI gpt-4o-mini | Chat, scheduling, RFP analysis |
| **Deployment** | GitHub Pages | Static hosting |

## Data Storage Schema

```
localStorage
├── wbsTerminal_project (Auto-save)
│   ├── projectData: {...}
│   ├── formValues: {...}
│   └── currentStep: 1-6
│
├── wbsTerminal_projects (Named Projects)
│   └── Array<{name, timestamp, data}>
│
└── wbsTerminal_openai_key (API Key)
    └── String (encrypted)

public/data/benchmarking/
├── benchmarking-bridges.json
├── benchmarking-roadway.json
├── benchmarking-drainage.json
├── benchmarking-traffic.json
├── benchmarking-utilities.json
├── benchmarking-civil.json
├── benchmarking-structures.json
├── benchmarking-geotech.json
├── benchmarking-environmental.json
├── benchmarking-hydraulics.json
├── benchmarking-landscape.json
├── benchmarking-lighting.json
├── benchmarking-permitting.json
└── benchmarking-survey.json
```

## Navigation Flow

```mermaid
stateDiagram-v2
    [*] --> Step1
    Step1 --> Step2: nextStep()
    Step2 --> Step1: prevStep()
    Step2 --> Step3: nextStep()
    Step3 --> Step2: prevStep()
    Step3 --> Step4: nextStep()
    Step4 --> Step3: prevStep()
    Step4 --> Step5: nextStep()
    Step5 --> Step4: prevStep()
    Step5 --> Step6: nextStep()
    Step6 --> Step5: prevStep()
    Step6 --> Reports: View Reports
    Reports --> Step6

    Step1: PHASES\nProject Phases\nTemplates
    Step2: DISCIPLINES\n18+ Options\nCustom Input
    Step3: PACKAGES\nDeliverables\nMilestones
    Step4: BUDGET\nCalculator\nMH Estimator
    Step5: CLAIMING\nDistribution\nSchemes
    Step6: SCHEDULE\nAI Generation\nDates & Duration
    Reports: WBS Table\nCharts\nExports
```

---

## Architecture Principles

### 1. **Gradual Migration Strategy**
- Legacy monolithic code (`app-legacy.js`) handles core business logic
- New modular services provide foundation for future refactoring
- `window.*` exports maintain backward compatibility

### 2. **Client-Side First**
- No server required - fully static deployment
- localStorage for persistence
- URL parameters for sharing

### 3. **Progressive Enhancement**
- Core functionality works without AI features
- AI key optional (stored in localStorage)
- Graceful degradation for missing features

### 4. **Terminal Aesthetic**
- JetBrains Mono font throughout
- Gold (#ffd700) on dark backgrounds
- Monospace, command-line inspired UI

### 5. **Performance Optimization**
- Vite code splitting (vendor chunks, feature chunks)
- CSS minification with cssnano
- Debounced auto-save (1000ms)
- Lazy loading of benchmark data

---

*This architecture diagram is auto-generated from codebase analysis. For implementation details, see individual module documentation.*
