import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/mechanical-properties-of-fluids";

export const VISCOSITY_NOTE: SubtopicNote = {
  subtopicName: "Viscosity, Stokes' Law, Terminal Velocity, and Reynolds",
  title: "Viscosity, Stokes' Law and Terminal Velocity",
  oneLineDefinition:
    "Viscosity is the internal friction between layers of a moving fluid, acting along the layers; a sphere falling through a fluid feels the drag 6πηrv of Stokes' law, and stops accelerating when drag plus upthrust equals its weight — the terminal velocity, which grows as the square of the radius.",
  whyItMatters:
    "21 PYQs, 4 HARD. Seventeen are terminal velocity — drops of the same size merging into one, spheres of different radius or density in the same liquid, the viscous force at terminal speed, a ball rising at constant speed, and the height from which a ball must fall to enter water already at its terminal speed; four are about layers — the direction of the viscous force, flow speed rising with height in a river, Reynolds number and critical velocity. " +
    "Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-fl-viscosity-flow-regimes",
      name: "Viscous Force Between Layers, Reynolds Number and Critical Velocity",
      intuition:
        "Adjacent layers of a flowing liquid slide over each other and drag on each other, so the viscous force is TANGENTIAL to the layers. In steady flow over a river bed the speed rises steadily with height, so v/h is constant. Whether flow stays smooth is set by the Reynolds number ρvd/η: small means streamline, large means turbulent. The critical velocity at which the change happens is N·η/(ρd), so a more viscous fluid can flow faster before turning turbulent.",
      definition:
        "- **Viscous force** acts **tangentially** to the layers (F = ηA dv/dx).\n" +
        "- Steady flow with speed proportional to height: \\(\\dfrac{v_A}{h_A} = \\dfrac{v_B}{h_B}\\) (12 cm/s at 40 cm ⇒ 27 cm/s at 90 cm).\n" +
        "- **Reynolds number** \\(R_e = \\dfrac{\\rho v d}{\\eta}\\) for a pipe of diameter d.\n" +
        "- **Critical velocity** \\(v_c = \\dfrac{R_e\\,\\eta}{\\rho d}\\): directly proportional to η, inversely to ρ and d.",
      formula: {
        label: "Reynolds number and critical velocity",
        latex: "R_e = \\frac{\\rho v d}{\\eta}, \\qquad v_c = \\frac{R_e\\,\\eta}{\\rho d}",
      },
      authoredExample: {
        prompt: "Water (ρ = 1000 kg/m³, η = 10⁻³ Pa s) flows at 0.1 m/s in a pipe 2 cm across. Reynolds number, and is the flow streamline if the change happens near 2000?",
        steps: ["Rₑ = 1000 × 0.1 × 0.02 / 10⁻³ = 2000.", "It is right at the critical value; any faster and it turns turbulent."],
        answer: "2000; at the edge of turbulence",
      },
      selfCheckExample: {
        prompt: "How does the critical velocity of a fluid in a tube depend on its viscosity?",
        steps: ["v_c = Rₑη/(ρd)."],
        answer: "Directly proportional to η",
      },
      practiceSet: [
        { prompt: "Direction of the viscous force between two liquid layers?", answer: "Tangential to the layers" },
        { prompt: "Reynolds number for density ρ, viscosity η, diameter d, speed v?", answer: "dρv/η" },
      ],
      pyqExampleId: "22c0e9c2-c4eb-4f87-86f9-66e183ccfff5",
      traps: [
        {
          title: "Thinking a viscous liquid turns turbulent sooner",
          body:
            "Viscosity damps disturbances. The critical velocity is proportional to η: honey stays streamline at speeds where water would be turbulent.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-fl-terminal-velocity",
      name: "Terminal Velocity",
      intuition:
        "At terminal velocity nothing accelerates: weight = upthrust + drag. With Stokes' drag that gives v = 2r²(ρ − σ)g/(9η) — so v goes as r² and as (ρ − σ). Merging drops keeps the volume: n drops make one of radius n^(1/3)r, whose terminal velocity is n^(2/3) times as large — two drops give 2^(2/3), 125 drops give 25. The viscous force at terminal speed is just weight minus upthrust, mg(1 − σ/ρ). A light ball rising at constant speed in a liquid three times denser feels a drag twice its weight.",
      definition:
        "- \\(v_t = \\dfrac{2r^2(\\rho - \\sigma)g}{9\\eta}\\), so \\(v_t \\propto r^2\\) and \\(v_t \\propto (\\rho - \\sigma)\\).\n" +
        "- **Merging** n equal drops: \\(R = n^{1/3}r\\), \\(v = n^{2/3}v_0\\). Same material, mass × 8 ⇒ radius × 2 ⇒ \\(v \\times 4\\). Terminal velocities 9 : 4 ⇒ radii 3 : 2 ⇒ volumes 27 : 8.\n" +
        "- **Viscous force** at terminal speed \\(= mg\\left(1 - \\dfrac{\\sigma}{\\rho}\\right)\\).\n" +
        "- **Rising ball** in a liquid k times denser: drag \\(= (k - 1)\\) × weight.\n" +
        "- **Equal speeds, different metals**: \\(\\dfrac{r_1^2}{r_2^2} = \\dfrac{\\rho_2 - \\sigma}{\\rho_1 - \\sigma}\\).\n" +
        "- **Enter water already at terminal speed**: \\(\\sqrt{2gh} = v_t \\Rightarrow h = \\dfrac{v_t^2}{2g}\\).\n" +
        "- If the drag is \\(Kv^2\\) instead: \\(v_t = \\sqrt{\\dfrac{Vg(\\rho_1 - \\rho_2)}{K}}\\).",
      formula: {
        label: "Terminal velocity (Stokes)",
        latex: "v_t = \\frac{2r^2(\\rho - \\sigma)g}{9\\eta}",
      },
      authoredExample: {
        prompt: "Eight equal raindrops, each falling at 3 cm/s, merge into one. Its terminal velocity?",
        steps: ["Radius × 8^(1/3) = 2.", "v ∝ r²: 3 × 4 = 12 cm/s."],
        answer: "12 cm/s",
      },
      selfCheckExample: {
        prompt: "A steel ball of radius 6 mm has terminal speed 12 cm/s in a liquid. A steel ball of radius 3 mm?",
        steps: ["(3/6)² = 1/4."],
        answer: "3 cm/s",
      },
      practiceSet: [
        { prompt: "Two equal drops falling at 5 cm/s merge. New terminal velocity?", answer: "5 × 4^(1/3) cm/s" },
        { prompt: "125 drops at 4 cm/s merge. New terminal velocity?", answer: "1 m/s" },
        { prompt: "A ball rises at constant speed in a liquid 4 times denser. Drag : weight?", answer: "3 : 1" },
        { prompt: "Viscous force on a ball of mass m and density d₁ at terminal speed in glycerine of density d₂?", answer: "mg(1 − d₂/d₁)" },
      ],
      pyqExampleId: "25da4d60-c151-42ae-8601-34ec19798ba0",
      traps: [
        {
          title: "Scaling terminal velocity with volume",
          body:
            "v_t ∝ r², not r³. Two drops merging double the VOLUME, raise the radius by 2^(1/3), and raise the speed by 2^(2/3) ≈ 1.59, not 2.",
        },
      ],
    },
  ],
  related: [
    { label: "Pressure and Buoyancy — the upthrust in the force balance", href: `${BASE}/cetp-fl-pressure` },
    { label: "Flow — streamline flow, continuity and Bernoulli", href: `${BASE}/cetp-fl-flow` },
  ],
};
