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

/** The parts of a Supabase AuthError that signInErrorMessage reads. */
export type SignInError = { code?: string; status?: number; message?: string };

/**
 * What /login shows when a password sign-in fails.
 *
 * Supabase's own text ("Invalid login credentials") gives a student nothing to
 * do next: on 2026-10-08, 4 people failed 33 times and none got in, one of
 * them 25 times in 3 minutes. 92% of accounts sign in with Google, so a wrong
 * password most often means the wrong sign-in method, and the message says so.
 * Anything unrecognised passes through unchanged rather than being hidden.
 */
export function signInErrorMessage(error: SignInError): string {
  const message = error.message ?? "";
  if (error.code === "invalid_credentials" || /invalid login credentials/i.test(message)) {
    return "That email and password don't match. If you signed up with Google, use Continue with Google above.";
  }
  if (error.code === "email_not_confirmed" || /email not confirmed/i.test(message)) {
    return "Please confirm your email first. Check your inbox for the link we sent when you signed up.";
  }
  if (error.status === 429 || /rate limit/i.test(message)) {
    return "Too many tries. Wait a minute and try again, or use Continue with Google above.";
  }
  return message || "Could not sign in. Please try again.";
}
