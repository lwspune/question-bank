import type { SubtopicNote } from "@/app/notes/_types";

export const WIRES_MAG_NOTE: SubtopicNote = {
  subtopicName: "Field of Straight Wires and Arcs",
  title: "Field of Straight Wires and Arcs",
  oneLineDefinition:
    "A straight piece of wire gives (μ₀I/4πd)(sin α₁ + sin α₂) at a point a distance d from it, and an arc gives μ₀Iθ/4πR at its centre; every shape of wire is a sum of these pieces.",
  whyItMatters:
    "Twenty-six PYQs, fifteen of them multiple choice, and four from 2026. Six add the fields of two long parallel wires. Six find the field at the centre of a triangle, square or hexagon of wire, and two use the Biot–Savart law for a small element or for one moving charge. Twelve bend a wire into arcs and straight pieces, and every one of those comes with a figure: each piece is one standard result, and the work is adding them with the right signs.",
  concepts: [
    // C1 — long straight wires, two parallel wires
    {
      kind: "formula" as const,
      slug: "jpmag-parallel-wires",
      name: "Field of a long straight wire and of two parallel wires",
      intuition:
        "The field lines of a long straight current are circles round the wire. Grip the wire with the right hand, thumb along the current, and the fingers curl the way the field points. The field falls off as one over the distance. With two wires, work out each field and its direction at the point, then add them as vectors.",
      definition:
        "- Long straight wire: \\(B = \\dfrac{\\mu_0 I}{2\\pi d}\\), with \\(\\dfrac{\\mu_0}{2\\pi} = 2 \\times 10^{-7}\\ \\text{T m/A}\\).\n" +
        "- Direction: right-hand grip rule. At a point to one side of the wire the field is perpendicular to the line joining the point to the wire.\n" +
        "- Two parallel wires, point between them: opposite currents give fields in the SAME direction, so they add; like currents give opposite fields, so they subtract (zero at the midpoint if the currents are equal).\n" +
        "- Point outside the pair: the rule reverses. Opposite currents subtract, like currents add.\n" +
        "- Point not on the line of the wires: the two fields are at an angle; if the lines from the point to the two wires are perpendicular, \\(B = \\sqrt{B_1^{2} + B_2^{2}}\\).",
      formula: {
        label: "Long straight wire",
        latex: "B = \\frac{\\mu_0 I}{2\\pi d}",
      },
      authoredExample: {
        prompt:
          "Two long parallel wires 10 cm apart carry 20 A and 10 A in the same direction. Find the field (a) at the midpoint and (b) at a point in their plane 5 cm outside the 10 A wire. (\\(\\mu_0/2\\pi = 2 \\times 10^{-7}\\) T m/A)",
        steps: [
          "(a) Each wire is 0.05 m away. \\(B_1 = \\dfrac{2 \\times 10^{-7} \\times 20}{0.05} = 8 \\times 10^{-5}\\) T and \\(B_2 = \\dfrac{2 \\times 10^{-7} \\times 10}{0.05} = 4 \\times 10^{-5}\\) T.",
          "Like currents: between the wires the fields are opposite, so \\(B = 8 - 4 = 4 \\times 10^{-5}\\) T, in the direction of the 20 A wire's field.",
          "(b) The point is 0.15 m from the 20 A wire and 0.05 m from the 10 A wire: \\(B_1 = \\dfrac{4 \\times 10^{-6}}{0.15} \\approx 2.67 \\times 10^{-5}\\) T, \\(B_2 = 4 \\times 10^{-5}\\) T.",
          "Outside a pair with like currents the fields point the same way: \\(B \\approx 6.67 \\times 10^{-5}\\) T.",
        ],
        answer: "(a) \\(40\\ \\mu\\text{T}\\); (b) about \\(66.7\\ \\mu\\text{T}\\).",
      },
      selfCheckExample: {
        prompt:
          "Two long parallel wires 5 cm apart carry 6 A and 8 A. A point P is 3 cm from the first wire and 4 cm from the second. Find the field at P. (\\(\\mu_0/2\\pi = 2 \\times 10^{-7}\\) T m/A)",
        steps: [
          "\\(3^{2} + 4^{2} = 5^{2}\\), so the lines from P to the two wires are perpendicular, and so are the two fields.",
          "\\(B_1 = \\dfrac{2 \\times 10^{-7} \\times 6}{0.03} = 4 \\times 10^{-5}\\) T; \\(B_2 = \\dfrac{2 \\times 10^{-7} \\times 8}{0.04} = 4 \\times 10^{-5}\\) T.",
          "\\(B = \\sqrt{B_1^{2} + B_2^{2}} = 4\\sqrt{2} \\times 10^{-5} \\approx 5.66 \\times 10^{-5}\\) T. The directions of the currents do not change the size here.",
        ],
        answer: "\\(4\\sqrt{2} \\times 10^{-5}\\) T, about \\(56.6\\ \\mu\\text{T}\\)",
      },
      practiceSet: [
        { prompt: "A long straight wire carries 5 A. Find the magnetic field 2 cm from it. (\\(\\mu_0 = 4\\pi \\times 10^{-7}\\) T m/A)", answer: "\\(5 \\times 10^{-5}\\) T" },
        { prompt: "Two long wires 4 cm apart carry 3 A each in the same direction. Field at the midpoint?", answer: "Zero" },
        { prompt: "Two long wires 6 cm apart carry 3 A each in opposite directions. Field at the midpoint? (\\(\\mu_0 = 4\\pi \\times 10^{-7}\\) T m/A)", answer: "\\(4 \\times 10^{-5}\\) T" },
        { prompt: "How far from a long wire carrying 10 A is the field \\(10^{-4}\\) T? (\\(\\mu_0 = 4\\pi \\times 10^{-7}\\) T m/A)", answer: "2 cm" },
      ],
      pyqExampleId: "2c8de485-03d1-4f84-b914-4eb9c7810c0d", // 6 Apr 2026 S2: 30 A antiparallel, 8 cm apart, midpoint 300 μT
      traps: [
        {
          title: "Opposite currents add between the wires",
          body: "Between two antiparallel currents both fields point the same way, so with equal currents the midpoint field is twice one wire's field. Subtracting them gives zero, which is the answer only for like currents.",
        },
        {
          title: "Outside the pair the rule reverses",
          body: "At a point beyond both wires, antiparallel currents give opposite fields and like currents give fields in the same direction. Draw each field's direction at the point before adding.",
        },
        {
          title: "Fields at an angle add as vectors",
          body: "When the point is not on the line of the wires, the two fields are not parallel. If the lines from the point to the wires are perpendicular, B = √(B₁² + B₂²), not B₁ + B₂.",
        },
      ],
    },

    // C2 — finite straight wire, polygons, Biot–Savart element
    {
      kind: "formula" as const,
      slug: "jpmag-finite-segments",
      name: "Field of a finite straight wire and of a polygon loop",
      intuition:
        "The Biot–Savart law gives the field of each small piece of current. Added along a straight wire of finite length, it gives a formula that needs only the perpendicular distance d and the two angles at which the ends are seen. An infinite wire is the case where both angles are 90°. A polygon of wire is n equal straight sides, each giving the same field at the centre, all in the same direction.",
      definition:
        "- Biot–Savart: \\(dB = \\dfrac{\\mu_0}{4\\pi}\\dfrac{I\\,dl\\sin\\theta}{r^{2}}\\), direction along \\(d\\vec l \\times \\hat r\\). A single charge q moving at v: \\(B = \\dfrac{\\mu_0}{4\\pi}\\dfrac{qv\\sin\\theta}{r^{2}}\\).\n" +
        "- Finite straight wire: \\(B = \\dfrac{\\mu_0 I}{4\\pi d}(\\sin\\alpha_1 + \\sin\\alpha_2)\\), with \\(\\alpha_1, \\alpha_2\\) measured from the perpendicular dropped from the point to the wire.\n" +
        "- Semi-infinite wire, point on the perpendicular through its end: \\(\\alpha_1 = 90^{\\circ}, \\alpha_2 = 0\\), so \\(B = \\dfrac{\\mu_0 I}{4\\pi d}\\), half the infinite-wire value.\n" +
        "- A point on the line of the wire itself: \\(\\theta = 0\\) for every piece, so B = 0.\n" +
        "- Regular polygon of n sides, side a: the centre is \\(d = \\dfrac{a}{2\\tan(\\pi/n)}\\) from each side, each side is seen at \\(\\alpha = \\pi/n\\) on both ends, and the n fields add: \\(B = n\\dfrac{\\mu_0 I}{4\\pi d}\\,2\\sin\\dfrac{\\pi}{n}\\).\n" +
        "- Triangle: \\(d = \\dfrac{a}{2\\sqrt3}\\), \\(\\alpha = 60^{\\circ}\\). Square: \\(d = \\dfrac{a}{2}\\), \\(\\alpha = 45^{\\circ}\\).",
      formula: {
        label: "Finite straight wire",
        latex: "B = \\frac{\\mu_0 I}{4\\pi d}\\left(\\sin\\alpha_1 + \\sin\\alpha_2\\right) \\qquad dB = \\frac{\\mu_0}{4\\pi}\\frac{I\\,dl\\sin\\theta}{r^{2}}",
      },
      authoredExample: {
        prompt:
          "A square loop of side 20 cm carries 4 A. Find the magnetic field at its centre. (\\(\\mu_0/4\\pi = 10^{-7}\\) T m/A)",
        steps: [
          "The centre is \\(d = 0.1\\) m from each side, and each side is seen at \\(45^{\\circ}\\) on both sides of the perpendicular.",
          "One side: \\(B_1 = \\dfrac{10^{-7} \\times 4}{0.1}(\\sin 45^{\\circ} + \\sin 45^{\\circ}) = 4 \\times 10^{-6} \\times \\sqrt{2}\\) T.",
          "All four sides give the field in the same direction: \\(B = 4 \\times 4\\sqrt{2} \\times 10^{-6} = 16\\sqrt{2} \\times 10^{-6} \\approx 2.26 \\times 10^{-5}\\) T.",
        ],
        answer: "\\(16\\sqrt{2}\\ \\mu\\text{T} \\approx 22.6\\ \\mu\\text{T}\\)",
      },
      selfCheckExample: {
        prompt:
          "A wire bent into an equilateral triangle of side 6 cm carries 3 A. Find the field at its centroid. (\\(\\mu_0/4\\pi = 10^{-7}\\) T m/A)",
        steps: [
          "\\(d = \\dfrac{a}{2\\sqrt3} = \\dfrac{6}{2\\sqrt3} = \\sqrt3\\) cm, and each side is seen at \\(60^{\\circ}\\) on both ends.",
          "One side: \\(\\dfrac{10^{-7} \\times 3}{\\sqrt3 \\times 10^{-2}} \\times 2\\sin 60^{\\circ} = \\dfrac{3 \\times 10^{-5}}{\\sqrt3} \\times \\sqrt3 = 3 \\times 10^{-5}\\) T.",
          "Three sides in the same direction: \\(B = 9 \\times 10^{-5}\\) T.",
        ],
        answer: "\\(9 \\times 10^{-5}\\) T",
      },
      practiceSet: [
        { prompt: "What is the magnetic field at a point that lies on the line of a straight current-carrying wire, beyond its end?", answer: "Zero" },
        { prompt: "A semi-infinite wire carries 4 A. Find the field at a point 2 cm from its end, on the perpendicular through the end. (\\(\\mu_0/4\\pi = 10^{-7}\\) T m/A)", answer: "\\(2 \\times 10^{-5}\\) T" },
        { prompt: "An electron (charge \\(1.6 \\times 10^{-19}\\) C) moves in a circle of radius \\(10^{-10}\\) m at \\(2 \\times 10^{6}\\) m/s. Field at the centre? (\\(\\mu_0/4\\pi = 10^{-7}\\) T m/A)", answer: "3.2 T" },
        { prompt: "Write the field at the centre of a square loop of side a carrying current I.", answer: "\\(\\dfrac{2\\sqrt2\\,\\mu_0 I}{\\pi a}\\)" },
      ],
      pyqExampleId: "48da4edd-35b2-41a2-a5f8-eda3bc3a3a25", // 23 Jan 2026 S2: triangle of side 4√3 cm, 2 A, 3√3 × 10⁻⁵ T
      traps: [
        {
          title: "The angles are measured from the perpendicular",
          body: "In B = (μ₀I/4πd)(sin α₁ + sin α₂), each α is the angle between the perpendicular from the point and the line to an end of the wire. Measuring it from the wire swaps sine for cosine.",
        },
        {
          title: "A semi-infinite wire gives half, not the full value",
          body: "At a point level with the end of a semi-infinite wire, the field is μ₀I/4πd. Using μ₀I/2πd, the infinite-wire result, doubles that piece's contribution.",
        },
        {
          title: "The centre of a polygon is not at a distance a/2",
          body: "For a triangle the centre is a/2√3 from each side; only for a square is it a/2. The general distance is a/(2 tan(π/n)).",
        },
      ],
    },

    // C3 — arcs and bent wires (reference: the standard pieces)
    {
      kind: "reference" as const,
      slug: "jpmag-arcs",
      name: "Field at the centre of arcs and bent wires",
      intuition:
        "A wire bent into arcs and straight pieces looks hard, but at the centre each piece is one standard result. List the pieces, write each one's size from the table, decide whether it points into or out of the page, and add with signs. A straight piece whose line passes through the point gives nothing at all.",
      definition:
        "- An arc of angle \\(\\theta\\) (in radians) and radius R, at its centre: \\(B = \\dfrac{\\mu_0 I\\theta}{4\\pi R}\\). A full circle (\\(\\theta = 2\\pi\\)) gives \\(\\dfrac{\\mu_0 I}{2R}\\).\n" +
        "- Direction at the centre of an arc: curl the right-hand fingers along the current; the thumb gives the field (anticlockwise on the page: out of the page).\n" +
        "- Straight pieces use the finite-wire formula; a piece pointing at the centre gives zero.\n" +
        "- Two concentric arcs in one closed loop, on the same side, carry current round the centre in opposite senses, so their fields subtract.\n" +
        "- When the fields of the pieces are not all along one line (pieces in different planes), add them as vectors.",
      table: {
        columns: ["Piece of wire", "Field at the point", "For I = 10 A at a distance or radius of 5 cm"],
        rows: [
          { cells: ["Infinite straight wire, point at distance d", "\\(\\dfrac{\\mu_0 I}{2\\pi d}\\)", "\\(40\\ \\mu\\text{T}\\)"] },
          { cells: ["Semi-infinite wire, point on the perpendicular through its end", "\\(\\dfrac{\\mu_0 I}{4\\pi d}\\)", "\\(20\\ \\mu\\text{T}\\)"], noteAmber: "Half of the infinite wire, not the same." },
          { cells: ["Straight wire whose line passes through the point", "Zero", "Zero"] },
          { cells: ["Full circular loop, at its centre", "\\(\\dfrac{\\mu_0 I}{2R}\\)", "\\(40\\pi\\ \\mu\\text{T} \\approx 126\\ \\mu\\text{T}\\)"] },
          { cells: ["Three-quarter circle, at its centre", "\\(\\dfrac{3\\mu_0 I}{8R}\\)", "\\(30\\pi\\ \\mu\\text{T} \\approx 94.2\\ \\mu\\text{T}\\)"] },
          { cells: ["Semicircle, at its centre", "\\(\\dfrac{\\mu_0 I}{4R}\\)", "\\(20\\pi\\ \\mu\\text{T} \\approx 62.8\\ \\mu\\text{T}\\)"] },
          { cells: ["Quarter circle, at its centre", "\\(\\dfrac{\\mu_0 I}{8R}\\)", "\\(10\\pi\\ \\mu\\text{T} \\approx 31.4\\ \\mu\\text{T}\\)"] },
          { cells: ["Arc of angle θ in radians, at its centre", "\\(\\dfrac{\\mu_0 I\\theta}{4\\pi R}\\)", "\\(20\\theta\\ \\mu\\text{T}\\)"] },
        ],
        caption: "Every piece's field at the centre is perpendicular to the plane of the wire, so in a flat shape the pieces add or subtract along one line.",
      },
      selfCheckExample: {
        prompt:
          "A closed loop is made of two concentric semicircles of radii 4 cm and 8 cm, on the same side of their common diameter, joined at both ends by straight pieces lying along that diameter. It carries 6 A. Find the field at the common centre. (\\(\\mu_0 = 4\\pi \\times 10^{-7}\\) T m/A)",
        steps: [
          "The straight pieces lie on lines through the centre, so they give zero.",
          "Going round the loop, the current passes round the centre one way on the small arc and the other way on the large arc, so the two fields subtract.",
          "\\(B = \\dfrac{\\mu_0 I}{4}\\left(\\dfrac{1}{0.04} - \\dfrac{1}{0.08}\\right) = \\pi \\times 10^{-7} \\times 6 \\times 12.5 = 75\\pi \\times 10^{-7} \\approx 2.36 \\times 10^{-5}\\) T, in the direction of the small arc's field.",
        ],
        answer: "\\(75\\pi \\times 10^{-7}\\) T, about \\(23.6\\ \\mu\\text{T}\\)",
      },
      practiceSet: [
        { prompt: "A semicircle of radius 2 cm carries 4 A. Field at its centre? (\\(\\mu_0 = 4\\pi \\times 10^{-7}\\) T m/A)", answer: "\\(2\\pi \\times 10^{-5}\\) T, about \\(62.8\\ \\mu\\text{T}\\)" },
        { prompt: "An arc of radius 10 cm subtends \\(60^{\\circ}\\) at its centre and carries 6 A. Field at the centre? (\\(\\mu_0/4\\pi = 10^{-7}\\) T m/A)", answer: "\\(2\\pi \\times 10^{-6}\\) T, about \\(6.28\\ \\mu\\text{T}\\)" },
        { prompt: "A three-quarter circle of radius 5 cm carries 2 A. Field at its centre? (\\(\\mu_0 = 4\\pi \\times 10^{-7}\\) T m/A)", answer: "\\(6\\pi \\times 10^{-6}\\) T, about \\(18.8\\ \\mu\\text{T}\\)" },
        { prompt: "A long wire is bent at a right angle at point C. What field do the two straight arms give at C itself?", answer: "Zero: C lies on the line of both arms" },
      ],
      pyqExampleId: "916c3d16-3c61-4487-b11c-2aa9b5c734f6", // 2021 Paper 8: hairpin, two semi-infinite wires + semicircle, (μ₀I/4πr)(2 + π)
      traps: [
        {
          title: "A straight piece aimed at the centre gives nothing",
          body: "Radial straight pieces, and straight leads whose line passes through the centre, contribute zero. Leaving them out is correct; giving them μ₀I/4πd is not.",
        },
        {
          title: "The angle of an arc must be in radians",
          body: "B = μ₀Iθ/4πR uses θ in radians. A 90° arc is θ = π/2, giving μ₀I/8R; putting θ = 90 gives a field larger by a factor of about 57.",
        },
        {
          title: "Check the sense of every piece before adding",
          body: "Two arcs, or an arc and a straight lead, can give fields in opposite directions at the centre. Decide into or out of the page for each piece first; adding the sizes alone is the most common wrong option.",
        },
      ],
    },
  ],
};
