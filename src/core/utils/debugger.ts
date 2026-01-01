export function logDebugInfo(message: string, data?: unknown): void {
  if (import.meta.env.PROD) return;
  const timestamp = new Date().toISOString();
  if (data !== undefined) {
    console.log(`[DEBUG] [${timestamp}] ${message}`, data);
  } else {
    console.log(`[DEBUG] [${timestamp}] ${message}`);
  }
}
