/**
 * Pure helpers for batch invites (migration 0084). No I/O — unit-tested in
 * tests/batch-invites.test.ts.
 *
 * The service layer (invitesAdmin.ts) does the DB + email work; everything
 * here is the parsing and state derivation that has to be identical between
 * the teacher's preview ("we'll invite these 23") and what actually gets
 * written, so the two can never disagree.
 */
import { isValidEmail } from "@/lib/auth/credentials";

/**
 * One paste, one cap. A class list is tens of addresses; anything past this is
 * a mistake or an attempt to fan out mail, and either way the teacher should
 * see it refused rather than silently sent.
 */
export const MAX_INVITES_PER_REQUEST = 200;

export type ParsedInvites = {
  /** Normalised (lowercase, trimmed), deduped, first-seen order. */
  valid: string[];
  /** Kept AS TYPED — the teacher needs to recognise their own typo. */
  invalid: string[];
  /** How many valid addresses were dropped by the cap. */
  overflow: number;
};

/**
 * Turn a pasted block into a clean invite list.
 *
 * Lowercasing is not cosmetic: `batch_invites.email` carries a
 * `CHECK (email = lower(email))`, and accept matches on the normalised form.
 * An invite stored with any uppercase would be matched by nothing and sit
 * pending forever while looking sent.
 */
export function parseInviteEmails(raw: string): ParsedInvites {
  const valid: string[] = [];
  const invalid: string[] = [];
  const seen = new Set<string>();
  let overflow = 0;

  for (const rawToken of (raw ?? "").split(/[\n,;]+/)) {
    const token = rawToken.trim();
    if (!token) continue;

    // Spreadsheet and mail-client paste wraps addresses in quotes or angle
    // brackets; strip those before validating so a good address is not
    // reported back to the teacher as a typo.
    const cleaned = token.replace(/^[<"'\s]+|[>"'\s]+$/g, "");
    if (!cleaned) continue;

    if (!isValidEmail(cleaned)) {
      invalid.push(token);
      continue;
    }
    const normalised = cleaned.toLowerCase();
    if (seen.has(normalised)) continue;
    seen.add(normalised);

    if (valid.length >= MAX_INVITES_PER_REQUEST) {
      overflow += 1;
      continue;
    }
    valid.push(normalised);
  }

  return { valid, invalid, overflow };
}

export type InviteStatus = "pending" | "accepted" | "declined" | "revoked";
export type InviteState = InviteStatus | "expired";

/**
 * Display state for one invite row.
 *
 * `expired` is DERIVED, never stored — nothing sweeps the table, so a pending
 * row simply stops being actionable once `expires_at` passes. A row that has
 * already been resolved keeps its own status regardless of expiry, or an
 * accepted invite would start reporting as expired and contradict the roster
 * it produced.
 */
export function inviteState(
  row: { status: string; expiresAt: string },
  now: number
): InviteState {
  if (row.status !== "pending") return row.status as InviteStatus;
  return Date.parse(row.expiresAt) <= now ? "expired" : "pending";
}
