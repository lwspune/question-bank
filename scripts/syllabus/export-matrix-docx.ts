/**
 * The chapter x exam matrix from /dashboard/syllabus/<subject>, as a Word file.
 *
 *   npx tsx scripts/syllabus/export-matrix-docx.ts                    # all three subjects
 *   npx tsx scripts/syllabus/export-matrix-docx.ts --subject=physics  # just one
 *
 *   -> generated-papers/Syllabus_Matrix_Physics.docx   (Std XI + Std XII in one file)
 *
 * SECTION grain, and deliberately the SAME grain as the page: one row per State
 * Board chapter followed by one per top-level section, exactly as
 * `loadSyllabusMatrix` returns them. Rows come from shared code so the handout
 * and the page cannot disagree about what the book contains.
 *
 * WHERE IT DEPARTS FROM THE PAGE, and each departure is deliberate:
 *   - no Concepts column. It counts spine rows, a property of how the book was
 *     extracted rather than anything a teacher acts on, and the width is worth
 *     more to the chapter-name column.
 *   - a TWO-WORD cell vocabulary (`handoutCellText`) against the page's five.
 *     The sheet carries no legend, so there is nowhere to explain a third
 *     symbol; "Mixed" becomes "Part" and both negative states go blank.
 *   - no legend, intro or provenance paragraph, and a shorter title. This is a
 *     printed handout, tuned by hand on the Chemistry file; the layout constants
 *     below are that tuning, pinned so all three subjects print to one grid.
 *
 * THE COST OF THE TWO-WORD VOCABULARY IS REAL AND IS REPORTED, NOT HIDDEN.
 * A blank means "not in syllabus" (a checked verdict) OR "not yet assessed"
 * (nobody looked) - the pair `coverCellState` exists to keep apart. They remain
 * separable per FILE, because provenance differs by subject: Chemistry's rulings
 * were hand-authored (863 concepts x 5 exams) and it has NO unassessed cells,
 * while Physics and Mathematics were DERIVED by derive-board-status.ts, which
 * writes `partial` and never `full` and writes no row at all for an uncited
 * section - so they have zero "Yes" cells and only a handful of negative
 * verdicts. `blankBreakdown` prints the split for every file written, so whoever
 * generates a sheet knows which meaning its blanks carry.
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
  PageOrientation,
  ShadingType,
  TableLayoutType,
} from "docx";
import {
  loadChapterConcepts,
  loadSyllabusMatrix,
  type SyllabusMatrix,
} from "../../src/lib/syllabus/query";
import {
  SYLLABUS_SUBJECTS,
  resolveSyllabusSubject,
  syllabusSubjectKeys,
  type SyllabusSubject,
} from "../../src/lib/syllabus/subjects";
import { EXAM_COLUMNS, type ChapterStatus } from "../../src/lib/syllabus/summary";
import { handoutCellText, handoutVocabulary, type HandoutVocabulary } from "./lib";
import { parseSubjectArg } from "./subject-arg";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const roman = (cls: number) => (cls === 12 ? "XII" : "XI");

/**
 * The exam columns. Now the SAME list the page renders — this file worked the
 * self-column out first and kept its own copy of the filter; that reasoning has
 * moved to `EXAM_COLUMNS` in summary.ts so the sheet and the screen cannot
 * disagree about which columns exist.
 */
const EXAMS = EXAM_COLUMNS;

/** Column header, matching the page's own abbreviations. */
const examHeader = (exam: string) =>
  exam.replace("MH State Board", "State Board").replace(" Class 12", "");

/** Cell fill. Never colour alone - the text carries the same information. */
const FILL: Record<string, string | undefined> = {
  Yes: "DCFCE7",
  Part: "FEF3C7",
  "": undefined,
};

/**
 * Body font for every run. Times New Roman is the docx default and Cambria is
 * the LWS house face already used by the chapter notes and formula sheets, so
 * it is set explicitly rather than left to whatever Word defaults to.
 */
const FONT = "Cambria";

type FlatRow = {
  kind: "chapter" | "section";
  ref: string;
  title: string;
  status: Record<string, ChapterStatus>;
};

/**
 * A section group whose own N.M heading does not exist in the book. See
 * {@link flattenClass} for why these need special handling.
 */
function isTitleless(sec: { sectionNo: string; title: string }): boolean {
  return sec.title === sec.sectionNo;
}

/**
 * The page renders a chapter row then its section rows; this flattens that into
 * the sequence a Word table needs, preserving the order `loadSyllabusMatrix`
 * already put them in (book order via `firstSeq`, never lexical).
 *
 * SOME GROUPS HAVE NO NAME, AND THEY ARE EXPANDED RATHER THAN PRINTED BLANK.
 * `loadSyllabusMatrix` groups concepts by their leading N.M and takes the group
 * title from the N.M row itself - but the Balbharati Maths book sometimes skips
 * the parent heading and opens straight at x.y.1, so no such row exists and the
 * title falls back to the bare ref. On the sheet that reads as a row labelled
 * "8.1" with no subject, 24 times across 11 Mathematics chapters (Chemistry and
 * Physics have none; measured, not assumed).
 *
 * The fix is to print that group's CHILD sections instead, which are real
 * headings the book does print. Nothing is invented and nothing is dropped; the
 * table just gets one level deeper exactly where the book is. A chapter with no
 * titleless group is untouched, so this cannot disturb the other two subjects.
 */
function flattenClass(
  matrix: SyllabusMatrix,
  cls: number,
  expansions: Map<string, FlatRow[]>,
): FlatRow[] {
  const out: FlatRow[] = [];
  for (const ch of matrix.chapters.filter((c) => c.cls === cls)) {
    out.push({
      kind: "chapter",
      ref: String(ch.chapterNo),
      title: ch.chapterName,
      status: ch.status,
    });
    for (const sec of ch.sections) {
      const expanded = expansions.get(`${cls}|${ch.chapterNo}|${sec.sectionNo}`);
      if (expanded) {
        out.push(...expanded);
        continue;
      }
      out.push({ kind: "section", ref: sec.sectionNo, title: sec.title, status: sec.status });
    }
  }
  return out;
}

/**
 * Child rows for every titleless group, keyed by `cls|chapter|group`.
 *
 * Loaded per affected CHAPTER via the same loader the page's drill-down uses, so
 * the sheet and the drill-down cannot disagree about what a chapter contains. A
 * subject with no titleless group issues no queries at all.
 */
async function loadExpansions(
  db: unknown,
  subject: string,
  matrix: SyllabusMatrix,
): Promise<Map<string, FlatRow[]>> {
  const out = new Map<string, FlatRow[]>();
  const chapters = matrix.chapters.filter((c) => c.sections.some(isTitleless));
  for (const ch of chapters) {
    const detail = await loadChapterConcepts(db as never, subject, ch.cls, ch.chapterNo);
    if (!detail) continue;
    for (const sec of ch.sections.filter(isTitleless)) {
      const kids = detail.concepts.filter((c) => c.sectionNo.startsWith(`${sec.sectionNo}.`));
      // Never silently drop a group: if the children cannot be resolved, keep the
      // original row so the sheet still shows the group exists.
      if (kids.length === 0) continue;
      out.set(
        `${ch.cls}|${ch.chapterNo}|${sec.sectionNo}`,
        kids.map((c) => ({
          kind: "section" as const,
          ref: c.sectionNo,
          title: c.concept,
          status: c.status as Record<string, ChapterStatus>,
        })),
      );
    }
  }
  return out;
}

type ParaOpt = {
  bold?: boolean;
  italics?: boolean;
  size?: number;
  align?: (typeof AlignmentType)[keyof typeof AlignmentType];
};

const P = (text: string, opt: ParaOpt = {}) =>
  new Paragraph({
    alignment: opt.align,
    children: [
      new TextRun({
        text,
        font: FONT,
        bold: opt.bold,
        italics: opt.italics,
        size: opt.size ?? 18,
      }),
    ],
  });

const cell = (children: Paragraph[], dxa: number, fill?: string) =>
  new TableCell({
    width: { size: dxa, type: WidthType.DXA },
    shading: fill ? { type: ShadingType.CLEAR, fill, color: "auto" } : undefined,
    margins: { top: 40, bottom: 40, left: 80, right: 80 },
    children,
  });

/**
 * Column widths in TWIPS, and they are pinned rather than expressed as
 * percentages FOR A REASON.
 *
 * A table with no explicit grid and no fixed layout is AUTOFIT: Word recomputes
 * every column from the content when the file opens, and ignores the widths in
 * the file. That is what happened on the first Chemistry draft - a 7% Ref column
 * came back as 3.06% - and it is harmless for one file but fatal for a set of
 * three, because Mathematics carries 127-character section titles and would
 * autofit to a visibly different grid from Chemistry's. Three sheets that are
 * meant to be read side by side would then not line up.
 *
 * The numbers are the grid Word settled on for the hand-tuned Chemistry Std XII
 * table. Std XII rather than Std XI because it is the wider of the two Ref
 * columns, which leaves room for the longer section refs in the other subjects.
 * They total 13,465 of the 13,958 twips a landscape A4 page leaves between 1"
 * margins.
 */
const W_REF = 523;
const W_NAME = 5992;
const W_EXAM = 1390;
const COLUMN_WIDTHS = [W_REF, W_NAME, ...Array(EXAMS.length).fill(W_EXAM)];

function classTable(rows: FlatRow[], vocabulary: HandoutVocabulary): Table {
  const header = new TableRow({
    tableHeader: true,
    children: [
      cell([P("Ref", { bold: true })], W_REF, "E5E7EB"),
      cell([P("Chapter / section", { bold: true })], W_NAME, "E5E7EB"),
      ...EXAMS.map((exam) =>
        cell([P(examHeader(exam), { bold: true, align: AlignmentType.CENTER })], W_EXAM, "E5E7EB"),
      ),
    ],
  });

  const body = rows.map((r) => {
    const isChapter = r.kind === "chapter";
    const rowFill = isChapter ? "F3F4F6" : undefined;
    return new TableRow({
      children: [
        cell([P(r.ref, { bold: isChapter, size: isChapter ? 18 : 15 })], W_REF, rowFill),
        cell(
          // Section titles are indented so the book's own hierarchy survives a
          // table that has no nesting of its own.
          [P(isChapter ? r.title : `    ${r.title}`, { bold: isChapter })],
          W_NAME,
          rowFill,
        ),
        ...EXAMS.map((exam) => {
          const text = handoutCellText(r.status[exam], vocabulary);
          return cell(
            [P(text, { bold: isChapter, align: AlignmentType.CENTER })],
            W_EXAM,
            FILL[text] ?? rowFill,
          );
        }),
      ],
    });
  });

  return new Table({
    // FIXED + an explicit grid is what stops Word re-deciding the widths. Both
    // are required: a grid alone is only a hint to an autofit table.
    layout: TableLayoutType.FIXED,
    columnWidths: COLUMN_WIDTHS,
    width: { size: COLUMN_WIDTHS.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    rows: [header, ...body],
  });
}

/**
 * What a blank cell hides in THIS file, for the console. The handout's two-word
 * vocabulary renders "not in syllabus" and "not yet assessed" identically, and
 * those are the two states this project is otherwise careful never to conflate
 * (see `coverCellState`). They stay separable per FILE - the hand-authored
 * subject has no unassessed cells, the derived subjects have almost no negative
 * verdicts - so printing the split is what keeps the loss visible to whoever
 * generates the sheet.
 */
function blankBreakdown(rows: FlatRow[], vocabulary: HandoutVocabulary) {
  // Counted over the ROWS THAT ARE PRINTED and through the SAME renderer the
  // table uses. Counting raw statuses instead reported "Part 855" for a file
  // whose every such cell renders "Yes", which is the shape of wrongness a
  // report is least likely to be checked for.
  const cells = rows.flatMap((r) => EXAMS.map((e) => r.status[e]));
  return {
    total: cells.length,
    yes: cells.filter((s) => handoutCellText(s, vocabulary) === "Yes").length,
    part: cells.filter((s) => handoutCellText(s, vocabulary) === "Part").length,
    notInSyllabus: cells.filter((s) => s === "not").length,
    unassessed: cells.filter((s) => s === null).length,
  };
}

async function buildSubject(db: unknown, subject: SyllabusSubject) {
  const matrix = await loadSyllabusMatrix(db as never, { subject: subject.subject });
  const classes = [11, 12].filter((cls) => matrix.chapters.some((c) => c.cls === cls));
  const expansions = await loadExpansions(db, subject.subject, matrix);
  // Decided from the subject's own rulings, never from its name — see
  // `handoutVocabulary` for the cliff this implies.
  const vocabulary = handoutVocabulary(
    matrix.chapters.flatMap((c) => [c, ...c.sections]).flatMap((r) => EXAMS.map((e) => r.status[e])),
  );

  const children: (Paragraph | Table)[] = [
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: `${subject.label}: chapter x exam syllabus map`,
          font: FONT,
          bold: true,
          size: 28,
        }),
      ],
    }),
  ];

  for (const cls of classes) {
    const rows = flattenClass(matrix, cls, expansions);
    const chapters = rows.filter((r) => r.kind === "chapter").length;
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: `Std ${roman(cls)} - ${chapters} chapters`,
            font: FONT,
            bold: true,
            size: 24,
          }),
        ],
      }),
      new Paragraph({ text: "" }),
      classTable(rows, vocabulary),
      new Paragraph({ text: "" }),
    );
  }

  const doc = new Document({
    sections: [
      {
        // Landscape: the longest section title in this data runs 127 characters,
        // which portrait cannot hold beside five exam columns without wrapping
        // every row to three lines.
        properties: { page: { size: { orientation: PageOrientation.LANDSCAPE } } },
        children,
      },
    ],
  });

  mkdirSync(join(process.cwd(), "generated-papers"), { recursive: true });
  const out = join(
    process.cwd(),
    "generated-papers",
    `Syllabus_Matrix_${subject.label.replace(/\s+/g, "_")}.docx`,
  );
  writeFileSync(out, await Packer.toBuffer(doc));

  const perClass = classes
    .map((cls) => `Std ${roman(cls)} ${flattenClass(matrix, cls, expansions).length} rows`)
    .join(" · ");
  const b = blankBreakdown(classes.flatMap((cls) => flattenClass(matrix, cls, expansions)), vocabulary);
  const expandedKids = [...expansions.values()].reduce((n, v) => n + v.length, 0);
  console.log(`WROTE ${out}`);
  console.log(`  ${subject.label}: ${perClass} · ${matrix.totalConcepts} concepts`);
  console.log(
    `  vocabulary=${vocabulary}` +
      ` · cells ${b.total}: Yes ${b.yes} · Part ${b.part} · blank ${b.notInSyllabus + b.unassessed}` +
      ` (${b.notInSyllabus} not-in-syllabus + ${b.unassessed} not-yet-assessed)`,
  );
  console.log(
    `  titleless groups expanded: ${expansions.size} -> ${expandedKids} child rows` +
      ` (book skips the parent heading)`,
  );
}

async function main() {
  const raw = parseSubjectArg(process.argv);
  let subjects: SyllabusSubject[];
  if (raw) {
    const one = resolveSyllabusSubject(raw);
    // Exit rather than fall back: a typo silently exporting Chemistry is how a
    // wrong handout gets printed.
    if (!one) {
      console.error(`unknown --subject=${raw}; known: ${syllabusSubjectKeys().join(", ")}`);
      process.exit(1);
    }
    subjects = [one];
  } else {
    subjects = Object.values(SYLLABUS_SUBJECTS);
  }

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
  for (const s of subjects) await buildSubject(db, s);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
