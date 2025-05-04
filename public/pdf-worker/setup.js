// This file is loaded directly in index.html to set up PDF.js worker path
// before any React components are loaded
window.PDFWorkerPath = window.location.origin + '/pdf-worker/pdf.worker.min.js'; 