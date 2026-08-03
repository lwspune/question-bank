/**
 * NCERT chapter -> State Board chapter, as a Word file a teacher can hand out.
 *
 *   npx tsx scripts/syllabus/export-chapter-map-docx.ts [11|12]
 *   -> generated-papers/NCERT_Std_XI_to_State_Board_Chapters.docx
 *
 * CHAPTER grain, deliberately coarser than the /dashboard/syllabus alignment
 * table: this answers "which State Board chapter do I open?", not "which
 * subtopic". A row per mapping, so an NCERT chapter reaching into two State
 * Board chapters appears twice rather than hiding one in a list.
 *
 * The weight column is how many of that NCERT chapter's top-level sections point
 * at the State Board chapter. It is what separates a real correspondence from a
 * single section reaching across, and without it Chemical Bonding -> States of
 * Matter (one section) reads as equal to Chemical Bonding -> Chemical Bonding
 * (eight).
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
  AlignmentType,
} from "docx";
import { SPINE, splitCoveredBy, parseCoveredRef, isTopLevelSection } from "../../src/lib/syllabus/summary";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type C = {
  id: string;
  source: string;
  class: number;
  chapter_no: number;
  chapter_name: string;
  section_no: string;
};
type L = { concept_id: string; exam: string; covered_by: string | null };

// First non-flag positional, so a `--subject=` flag cannot be read as a class.
const CLS = Number(process.argv.slice(2).find((a) => !a.startsWith("--")) ?? 11);
const roman = (c: number) => (c === 12 ? "XII" : "XI");

async function page<T>(db: any, table: string, cols: string): Promise<T[]> {
  const out: T[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db.from(table).select(cols).range(from, from + 999);
    if (error) throw new Error(`${table}: ${error.message}`);
    out.push(...(data as T[]));
    if ((data as T[]).length < 1000) break;
  }
  return out;
}

async function main() {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
  const concepts = await page<C>(
    db,
    "syllabus_concepts",
    "id,source,class,chapter_no,chapter_name,section_no",
  );
  const links = await page<L>(db, "syllabus_concept_exams", "concept_id,exam,covered_by");
  const coveredOf = new Map(
    links.filter((l) => l.exam === SPINE.stateBoard).map((l) => [l.concept_id, l.covered_by]),
  );
  const sbChapter = new Map(
    concepts
      .filter((c) => c.source === SPINE.stateBoard)
      .map((c) => [`${c.class}|${c.chapter_no}`, c.chapter_name]),
  );

  // NCERT chapter -> State Board chapter -> how many top-level NCERT sections
  // point there. Sections are counted DISTINCTLY: one section naming 5.6, 5.6.1
  // and 5.6.2 is one section's worth of evidence, not three.
  const weight = new Map<string, Map<string, Set<string>>>();
  const chapterName = new Map<number, string>();
  for (const c of concepts) {
    if (c.source !== SPINE.ncert || c.class !== CLS || !isTopLevelSection(c.section_no)) continue;
    chapterName.set(c.chapter_no, c.chapter_name);
    const covered = coveredOf.get(c.id);
    if (!covered) continue;
    for (const raw of splitCoveredBy(covered)) {
      const { cls, no } = parseCoveredRef(raw, c.class);
      const chNo = Number(no.split(".")[0]);
      const name = sbChapter.get(`${cls}|${chNo}`);
      if (!name) continue;
      const key = `${cls}|${chNo}`;
      const per = weight.get(String(c.chapter_no)) ?? new Map<string, Set<string>>();
      const set = per.get(key) ?? new Set<string>();
      set.add(c.section_no);
      per.set(key, set);
      weight.set(String(c.chapter_no), per);
    }
  }

  type Row = { nch: number; nname: string; sb: string; n: number };
  const rows: Row[] = [];
  for (const nch of [...chapterName.keys()].sort((a, b) => a - b)) {
    const per = weight.get(String(nch));
    const nname = chapterName.get(nch)!;
    if (!per || per.size === 0) {
      // Deliberately emitted: an NCERT chapter with NO State Board home is the
      // single most useful row in the table, and dropping it would hide it.
      rows.push({ nch, nname, sb: "", n: 0 });
      continue;
    }
    [...per.entries()]
      .map(([k, secs]) => {
        const [cls, ch] = k.split("|").map(Number);
        return { cls, ch, n: secs.size, name: sbChapter.get(k)! };
      })
      .sort((a, b) => b.n - a.n || a.cls - b.cls || a.ch - b.ch)
      .forEach((s) =>
        rows.push({ nch, nname, sb: `Std ${roman(s.cls)} Ch.${s.ch} ${s.name}`, n: s.n }),
      );
  }

  const P = (text: string, opt: { bold?: boolean; italics?: boolean; size?: number } = {}) =>
    new Paragraph({
      children: [new TextRun({ text, bold: opt.bold, italics: opt.italics, size: opt.size ?? 20 })],
    });
  const cell = (p: Paragraph[], pct: number, shade?: string) =>
    new TableCell({
      width: { size: pct, type: WidthType.PERCENTAGE },
      shading: shade ? { fill: shade } : undefined,
      children: p,
    });

  const header = new TableRow({
    tableHeader: true,
    children: [
      cell([P(`NCERT Std ${roman(CLS)} chapter`, { bold: true })], 42, "EEEEEE"),
      cell([P("State Board chapter", { bold: true })], 45, "EEEEEE"),
      cell([P("Sections", { bold: true })], 13, "EEEEEE"),
    ],
  });

  const body = rows.map((r, i) => {
    // The NCERT name is printed once per chapter; a continuation row leaves it
    // blank so the eye lands on what actually changes - the State Board column.
    const repeat = i > 0 && rows[i - 1].nch === r.nch;
    const primary = !repeat;
    return new TableRow({
      children: [
        cell([P(repeat ? "" : `${r.nch}. ${r.nname}`, { bold: primary })], 42),
        cell(
          [
            r.sb
              ? P(r.sb, { bold: primary && r.n > 1 })
              : P("— no corresponding State Board chapter —", { italics: true }),
          ],
          45,
        ),
        cell(
          [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: r.n ? String(r.n) : "", size: 20 })],
            }),
          ],
          13,
        ),
      ],
    });
  });

  const crossYear = rows.filter((r) => r.sb.startsWith(`Std ${roman(CLS === 11 ? 12 : 11)}`));
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({ text: `NCERT Std ${roman(CLS)} → Maharashtra State Board — Chemistry`, bold: true, size: 30 }),
            ],
          }),
          P(
            "Where each NCERT chapter is taught in the State Board books. A chapter appears more than once when it is split across two State Board chapters; the Sections column counts how many of its top-level NCERT sections point there, so a large number is a real correspondence and a 1 is a single section reaching across.",
            { size: 18 },
          ),
          new Paragraph({ text: "" }),
          new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: [header, ...body] }),
          new Paragraph({ text: "" }),
          ...(crossYear.length
            ? [
                P(
                  `Watch the year: ${crossYear.length} mapping(s) cross into the Std ${roman(CLS === 11 ? 12 : 11)} State Board book — the mismatch there is timing, not absence.`,
                  { italics: true, size: 18 },
                ),
              ]
            : []),
          P(
            "Generated from the PYQ Vault syllabus map. Pointers were read off both books; chapter names are the books' own.",
            { italics: true, size: 16 },
          ),
        ],
      },
    ],
  });

  mkdirSync(join(process.cwd(), "generated-papers"), { recursive: true });
  const out = join(
    process.cwd(),
    "generated-papers",
    `NCERT_Std_${roman(CLS)}_to_State_Board_Chapters.docx`,
  );
  writeFileSync(out, await Packer.toBuffer(doc));
  console.log(`WROTE ${out}`);
  console.log(`  ${rows.length} rows · ${chapterName.size} NCERT chapters · ${crossYear.length} cross-year`);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
