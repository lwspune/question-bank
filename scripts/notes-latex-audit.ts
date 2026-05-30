/**
 * One-shot LaTeX audit of the /notes editorial content. Read-only.
 * Walks every SubtopicNote in NOTES_CHAPTERS and reports three failure modes:
 *   1. LaTeX markup in PLAIN-TEXT fields (title, oneLineDefinition,
 *      whyItMatters, concept.name, formula.label) — these don't go through
 *      KatexRenderer, so any \(...\) or \command leaks as raw markup + into
 *      SEO metadata.
 *   2. Unbalanced \(...\) or \[...\] delimiters in KaTeX fields — breaks the
 *      segmenter.
 *   3. Non-ASCII characters inside KaTeX fields — inventory, so we can spot
 *      unicode math (°, ×, ≤, →, …) that may render inconsistently.
 */
import { NOTES_CHAPTERS } from "../src/lib/notes/chapters";

type Hit = { where: string; detail: string };

const plainLeaks: Hit[] = [];
const delimImbalance: Hit[] = [];
const unicodeCounts = new Map<string, { count: number; sample: string }>();

const hasLatexMarkup = (s: string) => /\\\(|\\\)|\\\[|\\\]|\\[a-zA-Z]/.test(s);
// Plain-text fields render raw (no KatexRenderer / RichText), so Markdown
// emphasis leaks literally too: `**bold**` and leading `- ` bullet markers.
const hasMarkdownMarkup = (s: string) => /\*\*/.test(s) || /(^|\n)\s*-\s/.test(s);

function checkPlain(where: string, s: string | undefined) {
  if (s && (hasLatexMarkup(s) || hasMarkdownMarkup(s)))
    plainLeaks.push({ where, detail: s.slice(0, 90) });
}

function checkDelims(where: string, s: string | undefined) {
  if (!s) return;
  // Drop LaTeX line-breaks (\\) first, so the `[` in `\\[4pt]` row-spacing
  // isn't mistaken for a display-math `\[` opener.
  const c = s.replace(/\\\\/g, " ");
  const open = (c.match(/\\\(/g) || []).length;
  const close = (c.match(/\\\)/g) || []).length;
  const bopen = (c.match(/\\\[/g) || []).length;
  const bclose = (c.match(/\\\]/g) || []).length;
  if (open !== close || bopen !== bclose) {
    delimImbalance.push({
      where,
      detail: `\\(=${open} \\)=${close} \\[=${bopen} \\]=${bclose} :: ${s.slice(0, 80)}`,
    });
  }
}

function inventoryUnicode(where: string, s: string | undefined) {
  if (!s) return;
  for (const ch of s) {
    if (ch.charCodeAt(0) > 127) {
      const cur = unicodeCounts.get(ch);
      if (cur) cur.count++;
      else unicodeCounts.set(ch, { count: 1, sample: where });
    }
  }
}

for (const chapter of NOTES_CHAPTERS) {
  for (const [slug, note] of Object.entries(chapter.notes)) {
    const base = `${chapter.subjectRoute}/${chapter.chapterSlug}/${slug}`;
    // Plain-text fields
    checkPlain(`${base} > title`, note.title);
    checkPlain(`${base} > oneLineDefinition`, note.oneLineDefinition);
    checkPlain(`${base} > whyItMatters`, note.whyItMatters);

    for (const c of note.concepts) {
      const cb = `${base} > ${c.slug}`;
      checkPlain(`${cb}.name`, c.name);

      // KaTeX fields: delimiter balance + unicode inventory
      const katexFields: Array<[string, string | undefined]> = [
        [`${cb}.intuition`, c.intuition],
        [`${cb}.definition`, c.definition],
      ];

      if (c.kind === "formula") {
        if (c.formula) checkPlain(`${cb}.formula.label`, c.formula.label);
        katexFields.push([`${cb}.formula.latex`, c.formula?.latex]);
        for (const sym of c.formula?.symbols ?? []) {
          katexFields.push([`${cb}.formula.symbol`, sym.symbol]);
          katexFields.push([`${cb}.formula.meaning`, sym.meaning]);
        }
        const ex = c.authoredExample;
        katexFields.push([`${cb}.authored.prompt`, ex.prompt]);
        ex.steps.forEach((s, i) =>
          katexFields.push([`${cb}.authored.step${i}`, s])
        );
        katexFields.push([`${cb}.authored.answer`, ex.answer]);
      } else {
        // Reference variant — column headers are PLAIN TEXT (audited the
        // same way as formula labels); cells, captions, and per-row notes
        // are KaTeX-aware (audited like authored-example prose).
        c.table.columns.forEach((col, i) =>
          checkPlain(`${cb}.table.columns[${i}]`, col)
        );
        c.table.rows.forEach((row, rIdx) => {
          row.cells.forEach((cell, cIdx) =>
            katexFields.push([`${cb}.table.row${rIdx}.cell${cIdx}`, cell])
          );
          if (row.noteAmber)
            katexFields.push([`${cb}.table.row${rIdx}.noteAmber`, row.noteAmber]);
        });
        if (c.table.caption)
          katexFields.push([`${cb}.table.caption`, c.table.caption]);
      }
      if (c.selfCheckExample) {
        katexFields.push([`${cb}.selfCheck.prompt`, c.selfCheckExample.prompt]);
        c.selfCheckExample.steps.forEach((s, i) =>
          katexFields.push([`${cb}.selfCheck.step${i}`, s])
        );
        katexFields.push([`${cb}.selfCheck.answer`, c.selfCheckExample.answer]);
      }
      for (const p of c.practiceSet ?? []) {
        katexFields.push([`${cb}.practice.prompt`, p.prompt]);
        katexFields.push([`${cb}.practice.answer`, p.answer]);
        if (p.method) katexFields.push([`${cb}.practice.method`, p.method]);
      }
      for (const t of c.traps ?? []) {
        katexFields.push([`${cb}.trap.title`, t.title]);
        katexFields.push([`${cb}.trap.body`, t.body]);
      }

      for (const [where, val] of katexFields) {
        checkDelims(where, val);
        inventoryUnicode(where, val);
      }
    }
  }
}

console.log(`\n=== 1. LaTeX markup in PLAIN-TEXT fields (${plainLeaks.length}) ===`);
for (const h of plainLeaks) console.log(`  [LEAK] ${h.where}: ${h.detail}`);
if (plainLeaks.length === 0) console.log("  none");

console.log(`\n=== 2. Unbalanced KaTeX delimiters (${delimImbalance.length}) ===`);
for (const h of delimImbalance) console.log(`  [IMBALANCE] ${h.where}: ${h.detail}`);
if (delimImbalance.length === 0) console.log("  none");

console.log(`\n=== 3. Non-ASCII chars in KaTeX fields (${unicodeCounts.size} distinct) ===`);
const sorted = [...unicodeCounts.entries()].sort((a, b) => b[1].count - a[1].count);
for (const [ch, { count, sample }] of sorted) {
  const code = "U+" + ch.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0");
  console.log(`  ${JSON.stringify(ch)} (${code})  ×${count}   e.g. ${sample}`);
}
console.log(
  "  (Non-ASCII in prose between math zones is fine — these are informational.)"
);

// Sections 1 + 2 are real defects; section 3 is informational only.
if (plainLeaks.length > 0 || delimImbalance.length > 0) {
  console.error(
    `\nnotes-latex: FAIL — ${plainLeaks.length} plain-text leak(s), ${delimImbalance.length} delimiter imbalance(s).`
  );
  process.exit(1);
}
console.log("\nnotes-latex: OK — no plain-text leaks, no delimiter imbalances.");
