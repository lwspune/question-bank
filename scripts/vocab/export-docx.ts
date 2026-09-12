/**
 * Export the whole Cadet Vocabulary book as a Word file.
 *
 *   npx tsx scripts/vocab/export-docx.ts
 *   npx tsx scripts/vocab/export-docx.ts --part=idiom     # one part only
 *
 * GEOMETRY IS BORROWED FROM `src/lib/export/docxBuilder.ts`, NOT REDECIDED:
 * US Letter, 0.5in margins, two columns with a 0.5in gutter, Cambria 10pt. That
 * is the same geometry the print view mirrors, so the Word file, the browser
 * preview and every question paper this project exports all set type the same
 * way — and the page estimate stays comparable across them.
 *
 * NO MATH PIPELINE HERE, deliberately. The question exporter carries a
 * LaTeX -> MathML -> OMML path with a marker-and-patch step because a stem can
 * contain a fraction; a vocabulary entry is plain prose, and `verify.ts` asserts
 * 0 backslashes across every row. Reaching for that machinery would import
 * its whole failure surface for content that cannot use it.
 *
 * A CHAPTER IS TWO SECTIONS, not one. The heading sits in a single-column
 * section so it spans the page, then a CONTINUOUS two-column section carries
 * the entries beneath it. One two-column section with the heading inside it
 * would trap the heading in the left column, which is not how a dictionary
 * looks.
 *
 * ═══ A CHAPTER STARTS A NEW PAGE, AND ITS NAME IS CENTRED ═══
 *
 * Running chapters on continuously was tried and REVERSED on the rendered page.
 * A continuous section break lands the next chapter's heading part-way down the
 * LEFT column with the previous chapter's last entries still filling the right
 * one, so the heading reads as though it belongs to the text beside it. A band
 * boundary is where a reader stops, and it needs the page break to show it.
 *
 * The name is CENTRED because it is a running head, not a paragraph: left-set
 * and full-width it was indistinguishable from a long headword at a glance.
 *
 * ═══ NUMBERED WITHIN THE CHAPTER, NEVER ACROSS THE BOOK ═══
 *
 * Numbers exist so work can be set precisely — "Part 2, NDA A–B, 1–40". They
 * restart per chapter because any number goes stale when the corpus grows, and
 * restarting confines that churn to the one chapter that changed; a continuous
 * sequence would shift every entry after an insertion.
 *
 * ═══ A GAP WHERE THE INITIAL LETTER CHANGES ═══
 *
 * A chapter runs to 200 entries with no visual break. The gap is what lets the
 * eye find B while scanning. A letter HEADING was rejected: it costs two lines
 * per letter (~50 lines across the book) to repeat information the bold headword
 * already carries.
 */
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { createClient } from "@supabase/supabase-js";
import {
  AlignmentType,
  Document,
  Footer,
  PageNumber,
  PageOrientation,
  Packer,
  Paragraph,
  SectionType,
  TextRun,
} from "docx";
import { CADET_VOCAB, VOCAB_SECTIONS } from "../../src/lib/vocab/registry";

const OUT = join(__dirname, "..", "..", "generated-papers");
const DATA_DIR = join(__dirname, "data");

// Identical to docxBuilder.ts — see the header.
const MARGIN = 720;
const COL_SPACE = 720;
const PAGE_WIDTH = 12240;
const PAGE_HEIGHT = 15840;
const FONT = "Cambria";
const BODY = 20; // 10pt, in half-points
const HEAD = 26; // 13pt
const TITLE = 40; // 20pt
const SMALL = 16; // 8pt

const onlyPart = /--part=([a-z]+)/.exec(process.argv.join(" "))?.[1];

const page = {
  size: { width: PAGE_WIDTH, height: PAGE_HEIGHT, orientation: PageOrientation.PORTRAIT },
  margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN, header: 0, footer: 0 },
};
const oneCol = (type: (typeof SectionType)[keyof typeof SectionType]) => ({
  page,
  type,
  column: { count: 1, space: COL_SPACE },
});
const cols = (count: number) => ({
  page,
  type: SectionType.CONTINUOUS,
  column: { count, space: COL_SPACE },
});

type Row = {
  word: string;
  part: string;
  chapter_slug: string;
  meaning: string;
  sentence: string | null;
  sentence_source: string | null;
  synonyms: string[];
  antonyms: string[];
  exams: string[];
  times_asked: number;
};

/**
 * PART 5's CONTENT, and it does NOT come from `vocab_entries`. Every word in it
 * is already an entry elsewhere in the book; what this file holds is which words
 * a paper sets AGAINST each other, which no per-word row can express.
 */
type HomonymSet = { words: string[]; q: number };
const homonymSets: HomonymSet[] = existsSync(join(DATA_DIR, "homonym-list.json"))
  ? JSON.parse(readFileSync(join(DATA_DIR, "homonym-list.json"), "utf8"))
  : [];

/**
 * PAGE NUMBERS, centred in the footer.
 *
 * ATTACHED TO EVERY SECTION, not once. A Word section carries its own
 * headers/footers, and this book emits 94 of them (each chapter is two — a
 * one-column heading and a two-column body). A footer on the first section only
 * would number the front matter and then stop, which looks like a rendering
 * fault rather than a missing setting.
 *
 * `PageNumber.CURRENT` is a FIELD, so Word computes it at open/print time; the
 * numbers are not baked in and stay right if pagination shifts.
 */
const pageFooter = () => ({
  default: new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: SMALL }),
        ],
      }),
    ],
  }),
});

const run = (text: string, o: Partial<ConstructorParameters<typeof TextRun>[0]> = {}) =>
  new TextRun({ text, font: FONT, size: BODY, ...(o as object) });

/**
 * One entry: number, headword, meaning, then whatever that part carries.
 *
 * `letterBreak` opens the gap where the initial letter changes. It is EXTRA
 * SPACE, not a heading — see the file header.
 */
function entryParagraphs(r: Row, num: number, letterBreak: boolean): Paragraph[] {
  const out: Paragraph[] = [
    new Paragraph({
      // 6pt between word groups, 13pt where the initial letter changes. The
      // earlier 2pt packed the entries so tightly that a synonym line read as
      // belonging to the entry below it.
      spacing: { before: letterBreak ? 260 : 120, after: 0 },
      children: [
        // The number is set small and light so it stays a reference, never
        // competing with the headword the eye is scanning for.
        run(`${num}. `, { size: SMALL }),
        run(r.word, { bold: true }),
        run(": "),
        run(r.meaning),
      ],
    }),
  ];

  if (r.sentence) {
    out.push(
      new Paragraph({
        indent: { left: 160 },
        spacing: { before: 0, after: 0 },
        children: [
          run(r.sentence, { italics: true }),
          // Presence carries the claim: a citation means a real paper asked the
          // word in exactly those words. An authored sentence is silently
          // uncited rather than labelled.
          ...(r.sentence_source ? [run(` — ${r.sentence_source}`, { size: SMALL })] : []),
        ],
      })
    );
  }

  const list = (label: string, items: string[]) =>
    new Paragraph({
      indent: { left: 160 },
      spacing: { before: 0, after: 0 },
      children: [run(`${label} `, { smallCaps: true, size: SMALL }), run(items.join(", "))],
    });
  if (r.synonyms?.length) out.push(list("Synonyms", r.synonyms));
  if (r.antonyms?.length) out.push(list("Antonyms", r.antonyms));

  /**
   * NO PER-ENTRY EXAM TAG ON PART 4 (user's call, 2026-09-08).
   *
   * Each idiom used to carry an "NDA" / "CDS" / "NDA practice" line. Its stated
   * job was provenance — Part 4 has no sentence, so the tag was the only thing
   * saying where the idiom came from. THE SECTION HEADING NOW DOES THAT JOB:
   * splitting Part 4 into "Set in the Papers" and "Practice Material" carries
   * the whole papers-vs-practice claim, which is the half that matters, and
   * left the tag saying only WHICH exam — a third line on a two-line entry, for
   * a distinction a candidate cannot act on.
   *
   * The data is UNTOUCHED: `exams` and `times_asked` still carry it per row,
   * and `idiomSectionOf` still derives the section from `times_asked`. This is
   * a render decision and reversing it is a few lines.
   */
  return out;
}

(async () => {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // PAGED: the book is ~3,700 entries and PostgREST truncates a raw select at
  // 1000 with no error — a Word file quietly missing two thirds of the book
  // would open perfectly.
  const rows: Row[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("vocab_entries")
      .select(
        "word,part,chapter_slug,position,meaning,sentence,sentence_source,synonyms,antonyms,exams,times_asked"
      )
      .eq("book_slug", CADET_VOCAB.slug)
      .eq("excluded", false)
      .order("chapter_slug")
      .order("position")
      .range(from, from + 999);
    if (error) throw new Error(`vocab_entries: ${error.message}`);
    rows.push(...((data ?? []) as any));
    if ((data ?? []).length < 1000) break;
  }
  const byChapter = new Map<string, Row[]>();
  for (const r of rows) {
    const list = byChapter.get(r.chapter_slug) ?? [];
    list.push(r);
    byChapter.set(r.chapter_slug, list);
  }

  const countOf = (slug: string) => (byChapter.get(slug) ?? []).length;

  const parts = CADET_VOCAB.parts.filter((p) => !onlyPart || p.key === onlyPart);
  // The constructor's own element type, but a MUTABLE array: `sections` on the
  // Document options is declared readonly, so building it up with push needs
  // the element type extracted rather than the array type reused.
  type Section = ConstructorParameters<typeof Document>[0]["sections"][number];
  const sections: Section[] = [];

  // ── title page ──
  if (!onlyPart) {
    sections.push({
      properties: oneCol(SectionType.NEXT_PAGE),
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 2400, after: 200 },
          children: [run(CADET_VOCAB.title, { bold: true, size: TITLE })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [run(CADET_VOCAB.subtitle, { italics: true })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 400 },
          children: [
            run(`${rows.length.toLocaleString()} entries · ${CADET_VOCAB.chapters.length} chapters`, {
              size: SMALL,
            }),
          ],
        }),
      ],
    });
  }

  /**
   * ── contents ──
   *
   * STRUCTURAL, WITH NO PAGE NUMBERS, and that is deliberate. Nothing here
   * knows where Word will break a column, so any page number printed would be a
   * guess presented as a fact — and a contents page whose numbers are wrong is
   * worse than one that has none. What it does carry is the entry COUNT per
   * chapter, which is what a teacher setting work actually needs.
   */
  if (!onlyPart) {
    const toc: Paragraph[] = [
      new Paragraph({
        spacing: { after: 40 },
        children: [run("Contents", { bold: true, size: HEAD })],
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [
          run("Entries are numbered within each chapter, restarting at 1.", {
            italics: true,
            size: SMALL,
          }),
        ],
      }),
    ];
    for (const part of parts) {
      // Part 5 is backed by a set list, not by chapters, so the chapter-count
      // guard below would skip it and `countOf` would report "0 entries".
      if (part.key === "homonym") {
        if (!homonymSets.length) continue;
        toc.push(
          new Paragraph({
            spacing: { before: 200, after: 60 },
            children: [
              run(`${part.ordinal} · ${part.title}`, { bold: true }),
              run(`  ${homonymSets.length} sets`, { size: SMALL }),
            ],
          })
        );
        continue;
      }
      const chapters = CADET_VOCAB.chapters.filter((c) => c.part === part.key);
      if (!chapters.length) continue;
      const total = chapters.reduce((n, c) => n + countOf(c.slug), 0);
      toc.push(
        new Paragraph({
          spacing: { before: 200, after: 60 },
          children: [
            run(`${part.ordinal} · ${part.title}`, { bold: true }),
            run(`  ${total.toLocaleString()} entries`, { size: SMALL }),
          ],
        })
      );
      const secs = VOCAB_SECTIONS.filter((s) => s.part === part.key);
      const groups = secs.length
        ? secs.map((s) => ({
            title: s.title,
            rows: chapters.filter((c) => c.section === s.key),
          }))
        : [{ title: "", rows: chapters }];
      for (const g of groups) {
        if (g.title) {
          const n = g.rows.reduce((acc, c) => acc + countOf(c.slug), 0);
          toc.push(
            new Paragraph({
              indent: { left: 220 },
              spacing: { before: 80, after: 20 },
              children: [
                run(g.title, { italics: true }),
                run(`  ${n.toLocaleString()} entries`, { size: SMALL }),
              ],
            })
          );
        }
        for (const ch of g.rows) {
          toc.push(
            new Paragraph({
              indent: { left: g.title ? 440 : 220 },
              spacing: { before: 0, after: 0 },
              children: [
                run(ch.label),
                run(`  ${countOf(ch.slug).toLocaleString()}`, { size: SMALL }),
              ],
            })
          );
        }
      }
    }
    sections.push({ properties: oneCol(SectionType.NEXT_PAGE), children: toc });
  }

  for (const part of parts) {
    /**
     * PART 5 IS A LIST OF SETS, not of entries, so it renders on its own path.
     * The opener is identical to every other part's -- a reader should not be
     * able to tell from the page that this one is built differently -- and the
     * sets then run as a plain two-column list with no meanings, because every
     * word in them is defined in its own part already.
     */
    if (part.key === "homonym") {
      if (!homonymSets.length) continue;
      sections.push({
        properties: oneCol(SectionType.NEXT_PAGE),
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 1600, after: 120 },
            children: [run(part.ordinal, { size: HEAD })],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 160 },
            children: [run(part.title, { bold: true, size: TITLE })],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [run(part.blurb, { italics: true, size: SMALL })],
          }),
        ],
      });
      sections.push({
        properties: cols(2),
        children: homonymSets.map(
          (h, i) =>
            new Paragraph({
              spacing: { after: 40 },
              children: [
                // NUMBERED, like every other part. Entries are numbered within
                // their chapter throughout this book, and a bare unnumbered run
                // here read as a different kind of object rather than as Part 5
                // of the same book. The number also gives a teacher something
                // to set work against ("Part 5, 40-60").
                run(`${i + 1}. `, { size: SMALL }),
                // The separator is a spaced slash rather than a comma so a set
                // reads as one unit; a comma would look like a list of entries.
                run(h.words.join("  /  ")),
              ],
            })
        ),
      });
      continue;
    }

    const chapters = CADET_VOCAB.chapters.filter((c) => c.part === part.key);
    if (!chapters.length) continue;

    // A part opener, so a reader can see where one part ends and the next starts.
    sections.push({
      properties: oneCol(SectionType.NEXT_PAGE),
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 1600, after: 120 },
          children: [run(part.ordinal, { size: HEAD })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 160 },
          children: [run(part.title, { bold: true, size: TITLE })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [run(part.blurb, { italics: true, size: SMALL })],
        }),
      ],
    });

    // Sections are filtered by part because they are not one axis: Part 2
    // splits by exam and Part 4 by provenance.
    const secs = VOCAB_SECTIONS.filter((s) => s.part === part.key);
    const groups = secs.length
      ? secs.map((s) => ({ title: s.title, blurb: s.blurb, rows: chapters.filter((c) => c.section === s.key) }))
      : [{ title: "", blurb: "", rows: chapters }];

    for (const g of groups) {
      for (const [i, ch] of g.rows.entries()) {
        const entries = byChapter.get(ch.slug) ?? [];
        const first = i === 0;
        const heading: Paragraph[] = [];
        // The section heading prints once, above its first chapter.
        if (g.title && first) {
          heading.push(
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 0, after: 40 },
              children: [run(g.title, { bold: true, size: HEAD })],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 },
              children: [run(g.blurb, { italics: true, size: SMALL })],
            })
          );
        }
        heading.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 160 },
            children: [run(`${part.title} · ${ch.label}`, { bold: true, size: HEAD })],
          })
        );

        sections.push({ properties: oneCol(SectionType.NEXT_PAGE), children: heading });

        let prevLetter = "";
        sections.push({
          properties: cols(2),
          children: entries.length
            ? entries.flatMap((r, n) => {
                const letter = r.word.charAt(0).toUpperCase();
                // Never on the first entry: a gap above the first line of a
                // chapter is just a wider heading margin, not a divider.
                const brk = n > 0 && letter !== prevLetter;
                prevLetter = letter;
                return entryParagraphs(r, n + 1, brk);
              })
            : [new Paragraph({ children: [run("No entries in this chapter yet.", { italics: true })] })],
        });
      }
    }
  }

  const doc = new Document({
    styles: { default: { document: { run: { font: FONT, size: BODY } } } },
    // The footer is attached HERE rather than at each of the seven
    // `sections.push` sites, so a section added later cannot be the one that
    // silently stops the numbering.
    sections: sections.map((sec) => ({ ...sec, footers: pageFooter() })),
  });

  mkdirSync(OUT, { recursive: true });
  const name = onlyPart ? `Cadet_Vocabulary_${onlyPart}.docx` : "Cadet_Vocabulary.docx";
  const file = join(OUT, name);
  writeFileSync(file, await Packer.toBuffer(doc));
  console.log(`wrote ${file}`);
  console.log(`  ${rows.length.toLocaleString()} entries · ${sections.length} Word sections`);
})();
