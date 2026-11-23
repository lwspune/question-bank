import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_EF_FIELD_NOTE: SubtopicNote = {
  subtopicName: "Charge, Coulomb's Law and Electric Field",
  title: "Charge, Coulomb's Law and Electric Field",
  oneLineDefinition:
    "What electric charge is and how it is shared, the force F = kq₁q₂/r² between two point charges, the field E = F/q of a charge, field lines, and charge spread over a line or a surface.",
  whyItMatters:
    "Two NEET questions, from Re-NEET 2024 and NEET 2025. One finds the surface charge density of a charged metal cube; the other finds the new force between two spheres after a third, uncharged sphere touches each in turn.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphef-coulomb",
      name: "Charge and Coulomb's law",
      intuition:
        "Charge comes in two kinds. Like charges push apart and unlike charges pull together. A body gets charged by gaining or losing electrons, so its charge is always a whole number of electron charges, and charge is never made or destroyed, only moved. Coulomb's law says how strong the push or pull is: it grows with both charges and falls with the square of the distance.",
      definition:
        "- **Quantisation:** \\(q = ne\\), where n is a whole number and \\(e = 1.6 \\times 10^{-19}\\) C.\n" +
        "- **Conservation:** the total charge of an isolated system stays the same.\n" +
        "- **Additivity:** charges add as plain numbers, with their signs.\n" +
        "- **Coulomb's law:** \\(F = \\dfrac{kq_1q_2}{r^{2}}\\), along the line joining the charges, with \\(k = \\dfrac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^{9}\\ \\text{N m}^{2}\\,\\text{C}^{-2}\\).\n" +
        "- **Superposition:** the force on one charge from several others is the vector sum of the separate forces.\n" +
        "- **Sharing by contact:** two identical conducting spheres that touch end up with equal charges, each \\(\\dfrac{q_1 + q_2}{2}\\).",
      formula: {
        label: "Coulomb's law",
        latex: "F = \\frac{1}{4\\pi\\varepsilon_0}\\,\\frac{q_1 q_2}{r^{2}}, \\qquad q = ne, \\qquad q_{\\text{shared}} = \\frac{q_1 + q_2}{2}",
        symbols: [
          { symbol: "\\(\\varepsilon_0\\)", meaning: "permittivity of free space, 8.85 × 10⁻¹² C² N⁻¹ m⁻²" },
          { symbol: "\\(n\\)", meaning: "a whole number of electron charges" },
          { symbol: "\\(r\\)", meaning: "distance between the two point charges" },
        ],
      },
      authoredExample: {
        prompt:
          "Two identical small conducting spheres carry +6 μC and −2 μC with their centres 0.3 m apart. They are touched together and put back in place. Find the force between them now.",
        steps: [
          "After contact each sphere holds \\(\\dfrac{6 + (-2)}{2} = +2\\ \\mu\\text{C}\\).",
          "\\(F = \\dfrac{9 \\times 10^{9} \\times (2 \\times 10^{-6})^{2}}{(0.3)^{2}} = \\dfrac{0.036}{0.09} = 0.4\\ \\text{N}\\).",
          "Both charges are now positive, so the force is a repulsion. Before contact it was an attraction of 1.2 N.",
        ],
        answer: "0.4 N, repulsive",
      },
      selfCheckExample: {
        prompt:
          "How many electrons must be removed from a neutral body to give it a charge of \\(+3.2 \\times 10^{-18}\\) C?",
        steps: [
          "\\(n = \\dfrac{q}{e} = \\dfrac{3.2 \\times 10^{-18}}{1.6 \\times 10^{-19}}\\).",
          "\\(n = 20\\). Removing electrons leaves the body positive.",
        ],
        answer: "20 electrons",
      },
      practiceSet: [
        { prompt: "Two point charges a distance r apart repel with a force F. The distance is doubled. What is the new force?", answer: "\\(F/4\\)" },
        { prompt: "Can a body carry a charge of \\(2.4 \\times 10^{-19}\\) C?", answer: "No; it is 1.5 e, not a whole number of electron charges" },
        { prompt: "Two identical conducting spheres carrying +8 μC and −4 μC touch and are separated. What charge does each carry?", answer: "+2 μC" },
        { prompt: "A neutral body gains \\(5 \\times 10^{12}\\) electrons. What is its charge?", answer: "\\(-8 \\times 10^{-7}\\) C" },
      ],
      pyqExampleId: "63cfaf75-f7c7-40e0-93e6-acc6c4ace7bc",
      traps: [
        {
          title: "Add the charges with their signs before halving",
          body: "When identical conductors touch, the shared charge is half the signed total. +6 μC and −2 μC give +2 μC each, not 4 μC each.",
        },
        {
          title: "Work one contact at a time",
          body: "When a third sphere touches two others in turn, each contact shares only the charge the two spheres hold at that moment. Track what the third sphere carries into its next contact.",
        },
        {
          title: "The force goes as one over r squared",
          body: "Doubling the distance between two charges cuts the force to a quarter, not a half. Tripling it cuts the force to a ninth.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphef-field",
      name: "Electric field, field lines and charge density",
      visualizationSlug: "field-lines-charge",
      intuition:
        "A charge changes the space around it, so that any other charge placed there feels a force. The electric field at a point is that force on each coulomb of a small positive test charge. Field lines draw the field: they leave positive charges, end on negative ones, and crowd together where the field is strong. When charge is spread over a wire or a surface, we describe it by how much charge sits on each metre or each square metre.",
      definition:
        "- **Field:** \\(\\vec{E} = \\dfrac{\\vec{F}}{q_0}\\), in N/C. For a point charge, \\(E = \\dfrac{kq}{r^{2}}\\), pointing away from a positive charge and towards a negative one.\n" +
        "- **Force on a charge in a field:** \\(\\vec{F} = q\\vec{E}\\). A positive charge is pushed along E, a negative charge against it.\n" +
        "- **Superposition:** the field from several charges is the vector sum of their separate fields.\n" +
        "- **Field lines** start on positive charges and end on negative ones, never cross, and never form closed loops. Where they are closer together the field is stronger.\n" +
        "- **Charge densities:** linear \\(\\lambda = \\dfrac{Q}{L}\\) (C/m), surface \\(\\sigma = \\dfrac{Q}{A}\\) (C/m²), volume \\(\\rho = \\dfrac{Q}{V}\\) (C/m³).\n" +
        "- The charge on a conductor sits on its outer surface, so its surface charge density uses the outer surface area.",
      formula: {
        label: "Field and charge density",
        latex: "E = \\frac{kq}{r^{2}}, \\qquad \\vec{F} = q\\vec{E}, \\qquad \\lambda = \\frac{Q}{L}, \\qquad \\sigma = \\frac{Q}{A}",
        symbols: [
          { symbol: "\\(q_0\\)", meaning: "a small positive test charge" },
          { symbol: "\\(\\lambda\\)", meaning: "charge per unit length" },
          { symbol: "\\(\\sigma\\)", meaning: "charge per unit area" },
        ],
      },
      authoredExample: {
        prompt:
          "Charges of +4 μC and −4 μC are 0.2 m apart. Find the electric field at the midpoint between them.",
        steps: [
          "Each charge is 0.1 m from the midpoint: \\(E_1 = E_2 = \\dfrac{9 \\times 10^{9} \\times 4 \\times 10^{-6}}{(0.1)^{2}} = 3.6 \\times 10^{6}\\ \\text{N/C}\\).",
          "The positive charge's field points away from it, towards the negative charge. The negative charge's field points towards itself. Both point the same way.",
          "So they add: \\(E = 7.2 \\times 10^{6}\\ \\text{N/C}\\), towards the −4 μC charge.",
        ],
        answer: "\\(7.2 \\times 10^{6}\\) N/C, towards the negative charge",
      },
      selfCheckExample: {
        prompt:
          "An electron is placed at a point where the electric field is \\(2 \\times 10^{4}\\) N/C. Find the size and direction of the force on it.",
        steps: [
          "\\(F = eE = 1.6 \\times 10^{-19} \\times 2 \\times 10^{4} = 3.2 \\times 10^{-15}\\ \\text{N}\\).",
          "The electron is negative, so the force points opposite to the field.",
        ],
        answer: "\\(3.2 \\times 10^{-15}\\) N, opposite to the field",
      },
      practiceSet: [
        { prompt: "The field at a distance r from a point charge is E. What is it at a distance 3r?", answer: "\\(E/9\\)" },
        { prompt: "A thin rod 2 m long carries 6 μC spread evenly along it. What is its linear charge density?", answer: "\\(3 \\times 10^{-6}\\) C/m" },
        { prompt: "Why can two electric field lines never cross?", answer: "The field has only one direction at each point" },
        { prompt: "A charge of 2 μC feels a force of 0.01 N at a point. What is the electric field there?", answer: "5000 N/C" },
      ],
      pyqExampleId: "597e49fb-24ea-4531-9cae-3706acf63a32",
      traps: [
        {
          title: "A negative charge is pushed against the field",
          body: "\\(\\vec{F} = q\\vec{E}\\) with q negative points opposite to \\(\\vec{E}\\). An electron in a field to the right is pushed to the left.",
        },
        {
          title: "Midway between opposite charges the field is not zero",
          body: "Between +q and −q both fields point towards the negative charge, so they add. The field is zero midway only between two equal charges of the same sign.",
        },
        {
          title: "Surface density uses the surface, not the volume",
          body: "Charge on a metal body sits on its outer surface. Divide the charge by the total outer area, for example \\(6a^{2}\\) for a cube of side a, never by the volume.",
        },
      ],
    },
  ],
};
