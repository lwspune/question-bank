import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_UM_DIMS_NOTE: SubtopicNote = {
  subtopicName: "Dimensions and Dimensional Analysis",
  title: "Dimensions and Dimensional Analysis",
  oneLineDefinition:
    "The dimensions of a quantity are the powers of mass, length, time and the other base quantities in it; they let you check an equation, find unknown constants and build a relation.",
  whyItMatters:
    "Nine NEET questions, the largest share of the chapter, asked in every year from 2021 to 2026 except 2023. Five ask for dimensions: E/G (2021), the quantity with dimensions MLT⁻²A⁻² (2022), Stefan, Boltzmann and Wien constants combined (Re-NEET 2026), and two on angles having units but no dimensions (2022, 2024). Two use homogeneity to find constants inside a formula (2024, Re-NEET 2024), and two build a relation: energy in terms of force, acceleration and time (2021) and a balloon emptying (2025).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nphum-dim-formulae",
      name: "Dimensional formulae of common quantities",
      intuition:
        "Every quantity can be built from a few base quantities. Speed is a length divided by a time, so its dimensions are L¹T⁻¹. Write the defining equation of a quantity, replace each symbol by its dimensions, and the dimensional formula follows. Force, MLT⁻², is the starting point for most mechanical quantities.",
      definition:
        "- The dimensions of a quantity are the powers to which the base quantities are raised to represent it. Mass is [M], length [L], time [T], current [A] and temperature [K].\n" +
        "- A **dimensional formula** is written in square brackets: force is \\([MLT^{-2}]\\).\n" +
        "- A pure number, a ratio of two like quantities (strain, refractive index) and an angle are **dimensionless**: \\([M^{0}L^{0}T^{0}]\\).\n" +
        "- Radian and steradian are units, yet plane angle and solid angle have no dimensions, since each is a length over a length or an area over an area.\n" +
        "- Quantities with the same dimensions can still be different quantities: work and torque are both \\([ML^{2}T^{-2}]\\).",
      table: {
        columns: ["Quantity", "Defining relation", "Dimensions"],
        rows: [
          { cells: ["Force", "\\(F = ma\\)", "\\([MLT^{-2}]\\)"] },
          { cells: ["Work, energy, torque", "\\(W = Fs\\)", "\\([ML^{2}T^{-2}]\\)"] },
          { cells: ["Power", "\\(P = W/t\\)", "\\([ML^{2}T^{-3}]\\)"] },
          { cells: ["Momentum, impulse", "\\(p = mv\\)", "\\([MLT^{-1}]\\)"] },
          { cells: ["Angular momentum, Planck's constant", "\\(L = mvr,\\ E = h\\nu\\)", "\\([ML^{2}T^{-1}]\\)"] },
          { cells: ["Pressure, stress, Young's modulus", "\\(F/A\\)", "\\([ML^{-1}T^{-2}]\\)"] },
          { cells: ["Surface tension, spring constant", "\\(F/l\\)", "\\([MT^{-2}]\\)"] },
          { cells: ["Coefficient of viscosity", "\\(F = \\eta A\\,\\dfrac{dv}{dz}\\)", "\\([ML^{-1}T^{-1}]\\)"] },
          { cells: ["Gravitational constant G", "\\(F = \\dfrac{Gm_1m_2}{r^{2}}\\)", "\\([M^{-1}L^{3}T^{-2}]\\)"] },
          { cells: ["Latent heat", "\\(Q/m\\)", "\\([L^{2}T^{-2}]\\)"] },
          { cells: ["Charge", "\\(q = It\\)", "\\([AT]\\)"] },
          { cells: ["Potential difference", "\\(V = W/q\\)", "\\([ML^{2}T^{-3}A^{-1}]\\)"] },
          { cells: ["Permittivity of free space", "\\(F = \\dfrac{q_1q_2}{4\\pi\\varepsilon_0 r^{2}}\\)", "\\([M^{-1}L^{-3}T^{4}A^{2}]\\)"] },
          {
            cells: ["Permeability of free space", "\\(\\mu_0\\varepsilon_0 = \\dfrac{1}{c^{2}}\\)", "\\([MLT^{-2}A^{-2}]\\)"],
            noteAmber: "NEET 2022: which quantity has the dimensions MLT⁻²A⁻²? The answer was magnetic permeability.",
            pyqExampleId: "e27e0544-943b-42da-8665-518d85f4b570",
          },
          { cells: ["Magnetic flux", "\\(\\varepsilon = \\dfrac{d\\Phi}{dt}\\)", "\\([ML^{2}T^{-2}A^{-1}]\\)"] },
          {
            cells: ["Stefan constant, Boltzmann constant, Wien's constant", "\\(\\sigma T^{4},\\ \\tfrac{3}{2}k_BT,\\ \\lambda_m T = b\\)", "\\([MT^{-3}K^{-4}]\\), \\([ML^{2}T^{-2}K^{-1}]\\), \\([LK]\\)"],
            noteAmber: "Re-NEET 2026 combined all three: the dimensions of the Stefan constant divided by the Boltzmann constant, times Wien's constant.",
            pyqExampleId: "b7d50543-347c-49c8-84b1-2c59ed73748f",
          },
          {
            cells: ["Plane angle, solid angle, strain", "\\(s/r,\\ A/r^{2},\\ \\Delta l/l\\)", "\\([M^{0}L^{0}T^{0}]\\)"],
            noteAmber: "NEET 2022: plane and solid angle have units but no dimensions. NEET 2024: strain and angle have the same dimensions as solid angle.",
            pyqExampleId: "e719c1bd-f6d7-4709-ad0c-8178e9e32f92",
          },
        ],
        caption: "Each row follows from its defining relation. σT⁴ is power per unit area, and (3/2)k_BT is an energy.",
      },
      selfCheckExample: {
        prompt: "Electric potential difference is the work done per unit charge. Find its dimensions.",
        steps: [
          "Work is \\([ML^{2}T^{-2}]\\) and charge is \\([AT]\\).",
          "\\(\\dfrac{[ML^{2}T^{-2}]}{[AT]} = [ML^{2}T^{-3}A^{-1}]\\).",
        ],
        answer: "\\([ML^{2}T^{-3}A^{-1}]\\)",
      },
      practiceSet: [
        { prompt: "What are the dimensions of impulse?", answer: "\\([MLT^{-1}]\\)" },
        { prompt: "Which constant has the same dimensions as angular momentum?", answer: "Planck's constant" },
        { prompt: "Which of work and power has the same dimensions as torque?", answer: "Work" },
        { prompt: "What are the dimensions of strain?", answer: "None: \\([M^{0}L^{0}T^{0}]\\)" },
      ],
      pyqExampleId: "2234a42f-507b-4d6b-9bd8-87e8dde39a49",
      traps: [
        {
          title: "Having a unit does not mean having dimensions",
          body: "Radian and steradian are units, but angle and solid angle are ratios of like quantities, so their dimensions are \\([M^{0}L^{0}T^{0}]\\).",
        },
        {
          title: "Same dimensions, different quantity",
          body: "Work and torque share \\([ML^{2}T^{-2}]\\), and angular momentum and Planck's constant share \\([ML^{2}T^{-1}]\\). Matching dimensions does not make two quantities the same thing.",
        },
        {
          title: "G carries a negative power of mass",
          body: "From \\(G = \\dfrac{Fr^{2}}{m_1m_2}\\), G is \\([M^{-1}L^{3}T^{-2}]\\). Dividing by \\(m^{2}\\) leaves \\(M^{-1}\\), not \\(M^{-2}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphum-homogeneity",
      name: "Principle of homogeneity",
      intuition:
        "You cannot add 5 metres to 3 seconds. In any correct equation every term that is added, subtracted or set equal must have the same dimensions. So if an unknown constant sits next to a known quantity in a sum, it must carry that quantity's dimensions. That one idea finds most unknown constants.",
      definition:
        "- **Principle of homogeneity:** every term on both sides of a correct equation has the same dimensions.\n" +
        "- If \\(x = a + bt + ct^{2}\\), then \\([x] = [a] = [bt] = [ct^{2}]\\), so \\([b] = [x]/[t]\\) and \\([c] = [x]/[t^{2}]\\).\n" +
        "- A constant added to a quantity has that quantity's dimensions: in \\(t^{2} + B\\), \\([B] = [T^{2}]\\).\n" +
        "- The argument of sin, cos, exp and log is dimensionless: in \\(\\sin(\\omega t)\\), \\([\\omega] = [T^{-1}]\\).\n" +
        "- A dimensionally correct equation may still be wrong: dimensions cannot test a pure number such as \\(\\tfrac{1}{2}\\) or \\(2\\pi\\).",
      formula: {
        label: "Homogeneity",
        latex: "x = a + bt + ct^{2} \\ \\Rightarrow\\ [x] = [a] = [bt] = [ct^{2}]",
      },
      authoredExample: {
        prompt: "The position of a particle is \\(x = at + bt^{3}\\), with x in metres and t in seconds. Find the dimensions of a and b.",
        steps: [
          "Each term must be a length: \\([at] = [L]\\) and \\([bt^{3}] = [L]\\).",
          "\\([a] = \\dfrac{[L]}{[T]} = [LT^{-1}]\\).",
          "\\([b] = \\dfrac{[L]}{[T^{3}]} = [LT^{-3}]\\).",
        ],
        answer: "\\([a] = [LT^{-1}]\\), \\([b] = [LT^{-3}]\\)",
      },
      selfCheckExample: {
        prompt: "A wave is \\(y = A\\sin(\\omega t - kx)\\), with x a distance. What are the dimensions of k?",
        steps: [
          "The argument of a sine is dimensionless, so \\([kx] = [M^{0}L^{0}T^{0}]\\).",
          "\\([k] = \\dfrac{1}{[L]} = [L^{-1}]\\).",
        ],
        answer: "\\([L^{-1}]\\)",
      },
      practiceSet: [
        { prompt: "Can a length be added to an area?", answer: "No; only quantities with the same dimensions can be added" },
        { prompt: "Is \\(v = u + at^{2}\\) dimensionally correct?", answer: "No: \\(at^{2}\\) is a length, not a speed" },
        { prompt: "In \\(e^{-\\alpha t}\\), with t a time, what are the dimensions of \\(\\alpha\\)?", answer: "\\([T^{-1}]\\)" },
        { prompt: "Can dimensions show that kinetic energy is \\(\\tfrac{1}{2}mv^{2}\\) and not \\(mv^{2}\\)?", answer: "No; a pure number has no dimensions" },
      ],
      pyqExampleId: "7623ff22-3e74-45df-8449-583b027e3933",
      traps: [
        {
          title: "Correct dimensions, wrong formula",
          body: "\\(s = ut + at^{2}\\) passes the dimension test but is wrong; the right one has \\(\\tfrac{1}{2}at^{2}\\). Dimensions can reject a formula, never prove it.",
        },
        {
          title: "A constant takes the dimensions of what it is added to",
          body: "In \\(\\left(P + \\dfrac{a}{V^{2}}\\right)\\), with P a pressure and V a volume, the term \\(\\dfrac{a}{V^{2}}\\) is a pressure, so a is \\([ML^{5}T^{-2}]\\). Match the whole term, including its power, not the bare letter.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphum-deriving",
      name: "Deriving relations and changing base quantities",
      intuition:
        "If you know which quantities a result depends on, you can guess the formula by making the dimensions match. Write the result as a product of powers, compare the powers of M, L and T on both sides, and solve. The same trick converts a value from one system of units to another, or rewrites a quantity using new base quantities.",
      definition:
        "- **Finding a relation:** write \\(Q = k\\,a^{x}b^{y}c^{z}\\), put in dimensions, equate the powers of M, L and T, and solve for x, y, z. The constant k is dimensionless and cannot be found this way.\n" +
        "- The method works for at most three unknown powers when only M, L and T appear, and it cannot handle a sum of terms.\n" +
        "- **Converting units:** \\(n_2 = n_1\\left[\\dfrac{M_1}{M_2}\\right]^{a}\\left[\\dfrac{L_1}{L_2}\\right]^{b}\\left[\\dfrac{T_1}{T_2}\\right]^{c}\\) for a quantity of dimensions \\([M^{a}L^{b}T^{c}]\\). For example \\(1\\ \\text{N} = 10^{5}\\) dyne.\n" +
        "- **New base quantities:** to write a quantity in, say, force, length and time, write it as \\(F^{x}L^{y}T^{z}\\) and match powers of M, L and T in the usual way.",
      formula: {
        label: "Method of dimensions",
        latex: "Q = k\\,a^{x}b^{y}c^{z}, \\qquad n_2 = n_1\\left[\\frac{M_1}{M_2}\\right]^{a}\\left[\\frac{L_1}{L_2}\\right]^{b}\\left[\\frac{T_1}{T_2}\\right]^{c}",
      },
      authoredExample: {
        prompt: "The period t of a simple pendulum may depend on the bob's mass m, the length l and g. Find the form of the relation.",
        steps: [
          "Let \\(t = k\\,m^{x}l^{y}g^{z}\\). Then \\([T] = [M]^{x}[L]^{y}[LT^{-2}]^{z}\\).",
          "Powers of M: \\(x = 0\\). Powers of T: \\(-2z = 1\\), so \\(z = -\\tfrac{1}{2}\\).",
          "Powers of L: \\(y + z = 0\\), so \\(y = \\tfrac{1}{2}\\).",
          "\\(t = k\\sqrt{\\dfrac{l}{g}}\\). The period does not depend on the mass.",
        ],
        answer: "\\(t = k\\sqrt{l/g}\\)",
      },
      selfCheckExample: {
        prompt: "Convert a force of 1 N into dynes, the CGS unit.",
        steps: [
          "\\(1\\ \\text{N} = 1\\ \\text{kg m s}^{-2}\\).",
          "\\(1\\ \\text{kg} = 10^{3}\\ \\text{g}\\) and \\(1\\ \\text{m} = 10^{2}\\ \\text{cm}\\).",
          "\\(1\\ \\text{N} = 10^{3} \\times 10^{2}\\ \\text{g cm s}^{-2} = 10^{5}\\) dyne.",
        ],
        answer: "\\(10^{5}\\) dyne",
      },
      practiceSet: [
        { prompt: "The speed of a wave on a string depends on the tension F and the mass per unit length μ. Find the relation, taking the constant as 1.", answer: "\\(v = \\sqrt{F/\\mu}\\)" },
        { prompt: "Convert 1 joule into ergs.", answer: "\\(10^{7}\\) erg" },
        { prompt: "An acceleration is 1 m/s². What is its value in m/min²?", answer: "3600 m/min²" },
        { prompt: "Can the method of dimensions find the dimensionless constant in a relation?", answer: "No" },
      ],
      pyqExampleId: "2bf6772e-e7a0-4e16-836d-68a02c492386",
      traps: [
        {
          title: "Converting time squares the factor",
          body: "Going from seconds to minutes in an acceleration multiplies by \\(60^{2}\\), not 60, because time appears as \\(T^{-2}\\).",
        },
        {
          title: "Check the answer by putting it back",
          body: "After solving for the powers, rebuild the dimensions from your answer. A sign slip in one power is the usual way to land on a wrong option.",
        },
      ],
    },
  ],
};
