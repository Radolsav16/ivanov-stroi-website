import { describe, expect, it } from "vitest";
import { validateContactField, validateContactForm } from "./validation";
import { emptyContactFormValues } from "./types";

const validValues = {
  name: "Иван Петров",
  phone: "+359 88 123 4567",
  email: "ivan@example.com",
  service: "Ремонт на баня",
  message: "Искам оглед и подробна оферта за ремонт на баня.",
};

describe("contact form validation", () => {
  it("accepts a valid Bulgarian contact request", () => {
    expect(validateContactForm(validValues)).toEqual({});
  });

  it("returns an error for every required empty field", () => {
    expect(validateContactForm(emptyContactFormValues)).toEqual({
      name: "Името е задължително поле.",
      phone: "Телефонът е задължителен.",
      email: "Email е задължително поле.",
      service: "Услугата е задължително поле.",
      message: "Съобщението е задължително поле.",
    });
  });

  it("rejects unsafe markup and malformed phone numbers", () => {
    expect(validateContactField("name", "<script>Иван</script>")).toBe(
      "Не използвайте HTML тагове.",
    );
    expect(validateContactField("phone", "1234")).toBe(
      "Въведете валиден български телефонен номер.",
    );
  });
});
