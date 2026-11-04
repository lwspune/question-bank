import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 10 Science, Ch. 8 Heredity. Statements checked against the NCERT
 * text (definitions in the book's own words); crosses and ratios worked out
 * again. Most-asked years and marks from all 115 CBSE board past-paper
 * questions in the bank, 2022-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-10",
  subjectName: "Science",
  subjectRoute: "science",
  chapterName: "Heredity",
  chapterSlug: "heredity",
  source: "NCERT Science (CBSE Class 10), Chapter 8",
  keyPoints: [
    {
      term: "Variation",
      text: "Some variation arises even in asexual reproduction, but sexual reproduction gives much more, since DNA from two parents mixes. So offspring are not true copies of their parents. Variations can be inherited and may help some individuals survive.",
    },
    {
      term: "Heredity and inherited traits",
      text: "**Heredity:** the passing of traits from parents to offspring by fixed rules. A child shows all the basic human features but does not look exactly like its parents. Free and attached earlobes are an inherited trait. A skill learnt in life (swimming) is not inherited.",
    },
    {
      term: "Mendel's contrasting characters",
      text: "Mendel used garden peas with contrasting visible characters: tall/short plants, round/wrinkled seeds, yellow/green seeds, violet/white flowers, axial/terminal flowers, green/yellow pods, inflated/constricted pods.",
    },
    {
      term: "Monohybrid cross",
      text: "Pure tall × pure short: all \\(F_1\\) plants are tall, with no medium height. Self-pollinating \\(F_1\\) gives \\(F_2\\): 3 tall : 1 short. Both traits were inherited in \\(F_1\\), but only tallness was expressed. So each trait is controlled by two copies of a factor (now called a **gene**).",
    },
    {
      term: "Dominant and recessive",
      text: "The trait expressed when the two copies differ is **dominant** (T, tall); the one hidden is **recessive** (t, short). TT and Tt are tall; only tt is short. A recessive trait can be inherited but not expressed, and shows again when two copies come together.",
    },
    {
      term: "Dihybrid cross: independent inheritance",
      text: "Round yellow (RRYY) × wrinkled green (rryy): all \\(F_1\\) are round yellow (RrYy). In \\(F_2\\): round yellow, round green, wrinkled yellow, wrinkled green in the ratio 9 : 3 : 3 : 1. New combinations appear, so the two traits are inherited independently.",
    },
    {
      term: "How genes control traits",
      text: "DNA is the information source for making proteins. A section of DNA giving information for one protein is a **gene**. Plant height depends on a growth hormone made with the help of an enzyme: an efficient enzyme makes much hormone and a tall plant; an altered, less efficient one makes a short plant.",
    },
    {
      term: "Chromosomes and gametes",
      text: "Each gene set is on separate pieces called **chromosomes**; every cell has two copies of each chromosome, one from each parent. Each germ cell takes one chromosome of each pair, so a gamete has half the number. Fusion restores the full number: equal genetic contribution from both parents and a stable chromosome number.",
    },
    {
      term: "Sex determination not by genes",
      text: "In a few reptiles, the temperature at which the fertilised eggs are kept decides whether the young are male or female. Snails can change sex. So sex is not genetically decided in every animal.",
    },
    {
      term: "Sex determination in human beings",
      text: "Humans have 23 pairs of chromosomes; one pair is the sex chromosomes. Women have a perfect pair (XX); men a mismatched pair (XY: a normal-sized X and a short Y). Every egg carries X. A sperm with X gives a girl; a sperm with Y gives a boy. So the sex of the child is decided by what it inherits from the **father**.",
    },
  ],
  formulas: [
    { label: "Monohybrid F2 ratio", latex: "\\text{phenotype } 3 \\text{ tall} : 1 \\text{ short} \\qquad \\text{genotype } 1\\,TT : 2\\,Tt : 1\\,tt" },
    { label: "Dihybrid F2 ratio", latex: "9 \\text{ round yellow} : 3 \\text{ round green} : 3 \\text{ wrinkled yellow} : 1 \\text{ wrinkled green}" },
    { label: "Chromosomes in humans", latex: "\\text{body cell } 46\\ (23 \\text{ pairs}) \\qquad \\text{gamete } 23 \\qquad \\text{zygote } 46" },
  ],
  derivations: [
    {
      title: "Show Mendel's monohybrid cross: pure tall (TT) with pure short (tt)",
      steps: [
        "Parents TT × tt; gametes T and t.",
        "\\(F_1\\): all Tt, all tall (tall is dominant).",
        "Self-pollinate \\(F_1\\): Tt × Tt; gametes T, t from each.",
        "\\(F_2\\): TT, Tt, Tt, tt: 3 tall : 1 short; genotypes 1 : 2 : 1.",
      ],
    },
    {
      title: "Show Mendel's dihybrid cross: round yellow (RRYY) with wrinkled green (rryy)",
      steps: [
        "Parents RRYY × rryy; gametes RY and ry.",
        "\\(F_1\\): all RrYy, round and yellow.",
        "\\(F_1\\) gametes: RY, Ry, rY, ry; a 4 × 4 square gives 16 combinations.",
        "\\(F_2\\): 9 round yellow, 3 round green, 3 wrinkled yellow, 1 wrinkled green. Round green and wrinkled yellow are new combinations.",
      ],
    },
    {
      title: "Show with a flow chart that the father decides the sex of the child",
      steps: [
        "Mother XX gives only X eggs; father XY gives X sperms and Y sperms in equal numbers.",
        "X egg + X sperm gives XX: girl. X egg + Y sperm gives XY: boy.",
        "So the chance of a boy or a girl is 50 % each, and the sperm decides.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Inheritance of traits over two generations (Figure 8.3)",
      labels: ["parents TT × tt", "F1 all Tt (tall)", "F2 TT, Tt, Tt, tt", "3 tall : 1 short"],
    },
    {
      title: "Sex determination in human beings (Figure 8.6)",
      labels: ["mother XX, father XY", "eggs all X; sperms X or Y", "XX: girl", "XY: boy"],
    },
  ],
  mostAsked: [
    {
      topic: "Sex determination: XX and XY, why the father decides the sex, 50 % chance of a boy or girl, animals whose sex is not decided by genes",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Monohybrid cross: tall and short or flower colour, \\(F_1\\) and \\(F_2\\), the 3 : 1 ratio, dominant and recessive traits",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Dihybrid cross: round yellow with wrinkled green, new combinations in \\(F_2\\), 9 : 3 : 3 : 1, independent inheritance",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Genes, proteins and chromosomes: how a gene controls height, how the chromosome number stays the same, DNA",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Variation and inherited traits: why offspring are not true copies, earlobes, why variation helps survival",
      marks: 1,
      years: [2026, 2025, 2023, 2022],
    },
  ],
  mistakes: [
    {
      title: "Giving the genotype ratio for the phenotype",
      body: "The \\(F_2\\) of a monohybrid cross is 3 : 1 in **appearance** but 1 : 2 : 1 in **genotype**. With 1600 \\(F_2\\) plants of a dihybrid cross: 900, 300, 300, 100.",
    },
    {
      title: "Self-pollinating the parents instead of F1",
      body: "Mendel got \\(F_2\\) by **self-pollinating the \\(F_1\\)** plants, not by crossing the parents again.",
    },
    {
      title: "Saying the mother decides the sex",
      body: "Every egg carries X, so the mother cannot change the outcome. The sperm (X or Y) decides. Four daughters in a row is chance, not anyone's fault.",
    },
    {
      title: "Calling a tall plant pure",
      body: "A tall plant may be TT or Tt. A cross that gives a few short plants shows both parents were Tt; a cross giving 50 % tall and 50 % short is Tt × tt.",
    },
    {
      title: "Treating acquired traits as inherited",
      body: "Only traits in the DNA of germ cells are passed on. A skill like swimming or a mark from an injury is not inherited.",
    },
  ],
};

export default sheet;
