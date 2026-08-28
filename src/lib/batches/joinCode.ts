/**
 * Batch join codes (migration 0085). Pure — no I/O, unit-tested in
 * tests/batch-join-code.test.ts.
 *
 * The code is the second way into a batch, beside an emailed invite: a teacher
 * reads it out in class and students enter it themselves. That makes it a
 * string a human transcribes from a whiteboard onto a phone, so the alphabet
 * and the normaliser matter more than the generator does.
 */
// Web Crypto, NOT node:crypto — formatJoinCode is imported by the roster's
// client component, and a `node:` import there is an unbundleable scheme that
// fails the BUILD while passing typecheck. globalThis.crypto is available in
// both Node 19+ and the browser, which keeps this module genuinely isomorphic
// rather than splitting it the way src/lib/auth/credentials.ts had to be.

/**
 * Crockford base32 — digits plus uppercase letters, MINUS I, L, O and U.
 *
 * I/L/O are dropped because they are unreadable next to 1 and 0 in most fonts;
 * dropping them is what lets normalizeJoinCode map a mistyped O to 0 as a
 * REPAIR rather than a guess, since O can never legitimately appear. U is
 * dropped as well, which is the other half of Crockford's rationale: it keeps
 * accidental obscenities out of generated codes.
 */
export const JOIN_CODE_ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

/**
 * 8 characters over a 32-symbol alphabet ≈ 1.1e12 codes. Long enough that
 * guessing is not a route in (the join endpoint is rate-limited as well), short
 * enough to read aloud and type on a phone.
 */
export const JOIN_CODE_LENGTH = 8;

/** Confusables a student may type, mapped to what the alphabet actually uses. */
const CONFUSABLES: Record<string, string> = { I: "1", L: "1", O: "0" };

/**
 * A fresh code. Uses crypto randomness, not Math.random — a predictable code is
 * a way into a batch roster.
 *
 * Uniqueness is enforced by the DB (`batches.join_code` is UNIQUE), not here:
 * at 1.1e12 a collision is vanishingly unlikely, but "unlikely" is not a
 * constraint and the caller retries on conflict.
 */
export function generateJoinCode(): string {
  const bytes = new Uint8Array(JOIN_CODE_LENGTH);
  globalThis.crypto.getRandomValues(bytes);
  let out = "";
  for (const b of bytes) {
    // `% 32` is EXACTLY uniform here only because 32 divides 256 — there is no
    // modulo bias to reject-sample away. Changing the alphabet's length to
    // anything that does not divide 256 would silently reintroduce it.
    out += JOIN_CODE_ALPHABET[b % JOIN_CODE_ALPHABET.length];
  }
  return out;
}

/** "ABCD2345" → "ABCD-2345". Display only; never stored in this shape. */
export function formatJoinCode(code: string): string {
  const half = Math.floor(JOIN_CODE_LENGTH / 2);
  return `${code.slice(0, half)}-${code.slice(half)}`;
}

/**
 * Whatever the student typed → the canonical stored form, or null if it cannot
 * be one.
 *
 * Returns null rather than a best-effort partial: a code that is the wrong
 * length is a typo, and padding or truncating it would turn "you mistyped it"
 * into "that batch does not exist", which sends the student to their teacher
 * with the wrong question.
 */
export function normalizeJoinCode(input: string): string | null {
  if (typeof input !== "string") return null;

  // Strip anything that is not alphanumeric — the display dash, spaces, and
  // whatever a phone keyboard or a paste added.
  const stripped = input.toUpperCase().replace(/[^0-9A-Z]/g, "");
  if (stripped.length !== JOIN_CODE_LENGTH) return null;

  let out = "";
  for (const ch of stripped) {
    const mapped = CONFUSABLES[ch] ?? ch;
    if (!JOIN_CODE_ALPHABET.includes(mapped)) return null;
    out += mapped;
  }
  return out;
}
