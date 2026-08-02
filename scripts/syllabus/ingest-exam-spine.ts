/**
 * Second spine: each exam's OWN subtopics (from the question bank), with a
 * ruling on whether the State Board syllabus covers them.
 *
 *   npx tsx scripts/syllabus/ingest-exam-spine.ts          # dry-run
 *   npx tsx scripts/syllabus/ingest-exam-spine.ts --apply
 *
 * This is the INVERSE of the State Board spine already in the table:
 *   SB spine   — rows are State Board concepts; "does exam X require this?"
 *   exam spine — rows are what exam X actually asks; "does the State Board cover it?"
 * Only the second can express "exam asks something the books never teach", which
 * is the gap worth acting on.
 *
 * The spine is the BANK taxonomy, not a syllabus document, so it measures what
 * each exam demonstrably asked in the years the bank holds. Recorded per row via
 * `source` so nobody mistakes it for the full official syllabus.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

const EXAMS = ["MHT-CET", "JEE Mains", "NDA"] as const;

/** Explicit separator. An earlier revision keyed on a raw control character, which
 *  worked but made the file binary to git. */
const SEP = " :: ";

type Ruling = ["partial" | "not", string];

/**
 * `<exam> :: <subtopic>` -> ruling. Adjudicated BY HAND against the State Board
 * chapter that would TEACH the topic — never from a probe score, and never
 * against the whole corpus, since a passing mention elsewhere is not coverage.
 *
 * Everything unlisted is `full`. That is only safe because every probe flag was
 * read: the ~15 unlisted low scorers resolved to question-format noise ("nearest
 * integer" is a JEE NAT instruction), wording misses (the book says "quantum
 * theory", not "Planck"; "IUPAC", not "nomenclature") or a too-narrow chapter map
 * (carbanions sit in Organic Basics, not Hydrocarbons).
 */
const METALLURGY_NOTE =
  "No State Board chapter teaches extraction of metals — there is no metallurgy chapter in Std XI or Std XII. NOT ACTIONABLE: JEE removed 'General Principles and Processes of Isolation of Elements' in the 2023-24 rationalisation, and every PYQ here is 2021, none since 2023.";

/**
 * WHERE the State Board covers each exam subtopic — the pointer, not the verdict.
 *
 * Keyed the same way as ADJUDICATED (`<exam> :: <subtopic>`) rather than by
 * section number, because the JEE-nnn numbers are POSITIONAL: they are assigned
 * from sort order at write time, so any change to the bank taxonomy silently
 * renumbers them and a number-keyed entry would attach to the wrong row.
 *
 * Refs may carry an `XI:` / `XII:` prefix to name the State Board YEAR. These
 * concepts are all stored as class 12, so a bare ref resolves to a Std XII
 * section; anything in the Std XI books MUST say `XI:` or it will point at the
 * wrong book entirely.
 *
 * `status`/`note` here override ADJUDICATED so one row has one source of truth.
 */
type Covered = { to: string; status?: "partial" | "not"; note?: string };

const COVERED: Record<string, Covered> = {
  // ---- JEE Mains · The p-Block Elements (8 subtopics, 36 PYQ) ----
  // Verified against the State Board text, not against title similarity.
  [`JEE Mains${SEP}The p-Block Elements${SEP}Allotropes of Carbon`]: {
    to: "XI:9.6, XI:9.6.1",
  },
  [`JEE Mains${SEP}The p-Block Elements${SEP}Boron Family`]: {
    to: "XI:9.2, XI:9.3, XI:9.4, XI:9.7.1, XI:9.7.2, XI:9.7.3, XI:9.7.4",
  },
  [`JEE Mains${SEP}The p-Block Elements${SEP}Group 14 Elements (Compounds of Tin and Lead)`]: {
    to: "XI:9.3, XI:9.4, XI:9.7.5",
    status: "partial",
    note: "Tin and lead are present but THIN and have no section of their own — word-boundary counts in SB Ch.9 are 'tin' 3, 'lead' 4, plus SnCl2, SnO2 and PbO2 once or twice each. (A first probe read 'tin' 28 and 'lead' 4; those were substring hits inside 'containing' and 'leading'.)",
  },
  [`JEE Mains${SEP}The p-Block Elements${SEP}Group 15 Elements`]: {
    to: "XI:9.2, XI:9.3, XI:9.4, XI:9.7.6, XI:9.6.7",
  },
  [`JEE Mains${SEP}The p-Block Elements${SEP}Group 16 Elements`]: {
    to: "7.3, 7.4, 7.6, 7.9, 7.10",
  },
  [`JEE Mains${SEP}The p-Block Elements${SEP}Group 17 Elements`]: {
    to: "7.6, 7.11, 7.12",
  },
  [`JEE Mains${SEP}The p-Block Elements${SEP}Industrial Preparation of Compounds`]: {
    to: "7.10, XI:9.4",
    status: "partial",
    note: "Taught inside the compound sections rather than as a topic: 'contact process' 3 mentions in SB Std XII Ch.7, 'Haber' 2 in Std XI Ch.9, 'manufacture' 15 across both. No section is devoted to industrial preparation.",
  },
  [`JEE Mains${SEP}The p-Block Elements${SEP}Oxoacids of Phosphorus`]: {
    to: "XI:9.6.7",
    status: "partial",
    note: "Only ORTHOPHOSPHORIC acid is taught; H3PO3, H3PO2, 'phosphorous acid' and 'hypophosphorous' are ZERO corpus-wide, so the oxoacid SERIES is not covered. SB 7.8 'Oxoacids' is groups 16/17 and does not fill it. All 3 PYQs are 2021, before p-block was cut to trends — historical, not live. The book prints this section 9.6.7 (filing it under Allotropy) though it follows 9.7.6 and no 9.7.7 exists — a numbering error, so scanning 9.6 will not find it.",
  },

  // ---- JEE Mains · Organic Chemistry — Basic Principles and Techniques ----
  // Holds the largest live JEE gap (Estimation of Elements, 15 PYQ). Detection
  // and Estimation stay in ADJUDICATED with no pointer: there is nowhere to point.
  [`JEE Mains${SEP}Organic Chemistry - Some Basic Principles and Techniques${SEP}Purification and Chromatography`]: {
    to: "XI:3.2, XI:3.2.1, XI:3.2.2, XI:3.3, XI:3.3.1, XI:3.3.2, XI:3.3.3, XI:3.4, XI:3.5, XI:3.5.1, XI:3.5.2",
    note: "Fully covered in SB Std XI Ch.3 — crystallisation 17, distillation 32, chromatography 27, Rf 7. NAMING TRAP: what JEE/NCERT call 'differential extraction' the State Board calls 'solvent extraction' (3.4).",
  },
  [`JEE Mains${SEP}Organic Chemistry - Some Basic Principles and Techniques${SEP}IUPAC Nomenclature, Functional Groups and Homologous Series`]: {
    to: "XI:14.3, XI:14.3.1, XI:14.3.2, XI:14.4",
    note: "SB 14.4 runs to eight sub-sections; 'functional group' 52 mentions, 'homologous series' 11.",
  },
  [`JEE Mains${SEP}Organic Chemistry - Some Basic Principles and Techniques${SEP}Resonance and Stability of Resonance Structures`]: {
    to: "XI:14.6.5, XI:14.6.6",
    note: "'resonance' appears 66 times in SB Ch.14 — the single best-covered idea in the chapter.",
  },
  [`JEE Mains${SEP}Organic Chemistry - Some Basic Principles and Techniques${SEP}Electronic Effects and Reaction Intermediates`]: {
    to: "XI:14.6, XI:14.6.1, XI:14.6.2, XI:14.6.3, XI:14.6.4, XI:14.6.7, XI:14.6.8",
    note: "Well covered: carbocation 18, free radical 14, carbanion 5, inductive 21, hyperconjugation 13. Carbenes and nitrenes are absent, but JEE does not ask them under this subtopic.",
  },
  [`JEE Mains${SEP}Organic Chemistry - Some Basic Principles and Techniques${SEP}Electronic Effects, Hybridization, Intermediates and General Reactions`]: {
    to: "XI:14.6, XI:14.6.3, XI:14.6.4, XI:5.4.4, XI:5.4.5",
    note: "Electronic effects and intermediates are in Ch.14; HYBRIDISATION itself is taught in a different chapter — SB Std XI Ch.5 Chemical Bonding (5.4.4, 5.4.5), not in Organic Basics, where it appears twice in passing.",
  },
  // ---- JEE Mains · Chemical Kinetics (8 subtopics, 27 PYQ) — fully covered ----
  ...Object.fromEntries(
    [
      "First Order Reactions",
      "Order of Reaction and Half-Life",
      "Arrhenius Equation and Activation Energy",
      "Arrhenius Equation and Temperature Dependence",
      "Temperature Dependence, Arrhenius and Collision Theory",
      "Rate of Reaction and Rate Expressions (stoichiometric rate relations)",
      "Rate of Reaction, Stoichiometry and Average Rate",
      "Reaction Mechanism, Intermediates and Rate-Determining Step",
    ].map((s) => [
      `JEE Mains${SEP}Chemical Kinetics${SEP}${s}`,
      {
        to: "6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8",
        note: "SB Ch.6 covers this chapter end to end — activation energy 18, half life 17, rate-determining step 5, pseudo-first-order 4, collision theory and catalysis each with their own section.",
      } as Covered,
    ]),
  ),

  // ---- JEE Mains · Chemical Thermodynamics (7 subtopics, 23 PYQ) ----
  ...Object.fromEntries(
    [
      "First Law of Thermodynamics, Internal Energy and Work",
      "First Law and Work of Expansion",
      "Work in Thermodynamic Processes (First Law)",
    ].map((s) => [
      `JEE Mains${SEP}Chemical Thermodynamics${SEP}${s}`,
      { to: "4.3, 4.4, 4.5, 4.6, 4.7" } as Covered,
    ]),
  ),
  [`JEE Mains${SEP}Chemical Thermodynamics${SEP}Enthalpy Changes, Hess's Law and Bond Enthalpy`]: {
    to: "4.8, 4.9, 4.10",
    note: "Hess's law 5, bond enthalpy 9 — SB 4.10 gives each thermochemical enthalpy its own sub-section.",
  },
  [`JEE Mains${SEP}Chemical Thermodynamics${SEP}Entropy and Spontaneity`]: {
    to: "4.11, 4.11.1, 4.11.2, 4.11.3, 4.11.4",
  },
  [`JEE Mains${SEP}Chemical Thermodynamics${SEP}Gibbs Free Energy`]: {
    to: "4.11.5, 4.11.6, 4.11.7, 4.11.8, 4.11.9",
  },
  [`JEE Mains${SEP}Chemical Thermodynamics${SEP}Heat Capacity and Calorimetry`]: {
    to: "4.3, 4.8",
    status: "partial",
    note: "Heat and enthalpy are covered, but CALORIMETRY is absent from the entire corpus — 'calorimeter', 'calorimetry', 'bomb calorimeter' and 'coffee cup' all zero. Heat capacity survives only as a definition.",
  },

  // ---- JEE Mains · Surface Chemistry / Polymers / Solid State — all fully covered ----
  [`JEE Mains${SEP}Surface Chemistry${SEP}Adsorption`]: {
    to: "XI:11.2, XI:11.3, XI:11.4, XI:11.5, XI:11.6, XI:11.7, XI:11.8",
    note: "SB Std XI Ch.11 'Adsorption and Colloids' — adsorption 79, Freundlich isotherm 6, catalysis its own section.",
  },
  [`JEE Mains${SEP}Surface Chemistry${SEP}Colloids`]: {
    to: "XI:11.9",
    note: "colloid 105, emulsion 27.",
  },
  [`JEE Mains${SEP}Polymers${SEP}Types of Polymers`]: {
    to: "15.3, 15.5, 15.6",
    note: "polymer 245 mentions; Buna 15, neoprene 14.",
  },
  [`JEE Mains${SEP}Polymers${SEP}Classification of Polymers`]: {
    to: "15.2",
    note: "Addition vs condensation polymers both named (12 and 11).",
  },
  [`JEE Mains${SEP}Polymers${SEP}Synthetic Rubber`]: {
    to: "15.3, 15.6",
  },
  [`JEE Mains${SEP}Solid State${SEP}Classification of Solids`]: {
    to: "1.2, 1.3",
  },
  [`JEE Mains${SEP}Solid State${SEP}Crystal Defects`]: {
    to: "1.8",
    note: "Schottky 8, Frenkel 11.",
  },
  [`JEE Mains${SEP}Solid State${SEP}Voids and Formula`]: {
    to: "1.6, 1.7",
    note: "unit cell 119, tetrahedral void 17, octahedral void 11, packing efficiency 13.",
  },

  // ---- JEE Mains · Some Basic Concepts of Chemistry (3, 26 PYQ) ----
  [`JEE Mains${SEP}Some Basic Concepts of Chemistry${SEP}Mole Concept and Stoichiometry`]: {
    to: "XI:1.8, XI:1.9, XI:2.5, XI:2.5.1, XI:2.6, XI:2.7",
    status: "partial",
    note: "23 PYQs. The mole concept is Std XI Ch.1, but STOICHIOMETRIC CALCULATIONS, limiting reagent and concentration are in Ch.2 — which the 2026-27 teaching plan SKIPS, so students must read 2.5-2.7 themselves.",
  },
  [`JEE Mains${SEP}Some Basic Concepts of Chemistry${SEP}Empirical and Molecular Formula`]: {
    to: "XI:2.4, XI:2.4.1",
    status: "partial",
    note: "Covered in Std XI Ch.2 (empirical formula 20 mentions) — again a chapter the 2026-27 plan skips.",
  },
  [`JEE Mains${SEP}Some Basic Concepts of Chemistry${SEP}Balancing Redox Reactions and Oxidized/Reduced Species`]: {
    to: "XI:6.3, XI:6.3.1, XI:6.3.2",
  },

  // ---- JEE Mains · Alcohols, Phenols and Ethers (4, 15 PYQ) ----
  [`JEE Mains${SEP}Alcohols, Phenols and Ethers${SEP}Phenols`]: {
    to: "11.4",
    note: "Reimer-Tiemann 2, Kolbe 4 — both named reactions present.",
  },
  [`JEE Mains${SEP}Alcohols, Phenols and Ethers${SEP}Ethers`]: {
    to: "11.5",
    note: "Williamson synthesis 5 mentions.",
  },
  [`JEE Mains${SEP}Alcohols, Phenols and Ethers${SEP}Chemical Reactions of Alcohols and Acidity`]: {
    to: "11.4",
    note: "Lucas reagent 2, esterification 3.",
  },
  [`JEE Mains${SEP}Alcohols, Phenols and Ethers${SEP}Classification of Alcohols and Phenols`]: {
    to: "11.2",
  },

  // ---- JEE Mains · Haloalkanes and Haloarenes (4, 15 PYQ) ----
  [`JEE Mains${SEP}Haloalkanes and Haloarenes${SEP}Nucleophilic Substitution`]: {
    to: "10.3",
    note: "11 PYQs, thoroughly covered — SN1 30 mentions, SN2 28, Saytzeff 2.",
  },
  [`JEE Mains${SEP}Haloalkanes and Haloarenes${SEP}Classification, Nomenclature and Physical Properties`]: {
    to: "10.1, 10.2, 10.4",
  },
  [`JEE Mains${SEP}Haloalkanes and Haloarenes${SEP}Preparation of Alkyl Halides`]: {
    to: "10.1, 10.3",
    status: "partial",
    note: "Finkelstein is taught (2 mentions) but SWARTS is absent from the entire corpus, and SB gives preparation no section of its own.",
  },
  [`JEE Mains${SEP}Haloalkanes and Haloarenes${SEP}Structure and Bonding in Haloarenes`]: {
    to: "10.1, 10.4",
  },

  // ---- JEE Mains · Hydrogen and s-Block (9 subtopics, 21 PYQ) ----
  [`JEE Mains${SEP}Hydrogen${SEP}Hydrogen Peroxide`]: {
    to: "XI:8.3.4",
    note: "H2O2 has its own SB sub-section; 31 mentions.",
  },
  [`JEE Mains${SEP}Hydrogen${SEP}Preparation of Dihydrogen`]: {
    to: "XI:8.1.4",
  },
  [`JEE Mains${SEP}Hydrogen${SEP}Properties of Hydrogen`]: {
    to: "XI:8.1, XI:8.1.1, XI:8.1.2, XI:8.1.3, XI:8.1.5",
  },
  [`JEE Mains${SEP}Hydrogen${SEP}Water and Hardness`]: {
    to: "XI:8.1.5",
    status: "partial",
    note: "'hard water' appears only twice corpus-wide; SB has no section on water hardness or its removal, which JEE treats as a topic.",
  },
  [`JEE Mains${SEP}The s-Block Elements${SEP}Group 1 Elements`]: {
    to: "XI:8.2, XI:8.2.1, XI:8.2.2, XI:8.2.3, XI:8.2.4, XI:8.2.6, XI:8.2.7",
  },
  [`JEE Mains${SEP}The s-Block Elements${SEP}Group 2 Elements`]: {
    to: "XI:8.2, XI:8.2.3, XI:8.2.4, XI:8.2.5, XI:8.2.6, XI:8.2.7",
    note: "SB 8.2.5 adds the diagonal relationship explicitly.",
  },
  [`JEE Mains${SEP}The s-Block Elements${SEP}Solvay Process`]: {
    to: "XI:8.3.1",
    note: "Taught under sodium carbonate; 'Solvay' named twice.",
  },
  [`JEE Mains${SEP}The s-Block Elements${SEP}Qualitative Analysis of Salts`]: {
    to: "XI:2.2, XI:2.2.1",
    status: "partial",
    note: "Std XI Ch.2 only DEFINES qualitative analysis — there is no salt-analysis or group-reagent scheme anywhere in the corpus, and Ch.2 is skipped by the 2026-27 plan.",
  },
  [`JEE Mains${SEP}The s-Block Elements${SEP}Flame Colouration`]: {
    to: "",
    status: "not",
    note: "ABSENT: 'flame colour', 'flame test', 'flame colouration' and 'flame photometry' are all ZERO across the entire State Board corpus, in both years.",
  },

  // ---- JEE Mains · Chemistry in Everyday Life (2, 7 PYQ) ----
  [`JEE Mains${SEP}Chemistry in Everyday Life${SEP}Drugs and their Classification`]: {
    to: "XI:16.2",
    note: "SB Std XI Ch.16 'Chemistry in Everyday Life' — drug 31, antiseptic 24, antibiotic 16, analgesic 11.",
  },
  [`JEE Mains${SEP}Chemistry in Everyday Life${SEP}Applications of Compounds`]: {
    to: "XI:16.1, XI:16.3",
    note: "Cleansing agents (soap/detergent 52) and food chemistry. Artificial sweeteners are absent from the corpus.",
  },

  // ---- JEE Mains · Environmental Chemistry (3, 12 PYQ) ----
  // The State Board has NO environmental chemistry chapter; only green chemistry
  // survives, inside Std XII Ch.16.
  [`JEE Mains${SEP}Environmental Chemistry${SEP}Green Chemistry`]: {
    to: "16.2, 16.3, 16.4",
    note: "Well covered — SB Std XII Ch.16 is 'Green Chemistry and Nanochemistry', with the principles and role of green chemistry each given a section.",
  },
  [`JEE Mains${SEP}Environmental Chemistry${SEP}Atmospheric Pollution`]: {
    to: "",
    status: "not",
    note: "No State Board chapter teaches atmospheric pollution. 'acid rain' and 'smog' are ZERO corpus-wide; 'air pollution' appears twice in passing and ozone depletion only inside the p-block chapters. 7 PYQs.",
  },
  [`JEE Mains${SEP}Environmental Chemistry${SEP}Water Pollution`]: {
    to: "",
    status: "not",
    note: "'water pollution' is ABSENT from the entire corpus, and there is no BOD/COD treatment. 4 PYQs.",
  },

  // ---- JEE Mains · Organic Reaction Mechanisms (3, 47 PYQ) ----
  // A BANK-TAXONOMY ARTEFACT, not a syllabus unit: "Reaction Products" collects
  // any question that asks "what is the product?", across alcohols, carbonyls,
  // amines and haloalkanes. There is no State Board section it corresponds to, so
  // no pointer is given — a pointer at half the book would assert a precision
  // that does not exist. Ruled `full` because the CONTENT is taught; the right
  // remedy is to reclassify these questions into their real chapters.
  ...Object.fromEntries(
    [
      "Reaction Products",
      "Named Reactions",
      "Oxidation, Reduction and Identification Tests",
    ].map((s) => [
      `JEE Mains${SEP}Organic Reaction Mechanisms${SEP}${s}`,
      {
        to: "",
        note: "Catch-all bank subtopic spanning every organic chapter (alcohols, carbonyls, amines, haloalkanes), not a syllabus unit — so it maps to no single State Board section. The underlying chemistry is covered in SB Std XII Ch.10-13. Reclassifying these questions into their real chapters would make the row meaningful.",
      } as Covered,
    ]),
  ),

  // ---- JEE Mains · Chemical Bonding and Molecular Structure (9, 39 PYQ) ----
  [`JEE Mains${SEP}Chemical Bonding and Molecular Structure${SEP}Molecular Geometry`]: {
    to: "XI:5.3",
  },
  [`JEE Mains${SEP}Chemical Bonding and Molecular Structure${SEP}VSEPR Theory`]: {
    to: "XI:5.3",
  },
  [`JEE Mains${SEP}Chemical Bonding and Molecular Structure${SEP}Bond Parameters (Bond Length, Bond Angle, Bond Order)`]: {
    to: "XI:5.6, XI:5.6.1, XI:5.6.2, XI:5.6.3, XI:5.6.4",
  },
  [`JEE Mains${SEP}Chemical Bonding and Molecular Structure${SEP}Molecular Orbital Theory`]: {
    to: "XI:5.5, XI:5.5.1, XI:5.5.2, XI:5.5.3, XI:5.5.4, XI:5.5.5, XI:5.5.6",
  },
  [`JEE Mains${SEP}Chemical Bonding and Molecular Structure${SEP}Formal Charge and Lewis Structures`]: {
    to: "XI:5.2.4, XI:5.2.5, XI:5.2.6",
    note: "SB adds 5.2.5 'Steps to write Lewis dot structures', a procedure NCERT and JEE leave implicit.",
  },
  [`JEE Mains${SEP}Chemical Bonding and Molecular Structure${SEP}Ionic Bonding and Lattice Energy`]: {
    to: "XI:5.2.1, XI:5.2.2, XI:5.8.7",
    note: "Lattice enthalpy 7 mentions. SB 5.8.7 adds Fajans' rules (covalent character of ionic bonds), which NCERT Std XI does not carry.",
  },
  [`JEE Mains${SEP}Chemical Bonding and Molecular Structure${SEP}Hybridization`]: {
    to: "XI:5.4.4, XI:5.4.5",
    note: "sp3/sp2/sp are here, but sp3d and sp3d2 are NOT taught in Std XI — they appear only in Std XII (Coordination Compounds, p-Block).",
  },
  [`JEE Mains${SEP}Chemical Bonding and Molecular Structure${SEP}Dipole Moment, Polarity and Intermolecular Forces`]: {
    to: "XI:5.6.5, XI:5.7, XI:10.2, XI:10.2.1",
    note: "Dipole moment gets its own section (5.7, 16 mentions); INTERMOLECULAR FORCES are in a different chapter — Ch.10 States of Matter, where hydrogen bonding also lives.",
  },
  [`JEE Mains${SEP}Chemical Bonding and Molecular Structure${SEP}Lewis Acids and Bases`]: {
    to: "3.3",
    status: "partial",
    note: "'Lewis acid' is ZERO in SB Ch.5 Chemical Bonding. The Lewis concept is taught a year later, in Std XII Ch.3 Ionic Equilibria (3.3 Acids and Bases), alongside Bronsted-Lowry.",
  },

  // ---- JEE Mains · Aldehydes, Ketones and Carboxylic Acids (8, 37 PYQ) ----
  [`JEE Mains${SEP}Aldehydes, Ketones and Carboxylic Acids${SEP}Reactions and Products`]: {
    to: "12.8, 12.9",
    note: "20 PYQs. Aldol 18, Cannizzaro 4 — both well covered in SB 12.8.",
  },
  [`JEE Mains${SEP}Aldehydes, Ketones and Carboxylic Acids${SEP}Oxidation, Reduction and Identification Tests`]: {
    to: "12.8",
    note: "Tollens 9, Fehling 11, iodoform 5 — the identification tests are all present.",
  },
  [`JEE Mains${SEP}Aldehydes, Ketones and Carboxylic Acids${SEP}Acidity of Carboxylic Acids`]: {
    to: "12.9",
    note: "SB writes 'acid strength' (8 mentions) rather than 'acidity'.",
  },
  [`JEE Mains${SEP}Aldehydes, Ketones and Carboxylic Acids${SEP}Carboxylic Acid Reactions`]: {
    to: "12.9",
    status: "partial",
    note: "Decarboxylation and the standard reactions are covered, but the HELL-VOLHARD-ZELINSKY (HVZ) reaction is absent from the entire corpus — JEE asks it under carboxylic acid reactions.",
  },
  [`JEE Mains${SEP}Aldehydes, Ketones and Carboxylic Acids${SEP}Preparation of Aldehydes`]: {
    to: "12.4",
    status: "partial",
    note: "Rosenmund and Stephen reactions are both taught, but GATTERMANN-KOCH is absent from the corpus.",
  },
  [`JEE Mains${SEP}Aldehydes, Ketones and Carboxylic Acids${SEP}Preparation of Carbonyl Compounds`]: {
    to: "12.4",
  },
  [`JEE Mains${SEP}Aldehydes, Ketones and Carboxylic Acids${SEP}Reduction Reactions`]: {
    to: "12.8",
    note: "Clemmensen reduction is named (3 mentions).",
  },
  [`JEE Mains${SEP}Aldehydes, Ketones and Carboxylic Acids${SEP}Keto-Enol Tautomerism`]: {
    to: "XI:14.5, XI:14.5.1",
    note: "'tautomer' is ZERO in SB Ch.12 and appears 10 times in Std XI Ch.14 Organic Basics, where it is taught as a type of structural isomerism — a chapter and a year away from the carbonyl chemistry JEE attaches it to.",
  },

  // ---- JEE Mains · Biomolecules (5 subtopics, 32 PYQ) ----
  [`JEE Mains${SEP}Biomolecules${SEP}Carbohydrates`]: {
    to: "14.2",
    note: "glucose 112, fructose 27, sucrose 24.",
  },
  [`JEE Mains${SEP}Biomolecules${SEP}Proteins`]: {
    to: "14.3",
    note: "amino acid 56, peptide 45, denaturation 6.",
  },
  [`JEE Mains${SEP}Biomolecules${SEP}Nucleic Acids`]: {
    to: "14.4",
    note: "DNA 33, RNA 21, nucleotide 34.",
  },
  [`JEE Mains${SEP}Biomolecules${SEP}Enzymes`]: {
    to: "14.3.6",
  },

  // ---- JEE Mains · Equilibrium (4 subtopics, 29 PYQ) ----
  [`JEE Mains${SEP}Equilibrium${SEP}Equilibrium Constant (Kp, Kc) and Degree of Dissociation`]: {
    to: "XI:12.4, XI:12.5, XI:12.6, XI:12.7",
    note: "Kc 105, Kp 31. Taught in Std XI Ch.12 Chemical Equilibrium.",
  },
  [`JEE Mains${SEP}Equilibrium${SEP}Acid-Base Equilibria and Indicators`]: {
    to: "3.3, 3.4, 3.5, 3.6",
    status: "partial",
    note: "Ionisation, autoionization and the pH scale are covered, but ACID-BASE INDICATORS are not: 'indicator' is ZERO in SB Ionic Equilibria and only litmus is named. 9 PYQs.",
  },
  [`JEE Mains${SEP}Equilibrium${SEP}Solubility Product`]: {
    to: "3.9, 3.10",
    note: "Ksp 30, 'solubility product' 14, plus the common ion effect in 3.10.",
  },
  [`JEE Mains${SEP}Equilibrium${SEP}Buffer Solutions and Henderson-Hasselbalch`]: {
    to: "3.8",
  },

  // ---- JEE Mains · Solutions (3 subtopics, 24 PYQ) ----
  [`JEE Mains${SEP}Solutions${SEP}Colligative Properties`]: {
    to: "2.6, 2.7, 2.8, 2.9, 2.10, 2.11",
    note: "17 PYQs, fully covered — one SB section per property, plus van't Hoff factor in 2.11.",
  },
  [`JEE Mains${SEP}Solutions${SEP}Raoult's Law and Vapour Pressure of Solutions`]: {
    to: "2.5",
  },
  [`JEE Mains${SEP}Solutions${SEP}Henry's Law and Solubility of Gases`]: {
    to: "2.4",
  },

  // ---- JEE Mains · Electrochemistry (3 subtopics, 23 PYQ) ----
  [`JEE Mains${SEP}Electrochemistry${SEP}Nernst Equation and Cell EMF`]: {
    to: "5.7, 5.8",
    note: "15 PYQs. Nernst 8 mentions, under electrode potential and the thermodynamics of galvanic cells.",
  },
  [`JEE Mains${SEP}Electrochemistry${SEP}Ionic Conductance`]: {
    to: "5.2, 5.3",
    note: "Molar conductivity 37, Kohlrausch 5.",
  },
  [`JEE Mains${SEP}Electrochemistry${SEP}Faraday's Laws of Electrolysis`]: {
    to: "5.5",
    note: "Covered, though the phrase 'Faraday's law' is not used: electrolysis 32, the constant 96500 17, 'quantity of electricity' explicit. A probe on the law's NAME alone would wrongly report this absent.",
  },

  // ---- JEE Mains · The d- and f-Block Elements (8 subtopics, 40 PYQ) ----
  [`JEE Mains${SEP}The d- and f-Block Elements${SEP}Properties of Transition Elements`]: {
    to: "8.4, 8.5, 8.6, 8.6.1, 8.6.2, 8.6.3, 8.6.6, 8.6.7, 8.6.8, 8.8",
    note: "The heaviest single JEE subtopic in the bank (27 PYQ) and fully covered — oxidation states 27, catalytic 13, interstitial compounds 4, alloys 21, each with its own sub-section.",
  },
  [`JEE Mains${SEP}The d- and f-Block Elements${SEP}Lanthanoids and Actinoids`]: {
    to: "8.10, 8.11, 8.12, 8.12.1, 8.12.2, 8.12.3, 8.12.4, 8.14, 8.15, 8.16",
    note: "Both contractions are named explicitly. SB adds 8.17 Post-actinoid elements, which JEE does not ask.",
  },
  [`JEE Mains${SEP}The d- and f-Block Elements${SEP}Electronic Configuration`]: {
    to: "8.3, 8.3.1",
    note: "SB 8.3.1 treats the chromium and copper anomalies specifically.",
  },
  [`JEE Mains${SEP}The d- and f-Block Elements${SEP}Colour, Magnetic Properties and Spin-Only Formula`]: {
    to: "8.6.4, 8.6.5",
  },
  [`JEE Mains${SEP}The d- and f-Block Elements${SEP}Physical Properties`]: {
    to: "8.5",
  },
  [`JEE Mains${SEP}The d- and f-Block Elements${SEP}Balancing Redox Reactions and Oxidized/Reduced Species`]: {
    to: "8.7.2, 8.7.5, XI:6.3, XI:6.3.1, XI:6.3.2",
    note: "KMnO4 and K2Cr2O7 redox chemistry is in Ch.8; the BALANCING methods themselves are taught a year earlier, in Std XI Ch.6 Redox Reactions.",
  },
  [`JEE Mains${SEP}The d- and f-Block Elements${SEP}Qualitative Analysis and Group Reagents`]: {
    to: "XI:2.2, XI:2.2.1",
    status: "partial",
    note: "'qualitative analysis' is ZERO in SB Ch.8 and appears in Std XI Ch.2, which only DEFINES the term — there is no group-reagent scheme anywhere. Ch.2 is also skipped by the 2026-27 teaching plan.",
  },
  [`JEE Mains${SEP}The d- and f-Block Elements${SEP}Reducing/Oxidizing Agents and Acidic/Basic Oxides`]: {
    to: "8.7.2, 8.7.5, XI:7.5.3",
    status: "partial",
    note: "Oxidising-agent behaviour of KMnO4/K2Cr2O7 is covered, but 'amphoteric' is ZERO in Ch.8 — the acidic/basic/amphoteric classification of oxides sits in Std XI Ch.7 periodic trends, not with the transition elements.",
  },

  // ---- JEE Mains · Structure of Atom (6 subtopics, 33 PYQ) ----
  [`JEE Mains${SEP}Structure of Atom${SEP}Bohr Model`]: {
    to: "XI:4.6, XI:4.6.1, XI:4.6.2, XI:4.6.3, XI:4.6.4, XI:4.6.5",
    note: "16 PYQs, fully covered — postulates, results, line-spectrum explanation, limitations and reasons for failure each have a sub-section.",
  },
  [`JEE Mains${SEP}Structure of Atom${SEP}Atomic Orbitals`]: {
    to: "XI:4.7, XI:4.7.1, XI:4.7.2, XI:4.7.3, XI:4.7.4",
    status: "partial",
    note: "Quantum numbers, shapes and energies are well covered, but 'radial' is ZERO corpus-wide — no radial nodes and no radial distribution curves, which JEE names explicitly ('variation of psi and psi-squared with r'). 10 PYQs, 7 since 2023.",
  },
  [`JEE Mains${SEP}Structure of Atom${SEP}Electromagnetic Radiation and Planck's Quantum Theory`]: {
    to: "XI:4.5, XI:4.5.1",
  },
  [`JEE Mains${SEP}Structure of Atom${SEP}Photoelectric Effect and Planck's Quantum Theory`]: {
    to: "XI:4.5.1",
    note: "SB 4.5.1 covers black-body radiation, the photoelectric effect and Einstein's explanation using Planck's quantum theory.",
  },
  [`JEE Mains${SEP}Structure of Atom${SEP}Hydrogen Spectrum and Rydberg Equation`]: {
    to: "XI:4.5.2, XI:4.6.3",
    note: "Lyman, Balmer and Rydberg are all present. Only the EMISSION spectrum is taught — 'absorption spectrum' and 'continuous spectrum' are zero corpus-wide.",
  },
  [`JEE Mains${SEP}Structure of Atom${SEP}Quantum Mechanical Model, de Broglie, Heisenberg and Quantum Numbers`]: {
    to: "XI:4.6.5, XI:4.7, XI:4.7.1, XI:4.7.2",
    note: "de Broglie and Heisenberg are taught inside 4.6.5 'Reasons for failure of the Bohr model' — invisible on the contents page, so point students there explicitly.",
  },

  // ---- JEE Mains · Classification of Elements and Periodicity (5, 31 PYQ) ----
  [`JEE Mains${SEP}Classification of Elements and Periodicity${SEP}Periodic Properties`]: {
    to: "XI:7.5, XI:7.5.1, XI:7.5.2, XI:7.5.3",
    note: "SB gives effective nuclear charge and screening their own sub-section (7.5.1), which NCERT and JEE both leave implicit.",
  },
  [`JEE Mains${SEP}Classification of Elements and Periodicity${SEP}Ionization Enthalpy`]: {
    to: "XI:7.5.2",
  },
  [`JEE Mains${SEP}Classification of Elements and Periodicity${SEP}Atomic and Ionic Radii`]: {
    to: "XI:7.5.2",
  },
  [`JEE Mains${SEP}Classification of Elements and Periodicity${SEP}Nature of Oxides (Acidic, Basic, Amphoteric, Neutral)`]: {
    to: "XI:7.5.3",
    note: "'amphoteric' appears in SB Ch.7 periodic trends — the classification is taught there rather than with the elements themselves.",
  },
  [`JEE Mains${SEP}Classification of Elements and Periodicity${SEP}Group 14 Elements`]: {
    to: "XI:9.2, XI:9.3, XI:9.4",
    note: "JEE files this under periodicity; the State Board teaches group 14 in Ch.9 Elements of Group 13, 14 and 15.",
  },

  // ---- JEE Mains · Amines (7 subtopics, 42 PYQ) ----
  // SB Ch.13 is granular enough to point at named reactions, so these pointers go
  // to sub-sections rather than whole topics.
  [`JEE Mains${SEP}Amines${SEP}Preparation of Amines`]: {
    to: "13.3, 13.3.1, 13.3.2, 13.3.3, 13.3.4, 13.3.5, 13.3.6",
    status: "partial",
    note: "Six named routes are covered section by section — ammonolysis, nitro reduction, nitrile reduction, amide reduction, Gabriel phthalimide and Hofmann bromamide. REDUCTIVE AMINATION is the one JEE route missing: absent from the entire corpus. 14 PYQs.",
  },
  [`JEE Mains${SEP}Amines${SEP}Diazonium Salts`]: {
    to: "13.7, 13.7.1, 13.7.2",
    status: "partial",
    note: "Diazotisation, Sandmeyer and the coupling reactions (azo dyes) are all covered. GATTERMANN's reaction is absent from the corpus — JEE treats it alongside Sandmeyer. 12 PYQs, the heaviest subtopic in this chapter.",
  },
  [`JEE Mains${SEP}Amines${SEP}Aromatic Amines`]: {
    to: "13.1, 13.6, 13.6.1, 13.6.4, 13.6.5, 13.6.6",
    note: "Aniline appears 61 times; carbylamine test, acylation and reaction with nitrous acid all have their own sub-sections.",
  },
  [`JEE Mains${SEP}Amines${SEP}Aromatic Amines and EAS`]: {
    to: "13.9",
    note: "SB 13.9 is titled 'Electrophilic aromatic substitution in aromatic amines' — a direct match.",
  },
  [`JEE Mains${SEP}Amines${SEP}Basicity of Amines`]: {
    to: "13.5, 13.5.1, 13.5.2",
    note: "Split aliphatic (13.5.1) vs aryl (13.5.2). SB writes 'basic strength' (14) more often than 'basicity' (5).",
  },
  [`JEE Mains${SEP}Amines${SEP}Physical Properties of Amines`]: {
    to: "13.4, 13.4.1",
  },
  [`JEE Mains${SEP}Amines${SEP}Separation of Amines`]: {
    to: "13.8",
    note: "SB 13.8 'Reaction with arenesulfonyl chloride' is the Hinsberg test (5 mentions) — the separation method JEE asks about, filed under the reagent rather than the purpose.",
  },

  // ---- JEE Mains · Hydrocarbons (8 subtopics, 43 PYQ) ----
  // Pointers name SUB-sections rather than 15.2 / 15.3, whose stored top-level
  // titles read "Preparation of alkenes" and "Isomerism in alkynes" — narrower
  // than the sections actually are, so they would misdirect on their own.
  [`JEE Mains${SEP}Hydrocarbons${SEP}Alkanes`]: {
    to: "XI:15.1, XI:15.1.1, XI:15.1.2, XI:15.1.3, XI:15.1.4, XI:15.1.5, XI:15.1.6",
    note: "Conformations 11 mentions, Newman projections 2, halogenation 18, Wurtz 1. Kolbe's electrolysis is not here — it appears in Std XII Ch.11 under phenols.",
  },
  [`JEE Mains${SEP}Hydrocarbons${SEP}Addition Reactions of Alkenes`]: {
    to: "XI:15.2.4",
    note: "Markovnikov 8, hydration 7, hydroboration 2. The PEROXIDE EFFECT is taught but never called that — SB uses 'anti-Markovnikov' and 'Kharasch effect'.",
  },
  [`JEE Mains${SEP}Hydrocarbons${SEP}Ozonolysis of Alkenes`]: {
    to: "XI:15.2.4",
  },
  [`JEE Mains${SEP}Hydrocarbons${SEP}Alkynes`]: {
    to: "XI:15.3, XI:15.3.2, XI:15.3.3, XI:15.3.4, XI:15.3.5",
    note: "Terminal alkynes 10 mentions, acidity covered, polymerization 4.",
  },
  [`JEE Mains${SEP}Hydrocarbons${SEP}Aromaticity`]: {
    to: "XI:15.4.3",
    note: "SB 15.4.3 is titled 'Aromatic character (Huckel Rule)' — Huckel 3, aromaticity 3.",
  },
  [`JEE Mains${SEP}Hydrocarbons${SEP}Reactions of Aromatic Hydrocarbons`]: {
    to: "XI:15.4.6, XI:15.4.7",
    note: "All the electrophilic substitutions are present: nitration, Friedel-Crafts, halogenation and SULFONATION (fuming H2SO4, 373 K). Sulfonation was previously recorded as a gap; that was a probe searching the 'ph' spelling, which the book does not use.",
  },
  [`JEE Mains${SEP}Hydrocarbons${SEP}Stability of Alkenes (Hyperconjugation)`]: {
    to: "XI:14.6.8, XI:15.2.4",
    note: "Hyperconjugation is taught in a DIFFERENT chapter — SB Ch.14 Organic Basics (14.6.8, 13 mentions). It appears just once in Hydrocarbons, so a student looking for alkene stability in Ch.15 alone will not find the explanation.",
  },
  [`JEE Mains${SEP}Hydrocarbons${SEP}Electronic Effects and Reaction Intermediates`]: {
    to: "XI:14.6, XI:14.6.1, XI:14.6.2, XI:14.6.3, XI:14.6.4, XI:14.6.7, XI:14.6.8",
    note: "Not in Hydrocarbons at all: 'carbocation' and 'carbanion' are ZERO in SB Ch.15 and sit in Ch.14 Organic Basics (18 and 5). JEE files these questions under Hydrocarbons; the State Board teaches them one chapter earlier.",
  },

  // ---- JEE Mains · Coordination Compounds (9 subtopics, ~51 PYQ) ----
  // The heaviest JEE chapter in the bank. State Board Ch.9 is unusually well
  // matched to it; the gaps are narrow and specific rather than whole topics.
  [`JEE Mains${SEP}Coordination Compounds${SEP}Colour of Complexes`]: {
    to: "9.9.8",
  },
  [`JEE Mains${SEP}Coordination Compounds${SEP}Crystal Field Theory and d-Orbital Splitting`]: {
    to: "9.9.6, 9.9.7, 9.9.9",
    note: "Well covered — 'crystal field' 13, 'splitting' 16, low spin 10, high spin 8. The spectrochemical series is named only once, so ligand-strength ordering is thinner than JEE's 14 PYQs imply.",
  },
  [`JEE Mains${SEP}Coordination Compounds${SEP}Hybridization and Magnetism`]: {
    to: "9.9.1, 9.9.2, 9.9.3, 9.9.4, 9.9.5, 8.6.4",
    note: "VBT and hybridisation are in SB 9.9.1-9.9.5 ('hybridis/hybridiz' 25). But the SPIN-ONLY MAGNETIC MOMENT is taught in a different chapter — Ch.8 Transition Elements, section 8.6.4 — not in Coordination Compounds.",
  },
  [`JEE Mains${SEP}Coordination Compounds${SEP}Isomerism`]: {
    to: "9.7, 9.7.1, 9.7.2",
    status: "partial",
    note: "Optical (4), linkage (4) and ionization (7) isomerism are covered, and cis/trans appear 22 times each — but the word 'geometrical' is NEVER used, so a student searching that term finds nothing. FACIAL/MERIDIONAL (fac-/mer-) isomerism is genuinely absent, and JEE asks it.",
  },
  [`JEE Mains${SEP}Coordination Compounds${SEP}Ligands and Coordination Number`]: {
    to: "9.2, 9.2.1, 9.2.2, 9.2.3, 9.3.3",
  },
  [`JEE Mains${SEP}Coordination Compounds${SEP}Magnetic Properties`]: {
    to: "9.9.6, 8.6.4",
    note: "Paramagnetic/diamagnetic behaviour follows from crystal-field splitting in SB 9.9.6, but the quantitative spin-only calculation JEE asks for is in Ch.8 Transition Elements (8.6.4), a different chapter. 13 PYQs.",
  },
  [`JEE Mains${SEP}Coordination Compounds${SEP}Metals of Biological Importance`]: {
    to: "9.10",
    status: "partial",
    note: "SB 9.10 Applications names haemoglobin and chlorophyll once each; vitamin B12 is absent from the corpus. Present as examples, not taught as a topic.",
  },
  [`JEE Mains${SEP}Coordination Compounds${SEP}Stability of Complexes`]: {
    to: "9.8, 9.8.1",
    status: "partial",
    note: "SB gives stability its own section (9.8) and lists the governing factors, but 'stability constant' appears once and 'chelate'/'chelating' are ZERO corpus-wide — so the chelate effect, which JEE treats as the headline stability idea, is not taught.",
  },

  [`JEE Mains${SEP}Organic Chemistry - Some Basic Principles and Techniques${SEP}Isomerism`]: {
    to: "XI:14.5, XI:14.5.1, 10.5",
    status: "partial",
    note: "STRUCTURAL isomerism only in Std XI (14.5.1). Stereochemistry is deferred a year: 'enantiomer', 'chiral' and 'racemic' are ZERO in SB Ch.14 and appear in Std XII Ch.10 Halogen Derivatives (10.5 Optical isomerism). A Std XI student meets half this subtopic.",
  },
};

/**
 * Where NCERT covers each JEE subtopic — the same shape as COVERED, but pointing
 * into the NCERT books instead of the State Board ones.
 *
 * Written as `exam: "CBSE Class 12"` rows, exactly parallel to how the State
 * Board rulings are stored: on an exam-spine concept the exam column names WHICH
 * SYLLABUS is being asked about, so one JEE row can carry both answers.
 *
 * The point of this column is the comparison. The 2023-24 rationalisation removed
 * NINE chapters that JEE still asks — p-Block, s-Block, Solid State, Surface
 * Chemistry, Polymers, Hydrogen, Environmental Chemistry, metallurgy — worth ~105
 * PYQ, and for most of them the STATE BOARD still teaches the material. On that
 * content a State Board student is better served than an NCERT one, which is the
 * opposite of what students assume.
 */
const CUT_BY_RATIONALISATION =
  "Removed from NCERT by the 2023-24 rationalisation — there is no such chapter in either Std XI or Std XII. JEE still asks it.";

const COVERED_NCERT: Record<string, Covered> = {
  // ---- Chapters NCERT no longer has at all ----
  ...Object.fromEntries(
    [
      ["The p-Block Elements", ["Allotropes of Carbon", "Boron Family",
        "Group 14 Elements (Compounds of Tin and Lead)", "Group 15 Elements",
        "Group 16 Elements", "Group 17 Elements",
        "Industrial Preparation of Compounds", "Oxoacids of Phosphorus"]],
      ["The s-Block Elements", ["Group 1 Elements", "Group 2 Elements",
        "Solvay Process", "Qualitative Analysis of Salts", "Flame Colouration"]],
      ["Hydrogen", ["Hydrogen Peroxide", "Preparation of Dihydrogen",
        "Properties of Hydrogen", "Water and Hardness"]],
      ["Surface Chemistry", ["Adsorption", "Colloids"]],
      ["Polymers", ["Types of Polymers", "Classification of Polymers", "Synthetic Rubber"]],
      ["Solid State", ["Classification of Solids", "Crystal Defects", "Voids and Formula"]],
      ["Environmental Chemistry", ["Atmospheric Pollution", "Water Pollution", "Green Chemistry"]],
      ["General Principles and Processes of Isolation of Elements",
        ["Refining of Metals", "Thermodynamics of Metallurgy", "Ores and Minerals", "Alloys",
         "Extraction of Aluminium", "Ellingham Diagram", "Roasting and Calcination",
         "Concentration of Ores"]],
    ].flatMap(([chapter, subs]) =>
      (subs as string[]).map((s) => [
        `JEE Mains${SEP}${chapter as string}${SEP}${s}`,
        { to: "", status: "not", note: CUT_BY_RATIONALISATION } as Covered,
      ]),
    ),
  ),

  // ---- Some Basic Concepts of Chemistry ----
  [`JEE Mains${SEP}Some Basic Concepts of Chemistry${SEP}Mole Concept and Stoichiometry`]: {
    to: "XI:1.8, XI:1.10",
  },
  [`JEE Mains${SEP}Some Basic Concepts of Chemistry${SEP}Empirical and Molecular Formula`]: {
    to: "XI:1.9",
  },
  [`JEE Mains${SEP}Some Basic Concepts of Chemistry${SEP}Balancing Redox Reactions and Oxidized/Reduced Species`]: {
    to: "XI:7.3",
  },

  // ---- Structure of Atom ----
  [`JEE Mains${SEP}Structure of Atom${SEP}Bohr Model`]: { to: "XI:2.4" },
  [`JEE Mains${SEP}Structure of Atom${SEP}Atomic Orbitals`]: { to: "XI:2.6" },
  [`JEE Mains${SEP}Structure of Atom${SEP}Electromagnetic Radiation and Planck's Quantum Theory`]: { to: "XI:2.3" },
  [`JEE Mains${SEP}Structure of Atom${SEP}Photoelectric Effect and Planck's Quantum Theory`]: { to: "XI:2.3" },
  [`JEE Mains${SEP}Structure of Atom${SEP}Hydrogen Spectrum and Rydberg Equation`]: { to: "XI:2.3, XI:2.4" },
  [`JEE Mains${SEP}Structure of Atom${SEP}Quantum Mechanical Model, de Broglie, Heisenberg and Quantum Numbers`]: { to: "XI:2.5, XI:2.6" },

  // ---- Classification of Elements and Periodicity ----
  [`JEE Mains${SEP}Classification of Elements and Periodicity${SEP}Periodic Properties`]: { to: "XI:3.7" },
  [`JEE Mains${SEP}Classification of Elements and Periodicity${SEP}Ionization Enthalpy`]: { to: "XI:3.7" },
  [`JEE Mains${SEP}Classification of Elements and Periodicity${SEP}Atomic and Ionic Radii`]: { to: "XI:3.7" },
  [`JEE Mains${SEP}Classification of Elements and Periodicity${SEP}Nature of Oxides (Acidic, Basic, Amphoteric, Neutral)`]: { to: "XI:3.7" },
  [`JEE Mains${SEP}Classification of Elements and Periodicity${SEP}Group 14 Elements`]: {
    to: "XI:3.6",
    status: "partial",
    note: "Only as a BLOCK in the periodicity chapter — NCERT no longer has a p-Block chapter, so group 14 chemistry itself is gone.",
  },

  // ---- Chemical Bonding and Molecular Structure ----
  [`JEE Mains${SEP}Chemical Bonding and Molecular Structure${SEP}Molecular Geometry`]: { to: "XI:4.4" },
  [`JEE Mains${SEP}Chemical Bonding and Molecular Structure${SEP}VSEPR Theory`]: { to: "XI:4.4" },
  [`JEE Mains${SEP}Chemical Bonding and Molecular Structure${SEP}Bond Parameters (Bond Length, Bond Angle, Bond Order)`]: { to: "XI:4.3" },
  [`JEE Mains${SEP}Chemical Bonding and Molecular Structure${SEP}Molecular Orbital Theory`]: { to: "XI:4.7, XI:4.8" },
  [`JEE Mains${SEP}Chemical Bonding and Molecular Structure${SEP}Formal Charge and Lewis Structures`]: { to: "XI:4.1" },
  [`JEE Mains${SEP}Chemical Bonding and Molecular Structure${SEP}Ionic Bonding and Lattice Energy`]: { to: "XI:4.2" },
  [`JEE Mains${SEP}Chemical Bonding and Molecular Structure${SEP}Hybridization`]: { to: "XI:4.6" },
  [`JEE Mains${SEP}Chemical Bonding and Molecular Structure${SEP}Dipole Moment, Polarity and Intermolecular Forces`]: { to: "XI:4.3, XI:4.9" },
  [`JEE Mains${SEP}Chemical Bonding and Molecular Structure${SEP}Lewis Acids and Bases`]: {
    to: "XI:6.10",
    note: "In the Equilibrium chapter (acids, bases and salts), not the bonding chapter — the same displacement the State Board has.",
  },

  // ---- Chemical Thermodynamics ----
  ...Object.fromEntries(
    ["First Law of Thermodynamics, Internal Energy and Work", "First Law and Work of Expansion",
     "Work in Thermodynamic Processes (First Law)"].map((s) => [
      `JEE Mains${SEP}Chemical Thermodynamics${SEP}${s}`, { to: "XI:5.1, XI:5.2" } as Covered]),
  ),
  [`JEE Mains${SEP}Chemical Thermodynamics${SEP}Enthalpy Changes, Hess's Law and Bond Enthalpy`]: { to: "XI:5.4, XI:5.5" },
  [`JEE Mains${SEP}Chemical Thermodynamics${SEP}Entropy and Spontaneity`]: { to: "XI:5.6" },
  [`JEE Mains${SEP}Chemical Thermodynamics${SEP}Gibbs Free Energy`]: { to: "XI:5.6, XI:5.7" },
  [`JEE Mains${SEP}Chemical Thermodynamics${SEP}Heat Capacity and Calorimetry`]: {
    to: "XI:5.2, XI:5.3",
    note: "NCERT 5.3 is a full section on calorimetry — the topic the State Board omits entirely. This is one of the few places NCERT covers something the State Board does not.",
  },

  // ---- Equilibrium ----
  [`JEE Mains${SEP}Equilibrium${SEP}Equilibrium Constant (Kp, Kc) and Degree of Dissociation`]: { to: "XI:6.3, XI:6.4, XI:6.5, XI:6.6" },
  [`JEE Mains${SEP}Equilibrium${SEP}Acid-Base Equilibria and Indicators`]: { to: "XI:6.10, XI:6.11" },
  [`JEE Mains${SEP}Equilibrium${SEP}Solubility Product`]: { to: "XI:6.13" },
  [`JEE Mains${SEP}Equilibrium${SEP}Buffer Solutions and Henderson-Hasselbalch`]: { to: "XI:6.12" },

  // ---- Organic Chemistry - Some Basic Principles and Techniques ----
  [`JEE Mains${SEP}Organic Chemistry - Some Basic Principles and Techniques${SEP}Purification and Chromatography`]: { to: "XI:8.8" },
  [`JEE Mains${SEP}Organic Chemistry - Some Basic Principles and Techniques${SEP}Estimation of Elements`]: {
    to: "XI:8.10",
    note: "NCERT 8.10 Quantitative Analysis covers Kjeldahl and Carius in full — the single largest thing the State Board omits and NCERT keeps. 15 PYQs.",
  },
  [`JEE Mains${SEP}Organic Chemistry - Some Basic Principles and Techniques${SEP}Detection of Elements`]: {
    to: "XI:8.9",
    note: "NCERT 8.9 Qualitative Analysis (Lassaigne's test) — again present in NCERT, absent from the State Board.",
  },
  [`JEE Mains${SEP}Organic Chemistry - Some Basic Principles and Techniques${SEP}Isomerism`]: { to: "XI:8.6" },
  [`JEE Mains${SEP}Organic Chemistry - Some Basic Principles and Techniques${SEP}IUPAC Nomenclature, Functional Groups and Homologous Series`]: { to: "XI:8.4, XI:8.5" },
  [`JEE Mains${SEP}Organic Chemistry - Some Basic Principles and Techniques${SEP}Resonance and Stability of Resonance Structures`]: { to: "XI:8.7" },
  [`JEE Mains${SEP}Organic Chemistry - Some Basic Principles and Techniques${SEP}Electronic Effects and Reaction Intermediates`]: { to: "XI:8.7" },
  [`JEE Mains${SEP}Organic Chemistry - Some Basic Principles and Techniques${SEP}Electronic Effects, Hybridization, Intermediates and General Reactions`]: { to: "XI:8.7, XI:4.6" },

  // ---- Hydrocarbons ----
  [`JEE Mains${SEP}Hydrocarbons${SEP}Alkanes`]: { to: "XI:9.2" },
  [`JEE Mains${SEP}Hydrocarbons${SEP}Addition Reactions of Alkenes`]: { to: "XI:9.3" },
  [`JEE Mains${SEP}Hydrocarbons${SEP}Ozonolysis of Alkenes`]: { to: "XI:9.3" },
  [`JEE Mains${SEP}Hydrocarbons${SEP}Alkynes`]: { to: "XI:9.4" },
  [`JEE Mains${SEP}Hydrocarbons${SEP}Aromaticity`]: { to: "XI:9.5" },
  [`JEE Mains${SEP}Hydrocarbons${SEP}Reactions of Aromatic Hydrocarbons`]: { to: "XI:9.5" },
  [`JEE Mains${SEP}Hydrocarbons${SEP}Stability of Alkenes (Hyperconjugation)`]: { to: "XI:8.7, XI:9.3" },
  [`JEE Mains${SEP}Hydrocarbons${SEP}Electronic Effects and Reaction Intermediates`]: { to: "XI:8.7" },

  // ---- Solutions ----
  [`JEE Mains${SEP}Solutions${SEP}Colligative Properties`]: { to: "1.6, 1.7" },
  [`JEE Mains${SEP}Solutions${SEP}Raoult's Law and Vapour Pressure of Solutions`]: { to: "1.4, 1.5" },
  [`JEE Mains${SEP}Solutions${SEP}Henry's Law and Solubility of Gases`]: { to: "1.3" },

  // ---- Electrochemistry ----
  [`JEE Mains${SEP}Electrochemistry${SEP}Nernst Equation and Cell EMF`]: { to: "2.2, 2.3" },
  [`JEE Mains${SEP}Electrochemistry${SEP}Ionic Conductance`]: { to: "2.4" },
  [`JEE Mains${SEP}Electrochemistry${SEP}Faraday's Laws of Electrolysis`]: { to: "2.5" },

  // ---- Chemical Kinetics ----
  ...Object.fromEntries(
    ["First Order Reactions", "Order of Reaction and Half-Life",
     "Rate of Reaction and Rate Expressions (stoichiometric rate relations)",
     "Rate of Reaction, Stoichiometry and Average Rate",
     "Reaction Mechanism, Intermediates and Rate-Determining Step"].map((s) => [
      `JEE Mains${SEP}Chemical Kinetics${SEP}${s}`, { to: "3.1, 3.2, 3.3" } as Covered]),
  ),
  ...Object.fromEntries(
    ["Arrhenius Equation and Activation Energy", "Arrhenius Equation and Temperature Dependence",
     "Temperature Dependence, Arrhenius and Collision Theory"].map((s) => [
      `JEE Mains${SEP}Chemical Kinetics${SEP}${s}`, { to: "3.4, 3.5" } as Covered]),
  ),

  // ---- The d- and f-Block Elements ----
  [`JEE Mains${SEP}The d- and f-Block Elements${SEP}Properties of Transition Elements`]: { to: "4.3" },
  [`JEE Mains${SEP}The d- and f-Block Elements${SEP}Lanthanoids and Actinoids`]: { to: "4.5, 4.6" },
  [`JEE Mains${SEP}The d- and f-Block Elements${SEP}Electronic Configuration`]: { to: "4.2" },
  [`JEE Mains${SEP}The d- and f-Block Elements${SEP}Colour, Magnetic Properties and Spin-Only Formula`]: { to: "4.3" },
  [`JEE Mains${SEP}The d- and f-Block Elements${SEP}Physical Properties`]: { to: "4.3" },
  [`JEE Mains${SEP}The d- and f-Block Elements${SEP}Balancing Redox Reactions and Oxidized/Reduced Species`]: { to: "4.4, XI:7.3" },
  [`JEE Mains${SEP}The d- and f-Block Elements${SEP}Reducing/Oxidizing Agents and Acidic/Basic Oxides`]: { to: "4.3, 4.4" },
  [`JEE Mains${SEP}The d- and f-Block Elements${SEP}Qualitative Analysis and Group Reagents`]: {
    to: "",
    status: "not",
    note: "NCERT has no salt-analysis or group-reagent scheme either — it was part of the practical syllabus, not the theory chapters. Neither book covers it.",
  },

  // ---- Coordination Compounds ----
  [`JEE Mains${SEP}Coordination Compounds${SEP}Crystal Field Theory and d-Orbital Splitting`]: { to: "5.5" },
  [`JEE Mains${SEP}Coordination Compounds${SEP}Magnetic Properties`]: { to: "5.5" },
  [`JEE Mains${SEP}Coordination Compounds${SEP}Hybridization and Magnetism`]: { to: "5.5" },
  [`JEE Mains${SEP}Coordination Compounds${SEP}Isomerism`]: { to: "5.4" },
  [`JEE Mains${SEP}Coordination Compounds${SEP}Ligands and Coordination Number`]: { to: "5.2" },
  [`JEE Mains${SEP}Coordination Compounds${SEP}Colour of Complexes`]: { to: "5.5" },
  [`JEE Mains${SEP}Coordination Compounds${SEP}Stability of Complexes`]: { to: "5.2" },
  [`JEE Mains${SEP}Coordination Compounds${SEP}Metals of Biological Importance`]: { to: "5.7" },
  [`JEE Mains${SEP}Coordination Compounds${SEP}Metal Carbonyls and Synergic Bonding`]: {
    to: "5.6",
    note: "NCERT 5.6 'Bonding in Metal Carbonyls' covers synergic bonding — present in NCERT, absent from the State Board.",
  },

  // ---- Haloalkanes and Haloarenes ----
  [`JEE Mains${SEP}Haloalkanes and Haloarenes${SEP}Nucleophilic Substitution`]: { to: "6.7" },
  [`JEE Mains${SEP}Haloalkanes and Haloarenes${SEP}Classification, Nomenclature and Physical Properties`]: { to: "6.1, 6.2, 6.6" },
  [`JEE Mains${SEP}Haloalkanes and Haloarenes${SEP}Preparation of Alkyl Halides`]: { to: "6.4, 6.5" },
  [`JEE Mains${SEP}Haloalkanes and Haloarenes${SEP}Structure and Bonding in Haloarenes`]: { to: "6.3" },

  // ---- Alcohols, Phenols and Ethers ----
  [`JEE Mains${SEP}Alcohols, Phenols and Ethers${SEP}Phenols`]: { to: "7.4" },
  [`JEE Mains${SEP}Alcohols, Phenols and Ethers${SEP}Ethers`]: { to: "7.6" },
  [`JEE Mains${SEP}Alcohols, Phenols and Ethers${SEP}Chemical Reactions of Alcohols and Acidity`]: { to: "7.4" },
  [`JEE Mains${SEP}Alcohols, Phenols and Ethers${SEP}Classification of Alcohols and Phenols`]: { to: "7.1, 7.2, 7.3" },

  // ---- Aldehydes, Ketones and Carboxylic Acids ----
  [`JEE Mains${SEP}Aldehydes, Ketones and Carboxylic Acids${SEP}Reactions and Products`]: { to: "8.4, 8.9" },
  [`JEE Mains${SEP}Aldehydes, Ketones and Carboxylic Acids${SEP}Oxidation, Reduction and Identification Tests`]: { to: "8.4" },
  [`JEE Mains${SEP}Aldehydes, Ketones and Carboxylic Acids${SEP}Acidity of Carboxylic Acids`]: { to: "8.9" },
  [`JEE Mains${SEP}Aldehydes, Ketones and Carboxylic Acids${SEP}Carboxylic Acid Reactions`]: { to: "8.9" },
  [`JEE Mains${SEP}Aldehydes, Ketones and Carboxylic Acids${SEP}Preparation of Aldehydes`]: { to: "8.2" },
  [`JEE Mains${SEP}Aldehydes, Ketones and Carboxylic Acids${SEP}Preparation of Carbonyl Compounds`]: { to: "8.2" },
  [`JEE Mains${SEP}Aldehydes, Ketones and Carboxylic Acids${SEP}Reduction Reactions`]: { to: "8.4" },
  [`JEE Mains${SEP}Aldehydes, Ketones and Carboxylic Acids${SEP}Keto-Enol Tautomerism`]: { to: "XI:8.6, 8.4" },

  // ---- Amines ----
  [`JEE Mains${SEP}Amines${SEP}Preparation of Amines`]: { to: "9.4" },
  [`JEE Mains${SEP}Amines${SEP}Diazonium Salts`]: { to: "9.7, 9.9" },
  [`JEE Mains${SEP}Amines${SEP}Aromatic Amines`]: { to: "9.1, 9.6" },
  [`JEE Mains${SEP}Amines${SEP}Aromatic Amines and EAS`]: { to: "9.6" },
  [`JEE Mains${SEP}Amines${SEP}Basicity of Amines`]: { to: "9.6" },
  [`JEE Mains${SEP}Amines${SEP}Physical Properties of Amines`]: { to: "9.5" },
  [`JEE Mains${SEP}Amines${SEP}Separation of Amines`]: { to: "9.6" },

  // ---- Biomolecules ----
  [`JEE Mains${SEP}Biomolecules${SEP}Carbohydrates`]: { to: "10.1" },
  [`JEE Mains${SEP}Biomolecules${SEP}Proteins`]: { to: "10.2" },
  [`JEE Mains${SEP}Biomolecules${SEP}Nucleic Acids`]: { to: "10.5" },
  [`JEE Mains${SEP}Biomolecules${SEP}Enzymes`]: { to: "10.3" },
  [`JEE Mains${SEP}Biomolecules${SEP}Vitamins`]: {
    to: "10.4",
    note: "NCERT 10.4 Vitamins is a full section — present in NCERT, absent from the State Board Biomolecules chapter.",
  },

  // ---- Chemistry in Everyday Life ----
  ...Object.fromEntries(
    ["Drugs and their Classification", "Applications of Compounds"].map((s) => [
      `JEE Mains${SEP}Chemistry in Everyday Life${SEP}${s}`,
      { to: "", status: "not", note: CUT_BY_RATIONALISATION } as Covered]),
  ),

  // ---- Organic Reaction Mechanisms (bank artefact) ----
  ...Object.fromEntries(
    ["Reaction Products", "Named Reactions", "Oxidation, Reduction and Identification Tests"].map((s) => [
      `JEE Mains${SEP}Organic Reaction Mechanisms${SEP}${s}`,
      {
        to: "",
        note: "Catch-all bank subtopic spanning every organic chapter, so it maps to no single NCERT section. The chemistry is in NCERT Std XII Ch.6-9.",
      } as Covered]),
  ),
};

const ADJUDICATED: Record<string, Ruling> = {
  [`JEE Mains${SEP}Organic Chemistry - Some Basic Principles and Techniques${SEP}Estimation of Elements`]: [
    "not",
    "Kjeldahl and Carius are absent from the ENTIRE State Board corpus. JEE Unit 13 requires quantitative estimation of C, H, N, halogens, S and P; State Board Ch.3 teaches purification only (crystallisation, distillation, chromatography) and never elemental analysis. 15 PYQs, 13 since 2023 — the largest live JEE gap.",
  ],
  [`JEE Mains${SEP}Organic Chemistry - Some Basic Principles and Techniques${SEP}Detection of Elements`]: [
    "not",
    "Lassaigne's test is absent from the entire State Board corpus. This is the other half of JEE Unit 13 (qualitative detection of N, S, P, halogens). 3 PYQs. Together with Estimation of Elements it forms Unit 13's analysis block, which the State Board books do not cover at all.",
  ],
  [`JEE Mains${SEP}Biomolecules${SEP}Vitamins`]: [
    "not",
    "The State Board Std XII Biomolecules chapter contains the word 'vitamin' ZERO times — no thiamine, riboflavin, pyridoxine or ascorbic acid, and no deficiency diseases. 4 PYQs, two in 2026. Independently confirmed from the NCERT spine, whose 10.4 Vitamins section maps to the same empty chapter.",
  ],
  [`JEE Mains${SEP}Coordination Compounds${SEP}Metal Carbonyls and Synergic Bonding`]: [
    "not",
    "State Board Coordination Compounds has no synergic bonding and no metal carbonyls ('carbonyl' appears once, as an organic functional group). JEE 2026 asked it directly.",
  ],
  // Atomic Orbitals moved to COVERED, which carries the pointer and the verdict.
  // Oxoacids of Phosphorus moved to COVERED, which now carries the pointer AND
  // the verdict; its note merges this entry's currency finding.
  // Metallurgy: genuinely uncovered by the State Board, recorded as such rather
  // than waved away — but flagged not-actionable, since JEE dropped the chapter.
  ...Object.fromEntries(
    [
      "Refining of Metals",
      "Thermodynamics of Metallurgy",
      "Ores and Minerals",
      "Alloys",
      "Extraction of Aluminium",
      "Ellingham Diagram",
      "Roasting and Calcination",
      "Concentration of Ores",
    ].map((s) => [
      `JEE Mains${SEP}General Principles and Processes of Isolation of Elements${SEP}${s}`,
      ["not", METALLURGY_NOTE] as Ruling,
    ]),
  ),
};

async function main() {
  const apply = process.argv.includes("--apply");
  loadEnv();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("service-role env required");
  const db = createClient(url, key, { auth: { persistSession: false } });

  type Row = { exam: string; chapter: string; subtopic: string; n: number };
  const counts = new Map<string, Row>();
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("questions")
      .select("exams!inner(name),subjects!inner(name),chapters!inner(name),subtopics!inner(name)")
      .eq("visibility", "PUBLIC")
      .eq("question_kind", "pyq")
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    const batch = (data ?? []) as unknown as Record<string, { name: string }>[];
    for (const r of batch) {
      const subject = (r as never as { subjects: { name: string } }).subjects?.name ?? "";
      const exam = (r as never as { exams: { name: string } }).exams?.name ?? "";
      if (!/chem/i.test(subject) || !(EXAMS as readonly string[]).includes(exam)) continue;
      const chapter = (r as never as { chapters: { name: string } }).chapters.name;
      const subtopic = (r as never as { subtopics: { name: string } }).subtopics.name;
      const k = [exam, chapter, subtopic].join("|");
      const hit = counts.get(k);
      if (hit) hit.n += 1;
      else counts.set(k, { exam, chapter, subtopic, n: 1 });
    }
    if (batch.length < 1000) break;
  }

  const rows = [...counts.values()].sort(
    (a, b) =>
      a.exam.localeCompare(b.exam) ||
      a.chapter.localeCompare(b.chapter) ||
      a.subtopic.localeCompare(b.subtopic),
  );

  // Key includes the CHAPTER. Five subtopic names repeat across chapters —
  // "Isomerism" is both a Coordination Compounds and an Organic Basics subtopic,
  // "Electronic Effects and Reaction Intermediates" is both Hydrocarbons and
  // Organic Basics — so an exam+subtopic key silently applies one chapter's
  // ruling to another chapter's row.
  const keyOf = (r: Row) => `${r.exam}${SEP}${r.chapter}${SEP}${r.subtopic}`;
  const rulingFor = (r: Row): Ruling | undefined => ADJUDICATED[keyOf(r)];

  // A ruling naming a subtopic that no longer exists would silently do nothing.
  const known = new Set(rows.map(keyOf));
  const orphans = [
    ...Object.keys(ADJUDICATED),
    ...Object.keys(COVERED),
    ...Object.keys(COVERED_NCERT),
  ].filter((k) => !known.has(k));
  if (orphans.length) {
    console.error(`\nREFUSING TO WRITE — ${orphans.length} ruling(s) name no live subtopic:`);
    for (const o of orphans) console.error("  " + o);
    process.exitCode = 1;
    return;
  }

  const tally = new Map<string, { full: number; partial: number; not: number }>();
  for (const e of EXAMS) tally.set(e, { full: 0, partial: 0, not: 0 });
  // COVERED overrides ADJUDICATED for status, so the tally must consult it too —
  // otherwise the headline counts disagree with what is actually written.
  const statusFor = (r: Row) =>
    COVERED[keyOf(r)]?.status ?? rulingFor(r)?.[0] ?? "full";
  for (const r of rows) tally.get(r.exam)![statusFor(r)] += 1;

  console.log("\nExam spine — does the State Board cover what each exam asks?\n");
  console.log("  exam            subtopics   covered   partly   NOT covered");
  for (const e of EXAMS) {
    const t = tally.get(e)!;
    const n = rows.filter((r) => r.exam === e).length;
    console.log(
      `  ${e.padEnd(14)} ${String(n).padStart(9)} ${String(t.full).padStart(9)} ${String(t.partial).padStart(8)} ${String(t.not).padStart(13)}`,
    );
  }

  // Validate covered_by BEFORE the dry-run exit. Checking refs only on --apply
  // defeats the purpose of having a dry run: the mistake it exists to catch is a
  // ref naming a section that does not exist, and that must surface while the
  // mapping is being written, not after it ships.
  const liveSectionsOf = async (source: string) => {
    const { data, error } = await db
      .from("syllabus_concepts")
      .select("class,section_no")
      .eq("source", source);
    if (error) throw new Error(`${source} sections: ${error.message}`);
    return new Set((data ?? []).map((x) => `${x.class}|${x.section_no}`));
  };
  const checkRefs = (map: Record<string, Covered>, live: Set<string>, label: string) => {
    const bad: string[] = [];
    for (const [k, v] of Object.entries(map)) {
      for (const raw of v.to.split(",").map((x) => x.trim()).filter(Boolean)) {
        const m = raw.match(/^(XI|XII):(.+)$/);
        const cls = m ? (m[1] === "XII" ? "12" : "11") : "12";
        const no = m ? m[2].trim() : raw;
        if (!live.has(`${cls}|${no}`)) bad.push(`${k} -> ${label} Std${cls} ${no}`);
      }
    }
    return bad;
  };
  const badPre = [
    ...checkRefs(COVERED, await liveSectionsOf("MH State Board"), "SB"),
    ...checkRefs(COVERED_NCERT, await liveSectionsOf("NCERT"), "NCERT"),
  ];
  if (badPre.length) {
    console.error(`\nREFUSING TO WRITE — ${badPre.length} covered_by ref(s) name no such section:`);
    for (const b of badPre) console.error("  " + b);
    process.exitCode = 1;
    return;
  }
  console.log(
    `\ncovered_by: ${Object.keys(COVERED).length} State Board + ${Object.keys(COVERED_NCERT).length} NCERT mapping(s), all refs resolve.`,
  );

  if (!apply) {
    console.log("\nDRY RUN — nothing written. Re-run with --apply.");
    return;
  }

  const concepts = rows.map((r, i) => ({
    class: 12, // the spine is exam-level, not class-level; 12 satisfies the CHECK
    subject: "Chemistry",
    source: `${r.exam} bank taxonomy`,
    chapter_no: 1 + rows.filter((x) => x.exam === r.exam).findIndex((x) => x.chapter === r.chapter),
    chapter_name: r.chapter,
    section_no: `${r.exam.slice(0, 3).toUpperCase()}-${String(i + 1).padStart(3, "0")}`,
    concept: `${r.subtopic} (${r.n} PYQ)`,
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
    .select("id,source,section_no")
    .in("source", EXAMS.map((e) => `${e} bank taxonomy`));
  if (backErr) throw new Error(backErr.message);
  const idBy = new Map((back ?? []).map((r) => [`${r.source}|${r.section_no}`, r.id]));

  const links = rows
    .map((r, i) => {
      const key = keyOf(r);
      const adj = rulingFor(r);
      const cov = COVERED[key];
      const sec = `${r.exam.slice(0, 3).toUpperCase()}-${String(i + 1).padStart(3, "0")}`;
      const id = idBy.get(`${r.exam} bank taxonomy|${sec}`);
      return id
        ? {
            concept_id: id,
            exam: "MH State Board",
            // COVERED wins so a mapped row has ONE source of truth for its verdict.
            status: cov?.status ?? (adj ? adj[0] : "full"),
            note: cov?.note ?? (adj ? adj[1] : null),
            covered_by: cov?.to.trim() || null,
          }
        : null;
    })
    .filter(Boolean) as {
    concept_id: string;
    exam: string;
    status: string;
    note: string | null;
    covered_by: string | null;
  }[];

  // Second ruling per concept: the same question asked of NCERT. Stored as its own
  // exam row, so one JEE subtopic carries both answers and the page can show
  // "NCERT teaches it here / State Board there / neither".
  for (const [i, r] of rows.entries()) {
    const cov = COVERED_NCERT[keyOf(r)];
    if (!cov) continue;
    const sec = `${r.exam.slice(0, 3).toUpperCase()}-${String(i + 1).padStart(3, "0")}`;
    const id = idBy.get(`${r.exam} bank taxonomy|${sec}`);
    if (!id) continue;
    links.push({
      concept_id: id,
      exam: "CBSE Class 12",
      status: cov.status ?? "full",
      note: cov.note ?? null,
      covered_by: cov.to.trim() || null,
    });
  }

  // Every covered_by ref must name a State Board section that EXISTS. A typo here
  // does not look wrong — it just sends a student to a page that is not in the
  // book, which is the worst failure this table has.
  // (Ref validation runs earlier, BEFORE the dry-run exit, so a bad reference is
  // caught while the mapping is being written rather than only on --apply.)

  // 0065 CHECKs note length at 500 and the upsert is chunked, so a violation
  // partway through would leave a half-applied ruling. Validate before writing.
  const tooLong = links.filter((l) => (l.note?.length ?? 0) > 500);
  if (tooLong.length) throw new Error(`${tooLong.length} note(s) over 500 chars — fix before writing`);

  for (let i = 0; i < links.length; i += 200) {
    const { error } = await db
      .from("syllabus_concept_exams")
      .upsert(links.slice(i, i + 200), { onConflict: "concept_id,exam" });
    if (error) throw new Error(`links: ${error.message}`);
  }
  console.log(`\nDone. ${concepts.length} exam-spine concepts, ${links.length} coverage rulings.`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
