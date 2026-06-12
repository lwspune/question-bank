import type { ChapterNote } from "@/app/notes/_types";

export const CELL_BIOLOGY_CHAPTER: ChapterNote = {
  chapterName: "Cell Biology",
  title: "Cell Biology — NDA Biology",
  intro:
    "Cell Biology is one of the most reliably-tested NDA Biology chapters — 44 PYQs across 2017–2026, almost all EASY or MODERATE, and almost all pure named-fact recall. " +
    "The single biggest cluster is cell organelles (17 of 44 questions): which organelle has its own DNA, which one digests, which one builds lipids. Memorise that table and you bank a third of the chapter. " +
    "The chapter teaches in eight movements, building from what a cell is up to how it divides: " +
    "(1) Cell structure fundamentals — what every living cell must have, the levels-of-organization ladder, and the cell theory; " +
    "(2) Microscopy — who discovered the cell and the parts of a compound microscope; " +
    "(3) Cell wall and cell membrane — the fluid-mosaic membrane and the cellulose / chitin / peptidoglycan wall facts; " +
    "(4) Cell organelles — the powerhouse, the suicide bags, the transport network and the DNA-bearing organelles (the chapter's core); " +
    "(5) Prokaryotic vs eukaryotic cells — nucleoid vs nucleus, naked DNA, and what a prokaryote lacks; " +
    "(6) Osmosis and tonicity — water movement, plasmolysis and haemolysis; " +
    "(7) Cellular respiration and ATP — glycolysis, the mitochondrion, and where ATP is made; " +
    "(8) Cell division and DNA replication — ploidy, double fertilization, and how prokaryotes and eukaryotes divide differently. " +
    "Most concepts are reference tables: learn the table, win the marks.",
  subtopicOrder: [
    "cell-structure-fundamentals",
    "cell-microscopy",
    "cell-wall-and-membrane",
    "cell-organelles",
    "cell-prokaryotic-eukaryotic",
    "cell-osmosis-tonicity",
    "cell-respiration-atp",
    "cell-division-replication",
  ],
};
