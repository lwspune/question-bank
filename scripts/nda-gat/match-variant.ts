/**
 * Match a sibling series' questions onto the base series: the FIDELITY CHECK,
 * and the source of record for that series' order.
 *
 *   npx tsx scripts/nda-gat/match-variant.ts 2026-2 D
 *   npx tsx scripts/nda-gat/match-variant.ts 2026-2 D --apply
 *
 * Reads `data/<id>-<S>.d*.json` (the fidelity pass) and `data/<id>.questions.json`
 * (the base, merged). Writes `data/<id>-<S>.map.json`: for every question of
 * series S, which base question it is and how its option LABELS map.
 *
 * ## It does TWO jobs and the second is why it is worth the pass
 *
 * 1. **Fidelity.** The variant transcription is an INDEPENDENT second reading of
 *    the same printed options. Disagreement means one of the two is wrong, and a
 *    human reads the page. This is the control the sibling CDS English corpus
 *    did not have when it shipped 19 wrong keys.
 * 2. **Order.** Series D's question NUMBERS are kept, so a Series D solution
 *    document can be built in Series D's own order once the base is derived.
 *    That is why the map is a committed artifact and not a throwaway report.
 *
 * ## The answer is derived from option TEXT, never from a block pattern
 *
 * The series permute in blocks, and on the Mathematics sibling that pattern held
 * perfectly — but it is used here only as CORROBORATION, never as an input. A
 * series' answer for question n is: find the base question, find which of this
 * series' four labels carries the text of the base question's CORRECT option,
 * emit that label. So a genuinely reordered option produces the right letter
 * automatically, and a broken block pattern disagrees loudly rather than
 * silently mis-keying ten questions in a row.
 *
 * ## What it REFUSES to do
 *
 * It never picks a winner on a disagreement, and it never lowers its own
 * threshold to make a report look clean. An AMBIGUOUS or OPTION_MISMATCH row is
 * a work item for a human with the two booklets open.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { DATA, QUESTIONS_PER_PAPER, dataPath, requirePaper, requireVariant } from "./config";
import { matchVariant, summarise, type FidelityRow, type VariantQ } from "./fidelity";
import { normalizeQuestions, type GatTQ } from "./lib";

type VariantBand = {
  series: string;
  band: string;
  bandReport?: { printedPages?: number[]; notes?: string };
  questions: VariantQ[];
};

const norm = (s: string) => (s ?? "").replace(/\s+/g, " ").trim().toLowerCase();

function main() {
  const paper = requirePaper(process.argv[2]);
  const series = (process.argv[3] ?? "").toUpperCase();
  const booklet = requireVariant(paper, series);
  const apply = process.argv.includes("--apply");

  const qPath = dataPath(paper.id, "questions");
  if (!existsSync(qPath)) throw new Error(`missing ${qPath} — run merge.ts on the base first`);
  const bases = normalizeQuestions(JSON.parse(readFileSync(qPath, "utf8"))) as GatTQ[];

  // ANCHORED glob: `<id>-<S>.d<name>.json` only. A loose `<id>-<S>.*.json` would
  // swallow the map file this script writes and every scratch artifact in data/,
  // which has silently ingested non-question files AS QUESTIONS in two sibling
  // pipelines in this repo.
  const re = new RegExp(
    `^${`${paper.id}-${series}`.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\.d[A-Za-z0-9]+\\.json$`
  );
  const files = readdirSync(DATA).filter((f) => re.test(f)).sort();
  if (!files.length) throw new Error(`no fidelity band files matching ${paper.id}-${series}.d<name>.json`);

  // Merge the variant bands. An overlap between bands is expected; a
  // DISAGREEMENT is two agents reading one page differently — a finding to
  // resolve against the page, never a duplicate to settle by file order.
  const byNumber = new Map<number, VariantQ>();
  const conflicts: string[] = [];
  const printedPages: number[] = [];
  for (const f of files) {
    const band = JSON.parse(readFileSync(`${DATA}/${f}`, "utf8")) as VariantBand;
    printedPages.push(...(band.bandReport?.printedPages ?? []));
    for (const q of band.questions ?? []) {
      const prev = byNumber.get(q.number);
      if (!prev) {
        byNumber.set(q.number, q);
        continue;
      }
      const same =
        norm(prev.stem) === norm(q.stem) &&
        prev.options.length === q.options.length &&
        prev.options.every((o, i) => o.label === q.options[i].label && norm(o.text) === norm(q.options[i].text));
      if (!same) conflicts.push(`Q${q.number}: two bands disagree — resolve against the page`);
    }
  }
  const variants = [...byNumber.values()].sort((a, b) => a.number - b.number);

  console.log(`${paper.id} series ${series}: ${files.length} band file(s), ${variants.length} questions`);
  console.log(`  printed pages covered: ${[...new Set(printedPages)].sort((a, b) => a - b).join(", ")}`);
  if (booklet.missing?.printed.length) {
    console.log(`  ! pages absent from this scan: ${booklet.missing.printed.join(", ")}`);
  }

  const gaps: number[] = [];
  for (let n = 1; n <= QUESTIONS_PER_PAPER; n++) if (!byNumber.has(n)) gaps.push(n);
  if (gaps.length) {
    console.log(
      `  ! ${gaps.length} of ${QUESTIONS_PER_PAPER} question(s) absent from this series' scan: ${gaps.join(", ")}`
    );
  }

  const rows = matchVariant(variants, bases);
  const s = summarise(
    rows,
    bases.map((b) => b.number)
  );

  console.log(`\nFIDELITY — ${rows.length} variant questions against ${bases.length} base questions`);
  for (const [v, n] of Object.entries(s.counts)) console.log(`  ${v.padEnd(16)} ${String(n).padStart(3)}`);

  // The headline measurement. On the Mathematics sibling this was 0 of 358, so
  // a non-zero count here is a real finding either about UPSC's typesetting or
  // about one of the two transcriptions — and nothing in the data tells them
  // apart.
  const matched = s.counts.MATCH + s.counts.PERMUTED;
  if (matched) {
    console.log(
      `\n  option ORDER identical on ${s.counts.MATCH} of ${matched} matched questions ` +
        `(${((s.counts.MATCH / matched) * 100).toFixed(1)}%)`
    );
  }

  const review = rows.filter((r) => r.verdict !== "MATCH");
  if (review.length) {
    console.log(`\nROWS A HUMAN MUST READ (${review.length}):`);
    for (const r of review) {
      console.log(
        `  ${series}-Q${String(r.variant).padEnd(4)} ${r.verdict.padEnd(16)} base=${r.base ?? "-"}  score=${r.score}  opt=${r.optionScore}`
      );
      if (r.note) console.log(`      ${r.note}`);
    }
  }
  if (s.unclaimedBase.length) {
    console.log(
      `\nBASE questions no ${series} question claimed (${s.unclaimedBase.length}): ${s.unclaimedBase.join(", ")}`
    );
    console.log(
      `  Expected where this series' scan is short — those questions exist in the booklet but not in the scan.`
    );
  }

  // Once the base is derived, this series' key falls out for free.
  const aPath = dataPath(paper.id, "answers");
  let keyed: { number: number; answer: string }[] = [];
  if (existsSync(aPath)) {
    const file = JSON.parse(readFileSync(aPath, "utf8")) as {
      derivations?: { number: number; answer: string | null }[];
    };
    const baseAnswer = new Map((file.derivations ?? []).map((d) => [d.number, d.answer]));
    for (const r of rows) {
      if (r.base == null || !r.labels) continue;
      const want = baseAnswer.get(r.base);
      if (!want) continue;
      // labels maps VARIANT label -> BASE label. Invert to find which of this
      // series' letters carries the base's correct option TEXT.
      const hit = Object.entries(r.labels).find(([, b]) => b === want.toUpperCase());
      if (hit) keyed.push({ number: r.variant, answer: hit[0] });
    }
    keyed.sort((a, b) => a.number - b.number);
    const dist = new Map<string, number>();
    for (const k of keyed) dist.set(k.answer, (dist.get(k.answer) ?? 0) + 1);
    console.log(
      `\nDERIVED SERIES ${series} KEY: ${keyed.length} of ${rows.length} — ` +
        [...dist.entries()].sort().map(([l, n]) => `${l} ${n}`).join("  ")
    );
  } else {
    console.log(`\n(no ${paper.id}.answers.json yet — the series key is emitted once the base is derived)`);
  }

  if (conflicts.length) {
    console.log(`\nBAND CONFLICTS (${conflicts.length}):`);
    for (const c of conflicts) console.log(`  ${c}`);
  }

  if (!apply) {
    console.log(`\n[dry-run] pass --apply to write ${paper.id}-${series}.map.json. Nothing written.`);
    return;
  }
  if (conflicts.length) {
    throw new Error("refusing to write a map while two bands disagree — resolve against the page first.");
  }

  const out = {
    paper: paper.id,
    series,
    generatedAt: new Date().toISOString(),
    summary: { ...s.counts, unclaimedBase: s.unclaimedBase, absentFromScan: gaps },
    rows: rows as FidelityRow[],
    key: keyed.length ? keyed : undefined,
  };
  writeFileSync(dataPath(`${paper.id}-${series}`, "map"), JSON.stringify(out, null, 2) + "\n", "utf8");
  console.log(`\nwrote ${dataPath(`${paper.id}-${series}`, "map")}`);
}

if (require.main === module) main();
