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
  HUMAN_PHYSIOLOGY_CHAPTER,
  HUMAN_PHYSIOLOGY_NOTES,
  HUMAN_PHYSIOLOGY_SLUGS,
} from "@/app/notes/nda-biology/human-physiology/_data";
import {
  SETS_RELATIONS_CHAPTER,
  SETS_RELATIONS_NOTES,
  SETS_RELATIONS_SLUGS,
} from "@/app/notes/nda-maths/sets-relations/_data";
import {
  DEFINITE_INTEGRATION_CHAPTER,
  DEFINITE_INTEGRATION_NOTES,
  DEFINITE_INTEGRATION_SLUGS,
} from "@/app/notes/nda-maths/definite-integration/_data";
import {
  DIFFERENTIAL_EQUATIONS_CHAPTER,
  DIFFERENTIAL_EQUATIONS_NOTES,
  DIFFERENTIAL_EQUATIONS_SLUGS,
} from "@/app/notes/nda-maths/differential-equations/_data";
import {
  QUADRATIC_EQUATIONS_CHAPTER,
  QUADRATIC_EQUATIONS_NOTES,
  QUADRATIC_EQUATIONS_SLUGS,
} from "@/app/notes/nda-maths/quadratic-equations/_data";
import {
  BINOMIAL_THEOREM_CHAPTER,
  BINOMIAL_THEOREM_NOTES,
  BINOMIAL_THEOREM_SLUGS,
} from "@/app/notes/nda-maths/binomial-theorem/_data";
import {
  PROPERTIES_OF_TRIANGLE_CHAPTER,
  PROPERTIES_OF_TRIANGLE_NOTES,
  PROPERTIES_OF_TRIANGLE_SLUGS,
} from "@/app/notes/nda-maths/properties-of-triangle/_data";
import {
  CONICS_CHAPTER,
  CONICS_NOTES,
  CONICS_SLUGS,
} from "@/app/notes/nda-maths/conics/_data";
import {
  INVERSE_TRIGONOMETRY_CHAPTER,
  INVERSE_TRIGONOMETRY_NOTES,
  INVERSE_TRIGONOMETRY_SLUGS,
} from "@/app/notes/nda-maths/inverse-trigonometry/_data";
import {
  TRIGONOMETRIC_EQUATIONS_CHAPTER,
  TRIGONOMETRIC_EQUATIONS_NOTES,
  TRIGONOMETRIC_EQUATIONS_SLUGS,
} from "@/app/notes/nda-maths/trigonometric-equations/_data";
import {
  CIRCLES_CHAPTER,
  CIRCLES_NOTES,
  CIRCLES_SLUGS,
} from "@/app/notes/nda-maths/circles/_data";
import {
  LOGARITHMS_CHAPTER,
  LOGARITHMS_NOTES,
  LOGARITHMS_SLUGS,
} from "@/app/notes/nda-maths/logarithms/_data";
import {
  APPLICATIONS_OF_INTEGRATION_CHAPTER,
  APPLICATIONS_OF_INTEGRATION_NOTES,
  APPLICATIONS_OF_INTEGRATION_SLUGS,
} from "@/app/notes/nda-maths/applications-of-integration/_data";
import {
  HEIGHT_DISTANCE_CHAPTER,
  HEIGHT_DISTANCE_NOTES,
  HEIGHT_DISTANCE_SLUGS,
} from "@/app/notes/nda-maths/height-distance/_data";
import {
  BINARY_NUMBERS_CHAPTER,
  BINARY_NUMBERS_NOTES,
  BINARY_NUMBERS_SLUGS,
} from "@/app/notes/nda-maths/binary-numbers/_data";
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
import {
  PERMUTATION_COMBINATION_CHAPTER,
  PERMUTATION_COMBINATION_NOTES,
  PERMUTATION_COMBINATION_SLUGS,
} from "@/app/notes/nda-maths/permutation-combination/_data";
import {
  COMPLEX_NUMBERS_CHAPTER,
  COMPLEX_NUMBERS_NOTES,
  COMPLEX_NUMBERS_SLUGS,
} from "@/app/notes/nda-maths/complex-numbers/_data";
import {
  CARBON_CHAPTER,
  CARBON_NOTES,
  CARBON_SLUGS,
} from "@/app/notes/nda-chemistry/carbon-and-its-compounds/_data";
import {
  ATOMIC_STRUCTURE_CHAPTER,
  ATOMIC_STRUCTURE_NOTES,
  ATOMIC_STRUCTURE_SLUGS,
} from "@/app/notes/nda-chemistry/atomic-structure/_data";
import {
  ACIDS_BASES_SALTS_CHAPTER,
  ACIDS_BASES_SALTS_NOTES,
  ACIDS_BASES_SALTS_SLUGS,
} from "@/app/notes/nda-chemistry/acids-bases-salts/_data";
import {
  MATTER_STATES_CHAPTER,
  MATTER_STATES_NOTES,
  MATTER_STATES_SLUGS,
} from "@/app/notes/nda-chemistry/matter-states/_data";
import {
  CHEMICAL_REACTIONS_CHAPTER,
  CHEMICAL_REACTIONS_NOTES,
  CHEMICAL_REACTIONS_SLUGS,
} from "@/app/notes/nda-chemistry/chemical-reactions/_data";
import {
  INDUSTRIAL_CHEMISTRY_CHAPTER,
  INDUSTRIAL_CHEMISTRY_NOTES,
  INDUSTRIAL_CHEMISTRY_SLUGS,
} from "@/app/notes/nda-chemistry/industrial-chemistry/_data";
import {
  MOLE_CONCEPT_CHAPTER,
  MOLE_CONCEPT_NOTES,
  MOLE_CONCEPT_SLUGS,
} from "@/app/notes/nda-chemistry/mole-concept/_data";
import {
  METALS_NON_METALS_CHAPTER,
  METALS_NON_METALS_NOTES,
  METALS_NON_METALS_SLUGS,
} from "@/app/notes/nda-chemistry/metals-non-metals/_data";
import {
  HYDROGEN_WATER_CHAPTER,
  HYDROGEN_WATER_NOTES,
  HYDROGEN_WATER_SLUGS,
} from "@/app/notes/nda-chemistry/hydrogen-water/_data";
import {
  CHEMICAL_BONDING_CHAPTER,
  CHEMICAL_BONDING_NOTES,
  CHEMICAL_BONDING_SLUGS,
} from "@/app/notes/nda-chemistry/chemical-bonding/_data";
import {
  EVERYDAY_LIFE_CHAPTER,
  EVERYDAY_LIFE_NOTES,
  EVERYDAY_LIFE_SLUGS,
} from "@/app/notes/nda-chemistry/everyday-life/_data";
import {
  LIGHT_OPTICS_CHAPTER,
  LIGHT_OPTICS_NOTES,
  LIGHT_OPTICS_SLUGS,
} from "@/app/notes/nda-physics/light-optics/_data";
import {
  LAWS_OF_MOTION_CHAPTER,
  LAWS_OF_MOTION_NOTES,
  LAWS_OF_MOTION_SLUGS,
} from "@/app/notes/nda-physics/laws-of-motion/_data";
import {
  HEAT_THERMODYNAMICS_CHAPTER,
  HEAT_THERMODYNAMICS_NOTES,
  HEAT_THERMODYNAMICS_SLUGS,
} from "@/app/notes/nda-physics/heat-thermodynamics/_data";
import {
  MODERN_PHYSICS_CHAPTER,
  MODERN_PHYSICS_NOTES,
  MODERN_PHYSICS_SLUGS,
} from "@/app/notes/nda-physics/modern-physics/_data";
import {
  KINEMATICS_CHAPTER,
  KINEMATICS_NOTES,
  KINEMATICS_SLUGS,
} from "@/app/notes/nda-physics/kinematics/_data";
import {
  FLUID_MECHANICS_CHAPTER,
  FLUID_MECHANICS_NOTES,
  FLUID_MECHANICS_SLUGS,
} from "@/app/notes/nda-physics/fluid-mechanics/_data";
import {
  WORK_ENERGY_POWER_CHAPTER,
  WORK_ENERGY_POWER_NOTES,
  WORK_ENERGY_POWER_SLUGS,
} from "@/app/notes/nda-physics/work-energy-power/_data";
import {
  GRAVITATION_CHAPTER,
  GRAVITATION_NOTES,
  GRAVITATION_SLUGS,
} from "@/app/notes/nda-physics/gravitation/_data";
import {
  UNITS_MEASUREMENT_CHAPTER,
  UNITS_MEASUREMENT_NOTES,
  UNITS_MEASUREMENT_SLUGS,
} from "@/app/notes/nda-physics/units-measurement-dimensions/_data";
import {
  OSCILLATIONS_CHAPTER,
  OSCILLATIONS_NOTES,
  OSCILLATIONS_SLUGS,
} from "@/app/notes/nda-physics/oscillations-waves/_data";
import {
  CELL_BIOLOGY_CHAPTER,
  CELL_BIOLOGY_NOTES,
  CELL_BIOLOGY_SLUGS,
} from "@/app/notes/nda-biology/cell-biology/_data";
import {
  PLANT_BIOLOGY_CHAPTER,
  PLANT_BIOLOGY_NOTES,
  PLANT_BIOLOGY_SLUGS,
} from "@/app/notes/nda-biology/plant-biology/_data";
import {
  MICROBIOLOGY_CHAPTER,
  MICROBIOLOGY_NOTES,
  MICROBIOLOGY_SLUGS,
} from "@/app/notes/nda-biology/microbiology-and-disease/_data";
import {
  REPRODUCTION_CHAPTER,
  REPRODUCTION_NOTES,
  REPRODUCTION_SLUGS,
} from "@/app/notes/nda-biology/reproduction/_data";
import {
  ECOLOGY_CHAPTER,
  ECOLOGY_NOTES,
  ECOLOGY_SLUGS,
} from "@/app/notes/nda-biology/ecology-and-environment/_data";
import {
  BIODIVERSITY_CHAPTER,
  BIODIVERSITY_NOTES,
  BIODIVERSITY_SLUGS,
} from "@/app/notes/nda-biology/biodiversity-and-classification/_data";
import {
  GENETICS_EVOLUTION_CHAPTER,
  GENETICS_EVOLUTION_NOTES,
  GENETICS_EVOLUTION_SLUGS,
} from "@/app/notes/nda-biology/genetics-and-evolution/_data";
import {
  BIOCHEMISTRY_CHAPTER,
  BIOCHEMISTRY_NOTES,
  BIOCHEMISTRY_SLUGS,
} from "@/app/notes/nda-biology/biochemistry/_data";
import {
  EARTHS_STRUCTURE_CHAPTER,
  EARTHS_STRUCTURE_NOTES,
  EARTHS_STRUCTURE_SLUGS,
} from "@/app/notes/nda-geography/earths-structure/_data";

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
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "permutation-combination",
    chipLabel: "Permutation & Combination notes",
    chapter: PERMUTATION_COMBINATION_CHAPTER,
    notes: PERMUTATION_COMBINATION_NOTES,
    slugs: PERMUTATION_COMBINATION_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "complex-numbers",
    chipLabel: "Complex Numbers notes",
    chapter: COMPLEX_NUMBERS_CHAPTER,
    notes: COMPLEX_NUMBERS_NOTES,
    slugs: COMPLEX_NUMBERS_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "sets-relations",
    chipLabel: "Sets & Relations notes",
    chapter: SETS_RELATIONS_CHAPTER,
    notes: SETS_RELATIONS_NOTES,
    slugs: SETS_RELATIONS_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "definite-integration",
    chipLabel: "Definite Integration notes",
    chapter: DEFINITE_INTEGRATION_CHAPTER,
    notes: DEFINITE_INTEGRATION_NOTES,
    slugs: DEFINITE_INTEGRATION_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "differential-equations",
    chipLabel: "Differential Equations notes",
    chapter: DIFFERENTIAL_EQUATIONS_CHAPTER,
    notes: DIFFERENTIAL_EQUATIONS_NOTES,
    slugs: DIFFERENTIAL_EQUATIONS_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "quadratic-equations",
    chipLabel: "Quadratic Equations notes",
    chapter: QUADRATIC_EQUATIONS_CHAPTER,
    notes: QUADRATIC_EQUATIONS_NOTES,
    slugs: QUADRATIC_EQUATIONS_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "binomial-theorem",
    chipLabel: "Binomial Theorem notes",
    chapter: BINOMIAL_THEOREM_CHAPTER,
    notes: BINOMIAL_THEOREM_NOTES,
    slugs: BINOMIAL_THEOREM_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "properties-of-triangle",
    chipLabel: "Properties of Triangle notes",
    chapter: PROPERTIES_OF_TRIANGLE_CHAPTER,
    notes: PROPERTIES_OF_TRIANGLE_NOTES,
    slugs: PROPERTIES_OF_TRIANGLE_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "conics",
    chipLabel: "Conics notes",
    chapter: CONICS_CHAPTER,
    notes: CONICS_NOTES,
    slugs: CONICS_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "inverse-trigonometry",
    chipLabel: "Inverse Trigonometry notes",
    chapter: INVERSE_TRIGONOMETRY_CHAPTER,
    notes: INVERSE_TRIGONOMETRY_NOTES,
    slugs: INVERSE_TRIGONOMETRY_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "trigonometric-equations",
    chipLabel: "Trigonometric Equations notes",
    chapter: TRIGONOMETRIC_EQUATIONS_CHAPTER,
    notes: TRIGONOMETRIC_EQUATIONS_NOTES,
    slugs: TRIGONOMETRIC_EQUATIONS_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "circles",
    chipLabel: "Circles notes",
    chapter: CIRCLES_CHAPTER,
    notes: CIRCLES_NOTES,
    slugs: CIRCLES_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "logarithms",
    chipLabel: "Logarithms notes",
    chapter: LOGARITHMS_CHAPTER,
    notes: LOGARITHMS_NOTES,
    slugs: LOGARITHMS_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "applications-of-integration",
    chipLabel: "Applications of Integration notes",
    chapter: APPLICATIONS_OF_INTEGRATION_CHAPTER,
    notes: APPLICATIONS_OF_INTEGRATION_NOTES,
    slugs: APPLICATIONS_OF_INTEGRATION_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "height-distance",
    chipLabel: "Height & Distance notes",
    chapter: HEIGHT_DISTANCE_CHAPTER,
    notes: HEIGHT_DISTANCE_NOTES,
    slugs: HEIGHT_DISTANCE_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Mathematics",
    subjectRoute: "nda-maths",
    subjectDisplay: "NDA Maths",
    chapterSlug: "binary-numbers",
    chipLabel: "Binary Numbers notes",
    chapter: BINARY_NUMBERS_CHAPTER,
    notes: BINARY_NUMBERS_NOTES,
    slugs: BINARY_NUMBERS_SLUGS,
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
  {
    examName: "NDA",
    subjectName: "Biology",
    subjectRoute: "nda-biology",
    subjectDisplay: "NDA Biology",
    chapterSlug: "human-physiology",
    chipLabel: "Human Physiology notes",
    chapter: HUMAN_PHYSIOLOGY_CHAPTER,
    notes: HUMAN_PHYSIOLOGY_NOTES,
    slugs: HUMAN_PHYSIOLOGY_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Biology",
    subjectRoute: "nda-biology",
    subjectDisplay: "NDA Biology",
    chapterSlug: "cell-biology",
    chipLabel: "Cell Biology notes",
    chapter: CELL_BIOLOGY_CHAPTER,
    notes: CELL_BIOLOGY_NOTES,
    slugs: CELL_BIOLOGY_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Biology",
    subjectRoute: "nda-biology",
    subjectDisplay: "NDA Biology",
    chapterSlug: "microbiology-and-disease",
    chipLabel: "Microbiology & Disease notes",
    chapter: MICROBIOLOGY_CHAPTER,
    notes: MICROBIOLOGY_NOTES,
    slugs: MICROBIOLOGY_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Biology",
    subjectRoute: "nda-biology",
    subjectDisplay: "NDA Biology",
    chapterSlug: "biodiversity-and-classification",
    chipLabel: "Biodiversity & Classification notes",
    chapter: BIODIVERSITY_CHAPTER,
    notes: BIODIVERSITY_NOTES,
    slugs: BIODIVERSITY_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Biology",
    subjectRoute: "nda-biology",
    subjectDisplay: "NDA Biology",
    chapterSlug: "plant-biology",
    chipLabel: "Plant Biology notes",
    chapter: PLANT_BIOLOGY_CHAPTER,
    notes: PLANT_BIOLOGY_NOTES,
    slugs: PLANT_BIOLOGY_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Biology",
    subjectRoute: "nda-biology",
    subjectDisplay: "NDA Biology",
    chapterSlug: "reproduction",
    chipLabel: "Reproduction notes",
    chapter: REPRODUCTION_CHAPTER,
    notes: REPRODUCTION_NOTES,
    slugs: REPRODUCTION_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Biology",
    subjectRoute: "nda-biology",
    subjectDisplay: "NDA Biology",
    chapterSlug: "ecology-and-environment",
    chipLabel: "Ecology & Environment notes",
    chapter: ECOLOGY_CHAPTER,
    notes: ECOLOGY_NOTES,
    slugs: ECOLOGY_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Biology",
    subjectRoute: "nda-biology",
    subjectDisplay: "NDA Biology",
    chapterSlug: "genetics-and-evolution",
    chipLabel: "Genetics & Evolution notes",
    chapter: GENETICS_EVOLUTION_CHAPTER,
    notes: GENETICS_EVOLUTION_NOTES,
    slugs: GENETICS_EVOLUTION_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Biology",
    subjectRoute: "nda-biology",
    subjectDisplay: "NDA Biology",
    chapterSlug: "biochemistry",
    chipLabel: "Biochemistry notes",
    chapter: BIOCHEMISTRY_CHAPTER,
    notes: BIOCHEMISTRY_NOTES,
    slugs: BIOCHEMISTRY_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Chemistry",
    subjectRoute: "nda-chemistry",
    subjectDisplay: "NDA Chemistry",
    chapterSlug: "carbon-and-its-compounds",
    chipLabel: "Carbon notes",
    chapter: CARBON_CHAPTER,
    notes: CARBON_NOTES,
    slugs: CARBON_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Chemistry",
    subjectRoute: "nda-chemistry",
    subjectDisplay: "NDA Chemistry",
    chapterSlug: "atomic-structure",
    chipLabel: "Atomic Structure notes",
    chapter: ATOMIC_STRUCTURE_CHAPTER,
    notes: ATOMIC_STRUCTURE_NOTES,
    slugs: ATOMIC_STRUCTURE_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Chemistry",
    subjectRoute: "nda-chemistry",
    subjectDisplay: "NDA Chemistry",
    chapterSlug: "acids-bases-salts",
    chipLabel: "Acids, Bases & Salts notes",
    chapter: ACIDS_BASES_SALTS_CHAPTER,
    notes: ACIDS_BASES_SALTS_NOTES,
    slugs: ACIDS_BASES_SALTS_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Chemistry",
    subjectRoute: "nda-chemistry",
    subjectDisplay: "NDA Chemistry",
    chapterSlug: "matter-states",
    chipLabel: "Matter & Its States notes",
    chapter: MATTER_STATES_CHAPTER,
    notes: MATTER_STATES_NOTES,
    slugs: MATTER_STATES_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Chemistry",
    subjectRoute: "nda-chemistry",
    subjectDisplay: "NDA Chemistry",
    chapterSlug: "chemical-reactions",
    chipLabel: "Chemical Reactions notes",
    chapter: CHEMICAL_REACTIONS_CHAPTER,
    notes: CHEMICAL_REACTIONS_NOTES,
    slugs: CHEMICAL_REACTIONS_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Chemistry",
    subjectRoute: "nda-chemistry",
    subjectDisplay: "NDA Chemistry",
    chapterSlug: "industrial-chemistry",
    chipLabel: "Industrial Chemistry notes",
    chapter: INDUSTRIAL_CHEMISTRY_CHAPTER,
    notes: INDUSTRIAL_CHEMISTRY_NOTES,
    slugs: INDUSTRIAL_CHEMISTRY_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Chemistry",
    subjectRoute: "nda-chemistry",
    subjectDisplay: "NDA Chemistry",
    chapterSlug: "mole-concept",
    chipLabel: "Mole Concept notes",
    chapter: MOLE_CONCEPT_CHAPTER,
    notes: MOLE_CONCEPT_NOTES,
    slugs: MOLE_CONCEPT_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Chemistry",
    subjectRoute: "nda-chemistry",
    subjectDisplay: "NDA Chemistry",
    chapterSlug: "metals-non-metals",
    chipLabel: "Metals & Non-Metals notes",
    chapter: METALS_NON_METALS_CHAPTER,
    notes: METALS_NON_METALS_NOTES,
    slugs: METALS_NON_METALS_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Chemistry",
    subjectRoute: "nda-chemistry",
    subjectDisplay: "NDA Chemistry",
    chapterSlug: "hydrogen-water",
    chipLabel: "Hydrogen & Water notes",
    chapter: HYDROGEN_WATER_CHAPTER,
    notes: HYDROGEN_WATER_NOTES,
    slugs: HYDROGEN_WATER_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Chemistry",
    subjectRoute: "nda-chemistry",
    subjectDisplay: "NDA Chemistry",
    chapterSlug: "chemical-bonding",
    chipLabel: "Chemical Bonding notes",
    chapter: CHEMICAL_BONDING_CHAPTER,
    notes: CHEMICAL_BONDING_NOTES,
    slugs: CHEMICAL_BONDING_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Chemistry",
    subjectRoute: "nda-chemistry",
    subjectDisplay: "NDA Chemistry",
    chapterSlug: "everyday-life",
    chipLabel: "Chemistry in Everyday Life notes",
    chapter: EVERYDAY_LIFE_CHAPTER,
    notes: EVERYDAY_LIFE_NOTES,
    slugs: EVERYDAY_LIFE_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Physics",
    subjectRoute: "nda-physics",
    subjectDisplay: "NDA Physics",
    chapterSlug: "light-optics",
    chipLabel: "Light & Optics notes",
    chapter: LIGHT_OPTICS_CHAPTER,
    notes: LIGHT_OPTICS_NOTES,
    slugs: LIGHT_OPTICS_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Physics",
    subjectRoute: "nda-physics",
    subjectDisplay: "NDA Physics",
    chapterSlug: "laws-of-motion",
    chipLabel: "Laws of Motion notes",
    chapter: LAWS_OF_MOTION_CHAPTER,
    notes: LAWS_OF_MOTION_NOTES,
    slugs: LAWS_OF_MOTION_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Physics",
    subjectRoute: "nda-physics",
    subjectDisplay: "NDA Physics",
    chapterSlug: "heat-thermodynamics",
    chipLabel: "Heat & Thermodynamics notes",
    chapter: HEAT_THERMODYNAMICS_CHAPTER,
    notes: HEAT_THERMODYNAMICS_NOTES,
    slugs: HEAT_THERMODYNAMICS_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Physics",
    subjectRoute: "nda-physics",
    subjectDisplay: "NDA Physics",
    chapterSlug: "modern-physics",
    chipLabel: "Modern Physics notes",
    chapter: MODERN_PHYSICS_CHAPTER,
    notes: MODERN_PHYSICS_NOTES,
    slugs: MODERN_PHYSICS_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Physics",
    subjectRoute: "nda-physics",
    subjectDisplay: "NDA Physics",
    chapterSlug: "kinematics",
    chipLabel: "Kinematics notes",
    chapter: KINEMATICS_CHAPTER,
    notes: KINEMATICS_NOTES,
    slugs: KINEMATICS_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Physics",
    subjectRoute: "nda-physics",
    subjectDisplay: "NDA Physics",
    chapterSlug: "fluid-mechanics",
    chipLabel: "Fluid Mechanics notes",
    chapter: FLUID_MECHANICS_CHAPTER,
    notes: FLUID_MECHANICS_NOTES,
    slugs: FLUID_MECHANICS_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Physics",
    subjectRoute: "nda-physics",
    subjectDisplay: "NDA Physics",
    chapterSlug: "work-energy-power",
    chipLabel: "Work, Energy & Power notes",
    chapter: WORK_ENERGY_POWER_CHAPTER,
    notes: WORK_ENERGY_POWER_NOTES,
    slugs: WORK_ENERGY_POWER_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Physics",
    subjectRoute: "nda-physics",
    subjectDisplay: "NDA Physics",
    chapterSlug: "gravitation",
    chipLabel: "Gravitation notes",
    chapter: GRAVITATION_CHAPTER,
    notes: GRAVITATION_NOTES,
    slugs: GRAVITATION_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Physics",
    subjectRoute: "nda-physics",
    subjectDisplay: "NDA Physics",
    chapterSlug: "units-measurement-dimensions",
    chipLabel: "Units & Measurement notes",
    chapter: UNITS_MEASUREMENT_CHAPTER,
    notes: UNITS_MEASUREMENT_NOTES,
    slugs: UNITS_MEASUREMENT_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Physics",
    subjectRoute: "nda-physics",
    subjectDisplay: "NDA Physics",
    chapterSlug: "oscillations-waves",
    chipLabel: "Oscillations & Waves notes",
    chapter: OSCILLATIONS_CHAPTER,
    notes: OSCILLATIONS_NOTES,
    slugs: OSCILLATIONS_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Geography",
    subjectRoute: "nda-geography",
    subjectDisplay: "NDA Geography",
    chapterSlug: "earths-structure",
    chipLabel: "Earth's Structure notes",
    chapter: EARTHS_STRUCTURE_CHAPTER,
    notes: EARTHS_STRUCTURE_NOTES,
    slugs: EARTHS_STRUCTURE_SLUGS,
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
