import type { SubtopicNote } from "@/app/notes/_types";

export const HOMOGENEITY_UNIT_NOTE: SubtopicNote = {
  subtopicName: "Dimensional Homogeneity and Unknown Constants",
  title: "Dimensional Homogeneity and Unknown Constants",
  oneLineDefinition:
    "Only quantities with the same dimensions can be added, subtracted or equated, and the argument of a sine, an exponential or a logarithm has no dimensions; these two rules fix the dimensions of every unknown constant in an equation.",
  whyItMatters:
    "Twenty-six PYQs, all multiple choice, and two from 2026. Fourteen find constants from terms that are added together, six of them the a and b of the van der Waals equation; eight use the rule that the argument of a sine, an exponential or a logarithm has no dimensions; four test whether a whole equation is dimensionally correct. The method is the same every time: find each constant on its own, then combine.",
  concepts: [
    // C1 — terms that are added
    {
      kind: "formula" as const,
      slug: "jpunit-added-terms",
      name: "Constants in terms that are added or subtracted",
      intuition:
        "You cannot add a length to a time. So in any sum, every term has the dimensions of the quantity on the left, and a constant added to a variable inside a bracket has the dimensions of that variable. Use this term by term: each term gives one equation for one constant.",
      definition:
        "- In \\(Q = X + Y\\), \\([X] = [Y] = [Q]\\).\n" +
        "- A constant added to a variable, as in \\((t + c)\\) or \\((V - b)\\), has that variable's dimensions.\n" +
        "- Van der Waals, \\(\\left(P + \\dfrac{a}{V^{2}}\\right)(V - b) = RT\\): \\([a/V^{2}] = [P]\\), so \\([a] = ML^{5}T^{-2}\\); \\([b] = L^{3}\\).\n" +
        "- Hence \\(a/b\\) is an energy (it has the dimensions of PV), \\(a/b^{2}\\) is a pressure or energy density, and \\(b^{2}/a\\) is a compressibility.\n" +
        "- Find each constant separately, then multiply or divide for the combination asked.",
      formula: {
        label: "Principle of homogeneity",
        latex:
          "[X] = [Y] = [Q] \\text{ in } Q = X + Y \\qquad \\left[\\frac{a}{V^{2}}\\right] = [P],\\ [b] = [V]",
      },
      authoredExample: {
        prompt:
          "The position of a particle is \\(x = at^{3} + \\dfrac{b}{t + c}\\), where t is time. Find the dimensions of \\(\\dfrac{ab}{c}\\).",
        steps: [
          "\\(c\\) is added to \\(t\\), so \\([c] = T\\).",
          "\\(at^{3}\\) is a length: \\([a] = LT^{-3}\\).",
          "\\(\\dfrac{b}{t + c}\\) is a length and the bracket is a time: \\([b] = LT\\).",
          "\\(\\dfrac{ab}{c} = \\dfrac{LT^{-3} \\cdot LT}{T} = L^{2}T^{-3}\\).",
        ],
        answer: "\\(L^{2}T^{-3}\\)",
      },
      selfCheckExample: {
        prompt:
          "For the van der Waals equation \\(\\left(P + \\dfrac{a}{V^{2}}\\right)(V - b) = RT\\), find the dimensions of the product \\(ab\\).",
        steps: [
          "\\([a] = [P][V^{2}] = ML^{-1}T^{-2} \\cdot L^{6} = ML^{5}T^{-2}\\).",
          "\\([b] = [V] = L^{3}\\).",
          "\\([ab] = ML^{8}T^{-2}\\).",
        ],
        answer: "\\(ML^{8}T^{-2}\\)",
      },
      practiceSet: [
        { prompt: "In \\(v = At + B\\), with v a speed and t a time, what are the dimensions of A?", answer: "\\(LT^{-2}\\)" },
        { prompt: "In the van der Waals equation, a/b has the dimensions of which quantity?", answer: "Energy (the same as PV)" },
        { prompt: "In \\(F = ax^{2} + b\\), with x a length, what are the dimensions of b/a?", answer: "\\(L^{2}\\)" },
        { prompt: "In the van der Waals equation, what are the dimensions of b?", answer: "\\(L^{3}\\)" },
      ],
      pyqExampleId: "fc6276c9-57ec-4aa1-882b-268dc41e9cd0", // 2026: modified Bernoulli equation, dimensions of A and B
      traps: [
        {
          title: "The constant inside a bracket takes the variable's dimensions",
          body: "In V − b, the constant b is a volume. It is not found from RT; it is fixed by the quantity it is subtracted from. The same holds for c in t + c, which is a time.",
        },
        {
          title: "a/V² is a pressure, so a is not a pressure",
          body: "The term a/V² has pressure's dimensions, so a itself is pressure × volume², ML⁵T⁻². Giving a the dimensions of pressure drops the V².",
        },
      ],
    },

    // C2 — arguments of functions
    {
      kind: "formula" as const,
      slug: "jpunit-function-args",
      name: "Arguments of sine, exponential and logarithm are dimensionless",
      intuition:
        "A sine, an exponential or a logarithm can only act on a pure number. So whatever sits inside must have no dimensions, and the function itself has none either. The whole dimension of the term then rests on the factor in front.",
      definition:
        "- In \\(\\sin(Bx)\\), \\(e^{-Bt}\\) or \\(\\log(Bx)\\): \\([Bx] = 1\\), so \\([B] = [x]^{-1}\\).\n" +
        "- The function's value is dimensionless, so in \\(Q = A\\sin(Bx)\\), \\([A] = [Q]\\).\n" +
        "- In \\(e^{-\\beta x^{2}/(kT)}\\), \\(\\beta x^{2}\\) has the dimensions of \\(kT\\), an energy.\n" +
        "- In a wave \\(y = a\\sin(\\omega t - kx)\\), \\([\\omega] = T^{-1}\\), \\([k] = L^{-1}\\), and \\(\\omega/k\\) is a speed.",
      formula: {
        label: "Argument rule",
        latex: "Q = A\\sin(Bx) \\Rightarrow [B] = [x]^{-1},\\ [A] = [Q]",
      },
      authoredExample: {
        prompt:
          "A pressure is given by \\(P = Ae^{-Bt} + C\\log(Dx)\\), where t is time and x is a length. Find the dimensions of \\(\\dfrac{AB}{CD}\\).",
        steps: [
          "\\(Bt\\) and \\(Dx\\) are dimensionless: \\([B] = T^{-1}\\), \\([D] = L^{-1}\\).",
          "Each term is a pressure and each function is a pure number: \\([A] = [C] = ML^{-1}T^{-2}\\).",
          "\\(\\dfrac{AB}{CD} = \\dfrac{T^{-1}}{L^{-1}} = LT^{-1}\\).",
        ],
        answer: "\\(LT^{-1}\\), the dimensions of a speed.",
      },
      selfCheckExample: {
        prompt:
          "An energy is written \\(U = \\dfrac{\\alpha}{\\beta}e^{-\\beta x/(kT)}\\), where x is a distance, k is Boltzmann's constant and T is temperature. Find the dimensions of \\(\\beta\\) and of \\(\\alpha\\).",
        steps: [
          "\\(\\beta x/(kT)\\) is dimensionless and \\(kT\\) is an energy, so \\([\\beta] = \\dfrac{ML^{2}T^{-2}}{L} = MLT^{-2}\\).",
          "\\(\\alpha/\\beta\\) is an energy, so \\([\\alpha] = ML^{2}T^{-2} \\cdot MLT^{-2} = M^{2}L^{3}T^{-4}\\).",
        ],
        answer: "\\([\\beta] = MLT^{-2}\\) (a force); \\([\\alpha] = M^{2}L^{3}T^{-4}\\).",
      },
      practiceSet: [
        { prompt: "In \\(y = a\\sin(\\omega t)\\), what are the dimensions of ω?", answer: "\\(T^{-1}\\)" },
        { prompt: "In \\(N = N_0e^{-\\lambda t}\\), what are the dimensions of λ?", answer: "\\(T^{-1}\\)" },
        { prompt: "In \\(y = a\\sin(\\omega t - kx)\\), what does ω/k represent?", answer: "The wave speed" },
        { prompt: "In \\(F = A\\cos(Bx)\\), with F a force and x a length, what are the dimensions of A?", answer: "\\(MLT^{-2}\\)" },
      ],
      pyqExampleId: "4dafd96d-5dfd-4120-95f5-531b5c263a0b", // 2021: F = A cos(Bx) + C sin(Dt), dimensions of AD/B
      traps: [
        {
          title: "The prefactor carries the whole dimension",
          body: "In Q = A sin(Bx), the sine is a pure number, so A has exactly the dimensions of Q. Giving A some of B's dimensions, as if the sine passed them on, is the usual slip.",
        },
      ],
    },

    // C3 — checking an equation
    {
      kind: "formula" as const,
      slug: "jpunit-check-equation",
      name: "Checking whether an equation is dimensionally correct",
      intuition:
        "Write the dimensions of each side, and of each added term, separately. If any two differ, the equation is wrong. If they all match, the equation may still be wrong: a missing 2 or π is invisible to dimensions. So the test can reject an equation but never prove it.",
      definition:
        "- Both sides, and every added term, must have the same dimensions.\n" +
        "- Pure numbers (2, π, ½) and dimensionless functions cannot be checked this way.\n" +
        "- Kepler: \\(T^{2} = \\dfrac{4\\pi^{2}r^{3}}{GM}\\); mass-energy: \\(E^{2} = p^{2}c^{2} + m^{2}c^{4}\\).\n" +
        "- A dimensionally correct equation can still be physically wrong.",
      formula: {
        label: "Homogeneity test",
        latex: "[\\text{left side}] = [\\text{right side}] = [\\text{every added term}]",
      },
      authoredExample: {
        prompt:
          "The speed of a wave on a string of tension T and mass per unit length μ is claimed to be either \\(v = \\sqrt{T/\\mu}\\) or \\(v = \\sqrt{T\\mu}\\). Which is dimensionally correct?",
        steps: [
          "\\([T] = MLT^{-2}\\) and \\([\\mu] = ML^{-1}\\).",
          "\\(T/\\mu = L^{2}T^{-2}\\), whose square root is \\(LT^{-1}\\), a speed.",
          "\\(T\\mu = M^{2}T^{-2}\\), whose square root is \\(MT^{-1}\\), not a speed.",
        ],
        answer: "\\(v = \\sqrt{T/\\mu}\\)",
      },
      selfCheckExample: {
        prompt:
          "Escape speed from a planet of mass M and radius R is claimed to be \\(\\sqrt{2GM/R}\\) or \\(\\sqrt{2GMR}\\). Which is dimensionally correct?",
        steps: [
          "\\(GM/R = M^{-1}L^{3}T^{-2} \\cdot M \\cdot L^{-1} = L^{2}T^{-2}\\); its root is a speed.",
          "\\(GMR = L^{4}T^{-2}\\); its root is \\(L^{2}T^{-1}\\).",
        ],
        answer: "\\(\\sqrt{2GM/R}\\)",
      },
      practiceSet: [
        { prompt: "Is \\(s = ut + \\tfrac{1}{2}at^{2}\\) dimensionally correct?", answer: "Yes, every term is a length" },
        { prompt: "Is \\(v^{2} = u^{2} + 2as^{2}\\) dimensionally correct?", answer: "No, \\(as^{2}\\) is \\(L^{3}T^{-2}\\)" },
        { prompt: "Can dimensions decide whether a formula has a factor 2π?", answer: "No" },
        { prompt: "In \\(E^{2} = p^{2}c^{2} + m^{2}c^{4}\\), what are the dimensions of \\(p^{2}c^{2}\\)?", answer: "\\(M^{2}L^{4}T^{-4}\\), energy squared" },
      ],
      pyqExampleId: "3f3c978e-aa14-4ea8-b2b4-9741e1337446", // 2024: which form of Kepler's third law is homogeneous
      traps: [
        {
          title: "Dimensionally correct does not mean correct",
          body: "T = π√(l/g) passes the dimension test but is wrong by a factor 2. A dimension check can only rule an equation out.",
        },
      ],
    },
  ],
};
