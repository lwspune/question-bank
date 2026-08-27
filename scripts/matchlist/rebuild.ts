/**
 * Pure core: rebuild a linearised match-list stem as a GFM pipe table.
 *
 * CONTRACT — the transform is LAYOUT-ONLY. Every List-I and List-II item that
 * goes in must come out unchanged and in order; nothing invented, merged or
 * dropped. This returns a REFUSAL rather than a guess whenever that cannot be
 * established, because GAT_RULES rule 2 is explicit that a wrong column boundary
 * "reads as authoritative and is worse than a flat stem".
 *
 * TWO STRATEGIES, tried in order of confidence:
 *
 *   1. PAIRED LINES — "A. Bewar - 1. Manganese", "A. Temp | 1. Kelvin",
 *      "A. Lakwa        1. Copper". The pairing is stated by the source, so it
 *      is taken as given. Separator is |, a dash, or a run of 2+ spaces.
 *
 *   2. TWO REGIONS — split the whole body at the List-II marker, then split each
 *      region BY LABEL. Deliberately not newline-based: the same code then
 *      handles items separated by newlines, semicolons, commas or spaces, which
 *      is what the four remaining layouts differ in (and the single-line rows,
 *      "List I: A. x; B. y ... List II: 1. p; 2. q", are the most regular of all).
 *
 * THE LEAD-IN IS NOT THE HEADER. "Match List I with List II and select ..."
 * contains both marker words, so a naive "first line mentioning both" deletes
 * the instruction. A real marker is one FOLLOWED BY ITS FIRST LABEL within a
 * short window; that is what distinguishes it from the prose lead-in.
 */

export type Rebuilt =
  | { ok: true; text: string; left: string[]; right: string[] }
  | { ok: false; why: string };

/** A label, optionally bracketed, optionally with a space before the dot ("A ."). */
const LEFT_LABEL_RE = /\(?([A-H])\)?\s*[.)]\s/;
const RIGHT_LABEL_RE = /\(?(\d{1,2})\)?\s*[.)]\s/;

const splitByLabel = (s: string, side: "left" | "right") =>
  s
    .split(side === "left" ? /(?=\(?[A-H]\)?\s*[.)]\s)/ : /(?=\(?\d{1,2}\)?\s*[.)]\s)/)
    .map((p) => p.replace(/^[\s;,./|-]+|[\s;,.|-]+$/g, "").trim())
    .filter(Boolean);

const labelOf = (item: string): string | null => {
  const m = item.match(/^\(?([A-H]|\d{1,2})\)?\s*[.)]/);
  return m ? m[1] : null;
};
const bodyOf = (item: string) => item.replace(/^\(?(?:[A-H]|\d{1,2})\)?\s*[.)]\s*/, "").trim();
const norm = (item: string) => {
  const l = labelOf(item);
  return l ? `${l}. ${bodyOf(item)}` : item.trim();
};

/** Position of a real list marker: the one whose first label follows it closely. */
function markerPos(text: string, which: "I" | "II"): number {
  const marker = which === "I" ? /List\s*-?\s*I\b/gi : /List\s*-?\s*II\b/gi;
  const label = which === "I" ? /\(?[A-H]\)?\s*[.)]\s/ : /\(?\d{1,2}\)?\s*[.)]\s/;
  let best = -1;
  for (const m of text.matchAll(marker)) {
    const at = m.index ?? 0;
    // "List I" inside "Match List I with List II" is followed by prose, not a label.
    const window = text.slice(at + m[0].length, at + m[0].length + 90);
    const hit = window.search(label);
    // No label nearby = prose, i.e. the "Match List I with List II ..." lead-in.
    // That test alone is enough; an earlier version ALSO skipped a List-I marker
    // with "List II" between it and its first label, which wrongly rejected the
    // very common combined header "List I (Place)    List II (Mineral)".
    if (hit === -1) continue;
    // LAST qualifying occurrence, not the first. In "Match List-I (Allotrope of
    // Carbon) with List-II (Property) ... List-I: A. Graphite" the lead-in's own
    // marker DOES have a label inside its window (the real list follows soon
    // after), so first-match takes the lead-in and shreds it into the header.
    // The real marker is always the later one; a stem never re-introduces the
    // lists after them.
    best = at;
  }
  return best;
}

function headerAt(text: string, pos: number): string {
  if (pos < 0) return "";
  const seg = text.slice(pos, pos + 90);
  const m = seg.match(/List\s*-?\s*I{1,2}\b\s*(?:\(([^)]*)\))?/i);
  if (!m) return "";
  return m[1] ? `${m[0].split("(")[0].trim()} (${m[1].trim()})` : m[0].trim();
}

export function rebuildMatchList(raw: string): Rebuilt {
  const text = raw.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  if (/\|\s*-{3,}\s*\|/.test(text)) return { ok: false, why: "already has a separator row" };

  // Pandoc ASCII rules carry no words, so dropping them cannot lose content.
  const lines = text.split("\n").filter((l) => !/^[\s|+-]*$/.test(l) || l.trim() === "");

  // ── Strategy 1: the source already states the pairing ──────────────────────
  const PAIR =
    /^\s*\(?([A-H])\)?\s*[.)]\s*(.+?)\s*(?:\||\s-\s|—|\s{2,})\s*\(?(\d{1,2})\)?\s*[.)]\s*(.+?)\s*$/;
  const paired = lines.map((l) => l.match(PAIR)).filter(Boolean) as RegExpMatchArray[];
  if (paired.length >= 2) {
    const left = paired.map((m) => `${m[1]}. ${m[2].trim()}`);
    const right = paired.map((m) => `${m[3]}. ${m[4].trim()}`);
    const prose = lines.filter((l) => !PAIR.test(l) && l.trim() !== "");
    const iPos = markerPos(text, "I");
    const iiPos = markerPos(text, "II");
    return emit(
      prose,
      headerAt(text, iPos) || "List I",
      headerAt(text, iiPos) || "List II",
      left,
      right,
      // A header LINE (as opposed to the lead-in) must not survive as prose.
      (l) => /List\s*-?\s*I\b/i.test(l) && /List\s*-?\s*II\b/i.test(l) && !/\bMatch\b|\bselect\b/i.test(l)
    );
  }

  // ── Strategy 2: two regions, split at the List-II marker ───────────────────
  const body = lines.join("\n");
  const iPos = markerPos(body, "I");
  const iiPos = markerPos(body, "II");
  if (iPos < 0 || iiPos < 0 || iiPos <= iPos) {
    return { ok: false, why: "could not locate List-I and List-II markers followed by labels" };
  }

  // The right region ends at "Code"/"Codes" if present, else at the end.
  const tail = body.slice(iiPos);
  const codeAt = tail.search(/\bCodes?\s*:/i);
  const rightEnd = codeAt === -1 ? body.length : iiPos + codeAt;

  const leftRaw = body.slice(iPos, iiPos);
  const rightRaw = body.slice(iiPos, rightEnd);

  // Split each region at its FIRST label. Everything before it is header text —
  // taken verbatim as the column header rather than discarded, so a parenthetical
  // like "(Mineral deposit)" is preserved and the no-word-lost gate stays green.
  // Feeding that prefix through splitByLabel instead is what produced a leading
  // label-less chunk and the "bad List-I labels" refusals.
  const cut = (region: string, side: "left" | "right") => {
    const re = side === "left" ? /\(?[A-H]\)?\s*[.)]\s/ : /\(?\d{1,2}\)?\s*[.)]\s/;
    const at = region.search(re);
    if (at < 0) return { header: region.trim(), items: [] as string[] };
    return {
      header: region
        .slice(0, at)
        .replace(/[\s:;,.\-|]+$/, "")
        .trim(),
      items: splitByLabel(region.slice(at), side),
    };
  };
  const L = cut(leftRaw, "left");
  const R = cut(rightRaw, "right");

  const prose = [body.slice(0, iPos), body.slice(rightEnd)]
    .join("\n")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  return emit(prose, L.header || "List I", R.header || "List II", L.items, R.items);
}

function emit(
  prose: string[],
  leftHeader: string,
  rightHeader: string,
  leftRaw: string[],
  rightRaw: string[],
  dropProse: (l: string) => boolean = () => false
): Rebuilt {
  const left = leftRaw.map(norm);
  const right = rightRaw.map(norm);
  if (left.length < 2 || right.length < 2) {
    return { ok: false, why: `too few items (left ${left.length}, right ${right.length})` };
  }

  const lls = left.map(labelOf);
  const rls = right.map(labelOf);
  if (lls.some((l) => !l || !/^[A-H]$/.test(l))) return { ok: false, why: "bad List-I labels" };
  if (rls.some((l) => !l || !/^\d{1,2}$/.test(l))) return { ok: false, why: "bad List-II labels" };
  if (new Set(lls).size !== lls.length) return { ok: false, why: "duplicate List-I label" };
  if (new Set(rls).size !== rls.length) return { ok: false, why: "duplicate List-II label" };
  // CONTIGUOUS from A and from 1. A gap means the split missed an item — the
  // no-word-lost gate would not catch that on its own, because a missed item's
  // words can survive by being absorbed into its neighbour.
  const lSeq = lls.map((l) => l!.charCodeAt(0) - 65);
  const rSeq = rls.map((l) => Number(l) - 1);
  if (lSeq.some((n, i) => n !== i)) return { ok: false, why: `List-I labels not A,B,C… (${lls.join(",")})` };
  if (rSeq.some((n, i) => n !== i)) return { ok: false, why: `List-II labels not 1,2,3… (${rls.join(",")})` };
  if (left.some((i) => !bodyOf(i)) || right.some((i) => !bodyOf(i))) {
    return { ok: false, why: "an item has a label but no text" };
  }
  if ([...left, ...right].some((i) => i.includes("|"))) {
    return { ok: false, why: "an item contains a pipe" };
  }

  const keep = prose.filter((p) => !dropProse(p));

  // NO ORPHANED ITEM may survive in the prose. Caught a real failure: in a
  // pandoc ASCII table whose last List-II value wrapped to its own line, row D
  // fell out of the table and into the prose, leaving a 3-row table that passed
  // every other gate — contiguity only proves A,B,C are consecutive, never that
  // D exists, and the no-word-lost gate is happy because the words are still
  // there, just in the wrong place.
  const orphan = keep.find((p) => /^\s*\(?(?:[A-H]|\d{1,2})\)?\s*[.)]\s/.test(p));
  if (orphan) return { ok: false, why: `labelled item left outside the table: ${orphan.slice(0, 50)}` };

  // The Code block prints BELOW the table. It is two shapes, not one: the
  // "Code :" line itself, and a bare column-label row ("A  B  C  D") that often
  // sits on its own line. Matching only the former left that bare row stranded
  // ABOVE the table on 7 rows — nothing lost, but it reads wrongly on a printed
  // paper, which is the surface this whole repair exists for.
  const isCode = (p: string) =>
    /^Codes?\s*[:.]?/i.test(p) || /^\(?[A-H]\)?(?:\s+\(?[A-H]\)?){2,}\s*$/.test(p.trim());
  const leading = keep.filter((p) => !isCode(p));
  const trailing = keep.filter(isCode);

  const rows = Math.max(left.length, right.length);
  const out: string[] = [];
  if (leading.length) out.push(leading.join("\n"), "");
  out.push(`| ${leftHeader} | ${rightHeader} |`, "| --- | --- |");
  for (let i = 0; i < rows; i++) out.push(`| ${left[i] ?? ""} | ${right[i] ?? ""} |`);
  if (trailing.length) out.push("", trailing.join("\n"));

  return { ok: true, text: out.join("\n"), left, right };
}
