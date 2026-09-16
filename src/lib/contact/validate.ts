/**
 * Pure validation for the public /about contact form (no I/O).
 *
 * The POST /api/contact route and the client form both lean on this one
 * validator so the rules — including what counts as spam — cannot drift.
 *
 * WHY A FORM AND NOT A `mailto:`: pyqvault.com has no MX record, so a `mailto:`
 * on a public page rests on an inbox that may not accept mail; measured
 * 2026-09-16, mail to hello@ bounces outright. A row in `contact_messages`
 * (migration 0102) does not depend on email delivery at all, so a correction
 * from someone holding the actual paper cannot be silently lost.
 *
 * THE RULES DIFFER FROM `teacherAccess/validate` ON PURPOSE. There, mobile is
 * required and email optional: that audience is coaching teachers, phone is the
 * channel, and the number IS the lead. Here the sender is usually a student
 * reporting a wrong answer — email is how we would reply, and demanding a phone
 * number for a correction costs us the correction. So: email required, phone
 * optional but validated when given.
 *
 * Unit-tested in tests/contact-message.test.ts.
 */
import { normalizeMobile } from "@/lib/profile/mobile";

export type ContactMessageInput = {
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  /**
   * Honeypot. Rendered hidden and never filled by a human, so any value at all
   * means a bot. Checked HERE rather than in the route so the form and the
   * server can never disagree about what is spam.
   */
  website?: string | null;
};

/** The clean, persist-ready shape — phone canonical or null, empties nulled. */
export type ContactMessageClean = {
  name: string;
  email: string;
  phone: string | null;
  message: string;
};

export type ContactMessageField = "name" | "email" | "phone" | "message" | "website";

export type ContactMessageValidation =
  | { ok: true; value: ContactMessageClean }
  | { ok: false; field: ContactMessageField; message: string };

const LIMITS = {
  name: 80,
  email: 160,
  message: 2000,
} as const;

// Deliberately permissive — a full RFC email regex rejects valid addresses. We
// only guard against obvious junk; the real check is whether they reply.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(v: string | null | undefined): string | null {
  const t = String(v ?? "").trim();
  return t.length ? t : null;
}

export function validateContactMessage(
  input: ContactMessageInput
): ContactMessageValidation {
  // Honeypot first: a bot submission should cost us nothing else.
  if (clean(input.website)) {
    return { ok: false, field: "website", message: "Submission rejected." };
  }

  const name = clean(input.name);
  if (!name) {
    return { ok: false, field: "name", message: "Please enter your name." };
  }
  if (name.length > LIMITS.name) {
    return { ok: false, field: "name", message: "Name is too long." };
  }

  const rawEmail = clean(input.email);
  if (!rawEmail) {
    return { ok: false, field: "email", message: "Please enter your email so we can reply." };
  }
  if (rawEmail.length > LIMITS.email || !EMAIL_RE.test(rawEmail)) {
    return { ok: false, field: "email", message: "Enter a valid email address." };
  }
  const email = rawEmail.toLowerCase();

  // Optional — but if they typed something, it must be usable. Silently nulling
  // a typo'd number would lose a reply channel they believed they had given us.
  let phone: string | null = null;
  if (clean(input.phone)) {
    phone = normalizeMobile(input.phone);
    if (!phone) {
      return { ok: false, field: "phone", message: "Enter a valid 10-digit mobile number, or leave it blank." };
    }
  }

  const message = clean(input.message);
  if (!message) {
    return { ok: false, field: "message", message: "Please write a message." };
  }
  if (message.length > LIMITS.message) {
    return {
      ok: false,
      field: "message",
      message: `Message is too long (max ${LIMITS.message} characters).`,
    };
  }

  return { ok: true, value: { name, email, phone, message } };
}

export const CONTACT_MESSAGE_MAX = LIMITS.message;
export const CONTACT_NAME_MAX = LIMITS.name;
export const CONTACT_EMAIL_MAX = LIMITS.email;
