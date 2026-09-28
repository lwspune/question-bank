import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/electromagnetic-induction";

export const MUTUAL_NOTE: SubtopicNote = {
  subtopicName: "Mutual Inductance, Coupling, and Transformer/Generator",
  title: "Mutual Inductance, Coupling, Transformers and Generators",
  oneLineDefinition:
    "When the current in one coil changes, the flux it sends through a neighbouring coil changes and induces an e.m.f. there; the constant M linking the two (Nφ₂ = MI₁, e₂ = M dI₁/dt) is their mutual inductance, it is at most √(L₁L₂), and the transformer and the a.c. generator are both built on it.",
  whyItMatters:
    "35 PYQs, 3 HARD. Twenty are mutual inductance — M from an e.m.f. and a rate of change, the flux one coil sends through another, the peak e.m.f. when the current is I₀ sin ωt, the time for a current change, and M for two concentric coplanar rings (asked seven times); three are the coefficient of coupling; twelve are transformers and generators — turns, voltage and current ratios, power lost, laminated cores, flux against e.m.f. in a rotating coil, and displacement current. " +
    "Three cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-emi-mutual-inductance",
      name: "Mutual Inductance",
      intuition:
        "A current I₁ in coil 1 sends flux through coil 2; the flux linkage is proportional to I₁, N₂φ₂ = MI₁, and the same M works in both directions. So measure M one way and use it the other: an e.m.f. of 15 mV in P when Q's current rises at 10 A/s means M = 1.5 mH, and then 1.8 A in P links 2.7 mWb through Q. When the current is I₀ sin ωt, the e.m.f. in the other coil peaks at MI₀ω. For two concentric coplanar rings with r₂ ≪ r₁, the big ring's centre field μ₀I/(2r₁) is taken as uniform over the small one: M = μ₀πr₂²/(2r₁), which is proportional to r₂²/r₁.",
      definition:
        "- \\(N_2\\phi_2 = MI_1\\), \\(e_2 = M\\dfrac{dI_1}{dt}\\); M is the same whichever coil carries the current.\n" +
        "- **Peak e.m.f.** for \\(I = I_0\\sin\\omega t\\): \\(e_{\\max} = MI_0\\omega\\) (\\(M = 1\\) H, \\(I_0 = 2/\\pi\\) A, 50 Hz ⇒ 200 V).\n" +
        "- **Time for a change**: \\(\\Delta t = \\dfrac{M\\,\\Delta I}{e}\\) (2 H, 6 A → 3 A, 2 kV ⇒ \\(3 \\times 10^{-3}\\) s). From flux: \\(M = \\dfrac{\\Delta\\phi}{\\Delta I}\\).\n" +
        "- **e.m.f. per turn** of a coil of N turns: \\(\\dfrac{MI}{Nt}\\).\n" +
        "- **Concentric coplanar rings** (\\(r_2 \\ll r_1\\)): \\(M = \\dfrac{\\mu_0\\pi r_2^2}{2r_1} \\propto \\dfrac{r_2^2}{r_1}\\).\n" +
        "- **Toroid** of N turns, major radius R, cross-section radius r: \\(\\dfrac{\\mu_0N^2r^2}{2R}\\).",
      formula: {
        label: "Mutual inductance",
        latex: "e_2 = M\\frac{dI_1}{dt}, \\qquad M_{\\text{rings}} = \\frac{\\mu_0\\pi r_2^2}{2r_1}",
      },
      authoredExample: {
        prompt: "Current in coil A rising at 20 A/s induces 30 mV in coil B. What flux linkage does a steady 4 A in B produce in A?",
        steps: ["M = 30 × 10⁻³/20 = 1.5 × 10⁻³ H.", "Flux linkage in A = MI = 1.5 × 10⁻³ × 4 = 6 × 10⁻³ Wb."],
        answer: "6 × 10⁻³ Wb",
      },
      selfCheckExample: {
        prompt: "Two coils have M = 0.004 H. The current in one is 10 sin(50πt) A. Peak e.m.f. in the other?",
        steps: ["MI₀ω = 0.004 × 10 × 50π."],
        answer: "2π V",
      },
      practiceSet: [
        { prompt: "No current in coil 1; coil 2's current rises at 10 A/s and coil 1 shows 20 mV. Then 3.6 A in coil 1: flux linkage in coil 2?", answer: "7.2 × 10⁻³ Wb" },
        { prompt: "Mutual inductance of concentric coplanar rings r₁ > r₂, current in the larger?", answer: "μ₀πr₂²/(2r₁)" },
        { prompt: "Flux changes from 6.5 × 10⁻² to 11 × 10⁻² Wb for a current change of 0.03 A. M?", answer: "1.5 H" },
      ],
      pyqExampleId: "3e42bd7f-47b7-41bf-a321-307ee9b455c1",
      traps: [
        {
          title: "Putting the big ring's radius on top",
          body:
            "The field comes from the LARGE ring (∝ 1/r₁) and passes through the SMALL ring's area (∝ r₂²): M ∝ r₂²/r₁. The options swap these.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-emi-coupling",
      name: "Coefficient of Coupling",
      intuition:
        "Not all of one coil's flux reaches the other. The coefficient of coupling K = M/√(L₁L₂) measures the fraction: 1 when every line of one threads the other, less otherwise. So two coils whose flux is completely shared have M = √(L₁L₂).",
      definition:
        "- \\(K = \\dfrac{M}{\\sqrt{L_1L_2}}\\), \\(0 \\le K \\le 1\\).\n" +
        "- **Perfect coupling** (K = 1): \\(M = \\sqrt{L_1L_2}\\) — 25 mH and 9 mH give 15 mH.",
      formula: {
        label: "Coupling",
        latex: "K = \\frac{M}{\\sqrt{L_1L_2}}",
      },
      authoredExample: {
        prompt: "Coils of 16 mH and 25 mH have M = 12 mH. K?",
        steps: ["√(16 × 25) = 20 mH; K = 12/20."],
        answer: "0.6",
      },
      selfCheckExample: {
        prompt: "M = 3 H between coils of 4 H and 9 H. K?",
        steps: ["3/√36."],
        answer: "0.5",
      },
      practiceSet: [
        { prompt: "M = 45 mH; L₁ = 75 mH, L₂ = 48 mH. K?", answer: "0.75" },
        { prompt: "Coils of 25 mH and 9 mH fully linked. M?", answer: "15 mH" },
      ],
      pyqExampleId: "6adbf627-540b-4d17-b5b6-62660afe9142",
      traps: [
        {
          title: "Adding the inductances",
          body:
            "Perfectly coupled 25 mH and 9 mH give M = √(25 × 9) = 15 mH, a geometric mean — not 34 or 16.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-emi-transformer-generator",
      name: "Transformers and Generators",
      intuition:
        "A transformer is two coils on one iron core: the alternating flux through both induces the same e.m.f. PER TURN in each, so V_s/V_p = N_s/N_p. An ideal one wastes no power, so the current goes the other way, I_s/I_p = N_p/N_s; a real one loses some, and the secondary current comes from the power that remains. The core is laminated to cut eddy currents. An a.c. generator is a coil turning in a field: its flux is φ₀cos ωt and its e.m.f. ωφ₀ sin ωt, a quarter-cycle apart — flux largest when the coil's plane faces the field squarely, e.m.f. zero at that instant.",
      definition:
        "- \\(\\dfrac{V_s}{V_p} = \\dfrac{N_s}{N_p}\\); e.m.f. per turn is the same in both coils (1000 : 3000 turns, 80 V ⇒ 0.08 V per turn).\n" +
        "- **Ideal**: \\(V_pI_p = V_sI_s\\) (4.4 kW at 3.3 kV ⇒ \\(\\tfrac{4}{3}\\) A). **With loss**: \\(I_s = \\dfrac{\\eta V_pI_p}{V_s}\\) (1100 W, 50% lost, 2200 V ⇒ 0.25 A). Input power fixes \\(V_p = P/I_p\\).\n" +
        "- **Impedance matching**: \\(\\dfrac{N_p}{N_s} = \\sqrt{\\dfrac{Z_p}{Z_s}}\\) (8000 Ω to 8 Ω ⇒ about 32 : 1).\n" +
        "- **Laminated core**: reduces **eddy current** losses. The secondary e.m.f. comes from the **varying magnetic field**.\n" +
        "- **Generator**: flux and e.m.f. differ in phase by \\(\\dfrac{\\pi}{2}\\); plane perpendicular to B ⇒ flux maximum, e.m.f. zero.\n" +
        "- **Displacement current** in a capacitor: \\(i_d = C\\dfrac{dV}{dt}\\) (1 μF at 4 V/s ⇒ 4 μA).",
      formula: {
        label: "Transformer",
        latex: "\\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s}\\ \\text{(ideal)}",
      },
      authoredExample: {
        prompt: "A transformer steps 240 V down to 12 V for a 60 W lamp. Turns ratio and primary current (ideal)?",
        steps: ["N_p : N_s = 240 : 12 = 20 : 1.", "I_p = 60/240 = 0.25 A."],
        answer: "20 : 1; 0.25 A",
      },
      selfCheckExample: {
        prompt: "120 primary turns carry 5 A with an input of 1 kW. Secondary turns for 560 V out?",
        steps: ["V_p = 1000/5 = 200 V; N_s = 120 × 560/200."],
        answer: "336",
      },
      practiceSet: [
        { prompt: "Why is a transformer core laminated?", answer: "To reduce eddy current losses" },
        { prompt: "Phase difference between the flux through a rotating coil and its e.m.f.?", answer: "π/2" },
        { prompt: "Displacement current in a 1 μF capacitor whose voltage changes at 4 V/s?", answer: "4 μA" },
      ],
      pyqExampleId: "90705e6d-df9b-468b-915d-c437c9974d55",
      traps: [
        {
          title: "Scaling current the same way as voltage",
          body:
            "A step-up transformer raises the voltage and LOWERS the current: power in ≈ power out. More secondary turns means less secondary current.",
        },
      ],
    },
  ],
  related: [
    { label: "Self-Inductance — the one-coil version of the same idea", href: `${BASE}/cetp-emi-self-inductance` },
    { label: "AC Circuits — what the transformer's alternating current does next", href: "/notes/mht-cet-physics/ac-circuits" },
  ],
};
