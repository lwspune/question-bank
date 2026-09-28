/**
 * Playbook catalog for /guide/mht-cet-chemistry/playbooks.
 *
 * One playbook = one chapter. WHY 23 AND NOT 30: playbooks ship for every
 * chapter at >= 0.9 q/paper on RECENT weightage (2024-2025, 24 papers). The
 * seven below the line are in the tail block on /strategy.
 *
 * `subtopics` is DERIVED from the strategy strand's drill lists (every strand
 * chapter lists all of its subtopics), so the two cannot disagree;
 * tests/guide-mht-cet-chemistry-playbooks.test.ts checks them against the live
 * taxonomy both ways. Slugs equal the /notes/mht-cet-chemistry chapter slugs.
 *
 * `bucket` is the execution-mode strand: calculate 8 (20.8 q/paper) ·
 * reactions 6 (11.3) · recall 9 (13.6).
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
  { slug: "solutions", name: "Solutions and Colligative Properties", chapter: "Solutions and Colligative Properties", qPerPaper: 3.17,
    summary: "131 q - 3.17/paper - 3% HARD. The heaviest Chemistry chapter; four of six pages are one idea — a colligative property counts dissolved particles." },
  { slug: "solid-state", name: "Solid State", chapter: "Solid State", qPerPaper: 3.04,
    summary: "130 q - 3.04/paper - 5% HARD. ρ = zM/(a³N_A) solved for a different unknown each time; packing efficiency holds the HARD." },
  { slug: "chemical-kinetics", name: "Chemical Kinetics", chapter: "Chemical Kinetics", qPerPaper: 3.0,
    summary: "125 q - 3.00/paper - 2% HARD. Three pages, 103 questions, no HARD: rates, rate laws and first-order half-life." },
  { slug: "ionic-equilibria", name: "Ionic Equilibria", chapter: "Ionic Equilibria", qPerPaper: 2.96,
    summary: "122 q - 2.96/paper - 2% HARD. Log arithmetic — pH, α, buffers, Ksp — with two recall pages to take first." },
  { slug: "chemical-thermodynamics", name: "Chemical Thermodynamics", chapter: "Chemical Thermodynamics and Energetics", qPerPaper: 2.96,
    summary: "121 q - 2.96/paper - 3% HARD. The first-law page is 50 questions of signs and 100 J per dm³ bar." },
  { slug: "electrochemistry", name: "Electrochemistry", chapter: "Electrochemistry", qPerPaper: 2.88,
    summary: "122 q - 2.88/paper - 9% HARD. The one Chemistry chapter with HARD load — ten Nernst questions on one page." },
  { slug: "structure-of-atom", name: "Structure of Atom", chapter: "Structure of Atom", qPerPaper: 1.42,
    summary: "70 q - 1.42/paper - 1% HARD, and halved in 2025. Bohr scaling, E = hc/λ and quantum numbers." },
  { slug: "some-basic-concepts", name: "Some Basic Concepts of Chemistry", chapter: "Some Basic Concepts of Chemistry", qPerPaper: 1.33,
    summary: "51 q - 1.33/paper - 2% HARD, and rising. Mole arithmetic that every Calculate chapter reuses." },
  // Reactions
  { slug: "alcohols-phenols-and-ethers", name: "Alcohols, Phenols and Ethers", chapter: "Alcohols, Phenols and Ethers", qPerPaper: 3.04,
    summary: "126 q - 3.04/paper - 5% HARD. The heaviest organic chapter, and more than half of it is naming and classifying." },
  { slug: "aldehydes-ketones-and-carboxylic-acids", name: "Aldehydes, Ketones and Carboxylic Acids", chapter: "Aldehydes, Ketones and Carboxylic Acids", qPerPaper: 2.54,
    summary: "109 q - 2.54/paper - 3% HARD. The named-reaction chapter: learn each reaction both ways, reagent to product and back." },
  { slug: "amines", name: "Amines", chapter: "Amines", qPerPaper: 1.96,
    summary: "81 q - 1.96/paper - 4% HARD. Basicity order, the Hinsberg and carbylamine tests, and diazonium chemistry." },
  { slug: "halogen-derivatives", name: "Halogen Derivatives of Alkanes", chapter: "Halogen Derivatives of Alkanes", qPerPaper: 1.83,
    summary: "79 q - 1.83/paper - 3% HARD. Exchange and coupling reactions by name, SN1 against SN2, and a polyhalogen table." },
  { slug: "aromatic-compounds", name: "Aromatic Compounds", chapter: "Aromatic Compounds", qPerPaper: 0.96,
    summary: "35 q - 0.96/paper - 3% HARD. Aromaticity, directing groups and side-chain oxidation." },
  { slug: "alkanes", name: "Alkanes", chapter: "Alkanes", qPerPaper: 0.92,
    summary: "35 q - 0.92/paper - never HARD. Wurtz, decarboxylation and Grignard, and chain isomers." },
  // Recall
  { slug: "biomolecules", name: "Biomolecules", chapter: "Biomolecules", qPerPaper: 2.17,
    summary: "88 q - 2.17/paper - 2% HARD. Sugars and their linkages, amino acids, and the bases of DNA and RNA." },
  { slug: "coordination-compounds", name: "Coordination Compounds", chapter: "Coordination Compounds", qPerPaper: 2.12,
    summary: "88 q - 2.12/paper - 2% HARD. Counting — donor atoms, oxidation state, EAN, unpaired electrons." },
  { slug: "introduction-to-polymer-chemistry", name: "Introduction to Polymer Chemistry", chapter: "Introduction to Polymer Chemistry", qPerPaper: 2.04,
    summary: "85 q - 2.04/paper - one HARD question in all 85. A monomer table and a uses table." },
  { slug: "transition-and-inner-transition-elements", name: "Transition and Inner Transition Elements", chapter: "Transition and Inner Transition Elements", qPerPaper: 1.75,
    summary: "76 q - 1.75/paper - 4% HARD. Configurations, the spin-only moment and lanthanoid contraction." },
  { slug: "chemical-bonding", name: "Chemical Bonding", chapter: "Chemical Bonding and Molecular Structure", qPerPaper: 1.29,
    summary: "64 q - 1.29/paper - 3% HARD. Count pairs for a shape and electrons for a bond order." },
  { slug: "elements-of-group-16-17-and-18", name: "Elements of Group 16, 17 and 18", chapter: "Elements of Group 16, 17 and 18", qPerPaper: 1.29,
    summary: "48 q - 1.29/paper - 2% HARD, and rising in 2025. Trends, oxoacids, interhalogens and xenon fluorides." },
  { slug: "redox-reactions", name: "Redox Reactions", chapter: "Redox Reactions", qPerPaper: 1.08,
    summary: "44 q - 1.08/paper - 2% HARD. The oxidation number, including its structural exceptions." },
  { slug: "surface-chemistry", name: "Surface Chemistry", chapter: "Surface Chemistry", qPerPaper: 0.92,
    summary: "39 q - 0.92/paper - never HARD. Adsorption types, colloids and the Hardy–Schulze rule." },
  { slug: "elements-of-group-1-and-2", name: "Elements of Group 1 and 2", chapter: "Elements of Group 1 and 2", qPerPaper: 0.92,
    summary: "37 q - 0.92/paper - never HARD. Group trends and the lithium and beryllium anomalies." },
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
