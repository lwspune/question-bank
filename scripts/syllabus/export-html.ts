/**
 * Export the syllabus concept map as a SELF-CONTAINED HTML page for fast design
 * iteration, without a Next build/gate/push cycle in the loop.
 *
 *   npx tsx scripts/syllabus/export-html.ts
 *   -> generated-papers/syllabus-map.html   (gitignored; open with file://)
 *
 * Data is inlined, so the file works offline and can be mailed to anyone.
 *
 * =====================================================================
 * NOT the surface of record. /dashboard/syllabus is. Keep them in step.
 * =====================================================================
 * Both group the JEE table by JEE CHAPTER. Grouping by State Board chapter was
 * built and reverted: it reads down the book a teacher teaches, but it scatters
 * each exam chapter across the table, and "what does JEE ask in Amines" turned
 * out to matter more. The sortKey (4th element of a coveredPool entry) is left
 * in place — it is what that ordering needs, and re-deriving it is the only
 * hard part of trying again.
 *
 * Remaining differences, deliberate:
 *   - the page has an always-on per-exam live-gap list, and a second,
 *     opposite-direction gap view ("State Board content NOT required by X").
 *   - this file has the client-side filters (only-gaps, sort-by-PYQ-weight,
 *     show sub-sections) that the page has none of. If those are wanted, they
 *     belong on the page as a client island, NOT as grounds for keeping a
 *     second implementation of the same tables alive.
 *
 * Kept because it caught real defects faster than a deploy cycle could — the
 * empty column, the lost sort, a regex mangled by the template literal, and
 * NCERT refs resolving against the State Board book. But two surfaces reading
 * the same tables is how the page silently fell behind once already: change one,
 * change the other, or retire this.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { NCERT_TO_SB } from "./exam-chapter-map";
import { bestMatch, parentTitle } from "./match-sections";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

type Concept = {
  id: string;
  source: string;
  class: number;
  chapter_no: number;
  chapter_name: string;
  section_no: string;
  concept: string;
  seq: number;
};
type Link = {
  concept_id: string;
  exam: string;
  status: string;
  note: string | null;
  covered_by: string | null;
};

async function main() {
  loadEnv();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("NEXT_PUBLIC_SUPABASE_URL + a key required");
  const db = createClient(url, key, { auth: { persistSession: false } });

  async function all<T>(table: string, columns: string): Promise<T[]> {
    const out: T[] = [];
    for (let from = 0; ; from += 1000) {
      const { data, error } = await db.from(table).select(columns).range(from, from + 999);
      if (error) throw new Error(`${table}: ${error.message}`);
      const rows = (data ?? []) as unknown as T[];
      out.push(...rows);
      if (rows.length < 1000) break;
    }
    return out;
  }

  // `source` is REQUIRED in the payload. Without it the State Board spine and the
  // NCERT/exam spines merge on (class, chapter_no) — State Board Ch.1 and NCERT
  // Ch.1 became one 54-row chapter, silently interleaving two different books.
  const concepts = await all<Concept>(
    "syllabus_concepts",
    "id,source,class,chapter_no,chapter_name,section_no,concept,seq",
  );
  const links = await all<Link>("syllabus_concept_exams", "concept_id,exam,status,note,covered_by");

  // WHICH JEE CHAPTERS ARE OLD SYLLABUS — derived from the bank, not asserted.
  // A chapter whose newest PYQ is 2021 has not been examined since the 2023-24
  // rationalisation; one that reaches 2026 is live. Computing it here means the
  // flag re-derives itself as the bank grows, instead of rotting in a hardcoded
  // list. (s-Block looks dead on volume — 10 questions — but reaches 2026, so
  // volume is the wrong test; recency is the right one.)
  // Filtered SERVER-side on the embedded exam/subject. Selecting every question
  // and filtering in JS pulled ~24k rows to use ~700 of them, and would get worse
  // with every ingest; !inner + eq pushes the restriction into the query.
  type QRow = { pyq_year: number | null; chapters: { name: string } | null };
  const lastYearByChapter = new Map<string, number>();
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("questions")
      .select("pyq_year,exams!inner(name),subjects!inner(name),chapters!inner(name)")
      .eq("exams.name", "JEE Mains")
      .eq("subjects.name", "Chemistry")
      .eq("visibility", "PUBLIC")
      .eq("question_kind", "pyq")
      .range(from, from + 999);
    if (error) throw new Error(`jee years: ${error.message}`);
    const rows = (data ?? []) as unknown as QRow[];
    for (const r of rows) {
      const ch = r.chapters?.name;
      if (!ch || !r.pyq_year) continue;
      lastYearByChapter.set(ch, Math.max(lastYearByChapter.get(ch) ?? 0, r.pyq_year));
    }
    if (rows.length < 1000) break;
  }
  const LIVE_FROM = 2023;
  const oldSyllabusChapters = [...lastYearByChapter]
    .filter(([, yr]) => yr < LIVE_FROM)
    .map(([ch]) => ch);
  console.log(
    `  JEE old-syllabus chapters (no PYQ since ${LIVE_FROM}): ${oldSyllabusChapters.length}` +
      (oldSyllabusChapters.length ? ` — ${oldSyllabusChapters.join(", ")}` : ""),
  );

  // Compact payload: index concepts, then emit links as [conceptIdx, examIdx, status].
  // The raw join is ~3.4k rows; inlining it verbatim would triple the file for no gain.
  const exams = [...new Set(links.map((l) => l.exam))].sort((a, b) =>
    a === "MH State Board" ? -1 : b === "MH State Board" ? 1 : a.localeCompare(b),
  );
  const idIndex = new Map(concepts.map((c, i) => [c.id, i]));
  const examIndex = new Map(exams.map((e, i) => [e, i]));
  const STATUS = ["full", "partial", "not"];

  // Notes are PER CONCEPT, deduplicated through a string pool.
  //
  // An earlier version keyed them per (source, chapter, exam) on the assumption
  // that rulings are chapter-grained. That holds for the State Board and exam
  // spines but NOT for NCERT, whose rulings are per SECTION: Vitamins (10.4) and
  // Hormones (10.6) share chapter 10, so Hormones displayed the Vitamins note.
  // The pool keeps the file small without letting one ruling stand in for another.
  const notePool: string[] = [];
  const poolIndex = new Map<string, number>();
  const noteOf: Record<string, number> = {};
  // covered_by keeps its own pool, separate from notes: a row can carry a mapping
  // without a caveat, and vice versa.
  //
  // Each entry is [refs, names, chapters]. Only names and chapters are rendered:
  // a name already leads with its section number ("11.4 Alcohols and Phenols"),
  // so a separate ref column just repeated it. `refs` is kept because it is the
  // compact form, useful for any surface that wants numbers alone.
  //
  // Titles are resolved CLASS-SCOPED. A bare section number is ambiguous across
  // the two years (State Board Std XI 2.5 is not Std XII 2.5), and cross-year
  // mappings are the common case in this data, not the exception.
  //
  // ONE LOOKUP PER BOOK. A ruling's refs point into whichever syllabus its `exam`
  // column names, so resolving them all against the State Board would label an
  // NCERT ref with a State Board chapter — NCERT 7.4 (Alcohols, Phenols and
  // Ethers) would read as State Board Std XII Ch.7 (Groups 16, 17 and 18). That
  // is a confident pointer at the wrong book, the worst failure this table has.
  const titleByBook = new Map<string, Map<string, string>>();
  const chapterByBook = new Map<string, Map<string, string>>();
  const conceptClassOf = new Map<string, number>();
  for (const c of concepts) {
    conceptClassOf.set(c.id, c.class);
    if (!titleByBook.has(c.source)) {
      titleByBook.set(c.source, new Map());
      chapterByBook.set(c.source, new Map());
    }
    titleByBook.get(c.source)!.set(`${c.class}|${c.section_no}`, c.concept);
    chapterByBook.get(c.source)!.set(`${c.class}|${c.chapter_no}`, c.chapter_name);
  }
  // Which spine an `exam` column refers to when it appears on an exam-spine row.
  const BOOK_OF_EXAM: Record<string, string> = {
    "MH State Board": "MH State Board",
    "CBSE Class 12": "NCERT",
  };
  const sbTitleByClassNo = titleByBook.get("MH State Board") ?? new Map();
  // Third element: the State Board CHAPTER(S). The table used to print the NCERT
  // chapter here, which merely repeated the group heading the row already sits
  // under. The chapter a section lands in is the part that carries information —
  // it is routinely NOT the same-numbered chapter, and sometimes not even the
  // same school year.
  const resolveCovered = (
    raw: string,
    conceptId: string,
    exam: string,
  ): [string, string, string, number] => {
    const book = BOOK_OF_EXAM[exam] ?? "MH State Board";
    const titleMap = titleByBook.get(book) ?? new Map<string, string>();
    const chapterMap = chapterByBook.get(book) ?? new Map<string, string>();
    const defaultCls = conceptClassOf.get(conceptId);
    const parts = raw.split(",").map((x) => x.trim()).filter(Boolean);
    const refs: string[] = [];
    const names: string[] = [];
    const chapters: string[] = [];
    // Resolve first, THEN label. An earlier version printed the year only when the
    // ref carried an explicit prefix, so Std XI rows were labelled and Std XII
    // rows were bare — which reads as though the unlabelled ones have no year
    // rather than being the other one. Every chapter now states its year.
    const seen: { cls: number; no: string; title: string; chNo: string; chName: string }[] = [];
    for (const ref of parts) {
      const m = ref.match(/^(XI|XII):(.+)$/);
      const cls = (m ? (m[1] === "XII" ? 12 : 11) : defaultCls) ?? 12;
      const no = m ? m[2].trim() : ref;
      const chNo = no.split(".")[0];
      seen.push({
        cls,
        no,
        title: titleMap.get(`${cls}|${no}`) ?? "",
        chNo,
        chName: chapterMap.get(`${cls}|${chNo}`) ?? "",
      });
    }
    // The subtopic column repeats the year only when a row spans BOTH years —
    // that is the only case where the numbers alone are ambiguous. Otherwise the
    // chapter column beside it already says which book.
    const spansYears = new Set(seen.map((x) => x.cls)).size > 1;
    const yrOf = (cls: number) => `Std ${cls === 12 ? "XII" : "XI"} `;
    for (const x of seen) {
      const pre = spansYears ? yrOf(x.cls) : "";
      refs.push(`${pre}${x.no}`);
      names.push(x.title ? `${pre}${x.no} ${x.title}` : `${pre}${x.no}`);
      const label = x.chName
        ? `${yrOf(x.cls)}Ch.${x.chNo} ${x.chName}`
        : `${yrOf(x.cls)}Ch.${x.chNo}`;
      if (!chapters.includes(label)) chapters.push(label);
    }
    // Order on the FIRST pointer: a row spanning two chapters must be filed
    // under one, and the first is the one its own mapping leads with.
    const head = seen[0];
    const sortKey = head ? head.cls * 1000 + (Number(head.chNo) || 0) : Number.MAX_SAFE_INTEGER;
    return [refs.join(", "), names.join(" · "), chapters.join(" + "), sortKey];
  };
  const coveredPool: [string, string, string, number][] = [];
  const coveredIndex = new Map<string, number>();
  const coveredOf: Record<string, number> = {};
  const compactLinks: number[][] = [];
  for (const l of links) {
    const ci = idIndex.get(l.concept_id);
    const ei = examIndex.get(l.exam);
    if (ci === undefined || ei === undefined) continue;
    compactLinks.push([ci, ei, STATUS.indexOf(l.status)]);
    if (l.note) {
      let pi = poolIndex.get(l.note);
      if (pi === undefined) {
        pi = notePool.length;
        notePool.push(l.note);
        poolIndex.set(l.note, pi);
      }
      noteOf[`${ci}|${ei}`] = pi;
    }
    if (l.covered_by) {
      const rendered = resolveCovered(l.covered_by, l.concept_id, l.exam);
      const key = JSON.stringify(rendered);
      let pi = coveredIndex.get(key);
      if (pi === undefined) {
        pi = coveredPool.length;
        coveredPool.push(rendered);
        coveredIndex.set(key, pi);
      }
      coveredOf[`${ci}|${ei}`] = pi;
    }
  }

  // State Board first — it is the baseline every other spine is measured against.
  const sources = [...new Set(concepts.map((c) => c.source))].sort((a, b) =>
    a === "MH State Board" ? -1 : b === "MH State Board" ? 1 : a.localeCompare(b),
  );
  const srcIndex = new Map(sources.map((s, i) => [s, i]));

  // Which State Board SUBTOPIC covers each NCERT subtopic. Candidates are drawn
  // only from the mapped State Board chapter(s) — matching across the whole book
  // would pair headings that merely share a word.
  // Parent-title lookups, so a sub-section is matched WITH its context. Bare
  // "Physical properties" under Aromatic Hydrocarbons otherwise matched the State
  // Board's "Physical properties of alkanes" — a confident pointer to the wrong
  // section, which is the worst outcome for someone answering a student.
  const sbTitleByNo = new Map<string, string>();
  const ncertTitleByNo = new Map<string, string>();
  for (const c of concepts) {
    if (c.source === "MH State Board") sbTitleByNo.set(c.section_no, c.concept);
    else if (c.source === "NCERT") ncertTitleByNo.set(`${c.class}|${c.section_no}`, c.concept);
  }
  const ncertParent = new Map(
    [...ncertTitleByNo].map(([k, v]) => [k.split("|")[1], v]),
  );

  const sbByChapter = new Map<string, { sectionNo: string; title: string; parent?: string }[]>();
  for (const c of concepts) {
    if (c.source !== "MH State Board") continue;
    const k = `${c.class}-${c.chapter_no}`;
    if (!sbByChapter.has(k)) sbByChapter.set(k, []);
    sbByChapter.get(k)!.push({
      sectionNo: c.section_no,
      title: c.concept,
      parent: parentTitle(c.section_no, sbTitleByNo),
    });
  }
  const ncertMatch: Record<string, [string, string] | null> = {};
  for (const c of concepts) {
    if (c.source !== "NCERT") continue;
    const mappedChapters = NCERT_TO_SB[`${c.class}-${c.chapter_no}`] ?? [];
    const candidates = mappedChapters.flatMap((k) => sbByChapter.get(k) ?? []);
    const m = bestMatch(c.concept, candidates, parentTitle(c.section_no, ncertParent));
    ncertMatch[`${c.class}|${c.section_no}`] = m ? [m.sectionNo, m.title] : null;
  }
  const matched = Object.values(ncertMatch).filter(Boolean).length;
  console.log(`  NCERT->State Board subtopic matches: ${matched}/${Object.keys(ncertMatch).length}`);

  const payload = {
    ncertMatch,
    exams,
    sources,
    statuses: STATUS,
    // The exam spines carry their PYQ count inside the concept NAME
    // ("Diazonium Salts (12 PYQ)"). Split it here, in TypeScript, rather than in
    // the page: this file emits the page through a template literal, which eats
    // the backslashes in a regex literal — /\((\d+)\s*PYQ\)/ reached the browser
    // as /(((d+)s*PYQ)/ and silently returned 0 for every row. Index 7 is the
    // count, and the name is stored already cleaned.
    concepts: concepts.map((c) => {
      const m = c.concept.match(/^(.*?)\s*\((\d+)\s*PYQ\)\s*$/);
      return [
        srcIndex.get(c.source)!,
        c.class,
        c.chapter_no,
        c.chapter_name,
        c.section_no,
        m ? m[1] : c.concept,
        c.seq,
        m ? Number(m[2]) : 0,
      ];
    }),
    links: compactLinks,
    oldSyllabus: oldSyllabusChapters,
    liveFrom: LIVE_FROM,
    notePool,
    noteOf,
    coveredPool,
    coveredOf,
    generatedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
  };

  console.log(
    `  covered_by: ${coveredPool.length} distinct mapping(s) across ${Object.keys(coveredOf).length} rows`,
  );
  const html = render(JSON.stringify(payload));

  const dir = join(process.cwd(), "generated-papers");
  mkdirSync(dir, { recursive: true });
  const dest = join(dir, "syllabus-map.html");
  writeFileSync(dest, html, "utf8");
  console.log(`WROTE ${dest}`);
  console.log(`  ${concepts.length} concepts · ${links.length} rulings · ${exams.length} exams`);
  console.log(`  ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB — open it with file://`);
}

function render(dataJson: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Syllabus map — Chemistry</title>
<style>
  :root{
    --bg:#fff; --fg:#18181b; --muted:#71717a; --line:#e4e4e7; --panel:#fafafa;
    --brand:#4f46e5; --brand-fg:#fff;
    --full-bg:#ecfdf5; --full-fg:#065f46;
    --part-bg:#fffbeb; --part-fg:#92400e;
    /* 'not' is an adjudicated exclusion, so it is a solid chip with full-contrast
       text — never the muted grey used for genuinely-absent data. */
    --not-bg:#ffe4e6;  --not-fg:#9f1239;
    --mix-bg:#eff6ff;  --mix-fg:#1e40af;
    --none-fg:#c4c4c8;
  }
  @media (prefers-color-scheme:dark){
    :root{
      --bg:#09090b; --fg:#fafafa; --muted:#a1a1aa; --line:#27272a; --panel:#111113;
      --brand:#818cf8; --brand-fg:#09090b;
      --full-bg:#022c22; --full-fg:#6ee7b7;
      --part-bg:#2e1a05; --part-fg:#fcd34d;
      --not-bg:#3f0d18;  --not-fg:#fda4af;
      --mix-bg:#0b1e3d;  --mix-fg:#93c5fd;
      --none-fg:#3f3f46;
    }
  }
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--fg);
       font:14px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
  .wrap{max-width:1200px;margin:0 auto;padding:24px}
  h1{font-size:22px;margin:0 0 4px}
  h2{font-size:13px;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);margin:28px 0 8px}
  .sub{color:var(--muted);font-size:13px;margin:0 0 4px}
  table{border-collapse:collapse;width:100%;font-size:13px}
  th,td{padding:6px 8px;text-align:left;border-bottom:1px solid var(--line)}
  thead th{position:sticky;top:0;background:var(--panel);font-size:11px;
           text-transform:uppercase;letter-spacing:.03em;color:var(--muted);z-index:2}
  .num{text-align:right;font-variant-numeric:tabular-nums;color:var(--muted)}
  .box{border:1px solid var(--line);border-radius:8px;overflow:auto;max-height:78vh}
  .chip{display:inline-block;padding:2px 8px;border-radius:999px;font-size:12px;
        border:1px solid var(--line);background:transparent;color:var(--fg);cursor:pointer}
  .chip[aria-pressed="true"]{background:var(--brand);color:var(--brand-fg);border-color:transparent}
  .cell{display:block;text-align:center;padding:2px 6px;border-radius:4px;font-size:11px;font-weight:600}
  .full{background:var(--full-bg);color:var(--full-fg)}
  .partial{background:var(--part-bg);color:var(--part-fg)}
  .not{background:var(--not-bg);color:var(--not-fg)}
  .mixed{background:var(--mix-bg);color:var(--mix-fg)}
  .none{color:var(--none-fg);background:transparent;font-weight:400}
  .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
  .legend{display:flex;flex-wrap:wrap;gap:14px;align-items:center;margin:6px 0 14px;
          font-size:12px;color:var(--muted)}
  .legend span.cell{min-width:44px}
  tr.chap{background:var(--panel);font-weight:600;cursor:pointer}
  tr.chap:hover{background:var(--line)}
  tr.sec td:first-child{padding-left:22px;font-family:ui-monospace,Menlo,Consolas,monospace;
                        font-size:11px;color:var(--muted)}
  tr.con td:first-child{padding-left:40px;font-family:ui-monospace,Menlo,Consolas,monospace;
                        font-size:11px;color:var(--muted)}
  tr.con{font-size:12.5px}
  .bar{display:flex;height:8px;border-radius:999px;overflow:hidden;min-width:110px;border:1px solid var(--line)}
  .bar i{display:block;height:100%}
  .toolbar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:8px 0 12px}
  input[type=search]{padding:6px 10px;border:1px solid var(--line);border-radius:6px;
                     background:var(--bg);color:var(--fg);min-width:230px;font-size:13px}
  .note{font-size:12px;color:var(--muted);border-left:3px solid var(--line);
        padding:6px 10px;margin:6px 0;background:var(--panel);border-radius:0 6px 6px 0}
  .warn{border-left-color:#f59e0b;color:var(--part-fg);background:var(--part-bg)}
  .grid{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
  .card{border:1px solid var(--line);border-radius:8px}
  .card h3{margin:0;padding:8px 10px;font-size:12px;background:var(--panel);border-bottom:1px solid var(--line)}
  .card li{display:flex;justify-content:space-between;gap:8px;padding:6px 10px;
           border-bottom:1px solid var(--line);font-size:12.5px;list-style:none}
  .card ul{margin:0;padding:0}
  .foot{color:var(--muted);font-size:11px;margin-top:22px}
  .hide{display:none}
</style>
</head>
<body>
<div class="wrap">
  <h1>Syllabus map — Chemistry</h1>
  <p class="sub" id="headline"></p>
  <div class="toolbar" id="spineChips"></div>
  <p class="sub" id="spineNote" style="font-size:12px"></p>
  <p class="sub" style="font-size:12px">
    <strong>What this page is:</strong> a list of every numbered section of the Maharashtra
    State Board Std XI + XII Chemistry textbooks, and for each one, whether a given exam
    requires it. The State Board syllabus is the fixed baseline; the exams are measured
    <em>against</em> it. This page never counts anything outside those books.
  </p>
  <div class="legend">
    <strong style="color:var(--fg)">Each cell = does this exam require this State Board concept?</strong>
    <span><span class="cell full">Yes</span> required</span>
    <span><span class="cell partial">Part</span> partly required</span>
    <span><span class="cell not">No</span> reviewed, <strong>not</strong> required</span>
    <span><span class="cell mixed">Mixed</span> concepts differ — expand</span>
    <span><span class="cell none">–</span> not yet assessed</span>
  </div>

  <h2>Is each exam covered by the State Board syllabus?</h2>
  <p class="sub" style="font-size:12px;margin:0 0 8px">
    Each row counts <strong>that exam's own subtopics</strong> — so the base differs per row,
    which is the point. Read a row as a sentence:
    <em>"JEE Mains asks 150 subtopics; the State Board covers 136, partly covers 2,
    and does not cover 12."</em>
    The last column is the gap to work on.
  </p>
  <div class="box" style="max-height:none"><table id="coverage"></table></div>

  <div id="sbOnly">
  <h2>Gap — subtopics the State Board does not fully cover</h2>
  <div class="toolbar" id="gapChips"></div>
  <div id="gapOut"></div>

  </div>
  <div id="spineSummary"></div>
  <h2>Chapter → section → concept</h2>
  <div class="toolbar">
    <input type="search" id="q" placeholder="Filter concepts…" aria-label="Filter concepts">
    <button class="chip" id="expandAll" aria-pressed="false">Expand all</button>
    <label style="margin-left:10px"><input type="checkbox" id="mSubs"> show concepts (N.M.x)</label>
    <span class="sub" id="count"></span>
  </div>
  <div class="box"><table id="matrix"></table></div>

  <h2>NCERT Std XI + XII — which State Board subtopic covers each</h2>
  <p class="sub" style="font-size:12px">
    Rows are NCERT sections. The right-hand columns name the <strong>State Board subtopic</strong>
    that covers each one. Matching is automatic (title overlap within the mapped chapter) and
    deliberately conservative — a weak overlap is reported as <strong>no match</strong> rather
    than asserting a correspondence that may not hold, so blanks include both real gaps and
    wording mismatches. Treat it as a review list.
  </p>
  <p class="note" style="margin-bottom:10px">
    <strong>Why this count differs from the gap section above.</strong>
    That section reports <strong>adjudicated rulings</strong> — sections read by hand and judged
    uncovered. This table reports <strong>title matches</strong> — whether the matcher could name
    the State Board subtopic. They measure different things, so an unmatched row is usually
    <em>not</em> a gap: most unmatched sections are ruled fully covered, and the matcher simply
    could not pair the titles. Only rows badged <span class="cell not" style="display:inline-block">No</span>
    are adjudicated gaps.
  </p>
  <div class="toolbar">
    <input type="search" id="nq" placeholder="Filter NCERT subtopics…" aria-label="Filter NCERT subtopics">
    <label style="margin-left:10px"><input type="checkbox" id="nSubs"> show sub-sections (N.M.x — auto-matched only)</label>
    <label class="sub"><input type="checkbox" id="nOnlyGaps"> show only unmatched</label>
    <span class="sub" id="ncount"></span>
  </div>
  <div class="box"><table id="ncert"></table></div>

  <h2>JEE Mains — which State Board subtopic covers each</h2>
  <p class="sub" style="font-size:12px">
    Rows are what JEE Mains <strong>actually asked</strong>, taken from the question bank, so each
    carries its PYQ count and the gaps sort by exam weight. Every pointer here was read off both
    books by hand — there is no automatic matching in this table.
  </p>
  <p class="note" style="margin-bottom:10px">
    <strong>What this table can and cannot tell you.</strong> Because the spine is the BANK
    taxonomy rather than the official syllabus, it measures what JEE demonstrably asked in the
    years the bank holds. A row badged <span class="cell not" style="display:inline-block">No</span>
    is a topic JEE asks and the State Board does not teach. But something in the official syllabus
    that was never sampled has <em>no row at all</em> — so absence from this list is not evidence
    of absence from the exam.
  </p>
  <div class="toolbar">
    <input type="search" id="jq" placeholder="Filter JEE subtopics…" aria-label="Filter JEE subtopics">
    <label style="margin-left:10px"><input type="checkbox" id="jOnlyGaps"> show only gaps and partials</label>
    <label class="sub"><input type="checkbox" id="jByWeight"> sort by PYQ weight</label>
    <span class="sub" id="jcount"></span>
  </div>
  <div class="box"><table id="jee"></table></div>

  <p class="foot" id="foot"></p>
</div>
<script id="data" type="application/json">${dataJson}</script>
<script>
const D = JSON.parse(document.getElementById('data').textContent);
const EXAMS = D.exams, ST = D.statuses, SOURCES = D.sources;
const SB = 'MH State Board';
// The NCERT rulings on an exam-spine row are stored under this exam name: on an
// exam spine the exam column names WHICH SYLLABUS is being asked about, so one
// JEE subtopic carries a State Board answer and an NCERT answer side by side.
const NC = 'CBSE Class 12';
// Chapters an exam no longer examines, derived from the bank at export time.
// Declared HERE, above the coverage summary that uses it — as a const it is in
// the temporal dead zone until evaluated, so a later declaration would throw.
const OLD_SYL=new Set(D.oldSyllabus||[]);
function isOld(c){ return OLD_SYL.has(c.chName); }
/** Note for one concept under one exam, or '' — resolved through the string pool. */
function esc(t){ return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;'); }
// Distinguishes a mapping a human read off both books from one the title matcher
// guessed. Both are useful; conflating them is not.
function badge(kind){
  return kind==='verified'
    ? '<span class="sub" style="font-size:10px;border:1px solid var(--line);border-radius:8px;padding:0 5px">verified</span>'
    : '<span class="sub" style="font-size:10px;opacity:.7">auto-matched</span>';
}
function noteHtml(c, exam){
  const n=noteFor(c.i, exam);
  return n ? '<div class="sub" style="font-size:11px;margin-top:3px">'+esc(n)+'</div>' : '';
}
// Returns [refs, names] or null.
function coveredFor(conceptIdx, exam){
  const pi = D.coveredOf[conceptIdx+'|'+EXAMS.indexOf(exam)];
  return pi===undefined ? null : D.coveredPool[pi];
}
function noteFor(conceptIdx, exam){
  const pi = D.noteOf[conceptIdx+'|'+EXAMS.indexOf(exam)];
  return pi===undefined ? '' : D.notePool[pi];
}
// Which spine is on screen. The State Board spine and the exam/NCERT spines
// answer OPPOSITE questions, so they can never share one table:
//   State Board spine -> rows are SB concepts; "does exam X require this?"
//   other spine       -> rows are what X teaches/asks; "does the SB cover it?"
let spine = SB;
/**
 * Every ADJUDICATED state gets a word and a colour; only the UNKNOWN state gets a
 * grey dash. The first cut had this inverted — 'not' rendered as an em-dash in
 * muted grey, so a confident "excluded from the syllabus" looked like missing
 * data, while 'unassessed' got the louder '?'. That destroys the one distinction
 * this table exists to preserve.
 */
const SHORT = {full:'Yes', partial:'Part', not:'No'};
// "in syllabus" begs the question "whose?" — always name the exam's relationship
// to this State Board concept.
const LABEL = {full:'Required by this exam', partial:'Partly required by this exam',
               not:'NOT required by this exam (reviewed)'};

// concepts: [sourceIdx, class, chapterNo, chapterName, sectionNo, concept, seq]
const ALL = D.concepts.map((r,i)=>({i,src:SOURCES[r[0]],cls:r[1],ch:r[2],chName:r[3],sec:r[4],name:r[5],seq:r[6],pyq:r[7]||0,st:{}}));
for (const [ci,ei,si] of D.links) ALL[ci].st[EXAMS[ei]] = ST[si];
let C = ALL.filter(c=>c.src===spine);

const groupKey = s => { const m=/^(\\d+)\\.(\\d+)/.exec(String(s).trim()); return m? m[1]+'.'+m[2] : String(s).trim(); };
const isTop = s => groupKey(s) === String(s).trim();

function roll(list, exam){
  const v = list.map(c=>c.st[exam] ?? null);
  if(!v.length) return null;
  const seen = v.filter(x=>x!==null);
  if(seen.length !== v.length) return seen.length ? 'mixed' : null;
  return seen.every(x=>x===seen[0]) ? seen[0] : 'mixed';
}

// build chapter -> section -> concepts
let chapters = [], byCh = new Map();
function rebuild(){
  C = ALL.filter(c=>c.src===spine);
  chapters = []; byCh = new Map();
  for (const c of C){
    // Keyed within the spine only. Keying across spines merged State Board Ch.1
    // with NCERT Ch.1 into one 54-row chapter.
    const k = c.cls+'-'+c.ch;
    let ch = byCh.get(k);
    if(!ch){ ch={key:k,cls:c.cls,ch:c.ch,name:c.chName,items:[],secs:new Map()}; byCh.set(k,ch); chapters.push(ch); }
    ch.items.push(c);
    const gk = groupKey(c.sec);
    let s = ch.secs.get(gk);
    if(!s){ s={key:gk,title:gk,items:[],seq:c.seq}; ch.secs.set(gk,s); }
    s.items.push(c); s.seq=Math.min(s.seq,c.seq);
    if(isTop(c.sec)) s.title=c.name;
  }
  chapters.sort((a,b)=>a.cls-b.cls||a.ch-b.ch);
  for(const ch of chapters) ch.sections=[...ch.secs.values()].sort((a,b)=>a.seq-b.seq);
}
rebuild();

/** The exam columns that make sense for the current spine. */
function activeExams(){ return spine===SB ? EXAMS.filter(e=>e!==SB) : [SB]; }

function drawHeadline(){
  document.getElementById('headline').textContent =
    C.length+' concepts · '+chapters.length+' chapters · spine: '+spine;
  document.getElementById('spineNote').innerHTML = spine===SB
    ? 'Rows are <strong>State Board</strong> concepts. Each column asks: <em>does that exam require this?</em>'
    : 'Rows are what <strong>'+spine.replace(' bank taxonomy','')+'</strong> teaches or asks. One column asks: <em>does the State Board syllabus cover it?</em> Anything marked <strong>No</strong> is a gap.';
}
document.getElementById('foot').textContent =
  'Generated '+D.generatedAt+' from the live bank. Prototype for layout iteration — the shipped page is /dashboard/syllabus.';

function cell(st){
  const cls = st===null||st===undefined ? 'none' : st;
  // Unknown gets the faint dash; a reviewed exclusion never does.
  const txt = st===null||st===undefined ? '–' : (st==='mixed'?'Mixed':SHORT[st]);
  const ttl = st===null||st===undefined ? 'Not yet assessed — no ruling exists' : (st==='mixed'?'Concepts differ — expand':LABEL[st]);
  return '<span class="cell '+cls+'" title="'+ttl+'"><span class="sr">'+ttl+'</span>'+txt+'</span>';
}

/* coverage */
(function(){
  // Rows are each EXAM's / book's OWN subtopics; the columns say how many of them
  // the State Board syllabus teaches. The base differs per row on purpose — that
  // is the point. An earlier version counted the 864 State Board concepts on every
  // row, which answered the opposite question and read as "95 CET topics missing
  // from the State Board" when it meant "95 State Board topics CET never asks".
  let h='<thead><tr><th>Exam / book</th>'+
        '<th class="num">Its own subtopics</th>'+
        '<th class="num">Covered in State Board</th>'+
        '<th class="num">Partly</th>'+
        '<th class="num">NOT covered (gap)</th>'+
        '<th>Share covered</th></tr></thead><tbody>';
  for(const src of SOURCES){
    if(src===SB) continue;                       // the State Board vs itself is meaningless
    // LIVE subtopics only. Counting chapters the exam no longer sets inflates the
    // gap with history — JEE read "15 not covered" when 10 of those were in
    // chapters last examined in 2021, so the number to act on is 5.
    const all_ = ALL.filter(c=>c.src===src);
    const mine = all_.filter(c=>!isOld(c));
    const oldN = all_.length-mine.length;
    let f=0,p=0,n=0;
    for(const c of mine){ const st=c.st[SB]; if(st==='full')f++; else if(st==='partial')p++; else if(st==='not')n++; }
    const pc=x=>(x/(mine.length||1)*100).toFixed(1)+'%';
    const label=src.replace(' bank taxonomy','');
    const sub=(src.endsWith('bank taxonomy')?'from the question bank':'Std XI + XII sections')+
      (oldN?' · excludes '+oldN+' old-syllabus subtopics':'');
    h+='<tr><th>'+label+'<div class="sub" style="font-size:11px;margin:0">'+sub+'</div></th>'+
       '<td class="num">'+mine.length+'</td>'+
       '<td class="num">'+f+'</td>'+
       '<td class="num">'+(p||'—')+'</td>'+
       '<td class="num"><strong'+(n?' style="color:var(--not-fg)"':'')+'>'+n+'</strong></td>'+
       '<td><span class="bar" title="'+pc(f)+' covered, '+pc(p)+' partly, '+pc(n)+' not covered">'+
       '<i style="width:'+pc(f)+';background:var(--full-fg)"></i>'+
       '<i style="width:'+pc(p)+';background:var(--part-fg)"></i>'+
       '<i style="width:'+pc(n)+';background:var(--not-fg)"></i></span></td></tr>';
  }
  document.getElementById('coverage').innerHTML=h+'</tbody>';
})();

/* gap view */
let gapExam=null;
// Chips are SPINES, not exams-on-the-State-Board-spine. The section lists the
// selected exam's OWN subtopics that the State Board does not fully cover, so it
// reads in the same direction as the summary table above it. An earlier version
// listed the reverse (State Board chapters the exam does not need), which
// contradicted the table directly above and confused which way the gap ran.
const GAP_SOURCES = SOURCES.filter(x=>x!==SB);
const chipBox=document.getElementById('gapChips');
for(const src of GAP_SOURCES){
  const b=document.createElement('button');
  b.className='chip'; b.textContent=src.replace(' bank taxonomy',''); b.setAttribute('aria-pressed','false');
  b.onclick=()=>{ gapExam = gapExam===src ? null : src; drawGap(); };
  chipBox.appendChild(b);
}
function drawGap(){
  [...chipBox.children].forEach((b,i)=>b.setAttribute('aria-pressed', String(GAP_SOURCES[i]===gapExam)));
  const out=document.getElementById('gapOut');
  if(!gapExam){ out.innerHTML='<p class="sub">Pick an exam to list the subtopics the State Board does not fully cover.</p>'; return; }
  const label=gapExam.replace(' bank taxonomy','');
  const mineAll=ALL.filter(c=>c.src===gapExam);
  const mine=mineAll.filter(c=>!isOld(c));
  const oldSkipped=mineAll.length-mine.length;
  const not=mine.filter(c=>c.st[SB]==='not');
  const part=mine.filter(c=>c.st[SB]==='partial');
  const unassessed=mine.filter(c=>!c.st[SB]);

  let h='<p class="sub">Of <strong>'+mine.length+'</strong> '+label+' subtopics, the State Board does <strong>not cover '+
        not.length+'</strong>'+(part.length?' and only partly covers <strong>'+part.length+'</strong>':'')+
        (unassessed.length?'; '+unassessed.length+' not yet assessed':'')+'.'+
        (oldSkipped?' <span class="sub">('+oldSkipped+' subtopics in chapters no longer examined are excluded.)</span>':'')+'</p>';
  if(!not.length && !part.length){
    out.innerHTML=h+'<p class="note">No gaps — every '+label+' subtopic is covered by the State Board syllabus.</p>';
    return;
  }
  const rows=(list,cls)=>list.map(c=>{
    const note=noteFor(c.i, SB);
    return '<tr><td>'+cell(c.st[SB])+'</td><td>'+c.name+
      '<div class="sub" style="font-size:11px;margin:0">'+c.chName+'</div>'+
      (note?'<div class="note" style="margin:4px 0 0">'+note+'</div>':'')+'</td></tr>';
  }).join('');
  h+='<div class="box" style="max-height:none"><table><thead><tr>'+
     '<th style="width:64px">State Board</th><th>Subtopic — and why</th>'+
     '</tr></thead><tbody>'+rows(not)+rows(part)+'</tbody></table></div>';
  out.innerHTML=h;
}
drawGap();

/* matrix */
const open=new Set();
let expandAll=false;
function drawMatrix(){
  const q=document.getElementById('q').value.trim().toLowerCase();
  let h='<thead><tr><th style="width:70px">Ref</th><th>Chapter / section / concept</th><th class="num">n</th>'+
        activeExams().map(e=>'<th style="text-align:center">'+(spine===SB?e.replace(' Class 12',''):'Covered by State Board?')+'</th>').join('')+'</tr></thead><tbody>';
  let shown=0;
  for(const ch of chapters){
    const match = c => !q || c.name.toLowerCase().includes(q) || String(c.sec).includes(q);
    const anyMatch = ch.items.some(match);
    if(q && !anyMatch && !ch.name.toLowerCase().includes(q)) continue;
    const isOpen = expandAll || open.has(ch.key) || (q && anyMatch);
    h+='<tr class="chap" data-k="'+ch.key+'"><td>'+(ch.cls===11?'XI':'XII')+'.'+ch.ch+'</td>'+
       '<td>'+(isOpen?'▾ ':'▸ ')+ch.name+'</td><td class="num">'+ch.items.length+'</td>'+
       activeExams().map(e=>'<td>'+cell(roll(ch.items,e))+'</td>').join('')+'</tr>';
    if(!isOpen) continue;
    for(const s of ch.sections){
      const secItems = q ? s.items.filter(match) : s.items;
      if(q && !secItems.length) continue;
      h+='<tr class="sec"><td>'+s.key+'</td><td>'+s.title+'</td><td class="num">'+s.items.length+'</td>'+
         activeExams().map(e=>'<td>'+cell(roll(s.items,e))+'</td>').join('')+'</tr>';
      // SECTION (N.M) is the working grain for this table. The concept rows below
      // it are N.M.x, one level finer than anything that has been mapped or
      // adjudicated, so by default they only pad the table. Off unless asked for.
      if(!document.getElementById('mSubs').checked) continue;
      for(const c of secItems){
        if(isTop(c.sec) && s.items.length>1) continue; // its title is already the section row
        shown++;
        h+='<tr class="con"><td>'+c.sec+'</td><td>'+c.name+'</td><td class="num"></td>'+
           activeExams().map(e=>'<td>'+cell(c.st[e]??null)+'</td>').join('')+'</tr>';
      }
    }
  }
  document.getElementById('matrix').innerHTML=h+'</tbody>';
  document.getElementById('count').textContent = q ? shown+' concepts match' : '';
  document.querySelectorAll('tr.chap').forEach(tr=>tr.onclick=()=>{
    const k=tr.dataset.k; open.has(k)?open.delete(k):open.add(k); expandAll=false;
    document.getElementById('expandAll').setAttribute('aria-pressed','false'); drawMatrix();
  });
}
document.getElementById('q').addEventListener('input',drawMatrix);
document.getElementById('mSubs').addEventListener('change',drawMatrix);
document.getElementById('expandAll').onclick=e=>{
  expandAll=!expandAll; open.clear();
  e.target.setAttribute('aria-pressed',String(expandAll));
  e.target.textContent = expandAll?'Collapse all':'Expand all';
  drawMatrix();
};
function drawNcert(){
  const q=document.getElementById('nq').value.trim().toLowerCase();
  const onlyGaps=document.getElementById('nOnlyGaps').checked;
  // Sort by (class, chapter, section) NUMERICALLY. The payload arrives in DB
  // order, which interleaved chapters and printed the same chapter heading twice
  // with an unrelated one wedged between — a table nobody can read down.
  // String sort is not enough either: "1.10" must follow "1.9", not "1.1".
  const secKey=s=>String(s).split('.').map(n=>String(parseInt(n,10)||0).padStart(4,'0')).join('.');
  // TOP-LEVEL (N.M) ONLY by default. That is the agreed grain for this table, and
  // it is also the only grain that is hand-verified — sub-sections carry nothing
  // but title-matcher guesses, so showing them buries the 127 checked answers
  // under ~290 rows of noise. The toggle keeps them reachable without making them
  // the default view.
  const subs=document.getElementById('nSubs').checked;
  // isTop, NOT a regex. This file emits the page through a TS template literal, so
  // a backslash in a regex literal is eaten on the way out: /^\\d+\\.\\d+$/ was
  // written to the page as /^d+.d+$/, which matches nothing and rendered an EMPTY
  // table. isTop already exists, is used by the matrix above, and has no escapes.
  const rows=ALL.filter(c=>c.src==='NCERT' && (subs || isTop(c.sec))).slice().sort((a,b)=>
    a.cls-b.cls || a.ch-b.ch || secKey(a.sec).localeCompare(secKey(b.sec)));
  // No separate ref column: every name in the covering column already leads with
  // its section number ("1.2.1 Matter"), so a ref column only repeated it.
  let h='<thead><tr><th style="width:60px">NCERT</th><th>NCERT subtopic</th>'+
        '<th style="width:170px">State Board chapter</th>'+
        '<th>Covered by State Board subtopic</th></tr></thead><tbody>';
  let shown=0, lastCh='';
  for(const c of rows){
    // A HAND-VERIFIED covered_by always beats the title matcher. The matcher
    // guesses from title similarity; these were read off both books. Showing a
    // guess where a verified answer exists is how a student gets sent to the
    // wrong page.
    const cb=coveredFor(c.i, SB);
    const m=D.ncertMatch[c.cls+'|'+c.sec];
    if(onlyGaps && (cb || m)) continue;
    if(q && !(c.name.toLowerCase().includes(q)||c.chName.toLowerCase().includes(q)||String(c.sec).includes(q))) continue;
    shown++;
    const chLabel='Std '+(c.cls===11?'XI':'XII')+' · '+c.ch+'. '+c.chName;
    if(chLabel!==lastCh){ lastCh=chLabel;
      h+='<tr class="chap"><td colspan="4">'+chLabel+'</td></tr>'; }
    h+='<tr><td class="num">'+c.sec+'</td><td>'+c.name+'</td>'+
       '<td class="sub" style="font-size:11px">'+(cb ? esc(cb[2]) : '')+'</td>'+
       (cb ? '<td>'+esc(cb[1])+' '+badge('verified')+noteHtml(c,SB)+'</td>'
        // The auto-matcher returns [ref, title] separately, so join them into the
        // same "<number> <title>" shape the verified rows already use.
        : m ? '<td>'+m[0]+' '+m[1]+' '+badge('auto')+'</td>'
          : '<td>'+cell(c.st[SB]==='not'?'not':null)+
            ' <span class="sub" style="font-size:11px">'+
            (c.st[SB]==='not'?'not covered — adjudicated gap':'no confident title match — review')+
            '</span>'+noteHtml(c,SB)+'</td>')+'</tr>';
  }
  document.getElementById('ncert').innerHTML=h+'</tbody>';
  const total=rows.length, unmatched=rows.filter(c=>!D.ncertMatch[c.cls+'|'+c.sec]).length;
  const verified=rows.filter(c=>coveredFor(c.i,SB)).length;
  const topLevel=rows.length;
  document.getElementById('ncount').textContent=shown+' shown · '+verified+' of '+topLevel+' hand-verified against both books';
}
/* JEE Mains spine. Rows are bank subtopics, so each carries a PYQ count; that is
   what lets the gaps be ranked by what they actually cost in the exam. */
const JEE_SRC='JEE Mains bank taxonomy';
function drawJee(){
  const q=document.getElementById('jq').value.trim().toLowerCase();
  const onlyGaps=document.getElementById('jOnlyGaps').checked;
  const byWeight=document.getElementById('jByWeight').checked;
  let rows=ALL.filter(c=>c.src===JEE_SRC);
  if(q) rows=rows.filter(c=>c.name.toLowerCase().includes(q)||c.chName.toLowerCase().includes(q));
  if(onlyGaps) rows=rows.filter(c=>c.st[SB]==='not'||c.st[SB]==='partial');
  // Old-syllabus chapters sink to the bottom in BOTH orders — they are history,
  // and letting a dead chapter outrank a live one by PYQ count would misdirect
  // exactly the prioritisation this table exists to support.
  // Grouped by the JEE chapter. Ordering along the State Board book was tried and
  // reverted: it scattered each exam chapter across the table, and "what does JEE
  // ask in Amines" matters more than "what does JEE ask about SB Ch.13".
  rows=rows.slice().sort((a,b)=>
    (isOld(a)?1:0)-(isOld(b)?1:0) ||
    (byWeight ? b.pyq-a.pyq : a.chName.localeCompare(b.chName)||b.pyq-a.pyq));
  let h='<thead><tr><th style="width:52px">PYQ</th><th>JEE subtopic</th>'+
        '<th style="width:150px">State Board chapter</th>'+
        '<th>Covered by State Board subtopic</th>'+
        '<th style="width:150px">NCERT chapter</th>'+
        '<th>Covered by NCERT subtopic</th></tr></thead><tbody>';
  let lastCh='';
  for(const c of rows){
    // Chapter bands only make sense in chapter order; weight order is a flat list.
    if(!byWeight && c.chName!==lastCh){ lastCh=c.chName;
      h+='<tr class="chap"><td colspan="6">'+esc(c.chName)+
         (isOld(c)?' <span class="sub" style="font-weight:400;font-size:11px">— OLD SYLLABUS, not examined since '+D.liveFrom+'</span>':'')+
         '</td></tr>'; }
    const cb=coveredFor(c.i, SB);
    const st=c.st[SB];
    const nb=coveredFor(c.i, NC);
    const nst=c.st[NC];
    h+='<tr'+(isOld(c)?' style="opacity:.62"':'')+'><td class="num">'+c.pyq+'</td><td>'+esc(c.name)+
       (isOld(c)?' <span class="sub" style="font-size:10px;border:1px solid var(--line);border-radius:8px;padding:0 5px">old syllabus</span>':'')+
       (st==='not'?' '+cell('not'):st==='partial'?' '+cell('partial'):'')+'</td>'+
       // State Board: chapter, then the covering subtopic. The section NUMBER is
       // already the head of each name ("11.4 Alcohols and Phenols"), so a
       // separate ref column only repeated it.
       '<td class="sub" style="font-size:11px">'+(cb?esc(cb[2]):'')+'</td>'+
       (cb ? '<td>'+esc(cb[1])+' '+badge('verified')+noteHtml(c,SB)+'</td>'
           : '<td><span class="sub" style="font-size:11px">'+
             (st==='not'?'not covered — nowhere to point':'no single section — see note')+
             '</span>'+noteHtml(c,SB)+'</td>')+
       // NCERT last, same two-column shape, so the two books read side by side.
       '<td class="sub" style="font-size:11px">'+(nb?esc(nb[2]):'')+'</td>'+
       (nb ? '<td>'+esc(nb[1])+(nst==='partial'?' '+cell('partial'):'')+noteHtml(c,NC)+'</td>'
           : '<td>'+cell(nst==='not'?'not':null)+
             '<span class="sub" style="font-size:11px"> '+
             (nst==='not'?'not in NCERT':'no single section')+'</span>'+noteHtml(c,NC)+'</td>')+
       '</tr>';
  }
  document.getElementById('jee').innerHTML=h+'</tbody>';
  const all=ALL.filter(c=>c.src===JEE_SRC);
  const gapPyq=all.filter(c=>c.st[SB]==='not').reduce((s,c)=>s+c.pyq,0);
  const live=all.filter(c=>!isOld(c));
  const liveGap=live.filter(c=>c.st[SB]==='not');
  const liveGapPyq=liveGap.reduce((s,c)=>s+c.pyq,0);
  const oldN=all.length-live.length;
  document.getElementById('jcount').textContent=
    rows.length+' shown · '+live.length+' live subtopics ('+oldN+' old-syllabus, listed last) · '+
    'State Board misses '+liveGap.length+' of the live ones ('+liveGapPyq+' PYQ) · '+
    all.filter(c=>c.st[SB]==='not').length+' including old ('+gapPyq+' PYQ)';
}
document.getElementById('jq').addEventListener('input',drawJee);
document.getElementById('jOnlyGaps').addEventListener('change',drawJee);
document.getElementById('jByWeight').addEventListener('change',drawJee);
drawJee();

document.getElementById('nq').addEventListener('input',drawNcert);
document.getElementById('nOnlyGaps').addEventListener('change',drawNcert);
document.getElementById('nSubs').addEventListener('change',drawNcert);
drawNcert();

drawMatrix();
redraw();
</script>
</body>
</html>`;
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
