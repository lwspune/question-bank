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
  "11 8.3.2": "Body-text bleed ('...of Organic ball-a'). Three-dimensional representation of organic molecules is covered in SB 11-14.",
  "12 5.7": "Truncated title ('Importance'); importance and applications of coordination compounds are covered in SB 12-9.",
  "12 8.9.1": "Body-text bleed. Carboxylic acid reactions cleaving the O-H bond are covered in SB 12-12.",
  "12 8.9.2": "Body-text bleed. Carboxylic acid reactions cleaving the C-OH bond are covered in SB 12-12.",
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
  "11 1.2.2": "Probe searched 'classification'. SB 1.2.2 'Pure substances versus mixtures' is the same content; verified while hand-mapping Ch.1.",
  "11 6.12.1":
    "Garbled title ('Designing ... KaKb'). SB Ionic Equilibria teaches buffers thoroughly — 'buffer' 40, 'buffer solution' 15, acidic buffer 6, basic buffer 7, and the Henderson-Hasselbalch equation is derived (3 mentions). Buffer CAPACITY as a named quantity is absent, but NCERT gives it no section either.",
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
  // "12 2.8" moved to VERIFIED and re-ruled `not`. The old note here claimed the
  // topic was "taught in the p-Block and Transition Elements chapters"; counting
  // showed ONE mention in each, which is a passing reference, not teaching.
  // "11 9.5.5" WITHDRAWN — it was a spelling false negative, not a gap. The probe
  // searched "sulphonation" (0 hits); the State Board spells it "sulfonation"
  // (7 hits corpus-wide). SB 15.4.6 teaches it in full — fuming H2SO4 at 373 K
  // giving benzenesulfonic acid — and 12-11 adds sulfonation of phenol. Same
  // class of error as oxoacid/oxyacid: ALWAYS test both ph/f spellings before
  // calling a topic absent.
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

/**
 * HAND-VERIFIED mappings: `<class> <section_no>` -> where the State Board covers it.
 *
 * These beat everything else. Read off the two books section by section and
 * checked against the State Board TEXT, not against title similarity — the
 * headings routinely agree while the content does not (State Board 4.1.1
 * "Discovery of electron" is three sentences where NCERT 2.1.1-2.1.3 is three
 * full sections), and they routinely disagree while the content matches.
 *
 * The point of this table is the question a CBSE student actually asks: "where
 * is this in MY book?" A verdict of `partial` without a section number cannot
 * answer them, and a guessed section number answers them WRONGLY, which is worse
 * than admitting we do not know. Hence: only sections a human has read go here.
 *
 * Grain is top-level (N.x). Sub-sections stay NULL = not yet mapped.
 */
const VERIFIED: Record<string, { to: string; status: "full" | "partial" | "not"; note?: string }> = {
  // ---- Std XI Ch.1 Some Basic Concepts of Chemistry ----
  // Splits across TWO State Board chapters, and the second one (Ch.2 Introduction
  // to Analytical Chemistry) is SKIPPED by the 2026-27 teaching plan. That is the
  // single biggest source of the "syllabus mismatch" complaint on this chapter.
  "11 1.1": { to: "1.1", status: "full" },
  "11 1.2": {
    to: "1.2.1, 1.2.2, 1.2.3",
    status: "full",
    note: "Maps to the SUB-sections, not to SB 1.2 — SB 1.2 is 'Nature of Chemistry' (branches of the subject), a different topic that merely reads alike.",
  },
  "11 1.3": { to: "1.3", status: "full" },
  "11 1.4": {
    to: "2.3, 2.3.2, 2.3.3, 2.3.4, 2.3.5",
    status: "full",
    note: "In State Board CHAPTER 2, not Chapter 1. Covered fully there, but Ch.2 is skipped by the 2026-27 plan, so students must read 2.3 themselves.",
  },
  "11 1.5": {
    to: "1.4, 1.5",
    status: "full",
    note: "NCERT folds Avogadro's Law in as 1.5.5; the State Board gives it its own section 1.5.",
  },
  "11 1.6": { to: "1.6", status: "full" },
  "11 1.7": { to: "1.7", status: "full" },
  "11 1.8": { to: "1.8, 1.9", status: "full" },
  "11 1.9": {
    to: "2.4, 2.4.1",
    status: "full",
    note: "In State Board CHAPTER 2, not Chapter 1 — and Ch.2 is skipped by the 2026-27 plan.",
  },
  "11 1.10": {
    to: "2.5, 2.5.1, 2.6, 2.7",
    status: "full",
    note: "In State Board CHAPTER 2, not Chapter 1. Limiting reagent is SB 2.6; NCERT 1.10.2 'Reactions in Solutions' is SB 2.7 Concentration of solution. Ch.2 is skipped by the 2026-27 plan.",
  },

  // ---- Std XI Ch.2 Structure of Atom ----
  // All six land inside State Board Ch.4, which IS taught. Three carry real
  // content gaps, each verified by searching the State Board text.
  "11 2.1": {
    to: "4.1",
    status: "partial",
    note: "Charge-to-mass ratio (NCERT 2.1.2) and Millikan's oil drop / charge on the electron (2.1.3) are absent from the ENTIRE State Board corpus — zero hits for Millikan, oil drop, charge to mass. SB 4.1.1 is three sentences.",
  },
  "11 2.2": {
    to: "4.2, 4.3, 4.4",
    status: "partial",
    note: "Thomson's model of the atom (NCERT 2.2.1) is absent — 'plum pudding' and 'Thomson model' are zero corpus-wide; SB names Thomson only as the electron's discoverer. Rutherford's nuclear model IS covered, but as narrative inside 4.1.2 and 4.4 with no heading of its own. SB adds isotones, which NCERT omits.",
  },
  "11 2.3": {
    to: "4.5, 4.5.1, 4.5.2",
    status: "partial",
    note: "Planck's quantum theory and the photoelectric effect are in SB 4.5.1. But SB 4.5.2 teaches the EMISSION spectrum only — 'absorption spectrum' and 'continuous spectrum' are zero corpus-wide, though Lyman, Balmer and Rydberg are all present.",
  },
  "11 2.4": { to: "4.6, 4.6.1, 4.6.2, 4.6.3, 4.6.4", status: "full" },
  "11 2.5": {
    to: "4.6.5",
    status: "full",
    note: "Both de Broglie's dual behaviour and Heisenberg's uncertainty principle are taught, but inside SB 4.6.5 'Reasons for failure of the Bohr model' — invisible on the contents page. Point students there explicitly.",
  },
  "11 2.6": {
    to: "4.7",
    status: "full",
    note: "SB adds an explicit Schrodinger equation section (4.7.1) that NCERT folds into prose. Half-filled/completely-filled stability (NCERT 2.6.6) is taught inside SB 4.7.6 via the Cu example. Radial nodes are absent from the corpus (SB covers nodal planes only).",
  },

  // ---- Std XI Ch.3 Classification of Elements and Periodicity ----
  // Six of seven land in SB Ch.7, which is taught. One clean gap.
  "11 3.1": { to: "7.1", status: "full" },
  "11 3.2": {
    to: "7.1",
    status: "full",
    note: "SB 7.1 is titled only 'Introduction' but carries the whole history — Dobereiner's triads, Newlands' octaves, Mendeleev (16 mentions) and Moseley are all there.",
  },
  "11 3.3": { to: "7.2", status: "full" },
  "11 3.4": {
    to: "",
    status: "not",
    note: "Systematic IUPAC naming for elements beyond atomic number 100 (unnilquadium, ununbium) is absent from the ENTIRE State Board corpus — 'unnil', 'systematic name' and 'superheavy' are all zero. Tell students plainly it is not in their book.",
  },
  "11 3.5": { to: "7.3, 7.3.1, 7.3.2", status: "full" },
  "11 3.6": {
    to: "7.3.3, 7.4",
    status: "full",
    note: "Metals/non-metals/metalloids (NCERT 3.6.5) is covered — 'metalloid' appears 5 times in SB 7.1.",
  },
  "11 3.7": {
    to: "7.5, 7.5.1, 7.5.2, 7.5.3",
    status: "full",
    note: "SB gives effective nuclear charge and screening their own heading (7.5.1) where NCERT buries them. SEQUENCING, not gaps: diagonal relationship is in SB 8.2.5 (Group 1 and 2); anomalous second-period properties and the inert-pair effect sit in SB 11-9 and Std XII p-block.",
  },

  // ---- Std XI Ch.4 Chemical Bonding and Molecular Structure ----
  // The closest structural match so far; the two books teach bonding in nearly
  // the same order. Two real divergences, both worth warning a student about.
  "11 4.1": { to: "5.2, 5.2.3, 5.2.4, 5.2.5, 5.2.6, 5.2.7", status: "full" },
  "11 4.2": {
    to: "5.2.1, 5.2.2",
    status: "full",
    note: "SB nests the ionic bond INSIDE 5.2 Kossel-Lewis rather than giving it a chapter-level section as NCERT does.",
  },
  "11 4.3": {
    to: "5.6, 5.6.1, 5.6.2, 5.6.3, 5.6.4, 5.6.5, 5.7, 5.8",
    status: "full",
    note: "SB splits two of NCERT's bond parameters out to their own sections: resonance (NCERT 4.3.5) is SB 5.8, and dipole moment (inside NCERT 4.3.6) is SB 5.7.",
  },
  "11 4.4": { to: "5.3", status: "full" },
  "11 4.5": { to: "5.4, 5.4.1, 5.4.2, 5.4.3, 5.4.6, 5.4.7", status: "full" },
  "11 4.6": {
    to: "5.4.4, 5.4.5",
    status: "partial",
    note: "sp3 / sp2 / sp are covered, but hybridisation involving d orbitals (NCERT 4.6.3 — PCl5, SF6) is NOT: 'sp3d' and 'sp3d2' are ZERO in SB Ch.5 and appear only in Std XII Coordination Compounds and p-Block. A State Board student meets them a year later.",
  },
  "11 4.7": { to: "5.5, 5.5.1, 5.5.2, 5.5.3, 5.5.4, 5.5.5", status: "full" },
  "11 4.8": { to: "5.5.6", status: "full" },
  "11 4.9": {
    to: "10.2, 10.2.1",
    status: "full",
    note: "In a DIFFERENT chapter: hydrogen bonding is zero in SB Chemical Bonding and 18 mentions in SB Ch.10 States of Matter, filed under Intermolecular Forces. Both intermolecular and intramolecular types are covered.",
  },

  // ---- Std XI Ch.5 Thermodynamics -> SB Std XII Ch.4 ----
  // A WHOLE-CHAPTER YEAR SHIFT: NCERT teaches this in Std XI, the State Board in
  // Std XII. A Std XI student searching their own book will correctly find nothing.
  "11 5.1": { to: "XII:4.2", status: "full", note: "State Board teaches thermodynamics in Std XII Ch.4, a year later than NCERT." },
  "11 5.2": {
    to: "XII:4.3, XII:4.4, XII:4.5, XII:4.6, XII:4.7, XII:4.8",
    status: "full",
    note: "Std XII. SB splits NCERT's single 'Applications' section across six: heat/work, PV work, maximum work, internal energy, first law, enthalpy.",
  },
  "11 5.3": {
    to: "",
    status: "not",
    note: "Calorimetry is absent from the ENTIRE State Board corpus — 'calorimeter', 'calorimetry', 'bomb calorimeter' and 'coffee cup' all return zero across both years. Heat capacity survives as a definition, but the measurement chapter NCERT builds around it is not taught.",
  },
  "11 5.4": { to: "XII:4.10, XII:4.10.1, XII:4.10.3, XII:4.10.4", status: "full", note: "Std XII Ch.4 Thermochemistry." },
  "11 5.5": {
    to: "XII:4.9, XII:4.10.5, XII:4.10.7, XII:4.10.8, XII:4.10.9",
    status: "full",
    note: "Std XII. Phase-transition enthalpies are SB 4.9; formation, combustion, bond enthalpy and Hess's law are under 4.10.",
  },
  "11 5.6": { to: "XII:4.11, XII:4.11.1, XII:4.11.2, XII:4.11.3, XII:4.11.4", status: "full", note: "Std XII Ch.4." },
  "11 5.7": { to: "XII:4.11.5, XII:4.11.6, XII:4.11.7, XII:4.11.8, XII:4.11.9", status: "full", note: "Std XII Ch.4." },

  // ---- Std XI Ch.6 Equilibrium -> SB Ch.12 (XI) AND SB Ch.3 (XII) ----
  // One NCERT chapter split down the middle across two school years: the physical
  // /chemical half stays in Std XI, the whole ionic half moves to Std XII.
  "11 6.1": { to: "12.2", status: "full" },
  "11 6.2": { to: "12.3", status: "full" },
  "11 6.3": { to: "12.4", status: "full" },
  "11 6.4": { to: "12.5", status: "full" },
  "11 6.5": { to: "12.5", status: "full", note: "SB 12.5 covers homogeneous AND heterogeneous equilibria in one section; NCERT splits them (6.4, 6.5)." },
  "11 6.6": { to: "12.6, 12.7", status: "full" },
  "11 6.7": {
    to: "12.7, XII:4.11.9",
    status: "full",
    note: "Split across years: the reaction quotient is in SB 12.7 (Std XI), the Gibbs-energy link in SB 4.11.9 (Std XII Thermodynamics).",
  },
  "11 6.8": { to: "12.8, 12.9", status: "full", note: "SB adds the Haber process as its own section (12.9)." },
  "11 6.9": { to: "XII:3.1, XII:3.2", status: "full", note: "Std XII Ch.3 Ionic Equilibria — a year later than NCERT." },
  "11 6.10": { to: "XII:3.3", status: "full", note: "Std XII Ch.3. Bronsted and Lewis acid-base concepts are both covered." },
  "11 6.11": {
    to: "XII:3.4, XII:3.5, XII:3.6, XII:3.7",
    status: "full",
    note: "Std XII Ch.3. Ionisation, autoionization of water, pH scale and salt hydrolysis. Ostwald's dilution law is present. (Polybasic/polyacidic acids are thinner than NCERT — see the 6.11.6 ruling.)",
  },
  "11 6.12": { to: "XII:3.8", status: "full", note: "Std XII Ch.3. Acidic and basic buffers plus the Henderson-Hasselbalch equation." },
  "11 6.13": { to: "XII:3.9, XII:3.10", status: "full", note: "Std XII Ch.3. Solubility product and common ion effect." },

  // ---- Std XI Ch.7 Redox Reactions -> SB Ch.6 ----
  "11 7.1": { to: "6.1, 6.1.1", status: "full" },
  "11 7.2": { to: "6.1.2", status: "full" },
  "11 7.3": {
    to: "6.2, 6.2.1, 6.2.2, 6.2.3, 6.3, 6.3.1, 6.3.2",
    status: "partial",
    note: "Oxidation number and both balancing methods are covered thoroughly (118 mentions). The gap is 7.3.3 redox titrimetry — 'titration' occurs exactly ONCE in the entire corpus, in Adsorption and Colloids. Disproportionation is absent here too (it appears in Std XII p-block).",
  },
  "11 7.4": { to: "6.4, 6.4.1", status: "full", note: "The electrochemical series itself waits for Std XII Electrochemistry." },

  // ---- Std XI Ch.8 Organic Basics -> SB Ch.14 AND SB Ch.3 ----
  "11 8.1": { to: "14.1", status: "full" },
  "11 8.2": {
    to: "14.1",
    status: "partial",
    note: "Thin: 'tetravalent' appears once in SB Ch.14. NCERT gives the tetravalence of carbon and the shapes of organic compounds a full section.",
  },
  "11 8.3": { to: "14.2, 14.2.1, 14.2.2, 14.2.3", status: "full" },
  "11 8.4": { to: "14.3, 14.3.1, 14.3.2", status: "full" },
  "11 8.5": { to: "14.4", status: "full", note: "SB 14.4 runs to eight sub-sections and matches NCERT's nomenclature coverage in full." },
  "11 8.6": {
    to: "14.5, 14.5.1",
    status: "partial",
    note: "Only STRUCTURAL isomerism (14.5.1). NCERT 8.6.2 Stereoisomerism has no SB section here — 'stereoisomer' is 3 passing mentions and 'chiral' is zero in this chapter; stereochemistry arrives in Std XII Halogen Derivatives.",
  },
  "11 8.7": { to: "14.6", status: "full", note: "SB 14.6.1-14.6.8 cover bond fission, reagent types, inductive, resonance, electromeric and hyperconjugation." },
  "11 8.8": {
    to: "3.2, 3.2.1, 3.2.2, 3.3, 3.4, 3.5",
    status: "full",
    note: "In a DIFFERENT chapter (SB Ch.3 Some Analytical Techniques). NAMING TRAP: NCERT's 'Differential Extraction' is SB's 'Solvent Extraction' (3.4) — same technique. Sublimation is mentioned once but gets no section.",
  },

  // ---- Std XI Ch.9 Hydrocarbons -> SB Ch.15 ----
  // The tightest match in the book.
  "11 9.1": { to: "15.1", status: "full" },
  "11 9.2": { to: "15.1, 15.1.1, 15.1.2, 15.1.3, 15.1.4, 15.1.5, 15.1.6", status: "full" },
  "11 9.3": { to: "15.2, 15.2.1, 15.2.3, 15.2.4, 15.2.5", status: "full", note: "Markovnikov's rule and ozonolysis both present." },
  "11 9.4": { to: "15.3, 15.3.2, 15.3.3, 15.3.4, 15.3.5", status: "full" },
  "11 9.5": {
    to: "15.4, 15.4.1, 15.4.2, 15.4.3, 15.4.4, 15.4.5, 15.4.6, 15.4.7",
    status: "full",
    note: "Fully covered — Huckel's rule, directive influence, nitration, Friedel-Crafts AND sulfonation (SB 15.4.6, fuming H2SO4 at 373 K). Previously ruled partial on a probe for 'sulphonation'; the book spells it 'sulfonation', so that gap was a spelling artefact.",
  },
  "11 9.6": { to: "15.4.8", status: "full" },

  // ================= NCERT Std XII -> State Board Std XII =================
  // Same year throughout, unlike Std XI. Section numbering came from the
  // heading-font pass with run-collapsing; titles were hand-authored and verified
  // against each chapter PDF (see TITLE_OVERRIDES in dump_ncert_sections.py).

  // ---- Ch.1 Solutions -> SB Ch.2 ----
  "12 1.1": { to: "2.2", status: "full" },
  "12 1.2": {
    to: "XI:2.7",
    status: "full",
    note: "GOES BACK A YEAR: concentration units (mass %, mole fraction, molarity, molality) are SB Std XI Ch.2 section 2.7 — and Ch.2 is skipped by the 2026-27 plan, so a Std XII student may never have been taught them in class.",
  },
  "12 1.3": { to: "2.3, 2.4", status: "full" },
  "12 1.4": { to: "2.5", status: "full" },
  "12 1.5": { to: "2.5", status: "full", note: "SB 2.5 covers ideal/non-ideal behaviour; 'ideal solution' 11 mentions, Raoult 17." },
  "12 1.6": { to: "2.6, 2.7, 2.8, 2.9, 2.10", status: "full" },
  "12 1.7": { to: "2.11", status: "full", note: "SB titles it 'Colligative properties of electrolytes'; van't Hoff factor 11 mentions." },

  // ---- Ch.2 Electrochemistry -> SB Ch.5 ----
  "12 2.1": { to: "5.4", status: "full" },
  "12 2.2": { to: "5.6, 5.7", status: "full" },
  "12 2.3": { to: "5.7, 5.8", status: "full", note: "Nernst equation, 8 mentions; SB places it under electrode potential and the thermodynamics of galvanic cells." },
  "12 2.4": { to: "5.2, 5.3", status: "full" },
  "12 2.5": { to: "5.5", status: "full" },
  "12 2.6": { to: "5.10", status: "full", note: "SB titles it 'Galvanic cells useful in day-to-day life' — dry cell 23 mentions, lead accumulator 3." },
  "12 2.7": { to: "5.11", status: "full" },

  // ---- Ch.3 Chemical Kinetics -> SB Ch.6 ----  (clean, section for section)
  "12 3.1": { to: "6.2", status: "full" },
  "12 3.2": { to: "6.3, 6.7, 6.8", status: "full" },
  "12 3.3": { to: "6.5", status: "full" },
  "12 3.4": { to: "6.7", status: "full" },
  "12 3.5": { to: "6.6", status: "full" },

  // ---- Ch.4 d- and f-Block -> SB Ch.8 ----
  "12 4.1": { to: "8.2", status: "full" },
  "12 4.2": { to: "8.3", status: "full" },
  "12 4.3": { to: "8.4, 8.5, 8.6, 8.8", status: "full" },
  "12 4.4": { to: "8.7", status: "full", note: "SB 8.7 is specifically KMnO4 and K2Cr2O7." },
  "12 4.5": { to: "8.10, 8.11, 8.12", status: "full" },
  "12 4.6": { to: "8.14, 8.15", status: "full" },
  "12 4.7": {
    to: "8.13, 8.16",
    status: "full",
    note: "SB adds two sections NCERT does not have: 8.9 Extraction of metals and 8.17 Post-actinoid elements.",
  },

  // ---- Ch.5 Coordination Compounds -> SB Ch.9 ----
  "12 5.1": { to: "9.1", status: "full", note: "Werner's theory, 3 mentions in SB 9.1." },
  "12 5.2": { to: "9.2, 9.3, 9.4", status: "full" },
  "12 5.3": { to: "9.5", status: "full" },
  "12 5.4": { to: "9.7", status: "full" },
  "12 5.5": { to: "9.9", status: "full", note: "Crystal field theory, 13 mentions. SB adds 9.6 EAN rule and 9.8 Stability, neither in NCERT." },
  "12 5.6": {
    to: "",
    status: "not",
    note: "Metal carbonyls and synergic bonding are absent from the ENTIRE State Board corpus — 'metal carbonyl' and 'synergic' both zero. Independently confirmed as a JEE gap from the exam spine.",
  },
  "12 5.7": { to: "9.10", status: "full" },

  // ---- Ch.6 Haloalkanes and Haloarenes -> SB Ch.10 Halogen Derivatives ----
  "12 6.1": { to: "10.1", status: "full" },
  "12 6.2": { to: "10.2", status: "full" },
  "12 6.3": { to: "10.4", status: "full", note: "C-X bond, 15 mentions." },
  "12 6.4": { to: "10.3", status: "partial", note: "Preparation is taught (Grignard 9 mentions, 'preparation of alkyl halide' 3) but SB gives it no section of its own, unlike NCERT." },
  "12 6.6": { to: "10.4", status: "full" },
  "12 6.7": { to: "10.3, 10.6", status: "full", note: "SB adds 10.5 Optical isomerism here — the stereochemistry NCERT introduces back in Std XI Ch.8." },
  "12 6.8": { to: "10.7", status: "full" },

  // ---- Ch.7 Alcohols, Phenols and Ethers -> SB Ch.11 ---- (section for section)
  "12 7.1": { to: "11.2", status: "full" },
  "12 7.2": { to: "11.3", status: "full" },
  "12 7.3": { to: "11.1", status: "full" },
  "12 7.4": { to: "11.4", status: "full" },
  "12 7.5": { to: "11.6", status: "full" },
  "12 7.6": { to: "11.5", status: "full" },

  // ---- Ch.8 Aldehydes, Ketones and Carboxylic Acids -> SB Ch.12 ----
  "12 8.1": { to: "12.3, 12.7", status: "full" },
  "12 8.2": { to: "12.4", status: "full" },
  "12 8.3": { to: "12.6", status: "full" },
  "12 8.4": { to: "12.8", status: "full" },
  "12 8.5": {
    to: "",
    status: "not",
    note: "SB Ch.12 has no 'uses' section — 'uses of' occurs once in the whole chapter. NCERT gives uses of aldehydes and ketones their own section.",
  },
  "12 8.7": { to: "12.5", status: "full" },
  "12 8.8": { to: "12.6", status: "full" },
  "12 8.9": { to: "12.9", status: "full" },
  "12 8.10": { to: "", status: "not", note: "Same as 8.5 — SB Ch.12 carries no uses-of-carboxylic-acids section." },

  // ---- Ch.9 Amines -> SB Ch.13 ----
  "12 9.1": { to: "13.1", status: "full" },
  "12 9.4": { to: "13.3", status: "full" },
  "12 9.5": { to: "13.4", status: "full" },
  "12 9.6": { to: "13.5, 13.6, 13.8, 13.9", status: "full", note: "SB splits basicity (13.5), arenesulfonyl chloride (13.8) and electrophilic aromatic substitution (13.9) into their own sections." },
  "12 9.7": {
    to: "13.7",
    status: "partial",
    note: "Diazonium chemistry is taught in SB 13.7, but PREPARATION has no section of its own — 'diazotisation' appears twice, where NCERT gives it a full section.",
  },
  "12 9.9": { to: "13.7", status: "full" },

  // ---- Ch.10 Biomolecules -> SB Ch.14 ----
  // Added after the spine gained these sections — they were mapped in the review
  // tables but had no row to attach to at the time.
  "12 2.8": {
    to: "",
    status: "not",
    note: "CORRECTION to an earlier, too-generous ruling. 'corrosion' appears ONCE in SB Transition Elements and once in Std XI Ch.9, and 'rusting' once in Redox — passing mentions, not teaching. NCERT gives it a full section.",
  },
  "12 6.5": {
    to: "10.1, 10.2, 10.3",
    status: "partial",
    note: "Haloarene chemistry is covered ('haloarene' 17, 'chlorobenzene' 25, 'aryl halide' 12 in SB Ch.10), but PREPARATION of haloarenes has no section of its own — the same shape as 6.4 for haloalkanes.",
  },
  "12 8.6": { to: "12.3, 12.7", status: "full" },
  "12 9.2": { to: "13.1", status: "full" },
  "12 9.3": { to: "13.2", status: "full" },
  "12 9.8": {
    to: "13.7",
    status: "partial",
    note: "Diazonium salts are taught in SB 13.7, but their PHYSICAL PROPERTIES get no section, unlike NCERT.",
  },
  "12 10.1": { to: "14.2", status: "full" },
  "12 10.2": { to: "14.3", status: "full" },
  "12 10.5": { to: "14.4", status: "full" },
  "12 10.3": { to: "14.2", status: "full", note: "Enzymes are covered (36 mentions) though SB gives them no standalone section." },
};

/**
 * Mappings held back because the SECTION does not exist in the extracted spine
 * yet. Verified against the books; they will apply as soon as extraction recovers
 * the heading. Kept here rather than in VERIFIED so the orphan guard stays strict.
 */
const PENDING_SPINE: Record<string, string> = {
  "12 1.7": "2.11 — 'Abnormal Molar Masses' is printed in NCERT Ch.1 (string-verified) but sits past the last extracted section, so it is not a numbering hole and the injector does not reach it.",
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

  // A hand-verified mapping for a section the extractor has not recovered yet is
  // PENDING work, not a stale key — warn loudly and carry on, rather than blocking
  // the other 40-odd mappings behind it. Anything in VERIFIED that names no live
  // section is reported here too, so nothing goes quiet.
  const awaitingSpine = Object.keys(PENDING_SPINE).filter((k) => !live.has(k));
  const verifiedOrphans = Object.keys(VERIFIED).filter((k) => !live.has(k));
  const landed = Object.keys(PENDING_SPINE).filter((k) => live.has(k));
  if (awaitingSpine.length || verifiedOrphans.length) {
    console.log(`\nPENDING — ${awaitingSpine.length + verifiedOrphans.length} mapping(s) waiting on extraction:`);
    for (const k of awaitingSpine) console.log(`  ${k}  ${PENDING_SPINE[k]}`);
    for (const k of verifiedOrphans) console.log(`  ${k}  (in VERIFIED but no live section)`);
  }
  if (landed.length) {
    console.log(`\n${landed.length} PENDING_SPINE section(s) now exist — move them into VERIFIED:`);
    for (const k of landed) console.log(`  ${k}  ${PENDING_SPINE[k]}`);
  }

  const orphans = [...Object.keys(ADJUDICATED), ...Object.keys(RESOLVED_COVERED)].filter(
    (k) => !live.has(k),
  );
  if (orphans.length) {
    console.error(`
REFUSING TO WRITE — ${orphans.length} entr(ies) name no live section:`);
    for (const o of orphans) console.error("  " + o);
    process.exitCode = 1;
    return;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("service-role env required");
  const db = createClient(url, key, { auth: { persistSession: false } });

  // Every covered_by must name a State Board section that EXISTS. A typo here is
  // the worst failure this table has: it does not look wrong, it just sends a
  // student to a page that is not in their book. Runs on dry-run too, so the
  // check happens while the mapping is being written, not after it ships.
  // SCOPED TO CHEMISTRY *AND* PAGED. This query was neither, and both mattered
  // the moment a second subject existed:
  //   - no subject filter meant Physics State Board sections counted as valid
  //     targets for a Chemistry ruling, which is simply the wrong book;
  //   - no paging meant PostgREST silently capped the result at 1000 rows.
  //     Chemistry State Board is 863 rows and Physics added 587, so the table
  //     crossed the cap and ~450 real sections became invisible — the validator
  //     then rejected 26 perfectly good refs and refused to write. The failure
  //     looked like corrupt mappings; it was a truncated SELECT.
  const sbLive = new Set<string>();
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("syllabus_concepts")
      .select("class,section_no")
      .eq("source", "MH State Board")
      .eq("subject", "Chemistry")
      .range(from, from + 999);
    if (error) throw new Error(`sb sections: ${error.message}`);
    for (const r of data ?? []) sbLive.add(`${r.class}|${r.section_no}`);
    if ((data ?? []).length < 1000) break;
  }
  // A ref may be prefixed "XII:" to name the OTHER school year. That is not a
  // formatting nicety — the central finding of this mapping is that a third of
  // NCERT Std XI lands in State Board Std XII, and a bare "4.2" would leave a
  // student unable to tell which of the two books to open.
  const parseRef = (ref: string, defaultCls: string) => {
    const m = ref.match(/^(XI|XII):(.+)$/);
    return m ? { cls: m[1] === "XII" ? "12" : "11", no: m[2].trim() } : { cls: defaultCls, no: ref };
  };
  const badRefs: string[] = [];
  for (const [k, v] of Object.entries(VERIFIED)) {
    if (!live.has(k)) continue; // pending; already reported above
    const defaultCls = k.split(" ")[0];
    for (const raw of v.to.split(",").map((x) => x.trim()).filter(Boolean)) {
      const { cls, no } = parseRef(raw, defaultCls);
      if (!sbLive.has(`${cls}|${no}`)) badRefs.push(`${k} -> SB Std${cls} ${no}`);
    }
  }
  if (badRefs.length) {
    console.error(`\nREFUSING TO WRITE — ${badRefs.length} covered_by ref(s) name no State Board section:`);
    for (const b of badRefs) console.error("  " + b);
    process.exitCode = 1;
    return;
  }
  console.log(`covered_by: ${Object.keys(VERIFIED).length} hand-verified mapping(s), all refs resolve.`);

  if (!apply) {
    console.log("\nDRY RUN — nothing written. Re-run with --apply.");
    return;
  }

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

  // PRUNE sections the source no longer has. The ingest upserts, so when
  // re-extraction REMOVES a row (an intext question correctly filtered out, say)
  // the old row lingers forever and shows up as a section that does not exist.
  // That is how the DB drifted to 398 NCERT rows while the file had 392.
  //
  // SCOPED TO THIS SUBJECT. Without the subject filter this prune reads EVERY
  // subject's NCERT rows, and since `wanted` only ever holds this run's sections
  // every other subject's rows are "stale" — so running the Chemistry ingest
  // would delete the whole Physics NCERT spine, rulings cascading with it.
  // --concepts-only stops here: no prune, no rulings. Used when an EXTRACTOR
  // fix adds or retitles sections in a spine whose rulings are already
  // adjudicated and must not be rewritten as a side effect. Skipping the prune
  // is safe for that case by construction — recovering sections only ever ADDS,
  // so there is nothing stale to remove, and a prune here could only destroy.
  if (process.argv.includes("--concepts-only")) {
    console.log("\n--concepts-only: wrote concepts; skipped prune and rulings.");
    return;
  }

  const { data: existing, error: exErr } = await db
    .from("syllabus_concepts")
    .select("id,class,section_no")
    .eq("source", "NCERT")
    .eq("subject", "Chemistry");
  if (exErr) throw new Error(exErr.message);
  const wanted = new Set(sections.map((s) => `${s.class}|${s.section_no}`));
  const stale = (existing ?? []).filter((r) => !wanted.has(`${r.class}|${r.section_no}`));
  if (stale.length) {
    // Rulings cascade with the concept, which is correct: a ruling on a section
    // that no longer exists is meaningless.
    const { error: delErr } = await db
      .from("syllabus_concepts")
      .delete()
      .in("id", stale.map((r) => r.id));
    if (delErr) throw new Error(`prune: ${delErr.message}`);
    console.log(`Pruned ${stale.length} stale NCERT section(s) no longer in the source.`);
  }

  const { data: back, error: backErr } = await db
    .from("syllabus_concepts")
    .select("id,class,section_no")
    .eq("source", "NCERT");
  if (backErr) throw new Error(backErr.message);
  const idBy = new Map((back ?? []).map((r) => [`${r.class}|${r.section_no}`, r.id]));

  const links = sections
    .map((s) => {
      const k = `${s.class} ${s.section_no}`;
      const id = idBy.get(`${s.class}|${s.section_no}`);
      if (!id) return null;
      // A hand-verified reading beats the probe's guess, always.
      const ver = VERIFIED[k];
      if (ver) {
        return {
          concept_id: id,
          exam: "MH State Board",
          status: ver.status,
          note: ver.note ?? null,
          // A `not` ruling has nowhere to point; store NULL, not "".
          covered_by: ver.to.trim() || null,
        };
      }
      const adj = ADJUDICATED[k];
      return {
        concept_id: id,
        exam: "MH State Board",
        status: adj ? adj[0] : "full",
        note: adj ? adj[1] : null,
        covered_by: null,
      };
    })
    .filter(Boolean) as {
    concept_id: string;
    exam: string;
    status: string;
    note: string | null;
    covered_by: string | null;
  }[];

  // The note CHECK is 500 chars and the upsert is CHUNKED, so a single over-long
  // note fails mid-run and leaves a PARTIAL write behind. Catch it before any row
  // is sent rather than after 200 have landed.
  const tooLong = links.filter((l) => (l.note?.length ?? 0) > 500);
  if (tooLong.length) {
    console.error(`\nREFUSING TO WRITE — ${tooLong.length} note(s) exceed the 500-char CHECK.`);
    process.exitCode = 1;
    return;
  }

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
