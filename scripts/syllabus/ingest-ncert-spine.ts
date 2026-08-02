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
import { NCERT_TO_SB } from "./exam-chapter-map";

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
 * Flagged, examined, and found genuinely covered — the probe's search term was
 * wrong, not the coverage.
 *
 * This list exists so "reviewed and fine" is distinguishable from "never looked
 * at". Without it both states are simply absent from ADJUDICATED and silently
 * default to `full`, which is exactly how 10 real gaps (NCERT 8.9/8.10) sat
 * unnoticed until the JEE spine contradicted them.
 */
const RESOLVED_COVERED: Record<string, string> = {
  "11 2.3.3": "Truncated title ('Evidence'); the section is atomic spectra, covered in SB 11-4.",
  "11 4.9.2": "Probe searched 'h-bonds'. SB teaches hydrogen bonding — 1 mention in Chemical Bonding, 18 in States of Matter. Covered, though not in the chapter NCERT places it.",
  "11 6.1.2": "Probe searched hyphenated 'liquid-vapour'. SB 11-12 has liquid 19, vapour 24, equilibrium 176.",
  "11 9.2.1": "Probe searched 'nomenclature'. SB Hydrocarbons says 'IUPAC' 10 times.",
  "11 9.3.2": "Probe searched 'nomenclature'. Same as 9.2.1.",
  "11 9.4.1": "Probe searched 'nomenclature'. Same as 9.2.1.",
  "11 9.5.1": "Probe searched 'nomenclature'. Same as 9.2.1.",
  "11 5.1": "Title carried a body-text bleed ('boundary'). SB 12-4 has system 152, surroundings 63.",
  "12 1.5": "Truncated title ('Ideal and Non-'). SB 12-2 has 'ideal solution' 11, Raoult 17.",
  "12 2.6.1": "Probe searched plural 'batteries'. SB Electrochemistry covers batteries 20 times.",
  "12 2.6.2": "Probe searched plural 'batteries'. Same as 2.6.1.",
  "12 3.2": "Truncated title ('Factors Influencing'). SB 12-6 covers temperature 31, catalyst 13.",
  "12 3.3.3": "Probe searched hyphenated 'half-life'. SB 12-6 has 'half life' 17 and t1/2 31.",
  "12 4.3.9": "Garbled extraction ('diamagnetismparamagnetism'). Magnetic properties covered in SB 12-8.",
  "12 4.5.4": "Generic title ('General Characteristics'); SB 12-8 covers d-block characteristics.",
  "12 4.6.2": "Probe searched 'sizes'. SB 12-8 has ionic radii 19, atomic radii 9.",
  "12 5.2": "Truncated title ('Definitions of'); the terms are covered in SB 12-9.",
  "12 5.3": "Garbled extraction ('cistrans-cis'). Geometric isomerism covered in SB 12-9.",
  "12 5.3.1": "Probe searched 'formulas'/'mononuclear'. SB 12-9 has IUPAC 16, formula 12, naming 3.",
  "12 6.8.1": "Line-break hyphenation ('Dichloro- methane'). SB 12-10 names dichloromethane 3 times.",
  "12 6.8.2": "Line-break hyphenation. SB 12-10 has chloroform 6.",
  "12 6.8.3": "Line-break hyphenation. SB 12-10 has iodoform 1.",
  "12 6.8.4": "Line-break hyphenation. SB 12-10 has carbon tetrachloride 1.",
};

/**
 * `<class> <section_no>` -> ruling. Adjudicated by hand against the State Board
 * chapter that would teach it, after the chapter-scoped probe flagged 32
 * candidates. Everything flagged is either here or in RESOLVED_COVERED above.
 */
const ADJUDICATED: Record<string, [("partial" | "not"), string]> = {
  "11 7.3.3": [
    "not",
    "Redox titrimetry is absent. 'titration' appears exactly ONCE in the entire State Board corpus — and in Adsorption and Colloids, not Redox or Ionic Equilibria. 'normality' and 'equivalent weight' are zero. JEE Unit 20 requires titrimetric exercises (oxalic acid vs KMnO4, Mohr's salt vs KMnO4), so this is JEE-relevant too.",
  ],
  "11 6.11.6": [
    "partial",
    "SB Ionic Equilibria mentions 'dibasic' once; 'polybasic', 'polyacidic', 'tribasic' and 'polyprotic' are all absent from the corpus. Multistage ionisation is treated much more thinly than NCERT does.",
  ],
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
  // NCERT 8.9 + 8.10, the ANALYSIS half of organic techniques. State Board Ch.3
  // covers 8.8 Purification fully (crystallisation 17, chromatography 27,
  // distillation 32) but teaches no elemental analysis: lassaigne, kjeldahl and
  // carius are all ZERO across the entire corpus.
  //
  // These were caught by reconciling against the JEE spine, where the same
  // content is ruled `not`. They had defaulted to `full` because the probe
  // flagged them and they were left unadjudicated — the two spines contradicted
  // each other until this cross-check.
  ...Object.fromEntries(
    [
      ["8.9", "Qualitative Analysis of Organic Compounds"],
      ["8.9.1", "Detection of Carbon and Hydrogen"],
      ["8.9.2", "Detection of Other Elements"],
      ["8.10", "Quantitative Analysis"],
      ["8.10.1", "Carbon and Hydrogen"],
      ["8.10.2", "Nitrogen"],
      ["8.10.3", "Halogens (Carius method)"],
      ["8.10.4", "Sulphur"],
      ["8.10.5", "Phosphorus"],
      ["8.10.6", "Oxygen"],
    ].map(([sec, name]) => [
      `11 ${sec}`,
      [
        "not",
        `${name}: the State Board teaches purification (Ch.3) but no elemental analysis — Lassaigne, Kjeldahl and Carius are absent from the entire corpus. Matches the JEE spine, where Estimation and Detection of Elements are the largest live gap (18 PYQs, 14 since 2023).`,
      ] as ["not", string],
    ]),
  ),
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

  // A flag counts as handled if it was ruled OR explicitly cleared. Anything
  // left over is genuinely unreviewed and will default to `full` — say so loudly,
  // because silence became a coverage claim once already.
  const handled = (k: string) => k in ADJUDICATED || k in RESOLVED_COVERED;
  const pending = review.filter((r) => !handled(`${r.class} ${r.section_no}`));
  const cleared = review.filter((r) => `${r.class} ${r.section_no}` in RESOLVED_COVERED).length;
  const ruled = review.filter((r) => `${r.class} ${r.section_no}` in ADJUDICATED).length;
  console.log(`
Of ${review.length} flagged: ${ruled} ruled a gap, ${cleared} examined and cleared, ${pending.length} still unreviewed.`);
  if (pending.length) {
    console.log("STILL UNREVIEWED — these will be written as 'full' by default:");
    for (const r of pending) console.log(`  Std${r.class} ${r.section_no}  ${r.concept.slice(0, 50)}`);
  }
  // Rulings outside the flagged set are fine (cross-checks find gaps the probe
  // missed), but a stale key that matches no section would silently do nothing.
  const live = new Set(sections.map((x) => `${x.class} ${x.section_no}`));
  const orphans = [...Object.keys(ADJUDICATED), ...Object.keys(RESOLVED_COVERED)].filter((k) => !live.has(k));
  if (orphans.length) {
    console.error(`
REFUSING TO WRITE — ${orphans.length} entr(ies) name no live section:`);
    for (const o of orphans) console.error("  " + o);
    process.exitCode = 1;
    return;
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
