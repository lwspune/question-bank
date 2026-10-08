import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_BIO_MOL_STRUCTURE_NOTE } from "./structure";
import { IMAT_BIO_MOL_REPLICATION_NOTE } from "./replication";
import { IMAT_BIO_MOL_TRANSCRIPTION_NOTE } from "./transcription";
import { IMAT_BIO_MOL_TRANSLATION_NOTE } from "./translation";
import { IMAT_BIO_MOL_MUTATIONS_NOTE } from "./mutations";
import { IMAT_BIO_MOL_REGULATION_NOTE } from "./regulation";

export { IMAT_BIO_MOL_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Biology, Molecular Biology and Gene Expression. Order matches `subtopicOrder`. */
export const IMAT_BIO_MOL_NOTES: Record<string, SubtopicNote> = {
  "imat-mol-structure": IMAT_BIO_MOL_STRUCTURE_NOTE,
  "imat-mol-replication": IMAT_BIO_MOL_REPLICATION_NOTE,
  "imat-mol-transcription": IMAT_BIO_MOL_TRANSCRIPTION_NOTE,
  "imat-mol-translation": IMAT_BIO_MOL_TRANSLATION_NOTE,
  "imat-mol-mutations": IMAT_BIO_MOL_MUTATIONS_NOTE,
  "imat-mol-regulation": IMAT_BIO_MOL_REGULATION_NOTE,
};

export const IMAT_BIO_MOL_SLUGS = Object.keys(IMAT_BIO_MOL_NOTES);
