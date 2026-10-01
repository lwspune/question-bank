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
import { inBookOrder } from "@/lib/notes/bookOrder";
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
  DIFFERENTIATION_CHAPTER as MHTCET_DIFFERENTIATION_CHAPTER,
  DIFFERENTIATION_NOTES as MHTCET_DIFFERENTIATION_NOTES,
  DIFFERENTIATION_SLUGS as MHTCET_DIFFERENTIATION_SLUGS,
} from "@/app/notes/mht-cet-maths/differentiation/_data";
import {
  VECTORS_CHAPTER as MHTCET_VECTORS_CHAPTER,
  VECTORS_NOTES as MHTCET_VECTORS_NOTES,
  VECTORS_SLUGS as MHTCET_VECTORS_SLUGS,
} from "@/app/notes/mht-cet-maths/vectors/_data";
import {
  LINE_AND_PLANE_CHAPTER,
  LINE_AND_PLANE_NOTES,
  LINE_AND_PLANE_SLUGS,
} from "@/app/notes/mht-cet-maths/line-and-plane/_data";
import {
  APPLICATIONS_OF_DERIVATIVE_CHAPTER,
  APPLICATIONS_OF_DERIVATIVE_NOTES,
  APPLICATIONS_OF_DERIVATIVE_SLUGS,
} from "@/app/notes/mht-cet-maths/applications-of-derivative/_data";
import {
  DIFFERENTIAL_EQUATIONS_CHAPTER as MHTCET_DIFFERENTIAL_EQUATIONS_CHAPTER,
  DIFFERENTIAL_EQUATIONS_NOTES as MHTCET_DIFFERENTIAL_EQUATIONS_NOTES,
  DIFFERENTIAL_EQUATIONS_SLUGS as MHTCET_DIFFERENTIAL_EQUATIONS_SLUGS,
} from "@/app/notes/mht-cet-maths/differential-equations/_data";
import {
  PROBABILITY_DISTRIBUTION_CHAPTER,
  PROBABILITY_DISTRIBUTION_NOTES,
  PROBABILITY_DISTRIBUTION_SLUGS,
} from "@/app/notes/mht-cet-maths/probability-distribution/_data";
import {
  MATHEMATICAL_LOGIC_CHAPTER,
  MATHEMATICAL_LOGIC_NOTES,
  MATHEMATICAL_LOGIC_SLUGS,
} from "@/app/notes/mht-cet-maths/mathematical-logic/_data";
import {
  BINOMIAL_DISTRIBUTION_CHAPTER as MHTCET_BINOMIAL_DISTRIBUTION_CHAPTER,
  BINOMIAL_DISTRIBUTION_NOTES as MHTCET_BINOMIAL_DISTRIBUTION_NOTES,
  BINOMIAL_DISTRIBUTION_SLUGS as MHTCET_BINOMIAL_DISTRIBUTION_SLUGS,
} from "@/app/notes/mht-cet-maths/binomial-distribution/_data";
import {
  MHTCET_LIMITS_CHAPTER,
  MHTCET_LIMITS_NOTES,
  MHTCET_LIMITS_SLUGS,
} from "@/app/notes/mht-cet-maths/limits/_data";
import {
  MHTCET_TRIG_FUNCTIONS_CHAPTER,
  MHTCET_TRIG_FUNCTIONS_NOTES,
  MHTCET_TRIG_FUNCTIONS_SLUGS,
} from "@/app/notes/mht-cet-maths/trigonometric-functions/_data";
import {
  MHTCET_TRIG2_CHAPTER,
  MHTCET_TRIG2_NOTES,
  MHTCET_TRIG2_SLUGS,
} from "@/app/notes/mht-cet-maths/trigonometry-ii/_data";
import {
  MHTCET_CONICS_CHAPTER,
  MHTCET_CONICS_NOTES,
  MHTCET_CONICS_SLUGS,
} from "@/app/notes/mht-cet-maths/conic-sections/_data";
import {
  MHTCET_DEFINITE_INTEGRATION_CHAPTER,
  MHTCET_DEFINITE_INTEGRATION_NOTES,
  MHTCET_DEFINITE_INTEGRATION_SLUGS,
} from "@/app/notes/mht-cet-maths/definite-integration/_data";
import {
  MHTCET_APPLICATIONS_OF_DEFINITE_INTEGRAL_CHAPTER,
  MHTCET_APPLICATIONS_OF_DEFINITE_INTEGRAL_NOTES,
  MHTCET_APPLICATIONS_OF_DEFINITE_INTEGRAL_SLUGS,
} from "@/app/notes/mht-cet-maths/applications-of-definite-integral/_data";
import {
  MHTCET_DETERMINANTS_MATRICES_CHAPTER,
  MHTCET_DETERMINANTS_MATRICES_NOTES,
  MHTCET_DETERMINANTS_MATRICES_SLUGS,
} from "@/app/notes/mht-cet-maths/determinants-and-matrices/_data";
import {
  MHTCET_COMPLEX_NUMBERS_CHAPTER,
  MHTCET_COMPLEX_NUMBERS_NOTES,
  MHTCET_COMPLEX_NUMBERS_SLUGS,
} from "@/app/notes/mht-cet-maths/complex-numbers/_data";
import {
  MHTCET_PNC_CHAPTER,
  MHTCET_PNC_NOTES,
  MHTCET_PNC_SLUGS,
} from "@/app/notes/mht-cet-maths/permutations-and-combinations/_data";
import {
  MHTCET_SRF_CHAPTER,
  MHTCET_SRF_NOTES,
  MHTCET_SRF_SLUGS,
} from "@/app/notes/mht-cet-maths/sets-relations-and-functions/_data";
import {
  MHTCET_LPP_CHAPTER,
  MHTCET_LPP_NOTES,
  MHTCET_LPP_SLUGS,
} from "@/app/notes/mht-cet-maths/linear-programming/_data";
import {
  MHTCET_DISPERSION_CHAPTER,
  MHTCET_DISPERSION_NOTES,
  MHTCET_DISPERSION_SLUGS,
} from "@/app/notes/mht-cet-maths/measures-of-dispersion/_data";
import {
  MHTCET_STRAIGHT_LINE_CHAPTER,
  MHTCET_STRAIGHT_LINE_NOTES,
  MHTCET_STRAIGHT_LINE_SLUGS,
} from "@/app/notes/mht-cet-maths/straight-line/_data";
import {
  MHTCET_PAIR_OF_LINES_CHAPTER,
  MHTCET_PAIR_OF_LINES_NOTES,
  MHTCET_PAIR_OF_LINES_SLUGS,
} from "@/app/notes/mht-cet-maths/pair-of-straight-lines/_data";
import {
  MHTCET_CIRCLE_CHAPTER,
  MHTCET_CIRCLE_NOTES,
  MHTCET_CIRCLE_SLUGS,
} from "@/app/notes/mht-cet-maths/circle/_data";
import {
  JEE_MATRICES_CHAPTER,
  JEE_MATRICES_NOTES,
  JEE_MATRICES_SLUGS,
} from "@/app/notes/jee-mains-maths/matrices/_data";
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
import {
  INDIAN_GEOGRAPHY_ECONOMY_CHAPTER,
  INDIAN_GEOGRAPHY_ECONOMY_NOTES,
  INDIAN_GEOGRAPHY_ECONOMY_SLUGS,
} from "@/app/notes/nda-geography/indian-geography-economy/_data";
import {
  INDIAN_GEOGRAPHY_PHYSICAL_CHAPTER,
  INDIAN_GEOGRAPHY_PHYSICAL_NOTES,
  INDIAN_GEOGRAPHY_PHYSICAL_SLUGS,
} from "@/app/notes/nda-geography/indian-geography-physical/_data";
import {
  CLIMATOLOGY_CHAPTER,
  CLIMATOLOGY_NOTES,
  CLIMATOLOGY_SLUGS,
} from "@/app/notes/nda-geography/climatology/_data";
import {
  WORLD_HUMAN_GEOGRAPHY_CHAPTER,
  WORLD_HUMAN_GEOGRAPHY_NOTES,
  WORLD_HUMAN_GEOGRAPHY_SLUGS,
} from "@/app/notes/nda-geography/world-human-geography/_data";
import {
  EARTH_IN_SPACE_CHAPTER,
  EARTH_IN_SPACE_NOTES,
  EARTH_IN_SPACE_SLUGS,
} from "@/app/notes/nda-geography/earth-in-space/_data";
import {
  OCEANOGRAPHY_CHAPTER,
  OCEANOGRAPHY_NOTES,
  OCEANOGRAPHY_SLUGS,
} from "@/app/notes/nda-geography/oceanography/_data";
import {
  SOME_BASIC_CONCEPTS_CHAPTER,
  SOME_BASIC_CONCEPTS_NOTES,
  SOME_BASIC_CONCEPTS_SLUGS,
} from "@/app/notes/mht-cet-chemistry/some-basic-concepts/_data";
import {
  STRUCTURE_OF_ATOM_CHAPTER,
  STRUCTURE_OF_ATOM_NOTES,
  STRUCTURE_OF_ATOM_SLUGS,
} from "@/app/notes/mht-cet-chemistry/structure-of-atom/_data";
import {
  CHEMICAL_BONDING_CHAPTER as MHTCET_CHEMICAL_BONDING_CHAPTER,
  CHEMICAL_BONDING_NOTES as MHTCET_CHEMICAL_BONDING_NOTES,
  CHEMICAL_BONDING_SLUGS as MHTCET_CHEMICAL_BONDING_SLUGS,
} from "@/app/notes/mht-cet-chemistry/chemical-bonding/_data";
import {
  IONIC_EQUILIBRIA_CHAPTER,
  IONIC_EQUILIBRIA_NOTES,
  IONIC_EQUILIBRIA_SLUGS,
} from "@/app/notes/mht-cet-chemistry/ionic-equilibria/_data";
import {
  MHTCET_SOLUTIONS_CHAPTER,
  MHTCET_SOLUTIONS_NOTES,
  MHTCET_SOLUTIONS_SLUGS,
} from "@/app/notes/mht-cet-chemistry/solutions/_data";
import {
  MHTCET_KINETICS_CHAPTER,
  MHTCET_KINETICS_NOTES,
  MHTCET_KINETICS_SLUGS,
} from "@/app/notes/mht-cet-chemistry/chemical-kinetics/_data";
import {
  MHTCET_SOLID_STATE_CHAPTER,
  MHTCET_SOLID_STATE_NOTES,
  MHTCET_SOLID_STATE_SLUGS,
} from "@/app/notes/mht-cet-chemistry/solid-state/_data";
import {
  MHTCET_ELECTROCHEMISTRY_CHAPTER,
  MHTCET_ELECTROCHEMISTRY_NOTES,
  MHTCET_ELECTROCHEMISTRY_SLUGS,
} from "@/app/notes/mht-cet-chemistry/electrochemistry/_data";
import {
  MHTCET_THERMODYNAMICS_CHAPTER,
  MHTCET_THERMODYNAMICS_NOTES,
  MHTCET_THERMODYNAMICS_SLUGS,
} from "@/app/notes/mht-cet-chemistry/chemical-thermodynamics/_data";
import {
  MHTCET_BASIC_ORGANIC_CHAPTER,
  MHTCET_BASIC_ORGANIC_NOTES,
  MHTCET_BASIC_ORGANIC_SLUGS,
} from "@/app/notes/mht-cet-chemistry/basic-principles-of-organic-chemistry/_data";
import {
  MHTCET_HALOGEN_CHAPTER,
  MHTCET_HALOGEN_NOTES,
  MHTCET_HALOGEN_SLUGS,
} from "@/app/notes/mht-cet-chemistry/halogen-derivatives/_data";
import {
  MHTCET_ALCOHOLS_CHAPTER,
  MHTCET_ALCOHOLS_NOTES,
  MHTCET_ALCOHOLS_SLUGS,
} from "@/app/notes/mht-cet-chemistry/alcohols-phenols-and-ethers/_data";
import {
  MHTCET_CARBONYL_CHAPTER,
  MHTCET_CARBONYL_NOTES,
  MHTCET_CARBONYL_SLUGS,
} from "@/app/notes/mht-cet-chemistry/aldehydes-ketones-and-carboxylic-acids/_data";
import {
  MHTCET_AMINES_CHAPTER,
  MHTCET_AMINES_NOTES,
  MHTCET_AMINES_SLUGS,
} from "@/app/notes/mht-cet-chemistry/amines/_data";
import {
  MHTCET_BIOMOLECULES_CHAPTER,
  MHTCET_BIOMOLECULES_NOTES,
  MHTCET_BIOMOLECULES_SLUGS,
} from "@/app/notes/mht-cet-chemistry/biomolecules/_data";
import {
  MHTCET_POLYMERS_CHAPTER,
  MHTCET_POLYMERS_NOTES,
  MHTCET_POLYMERS_SLUGS,
} from "@/app/notes/mht-cet-chemistry/introduction-to-polymer-chemistry/_data";
import {
  MHTCET_COORDINATION_CHAPTER,
  MHTCET_COORDINATION_NOTES,
  MHTCET_COORDINATION_SLUGS,
} from "@/app/notes/mht-cet-chemistry/coordination-compounds/_data";
import {
  MHTCET_TRANSITION_CHAPTER,
  MHTCET_TRANSITION_NOTES,
  MHTCET_TRANSITION_SLUGS,
} from "@/app/notes/mht-cet-chemistry/transition-and-inner-transition-elements/_data";
import {
  MHTCET_GROUP16_CHAPTER,
  MHTCET_GROUP16_NOTES,
  MHTCET_GROUP16_SLUGS,
} from "@/app/notes/mht-cet-chemistry/elements-of-group-16-17-and-18/_data";
import {
  MHTCET_REDOX_CHAPTER,
  MHTCET_REDOX_NOTES,
  MHTCET_REDOX_SLUGS,
} from "@/app/notes/mht-cet-chemistry/redox-reactions/_data";
import {
  MHTCET_SURFACE_CHAPTER,
  MHTCET_SURFACE_NOTES,
  MHTCET_SURFACE_SLUGS,
} from "@/app/notes/mht-cet-chemistry/surface-chemistry/_data";
import {
  MHTCET_ALKENES_CHAPTER,
  MHTCET_ALKENES_NOTES,
  MHTCET_ALKENES_SLUGS,
} from "@/app/notes/mht-cet-chemistry/alkenes/_data";
import {
  MHTCET_GROUP12_CHAPTER,
  MHTCET_GROUP12_NOTES,
  MHTCET_GROUP12_SLUGS,
} from "@/app/notes/mht-cet-chemistry/elements-of-group-1-and-2/_data";
import {
  MHTCET_AROMATIC_CHAPTER,
  MHTCET_AROMATIC_NOTES,
  MHTCET_AROMATIC_SLUGS,
} from "@/app/notes/mht-cet-chemistry/aromatic-compounds/_data";
import {
  MHTCET_ALKANES_CHAPTER,
  MHTCET_ALKANES_NOTES,
  MHTCET_ALKANES_SLUGS,
} from "@/app/notes/mht-cet-chemistry/alkanes/_data";
import {
  MHTCET_GREEN_CHAPTER,
  MHTCET_GREEN_NOTES,
  MHTCET_GREEN_SLUGS,
} from "@/app/notes/mht-cet-chemistry/green-chemistry-and-nanochemistry/_data";
import {
  MHTCET_MPT_CHAPTER,
  MHTCET_MPT_NOTES,
  MHTCET_MPT_SLUGS,
} from "@/app/notes/mht-cet-chemistry/modern-periodic-table/_data";
import {
  MHTCET_ALKYNES_CHAPTER,
  MHTCET_ALKYNES_NOTES,
  MHTCET_ALKYNES_SLUGS,
} from "@/app/notes/mht-cet-chemistry/alkynes/_data";
import {
  MHTCET_ELECTROSTATICS_CHAPTER,
  MHTCET_ELECTROSTATICS_NOTES,
  MHTCET_ELECTROSTATICS_SLUGS,
} from "@/app/notes/mht-cet-physics/electrostatics/_data";
import {
  MHTCET_ROTATIONAL_CHAPTER,
  MHTCET_ROTATIONAL_NOTES,
  MHTCET_ROTATIONAL_SLUGS,
} from "@/app/notes/mht-cet-physics/rotational-dynamics/_data";
import {
  MHTCET_AC_CHAPTER,
  MHTCET_AC_NOTES,
  MHTCET_AC_SLUGS,
} from "@/app/notes/mht-cet-physics/ac-circuits/_data";
import {
  MHTCET_ATOMS_CHAPTER,
  MHTCET_ATOMS_NOTES,
  MHTCET_ATOMS_SLUGS,
} from "@/app/notes/mht-cet-physics/structure-of-atoms-and-nuclei/_data";
import {
  MHTCET_THERMAL_CHAPTER,
  MHTCET_THERMAL_NOTES,
  MHTCET_THERMAL_SLUGS,
} from "@/app/notes/mht-cet-physics/thermal-properties-of-matter/_data";
import {
  MHTCET_DUAL_CHAPTER,
  MHTCET_DUAL_NOTES,
  MHTCET_DUAL_SLUGS,
} from "@/app/notes/mht-cet-physics/dual-nature-of-radiation-and-matter/_data";
import {
  MHTCET_THERMO_CHAPTER,
  MHTCET_THERMO_NOTES,
  MHTCET_THERMO_SLUGS,
} from "@/app/notes/mht-cet-physics/thermodynamics/_data";
import {
  MHTCET_KTG_CHAPTER,
  MHTCET_KTG_NOTES,
  MHTCET_KTG_SLUGS,
} from "@/app/notes/mht-cet-physics/kinetic-theory-of-gases/_data";
import {
  MHTCET_GRAV_CHAPTER,
  MHTCET_GRAV_NOTES,
  MHTCET_GRAV_SLUGS,
} from "@/app/notes/mht-cet-physics/gravitation/_data";
import {
  MHTCET_RAY_CHAPTER,
  MHTCET_RAY_NOTES,
  MHTCET_RAY_SLUGS,
} from "@/app/notes/mht-cet-physics/ray-optics/_data";
import {
  MHTCET_PLANE_CHAPTER,
  MHTCET_PLANE_NOTES,
  MHTCET_PLANE_SLUGS,
} from "@/app/notes/mht-cet-physics/motion-in-a-plane/_data";
import {
  MHTCET_SOUND_CHAPTER,
  MHTCET_SOUND_NOTES,
  MHTCET_SOUND_SLUGS,
} from "@/app/notes/mht-cet-physics/sound/_data";
import {
  MHTCET_LAWS_CHAPTER,
  MHTCET_LAWS_NOTES,
  MHTCET_LAWS_SLUGS,
} from "@/app/notes/mht-cet-physics/laws-of-motion/_data";
import {
  MHTCET_MAGMAT_CHAPTER,
  MHTCET_MAGMAT_NOTES,
  MHTCET_MAGMAT_SLUGS,
} from "@/app/notes/mht-cet-physics/magnetic-materials/_data";
import {
  MHTCET_UNITS_CHAPTER,
  MHTCET_UNITS_NOTES,
  MHTCET_UNITS_SLUGS,
} from "@/app/notes/mht-cet-physics/units-and-measurement/_data";
import {
  MHTCET_SOLIDS_CHAPTER,
  MHTCET_SOLIDS_NOTES,
  MHTCET_SOLIDS_SLUGS,
} from "@/app/notes/mht-cet-physics/mechanical-properties-of-solids/_data";
import {
  MHTCET_SEMI_CHAPTER,
  MHTCET_SEMI_NOTES,
  MHTCET_SEMI_SLUGS,
} from "@/app/notes/mht-cet-physics/semiconductor-devices/_data";
import {
  MHTCET_WAVE_OPTICS_CHAPTER,
  MHTCET_WAVE_OPTICS_NOTES,
  MHTCET_WAVE_OPTICS_SLUGS,
} from "@/app/notes/mht-cet-physics/wave-optics/_data";
import {
  MHTCET_SUPERPOSITION_CHAPTER,
  MHTCET_SUPERPOSITION_NOTES,
  MHTCET_SUPERPOSITION_SLUGS,
} from "@/app/notes/mht-cet-physics/superposition-of-waves/_data";
import {
  MHTCET_FLUIDS_CHAPTER,
  MHTCET_FLUIDS_NOTES,
  MHTCET_FLUIDS_SLUGS,
} from "@/app/notes/mht-cet-physics/mechanical-properties-of-fluids/_data";
import {
  MHTCET_EMI_CHAPTER,
  MHTCET_EMI_NOTES,
  MHTCET_EMI_SLUGS,
} from "@/app/notes/mht-cet-physics/electromagnetic-induction/_data";
import {
  MHTCET_OSCILLATIONS_CHAPTER,
  MHTCET_OSCILLATIONS_NOTES,
  MHTCET_OSCILLATIONS_SLUGS,
} from "@/app/notes/mht-cet-physics/oscillations/_data";
import {
  MHTCET_MAGFIELD_CHAPTER,
  MHTCET_MAGFIELD_NOTES,
  MHTCET_MAGFIELD_SLUGS,
} from "@/app/notes/mht-cet-physics/magnetic-fields-due-to-electric-current/_data";
import {
  MHTCET_CURRENT_CHAPTER,
  MHTCET_CURRENT_NOTES,
  MHTCET_CURRENT_SLUGS,
} from "@/app/notes/mht-cet-physics/current-electricity/_data";
import {
  STATES_OF_MATTER_CHAPTER,
  STATES_OF_MATTER_NOTES,
  STATES_OF_MATTER_SLUGS,
} from "@/app/notes/mht-cet-chemistry/states-of-matter/_data";
import {
  CDS_NUMBER_SYSTEM_CHAPTER,
  CDS_NUMBER_SYSTEM_NOTES,
  CDS_NUMBER_SYSTEM_SLUGS,
} from "@/app/notes/cds-maths/number-system/_data";
import {
  CDS_TRIGONOMETRY_CHAPTER,
  CDS_TRIGONOMETRY_NOTES,
  CDS_TRIGONOMETRY_SLUGS,
} from "@/app/notes/cds-maths/trigonometry/_data";
import {
  CDS_MENSURATION_2D_CHAPTER,
  CDS_MENSURATION_2D_NOTES,
  CDS_MENSURATION_2D_SLUGS,
} from "@/app/notes/cds-maths/mensuration-2d/_data";
import {
  CDS_MENSURATION_3D_CHAPTER,
  CDS_MENSURATION_3D_NOTES,
  CDS_MENSURATION_3D_SLUGS,
} from "@/app/notes/cds-maths/mensuration-3d/_data";
import {
  CDS_TRIANGLES_CHAPTER,
  CDS_TRIANGLES_NOTES,
  CDS_TRIANGLES_SLUGS,
} from "@/app/notes/cds-maths/triangles/_data";

import {
  CDS_ALGEBRAIC_IDENTITIES_CHAPTER,
  CDS_ALGEBRAIC_IDENTITIES_NOTES,
  CDS_ALGEBRAIC_IDENTITIES_SLUGS,
} from "@/app/notes/cds-maths/algebraic-identities/_data";
import {
  CDS_QUADRATIC_EQUATIONS_CHAPTER,
  CDS_QUADRATIC_EQUATIONS_NOTES,
  CDS_QUADRATIC_EQUATIONS_SLUGS,
} from "@/app/notes/cds-maths/quadratic-equations/_data";
import {
  CDS_SURDS_INDICES_CHAPTER,
  CDS_SURDS_INDICES_NOTES,
  CDS_SURDS_INDICES_SLUGS,
} from "@/app/notes/cds-maths/surds-indices/_data";
import {
  CDS_STATISTICS_CHAPTER,
  CDS_STATISTICS_NOTES,
  CDS_STATISTICS_SLUGS,
} from "@/app/notes/cds-maths/statistics/_data";
import {
  CDS_POLYNOMIALS_CHAPTER,
  CDS_POLYNOMIALS_NOTES,
  CDS_POLYNOMIALS_SLUGS,
} from "@/app/notes/cds-maths/polynomials/_data";
import {
  CDS_RATIO_CHAPTER,
  CDS_RATIO_NOTES,
  CDS_RATIO_SLUGS,
} from "@/app/notes/cds-maths/ratio/_data";
import {
  CDS_TSD_CHAPTER,
  CDS_TSD_NOTES,
  CDS_TSD_SLUGS,
} from "@/app/notes/cds-maths/tsd/_data";
import {
  CDS_CIRCLES_CHAPTER,
  CDS_CIRCLES_NOTES,
  CDS_CIRCLES_SLUGS,
} from "@/app/notes/cds-maths/circles/_data";
import {
  CDS_QUADRILATERALS_CHAPTER,
  CDS_QUADRILATERALS_NOTES,
  CDS_QUADRILATERALS_SLUGS,
} from "@/app/notes/cds-maths/quadrilaterals/_data";
import {
  CDS_DATA_INTERPRETATION_CHAPTER,
  CDS_DATA_INTERPRETATION_NOTES,
  CDS_DATA_INTERPRETATION_SLUGS,
} from "@/app/notes/cds-maths/data-interpretation/_data";
import {
  CDS_PERCENTAGE_CHAPTER,
  CDS_PERCENTAGE_NOTES,
  CDS_PERCENTAGE_SLUGS,
} from "@/app/notes/cds-maths/percentage/_data";
import {
  CDS_AVERAGES_CHAPTER,
  CDS_AVERAGES_NOTES,
  CDS_AVERAGES_SLUGS,
} from "@/app/notes/cds-maths/averages/_data";
import {
  CDS_TIME_WORK_CHAPTER,
  CDS_TIME_WORK_NOTES,
  CDS_TIME_WORK_SLUGS,
} from "@/app/notes/cds-maths/time-work/_data";
import {
  CDS_HEIGHTS_CHAPTER,
  CDS_HEIGHTS_NOTES,
  CDS_HEIGHTS_SLUGS,
} from "@/app/notes/cds-maths/heights/_data";
import {
  CDS_LINEAR_EQUATIONS_CHAPTER,
  CDS_LINEAR_EQUATIONS_NOTES,
  CDS_LINEAR_EQUATIONS_SLUGS,
} from "@/app/notes/cds-maths/linear-equations/_data";
import {
  CDS_INTEREST_CHAPTER,
  CDS_INTEREST_NOTES,
  CDS_INTEREST_SLUGS,
} from "@/app/notes/cds-maths/interest/_data";
import {
  CDS_LOGARITHMS_CHAPTER,
  CDS_LOGARITHMS_NOTES,
  CDS_LOGARITHMS_SLUGS,
} from "@/app/notes/cds-maths/logarithms/_data";
import {
  CDS_SETS_CHAPTER,
  CDS_SETS_NOTES,
  CDS_SETS_SLUGS,
} from "@/app/notes/cds-maths/sets/_data";
import {
  CDS_LINES_ANGLES_CHAPTER,
  CDS_LINES_ANGLES_NOTES,
  CDS_LINES_ANGLES_SLUGS,
} from "@/app/notes/cds-maths/lines-angles/_data";
import {
  CDS_SEQUENCES_CHAPTER,
  CDS_SEQUENCES_NOTES,
  CDS_SEQUENCES_SLUGS,
} from "@/app/notes/cds-maths/sequences/_data";
import {
  CDS_INEQUALITIES_CHAPTER,
  CDS_INEQUALITIES_NOTES,
  CDS_INEQUALITIES_SLUGS,
} from "@/app/notes/cds-maths/inequalities/_data";
import {
  JEE_CONIC_SECTIONS_CHAPTER,
  JEE_CONIC_SECTIONS_NOTES,
  JEE_CONIC_SECTIONS_SLUGS,
} from "@/app/notes/jee-mains-maths/conic-sections/_data";
import {
  JEE_3D_GEOMETRY_CHAPTER,
  JEE_3D_GEOMETRY_NOTES,
  JEE_3D_GEOMETRY_SLUGS,
} from "@/app/notes/jee-mains-maths/three-dimensional-geometry/_data";
import {
  JEE_SEQUENCES_CHAPTER,
  JEE_SEQUENCES_NOTES,
  JEE_SEQUENCES_SLUGS,
} from "@/app/notes/jee-mains-maths/sequences-and-series/_data";
import {
  JEE_FUNCTIONS_CHAPTER,
  JEE_FUNCTIONS_NOTES,
  JEE_FUNCTIONS_SLUGS,
} from "@/app/notes/jee-mains-maths/relations-and-functions/_data";
import {
  JEE_DEFINITE_INTEGRATION_CHAPTER,
  JEE_DEFINITE_INTEGRATION_NOTES,
  JEE_DEFINITE_INTEGRATION_SLUGS,
} from "@/app/notes/jee-mains-maths/definite-integration/_data";
import {
  JEE_VECTOR_ALGEBRA_CHAPTER,
  JEE_VECTOR_ALGEBRA_NOTES,
  JEE_VECTOR_ALGEBRA_SLUGS,
} from "@/app/notes/jee-mains-maths/vector-algebra/_data";
import {
  JEE_DIFFERENTIAL_EQUATIONS_CHAPTER,
  JEE_DIFFERENTIAL_EQUATIONS_NOTES,
  JEE_DIFFERENTIAL_EQUATIONS_SLUGS,
} from "@/app/notes/jee-mains-maths/differential-equations/_data";
import {
  JEE_BINOMIAL_THEOREM_CHAPTER,
  JEE_BINOMIAL_THEOREM_NOTES,
  JEE_BINOMIAL_THEOREM_SLUGS,
} from "@/app/notes/jee-mains-maths/binomial-theorem/_data";
import {
  JEE_PNC_CHAPTER,
  JEE_PNC_NOTES,
  JEE_PNC_SLUGS,
} from "@/app/notes/jee-mains-maths/permutations-and-combinations/_data";
import {
  JEE_PROBABILITY_CHAPTER,
  JEE_PROBABILITY_NOTES,
  JEE_PROBABILITY_SLUGS,
} from "@/app/notes/jee-mains-maths/probability/_data";
import {
  JEE_COMPLEX_NUMBERS_CHAPTER,
  JEE_COMPLEX_NUMBERS_NOTES,
  JEE_COMPLEX_NUMBERS_SLUGS,
} from "@/app/notes/jee-mains-maths/complex-numbers/_data";
import {
  JEE_AOD_CHAPTER,
  JEE_AOD_NOTES,
  JEE_AOD_SLUGS,
} from "@/app/notes/jee-mains-maths/application-of-derivatives/_data";
import {
  JEE_DETERMINANTS_CHAPTER,
  JEE_DETERMINANTS_NOTES,
  JEE_DETERMINANTS_SLUGS,
} from "@/app/notes/jee-mains-maths/determinants/_data";
import {
  JEE_LIMITS_CHAPTER,
  JEE_LIMITS_NOTES,
  JEE_LIMITS_SLUGS,
} from "@/app/notes/jee-mains-maths/limits-and-continuity/_data";
import {
  JEE_QUADRATIC_EQUATIONS_CHAPTER,
  JEE_QUADRATIC_EQUATIONS_NOTES,
  JEE_QUADRATIC_EQUATIONS_SLUGS,
} from "@/app/notes/jee-mains-maths/quadratic-equations/_data";
import {
  JEE_STATISTICS_CHAPTER,
  JEE_STATISTICS_NOTES,
  JEE_STATISTICS_SLUGS,
} from "@/app/notes/jee-mains-maths/statistics/_data";
import {
  JEE_DIFFERENTIATION_CHAPTER,
  JEE_DIFFERENTIATION_NOTES,
  JEE_DIFFERENTIATION_SLUGS,
} from "@/app/notes/jee-mains-maths/differentiation/_data";
import {
  JEE_AOI_CHAPTER,
  JEE_AOI_NOTES,
  JEE_AOI_SLUGS,
} from "@/app/notes/jee-mains-maths/application-of-integrals/_data";
import {
  JEE_STRAIGHT_LINES_CHAPTER,
  JEE_STRAIGHT_LINES_NOTES,
  JEE_STRAIGHT_LINES_SLUGS,
} from "@/app/notes/jee-mains-maths/straight-lines/_data";
import {
  JEE_MATHEMATICAL_REASONING_CHAPTER,
  JEE_MATHEMATICAL_REASONING_NOTES,
  JEE_MATHEMATICAL_REASONING_SLUGS,
} from "@/app/notes/jee-mains-maths/mathematical-reasoning/_data";
import {
  JEE_ITF_CHAPTER,
  JEE_ITF_NOTES,
  JEE_ITF_SLUGS,
} from "@/app/notes/jee-mains-maths/inverse-trigonometric-functions/_data";
import {
  JEE_TRIG_EQUATIONS_CHAPTER,
  JEE_TRIG_EQUATIONS_NOTES,
  JEE_TRIG_EQUATIONS_SLUGS,
} from "@/app/notes/jee-mains-maths/trigonometric-equations/_data";
import {
  JEE_INDEFINITE_INTEGRATION_CHAPTER,
  JEE_INDEFINITE_INTEGRATION_NOTES,
  JEE_INDEFINITE_INTEGRATION_SLUGS,
} from "@/app/notes/jee-mains-maths/indefinite-integration/_data";
import {
  JEE_TRIG_IDENTITIES_CHAPTER,
  JEE_TRIG_IDENTITIES_NOTES,
  JEE_TRIG_IDENTITIES_SLUGS,
} from "@/app/notes/jee-mains-maths/trigonometric-identities/_data";
import {
  JEE_HEIGHTS_CHAPTER,
  JEE_HEIGHTS_NOTES,
  JEE_HEIGHTS_SLUGS,
} from "@/app/notes/jee-mains-maths/height-and-distance/_data";
import {
  JEE_TRIANGLE_CHAPTER,
  JEE_TRIANGLE_NOTES,
  JEE_TRIANGLE_SLUGS,
} from "@/app/notes/jee-mains-maths/properties-of-triangle/_data";
import {
  JEE_CH_SOL_CHAPTER,
  JEE_CH_SOL_NOTES,
  JEE_CH_SOL_SLUGS,
} from "@/app/notes/jee-mains-chemistry/solutions/_data";
import {
  JEE_CH_ATOM_CHAPTER,
  JEE_CH_ATOM_NOTES,
  JEE_CH_ATOM_SLUGS,
} from "@/app/notes/jee-mains-chemistry/structure-of-atom/_data";
import {
  JEE_CH_KIN_CHAPTER,
  JEE_CH_KIN_NOTES,
  JEE_CH_KIN_SLUGS,
} from "@/app/notes/jee-mains-chemistry/chemical-kinetics/_data";
import {
  JEE_CH_EQ_CHAPTER,
  JEE_CH_EQ_NOTES,
  JEE_CH_EQ_SLUGS,
} from "@/app/notes/jee-mains-chemistry/equilibrium/_data";
import {
  JEE_CH_ELEC_CHAPTER,
  JEE_CH_ELEC_NOTES,
  JEE_CH_ELEC_SLUGS,
} from "@/app/notes/jee-mains-chemistry/electrochemistry/_data";
import {
  JEE_CH_THERMO_CHAPTER,
  JEE_CH_THERMO_NOTES,
  JEE_CH_THERMO_SLUGS,
} from "@/app/notes/jee-mains-chemistry/thermodynamics/_data";
import {
  JEE_CH_SBC_CHAPTER,
  JEE_CH_SBC_NOTES,
  JEE_CH_SBC_SLUGS,
} from "@/app/notes/jee-mains-chemistry/some-basic-concepts/_data";
import {
  JEE_CH_BOND_CHAPTER,
  JEE_CH_BOND_NOTES,
  JEE_CH_BOND_SLUGS,
} from "@/app/notes/jee-mains-chemistry/chemical-bonding/_data";
import {
  JEE_CH_PER_CHAPTER,
  JEE_CH_PER_NOTES,
  JEE_CH_PER_SLUGS,
} from "@/app/notes/jee-mains-chemistry/periodicity/_data";
import {
  JEE_CH_COORD_CHAPTER,
  JEE_CH_COORD_NOTES,
  JEE_CH_COORD_SLUGS,
} from "@/app/notes/jee-mains-chemistry/coordination-compounds/_data";
import {
  JEE_CH_ORM_CHAPTER,
  JEE_CH_ORM_NOTES,
  JEE_CH_ORM_SLUGS,
} from "@/app/notes/jee-mains-chemistry/organic-reaction-mechanisms/_data";
import {
  JEE_CH_PB_CHAPTER,
  JEE_CH_PB_NOTES,
  JEE_CH_PB_SLUGS,
} from "@/app/notes/jee-mains-chemistry/p-block-elements/_data";
import {
  JEE_CH_DFB_CHAPTER,
  JEE_CH_DFB_NOTES,
  JEE_CH_DFB_SLUGS,
} from "@/app/notes/jee-mains-chemistry/d-and-f-block-elements/_data";
import {
  JEE_CH_HALO_CHAPTER,
  JEE_CH_HALO_NOTES,
  JEE_CH_HALO_SLUGS,
} from "@/app/notes/jee-mains-chemistry/haloalkanes-and-haloarenes/_data";
import {
  JEE_CH_HC_CHAPTER,
  JEE_CH_HC_NOTES,
  JEE_CH_HC_SLUGS,
} from "@/app/notes/jee-mains-chemistry/hydrocarbons/_data";
import {
  JEE_CH_ALC_CHAPTER,
  JEE_CH_ALC_NOTES,
  JEE_CH_ALC_SLUGS,
} from "@/app/notes/jee-mains-chemistry/alcohols-phenols-and-ethers/_data";
import {
  JEE_CH_GOC_CHAPTER,
  JEE_CH_GOC_NOTES,
  JEE_CH_GOC_SLUGS,
} from "@/app/notes/jee-mains-chemistry/organic-basic-principles/_data";
import {
  JEE_CH_ALD_CHAPTER,
  JEE_CH_ALD_NOTES,
  JEE_CH_ALD_SLUGS,
} from "@/app/notes/jee-mains-chemistry/aldehydes-ketones-and-carboxylic-acids/_data";
import {
  JEE_CH_BIO_CHAPTER,
  JEE_CH_BIO_NOTES,
  JEE_CH_BIO_SLUGS,
} from "@/app/notes/jee-mains-chemistry/biomolecules/_data";
import {
  JEE_CH_AMINE_CHAPTER,
  JEE_CH_AMINE_NOTES,
  JEE_CH_AMINE_SLUGS,
} from "@/app/notes/jee-mains-chemistry/amines/_data";
import {
  JEE_PH_UNIT_CHAPTER,
  JEE_PH_UNIT_NOTES,
  JEE_PH_UNIT_SLUGS,
} from "@/app/notes/jee-mains-physics/units-and-measurements/_data";
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
    examName: "MHT-CET",
    subjectName: "Maths",
    subjectRoute: "mht-cet-maths",
    subjectDisplay: "MHT-CET Maths",
    chapterSlug: "differentiation",
    chipLabel: "Differentiation notes",
    chapter: MHTCET_DIFFERENTIATION_CHAPTER,
    notes: MHTCET_DIFFERENTIATION_NOTES,
    slugs: MHTCET_DIFFERENTIATION_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Maths",
    subjectRoute: "mht-cet-maths",
    subjectDisplay: "MHT-CET Maths",
    chapterSlug: "vectors",
    chipLabel: "Vectors notes",
    chapter: MHTCET_VECTORS_CHAPTER,
    notes: MHTCET_VECTORS_NOTES,
    slugs: MHTCET_VECTORS_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Maths",
    subjectRoute: "mht-cet-maths",
    subjectDisplay: "MHT-CET Maths",
    chapterSlug: "line-and-plane",
    chipLabel: "Line and Plane notes",
    chapter: LINE_AND_PLANE_CHAPTER,
    notes: LINE_AND_PLANE_NOTES,
    slugs: LINE_AND_PLANE_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Maths",
    subjectRoute: "mht-cet-maths",
    subjectDisplay: "MHT-CET Maths",
    chapterSlug: "applications-of-derivative",
    chipLabel: "Applications of Derivative notes",
    chapter: APPLICATIONS_OF_DERIVATIVE_CHAPTER,
    notes: APPLICATIONS_OF_DERIVATIVE_NOTES,
    slugs: APPLICATIONS_OF_DERIVATIVE_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Maths",
    subjectRoute: "mht-cet-maths",
    subjectDisplay: "MHT-CET Maths",
    chapterSlug: "differential-equations",
    chipLabel: "Differential Equations notes",
    chapter: MHTCET_DIFFERENTIAL_EQUATIONS_CHAPTER,
    notes: MHTCET_DIFFERENTIAL_EQUATIONS_NOTES,
    slugs: MHTCET_DIFFERENTIAL_EQUATIONS_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Maths",
    subjectRoute: "mht-cet-maths",
    subjectDisplay: "MHT-CET Maths",
    chapterSlug: "probability-distribution",
    chipLabel: "Probability Distribution notes",
    chapter: PROBABILITY_DISTRIBUTION_CHAPTER,
    notes: PROBABILITY_DISTRIBUTION_NOTES,
    slugs: PROBABILITY_DISTRIBUTION_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Maths",
    subjectRoute: "mht-cet-maths",
    subjectDisplay: "MHT-CET Maths",
    chapterSlug: "mathematical-logic",
    chipLabel: "Mathematical Logic notes",
    chapter: MATHEMATICAL_LOGIC_CHAPTER,
    notes: MATHEMATICAL_LOGIC_NOTES,
    slugs: MATHEMATICAL_LOGIC_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Maths",
    subjectRoute: "mht-cet-maths",
    subjectDisplay: "MHT-CET Maths",
    chapterSlug: "binomial-distribution",
    chipLabel: "Binomial Distribution notes",
    chapter: MHTCET_BINOMIAL_DISTRIBUTION_CHAPTER,
    notes: MHTCET_BINOMIAL_DISTRIBUTION_NOTES,
    slugs: MHTCET_BINOMIAL_DISTRIBUTION_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Maths",
    subjectRoute: "mht-cet-maths",
    subjectDisplay: "MHT-CET Maths",
    chapterSlug: "limits",
    chipLabel: "Limits notes",
    chapter: MHTCET_LIMITS_CHAPTER,
    notes: MHTCET_LIMITS_NOTES,
    slugs: MHTCET_LIMITS_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Maths",
    subjectRoute: "mht-cet-maths",
    subjectDisplay: "MHT-CET Maths",
    chapterSlug: "trigonometric-functions",
    chipLabel: "Trigonometric Functions notes",
    chapter: MHTCET_TRIG_FUNCTIONS_CHAPTER,
    notes: MHTCET_TRIG_FUNCTIONS_NOTES,
    slugs: MHTCET_TRIG_FUNCTIONS_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Maths",
    subjectRoute: "mht-cet-maths",
    subjectDisplay: "MHT-CET Maths",
    chapterSlug: "trigonometry-ii",
    chipLabel: "Trigonometry - II",
    chapter: MHTCET_TRIG2_CHAPTER,
    notes: MHTCET_TRIG2_NOTES,
    slugs: MHTCET_TRIG2_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Maths",
    subjectRoute: "mht-cet-maths",
    subjectDisplay: "MHT-CET Maths",
    chapterSlug: "conic-sections",
    chipLabel: "Conic Sections",
    chapter: MHTCET_CONICS_CHAPTER,
    notes: MHTCET_CONICS_NOTES,
    slugs: MHTCET_CONICS_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Maths",
    subjectRoute: "mht-cet-maths",
    subjectDisplay: "MHT-CET Maths",
    chapterSlug: "definite-integration",
    chipLabel: "Definite Integration notes",
    chapter: MHTCET_DEFINITE_INTEGRATION_CHAPTER,
    notes: MHTCET_DEFINITE_INTEGRATION_NOTES,
    slugs: MHTCET_DEFINITE_INTEGRATION_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Maths",
    subjectRoute: "mht-cet-maths",
    subjectDisplay: "MHT-CET Maths",
    chapterSlug: "applications-of-definite-integral",
    chipLabel: "Applications of Definite Integral notes",
    chapter: MHTCET_APPLICATIONS_OF_DEFINITE_INTEGRAL_CHAPTER,
    notes: MHTCET_APPLICATIONS_OF_DEFINITE_INTEGRAL_NOTES,
    slugs: MHTCET_APPLICATIONS_OF_DEFINITE_INTEGRAL_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Maths",
    subjectRoute: "mht-cet-maths",
    subjectDisplay: "MHT-CET Maths",
    chapterSlug: "determinants-and-matrices",
    chipLabel: "Determinants and Matrices notes",
    chapter: MHTCET_DETERMINANTS_MATRICES_CHAPTER,
    notes: MHTCET_DETERMINANTS_MATRICES_NOTES,
    slugs: MHTCET_DETERMINANTS_MATRICES_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Maths",
    subjectRoute: "mht-cet-maths",
    subjectDisplay: "MHT-CET Maths",
    chapterSlug: "complex-numbers",
    chipLabel: "Complex Numbers notes",
    chapter: MHTCET_COMPLEX_NUMBERS_CHAPTER,
    notes: MHTCET_COMPLEX_NUMBERS_NOTES,
    slugs: MHTCET_COMPLEX_NUMBERS_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Maths",
    subjectRoute: "mht-cet-maths",
    subjectDisplay: "MHT-CET Maths",
    chapterSlug: "permutations-and-combinations",
    chipLabel: "Permutations and Combinations notes",
    chapter: MHTCET_PNC_CHAPTER,
    notes: MHTCET_PNC_NOTES,
    slugs: MHTCET_PNC_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Maths",
    subjectRoute: "mht-cet-maths",
    subjectDisplay: "MHT-CET Maths",
    chapterSlug: "sets-relations-and-functions",
    chipLabel: "Sets, Relations and Functions notes",
    chapter: MHTCET_SRF_CHAPTER,
    notes: MHTCET_SRF_NOTES,
    slugs: MHTCET_SRF_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Maths",
    subjectRoute: "mht-cet-maths",
    subjectDisplay: "MHT-CET Maths",
    chapterSlug: "linear-programming",
    chipLabel: "Linear Programming notes",
    chapter: MHTCET_LPP_CHAPTER,
    notes: MHTCET_LPP_NOTES,
    slugs: MHTCET_LPP_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Maths",
    subjectRoute: "mht-cet-maths",
    subjectDisplay: "MHT-CET Maths",
    chapterSlug: "measures-of-dispersion",
    chipLabel: "Measures of Dispersion notes",
    chapter: MHTCET_DISPERSION_CHAPTER,
    notes: MHTCET_DISPERSION_NOTES,
    slugs: MHTCET_DISPERSION_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Maths",
    subjectRoute: "mht-cet-maths",
    subjectDisplay: "MHT-CET Maths",
    chapterSlug: "straight-line",
    chipLabel: "Straight Line notes",
    chapter: MHTCET_STRAIGHT_LINE_CHAPTER,
    notes: MHTCET_STRAIGHT_LINE_NOTES,
    slugs: MHTCET_STRAIGHT_LINE_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Maths",
    subjectRoute: "mht-cet-maths",
    subjectDisplay: "MHT-CET Maths",
    chapterSlug: "pair-of-straight-lines",
    chipLabel: "Pair of Straight Lines notes",
    chapter: MHTCET_PAIR_OF_LINES_CHAPTER,
    notes: MHTCET_PAIR_OF_LINES_NOTES,
    slugs: MHTCET_PAIR_OF_LINES_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Maths",
    subjectRoute: "mht-cet-maths",
    subjectDisplay: "MHT-CET Maths",
    chapterSlug: "circle",
    chipLabel: "Circle notes",
    chapter: MHTCET_CIRCLE_CHAPTER,
    notes: MHTCET_CIRCLE_NOTES,
    slugs: MHTCET_CIRCLE_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Maths",
    subjectRoute: "jee-mains-maths",
    subjectDisplay: "JEE Mains Maths",
    chapterSlug: "matrices",
    chipLabel: "Matrices notes",
    chapter: JEE_MATRICES_CHAPTER,
    notes: JEE_MATRICES_NOTES,
    slugs: JEE_MATRICES_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Chemistry",
    subjectRoute: "mht-cet-chemistry",
    subjectDisplay: "MHT-CET Chemistry",
    chapterSlug: "some-basic-concepts",
    chipLabel: "Some Basic Concepts notes",
    chapter: SOME_BASIC_CONCEPTS_CHAPTER,
    notes: SOME_BASIC_CONCEPTS_NOTES,
    slugs: SOME_BASIC_CONCEPTS_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Chemistry",
    subjectRoute: "mht-cet-chemistry",
    subjectDisplay: "MHT-CET Chemistry",
    chapterSlug: "states-of-matter",
    chipLabel: "States of Matter notes",
    chapter: STATES_OF_MATTER_CHAPTER,
    notes: STATES_OF_MATTER_NOTES,
    slugs: STATES_OF_MATTER_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Chemistry",
    subjectRoute: "mht-cet-chemistry",
    subjectDisplay: "MHT-CET Chemistry",
    chapterSlug: "structure-of-atom",
    chipLabel: "Structure of Atom notes",
    chapter: STRUCTURE_OF_ATOM_CHAPTER,
    notes: STRUCTURE_OF_ATOM_NOTES,
    slugs: STRUCTURE_OF_ATOM_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Chemistry",
    subjectRoute: "mht-cet-chemistry",
    subjectDisplay: "MHT-CET Chemistry",
    chapterSlug: "chemical-bonding",
    chipLabel: "Chemical Bonding notes",
    chapter: MHTCET_CHEMICAL_BONDING_CHAPTER,
    notes: MHTCET_CHEMICAL_BONDING_NOTES,
    slugs: MHTCET_CHEMICAL_BONDING_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Chemistry",
    subjectRoute: "mht-cet-chemistry",
    subjectDisplay: "MHT-CET Chemistry",
    chapterSlug: "ionic-equilibria",
    chipLabel: "Ionic Equilibria notes",
    chapter: IONIC_EQUILIBRIA_CHAPTER,
    notes: IONIC_EQUILIBRIA_NOTES,
    slugs: IONIC_EQUILIBRIA_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Chemistry",
    subjectRoute: "mht-cet-chemistry",
    subjectDisplay: "MHT-CET Chemistry",
    chapterSlug: "solutions",
    chipLabel: "Solutions notes",
    chapter: MHTCET_SOLUTIONS_CHAPTER,
    notes: MHTCET_SOLUTIONS_NOTES,
    slugs: MHTCET_SOLUTIONS_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Chemistry",
    subjectRoute: "mht-cet-chemistry",
    subjectDisplay: "MHT-CET Chemistry",
    chapterSlug: "chemical-kinetics",
    chipLabel: "Chemical Kinetics notes",
    chapter: MHTCET_KINETICS_CHAPTER,
    notes: MHTCET_KINETICS_NOTES,
    slugs: MHTCET_KINETICS_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Chemistry",
    subjectRoute: "mht-cet-chemistry",
    subjectDisplay: "MHT-CET Chemistry",
    chapterSlug: "solid-state",
    chipLabel: "Solid State notes",
    chapter: MHTCET_SOLID_STATE_CHAPTER,
    notes: MHTCET_SOLID_STATE_NOTES,
    slugs: MHTCET_SOLID_STATE_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Chemistry",
    subjectRoute: "mht-cet-chemistry",
    subjectDisplay: "MHT-CET Chemistry",
    chapterSlug: "electrochemistry",
    chipLabel: "Electrochemistry notes",
    chapter: MHTCET_ELECTROCHEMISTRY_CHAPTER,
    notes: MHTCET_ELECTROCHEMISTRY_NOTES,
    slugs: MHTCET_ELECTROCHEMISTRY_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Chemistry",
    subjectRoute: "mht-cet-chemistry",
    subjectDisplay: "MHT-CET Chemistry",
    chapterSlug: "chemical-thermodynamics",
    chipLabel: "Chemical Thermodynamics notes",
    chapter: MHTCET_THERMODYNAMICS_CHAPTER,
    notes: MHTCET_THERMODYNAMICS_NOTES,
    slugs: MHTCET_THERMODYNAMICS_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Chemistry",
    subjectRoute: "mht-cet-chemistry",
    subjectDisplay: "MHT-CET Chemistry",
    chapterSlug: "basic-principles-of-organic-chemistry",
    chipLabel: "Basic Principles of Organic Chemistry notes",
    chapter: MHTCET_BASIC_ORGANIC_CHAPTER,
    notes: MHTCET_BASIC_ORGANIC_NOTES,
    slugs: MHTCET_BASIC_ORGANIC_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Chemistry",
    subjectRoute: "mht-cet-chemistry",
    subjectDisplay: "MHT-CET Chemistry",
    chapterSlug: "halogen-derivatives",
    chipLabel: "Halogen Derivatives notes",
    chapter: MHTCET_HALOGEN_CHAPTER,
    notes: MHTCET_HALOGEN_NOTES,
    slugs: MHTCET_HALOGEN_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Chemistry",
    subjectRoute: "mht-cet-chemistry",
    subjectDisplay: "MHT-CET Chemistry",
    chapterSlug: "alcohols-phenols-and-ethers",
    chipLabel: "Alcohols, Phenols and Ethers notes",
    chapter: MHTCET_ALCOHOLS_CHAPTER,
    notes: MHTCET_ALCOHOLS_NOTES,
    slugs: MHTCET_ALCOHOLS_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Chemistry",
    subjectRoute: "mht-cet-chemistry",
    subjectDisplay: "MHT-CET Chemistry",
    chapterSlug: "aldehydes-ketones-and-carboxylic-acids",
    chipLabel: "Aldehydes, Ketones and Carboxylic Acids notes",
    chapter: MHTCET_CARBONYL_CHAPTER,
    notes: MHTCET_CARBONYL_NOTES,
    slugs: MHTCET_CARBONYL_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Chemistry",
    subjectRoute: "mht-cet-chemistry",
    subjectDisplay: "MHT-CET Chemistry",
    chapterSlug: "amines",
    chipLabel: "Amines notes",
    chapter: MHTCET_AMINES_CHAPTER,
    notes: MHTCET_AMINES_NOTES,
    slugs: MHTCET_AMINES_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Chemistry",
    subjectRoute: "mht-cet-chemistry",
    subjectDisplay: "MHT-CET Chemistry",
    chapterSlug: "biomolecules",
    chipLabel: "Biomolecules notes",
    chapter: MHTCET_BIOMOLECULES_CHAPTER,
    notes: MHTCET_BIOMOLECULES_NOTES,
    slugs: MHTCET_BIOMOLECULES_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Chemistry",
    subjectRoute: "mht-cet-chemistry",
    subjectDisplay: "MHT-CET Chemistry",
    chapterSlug: "introduction-to-polymer-chemistry",
    chipLabel: "Polymer Chemistry notes",
    chapter: MHTCET_POLYMERS_CHAPTER,
    notes: MHTCET_POLYMERS_NOTES,
    slugs: MHTCET_POLYMERS_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Chemistry",
    subjectRoute: "mht-cet-chemistry",
    subjectDisplay: "MHT-CET Chemistry",
    chapterSlug: "coordination-compounds",
    chipLabel: "Coordination Compounds notes",
    chapter: MHTCET_COORDINATION_CHAPTER,
    notes: MHTCET_COORDINATION_NOTES,
    slugs: MHTCET_COORDINATION_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Chemistry",
    subjectRoute: "mht-cet-chemistry",
    subjectDisplay: "MHT-CET Chemistry",
    chapterSlug: "transition-and-inner-transition-elements",
    chipLabel: "Transition Elements notes",
    chapter: MHTCET_TRANSITION_CHAPTER,
    notes: MHTCET_TRANSITION_NOTES,
    slugs: MHTCET_TRANSITION_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Chemistry",
    subjectRoute: "mht-cet-chemistry",
    subjectDisplay: "MHT-CET Chemistry",
    chapterSlug: "elements-of-group-16-17-and-18",
    chipLabel: "Group 16, 17 and 18 notes",
    chapter: MHTCET_GROUP16_CHAPTER,
    notes: MHTCET_GROUP16_NOTES,
    slugs: MHTCET_GROUP16_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Chemistry",
    subjectRoute: "mht-cet-chemistry",
    subjectDisplay: "MHT-CET Chemistry",
    chapterSlug: "redox-reactions",
    chipLabel: "Redox notes",
    chapter: MHTCET_REDOX_CHAPTER,
    notes: MHTCET_REDOX_NOTES,
    slugs: MHTCET_REDOX_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Chemistry",
    subjectRoute: "mht-cet-chemistry",
    subjectDisplay: "MHT-CET Chemistry",
    chapterSlug: "surface-chemistry",
    chipLabel: "Surface Chemistry notes",
    chapter: MHTCET_SURFACE_CHAPTER,
    notes: MHTCET_SURFACE_NOTES,
    slugs: MHTCET_SURFACE_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Chemistry",
    subjectRoute: "mht-cet-chemistry",
    subjectDisplay: "MHT-CET Chemistry",
    chapterSlug: "alkenes",
    chipLabel: "Alkenes notes",
    chapter: MHTCET_ALKENES_CHAPTER,
    notes: MHTCET_ALKENES_NOTES,
    slugs: MHTCET_ALKENES_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Chemistry",
    subjectRoute: "mht-cet-chemistry",
    subjectDisplay: "MHT-CET Chemistry",
    chapterSlug: "elements-of-group-1-and-2",
    chipLabel: "Groups 1 and 2 notes",
    chapter: MHTCET_GROUP12_CHAPTER,
    notes: MHTCET_GROUP12_NOTES,
    slugs: MHTCET_GROUP12_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Chemistry",
    subjectRoute: "mht-cet-chemistry",
    subjectDisplay: "MHT-CET Chemistry",
    chapterSlug: "aromatic-compounds",
    chipLabel: "Aromatic Compounds notes",
    chapter: MHTCET_AROMATIC_CHAPTER,
    notes: MHTCET_AROMATIC_NOTES,
    slugs: MHTCET_AROMATIC_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Chemistry",
    subjectRoute: "mht-cet-chemistry",
    subjectDisplay: "MHT-CET Chemistry",
    chapterSlug: "alkanes",
    chipLabel: "Alkanes notes",
    chapter: MHTCET_ALKANES_CHAPTER,
    notes: MHTCET_ALKANES_NOTES,
    slugs: MHTCET_ALKANES_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Chemistry",
    subjectRoute: "mht-cet-chemistry",
    subjectDisplay: "MHT-CET Chemistry",
    chapterSlug: "green-chemistry-and-nanochemistry",
    chipLabel: "Green Chemistry notes",
    chapter: MHTCET_GREEN_CHAPTER,
    notes: MHTCET_GREEN_NOTES,
    slugs: MHTCET_GREEN_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Chemistry",
    subjectRoute: "mht-cet-chemistry",
    subjectDisplay: "MHT-CET Chemistry",
    chapterSlug: "modern-periodic-table",
    chipLabel: "Modern Periodic Table notes",
    chapter: MHTCET_MPT_CHAPTER,
    notes: MHTCET_MPT_NOTES,
    slugs: MHTCET_MPT_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Chemistry",
    subjectRoute: "mht-cet-chemistry",
    subjectDisplay: "MHT-CET Chemistry",
    chapterSlug: "alkynes",
    chipLabel: "Alkynes notes",
    chapter: MHTCET_ALKYNES_CHAPTER,
    notes: MHTCET_ALKYNES_NOTES,
    slugs: MHTCET_ALKYNES_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Physics",
    subjectRoute: "mht-cet-physics",
    subjectDisplay: "MHT-CET Physics",
    chapterSlug: "electrostatics",
    chipLabel: "Electrostatics notes",
    chapter: MHTCET_ELECTROSTATICS_CHAPTER,
    notes: MHTCET_ELECTROSTATICS_NOTES,
    slugs: MHTCET_ELECTROSTATICS_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Physics",
    subjectRoute: "mht-cet-physics",
    subjectDisplay: "MHT-CET Physics",
    chapterSlug: "rotational-dynamics",
    chipLabel: "Rotational Dynamics notes",
    chapter: MHTCET_ROTATIONAL_CHAPTER,
    notes: MHTCET_ROTATIONAL_NOTES,
    slugs: MHTCET_ROTATIONAL_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Physics",
    subjectRoute: "mht-cet-physics",
    subjectDisplay: "MHT-CET Physics",
    chapterSlug: "ac-circuits",
    chipLabel: "AC Circuits notes",
    chapter: MHTCET_AC_CHAPTER,
    notes: MHTCET_AC_NOTES,
    slugs: MHTCET_AC_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Physics",
    subjectRoute: "mht-cet-physics",
    subjectDisplay: "MHT-CET Physics",
    chapterSlug: "structure-of-atoms-and-nuclei",
    chipLabel: "Structure of Atoms and Nuclei",
    chapter: MHTCET_ATOMS_CHAPTER,
    notes: MHTCET_ATOMS_NOTES,
    slugs: MHTCET_ATOMS_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Physics",
    subjectRoute: "mht-cet-physics",
    subjectDisplay: "MHT-CET Physics",
    chapterSlug: "thermal-properties-of-matter",
    chipLabel: "Thermal Properties of Matter",
    chapter: MHTCET_THERMAL_CHAPTER,
    notes: MHTCET_THERMAL_NOTES,
    slugs: MHTCET_THERMAL_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Physics",
    subjectRoute: "mht-cet-physics",
    subjectDisplay: "MHT-CET Physics",
    chapterSlug: "dual-nature-of-radiation-and-matter",
    chipLabel: "Dual Nature of Radiation and Matter",
    chapter: MHTCET_DUAL_CHAPTER,
    notes: MHTCET_DUAL_NOTES,
    slugs: MHTCET_DUAL_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Physics",
    subjectRoute: "mht-cet-physics",
    subjectDisplay: "MHT-CET Physics",
    chapterSlug: "thermodynamics",
    chipLabel: "Thermodynamics",
    chapter: MHTCET_THERMO_CHAPTER,
    notes: MHTCET_THERMO_NOTES,
    slugs: MHTCET_THERMO_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Physics",
    subjectRoute: "mht-cet-physics",
    subjectDisplay: "MHT-CET Physics",
    chapterSlug: "kinetic-theory-of-gases",
    chipLabel: "Kinetic Theory of Gases",
    chapter: MHTCET_KTG_CHAPTER,
    notes: MHTCET_KTG_NOTES,
    slugs: MHTCET_KTG_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Physics",
    subjectRoute: "mht-cet-physics",
    subjectDisplay: "MHT-CET Physics",
    chapterSlug: "gravitation",
    chipLabel: "Gravitation",
    chapter: MHTCET_GRAV_CHAPTER,
    notes: MHTCET_GRAV_NOTES,
    slugs: MHTCET_GRAV_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Physics",
    subjectRoute: "mht-cet-physics",
    subjectDisplay: "MHT-CET Physics",
    chapterSlug: "ray-optics",
    chipLabel: "Optics (Ray)",
    chapter: MHTCET_RAY_CHAPTER,
    notes: MHTCET_RAY_NOTES,
    slugs: MHTCET_RAY_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Physics",
    subjectRoute: "mht-cet-physics",
    subjectDisplay: "MHT-CET Physics",
    chapterSlug: "motion-in-a-plane",
    chipLabel: "Motion in a Plane",
    chapter: MHTCET_PLANE_CHAPTER,
    notes: MHTCET_PLANE_NOTES,
    slugs: MHTCET_PLANE_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Physics",
    subjectRoute: "mht-cet-physics",
    subjectDisplay: "MHT-CET Physics",
    chapterSlug: "sound",
    chipLabel: "Sound",
    chapter: MHTCET_SOUND_CHAPTER,
    notes: MHTCET_SOUND_NOTES,
    slugs: MHTCET_SOUND_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Physics",
    subjectRoute: "mht-cet-physics",
    subjectDisplay: "MHT-CET Physics",
    chapterSlug: "laws-of-motion",
    chipLabel: "Laws of Motion",
    chapter: MHTCET_LAWS_CHAPTER,
    notes: MHTCET_LAWS_NOTES,
    slugs: MHTCET_LAWS_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Physics",
    subjectRoute: "mht-cet-physics",
    subjectDisplay: "MHT-CET Physics",
    chapterSlug: "magnetic-materials",
    chipLabel: "Magnetic Materials",
    chapter: MHTCET_MAGMAT_CHAPTER,
    notes: MHTCET_MAGMAT_NOTES,
    slugs: MHTCET_MAGMAT_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Physics",
    subjectRoute: "mht-cet-physics",
    subjectDisplay: "MHT-CET Physics",
    chapterSlug: "units-and-measurement",
    chipLabel: "Units and Measurement",
    chapter: MHTCET_UNITS_CHAPTER,
    notes: MHTCET_UNITS_NOTES,
    slugs: MHTCET_UNITS_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Physics",
    subjectRoute: "mht-cet-physics",
    subjectDisplay: "MHT-CET Physics",
    chapterSlug: "mechanical-properties-of-solids",
    chipLabel: "Mechanical Properties of Solids",
    chapter: MHTCET_SOLIDS_CHAPTER,
    notes: MHTCET_SOLIDS_NOTES,
    slugs: MHTCET_SOLIDS_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Physics",
    subjectRoute: "mht-cet-physics",
    subjectDisplay: "MHT-CET Physics",
    chapterSlug: "semiconductor-devices",
    chipLabel: "Semiconductor Devices notes",
    chapter: MHTCET_SEMI_CHAPTER,
    notes: MHTCET_SEMI_NOTES,
    slugs: MHTCET_SEMI_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Physics",
    subjectRoute: "mht-cet-physics",
    subjectDisplay: "MHT-CET Physics",
    chapterSlug: "wave-optics",
    chipLabel: "Wave Optics notes",
    chapter: MHTCET_WAVE_OPTICS_CHAPTER,
    notes: MHTCET_WAVE_OPTICS_NOTES,
    slugs: MHTCET_WAVE_OPTICS_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Physics",
    subjectRoute: "mht-cet-physics",
    subjectDisplay: "MHT-CET Physics",
    chapterSlug: "superposition-of-waves",
    chipLabel: "Superposition of Waves notes",
    chapter: MHTCET_SUPERPOSITION_CHAPTER,
    notes: MHTCET_SUPERPOSITION_NOTES,
    slugs: MHTCET_SUPERPOSITION_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Physics",
    subjectRoute: "mht-cet-physics",
    subjectDisplay: "MHT-CET Physics",
    chapterSlug: "mechanical-properties-of-fluids",
    chipLabel: "Fluids notes",
    chapter: MHTCET_FLUIDS_CHAPTER,
    notes: MHTCET_FLUIDS_NOTES,
    slugs: MHTCET_FLUIDS_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Physics",
    subjectRoute: "mht-cet-physics",
    subjectDisplay: "MHT-CET Physics",
    chapterSlug: "electromagnetic-induction",
    chipLabel: "Electromagnetic Induction notes",
    chapter: MHTCET_EMI_CHAPTER,
    notes: MHTCET_EMI_NOTES,
    slugs: MHTCET_EMI_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Physics",
    subjectRoute: "mht-cet-physics",
    subjectDisplay: "MHT-CET Physics",
    chapterSlug: "oscillations",
    chipLabel: "Oscillations notes",
    chapter: MHTCET_OSCILLATIONS_CHAPTER,
    notes: MHTCET_OSCILLATIONS_NOTES,
    slugs: MHTCET_OSCILLATIONS_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Physics",
    subjectRoute: "mht-cet-physics",
    subjectDisplay: "MHT-CET Physics",
    chapterSlug: "magnetic-fields-due-to-electric-current",
    chipLabel: "Magnetic Fields notes",
    chapter: MHTCET_MAGFIELD_CHAPTER,
    notes: MHTCET_MAGFIELD_NOTES,
    slugs: MHTCET_MAGFIELD_SLUGS,
  },
  {
    examName: "MHT-CET",
    subjectName: "Physics",
    subjectRoute: "mht-cet-physics",
    subjectDisplay: "MHT-CET Physics",
    chapterSlug: "current-electricity",
    chipLabel: "Current Electricity",
    chapter: MHTCET_CURRENT_CHAPTER,
    notes: MHTCET_CURRENT_NOTES,
    slugs: MHTCET_CURRENT_SLUGS,
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
  {
    examName: "NDA",
    subjectName: "Geography",
    subjectRoute: "nda-geography",
    subjectDisplay: "NDA Geography",
    chapterSlug: "indian-geography-economy",
    chipLabel: "Indian Geography — Economy notes",
    chapter: INDIAN_GEOGRAPHY_ECONOMY_CHAPTER,
    notes: INDIAN_GEOGRAPHY_ECONOMY_NOTES,
    slugs: INDIAN_GEOGRAPHY_ECONOMY_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Geography",
    subjectRoute: "nda-geography",
    subjectDisplay: "NDA Geography",
    chapterSlug: "indian-geography-physical",
    chipLabel: "Indian Geography — Physical notes",
    chapter: INDIAN_GEOGRAPHY_PHYSICAL_CHAPTER,
    notes: INDIAN_GEOGRAPHY_PHYSICAL_NOTES,
    slugs: INDIAN_GEOGRAPHY_PHYSICAL_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Geography",
    subjectRoute: "nda-geography",
    subjectDisplay: "NDA Geography",
    chapterSlug: "climatology",
    chipLabel: "Climatology notes",
    chapter: CLIMATOLOGY_CHAPTER,
    notes: CLIMATOLOGY_NOTES,
    slugs: CLIMATOLOGY_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Geography",
    subjectRoute: "nda-geography",
    subjectDisplay: "NDA Geography",
    chapterSlug: "world-human-geography",
    chipLabel: "World & Human Geography notes",
    chapter: WORLD_HUMAN_GEOGRAPHY_CHAPTER,
    notes: WORLD_HUMAN_GEOGRAPHY_NOTES,
    slugs: WORLD_HUMAN_GEOGRAPHY_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Geography",
    subjectRoute: "nda-geography",
    subjectDisplay: "NDA Geography",
    chapterSlug: "earth-in-space",
    chipLabel: "Earth in Space notes",
    chapter: EARTH_IN_SPACE_CHAPTER,
    notes: EARTH_IN_SPACE_NOTES,
    slugs: EARTH_IN_SPACE_SLUGS,
  },
  {
    examName: "NDA",
    subjectName: "Geography",
    subjectRoute: "nda-geography",
    subjectDisplay: "NDA Geography",
    chapterSlug: "oceanography",
    chipLabel: "Oceanography notes",
    chapter: OCEANOGRAPHY_CHAPTER,
    notes: OCEANOGRAPHY_NOTES,
    slugs: OCEANOGRAPHY_SLUGS,
  },
  {
    examName: "CDS",
    subjectName: "Mathematics",
    subjectRoute: "cds-maths",
    subjectDisplay: "CDS Mathematics",
    chapterSlug: "number-system",
    chipLabel: "Number System notes",
    chapter: CDS_NUMBER_SYSTEM_CHAPTER,
    notes: CDS_NUMBER_SYSTEM_NOTES,
    slugs: CDS_NUMBER_SYSTEM_SLUGS,
  },
  {
    examName: "CDS",
    subjectName: "Mathematics",
    subjectRoute: "cds-maths",
    subjectDisplay: "CDS Mathematics",
    chapterSlug: "trigonometry",
    chipLabel: "Trigonometry notes",
    chapter: CDS_TRIGONOMETRY_CHAPTER,
    notes: CDS_TRIGONOMETRY_NOTES,
    slugs: CDS_TRIGONOMETRY_SLUGS,
  },
  {
    examName: "CDS",
    subjectName: "Mathematics",
    subjectRoute: "cds-maths",
    subjectDisplay: "CDS Mathematics",
    chapterSlug: "mensuration-2d",
    chipLabel: "Mensuration 2D notes",
    chapter: CDS_MENSURATION_2D_CHAPTER,
    notes: CDS_MENSURATION_2D_NOTES,
    slugs: CDS_MENSURATION_2D_SLUGS,
  },
  {
    examName: "CDS",
    subjectName: "Mathematics",
    subjectRoute: "cds-maths",
    subjectDisplay: "CDS Mathematics",
    chapterSlug: "mensuration-3d",
    chipLabel: "Mensuration 3D notes",
    chapter: CDS_MENSURATION_3D_CHAPTER,
    notes: CDS_MENSURATION_3D_NOTES,
    slugs: CDS_MENSURATION_3D_SLUGS,
  },
  {
    examName: "CDS",
    subjectName: "Mathematics",
    subjectRoute: "cds-maths",
    subjectDisplay: "CDS Mathematics",
    chapterSlug: "triangles",
    chipLabel: "Triangles notes",
    chapter: CDS_TRIANGLES_CHAPTER,
    notes: CDS_TRIANGLES_NOTES,
    slugs: CDS_TRIANGLES_SLUGS,
  },
  {
    examName: "CDS",
    subjectName: "Mathematics",
    subjectRoute: "cds-maths",
    subjectDisplay: "CDS Mathematics",
    chapterSlug: "algebraic-identities",
    chipLabel: "Algebraic Identities notes",
    chapter: CDS_ALGEBRAIC_IDENTITIES_CHAPTER,
    notes: CDS_ALGEBRAIC_IDENTITIES_NOTES,
    slugs: CDS_ALGEBRAIC_IDENTITIES_SLUGS,
  },
  {
    examName: "CDS",
    subjectName: "Mathematics",
    subjectRoute: "cds-maths",
    subjectDisplay: "CDS Mathematics",
    chapterSlug: "quadratic-equations",
    chipLabel: "Quadratic Equations notes",
    chapter: CDS_QUADRATIC_EQUATIONS_CHAPTER,
    notes: CDS_QUADRATIC_EQUATIONS_NOTES,
    slugs: CDS_QUADRATIC_EQUATIONS_SLUGS,
  },
  {
    examName: "CDS",
    subjectName: "Mathematics",
    subjectRoute: "cds-maths",
    subjectDisplay: "CDS Mathematics",
    chapterSlug: "surds-indices",
    chipLabel: "Surds and Indices notes",
    chapter: CDS_SURDS_INDICES_CHAPTER,
    notes: CDS_SURDS_INDICES_NOTES,
    slugs: CDS_SURDS_INDICES_SLUGS,
  },
  {
    examName: "CDS",
    subjectName: "Mathematics",
    subjectRoute: "cds-maths",
    subjectDisplay: "CDS Mathematics",
    chapterSlug: "statistics",
    chipLabel: "Statistics notes",
    chapter: CDS_STATISTICS_CHAPTER,
    notes: CDS_STATISTICS_NOTES,
    slugs: CDS_STATISTICS_SLUGS,
  },
  {
    examName: "CDS",
    subjectName: "Mathematics",
    subjectRoute: "cds-maths",
    subjectDisplay: "CDS Mathematics",
    chapterSlug: "polynomials",
    chipLabel: "Polynomials notes",
    chapter: CDS_POLYNOMIALS_CHAPTER,
    notes: CDS_POLYNOMIALS_NOTES,
    slugs: CDS_POLYNOMIALS_SLUGS,
  },
  {
    examName: "CDS",
    subjectName: "Mathematics",
    subjectRoute: "cds-maths",
    subjectDisplay: "CDS Mathematics",
    chapterSlug: "ratio",
    chipLabel: "Ratio and Proportion notes",
    chapter: CDS_RATIO_CHAPTER,
    notes: CDS_RATIO_NOTES,
    slugs: CDS_RATIO_SLUGS,
  },
  {
    examName: "CDS",
    subjectName: "Mathematics",
    subjectRoute: "cds-maths",
    subjectDisplay: "CDS Mathematics",
    chapterSlug: "tsd",
    chipLabel: "Time, Speed and Distance notes",
    chapter: CDS_TSD_CHAPTER,
    notes: CDS_TSD_NOTES,
    slugs: CDS_TSD_SLUGS,
  },
  {
    examName: "CDS",
    subjectName: "Mathematics",
    subjectRoute: "cds-maths",
    subjectDisplay: "CDS Mathematics",
    chapterSlug: "circles",
    chipLabel: "Circles notes",
    chapter: CDS_CIRCLES_CHAPTER,
    notes: CDS_CIRCLES_NOTES,
    slugs: CDS_CIRCLES_SLUGS,
  },
  {
    examName: "CDS",
    subjectName: "Mathematics",
    subjectRoute: "cds-maths",
    subjectDisplay: "CDS Mathematics",
    chapterSlug: "quadrilaterals",
    chipLabel: "Quadrilaterals notes",
    chapter: CDS_QUADRILATERALS_CHAPTER,
    notes: CDS_QUADRILATERALS_NOTES,
    slugs: CDS_QUADRILATERALS_SLUGS,
  },
  {
    examName: "CDS",
    subjectName: "Mathematics",
    subjectRoute: "cds-maths",
    subjectDisplay: "CDS Mathematics",
    chapterSlug: "data-interpretation",
    chipLabel: "Data Interpretation notes",
    chapter: CDS_DATA_INTERPRETATION_CHAPTER,
    notes: CDS_DATA_INTERPRETATION_NOTES,
    slugs: CDS_DATA_INTERPRETATION_SLUGS,
  },
  {
    examName: "CDS",
    subjectName: "Mathematics",
    subjectRoute: "cds-maths",
    subjectDisplay: "CDS Mathematics",
    chapterSlug: "percentage",
    chipLabel: "Percentage, Profit and Loss notes",
    chapter: CDS_PERCENTAGE_CHAPTER,
    notes: CDS_PERCENTAGE_NOTES,
    slugs: CDS_PERCENTAGE_SLUGS,
  },
  {
    examName: "CDS",
    subjectName: "Mathematics",
    subjectRoute: "cds-maths",
    subjectDisplay: "CDS Mathematics",
    chapterSlug: "averages",
    chipLabel: "Averages notes",
    chapter: CDS_AVERAGES_CHAPTER,
    notes: CDS_AVERAGES_NOTES,
    slugs: CDS_AVERAGES_SLUGS,
  },
  {
    examName: "CDS",
    subjectName: "Mathematics",
    subjectRoute: "cds-maths",
    subjectDisplay: "CDS Mathematics",
    chapterSlug: "time-work",
    chipLabel: "Time and Work notes",
    chapter: CDS_TIME_WORK_CHAPTER,
    notes: CDS_TIME_WORK_NOTES,
    slugs: CDS_TIME_WORK_SLUGS,
  },
  {
    examName: "CDS",
    subjectName: "Mathematics",
    subjectRoute: "cds-maths",
    subjectDisplay: "CDS Mathematics",
    chapterSlug: "heights",
    chipLabel: "Heights and Distances notes",
    chapter: CDS_HEIGHTS_CHAPTER,
    notes: CDS_HEIGHTS_NOTES,
    slugs: CDS_HEIGHTS_SLUGS,
  },
  {
    examName: "CDS",
    subjectName: "Mathematics",
    subjectRoute: "cds-maths",
    subjectDisplay: "CDS Mathematics",
    chapterSlug: "linear-equations",
    chipLabel: "Linear Equations notes",
    chapter: CDS_LINEAR_EQUATIONS_CHAPTER,
    notes: CDS_LINEAR_EQUATIONS_NOTES,
    slugs: CDS_LINEAR_EQUATIONS_SLUGS,
  },
  {
    examName: "CDS",
    subjectName: "Mathematics",
    subjectRoute: "cds-maths",
    subjectDisplay: "CDS Mathematics",
    chapterSlug: "interest",
    chipLabel: "Simple and Compound Interest notes",
    chapter: CDS_INTEREST_CHAPTER,
    notes: CDS_INTEREST_NOTES,
    slugs: CDS_INTEREST_SLUGS,
  },
  {
    examName: "CDS",
    subjectName: "Mathematics",
    subjectRoute: "cds-maths",
    subjectDisplay: "CDS Mathematics",
    chapterSlug: "logarithms",
    chipLabel: "Logarithms notes",
    chapter: CDS_LOGARITHMS_CHAPTER,
    notes: CDS_LOGARITHMS_NOTES,
    slugs: CDS_LOGARITHMS_SLUGS,
  },
  {
    examName: "CDS",
    subjectName: "Mathematics",
    subjectRoute: "cds-maths",
    subjectDisplay: "CDS Mathematics",
    chapterSlug: "sets",
    chipLabel: "Sets notes",
    chapter: CDS_SETS_CHAPTER,
    notes: CDS_SETS_NOTES,
    slugs: CDS_SETS_SLUGS,
  },
  {
    examName: "CDS",
    subjectName: "Mathematics",
    subjectRoute: "cds-maths",
    subjectDisplay: "CDS Mathematics",
    chapterSlug: "lines-angles",
    chipLabel: "Lines, Angles and Polygons notes",
    chapter: CDS_LINES_ANGLES_CHAPTER,
    notes: CDS_LINES_ANGLES_NOTES,
    slugs: CDS_LINES_ANGLES_SLUGS,
  },
  {
    examName: "CDS",
    subjectName: "Mathematics",
    subjectRoute: "cds-maths",
    subjectDisplay: "CDS Mathematics",
    chapterSlug: "sequences",
    chipLabel: "Sequence and Series notes",
    chapter: CDS_SEQUENCES_CHAPTER,
    notes: CDS_SEQUENCES_NOTES,
    slugs: CDS_SEQUENCES_SLUGS,
  },
  {
    examName: "CDS",
    subjectName: "Mathematics",
    subjectRoute: "cds-maths",
    subjectDisplay: "CDS Mathematics",
    chapterSlug: "inequalities",
    chipLabel: "Inequalities notes",
    chapter: CDS_INEQUALITIES_CHAPTER,
    notes: CDS_INEQUALITIES_NOTES,
    slugs: CDS_INEQUALITIES_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Maths",
    subjectRoute: "jee-mains-maths",
    subjectDisplay: "JEE Mains Maths",
    chapterSlug: "conic-sections",
    chipLabel: "Conic Sections notes",
    chapter: JEE_CONIC_SECTIONS_CHAPTER,
    notes: JEE_CONIC_SECTIONS_NOTES,
    slugs: JEE_CONIC_SECTIONS_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Maths",
    subjectRoute: "jee-mains-maths",
    subjectDisplay: "JEE Mains Maths",
    chapterSlug: "three-dimensional-geometry",
    chipLabel: "3D Geometry notes",
    chapter: JEE_3D_GEOMETRY_CHAPTER,
    notes: JEE_3D_GEOMETRY_NOTES,
    slugs: JEE_3D_GEOMETRY_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Maths",
    subjectRoute: "jee-mains-maths",
    subjectDisplay: "JEE Mains Maths",
    chapterSlug: "sequences-and-series",
    chipLabel: "Sequences and Series notes",
    chapter: JEE_SEQUENCES_CHAPTER,
    notes: JEE_SEQUENCES_NOTES,
    slugs: JEE_SEQUENCES_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Maths",
    subjectRoute: "jee-mains-maths",
    subjectDisplay: "JEE Mains Maths",
    chapterSlug: "relations-and-functions",
    chipLabel: "Relations and Functions notes",
    chapter: JEE_FUNCTIONS_CHAPTER,
    notes: JEE_FUNCTIONS_NOTES,
    slugs: JEE_FUNCTIONS_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Maths",
    subjectRoute: "jee-mains-maths",
    subjectDisplay: "JEE Mains Maths",
    chapterSlug: "definite-integration",
    chipLabel: "Definite Integration notes",
    chapter: JEE_DEFINITE_INTEGRATION_CHAPTER,
    notes: JEE_DEFINITE_INTEGRATION_NOTES,
    slugs: JEE_DEFINITE_INTEGRATION_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Maths",
    subjectRoute: "jee-mains-maths",
    subjectDisplay: "JEE Mains Maths",
    chapterSlug: "vector-algebra",
    chipLabel: "Vector Algebra notes",
    chapter: JEE_VECTOR_ALGEBRA_CHAPTER,
    notes: JEE_VECTOR_ALGEBRA_NOTES,
    slugs: JEE_VECTOR_ALGEBRA_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Maths",
    subjectRoute: "jee-mains-maths",
    subjectDisplay: "JEE Mains Maths",
    chapterSlug: "differential-equations",
    chipLabel: "Differential Equations notes",
    chapter: JEE_DIFFERENTIAL_EQUATIONS_CHAPTER,
    notes: JEE_DIFFERENTIAL_EQUATIONS_NOTES,
    slugs: JEE_DIFFERENTIAL_EQUATIONS_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Maths",
    subjectRoute: "jee-mains-maths",
    subjectDisplay: "JEE Mains Maths",
    chapterSlug: "binomial-theorem",
    chipLabel: "Binomial Theorem notes",
    chapter: JEE_BINOMIAL_THEOREM_CHAPTER,
    notes: JEE_BINOMIAL_THEOREM_NOTES,
    slugs: JEE_BINOMIAL_THEOREM_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Maths",
    subjectRoute: "jee-mains-maths",
    subjectDisplay: "JEE Mains Maths",
    chapterSlug: "permutations-and-combinations",
    chipLabel: "Permutations and Combinations notes",
    chapter: JEE_PNC_CHAPTER,
    notes: JEE_PNC_NOTES,
    slugs: JEE_PNC_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Maths",
    subjectRoute: "jee-mains-maths",
    subjectDisplay: "JEE Mains Maths",
    chapterSlug: "probability",
    chipLabel: "Probability notes",
    chapter: JEE_PROBABILITY_CHAPTER,
    notes: JEE_PROBABILITY_NOTES,
    slugs: JEE_PROBABILITY_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Maths",
    subjectRoute: "jee-mains-maths",
    subjectDisplay: "JEE Mains Maths",
    chapterSlug: "complex-numbers",
    chipLabel: "Complex Numbers notes",
    chapter: JEE_COMPLEX_NUMBERS_CHAPTER,
    notes: JEE_COMPLEX_NUMBERS_NOTES,
    slugs: JEE_COMPLEX_NUMBERS_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Maths",
    subjectRoute: "jee-mains-maths",
    subjectDisplay: "JEE Mains Maths",
    chapterSlug: "application-of-derivatives",
    chipLabel: "Application of Derivatives notes",
    chapter: JEE_AOD_CHAPTER,
    notes: JEE_AOD_NOTES,
    slugs: JEE_AOD_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Maths",
    subjectRoute: "jee-mains-maths",
    subjectDisplay: "JEE Mains Maths",
    chapterSlug: "determinants",
    chipLabel: "Determinants notes",
    chapter: JEE_DETERMINANTS_CHAPTER,
    notes: JEE_DETERMINANTS_NOTES,
    slugs: JEE_DETERMINANTS_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Maths",
    subjectRoute: "jee-mains-maths",
    subjectDisplay: "JEE Mains Maths",
    chapterSlug: "limits-and-continuity",
    chipLabel: "Limits and Continuity notes",
    chapter: JEE_LIMITS_CHAPTER,
    notes: JEE_LIMITS_NOTES,
    slugs: JEE_LIMITS_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Maths",
    subjectRoute: "jee-mains-maths",
    subjectDisplay: "JEE Mains Maths",
    chapterSlug: "quadratic-equations",
    chipLabel: "Quadratic Equations notes",
    chapter: JEE_QUADRATIC_EQUATIONS_CHAPTER,
    notes: JEE_QUADRATIC_EQUATIONS_NOTES,
    slugs: JEE_QUADRATIC_EQUATIONS_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Maths",
    subjectRoute: "jee-mains-maths",
    subjectDisplay: "JEE Mains Maths",
    chapterSlug: "statistics",
    chipLabel: "Statistics notes",
    chapter: JEE_STATISTICS_CHAPTER,
    notes: JEE_STATISTICS_NOTES,
    slugs: JEE_STATISTICS_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Maths",
    subjectRoute: "jee-mains-maths",
    subjectDisplay: "JEE Mains Maths",
    chapterSlug: "differentiation",
    chipLabel: "Differentiation notes",
    chapter: JEE_DIFFERENTIATION_CHAPTER,
    notes: JEE_DIFFERENTIATION_NOTES,
    slugs: JEE_DIFFERENTIATION_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Maths",
    subjectRoute: "jee-mains-maths",
    subjectDisplay: "JEE Mains Maths",
    chapterSlug: "application-of-integrals",
    chipLabel: "Application of Integrals notes",
    chapter: JEE_AOI_CHAPTER,
    notes: JEE_AOI_NOTES,
    slugs: JEE_AOI_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Maths",
    subjectRoute: "jee-mains-maths",
    subjectDisplay: "JEE Mains Maths",
    chapterSlug: "straight-lines",
    chipLabel: "Straight Lines notes",
    chapter: JEE_STRAIGHT_LINES_CHAPTER,
    notes: JEE_STRAIGHT_LINES_NOTES,
    slugs: JEE_STRAIGHT_LINES_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Maths",
    subjectRoute: "jee-mains-maths",
    subjectDisplay: "JEE Mains Maths",
    chapterSlug: "mathematical-reasoning",
    chipLabel: "Mathematical Reasoning notes",
    chapter: JEE_MATHEMATICAL_REASONING_CHAPTER,
    notes: JEE_MATHEMATICAL_REASONING_NOTES,
    slugs: JEE_MATHEMATICAL_REASONING_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Maths",
    subjectRoute: "jee-mains-maths",
    subjectDisplay: "JEE Mains Maths",
    chapterSlug: "inverse-trigonometric-functions",
    chipLabel: "Inverse Trigonometric Functions notes",
    chapter: JEE_ITF_CHAPTER,
    notes: JEE_ITF_NOTES,
    slugs: JEE_ITF_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Maths",
    subjectRoute: "jee-mains-maths",
    subjectDisplay: "JEE Mains Maths",
    chapterSlug: "trigonometric-equations",
    chipLabel: "Trigonometric Equations notes",
    chapter: JEE_TRIG_EQUATIONS_CHAPTER,
    notes: JEE_TRIG_EQUATIONS_NOTES,
    slugs: JEE_TRIG_EQUATIONS_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Maths",
    subjectRoute: "jee-mains-maths",
    subjectDisplay: "JEE Mains Maths",
    chapterSlug: "indefinite-integration",
    chipLabel: "Indefinite Integration notes",
    chapter: JEE_INDEFINITE_INTEGRATION_CHAPTER,
    notes: JEE_INDEFINITE_INTEGRATION_NOTES,
    slugs: JEE_INDEFINITE_INTEGRATION_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Maths",
    subjectRoute: "jee-mains-maths",
    subjectDisplay: "JEE Mains Maths",
    chapterSlug: "trigonometric-identities",
    chipLabel: "Trigonometric Identities notes",
    chapter: JEE_TRIG_IDENTITIES_CHAPTER,
    notes: JEE_TRIG_IDENTITIES_NOTES,
    slugs: JEE_TRIG_IDENTITIES_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Maths",
    subjectRoute: "jee-mains-maths",
    subjectDisplay: "JEE Mains Maths",
    chapterSlug: "height-and-distance",
    chipLabel: "Heights and Distances notes",
    chapter: JEE_HEIGHTS_CHAPTER,
    notes: JEE_HEIGHTS_NOTES,
    slugs: JEE_HEIGHTS_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Maths",
    subjectRoute: "jee-mains-maths",
    subjectDisplay: "JEE Mains Maths",
    chapterSlug: "properties-of-triangle",
    chipLabel: "Properties of Triangle notes",
    chapter: JEE_TRIANGLE_CHAPTER,
    notes: JEE_TRIANGLE_NOTES,
    slugs: JEE_TRIANGLE_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Chemistry",
    subjectRoute: "jee-mains-chemistry",
    subjectDisplay: "JEE Mains Chemistry",
    chapterSlug: "solutions",
    chipLabel: "Solutions notes",
    chapter: JEE_CH_SOL_CHAPTER,
    notes: JEE_CH_SOL_NOTES,
    slugs: JEE_CH_SOL_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Chemistry",
    subjectRoute: "jee-mains-chemistry",
    subjectDisplay: "JEE Mains Chemistry",
    chapterSlug: "structure-of-atom",
    chipLabel: "Structure of Atom notes",
    chapter: JEE_CH_ATOM_CHAPTER,
    notes: JEE_CH_ATOM_NOTES,
    slugs: JEE_CH_ATOM_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Chemistry",
    subjectRoute: "jee-mains-chemistry",
    subjectDisplay: "JEE Mains Chemistry",
    chapterSlug: "chemical-kinetics",
    chipLabel: "Chemical Kinetics notes",
    chapter: JEE_CH_KIN_CHAPTER,
    notes: JEE_CH_KIN_NOTES,
    slugs: JEE_CH_KIN_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Chemistry",
    subjectRoute: "jee-mains-chemistry",
    subjectDisplay: "JEE Mains Chemistry",
    chapterSlug: "equilibrium",
    chipLabel: "Equilibrium notes",
    chapter: JEE_CH_EQ_CHAPTER,
    notes: JEE_CH_EQ_NOTES,
    slugs: JEE_CH_EQ_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Chemistry",
    subjectRoute: "jee-mains-chemistry",
    subjectDisplay: "JEE Mains Chemistry",
    chapterSlug: "electrochemistry",
    chipLabel: "Electrochemistry notes",
    chapter: JEE_CH_ELEC_CHAPTER,
    notes: JEE_CH_ELEC_NOTES,
    slugs: JEE_CH_ELEC_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Chemistry",
    subjectRoute: "jee-mains-chemistry",
    subjectDisplay: "JEE Mains Chemistry",
    chapterSlug: "thermodynamics",
    chipLabel: "Thermodynamics notes",
    chapter: JEE_CH_THERMO_CHAPTER,
    notes: JEE_CH_THERMO_NOTES,
    slugs: JEE_CH_THERMO_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Chemistry",
    subjectRoute: "jee-mains-chemistry",
    subjectDisplay: "JEE Mains Chemistry",
    chapterSlug: "some-basic-concepts",
    chipLabel: "Some Basic Concepts notes",
    chapter: JEE_CH_SBC_CHAPTER,
    notes: JEE_CH_SBC_NOTES,
    slugs: JEE_CH_SBC_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Chemistry",
    subjectRoute: "jee-mains-chemistry",
    subjectDisplay: "JEE Mains Chemistry",
    chapterSlug: "chemical-bonding",
    chipLabel: "Chemical Bonding notes",
    chapter: JEE_CH_BOND_CHAPTER,
    notes: JEE_CH_BOND_NOTES,
    slugs: JEE_CH_BOND_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Chemistry",
    subjectRoute: "jee-mains-chemistry",
    subjectDisplay: "JEE Mains Chemistry",
    chapterSlug: "periodicity",
    chipLabel: "Periodicity notes",
    chapter: JEE_CH_PER_CHAPTER,
    notes: JEE_CH_PER_NOTES,
    slugs: JEE_CH_PER_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Chemistry",
    subjectRoute: "jee-mains-chemistry",
    subjectDisplay: "JEE Mains Chemistry",
    chapterSlug: "coordination-compounds",
    chipLabel: "Coordination Compounds notes",
    chapter: JEE_CH_COORD_CHAPTER,
    notes: JEE_CH_COORD_NOTES,
    slugs: JEE_CH_COORD_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Chemistry",
    subjectRoute: "jee-mains-chemistry",
    subjectDisplay: "JEE Mains Chemistry",
    chapterSlug: "organic-reaction-mechanisms",
    chipLabel: "Organic Reaction Mechanisms notes",
    chapter: JEE_CH_ORM_CHAPTER,
    notes: JEE_CH_ORM_NOTES,
    slugs: JEE_CH_ORM_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Chemistry",
    subjectRoute: "jee-mains-chemistry",
    subjectDisplay: "JEE Mains Chemistry",
    chapterSlug: "p-block-elements",
    chipLabel: "p-Block Elements notes",
    chapter: JEE_CH_PB_CHAPTER,
    notes: JEE_CH_PB_NOTES,
    slugs: JEE_CH_PB_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Chemistry",
    subjectRoute: "jee-mains-chemistry",
    subjectDisplay: "JEE Mains Chemistry",
    chapterSlug: "d-and-f-block-elements",
    chipLabel: "d- and f-Block Elements notes",
    chapter: JEE_CH_DFB_CHAPTER,
    notes: JEE_CH_DFB_NOTES,
    slugs: JEE_CH_DFB_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Chemistry",
    subjectRoute: "jee-mains-chemistry",
    subjectDisplay: "JEE Mains Chemistry",
    chapterSlug: "haloalkanes-and-haloarenes",
    chipLabel: "Haloalkanes and Haloarenes notes",
    chapter: JEE_CH_HALO_CHAPTER,
    notes: JEE_CH_HALO_NOTES,
    slugs: JEE_CH_HALO_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Chemistry",
    subjectRoute: "jee-mains-chemistry",
    subjectDisplay: "JEE Mains Chemistry",
    chapterSlug: "hydrocarbons",
    chipLabel: "Hydrocarbons notes",
    chapter: JEE_CH_HC_CHAPTER,
    notes: JEE_CH_HC_NOTES,
    slugs: JEE_CH_HC_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Chemistry",
    subjectRoute: "jee-mains-chemistry",
    subjectDisplay: "JEE Mains Chemistry",
    chapterSlug: "alcohols-phenols-and-ethers",
    chipLabel: "Alcohols, Phenols and Ethers notes",
    chapter: JEE_CH_ALC_CHAPTER,
    notes: JEE_CH_ALC_NOTES,
    slugs: JEE_CH_ALC_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Chemistry",
    subjectRoute: "jee-mains-chemistry",
    subjectDisplay: "JEE Mains Chemistry",
    chapterSlug: "organic-basic-principles",
    chipLabel: "Basic Principles of Organic Chemistry notes",
    chapter: JEE_CH_GOC_CHAPTER,
    notes: JEE_CH_GOC_NOTES,
    slugs: JEE_CH_GOC_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Chemistry",
    subjectRoute: "jee-mains-chemistry",
    subjectDisplay: "JEE Mains Chemistry",
    chapterSlug: "aldehydes-ketones-and-carboxylic-acids",
    chipLabel: "Aldehydes, Ketones and Carboxylic Acids notes",
    chapter: JEE_CH_ALD_CHAPTER,
    notes: JEE_CH_ALD_NOTES,
    slugs: JEE_CH_ALD_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Chemistry",
    subjectRoute: "jee-mains-chemistry",
    subjectDisplay: "JEE Mains Chemistry",
    chapterSlug: "biomolecules",
    chipLabel: "Biomolecules notes",
    chapter: JEE_CH_BIO_CHAPTER,
    notes: JEE_CH_BIO_NOTES,
    slugs: JEE_CH_BIO_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Chemistry",
    subjectRoute: "jee-mains-chemistry",
    subjectDisplay: "JEE Mains Chemistry",
    chapterSlug: "amines",
    chipLabel: "Amines notes",
    chapter: JEE_CH_AMINE_CHAPTER,
    notes: JEE_CH_AMINE_NOTES,
    slugs: JEE_CH_AMINE_SLUGS,
  },
  {
    examName: "JEE Mains",
    subjectName: "Physics",
    subjectRoute: "jee-mains-physics",
    subjectDisplay: "JEE Mains Physics",
    chapterSlug: "units-and-measurements",
    chipLabel: "Units and Measurements notes",
    chapter: JEE_PH_UNIT_CHAPTER,
    notes: JEE_PH_UNIT_NOTES,
    slugs: JEE_PH_UNIT_SLUGS,
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
/**
 * A subject's chapters in reading order: textbook order where the subject has
 * one (MHT-CET — src/lib/notes/bookOrder.ts), otherwise registry order.
 */
export function getNotesChaptersForSubject(
  subjectRoute: string
): NotesChapterRegistration[] {
  return inBookOrder(NOTES_CHAPTERS.filter((c) => c.subjectRoute === subjectRoute));
}
