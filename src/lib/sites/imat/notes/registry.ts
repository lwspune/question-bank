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
import {
  IMAT_CHE_ATS_CHAPTER,
  IMAT_CHE_ATS_NOTES,
  IMAT_CHE_ATS_SLUGS,
} from "./chemistry/atomic-structure";
import {
  IMAT_CHE_PTB_CHAPTER,
  IMAT_CHE_PTB_NOTES,
  IMAT_CHE_PTB_SLUGS,
} from "./chemistry/periodic-table";
import {
  IMAT_CHE_BND_CHAPTER,
  IMAT_CHE_BND_NOTES,
  IMAT_CHE_BND_SLUGS,
} from "./chemistry/chemical-bonding";
import {
  IMAT_CHE_INO_CHAPTER,
  IMAT_CHE_INO_NOTES,
  IMAT_CHE_INO_SLUGS,
} from "./chemistry/inorganic-nomenclature";
import {
  IMAT_CHE_STO_CHAPTER,
  IMAT_CHE_STO_NOTES,
  IMAT_CHE_STO_SLUGS,
} from "./chemistry/stoichiometry-reactions";
import {
  IMAT_CHE_SOL_CHAPTER,
  IMAT_CHE_SOL_NOTES,
  IMAT_CHE_SOL_SLUGS,
} from "./chemistry/solutions-concentration";
import {
  IMAT_PHY_MU_CHAPTER,
  IMAT_PHY_MU_NOTES,
  IMAT_PHY_MU_SLUGS,
} from "./physics/measurement-units";
import {
  IMAT_PHY_KIN_CHAPTER,
  IMAT_PHY_KIN_NOTES,
  IMAT_PHY_KIN_SLUGS,
} from "./physics/kinematics";
import {
  IMAT_PHY_DYN_CHAPTER,
  IMAT_PHY_DYN_NOTES,
  IMAT_PHY_DYN_SLUGS,
} from "./physics/dynamics-work-energy";
import {
  IMAT_CHE_GAS_CHAPTER,
  IMAT_CHE_GAS_NOTES,
  IMAT_CHE_GAS_SLUGS,
} from "./chemistry/states-of-matter-gas-laws";
import {
  IMAT_CHE_EQK_CHAPTER,
  IMAT_CHE_EQK_NOTES,
  IMAT_CHE_EQK_SLUGS,
} from "./chemistry/equilibrium-kinetics-energetics";
import {
  IMAT_CHE_ABP_CHAPTER,
  IMAT_CHE_ABP_NOTES,
  IMAT_CHE_ABP_SLUGS,
} from "./chemistry/acids-bases-ph";
import {
  IMAT_CHE_RDX_CHAPTER,
  IMAT_CHE_RDX_NOTES,
  IMAT_CHE_RDX_SLUGS,
} from "./chemistry/redox";
import {
  IMAT_LOG_NUR_CHAPTER,
  IMAT_LOG_NUR_NOTES,
  IMAT_LOG_NUR_SLUGS,
} from "./logic/numerical-reasoning";
import {
  IMAT_LOG_DAT_CHAPTER,
  IMAT_LOG_DAT_NOTES,
  IMAT_LOG_DAT_SLUGS,
} from "./logic/data-interpretation";

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
  entry("imat-chemistry", "atomic-structure", IMAT_CHE_ATS_CHAPTER, IMAT_CHE_ATS_NOTES, IMAT_CHE_ATS_SLUGS),
  entry("imat-chemistry", "periodic-table", IMAT_CHE_PTB_CHAPTER, IMAT_CHE_PTB_NOTES, IMAT_CHE_PTB_SLUGS),
  entry("imat-chemistry", "chemical-bonding", IMAT_CHE_BND_CHAPTER, IMAT_CHE_BND_NOTES, IMAT_CHE_BND_SLUGS),
  entry("imat-chemistry", "inorganic-nomenclature", IMAT_CHE_INO_CHAPTER, IMAT_CHE_INO_NOTES, IMAT_CHE_INO_SLUGS),
  entry("imat-chemistry", "stoichiometry-reactions", IMAT_CHE_STO_CHAPTER, IMAT_CHE_STO_NOTES, IMAT_CHE_STO_SLUGS),
  entry("imat-chemistry", "solutions-concentration", IMAT_CHE_SOL_CHAPTER, IMAT_CHE_SOL_NOTES, IMAT_CHE_SOL_SLUGS),
  entry("imat-chemistry", "states-of-matter-gas-laws", IMAT_CHE_GAS_CHAPTER, IMAT_CHE_GAS_NOTES, IMAT_CHE_GAS_SLUGS),
  entry("imat-chemistry", "equilibrium-kinetics-energetics", IMAT_CHE_EQK_CHAPTER, IMAT_CHE_EQK_NOTES, IMAT_CHE_EQK_SLUGS),
  entry("imat-chemistry", "acids-bases-ph", IMAT_CHE_ABP_CHAPTER, IMAT_CHE_ABP_NOTES, IMAT_CHE_ABP_SLUGS),
  entry("imat-chemistry", "redox", IMAT_CHE_RDX_CHAPTER, IMAT_CHE_RDX_NOTES, IMAT_CHE_RDX_SLUGS),
  // Physics
  entry("imat-physics", "fluids", IMAT_PHY_FLUIDS_CHAPTER, IMAT_PHY_FLUIDS_NOTES, IMAT_PHY_FLUIDS_SLUGS),
  entry("imat-physics", "electricity", IMAT_PHY_ELE_CHAPTER, IMAT_PHY_ELE_NOTES, IMAT_PHY_ELE_SLUGS),
  entry("imat-physics", "magnetism", IMAT_PHY_MAG_CHAPTER, IMAT_PHY_MAG_NOTES, IMAT_PHY_MAG_SLUGS),
  entry("imat-physics", "heat-thermodynamics", IMAT_PHY_HTH_CHAPTER, IMAT_PHY_HTH_NOTES, IMAT_PHY_HTH_SLUGS),
  entry("imat-physics", "oscillations-waves", IMAT_PHY_OSW_CHAPTER, IMAT_PHY_OSW_NOTES, IMAT_PHY_OSW_SLUGS),
  entry("imat-physics", "optics", IMAT_PHY_OPT_CHAPTER, IMAT_PHY_OPT_NOTES, IMAT_PHY_OPT_SLUGS),
  entry("imat-physics", "measurement-units", IMAT_PHY_MU_CHAPTER, IMAT_PHY_MU_NOTES, IMAT_PHY_MU_SLUGS),
  entry("imat-physics", "kinematics", IMAT_PHY_KIN_CHAPTER, IMAT_PHY_KIN_NOTES, IMAT_PHY_KIN_SLUGS),
  entry("imat-physics", "dynamics-work-energy", IMAT_PHY_DYN_CHAPTER, IMAT_PHY_DYN_NOTES, IMAT_PHY_DYN_SLUGS),
  // Logic
  entry("imat-logic", "critical-thinking", IMAT_LOG_CRT_CHAPTER, IMAT_LOG_CRT_NOTES, IMAT_LOG_CRT_SLUGS),
  entry("imat-logic", "numerical-reasoning", IMAT_LOG_NUR_CHAPTER, IMAT_LOG_NUR_NOTES, IMAT_LOG_NUR_SLUGS),
  entry("imat-logic", "data-interpretation", IMAT_LOG_DAT_CHAPTER, IMAT_LOG_DAT_NOTES, IMAT_LOG_DAT_SLUGS),
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
