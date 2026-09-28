import type { SubtopicNote } from "@/app/notes/_types";

export const SPRINGS_NOTE: SubtopicNote = {
  subtopicName: "Elasticity, Springs, and Energy in Strained Solids",
  title: "Springs and Elastic Energy",
  oneLineDefinition:
    "A spring stretched by x pulls back with kx and stores ½kx²; its constant grows as it is cut shorter, springs in series add their extensions, and energy conservation links a falling body to the compression it produces.",
  whyItMatters:
    "6 PYQs, one HARD. Four are springs — the energy for a larger stretch, the constant of a cut piece, two springs in a chain, and a ball dropped onto a platform on a spring. " +
    "Two follow an impact: a ball's speed after it rebounds, and the rise in temperature of a bullet that stops in a wall. Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-ms-springs",
      name: "Spring Constant, Series Springs and Elastic Energy",
      intuition:
        "A spring obeys F = kx and stores U = ½kx², so three times the stretch stores nine times the energy. A spring's constant is inversely proportional to its length: cut a spring of constant K into pieces L₁ = NL₂, and the longer piece has constant K(N + 1)/N. Two springs hung in a chain carry the same force and add their extensions, f/k₁ + f/k₂. A ball of mass m dropped from height s onto a spring platform that sinks h loses mg(s + h) of potential energy into ½kh².",
      definition:
        "- \\(F = kx\\), \\(U = \\tfrac{1}{2}kx^2\\) (stretch × 3 ⇒ U × 9).\n" +
        "- \\(k \\propto \\dfrac{1}{L}\\): \\(L_1 = NL_2\\) ⇒ \\(k_1 = \\dfrac{K}{N}(N + 1)\\).\n" +
        "- Chain (series): total extension \\(f\\left(\\dfrac{1}{k_1} + \\dfrac{1}{k_2}\\right)\\).\n" +
        "- Drop onto a spring: \\(mg(s + h) = \\tfrac{1}{2}kh^2\\) ⇒ \\(k = \\dfrac{2mg(s + h)}{h^2}\\).",
      formula: {
        label: "Springs",
        latex: "F = kx, \\qquad U = \\tfrac{1}{2}kx^2, \\qquad k \\propto \\frac{1}{L}",
      },
      authoredExample: {
        prompt: "A spring of constant 600 N/m is cut into two pieces with lengths in the ratio 2 : 1. Constant of each piece?",
        steps: ["The longer piece is 2/3 of the length: k = 600 × 3/2 = 900 N/m.", "The shorter is 1/3: k = 1800 N/m."],
        answer: "900 N/m and 1800 N/m",
      },
      selfCheckExample: {
        prompt: "Springs of 100 N/m and 200 N/m hang in a chain carrying 20 N. Total extension?",
        steps: ["20/100 + 20/200."],
        answer: "0.3 m",
      },
      practiceSet: [
        { prompt: "A spring stores U when stretched 3 cm. Energy at 9 cm?", answer: "9U" },
      ],
      pyqExampleId: "ebe4c03c-0c80-4e8e-b8f3-c279b3fce0d9",
      traps: [
        {
          title: "Thinking a shorter spring is softer",
          body:
            "Each part of a spring stretches by its share of the total. A shorter piece stretches less under the same force, so it is STIFFER: k ∝ 1/L.",
        },
        {
          title: "Leaving out the compression in the drop height",
          body:
            "The ball falls s before touching the platform and h more while compressing it: mg(s + h), not mgs.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-ms-impacts",
      name: "Rebounds and Heat From an Impact",
      intuition:
        "A ball falling h hits at √(2gh) and leaves at e times that. A bullet that stops turns its kinetic energy ½MV² into heat; if a fraction f of it warms the lead, fMV²/2 = MJsΔT, so ΔT = fV²/(2Js) and does not depend on the mass.",
      definition:
        "- Rebound speed \\(= e\\sqrt{2gh}\\) (20 m, e = 0.4 ⇒ 8 m/s).\n" +
        "- Bullet heated by a fraction f of its KE: \\(\\Delta T = \\dfrac{fV^2}{2Js}\\) (75% ⇒ \\(\\dfrac{3V^2}{8Js}\\)).",
      formula: {
        label: "Impact",
        latex: "v_{\\text{rebound}} = e\\sqrt{2gh}, \\qquad \\Delta T = \\frac{fV^2}{2Js}",
      },
      authoredExample: {
        prompt: "A ball dropped from 5 m rebounds with e = 0.6. Rebound speed and height? (g = 10 m/s²)",
        steps: ["Impact speed √100 = 10 m/s; rebound 6 m/s.", "Height = 36/20 = 1.8 m."],
        answer: "6 m/s; 1.8 m",
      },
      selfCheckExample: {
        prompt: "A lead bullet at V stops; half its energy heats it. Temperature rise?",
        steps: ["f = 1/2."],
        answer: "V²/(4Js)",
      },
      practiceSet: [
        { prompt: "20 m drop, e = 0.4. Speed after the first rebound?", answer: "8 m/s" },
      ],
      pyqExampleId: "e23b500e-fac7-4300-a426-18d6e9b6af30",
      traps: [
        {
          title: "Applying e to the height",
          body:
            "e scales the SPEED. The rebound height is e² times the drop height.",
        },
      ],
    },
  ],
  related: [
    { label: "Laws of Motion — collisions and the coefficient of restitution", href: "/notes/mht-cet-physics/laws-of-motion/cetp-lm-momentum" },
    { label: "Thermal Properties — calorimetry", href: "/notes/mht-cet-physics/thermal-properties-of-matter/cetp-th-calorimetry" },
  ],
};
