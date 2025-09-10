import { useRuntimeConfig } from '#app'

/**
 * PUBLIC_INTERFACE
 * useApiBase
 * Returns resolved API base URL used for REST calls.
 * Precedence:
 *  - Runtime public config (runtimeConfig.public.notesApiBase)
 *  - Environment variable NUXT_PUBLIC_NOTES_API_BASE
 *  - Default '/api' (assuming reverse-proxy through Nitro server)
 */
export function useApiBase(): string {
  // Prefer Nuxt runtime config public value; fallback to env; default '/api'
  const config = useRuntimeConfig()
  const fromRuntime = (config?.public as any)?.notesApiBase as string | undefined
  const fromEnv = (import.meta as any)?.env?.NUXT_PUBLIC_NOTES_API_BASE as string | undefined
  return (fromRuntime || fromEnv || '/api').replace(/\/+$/, '')
}

/**
 * PUBLIC_INTERFACE
 * apiFetchJson
 * Perform a JSON REST call to the backend with basic error handling.
 * Params:
 *  - path: string path after base, like '/notes' or '/notes/:id'
 *  - opts: fetch options
 * Returns:
 *  - parsed JSON any
 * Throws:
 *  - Error with message including response status on non-2xx
 */
export async function apiFetchJson<T = any>(path: string, opts: RequestInit = {}): Promise<T> {
  const base = useApiBase()
  const url = `${base}${path}`
  const headers: HeadersInit = {
    'Accept': 'application/json',
    ...(opts.body ? { 'Content-Type': 'application/json' } : {}),
    ...(opts.headers || {}),
  }

  const res = await fetch(url, { ...opts, headers })
  if (!res.ok) {
    let detail = ''
    try {
      const data = await res.json()
      detail = (data && (data.message || data.error || JSON.stringify(data))) || ''
    } catch {
      detail = await res.text().catch(() => '')
    }
    throw new Error(`API error ${res.status}: ${res.statusText}${detail ? ` - ${detail}` : ''}`)
  }
  if (res.status === 204) {
    // No content
    return undefined as unknown as T
  }
  const data = await res.json().catch(() => undefined)
  return data as T
}
