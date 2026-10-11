/**
 * A pass perk quotes a free limit through a placeholder ("free: {reveals} a
 * day"), filled from paywall_settings when the plans are read. Typed numbers
 * drifted: on 2026-10-11 the answer limit went 50 -> 30 while /pricing still
 * said 50. The admin editor keeps the placeholder; every public read fills it.
 *
 * A perk is HIDDEN when a limit it quotes is off ("unlimited answers" sells
 * nothing when answers are unlimited for everyone), when the limits could not
 * be read, or when it names an unknown placeholder. A raw "{reveals}" never
 * reaches a student. Spec: tests/perk-limits.test.ts.
 */

export const PERK_PLACEHOLDERS = [
  "reveals",
  "drill",
  "saves",
  "mocks",
  "chapterTests",
  "projectionDays",
  "papersPerDay",
] as const;
export type PerkPlaceholder = (typeof PERK_PLACEHOLDERS)[number];

/** null = that limit is off. */
export type FreeLimits = Record<PerkPlaceholder, number | null>;

const KNOWN: ReadonlySet<string> = new Set(PERK_PLACEHOLDERS);
const TOKEN_RE = /\{([A-Za-z]+)\}/g;

function placeholdersIn(perk: string): string[] {
  return Array.from(perk.matchAll(TOKEN_RE), (m) => m[1]);
}

/** The placeholders in `perk` that no limit answers to, for the admin's error. */
export function unknownPerkPlaceholders(perk: string): string[] {
  return placeholdersIn(perk).filter((name) => !KNOWN.has(name));
}

export function fillPerks(perks: readonly string[], limits: FreeLimits | null): string[] {
  const out: string[] = [];
  for (const perk of perks) {
    const names = placeholdersIn(perk);
    if (names.length === 0) {
      out.push(perk);
      continue;
    }
    if (!limits) continue;
    const values = names.map((name) => (KNOWN.has(name) ? limits[name as PerkPlaceholder] : null));
    if (values.some((v) => v === null)) continue;
    out.push(perk.replace(TOKEN_RE, (_, name: string) => limits[name as PerkPlaceholder]!.toLocaleString("en-IN")));
  }
  return out;
}
