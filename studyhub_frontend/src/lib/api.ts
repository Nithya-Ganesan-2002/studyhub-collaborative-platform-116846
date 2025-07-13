//
// StudyHub frontend API utility module.
// Handles requests to the backend REST API endpoints.
//
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export async function apiFetch<T>(
  path: string,
  options?: Omit<RequestInit, "body"> & { body?: unknown; token?: string }
): Promise<T> {
  const baseHeaders: Record<string, string> = { "Content-Type": "application/json" };
  if (options?.token) baseHeaders["Authorization"] = `Bearer ${options.token}`;
  let optHeaders: Record<string, string> = {};
  if (options?.headers && typeof options.headers === "object" && !(options.headers instanceof Headers)) {
    optHeaders = options.headers as Record<string, string>;
  }
  const headers = { ...baseHeaders, ...optHeaders };
  let body: BodyInit | null | undefined = undefined;
  if (typeof options?.body !== "undefined") {
    body = JSON.stringify(options.body);
  }
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    body,
  });
  if (!res.ok) {
    throw new Error(
      `API error: ${res.status} ${res.statusText} [${path}]`
    );
  }
  return await res.json();
}

// PUBLIC_INTERFACE
export function getApiBaseUrl() {
  /** Returns the backend API base URL being used. */
  return API_BASE;
}
