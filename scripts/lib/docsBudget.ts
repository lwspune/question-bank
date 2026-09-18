/**
 * Size gate for CLAUDE.md — the file every session loads before doing any work.
 *
 * WHY THIS EXISTS. CLAUDE.md is not documentation you go and read; it is a
 * fixed cost paid at the start of every session, in every context window.
 * Measured 2026-09-16 it stood at 205 KB (~51k tokens) and the Decisions log
 * alone was 65 KB of it — 32%. Two rules were already written down and being
 * FOLLOWED (digest each entry to <=1.2 KB on the way in; archive a month once
 * it has passed) and the file still reached that size, because in a heavy month
 * neither rule binds: 44 entries at a compliant-ish ~1.4 KB is still 61 KB, and
 * none of them is a month old yet. Prose rules cannot notice an aggregate.
 *
 * WHICH RULE IS HARD, AND WHY IT IS THE CEILING. The thing that costs tokens is
 * BYTES, not entry count or entry age, so the byte ceilings are the only hard
 * failures here. They also subsume the other two: a month of fat entries blows
 * the ceiling early and forces an archive sweep, which is exactly the behaviour
 * the time rule was reaching for. Per-entry size and entry age are reported as
 * WARNINGS — useful signals, but failing a push over them would either block
 * every commit on the 1st of a month or demand that 19 existing entries be
 * re-worded before anything else could ship.
 *
 * NOT GRANDFATHERED. There is deliberately no allowlist of "entries that were
 * already too big when this landed". A baseline list of exceptions is a claim
 * about one working tree that rots silently (this repo has been bitten by
 * exactly that — see the 2026-09-15 (eighth) Decisions entry, where 16 of 28
 * baselined paths existed only on one machine and the guard passed locally
 * while failing CI). The ceilings apply to the file as it is, always.
 *
 * Pure + dependency-free so it is trivially testable; spec in
 * tests/docs-budget.test.ts, CLI in scripts/docs-budget.ts.
 */

export type BudgetLimits = {
  /** Whole-file ceiling. Hard failure. */
  fileMaxBytes: number;
  /** `## Decisions log` section ceiling. Hard failure. */
  decisionsMaxBytes: number;
  /** Per-entry digest target. Warning only. */
  perEntryMaxBytes: number;
  /** `MEMORY.md` ceiling — the memory INDEX, not the memory directory. Hard failure. */
  memoryMaxBytes: number;
};

/**
 * Current ceilings. Set 2026-09-16 with the file at 148.8 KB and the Decisions
 * log at 32.7 KB, i.e. ~11 KB and ~3.3 KB of headroom — a few entries' worth.
 * RAISING THESE IS NOT THE FIX when the gate fires. Archiving is: move the
 * oldest entries into DECISIONS_HISTORY.md, which loses nothing because an
 * entry is archived by MOVING it.
 */
export const LIMITS: BudgetLimits = {
  fileMaxBytes: 160_000,
  decisionsMaxBytes: 36_000,
  perEntryMaxBytes: 1_200,
  memoryMaxBytes: 24_000,
};

export type DecisionEntry = {
  /** e.g. "2026-09-15 (third)" — the date plus any ordinal suffix. */
  tag: string;
  /** "YYYY-MM", used for the age rule. */
  month: string;
  bytes: number;
};

export type Finding = { rule: string; message: string };

export type BudgetReport = {
  fileBytes: number;
  decisionsBytes: number;
  /**
   * MEMORY.md size, or `null` meaning NOT MEASURED HERE — see the memory note
   * in the header. Null is a third answer, never a zero and never a pass.
   */
  memoryBytes: number | null;
  entries: DecisionEntry[];
  errors: Finding[];
  warnings: Finding[];
  ok: boolean;
};

const bytes = (s: string): number => Buffer.byteLength(s, "utf8");

const ENTRY_RE = /^- \*\*(\d{4}-\d{2}-\d{2}(?: \([a-z]+\))?)/;

/** Whole months from `from` ("YYYY-MM") to `to`. Year-boundary safe. */
function monthsBetween(from: string, to: string): number {
  const [fy, fm] = from.split("-").map(Number);
  const [ty, tm] = to.split("-").map(Number);
  return (ty - fy) * 12 + (tm - fm);
}

/**
 * Slice out `## Decisions log` up to the next top-level `## ` heading.
 * Returns null when the section is absent — the caller fails closed, because a
 * gate that silently measures nothing is worse than no gate.
 */
export function extractDecisionsSection(md: string): string | null {
  const lines = md.split("\n");
  const start = lines.findIndex((l) => l.startsWith("## Decisions log"));
  if (start === -1) return null;
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (lines[i].startsWith("## ")) {
      end = i;
      break;
    }
  }
  return lines.slice(start, end).join("\n");
}

/** Split a decisions section into its dated entries, with byte sizes. */
export function parseEntries(section: string): DecisionEntry[] {
  const lines = section.split("\n");
  const entries: DecisionEntry[] = [];
  let current: { tag: string; buf: string[] } | null = null;
  const flush = () => {
    if (!current) return;
    entries.push({
      tag: current.tag,
      month: current.tag.slice(0, 7),
      bytes: bytes(current.buf.join("\n")),
    });
    current = null;
  };
  for (const line of lines) {
    const m = ENTRY_RE.exec(line);
    if (m) {
      flush();
      current = { tag: m[1], buf: [line] };
    } else if (current) {
      current.buf.push(line);
    }
  }
  flush();
  return entries;
}

/**
 * Headings in DECISIONS_HISTORY.md, which mixes two shapes: a bulleted
 * `- **tag — …**` entry and a bare `**tag — …**` paragraph. Matching only the
 * first reported four real narratives as missing.
 */
const ARCHIVE_HEADING_RE = /^(?:- )?\*\*(\d{4}-\d{2}-\d{2}(?: \([a-z]+\))?) /;

/**
 * Which CLAUDE.md digests have NO long form in the archive — i.e. which entries
 * an archive sweep would DELETE rather than move.
 *
 * The convention is that every entry is written in two places, so eviction is
 * free. That held until it did not: on 2026-09-18, 7 of 11 live entries had no
 * narrative behind them. Returns `null` when there is no archive to check, for
 * the same reason the memory ceiling does — not checked is not the same as
 * clean. Tags are compared WHOLE: "2026-09-18" is a substring of
 * "2026-09-18 (third)", and that false positive is what made the first
 * hand-check of this wrong.
 */
export function reconcileArchive(claudeMd: string, historyMd: string | null): string[] | null {
  if (historyMd === null) return null;
  const archived = new Set<string>();
  for (const line of historyMd.split("\n")) {
    const m = ARCHIVE_HEADING_RE.exec(line);
    if (m) archived.add(m[1]);
  }
  const section = extractDecisionsSection(claudeMd);
  if (section === null) return [];
  return parseEntries(section)
    .map((e) => e.tag)
    .filter((tag) => !archived.has(tag));
}

export function auditDocsBudget(
  claudeMd: string,
  today: string,
  limits: BudgetLimits = LIMITS,
  memoryMd: string | null = null,
): BudgetReport {
  const errors: Finding[] = [];
  const warnings: Finding[] = [];
  const fileBytes = bytes(claudeMd);

  if (fileBytes > limits.fileMaxBytes) {
    errors.push({
      rule: "file-ceiling",
      message: `CLAUDE.md is ${fileBytes} bytes, over the ${limits.fileMaxBytes} ceiling by ${fileBytes - limits.fileMaxBytes}. Archive, do not raise the ceiling.`,
    });
  }

  // Deliberately `!== null` rather than a truthiness check: an EMPTY MEMORY.md
  // is a real measurement of zero, and `""` is falsy.
  const memoryBytes = memoryMd !== null ? bytes(memoryMd) : null;
  if (memoryBytes !== null && memoryBytes > limits.memoryMaxBytes) {
    errors.push({
      rule: "memory-ceiling",
      message: `MEMORY.md is ${memoryBytes} bytes, over the ${limits.memoryMaxBytes} ceiling by ${memoryBytes - limits.memoryMaxBytes}. Prune or merge index lines — do not raise the ceiling.`,
    });
  }

  const section = extractDecisionsSection(claudeMd);
  if (section === null) {
    errors.push({
      rule: "section-missing",
      message: "No `## Decisions log` heading found — refusing to report a pass on a file this gate could not read.",
    });
    return { fileBytes, decisionsBytes: 0, memoryBytes, entries: [], errors, warnings, ok: false };
  }

  const decisionsBytes = bytes(section);
  if (decisionsBytes > limits.decisionsMaxBytes) {
    errors.push({
      rule: "decisions-ceiling",
      message: `The Decisions log is ${decisionsBytes} bytes, over the ${limits.decisionsMaxBytes} ceiling by ${decisionsBytes - limits.decisionsMaxBytes}. Move the oldest entries into DECISIONS_HISTORY.md.`,
    });
  }

  const entries = parseEntries(section);
  const todayMonth = today.slice(0, 7);

  for (const e of entries) {
    if (e.bytes > limits.perEntryMaxBytes) {
      warnings.push({
        rule: "entry-size",
        message: `${e.tag} is ${e.bytes} bytes (digest target ${limits.perEntryMaxBytes}).`,
      });
    }
    const age = monthsBetween(e.month, todayMonth);
    if (age >= 2) {
      errors.push({
        rule: "entry-age",
        message: `${e.tag} is ${age} months old and still in CLAUDE.md — archive that month into DECISIONS_HISTORY.md.`,
      });
    } else if (age === 1) {
      warnings.push({
        rule: "entry-age",
        message: `${e.tag} is last month's — due for archiving into DECISIONS_HISTORY.md.`,
      });
    }
  }

  return { fileBytes, decisionsBytes, memoryBytes, entries, errors, warnings, ok: errors.length === 0 };
}
