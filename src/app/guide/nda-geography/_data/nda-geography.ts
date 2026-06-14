/**
 * Static content + numbers for the /guide/nda-geography route.
 *
 * Pulled from the live NDA Geography PUBLIC bank. Snapshot date is
 * `OVERVIEW.asOf`; refresh per the post-upload ritual.
 *
 * Template B variant (English-style, playbooks-only) with strand-level
 * %HARD calibration — chosen because:
 *
 *   - %HARD is NON-FLAT (4 of 7 chapters > 15% HARD: Climatology 28%,
 *     Indian Geo Economy 24%, Earth's Structure 20%, Earth in Space 18%)
 *     — disqualifies pure Template B's "≤2 chapters > 15% HARD" gate.
 *
 *   - BUT HARD is NOT concentrated in 1–2 subtopics per chapter the way
 *     Physics is (Climatology HARD spread 4-3-3-3-2-1 across 6 subs;
 *     Earth's Structure 5-4-3-2-1-0-0). Template C's per-chapter
 *     `DrillPosture` overlay has weak leverage — no clean "drill EASY
 *     subs, skip HARD subs" cherry-pick pattern.
 *
 *   - Cross-chapter lever max is rivers-water 27 q × 4 ch (after
 *     editorial filtering ~15–20 actual). Below Template A's 40 q × ≥4 ch
 *     gate. Principles axis is dead.
 *
 *   - Strand split = Recall (192 q · 56% across IG Physical + IG Economy +
 *     World + Oceanography) / Apply (153 q · 44% across Climatology +
 *     Earth's Structure + Earth in Space, mechanism-tracing: monsoon
 *     dynamics, plate tectonics, weathering, eclipses, time zones) /
 *     Verify (cross-cutting calibration overlay covering 92 q of
 *     multi-statement + match-pair questions, NOT a chapter strand of its
 *     own — the dominant non-recall execution mode spans all chapters).
 *
 *   - Geography-specific subject artefact = /reference-tables (analogue of
 *     Biology's /reference-tables — multi-domain). 4 themed clusters:
 *     Indian Rivers + Tributaries, Mountain Peaks + Ranges, Mineral + Crop
 *     Producer States, Local Winds + Climate Zones. Geography's named
 *     facts span multiple domains (rivers, peaks, minerals, crops, winds),
 *     so the multi-domain renderer (BiologyReferenceTables) is the right
 *     fit — each cluster carries its own column headers.
 *
 *   - Year drift HEADLINE: paper has NOT consistently hardened (same
 *     framing as Chemistry/Biology, opposite of Physics). 10-year %HARD
 *     20% · 42% · 6% · 14% · 8% · 19% · 13% · 20% · 30% · 20% —
 *     2018 outlier high, 2025 also high but no monotonic trajectory.
 *     Drill ALL 10 years equally.
 */

export type GuideRoute = {
  slug: string; // path segment after /guide/nda-geography (or "" for landing)
  label: string;
  blurb: string;
};

/** The 7 main routes under /guide/nda-geography, in reading order. */
export const ROUTES: GuideRoute[] = [
  {
    slug: "",
    label: "Overview",
    blurb:
      "How NDA Geography actually works — what the 345-question bank reveals.",
  },
  {
    slug: "strategy",
    label: "Strategy",
    blurb:
      "Recall, Apply, Verify — three skill strands matched to the bank's actual shape. Per-chapter must-drill subtopics and a ~30-hour time plan.",
  },
  {
    slug: "playbooks",
    label: "Playbooks",
    blurb:
      "7 playbooks — one per chapter. The dominant subtopic shape, the traps, and the worked PYQs you need.",
  },
  {
    slug: "reference-tables",
    label: "Reference tables",
    blurb:
      "Single-page index of the ~70 named-fact pairs NDA Geography actually tests. 4 themed clusters — Indian rivers, mountain peaks, mineral/crop producer states, local winds + climate zones.",
  },
  {
    slug: "trends",
    label: "Trends",
    blurb:
      "How NDA Geography shifted 2017→2026 — Indian Geography Economy grew, paper has NOT consistently hardened, 2018 + 2025 were outlier-high years. Drill all 10 years equally.",
  },
  {
    slug: "traps",
    label: "Traps",
    blurb:
      "Distractor shapes NDA Geography reuses — state↔river misalignment, mineral↔state swap, peak↔range swap, wind-direction flip, multi-statement partial-credit traps.",
  },
];

export type Overview = {
  totalQ: number;
  /** GAT papers covered. NDA Geography is asked on NDA-1 + NDA-2 each year
   *  except 2020 (COVID-cancelled NDA-2) and 2026 NDA-2 (not yet held). */
  papers: number;
  yearsCovered: number;
  chapters: number;
  /** Playbook count — 1 per chapter. */
  playbooks: number;
  /** Reference-table entries indexed on /reference-tables. */
  referenceFacts: number;
  difficulty: { easy: number; moderate: number; hard: number };
  asOf: string; // ISO date
};

/** Snapshot of the bank's shape as of the date below. */
export const OVERVIEW: Overview = {
  totalQ: 345,
  // 2017–2025: 2 papers each except 2020 (1, NDA-2 cancelled) = 17 papers.
  // 2026: 1 paper (NDA-1 only). Total: 18.
  papers: 18,
  yearsCovered: 10,
  chapters: 7,
  playbooks: 7,
  referenceFacts: 62,
  // SQL-derived 2026-05-18 — full-bank tally.
  difficulty: { easy: 88, moderate: 189, hard: 68 },
  asOf: "2026-05-18",
};

export type ChapterRow = {
  chapter: string;
  qCount: number;
  /** % of bank total (1 decimal). */
  pctTotal: number;
  /** % HARD within chapter (rounded integer). */
  pctHard: number;
  /** Top subtopics with counts, plus optional context. */
  focus: string;
};

/** 7 NDA Geography chapters, sorted by question count descending. SQL-derived
 *  against the 345-q PUBLIC bank as of OVERVIEW.asOf. Numbers in `focus` may
 *  drift as new papers land — refresh in lockstep. */
export const CHAPTER_TABLE: ChapterRow[] = [
  {
    chapter: "Indian Geography — Economy, Resources and Transport",
    qCount: 81,
    pctTotal: 23.5,
    pctHard: 24,
    focus:
      "Agriculture, Crops, Soils and Land Use (36 · 17% HARD — kharif/rabi, RAD schemes, leading-producer states), Energy and Industries — Power, Petroleum, Iron and Steel (12 · 25% HARD), Minerals and Mining (11 · 36% HARD — densest HARD pool, critical-mineral identifications), Economic Sectors and Government Schemes (10 · 30% HARD), Highways, Railways and Transport Corridors (7 · 43% HARD), Ports and Maritime Infrastructure (5 · 0% HARD).",
  },
  {
    chapter: "Earth's Structure, Landforms and Geological Time",
    qCount: 74,
    pctTotal: 21.4,
    pctHard: 20,
    focus:
      "Earth's Interior, Crust and Plate Tectonics (18 · 28% HARD — densest HARD subtopic), Landforms and Mass Movements (15 · 13% HARD), Rocks, Minerals and Geological Time (14 · 29% HARD), Weathering and Denudation (9 · 0% HARD — guaranteed marks pocket), Earthquakes and Seismic Waves (8 · 37% HARD), Soils (5), Volcanoes and Igneous Activity (5 · 0% HARD).",
  },
  {
    chapter: "Indian Geography — Physical Features",
    qCount: 67,
    pctTotal: 19.4,
    pctHard: 15,
    focus:
      "Indian Rivers, Lakes and Water Bodies (27 · 11% HARD — the chapter's biggest subtopic: river-state pairs, tributaries, alternative names, dams, lakes), Forests and Natural Vegetation of India (14 · 29% HARD — vegetation belts, forest-cover rankings, protected areas), Indian Soils and Climate-Agriculture (10 · 10% HARD — soil-crop pairs + monsoon), Mountains, Plateaus and Plains of India (7 · 14% HARD — Himalayan ranges + passes), Location, Extent and Frontiers of India (5 · 20% HARD — east-west sunrise gap, coastline, neighbours), Indian States and Islands (4 · 0% HARD).",
  },
  {
    chapter: "Climatology, Atmosphere and Weather",
    qCount: 57,
    pctTotal: 16.5,
    pctHard: 28,
    focus:
      "Atmospheric Layers, Composition and Aurora (14 · 21% HARD — troposphere/stratosphere/aurora basics), Cyclones, Fronts and Local Winds (14 · 29% HARD — tropical vs extratropical cyclones, Loo/Chinook/Foehn identification), Humidity, Condensation, Clouds and Precipitation (10 · 20% HARD), Climate Classification and Zones (8 · 38% HARD), Atmospheric Pressure and Winds (6 · 50% HARD — Coriolis, trade winds, jet streams), Insolation, Temperature and Solar Geometry (5 · 20% HARD).",
  },
  {
    chapter: "World and Human Geography",
    qCount: 25,
    pctTotal: 7.2,
    pctHard: 8,
    focus:
      "Human Geography — Megacities and Population (15 · 0% HARD — megacity identification, population basics), World — Rivers, Canals and Water Bodies (6 · 33% HARD), World — Coordinates, Time and Place (4). Lightest %HARD of any chapter — easy marks pocket.",
  },
  {
    chapter: "Earth in Space, Maps and Coordinates",
    qCount: 22,
    pctTotal: 6.4,
    pctHard: 18,
    focus:
      "Earth's Shape, Rotation and Motion (7 · 14% HARD), Latitude, Longitude and Geographical Grid (6 · 0% HARD), Planets and Solar System (4 · 50% HARD — chapter's HARD pool), Time Zones and International Date Line (3 · 33% HARD), Maps and GPS (2).",
  },
  {
    chapter: "Oceanography",
    qCount: 19,
    pctTotal: 5.5,
    pctHard: 11,
    focus:
      "Ocean Currents (7 · 14% HARD — cold vs warm currents), Tides and Ocean Movements (5 · 0% HARD), Ocean Waves and Sea-Floor Topography (4 · 25% HARD — mid-oceanic ridge), Marine Ecosystems — Coral Reefs (3 · 0% HARD).",
  },
];
