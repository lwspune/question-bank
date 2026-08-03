/**
 * Cross-check every covered_by ref against the year it resolves to.
 *
 * The risk is silent: a ref written without an XI:/XII: prefix defaults to a
 * year, and if the SAME section number exists in BOTH years of that book the
 * validator still passes — it just resolves to the wrong one. Those are the rows
 * where a student would be sent to the right number in the wrong book.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const BOOK_OF_EXAM: Record<string, string> = {
  "MH State Board": "MH State Board",
  "CBSE Class 12": "NCERT",
};

async function main() {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
  const page = async <T>(t: string, cols: string) => {
    const out: T[] = [];
    for (let f = 0; ; f += 1000) {
      const { data, error } = await db.from(t).select(cols).range(f, f + 999);
      if (error) throw new Error(error.message);
      const rows = (data ?? []) as unknown as T[];
      out.push(...rows);
      if (rows.length < 1000) break;
    }
    return out;
  };

  type C = { id: string; source: string; class: number; chapter_no: number; chapter_name: string; section_no: string; concept: string };
  type L = { concept_id: string; exam: string; covered_by: string | null };
  const concepts = await page<C>("syllabus_concepts", "id,source,class,chapter_no,chapter_name,section_no,concept");
  const links = (await page<L>("syllabus_concept_exams", "concept_id,exam,covered_by")).filter((l) => l.covered_by);

  const byId = new Map(concepts.map((c) => [c.id, c]));
  const exists = new Set(concepts.map((c) => `${c.source}|${c.class}|${c.section_no}`));
  const chapterOf = new Map(concepts.map((c) => [`${c.source}|${c.class}|${c.section_no}`, `${c.chapter_no} ${c.chapter_name}`]));

  let total = 0, ambiguous = 0, missing = 0, explicit = 0;
  const amb: string[] = [];
  const miss: string[] = [];

  for (const l of links) {
    const src = byId.get(l.concept_id);
    if (!src) continue;
    const book = BOOK_OF_EXAM[l.exam] ?? "MH State Board";
    for (const raw of l.covered_by!.split(",").map((x) => x.trim()).filter(Boolean)) {
      total++;
      const m = raw.match(/^(XI|XII):(.+)$/);
      const cls = m ? (m[1] === "XII" ? 12 : 11) : src.class;
      const no = m ? m[2].trim() : raw;
      if (m) explicit++;
      const here = `${book}|${cls}|${no}`;
      const other = `${book}|${cls === 11 ? 12 : 11}|${no}`;
      if (!exists.has(here)) {
        missing++;
        miss.push(`${src.source} ${src.section_no} "${src.concept}" -> ${book} Std${cls} ${no}`);
        continue;
      }
      // Same number in BOTH years = the ref alone cannot say which book is meant.
      if (exists.has(other) && !m) {
        ambiguous++;
        amb.push(
          `${src.source} "${src.concept}" -> ${no}\n` +
          `      resolves to Std${cls}: ${chapterOf.get(here)}\n` +
          `      but Std${cls === 11 ? 12 : 11} also has ${no}: ${chapterOf.get(other)}`,
        );
      }
    }
  }

  console.log(`refs checked: ${total}  (explicit year prefix: ${explicit}, implicit: ${total - explicit})`);
  console.log(`missing sections: ${missing}`);
  console.log(`same number exists in BOTH years (default decides): ${ambiguous}`);
  for (const m of miss.slice(0, 20)) console.log("  MISSING " + m);

  // A count of ambiguous refs is not a verdict — every sample resolved correctly.
  // The question that matters is whether the chapter it LANDS IN is plausible for
  // the subtopic. Compare the two chapter names: a real mis-resolution reads like
  // "Amines -> Nuclear Chemistry and Radioactivity", which shares no vocabulary.
  const STOP = new Set("and of the in to for a an elements some basic principles techniques introduction chemistry chemical its".split(" "));
  const toks = (s: string) =>
    new Set(s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w)));
  const overlap = (a: string, b: string) => {
    const A = toks(a), B = toks(b);
    if (!A.size || !B.size) return 1;
    let hit = 0;
    for (const t of A) if (B.has(t)) hit++;
    return hit / Math.min(A.size, B.size);
  };

  const suspect: string[] = [];
  for (const l of links) {
    const src = byId.get(l.concept_id);
    if (!src) continue;
    const book = BOOK_OF_EXAM[l.exam] ?? "MH State Board";
    for (const raw of l.covered_by!.split(",").map((x) => x.trim()).filter(Boolean)) {
      const m = raw.match(/^(XI|XII):(.+)$/);
      const cls = m ? (m[1] === "XII" ? 12 : 11) : src.class;
      const no = m ? m[2].trim() : raw;
      const target = chapterOf.get(`${book}|${cls}|${no}`);
      if (!target) continue;
      // Compare against the SOURCE chapter, which names the topic area.
      if (overlap(src.chapter_name, target) === 0) {
        suspect.push(`${src.chapter_name} / "${src.concept}"\n      -> ${book} Std${cls} ${no} = ${target}`);
      }
    }
  }
  console.log(`\nrefs whose target chapter shares NO vocabulary with the source chapter: ${suspect.length}`);
  console.log("(expected for genuine cross-chapter mappings; a mis-resolved year hides here too)\n");
  for (const s of [...new Set(suspect)].slice(0, 30)) console.log("  " + s);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
