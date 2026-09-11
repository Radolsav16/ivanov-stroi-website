// Render's free instances can need close to a minute to wake after inactivity.
const DEFAULT_TIMEOUT_MS = 65_000;

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
    super("Връзката със сървъра отне твърде дълго.");
    this.name = "HttpTimeoutError";
  }
}

export class HttpNetworkError extends Error {
  constructor() {
    super("Не успяхме да се свържем със сървъра. Проверете интернет връзката и опитайте отново.");
    this.name = "HttpNetworkError";
  }
}

export class ApiConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiConfigurationError";
  }
}

export function assertSafeApiUrl(value: string) {
  let url: URL;
  try {
    url = new URL(value, window.location.origin);
  } catch {
    throw new ApiConfigurationError("Адресът на услугата не е конфигуриран правилно.");
  }

  if (import.meta.env.PROD && (url.protocol !== "https:" || isLocalHostname(url.hostname))) {
    throw new ApiConfigurationError("Услугата не използва защитена HTTPS връзка.");
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
    if (!response.ok) {
      throw new HttpError("Заявката към сървъра беше неуспешна.", response.status, payload);
    }
    return payload as T;
  } catch (error) {
    if (timedOut) throw new HttpTimeoutError();
    if (
      error instanceof HttpError ||
      error instanceof ApiConfigurationError ||
      (error instanceof DOMException && error.name === "AbortError")
    ) {
      throw error;
    }
    throw new HttpNetworkError();
  } finally {
    window.clearTimeout(timeoutId);
    init.signal?.removeEventListener("abort", abortFromCaller);
  }
}
