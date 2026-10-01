import type { SubtopicNote } from "@/app/notes/_types";

export const FIELD_ES_NOTE: SubtopicNote = {
  subtopicName: "Electric Field of Charges, Rods, Rings and Sheets",
  title: "Electric Field of Charges, Rods, Rings and Sheets",
  oneLineDefinition:
    "The field at a point is the force on a unit positive charge placed there; add each charge's kq/r² as a vector, and for rods, rings and sheets let symmetry cancel what it can before you add the rest.",
  whyItMatters:
    "Thirty-one PYQs, twenty-five of them multiple choice, and three from 2026. Thirteen deal with point charges: null points, charges on a polygon or a cube, and statements about field lines. Eight take the field of a rod, an arc, a ring or a disc, including the point where a ring's axial field peaks. Ten use infinite sheets and line charges, alone or together.",
  concepts: [
    // C1 — point charges
    {
      kind: "formula" as const,
      slug: "jpes-point-field",
      name: "Field of point charges and null points",
      intuition:
        "A positive charge's field points away from it, a negative charge's towards it, and both fall as 1/r². With several charges, draw each field as an arrow at the point and add the arrows. A null point is where the arrows cancel: between two like charges, or outside two unlike charges on the side of the smaller one. Symmetry also cancels: equal charges at the corners of a regular polygon give no field at its centre.",
      definition:
        "- \\(E = \\dfrac{kq}{r^{2}}\\), away from a positive charge and towards a negative one. Add the fields as vectors.\n" +
        "- Null point, like charges: between them, nearer the smaller, at \\(x = \\dfrac{r}{1 + \\sqrt{q_2/q_1}}\\) from \\(q_1\\).\n" +
        "- Null point, unlike charges: never between them. It lies outside, beyond the charge of smaller size.\n" +
        "- Midway between +q and −q a distance d apart, the two fields point the same way: \\(E = \\dfrac{8kq}{d^{2}}\\), towards −q.\n" +
        "- Equal charges at the corners of a regular polygon give \\(E = 0\\) at the centre. If one corner's charge is changed to q′, the field at the centre is that of \\(q' - q\\) alone at that corner.\n" +
        "- Field lines start on positive charges and end on negative ones. They never cross, never form closed loops in electrostatics, and are crowded where the field is strong. Inside a conductor the field is zero.",
      formula: {
        label: "Superposition and the null point of like charges",
        latex: "\\vec E = \\sum_i \\frac{kq_i}{r_i^{2}}\\,\\hat r_i, \\qquad x_{\\text{null}} = \\frac{r}{1 + \\sqrt{q_2/q_1}}",
      },
      authoredExample: {
        prompt:
          "(a) Charges \\(+16\\ \\mu\\text{C}\\) and \\(+4\\ \\mu\\text{C}\\) are 9 cm apart. Where between them is the field zero? (b) Charges \\(+9\\ \\mu\\text{C}\\) and \\(-1\\ \\mu\\text{C}\\) are 10 cm apart. Where is the field zero?",
        steps: [
          "(a) Like charges: \\(x = \\dfrac{9}{1 + \\sqrt{4/16}} = \\dfrac{9}{1.5} = 6\\) cm from the \\(16\\ \\mu\\text{C}\\) charge, so 3 cm from the smaller one.",
          "(b) Unlike charges: the point lies beyond the \\(-1\\ \\mu\\text{C}\\) charge, at x from it.",
          "\\(\\dfrac{9}{(x + 10)^{2}} = \\dfrac{1}{x^{2}}\\), so \\(x + 10 = 3x\\) and \\(x = 5\\) cm.",
        ],
        answer: "(a) 6 cm from the \\(16\\ \\mu\\text{C}\\) charge; (b) 5 cm beyond the \\(-1\\ \\mu\\text{C}\\) charge.",
      },
      selfCheckExample: {
        prompt:
          "Charges \\(+2\\ \\mu\\text{C}\\) and \\(-2\\ \\mu\\text{C}\\) are 6 cm apart. Find the field at the midpoint.",
        steps: [
          "Each field is \\(\\dfrac{kq}{(0.03)^{2}}\\), and both point towards the negative charge.",
          "\\(E = \\dfrac{8kq}{d^{2}} = \\dfrac{8 \\times 9 \\times 10^{9} \\times 2 \\times 10^{-6}}{0.0036} = 4 \\times 10^{7}\\) N/C.",
        ],
        answer: "\\(4 \\times 10^{7}\\) N/C, towards the negative charge.",
      },
      practiceSet: [
        { prompt: "Four equal charges sit at the corners of a square. Field at the centre?", answer: "Zero" },
        { prompt: "In the square above, one charge q is replaced by −q. The half-diagonal is r. Field at the centre?", answer: "\\(2kq/r^{2}\\), towards the changed corner", method: "Equal set (zero field) plus −2q at that corner." },
        { prompt: "Charges +q and +4q are 3 m apart. Where between them is the field zero?", answer: "1 m from +q" },
        { prompt: "Can the field be zero at a point between two unlike charges?", answer: "No: both fields point towards the negative charge there." },
      ],
      pyqExampleId: "45207ab9-0825-476b-ae4f-de8bbd83c4e1", // 2023: 4q₀ at origin, −q₀ at 12 cm, proton's null point at 24 cm
      traps: [
        {
          title: "Unlike charges: never between them",
          body: "Between +q and −q both fields point towards −q, so they add. The null point is outside, beyond the smaller charge. A root between the charges must be rejected.",
        },
        {
          title: "Add arrows, not numbers",
          body: "Fields from charges at different places point in different directions. Adding their sizes is right only when they lie along one line and point the same way.",
        },
        {
          title: "Field lines never cross",
          body: "At any point the field has one direction, so two lines cannot cross there. Electrostatic field lines also never close on themselves.",
        },
      ],
    },

    // C2 — rods, arcs, rings and discs
    {
      kind: "formula" as const,
      slug: "jpes-continuous-field",
      name: "Field of rods, arcs, rings and discs",
      intuition:
        "Cut the charge into small pieces and add their fields. Symmetry does most of the work: on a ring's axis, the sideways parts from opposite pieces cancel and only the part along the axis survives. At the centre of a full ring everything cancels. An arc keeps a net field along its line of symmetry, and only the angle it spans matters.",
      definition:
        "- Rod, on its perpendicular bisector at distance a, with each end at angle θ from the bisector: \\(E = \\dfrac{2k\\lambda}{a}\\sin\\theta\\). A very long rod: \\(\\dfrac{2k\\lambda}{a}\\).\n" +
        "- Arc of radius R spanning angle φ at the centre: \\(E = \\dfrac{2k\\lambda}{R}\\sin\\dfrac{\\varphi}{2}\\), along the line of symmetry. A half ring: \\(\\dfrac{2k\\lambda}{R}\\) with \\(\\lambda = \\dfrac{Q}{\\pi R}\\). A full ring: zero.\n" +
        "- Ring of charge Q, on its axis at distance z: \\(E = \\dfrac{kQz}{(z^{2} + R^{2})^{3/2}}\\), greatest at \\(z = \\dfrac{R}{\\sqrt 2}\\).\n" +
        "- Two equal charges a distance 2a apart: on the perpendicular bisector the field is greatest at \\(\\dfrac{a}{\\sqrt 2}\\) from the midpoint, by the same calculation.\n" +
        "- Disc of surface density σ, on its axis: \\(E = \\dfrac{\\sigma}{2\\varepsilon_0}\\left(1 - \\dfrac{z}{\\sqrt{z^{2} + R^{2}}}\\right)\\), which tends to \\(\\dfrac{\\sigma}{2\\varepsilon_0}\\) for a very large disc.",
      formula: {
        label: "Arc at its centre and ring on its axis",
        latex: "E_{\\text{arc}} = \\frac{2k\\lambda}{R}\\sin\\frac{\\varphi}{2}, \\qquad E_{\\text{axis}} = \\frac{kQz}{(z^{2} + R^{2})^{3/2}}",
      },
      authoredExample: {
        prompt:
          "A ring of radius 3 cm carries 5 nC. Find the field on its axis 4 cm from the centre, and where on the axis the field is greatest.",
        steps: [
          "\\(\\sqrt{z^{2} + R^{2}} = 5\\) cm, so \\((z^{2} + R^{2})^{3/2} = (0.05)^{3} = 1.25 \\times 10^{-4}\\ \\text{m}^{3}\\).",
          "\\(E = \\dfrac{9 \\times 10^{9} \\times 5 \\times 10^{-9} \\times 0.04}{1.25 \\times 10^{-4}} = \\dfrac{1.8}{1.25 \\times 10^{-4}} = 1.44 \\times 10^{4}\\) N/C.",
          "The peak is at \\(z = R/\\sqrt 2 = 3/\\sqrt 2 \\approx 2.1\\) cm.",
        ],
        answer: "\\(1.44 \\times 10^{4}\\) N/C along the axis; greatest at about 2.1 cm.",
      },
      selfCheckExample: {
        prompt:
          "An arc of radius 0.1 m spans \\(60^{\\circ}\\) at its centre and carries a uniform \\(\\lambda = 3\\) nC/m. Field at the centre?",
        steps: [
          "\\(\\sin(\\varphi/2) = \\sin 30^{\\circ} = 0.5\\), so \\(E = \\dfrac{2k\\lambda}{R} \\times 0.5 = \\dfrac{k\\lambda}{R}\\).",
          "\\(E = \\dfrac{9 \\times 10^{9} \\times 3 \\times 10^{-9}}{0.1} = 270\\) N/C.",
        ],
        answer: "270 N/C, along the arc's line of symmetry.",
      },
      practiceSet: [
        { prompt: "Where on the axis of a ring of radius 6 cm is the field greatest?", answer: "\\(3\\sqrt 2 \\approx 4.2\\) cm from the centre" },
        { prompt: "Field at the centre of a uniformly charged full ring?", answer: "Zero" },
        { prompt: "A very long rod carries \\(2\\ \\mu\\text{C/m}\\). Field 0.3 m from it?", answer: "\\(1.2 \\times 10^{5}\\) N/C" },
        { prompt: "Field on the axis of a large charged disc, very close to its surface?", answer: "\\(\\sigma/2\\varepsilon_0\\)" },
      ],
      pyqExampleId: "8ca7b8af-3fc5-4b6b-b600-1c37613f2713", // 2026: half ring, E = 100 V/m at centre, Q = 2.14 nC
      traps: [
        {
          title: "The arc formula uses half the angle",
          body: "For an arc spanning φ, the factor is sin(φ/2). A half ring spans 180°, so the factor is sin 90° = 1, not sin 180° = 0.",
        },
        {
          title: "λ comes from the arc's own length",
          body: "A half ring of charge Q has λ = Q/πR, not Q/2πR. Use the length that actually carries the charge.",
        },
        {
          title: "Let symmetry cancel first",
          body: "On a ring's axis only the axial parts survive. Adding the full kq/r² of every piece overcounts by the factor z/r that the cancelling removes.",
        },
      ],
    },

    // C3 — sheets and lines
    {
      kind: "formula" as const,
      slug: "jpes-sheets-lines",
      name: "Infinite sheets and line charges",
      intuition:
        "An infinite sheet's field does not weaken with distance: move away and the sheet still fills the view. Its field is σ/2ε₀ on each side, pointing away from a positive sheet. With several sheets, work region by region and add each sheet's σ/2ε₀ with its direction. A long line of charge spreads its field over a cylinder, so the field falls as 1/r.",
      definition:
        "- One sheet: \\(E = \\dfrac{\\sigma}{2\\varepsilon_0}\\), normal to the sheet, the same at every distance.\n" +
        "- Several parallel sheets: in each region, add every sheet's \\(\\dfrac{\\sigma}{2\\varepsilon_0}\\) with its direction. Sheets +σ and −σ give \\(\\dfrac{\\sigma}{\\varepsilon_0}\\) between and zero outside; two +σ sheets give zero between and \\(\\dfrac{\\sigma}{\\varepsilon_0}\\) outside.\n" +
        "- Just outside a conductor, with surface density σ on that face: \\(E = \\dfrac{\\sigma}{\\varepsilon_0}\\).\n" +
        "- Two parallel conducting plates: the two outer faces carry equal charges, half of the total; the inner faces carry equal and opposite charges.\n" +
        "- A charge between capacitor plates feels the field of both plates. Remove one plate and the field there halves.\n" +
        "- Long line charge: \\(E = \\dfrac{\\lambda}{2\\pi\\varepsilon_0 r} = \\dfrac{2k\\lambda}{r}\\), radially outward for positive λ.",
      formula: {
        label: "Sheet and line",
        latex: "E_{\\text{sheet}} = \\frac{\\sigma}{2\\varepsilon_0}, \\qquad E_{\\text{line}} = \\frac{\\lambda}{2\\pi\\varepsilon_0 r}",
      },
      authoredExample: {
        prompt:
          "Two large parallel sheets carry \\(+3\\sigma_0\\) (left) and \\(-\\sigma_0\\) (right). Find the field in the three regions.",
        steps: [
          "Left sheet: \\(\\dfrac{3\\sigma_0}{2\\varepsilon_0}\\) away from it on both sides. Right sheet: \\(\\dfrac{\\sigma_0}{2\\varepsilon_0}\\) towards it on both sides.",
          "Left of both: \\(\\dfrac{3\\sigma_0}{2\\varepsilon_0}\\) to the left, \\(\\dfrac{\\sigma_0}{2\\varepsilon_0}\\) to the right; net \\(\\dfrac{\\sigma_0}{\\varepsilon_0}\\) to the left.",
          "Between: both point right; net \\(\\dfrac{2\\sigma_0}{\\varepsilon_0}\\) to the right.",
          "Right of both: \\(\\dfrac{3\\sigma_0}{2\\varepsilon_0}\\) right, \\(\\dfrac{\\sigma_0}{2\\varepsilon_0}\\) left; net \\(\\dfrac{\\sigma_0}{\\varepsilon_0}\\) to the right.",
        ],
        answer: "\\(\\sigma_0/\\varepsilon_0\\) to the left, \\(2\\sigma_0/\\varepsilon_0\\) to the right, \\(\\sigma_0/\\varepsilon_0\\) to the right.",
      },
      selfCheckExample: {
        prompt:
          "A large sheet of charge +σ lies in the plane x = 0. A long line charge +λ runs parallel to the z-axis through x = 3 m, y = 0. Find the field at the point x = 3.5 m on the x-axis, beyond the line.",
        steps: [
          "Sheet: \\(\\dfrac{\\sigma}{2\\varepsilon_0}\\) along \\(+x\\), away from the sheet, whatever the distance.",
          "Line: the point is 0.5 m from it, on the far side, so \\(\\dfrac{\\lambda}{2\\pi\\varepsilon_0 \\times 0.5} = \\dfrac{\\lambda}{\\pi\\varepsilon_0}\\), also along \\(+x\\).",
          "Both point the same way: add them.",
        ],
        answer: "\\(\\dfrac{1}{2\\varepsilon_0}\\left(\\sigma + \\dfrac{2\\lambda}{\\pi}\\right)\\) along \\(+x\\).",
      },
      practiceSet: [
        { prompt: "Field just outside a conductor whose surface carries σ?", answer: "\\(\\sigma/\\varepsilon_0\\)" },
        { prompt: "Sheets +σ and −σ are parallel. Field outside them?", answer: "Zero" },
        { prompt: "A long line carries \\(3\\ \\mu\\text{C/m}\\). Field 0.6 m from it?", answer: "\\(9 \\times 10^{4}\\) N/C" },
        { prompt: "You move from 1 m to 3 m away from a large charged sheet. How does the field change?", answer: "It does not change." },
      ],
      pyqExampleId: "c4e35e30-a54c-4fd3-8941-77f599d5c301", // 2024: sheet on xy-plane, line at z = 4 m, ratio π√n, n = 16
      traps: [
        {
          title: "One sheet is σ/2ε₀",
          body: "σ/ε₀ belongs to the surface of a conductor, or to the region between two opposite sheets. A single sheet gives half of that.",
        },
        {
          title: "A sheet's field does not fall with distance",
          body: "Only a line charge (1/r) or a point charge (1/r²) weakens with distance. An infinite sheet gives the same field everywhere on one side.",
        },
        {
          title: "Conducting plates rearrange their charge",
          body: "Charge given to one plate does not stay on one face. The outer faces always carry equal charges, each half of the total on both plates.",
        },
      ],
    },
  ],
};
