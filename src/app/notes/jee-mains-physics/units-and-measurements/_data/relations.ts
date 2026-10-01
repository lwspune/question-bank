import type { SubtopicNote } from "@/app/notes/_types";

export const RELATIONS_UNIT_NOTE: SubtopicNote = {
  subtopicName: "Deriving Relations and Changing Base Quantities",
  title: "Deriving Relations and Changing Base Quantities",
  oneLineDefinition:
    "Writing a quantity as a product of powers of other quantities and equating the powers of M, L and T finds the unknown powers; the same algebra rewrites any quantity in a new set of base quantities.",
  whyItMatters:
    "Fourteen PYQs, thirteen of them multiple choice, and four from 2026. Six find the powers in a relation such as v = λᵃgᵇρᶜ by equating the powers of M, L and T; eight rewrite a quantity in new base quantities, such as force, velocity and time, or h, c and G. Both are three linear equations in three unknowns.",
  concepts: [
    // C1 — the exponent method
    {
      kind: "formula" as const,
      slug: "jpunit-exponents",
      name: "Finding unknown powers by equating dimensions",
      intuition:
        "Suppose a quantity depends on three others as a product of powers. Both sides must have the same dimensions, so the power of M on the left equals the total power of M on the right, and the same for L and T. Three equations fix three unknown powers.",
      definition:
        "- Write \\(Q = k\\,A^{a}B^{b}C^{c}\\), with k a pure number.\n" +
        "- Put in the dimensions of A, B, C and Q.\n" +
        "- Equate the powers of M, of L and of T (and of A or K if they appear), then solve.\n" +
        "- A base quantity carried by only one factor, and absent from Q, forces that factor's power to zero.\n" +
        "- Limits: the method cannot find k, cannot handle a sum of terms, and needs no more unknowns than equations.",
      formula: {
        label: "Exponent method",
        latex: "Q = k\\,A^{a}B^{b}C^{c} \\Rightarrow \\text{equate the powers of } M,\\ L,\\ T",
      },
      authoredExample: {
        prompt:
          "The period of a simple pendulum is taken as \\(T = k\\,m^{a}l^{b}g^{c}\\), with m the mass of the bob, l the length and g the acceleration due to gravity. Find a, b and c.",
        steps: [
          "Dimensions: \\(T^{1} = M^{a}L^{b}(LT^{-2})^{c} = M^{a}L^{b + c}T^{-2c}\\).",
          "M: \\(a = 0\\). T: \\(-2c = 1\\), so \\(c = -\\tfrac{1}{2}\\). L: \\(b + c = 0\\), so \\(b = \\tfrac{1}{2}\\).",
          "So \\(T = k\\sqrt{l/g}\\); dimensions cannot give \\(k = 2\\pi\\).",
        ],
        answer: "\\(a = 0,\\ b = \\tfrac{1}{2},\\ c = -\\tfrac{1}{2}\\)",
      },
      selfCheckExample: {
        prompt:
          "The speed of sound in a gas is taken as \\(v = k\\,P^{a}\\rho^{b}\\), with P the pressure and ρ the density. Find a and b.",
        steps: [
          "\\(LT^{-1} = (ML^{-1}T^{-2})^{a}(ML^{-3})^{b}\\).",
          "T: \\(-2a = -1\\), so \\(a = \\tfrac{1}{2}\\). M: \\(a + b = 0\\), so \\(b = -\\tfrac{1}{2}\\).",
          "Check L: \\(-a - 3b = -\\tfrac{1}{2} + \\tfrac{3}{2} = 1\\). It matches.",
        ],
        answer: "\\(a = \\tfrac{1}{2},\\ b = -\\tfrac{1}{2}\\), so \\(v = k\\sqrt{P/\\rho}\\).",
      },
      practiceSet: [
        { prompt: "If \\(F = k\\,m^{a}v^{b}r^{c}\\) for a body in circular motion, find a, b, c.", answer: "\\(1,\\ 2,\\ -1\\)" },
        { prompt: "If energy \\(E = k\\,m^{a}c^{b}\\), find a and b.", answer: "\\(1,\\ 2\\)" },
        { prompt: "Can the exponent method find the 2π in \\(T = 2\\pi\\sqrt{l/g}\\)?", answer: "No" },
        { prompt: "If \\(v = k\\,g^{a}h^{b}\\) for a falling body, find a and b.", answer: "\\(\\tfrac{1}{2},\\ \\tfrac{1}{2}\\)" },
      ],
      pyqExampleId: "1f838b89-3b08-45aa-9738-e62a29b7a679", // 2023: speed of water waves v = λ^a g^b ρ^c
      traps: [
        {
          title: "A base quantity on one side only forces its power to zero",
          body: "If only one quantity on the right carries mass, and the left side has no mass, that quantity's power must be zero. Dropping the M equation because 'nothing is heavy' loses this result.",
        },
      ],
    },

    // C2 — new base quantities
    {
      kind: "formula" as const,
      slug: "jpunit-new-base",
      name: "Writing dimensions in new base quantities",
      intuition:
        "Any three independent quantities can serve as the base instead of M, L and T. First express M, L and T in the new base. Then substitute them into the quantity's usual dimensions. The same idea converts a number from one system of units to another.",
      definition:
        "- Step 1: write each new base quantity in M, L, T; solve for M, L, T in terms of the new base.\n" +
        "- Step 2: substitute into the quantity's usual formula.\n" +
        "- Or directly: set \\(Q = X^{a}Y^{b}Z^{c}\\) and equate powers of M, L, T.\n" +
        "- Planck units from h, c, G: mass \\(\\sqrt{hc/G}\\), length \\(\\sqrt{Gh/c^{3}}\\), time \\(\\sqrt{Gh/c^{5}}\\).\n" +
        "- Converting a value: \\(n_2 = n_1\\left(\\dfrac{M_1}{M_2}\\right)^{a}\\left(\\dfrac{L_1}{L_2}\\right)^{b}\\left(\\dfrac{T_1}{T_2}\\right)^{c}\\) for a quantity \\(M^{a}L^{b}T^{c}\\).",
      formula: {
        label: "Change of units",
        latex: "n_2 = n_1\\left(\\frac{M_1}{M_2}\\right)^{a}\\left(\\frac{L_1}{L_2}\\right)^{b}\\left(\\frac{T_1}{T_2}\\right)^{c}",
      },
      authoredExample: {
        prompt:
          "If energy E, velocity V and time T are taken as the base quantities, find the dimensions of mass, of length and of force.",
        steps: [
          "Length: \\(V = LT^{-1}\\), so \\(L = VT\\).",
          "Mass: \\(E = ML^{2}T^{-2} = MV^{2}\\), so \\(M = EV^{-2}\\).",
          "Force \\(= E/L = \\dfrac{E}{VT} = EV^{-1}T^{-1}\\).",
        ],
        answer: "Mass \\([EV^{-2}]\\), length \\([VT]\\), force \\([EV^{-1}T^{-1}]\\).",
      },
      selfCheckExample: {
        prompt:
          "With the speed of light c, the gravitational constant G and Planck's constant h as base quantities, find the dimensions of length.",
        steps: [
          "Let \\(L = c^{a}G^{b}h^{d}\\) with \\(c = LT^{-1}\\), \\(G = M^{-1}L^{3}T^{-2}\\), \\(h = ML^{2}T^{-1}\\).",
          "M: \\(-b + d = 0\\). T: \\(-a - 2b - d = 0\\). L: \\(a + 3b + 2d = 1\\).",
          "So \\(d = b\\) and \\(a = -3b\\); then \\(-3b + 5b = 1\\) gives \\(b = \\tfrac{1}{2}\\), \\(a = -\\tfrac{3}{2}\\).",
        ],
        answer: "\\(\\sqrt{Gh/c^{3}}\\)",
      },
      practiceSet: [
        { prompt: "Convert 1 J into ergs (1 kg = 1000 g, 1 m = 100 cm).", answer: "\\(10^{7}\\) erg" },
        { prompt: "With force F, length L and time T as base, what are the dimensions of mass?", answer: "\\(FL^{-1}T^{2}\\)" },
        { prompt: "With velocity V, time T and force F as base, what are the dimensions of momentum?", answer: "\\(FT\\)" },
        { prompt: "From h, c and G, which combination has the dimensions of mass?", answer: "\\(\\sqrt{hc/G}\\)" },
      ],
      pyqExampleId: "5f3a0082-b422-45ab-802e-0db3daa2d411", // 2026: G in terms of h, length, mass and time
      traps: [
        {
          title: "Solve for the old base first",
          body: "Writing the new quantities in M, L and T is the easy half. The answer needs the reverse: M, L and T in the new quantities. Substituting before inverting gives the reciprocal powers.",
        },
      ],
    },
  ],
};
