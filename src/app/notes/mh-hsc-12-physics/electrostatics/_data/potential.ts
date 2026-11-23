import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_ES_POTENTIAL_NOTE: SubtopicNote = {
  subtopicName: "Electric Potential and Potential Energy",
  title: "Electric Potential: Point Charges, Dipoles and the Potential Gradient",
  oneLineDefinition:
    "Electric potential and potential difference, the potential of a point charge, of a group of charges and of a dipole, and the electric field as the negative potential gradient.",
  whyItMatters:
    "17 questions. Six were set in board papers: derive the potential due to a point charge (2026), define electric potential (2024), find the work in bringing a charge from infinity (2024), relate the field to the potential gradient (2023), give the unit of potential gradient (2018) and say how potential varies with distance (2025). The textbook adds the potential of a dipole, of a group of charges, of a charged ring and of merged drops, and points where the potential is zero.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpes-potential-def",
      name: "Electric potential and potential difference",
      intuition:
        "Potential is like height for charges. To lift a positive charge closer to another positive charge you must push against the repulsion, and that work is stored. The potential at a point tells you how much work each coulomb needs to get there from very far away, where we call the potential zero.",
      definition:
        "- **Electric potential** at a point: the work done in bringing a unit positive charge from infinity to that point, without acceleration, against the electric field. \\(V = \\dfrac{W}{q_0}\\).\n" +
        "- **Potential difference** between A and B: the work done per unit positive charge in carrying it from A to B, \\(V_B - V_A = \\dfrac{W_{AB}}{q_0}\\).\n" +
        "- Potential is a **scalar**. SI unit: volt, 1 V = 1 J/C. Infinity is taken as zero potential.\n" +
        "- The work depends only on the end points, not on the path, because the electrostatic force is conservative.\n" +
        "- **Electron volt:** the energy an electron gains in crossing a potential difference of 1 V. 1 eV = \\(1.6 \\times 10^{-19}\\) J.",
      formula: {
        label: "Potential and potential difference",
        latex: "V = \\frac{W}{q_0}, \\qquad V_B - V_A = \\frac{W_{AB}}{q_0}",
      },
      authoredExample: {
        prompt:
          "Point A is at a potential of 50 V and point B at 200 V. Find the work done in carrying a charge of 2 µC from A to B.",
        steps: [
          "Given: \\(V_A = 50\\) V, \\(V_B = 200\\) V, \\(q_0 = 2 \\times 10^{-6}\\) C.",
          "Formula: \\(W_{AB} = q_0 (V_B - V_A)\\).",
          "Substitution: \\(W_{AB} = 2 \\times 10^{-6} \\times (200 - 50) = 2 \\times 10^{-6} \\times 150\\).",
          "\\(W_{AB} = 3 \\times 10^{-4}\\) J.",
        ],
        answer: "3 × 10⁻⁴ J",
      },
      selfCheckExample: {
        prompt: "An electron is accelerated through a potential difference of 100 V. How much energy does it gain, in eV and in joules?",
        steps: ["Energy = 100 eV.", "\\(100 \\times 1.6 \\times 10^{-19} = 1.6 \\times 10^{-17}\\) J."],
        answer: "100 eV = 1.6 × 10⁻¹⁷ J",
      },
      practiceSet: [
        { prompt: "What is the SI unit of electric potential, in terms of joule and coulomb?", answer: "Volt, 1 V = 1 J/C" },
        { prompt: "Is electric potential a scalar or a vector?", answer: "A scalar" },
        { prompt: "Find the work needed to bring a charge of 4 µC from infinity to a point where the potential is \\(2 \\times 10^{5}\\) V.", answer: "0.8 J" },
        { prompt: "Does the work done in moving a charge between two points depend on the path taken?", answer: "No. It depends only on the potentials of the two end points" },
      ],
      pyqExampleId: "5ae17dbd-6041-4e03-b3b3-72f19e314450",
      traps: [
        {
          title: "A definition missing its conditions",
          body: "Say all of it: a UNIT POSITIVE charge, brought FROM INFINITY, WITHOUT ACCELERATION, AGAINST the field. Leaving out any one of these costs the definition mark.",
        },
        {
          title: "Forgetting to convert kV and µC",
          body: "Write 400 kV as \\(4 \\times 10^{5}\\) V and 5 µC as \\(5 \\times 10^{-6}\\) C before you multiply. Most wrong answers here are a power of ten out.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpes-point-charge",
      name: "Potential of a point charge and of a group of charges",
      intuition:
        "Close to a positive charge the potential is high and it falls smoothly to zero far away, but more slowly than the field does: as 1/r, not 1/r². Because potential is a scalar, the potential of several charges is just the sum of their separate potentials, each with its own sign. No arrows and no components.",
      definition:
        "**Derivation (textbook labelling):**\n" +
        "- A point charge +q sits at O. P is a point at distance r from O.\n" +
        "- At a distance x from O the field is \\(E = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q}{x^2}\\), directed outward.\n" +
        "- Moving a unit positive charge through dx towards O, against the field, takes work \\(dW = -E\\,dx\\).\n" +
        "- Total work from infinity to P: \\(V = -\\displaystyle\\int_{\\infty}^{r} \\dfrac{q}{4\\pi\\varepsilon_0 x^2}\\,dx = -\\dfrac{q}{4\\pi\\varepsilon_0}\\left[-\\dfrac{1}{x}\\right]_{\\infty}^{r}\\).\n" +
        "- So \\(V = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q}{r}\\).\n" +
        "**A group of charges:** by the superposition principle, the potential at P is the algebraic sum of the potentials of the separate charges, \\(V = \\dfrac{1}{4\\pi\\varepsilon_0}\\left(\\dfrac{q_1}{r_1} + \\dfrac{q_2}{r_2} + \\dots + \\dfrac{q_n}{r_n}\\right)\\).\n" +
        "- Remember: for a single charge, \\(F \\propto 1/r^2\\) and \\(E \\propto 1/r^2\\), but \\(V \\propto 1/r\\).",
      formula: {
        label: "Potential of point charges",
        latex: "V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{r}, \\qquad V = \\frac{1}{4\\pi\\varepsilon_0}\\sum_i \\frac{q_i}{r_i}",
      },
      authoredExample: {
        prompt:
          "Charges of +4 µC and −2 µC are placed 30 cm apart in air. Find the electric potential at the midpoint of the line joining them. (\\(\\dfrac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^{9}\\) SI units)",
        steps: [
          "Given: \\(q_1 = 4 \\times 10^{-6}\\) C, \\(q_2 = -2 \\times 10^{-6}\\) C; each is 0.15 m from the midpoint.",
          "Formula: \\(V = \\dfrac{1}{4\\pi\\varepsilon_0}\\left(\\dfrac{q_1}{r_1} + \\dfrac{q_2}{r_2}\\right)\\).",
          "Substitution: \\(V = 9 \\times 10^{9} \\times \\dfrac{(4 - 2) \\times 10^{-6}}{0.15} = \\dfrac{18\\,000}{0.15}\\).",
          "\\(V = 1.2 \\times 10^{5}\\) V.",
        ],
        answer: "1.2 × 10⁵ V",
      },
      selfCheckExample: {
        prompt: "Find the electric potential 9 cm from a point charge of 3 nC in air. (\\(\\dfrac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^{9}\\) SI units)",
        steps: ["\\(V = \\dfrac{9 \\times 10^{9} \\times 3 \\times 10^{-9}}{0.09} = \\dfrac{27}{0.09}\\).", "V = 300 V."],
        answer: "300 V",
      },
      practiceSet: [
        { prompt: "The distance from a point charge is tripled. What happens to the potential?", answer: "It becomes one third" },
        { prompt: "Equal and opposite charges +q and −q are a distance apart. What is the potential at the midpoint between them?", answer: "Zero" },
        { prompt: "Two equal positive charges are a distance apart. At their midpoint, is the field zero, the potential zero, or both?", answer: "Only the field is zero; the potential is twice that of one charge" },
      ],
      pyqExampleId: "b4df92ce-0eb0-4725-a44e-05697a5d7e05",
      traps: [
        {
          title: "Adding potentials without their signs",
          body: "Potential is a scalar but it has a sign. A negative charge gives a negative potential, so put each \\(q_i\\) in with its sign before adding.",
        },
        {
          title: "Using 1/r² for potential",
          body: "The potential of a point charge falls as \\(1/r\\). The field falls as \\(1/r^2\\). Swapping the two is the commonest one-mark slip in this section.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpes-dipole-potential",
      name: "Potential of an electric dipole",
      intuition:
        "A dipole is a + charge and a − charge close together. Their potentials nearly cancel, so the dipole's potential falls faster than a single charge's: as 1/r². On the line through both charges the cancelling is weakest, so the potential is largest there. On the perpendicular bisector every point is equally far from both charges, so the potential there is exactly zero.",
      definition:
        "- Dipole AB: +q at A and −q at B, separated by 2l. Dipole moment \\(p = q \\times 2l\\), directed from −q to +q.\n" +
        "- Point C is at distance r from the centre O, on a line at angle \\(\\theta\\) to the dipole axis. With \\(r_1\\), \\(r_2\\) the distances of C from +q and −q, \\(V_C = \\dfrac{q}{4\\pi\\varepsilon_0}\\left(\\dfrac{1}{r_1} - \\dfrac{1}{r_2}\\right)\\).\n" +
        "- For a short dipole (\\(r \\gg l\\)), using the binomial expansion: \\(V_C = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{p\\cos\\theta}{r^2}\\).\n" +
        "- **Axial point** (\\(\\theta = 0°\\)): \\(V = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{p}{r^2}\\), the largest value.\n" +
        "- **Equatorial point** (\\(\\theta = 90°\\)): V = 0. So the equatorial plane is an equipotential plane.",
      formula: {
        label: "Potential of a short dipole",
        latex: "V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{p\\cos\\theta}{r^2}",
      },
      authoredExample: {
        prompt:
          "A short dipole has a dipole moment of \\(4 \\times 10^{-9}\\) C m. How far from its centre, along its axis, is the potential 400 V? (\\(\\dfrac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^{9}\\) SI units)",
        steps: [
          "Given: \\(p = 4 \\times 10^{-9}\\) C m, V = 400 V, axial point so \\(\\theta = 0°\\).",
          "Formula: \\(V = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{p}{r^2}\\), so \\(r^2 = \\dfrac{9 \\times 10^{9} \\times p}{V}\\).",
          "Substitution: \\(r^2 = \\dfrac{9 \\times 10^{9} \\times 4 \\times 10^{-9}}{400} = \\dfrac{36}{400} = 0.09\\ \\text{m}^2\\).",
          "r = 0.3 m.",
        ],
        answer: "0.3 m (30 cm) from the centre",
      },
      selfCheckExample: {
        prompt: "A charge of 3 µC is carried from one point on the equatorial line of a dipole to another point on the same line. How much work is done?",
        steps: ["Every point on the equatorial line is at zero potential.", "\\(W = q(V_B - V_A) = 3 \\times 10^{-6} \\times (0 - 0) = 0\\)."],
        answer: "Zero",
      },
      practiceSet: [
        { prompt: "How does the potential of a short dipole vary with the distance r from its centre?", answer: "As \\(1/r^2\\)" },
        { prompt: "What is the direction of the dipole moment?", answer: "From the negative charge to the positive charge" },
        { prompt: "At a fixed distance from a short dipole, at what angle to the axis is the potential greatest?", answer: "At 0°, on the axis on the side of the positive charge" },
      ],
      pyqExampleId: "a186865d-4628-42de-98f3-2583b1feeec5",
      traps: [
        {
          title: "Zero potential is not zero field",
          body: "On the equatorial line of a dipole V = 0, but the field there is NOT zero: it points parallel to the axis, from + towards −. Never conclude E = 0 from V = 0.",
        },
        {
          title: "Dipole moment from the wrong charge",
          body: "\\(\\vec{p}\\) points from −q to +q. Taking it from + to − flips the sign of \\(\\cos\\theta\\) and of every axial answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpes-gradient",
      name: "Electric field as the potential gradient",
      intuition:
        "Field and potential are two views of the same thing. Where the potential changes fast with distance, the field is strong; where it hardly changes, the field is weak. A positive charge rolls 'downhill', so the field always points the way the potential falls.",
      definition:
        "- Moving a unit positive charge through dx against a field E takes work \\(dV = -E\\,dx\\).\n" +
        "- So \\(E = -\\dfrac{dV}{dx}\\): the electric field at a point is the negative of the potential gradient there.\n" +
        "- The minus sign means the field points in the direction in which the potential decreases.\n" +
        "- Unit of potential gradient: V/m, which is the same as N/C, the unit of E.\n" +
        "- Between two parallel plates with potential difference V and separation d, the field is uniform: \\(E = \\dfrac{V}{d}\\).",
      formula: {
        label: "Field and potential gradient",
        latex: "E = -\\frac{dV}{dx}, \\qquad E = \\frac{V}{d} \\ (\\text{uniform field})",
      },
      authoredExample: {
        prompt:
          "Two parallel plates 5 mm apart have a potential difference of 200 V between them. Find the electric field between the plates and the force on an electron placed there. (e = 1.6 × 10⁻¹⁹ C)",
        steps: [
          "Given: V = 200 V, \\(d = 5 \\times 10^{-3}\\) m.",
          "Formula: \\(E = \\dfrac{V}{d}\\), F = eE.",
          "Substitution: \\(E = \\dfrac{200}{5 \\times 10^{-3}} = 4 \\times 10^{4}\\) V/m.",
          "\\(F = 1.6 \\times 10^{-19} \\times 4 \\times 10^{4} = 6.4 \\times 10^{-15}\\) N, towards the positive plate.",
        ],
        answer: "E = 4 × 10⁴ V/m; F = 6.4 × 10⁻¹⁵ N",
      },
      selfCheckExample: {
        prompt: "Along the x-axis the potential falls from 50 V to 20 V over a distance of 0.1 m. Find the size and direction of the field, taking it as uniform.",
        steps: ["\\(E = -\\dfrac{dV}{dx} = -\\dfrac{20 - 50}{0.1} = 300\\) V/m.", "Positive, so the field points along +x, the way the potential falls."],
        answer: "300 V/m along +x",
      },
      practiceSet: [
        { prompt: "Name a unit of electric field other than N/C.", answer: "V/m" },
        { prompt: "Does the electric field point towards higher or lower potential?", answer: "Towards lower potential" },
        { prompt: "Plates 2 cm apart are kept at a potential difference of 100 V. Find the field between them.", answer: "5000 V/m" },
      ],
      pyqExampleId: "c3398b29-1565-4789-a704-e9c7af8f857c",
      traps: [
        {
          title: "Dropping the minus sign",
          body: "The relation is \\(E = -dV/dx\\). Without the minus sign the field would point towards higher potential, which is wrong. The board asks for the formula itself, so the sign is the mark.",
        },
        {
          title: "Volt per centimetre",
          body: "The SI unit of potential gradient is V/m. V/cm is not SI, and V m is a different quantity altogether.",
        },
      ],
    },
  ],
};
