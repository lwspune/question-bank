/**
 * Write scripts/rrb-ntpc/catalog.json: the chapter + subtopic names an RRB NTPC question may be
 * filed under.
 *
 *   npx tsx scripts/rrb-ntpc/seed-catalog.ts
 *
 * NTPC CBT 1 is SSC CGL Tier I without English: Mathematics, General Intelligence and Reasoning,
 * General Awareness. So the names are COPIED from the SSC CGL catalog (itself CDS's names plus
 * SSC's own Reasoning), never re-invented: Quantitative Aptitude becomes Mathematics, English is
 * left out, and Computer Knowledge (SSC Tier II's) is kept for NTPC's basic computer questions. NTPC topics SSC lacks go in catalog-authored.json, merged in
 * last. catalog.json is committed; never edit it by hand.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type Chapter = { chapter: string; subtopics: string[] };

/** NTPC subject <- SSC CGL catalog subject. */
const FROM_SSC: Record<string, string> = {
  Mathematics: "Quantitative Aptitude",
  Reasoning: "Reasoning",
  History: "History",
  Geography: "Geography",
  Polity: "Polity",
  Economics: "Economics",
  Physics: "Physics",
  Chemistry: "Chemistry",
  Biology: "Biology",
  "Current Affairs": "Current Affairs",
  // SSC CGL Tier II's subject; NTPC's General Awareness asks basic computer questions too.
  "Computer Knowledge": "Computer Knowledge",
};

export function buildCatalog(ssc: Record<string, Chapter[]>, authored: Record<string, Chapter[]>): Record<string, Chapter[]> {
  const out: Record<string, Chapter[]> = {};
  for (const [subject, from] of Object.entries(FROM_SSC)) {
    if (!ssc[from]) throw new Error(`the SSC CGL catalog has no "${from}"`);
    out[subject] = ssc[from].map((c) => ({ chapter: c.chapter, subtopics: [...c.subtopics] }));
  }
  for (const [subject, chapters] of Object.entries(authored)) {
    if (!out[subject]) throw new Error(`catalog-authored.json names "${subject}", not an NTPC subject`);
    for (const e of chapters) {
      const hit = out[subject].find((c) => c.chapter === e.chapter);
      if (!hit) out[subject].push({ chapter: e.chapter, subtopics: [...e.subtopics] });
      else for (const s of e.subtopics) if (!hit.subtopics.includes(s)) hit.subtopics.push(s);
    }
  }
  return out;
}

if (require.main === module) {
  const read = (p: string) => JSON.parse(readFileSync(p, "utf8"));
  const catalog = buildCatalog(read(join(__dirname, "..", "ssc-cgl", "catalog.json")), read(join(__dirname, "catalog-authored.json")));
  writeFileSync(join(__dirname, "catalog.json"), JSON.stringify(catalog, null, 2) + "\n", "utf8");
  for (const [s, c] of Object.entries(catalog)) console.log(`${s}: ${c.length} chapters, ${c.reduce((n, x) => n + x.subtopics.length, 0)} subtopics`);
}
