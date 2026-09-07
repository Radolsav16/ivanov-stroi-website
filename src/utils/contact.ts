import type {
  ContactFieldName,
  ContactFormErrors,
  ContactFormValues,
} from "../components/contact-form/types";
import { contactDetails } from "../data/contact";

const DEFAULT_ERROR_MESSAGE = "Запитването не беше изпратено. Моля, опитайте отново.";

const isLocalhost = (hostname: string) =>
  hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";

const assertSafeProductionEndpoint = (endpoint: string) => {
  if (!import.meta.env.PROD) return;

  let endpointUrl: URL;

  try {
    endpointUrl = new URL(endpoint, window.location.origin);
  } catch {
    throw new ContactRequestError(DEFAULT_ERROR_MESSAGE);
  }

  if (endpointUrl.protocol !== "https:" || isLocalhost(endpointUrl.hostname)) {
    throw new ContactRequestError(
      "Формата не е конфигурирана за защитена връзка. Моля, свържете се с нас по телефон или email.",
    );
  }
};

type ErrorPayload = {
  message?: string;
  fields?: Partial<Record<ContactFieldName, string[]>>;
};

export class ContactRequestError extends Error {
  fieldErrors?: ContactFormErrors;

  constructor(message: string, fields?: ErrorPayload["fields"]) {
    super(message);
    this.name = "ContactRequestError";
    this.fieldErrors = Object.fromEntries(
      Object.entries(fields ?? {})
        .filter((entry): entry is [ContactFieldName, string[]] =>
          Array.isArray(entry[1]) && entry[1].length > 0,
        )
        .map(([field, messages]) => [field, messages[0]]),
    );
  }
}

const getApiError = async (response: Response) => {
  const payload: unknown = await response.json().catch(() => null);

  if (
    payload &&
    typeof payload === "object" &&
    "message" in payload &&
    typeof payload.message === "string"
  ) {
    const fields = "fields" in payload ? (payload.fields as ErrorPayload["fields"]) : undefined;
    return new ContactRequestError(payload.message, fields);
  }

  return new ContactRequestError(DEFAULT_ERROR_MESSAGE);
};

export async function submitContactRequest(
  values: ContactFormValues,
  website = "",
  signal?: AbortSignal,
) {
  const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT?.trim();

  if (endpoint) {
    assertSafeProductionEndpoint(endpoint);
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ ...values, website }),
      signal,
    });

    if (!response.ok) {
      throw await getApiError(response);
    }

    return "sent" as const;
  }

  const message = [
    `Име: ${values.name}`,
    `Телефон: ${values.phone}`,
    `Email: ${values.email}`,
    `Услуга: ${values.service}`,
    "",
    `Съобщение:\n${values.message}`,
  ].join("\n");

  const mailto = new URLSearchParams({
    subject: "Ново запитване от сайта на IVANOV STROI",
    body: message,
  });

  window.location.href = `${contactDetails.emailHref}?${mailto.toString()}`;
  return "email-client" as const;
}
