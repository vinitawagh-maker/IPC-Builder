/**
 * WBS Terminal v2.0 - Vite Edition
 * Main entry point for the application
 */

// Import CSS
import './styles/main.css';

// Import dependencies (bundled by Vite)
import Chart from 'chart.js/auto';
import * as pdfjsLib from 'pdfjs-dist';
import html2pdf from 'html2pdf.js';

// Configure PDF.js worker and standard fonts
// Use jsDelivr CDN (has proper CORS headers for cross-origin requests)
const PDFJS_VERSION = '3.11.174'; // Match installed version
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.js`;

// Configure standard font data URL for PDF.js (fixes font loading warnings)
// Note: This is set as a default for getDocument() calls in legacy code
window.PDFJS_STANDARD_FONT_DATA_URL = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/standard_fonts/`;

// Make libraries available globally for legacy code compatibility
window.Chart = Chart;
window.pdfjsLib = pdfjsLib;
window.html2pdf = html2pdf;

// Import core modules (these provide the modular foundation)
import { projectData, currentStep } from './core/state.js';
import * as constants from './core/constants.js';
import * as formatUtils from './utils/format.js';
import * as domUtils from './utils/dom.js';
import * as storageService from './services/storage/localStorage.js';
import * as openaiService from './services/api/openai.js';
import * as csvExport from './services/export/csv.js';
import * as urlService from './services/export/url.js';

// Make modules available globally for gradual migration
window.WBS = {
    state: { projectData, currentStep },
    constants,
    utils: { ...formatUtils, ...domUtils },
    services: {
        storage: storageService,
        openai: openaiService,
        csv: csvExport,
        url: urlService
    }
};

// Import legacy application code (this will be gradually replaced)
import './legacy/app-legacy.js';

// Log app initialization
console.log(
    '%c WBS Terminal v2.0 - Vite Edition ',
    'background: #1a1a2e; color: #ffd700; font-size: 14px; padding: 4px 8px; border-radius: 4px;'
);
console.log(`Build Date: ${__BUILD_DATE__}`);
console.log('Modular architecture loaded. Access via window.WBS');
