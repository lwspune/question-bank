import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_BIO_MBT_BACTERIA_NOTE } from "./bacteria";
import { IMAT_BIO_MBT_VIRUSES_NOTE } from "./viruses";
import { IMAT_BIO_MBT_MICROBES_DISEASE_NOTE } from "./microbes-disease";
import { IMAT_BIO_MBT_RECOMBINANT_NOTE } from "./recombinant";
import { IMAT_BIO_MBT_DNA_ANALYSIS_NOTE } from "./dna-analysis";
import { IMAT_BIO_MBT_APPLICATIONS_NOTE } from "./applications";

export { IMAT_BIO_MBT_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Biology, Microorganisms and Biotechnology. Order matches `subtopicOrder`. */
export const IMAT_BIO_MBT_NOTES: Record<string, SubtopicNote> = {
  "imat-mbt-bacteria": IMAT_BIO_MBT_BACTERIA_NOTE,
  "imat-mbt-viruses": IMAT_BIO_MBT_VIRUSES_NOTE,
  "imat-mbt-microbes-disease": IMAT_BIO_MBT_MICROBES_DISEASE_NOTE,
  "imat-mbt-recombinant": IMAT_BIO_MBT_RECOMBINANT_NOTE,
  "imat-mbt-dna-analysis": IMAT_BIO_MBT_DNA_ANALYSIS_NOTE,
  "imat-mbt-applications": IMAT_BIO_MBT_APPLICATIONS_NOTE,
};

export const IMAT_BIO_MBT_SLUGS = Object.keys(IMAT_BIO_MBT_NOTES);
