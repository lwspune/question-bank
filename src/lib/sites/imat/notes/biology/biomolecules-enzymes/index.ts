import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_BIO_BMO_WATER_NOTE } from "./water";
import { IMAT_BIO_BMO_CARBOHYDRATES_NOTE } from "./carbohydrates";
import { IMAT_BIO_BMO_LIPIDS_NOTE } from "./lipids";
import { IMAT_BIO_BMO_PROTEINS_NOTE } from "./proteins";
import { IMAT_BIO_BMO_ENZYMES_NOTE } from "./enzymes";
import { IMAT_BIO_BMO_KINETICS_NOTE } from "./kinetics";

export { IMAT_BIO_BMO_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Biology, Biomolecules and Enzymes. Order matches `subtopicOrder`. */
export const IMAT_BIO_BMO_NOTES: Record<string, SubtopicNote> = {
  "imat-bmo-water": IMAT_BIO_BMO_WATER_NOTE,
  "imat-bmo-carbohydrates": IMAT_BIO_BMO_CARBOHYDRATES_NOTE,
  "imat-bmo-lipids": IMAT_BIO_BMO_LIPIDS_NOTE,
  "imat-bmo-proteins": IMAT_BIO_BMO_PROTEINS_NOTE,
  "imat-bmo-enzymes": IMAT_BIO_BMO_ENZYMES_NOTE,
  "imat-bmo-kinetics": IMAT_BIO_BMO_KINETICS_NOTE,
};

export const IMAT_BIO_BMO_SLUGS = Object.keys(IMAT_BIO_BMO_NOTES);
