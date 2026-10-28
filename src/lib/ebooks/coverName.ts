/**
 * The buyer's name on an ebook's cover (2026-10-28, owner: "add
 * personalisation"). PURE. Spec: tests/ebook-cover-name.test.ts.
 *
 * The account's name is the default and the buyer may change it, because an
 * account name is not always the student's (a parent's account buying for a
 * child). The cover is written in Times Bold, a font every PDF reader carries
 * (lib/ebooks/stamp), so nothing is embedded; it draws Latin letters only, and
 * a name it cannot draw is refused here rather than printed as "???".
 *
 * Mirrored by the CHECK on ebook_purchases.print_name (migration 0201).
 */

export const MAX_PRINT_NAME = 40;

/**
 * Latin letters, accented ones included, then letters, spaces, dots,
 * apostrophes, hyphens. A dot ends an initial or a title ("Dr. A. K."), so one
 * followed straight by a letter (a web address) is refused.
 */
const NAME_RE = /^[A-Za-zÀ-ÖØ-öø-ÿ](?:[A-Za-zÀ-ÖØ-öø-ÿ '-]|\.(?=\s|$))*$/;

/** Trim, collapse spaces, and title-case a name typed all in capitals or all in small letters. */
export function tidyName(raw: string): string {
  const name = raw.trim().replace(/\s+/g, " ");
  if (name !== name.toUpperCase() && name !== name.toLowerCase()) return name;
  return name.toLowerCase().replace(/(^|[\s'-])(\p{L})/gu, (_, sep: string, ch: string) => sep + ch.toUpperCase());
}

export type PrintNameCheck = { ok: true; name: string } | { ok: false; error: string };

export function validatePrintName(raw: string): PrintNameCheck {
  const name = tidyName(raw);
  if (!name) return { ok: false, error: "Type the name to print on the cover." };
  if (name.length > MAX_PRINT_NAME) return { ok: false, error: `Keep the name to ${MAX_PRINT_NAME} characters.` };
  if (!NAME_RE.test(name)) return { ok: false, error: "Use English letters only: the cover cannot print other scripts, digits or symbols." };
  return { ok: true, name };
}

/** The name the cover prints: the buyer's choice, else the account's, else none (the stamp prints the email). */
export function coverName(args: { printName?: string | null; accountName?: string | null }): string | null {
  for (const raw of [args.printName, args.accountName]) {
    if (!raw) continue;
    const check = validatePrintName(raw);
    if (check.ok) return check.name;
  }
  return null;
}

/** The name a sign-up stored on the account: Google's `full_name`, else `name`. */
export function accountNameOf(meta: Record<string, unknown> | null | undefined): string | null {
  for (const v of [meta?.full_name, meta?.name]) if (typeof v === "string" && v.trim()) return v;
  return null;
}
