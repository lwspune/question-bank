import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_BIO_BEM_ENERGY_NOTE } from "./energy";
import { IMAT_BIO_BEM_GLYCOLYSIS_NOTE } from "./glycolysis";
import { IMAT_BIO_BEM_AEROBIC_NOTE } from "./aerobic";
import { IMAT_BIO_BEM_FERMENTATION_NOTE } from "./fermentation";
import { IMAT_BIO_BEM_PHOTOSYNTHESIS_NOTE } from "./photosynthesis";
import { IMAT_BIO_BEM_FATS_PROTEINS_NOTE } from "./fats-proteins";

export { IMAT_BIO_BEM_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Biology, Bioenergetics and Metabolism. Order matches `subtopicOrder`. */
export const IMAT_BIO_BEM_NOTES: Record<string, SubtopicNote> = {
  "imat-bem-energy": IMAT_BIO_BEM_ENERGY_NOTE,
  "imat-bem-glycolysis": IMAT_BIO_BEM_GLYCOLYSIS_NOTE,
  "imat-bem-aerobic": IMAT_BIO_BEM_AEROBIC_NOTE,
  "imat-bem-fermentation": IMAT_BIO_BEM_FERMENTATION_NOTE,
  "imat-bem-photosynthesis": IMAT_BIO_BEM_PHOTOSYNTHESIS_NOTE,
  "imat-bem-fats-proteins": IMAT_BIO_BEM_FATS_PROTEINS_NOTE,
};

export const IMAT_BIO_BEM_SLUGS = Object.keys(IMAT_BIO_BEM_NOTES);
