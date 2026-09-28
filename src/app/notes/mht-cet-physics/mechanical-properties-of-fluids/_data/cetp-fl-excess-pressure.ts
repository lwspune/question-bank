import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/mechanical-properties-of-fluids";

export const EXCESS_PRESSURE_NOTE: SubtopicNote = {
  subtopicName: "Excess Pressure and Capillary Rise",
  title: "Excess Pressure in Drops and Bubbles, and Capillary Rise",
  oneLineDefinition:
    "A curved liquid surface pushes harder on its concave side: the pressure inside a drop exceeds the outside by 2T/r and inside a soap bubble by 4T/r, and the same curvature, in the meniscus of a narrow tube, lifts liquid to a height h = 2T cos θ/(rρg).",
  whyItMatters:
    "38 PYQs, none HARD — nearly all one-formula ratios. Seventeen are excess pressure: bubbles with inside pressures of 1.01 and 1.02 atm, the ratio of volumes or masses when one excess pressure is three or four times another, two bubbles merging under isothermal conditions; twenty-one are capillary rise — how the height and the raised mass change with the radius, the liquid, the angle of contact, g on the moon or down a mine, a tube tilted or pushed down. " +
    "Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-fl-drop-bubble-pressure",
      name: "Excess Pressure Inside a Drop and a Bubble",
      intuition:
        "A drop has one surface, a soap bubble two, so the bubble's excess pressure is twice the drop's: 2T/r for a drop, 4T/r for a bubble. Either way it goes as 1/r — the SMALLER bubble has the higher pressure. So a threefold excess pressure means a third of the radius and a twenty-seventh of the volume or mass. Two bubbles that merge under isothermal conditions keep their total surface: R² = r₁² + r₂².",
      definition:
        "- **Drop** (one surface): \\(\\Delta P = \\dfrac{2T}{r}\\). **Soap bubble** (two): \\(\\Delta P = \\dfrac{4T}{r}\\). **Meniscus** in a tube of radius r: \\(\\dfrac{2T}{r}\\).\n" +
        "- \\(r \\propto \\dfrac{1}{\\Delta P}\\), so volume and mass \\(\\propto \\dfrac{1}{\\Delta P^3}\\): excess pressure × 3 ⇒ volume or mass ÷ 27; × 4 ⇒ ÷ 64.\n" +
        "- **Given total pressures**: subtract the outside first. 1.01 and 1.02 atm in 1 atm: excess 0.01 and 0.02, so radii 2 : 1 and volumes 8 : 1. In general \\(\\dfrac{V_1}{V_2} = \\left(\\dfrac{P_2 - P_0}{P_1 - P_0}\\right)^3\\).\n" +
        "- **Isothermal merge** of two bubbles in vacuum: \\(R = \\sqrt{r_1^2 + r_2^2}\\).\n" +
        "- A drop split into 8: each droplet has half the radius and twice the excess pressure, so the big drop's is **half** a droplet's.",
      formula: {
        label: "Excess pressure",
        latex: "\\Delta P_{\\text{drop}} = \\frac{2T}{r}, \\qquad \\Delta P_{\\text{bubble}} = \\frac{4T}{r}",
      },
      authoredExample: {
        prompt: "Soap bubble A has inside pressure 1.004 atm and B has 1.008 atm, outside 1 atm. Ratio of their volumes, A to B?",
        steps: ["Excess pressures 0.004 and 0.008: radii 2 : 1.", "Volumes 8 : 1."],
        answer: "8 : 1",
      },
      selfCheckExample: {
        prompt: "The excess pressure inside one soap bubble is three times that in another. Ratio of their volumes?",
        steps: ["Radius ratio 1 : 3, so volume ratio 1 : 27."],
        answer: "1 : 27",
      },
      practiceSet: [
        { prompt: "Diameter of a soap bubble with excess pressure 25.6 N/m², T = 3.2 × 10⁻² N/m?", answer: "1 cm" },
        { prompt: "Excess pressure 50 dyne/cm² inside a soap bubble of radius 2 cm. T?", answer: "25 dyne/cm" },
        { prompt: "Two soap bubbles of radii a and b merge isothermally in vacuum. New radius?", answer: "√(a² + b²)" },
      ],
      pyqExampleId: "8552904c-193c-4388-ba79-3a4130b17fa5",
      traps: [
        {
          title: "Taking 1.01 : 1.02 as the pressure ratio",
          body:
            "Radius depends on the EXCESS pressure. Subtract the outside 1 atm first: 0.01 : 0.02, not 101 : 102.",
        },
        {
          title: "Using 2T/r for a soap bubble",
          body:
            "A bubble has an inner and an outer surface, so 4T/r. A drop, or the meniscus in a tube, has one: 2T/r.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-fl-capillary-rise",
      name: "Capillary Rise",
      intuition:
        "The meniscus pulls up along the tube's circumference with T cos θ per unit length, and the column's weight balances it: h = 2T cos θ/(rρg). So h goes as 1/r — a tube a fifth as wide lifts liquid five times as high — but the MASS lifted, ρπr²h, goes as r: the narrow tube holds a fifth of the mass. h also goes as 1/g, so on the moon (g/6) the rise is six times greater. If the tube is shorter than h, the liquid does not overflow: it reaches the top and flattens its meniscus, so the apparent contact angle grows until h cos θ fits.",
      definition:
        "- \\(h = \\dfrac{2T\\cos\\theta}{r\\rho g}\\); upward force \\(= T \\times 2\\pi r\\) = weight of the column.\n" +
        "- \\(h \\propto \\dfrac{1}{r}\\) (cross-section 4a ⇒ radius × 2 ⇒ h/2; diameter 80% ⇒ h × 1.25); **mass raised** \\(\\propto r\\) (radius r/3 ⇒ m/3).\n" +
        "- Same tube, two liquids: \\(\\dfrac{h_1}{h_2} = \\dfrac{T_1\\rho_2}{T_2\\rho_1}\\) (T 6 : 5, ρ 4 : 3 ⇒ 9 : 10). T and ρ both doubled ⇒ h unchanged.\n" +
        "- \\(h \\propto \\dfrac{1}{g}\\): moon (g/6) ⇒ 6h; down a mine, \\(\\dfrac{h_2}{h_1} = \\dfrac{R}{R - d}\\).\n" +
        "- **θ = 90°**: no rise or fall. Same rise with same T: \\(\\cos\\theta \\propto \\rho\\), so the densest liquid has the smallest θ.\n" +
        "- **Tube shorter than h** (length h/3 above the water): \\(\\cos\\theta' = \\tfrac{1}{3}\\). **Tube tilted** at α to the vertical: the vertical rise stays h, the length of liquid is \\(h/\\cos\\alpha\\).\n" +
        "- **Circumference from force**: \\(2\\pi r = \\dfrac{F}{T}\\) — 105 dyne with T = 70 dyne/cm gives 1.5 cm.",
      formula: {
        label: "Capillary rise",
        latex: "h = \\frac{2T\\cos\\theta}{r\\rho g}",
      },
      authoredExample: {
        prompt: "Water rises 4 cm in a tube. How high in a tube of half the radius, and how does the mass raised compare?",
        steps: ["h ∝ 1/r: 8 cm.", "Mass ∝ r²h ∝ r: half the mass."],
        answer: "8 cm; half the mass",
      },
      selfCheckExample: {
        prompt: "Water rises to 6 cm with θ = 0. A liquid with surface tension 2T, θ = 60° and relative density 2 in the same tube?",
        steps: ["h ∝ T cos θ/ρ: 6 × 2 × ½ ÷ 2 = 3 cm."],
        answer: "3 cm",
      },
      practiceSet: [
        { prompt: "A capillary tube is taken to the moon (g/6). The rise?", answer: "Six times that on earth" },
        { prompt: "Tube of radius 0.35 mm tilted 60° to the vertical; T = 0.07 N/m, g = 10. Length of the water column?", answer: "8 cm" },
        { prompt: "Rise h with θ = 0; the tube is pushed down to leave h/3 above water. New apparent angle?", answer: "cos⁻¹(1/3)" },
      ],
      pyqExampleId: "952fc1e6-0c29-4b77-a0c8-c9310c02e0c0",
      traps: [
        {
          title: "Thinking the narrow tube holds more water",
          body:
            "The narrow tube lifts liquid HIGHER (h ∝ 1/r) but holds LESS of it (m ∝ r). Radius r/5 gives 5h but m/5.",
        },
      ],
    },
  ],
  related: [
    { label: "Surface Tension — the energy view of the same T", href: `${BASE}/cetp-fl-surface-tension` },
  ],
};
