/**
 * Third spine: NCERT Class 11 + 12 Chemistry sections, with a ruling on whether
 * the Maharashtra State Board syllabus covers each one.
 *
 *   npx tsx scripts/syllabus/ingest-ncert-spine.ts          # dry-run
 *   npx tsx scripts/syllabus/ingest-ncert-spine.ts --apply
 *
 * Prerequisites (both regenerable):
 *   python scripts/syllabus/dump_ncert_sections.py   -> data/ncert-sections.json
 *   python scripts/syllabus/dump_sb_corpus.py        -> generated-papers/sb-corpus.json
 *
 * Method: for each NCERT section, take the distinctive words of its TITLE and ask
 * how many appear anywhere in the State Board books. That is deliberately a
 * TRIAGE score, not a verdict — a word occurring somewhere in 1.6M characters
 * does not mean the topic is taught. Sections scoring below the review threshold
 * are listed for hand-adjudication and are NOT auto-ruled.
 */
import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

type Section = {
  class: number;
  chapter_no: number;
  chapter_name: string;
  section_no: string;
  concept: string;
};

const STOP = new Set(`the a an of and or in on to for with from by is are as at into
its their general introduction some basic other others types type class classes
properties property nature concept concepts idea ideas study terms term`.split(/\s+/));

const REVIEW_BELOW = 60; // percent of title terms present

/**
 * NCERT chapter -> the State Board chapter(s) that would teach it, as "class-chapter".
 * Searches are scoped to these. Without scoping, a passing mention anywhere in the
 * 1.6M-char corpus counts as coverage — which is how NCERT's Vitamins section
 * scored 100% while the State Board Biomolecules chapter says "vitamin" 0 times.
 */
const NCERT_TO_SB: Record<string, string[]> = {
  "11-1": ["11-1", "11-2"],   // Some Basic Concepts (+ the calculation half in Analytical Chemistry)
  "11-2": ["11-4"],           // Structure of Atom
  "11-3": ["11-7"],           // Classification and Periodicity -> Modern Periodic Table
  "11-4": ["11-5"],           // Chemical Bonding
  "11-5": ["12-4"],           // Thermodynamics -> Std XII Chemical Thermodynamics
  "11-6": ["11-12", "12-3"],  // Equilibrium -> Chemical Equilibrium + Ionic Equilibria
  "11-7": ["11-6"],           // Redox
  "11-8": ["11-14", "11-3"],  // Organic Basics (+ purification in Analytical Techniques)
  "11-9": ["11-15"],          // Hydrocarbons
  "12-1": ["12-2"],           // Solutions
  "12-2": ["12-5"],           // Electrochemistry
  "12-3": ["12-6"],           // Chemical Kinetics
  "12-4": ["12-8"],           // d- and f-Block -> Transition and Inner Transition
  "12-5": ["12-9"],           // Coordination Compounds
  "12-6": ["12-10"],          // Haloalkanes -> Halogen Derivatives
  "12-7": ["12-11"],          // Alcohols, Phenols and Ethers
  "12-8": ["12-12"],          // Aldehydes, Ketones and Carboxylic Acids
  "12-9": ["12-13"],          // Amines
  "12-10": ["12-14"],         // Biomolecules
};

/**
 * `<class> <section_no>` -> ruling. Adjudicated by hand against the State Board
 * chapter that would teach it, after the chapter-scoped probe flagged 32
 * candidates. The other 28 resolved to hyphenation ("dichloro-"), truncated
 * titles, generic words, or plural/singular misses ("batteries" vs 20 real
 * mentions of battery in SB Electrochemistry).
 */
const ADJUDICATED: Record<string, [("partial" | "not"), string]> = {
  "12 10.4": [
    "not",
    "State Board Std XII Biomolecules contains 'vitamin' ZERO times. The word appears only in Chemistry in Everyday Life and Amines, neither of which teaches vitamins as a topic. Confirmed independently from the JEE bank spine, where Vitamins is also a gap.",
  ],
  "12 10.6": [
    "not",
    "State Board Std XII Biomolecules contains 'hormone' ZERO times. The word appears only incidentally in organic chapters (Organic Basics, Aldehydes/Ketones, Amines), never as a biomolecule topic.",
  ],
  "12 2.8": [
    "partial",
    "SEQUENCING, not a gap: 'corrosion' appears ZERO times in State Board Electrochemistry, but the topic is taught in the p-Block and Transition Elements chapters. A student meets it, just not where NCERT places it.",
  ],
  "11 9.5.5": [
    "partial",
    "Physical properties of aromatic compounds are covered, but 'sulphonation' is absent from State Board Hydrocarbons AND from the entire corpus. Nitration and Friedel-Crafts are present, so only this one electrophilic substitution is missing.",
  ],
};

async function main() {
  const apply = process.argv.includes("--apply");
  loadEnv();

  const secPath = join(process.cwd(), "scripts", "syllabus", "data", "ncert-sections.json");
  const corpusPath = join(process.cwd(), "generated-papers", "sb-corpus.json");
  for (const p of [secPath, corpusPath]) {
    if (!existsSync(p)) throw new Error(`missing ${p} — see the header for how to regenerate`);
  }
  const sections = JSON.parse(readFileSync(secPath, "utf8")) as Section[];
  const corpus = JSON.parse(readFileSync(corpusPath, "utf8")) as {
    all: string;
    chapters: Record<string, string>;
  };
  if (!corpus.chapters) {
    throw new Error("sb-corpus.json is the old whole-blob format — re-run dump_sb_corpus.py");
  }

  const scored = sections.map((s) => {
    const terms = [
      ...new Set(
        s.concept
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, " ")
          .split(/\s+/)
          .filter((w) => w.length > 3 && !STOP.has(w)),
      ),
    ];
    const mapped = NCERT_TO_SB[`${s.class}-${s.chapter_no}`] ?? [];
    // Scoped to the mapped chapter(s); falls back to the whole corpus only if a
    // chapter has no mapping at all, which would itself be a bug worth seeing.
    const haystack = mapped.length
      ? mapped.map((k) => corpus.chapters[k] ?? "").join("\n")
      : corpus.all;
    const missing = terms.filter((t) => !haystack.includes(t));
    const score = terms.length ? Math.round(((terms.length - missing.length) / terms.length) * 100) : 100;
    // Elsewhere = present in the books, but not in the chapter that should teach
    // it. Worth surfacing: it usually means a sequencing difference, not a gap.
    const elsewhere = missing.filter((t) => corpus.all.includes(t));
    return { ...s, terms: terms.length, missing, elsewhere, score, mapped: mapped.join("+") };
  });

  const review = scored.filter((s) => s.score < REVIEW_BELOW).sort((a, b) => a.score - b.score);

  const byClass = (c: number) => scored.filter((s) => s.class === c).length;
  console.log(`\nNCERT spine: ${sections.length} sections (Std 11 ${byClass(11)}, Std 12 ${byClass(12)})`);
  console.log(`Scoring under ${REVIEW_BELOW}% and needing hand review: ${review.length}\n`);
  for (const r of review.slice(0, 40)) {
    console.log(
      `  ${String(r.score).padStart(3)}%  Std${r.class} ${r.section_no.padEnd(7)} ${r.concept.slice(0, 40).padEnd(40)} SB:${r.mapped.padEnd(11)} absent: ${r.missing.slice(0, 4).join(", ")}${r.elsewhere.length ? "  [but elsewhere: " + r.elsewhere.slice(0,3).join(", ") + "]" : ""}`,
    );
  }

  const reportPath = join(process.cwd(), "generated-papers", "ncert-coverage-review.txt");
  writeFileSync(
    reportPath,
    review
      .map((r) => `${r.score}%\tStd${r.class}\t${r.section_no}\t${r.concept}\tabsent: ${r.missing.join(", ")}`)
      .join("\n"),
    "utf8",
  );
  console.log(`\nFull review list -> ${reportPath}`);

  const adjudicatedCount = Object.keys(ADJUDICATED).length;
  if (review.length > adjudicatedCount) {
    console.log(
      `\nNOTE: ${review.length - adjudicatedCount} flagged section(s) are not yet adjudicated.` +
        `\nThey will be written as 'full' unless ruled otherwise — read the report first.`,
    );
  }

  if (!apply) {
    console.log("\nDRY RUN — nothing written. Re-run with --apply.");
    return;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("service-role env required");
  const db = createClient(url, key, { auth: { persistSession: false } });

  const concepts = sections.map((s, i) => ({
    class: s.class,
    subject: "Chemistry",
    source: "NCERT",
    chapter_no: s.chapter_no,
    chapter_name: s.chapter_name,
    section_no: s.section_no,
    concept: s.concept,
    seq: i + 1,
  }));

  for (let i = 0; i < concepts.length; i += 200) {
    const { error } = await db
      .from("syllabus_concepts")
      .upsert(concepts.slice(i, i + 200), { onConflict: "source,class,subject,section_no" });
    if (error) throw new Error(`concepts: ${error.message}`);
  }

  const { data: back, error: backErr } = await db
    .from("syllabus_concepts")
    .select("id,class,section_no")
    .eq("source", "NCERT");
  if (backErr) throw new Error(backErr.message);
  const idBy = new Map((back ?? []).map((r) => [`${r.class}|${r.section_no}`, r.id]));

  const links = sections
    .map((s) => {
      const adj = ADJUDICATED[`${s.class} ${s.section_no}`];
      const id = idBy.get(`${s.class}|${s.section_no}`);
      return id
        ? { concept_id: id, exam: "MH State Board", status: adj ? adj[0] : "full", note: adj ? adj[1] : null }
        : null;
    })
    .filter(Boolean) as { concept_id: string; exam: string; status: string; note: string | null }[];

  for (let i = 0; i < links.length; i += 200) {
    const { error } = await db
      .from("syllabus_concept_exams")
      .upsert(links.slice(i, i + 200), { onConflict: "concept_id,exam" });
    if (error) throw new Error(`links: ${error.message}`);
  }
  console.log(`\nDone. ${concepts.length} NCERT concepts, ${links.length} coverage rulings.`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
