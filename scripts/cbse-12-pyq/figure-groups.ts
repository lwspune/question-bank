/**
 * Which DISTINCT committed rows need a figure, and which papers can supply it.
 *
 *   npx tsx scripts/cbse-12-pyq/figure-groups.ts          # report
 *   npx tsx scripts/cbse-12-pyq/figure-groups.ts --write  # -> data/figure-groups.json
 *
 * Hundreds of transcribed rows carry a figure note, but the series share
 * questions, so they commit as far fewer rows. Grouping by content_hash —
 * computed with the REAL hash functions, never a re-implementation — is what
 * turns a row count into the true unit of work.
 *
 * DECORATIVE stays excluded: SCIENCE_ADDENDUM §3 says a captioned photograph
 * carries no data and is not attached.
 *
 * ⚠ ILLUSTRATIVE IS NOW INCLUDED (2026-09-13, on the maintainer's call). This
 * file previously excluded it, and its reason was sound WHEN WRITTEN: "all 8
 * ILLUSTRATIVE notes say 'NOT attached' in as many words, and that was a
 * judgement made with the page open." There are now 142 such notes, so that is a
 * fact measured on 8 cases generalised to a class — the same defect this
 * pipeline's own addendum was restructured to remove. The addendum's §3 table
 * always said ILLUSTRATIVE is "cropped and attached", so the tool and the
 * contract had silently disagreed.
 *
 * The two are still reported and stored SEPARATELY, because they are different
 * claims about the row: REQUIRED means the question is unanswerable without the
 * drawing, ILLUSTRATIVE means it reads fine and the drawing is worth showing.
 * Anything that ever has to triage by urgency needs that distinction kept.
 *
 * A group of size >1 is normally one question printed in several series. It can
 * ALSO be two different questions the hash cannot separate — `image_url` is not
 * hashed, so two questions differing only by their printed graph collide. Those
 * are adjudicated in data/hash-collisions.json. This script prints a prose-based
 * HINT at such groups, but the prose cannot settle it — extract_figures.py crops
 * every member and compares the images, which can. See the note on `gist` below.
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { contentHash, subjectiveContentHash } from "../../src/lib/upload/hash";
import { DATA } from "./config";

type Q = {
  ref: string; questionNumber: string; format: "mcq" | "subjective";
  stem: string; context?: string; options?: { label: string; text: string }[];
  answer?: string; _figure?: string;
};
export type FigureKind = "REQUIRED" | "ILLUSTRATIVE";
export type Member = { pid: string; year: number; ref: string; page: number | null; note: string; kind: FigureKind };
export type Group = { hash: string; members: Member[]; stem: string; digital: boolean; kind: FigureKind };

const PAGE_RE = /[Pp]age\s*(?:idx|index)\s*(\d+)/;

/**
 * Which papers have a usable text layer — READ, never inferred from the year.
 *
 * ⚠ THIS REPLACED `SCANNED_YEARS = new Set([2022, 2025])`, whose comment read
 * "2022 and 2025 have NO text layer (measured: 0 chars on every page)". The
 * measurement was real and was taken on one paper per year. Across all 234
 * papers the property is per-SERIES, and the year rule was wrong both ways:
 * 2025 Physics/Chemistry are 12 of 18 DIGITAL (series 4-7) and 2022 is 6 of 15,
 * while 2023 Maths has 5 SCANNED papers and 2024 Physics/Chemistry 6 each.
 *
 * The harmful direction is the second: `digital` claims a figure is "reachable
 * from a born-digital paper", so a scanned member counted as digital sends
 * someone down an extraction path that cannot work.
 *
 * Falls back to the old year rule ONLY if the index is missing, and says so —
 * silently guessing is what this replaced.
 */
function digitalByPaperId(): Map<string, boolean> {
  const out = new Map<string, boolean>();
  let found = false;
  for (const f of readdirSync(DATA).filter((x) => /^_papers\..*\.json$/.test(x))) {
    found = true;
    const rows = JSON.parse(readFileSync(join(DATA, f), "utf8")) as {
      paperId: string; digital?: boolean;
    }[];
    for (const r of rows) if (typeof r.digital === "boolean") out.set(r.paperId, r.digital);
  }
  if (!found) {
    console.warn(
      "⚠ no data/_papers.<subject>.json — falling back to the YEAR rule, which is\n" +
        "  measurably wrong for 2022, 2023, 2024 and 2025. Run:\n" +
        "    npx tsx scripts/cbse-12-pyq/papers.ts --all --emit-index"
    );
  }
  return out;
}

export function loadGroups(): Group[] {
  const groups = new Map<string, Group>();
  for (const f of readdirSync(DATA).filter((x) => x.endsWith(".questions.json")).sort()) {
    const pid = f.slice(0, -".questions.json".length);
    const d = JSON.parse(readFileSync(join(DATA, f), "utf8")) as { year: number; questions: Q[] };
    for (const q of d.questions) {
      const fg = q._figure ?? "";
      const head = fg.trim().toUpperCase();
      // DECORATIVE stays out — SCIENCE_ADDENDUM §3 says a captioned photograph
      // carries no data and is not attached. REQUIRED and ILLUSTRATIVE are both in.
      const kind: FigureKind | null = head.startsWith("REQUIRED")
        ? "REQUIRED"
        : head.startsWith("ILLUSTRATIVE")
          ? "ILLUSTRATIVE"
          : null;
      if (!kind) continue;
      const hash = q.format === "subjective"
        ? subjectiveContentHash(q.stem, q.context ?? null)
        : contentHash(q.stem, (q.options ?? []).map((o) => o.text), q.answer ?? "");
      const m = PAGE_RE.exec(fg);
      const member: Member = { pid, year: d.year, ref: q.ref, page: m ? Number(m[1]) : null, note: fg, kind };
      const g = groups.get(hash);
      if (g) {
        g.members.push(member);
        // One printed question can be classified differently by two transcribers.
        // Take the STRONGEST: REQUIRED means the row is unanswerable without the
        // drawing, and that claim must not be weakened by a sibling's milder read.
        if (kind === "REQUIRED") g.kind = "REQUIRED";
      } else {
        groups.set(hash, { hash, members: [member], stem: q.stem, digital: false, kind });
      }
    }
  }
  const digital = digitalByPaperId();
  const YEAR_FALLBACK = new Set([2022, 2025]); // only when the index is absent
  for (const g of groups.values()) {
    g.digital = g.members.some((m) =>
      digital.has(m.pid) ? digital.get(m.pid)! : !YEAR_FALLBACK.has(m.year)
    );
  }
  return [...groups.values()].sort((a, b) => b.members.length - a.members.length);
}

function main() {
  const groups = loadGroups();
  const rows = groups.reduce((n, g) => n + g.members.length, 0);
  const req = groups.filter((g) => g.kind === "REQUIRED").length;
  console.log(`figure rows ${rows}  ->  distinct figures to attach: ${groups.length}`);
  console.log(`  REQUIRED (row is unanswerable without it): ${req}`);
  console.log(`  ILLUSTRATIVE (answerable from text, shown anyway): ${groups.length - req}`);
  // Deliberately NOT labelled by year any more: scanned-ness is per-SERIES and
  // every year but 2026 is mixed in at least one subject.
  console.log(`  reachable from a born-digital paper: ${groups.filter((g) => g.digital).length}`);
  console.log(`  only in a SCANNED paper:             ${groups.filter((g) => !g.digital).length}`);

  // A group whose members describe DIFFERENT figures is a hash collision, not a
  // reprint — image_url is not hashed, so two questions differing only by their
  // printed graph land on one row.
  //
  // ⚠ THIS IS A HINT, NOT THE CHECK. The notes are free prose written by
  // different agents, so they vary in wording for the SAME figure ("On " vs
  // "Corner points…") and can read alike for different ones. Normalising the
  // parts that are allowed to vary — page index, sibling refs, dash style — still
  // leaves 19 of 41 groups flagged, nearly all of them innocent.
  //
  // The authoritative check is in extract_figures.py: crop EVERY member of a
  // group and compare the images. Agreeing crops prove a reprint; disagreeing
  // crops prove a collision. That is evidence; this is a reading of prose.
  const gist = (s: string) =>
    s.replace(/[Pp]age\s*(?:idx|index)\s*\d+/g, "")
      .replace(/\bQ\.?\s*\d+[a-z]*\b/gi, "")
      .replace(/[‐-―−]/g, "-")
      .replace(/[^a-z0-9]+/gi, " ")
      .trim().toLowerCase();
  const suspect = groups.filter((g) => new Set(g.members.map((m) => gist(m.note))).size > 1);
  if (suspect.length) {
    console.log(`\n${suspect.length} group(s) whose notes differ — HINT ONLY, crop comparison decides:`);
    for (const g of suspect) {
      console.log(`  ${g.hash.slice(0, 8)}`);
      for (const m of g.members) console.log(`     ${m.pid}:${m.ref} p${m.page} — ${m.note.slice(0, 100)}`);
    }
  }
  if (process.argv.includes("--write")) {
    writeFileSync(join(DATA, "figure-groups.json"), JSON.stringify(groups, null, 1));
    console.log(`\nwrote data/figure-groups.json (${groups.length} groups)`);
  }
}
if (require.main === module) main();
