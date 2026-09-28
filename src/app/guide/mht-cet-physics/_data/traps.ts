/**
 * Content for /guide/mht-cet-physics/traps.
 *
 * Trap shapes bucketed by the strand whose marks they cost you.
 *
 * TWO STRUCTURAL FACTS: there is NO negative marking (a blank and a wrong
 * answer both score zero), and Physics SHARES its 90 minutes with Chemistry
 * (Paper II, 100 questions). So the first traps are time traps, not physics.
 *
 * Measured shapes quoted below (PUBLIC PYQ, 2026-09-28): "ratio" appears in
 * 279 stems across 22 of 24 chapters (21% HARD); 221 questions across 19
 * chapters carry a figure (25% HARD, against 18% for the bank).
 *
 * `affects` holds playbook slugs, each resolving in playbooks.ts; EMPTY means
 * the trap is paper-wide. `exampleQuestionId` is omitted — invented UUIDs
 * ship dead links.
 */

export type TrapBucket = "cornerstone" | "quickwin" | "longtail";

export type TrapShape = {
  id: string;
  title: string;
  bucket: TrapBucket;
  affects: string[];
  mechanic: string;
  fix: string;
  exampleQuestionId?: string;
};

export const TRAP_SHAPES: TrapShape[] = [
  // -------- Cornerstone — paper-wide and the heaviest chapters --------
  {
    id: "blank-answer-habit",
    title: "Leaving a question blank — the most expensive habit on this paper",
    bucket: "cornerstone",
    affects: [],
    mechanic:
      "MHT-CET has NO negative marking. A blank and a wrong answer are both worth zero, so the reflex carried in from other exams — leave it if unsure — turns a free attempt into a certain zero. On a 50-question Physics half, five blanks are five marks you chose not to be paid for.",
    fix:
      "Mark every uncertain question as you pass it, and keep the last three minutes of Paper II for filling every blank — eliminate what you can, then choose. An unfilled bubble is the only error on this paper that costs a mark with certainty.",
  },
  {
    id: "shared-clock-drift",
    title: "No time split between Physics and Chemistry — the clock drifts to the harder subject",
    bucket: "cornerstone",
    affects: [],
    mechanic:
      "Paper II is 100 questions in 90 minutes, Physics and Chemistry together, and it does not divide the time for you. Physics is 18% HARD and Chemistry about 3%, so the paper pulls minutes towards Physics until Chemistry questions you could have answered in thirty seconds are guessed at the end. The marks are equal: a Chemistry question is worth exactly what a Physics one is.",
    fix:
      "Decide the split before the paper — a starting budget of about 35 minutes for Chemistry and 55 for Physics — and a clock time to switch. Test it in two timed mocks and adjust by your own numbers. See Strategy.",
  },
  {
    id: "ratio-by-calculation",
    title: "Computing both values in a ratio question — 279 of them, in 22 chapters",
    bucket: "cornerstone",
    affects: [
      "kinetic-theory-of-gases",
      "thermal-properties-of-matter",
      "structure-of-atoms-and-nuclei",
      "gravitation",
      "oscillations",
      "superposition-of-waves",
    ],
    mechanic:
      "The word 'ratio' is in 279 question stems across 22 of the 24 chapters. Most ask how one quantity compares in two situations — two gases, two orbits, two temperatures, two strings. Computing each value in full doubles the arithmetic and doubles the chances of a slip, all to cancel most of it at the end.",
    fix:
      "Write the formula as a proportion first, keep only what changes, and cancel the rest: v_rms ∝ √(T/M), r ∝ n²/Z, P ∝ T⁴, T ∝ √(l/g), v ∝ √(T/μ). A ratio question answered this way takes a line and rarely needs a constant.",
  },
  {
    id: "constant-q-or-v",
    title: "Changing a capacitor without asking what stayed constant",
    bucket: "cornerstone",
    affects: ["electrostatics"],
    mechanic:
      "The capacitor pages are 67 questions of Electrostatics, and nearly every change — a slab inserted, plates pulled apart — moves charge, voltage and energy in opposite directions depending on whether the battery is still connected. Both outcomes are printed.",
    fix:
      "Before any formula, write 'V fixed' (battery on) or 'Q fixed' (battery off). Then use U = ½CV² for the first and Q²/2C for the second.",
  },
  {
    id: "two-surfaces",
    title: "Counting one surface on a soap bubble",
    bucket: "cornerstone",
    affects: ["mechanical-properties-of-fluids"],
    mechanic:
      "Surface tension is two thirds of the Fluids chapter. A liquid drop has one surface; a soap bubble has two. So a bubble's excess pressure is 4T/r against a drop's 2T/r, and the work to blow a bubble is double the work to form a drop of the same size. The one-surface answer is always an option.",
    fix: "Before writing ΔP or W, ask: drop, air bubble in a liquid (one surface), or soap bubble in air (two)?",
  },
  {
    id: "amplitudes-not-intensities",
    title: "Adding intensities where amplitudes add",
    bucket: "cornerstone",
    affects: ["wave-optics", "superposition-of-waves"],
    mechanic:
      "Waves superpose by amplitude, and intensity is amplitude squared. Two sources of intensity I and 4I give a maximum of 9I and a minimum of I, not 5I and 3I. Wave Optics spends 29 questions on interference intensity.",
    fix: "Take square roots, add or subtract, square again: I_max = (√I₁ + √I₂)², I_min = (√I₁ − √I₂)².",
  },
  {
    id: "perpendicular-axis-3d",
    title: "Using the perpendicular-axis theorem on a solid body",
    bucket: "cornerstone",
    affects: ["rotational-dynamics"],
    mechanic:
      "Parallel and Perpendicular Axis Theorems is 25 questions at 48% HARD — nearly half the chapter's HARD. The perpendicular-axis theorem holds only for flat bodies; applied to a sphere or a cylinder it gives a clean, wrong number.",
    fix: "Perpendicular axis: flat bodies only. Parallel axis: any body, but only from an axis through the centre of mass.",
  },

  // -------- Quick-win — cheap chapters, cheap to lose --------
  {
    id: "figure-assumed",
    title: "Answering a figure question from what the figure usually shows",
    bucket: "quickwin",
    affects: ["semiconductor-devices", "magnetic-fields-due-to-electric-current", "current-electricity"],
    mechanic:
      "221 Physics questions across 19 chapters carry a figure, and they run 25% HARD against 18% for the bank. A gate circuit looks like a familiar gate and is another; a bridge looks balanced and is not; two wires look like their fields add and they cancel. The trap is recognising the picture instead of reading it.",
    fix:
      "Read every figure in full: trace each gate's truth table, check each bridge ratio, mark each field's direction. It costs twenty seconds and it is where the cheap chapters lose their marks.",
  },
  {
    id: "celsius-in-ratio",
    title: "Using Celsius where the law needs kelvin",
    bucket: "quickwin",
    affects: ["kinetic-theory-of-gases", "thermal-properties-of-matter", "thermodynamics"],
    mechanic:
      "v_rms ∝ √T, P ∝ T⁴ and the Carnot efficiency 1 − T₂/T₁ all need absolute temperature. 27 °C to 927 °C is 300 K to 1200 K — a factor of 4 — and a Celsius ratio gives a number that is also printed.",
    fix: "Convert every temperature to kelvin before it enters a ratio or an efficiency. Differences (ΔT) can stay in Celsius; ratios cannot.",
  },
  {
    id: "phasor-voltages",
    title: "Adding the voltages across R, L and C as numbers",
    bucket: "quickwin",
    affects: ["ac-circuits"],
    mechanic:
      "In a series LCR circuit the voltages are out of phase, so they combine as V = √(V_R² + (V_L − V_C)²). Added as numbers they exceed the source voltage — a sign that something is wrong, and an option on the paper.",
    fix: "Draw the impedance triangle. The same triangle gives Z, the phase angle and the power factor.",
  },

  // -------- Long tail — the expensive chapters --------
  {
    id: "photoelectric-intensity",
    title: "Letting brighter light raise the stopping potential",
    bucket: "longtail",
    affects: ["dual-nature-of-radiation-and-matter"],
    mechanic:
      "The photoelectric page is 56 questions at 36% HARD, and its graph questions test one split: frequency sets the electrons' energy (and so V₀); intensity sets how many there are (and so the current). An option always lets intensity move V₀.",
    fix: "Ask which of the two changed. Intensity: current moves, V₀ stays. Frequency: V₀ moves, saturation current stays.",
  },
  {
    id: "sign-convention",
    title: "Dropping a sign in the lens or mirror formula",
    bucket: "longtail",
    affects: ["ray-optics"],
    mechanic:
      "In the Cartesian convention the object distance is negative and a concave lens has a negative focal length. One lost sign turns a real image into a virtual one, and both are options. Lenses and refraction are 50 of Ray Optics' 78 questions.",
    fix: "Write each value with its sign before substituting, and check the image type against the lens: a concave lens never forms a real image of a real object.",
  },
  {
    id: "halved-chapter-hours",
    title: "Giving Gravitation and Ray Optics the hours they earned in 2023-24",
    bucket: "longtail",
    affects: ["gravitation", "ray-optics"],
    mechanic:
      "Both chapters ran above two questions a paper through 2023-24 and both fell to about one in 2025. A student prepping from 2023-24 papers still gives them two questions' worth of hours — hours that the rising chapters (Rotational Dynamics, Motion in a Plane) needed.",
    fix: "Plan hours on the recent rate, not on the papers you happen to practise. Keep Gravitation's variation-of-g page (33 questions at 3% HARD) and trim the rest. See Trends.",
  },
];

/** Index by bucket — used by the /traps page sectioning. */
export const TRAPS_BY_BUCKET: Record<TrapBucket, TrapShape[]> = {
  cornerstone: TRAP_SHAPES.filter((t) => t.bucket === "cornerstone"),
  quickwin: TRAP_SHAPES.filter((t) => t.bucket === "quickwin"),
  longtail: TRAP_SHAPES.filter((t) => t.bucket === "longtail"),
};

export const TRAP_HEADLINE = {
  shapes: TRAP_SHAPES.length,
  topAffects: Math.max(...TRAP_SHAPES.map((t) => t.affects.length)),
};
