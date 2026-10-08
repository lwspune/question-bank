import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_BIO_GEN_BASICS_NOTE } from "./basics";
import { IMAT_BIO_GEN_CROSSES_NOTE } from "./crosses";
import { IMAT_BIO_GEN_DOMINANCE_NOTE } from "./dominance";
import { IMAT_BIO_GEN_SEX_LINKAGE_NOTE } from "./sex-linkage";
import { IMAT_BIO_GEN_LINKAGE_NOTE } from "./linkage";
import { IMAT_BIO_GEN_PEDIGREES_NOTE } from "./pedigrees";

export { IMAT_BIO_GEN_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Biology, Genetics and Inheritance. Order matches `subtopicOrder`. */
export const IMAT_BIO_GEN_NOTES: Record<string, SubtopicNote> = {
  "imat-gen-basics": IMAT_BIO_GEN_BASICS_NOTE,
  "imat-gen-crosses": IMAT_BIO_GEN_CROSSES_NOTE,
  "imat-gen-dominance": IMAT_BIO_GEN_DOMINANCE_NOTE,
  "imat-gen-sex-linkage": IMAT_BIO_GEN_SEX_LINKAGE_NOTE,
  "imat-gen-linkage": IMAT_BIO_GEN_LINKAGE_NOTE,
  "imat-gen-pedigrees": IMAT_BIO_GEN_PEDIGREES_NOTE,
};

export const IMAT_BIO_GEN_SLUGS = Object.keys(IMAT_BIO_GEN_NOTES);
