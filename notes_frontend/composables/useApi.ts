 /**
  * PUBLIC_INTERFACE
  * getApiIntegrationMessage
  * Returns a friendly message indicating that this demo runs fully in the browser
  * using mock/in-memory data and where to plug a real API in the future.
  */
export function getApiIntegrationMessage(): string {
  return 'Running in demo mode: no backend required. Replace useNotes.ts with real API calls when ready.'
}
