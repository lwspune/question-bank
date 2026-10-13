/**
 * Playbook catalog for /guide/mht-cet-chemistry/playbooks.
 *
 * One playbook = one chapter. WHY 22 AND NOT 30: playbooks ship for every
 * chapter at >= 0.9 q/paper on RECENT weightage (2025-2026, 39 papers). The
 * eight below the line are in the tail block on /strategy.
 *
 * `subtopics` is DERIVED from the strategy strand's drill lists (every strand
 * chapter lists all of its subtopics), so the two cannot disagree;
 * tests/guide-mht-cet-chemistry-playbooks.test.ts checks them against the live
 * taxonomy both ways. Slugs equal the /notes/mht-cet-chemistry chapter slugs.
 *
 * `bucket` is the execution-mode strand: calculate 8 (20.2 q/paper) ·
 * reactions 5 (11.2) · recall 9 (14.2).
 */

import { STRATEGY_STRANDS, type StrandId } from "./strategy";

export type PlaybookBucket = StrandId;

export type Playbook = {
  slug: string;
  name: string;
  summary: string;
  chapter: string;
  subtopics: string[];
  qCount: number;
  qPerPaper: number;
  pctHard: number;
  bucket: PlaybookBucket;
};

type Entry = Omit<Playbook, "subtopics" | "qCount" | "pctHard" | "bucket">;

const ENTRIES: Entry[] = [
  // Calculate
  { slug: "chemical-kinetics", name: "Chemical Kinetics", chapter: "Chemical Kinetics", qPerPaper: 3.05,
    summary: "205 q - 3.05/paper - 3% HARD. Three pages, 167 questions, no HARD: rates, rate laws and first-order half-life." },
  { slug: "ionic-equilibria", name: "Ionic Equilibria", chapter: "Ionic Equilibria", qPerPaper: 3.03,
    summary: "201 q - 3.03/paper - 3% HARD. Log arithmetic (pH, α, buffers, Ksp) with two recall pages to take first." },
  { slug: "chemical-thermodynamics", name: "Chemical Thermodynamics", chapter: "Chemical Thermodynamics and Energetics", qPerPaper: 3.0,
    summary: "199 q - 3.00/paper - 3% HARD. The first-law page is 76 questions of signs and 100 J per dm³ bar." },
  { slug: "solutions", name: "Solutions and Colligative Properties", chapter: "Solutions and Colligative Properties", qPerPaper: 2.97,
    summary: "208 q - 2.97/paper - 3% HARD. The largest Chemistry chapter; four of six pages are one idea: a colligative property counts dissolved particles." },
  { slug: "solid-state", name: "Solid State", chapter: "Solid State", qPerPaper: 2.92,
    summary: "205 q - 2.92/paper - 6% HARD. ρ = zM/(a³N_A) solved for a different unknown each time; the density and packing pages hold the HARD." },
  { slug: "electrochemistry", name: "Electrochemistry", chapter: "Electrochemistry", qPerPaper: 2.9,
    summary: "197 q - 2.90/paper - 7% HARD. The most HARD questions of any Chemistry chapter: ten Nernst questions on one page." },
  { slug: "some-basic-concepts", name: "Some Basic Concepts of Chemistry", chapter: "Some Basic Concepts of Chemistry", qPerPaper: 1.26,
    summary: "80 q - 1.26/paper - 1% HARD. Mole arithmetic that every Calculate chapter reuses." },
  { slug: "structure-of-atom", name: "Structure of Atom", chapter: "Structure of Atom", qPerPaper: 1.08,
    summary: "99 q - 1.08/paper - 1% HARD, halved since 2025. Bohr scaling, E = hc/λ and quantum numbers." },
  // Reactions
  { slug: "alcohols-phenols-and-ethers", name: "Alcohols, Phenols and Ethers", chapter: "Alcohols, Phenols and Ethers", qPerPaper: 2.92,
    summary: "198 q - 2.92/paper - 5% HARD. The largest organic chapter, and half of it is naming, classifying and physical properties." },
  { slug: "aldehydes-ketones-and-carboxylic-acids", name: "Aldehydes, Ketones and Carboxylic Acids", chapter: "Aldehydes, Ketones and Carboxylic Acids", qPerPaper: 2.92,
    summary: "192 q - 2.92/paper - 2% HARD. The named-reaction chapter: learn each reaction both ways, reagent to product and back." },
  { slug: "halogen-derivatives", name: "Halogen Derivatives of Alkanes", chapter: "Halogen Derivatives of Alkanes", qPerPaper: 2.18,
    summary: "137 q - 2.18/paper - 1% HARD. Exchange and coupling reactions by name, SN1 against SN2, and a polyhalogen table." },
  { slug: "amines", name: "Amines", chapter: "Amines", qPerPaper: 2.05,
    summary: "134 q - 2.05/paper - 4% HARD. Basicity order, the Hinsberg and carbylamine tests, and diazonium chemistry." },
  { slug: "basic-principles-of-organic-chemistry", name: "Basic Principles of Organic Chemistry", chapter: "Basic Principles of Organic Chemistry", qPerPaper: 1.15,
    summary: "72 q - 1.15/paper - 10% HARD, the hardest chapter of any size. Functional-group priority, electronic effects and isomer counting." },
  // Recall
  { slug: "biomolecules", name: "Biomolecules", chapter: "Biomolecules", qPerPaper: 2.31,
    summary: "150 q - 2.31/paper - 1% HARD. Sugars and their linkages, amino acids, and the bases of DNA and RNA." },
  { slug: "introduction-to-polymer-chemistry", name: "Introduction to Polymer Chemistry", chapter: "Introduction to Polymer Chemistry", qPerPaper: 2.08,
    summary: "139 q - 2.08/paper - one HARD question in all 139. A monomer table and a uses table." },
  { slug: "coordination-compounds", name: "Coordination Compounds", chapter: "Coordination Compounds", qPerPaper: 2.03,
    summary: "140 q - 2.03/paper - 2% HARD. Counting: donor atoms, oxidation state, EAN, unpaired electrons." },
  { slug: "transition-and-inner-transition-elements", name: "Transition and Inner Transition Elements", chapter: "Transition and Inner Transition Elements", qPerPaper: 1.87,
    summary: "126 q - 1.87/paper - 2% HARD. Configurations, the spin-only moment and lanthanoid contraction." },
  { slug: "chemical-bonding", name: "Chemical Bonding", chapter: "Chemical Bonding and Molecular Structure", qPerPaper: 1.28,
    summary: "96 q - 1.28/paper - 2% HARD. Count pairs for a shape and electrons for a bond order." },
  { slug: "elements-of-group-16-17-and-18", name: "Elements of Group 16, 17 and 18", chapter: "Elements of Group 16, 17 and 18", qPerPaper: 1.28,
    summary: "80 q - 1.28/paper - 4% HARD, and up since 2025. Trends, oxoacids, interhalogens and xenon fluorides." },
  { slug: "redox-reactions", name: "Redox Reactions", chapter: "Redox Reactions", qPerPaper: 1.15,
    summary: "73 q - 1.15/paper - 1% HARD. The oxidation number, including its structural exceptions." },
  { slug: "green-chemistry-and-nanochemistry", name: "Green Chemistry and Nanochemistry", chapter: "Green Chemistry and Nanochemistry", qPerPaper: 1.1,
    summary: "63 q - 1.10/paper - never HARD, and rising two years running. The principles, atom economy and nanostructures by dimension." },
  { slug: "surface-chemistry", name: "Surface Chemistry", chapter: "Surface Chemistry", qPerPaper: 1.08,
    summary: "68 q - 1.08/paper - never HARD. Adsorption types, colloids and the Hardy–Schulze rule." },
];

const BY_CHAPTER = new Map(
  STRATEGY_STRANDS.flatMap((s) =>
    s.chapters.map((c) => [c.chapter, { strand: s.id, chapter: c }] as const)
  )
);

export const PLAYBOOKS: Playbook[] = ENTRIES.map((e) => {
  const hit = BY_CHAPTER.get(e.chapter);
  if (!hit) throw new Error(`playbook ${e.slug}: chapter not in a strategy strand`);
  const c = hit.chapter;
  return {
    ...e,
    subtopics: [...new Set([...c.mustDrill, ...(c.skipSubtopics ?? []), ...(c.targetHard ?? [])])],
    qCount: c.qCount,
    pctHard: c.pctHard,
    bucket: hit.strand,
  };
});

export const PLAYBOOK_SLUGS: readonly string[] = PLAYBOOKS.map((p) => p.slug);

export function playbooksInBucket(bucket: PlaybookBucket): Playbook[] {
  return PLAYBOOKS.filter((p) => p.bucket === bucket);
}
