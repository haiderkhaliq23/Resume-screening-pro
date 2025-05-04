// This file is loaded directly in index.html to set up PDF.js worker path
// before any React components are loaded
(function() {
  try {
    // Try multiple worker file names to ensure one works
    var workerPaths = [
      '/pdf-worker/pdf.worker.js',
      '/pdf-worker/pdf.worker.min.js',
      '/pdf-worker/pdf.worker.legacy.js'
    ];
    
    // Set first path as default, we'll use it even if it doesn't exist yet
    window.PDFWorkerPath = window.location.origin + workerPaths[0];
    
    console.log('PDF worker path initially set to:', window.PDFWorkerPath);
    
    // If we're in a browser that supports fetch, we can check which file actually exists
    if (typeof fetch !== 'undefined') {
      // Try to find a worker file that exists
      Promise.all(workerPaths.map(path => 
        fetch(window.location.origin + path)
          .then(response => ({ path, exists: response.ok }))
          .catch(() => ({ path, exists: false }))
      )).then(results => {
        // Find first existing worker
        var existingWorker = results.find(result => result.exists);
        if (existingWorker) {
          window.PDFWorkerPath = window.location.origin + existingWorker.path;
          console.log('PDF worker path updated to verified path:', window.PDFWorkerPath);
        }
      });
    }
  } catch (error) {
    console.error('Failed to set PDF worker path:', error);
  }
})(); 