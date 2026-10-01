import type { SubtopicNote } from "@/app/notes/_types";

export const LOOPS_MAG_NOTE: SubtopicNote = {
  subtopicName: "Circular Loops and Coils",
  title: "Circular Loops and Coils",
  oneLineDefinition:
    "A coil of N turns and radius R gives μ₀NI/2R at its centre; along its axis the field falls as R³/(R² + x²)^(3/2), so most questions are a ratio to the centre value.",
  whyItMatters:
    "Twenty PYQs, sixteen of them multiple choice, and three from 2026. Ten work at the centre of a coil: three rewind the same wire into a different number of turns, three put two coils in perpendicular planes with a common centre, two use the formula directly, one asks for the energy stored there and one for a flat spiral. Ten go along the axis, and eight of those are a ratio of the field at two points on the axis, usually with the centre as one of them.",
  concepts: [
    // C1 — centre of a coil
    {
      kind: "formula" as const,
      slug: "jpmag-loop-centre",
      name: "Field at the centre of a circular coil",
      intuition:
        "Every piece of a circular loop is at the same distance R from the centre and at right angles to the line joining it, so all the Biot–Savart pieces add in the same direction. N turns give N times one turn. If the same length of wire is rewound into more turns, each turn is smaller as well, so the field grows faster than the number of turns.",
      definition:
        "- Centre of a coil of N turns: \\(B = \\dfrac{\\mu_0 N I}{2R}\\), along the axis (right-hand rule: fingers along the current, thumb gives B).\n" +
        "- Rewinding a fixed length L of wire: \\(L = N(2\\pi R)\\), so \\(R \\propto 1/N\\) and \\(B \\propto N/R \\propto N^{2}\\).\n" +
        "- Two coils with a common centre and perpendicular planes: their fields are perpendicular, so \\(B = \\sqrt{B_1^{2} + B_2^{2}}\\).\n" +
        "- Flat spiral wound evenly from radius a to radius b: treat it as rings, with \\(\\dfrac{N}{b - a}\\) turns per unit radius, and add \\(\\dfrac{\\mu_0 I\\,dN}{2r}\\) from a to b; the result carries a logarithm, \\(\\ln(b/a)\\).\n" +
        "- Energy stored per unit volume where the field is B: \\(u = \\dfrac{B^{2}}{2\\mu_0}\\); multiply by a small volume for the energy in it.",
      formula: {
        label: "Centre of a coil and energy density",
        latex: "B = \\frac{\\mu_0 N I}{2R} \\qquad u = \\frac{B^{2}}{2\\mu_0}",
      },
      authoredExample: {
        prompt:
          "A coil of 50 turns and radius 10 cm carries 2 A. (a) Find the field at its centre. (b) The same wire is rewound into a coil of 25 turns carrying the same current. Find the new field at the centre. (\\(\\mu_0 = 4\\pi \\times 10^{-7}\\) T m/A)",
        steps: [
          "(a) \\(B = \\dfrac{4\\pi \\times 10^{-7} \\times 50 \\times 2}{2 \\times 0.1} = 2\\pi \\times 10^{-4} \\approx 6.28 \\times 10^{-4}\\) T.",
          "(b) Half the turns from the same wire: each turn is twice as long, so the radius doubles to 20 cm.",
          "\\(B \\propto N/R\\): half the turns and twice the radius give a quarter of the field.",
          "\\(B' = \\dfrac{2\\pi \\times 10^{-4}}{4} = 0.5\\pi \\times 10^{-4} \\approx 1.57 \\times 10^{-4}\\) T.",
        ],
        answer: "(a) about \\(6.28 \\times 10^{-4}\\) T; (b) about \\(1.57 \\times 10^{-4}\\) T.",
      },
      selfCheckExample: {
        prompt:
          "Two coils, each of 10 turns and radius 5 cm, have a common centre and perpendicular planes. They carry 3 A and 4 A. Find the field at the centre. (\\(\\mu_0 = 4\\pi \\times 10^{-7}\\) T m/A)",
        steps: [
          "\\(B_1 = \\dfrac{4\\pi \\times 10^{-7} \\times 10 \\times 3}{0.1} = 1.2\\pi \\times 10^{-4}\\) T; \\(B_2 = 1.6\\pi \\times 10^{-4}\\) T.",
          "The fields are along the two perpendicular axes: \\(B = \\sqrt{1.2^{2} + 1.6^{2}}\\,\\pi \\times 10^{-4} = 2\\pi \\times 10^{-4}\\) T.",
        ],
        answer: "\\(2\\pi \\times 10^{-4}\\) T, about \\(6.28 \\times 10^{-4}\\) T",
      },
      practiceSet: [
        { prompt: "A single circular loop of radius 5 cm carries 5 A. Field at its centre? (\\(\\mu_0 = 4\\pi \\times 10^{-7}\\) T m/A)", answer: "\\(2\\pi \\times 10^{-5}\\) T, about \\(62.8\\ \\mu\\text{T}\\)" },
        { prompt: "A coil of 3 turns is unwound and rewound as a single turn from the same wire, with the same current. By what factor does the field at the centre change?", answer: "It becomes \\(1/9\\) of the old value" },
        { prompt: "The field at the centre of a coil is 0.02 T. Find the magnetic energy density there. (\\(\\mu_0 = 4\\pi \\times 10^{-7}\\) T m/A)", answer: "\\(500/\\pi \\approx 159\\ \\text{J/m}^{3}\\)" },
        { prompt: "A flat spiral of 100 turns, wound evenly from radius 1 cm to 3 cm, carries 1 A. Field at its centre? (\\(\\mu_0 = 4\\pi \\times 10^{-7}\\) T m/A, ln 3 = 1.10)", answer: "\\(1.1\\pi \\times 10^{-3}\\) T, about \\(3.46 \\times 10^{-3}\\) T" },
      ],
      pyqExampleId: "8f4f57b8-fd70-4856-84a4-85f5d878860a", // 31 Jan 2023: the same wire as N turns, then n turns, ratio N² : n²
      traps: [
        {
          title: "Rewinding changes the radius too",
          body: "The same wire made into more turns makes each turn smaller. B depends on N/R and R goes as 1/N, so B goes as N². Scaling only by N misses half the change.",
        },
        {
          title: "Perpendicular coils add as vectors",
          body: "Two coils in perpendicular planes give fields along two perpendicular axes. The net field is √(B₁² + B₂²), not B₁ + B₂.",
        },
        {
          title: "Do not forget the number of turns",
          body: "μ₀I/2R is one turn. A coil of N closely wound turns gives N times that; leaving out N is a common slip when the turns are given in a separate sentence.",
        },
      ],
    },

    // C2 — on the axis
    {
      kind: "formula" as const,
      slug: "jpmag-loop-axis",
      name: "Field on the axis of a circular loop",
      intuition:
        "Away from the centre, along the axis, the pieces of the loop are farther away and their fields tilt, so the sideways parts cancel and only the parts along the axis add. The field is still along the axis but smaller. Written as a fraction of the centre field, it depends only on the ratio x/R, and falls off as the cube of distance far away.",
      definition:
        "- On the axis at distance x from the centre: \\(B = \\dfrac{\\mu_0 N I R^{2}}{2(R^{2} + x^{2})^{3/2}}\\).\n" +
        "- As a fraction of the centre field: \\(\\dfrac{B}{B_c} = \\dfrac{R^{3}}{(R^{2} + x^{2})^{3/2}} = \\sin^{3}\\theta\\), where \\(\\theta\\) is the angle at the point between the axis and the line to the rim.\n" +
        "- Far away (\\(x \\gg R\\)): \\(B \\approx \\dfrac{\\mu_0 N I R^{2}}{2x^{3}}\\).\n" +
        "- Two coaxial loops on either side of a point O: a current that looks clockwise from O gives a field at O pointing away from O, towards that loop. Add the two with signs.\n" +
        "- Just off the axis there is also a small sideways part of the field. It is zero in the plane of the loop and points opposite ways above and below it.",
      formula: {
        label: "Axis of a loop",
        latex: "B = \\frac{\\mu_0 N I R^{2}}{2\\left(R^{2} + x^{2}\\right)^{3/2}} \\qquad \\frac{B}{B_c} = \\frac{R^{3}}{\\left(R^{2} + x^{2}\\right)^{3/2}}",
      },
      authoredExample: {
        prompt:
          "The field at the centre of a loop of radius 3 cm is 125 μT. Find the field on its axis 4 cm from the centre.",
        steps: [
          "\\(\\sqrt{R^{2} + x^{2}} = \\sqrt{9 + 16} = 5\\) cm.",
          "\\(\\dfrac{B}{B_c} = \\left(\\dfrac{3}{5}\\right)^{3} = \\dfrac{27}{125}\\).",
          "\\(B = 125 \\times \\dfrac{27}{125} = 27\\ \\mu\\text{T}\\).",
        ],
        answer: "\\(27\\ \\mu\\text{T}\\)",
      },
      selfCheckExample: {
        prompt:
          "A single loop of radius 12 cm carries 2 A. Find the field on its axis 5 cm from the centre. (\\(\\mu_0 = 4\\pi \\times 10^{-7}\\) T m/A)",
        steps: [
          "Centre field: \\(B_c = \\dfrac{4\\pi \\times 10^{-7} \\times 2}{2 \\times 0.12} \\approx 1.047 \\times 10^{-5}\\) T.",
          "\\(\\sqrt{12^{2} + 5^{2}} = 13\\) cm, so \\(\\dfrac{B}{B_c} = \\left(\\dfrac{12}{13}\\right)^{3} \\approx 0.787\\).",
          "\\(B \\approx 1.047 \\times 10^{-5} \\times 0.787 \\approx 8.2 \\times 10^{-6}\\) T.",
        ],
        answer: "About \\(8.2\\ \\mu\\text{T}\\)",
      },
      practiceSet: [
        { prompt: "On the axis of a loop of radius R, at x = 2R, what fraction of the centre field is the field?", answer: "\\(\\dfrac{1}{5\\sqrt5} \\approx 0.089\\)" },
        { prompt: "A coil of 20 turns and radius 10 cm carries 0.5 A. Field at its centre? (\\(\\mu_0 = 4\\pi \\times 10^{-7}\\) T m/A)", answer: "\\(2\\pi \\times 10^{-5}\\) T" },
        { prompt: "The centre field of a loop is B. Roughly what is the field on its axis at x = 10R?", answer: "About \\(B/1000\\)" },
        { prompt: "Two identical coaxial loops carry equal currents in the same sense. At the point midway between them, how does the field compare with that of one loop at the same point?", answer: "It is twice as large" },
      ],
      pyqExampleId: "45fa4d26-5c28-409d-9b44-56fd7d742bd2", // 28 Jan 2026 S1: 16 μT at the centre, field at x = √3R on the axis, 2 μT
      traps: [
        {
          title: "The power is 3/2, not 1/2",
          body: "The axis field has (R² + x²)^(3/2) in the denominator and R² on top. Using the square root, or leaving out R², gives an expression with the wrong units.",
        },
        {
          title: "An approximation needs x much less than R",
          body: "A binomial approximation of the axis field is valid only very close to the centre. When x is comparable with R, work out (R/√(R² + x²))³ exactly.",
        },
        {
          title: "The direction of each coaxial loop's field",
          body: "Seen from the point between two loops, a clockwise current gives a field pointing towards that loop. Two loops whose currents both look clockwise from the point give opposite fields there, which subtract.",
        },
      ],
    },
  ],
};
