/**
 * Playbook catalog for /guide/nda-geography/playbooks.
 *
 * 7 playbooks, 1:1 with chapters. Same shape as nda-physics + nda-chemistry
 * + nda-biology (chapter-level playbooks, no per-subtopic split) — Geography
 * subtopics are well-cleaned but mid-thin (max 36 q on Agriculture; most
 * 4–15 q). Per-subtopic playbooks would proliferate without adding clarity.
 *
 * `bucket` tags map each playbook to one of the 3 strategy strands (Recall
 * / Apply / Verify) defined in strategy.ts. Buckets reflect the dominant
 * skill the chapter demands:
 *
 *   - recall  (173 q · 3 playbooks): Indian Geography — Physical Features,
 *                                    Indian Geography — Economy + Resources
 *                                    + Transport, World and Human Geography
 *                                    (named-fact recall: rivers, peaks,
 *                                    states, crops, minerals, ports, world
 *                                    rivers, megacities)
 *   - apply   (131 q · 2 playbooks): Climatology, Earth's Structure
 *                                    (mechanism-tracing: cyclogenesis,
 *                                    monsoon dynamics, plate tectonics,
 *                                    weathering chemistry, rock-cycle
 *                                    classification)
 *   - verify  (41 q · 2 playbooks):  Earth in Space + Maps + Coordinates,
 *                                    Oceanography (multi-statement
 *                                    evaluation dominates — "consider the
 *                                    following terrestrial planets / cold
 *                                    ocean currents / mid-oceanic ridges
 *                                    ..."). Smaller chapters where the
 *                                    statement-evaluation execution mode
 *                                    is the dominant shape rather than
 *                                    pure named-fact recall.
 *
 * NOTE on bucket sizes: Geography is 50% Recall, 38% Apply, 12% Verify by
 * the chapters-grouped split above. The "verify" execution mode (multi-
 * statement evaluation + match-the-pairs) actually appears across EVERY
 * chapter at ~27% of bank shape, but only Oceanography + Earth in Space
 * have it as the DOMINANT subtopic-level shape. Don't read bucket totals
 * as "this many q are Verify" — they're "the chapters that LEAN verify
 * contain this many q in total".
 */

export type PlaybookBucket = "recall" | "apply" | "verify";

export type Playbook = {
  slug: string;
  name: string;
  /** Single-line summary shown on the index card. */
  summary: string;
  chapter: string;
  /** All subtopics in `chapter` that this playbook covers. */
  subtopics: string[];
  qCount: number;
  pctHard: number;
  bucket: PlaybookBucket;
};

export const PLAYBOOKS: Playbook[] = [
  // ─────── Recall strand (3 playbooks · 173 q) ───────
  {
    slug: "indian-geography-economy",
    name: "Indian Geography — Economy, Resources and Transport",
    summary:
      "81 q · 24% HARD — the largest chapter AND the densest-HARD recall chapter. Agriculture, Crops, Soils and Land Use (36 q · 17% HARD — kharif/rabi crops, RAD scheme, leading-producer states), Minerals and Mining (11 · 36% HARD — densest HARD subtopic, critical-mineral identifications), Energy and Industries (12 · 25% HARD), plus Schemes/Transport/Ports. Recall-heavy but trap-aware — drill /reference-tables → 'Mineral & Crop Producer States' cluster.",
    chapter: "Indian Geography — Economy, Resources and Transport",
    subtopics: [
      "Agriculture, Crops, Soils and Land Use",
      "Energy and Industries — Power, Petroleum, Iron and Steel",
      "Minerals and Mining",
      "Economic Sectors and Government Schemes",
      "Highways, Railways and Transport Corridors",
      "Ports and Maritime Infrastructure",
    ],
    qCount: 81,
    pctHard: 24,
    bucket: "recall",
  },
  {
    slug: "indian-geography-physical",
    name: "Indian Geography — Physical Features",
    summary:
      "67 q · 15% HARD. Indian Rivers, Lakes and Water Bodies (27 q · 11% HARD — the chapter's biggest subtopic: river↔state pairs, tributaries, alternative names, dams and lakes), Forests and Natural Vegetation of India (14 · 29% HARD — vegetation belts, forest-cover rankings, protected areas), Indian Soils and Climate-Agriculture (10 · 10% HARD — soil↔crop pairs + the monsoon), Mountains, Plateaus and Plains (7 · 14% HARD — Himalayan ranges + passes), Location, Extent and Frontiers (5 · 20% HARD — the east-west sunrise gap, coastline, neighbours), Indian States and Islands (4 · 0% HARD). Recall-heavy named-fact memorisation — drill /reference-tables → 'Indian Rivers' + 'Indian Mountain Peaks' clusters.",
    chapter: "Indian Geography — Physical Features",
    subtopics: [
      "Location, Extent and Frontiers of India",
      "Mountains, Plateaus and Plains of India",
      "Indian Rivers, Lakes and Water Bodies",
      "Indian Soils and Climate-Agriculture",
      "Forests and Natural Vegetation of India",
      "Indian States and Islands",
    ],
    qCount: 67,
    pctHard: 15,
    bucket: "recall",
  },
  {
    slug: "world-and-human-geography",
    name: "World and Human Geography",
    summary:
      "25 q · 8% HARD — lightest %HARD of any chapter. Human Geography — Megacities and Population (15 · 0% HARD — megacity identification, population basics, guaranteed marks), World — Rivers, Canals and Water Bodies (6 · 33% HARD — Helmand/Suez/Panama identification), World — Coordinates, Time and Place (4). Recall-heavy world-atlas facts; the smallest chapter that rewards a one-pass read.",
    chapter: "World and Human Geography",
    subtopics: [
      "Human Geography — Megacities and Population",
      "World — Rivers, Canals and Water Bodies",
      "World — Coordinates, Time and Place",
    ],
    qCount: 25,
    pctHard: 8,
    bucket: "recall",
  },

  // ─────── Apply strand (2 playbooks · 131 q) ───────
  {
    slug: "climatology-atmosphere-weather",
    name: "Climatology, Atmosphere and Weather",
    summary:
      "57 q · 28% HARD — the densest-HARD chapter. Atmospheric Layers (14 · 21% HARD — troposphere/stratosphere/mesosphere/thermosphere, aurora), Cyclones, Fronts and Local Winds (14 · 29% HARD — tropical vs extratropical cyclones, named local winds), Humidity + Clouds + Precipitation (10), Climate Classification (8 · 38% HARD — Koeppen zones), Atmospheric Pressure + Winds (6 · 50% HARD — Coriolis, trade winds, jet streams), Insolation + Temperature (5). Apply strand because mechanism-tracing dominates: cyclogenesis, monsoon dynamics, pressure-belt formation.",
    chapter: "Climatology, Atmosphere and Weather",
    subtopics: [
      "Atmospheric Layers, Composition and Aurora",
      "Cyclones, Fronts and Local Winds",
      "Humidity, Condensation, Clouds and Precipitation",
      "Climate Classification and Zones",
      "Atmospheric Pressure and Winds",
      "Insolation, Temperature and Solar Geometry",
    ],
    qCount: 57,
    pctHard: 28,
    bucket: "apply",
  },
  {
    slug: "earths-structure-landforms",
    name: "Earth's Structure, Landforms and Geological Time",
    summary:
      "74 q · 20% HARD. Earth's Interior, Crust and Plate Tectonics (18 · 28% HARD — densest HARD subtopic, plate-boundary types, seismic-wave layering), Landforms and Mass Movements (15 · 13% HARD), Rocks, Minerals and Geological Time (14 · 29% HARD — igneous/sedimentary/metamorphic identification), Weathering and Denudation (9 · 0% HARD — guaranteed marks pocket), Earthquakes (8 · 37% HARD), plus Volcanoes + Soils. Apply strand because mechanism-tracing dominates: tectonic processes, rock-cycle classification, weathering chemistry.",
    chapter: "Earth's Structure, Landforms and Geological Time",
    subtopics: [
      "Earth's Interior, Crust and Plate Tectonics",
      "Landforms and Mass Movements",
      "Rocks, Minerals and Geological Time",
      "Weathering and Denudation",
      "Earthquakes and Seismic Waves",
      "Soils",
      "Volcanoes and Igneous Activity",
    ],
    qCount: 74,
    pctHard: 20,
    bucket: "apply",
  },

  // ─────── Verify strand (2 playbooks · 41 q) ───────
  {
    slug: "earth-in-space-maps",
    name: "Earth in Space, Maps and Coordinates",
    summary:
      "22 q · 18% HARD. Earth's Shape, Rotation and Motion (7 · 14% HARD — seasons, axial tilt, equinox/solstice), Latitude, Longitude and Geographical Grid (6 · 0% HARD — guaranteed marks if you know the basics), Planets and Solar System (4 · 50% HARD — chapter's HARD pool, terrestrial vs Jovian distinctions, multi-statement evaluation), Time Zones + IDL (3 · 33% HARD — 12 noon Delhi → London arithmetic), Maps and GPS (2). Verify strand because multi-statement evaluation dominates ('consider the following statements about terrestrial planets / arrange these zones in latitudinal extent').",
    chapter: "Earth in Space, Maps and Coordinates",
    subtopics: [
      "Earth's Shape, Rotation and Motion",
      "Latitude, Longitude and Geographical Grid",
      "Planets and Solar System",
      "Time Zones and International Date Line",
      "Maps and GPS",
    ],
    qCount: 22,
    pctHard: 18,
    bucket: "verify",
  },
  {
    slug: "oceanography",
    name: "Oceanography",
    summary:
      "19 q · 11% HARD. Ocean Currents (7 · 14% HARD — warm vs cold currents like Gulf Stream / California Current, Coriolis driving forces), Tides and Ocean Movements (5 · 0% HARD), Ocean Waves and Sea-Floor Topography (4 · 25% HARD — mid-oceanic ridge), Marine Ecosystems — Coral Reefs (3 · 0% HARD). Verify strand because multi-statement evaluation dominates ('which of the following are cold ocean currents / consider the following factors influencing currents').",
    chapter: "Oceanography",
    subtopics: [
      "Ocean Currents",
      "Tides and Ocean Movements",
      "Ocean Waves and Sea-Floor Topography",
      "Marine Ecosystems — Coral Reefs",
    ],
    qCount: 19,
    pctHard: 11,
    bucket: "verify",
  },
];

/** Slugs eligible for /playbooks/[slug] static rendering. */
export const PLAYBOOK_SLUGS = PLAYBOOKS.map((p) => p.slug);

/** Index by bucket — used by the /playbooks index page. */
export const PLAYBOOKS_BY_BUCKET: Record<PlaybookBucket, Playbook[]> = {
  recall: PLAYBOOKS.filter((p) => p.bucket === "recall"),
  apply: PLAYBOOKS.filter((p) => p.bucket === "apply"),
  verify: PLAYBOOKS.filter((p) => p.bucket === "verify"),
};
