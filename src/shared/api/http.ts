const DEFAULT_TIMEOUT_MS = 15_000;

const isLocalHostname = (hostname: string) =>
  hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";

export class HttpError extends Error {
  readonly status: number;
  readonly payload: unknown;

  constructor(
    message: string,
    status: number,
    payload: unknown,
  ) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.payload = payload;
  }
}

export class HttpTimeoutError extends Error {
  constructor() {
    super("Request timed out");
    this.name = "HttpTimeoutError";
  }
}

export function assertSafeApiUrl(value: string) {
  let url: URL;
  try {
    url = new URL(value, window.location.origin);
  } catch {
    throw new Error("Invalid API URL");
  }

  if (import.meta.env.PROD && (url.protocol !== "https:" || isLocalHostname(url.hostname))) {
    throw new Error("Unsafe production API URL");
  }
  return url.toString();
}

export async function requestJson<T>(
  url: string,
  init: RequestInit = {},
  timeoutMs = DEFAULT_TIMEOUT_MS,
): Promise<T> {
  const controller = new AbortController();
  let timedOut = false;
  const abortFromCaller = () => controller.abort();
  if (init.signal?.aborted) controller.abort();
  else init.signal?.addEventListener("abort", abortFromCaller, { once: true });
  const timeoutId = window.setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetch(assertSafeApiUrl(url), { ...init, signal: controller.signal });
    const payload: unknown = await response.json().catch(() => null);
    if (!response.ok) throw new HttpError("API request failed", response.status, payload);
    return payload as T;
  } catch (error) {
    if (timedOut) throw new HttpTimeoutError();
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
    init.signal?.removeEventListener("abort", abortFromCaller);
  }
}
