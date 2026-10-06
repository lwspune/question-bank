/**
 * Pure helpers for "Create student logins" on a batch roster. No I/O, and safe
 * in the browser: the roster card generates passwords and builds the
 * credentials sheet client-side, the route re-parses the same paste server-side.
 * Unit-tested in tests/student-logins.test.ts.
 *
 * The service that creates the accounts is studentLoginsAdmin.ts.
 */
import { isValidEmail, isValidPassword, MIN_PASSWORD_LENGTH } from "@/lib/auth/credentials";

/** A class list is tens of rows; each row is one account create (~0.3 s). */
export const MAX_STUDENT_LOGINS_PER_REQUEST = 100;

export const LOGIN_URL = "https://www.pyqvault.com/login";

/**
 * Teachers read these out or copy them onto a slip, so the characters that get
 * misread (0/O, 1/l/I) are left out.
 */
export const PASSWORD_ALPHABET = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const GENERATED_LENGTH = 10;

export type StudentLine = { name: string; email: string; password: string | null };

export type ParsedStudentLines = {
  valid: StudentLine[];
  /** Kept as typed, so the teacher recognises their own line. */
  invalid: { line: string; reason: string }[];
  overflow: number;
};

/**
 * One student per line: `name, email` or `email, name`, optionally followed by
 * a password. Commas or tabs (a spreadsheet paste) both separate columns.
 */
export function parseStudentLines(raw: string): ParsedStudentLines {
  const valid: StudentLine[] = [];
  const invalid: ParsedStudentLines["invalid"] = [];
  const seen = new Set<string>();
  let overflow = 0;

  for (const rawLine of (raw ?? "").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;
    // A tab means spreadsheet columns (or the one-student form), where a comma
    // can sit inside a name; otherwise commas separate.
    const cols = line
      .split(rawLine.includes("\t") ? "\t" : ",")
      .map((c) => c.trim().replace(/^["']|["']$/g, ""));
    const emailIdx = cols.findIndex((c) => c.includes("@"));
    if (emailIdx === -1) {
      invalid.push({ line, reason: "No email address on this line" });
      continue;
    }
    const email = cols[emailIdx];
    if (!isValidEmail(email)) {
      invalid.push({ line, reason: "Email address is not valid" });
      continue;
    }
    // The name is the first other column; anything after it is the password.
    const rest = cols.filter((_, i) => i !== emailIdx);
    const name = rest[0] ?? "";
    if (!name) {
      invalid.push({ line, reason: "Name is missing" });
      continue;
    }
    const password = rest[1] ? rest[1] : null;
    if (password !== null && !isValidPassword(password)) {
      invalid.push({ line, reason: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` });
      continue;
    }
    const normalised = email.toLowerCase();
    if (seen.has(normalised)) continue;
    seen.add(normalised);
    if (valid.length >= MAX_STUDENT_LOGINS_PER_REQUEST) {
      overflow += 1;
      continue;
    }
    valid.push({ name, email: normalised, password });
  }
  return { valid, invalid, overflow };
}

/** A random password from PASSWORD_ALPHABET, without modulo bias. */
export function generatePassword(length = GENERATED_LENGTH): string {
  const n = PASSWORD_ALPHABET.length;
  const limit = 256 - (256 % n);
  let out = "";
  const buf = new Uint8Array(length * 2);
  while (out.length < length) {
    globalThis.crypto.getRandomValues(buf);
    for (const b of buf) {
      if (b < limit) out += PASSWORD_ALPHABET[b % n];
      if (out.length === length) break;
    }
  }
  return out;
}

export type Credential = { name: string; email: string; password: string };

function csvCell(value: string): string {
  // A leading = + - @ makes a spreadsheet run the cell as a formula.
  const safe = /^[=+\-@]/.test(value) ? `'${value}` : value;
  return /[",\r\n]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
}

export function credentialsCsv(rows: Credential[]): string {
  const lines = [["Name", "Email", "Password", "Sign in at"]];
  for (const r of rows) lines.push([r.name, r.email, r.password, LOGIN_URL]);
  return lines.map((l) => l.map(csvCell).join(",")).join("\r\n") + "\r\n";
}

/** Ready to paste into WhatsApp: one block per student. */
export function credentialsText(rows: Credential[]): string {
  return rows
    .map((r) => `${r.name}\nEmail: ${r.email}\nPassword: ${r.password}\nSign in: ${LOGIN_URL}`)
    .join("\n\n");
}
