import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HttpError, HttpNetworkError, HttpTimeoutError, requestJson } from "./http";

describe("requestJson", () => {
  beforeEach(() => {
    vi.stubGlobal("window", {
      location: { origin: "http://localhost:5173" },
      setTimeout: globalThis.setTimeout,
      clearTimeout: globalThis.clearTimeout,
    });
  });

  afterEach(() => vi.unstubAllGlobals());

  it("returns a successful JSON payload", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ status: "ok" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    ));

    await expect(requestJson<{ status: string }>("/health")).resolves.toEqual({ status: "ok" });
  });

  it("normalizes non-success responses", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ message: "Опитайте отново" }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      }),
    ));

    await expect(requestJson("/api/contact")).rejects.toMatchObject<HttpError>({
      name: "HttpError",
      message: "Заявката към сървъра беше неуспешна.",
      status: 429,
      payload: { message: "Опитайте отново" },
    });
  });

  it("reports timeouts separately from other network errors", async () => {
    vi.stubGlobal("fetch", vi.fn((_url: string, init: RequestInit) =>
      new Promise((_resolve, reject) => {
        init.signal?.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));
      }),
    ));

    await expect(requestJson("/api/projects", {}, 1)).rejects.toBeInstanceOf(HttpTimeoutError);
  });

  it("normalizes browser network errors in Bulgarian", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));

    await expect(requestJson("/api/contact")).rejects.toMatchObject<HttpNetworkError>({
      name: "HttpNetworkError",
      message: "Не успяхме да се свържем със сървъра. Проверете интернет връзката и опитайте отново.",
    });
  });
});
