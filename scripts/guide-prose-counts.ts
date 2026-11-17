/**
 * `npm run guide:prose [guideDir]` — counts written inside /guide prose that no
 * live count of the guide's subject explains. TRIAGE: exits 0, a hit is a
 * candidate to read, never a verdict (SUGGESTIONS 2026-09-14).
 *
 * A count passes when it equals the subject total, a chapter, a subtopic, two
 * subtopics of one chapter, a year slice, a HARD count or a difficulty / format
 * count of a chapter. Per-paper rates ("4 questions a paper") are skipped. What
 * is left is mostly stale prose, abbreviated chapter names and sums across
 * chapters; read each against the live bank before changing it.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { loadNotesLive } from "./lib/notesLiveCounts";
import { allowedCounts } from "../src/lib/notes/introAudit";
import { extractProseCounts } from "./lib/guideProseCounts";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

/** Guide directory -> the exam and subject its pages resolve (resolveTaxonomy). */
const GUIDES: Record<string, [string, string]> = {
  "nda-maths": ["NDA", "Mathematics"],
  "nda-english": ["NDA", "English"],
  "nda-physics": ["NDA", "Physics"],
  "nda-chemistry": ["NDA", "Chemistry"],
  "nda-biology": ["NDA", "Biology"],
  "nda-geography": ["NDA", "Geography"],
  "nda-history": ["NDA", "History"],
  "nda-polity": ["NDA", "Polity"],
  "nda-economics": ["NDA", "Economics"],
  "nda-current-affairs": ["NDA", "Current Affairs"],
  "mht-cet-maths": ["MHT-CET", "Maths"],
  "mht-cet-physics": ["MHT-CET", "Physics"],
  "mht-cet-chemistry": ["MHT-CET", "Chemistry"],
  "cds-maths": ["CDS", "Mathematics"],
  "jee-mains-maths": ["JEE Mains", "Maths"],
  "jee-mains-physics": ["JEE Mains", "Physics"],
  "jee-mains-chemistry": ["JEE Mains", "Chemistry"],
};

function files(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...files(p));
    else if (/\.tsx?$/.test(name)) out.push(p);
  }
  return out;
}

(async () => {
  const only = process.argv[2];
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const live = await loadNotesLive(db);
  let total = 0, flagged = 0;
  for (const [dir, [exam, subject]] of Object.entries(GUIDES)) {
    if (only && only !== dir) continue;
    const prefix = `${exam}\t${subject}\t`;
    const allowed = new Set<number>();
    let subjectTotal = 0;
    const subjectYears = new Map<string, number>();
    for (const [k, n] of live.chapter) {
      if (!k.startsWith(prefix)) continue;
      subjectTotal += n;
      const subs = [...(live.perSub.get(k)?.values() ?? [])];
      const years = [...(live.perYear.get(k)?.entries() ?? [])];
      for (const v of allowedCounts(n, subs, years.map(([, c]) => c))) allowed.add(v);
      for (const v of allowedCounts(live.hardChapter.get(k) ?? 0, [...(live.hardPerSub.get(k)?.values() ?? [])])) allowed.add(v);
      for (const v of live.classes.get(k)?.values() ?? []) allowed.add(v);
      for (const [yk, c] of years) if (yk.startsWith("*\t")) subjectYears.set(yk, (subjectYears.get(yk) ?? 0) + c);
    }
    if (!subjectTotal) {
      console.log(`\n${dir}: no live rows for ${exam} / ${subject}; skipped`);
      continue;
    }
    allowed.add(subjectTotal);
    for (const c of subjectYears.values()) allowed.add(c);

    const hits: string[] = [];
    for (const f of files(join("src/app/guide", dir))) {
      const text = readFileSync(f, "utf8");
      for (const c of extractProseCounts(text)) {
        if (c.perPaper) continue;
        total++;
        if (allowed.has(c.n)) continue;
        flagged++;
        const line = text.slice(0, c.index).split("\n").length;
        const at = text.slice(Math.max(0, c.index - 60), c.index + 20).replace(/\s+/g, " ");
        hits.push(`  ${relative(".", f)}:${line}  ${c.n}  …${at}…`);
      }
    }
    console.log(`\n${dir} (${exam} / ${subject}, ${subjectTotal} live): ${hits.length} candidate(s)`);
    for (const h of hits) console.log(h);
  }
  console.log(`\n${flagged} of ${total} prose counts match no live count. Triage: read each before changing it.`);
})();
