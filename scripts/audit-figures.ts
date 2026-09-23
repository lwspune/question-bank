/**
 * Standing probe: a question that POINTS AT a figure it does not carry.
 *
 *   npm run audit:figures                 # whole bank, per-exam summary
 *   npm run audit:figures -- <substr>     # scope to an exam name or source_file
 *   npm run audit:figures -- --all        # list every hit, not just the top ones
 *   npm run audit:figures -- --selftest   # recall check only
 *
 * Read-only triage, like `audit:text` / `audit:keys` / `audit:omml`. Run after
 * every ingest that could carry a diagram.
 *
 * WHAT IT FINDS, AND WHY NOTHING ELSE DOES. A row whose stem reads "In figure
 * 3.37, m(arc DGF) = 200°, find m(arc DE)" with `image_url` NULL is
 * UNANSWERABLE. It renders as a complete question, it counts as a question in
 * every total, and no gate reads it: `board:lint` checks book structure,
 * `audit:text` checks text defects, `audit:keys` checks option integrity,
 * `notes:lint` checks editorial modules. None of them asks whether the thing a
 * stem points at exists.
 *
 * WHY IT IS BANK-WIDE. The rule existed twice before this script — in
 * scripts/cbse-12-pyq/audit-figures.ts and scripts/mh-hsc-12-pyq/
 * audit-figure-refs.ts — each scoped to one pipeline, each wired to no npm
 * script, neither ever run across exams. Measured on 2026-09-23 the two exams
 * with a probe sat at 22% and 29% missing, while MH SSC 10 (no probe) sat at
 * 55% and MH State Board 11 (no probe) at 77%. The detector was pointed at the
 * corpora someone had already looked at.
 *
 * THE FOUR BUCKETS, and why each is separate:
 *   • REFERENCES-NO-IMAGE     — the unanswerable case. The serious one.
 *   • DESCRIBED-IN-TEXT       — the figure was written out in prose on purpose
 *                               (state board, UPSC). Answerable. Listed apart so
 *                               29 correctly-handled rows don't bury the rest.
 *   • DRAWN-OPTIONS-NO-IMAGE  — the OPTIONS are the figure. A stem rule cannot
 *                               see these; keyed on the transcriber's marker.
 *   • IMAGE-NO-REFERENCE      — a figure on a row that never mentions one.
 *                               Usually fine, but it is also what a mis-keyed
 *                               attach looks like.
 *
 * TRIAGE, NOT A GATE — exits 0 even when it finds things. "Draw a labelled
 * diagram" asks the STUDENT for one and is annotated `[student draws]` rather
 * than filtered, because a stem can both read a printed figure and ask for
 * another back. Read the hits.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import {
  referencesFigure,
  describesFigureInText,
  optionsDeferToFigure,
  studentDraws,
} from "./lib/figureRefs";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const PAGE = 1000;
/** PostgREST puts an `.in()` list in the URL, so a few hundred uuids overflow
 *  the request line. Paging a RESULT and chunking a FILTER are different limits
 *  and only one of them is 1000. */
const IN_CHUNK = 150;

type Row = {
  id: string;
  question_number: string | null;
  source_file: string | null;
  text: string | null;
  context: string | null;
  image_url: string | null;
  visibility: string;
  question_kind: string;
  exams: { name: string } | null;
};

function client() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY required (.env.local)");
  return createClient(url, key, { auth: { persistSession: false } });
}

/** Every question, narrow columns, paged. `.order("id")` is not decoration: a
 *  paged read with no ORDER BY is not reproducible, and the /notes intro gate
 *  shipped flaky for exactly that reason (two runs, five findings apart). */
async function loadRows(c: ReturnType<typeof client>, filter?: string): Promise<Row[]> {
  const rows: Row[] = [];
  for (let from = 0; ; from += PAGE) {
    let q = c
      .from("questions")
      .select("id,question_number,source_file,text,context,image_url,visibility,question_kind,exams(name)")
      .order("id")
      .range(from, from + PAGE - 1);
    if (filter) q = q.ilike("source_file", `%${filter}%`);
    const { data, error } = await q;
    if (error) throw new Error(error.message);
    rows.push(...((data ?? []) as unknown as Row[]));
    if (!data || data.length < PAGE) break;
  }
  return rows;
}

/** The drawn-options case, found from the OPTIONS side. Fetching options.text
 *  alongside every question would multiply the payload fivefold to answer a
 *  question about ~30 rows; this asks the small table directly instead. */
async function drawnOptionQuestionIds(c: ReturnType<typeof client>): Promise<Set<string>> {
  const ids = new Set<string>();
  for (const marker of ["%see the attached figure%", "%as printed%"]) {
    for (let from = 0; ; from += PAGE) {
      const { data, error } = await c
        .from("options")
        .select("question_id,text")
        .ilike("text", marker)
        .order("question_id")
        .range(from, from + PAGE - 1);
      if (error) throw new Error(error.message);
      for (const o of data ?? []) {
        if (optionsDeferToFigure([{ text: (o as { text: string | null }).text }])) {
          ids.add((o as { question_id: string }).question_id);
        }
      }
      if (!data || data.length < PAGE) break;
    }
  }
  return ids;
}

const oneLine = (s: string | null, n = 120) => (s ?? "").replace(/\s+/g, " ").trim().slice(0, n);
const pad = (s: string, n: number) => s.padEnd(n).slice(0, n);

async function main() {
  const args = process.argv.slice(2);
  const selftestOnly = args.includes("--selftest");
  const listAll = args.includes("--all");
  const filter = args.find((a) => !a.startsWith("--"));

  const c = client();
  const rows = await loadRows(c, filter);
  if (!rows.length) {
    console.log("\n⚠  NOTHING SCANNED — that is not a clean result. Check the filter.");
    process.exit(1);
  }

  const scoped = filter
    ? rows.filter(
        (r) =>
          (r.source_file ?? "").toLowerCase().includes(filter.toLowerCase()) ||
          (r.exams?.name ?? "").toLowerCase().includes(filter.toLowerCase()),
      )
    : rows;

  // ── RECALL CHECK FIRST ─────────────────────────────────────────────────────
  // A clean scan means nothing from a rule that cannot see the cases we already
  // know are real. The population to check against is the one the probe calls
  // CLEAN — here, the rows that DO carry a figure.
  //
  // IT IS REPORTED PER EXAM, NOT BANK-WIDE, and that is not cosmetic. The
  // achievable ceiling differs enormously by corpus: a Balbharati geometry stem
  // always names its figure ("In figure 3.80, if PQ = 6 …"), while a Geography
  // map question never does ("River Manas is the tributary of which river?") and
  // a chemistry structure question names the molecule, not a picture. A single
  // bank-wide number averages a corpus where the rule should be near-perfect
  // with one where it can never fire, and lands on a figure that means nothing
  // about either. The decision this number feeds is per-exam — "do I trust THIS
  // exam's miss count?" — so the measurement has to be per-exam too.
  const withImage = scoped.filter((r) => r.image_url);
  const seen = withImage.filter((r) => referencesFigure(r.text, r.context));
  const recall = withImage.length ? Math.round((seen.length / withImage.length) * 100) : 0;
  console.log(`\nrecall check: the rule names ${seen.length} of ${withImage.length} rows that DO carry a figure (${recall}% bank-wide; per exam below)`);
  if (selftestOnly) {
    for (const r of withImage.filter((x) => !referencesFigure(x.text, x.context)).slice(0, 40)) {
      console.log(`  unnamed  ${r.exams?.name} ${r.question_number ?? ""}: ${oneLine(r.text, 95)}`);
    }
    return;
  }

  const drawnOpts = await drawnOptionQuestionIds(c);

  type Bucket = { missing: Row[]; described: Row[]; drawn: Row[]; orphan: Row[]; refs: number; withImg: number; named: number };
  const byExam = new Map<string, Bucket>();
  const bucketFor = (name: string) => {
    let b = byExam.get(name);
    if (!b) byExam.set(name, (b = { missing: [], described: [], drawn: [], orphan: [], refs: 0, withImg: 0, named: 0 }));
    return b;
  };

  for (const r of scoped) {
    const exam = r.exams?.name ?? "(no exam)";
    const b = bucketFor(exam);
    const refs = referencesFigure(r.text, r.context);
    const has = !!r.image_url;
    if (refs) b.refs++;
    if (has) {
      b.withImg++;
      if (refs) b.named++;
    }
    if (refs && !has) (describesFigureInText(r.text, r.context) ? b.described : b.missing).push(r);
    if (!refs && has) b.orphan.push(r);
    if (!has && drawnOpts.has(r.id)) b.drawn.push(r);
  }

  // ── PER-EXAM SUMMARY ───────────────────────────────────────────────────────
  // RECALL is the column to read FIRST. It is the share of that exam's rows that
  // DO carry a figure which this rule can name. Where it is high the NO-IMG count
  // is trustworthy; where it is low the count is a FLOOR and the true number is
  // larger — a corpus whose stems do not announce their figures hides its misses
  // from any text rule, so a small NO-IMG there is not good news.
  const order = [...byExam.entries()].sort((a, z) => z[1].missing.length - a[1].missing.length);
  console.log(`\nscanned ${scoped.length} rows | ${withImage.length} carry a figure\n`);
  console.log(`  ${pad("EXAM", 34)}${pad("RECALL", 8)}${pad("REFS", 7)}${pad("NO IMG", 8)}${pad("RATE", 7)}${pad("DESCR", 7)}${pad("DRAWN", 7)}ORPHAN`);
  let totalMissing = 0;
  let totalPublic = 0;
  for (const [exam, b] of order) {
    if (!b.refs && !b.drawn.length && !b.orphan.length) continue;
    const rate = b.refs ? `${Math.round((b.missing.length / b.refs) * 100)}%` : "-";
    const rec = b.withImg ? `${Math.round((b.named / b.withImg) * 100)}%` : "n/a";
    const weak = b.withImg >= 20 && b.named / b.withImg < 0.5 ? " ⚠" : "";
    console.log(
      `  ${pad(exam, 34)}${pad(rec + weak, 8)}${pad(String(b.refs), 7)}${pad(String(b.missing.length), 8)}${pad(rate, 7)}` +
        `${pad(String(b.described.length), 7)}${pad(String(b.drawn.length), 7)}${b.orphan.length}`,
    );
    totalMissing += b.missing.length;
    totalPublic += b.missing.filter((r) => r.visibility === "PUBLIC").length;
  }
  console.log(`\n  REFERENCES-NO-IMAGE total: ${totalMissing}  (${totalPublic} PUBLIC — student-visible and unanswerable)`);
  // Only explain the marker when one was actually printed — a legend for a flag
  // that did not fire reads as though it did.
  if (order.some(([, b]) => b.withImg >= 20 && b.named / b.withImg < 0.5)) {
    console.log(`  ⚠ on RECALL = this rule names under half of that exam's known figures, so its NO-IMG is a FLOOR, not a count.`);
  }

  // ── THE HITS ───────────────────────────────────────────────────────────────
  // Grouped by source_file, because the defect arrives per CHAPTER: a pipeline's
  // figure step is driven by a per-chapter manifest, so a file with ZERO images
  // was never figure-processed at all, while a file with some images lost
  // individual rows. Those are different repairs and the grouping shows which.
  const imagesPerFile = new Map<string, number>();
  for (const r of scoped) {
    const k = r.source_file ?? "(none)";
    imagesPerFile.set(k, (imagesPerFile.get(k) ?? 0) + (r.image_url ? 1 : 0));
  }
  const missingByFile = new Map<string, Row[]>();
  for (const [, b] of byExam) {
    for (const r of b.missing) {
      const k = r.source_file ?? "(none)";
      missingByFile.set(k, [...(missingByFile.get(k) ?? []), r]);
    }
  }
  const files = [...missingByFile.entries()].sort((a, z) => z[1].length - a[1].length);
  const shown = listAll ? files : files.slice(0, 12);
  console.log(`\nBY SOURCE FILE${listAll ? "" : ` (top ${shown.length} of ${files.length}; --all for every one)`}:`);
  for (const [file, hits] of shown) {
    const imgs = imagesPerFile.get(file) ?? 0;
    const tag = imgs === 0 ? "NEVER FIGURE-PROCESSED" : `${imgs} attached`;
    console.log(`\n  ${file}  —  ${hits.length} missing, ${tag}`);
    for (const r of (listAll ? hits : hits.slice(0, 4))) {
      console.log(`    ${r.question_number ?? "?"}${studentDraws(r.text) ? " [student draws]" : ""}: ${oneLine(r.text)}`);
    }
    if (!listAll && hits.length > 4) console.log(`    … ${hits.length - 4} more`);
  }

  const drawnAll = order.flatMap(([, b]) => b.drawn);
  if (drawnAll.length) {
    console.log(`\nDRAWN-OPTIONS-NO-IMAGE (the options ARE the figure): ${drawnAll.length}`);
    for (const r of drawnAll) console.log(`  ${r.exams?.name} ${r.source_file} ${r.question_number ?? ""}`);
  }

  console.log(
    `\nTRIAGE — a hit is a question, not a verdict. Read each before attaching.` +
      `\nORPHAN (image, no reference) is usually fine; check it is not a mis-keyed attach.`,
  );
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e?.message ?? e);
    process.exit(1);
  });
}
