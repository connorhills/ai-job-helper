// Simple diagnostic function for PDF.js - keep for future debugging
export async function testPdfJsSetup() {
    try {
        const pdfjsLib = await import('pdfjs-dist');
        console.log("PDF.js version:", pdfjsLib.version);

        // Test if worker is properly configured
        if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
            return { success: false, error: "Worker not configured" };
        }

        return { success: true, message: "PDF.js is ready" };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : String(error)
        };
    }
}
