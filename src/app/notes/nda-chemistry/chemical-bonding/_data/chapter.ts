import type { ChapterNote } from "@/app/notes/_types";

export const CHEMICAL_BONDING_CHAPTER: ChapterNote = {
  chapterName: "Chemical Bonding",
  title: "Chemical Bonding — NDA Chemistry",
  intro:
    "Chemical bonding is a small but concept-dense chapter in NDA Chemistry — about a dozen PYQs, mostly EASY and MODERATE, and almost all answerable from a few core ideas held firmly. " +
    "The whole chapter rests on one driving force: every atom (except the noble gases) wants a full outer shell, so it bonds — by transferring electrons (ionic), by sharing them (covalent), or by one atom donating both shared electrons (coordinate). Metals pool their electrons in a sea (metallic). " +
    "The chapter teaches in three movements, building from why atoms bond up to counting the bonds in a molecule: " +
    "(1) Ionic and covalent bonding — the octet rule, the four bond types, ionic-vs-covalent character, bond polarity, and the lattice properties (melting point, conductivity) the bank tests as 'which is NOT correct' traps; " +
    "(2) Valency, oxidation states and molecular formula — combining capacity, how to read valency from the group, oxidation states, and writing a formula by crossing valencies; " +
    "(3) Bond counting and molecular structure — counting the covalent bonds in a small molecule, and odd-electron molecules that dimerize. " +
    "Lewis-structure diagrams are kept for a later pass; this chapter teaches the bonding rules in words. Every PYQ is tagged — know the bond-type table and the valency rules cold, and the marks follow.",
  subtopicOrder: [
    "bond-ionic-covalent",
    "bond-valency-formula",
    "bond-counting",
  ],
};
