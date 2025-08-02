// Alternative PDF.js setup with better worker handling
let pdfjs: any = null;

export async function initPdfJs() {
    if (pdfjs) return pdfjs;

    try {
        // Import PDF.js
        const pdfjsLib = await import('pdfjs-dist');

        // Set up worker - try multiple approaches
        if (typeof window !== 'undefined') {
            // Option 1: Use the bundled worker from node_modules
            try {
                const workerUrl = new URL(
                    'pdfjs-dist/build/pdf.worker.min.mjs',
                    import.meta.url
                ).toString();
                pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;
            } catch (e) {
                // Option 2: Use CDN fallback
                pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
            }
        }

        pdfjs = pdfjsLib;
        return pdfjsLib;
    } catch (error) {
        console.error('Failed to initialize PDF.js:', error);
        throw error;
    }
}
