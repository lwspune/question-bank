import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_BIO_EVO_MECHANISMS_NOTE } from "./mechanisms";
import { IMAT_BIO_EVO_SPECIATION_NOTE } from "./speciation";
import { IMAT_BIO_EVO_ECOLOGY_NOTE } from "./ecology";

export { IMAT_BIO_EVO_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Biology, Evolution and Ecology. Order matches `subtopicOrder`. */
export const IMAT_BIO_EVO_NOTES: Record<string, SubtopicNote> = {
  "imat-evo-mechanisms": IMAT_BIO_EVO_MECHANISMS_NOTE,
  "imat-evo-speciation": IMAT_BIO_EVO_SPECIATION_NOTE,
  "imat-evo-ecology": IMAT_BIO_EVO_ECOLOGY_NOTE,
};

export const IMAT_BIO_EVO_SLUGS = Object.keys(IMAT_BIO_EVO_NOTES);
