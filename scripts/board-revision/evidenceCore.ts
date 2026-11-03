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

/**
 * The chapter number the book itself prints. Most books number their sections
 * "10.1", "10.2", so the commonest leading number (3+ sections) is the
 * chapter; Geography numbers no sections, so its heading "4. Primary Economic
 * Activities" is read instead, matched by the chapter's name. Measured over
 * all 70 MH HSC 12 chapters (2026-11-03): every one resolves, none wrongly.
 */
export function bookChapterNumber(bookText: string, chapterName: string): string | null {
  const counts = new Map<string, number>();
  for (const line of bookText.split(/\r?\n/)) {
    const m = line.match(/^\s*(\d{1,2})\.(\d{1,2})(?:\.\d+)?\s+[A-Z(]/);
    if (m) counts.set(m[1], (counts.get(m[1]) ?? 0) + 1);
  }
  const top = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
  if (top && top[1] >= 3) return top[0];
  // NCERT's short chapters (Application of Integrals has two sections) still
  // close with "Miscellaneous Exercise on Chapter 8".
  const misc = bookText.match(/Miscellaneous Exercise on Chapter\s+(\d{1,2})\b/i);
  if (misc) return misc[1];
  const want = norm(chapterName);
  for (const line of bookText.split(/\r?\n/)) {
    const m = line.match(/^\s*(\d{1,2})\s*\.\s*(.+)$/);
    if (m && norm(m[2]).startsWith(want)) return m[1];
  }
  return null;
}

/**
 * The sheet's `source` must end with the chapter number the book prints. A
 * brief once gave numbers one low (the database's chapter order starts at 0
 * for some subjects), and the Maths book restarts at 1 in Part II.
 */
export function checkSourceChapter(source: string, bookText: string, chapterName: string): string[] {
  const claimed = source.match(/Chapter (\d+)\s*$/)?.[1];
  if (!claimed) return ["source: does not end with \"Chapter <n>\""];
  const printed = bookChapterNumber(bookText, chapterName);
  if (!printed) return ["book.txt: no section numbers or heading found to check the chapter number against"];
  return claimed === printed ? [] : [`source: says Chapter ${claimed} but the book numbers this chapter ${printed}`];
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
    const marks = new Map<number, number>();
    for (const q of m.questions) {
      const nq = norm(q);
      const hit = nq ? pyqs.find((p) => p.n.startsWith(nq)) : undefined;
      if (!hit) {
        out.push(`mostAsked[${i}]: line not in the past papers: "${q.slice(0, 80)}"`);
        continue;
      }
      years.add(Number(hit.line.slice(0, 4)));
      const mk = hit.line.match(/\[(\d+) marks?\]/);
      if (mk) marks.set(Number(mk[1]), (marks.get(Number(mk[1])) ?? 0) + 1);
    }
    const cited = [...years].sort((a, b) => b - a).join(", ");
    if (cited !== want.years.join(", ")) out.push(`mostAsked[${i}]: years ${want.years.join(", ")} but the cited lines are from ${cited}`);
    // Marks, where given, are what the cited questions carried most often (CBSE
    // papers record them; HSC rows record none, so an HSC topic can never claim any).
    if (want.marks !== undefined) {
      const top = Math.max(0, ...marks.values());
      const modes = [...marks.entries()].filter(([, n]) => n === top).map(([k]) => k);
      if (!marks.size) out.push(`mostAsked[${i}]: marks ${want.marks} but no cited line records marks`);
      else if (!modes.includes(want.marks))
        out.push(`mostAsked[${i}]: marks ${want.marks} but the cited lines most often carry ${modes.join(" or ")}`);
    }
  });

  return out;
}
