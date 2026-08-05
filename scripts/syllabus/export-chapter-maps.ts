/**
 * The two teacher-facing CHAPTER maps, as Word files.
 *
 *   npx tsx scripts/syllabus/export-chapter-maps.ts --subject=physics
 *   -> generated-papers/<Subj>_NCERT_vs_SB.docx
 *   -> generated-papers/<Subj>_<Exam>_vs_SB_vs_NCERT.docx
 *
 * CHAPTER grain — "which chapter do I open?", not "which subtopic". Both are
 * DERIVED from the authored exam rulings by rolling each cited section ref up to
 * its chapter, so nothing here is invented: a pair appears only because some
 * subtopic's ruling cites a section in both chapters.
 *
 * The count after each chapter is how many exam subtopics support that pair. It
 * is what separates a real correspondence from one subtopic reaching across, and
 * without it a 1-subtopic link reads as equal to a 20-subtopic one.
 *
 * Subject-scoped throughout. Every spine uses the same `source` values and
 * numbers chapters from 1, so a query filtered on source alone merges two
 * subjects' Ch.1 — the bug that shipped once already in the loaders.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
  HeadingLevel,
} from "docx";
import { splitCoveredBy, parseCoveredRef, splitPyqCount } from "../../src/lib/syllabus/summary";
import { requireSubjectArg } from "./subject-arg";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const BOOK_COL = { stateBoard: "MH State Board", ncert: "CBSE Class 12" } as const;
const BOOK_SOURCE = { stateBoard: "MH State Board", ncert: "NCERT" } as const;

type Concept = {
  id: string;
  source: string;
  class: number;
  chapter_no: number;
  chapter_name: string;
  section_no: string;
  concept: string;
};
type Link = { concept_id: string; exam: string; covered_by: string | null };

const roman = (c: number) => (c === 11 ? "XI" : "XII");
/** "XI 9. Optics" — the label shape the shipped Chemistry maps use. */
const label = (cls: number, no: number, name: string) => `${roman(cls)} ${no}. ${name}`;

async function pageAll<T>(db: any, table: string, cols: string, eq: [string, string][]) {
  const out: T[] = [];
  for (let from = 0; ; from += 1000) {
    let q = db.from(table).select(cols);
    for (const [c, v] of eq) q = q.eq(c, v);
    const { data, error } = await q.range(from, from + 999);
    if (error) throw new Error(`${table}: ${error.message}`);
    out.push(...(data as T[]));
    if ((data as T[]).length < 1000) break;
  }
  return out;
}

function tableOf(header: string[], rows: string[][]) {
  const cell = (t: string, bold = false) =>
    new TableCell({
      children: [new Paragraph({ children: [new TextRun({ text: t, bold, size: 20 })] })],
    });
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({ children: header.map((h) => cell(h, true)) }),
      ...rows.map((r) => new TableRow({ children: r.map((c) => cell(c)) })),
    ],
  });
}

/** Rows where a repeated first cell is blanked, matching the shipped maps. */
function flatten(groups: Map<string, string[][]>): string[][] {
  const out: string[][] = [];
  for (const [head, lines] of groups) {
    lines.forEach((cells, i) => out.push([i === 0 ? head : "", ...cells]));
    if (lines.length === 0) out.push([head, ...["(no mapping recorded)"]]);
  }
  return out;
}

async function main() {
  const cfg = requireSubjectArg(process.argv);
  const examArg =
    process.argv.find((a) => a.startsWith("--exam="))?.split("=").slice(1).join("=") ?? "JEE Mains";
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const concepts = await pageAll<Concept>(
    db,
    "syllabus_concepts",
    "id,source,class,chapter_no,chapter_name,section_no,concept",
    [["subject", cfg.subject]],
  );
  const ids = new Set(concepts.map((c) => c.id));
  const links = (
    await pageAll<Link>(db, "syllabus_concept_exams", "concept_id,exam,covered_by", [])
  ).filter((l) => ids.has(l.concept_id));

  // section ref -> chapter label, per book. Keyed class|section so the two years
  // cannot collide (both number sections from 1).
  const chapterOfRef = new Map<string, string>();
  for (const c of concepts) {
    const book = Object.entries(BOOK_SOURCE).find(([, s]) => s === c.source)?.[0];
    if (!book) continue;
    chapterOfRef.set(
      `${book}|${c.class}|${c.section_no}`,
      label(c.class, c.chapter_no, c.chapter_name),
    );
  }

  const coveredBy = (conceptId: string, side: keyof typeof BOOK_COL) =>
    links.find((l) => l.concept_id === conceptId && l.exam === BOOK_COL[side])?.covered_by ?? "";

  /** Chapters of `side` that this exam subtopic's ruling cites. */
  const chaptersFor = (c: Concept, side: keyof typeof BOOK_COL) => {
    const hits = new Set<string>();
    for (const raw of splitCoveredBy(coveredBy(c.id, side))) {
      const { cls, no } = parseCoveredRef(raw, c.class);
      const ch = chapterOfRef.get(`${side}|${cls}|${no}`);
      if (ch) hits.add(ch);
    }
    return hits;
  };

  // ---- map 1: <exam> chapter -> SB chapters + NCERT chapters ----
  const examRows = concepts
    .filter((c) => c.source === `${examArg} bank taxonomy`)
    .sort((a, b) => a.chapter_no - b.chapter_no || a.section_no.localeCompare(b.section_no));

  const perExamChapter = new Map<string, { sb: Map<string, number>; nc: Map<string, number> }>();
  for (const c of examRows) {
    const key = c.chapter_name;
    if (!perExamChapter.has(key)) perExamChapter.set(key, { sb: new Map(), nc: new Map() });
    const slot = perExamChapter.get(key)!;
    for (const ch of chaptersFor(c, "stateBoard")) slot.sb.set(ch, (slot.sb.get(ch) ?? 0) + 1);
    for (const ch of chaptersFor(c, "ncert")) slot.nc.set(ch, (slot.nc.get(ch) ?? 0) + 1);
  }

  const byWeight = (m: Map<string, number>) =>
    [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  const examGroups = new Map<string, string[][]>();
  let n = 0;
  for (const [chapter, { sb, nc }] of perExamChapter) {
    const sbL = byWeight(sb);
    const ncL = byWeight(nc);
    const depth = Math.max(sbL.length, ncL.length, 1);
    const lines: string[][] = [];
    for (let i = 0; i < depth; i += 1) {
      lines.push([
        sbL[i] ? `${sbL[i][0]}  (${sbL[i][1]})` : i === 0 ? "— not in this book —" : "",
        ncL[i] ? `${ncL[i][0]}  (${ncL[i][1]})` : i === 0 ? "— not in this book —" : "",
      ]);
    }
    examGroups.set(`${(n += 1)}. ${chapter}`, lines);
  }

  // ---- map 2: NCERT chapter -> SB chapters ----
  // Derived from the SAME rulings: a subtopic citing NCERT ch.X and SB ch.Y is
  // evidence those chapters correspond. Summed over every exam, so a pair backed
  // by three exams outweighs one backed by a single subtopic.
  const ncertToSb = new Map<string, Map<string, number>>();
  for (const c of concepts) {
    if (!c.source.endsWith("bank taxonomy")) continue;
    const sbCh = chaptersFor(c, "stateBoard");
    const ncCh = chaptersFor(c, "ncert");
    for (const nc of ncCh) {
      if (!ncertToSb.has(nc)) ncertToSb.set(nc, new Map());
      const m = ncertToSb.get(nc)!;
      for (const sb of sbCh) m.set(sb, (m.get(sb) ?? 0) + 1);
    }
  }

  const ncertChapters = concepts
    .filter((c) => c.source === BOOK_SOURCE.ncert)
    .reduce((acc, c) => {
      acc.set(label(c.class, c.chapter_no, c.chapter_name), c.class);
      return acc;
    }, new Map<string, number>());

  const perClass = (cls: number) => {
    const g = new Map<string, string[][]>();
    for (const [ch, c] of ncertChapters) {
      if (c !== cls) continue;
      const hits = byWeight(ncertToSb.get(ch) ?? new Map());
      g.set(
        ch.replace(/^X?I+ /, ""),
        hits.length
          ? hits.map(([sb, w]) => [`${sb}  (${w})`])
          : [["— no mapping recorded —"]],
      );
    }
    return g;
  };

  const dir = join(process.cwd(), "generated-papers");
  mkdirSync(dir, { recursive: true });
  const tag = cfg.label.replace(/\s+/g, "");

  const doc1 = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: `NCERT vs Maharashtra State-Board Chapter Mapping — ${cfg.label}`,
                bold: true,
                size: 30,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text:
                  "Derived from the authored exam rulings: a pair appears because some exam subtopic cites a section in both chapters. The number is how many subtopics support it — a (1) is one subtopic reaching across, not a chapter correspondence.",
                size: 18,
                italics: true,
              }),
            ],
          }),
          new Paragraph({ text: "" }),
          ...[11, 12].flatMap((cls) => [
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              children: [new TextRun({ text: `Std ${roman(cls)}`, bold: true, size: 24 })],
            }),
            tableOf([`Std ${roman(cls)}: NCERT chapter`, "State Board chapter"], flatten(perClass(cls))),
            new Paragraph({ text: "" }),
          ]),
        ],
      },
    ],
  });
  const out1 = join(dir, `${tag}_NCERT_vs_SB.docx`);
  writeFileSync(out1, await Packer.toBuffer(doc1));

  const doc2 = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: `${examArg} vs State Board vs NCERT Chapter Mapping — ${cfg.label}`,
                bold: true,
                size: 30,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text:
                  "The two book columns are INDEPENDENT lists of where that exam chapter is taught — they are not paired row-by-row with each other. The number is how many of the chapter's subtopics cite that book chapter.",
                size: 18,
                italics: true,
              }),
            ],
          }),
          new Paragraph({ text: "" }),
          tableOf(
            [`${examArg} chapter`, "State Board chapter", "NCERT chapter"],
            flatten(examGroups),
          ),
        ],
      },
    ],
  });
  const out2 = join(dir, `${tag}_${examArg.replace(/\s+/g, "")}_vs_SB_vs_NCERT.docx`);
  writeFileSync(out2, await Packer.toBuffer(doc2));

  console.log(`${cfg.label}:`);
  console.log(`  ${perClass(11).size} + ${perClass(12).size} NCERT chapters -> ${out1}`);
  console.log(`  ${perExamChapter.size} ${examArg} chapters -> ${out2}`);
  const unmapped = [...ncertChapters.keys()].filter((ch) => !(ncertToSb.get(ch)?.size ?? 0));
  if (unmapped.length) {
    console.log(`\n  ${unmapped.length} NCERT chapter(s) with no mapping (no exam cites both books):`);
    for (const u of unmapped) console.log(`    ${u}`);
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
