export const contactFieldNames = [
  "name",
  "phone",
  "email",
  "service",
  "message",
] as const;

export type ContactFieldName = (typeof contactFieldNames)[number];

export type ContactFormValues = Record<ContactFieldName, string>;

export type ContactFormErrors = Partial<Record<ContactFieldName, string>>;

export type ContactFormStatus = "idle" | "submitting" | "success" | "error";

export const emptyContactFormValues: ContactFormValues = {
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
};
