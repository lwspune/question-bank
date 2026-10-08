/**
 * IMAT teaching notes: the niche site's own registry.
 *
 * The chapters use the /notes data shapes, so the shared notes components
 * render them, but they are registered HERE and never in NOTES_CHAPTERS:
 * everything NOTES_CHAPTERS feeds (the PYQ Vault nav, sitemap, /notes index,
 * notes-lint) must never show IMAT (NICHE_SITES_SPEC.md). Today only the
 * superadmin preview at /dashboard/imat-notes reads this; the IMAT site's
 * /notes pages will read it once that site exists.
 *
 * Differences from PYQ Vault notes (pinned by tests/imat-notes.test.ts):
 * no featured past question (every IMAT row is PRIVATE, and 2011-2022 can
 * never be published), and every concept ends in a five-option self-check
 * written the way IMAT asks.
 *
 * Adding a chapter: write `<subject>/<chapter>/` (chapter.ts, one file per
 * page, index.ts), then append one entry below.
 */
import type { NotesChapterRegistration } from "@/lib/notes/chapters";
import type { ChapterNote, SubtopicNote } from "@/app/notes/_types";
import {
  IMAT_PHY_FLUIDS_CHAPTER,
  IMAT_PHY_FLUIDS_NOTES,
  IMAT_PHY_FLUIDS_SLUGS,
} from "./physics/fluids";
import {
  IMAT_BIO_CSM_CHAPTER,
  IMAT_BIO_CSM_NOTES,
  IMAT_BIO_CSM_SLUGS,
} from "./biology/cell-structure-membranes";
import {
  IMAT_BIO_BMO_CHAPTER,
  IMAT_BIO_BMO_NOTES,
  IMAT_BIO_BMO_SLUGS,
} from "./biology/biomolecules-enzymes";
import {
  IMAT_BIO_BEM_CHAPTER,
  IMAT_BIO_BEM_NOTES,
  IMAT_BIO_BEM_SLUGS,
} from "./biology/bioenergetics-metabolism";
import {
  IMAT_BIO_MOL_CHAPTER,
  IMAT_BIO_MOL_NOTES,
  IMAT_BIO_MOL_SLUGS,
} from "./biology/molecular-biology";
import {
  IMAT_BIO_GEN_CHAPTER,
  IMAT_BIO_GEN_NOTES,
  IMAT_BIO_GEN_SLUGS,
} from "./biology/genetics";
import {
  IMAT_BIO_CDR_CHAPTER,
  IMAT_BIO_CDR_NOTES,
  IMAT_BIO_CDR_SLUGS,
} from "./biology/cell-division-reproduction";
import {
  IMAT_BIO_EVO_CHAPTER,
  IMAT_BIO_EVO_NOTES,
  IMAT_BIO_EVO_SLUGS,
} from "./biology/evolution-ecology";
import {
  IMAT_BIO_MBT_CHAPTER,
  IMAT_BIO_MBT_NOTES,
  IMAT_BIO_MBT_SLUGS,
} from "./biology/microorganisms-biotechnology";
import {
  IMAT_CHE_ORG_CHAPTER,
  IMAT_CHE_ORG_NOTES,
  IMAT_CHE_ORG_SLUGS,
} from "./chemistry/organic-chemistry";
import {
  IMAT_BIO_HAP_CHAPTER,
  IMAT_BIO_HAP_NOTES,
  IMAT_BIO_HAP_SLUGS,
} from "./biology/human-anatomy-physiology";
import {
  IMAT_PHY_ELE_CHAPTER,
  IMAT_PHY_ELE_NOTES,
  IMAT_PHY_ELE_SLUGS,
} from "./physics/electricity";
import {
  IMAT_PHY_MAG_CHAPTER,
  IMAT_PHY_MAG_NOTES,
  IMAT_PHY_MAG_SLUGS,
} from "./physics/magnetism";
import {
  IMAT_PHY_HTH_CHAPTER,
  IMAT_PHY_HTH_NOTES,
  IMAT_PHY_HTH_SLUGS,
} from "./physics/heat-thermodynamics";
import {
  IMAT_PHY_OSW_CHAPTER,
  IMAT_PHY_OSW_NOTES,
  IMAT_PHY_OSW_SLUGS,
} from "./physics/oscillations-waves";
import {
  IMAT_PHY_OPT_CHAPTER,
  IMAT_PHY_OPT_NOTES,
  IMAT_PHY_OPT_SLUGS,
} from "./physics/optics";
import {
  IMAT_LOG_CRT_CHAPTER,
  IMAT_LOG_CRT_NOTES,
  IMAT_LOG_CRT_SLUGS,
} from "./logic/critical-thinking";

export type ImatNotesSubject = {
  /** URL segment, e.g. "imat-biology". */
  subjectRoute: string;
  /** The `subjects.name` under the IMAT exam. */
  subjectName: string;
  /** Display name, e.g. "IMAT Biology". */
  subjectDisplay: string;
};

export const IMAT_NOTES_SUBJECTS: readonly ImatNotesSubject[] = [
  { subjectRoute: "imat-biology", subjectName: "Biology", subjectDisplay: "IMAT Biology" },
  { subjectRoute: "imat-chemistry", subjectName: "Chemistry", subjectDisplay: "IMAT Chemistry" },
  { subjectRoute: "imat-physics", subjectName: "Physics", subjectDisplay: "IMAT Physics" },
  { subjectRoute: "imat-maths", subjectName: "Mathematics", subjectDisplay: "IMAT Mathematics" },
  {
    subjectRoute: "imat-logic",
    subjectName: "Logical Reasoning and Problem Solving",
    subjectDisplay: "IMAT Logical Reasoning",
  },
  {
    subjectRoute: "imat-reading",
    subjectName: "Reading Skills and General Knowledge",
    subjectDisplay: "IMAT Reading Skills and General Knowledge",
  },
];

function entry(
  subjectRoute: string,
  chapterSlug: string,
  chapter: ChapterNote,
  notes: Record<string, SubtopicNote>,
  slugs: string[]
): NotesChapterRegistration {
  const subject = IMAT_NOTES_SUBJECTS.find((s) => s.subjectRoute === subjectRoute);
  if (!subject) throw new Error(`Unknown IMAT subject route: ${subjectRoute}`);
  return {
    examName: "IMAT",
    subjectName: subject.subjectName,
    subjectRoute,
    subjectDisplay: subject.subjectDisplay,
    chapterSlug,
    chipLabel: `${chapter.chapterName} notes`,
    chapter,
    notes,
    slugs,
  };
}

export const IMAT_NOTES_CHAPTERS: readonly NotesChapterRegistration[] = [
  // Biology
  entry("imat-biology", "cell-structure-membranes", IMAT_BIO_CSM_CHAPTER, IMAT_BIO_CSM_NOTES, IMAT_BIO_CSM_SLUGS),
  entry("imat-biology", "biomolecules-enzymes", IMAT_BIO_BMO_CHAPTER, IMAT_BIO_BMO_NOTES, IMAT_BIO_BMO_SLUGS),
  entry("imat-biology", "bioenergetics-metabolism", IMAT_BIO_BEM_CHAPTER, IMAT_BIO_BEM_NOTES, IMAT_BIO_BEM_SLUGS),
  entry("imat-biology", "molecular-biology", IMAT_BIO_MOL_CHAPTER, IMAT_BIO_MOL_NOTES, IMAT_BIO_MOL_SLUGS),
  entry("imat-biology", "genetics", IMAT_BIO_GEN_CHAPTER, IMAT_BIO_GEN_NOTES, IMAT_BIO_GEN_SLUGS),
  entry("imat-biology", "cell-division-reproduction", IMAT_BIO_CDR_CHAPTER, IMAT_BIO_CDR_NOTES, IMAT_BIO_CDR_SLUGS),
  entry("imat-biology", "evolution-ecology", IMAT_BIO_EVO_CHAPTER, IMAT_BIO_EVO_NOTES, IMAT_BIO_EVO_SLUGS),
  entry("imat-biology", "microorganisms-biotechnology", IMAT_BIO_MBT_CHAPTER, IMAT_BIO_MBT_NOTES, IMAT_BIO_MBT_SLUGS),
  entry("imat-biology", "human-anatomy-physiology", IMAT_BIO_HAP_CHAPTER, IMAT_BIO_HAP_NOTES, IMAT_BIO_HAP_SLUGS),
  // Chemistry
  entry("imat-chemistry", "organic-chemistry", IMAT_CHE_ORG_CHAPTER, IMAT_CHE_ORG_NOTES, IMAT_CHE_ORG_SLUGS),
  // Physics
  entry("imat-physics", "fluids", IMAT_PHY_FLUIDS_CHAPTER, IMAT_PHY_FLUIDS_NOTES, IMAT_PHY_FLUIDS_SLUGS),
  entry("imat-physics", "electricity", IMAT_PHY_ELE_CHAPTER, IMAT_PHY_ELE_NOTES, IMAT_PHY_ELE_SLUGS),
  entry("imat-physics", "magnetism", IMAT_PHY_MAG_CHAPTER, IMAT_PHY_MAG_NOTES, IMAT_PHY_MAG_SLUGS),
  entry("imat-physics", "heat-thermodynamics", IMAT_PHY_HTH_CHAPTER, IMAT_PHY_HTH_NOTES, IMAT_PHY_HTH_SLUGS),
  entry("imat-physics", "oscillations-waves", IMAT_PHY_OSW_CHAPTER, IMAT_PHY_OSW_NOTES, IMAT_PHY_OSW_SLUGS),
  entry("imat-physics", "optics", IMAT_PHY_OPT_CHAPTER, IMAT_PHY_OPT_NOTES, IMAT_PHY_OPT_SLUGS),
  // Logic
  entry("imat-logic", "critical-thinking", IMAT_LOG_CRT_CHAPTER, IMAT_LOG_CRT_NOTES, IMAT_LOG_CRT_SLUGS),
];

export function getImatSubject(subjectRoute: string): ImatNotesSubject | undefined {
  return IMAT_NOTES_SUBJECTS.find((s) => s.subjectRoute === subjectRoute);
}

export function getImatChapter(
  subjectRoute: string,
  chapterSlug: string
): NotesChapterRegistration | undefined {
  return IMAT_NOTES_CHAPTERS.find(
    (c) => c.subjectRoute === subjectRoute && c.chapterSlug === chapterSlug
  );
}

export function imatChaptersOf(subjectRoute: string): NotesChapterRegistration[] {
  return IMAT_NOTES_CHAPTERS.filter((c) => c.subjectRoute === subjectRoute);
}
