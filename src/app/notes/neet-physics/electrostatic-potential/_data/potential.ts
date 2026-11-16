import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_EP_POTENTIAL_NOTE: SubtopicNote = {
  subtopicName: "Electric Potential",
  title: "Electric Potential",
  oneLineDefinition:
    "Potential as work per unit charge, V = kq/r for a point charge and the sum over several charges, the potential of a dipole, and the potential of charged spheres, shells and drops.",
  whyItMatters:
    "Seven NEET questions from 2021 to 2024, none since 2024. Two add the potentials of point charges (one charge 9 cm away in Re-NEET 2024, the two charges of a dipole in 2023), one checks the potential on a dipole's axis (2024), and four are about charged spheres: equal charges on two hollow spheres, two points inside a charged shell, two spheres joined by a wire and 27 drops that merge into one.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphep-point-charge",
      name: "Potential of point charges",
      intuition:
        "Bring a small positive test charge in from very far away towards a charge q, slowly, so it gains no kinetic energy. The work you do per unit of test charge is the potential at the point where you stop. Potential is a plain number with a sign, not an arrow, so the potentials of several charges simply add.",
      definition:
        "- **Potential** at a point: the work done by an outside force in bringing a unit positive charge from infinity to that point, slowly. Unit: volt, 1 V = 1 J/C.\n" +
        "- Point charge: \\(V = \\dfrac{kq}{r}\\), with \\(k = \\dfrac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^{9}\\ \\text{N m}^{2}\\text{C}^{-2}\\). Keep the sign of q: a negative charge gives a negative potential.\n" +
        "- V falls as \\(\\dfrac{1}{r}\\), while the field of the same charge falls as \\(\\dfrac{1}{r^{2}}\\).\n" +
        "- Several charges: \\(V = \\sum \\dfrac{kq_i}{r_i}\\), a sum of signed numbers.\n" +
        "- Potential difference: \\(V_B - V_A\\) is the work per unit charge in moving it from A to B. It does not depend on the path taken.",
      formula: {
        label: "Point charges",
        latex: "V = \\frac{kq}{r}, \\qquad V = \\sum_i \\frac{kq_i}{r_i}, \\qquad k = \\frac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^{9}\\ \\text{N m}^{2}\\text{C}^{-2}",
        symbols: [
          { symbol: "\\(q\\)", meaning: "the charge, with its sign" },
          { symbol: "\\(r\\)", meaning: "distance from the charge to the point, in metres" },
        ],
      },
      authoredExample: {
        prompt:
          "Charges of +2 nC and −1 nC are 30 cm apart. Find the potential at the midpoint, and the point between them where the potential is zero.",
        steps: [
          "\\(k \\times 1\\ \\text{nC} = 9\\ \\text{V m}\\). At the midpoint each charge is 0.15 m away.",
          "\\(V = 9\\left(\\dfrac{2}{0.15} - \\dfrac{1}{0.15}\\right) = \\dfrac{9}{0.15} = 60\\) V.",
          "Zero point at x from the +2 nC charge: \\(\\dfrac{2}{x} = \\dfrac{1}{0.3 - x}\\), so \\(0.6 - 2x = x\\) and \\(x = 0.2\\) m.",
          "Check: \\(9\\left(\\dfrac{2}{0.2} - \\dfrac{1}{0.1}\\right) = 9(10 - 10) = 0\\).",
        ],
        answer: "60 V at the midpoint; zero 20 cm from the +2 nC charge",
      },
      selfCheckExample: {
        prompt:
          "Three charges of +3 nC sit at the corners of an equilateral triangle, each 0.3 m from its centre. Find the potential at the centre. Is the field there also non-zero?",
        steps: [
          "Each charge gives \\(\\dfrac{9 \\times 3}{0.3} = 90\\) V. Potentials add as numbers: \\(3 \\times 90 = 270\\) V.",
          "The three field arrows are equal and 120° apart, so they cancel. The field is zero.",
        ],
        answer: "270 V; the field there is zero even though the potential is not",
      },
      practiceSet: [
        { prompt: "Is electric potential a scalar or a vector?", answer: "A scalar" },
        { prompt: "Charges +q and −q sit at two corners of an equilateral triangle. What is the potential at the third corner?", answer: "Zero" },
        { prompt: "The distance from a point charge is doubled. By what factor does its potential change?", answer: "It halves" },
        { prompt: "Write one volt in joules and coulombs.", answer: "1 V = 1 J/C" },
      ],
      pyqExampleId: "e91a946f-f625-427c-8665-6a869796a712",
      traps: [
        {
          title: "Potentials add as signed numbers",
          body: "Add the potentials of several charges with their signs and no directions. Splitting them into components, as you would for fields, is wrong.",
        },
        {
          title: "Potential falls as 1/r, field as 1/r²",
          body: "Doubling the distance from a point charge halves its potential but cuts its field to a quarter.",
        },
        {
          title: "Change centimetres to metres",
          body: "With \\(k = 9 \\times 10^{9}\\) in SI units, a distance of 9 cm must go in as 0.09 m. Leaving it as 9 gives a potential 100 times too small.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphep-dipole",
      name: "Potential of an electric dipole",
      intuition:
        "A dipole is a charge +q and a charge −q a small distance 2a apart. Far away the two potentials almost cancel, because the charges are nearly the same distance off. What is left depends on the direction: largest along the axis, and zero on the line that cuts the dipole at right angles through its centre, where every point is equally far from both charges.",
      definition:
        "- **Dipole moment:** \\(p = q \\times 2a\\), pointing from −q to +q. Unit C m.\n" +
        "- Far from a short dipole (r much larger than a), at angle θ to its axis: \\(V = \\dfrac{kp\\cos\\theta}{r^{2}}\\).\n" +
        "- On the axis (θ = 0° or 180°): \\(V = \\pm\\dfrac{kp}{r^{2}}\\). On the equatorial line (θ = 90°): V = 0.\n" +
        "- A dipole's potential falls as \\(\\dfrac{1}{r^{2}}\\), faster than a single charge's \\(\\dfrac{1}{r}\\).\n" +
        "- Close to the dipole, or when the distances are given, add the two charges' potentials directly: \\(V = \\dfrac{kq}{r_1} - \\dfrac{kq}{r_2}\\).",
      formula: {
        label: "Dipole potential",
        latex: "p = q(2a), \\qquad V = \\frac{kp\\cos\\theta}{r^{2}} \\quad (r \\gg a)",
        symbols: [
          { symbol: "\\(p\\)", meaning: "dipole moment" },
          { symbol: "\\(\\theta\\)", meaning: "angle between the dipole axis and the line to the point" },
        ],
      },
      authoredExample: {
        prompt:
          "A short dipole has moment \\(2 \\times 10^{-9}\\) C m. Find the potential at a point 0.3 m from its centre, on a line making 60° with its axis.",
        steps: [
          "\\(V = \\dfrac{kp\\cos\\theta}{r^{2}} = \\dfrac{9 \\times 10^{9} \\times 2 \\times 10^{-9} \\times 0.5}{0.3^{2}}\\).",
          "\\(V = \\dfrac{9}{0.09} = 100\\) V.",
        ],
        answer: "100 V",
      },
      selfCheckExample: {
        prompt:
          "Two points are the same large distance r from a short dipole: one on its axis, one on a line at 60° to the axis. What is the ratio of their potentials?",
        steps: [
          "\\(V \\propto \\cos\\theta\\) at a fixed r.",
          "\\(\\dfrac{\\cos 0^{\\circ}}{\\cos 60^{\\circ}} = \\dfrac{1}{0.5} = 2\\).",
        ],
        answer: "2 : 1",
      },
      practiceSet: [
        { prompt: "What is the potential at any point on the equatorial line of a dipole?", answer: "Zero" },
        { prompt: "Far from a short dipole, how does its potential depend on the distance r?", answer: "As \\(1/r^{2}\\)" },
        { prompt: "Charges of +2 μC and −2 μC are 3 mm apart. Find the dipole moment.", answer: "\\(6 \\times 10^{-9}\\) C m" },
        { prompt: "In which direction does the dipole moment point?", answer: "From the negative charge to the positive charge" },
      ],
      pyqExampleId: "692cb4ad-7b12-4b6d-9eaa-486f212fdb74",
      traps: [
        {
          title: "Dipole potential goes as 1/r², not 1/r³",
          body: "A dipole's field falls as \\(1/r^{3}\\) but its potential as \\(1/r^{2}\\). The axial potential is \\(kp/r^{2}\\); a formula with 2p over r² mixes the two up and is wrong.",
        },
        {
          title: "Zero potential does not mean zero field",
          body: "On the equatorial line of a dipole the potential is zero, yet the field there is not zero. It points parallel to the axis, from + towards −.",
        },
        {
          title: "Near the dipole, add the charges",
          body: "The \\(kp\\cos\\theta/r^{2}\\) formula holds only far away. When a point is close and its distances from both charges are known, add \\(kq/r_1\\) and \\(-kq/r_2\\) instead.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphep-conductors",
      name: "Charged spheres, shells and drops",
      intuition:
        "Charge on a conductor spreads until the whole conductor sits at one potential, with no field inside. Outside a charged sphere or shell, the potential is the same as if all its charge sat at the centre. Inside a shell there is no field, so nothing changes as you move about: the potential stays at its surface value all the way in.",
      definition:
        "- Charged shell or conducting sphere, charge Q, radius R: \\(V = \\dfrac{kQ}{r}\\) outside (r ≥ R) and \\(V = \\dfrac{kQ}{R}\\) at every point inside.\n" +
        "- A conductor at rest is one equipotential: the field inside is zero and the field just outside is at right angles to the surface.\n" +
        "- Two spheres joined by a long thin wire reach one potential: \\(\\dfrac{kQ_1}{R_1} = \\dfrac{kQ_2}{R_2}\\), so \\(Q \\propto R\\), and the surface charge density \\(\\sigma = \\dfrac{Q}{4\\pi R^{2}}\\) goes as \\(\\dfrac{1}{R}\\).\n" +
        "- n identical drops merge into one: the volume adds, so \\(R = n^{1/3}r\\); the charge adds, so \\(Q = nq\\). The new potential is \\(n^{2/3}\\) times the old.",
      formula: {
        label: "Spheres and drops",
        latex: "V_{\\text{in}} = \\frac{kQ}{R}, \\qquad V_{\\text{out}} = \\frac{kQ}{r}, \\qquad V_{\\text{big drop}} = n^{2/3}\\,V",
      },
      authoredExample: {
        prompt: "Eight identical charged drops, each at a potential of 10 V, merge into one big drop. Find its potential.",
        steps: [
          "Volume adds: \\(R^{3} = 8r^{3}\\), so \\(R = 2r\\).",
          "Charge adds: \\(Q = 8q\\).",
          "\\(V' = \\dfrac{k(8q)}{2r} = 4 \\times \\dfrac{kq}{r} = 4 \\times 10 = 40\\) V.",
        ],
        answer: "40 V",
      },
      selfCheckExample: {
        prompt:
          "A thin shell of radius 10 cm carries 2 nC. Find the potential at its centre and at a point 30 cm from its centre.",
        steps: [
          "\\(kQ = 9 \\times 10^{9} \\times 2 \\times 10^{-9} = 18\\ \\text{V m}\\).",
          "Inside, the potential equals the surface value: \\(\\dfrac{18}{0.1} = 180\\) V, at the centre too.",
          "Outside: \\(\\dfrac{18}{0.3} = 60\\) V.",
        ],
        answer: "180 V at the centre, 60 V at 30 cm",
      },
      practiceSet: [
        { prompt: "What is the electric field at any point inside a charged conducting shell?", answer: "Zero" },
        { prompt: "64 identical drops, each at potential V, merge into one drop. Its potential?", answer: "16V" },
        { prompt: "Two hollow spheres of radii 2 cm and 4 cm carry equal charges. Ratio of their potentials, small to large?", answer: "2 : 1" },
        { prompt: "Is every point of a charged conductor at rest at the same potential?", answer: "Yes; a conductor at rest is an equipotential" },
      ],
      pyqExampleId: "2f468dd1-564f-43e0-8d97-d9527d358a29",
      traps: [
        {
          title: "Inside a shell the potential is not zero",
          body: "The field inside a charged shell is zero, so the potential there is constant and equal to \\(kQ/R\\). The potential difference between two inside points is zero, but each potential is not.",
        },
        {
          title: "Volume adds, not radius",
          body: "n drops make one drop of radius \\(n^{1/3}r\\), not \\(nr\\). For 27 drops the radius triples and the potential becomes 9 times.",
        },
        {
          title: "Joined spheres share potential, not charge",
          body: "Charge divides in proportion to the radii. The smaller sphere ends with less charge but the larger surface charge density.",
        },
      ],
    },
  ],
};
