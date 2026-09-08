/**
 * Estimate the printed length of the book, from the text actually stored.
 *
 *   npx tsx scripts/vocab/page-estimate.ts
 *
 * AN ESTIMATE, AND IT SAYS SO. Only a real layout engine knows where a column
 * breaks. This exists so a page count can be quoted before opening anything,
 * and so a change in entry format can be costed in pages rather than characters.
 *
 * ═══ CALIBRATED AGAINST WORD, THREE TIMES: IT RUNS 13-17% HIGH ═══
 *
 *   2026-09-08  per-chapter page breaks + A-Z index   Word 176   here 206  (+17%)
 *   2026-09-08  continuous chapters, no index         Word 154   here 175  (+14%)
 *   2026-09-08  page per chapter, Part 1 as 8 rungs   Word 199   here 225  (+13%)
 *
 * The bias is stable across a doubling of the book and two structural changes,
 * which is the useful property: a CHANGE in this number is worth reading even
 * though its absolute value is not.
 *
 * The bias is deliberate and is kept — `CPL` is rounded down, which under-counts
 * characters per line and so over-counts pages, and a printer's quote that comes
 * in short is the worse error. But quote the MEASURED number when one exists:
 * run `export-docx.ts` and open the file.
 *
 * Geometry is taken from the print stylesheet, not invented: US Letter, 0.5in
 * margins, two columns with a 0.5in gutter, Cambria 10pt.
 */
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { createClient } from "@supabase/supabase-js";
import { CADET_VOCAB } from "../../src/lib/vocab/registry";

const PAGE_W = 8.5,
  PAGE_H = 11,
  MARGIN = 0.5,
  GUTTER = 0.5,
  COLS = 2;
const COL_W = (PAGE_W - 2 * MARGIN - GUTTER * (COLS - 1)) / COLS; // 3.5in
/**
 * Cambria at 10pt averages ~0.46em per character in running text, so ~4.6pt =
 * 0.064in. 3.5in / 0.064 ~= 55 characters per line. Rounded DOWN to 52: an
 * over-estimate of characters per line under-counts pages, and a printer's
 * quote that comes in short is the worse error.
 */
const CPL = 52;
const LINE_H = 12 / 72; // 10pt type on 12pt leading, in inches
const LINES_PER_COL = Math.floor((PAGE_H - 2 * MARGIN) / LINE_H); // 60
const LINES_PER_PAGE = LINES_PER_COL * COLS;

const wrap = (s: string) => Math.max(1, Math.ceil(s.length / CPL));

(async () => {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const rows: any[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("vocab_entries")
      .select("word,part,chapter_slug,meaning,sentence,sentence_source,synonyms,antonyms,excluded")
      .eq("book_slug", CADET_VOCAB.slug)
      .eq("excluded", false)
      .order("word")
      .range(from, from + 999);
    if (error) throw error;
    rows.push(...(data ?? []));
    if ((data ?? []).length < 1000) break;
  }

  const linesOf = (r: any) => {
    let n = wrap(`${r.word}: ${r.meaning}`);
    if (r.sentence) n += wrap(`${r.sentence}${r.sentence_source ? ` — ${r.sentence_source}` : ""}`);
    if (r.synonyms?.length) n += wrap(`SYNONYMS ${r.synonyms.join(", ")}`);
    if (r.antonyms?.length) n += wrap(`ANTONYMS ${r.antonyms.join(", ")}`);
    return n + 0.6; // inter-entry space (6pt), as a fraction of a 12pt line
  };

  const byPart: Record<string, { entries: number; lines: number }> = {};
  for (const r of rows) {
    byPart[r.part] ??= { entries: 0, lines: 0 };
    byPart[r.part].entries++;
    byPart[r.part].lines += linesOf(r);
  }

  console.log(
    `geometry: ${COLS} cols x ${COL_W.toFixed(2)}in, ~${CPL} chars/line, ` +
      `${LINES_PER_COL} lines/col, ${LINES_PER_PAGE} lines/page\n`
  );
  let totalPages = 0;
  const order = ["school", "pyq", "practice", "idiom"];
  for (const key of order) {
    const p = byPart[key];
    if (!p) continue;
    const part = CADET_VOCAB.parts.find((x) => x.key === key)!;
    // Each chapter opens a new page (the continuous variant was tried and
    // reversed -- see export-docx.ts), so a part pays for its own opener plus
    // one page per chapter.
    const openers = 1 + CADET_VOCAB.chapters.filter((c) => c.part === key).length;
    const pages = Math.ceil(p.lines / LINES_PER_PAGE) + openers;
    totalPages += pages;
    console.log(
      `  ${part.ordinal.padEnd(7)} ${part.title.padEnd(28)} ` +
        `${String(p.entries).padStart(5)} entries  ~${String(pages).padStart(3)} pages ` +
        `(${openers} part + chapter openers included)`
    );
  }

  // Front matter: title page + the contents listing (4 parts, 5 sections,
  // 24 chapters -> comfortably one page).
  const frontPages = 2;
  console.log(
    `  ${"".padEnd(7)} ${"Front matter (title, contents)".padEnd(28)} ` +
      `${"".padStart(5)}          ~${String(frontPages).padStart(3)} pages`
  );
  totalPages += frontPages;

  console.log(`\n  ESTIMATE: ~${totalPages} pages of content, ${rows.length} entries.`);
  console.log(
    `  Allow +-10%: Word decides real column breaks, and this cannot see a\n` +
      `  widow, an orphan, or a letter-change gap landing at a column foot.`
  );
})();
