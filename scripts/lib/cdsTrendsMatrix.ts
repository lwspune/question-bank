/**
 * Pure core of the CDS Maths chapter x sitting matrix behind /guide/cds-maths/trends
 * (generator: scripts/cds-maths/trends-matrix.ts).
 *
 * CDS is simpler than MHT-CET: two sittings a year, every paper 100 questions, and the sitting is
 * named in `pyq_note` ("CDS (II) 2016 — Elementary Mathematics"). So a raw count compares across
 * every column directly. The one rule kept from the MHT-CET core: a row whose sitting cannot be read
 * is REPORTED, never guessed into a column — a guessed cell reads exactly like a measured one.
 */

export type CdsRow = {
  pyq_year: number | null;
  pyq_note: string | null;
  chapter: string;
  difficulty: string | null;
};

export type CdsPaper = {
  /** `<year>-<sitting>`, e.g. "2016-2". */
  id: string;
  year: number;
  /** "I" or "II" — the matrix sub-header. */
  label: string;
  /** "CDS (II) 2016" — the tooltip. */
  title: string;
};

export type CdsMatrixRow = { chapter: string; total: number; counts: number[] };

export type CdsPaperTotals = { id: string; total: number; hard: number };

export type CdsMatrix = {
  papers: CdsPaper[];
  rows: CdsMatrixRow[];
  byPaper: CdsPaperTotals[];
  unparsed: { pyq_year: number | null; pyq_note: string | null }[];
};

/** Read the sitting from the note; null unless it names (I) or (II) AND its year matches pyq_year. */
export function parseCdsSitting(
  year: number | null,
  note: string | null
): { year: number; sitting: 1 | 2 } | null {
  if (year == null || note == null) return null;
  const m = /CDS \((I|II)\) (\d{4})\b/.exec(note);
  if (!m || Number(m[2]) !== year) return null;
  return { year, sitting: m[1] === "I" ? 1 : 2 };
}

export function buildCdsMatrix(rows: CdsRow[]): CdsMatrix {
  const unparsed: CdsMatrix["unparsed"] = [];
  const papers = new Map<string, CdsPaper & { order: number }>();
  const cells = new Map<string, Map<string, number>>();
  const totals = new Map<string, CdsPaperTotals>();

  for (const r of rows) {
    const s = parseCdsSitting(r.pyq_year, r.pyq_note);
    if (!s) {
      unparsed.push({ pyq_year: r.pyq_year, pyq_note: r.pyq_note });
      continue;
    }
    const id = `${s.year}-${s.sitting}`;
    const label = s.sitting === 1 ? "I" : "II";
    if (!papers.has(id)) {
      papers.set(id, { id, year: s.year, label, title: `CDS (${label}) ${s.year}`, order: s.year * 10 + s.sitting });
    }
    const byChapter = cells.get(r.chapter) ?? new Map<string, number>();
    byChapter.set(id, (byChapter.get(id) ?? 0) + 1);
    cells.set(r.chapter, byChapter);
    const t = totals.get(id) ?? { id, total: 0, hard: 0 };
    t.total++;
    if (r.difficulty === "HARD") t.hard++;
    totals.set(id, t);
  }

  const ordered = [...papers.values()].sort((a, b) => a.order - b.order);
  const out: CdsMatrixRow[] = [...cells.entries()].map(([chapter, m]) => {
    const counts = ordered.map((p) => m.get(p.id) ?? 0);
    return { chapter, total: counts.reduce((s, n) => s + n, 0), counts };
  });
  out.sort((a, b) => b.total - a.total || a.chapter.localeCompare(b.chapter));

  return {
    papers: ordered.map(({ order: _order, ...p }) => p),
    rows: out,
    byPaper: ordered.map((p) => totals.get(p.id)!),
    unparsed,
  };
}
