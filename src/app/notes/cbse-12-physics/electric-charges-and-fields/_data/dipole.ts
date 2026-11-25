import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_EF_DIPOLE_NOTE: SubtopicNote = {
  subtopicName: "Electric Dipole and Dipole in a Uniform Field",
  title: "The Electric Dipole and a Dipole in a Uniform Field",
  oneLineDefinition:
    "The electric dipole and its dipole moment, its field on the axis and on the equatorial plane, and the torque and potential energy of a dipole placed in a uniform field.",
  whyItMatters:
    "23 questions, twenty of them from board papers. The board asks you to derive the field on the equatorial plane (2023, 2025, 2026), find the torque on a dipole (2023, 2025), draw the graph of torque against angle (2023), show stable and unstable equilibrium (2023), find the work done in turning a dipole (2023, 2024, 2026) and find the net dipole moment of two dipoles (2025).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpef-dipole-moment",
      name: "Electric dipole and dipole moment",
      intuition:
        "A dipole is a pair of equal and opposite charges a small distance apart. Its total charge is zero, but its field is not, because the two charges are not at the same place. Molecules such as water are dipoles even with no field applied.",
      definition:
        "- An **electric dipole** is a pair of equal and opposite point charges \\(q\\) and \\(-q\\) separated by a distance \\(2a\\).\n" +
        "- **Dipole moment:** \\(\\vec{p} = q \\times 2a\\,\\hat{p}\\), directed along the axis from \\(-q\\) to \\(+q\\). It is a vector. SI unit: C m.\n" +
        "- The total charge of a dipole is zero, yet its field is not zero.\n" +
        "- For several dipoles, add their dipole moments as vectors.\n" +
        "- Polar molecules such as water have a permanent dipole moment; in other molecules a field can induce one.",
      formula: {
        label: "Dipole moment",
        latex: "\\vec{p} = q\\,(2a)\\,\\hat{p}, \\quad \\text{pointing from } -q \\text{ to } +q",
      },
      authoredExample: {
        prompt: "Charges of \\(+5\\) nC and \\(-5\\) nC are placed at (0, 4 cm) and (0, −4 cm). Find the dipole moment of the pair.",
        steps: [
          "Given: \\(q = 5 \\times 10^{-9}\\) C; separation \\(2a = 4 + 4 = 8\\) cm \\(= 0.08\\) m.",
          "Formula: \\(p = q \\times 2a\\).",
          "\\(p = 5 \\times 10^{-9} \\times 0.08 = 4 \\times 10^{-10}\\) C m.",
          "Direction: from \\(-q\\) at (0, −4 cm) to \\(+q\\) at (0, 4 cm), that is along +y.",
        ],
        answer: "\\(4 \\times 10^{-10}\\) C m, along +y",
      },
      selfCheckExample: {
        prompt: "What is the total charge of an electric dipole? Is its electric field zero?",
        steps: ["Total charge: \\(q + (-q) = 0\\).", "The two charges are at different places, so their fields do not cancel everywhere."],
        answer: "The total charge is zero, but the field is not zero",
      },
      practiceSet: [
        { prompt: "What is the SI unit of electric dipole moment?", answer: "C m (coulomb metre)" },
        { prompt: "Which way does the dipole moment point?", answer: "Along the axis, from the negative charge to the positive charge" },
        { prompt: "Two dipoles of moment p sit at the same point, one along +x and one along −x. What is their net moment?", answer: "Zero" },
      ],
      pyqExampleId: "d5e87ca1-926b-44d7-9748-256412ebf334",
      traps: [
        {
          title: "Taking half the separation",
          body: "In \\(p = q \\times 2a\\), 2a is the whole distance between the charges. If the charges sit at \\(z = +d\\) and \\(z = -d\\), the separation is \\(2d\\), not \\(d\\).",
        },
        {
          title: "Dipole moment in the wrong direction",
          body: "\\(\\vec{p}\\) points from \\(-q\\) to \\(+q\\), the opposite way to the field lines that run from \\(+q\\) to \\(-q\\) between the charges.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpef-dipole-field",
      name: "Field of a dipole on its axis and on its equatorial plane",
      intuition:
        "On the axis the two charges are at different distances, so their fields only partly cancel and what is left points along p. On the equatorial plane the two charges are equally far away; their sideways parts cancel and what is left points opposite to p. Far from the dipole, both fields fall as one over r cubed.",
      definition:
        "- **Axial point** P at distance r from the centre O, on the side of \\(+q\\): \\(\\vec{E} = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{4qar}{(r^2 - a^2)^2}\\hat{p}\\). For \\(r \\gg a\\), \\(\\vec{E} = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{2\\vec{p}}{r^3}\\), along \\(\\vec{p}\\).\n" +
        "- **Equatorial point, step 1:** P is at distance r from O on the perpendicular bisector of the dipole, so each charge is \\(\\sqrt{r^2 + a^2}\\) from P.\n" +
        "- **Step 2:** the two fields have equal size, \\(E_{+q} = E_{-q} = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q}{r^2 + a^2}\\).\n" +
        "- **Step 3:** resolve each along the axis and at right angles to it. The parts at right angles cancel; the parts along the axis add, both pointing opposite to \\(\\vec{p}\\).\n" +
        "- **Step 4:** each axial part is \\(E_{+q}\\cos\\theta\\) with \\(\\cos\\theta = \\dfrac{a}{\\sqrt{r^2 + a^2}}\\), so \\(\\vec{E} = -\\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{2qa}{(r^2 + a^2)^{3/2}}\\hat{p}\\).\n" +
        "- **Step 5:** for \\(r \\gg a\\), \\(\\vec{E} = -\\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{\\vec{p}}{r^3}\\).\n" +
        "- Far away the dipole field falls as \\(1/r^3\\), faster than the \\(1/r^2\\) of a single charge. At the same large distance the axial field is twice the equatorial field.",
      formula: {
        label: "Field of a short dipole",
        latex: "E_{\\text{axial}} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{2p}{r^{3}}, \\qquad E_{\\text{equatorial}} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{p}{r^{3}}",
      },
      authoredExample: {
        prompt: "A short dipole has a dipole moment of \\(6 \\times 10^{-9}\\) C m. Find the field at a point 0.3 m from its centre (a) on its axis and (b) on its equatorial plane.",
        steps: [
          "Given: \\(p = 6 \\times 10^{-9}\\) C m, \\(r = 0.3\\) m, so \\(r^3 = 0.027\\) m³.",
          "\\(\\dfrac{p}{4\\pi\\varepsilon_0} = 9 \\times 10^9 \\times 6 \\times 10^{-9} = 54\\) N m³ C⁻¹.",
          "(a) Axial: \\(E = \\dfrac{2 \\times 54}{0.027} = 4000\\) N/C, along \\(\\vec{p}\\).",
          "(b) Equatorial: \\(E = \\dfrac{54}{0.027} = 2000\\) N/C, opposite to \\(\\vec{p}\\).",
        ],
        answer: "4000 N/C along p on the axis; 2000 N/C opposite to p on the equatorial plane",
      },
      selfCheckExample: {
        prompt: "The distance of a far point on the equatorial plane of a dipole is halved. By what factor does the field there change?",
        steps: ["\\(E \\propto \\dfrac{1}{r^3}\\).", "Halving r multiplies E by \\(2^3 = 8\\)."],
        answer: "It becomes 8 times as large",
      },
      practiceSet: [
        { prompt: "How does the field of a dipole depend on distance far from it?", answer: "As \\(1/r^3\\)" },
        { prompt: "At the same large distance, what is the ratio of the axial field of a dipole to its equatorial field?", answer: "2 : 1" },
        { prompt: "In which direction is the field at a point on the equatorial plane of a dipole?", answer: "Opposite to the dipole moment" },
      ],
      pyqExampleId: "1b5ae066-142e-4e85-a9d4-6642ba6a0d11",
      traps: [
        {
          title: "Equatorial field along p",
          body: "On the equatorial plane the field points opposite to \\(\\vec{p}\\). Give the direction with the formula; the minus sign carries a mark.",
        },
        {
          title: "Using the short-dipole formula near the dipole",
          body: "\\(2p/(4\\pi\\varepsilon_0 r^3)\\) and \\(p/(4\\pi\\varepsilon_0 r^3)\\) hold only for \\(r \\gg a\\). At the centre of the dipole, or close to it, add the two point-charge fields directly.",
        },
        {
          title: "A derivation with no figure",
          body: "Draw the dipole, the point P, the distances and the resolved components, and label them. The labelled figure carries a mark in the derivation.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpef-dipole-torque",
      name: "Torque on a dipole in a uniform field",
      intuition:
        "In a uniform field the two charges feel equal and opposite forces, so there is no net force. But the forces act at different points, so they form a couple that turns the dipole towards the field. The torque is largest when the dipole is at right angles to the field and zero when it lies along the field.",
      definition:
        "- The force on \\(+q\\) is \\(q\\vec{E}\\) and on \\(-q\\) is \\(-q\\vec{E}\\), so the **net force is zero** in a uniform field.\n" +
        "- Torque = one force × the perpendicular distance between the two forces: \\(\\tau = qE \\times 2a\\sin\\theta = pE\\sin\\theta\\). In vector form \\(\\vec{\\tau} = \\vec{p} \\times \\vec{E}\\).\n" +
        "- \\(\\tau = 0\\) at \\(\\theta = 0^\\circ\\) and \\(180^\\circ\\); the largest torque is \\(pE\\), at \\(\\theta = 90^\\circ\\). A graph of τ against θ is a sine curve.\n" +
        "- The torque tends to turn \\(\\vec{p}\\) into line with \\(\\vec{E}\\).\n" +
        "- **Non-uniform field:** the net force is not zero. A dipole along the field is pulled towards the stronger field. This is why a charged comb attracts bits of paper: it polarises them into dipoles, and its field is not uniform.",
      formula: {
        label: "Torque on a dipole",
        latex: "\\vec{\\tau} = \\vec{p} \\times \\vec{E}, \\qquad \\tau = pE\\sin\\theta",
      },
      authoredExample: {
        prompt:
          "A dipole made of charges of \\(\\pm 4\\) nC separated by 3 mm lies at 60° to a uniform field of \\(5 \\times 10^4\\) N/C. Find its dipole moment, the torque on it and the largest torque it could feel in this field.",
        steps: [
          "Given: \\(q = 4 \\times 10^{-9}\\) C, \\(2a = 3 \\times 10^{-3}\\) m, \\(E = 5 \\times 10^4\\) N/C, \\(\\theta = 60^\\circ\\).",
          "\\(p = q \\times 2a = 4 \\times 10^{-9} \\times 3 \\times 10^{-3} = 1.2 \\times 10^{-11}\\) C m.",
          "\\(\\tau = pE\\sin\\theta = 1.2 \\times 10^{-11} \\times 5 \\times 10^4 \\times 0.866 = 5.2 \\times 10^{-7}\\) N m.",
          "Largest torque, at 90°: \\(pE = 6 \\times 10^{-7}\\) N m.",
        ],
        answer: "\\(p = 1.2 \\times 10^{-11}\\) C m; \\(\\tau = 5.2 \\times 10^{-7}\\) N m; largest \\(6 \\times 10^{-7}\\) N m",
      },
      selfCheckExample: {
        prompt: "A dipole of moment \\(3 \\times 10^{-8}\\) C m in a uniform field feels a largest torque of \\(9 \\times 10^{-4}\\) N m. Find the field.",
        steps: ["The largest torque is \\(pE\\), at 90°.", "\\(E = \\dfrac{9 \\times 10^{-4}}{3 \\times 10^{-8}} = 3 \\times 10^4\\) N/C."],
        answer: "\\(3 \\times 10^4\\) N/C",
      },
      practiceSet: [
        { prompt: "What is the net force on a dipole in a uniform electric field?", answer: "Zero" },
        { prompt: "At what angle between \\(\\vec{p}\\) and \\(\\vec{E}\\) is the torque on a dipole largest?", answer: "90°" },
        {
          prompt: "Why does a charged comb attract a small bit of uncharged paper?",
          answer: "The comb polarises the paper into a dipole, and the comb's non-uniform field pulls that dipole towards it",
        },
      ],
      pyqExampleId: "67b53d20-b12d-4d3a-9e37-7e96fb1f3918",
      traps: [
        {
          title: "Saying a dipole in a uniform field moves",
          body: "In a uniform field the net force is zero, so the dipole only turns. A net force needs a non-uniform field.",
        },
        {
          title: "Using the wrong angle",
          body: "θ is the angle between \\(\\vec{p}\\) and \\(\\vec{E}\\). If a question gives the angle with some other line, or gives the field as a unit vector, find the angle between p and E first.",
        },
        {
          title: "An unlabelled graph",
          body: "Sketch τ against θ from 0 to 2π as a sine curve, label both axes and mark the largest value pE at 90°. A bare curve loses marks.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpef-dipole-energy",
      name: "Potential energy of a dipole and the work to turn it",
      intuition:
        "Turning a dipole away from the field takes work, just as lifting a stone does, and that work is stored as potential energy. The dipole has the least energy when it points along the field, which is stable, and the most when it points against the field, which is unstable.",
      definition:
        "- Potential energy in a uniform field: \\(U = -\\vec{p}\\cdot\\vec{E} = -pE\\cos\\theta\\), taking \\(U = 0\\) when the dipole is at right angles to the field. NCERT works this out in the next chapter, Electrostatic Potential and Capacitance.\n" +
        "- Work done by an outside agent in turning the dipole slowly from \\(\\theta_1\\) to \\(\\theta_2\\): \\(W = U_2 - U_1 = pE(\\cos\\theta_1 - \\cos\\theta_2)\\).\n" +
        "- **Stable equilibrium:** \\(\\theta = 0^\\circ\\), \\(\\vec{p}\\) along \\(\\vec{E}\\), \\(U = -pE\\), the least. **Unstable equilibrium:** \\(\\theta = 180^\\circ\\), \\(\\vec{p}\\) against \\(\\vec{E}\\), \\(U = +pE\\), the most. The torque is zero in both.\n" +
        "- To show the two positions, draw parallel field lines and the dipole along them, pointing with the field for stable and against it for unstable.",
      formula: {
        label: "Energy of a dipole and work to turn it",
        latex: "U = -\\vec{p}\\cdot\\vec{E} = -pE\\cos\\theta, \\qquad W = pE\\,(\\cos\\theta_1 - \\cos\\theta_2)",
      },
      authoredExample: {
        prompt:
          "A dipole of moment \\(5 \\times 10^{-9}\\) C m lies along a uniform field of \\(3 \\times 10^4\\) N/C. Find its potential energy, and the work needed to turn it through 60° and through 90°.",
        steps: [
          "Given: \\(p = 5 \\times 10^{-9}\\) C m, \\(E = 3 \\times 10^4\\) N/C, so \\(pE = 1.5 \\times 10^{-4}\\) J.",
          "Starting energy, \\(\\theta_1 = 0^\\circ\\): \\(U = -pE = -1.5 \\times 10^{-4}\\) J.",
          "Through 60°: \\(W = pE(\\cos 0^\\circ - \\cos 60^\\circ) = 1.5 \\times 10^{-4} \\times 0.5 = 7.5 \\times 10^{-5}\\) J.",
          "Through 90°: \\(W = pE(1 - 0) = 1.5 \\times 10^{-4}\\) J.",
        ],
        answer: "\\(U = -1.5 \\times 10^{-4}\\) J; \\(7.5 \\times 10^{-5}\\) J for 60°; \\(1.5 \\times 10^{-4}\\) J for 90°",
      },
      selfCheckExample: {
        prompt:
          "A dipole of moment \\(4 \\times 10^{-8}\\) C m is at right angles to a uniform field of \\(5 \\times 10^3\\) N/C. Find its potential energy, and the work needed to turn it until it points opposite to the field.",
        steps: [
          "At 90°: \\(U = -pE\\cos 90^\\circ = 0\\).",
          "To 180°: \\(W = pE(\\cos 90^\\circ - \\cos 180^\\circ) = pE = 4 \\times 10^{-8} \\times 5 \\times 10^3 = 2 \\times 10^{-4}\\) J.",
        ],
        answer: "U = 0; work \\(2 \\times 10^{-4}\\) J",
      },
      practiceSet: [
        { prompt: "In which position is a dipole in stable equilibrium in a uniform field?", answer: "With \\(\\vec{p}\\) pointing along \\(\\vec{E}\\)" },
        { prompt: "What is the potential energy of a dipole at right angles to a uniform field?", answer: "Zero" },
        {
          prompt: "A dipole is let go and swings back to point along the field. Is the work done by the field positive or negative?",
          answer: "Positive; the field does the work and the potential energy falls",
        },
      ],
      pyqExampleId: "1d1419ca-b23b-421f-b4c4-d3bab890e716",
      traps: [
        {
          title: "The sign of U",
          body: "\\(U = -pE\\cos\\theta\\) is negative and least along the field. Writing \\(+pE\\cos\\theta\\) swaps the stable and unstable positions.",
        },
        {
          title: "Mixing up stable and unstable",
          body: "Both positions have zero torque. Stable is along the field, where U is least; unstable is against the field, where U is most.",
        },
      ],
    },
  ],
};
