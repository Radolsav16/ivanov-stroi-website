import { type FormEvent, useEffect, useRef, useState } from "react";
import {
  ContactRequestError,
  submitContactRequest,
} from "./api";
import {
  contactFieldNames,
  emptyContactFormValues,
  type ContactFieldName,
  type ContactFormErrors,
  type ContactFormStatus,
  type ContactFormValues,
} from "./types";
import { validateContactField, validateContactForm } from "./validation";
import { HttpTimeoutError } from "../../shared/api/http";

const DEFAULT_ERROR_MESSAGE = "Запитването не беше изпратено. Моля, опитайте отново.";

const getFirstFieldError = (errors: ContactFormErrors) =>
  contactFieldNames.find((field) => errors[field]);

const focusField = (form: HTMLFormElement, field: ContactFieldName) => {
  const element = form.elements.namedItem(field);
  if (element instanceof HTMLElement) element.focus();
};

export function useContactRequestForm() {
  const [values, setValues] = useState<ContactFormValues>(emptyContactFormValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touchedFields, setTouchedFields] = useState<
    Partial<Record<ContactFieldName, boolean>>
  >({});
  const [status, setStatus] = useState<ContactFormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const isMounted = useRef(true);
  const isSubmitting = useRef(false);
  const requestController = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      isMounted.current = false;
      requestController.current?.abort();
    };
  }, []);

  const updateValue = (field: ContactFieldName, value: string) => {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));

    if (touchedFields[field]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [field]: validateContactField(field, value),
      }));
    }

    if (status !== "idle") {
      setStatus("idle");
      setStatusMessage("");
    }
  };

  const markTouched = (field: ContactFieldName) => {
    setTouchedFields((currentTouched) => ({ ...currentTouched, [field]: true }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: validateContactField(field, values[field]),
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting.current) return;

    const form = event.currentTarget;
    const validationErrors = validateContactForm(values);
    setTouchedFields(Object.fromEntries(contactFieldNames.map((field) => [field, true])));
    setErrors(validationErrors);

    const firstInvalidField = getFirstFieldError(validationErrors);
    if (firstInvalidField) {
      setStatus("error");
      setStatusMessage("Моля, коригирайте отбелязаните полета.");
      focusField(form, firstInvalidField);
      return;
    }

    const website = new FormData(form).get("website");
    const controller = new AbortController();

    isSubmitting.current = true;
    requestController.current = controller;
    setStatus("submitting");
    setStatusMessage("");

    try {
      const result = await submitContactRequest(
        values,
        typeof website === "string" ? website : "",
        controller.signal,
      );
      if (!isMounted.current) return;

      setValues(emptyContactFormValues);
      setErrors({});
      setTouchedFields({});
      setStatus("success");
      setStatusMessage(
        result === "sent"
          ? "Благодарим! Запитването е изпратено успешно. Ще се свържем с вас скоро."
          : "Отворихме вашето email приложение. Изпратете готовото съобщение, за да получим запитването ви.",
      );
    } catch (error) {
      if (!isMounted.current) return;

      if (error instanceof ContactRequestError && error.fieldErrors) {
        const serverErrors = error.fieldErrors;
        setErrors(serverErrors);
        setTouchedFields(
          Object.fromEntries(
            contactFieldNames
              .filter((field) => serverErrors[field])
              .map((field) => [field, true]),
          ),
        );

        const firstInvalidServerField = getFirstFieldError(serverErrors);
        if (firstInvalidServerField) focusField(form, firstInvalidServerField);
      }

      setStatus("error");
      setStatusMessage(
        error instanceof HttpTimeoutError
          ? "Връзката отне твърде дълго. Проверете интернет връзката и опитайте отново."
          : error instanceof Error
            ? error.message
            : DEFAULT_ERROR_MESSAGE,
      );
    } finally {
      if (requestController.current === controller) {
        requestController.current = null;
      }
      isSubmitting.current = false;
    }
  };

  return {
    values,
    errors,
    status,
    statusMessage,
    updateValue,
    markTouched,
    handleSubmit,
  };
}
