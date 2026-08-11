/**
 * Pure core for the local database backup (`npm run db:backup`).
 *
 * WHY THIS EXISTS. A meaningful slice of this bank exists ONLY in the database.
 * The recent ingestion pipelines commit their source JSON, but the NDA and
 * MHT-CET corpora came from Excel uploads that are not in the repo, the 13
 * subject taxonomy cleanup was done as inline SQL in chat, and the ~235
 * wrong-key flips were applied to rows rather than to files. On top of that,
 * roughly 15,500 operational rows — mock attempts, paper contents, review
 * provenance, student profiles, quiz leads — have no source anywhere else.
 *
 * THE THREAT MODEL IS US, NOT SUPABASE. This project's own history is a list of
 * near-misses from bulk writes: an unscoped prune that would have deleted the
 * whole Physics NCERT spine, a derive script that would have destroyed 4,315
 * hand-authored rows without its --force guard, a scan-flip that published rows
 * from another pass, a dump script that silently destroyed filled-in verdicts.
 * Every one was caught by a guard or by luck. So the backup that matters is the
 * one taken BEFORE a risky script runs, which is why this is a command you can
 * type as well as a weekly scheduled task.
 *
 * WHY pg_dump AND NOT A HAND-ROLLED EXPORT. Reading every table through
 * PostgREST would hit the 1000-row cap that has bitten this codebase five times
 * — and it fails SILENTLY, producing a backup holding 2% of the bank that looks
 * fine. It also cannot reach the `auth` schema at all, so the 102 user accounts
 * would be absent and every row keyed to them would restore orphaned. pg_dump
 * has neither problem: it reads from one snapshot, fails loudly, and covers
 * `auth`.
 */

/** Filename prefix for every artifact this script writes. */
export const BACKUP_PREFIX = "pyqvault";

/**
 * `<prefix>-YYYYMMDD-HHMM.<ext>` — the stamp is fixed-width so a plain
 * lexicographic sort is chronological, and colon-free because Windows forbids
 * `:` in filenames.
 */
const STAMP_RE = new RegExp(`^${BACKUP_PREFIX}-(\\d{8}-\\d{4})\\.`);

const pad = (n: number, width = 2) => String(n).padStart(width, "0");

/**
 * The run stamp for a moment in time.
 *
 * UTC, deliberately: it is unambiguous and immune to DST, and the ordering
 * property that retention depends on cannot be broken by a clock shift. The
 * CLI prints local time in its console output, so the human-facing message
 * stays intuitive even though the filename does not.
 */
export function runStamp(when: Date): string {
  return (
    `${when.getUTCFullYear()}${pad(when.getUTCMonth() + 1)}${pad(when.getUTCDate())}` +
    `-${pad(when.getUTCHours())}${pad(when.getUTCMinutes())}`
  );
}

/** The run a filename belongs to, or null if this is not one of our artifacts. */
export function parseRunStamp(filename: string): string | null {
  return STAMP_RE.exec(filename)?.[1] ?? null;
}

export interface RetentionPlan {
  /** Run stamps being kept, newest first. */
  keepStamps: string[];
  /** Files to delete — every artifact of every run that fell off the end. */
  removeFiles: string[];
}

/**
 * Decide which backup files to keep and which to delete.
 *
 * THREE SAFETY PROPERTIES, all spec'd in tests/backup-retention.test.ts:
 *
 *  1. A file whose name this cannot parse is NEVER returned for deletion. This
 *     code runs unattended against a directory on your disk; anything it does
 *     not recognise — a note, a manual export, a stray — is not its business.
 *  2. It always keeps at least one run, whatever it is asked. A miscomputed
 *     `keep` of 0 must not be the reason every backup is deleted.
 *  3. A limit that is not a real number keeps EVERYTHING. `--keep=abc` parses
 *     to NaN, and `Math.max(1, NaN)` is NaN, and `slice(0, NaN)` is empty — so
 *     the naive version of this function marks every backup for deletion on a
 *     typo. Every degenerate input must fail towards keeping data.
 *
 * Retention is by RUN, not by file, so a run's dump, schema and manifest always
 * live or die together and you can never keep a manifest describing a dump that
 * is gone.
 */
export function planRetention(filenames: string[], keep: number): RetentionPlan {
  const stamps = [...new Set(filenames.map(parseRunStamp).filter((s): s is string => s !== null))]
    .sort()
    .reverse();

  // Not a usable number (NaN, Infinity) → keep everything. See property 3.
  const limit = Number.isFinite(keep) ? Math.max(1, Math.floor(keep)) : stamps.length;
  const keepStamps = stamps.slice(0, limit);
  const kept = new Set(keepStamps);

  const removeFiles = filenames.filter((f) => {
    const stamp = parseRunStamp(f);
    return stamp !== null && !kept.has(stamp);
  });

  return { keepStamps, removeFiles };
}

/**
 * Live tables absent from the dump's table-of-contents.
 *
 * This is the guard against the failure that degrades silently: a future
 * migration adds a table, nothing tells the backup about it, and it is missing
 * from every dump thereafter. Comparing against the live catalogue on each run
 * means the backup cannot quietly fall behind the schema.
 */
export function missingTables(live: string[], dumped: string[]): string[] {
  const have = new Set(dumped);
  return live.filter((t) => !have.has(t));
}

export interface DumpAssessment {
  /** Size of the dump file on disk. */
  bytes: number;
  /** Floor below which the dump is assumed broken rather than merely small. */
  minBytes: number;
  /** Live tables absent from the dump (see `missingTables`). */
  missing: string[];
  /** pg_dump's exit code. */
  exitCode: number;
}

/**
 * Everything wrong with a finished dump, as human-readable lines.
 *
 * Returns ALL problems rather than stopping at the first, so one run tells you
 * the whole story. An empty array means the dump is accepted; the caller
 * refuses to keep a dump that fails any check, because a bad backup you trust
 * is worse than no backup at all.
 */
export function dumpProblems({ bytes, minBytes, missing, exitCode }: DumpAssessment): string[] {
  const problems: string[] = [];

  if (exitCode !== 0) {
    problems.push(`pg_dump exited with code ${exitCode}`);
  }
  if (bytes < minBytes) {
    problems.push(
      `dump is suspiciously small: ${bytes.toLocaleString()} bytes ` +
        `(expected at least ${minBytes.toLocaleString()})`
    );
  }
  if (missing.length > 0) {
    problems.push(
      `${missing.length} live table(s) missing from the dump: ${missing.slice(0, 5).join(", ")}` +
        (missing.length > 5 ? ` … and ${missing.length - 5} more` : "")
    );
  }

  return problems;
}
