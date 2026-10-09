import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_BIO_HAP_TISSUES_NOTE } from "./tissues";
import { IMAT_BIO_HAP_CIRCULATION_NOTE } from "./circulation";
import { IMAT_BIO_HAP_BLOOD_IMMUNITY_NOTE } from "./blood-immunity";
import { IMAT_BIO_HAP_BREATHING_NOTE } from "./breathing";
import { IMAT_BIO_HAP_DIGESTION_NOTE } from "./digestion";
import { IMAT_BIO_HAP_KIDNEY_NOTE } from "./kidney";
import { IMAT_BIO_HAP_NERVES_MUSCLES_NOTE } from "./nerves-muscles";
import { IMAT_BIO_HAP_BRAIN_HORMONES_NOTE } from "./brain-hormones";

export { IMAT_BIO_HAP_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Biology, Human Anatomy and Physiology. Order matches `subtopicOrder`. */
export const IMAT_BIO_HAP_NOTES: Record<string, SubtopicNote> = {
  "imat-hap-tissues": IMAT_BIO_HAP_TISSUES_NOTE,
  "imat-hap-circulation": IMAT_BIO_HAP_CIRCULATION_NOTE,
  "imat-hap-blood-immunity": IMAT_BIO_HAP_BLOOD_IMMUNITY_NOTE,
  "imat-hap-breathing": IMAT_BIO_HAP_BREATHING_NOTE,
  "imat-hap-digestion": IMAT_BIO_HAP_DIGESTION_NOTE,
  "imat-hap-kidney": IMAT_BIO_HAP_KIDNEY_NOTE,
  "imat-hap-nerves-muscles": IMAT_BIO_HAP_NERVES_MUSCLES_NOTE,
  "imat-hap-brain-hormones": IMAT_BIO_HAP_BRAIN_HORMONES_NOTE,
};

export const IMAT_BIO_HAP_SLUGS = Object.keys(IMAT_BIO_HAP_NOTES);
