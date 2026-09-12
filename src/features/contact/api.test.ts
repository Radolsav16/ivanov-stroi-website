import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ContactRequestError, submitContactRequest } from "./api";
import type { ContactFormValues } from "./types";

const values: ContactFormValues = {
  name: "Иван Иванов",
  phone: "+359 888 123 456",
  email: "ivan@example.com",
  service: "Ремонт на баня",
  message: "Искам оглед и оферта за цялостен ремонт на баня.",
};

describe("contact API", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_CONTACT_FORM_ENDPOINT", "https://api.example.com/api/contact");
    vi.stubGlobal("window", {
      location: { origin: "https://site.example.com" },
      setTimeout: globalThis.setTimeout,
      clearTimeout: globalThis.clearTimeout,
    });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("returns sent after a successful submission", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ message: "Запитването е прието." }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(submitContactRequest(values)).resolves.toBe("sent");

    const request = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(JSON.parse(String(request.body))).toEqual({ ...values, website: "" });
  });

  it("maps server field errors to the frontend contract", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(
      new Response(JSON.stringify({
        message: "Проверете въведените данни.",
        fields: { email: ["Въведете валиден email адрес."] },
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }),
    ));

    const error = await submitContactRequest(values).catch((reason: unknown) => reason);
    expect(error).toBeInstanceOf(ContactRequestError);
    expect(error).toMatchObject({
      message: "Проверете въведените данни.",
      fieldErrors: { email: "Въведете валиден email адрес." },
    });
  });

  it("replaces browser network errors with a Bulgarian message", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));

    await expect(submitContactRequest(values)).rejects.toMatchObject({
      name: "ContactRequestError",
      message: "Не успяхме да се свържем със сървъра. Проверете интернет връзката и опитайте отново.",
    });
  });

  it("shows a Bulgarian configuration error instead of opening an email client", async () => {
    vi.stubEnv("VITE_CONTACT_FORM_ENDPOINT", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(submitContactRequest(values)).rejects.toMatchObject({
      name: "ContactRequestError",
      message: "Формата временно не е достъпна. Моля, свържете се с нас по телефон или email.",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
