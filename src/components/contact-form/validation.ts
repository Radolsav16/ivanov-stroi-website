import type {
  ContactFieldName,
  ContactFormErrors,
  ContactFormValues,
} from "./types";

const hasUnsafeMarkup = (value: string) => /[<>]/.test(value);

const hasControlCharacters = (value: string) =>
  Array.from(value).some((character) => {
    const code = character.charCodeAt(0);
    return code < 32 && ![9, 10, 13].includes(code);
  });

const normalizePhone = (value: string) => value.replace(/[\s().-]/g, "");

const validateText = (
  value: string,
  { label, min, max }: { label: string; min: number; max: number },
) => {
  const cleanValue = value.trim();

  if (!cleanValue) return `${label} е задължително поле.`;
  if (cleanValue.length < min) return `${label} трябва да съдържа поне ${min} символа.`;
  if (cleanValue.length > max) return `${label} е твърде дълго.`;
  if (hasUnsafeMarkup(cleanValue)) return "Не използвайте HTML тагове.";
  if (hasControlCharacters(cleanValue)) return "Полето съдържа невалидни символи.";

  return undefined;
};

export const validateContactField = (
  field: ContactFieldName,
  value: string,
) => {
  switch (field) {
    case "name": {
      const textError = validateText(value, { label: "Името", min: 2, max: 80 });
      if (textError) return textError;

      return /^[\p{L}][\p{L}\p{M}' -]*$/u.test(value.trim())
        ? undefined
        : "Въведете валидно име.";
    }
    case "phone": {
      const phone = normalizePhone(value.trim());
      if (!phone) return "Телефонът е задължителен.";

      return /^(?:\+359|359|0)\d{8,9}$/.test(phone)
        ? undefined
        : "Въведете валиден български телефонен номер.";
    }
    case "email": {
      const email = value.trim();
      if (!email) return "Email е задължително поле.";
      if (email.length > 254) return "Email адресът е твърде дълъг.";

      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? undefined
        : "Въведете валиден email адрес.";
    }
    case "service":
      return validateText(value, { label: "Услугата", min: 2, max: 120 });
    case "message":
      return validateText(value, { label: "Съобщението", min: 20, max: 2000 });
  }
};

export const validateContactForm = (values: ContactFormValues) => {
  const errors: ContactFormErrors = {};

  for (const field of Object.keys(values) as ContactFieldName[]) {
    const error = validateContactField(field, values[field]);
    if (error) errors[field] = error;
  }

  return errors;
};
