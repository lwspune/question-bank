import { describe, it, expect } from "vitest";
import { validateContactMessage } from "@/lib/contact/validate";
import { buildContactNotification } from "@/lib/contact/service";

/**
 * Pure validation for the public /about contact form.
 *
 * WHY THIS FORM EXISTS: `pyqvault.com` has no MX record, so every `mailto:` on
 * the site depends on an inbox that may or may not accept mail. This form does
 * not depend on email delivery at all — it writes a row. That makes it the one
 * contact channel that cannot silently swallow a message.
 *
 * The rules differ DELIBERATELY from the teacher-access lead form (which shares
 * this shape otherwise): there, MOBILE is required and email optional, because
 * coaching teachers are phone-first and the number is the lead. Here EMAIL is
 * required and phone optional — the sender is usually a student reporting a
 * wrong answer, email is the channel we would reply on, and demanding a phone
 * number for a correction costs us the correction.
 */
describe("validateContactMessage", () => {
  const ok = {
    name: "Asha Kulkarni",
    email: "asha@example.com",
    phone: "9876543210",
    message: "Q14 of NDA 2023 Maths has the wrong key — it should be C.",
  };

  it("accepts a complete submission", () => {
    const v = validateContactMessage(ok);
    expect(v.ok).toBe(true);
    if (v.ok) {
      expect(v.value.name).toBe("Asha Kulkarni");
      expect(v.value.email).toBe("asha@example.com");
      expect(v.value.message).toContain("wrong key");
    }
  });

  it("normalises the phone to canonical 91XXXXXXXXXX", () => {
    const v = validateContactMessage({ ...ok, phone: "+91 98765 43210" });
    expect(v.ok).toBe(true);
    if (v.ok) expect(v.value.phone).toBe("919876543210");
  });

  it("treats phone as OPTIONAL — a correction should not need one", () => {
    const v = validateContactMessage({ ...ok, phone: "" });
    expect(v.ok).toBe(true);
    if (v.ok) expect(v.value.phone).toBeNull();
  });

  it("rejects a phone that is present but not a plausible Indian mobile", () => {
    // Silently nulling a typo'd number would lose a reply channel the sender
    // believed they had given us.
    const v = validateContactMessage({ ...ok, phone: "12345" });
    expect(v.ok).toBe(false);
    if (!v.ok) expect(v.field).toBe("phone");
  });

  it("requires a name", () => {
    const v = validateContactMessage({ ...ok, name: "   " });
    expect(v.ok).toBe(false);
    if (!v.ok) expect(v.field).toBe("name");
  });

  it("requires an email, because it is the reply channel", () => {
    const v = validateContactMessage({ ...ok, email: "" });
    expect(v.ok).toBe(false);
    if (!v.ok) expect(v.field).toBe("email");
  });

  it("rejects an obviously malformed email", () => {
    const v = validateContactMessage({ ...ok, email: "asha@@example" });
    expect(v.ok).toBe(false);
    if (!v.ok) expect(v.field).toBe("email");
  });

  it("lowercases the email so the same sender does not split into two rows", () => {
    const v = validateContactMessage({ ...ok, email: "Asha@Example.COM" });
    expect(v.ok).toBe(true);
    if (v.ok) expect(v.value.email).toBe("asha@example.com");
  });

  it("requires a message", () => {
    const v = validateContactMessage({ ...ok, message: "  " });
    expect(v.ok).toBe(false);
    if (!v.ok) expect(v.field).toBe("message");
  });

  it("rejects an over-long message rather than truncating it", () => {
    const v = validateContactMessage({ ...ok, message: "x".repeat(2001) });
    expect(v.ok).toBe(false);
    if (!v.ok) expect(v.field).toBe("message");
  });

  it("rejects an over-long name", () => {
    const v = validateContactMessage({ ...ok, name: "x".repeat(81) });
    expect(v.ok).toBe(false);
    if (!v.ok) expect(v.field).toBe("name");
  });

  it("trims surrounding whitespace on every field", () => {
    const v = validateContactMessage({
      name: "  Asha  ",
      email: "  asha@example.com ",
      phone: " 9876543210 ",
      message: "  hello  ",
    });
    expect(v.ok).toBe(true);
    if (v.ok) {
      expect(v.value.name).toBe("Asha");
      expect(v.value.email).toBe("asha@example.com");
      expect(v.value.message).toBe("hello");
    }
  });

  it("REJECTS a filled honeypot — a human never sees that field", () => {
    // Rate-limiting alone does not stop a bot that submits once. The honeypot
    // is checked here, in the shared validator, so the route and the form can
    // never disagree about what counts as spam.
    const v = validateContactMessage({ ...ok, website: "http://spam.example" });
    expect(v.ok).toBe(false);
    if (!v.ok) expect(v.field).toBe("website");
  });

  it("accepts an absent or empty honeypot", () => {
    expect(validateContactMessage({ ...ok, website: "" }).ok).toBe(true);
    expect(validateContactMessage({ ...ok, website: null }).ok).toBe(true);
  });
});

describe("buildContactNotification", () => {
  const value = {
    name: "Asha",
    email: "asha@example.com",
    phone: "919876543210",
    message: "Q14 key looks wrong",
  };

  it("names the sender in the subject so the inbox is scannable", () => {
    expect(buildContactNotification(value).subject).toContain("Asha");
  });

  it("carries the message body in both text and html", () => {
    const n = buildContactNotification(value);
    expect(n.text).toContain("Q14 key looks wrong");
    expect(n.html).toContain("Q14 key looks wrong");
  });

  it("omits the phone line entirely when there is no phone", () => {
    const n = buildContactNotification({ ...value, phone: null });
    expect(n.text).not.toContain("Phone:");
  });

  it("ESCAPES user-controlled content in the html body", () => {
    // Every field here is attacker-controlled and lands in an HTML email.
    const n = buildContactNotification({
      ...value,
      name: '<img src=x onerror="alert(1)">',
      message: "<script>alert(2)</script>",
    });
    expect(n.html).not.toContain("<script>");
    expect(n.html).not.toContain("<img");
    expect(n.html).toContain("&lt;script&gt;");
  });
});
