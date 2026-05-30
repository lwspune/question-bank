/**
 * Playbook catalog for /guide/nda-physics/playbooks.
 *
 * A "playbook" in NDA Physics = one chapter, treated end-to-end. Unlike NDA
 * English (where playbooks map 1-per-subtopic because chapters are skill
 * buckets), NDA Physics chapters ARE the topical unit and the 50 subtopics
 * are too fine-grained — several have 1–3 q each. So we ship 14 playbooks,
 * one per chapter, each enumerating its full subtopic breakdown.
 *
 * `chapter` + `subtopics[]` are canonical names (matched at request time via
 * resolveTaxonomy → UUIDs for /browse links). `qCount` is the chapter total
 * (sum across subtopics, SQL-derived).
 *
 * `bucket` tags map each playbook to one of the 3 strategy strands (Recall
 * / Apply / Reason) defined in strategy.ts:
 *   - recall (79 q):  Sound, Modern Physics, Astronomy, Energy Sources, Units
 *   - apply  (215 q): Light+Optics, Laws of Motion, Kinematics, WEP, Gravitation, Oscillations
 *   - reason (155 q): E&M, Heat+Thermo, Fluid Mechanics
 *
 * Bucket sizes are deliberately uneven — they reflect the bank's actual
 * shape, not a quota.
 */

export type PlaybookBucket = "recall" | "apply" | "reason";

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
  // ─────── Recall strand (5 playbooks, 79 q) ───────
  {
    slug: "sound",
    name: "Sound",
    summary:
      "34 q · 3% HARD — the bank's lowest-HARD chapter. Properties of sound (amplitude, pitch, loudness), v=fλ plug-in, SONAR, beats, ear anatomy. Pure recall + one-step calc.",
    chapter: "Sound",
    subtopics: [
      "Foundations — Sound, Perception, and the Ear",
      "Wave Equation, Speed, and Frequency Bands",
      "Sound Behaviours — Reflection, Echo, Reverberation, Beats",
      "Applications — SONAR, Transducers, Instruments",
    ],
    qCount: 34,
    pctHard: 3,
    bucket: "recall",
  },
  {
    slug: "modern-physics",
    name: "Modern Physics",
    summary:
      "25 q · 0% HARD. Atomic structure, nuclear fission/fusion, photoelectric effect (qualitative), E=hf dimension, scientist–discovery pairs, acronyms (LED, LASER). Every question is recall.",
    chapter: "Modern Physics",
    subtopics: [
      "Atomic Structure",
      "Nuclear Physics",
      "Photoelectric Effect",
      "Quantum and Modern EM",
      "Scientists and Discoveries",
      "Scientific Acronyms",
    ],
    qCount: 25,
    pctHard: 0,
    bucket: "recall",
  },
  {
    slug: "units-measurement-and-dimensions",
    name: "Units, Measurement and Dimensions",
    summary:
      "14 q · 7% HARD. SI vs CGS unit recall, dimensional formulas (G, h, force, pressure), 'which is dimensionless?', precision/least-count. Mostly EASY; one HARD per paper at most.",
    chapter: "Units, Measurement and Dimensions",
    subtopics: ["Units and Dimensions"],
    qCount: 14,
    pctHard: 7,
    bucket: "recall",
  },
  {
    slug: "astronomy-and-space",
    name: "Astronomy and Space",
    summary:
      "4 q · 0% HARD across 10 years. Light year, parsec, planets-by-size, black hole = star remnant. Easiest 4 marks in the bank — read once, memorise once, done.",
    chapter: "Astronomy and Space",
    subtopics: ["Astronomy and Space"],
    qCount: 4,
    pctHard: 0,
    bucket: "recall",
  },
  {
    slug: "energy-sources",
    name: "Energy Sources",
    summary:
      "2 q · 0% HARD across 10 years. Conventional vs non-conventional, bio-mass identification. Don't over-invest — but don't skip either, it's a recall freebie.",
    chapter: "Energy Sources",
    subtopics: ["Energy Sources"],
    qCount: 2,
    pctHard: 0,
    bucket: "recall",
  },

  // ─────── Apply strand (6 playbooks, 215 q) ───────
  {
    slug: "light-and-optics",
    name: "Light and Optics",
    summary:
      "97 q · 10% HARD — the largest chapter. Hybrid: half recall (Light Phenomena, Optical Instruments, Eye defects), half formula-apply (mirror formula, lens formula, Snell's law, lens-power calc). Drill Light Phenomena + Optical Instruments first for fast marks.",
    chapter: "Light and Optics",
    subtopics: [
      "Light Phenomena and Spectrum",
      "Reflection and Mirrors",
      "Refraction, Speed of Light and TIR",
      "Human Eye and Optical Instruments",
      "Lenses and Lens Formula",
      "Prisms and Dispersion",
    ],
    qCount: 97,
    pctHard: 10,
    bucket: "apply",
  },
  {
    slug: "laws-of-motion-and-forces",
    name: "Laws of Motion and Forces",
    summary:
      "41 q · 10% HARD. Newton's three laws (statements + applications), momentum conservation in collisions/recoil/explosions, impulse=Δp. The chapter that grew 3× in 2023–24.",
    chapter: "Laws of Motion and Forces",
    subtopics: [
      "Newton's Laws of Motion",
      "Conservation of Momentum and Collisions",
      "Types of Forces",
      "Impulse and Momentum",
      "Friction",
    ],
    qCount: 41,
    pctHard: 10,
    bucket: "apply",
  },
  {
    slug: "kinematics-and-motion",
    name: "Kinematics and Motion",
    summary:
      "24 q · 25% HARD. Small chapter, heavy HARD load. v=u+at, s=ut+½at², v²=u²+2as plug-in dominates, plus V-T/X-T graph reading and the lone Vectors-and-Position subtopic at 67% HARD.",
    chapter: "Kinematics and Motion",
    subtopics: [
      "Equations of Motion and Graphs",
      "Circular Motion",
      "Projectile and Vertical Motion",
      "Vectors and Position",
    ],
    qCount: 24,
    pctHard: 25,
    bucket: "apply",
  },
  {
    slug: "work-energy-and-power",
    name: "Work, Energy and Power",
    summary:
      "23 q · 9% HARD. KE=½mv², PE=mgh, W=Fd cosθ, P=W/t. Conservation between KE↔PE in free-fall and on inclined planes. Simple Machines (lever class identification) is the recall corner.",
    chapter: "Work, Energy and Power",
    subtopics: [
      "Energy and Conservation",
      "Work-Energy Theorem and Power",
      "Work and Work Done",
      "Simple Machines",
    ],
    qCount: 23,
    pctHard: 9,
    bucket: "apply",
  },
  {
    slug: "gravitation",
    name: "Gravitation",
    summary:
      "17 q · 12% HARD. F=Gm₁m₂/r², g=GM/R², escape velocity √(2gR), orbital period T²∝R³ (Kepler 3rd), weightlessness in free-fall. The 'planet-scaled' ratio question is the recurring HARD shape.",
    chapter: "Gravitation",
    subtopics: [
      "Gravitational Field and Potential",
      "Newton's Law of Gravitation",
      "Orbits, Kepler and Escape",
    ],
    qCount: 17,
    pctHard: 12,
    bucket: "apply",
  },
  {
    slug: "oscillations-and-waves",
    name: "Oscillations and Waves",
    summary:
      "13 q · 15% HARD. Simple pendulum T=2π√(L/g) (period-vs-length-vs-mass-vs-g ratios), SHM displacement/velocity/acceleration sign mapping, wave property statements. Small chapter, formula-rich.",
    chapter: "Oscillations and Waves",
    subtopics: [
      "Simple Pendulum",
      "Simple Harmonic Motion and General Waves",
    ],
    qCount: 13,
    pctHard: 15,
    bucket: "apply",
  },

  // ─────── Reason strand (3 playbooks, 155 q) ───────
  {
    slug: "electricity-and-magnetism",
    name: "Electricity and Magnetism",
    summary:
      "93 q · 22% HARD — the bank's #1 HARD pool. Resistance and Circuits (26 q at 42% HARD) carries the chapter. Series-vs-parallel resistor reasoning, V=IR, P=I²R, charge-in-magnetic-field force direction, electrostatics shell theorem. The single highest-leverage chapter for HARD-pool prep.",
    chapter: "Electricity and Magnetism",
    subtopics: [
      "Resistance and Circuit Combinations",
      "Current Electricity (Ohm's Law and Power)",
      "Electrical Devices",
      "Electrostatics",
      "Magnetism",
      "Electromagnetic Rules (Right-Hand and Fleming)",
    ],
    qCount: 93,
    pctHard: 22,
    bucket: "reason",
  },
  {
    slug: "heat-and-thermodynamics",
    name: "Heat and Thermodynamics",
    summary:
      "39 q · 21% HARD. Calorimetry mixing (heat-balance equations with phase change) + thermodynamic process variants (PV=nRT, PVⁿ=const, P=kT) are the HARD pools. Temperature-scale conversions and latent-heat statement-truth are the EASY plumbing.",
    chapter: "Heat and Thermodynamics",
    subtopics: [
      "Heat, Calorimetry and Specific Heat",
      "Temperature and Thermometry",
      "Phase Change and Boiling",
      "Thermodynamic Processes",
    ],
    qCount: 39,
    pctHard: 21,
    bucket: "reason",
  },
  {
    slug: "fluid-mechanics-and-properties-of-matter",
    name: "Fluid Mechanics and Properties of Matter",
    summary:
      "23 q · 30% HARD — the chapter with the highest %HARD in the bank. Buoyancy with density mixing (ρ₁+ρ₂ by equal-volume vs equal-mass), pressure P=hρg, surface tension. Small chapter, dense traps.",
    chapter: "Fluid Mechanics and Properties of Matter",
    subtopics: ["Buoyancy, Density and Flotation", "Pressure and Surface Tension"],
    qCount: 23,
    pctHard: 30,
    bucket: "reason",
  },
];

/** Slugs eligible for /playbooks/[slug] static rendering. */
export const PLAYBOOK_SLUGS = PLAYBOOKS.map((p) => p.slug);

/** Index by bucket — used by the /playbooks index page. */
export const PLAYBOOKS_BY_BUCKET: Record<PlaybookBucket, Playbook[]> = {
  recall: PLAYBOOKS.filter((p) => p.bucket === "recall"),
  apply: PLAYBOOKS.filter((p) => p.bucket === "apply"),
  reason: PLAYBOOKS.filter((p) => p.bucket === "reason"),
};
