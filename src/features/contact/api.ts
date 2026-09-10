import type {
  ContactFieldName,
  ContactFormErrors,
  ContactFormValues,
} from "./types";
import { contactDetails } from "../../data/contact";
import { HttpError, requestJson } from "../../shared/api/http";

const DEFAULT_ERROR_MESSAGE = "Запитването не беше изпратено. Моля, опитайте отново.";

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

const getApiError = (error: HttpError) => {
  const payload = error.payload;

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
    try {
      await requestJson(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...values, website }),
        signal,
      });
    } catch (error) {
      if (error instanceof HttpError) throw getApiError(error);
      if (error instanceof Error && error.message.includes("API URL")) {
        throw new ContactRequestError(
          "Формата не е конфигурирана за защитена връзка. Моля, свържете се с нас по телефон или email.",
        );
      }
      throw error;
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
