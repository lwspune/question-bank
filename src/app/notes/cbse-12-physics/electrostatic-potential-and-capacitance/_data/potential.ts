import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_EP_POTENTIAL_NOTE: SubtopicNote = {
  subtopicName: "Electrostatic Potential due to Charges and Dipoles",
  title: "Electrostatic Potential of Charges and Dipoles",
  oneLineDefinition:
    "Potential as the work done per unit charge, the potential of a point charge, of a group of charges and of a dipole, and the potential difference in a given field.",
  whyItMatters:
    "23 questions. Eighteen were set in board papers: derive the potential of a dipole on its axis and on its bisector (2024, 2025, 2026), find the potential due to charges on a triangle or a circle (2023, 2024), the work done in moving a charge (2023, 2024, 2026), the potential difference in a field that changes with x (2024, 2025, 2026), and the charges read off a graph of V against 1/r (2023, 2026). The NCERT examples and exercises add points of zero potential, a hexagon of charges and the signs of potential and work near a point charge.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpep-work",
      name: "Electric potential and the work done on a charge",
      intuition:
        "Potential is like height for a charge. To lift a positive charge to a point of higher potential, someone must do work on it, just as you do work to carry a bag upstairs. The electrostatic force is conservative, so only the start and the end matter, never the path. Go round a closed loop and you are back where you began, so the total work is zero.",
      definition:
        "- **Electrostatic potential** \\(V\\) at a point: the work done by an external force in bringing a unit positive charge, without acceleration, from infinity to that point. It is a **scalar**. SI unit: the **volt**, \\(1\\ \\text{V} = 1\\ \\text{J C}^{-1}\\).\n" +
        "- **Potential difference:** \\(V_P - V_R\\) is the work done by an external force in moving a unit positive charge from R to P.\n" +
        "- Work done by an external agent in moving a charge \\(q\\) slowly from A to B: \\(W = q(V_B - V_A)\\). The work done by the field is the same amount with the opposite sign.\n" +
        "- The electrostatic force is **conservative**: the work depends only on the end points, so the work done round any closed path is zero.\n" +
        "- A positive charge taken to a higher potential gains potential energy. A negative charge (an electron) taken to a higher potential loses potential energy.",
      formula: {
        label: "Potential and work",
        latex: "V_P = \\frac{W_{\\infty \\to P}}{q}, \\qquad W_{A \\to B} = q\\,(V_B - V_A)",
      },
      authoredExample: {
        prompt:
          "A charge of 3 µC is moved slowly from a point A at a potential of 20 V to a point B at a potential of 80 V. Find the work done by the external agent and the work done by the electric field.",
        steps: [
          "Given: \\(q = 3\\ \\mu\\text{C} = 3 \\times 10^{-6}\\) C, \\(V_A = 20\\) V, \\(V_B = 80\\) V.",
          "Formula: \\(W_{ext} = q(V_B - V_A)\\).",
          "Substitution: \\(W_{ext} = 3 \\times 10^{-6} \\times (80 - 20) = 3 \\times 10^{-6} \\times 60\\).",
          "\\(W_{ext} = 1.8 \\times 10^{-4}\\) J. The field does \\(-1.8 \\times 10^{-4}\\) J, since it opposes the motion.",
        ],
        answer: "External agent: 1.8 × 10⁻⁴ J; electric field: −1.8 × 10⁻⁴ J",
      },
      selfCheckExample: {
        prompt:
          "A charge of −2 µC is carried slowly from a point at 10 V to a point at 60 V. Find the work done by the external agent.",
        steps: [
          "\\(W = q(V_B - V_A) = (-2 \\times 10^{-6}) \\times (60 - 10)\\).",
          "\\(W = -1 \\times 10^{-4}\\) J. The negative sign means the field pulls the negative charge towards the higher potential, so the agent only holds it back.",
        ],
        answer: "−1 × 10⁻⁴ J",
      },
      practiceSet: [
        { prompt: "What is the SI unit of electrostatic potential?", answer: "The volt, \\(1\\ \\text{V} = 1\\ \\text{J C}^{-1}\\)" },
        { prompt: "How much work is done in carrying a charge of 4 µC once round a closed path in an electrostatic field?", answer: "Zero, because the electrostatic force is conservative" },
        { prompt: "How much work is needed to bring a charge of 2 µC from infinity to a point where the potential is 300 V?", answer: "\\(6 \\times 10^{-4}\\) J" },
        { prompt: "Is electrostatic potential a scalar or a vector?", answer: "A scalar" },
      ],
      pyqExampleId: "414ae885-0003-47b8-ad7a-caf7f94e7b03",
      traps: [
        {
          title: "Not saying whose work it is",
          body: "The work done by the external agent and the work done by the field are equal and opposite. Say which one you are finding, and give its sign.",
        },
        {
          title: "Dropping the sign of the charge",
          body: "For an electron put \\(q = -e\\) into \\(W = q(V_B - V_A)\\). Moving it to a higher potential gives negative work by the agent, not positive.",
        },
        {
          title: "Assertion and reason: check the link",
          body: "Work round a closed path is zero because the electrostatic force is conservative, so the reason explains the assertion. In every assertion-reason item, first decide if each statement is true, then whether R explains A.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpep-point",
      name: "Potential of a point charge and of a group of charges",
      intuition:
        "The potential of a point charge falls off as one over the distance, more slowly than its field, which falls as one over the distance squared. Potential is a scalar, so for many charges you simply add the numbers with their signs. No arrows, no components, no angles.",
      definition:
        "- **Point charge:** \\(V = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q}{r}\\), taking \\(V = 0\\) at infinity. It is positive near a positive charge and negative near a negative one.\n" +
        "- Derivation in outline: the work against the field in bringing a unit positive charge from infinity to \\(r\\) is \\(V(r) = -\\displaystyle\\int_{\\infty}^{r} \\dfrac{q}{4\\pi\\varepsilon_0 r'^2}\\,dr' = \\dfrac{q}{4\\pi\\varepsilon_0 r}\\).\n" +
        "- **Group of charges:** \\(V = \\dfrac{1}{4\\pi\\varepsilon_0}\\left(\\dfrac{q_1}{r_{1P}} + \\dfrac{q_2}{r_{2P}} + \\dots\\right)\\), each term with its own sign.\n" +
        "- **Charged spherical shell** of radius R and charge q: outside, \\(V = \\dfrac{q}{4\\pi\\varepsilon_0 r}\\); on the shell and everywhere inside, \\(V = \\dfrac{q}{4\\pi\\varepsilon_0 R}\\), a constant, while the field inside is zero.\n" +
        "- A graph of V against \\(1/r\\) for a point charge is a straight line through the origin of slope \\(\\dfrac{q}{4\\pi\\varepsilon_0}\\). A steeper line means a larger charge; a line below the axis means a negative charge.",
      formula: {
        label: "Potential of charges",
        latex: "V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{r}, \\qquad V = \\frac{1}{4\\pi\\varepsilon_0}\\sum_i \\frac{q_i}{r_{iP}}",
        symbols: [
          { symbol: "\\(\\dfrac{1}{4\\pi\\varepsilon_0}\\)", meaning: "9 × 10⁹ N m² C⁻²" },
          { symbol: "\\(r_{iP}\\)", meaning: "distance of the i-th charge from the point P" },
        ],
      },
      authoredExample: {
        prompt:
          "Charges of 2 µC, 3 µC and −1 µC are fixed at three different points on a circle of radius 0.3 m. Find the potential at the centre of the circle.",
        steps: [
          "Given: every charge is at \\(r = 0.3\\) m from the centre. Total charge \\(= 2 + 3 - 1 = 4\\ \\mu\\text{C}\\).",
          "Formula: potential is a scalar, so \\(V = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q_1 + q_2 + q_3}{r}\\) when all distances are equal.",
          "Substitution: \\(V = \\dfrac{9 \\times 10^{9} \\times 4 \\times 10^{-6}}{0.3}\\).",
          "\\(V = 1.2 \\times 10^{5}\\) V. Where the charges sit on the circle does not matter, only their distance from the centre.",
        ],
        answer: "1.2 × 10⁵ V",
      },
      selfCheckExample: {
        prompt:
          "A point charge of 5 nC is in air. Find the potential at a distance of 0.5 m from it, and the work needed to bring a 2 nC charge from infinity to that point.",
        steps: [
          "\\(V = \\dfrac{9 \\times 10^{9} \\times 5 \\times 10^{-9}}{0.5} = 90\\) V.",
          "\\(W = qV = 2 \\times 10^{-9} \\times 90 = 1.8 \\times 10^{-7}\\) J.",
        ],
        answer: "90 V; 1.8 × 10⁻⁷ J",
      },
      practiceSet: [
        { prompt: "A hollow metal sphere of radius 0.3 m carries a charge of 1 nC. What is the potential at its centre?", answer: "30 V, the same as on its surface" },
        { prompt: "On a graph of V against 1/r for a point charge, what does the slope give?", answer: "\\(\\dfrac{q}{4\\pi\\varepsilon_0}\\), so the slope is proportional to the charge" },
        { prompt: "Charges +q and −q sit at two corners of an equilateral triangle. What is the potential at the third corner?", answer: "Zero" },
        { prompt: "How does the potential of a point charge change when the distance from it is doubled?", answer: "It becomes half" },
      ],
      pyqExampleId: "592ef527-45a9-4d4b-90ad-f152ba9b49f6",
      traps: [
        {
          title: "Adding potentials like vectors",
          body: "Potential has no direction. Add the contributions with their signs; resolving them into components is wrong and wastes time.",
        },
        {
          title: "Zero field does not mean zero potential",
          body: "Inside a charged shell the field is zero but the potential is \\(\\dfrac{q}{4\\pi\\varepsilon_0 R}\\), the same as on the shell. Zero field only says the potential does not change.",
        },
        {
          title: "Distances left in centimetres",
          body: "Convert every distance to metres before substituting. A distance in cm makes the answer 100 times too big.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpep-dipole",
      name: "Potential due to an electric dipole",
      intuition:
        "Far from a dipole the two opposite charges almost cancel each other, so the potential falls faster than for one charge: as one over the distance squared. It also depends on direction. It is largest along the axis and zero everywhere on the plane that bisects the dipole, because every point there is equally far from the two charges.",
      definition:
        "Derivation (NCERT): charges \\(-q\\) at A and \\(+q\\) at B, separation \\(2a\\), centre O; P is at distance \\(r\\) from O, with OP at angle \\(\\theta\\) to the dipole moment \\(\\vec{p}\\).\n" +
        "- \\(V = \\dfrac{1}{4\\pi\\varepsilon_0}\\left(\\dfrac{q}{r_1} - \\dfrac{q}{r_2}\\right)\\), where \\(r_1\\), \\(r_2\\) are the distances of P from \\(+q\\) and \\(-q\\).\n" +
        "- Geometry: \\(r_1^2 = r^2 + a^2 - 2ar\\cos\\theta\\) and \\(r_2^2 = r^2 + a^2 + 2ar\\cos\\theta\\).\n" +
        "- For \\(r \\gg a\\), keep only the first power of \\(a/r\\): \\(\\dfrac{1}{r_1} \\approx \\dfrac{1}{r}\\left(1 + \\dfrac{a\\cos\\theta}{r}\\right)\\) and \\(\\dfrac{1}{r_2} \\approx \\dfrac{1}{r}\\left(1 - \\dfrac{a\\cos\\theta}{r}\\right)\\).\n" +
        "- Subtracting: \\(V = \\dfrac{q}{4\\pi\\varepsilon_0}\\dfrac{2a\\cos\\theta}{r^2}\\). With \\(p = 2qa\\), \\(V = \\dfrac{p\\cos\\theta}{4\\pi\\varepsilon_0 r^2} = \\dfrac{\\vec{p}\\cdot\\hat{r}}{4\\pi\\varepsilon_0 r^2}\\).\n" +
        "- **On the axis** (\\(\\theta = 0\\) or \\(180^\\circ\\)): \\(V = \\pm\\dfrac{p}{4\\pi\\varepsilon_0 r^2}\\). **On the equatorial plane** (\\(\\theta = 90^\\circ\\)): \\(V = 0\\).\n" +
        "- Unlike a point charge, the dipole potential falls as \\(1/r^2\\) and depends on the angle \\(\\theta\\).",
      formula: {
        label: "Short dipole, r much greater than a",
        latex: "V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{p\\cos\\theta}{r^2} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{\\vec{p}\\cdot\\hat{r}}{r^2}",
      },
      authoredExample: {
        prompt:
          "A short dipole has a dipole moment of \\(4 \\times 10^{-9}\\) C m. Find the potential at a point 0.2 m from its centre (a) on its axis, on the side of the positive charge, (b) on a line at \\(60^\\circ\\) to the axis, (c) on its equatorial plane.",
        steps: [
          "Given: \\(p = 4 \\times 10^{-9}\\) C m, \\(r = 0.2\\) m. Formula: \\(V = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{p\\cos\\theta}{r^2}\\).",
          "(a) \\(\\theta = 0\\): \\(V = \\dfrac{9 \\times 10^{9} \\times 4 \\times 10^{-9}}{(0.2)^2} = \\dfrac{36}{0.04} = 900\\) V.",
          "(b) \\(\\theta = 60^\\circ\\), \\(\\cos 60^\\circ = 0.5\\): \\(V = 900 \\times 0.5 = 450\\) V.",
          "(c) \\(\\theta = 90^\\circ\\), \\(\\cos 90^\\circ = 0\\): \\(V = 0\\).",
        ],
        answer: "900 V, 450 V and 0",
      },
      selfCheckExample: {
        prompt:
          "The potential at a point on the axis of a short dipole, 10 cm from its centre, is 600 V. Find the potential at a point on the axis 20 cm from the centre.",
        steps: ["\\(V \\propto \\dfrac{1}{r^2}\\), so doubling \\(r\\) divides V by 4.", "\\(V = \\dfrac{600}{4} = 150\\) V."],
        answer: "150 V",
      },
      practiceSet: [
        { prompt: "What is the potential at any point on the equatorial plane of an electric dipole?", answer: "Zero" },
        { prompt: "How does the potential of a dipole vary with distance r, far from it?", answer: "As \\(1/r^2\\)" },
        { prompt: "A dipole is made of charges ±2 nC separated by 1 mm. What is its dipole moment?", answer: "\\(2 \\times 10^{-12}\\) C m" },
      ],
      pyqExampleId: "a42d21bb-bb86-4f2e-b7f7-420f2187ad77",
      traps: [
        {
          title: "Field and potential powers mixed up",
          body: "Far from a dipole the potential falls as \\(1/r^2\\) but the field falls as \\(1/r^3\\). The board offers both as options.",
        },
        {
          title: "Zero potential is not zero field",
          body: "On the equatorial plane of a dipole the potential is zero but the field is not: it points opposite to \\(\\vec{p}\\).",
        },
        {
          title: "Skipping the approximation step",
          body: "In the derivation, write \"for \\(r \\gg a\\)\" at the step where \\(a^2\\) is dropped. The final result holds only for a short dipole, and the step carries a mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpep-from-field",
      name: "Potential difference in a given field",
      intuition:
        "Potential always falls as you move along the field, like water flowing downhill. In a uniform field it falls by the same amount every metre. When the field changes with x, add up the small drops by integrating. Moving at right angles to the field changes nothing.",
      definition:
        "- \\(V_B - V_A = -\\displaystyle\\int_A^B \\vec{E}\\cdot d\\vec{l}\\).\n" +
        "- For a field along x alone, \\(\\vec{E} = E(x)\\hat{i}\\): \\(V_B - V_A = -\\displaystyle\\int_{x_A}^{x_B} E\\,dx\\). Only the change in x matters; a move along y adds nothing.\n" +
        "- Uniform field \\(E\\) along \\(+x\\): \\(V = V_0 - Ex\\), so the potential falls by \\(E\\) volts per metre.\n" +
        "- The work done by an external agent in taking a unit positive charge from A to B equals \\(V_B - V_A\\).",
      formula: {
        label: "From field to potential",
        latex: "V_B - V_A = -\\int_A^B \\vec{E}\\cdot d\\vec{l}",
      },
      authoredExample: {
        prompt:
          "The electric field in a region is \\(\\vec{E} = 6x^2\\,\\hat{i}\\) N/C, with x in metres. Find \\(V_A - V_B\\) for A at \\(x = 1\\) m and B at \\(x = 2\\) m, and the work done by an external agent in taking a unit positive charge from A to B.",
        steps: [
          "Formula: \\(V_A - V_B = \\displaystyle\\int_{1}^{2} E\\,dx\\).",
          "\\(V_A - V_B = \\displaystyle\\int_{1}^{2} 6x^2\\,dx = \\left[2x^3\\right]_1^2 = 16 - 2 = 14\\) V.",
          "Work by the agent on a unit charge: \\(V_B - V_A = -14\\) J. The field carries the charge along, so the agent does negative work.",
        ],
        answer: "\\(V_A - V_B = 14\\) V; work by the agent \\(= -14\\) J",
      },
      selfCheckExample: {
        prompt:
          "A uniform electric field of 200 N/C points along \\(+x\\). The potential at the origin is 50 V. Find the potential at the point (2 m, 5 m).",
        steps: [
          "Only x matters: \\(V = V_0 - Ex = 50 - 200 \\times 2\\).",
          "\\(V = -350\\) V. The 5 m along y lies along an equipotential.",
        ],
        answer: "−350 V",
      },
      practiceSet: [
        { prompt: "In a uniform electric field, in which direction does the potential decrease?", answer: "Along the direction of the field" },
        { prompt: "A charge moves at right angles to a uniform electric field. What is the change in its potential?", answer: "Zero" },
        { prompt: "A uniform field of 500 V/m points along +x. Find \\(V_A - V_B\\) for A at x = 0 and B at x = 0.2 m.", answer: "100 V" },
      ],
      pyqExampleId: "deb1a7b8-84dd-4ce2-8ee1-6ab970b3bb59",
      traps: [
        {
          title: "Multiplying a changing field by a distance",
          body: "\\(V = Ed\\) holds only for a uniform field. When E depends on x, integrate.",
        },
        {
          title: "Getting \\(V_A - V_B\\) and \\(V_B - V_A\\) the wrong way round",
          body: "\\(V_B - V_A = -\\int_A^B E\\,dx\\). Write which difference you are finding before you start, and check the sign: moving along the field, the potential falls.",
        },
      ],
    },
  ],
};
