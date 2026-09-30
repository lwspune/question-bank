import type { SubtopicNote } from "@/app/notes/_types";
import { GLUCOSE_BIO_NOTE } from "./glucose";
import { CYCLIC_BIO_NOTE } from "./cyclic";
import { DISACCHARIDES_BIO_NOTE } from "./disaccharides";
import { AMINO_ACIDS_BIO_NOTE } from "./amino-acids";
import { PROTEINS_BIO_NOTE } from "./proteins";
import { ENZYMES_VITAMINS_BIO_NOTE } from "./enzymes-vitamins";
import { NUCLEIC_ACIDS_BIO_NOTE } from "./nucleic-acids";

export { JEE_CH_BIO_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-chemistry/biomolecules/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jch-bio-` here and `jcbio-` on
 * concept slugs.
 */
export const JEE_CH_BIO_NOTES: Record<string, SubtopicNote> = {
  "jch-bio-glucose": GLUCOSE_BIO_NOTE,
  "jch-bio-cyclic": CYCLIC_BIO_NOTE,
  "jch-bio-disaccharides": DISACCHARIDES_BIO_NOTE,
  "jch-bio-amino-acids": AMINO_ACIDS_BIO_NOTE,
  "jch-bio-proteins": PROTEINS_BIO_NOTE,
  "jch-bio-enzymes-vitamins": ENZYMES_VITAMINS_BIO_NOTE,
  "jch-bio-nucleic-acids": NUCLEIC_ACIDS_BIO_NOTE,
};

export const JEE_CH_BIO_SLUGS = Object.keys(JEE_CH_BIO_NOTES);
