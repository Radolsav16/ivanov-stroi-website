import assert from "node:assert/strict";
import test from "node:test";
import { contactRequestSchema } from "./validation.js";

const validRequest = {
  name: "Иван Петров",
  phone: "+359 88 123 4567",
  email: "IVAN@example.com",
  service: "Цялостен ремонт",
  message: "Искам оглед и подробна оферта за цялостен ремонт на апартамент.",
  website: "",
};

test("accepts and normalizes a valid contact request", () => {
  const result = contactRequestSchema.safeParse(validRequest);

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.phone, "+359881234567");
    assert.equal(result.data.email, "ivan@example.com");
  }
});

test("rejects malformed or unsafe fields", () => {
  const result = contactRequestSchema.safeParse({
    ...validRequest,
    name: "<script>alert(1)</script>",
    phone: "1234",
    message: "Кратко",
    website: "bot-filled",
  });

  assert.equal(result.success, false);
  if (!result.success) {
    assert.ok(result.error.issues.length >= 4);
  }
});
