/**
 * Which DISTINCT committed rows need a figure, and which papers can supply it.
 *
 *   npx tsx scripts/cbse-12-pyq/figure-groups.ts          # report
 *   npx tsx scripts/cbse-12-pyq/figure-groups.ts --write  # -> data/figure-groups.json
 *
 * 96 transcribed rows carry a REQUIRED figure, but the series share questions,
 * so they commit as far fewer rows. Grouping by content_hash — computed with the
 * REAL hash functions, never a re-implementation — is what turns "96 figures"
 * into the true unit of work.
 *
 * ILLUSTRATIVE and DECORATIVE rows are deliberately excluded: all 8 ILLUSTRATIVE
 * notes say "NOT attached" in as many words, and that was a judgement made with
 * the page open. Re-deciding it here from a keyword would silently overturn it.
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
export type Member = { pid: string; year: number; ref: string; page: number | null; note: string };
export type Group = { hash: string; members: Member[]; stem: string; digital: boolean };

const PAGE_RE = /[Pp]age\s*(?:idx|index)\s*(\d+)/;
/** 2022 and 2025 have NO text layer (measured: 0 chars on every page). */
const SCANNED_YEARS = new Set([2022, 2025]);

export function loadGroups(): Group[] {
  const groups = new Map<string, Group>();
  for (const f of readdirSync(DATA).filter((x) => x.endsWith(".questions.json")).sort()) {
    const pid = f.slice(0, -".questions.json".length);
    const d = JSON.parse(readFileSync(join(DATA, f), "utf8")) as { year: number; questions: Q[] };
    for (const q of d.questions) {
      const fg = q._figure ?? "";
      if (!fg.trim().toUpperCase().startsWith("REQUIRED")) continue;
      const hash = q.format === "subjective"
        ? subjectiveContentHash(q.stem, q.context ?? null)
        : contentHash(q.stem, (q.options ?? []).map((o) => o.text), q.answer ?? "");
      const m = PAGE_RE.exec(fg);
      const member: Member = { pid, year: d.year, ref: q.ref, page: m ? Number(m[1]) : null, note: fg };
      const g = groups.get(hash);
      if (g) g.members.push(member);
      else groups.set(hash, { hash, members: [member], stem: q.stem, digital: false });
    }
  }
  for (const g of groups.values()) g.digital = g.members.some((m) => !SCANNED_YEARS.has(m.year));
  return [...groups.values()].sort((a, b) => b.members.length - a.members.length);
}

function main() {
  const groups = loadGroups();
  const rows = groups.reduce((n, g) => n + g.members.length, 0);
  console.log(`REQUIRED rows ${rows}  ->  distinct figures to attach: ${groups.length}`);
  console.log(`  reachable from a born-digital paper (2023/2024/2026): ${groups.filter((g) => g.digital).length}`);
  console.log(`  only in a SCANNED paper (2022/2025, no text layer):   ${groups.filter((g) => !g.digital).length}`);

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
