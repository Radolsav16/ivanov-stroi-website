import { z } from "zod";

const containsUnsafeMarkup = (value) => /[<>]/.test(value);
const hasControlCharacters = (value) =>
  Array.from(value).some((character) => {
    const code = character.charCodeAt(0);
    return code < 32 && ![9, 10, 13].includes(code);
  });

const cleanText = (label, min, max) =>
  z
    .string({ error: `${label} е задължително поле.` })
    .trim()
    .min(min, `${label} трябва да съдържа поне ${min} символа.`)
    .max(max, `${label} е твърде дълго.`)
    .refine((value) => !containsUnsafeMarkup(value), "Не използвайте HTML тагове.")
    .refine((value) => !hasControlCharacters(value), "Полето съдържа невалидни символи.");

const normalizePhone = (value) => value.replace(/[\s().-]/g, "");

export const contactRequestSchema = z
  .object({
    name: cleanText("Името", 2, 80).refine(
      (value) => /^[\p{L}][\p{L}\p{M}' -]*$/u.test(value),
      "Въведете валидно име.",
    ),
    phone: z
      .string({ error: "Телефонът е задължителен." })
      .trim()
      .transform(normalizePhone)
      .refine(
        (value) => /^(?:\+359|359|0)\d{8,9}$/.test(value),
        "Въведете валиден български телефонен номер.",
      ),
    email: z
      .string({ error: "Email е задължителен." })
      .trim()
      .toLowerCase()
      .email("Въведете валиден email адрес.")
      .max(254, "Email адресът е твърде дълъг."),
    service: cleanText("Услугата", 2, 120),
    message: cleanText("Съобщението", 20, 2000),
    website: z.string().max(0, "Невалидна заявка.").optional().default(""),
  })
  .strict();
