/**
 * Single source of truth for "what `/notes` chapters have shipped." Every
 * consumer (subtopicSlugRegistry, notesIndex, tagNames, sitemap, chapter
 * index page, notes-lint) derives from this list instead of re-importing
 * each chapter's _data block individually.
 *
 * Adding a new chapter is now:
 *   1. Write the _data modules + page template under
 *      src/app/notes/<subject-route>/<chapter-slug>/.
 *   2. Append one entry below. Every consumer picks it up automatically.
 *   3. Run a tagging session for question_concept_tags.
 *   4. `npm run notes:lint` + `npm run prepush`.
 */

import type { ChapterNote, SubtopicNote } from "@/app/notes/_types";
import {
  STATISTICS_CHAPTER,
  STATISTICS_NOTES,
  STATISTICS_SLUGS,
} from "@/app/notes/nda-maths/statistics/_data";
import {
  VECTORS_CHAPTER,
  VECTORS_NOTES,
  VECTORS_SLUGS,
} from "@/app/notes/nda-maths/vectors/_data";
import {
  PROBABILITY_CHAPTER,
  PROBABILITY_NOTES,
  PROBABILITY_SLUGS,
} from "@/app/notes/nda-maths/probability/_data";
import {
  THREE_D_GEOMETRY_CHAPTER,
  THREE_D_GEOMETRY_NOTES,
  THREE_D_GEOMETRY_SLUGS,
} from "@/app/notes/nda-maths/3d-geometry/_data";
import {
  MATRICES_DETERMINANTS_CHAPTER,
  MATRICES_DETERMINANTS_NOTES,
  MATRICES_DETERMINANTS_SLUGS,
} from "@/app/notes/nda-maths/matrices-determinants/_data";
import {
  SEQUENCE_SERIES_CHAPTER,
  SEQUENCE_SERIES_NOTES,
  SEQUENCE_SERIES_SLUGS,
} from "@/app/notes/nda-maths/sequence-series/_data";
import {
  SOUND_CHAPTER,
  SOUND_NOTES,
  SOUND_SLUGS,
} from "@/app/notes/nda-physics/sound/_data";
import {
  ELECTRICITY_AND_MAGNETISM_CHAPTER,
  ELECTRICITY_AND_MAGNETISM_NOTES,
  ELECTRICITY_AND_MAGNETISM_SLUGS,
} from "@/app/notes/nda-physics/electricity-and-magnetism/_data";
import {
  INDEFINITE_INTEGRATION_CHAPTER,
  INDEFINITE_INTEGRATION_NOTES,
  INDEFINITE_INTEGRATION_SLUGS,
} from "@/app/notes/mht-cet-maths/indefinite-integration/_data";
import {
  NDA_INDEFINITE_INTEGRATION_CHAPTER,
  NDA_INDEFINITE_INTEGRATION_NOTES,
  NDA_INDEFINITE_INTEGRATION_SLUGS,
} from "@/app/notes/nda-maths/indefinite-integration/_data";
import {
  BINOMIAL_DISTRIBUTION_CHAPTER,
  BINOMIAL_DISTRIBUTION_NOTES,
  BINOMIAL_DISTRIBUTION_SLUGS,
} from "@/app/notes/nda-maths/binomial-distribution/_data";
import {
  FUNCTIONS_CHAPTER,
  FUNCTIONS_NOTES,
  FUNCTIONS_SLUGS,
} from "@/app/notes/nda-maths/functions/_data";
import {
  DIFFERENTIATION_CHAPTER,
  DIFFERENTIATION_NOTES,
  DIFFERENTIATION_SLUGS,
} from "@/app/notes/nda-maths/differentiation/_data";
import {
  TRIGONOMETRIC_IDENTITIES_CHAPTER,
  TRIGONOMETRIC_IDENTITIES_NOTES,
  TRIGONOMETRIC_IDENTITIES_SLUGS,
} from "@/app/notes/nda-maths/trigonometric-identities/_data";
import {
  LIMITS_CONTINUITY_CHAPTER,
  LIMITS_CONTINUITY_NOTES,
  LIMITS_CONTINUITY_SLUGS,
} from "@/app/notes/nda-maths/limits-continuity/_data";
import {
  APPLICATION_OF_DERIVATIVES_CHAPTER,
  APPLICATION_OF_DERIVATIVES_NOTES,
  APPLICATION_OF_DERIVATIVES_SLUGS,
} from "@/app/notes/nda-maths/application-of-derivatives/_data";
import {
  LINES_CHAPTER,
  LINES_NOTES,
  LINES_SLUGS,
} from "@/app/notes/nda-maths/lines/_data";

export type NotesChapterRegistration = {
  /** Canonical exam name in the DB exams table (e.g. "NDA"). */
  examName: string;
  /** Canonical subject name in the DB subjects table (e.g. "Mathematics"). */
  subjectName: string;
  /** URL segment under /notes/ — e.g. "nda-maths". */
  subjectRoute: string;
  /** Human display for the subject, e.g. "NDA Maths" — used in hero eyebrow,
   *  page metadata, and the strategy-guide link label. */
  subjectDisplay: string;
  /** URL segment for the chapter — e.g. "statistics". */
  chapterSlug: string;
  /** Short chip label, e.g. "Statistics notes". */
  chipLabel: string;
  /** The ChapterNote (carries chapterName matching DB taxonomy). */
  chapter: ChapterNote;
  /** subtopicSlug → SubtopicNote record. */
  notes: Record<string, SubtopicNote>;
  /** Ordered subtopic slugs, matches the chapter page's render order. */
  slugs: readonly string[];
  /**
   * Access tier. Omitted/"free" = fully public (the default; keeps the SEO
   * funnel intact). "paid" = preview-gated: the landing + first
   * `previewConceptCount` concepts per subtopic stay public + indexable, the
   * rest requires an entitlement (or org membership).
   *
   * CONTRACT: a "paid" chapter's [subtopicSlug]/page.tsx wrapper MUST
   * `export const dynamic = "force-dynamic"` and NOT pre-render via
   * generateStaticParams — the gate reads cookies, so a statically-cached
   * anon render would otherwise leak the preview to entitled users.
   * `npm run notes:lint` enforces this.
   */
  tier?: "free" | "paid";
  /** Entitlement scope this chapter requires when paid. Default "all". */
  paidScope?: string;
  /** Concepts shown free per subtopic before the paywall. Default 2. */
  previewConceptCount?: number;
};

export const NOTES_CHAPTERS: readonly NotesChapterRegistration[] = [
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "statistics",
    chipLabel: "Statistics notes",
    chapter: STATISTICS_CHAPTER,
    notes: STATISTICS_NOTES,
    slugs: STATISTICS_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "vectors",
    chipLabel: "Vectors notes",
    chapter: VECTORS_CHAPTER,
    notes: VECTORS_NOTES,
    slugs: VECTORS_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "probability",
    chipLabel: "Probability notes",
    chapter: PROBABILITY_CHAPTER,
    notes: PROBABILITY_NOTES,
    slugs: PROBABILITY_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "3d-geometry",
    chipLabel: "3D Geometry notes",
    chapter: THREE_D_GEOMETRY_CHAPTER,
    notes: THREE_D_GEOMETRY_NOTES,
    slugs: THREE_D_GEOMETRY_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "matrices-determinants",
    chipLabel: "Matrices & Determinants notes",
    chapter: MATRICES_DETERMINANTS_CHAPTER,
    notes: MATRICES_DETERMINANTS_NOTES,
    slugs: MATRICES_DETERMINANTS_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "sequence-series",
    chipLabel: "Sequence & Series notes",
    chapter: SEQUENCE_SERIES_CHAPTER,
    notes: SEQUENCE_SERIES_NOTES,
    slugs: SEQUENCE_SERIES_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "indefinite-integration",
    chipLabel: "Indefinite Integration notes",
    chapter: NDA_INDEFINITE_INTEGRATION_CHAPTER,
    notes: NDA_INDEFINITE_INTEGRATION_NOTES,
    slugs: NDA_INDEFINITE_INTEGRATION_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "binomial-distribution",
    chipLabel: "Binomial Distribution notes",
    chapter: BINOMIAL_DISTRIBUTION_CHAPTER,
    notes: BINOMIAL_DISTRIBUTION_NOTES,
    slugs: BINOMIAL_DISTRIBUTION_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "functions",
    chipLabel: "Functions notes",
    chapter: FUNCTIONS_CHAPTER,
    notes: FUNCTIONS_NOTES,
    slugs: FUNCTIONS_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "differentiation",
    chipLabel: "Differentiation notes",
    chapter: DIFFERENTIATION_CHAPTER,
    notes: DIFFERENTIATION_NOTES,
    slugs: DIFFERENTIATION_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "trigonometric-identities",
    chipLabel: "Trig Identities notes",
    chapter: TRIGONOMETRIC_IDENTITIES_CHAPTER,
    notes: TRIGONOMETRIC_IDENTITIES_NOTES,
    slugs: TRIGONOMETRIC_IDENTITIES_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "limits-continuity",
    chipLabel: "Limits & Continuity notes",
    chapter: LIMITS_CONTINUITY_CHAPTER,
    notes: LIMITS_CONTINUITY_NOTES,
    slugs: LIMITS_CONTINUITY_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "application-of-derivatives",
    chipLabel: "Application of Derivatives notes",
    chapter: APPLICATION_OF_DERIVATIVES_CHAPTER,
    notes: APPLICATION_OF_DERIVATIVES_NOTES,
    slugs: APPLICATION_OF_DERIVATIVES_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "lines",
    chipLabel: "Lines notes",
    chapter: LINES_CHAPTER,
    notes: LINES_NOTES,
    slugs: LINES_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Physics",
    subjectRoute: "nda-physics",
    subjectDisplay: "NDA Physics",
    chapterSlug: "sound",
    chipLabel: "Sound notes",
    chapter: SOUND_CHAPTER,
    notes: SOUND_NOTES,
    slugs: SOUND_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Physics",
    subjectRoute: "nda-physics",
    subjectDisplay: "NDA Physics",
    chapterSlug: "electricity-and-magnetism",
    chipLabel: "Electricity & Magnetism notes",
    chapter: ELECTRICITY_AND_MAGNETISM_CHAPTER,
    notes: ELECTRICITY_AND_MAGNETISM_NOTES,
    slugs: ELECTRICITY_AND_MAGNETISM_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Maths",
    subjectRoute: "mht-cet-maths",
    subjectDisplay: "MHT-CET Maths",
    chapterSlug: "indefinite-integration",
    chipLabel: "Indefinite Integration notes",
    chapter: INDEFINITE_INTEGRATION_CHAPTER,
    notes: INDEFINITE_INTEGRATION_NOTES,
    slugs: INDEFINITE_INTEGRATION_SLUGS,
  },
];

/**
 * Look up a chapter registration by its (subjectRoute, chapterSlug) pair.
 * Returns null for an unknown combination.
 */
export function getNotesChapterBySlug(
  subjectRoute: string,
  chapterSlug: string
): NotesChapterRegistration | null {
  return (
    NOTES_CHAPTERS.find(
      (c) => c.subjectRoute === subjectRoute && c.chapterSlug === chapterSlug
    ) ?? null
  );
}

/**
 * All chapters under a given subject route, in registration order. Used by
 * the chapter-index page (and future subject landings) to render cards.
 * Returns an empty array for an unknown subject.
 */
export function getNotesChaptersForSubject(
  subjectRoute: string
): NotesChapterRegistration[] {
  return NOTES_CHAPTERS.filter((c) => c.subjectRoute === subjectRoute);
}
