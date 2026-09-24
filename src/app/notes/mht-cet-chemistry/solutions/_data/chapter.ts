import type { ChapterNote } from "@/app/notes/_types";

export const MHTCET_SOLUTIONS_CHAPTER: ChapterNote = {
  chapterName: "Solutions and Colligative Properties",
  title: "Solutions and Colligative Properties — MHT-CET Chemistry",
  intro:
    "Solutions and Colligative Properties is the largest chapter in MHT-CET Chemistry by past-year count and one of the cheapest: three questions a paper, and " +
    "barely one in thirty of them HARD. Almost every question is one of five formulas with the numbers changed — Henry's law, Raoult's law, ΔTb = Kb·m, " +
    "ΔTf = Kf·m and π = CRT — plus the van't Hoff factor that multiplies each of them for an electrolyte. The recall questions are a short list too: which " +
    "solute-solvent pairing a given mixture is, which salt's solubility falls with temperature, which mixtures deviate from Raoult's law and in which " +
    "direction, and which properties count as colligative. The pages below follow the textbook order, because each colligative property is the previous " +
    "one's formula with a different constant, and the last page collects the van't Hoff factor that the electrolyte stems on every earlier page quietly " +
    "assume. Every PYQ is tagged.",
  cardBlurb:
    "Henry's and Raoult's laws, the four colligative properties and the van't Hoff factor — the largest MHT-CET Chemistry chapter, with every past-year question tagged to its formula.",
  subtopicOrder: [
    "cetsol-types-solubility-henry",
    "cetsol-vapour-pressure-raoult",
    "cetsol-boiling-point-elevation",
    "cetsol-freezing-point-depression",
    "cetsol-osmotic-pressure",
    "cetsol-vant-hoff-factor",
  ],
};
