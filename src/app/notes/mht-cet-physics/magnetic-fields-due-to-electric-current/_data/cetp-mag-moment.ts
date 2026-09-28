import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/magnetic-fields-due-to-electric-current";

export const MOMENT_NOTE: SubtopicNote = {
  subtopicName: "Magnetic Moment of Current Loop and Galvanometer Instruments",
  title: "Magnetic Moment, Torque on a Loop, and the Galvanometer",
  oneLineDefinition:
    "A current loop behaves like a small magnet of moment m = NIA, feeling a torque m × B in a field; for a fixed length of wire the torque is largest when the loop is a circle, an orbiting electron is a tiny loop whose moment is e/(2m) times its angular momentum, and a galvanometer becomes an ammeter when a small shunt takes most of the current.",
  whyItMatters:
    "20 PYQs, 5 HARD. Seventeen are the magnetic moment — its value from the field at the centre and the area (the HARD ones), how it changes when a coil is rewound, the torque on a square and a circle made from the same wire, a solenoid's moment from its flux, and an orbiting electron's moment; three are shunts — the shunt for a given fraction of the current, and an ammeter against a milliammeter. " +
    "Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-mag-moment-and-torque",
      name: "Magnetic Moment and the Torque on a Loop",
      intuition:
        "m = NIA, and in a field the loop feels τ = mB sin θ. For the same length of wire, a circle encloses more area than a square, so it feels more torque; bent into one circular turn of wire length L it has area L²/(4π), so τ_max = L²IB/(4π). Rewinding a coil into a smaller radius R/3 triples the turns but cuts each area to a ninth: the moment falls to a third. Combine with the field at the centre, B = μ₀I/(2R): then m = 2πBR³/μ₀ = 2BA^(3/2)/(μ₀√π), and the ratio B/m = μ₀/(2πR³) falls eightfold when R doubles. An orbiting electron's moment is (e/2m) times its angular momentum, so it grows with n.",
      definition:
        "- \\(m = NIA\\) (depends on N, I and r); \\(\\tau = mB\\sin\\theta\\) (or \\(\\vec r \\times \\vec F\\) for a single force: \\((4\\hat i - 3\\hat j) \\times (5\\hat i - 10\\hat j) = -25\\hat k\\)).\n" +
        "- **Same wire, square vs circle**: the circle has the larger area and torque. One turn of wire length L: \\(\\tau_{\\max} = \\dfrac{L^2IB}{4\\pi}\\); \\(m = \\dfrac{IL^2}{4\\pi}\\) ⇒ \\(L = 4\\sqrt{\\dfrac{m}{\\pi I}}\\).\n" +
        "- **Rewound to R/3**: \\(m' = \\tfrac{m}{3}\\). Equal moments with radii 10 cm and 20 cm: \\(N_AI_A = 4N_BI_B\\).\n" +
        "- **From the field at the centre**: \\(m = \\dfrac{2\\pi BR^3}{\\mu_0} = \\dfrac{2BA^{3/2}}{\\mu_0\\sqrt{\\pi}}\\); \\(\\dfrac{B}{m} = \\dfrac{\\mu_0}{2\\pi R^3}\\).\n" +
        "- **Solenoid**: \\(NIA = \\dfrac{\\phi l}{\\mu_0}\\) (1.57 × 10⁻⁶ Wb, 0.8 m ⇒ 1 A m²).\n" +
        "- **Orbiting electron**: \\(\\dfrac{L}{m_{\\text{orb}}} = \\dfrac{2m}{e}\\); \\(m_{\\text{orb}} = \\dfrac{neh}{4\\pi m} \\propto n\\).",
      formula: {
        label: "Magnetic moment",
        latex: "m = NIA, \\qquad \\tau = mB\\sin\\theta, \\qquad m = \\frac{2\\pi BR^3}{\\mu_0}",
      },
      authoredExample: {
        prompt: "A 50-turn coil of radius 4 cm carries 2 A in a 0.3 T field, its plane parallel to the field. Moment and torque?",
        steps: ["m = 50 × 2 × π × 0.0016 = 0.16π ≈ 0.50 A m².", "Plane parallel to B means the moment is perpendicular to B: τ = mB ≈ 0.15 N m."],
        answer: "≈ 0.50 A m²; ≈ 0.15 N m",
      },
      selfCheckExample: {
        prompt: "The field at the centre of a loop of radius R is B. Its magnetic moment?",
        steps: ["I = 2BR/μ₀; m = IπR²."],
        answer: "2πBR³/μ₀",
      },
      practiceSet: [
        { prompt: "A coil of n turns and radius R is rewound to radius R/3. Ratio of new moment to old?", answer: "1 : 3" },
        { prompt: "B/m = x. Current and radius both doubled. New ratio?", answer: "x/8" },
        { prompt: "Ratio of an orbiting electron's angular momentum to its magnetic moment?", answer: "2m/e" },
      ],
      pyqExampleId: "48b4285c-3eb1-4881-93ec-89e451760f65",
      traps: [
        {
          title: "Keeping the turns fixed when a coil is rewound",
          body:
            "The wire's length is fixed: a coil rewound to a third of the radius has three times the turns. m = NIπr² then falls to a third, not a ninth.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-mag-galvanometer-shunt",
      name: "Converting a Galvanometer: the Shunt",
      intuition:
        "A galvanometer carries only a small current I_g at full deflection. To measure a larger current I, a low resistance S in parallel (a shunt) takes the rest: both share the same voltage, so I_gG = (I − I_g)S and S = G/(I/I_g − 1). The larger the range, the SMALLER the shunt — an ammeter's shunt is less than a milliammeter's.",
      definition:
        "- \\(S = \\dfrac{I_gG}{I - I_g} = \\dfrac{G}{\\tfrac{I}{I_g} - 1}\\).\n" +
        "- 4% through the galvanometer ⇒ \\(S = \\dfrac{G}{24}\\); 3% through 200 Ω ⇒ \\(S = \\dfrac{0.03 \\times 200}{0.97} \\approx 6\\) Ω.\n" +
        "- Higher range ⇒ smaller shunt.",
      formula: {
        label: "Shunt",
        latex: "S = \\frac{G}{\\frac{I}{I_g} - 1}",
      },
      authoredExample: {
        prompt: "A 50 Ω galvanometer reads full scale at 2 mA. Shunt to make it a 1 A ammeter?",
        steps: ["S = 0.002 × 50/0.998 ≈ 0.1 Ω."],
        answer: "≈ 0.1 Ω",
      },
      selfCheckExample: {
        prompt: "Only 4% of the current passes through a galvanometer of resistance G. Shunt?",
        steps: ["I/I_g = 25."],
        answer: "G/24",
      },
      practiceSet: [
        { prompt: "Identical galvanometers made into an ammeter and a milliammeter. The ammeter's shunt compared with the milliammeter's?", answer: "Less" },
      ],
      pyqExampleId: "eec00107-99b8-4f57-8247-59806372bb9f",
      traps: [
        {
          title: "Using the total current over the galvanometer current",
          body:
            "S = G/(I/I_g − 1): subtract 1, because the galvanometer still carries its own share. 4% gives G/24, not G/25.",
        },
      ],
    },
  ],
  related: [
    { label: "Field of a Current — the field at a coil's centre", href: `${BASE}/cetp-mag-field-of-current` },
    { label: "Electromagnetic Induction — flux through a coil", href: "/notes/mht-cet-physics/electromagnetic-induction" },
  ],
};
