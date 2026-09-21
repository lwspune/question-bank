/**
 * Pure core for reading afterboards.in PYQ pages.
 *
 * The site is a Next.js app, so each page ships its question records as JSON
 * inside the React flight payload (`self.__next_f.push([1, "<chunk>"])`). That
 * makes this an extraction, not a scrape: we read the same objects the page
 * renders from, with their LaTeX still in source form.
 *
 * ONE TRAP GOVERNS THIS WHOLE FILE. Long strings that repeat across records —
 * every Reading-Comprehension passage, most Data-Interpretation tables — are
 * hoisted into their own flight row and replaced, in the record, by a reference
 * string like "$3c". An extractor that does not resolve those returns every
 * question with every field present, carrying "$3c" where a 3,400-character
 * passage belongs. On the live Indore corpus that is 112 of 670 rows (17%), and
 * they are the largest fields in the bank. A completeness check that counts rows
 * or fields cannot see it; only resolving the references can.
 *
 * The hoisted rows are BYTE-counted and packed with no separator:
 *
 *   3c:T9d6,<2518 bytes>3d:T4e1,<1249 bytes>
 *
 * so two further mistakes are available. Scanning line-by-line misses rows that
 * begin mid-line (almost all of them), and reading `T<len>` as a character count
 * desynchronises on the first multi-byte character and mangles everything after
 * it. `parseFlightRows` works on a Buffer for exactly that reason.
 *
 * Spec: tests/ipmat-flight.test.ts.
 */

/** A raw question record as the page ships it. Field set varies by exam/section. */
export type FlightRecord = Record<string, unknown>;

/** A reference we could not resolve — reported, never silently blanked. */
export type UnresolvedRef = {
  questionNumber: unknown;
  field: string;
  ref: string;
};

const PUSH_RE = /self\.__next_f\.push\((.*?)\)<\/script>/gs;

/**
 * Concatenate the string payload of every flight chunk on the page.
 *
 * Next.js splits the payload across many `push` calls; the interesting one is
 * always `[1, "<text>"]`. Chunks whose second element is not a string carry
 * bookkeeping, not content, and are skipped.
 */
export function flightBlob(html: string): string {
  const out: string[] = [];
  for (const match of html.matchAll(PUSH_RE)) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(match[1]);
    } catch {
      continue; // a chunk we cannot read is not a chunk we may guess at
    }
    if (Array.isArray(parsed) && typeof parsed[1] === "string") out.push(parsed[1]);
  }
  return out.join("");
}

const ROW_ID_RE = /^([0-9a-f]{1,4}):/;
const T_LEN_RE = /^T([0-9a-f]+),/;
const NEWLINE = 0x0a;

/**
 * Split a flight blob into its rows, keyed by hex id.
 *
 * Two row shapes:
 *   `<id>:T<hexByteLen>,<text>`  — text of exactly that many UTF-8 BYTES,
 *                                  followed immediately by the next row
 *   `<id>:<rest of line>`        — everything else (JSON, component refs)
 *
 * Operates on a Buffer because the length prefix counts bytes. Using string
 * indices here is the desynchronisation bug described in the file header.
 */
export function parseFlightRows(blob: string): Map<string, string> {
  const buf = Buffer.from(blob, "utf8");
  const rows = new Map<string, string>();
  let i = 0;

  while (i < buf.length) {
    // Row ids are short and ASCII, so a small window is enough to match on.
    const head = buf.toString("latin1", i, Math.min(i + 6, buf.length));
    const idMatch = ROW_ID_RE.exec(head);

    if (!idMatch) {
      // Not a row boundary — skip to the start of the next line and retry.
      const nl = buf.indexOf(NEWLINE, i);
      if (nl < 0) break;
      i = nl + 1;
      continue;
    }

    const id = idMatch[1];
    i += idMatch[0].length;

    // A T-row carries its own byte length, so we can jump the payload exactly.
    const tHead = buf.toString("latin1", i, Math.min(i + 12, buf.length));
    const tMatch = T_LEN_RE.exec(tHead);
    if (tMatch) {
      const byteLen = parseInt(tMatch[1], 16);
      const start = i + tMatch[0].length;
      const end = Math.min(start + byteLen, buf.length);
      rows.set(id, buf.toString("utf8", start, end));
      i = end;
      continue;
    }

    // Any other row runs to the end of its line.
    const nl = buf.indexOf(NEWLINE, i);
    const end = nl < 0 ? buf.length : nl;
    rows.set(id, buf.toString("utf8", i, end));
    i = end < buf.length ? end + 1 : end;
  }

  return rows;
}

const QUESTION_LIST_KEY = '"questionList":';
const BACKSLASH = String.fromCharCode(92);

/**
 * Pull the `questionList` array out of a flight blob.
 *
 * The array is embedded in a much larger string, so its end has to be found by
 * bracket matching rather than by a regex. The matcher is string- and
 * escape-aware because real stems contain brackets (`[-1, 1]`, `{1, 2, ...}`)
 * and real option text contains escaped quotes — either would end the scan
 * early and lose most of the paper.
 *
 * Returns null when the page has no question list (a landing or index page).
 */
export function extractQuestionList(blob: string): FlightRecord[] | null {
  const keyAt = blob.indexOf(QUESTION_LIST_KEY);
  if (keyAt < 0) return null;

  const open = blob.indexOf("[", keyAt);
  if (open < 0) return null;

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = open; i < blob.length; i++) {
    const ch = blob[i];

    if (inString) {
      if (escaped) escaped = false;
      else if (ch === BACKSLASH) escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }

    if (ch === '"') inString = true;
    else if (ch === "[") depth++;
    else if (ch === "]") {
      depth--;
      if (depth === 0) {
        const raw = blob.slice(open, i + 1);
        try {
          const parsed = JSON.parse(raw);
          return Array.isArray(parsed) ? (parsed as FlightRecord[]) : null;
        } catch {
          return null;
        }
      }
    }
  }

  return null;
}

const REF_RE = /^\$[0-9a-f]{1,4}$/;

/**
 * True when a value is a flight reference rather than content.
 *
 * Deliberately strict: the source writes maths as TeX dollars, so `$40$`,
 * `$x + y$` and `$$20 \leq x$` are all real content. Only a bare dollar
 * followed by a hex id and nothing else is a reference.
 */
export function isFlightRef(value: unknown): boolean {
  return typeof value === "string" && REF_RE.test(value);
}

/**
 * Replace every flight reference in a record list with the row it points at.
 *
 * Scans all string fields rather than a fixed list, so a reference in a field
 * we have not seen hoisted before is still caught.
 *
 * A reference with no matching row is REPORTED and left in place. Blanking it
 * would reproduce the original defect — a field that looks present and is not.
 */
export function resolveFlightRefs(
  records: readonly FlightRecord[],
  rows: Map<string, string>
): { resolved: FlightRecord[]; unresolved: UnresolvedRef[] } {
  const unresolved: UnresolvedRef[] = [];

  const resolved = records.map((record) => {
    const next: FlightRecord = { ...record };
    for (const [field, value] of Object.entries(next)) {
      if (!isFlightRef(value)) continue;
      const ref = value as string;
      const row = rows.get(ref.slice(1));
      if (row === undefined) {
        unresolved.push({ questionNumber: next.questionNumber, field, ref });
        continue;
      }
      next[field] = row;
    }
    return next;
  });

  return { resolved, unresolved };
}

/**
 * Missing numbers in what should be a contiguous 1..N run.
 *
 * The upper bound is the larger of the highest number seen and the row count,
 * so the check catches both shapes of damage: a hole (1,2,5 is short of 3 and 4)
 * and a duplicate (two rows claiming Q3 means some number went unclaimed).
 */
export function findNumberingGaps(numbers: readonly number[]): number[] {
  if (numbers.length === 0) return [];
  const seen = new Set(numbers);
  const upper = Math.max(...numbers, numbers.length);
  const gaps: number[] = [];
  for (let n = 1; n <= upper; n++) if (!seen.has(n)) gaps.push(n);
  return gaps;
}
