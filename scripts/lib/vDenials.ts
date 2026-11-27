/**
 * The weekly gap list's classifier (`npm run v:denials`, 2026-11-27). V's
 * facts are written by hand, and a fact nobody wrote turned into a "no": in
 * 30 days V denied, or said it had no information about, the app, offline
 * classes, renewal, Ask a parent to pay, Sign out, the homework section and a
 * student's own upgrade price. Each was found only when someone happened to
 * read the chat. This finds them every week.
 *
 * Triage, not a verdict: a flagged reply may be a true "no" (a pass length we
 * do not sell). Pure.
 */

export type DenialKind = "denies" | "no-info";

/** V saying something of OURS does not exist. */
const DENIES: readonly RegExp[] = [
  /\bPYQ Vault (has|offers|sells) no\b/i,
  /\bthere (is|are) no [^.?!]{0,40}\b(section|page|feature|pass|plan|option|button|tab|course|discount|offer|app|class(es)?|subscription)\b/i,
  /\bwe (do not|don't|doesn't) (have|offer|sell|provide)\b/i,
];

/** V saying it knows nothing about the product. */
const NO_INFO: readonly RegExp[] = [
  /\bI (do not|don't) have (any )?(information|info|details)\b/i,
  /\bI have no (information|details)\b/i,
];

/** True answers V gives on purpose: a missing solution, an exam we do not cover, a screen it cannot see. */
const ON_PURPOSE: readonly RegExp[] = [/\bworked solution\b/i, /\bnot on PYQ Vault yet\b/i, /\bcan(no|')t see\b/i];

function sentences(text: string): string[] {
  return text.split(/(?<=[.?!])\s+|\n+/).filter((s) => s.trim() !== "");
}

/**
 * "denies", "no-info" or null for one reply. Read sentence by sentence: a
 * sentence that goes on with "but" ("There is no app in the Play Store, but the
 * site installs like one") answers the question rather than denying it.
 */
export function denialKind(reply: string): DenialKind | null {
  let found: DenialKind | null = null;
  for (const s of sentences(reply)) {
    if (ON_PURPOSE.some((r) => r.test(s)) || /,\s*but\b/i.test(s)) continue;
    if (DENIES.some((r) => r.test(s))) return "denies";
    if (!found && NO_INFO.some((r) => r.test(s))) found = "no-info";
  }
  return found;
}
