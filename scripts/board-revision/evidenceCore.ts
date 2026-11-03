/**
 * The evidence check for a board revision-sheet draft (2026-11-03). Pure.
 *
 * A drafting agent hands in, beside its sheet, a quote from the book for every
 * key point, derivation and diagram, and the past-paper lines behind every
 * most-asked topic. This proves each quote is really in the book's text and
 * that each topic's years are exactly the years of the lines it cites. It does
 * NOT prove a key point says what its quote says: that stays a reading job,
 * done on the points the agent marks as unsure. Spec:
 * tests/board-revision-evidence.test.ts; CLI scripts/board-revision/evidence.ts.
 */
import type { RevisionSheet } from "@/lib/board/revision/types";

export type RevisionEvidence = {
  /** One per key point, same order: a sentence from the book backing it. */
  keyPoints: { term: string; quote: string }[];
  /** One per derivation: the book's heading or a sentence of its proof. */
  derivations: { title: string; quote: string }[];
  /** One per diagram: the book's figure caption. */
  diagrams: { title: string; quote: string }[];
  /** One per topic: the start of each past-paper line it groups, as listed. */
  mostAsked: { topic: string; questions: string[] }[];
};

/** Shortest quote that proves anything: five words is a phrase anyone could write. */
const MIN_QUOTE_WORDS = 6;

/** Letters and digits only, one space between words: survives line breaks, case and the symbol font's stray marks. */
function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function checkRevisionEvidence(
  sheet: Pick<RevisionSheet, "keyPoints" | "derivations" | "diagrams" | "mostAsked">,
  ev: RevisionEvidence,
  bookText: string,
  pyqLines: string[]
): string[] {
  const out: string[] = [];
  const book = ` ${norm(bookText)} `;
  const pyqs = pyqLines.map((l) => ({ line: l, n: norm(l) }));

  function quotes(
    name: "keyPoints" | "derivations" | "diagrams",
    labels: string[],
    items: { label: string; quote: string }[]
  ) {
    if (items.length !== labels.length) {
      out.push(`${name}: ${items.length} evidence item(s) for ${labels.length} in the sheet`);
      return;
    }
    items.forEach((it, i) => {
      if (it.label !== labels[i]) out.push(`${name}[${i}]: title "${it.label}" does not match the sheet's "${labels[i]}"`);
      const q = norm(it.quote);
      const words = q ? q.split(" ").length : 0;
      if (words < MIN_QUOTE_WORDS) out.push(`${name}[${i}]: quote has ${words} words, needs at least ${MIN_QUOTE_WORDS}`);
      else if (!book.includes(` ${q} `)) out.push(`${name}[${i}]: quote not in the book: "${it.quote.slice(0, 80)}"`);
    });
  }

  quotes(
    "keyPoints",
    sheet.keyPoints.map((k) => k.term),
    ev.keyPoints.map((k) => ({ label: k.term, quote: k.quote }))
  );
  quotes(
    "derivations",
    sheet.derivations.map((d) => d.title),
    ev.derivations.map((d) => ({ label: d.title, quote: d.quote }))
  );
  quotes(
    "diagrams",
    sheet.diagrams.map((d) => d.title),
    ev.diagrams.map((d) => ({ label: d.title, quote: d.quote }))
  );

  if (ev.mostAsked.length !== sheet.mostAsked.length) {
    out.push(`mostAsked: ${ev.mostAsked.length} evidence item(s) for ${sheet.mostAsked.length} in the sheet`);
    return out;
  }
  ev.mostAsked.forEach((m, i) => {
    const want = sheet.mostAsked[i];
    if (m.topic !== want.topic) out.push(`mostAsked[${i}]: topic "${m.topic}" does not match the sheet's "${want.topic}"`);
    if (m.questions.length === 0) {
      out.push(`mostAsked[${i}]: cites no past-paper line`);
      return;
    }
    const years = new Set<number>();
    for (const q of m.questions) {
      const nq = norm(q);
      const hit = nq ? pyqs.find((p) => p.n.startsWith(nq)) : undefined;
      if (!hit) {
        out.push(`mostAsked[${i}]: line not in the past papers: "${q.slice(0, 80)}"`);
        continue;
      }
      years.add(Number(hit.line.slice(0, 4)));
    }
    const cited = [...years].sort((a, b) => b - a).join(", ");
    if (cited !== want.years.join(", ")) out.push(`mostAsked[${i}]: years ${want.years.join(", ")} but the cited lines are from ${cited}`);
  });

  return out;
}
