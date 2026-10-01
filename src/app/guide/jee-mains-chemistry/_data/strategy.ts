/**
 * Content for /guide/jee-mains-chemistry/strategy.
 *
 * THE MARKING SETS THE RULES, THE WORK SETS THE AXIS. JEE Main pays +4 and takes 1 for a wrong answer
 * on MCQs and numeric answers alike, so the guessing rules are the Maths guide's (shared in
 * src/lib/guide/jeeMarking.ts). But Chemistry's chapters all carry about the same weight, so weight
 * tiers sort almost nothing. What does split them is the KIND OF WORK a question asks for:
 *   - CALCULATE: physical chemistry, where most questions need arithmetic. Drawn on a MEASURED line —
 *     every Calculate chapter is at or above CALC_LINE per cent calculation rows (numeric answers +
 *     all-number MCQs), every other playbook chapter below it.
 *   - REACTIONS: the organic reaction chapters — reagent to product, named reactions.
 *   - STRUCTURE: naming, bonding, periodic trends, the blocks, complexes, biomolecules — exact facts,
 *     orders and counts from a list.
 * Reactions vs Structure is editorial (both sit below the line); STRAND_OF names every chapter, and
 * tests/jee-mains-chemistry-guide-data.test.ts pins the membership and the line.
 *
 * WHAT IS LEFT OUT OF THE STRANDS: chapters on the paper but under PLAYBOOK_LINE questions a paper
 * (the tail, listed with their notes) and the eight chapters that left the syllabus (no notes; their
 * recent rate stays under LEFT_MAX_RECENT — the few recent rows filed under them are on live topics).
 *
 * PROSE CARRIES NO FIGURES. `summary`, `pitch` and `approach` are editorial; the page prints every
 * number beside them from CHAPTER_TABLE.
 */

import { CHAPTER_TABLE, PAPER, type ChapterRow } from "./jee-mains-chemistry";
import type { StrandId } from "./types";

export { GUESS_RULE, NUMERIC_RULE } from "@/lib/guide/jeeMarking";
export type { StrandId };

/** Per cent of a chapter's rows that are calculations, at or above which it is a Calculate chapter. */
export const CALC_LINE = 40;
/** Questions per 25-question paper (2025-2026) a chapter needs for its own playbook. */
export const PLAYBOOK_LINE = 0.5;
/** A chapter that left the syllabus stays under this recent rate. */
export const LEFT_MAX_RECENT = 0.15;

/**
 * 25 q x 4 marks = 100, and 1 mark lost per wrong answer. The Chemistry share of the shared
 * three-hour clock is a suggested 50 minutes. Target: 22 attempts at about 86% is 19 right and
 * 3 wrong, 76 - 3 = 73 marks, before any end-of-paper MCQ guesses (each worth +0.25 on average).
 */
export const STRATEGY_HEADLINE = {
  paperQ: PAPER.questions,
  totalMarks: PAPER.totalMarks,
  marksPerCorrect: PAPER.marksPerCorrect,
  penaltyPerWrong: PAPER.penaltyPerWrong,
  targetMarks: 73,
  targetAttempts: 22,
  targetAccuracyPct: 86,
  durationMin: PAPER.suggestedMinutes,
  minutesPerQuestion: PAPER.minutesPerQuestion,
};

/** How to spend the shared clock. A starting budget, not a measurement of anyone's paper. */
export const TIME_PLAN: { step: string; detail: string }[] = [
  {
    step: "Give Chemistry less time than Maths",
    detail:
      "The three subjects share one clock. Many Chemistry questions are answered on sight, so Chemistry can fund the other two. Start from the budget above and adjust it from your own mock tests.",
  },
  {
    step: "First sweep: everything you can answer on sight",
    detail:
      "Go through all the Chemistry questions once. Answer the reactions, facts and orders you know, and mark the calculations and anything that needs thought.",
  },
  {
    step: "Second sweep: the calculations",
    detail:
      "Come back to the marked calculations. Write the formula, carry units and powers of ten, and check that the answer is sensible before entering it.",
  },
  {
    step: "Last minutes: fill every MCQ",
    detail:
      "Any multiple-choice question still blank gets an answer, after ruling out what you can. Numeric answers you have not worked out stay blank.",
  },
];

/** How to work each question format the paper reuses across chapters. */
export const FORMAT_RULES: { format: string; how: string; why: string }[] = [
  {
    format: "Two statements",
    how: "Judge each statement on its own, as true or false, before you read the four combinations. Then pick the one combination that matches.",
    why: "The options pair the statements every possible way, so reading them first only invites a guess. One statement judged wrong sends you to the wrong option.",
  },
  {
    format: "Match the list",
    how: "Fix the one pair you are surest of and strike every option that breaks it. Then fix a second pair among what is left.",
    why: "Two certain pairs usually leave one option. Working through all four pairs in order wastes time on the pair you do not know.",
  },
  {
    format: "How many of the following",
    how: "Mark each item yes or no on the page, then count the marks. Never count by eye or by pattern.",
    why: "Most numeric answers outside physical chemistry are counts like this. One item judged wrongly makes the whole answer wrong, and a wrong numeric answer still costs a mark.",
  },
  {
    format: "A numeric answer",
    how: "Round only at the end, check the unit the question asks for, and enter the integer it asks for.",
    why: "There are no options to check against. A slip in a power of ten or a unit is a wrong answer.",
  },
];

/** Every chapter on the paper: its strand (null = the tail), a short display name and a summary. No figures. */
export const CHAPTER_NOTES: Record<string, { strand: StrandId | null; name: string; summary: string }> = {
  "Some Basic Concepts of Chemistry": {
    strand: "calculate",
    name: "Some Basic Concepts",
    summary:
      "The mole in every form: mass, gas volume, solution concentration, percentage composition and the limiting reagent. Its arithmetic runs through every other physical chapter.",
  },
  "Chemical Thermodynamics": {
    strand: "calculate",
    name: "Thermodynamics",
    summary:
      "Work of expansion, heat and the first law, Hess's law, then entropy and Gibbs energy. Signs decide most answers: who does work on whom, and which way heat flows.",
  },
  "Chemical Kinetics": {
    strand: "calculate",
    name: "Chemical Kinetics",
    summary:
      "Rate laws and order, the integrated first-order law with its half-life, and the Arrhenius equation. Most questions are one formula with logarithms.",
  },
  Equilibrium: {
    strand: "calculate",
    name: "Equilibrium",
    summary:
      "Kc and Kp, Le Chatelier, then ionic equilibrium: pH, buffers, salt hydrolysis and solubility product. The ionic half carries most of the calculations.",
  },
  "Structure of Atom": {
    strand: "calculate",
    name: "Structure of Atom",
    summary:
      "Photons, the Bohr model and the hydrogen spectrum, de Broglie and uncertainty, then quantum numbers and electron configuration. Half calculation, half counting electrons and orbitals.",
  },
  Electrochemistry: {
    strand: "calculate",
    name: "Electrochemistry",
    summary:
      "Cell potentials and the Nernst equation, Gibbs energy from a cell, conductance and Kohlrausch's law, and Faraday's laws. Sign conventions and units decide the answer.",
  },
  Solutions: {
    strand: "calculate",
    name: "Solutions",
    summary:
      "Concentration terms, Raoult's law, and the four colligative properties with the van 't Hoff factor for electrolytes.",
  },
  "Organic Chemistry - Some Basic Principles and Techniques": {
    strand: "structure",
    name: "Basic Principles of Organic Chemistry",
    summary:
      "Naming, isomers, electron effects and reactive intermediates, then purification and the detection and estimation of elements. The heaviest chapter on the recent papers, and the base for every organic chapter.",
  },
  "Coordination Compounds": {
    strand: "structure",
    name: "Coordination Compounds",
    summary:
      "Naming complexes, counting isomers, and crystal field theory with spin-only magnetic moments. Many of its numeric answers are counts from a list.",
  },
  "The d- and f-Block Elements": {
    strand: "structure",
    name: "The d- and f-Block Elements",
    summary:
      "Electronic configurations, oxidation states and magnetic moments across the series, the lanthanoid contraction, and the chemistry of dichromate and permanganate.",
  },
  "Chemical Bonding and Molecular Structure": {
    strand: "structure",
    name: "Chemical Bonding",
    summary:
      "VSEPR shapes, hybridisation, bond order from molecular orbital theory, dipole moments and hydrogen bonding. Mostly structure work on given molecules.",
  },
  "Classification of Elements and Periodicity": {
    strand: "structure",
    name: "Periodicity",
    summary:
      "Periodic trends in size, ionisation enthalpy, electron gain enthalpy and electronegativity, with their known exceptions. Short questions, decided by the exceptions.",
  },
  "The p-Block Elements": {
    strand: "structure",
    name: "The p-Block Elements",
    summary:
      "Groups thirteen to eighteen: trends, the inert pair effect, oxoacids, interhalogens and xenon compounds. Exact recall of structures and reactions.",
  },
  Biomolecules: {
    strand: "structure",
    name: "Biomolecules",
    summary:
      "Carbohydrates, amino acids and proteins, vitamins, enzymes and nucleic acids. A recall chapter, with a few counts of peptides and stereocentres.",
  },
  Hydrocarbons: {
    strand: "reactions",
    name: "Hydrocarbons",
    summary:
      "Alkanes, addition to alkenes and alkynes, ozonolysis, aromaticity and substitution on benzene. Most questions ask which carbon the new group goes to.",
  },
  Amines: {
    strand: "reactions",
    name: "Amines",
    summary:
      "Basicity, preparation, the tests that tell the classes apart, and diazonium salts with their replacement and coupling reactions.",
  },
  "Aldehydes, Ketones and Carboxylic Acids": {
    strand: "reactions",
    name: "Aldehydes, Ketones and Carboxylic Acids",
    summary:
      "Nucleophilic addition, the Grignard reagent, reductions, the tests, aldol and Cannizzaro, and acid strength. Short reaction schemes with a product to name.",
  },
  "Haloalkanes and Haloarenes": {
    strand: "reactions",
    name: "Haloalkanes and Haloarenes",
    summary:
      "The two substitution mechanisms and when each wins, the nucleophile and its product, elimination against substitution, and the haloarenes. Mechanism facts decide most answers.",
  },
  "Alcohols, Phenols and Ethers": {
    strand: "reactions",
    name: "Alcohols, Phenols and Ethers",
    summary:
      "Acidity of alcohols and phenols, dehydration with its carbocation shifts, the named reactions of phenol, and the cleavage of ethers by HI.",
  },
  "Organic Reaction Mechanisms": {
    strand: null,
    name: "Organic Reaction Mechanisms",
    summary:
      "Functional-group tests and mechanism questions that span the organic chapters. Small on the recent papers; its notes are worth a read once the reaction chapters are done.",
  },
};

export type StrandChapter = ChapterRow & { name: string; summary: string };

function withNotes(row: ChapterRow): StrandChapter {
  const n = CHAPTER_NOTES[row.chapter];
  if (!n) throw new Error(`jee-mains-chemistry strategy: no editorial note for "${row.chapter}"`);
  return { ...row, name: n.name, summary: n.summary };
}

export type StrategyStrand = {
  id: StrandId;
  label: string;
  pitch: string;
  approach: string[];
  chapters: StrandChapter[];
};

const STRAND_TEXT: Record<StrandId, { label: string; pitch: string; approach: string[] }> = {
  calculate: {
    label: "Calculate",
    pitch:
      "Physical chemistry. Most of its questions need arithmetic, and most of the paper's numeric answers come from here.",
    approach: [
      "Learn each chapter's few working formulas until you can write them without looking. Most questions apply one or two of them in order.",
      "Carry units and powers of ten through every line. A numeric answer is entered as an integer, so a slip in an exponent is a wrong answer.",
      "Take these questions in the second sweep, after everything you can answer on sight.",
      "Check that the answer is sensible: a negative concentration, a pH above fourteen or a rate that falls when it should rise means a slip.",
    ],
  },
  reactions: {
    label: "Reactions",
    pitch:
      "The organic reaction chapters. A question gives a reagent or a short scheme and asks for the product, or names a reaction.",
    approach: [
      "Learn reactions as reagent and product pairs, and say what each reagent does to the molecule: adds, removes, replaces or rearranges.",
      "Follow a scheme one step at a time and write each product down. Most wrong answers come from a skipped step.",
      "Decide the site first: which carbon, which position on the ring, which atom of the nucleophile attacks. The site is where the options differ.",
      "These are first-sweep questions. When a scheme stalls, mark it and move on.",
    ],
  },
  structure: {
    label: "Structure and recall",
    pitch:
      "Naming, bonding, periodic trends, the blocks of the periodic table, complexes and biomolecules. Most questions test an exact fact, an order or a count from a list.",
    approach: [
      "Learn orders together with their exceptions. The exception is usually what the question tests.",
      "For a count from a list, judge every item separately and mark it on the page before counting.",
      "Work structure questions from the structure: draw the molecule or complex, count electron pairs or d electrons, then answer.",
      "Most of these are first-sweep questions. A fact you do not know is an MCQ to guess at the end, never a numeric answer to guess.",
    ],
  },
};

const STRAND_ORDER: StrandId[] = ["calculate", "reactions", "structure"];

const onPaper = CHAPTER_TABLE.filter((r) => r.slug !== null);

export const STRATEGY_STRANDS: StrategyStrand[] = STRAND_ORDER.map((id) => ({
  id,
  ...STRAND_TEXT[id],
  chapters: onPaper
    .filter((r) => r.recentPerPaper >= PLAYBOOK_LINE && CHAPTER_NOTES[r.chapter]?.strand === id)
    .map(withNotes),
}));

/** On the paper (they have notes) but under the playbook line. */
export const TAIL_CHAPTERS: StrandChapter[] = onPaper
  .filter((r) => r.recentPerPaper < PLAYBOOK_LINE)
  .map(withNotes);

/** Left the syllabus: no notes. Listed so the bank is accounted for, never drilled. */
export const LEFT_CHAPTERS: ChapterRow[] = CHAPTER_TABLE.filter((r) => r.slug === null);

export function strandOfChapter(chapter: string): StrandId | "tail" | "left" {
  const row = CHAPTER_TABLE.find((r) => r.chapter === chapter);
  if (!row) throw new Error(`jee-mains-chemistry strategy: no chapter "${chapter}"`);
  if (row.slug === null) return "left";
  if (row.recentPerPaper < PLAYBOOK_LINE) return "tail";
  const s = CHAPTER_NOTES[chapter]?.strand;
  if (!s) throw new Error(`jee-mains-chemistry strategy: no strand for "${chapter}"`);
  return s;
}
