/**
 * Mask what identifies a student in a question they typed to V, before it is
 * stored. Typed questions are kept indefinitely (owner, 2026-10-09) and read
 * by staff, so an email address or an Indian mobile number never reaches the
 * table. Exam years, question numbers and marks are left alone. Pure.
 * Spec: tests/chat-mask-personal.test.ts.
 */

const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;

// An Indian mobile: 10 digits starting 6-9, optionally after +91, 91 or 0,
// with an optional space or hyphen in the usual places. Not part of a longer
// run of digits.
const PHONE = /(?<!\d)(?:\+?91[\s-]?|0)?[6-9]\d{4}[\s-]?\d{5}(?!\d)/g;

export function maskPersonal(text: string): string {
  return text.replace(EMAIL, "[email]").replace(PHONE, "[phone]");
}
