/**
 * Content for /guide/nda-geography/strategy.
 *
 * NDA Geography strategy = skill-strand split (Recall / Apply / Verify),
 * with strand-level %HARD calibration (not per-chapter `DrillPosture`
 * like Physics) — because Geography's HARD is NON-FLAT (4 of 7 chapters
 * > 15% HARD) but NOT concentrated in 1–2 subtopics per chapter the way
 * Physics is. Per-chapter cherry-pick has weak leverage; strand-level
 * calibration matters more.
 *
 * Strand split (345 q):
 *   - Recall  (173 q · 3 chapters · 50% of bank): named-fact recall —
 *     Indian rivers + peaks + states + crops + minerals + ports + world
 *     rivers + megacities. The marks-per-hour leader.
 *   - Apply   (131 q · 2 chapters · 38% of bank): mechanism-tracing —
 *     cyclogenesis, monsoon dynamics, plate tectonics, weathering
 *     chemistry, rock-cycle classification. Densest-HARD strand
 *     (Climatology 28%, Earth's Structure 20%).
 *   - Verify  (41 q · 2 chapters · 12% of bank): multi-statement
 *     evaluation. Earth in Space + Oceanography lean this way — the
 *     dominant question shape is "consider the following statements about
 *     [planets/currents]... which are correct?".
 *
 * NOTE on bucket sizes: Geography is 50% Recall, 38% Apply, 12% Verify by
 * chapter. The "verify" execution mode (multi-statement evaluation +
 * match-the-pairs) actually appears across EVERY chapter at ~27% of bank
 * shape — but only Earth in Space + Oceanography have it as the DOMINANT
 * subtopic-level shape. A Climatology question can still be "verify" by
 * shape even though the chapter is grouped in Apply.
 *
 * GAT PART A Geography is ~19 q per single paper (range 17–21 across the
 * 2017–2026 bank; avg 19.2). Marks per correct = 4, penalty −1.33 — same
 * 4 / −1.33 scoring as every NDA section. Per-paper max ≈ 76 marks.
 * (Note: Geography is the LARGEST GAT PART A General Studies section.
 * History ~15, Polity ~5, Economics ~1–2, Current Affairs ~10, General
 * Science (Physics ~25 + Chemistry ~15 + Biology ~10–11) split between
 * PART A + PART B differently. Each section contributes independently to
 * the GAT 600-mark total.)
 */

import type { Difficulty } from "@/lib/questions/filters";

export type StrandChapter = {
  chapter: string;
  qCount: number;
  pctHard: number;
  /** Subtopics to drill (each becomes a "Drill →" CTA). */
  mustDrill: string[];
  /** Realistic marks ceiling per paper from this chapter. */
  expectedYieldPerPaper: string;
  studyHours: number;
  /** 1-2 sentence pitch shown at the top of the card. */
  summary: string;
};

export type StrategyStrand = {
  id: "recall" | "apply" | "verify";
  label: string;
  qCount: number;
  pctOfBank: number;
  /** One-paragraph "what this strand is" pitch. */
  pitch: string;
  /** The prep approach — what makes this strand distinct. */
  approach: string[];
  chapters: StrandChapter[];
};

/** Headline numbers shown in the strategy hero. PART A Geography is ~19 q
 *  per single paper on the GAT (range 17–21 across 18 papers in the bank;
 *  avg 19.2). Max marks per paper ≈ 76 (19 × 4), penalty −1.33 per wrong. */
export const STRATEGY_HEADLINE = {
  paperQ: 19,
  totalMarks: 76,
  marksPerCorrect: 4,
  penaltyPerWrong: 1.33,
  targetMarks: 50,
  targetAttempts: 16,
  targetAccuracyPct: 85,
};

export const RECALL_STRAND: StrategyStrand = {
  id: "recall",
  label:
    "Recall — Indian Geography Economy · Indian Geography Physical · World and Human Geography (173 q · 50%)",
  qCount: 173,
  pctOfBank: 50,
  pitch:
    "Pure named-fact recall — Indian rivers ↔ states ↔ tributaries, peaks ↔ ranges ↔ elevations, minerals ↔ producer states, crops ↔ soils ↔ kharif/rabi, ports ↔ coast, world rivers ↔ countries, megacities ↔ population. 173 q at an average of 17% HARD. Half the entire bank, and the strand where Geography most rewards methodical prep. The Indian Geography Economy chapter (81 q · 24% HARD) is the densest-HARD recall chapter in the bank — the named-fact memorisation is precise (rare critical minerals, specific RAD-scheme components, identity of oil fields) but completely measurable. Drill /reference-tables → 'Indian Rivers' + 'Mountain Peaks' + 'Mineral & Crop Producer States' clusters side-by-side with this strand.",
  approach: [
    "Read /guide/nda-geography/reference-tables end-to-end first. That's the ~70 named-fact pairs the recall strand keeps re-testing. Active-recall it in 4 passes (cover the right column, read the name, write the pair).",
    "Indian Geography Economy is the bank's largest chapter (81 q · 24% HARD) AND the densest-HARD recall chapter. The Agriculture, Crops, Soils and Land Use subtopic alone is 36 q (kharif vs rabi, leading-producer states per crop, soil-crop matching). Minerals and Mining (11 q · 36% HARD) is the bank's most-trap-aware named-fact subtopic — drill the critical-mineral list (lithium, cobalt, gallium, neodymium, dysprosium, tellurium) cold.",
    "Indian Geography Physical (67 q · 15% HARD) is the named-fact workhorse. Forests and Natural Vegetation (34 q) is the chapter's giant subtopic — biodiversity hotspots, tropical/temperate/alpine forest types, key sanctuary↔state pairs. Indian Rivers (15 q · 13% HARD) tests river↔state pairs and tributary identification (Yamuna's tributaries: Chambal, Betwa, Ken). Mountains, Plateaus and Plains (7 q · 43% HARD) is the densest-HARD subtopic — Himalayan passes ↔ ranges + state borders.",
    "World and Human Geography (25 q · 8% HARD) is the lightest %HARD chapter — guaranteed marks pocket. Megacities + Population (15 q · 0% HARD) is pure recall. World Rivers + Canals (6 q · 33% HARD) tests Helmand/Hindu Kush, Suez/Panama, landlocked-water-body identification. Don't over-invest beyond the read.",
  ],
  chapters: [
    {
      chapter: "Indian Geography — Economy, Resources and Transport",
      qCount: 81,
      pctHard: 24,
      mustDrill: [
        "Agriculture, Crops, Soils and Land Use",
        "Energy and Industries — Power, Petroleum, Iron and Steel",
        "Minerals and Mining",
        "Economic Sectors and Government Schemes",
        "Highways, Railways and Transport Corridors",
        "Ports and Maritime Infrastructure",
      ],
      expectedYieldPerPaper: "~12 marks",
      studyHours: 8,
      summary:
        "81 q · 24% HARD. The bank's largest chapter. Agriculture (36 q) is the giant subtopic — drill leading-producer-state tables. Minerals and Mining (11 q · 36% HARD) is the trap pocket — drill critical minerals cold. Reference-tables 'Mineral & Crop Producer States' cluster compounds the value.",
    },
    {
      chapter: "Indian Geography — Physical Features",
      qCount: 67,
      pctHard: 15,
      mustDrill: [
        "Forests and Natural Vegetation of India",
        "Indian Rivers, Lakes and Water Bodies",
        "Indian Soils and Climate-Agriculture",
        "Mountains, Plateaus and Plains of India",
        "Indian States and Islands",
      ],
      expectedYieldPerPaper: "~10 marks",
      studyHours: 6,
      summary:
        "67 q · 15% HARD. Forests + Natural Vegetation (34 q) is the chapter's giant subtopic. Rivers (15 q) tests river↔state pairs + tributaries. Mountains (7 q · 43% HARD) carries the chapter's HARD pool — Himalayan passes ↔ ranges. Reference-tables 'Indian Rivers' + 'Mountain Peaks' clusters compound the value.",
    },
    {
      chapter: "World and Human Geography",
      qCount: 25,
      pctHard: 8,
      mustDrill: [
        "Human Geography — Megacities and Population",
        "World — Rivers, Canals and Water Bodies",
        "World — Coordinates, Time and Place",
      ],
      expectedYieldPerPaper: "~3 marks",
      studyHours: 2,
      summary:
        "25 q · 8% HARD — lightest %HARD chapter. Megacities + Population (15 q · 0% HARD) is pure recall — guaranteed marks. World Rivers (6 q · 33% HARD) tests Helmand-Hindu Kush, Suez/Panama canals, landlocked bodies (Caspian Sea, Lake Baikal). Read once, recognise on test day.",
    },
  ],
};

export const APPLY_STRAND: StrategyStrand = {
  id: "apply",
  label: "Apply — Climatology, Atmosphere and Weather · Earth's Structure, Landforms and Geological Time (131 q · 38%)",
  qCount: 131,
  pctOfBank: 38,
  pitch:
    "Mechanism-tracing — follow a geographic process and predict the outcome. Climatology (57 q · 28% HARD) requires tracing cyclogenesis (tropical vs extratropical), monsoon dynamics, pressure-belt formation, Coriolis-driven wind deflection. Earth's Structure (74 q · 20% HARD) requires tracing plate-boundary processes (convergent → mountains/subduction; divergent → ridges; transform → faults), rock-cycle classification (igneous/sedimentary/metamorphic), weathering chemistry. 131 q at an average of 23% HARD — the densest-HARD strand in the bank. The skill is process-tracing, not pure recall: the answer follows from the mechanism, not from a memorised fact.",
  approach: [
    "Memorise the 4 master mechanisms first: (1) Plate tectonics — convergent boundaries (oceanic-continental → subduction + volcanic arc → Andes; continental-continental → mountain folding → Himalayas), divergent (mid-oceanic ridges → seafloor spreading), transform (San Andreas). (2) Cyclones — tropical (5°–30° latitude, warm ocean ≥27°C, no fronts, Coriolis = 0 at equator so they don't form there) vs extratropical (mid + high latitudes, frontal systems, cold + warm air masses). (3) Wind deflection — Coriolis deflects winds RIGHT in N hemisphere, LEFT in S. Trade winds blow NE→SW (N) and SE→NW (S) toward equator. (4) Rock cycle — igneous (cooled magma → basalt + granite); sedimentary (compacted sediments → sandstone + shale + limestone; chemical formation → chert + halite); metamorphic (heat/pressure transforms — limestone → marble, sandstone → quartzite, shale → slate).",
    "Climatology Cyclones subtopic (14 q · 29% HARD) is a hot Apply pocket. The 2026 NDA-1 PYQ tests extratropical cyclones — mid + high latitudes, fronts present, jet-stream-driven. Tropical cyclones DON'T form within 5° of equator (Coriolis ≈ 0). Hurricane = N Atlantic / NE Pacific; Typhoon = NW Pacific; Cyclone = N/S Indian Ocean. Same storm, different regional names.",
    "Earth's Structure Earth's Interior + Plate Tectonics (18 q · 28% HARD) is the chapter's HARD pocket. Inner core = solid iron-nickel; outer core = molten iron-nickel; mantle = silicate rocks (asthenosphere = partial melt, drives convection); crust = thinnest layer (oceanic 5–10 km, continental 30–70 km). Seismic waves: P-waves (primary, longitudinal, fastest, travel through everything); S-waves (secondary, transverse, can't travel through liquid → don't pass through outer core, that's how we know it's liquid); L-waves (surface, slowest, most damaging).",
    "Climatology Atmospheric Pressure + Winds (6 q · 50% HARD) is small but HARD-dense. Pressure belts at 0° (equatorial low), 30° (subtropical high), 60° (sub-polar low), 90° (polar high). Trade winds from 30° → 0°, westerlies from 30° → 60°, polar easterlies from 90° → 60°. Jet streams = narrow fast westerly winds in upper troposphere; polar jet (~60° lat) + subtropical jet (~30°).",
  ],
  chapters: [
    {
      chapter: "Climatology, Atmosphere and Weather",
      qCount: 57,
      pctHard: 28,
      mustDrill: [
        "Atmospheric Layers, Composition and Aurora",
        "Cyclones, Fronts and Local Winds",
        "Humidity, Condensation, Clouds and Precipitation",
        "Climate Classification and Zones",
        "Atmospheric Pressure and Winds",
        "Insolation, Temperature and Solar Geometry",
      ],
      expectedYieldPerPaper: "~6 marks",
      studyHours: 6,
      summary:
        "57 q · 28% HARD — the densest-HARD chapter. Atmospheric Layers + Cyclones (14 + 14 = 28 q) are the giant subtopics. Atmospheric Pressure (6 q · 50% HARD) is small but HARD-dense. Mechanism-tracing dominates — drill the cyclogenesis + pressure-belt + Coriolis mechanisms cold.",
    },
    {
      chapter: "Earth's Structure, Landforms and Geological Time",
      qCount: 74,
      pctHard: 20,
      mustDrill: [
        "Earth's Interior, Crust and Plate Tectonics",
        "Landforms and Mass Movements",
        "Rocks, Minerals and Geological Time",
        "Weathering and Denudation",
        "Earthquakes and Seismic Waves",
        "Soils",
        "Volcanoes and Igneous Activity",
      ],
      expectedYieldPerPaper: "~8 marks",
      studyHours: 6,
      summary:
        "74 q · 20% HARD. Earth's Interior + Plate Tectonics (18 q · 28% HARD) is the densest-HARD subtopic — drill plate-boundary types + seismic-wave layering cold. Landforms (15 q) + Rocks (14 q · 29% HARD) carry the bulk. Weathering (9 q · 0% HARD) is a guaranteed marks pocket — read once, done.",
    },
  ],
};

export const VERIFY_STRAND: StrategyStrand = {
  id: "verify",
  label: "Verify — Earth in Space, Maps and Coordinates · Oceanography (41 q · 12%)",
  qCount: 41,
  pctOfBank: 12,
  pitch:
    "Multi-statement true/false evaluation. The dominant question shape in these chapters is 'Consider the following statements about [terrestrial planets / cold ocean currents / mid-oceanic ridges]. Which are correct?' — 3 or 4 statements, each individually verifiable. 41 q across 2 chapters at an average of 15% HARD. The skill is methodical statement-by-statement evaluation: read each statement, judge it true/false against your knowledge, then match to the option that lists exactly the correct ones. Speed matters — these questions take longer per attempt than pure recall.",
  approach: [
    "Drill the statement-evaluation execution mode separately from pure recall. The trap is partial-credit thinking — you can't get 'half the statements right'; you must judge each one true/false correctly. The option that lists exactly 2 correct statements (when there are 3 correct) is a distractor.",
    "Earth in Space Planets subtopic (4 q · 50% HARD) is the chapter's HARD pool. Terrestrial planets (Mercury, Venus, Earth, Mars) — small + dense + rocky + few/no moons + close to Sun. Jovian planets (Jupiter, Saturn, Uranus, Neptune) — large + low-density + gaseous + many moons + far from Sun. Distractor swaps a trait across the two groups (e.g. 'terrestrial planets have many moons').",
    "Earth in Space Time Zones (3 q · 33% HARD) is small but HARD-dense. IST = UTC+5:30 (82.5°E meridian, passes through Mirzapur in UP, also Andhra Pradesh + Odisha + Chhattisgarh). London = UTC+0. So 12 noon Delhi = 06:30 London. Each 15° of longitude = 1 hour difference (east = ahead, west = behind). IDL = 180° meridian (with deviations through Bering Strait + around island groups).",
    "Oceanography Ocean Currents (7 q · 14% HARD) tests warm/cold current pairs and driving forces. Warm currents (towards poles): Gulf Stream, Kuroshio, Brazil. Cold currents (towards equator): California, Humboldt, Benguela, Labrador, West Wind Drift (Antarctic circumpolar). North Atlantic Drift = warm extension of Gulf Stream → why W Europe is mild. Factors driving currents: Coriolis + gravity + solar heating + wind + salinity-density differences.",
    "Oceanography Sea-Floor Topography (4 q · 25% HARD) tests mid-oceanic-ridge basics. Mid-Atlantic Ridge runs N-S through middle of Atlantic. Iceland sits on the ridge (volcanic). Hawaii sits on a HOTSPOT, NOT on a ridge — distractor lists Hawaii as ridge-associated. Galapagos is on a triple junction near the East Pacific Rise.",
  ],
  chapters: [
    {
      chapter: "Earth in Space, Maps and Coordinates",
      qCount: 22,
      pctHard: 18,
      mustDrill: [
        "Earth's Shape, Rotation and Motion",
        "Latitude, Longitude and Geographical Grid",
        "Planets and Solar System",
        "Time Zones and International Date Line",
        "Maps and GPS",
      ],
      expectedYieldPerPaper: "~3 marks",
      studyHours: 2.5,
      summary:
        "22 q · 18% HARD. Latitude/Longitude (6 q · 0% HARD) is guaranteed marks. Planets (4 q · 50% HARD) is the HARD pool — terrestrial vs Jovian distinctions tested via multi-statement evaluation. Time Zones (3 q · 33% HARD) tests IST/UTC arithmetic.",
    },
    {
      chapter: "Oceanography",
      qCount: 19,
      pctHard: 11,
      mustDrill: [
        "Ocean Currents",
        "Tides and Ocean Movements",
        "Ocean Waves and Sea-Floor Topography",
        "Marine Ecosystems — Coral Reefs",
      ],
      expectedYieldPerPaper: "~2 marks",
      studyHours: 2,
      summary:
        "19 q · 11% HARD. Ocean Currents (7 q · 14% HARD) tests warm/cold pairs + driving forces via multi-statement evaluation. Tides (5 q · 0% HARD) is pure recall — guaranteed marks. Sea-Floor Topography (4 q · 25% HARD) tests mid-oceanic-ridge associations. Methodical statement evaluation matters.",
    },
  ],
};

export const STRATEGY_STRANDS = [RECALL_STRAND, APPLY_STRAND, VERIFY_STRAND];

export type TestDayPhase = {
  durationMin: number;
  label: string;
  detail: string;
};

/** Test-day attempt order — Recall-first to bank fast high-confidence marks,
 *  then Apply for mechanism questions, Verify last for multi-statement work
 *  (the slowest per attempt). Slot budget is ~16 min total (PART A
 *  Geography's share of the 150-min GAT is roughly proportional to its
 *  q-count: ~19 q × ~50 sec ≈ 16 min). */
export const TEST_DAY_PLAN: TestDayPhase[] = [
  {
    durationMin: 6,
    label:
      "Sweep Recall (Indian Geography Economy + Indian Geography Physical + World/Human)",
    detail:
      "Scan all ~19 Geography questions, mark every Recall-strand item (crop↔state, mineral↔state, river↔tributary, peak↔range, port↔coast, megacity, world river/canal). Expect ~10 Recall items per paper at ~30 sec each. Target: 8 correct in 6 min. If you don't recognise a state-crop or mineral-state pair within 5 sec, skip — the −1.33 penalty makes a guess negative-EV at below ~55% confidence.",
  },
  {
    durationMin: 7,
    label: "Sweep Apply (Climatology + Earth's Structure)",
    detail:
      "Attempt every mechanism-tracing question. Cyclogenesis (1–2 q), pressure-belt or wind question (1 q), plate-boundary type (1 q), rock-cycle classification (1 q), weathering chemistry (≤1 q). ~7 items × ~60 sec. Target: 5 correct. The Earth's-Interior + Plate-Tectonics HARDs can swallow 2+ min — if you're not sure within 90 sec, skip.",
  },
  {
    durationMin: 3,
    label: "Verify last (Earth in Space + Oceanography + scattered statement-evaluation)",
    detail:
      "Tackle multi-statement 'which of the following statements is correct?' questions last. These appear scattered across all chapters but cluster in Earth in Space + Oceanography. Typically ~2 dedicated Verify items + 1–2 statement-evaluation questions across other chapters. ~3 items × ~60 sec. Read each statement independently, judge true/false, then pick the option that lists exactly the correct set. Don't half-commit — if any statement is uncertain, the whole question is.",
  },
];

export type TimeBudgetRow = {
  label: string;
  hours: number;
  outcome: string;
};

export const TIME_BUDGET: TimeBudgetRow[] = [
  { label: "Recall — Indian Geography Economy + Indian Geography Physical + World/Human", hours: 16, outcome: "~25 marks/paper" },
  { label: "Apply — Climatology + Earth's Structure", hours: 12, outcome: "~14 marks/paper" },
  { label: "Verify — Earth in Space + Oceanography", hours: 4.5, outcome: "~5 marks/paper" },
  { label: "Reference-tables active recall (the /reference-tables page)", hours: 4, outcome: "Compounding gains across Recall" },
  { label: "Past papers, timed (last 3 years)", hours: 4, outcome: "Calibration + speed" },
];

export const DIFFICULTIES_EASY_MOD: Difficulty[] = ["EASY", "MODERATE"];
