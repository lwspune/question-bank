import type { ChapterNote } from "@/app/notes/_types";

export const CDS_POLYNOMIALS_CHAPTER: ChapterNote = {
  chapterName: "Polynomials",
  title: "Polynomials — CDS Elementary Mathematics",
  intro:
    "Polynomials has 79 past-year questions in CDS Elementary Mathematics, from twenty sittings between 2016 (II) and 2026 (II). " +
    "The HCF and LCM of polynomials alone accounts for 25 of them, and almost every question — HCF, remainder or factor — comes down to factorising cleanly and substituting a root. " +
    "The pages run from degree and zeros through the remainder and factor theorems to factorisation, and end with HCF and LCM.",
  cardBlurb:
    "Degree and zeros, the remainder theorem, the factor theorem, factorising cubics and quartics, and the HCF and LCM of polynomials.",
  subtopicOrder: [
    "cds-po-degree",
    "cds-po-remainder",
    "cds-po-factor-theorem",
    "cds-po-factorisation",
    "cds-po-hcf-lcm",
  ],
};
