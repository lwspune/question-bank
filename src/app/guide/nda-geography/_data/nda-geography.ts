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
      "How NDA Geography actually works — what the 367-question bank reveals.",
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
   *  except 2020 (COVID-cancelled NDA-2). 2026 completed 2026-09-14. */
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
  totalQ: 367,
  // 2017–2026: 2 papers each except 2020 (1, NDA-2 COVID-cancelled) = 19.
  // NDA-2 2026 was written 2026-09-14, so 2026 is a complete year.
  papers: 19,
  yearsCovered: 10,
  chapters: 7,
  playbooks: 7,
  referenceFacts: 62,
  // SQL-derived 2026-05-18 — full-bank tally.
  difficulty: { easy: 92, moderate: 204, hard: 71 },
  asOf: "2026-09-14",
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
 *  against the 367-q PUBLIC bank as of OVERVIEW.asOf. Numbers in `focus` may
 *  drift as new papers land — refresh in lockstep. */
export const CHAPTER_TABLE: ChapterRow[] = [
  {
    chapter: "Indian Geography — Economy, Resources and Transport",
    qCount: 83,
    pctTotal: 22.6,
    pctHard: 24,
    focus:
      "Agriculture, Crops, Soils and Land Use (20 · 10% HARD — kharif/rabi, RAD schemes, leading-producer states), Economic Sectors and Government Schemes (15 · 20% HARD), Energy and Industries — Power, Petroleum, Iron and Steel (14 · 21% HARD), Minerals and Mining (14 · 36% HARD — densest HARD pool, critical-mineral identifications), Highways, Railways and Transport Corridors (10 · 50% HARD), Ports and Maritime Infrastructure (8 · 13% HARD).",
  },
  {
    chapter: "Earth's Structure, Landforms and Geological Time",
    qCount: 80,
    pctTotal: 21.8,
    pctHard: 19,
    focus:
      "Earth's Interior, Crust and Plate Tectonics (15 · 33% HARD — densest HARD subtopic), Landforms and Mass Movements (15 · 13% HARD), Rocks, Minerals and Geological Time (15 · 27% HARD), Weathering and Denudation (12 · 0% HARD — guaranteed marks pocket), Earthquakes and Seismic Waves (10 · 33% HARD), Soils (5 · 20% HARD), Volcanoes and Igneous Activity (6 · 0% HARD).",
  },
  {
    chapter: "Indian Geography — Physical Features",
    qCount: 69,
    pctTotal: 18.8,
    pctHard: 14,
    focus:
      "Indian Rivers, Lakes and Water Bodies (27 · 11% HARD — the chapter's biggest subtopic: river-state pairs, tributaries, alternative names, dams, lakes), Forests and Natural Vegetation of India (15 · 29% HARD — vegetation belts, forest-cover rankings, protected areas), Indian Soils and Climate-Agriculture (10 · 10% HARD — soil-crop pairs + monsoon), Mountains, Plateaus and Plains of India (7 · 14% HARD — Himalayan ranges + passes), Location, Extent and Frontiers of India (5 · 20% HARD — east-west sunrise gap, coastline, neighbours), Indian States and Islands (5 · 0% HARD).",
  },
  {
    chapter: "Climatology, Atmosphere and Weather",
    qCount: 65,
    pctTotal: 17.7,
    pctHard: 26,
    focus:
      "Cyclones, Fronts and Local Winds (16 · 25% HARD — tropical vs extratropical cyclones, cyclone-formation conditions, Loo/Chinook/Foehn identification), Atmospheric Layers, Composition and Aurora (12 · 25% HARD — troposphere/stratosphere/aurora basics), Humidity, Condensation, Clouds and Precipitation (10 · 20% HARD), Climate Classification and Zones (9 · 38% HARD), Atmospheric Pressure and Winds (8 · 50% HARD — Coriolis, trade winds, jet streams), Insolation, Temperature and Solar Geometry (5 · 20% HARD).",
  },
  {
    chapter: "World and Human Geography",
    qCount: 26,
    pctTotal: 7.1,
    pctHard: 12,
    focus:
      "Human Geography — Megacities and Population (16 · 0% HARD — megacity identification, population basics), World — Rivers, Canals and Water Bodies (6 · 33% HARD), World — Coordinates, Time and Place (4). Lightest %HARD of any chapter — easy marks pocket.",
  },
  {
    chapter: "Earth in Space, Maps and Coordinates",
    qCount: 24,
    pctTotal: 6.5,
    pctHard: 17,
    focus:
      "Earth's Shape, Rotation and Motion (7 · 14% HARD), Latitude, Longitude and Geographical Grid (6 · 0% HARD), Planets and Solar System (4 · 50% HARD — chapter's HARD pool), Time Zones and International Date Line (4 · 33% HARD), Maps and GPS (2).",
  },
  {
    chapter: "Oceanography",
    qCount: 20,
    pctTotal: 5.4,
    pctHard: 10,
    focus:
      "Ocean Currents (9 · 14% HARD — cold vs warm currents), Tides and Ocean Movements (5 · 0% HARD), Ocean Waves and Sea-Floor Topography (5 · 25% HARD — mid-oceanic ridge), Marine Ecosystems — Coral Reefs (1 · 0% HARD).",
  },
];
