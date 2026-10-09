import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_BIO_CSM_CELLS_SIZE_NOTE } from "./cells-and-size";
import { IMAT_BIO_CSM_MEMBRANE_NOTE } from "./membrane";
import { IMAT_BIO_CSM_TRANSPORT_NOTE } from "./transport";
import { IMAT_BIO_CSM_ENDOMEMBRANE_NOTE } from "./endomembrane";
import { IMAT_BIO_CSM_ENERGY_SUPPORT_NOTE } from "./organelles-energy-support";
import { IMAT_BIO_CSM_CELL_TYPES_NOTE } from "./cell-types";

export { IMAT_BIO_CSM_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Biology, Cell Structure and Membranes. Order matches `subtopicOrder`. */
export const IMAT_BIO_CSM_NOTES: Record<string, SubtopicNote> = {
  "imat-csm-cells-size": IMAT_BIO_CSM_CELLS_SIZE_NOTE,
  "imat-csm-membrane": IMAT_BIO_CSM_MEMBRANE_NOTE,
  "imat-csm-transport": IMAT_BIO_CSM_TRANSPORT_NOTE,
  "imat-csm-endomembrane": IMAT_BIO_CSM_ENDOMEMBRANE_NOTE,
  "imat-csm-organelles": IMAT_BIO_CSM_ENERGY_SUPPORT_NOTE,
  "imat-csm-cell-types": IMAT_BIO_CSM_CELL_TYPES_NOTE,
};

export const IMAT_BIO_CSM_SLUGS = Object.keys(IMAT_BIO_CSM_NOTES);
