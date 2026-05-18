/**
 * Content for /guide/nda-physics/traps.
 *
 * NDA Physics distractor shapes — bucketed by the skill strand they affect
 * (Recall / Apply / Reason). Each trap: a mechanic (how it works), a fix
 * (the verification habit), and a worked-example UUID from the live bank
 * (where one is available).
 *
 * Different from Maths' factor-of-2 / sign-flip cells (numeric distractors)
 * and English's near-synonym shapes (semantic distractors). Physics distractors
 * are about CONFUSED FORMULA APPLICATION — wrong formula picked, right
 * formula misapplied (sign, unit, direction), or single missing term in a
 * multi-step setup. Each shape is illustrated on one PYQ; recognise the
 * mechanic and the same trap stops working across questions.
 */

export type TrapBucket = "recall" | "apply" | "reason";

export type TrapShape = {
  id: string;
  /** Title shown in the page section. */
  title: string;
  bucket: TrapBucket;
  /** Which playbook(s) this trap most commonly appears in. */
  affects: string[]; // playbook slugs
  /** The mechanic — how the trap works. */
  mechanic: string;
  /** The fix — the verification habit that avoids it. */
  fix: string;
  /** Optional worked-example UUID — a real PYQ that demonstrates the trap. */
  exampleQuestionId?: string;
};

export const TRAP_SHAPES: TrapShape[] = [
  // ──────── Recall traps ────────
  {
    id: "specific-heat-dependence",
    title: "Specific heat — 'depends on mass and shape' wrong option",
    bucket: "recall",
    affects: ["heat-and-thermodynamics"],
    mechanic:
      "Specific heat is an INTENSIVE property — it depends on the material only, not on the mass or the shape of the body. But the wrong options often list 'depends on mass' or 'depends on shape' (paraphrased) and a hurried student picks the first plausible-sounding one. The right answer is 'independent of mass and shape; depends on temperature for some materials.'",
    fix: "On any statement-truth question about specific heat, mentally tag each option: 'intensive (depends on material only)?' — and reject anything claiming mass/shape dependence. The same intensive-vs-extensive lens cuts traps on density, refractive index, resistivity.",
    exampleQuestionId: "602f5857-2784-4577-805f-ad540df67522",
  },
  {
    id: "scientist-discovery-pair",
    title: "Scientist–discovery pair swap",
    bucket: "recall",
    affects: ["modern-physics"],
    mechanic:
      "The match-list format shuffles famous scientists with the wrong discoveries — Chadwick=photoelectric, Einstein=neutron, Marie Curie=relativity. One pair is correct, the other 2–3 are deliberately swapped. The trap relies on you trusting a single recognised name as 'right' without checking all the pairs.",
    fix: "Read EACH pair against your memory. If even one pair is wrong, the whole option is wrong (NDA format). Memorise the 8 canonical pairs cold: Chadwick=neutron, Einstein=photoelectric, Marie Curie=radium/polonium, Rutherford=nuclear model, Bohr=atomic model, Planck=quantum, J.J. Thomson=electron, Roentgen=X-rays.",
  },

  // ──────── Apply traps ────────
  {
    id: "mirror-lens-sign-flip",
    title: "Mirror / lens sign convention flip",
    bucket: "apply",
    affects: ["light-and-optics"],
    mechanic:
      "Cartesian sign convention: distances measured from the pole, +x to the right of the incident light. Object distance u is NEGATIVE for a real object on the left. f is negative for concave lens / convex mirror. Mirror formula 1/v + 1/u = 1/f vs lens formula 1/v − 1/u = 1/f. Get any sign wrong and v lands on the wrong side, sometimes with the wrong magnitude.",
    fix: "ALWAYS draw a ray diagram first, then write down the signs of u and f. Plug in with sign included. Check whether v ends up + or − and translate: + = same side as outgoing light (real for mirror, virtual for lens); − = opposite side (virtual for mirror, real for lens — but in NDA's convention this distinction is rare).",
    exampleQuestionId: "92eddea7-8fda-40e2-89a2-0c519cbd908c",
  },
  {
    id: "tir-direction",
    title: "Total internal reflection in the wrong direction",
    bucket: "apply",
    affects: ["light-and-optics"],
    mechanic:
      "TIR only happens when light goes from a DENSER medium to a RARER one (e.g. water→air, glass→air). Options in TIR questions often offer the reverse (rare→dense) which is structurally impossible — but in a setup with multiple medium boundaries the eye loses track of which surface is which. The critical angle is for the denser side.",
    fix: "On any TIR question, label every medium with its μ. Draw the ray. Confirm the suspect-TIR surface has μ_above < μ_below. If not, the trap is asking you to invoke TIR where it can't physically occur.",
    exampleQuestionId: "cf479505-b6b7-4777-a35a-61f83d492c36",
  },
  {
    id: "mass-cancels-pendulum",
    title: "Mass doesn't appear in pendulum / free-fall period",
    bucket: "apply",
    affects: ["oscillations-and-waves", "gravitation"],
    mechanic:
      "T = 2π√(L/g) has no m. v_freefall = √(2gh) has no m. v_escape = √(2gR) has no m. The trap is to vary mass in the problem and offer 'T doubles when mass doubles' as an option. Pendulum period depends ONLY on length and g.",
    fix: "Write the formula symbol-by-symbol before plugging numbers. If m isn't in the formula, changes in m do NOTHING. Same lever for free-fall time, projectile range (without air drag), and orbital period.",
    exampleQuestionId: "300d05e2-680d-4cb4-b886-162e758c8876",
  },
  {
    id: "unit-system-mix",
    title: "CGS / SI unit-system mix",
    bucket: "apply",
    affects: ["units-measurement-and-dimensions", "fluid-mechanics-and-properties-of-matter"],
    mechanic:
      "A question gives pressure in mm Hg and density in g/cm³, asks for height in m. Mixing CGS and SI mid-calc shifts every answer by powers of 10. NDA tests this directly: 1 dyne = 10⁻⁵ N, 1 erg = 10⁻⁷ J, 1 poise = 0.1 Pa·s — distractors are off by exactly the cgs↔SI multiplier.",
    fix: "Convert every quantity to SI before computing. If the question is dimensional ('1 dyne equals'), recall the conversion: F = M·L·T⁻² so 1 g·cm·s⁻² = 10⁻³·10⁻² = 10⁻⁵ kg·m·s⁻² = 10⁻⁵ N.",
    exampleQuestionId: "eef81c32-7ef0-45df-bb5c-f58141ae96a8",
  },

  // ──────── Reason traps ────────
  {
    id: "series-vs-parallel-heat",
    title: "Heat in parallel vs series — wrong ratio direction",
    bucket: "reason",
    affects: ["electricity-and-magnetism"],
    mechanic:
      "Two equal resistors R, same V across the combination. In SERIES, R_total = 2R and P = V²/2R. In PARALLEL, R_total = R/2 and P = 2V²/R. Ratio P_parallel / P_series = (2V²/R) / (V²/2R) = 4. The trap option is 1/4 (right magnitude, inverted ratio) — picking it loses you the question because you forgot which way the ratio runs.",
    fix: "Always write the formula for the LARGER quantity first. 'Parallel has SMALLER R_total, so MORE current, so MORE heat for given V.' Parallel wins on heat dissipation at same V; series wins at same I. Tag which scenario the question is asking.",
    exampleQuestionId: "d0db672d-9a24-4c22-bb9c-3d4e911a0be9",
  },
  {
    id: "calorimetry-latent-omit",
    title: "Calorimetry — forgetting a latent heat term",
    bucket: "reason",
    affects: ["heat-and-thermodynamics"],
    mechanic:
      "Ice at −10°C added to water at 30°C, find final T. Setup needs THREE heat exchanges: ice warming −10→0 (sensible, mc·10), ice melting at 0 (latent, mL_f), water cooling 30→T (sensible, mc·ΔT). Skip the latent term and you get a final T that's 10–20°C off — and there's almost always an answer option that matches the no-latent calculation.",
    fix: "Map out the temperature journey for EACH substance before writing an equation. Cross any phase boundary (0°C for water-ice, 100°C for water-steam) and you owe a Q=mL term. Set ∑Q_gained = ∑Q_lost. The final state (all liquid? mixed? all solid?) is part of the setup, not an output.",
    exampleQuestionId: "387f390f-1a21-42d4-8c7a-60bb27cc9b22",
  },
  {
    id: "density-mix-mean-confusion",
    title: "Density mixing — arithmetic vs harmonic mean confusion",
    bucket: "reason",
    affects: ["fluid-mechanics-and-properties-of-matter"],
    mechanic:
      "Two substances of densities ρ₁ and ρ₂ mixed in EQUAL VOLUME: ρ_avg = (ρ₁+ρ₂)/2 (arithmetic mean). Mixed in EQUAL MASS: ρ_avg = 2ρ₁ρ₂/(ρ₁+ρ₂) (harmonic mean). The harmonic mean is always smaller than the arithmetic. Distractor options swap the two formulas; the student writes the right symbols but for the wrong scenario.",
    fix: "Equal-volume = arithmetic mean (volumes add cleanly, so densities average). Equal-mass = harmonic mean (volumes differ, the lighter one takes up more, dragging the average down). Both formulas can be re-derived in 30 seconds from ρ = m_total / V_total.",
    exampleQuestionId: "c51396be-7a8e-4af0-a7ca-bf629d942b50",
  },
  {
    id: "ratio-inversion-planet",
    title: "Planet-scaling ratio — inverting the wrong term",
    bucket: "reason",
    affects: ["gravitation"],
    mechanic:
      "Planet has R = R_earth/2 and density 4× Earth's. Find escape velocity. M = ρV ⟹ M = 4ρ · ½·V = ½M_earth (since V scales as R³, halved-R is V_earth/8). v_esc = √(2GM/R) = √(2G·½M_e / ½R_e) = √(2GM_e/R_e) = same as Earth. The trap is to keep ρ-factor and R-factor separate and miss that M scales NOT linearly with ρ — it scales as ρ·R³.",
    fix: "Write M = ρV = ρ·(4/3)πR³ symbol-by-symbol. Plug ratios in for ρ AND R BEFORE computing v_esc. Combine the powers carefully: v_esc ∝ √(M/R) ∝ √(ρR²). Now apply scaling: √(4·(½)²) = √(4·¼) = 1. Same v_esc.",
    exampleQuestionId: "95e70f86-27f6-4001-8097-db3d61f785c5",
  },
  {
    id: "pv-process-variant",
    title: "Process variant — applying PV=const where PVⁿ=const holds",
    bucket: "reason",
    affects: ["heat-and-thermodynamics"],
    mechanic:
      "Isothermal process: PV = const (Boyle). Adiabatic: PVᵞ = const (γ = Cp/Cv). The question stipulates PV² = const (a non-standard polytropic process), then asks for the T₁/T₂ vs V₁/V₂ relation. Default-thinking 'PV is constant so T is constant' is wrong — only for genuine isothermal. With PVⁿ = const and PV = nRT, T·V^(n−1) = const.",
    fix: "Read the process specification CAREFULLY before invoking a memorised relation. If the exponent on V is anything other than 0 (isobaric), 1 (isothermal), or γ (adiabatic), derive from PV = nRT plus the given constraint. Don't assume isothermal just because P and V both appear.",
    exampleQuestionId: "a2b85be9-214d-4faa-9b40-547ce57f6adf",
  },
];

/** Index by bucket — used by the /traps page sectioning. */
export const TRAPS_BY_BUCKET: Record<TrapBucket, TrapShape[]> = {
  recall: TRAP_SHAPES.filter((t) => t.bucket === "recall"),
  apply: TRAP_SHAPES.filter((t) => t.bucket === "apply"),
  reason: TRAP_SHAPES.filter((t) => t.bucket === "reason"),
};

export const TRAP_HEADLINE = {
  shapes: TRAP_SHAPES.length,
  topAffects: Math.max(...TRAP_SHAPES.map((t) => t.affects.length)),
};
