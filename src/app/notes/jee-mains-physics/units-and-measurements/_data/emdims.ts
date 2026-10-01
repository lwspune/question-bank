import type { SubtopicNote } from "@/app/notes/_types";

export const EMDIMS_UNIT_NOTE: SubtopicNote = {
  subtopicName: "Dimensions of Electric and Magnetic Quantities",
  title: "Dimensions of Electric and Magnetic Quantities",
  oneLineDefinition:
    "Electric and magnetic quantities add current A as a fourth base quantity; each one's dimensions come from a defining equation, and a few combinations reduce to a speed, a resistance, a time or an energy density.",
  whyItMatters:
    "Twenty-five PYQs, all multiple choice, and four from 2026. Eleven build dimensions from defining equations such as V = W/q or F = qvB, five of them as match-the-list; fourteen ask about a combination such as 1/(μ₀ε₀), ε₀E², E/H or R/√(LC). The combinations are quicker to recognise than to work out, which is why the second half of the page is a list of shortcuts.",
  concepts: [
    // C1 — defining equations
    {
      kind: "reference" as const,
      slug: "jpunit-em-defining",
      name: "Dimensions of electric and magnetic quantities",
      intuition:
        "Current A is a base quantity, so charge is current × time, AT. Every other electric quantity comes from an equation that links it to energy or force: a voltage is energy per charge, a field is force per charge, a magnetic field comes from the force \\(qvB\\) on a moving charge. Build each one from that equation.",
      definition:
        "- Charge \\(q = It\\): \\(AT\\).\n" +
        "- Potential and emf \\(V = W/q\\): \\(ML^{2}T^{-3}A^{-1}\\). Resistance \\(R = V/I\\): \\(ML^{2}T^{-3}A^{-2}\\).\n" +
        "- Capacitance \\(C = q/V\\): \\(M^{-1}L^{-2}T^{4}A^{2}\\). Inductance (self or mutual), from \\(U = \\tfrac{1}{2}LI^{2}\\): \\(ML^{2}T^{-2}A^{-2}\\).\n" +
        "- Electric field \\(E = F/q\\): \\(MLT^{-3}A^{-1}\\). Magnetic field, from \\(F = qvB\\): \\(MT^{-2}A^{-1}\\). Magnetic flux \\(BA\\): \\(ML^{2}T^{-2}A^{-1}\\).\n" +
        "- \\(\\varepsilon_0\\), from Coulomb's law: \\(M^{-1}L^{-3}T^{4}A^{2}\\). \\(\\mu_0\\), from \\(B = \\mu_0I/(2\\pi r)\\): \\(MLT^{-2}A^{-2}\\).\n" +
        "- Magnetic moment \\(IA\\): \\(L^{2}A\\). Magnetising field H and magnetisation: \\(L^{-1}A\\).",
      table: {
        columns: ["Quantity", "Defining relation", "Dimensions"],
        rows: [
          { cells: ["Charge", "\\(q = It\\)", "\\(AT\\)"] },
          { cells: ["Potential difference, emf", "\\(V = W/q\\)", "\\(ML^{2}T^{-3}A^{-1}\\)"] },
          { cells: ["Resistance", "\\(R = V/I\\)", "\\(ML^{2}T^{-3}A^{-2}\\)"] },
          { cells: ["Resistivity", "\\(\\rho = RA/l\\)", "\\(ML^{3}T^{-3}A^{-2}\\)"] },
          { cells: ["Capacitance", "\\(C = q/V\\)", "\\(M^{-1}L^{-2}T^{4}A^{2}\\)"] },
          { cells: ["Self or mutual inductance", "\\(U = \\tfrac{1}{2}LI^{2}\\)", "\\(ML^{2}T^{-2}A^{-2}\\)"], noteAmber: "A⁻², not A⁻¹: energy divided by current squared." },
          { cells: ["Electric field", "\\(E = F/q\\)", "\\(MLT^{-3}A^{-1}\\)"] },
          { cells: ["Magnetic field (induction) B", "\\(F = qvB\\)", "\\(MT^{-2}A^{-1}\\)"] },
          { cells: ["Magnetic flux", "\\(\\Phi = BA\\)", "\\(ML^{2}T^{-2}A^{-1}\\)"] },
          { cells: ["Permittivity \\(\\varepsilon_0\\)", "\\(F = q_1q_2/(4\\pi\\varepsilon_0r^{2})\\)", "\\(M^{-1}L^{-3}T^{4}A^{2}\\)"] },
          { cells: ["Permeability \\(\\mu_0\\)", "\\(B = \\mu_0I/(2\\pi r)\\)", "\\(MLT^{-2}A^{-2}\\)"] },
          { cells: ["Magnetic moment", "\\(m = IA\\)", "\\(L^{2}A\\)"] },
          { cells: ["Magnetising field H, magnetisation", "\\(H = B/\\mu_0\\)", "\\(L^{-1}A\\)"] },
          { cells: ["Electric dipole moment", "\\(p = qd\\)", "\\(LTA\\)"] },
        ],
        caption: "Charge is AT; every other entry follows from its defining relation.",
      },
      selfCheckExample: {
        prompt:
          "The resistivity of a wire is \\(\\rho = \\dfrac{RA}{l}\\). Find its dimensions.",
        steps: [
          "Resistance is \\(ML^{2}T^{-3}A^{-2}\\).",
          "\\(\\rho = \\dfrac{ML^{2}T^{-3}A^{-2} \\cdot L^{2}}{L} = ML^{3}T^{-3}A^{-2}\\).",
        ],
        answer: "\\(ML^{3}T^{-3}A^{-2}\\)",
      },
      practiceSet: [
        { prompt: "Dimensions of magnetic flux?", answer: "\\(ML^{2}T^{-2}A^{-1}\\)" },
        { prompt: "Dimensions of capacitance?", answer: "\\(M^{-1}L^{-2}T^{4}A^{2}\\)" },
        { prompt: "Dimensions of B/μ₀?", answer: "\\(L^{-1}A\\)" },
        { prompt: "Dimensions of electric dipole moment divided by magnetic dipole moment?", answer: "\\(L^{-1}T\\)", method: "\\(LTA / L^{2}A\\)." },
      ],
      pyqExampleId: "ee097935-54cb-49a9-b56c-881e8099106c", // 2026: magnetic induction, flux, permeability, self-inductance
      traps: [
        {
          title: "Inductance has A⁻², flux has A⁻¹",
          body: "Magnetic flux is ML²T⁻²A⁻¹ and inductance is flux per current, ML²T⁻²A⁻². The two entries differ only in the power of A, and a match list places them side by side.",
        },
        {
          title: "Charge is AT, not a base quantity",
          body: "The base quantity is current. When a question uses charge Q as a base instead, rewrite A as QT⁻¹: capacitance then becomes M⁻¹L⁻²T²Q².",
        },
      ],
    },

    // C2 — shortcut combinations
    {
      kind: "formula" as const,
      slug: "jpunit-em-shortcuts",
      name: "Electromagnetic combinations with simple dimensions",
      intuition:
        "Several combinations collapse to something familiar, and recognising them saves the whole calculation. \\(1/\\sqrt{\\mu_0\\varepsilon_0}\\) is the speed of light. \\(\\tfrac{1}{2}\\varepsilon_0E^{2}\\) is the energy stored per volume in an electric field. \\(RC\\), \\(L/R\\) and \\(\\sqrt{LC}\\) are the time scales of circuits. Replace the combination by what it means, then finish the dimensions.",
      definition:
        "- \\(\\dfrac{1}{\\mu_0\\varepsilon_0} = c^{2}\\): \\(L^{2}T^{-2}\\).\n" +
        "- \\(\\sqrt{\\mu_0/\\varepsilon_0}\\) is a resistance (about 377 Ω); so is \\(E/H\\).\n" +
        "- \\(\\tfrac{1}{2}\\varepsilon_0E^{2}\\) and \\(\\dfrac{B^{2}}{2\\mu_0}\\) are energy densities: \\(ML^{-1}T^{-2}\\).\n" +
        "- \\(E/B\\) is a speed. \\(\\varepsilon_0E\\) is a surface charge density (it has the dimensions of \\(D\\)), so \\(\\varepsilon_0E/t\\) is a current density, A m⁻².\n" +
        "- \\(RC\\), \\(L/R\\) and \\(\\sqrt{LC}\\) are times. \\(L/C\\) is a resistance squared, not a time.\n" +
        "- \\(\\dfrac{e^{2}}{4\\pi\\varepsilon_0hc}\\) has no dimensions. \\(\\mu_0\\) and \\(\\varepsilon_0\\) DO have dimensions; relative permeability, power factor and quality factor do not.",
      formula: {
        label: "Combinations to recognise",
        latex:
          "\\frac{1}{\\mu_0\\varepsilon_0} = c^{2} \\qquad \\sqrt{\\frac{\\mu_0}{\\varepsilon_0}} = [R] \\qquad \\tfrac{1}{2}\\varepsilon_0E^{2} = \\frac{B^{2}}{2\\mu_0} = [\\text{energy/volume}] \\qquad [RC] = [L/R] = [\\sqrt{LC}] = T",
      },
      authoredExample: {
        prompt:
          "Find the dimensions of \\(\\varepsilon_0E^{2}c\\), where E is an electric field and c is the speed of light. Which physical quantity has these dimensions?",
        steps: [
          "\\(\\varepsilon_0E^{2}\\) is twice an energy density, so it has the dimensions \\(ML^{-1}T^{-2}\\).",
          "Multiply by a speed: \\(ML^{-1}T^{-2} \\cdot LT^{-1} = MT^{-3}\\).",
          "Energy per volume × distance per time = energy per area per time: power per area.",
        ],
        answer: "\\(MT^{-3}\\), the dimensions of intensity.",
      },
      selfCheckExample: {
        prompt:
          "The displacement current is \\(I_d = \\varepsilon_0\\dfrac{d\\Phi_E}{dt}\\), where \\(\\Phi_E = EA\\) is the electric flux. Show from dimensions that \\(I_d\\) is a current.",
        steps: [
          "\\(\\varepsilon_0E\\) has the dimensions of a surface charge density, \\(L^{-2}TA\\).",
          "\\(\\varepsilon_0EA\\) is then \\(L^{-2}TA \\cdot L^{2} = TA\\), a charge.",
          "Dividing by time gives \\(A\\).",
        ],
        answer: "\\(I_d\\) has the dimensions A, a current.",
      },
      practiceSet: [
        { prompt: "Dimensions of \\(\\dfrac{1}{\\mu_0\\varepsilon_0}\\)?", answer: "\\(L^{2}T^{-2}\\)" },
        { prompt: "What is the SI unit of E/H?", answer: "ohm" },
        { prompt: "Dimensions of \\(B^{2}/\\mu_0\\)?", answer: "\\(ML^{-1}T^{-2}\\)" },
        { prompt: "Which of RC, L/R, L/C, √(LC) is not a time?", answer: "\\(L/C\\)" },
      ],
      pyqExampleId: "8c142508-6557-4e4d-8909-03cb599d24c3", // 2026: which combination of R, L, C has dimensions ML²T⁻⁴A⁻²
      traps: [
        {
          title: "ε₀E² is energy per volume, not energy",
          body: "½ε₀E² is the energy stored per unit volume, so its dimensions are ML⁻¹T⁻², the same as pressure. Writing ML²T⁻² misses the division by volume.",
        },
        {
          title: "μ₀ is not dimensionless",
          body: "μ₀ has dimensions MLT⁻²A⁻². The dimensionless ones are ratios: relative permeability μ/μ₀, dielectric constant, power factor cos φ and the quality factor.",
        },
      ],
    },
  ],
};
