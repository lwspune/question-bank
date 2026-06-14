/**
 * NCERT ↔ NDA Physics chapter map (curated editorial data).
 *
 * The 14 NDA Physics chapters are broad, exam-shaped buckets that each absorb
 * 1–5 narrower NCERT chapters across Classes 9–12. This module is the lookup
 * that lets an NCERT-oriented student find the matching NDA chapter (and the
 * /browse drill behind it) — without renaming the NDA taxonomy, which the
 * bank, guides, and notes all depend on.
 *
 * WHY this is a TS module and not a DB table: it's hand-curated, low
 * cardinality, slow cadence — the same class as guide principles. Curation is
 * the signal; a DB table would dilute it (see the "principles vs concepts"
 * wall in CLAUDE.md).
 *
 * ── The weak-signal detector ──────────────────────────────────────────────
 * A subset of NDA content maps to NCERT **Class 12** (Ray/Wave Optics, Current
 * Electricity, EMI, AC, all of Modern Physics). Class-12 topics are worth
 * watching: if one starts recurring in recent papers, that's a leading
 * indicator of a syllabus drift toward Class-12 content, and a cue to invest
 * in notes/practice for it. So tracked Class-12 refs carry a `signal` with the
 * bank's recency numbers, and `signalStatus()` classifies each as:
 *   • live    — appeared in the recent window (≥1 q since RECENT_FROM)
 *   • watch   — tested historically but cold in the recent window
 *   • dormant — mapped but never seen in the bank (pure watch-list)
 * The page renders watch/dormant rows muted with a "last seen" chip — so the
 * map IS the detector, surfacing the signal the moment a topic climbs.
 *
 * We deliberately do NOT pre-write bank/notes content for dormant Class-12
 * topics. Adding content NDA isn't testing is the same error as ignoring a
 * real signal, inverted. Map it, flag it, act only when it goes live.
 *
 * ── Data provenance ───────────────────────────────────────────────────────
 * `signal` recency numbers are point-in-time snapshots from the live bank
 * (NDA Physics PUBLIC questions, keyword-probed by topic), captured 2026-06-14.
 * Refresh them by re-running the per-topic recency probe (max(pyq_year) +
 * count since RECENT_FROM) when the bank grows. The NDA chapter NAMES are the
 * load-bearing join to the DB and are guarded by
 * tests/guide-nda-physics-ncert-map.test.ts against live taxonomy.
 */

/** First pyq_year of the "recent" window = the last ~5 papers (2024-1 → 2026-1). */
export const RECENT_FROM = 2024;

/** Snapshot date for the `signal` recency numbers below. */
export const SIGNAL_SNAPSHOT = "2026-06-14";

export type NcertClass = 9 | 10 | 11 | 12;

export type SignalStatus = "live" | "watch" | "dormant";

/** Bank recency for a tracked Class-12 topic. `lastSeen` null = never seen. */
export type Signal = {
  lastSeen: number | null;
  /** PUBLIC q count for this topic since RECENT_FROM. */
  recentCount: number;
};

export type NcertRef = {
  /** Exact NCERT chapter title (globally unique across the map). */
  name: string;
  cls: NcertClass;
  /** Present only on tracked Class-12 weak-signal topics. */
  signal?: Signal;
};

export type NcertMapRow = {
  /** Must match a live NDA Physics chapter name exactly (the DB join). */
  ndaChapter: string;
  /** NCERT chapters this NDA bucket absorbs. `[]` = no NCERT 9–12 source. */
  ncert: NcertRef[];
  /** Honest callout for non-obvious mappings (Cl12 source, deleted chapter…). */
  note?: string;
};

/**
 * Classify a tracked Class-12 topic by its bank recency. Pure — the page and
 * the test both call it so "live/watch/dormant" can't drift between them.
 */
export function signalStatus(s: Signal): SignalStatus {
  if (s.recentCount >= 1) return "live";
  if (s.lastSeen !== null) return "watch";
  return "dormant";
}

/**
 * NDA-keyed map. Ordered to match the guide's chapter order (ROUTES /
 * playbooks). NCERT names are the *current* (rationalised) NCERT titles.
 */
export const NCERT_MAP: NcertMapRow[] = [
  {
    ndaChapter: "Units, Measurement and Dimensions",
    ncert: [{ name: "Units and Measurements", cls: 11 }],
    note: "Clean 1:1 with Class 11; NDA adds dimensional analysis depth.",
  },
  {
    ndaChapter: "Kinematics and Motion",
    ncert: [
      { name: "Motion", cls: 9 },
      { name: "Motion in a Straight Line", cls: 11 },
      { name: "Motion in a Plane", cls: 11 },
    ],
    note: "Three NCERT chapters fold into one NDA bucket (1-D + 2-D motion).",
  },
  {
    ndaChapter: "Laws of Motion and Forces",
    ncert: [
      { name: "Force and Laws of Motion", cls: 9 },
      { name: "Laws of Motion", cls: 11 },
    ],
  },
  {
    ndaChapter: "Work, Energy and Power",
    ncert: [
      { name: "Work and Energy", cls: 9 },
      { name: "Work, Energy and Power", cls: 11 },
    ],
  },
  {
    ndaChapter: "Gravitation",
    ncert: [
      { name: "Gravitation (Class 9)", cls: 9 },
      { name: "Gravitation (Class 11)", cls: 11 },
    ],
    note: "Class 9 covers gravitation + floatation; the floatation half is tested under NDA's Fluid Mechanics, not here.",
  },
  {
    ndaChapter: "Fluid Mechanics and Properties of Matter",
    ncert: [
      { name: "Mechanical Properties of Fluids", cls: 11 },
      { name: "Mechanical Properties of Solids", cls: 11 },
    ],
    note: "Primary source is Class 11; buoyancy/pressure are introduced earlier in the Class 9 Gravitation chapter.",
  },
  {
    ndaChapter: "Heat and Thermodynamics",
    ncert: [
      { name: "Thermal Properties of Matter", cls: 11 },
      { name: "Thermodynamics", cls: 11 },
      { name: "Kinetic Theory", cls: 11 },
    ],
    note: "Three Class 11 chapters collapse into one NDA bucket.",
  },
  {
    ndaChapter: "Oscillations and Waves",
    ncert: [
      { name: "Oscillations", cls: 11 },
      { name: "Waves", cls: 11 },
    ],
  },
  {
    ndaChapter: "Sound",
    ncert: [{ name: "Sound", cls: 9 }],
    note: "Clean 1:1 with Class 9.",
  },
  {
    ndaChapter: "Light and Optics",
    ncert: [
      { name: "Light – Reflection and Refraction", cls: 10 },
      { name: "The Human Eye and the Colourful World", cls: 10 },
      { name: "Ray Optics and Optical Instruments", cls: 12 },
      {
        name: "Wave Optics",
        cls: 12,
        signal: { lastSeen: null, recentCount: 0 },
      },
    ],
    note: "Basics are Class 10; lens/mirror depth is Class 12 Ray Optics. Wave Optics (interference/diffraction) is mapped but unseen in the bank — a Class-12 watch-list topic.",
  },
  {
    ndaChapter: "Electricity and Magnetism",
    ncert: [
      { name: "Electricity", cls: 10 },
      { name: "Magnetic Effects of Electric Current", cls: 10 },
      { name: "Electric Charges and Fields", cls: 12 },
      { name: "Current Electricity", cls: 12 },
      { name: "Moving Charges and Magnetism", cls: 12 },
      {
        name: "Electromagnetic Induction",
        cls: 12,
        signal: { lastSeen: 2017, recentCount: 0 },
      },
      {
        name: "Alternating Current",
        cls: 12,
        signal: { lastSeen: 2026, recentCount: 1 },
      },
    ],
    note: "Class 10 covers only basic circuits + magnetic effects; the depth (fields, EMI, AC) is Class 12. EMI has gone cold since 2017; AC still appears.",
  },
  {
    ndaChapter: "Modern Physics",
    ncert: [
      {
        name: "Dual Nature of Radiation and Matter",
        cls: 12,
        signal: { lastSeen: 2025, recentCount: 1 },
      },
      { name: "Atoms", cls: 12, signal: { lastSeen: 2024, recentCount: 1 } },
      { name: "Nuclei", cls: 12, signal: { lastSeen: 2024, recentCount: 2 } },
      {
        name: "Semiconductor Electronics",
        cls: 12,
        signal: { lastSeen: 2023, recentCount: 0 },
      },
      {
        name: "Communication Systems",
        cls: 12,
        signal: { lastSeen: null, recentCount: 0 },
      },
    ],
    note: "Entirely Class 12 — no NCERT 9–11 source. Semiconductor Electronics has gone cold (last 2023); Communication Systems is mapped but unseen. Both are watch-list topics for a syllabus shift.",
  },
  {
    ndaChapter: "Energy Sources",
    ncert: [],
    note: "Maps to NCERT's 'Sources of Energy' (Class 10), which was rationalised OUT of the syllabus in 2023-24. Near-absent in NDA too (2 q).",
  },
  {
    ndaChapter: "Astronomy and Space",
    ncert: [],
    note: "NDA-syllabus-specific — no NCERT physics chapter at any class.",
  },
];

/**
 * The reverse gap: NCERT chapters with effectively no NDA home. Surfaced as a
 * footer callout so the map is honest in both directions. Kept deliberately
 * short — only genuine, verified gaps.
 */
export type UnmappedNcert = {
  name: string;
  cls: NcertClass;
  note: string;
};

export const UNMAPPED_NCERT: UnmappedNcert[] = [
  {
    name: "System of Particles and Rotational Motion",
    cls: 11,
    note: "Barely tested by NDA — ~3 incidental questions across the whole bank, no dedicated chapter. Low-yield; do not over-invest.",
  },
];
