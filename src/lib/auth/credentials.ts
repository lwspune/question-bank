/**
 * Client-safe credential validators.
 *
 * Lives apart from src/lib/members/admin.ts (which imports the service-role
 * client at module top) so the public /signup page can validate input without
 * pulling admin/service-role code into the browser bundle.
 *
 * members/admin.ts re-exports these for back-compat.
 */

export const MIN_PASSWORD_LENGTH = 8;

export function isValidEmail(value: string): boolean {
  // Permissive RFC-ish check — Supabase auth does its own canonical
  // validation and will reject anything stricter at create time.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidPassword(value: string): boolean {
  return typeof value === "string" && value.length >= MIN_PASSWORD_LENGTH;
}

export type SignupInput = {
  email: string;
  password: string;
  confirm: string;
};

export type SignupValidation =
  | { ok: true }
  | { ok: false; field: "email" | "password" | "confirm"; message: string };

/**
 * Validates a signup form. Checks in field order (email → password → confirm)
 * so the first surfaced error is the topmost field, and returns a typed
 * field + human-readable message the form can render inline.
 */
export function validateSignup(input: SignupInput): SignupValidation {
  if (!isValidEmail(input.email)) {
    return { ok: false, field: "email", message: "Enter a valid email address." };
  }
  if (!isValidPassword(input.password)) {
    return {
      ok: false,
      field: "password",
      message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
    };
  }
  if (input.password !== input.confirm) {
    return { ok: false, field: "confirm", message: "Passwords don't match." };
  }
  return { ok: true };
}
