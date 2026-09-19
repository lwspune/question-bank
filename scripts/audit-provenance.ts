/**
 * Standing probe for the public provenance line.
 *
 *   npm run audit:provenance          # triage report over every PUBLIC row
 *   npm run audit:provenance -- --all # also list the notes that publish
 *
 * WHAT IT DEFENDS. `publicPyqNote` publishes a `pyq_note` only when the row is
 * a `pyq` AND the note (after its trailing bracket is stripped) fits inside
 * MAX_PUBLIC_PYQ_NOTE_LEN. That cap was chosen from a measured gap: on
 * 2026-09-19 every `pyq` note was either <= 38 chars (an identifier) or >= 93
 * (an ingestion narrative), with nothing in between. The gap is what makes the
 * cap safe, and the gap is a property of today's DATA, not of the code — a new
 * corpus landing at 55 chars would have its sitting id dropped silently, and
 * nothing else in the repo would notice.
 *
 * So this probe reports two things the gate chain cannot see:
 *
 *   1. GAP ROWS — `pyq` notes longer than the cap but far shorter than the
 *      narrative floor. These are the ambiguous ones. Either the note is a real
 *      identifier that should be SHORTENED AT SOURCE, or it is narrative and the
 *      right answer is to leave it hidden. A human decides; the probe only says
 *      "look".
 *   2. LEAK CHECK — any note that still publishes while naming a known source.
 *      This is a denylist and therefore WEAK BY CONSTRUCTION: it can only
 *      confirm the names already on it, never the next publisher's. It is here
 *      as a cheap backstop, not as the guarantee. The real guarantee is the
 *      `question_kind` rule, which does not depend on spelling at all.
 *
 * TRIAGE, NOT A GATE. Exits 0 even when it finds something, matching
 * `audit:text` / `notes:coverage`. It reads the live bank, so it is deliberately
 * NOT in prepush: its findings move when an ingest runs, not when code changes.
 * Run it after any ingest.
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env.local.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  MAX_PUBLIC_PYQ_NOTE_LEN,
  publicPyqNote,
  type PublicQuestionKind,
} from "../src/lib/questions/publicPyqNote";

const local = path.join(process.cwd(), ".env.local");
if (fs.existsSync(local)) require("dotenv").config({ path: local, override: true });

const SHOW_ALL = process.argv.includes("--all");

/**
 * The floor of the narrative population measured on 2026-09-19. A `pyq` note
 * between the cap and this length is in the empty gap the cap relies on.
 */
const NARRATIVE_FLOOR = 93;

/**
 * Names that must never reach an anonymous page: the founding tenant, the
 * third-party publishers whose material the practice corpora came from, and the
 * phrases that disclose our own derivation method.
 *
 * Explicitly a WEAK check — see the header. A new publisher is invisible to it.
 */
const KNOWN_SOURCE_MARKERS = [
  "lws",
  "oswaal",
  "balbharati",
  "allen",
  "sgima",
  "pariksha",
  "cadetprep",
  "ncert",
  "blind pass",
  "no official answer key",
  "answers derived",
];

type Row = {
  id: string;
  pyq_note: string | null;
  question_kind: PublicQuestionKind | null;
  exam: { name: string } | { name: string }[] | null;
};

function client(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "audit:provenance needs NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (.env.local)"
    );
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

/**
 * Page the whole PUBLIC set. A bare `.select()` stops at PostgREST's 1000-row
 * cap without erroring, and this probe derives its counts from the row payload
 * itself — the exact shape that has produced wrong answers here five times.
 */
async function fetchAll(sb: SupabaseClient): Promise<Row[]> {
  const PAGE = 1000;
  const out: Row[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await sb
      .from("questions")
      .select("id, pyq_note, question_kind, exam:exams!exam_id(name)")
      .eq("visibility", "PUBLIC")
      .not("pyq_note", "is", null)
      .order("id")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`audit:provenance read: ${error.message}`);
    const rows = (data ?? []) as Row[];
    out.push(...rows);
    if (rows.length < PAGE) return out;
  }
}

const examName = (e: Row["exam"]): string =>
  (Array.isArray(e) ? e[0]?.name : e?.name) ?? "?";

function tally<T>(items: T[], key: (t: T) => string): [string, number][] {
  const m = new Map<string, number>();
  for (const i of items) m.set(key(i), (m.get(key(i)) ?? 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
}

async function main() {
  const rows = await fetchAll(client());

  const shown: { row: Row; note: string }[] = [];
  const gap: Row[] = [];

  for (const r of rows) {
    const note = publicPyqNote(r.pyq_note, r.question_kind);
    if (note) shown.push({ row: r, note });

    if (r.question_kind === "pyq" && !note) {
      // Re-derive the cleaned length the helper measured, to spot the rows
      // sitting in the gap the cap depends on.
      const cleaned = (r.pyq_note ?? "").replace(/\s*\[[^\]]*\]\s*$/, "").trim();
      if (
        cleaned.length > MAX_PUBLIC_PYQ_NOTE_LEN &&
        cleaned.length < NARRATIVE_FLOOR
      ) {
        gap.push(r);
      }
    }
  }

  const leaks = shown.filter(({ note }) =>
    KNOWN_SOURCE_MARKERS.some((m) => note.toLowerCase().includes(m))
  );

  const distinct = new Set(shown.map((s) => s.note));

  console.log("Public provenance audit");
  console.log("=======================");
  console.log(`PUBLIC rows with a pyq_note   ${rows.length.toLocaleString()}`);
  console.log(
    `  published to everyone       ${shown.length.toLocaleString()} ` +
      `(${distinct.size} distinct notes)`
  );
  console.log(
    `  redacted to superadmin-only ${(rows.length - shown.length).toLocaleString()}`
  );
  console.log(`cap: ${MAX_PUBLIC_PYQ_NOTE_LEN} chars, measured gap ends at ${NARRATIVE_FLOOR}`);

  console.log("\nPublished notes by exam");
  for (const [name, n] of tally(shown, (s) => examName(s.row.exam))) {
    console.log(`  ${n.toString().padStart(6)}  ${name}`);
  }

  console.log(`\nGAP ROWS — pyq notes between the cap and the narrative floor: ${gap.length}`);
  if (gap.length === 0) {
    console.log("  none. The cap still sits in empty space.");
  } else {
    console.log(
      "  Each of these is HIDDEN today. Decide per row: shorten it at source if\n" +
        "  it identifies a sitting, or leave it hidden if it is narrative."
    );
    for (const [note, n] of tally(gap, (r) => r.pyq_note ?? "")) {
      console.log(`  ${n.toString().padStart(5)}  ${note}`);
    }
  }

  console.log(`\nLEAK CHECK (weak — denylist, see header): ${leaks.length}`);
  if (leaks.length === 0) {
    console.log("  no published note names a known source.");
  } else {
    for (const [note, n] of tally(leaks, (l) => l.note)) {
      console.log(`  ${n.toString().padStart(5)}  ${note}`);
    }
  }

  if (SHOW_ALL) {
    console.log("\nEvery note that publishes");
    for (const [note, n] of tally(shown, (s) => s.note).sort((a, b) =>
      a[0].localeCompare(b[0])
    )) {
      console.log(`  ${n.toString().padStart(5)}  ${note}`);
    }
  }

  // Triage, never a gate — a probe that fails a build on live-data drift gets
  // routed around, and a routed-around probe reports nothing.
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
