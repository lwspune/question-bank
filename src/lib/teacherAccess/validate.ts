/**
 * Pure validation for the public "request teacher access" lead form (no I/O).
 *
 * A prospective teacher hits the download gate on /browse, lands on
 * /request-access, and submits this. The POST /api/teacher-access route and the
 * client form both lean on this one validator so the rules can't drift.
 *
 * Rule: name is required, MOBILE is required (phone/WhatsApp is the primary
 * channel for coaching teachers — and it lets a lead be correlated to a student
 * account / quiz_lead by number later), email is optional, and DPDP consent must
 * be affirmatively true. Mobile is normalised to canonical `91XXXXXXXXXX` via the
 * shared normalizer. Empty optional fields collapse to null for a clean row.
 *
 * Unit-tested in tests/teacher-access.test.ts.
 */
import { normalizeMobile } from "@/lib/profile/mobile";

export type TeacherAccessInput = {
  name: string;
  institute?: string | null;
  email?: string | null;
  mobile?: string | null;
  city?: string | null;
  message?: string | null;
  consent: boolean;
};

/** The clean, persist-ready shape — mobile canonical (required), empties nulled. */
export type TeacherAccessClean = {
  name: string;
  institute: string | null;
  email: string | null;
  mobile: string;
  city: string | null;
  message: string | null;
  consent: true;
};

export type TeacherAccessField =
  | "name"
  | "institute"
  | "email"
  | "mobile"
  | "city"
  | "message"
  | "consent";

export type TeacherAccessValidation =
  | { ok: true; value: TeacherAccessClean }
  | { ok: false; field: TeacherAccessField; message: string };

const LIMITS = {
  name: 80,
  institute: 120,
  email: 160,
  city: 80,
  message: 1000,
} as const;

// Deliberately permissive — a full RFC email regex rejects valid addresses. We
// only guard against obvious junk; the real check is whether they reply.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(v: string | null | undefined): string | null {
  const t = String(v ?? "").trim();
  return t.length ? t : null;
}

export function validateTeacherAccessRequest(
  input: TeacherAccessInput
): TeacherAccessValidation {
  const name = clean(input.name);
  if (!name) {
    return { ok: false, field: "name", message: "Please enter your name." };
  }
  if (name.length > LIMITS.name) {
    return { ok: false, field: "name", message: "Name is too long." };
  }

  const institute = clean(input.institute);
  if (institute && institute.length > LIMITS.institute) {
    return { ok: false, field: "institute", message: "Institute name is too long." };
  }

  const rawEmail = clean(input.email);
  let email: string | null = null;
  if (rawEmail) {
    if (rawEmail.length > LIMITS.email || !EMAIL_RE.test(rawEmail)) {
      return { ok: false, field: "email", message: "Enter a valid email address." };
    }
    email = rawEmail.toLowerCase();
  }

  // Mobile is required — phone/WhatsApp is the primary channel for this audience.
  const mobile = normalizeMobile(input.mobile);
  if (!mobile) {
    return { ok: false, field: "mobile", message: "Enter a valid 10-digit mobile number." };
  }

  const city = clean(input.city);
  if (city && city.length > LIMITS.city) {
    return { ok: false, field: "city", message: "City name is too long." };
  }

  const message = clean(input.message);
  if (message && message.length > LIMITS.message) {
    return { ok: false, field: "message", message: "Message is too long (max 1000 characters)." };
  }

  if (input.consent !== true) {
    return { ok: false, field: "consent", message: "Please accept the consent to continue." };
  }

  return {
    ok: true,
    value: { name, institute, email, mobile, city, message, consent: true },
  };
}
