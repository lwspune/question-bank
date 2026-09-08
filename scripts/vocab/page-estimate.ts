/**
 * Estimate the printed length of the book, from the text actually stored.
 *
 *   npx tsx scripts/vocab/page-estimate.ts
 *
 * AN ESTIMATE, AND IT SAYS SO. The real number comes from the browser's own
 * print preview of `/books/vocab/<chapter>/print`, because only the browser
 * knows where a column breaks. This exists so a page count can be quoted before
 * that page is built, and so a change in entry format can be costed in pages
 * rather than in characters.
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
    return n + 0.35; // inter-entry space, measured as a fraction of a line
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
    // Each chapter starts a new page, so a part pays for its own part-openers.
    const chapters = CADET_VOCAB.chapters.filter((c) => c.part === key).length;
    const pages = Math.ceil(p.lines / LINES_PER_PAGE) + chapters;
    totalPages += pages;
    console.log(
      `  ${part.ordinal.padEnd(7)} ${part.title.padEnd(28)} ` +
        `${String(p.entries).padStart(5)} entries  ~${String(pages).padStart(3)} pages ` +
        `(${chapters} chapter openers included)`
    );
  }

  // The back-of-book index: one line per word, three columns.
  const idxCols = 3;
  const idxLines = Math.ceil(rows.length / 1) / idxCols;
  const idxPages = Math.ceil(idxLines / LINES_PER_COL);
  console.log(`  ${"".padEnd(7)} ${"Index (A-Z, every word)".padEnd(28)} ${String(rows.length).padStart(5)} lines    ~${String(idxPages).padStart(3)} pages`);
  totalPages += idxPages;

  console.log(`\n  ESTIMATE: ~${totalPages} pages of content, ${rows.length} entries.`);
  console.log(
    `  Add front matter (title, contents ~2pp) and allow +-10%: the browser\n` +
      `  decides real column breaks, and this cannot see a widow or an orphan.`
  );
})();
