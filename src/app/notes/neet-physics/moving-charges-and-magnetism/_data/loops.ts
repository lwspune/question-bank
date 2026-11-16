import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_MC_LOOPS_NOTE: SubtopicNote = {
  subtopicName: "Biot-Savart Law and Circular Loops",
  title: "Biot-Savart Law and Circular Loops",
  oneLineDefinition:
    "Biot-Savart's law for the field of a small current element, and what it gives for a circular coil, an arc and a straight wire that ends.",
  whyItMatters:
    "Four NEET questions from 2022 to 2026: two statements on Biot-Savart's law (2022), the field at the centre of a 100-turn coil (2024), a semicircle joined to two long straight wires (2023) and a loop whose two halves carry unequal currents (Re-NEET 2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphmc-biot-savart",
      name: "Biot-Savart's law",
      intuition:
        "Break a wire into tiny pieces. Each small piece of current makes its own small field, and the field of the whole wire is the sum of these pieces. Biot-Savart's law tells you the field of one piece: it falls off as the square of the distance, like Coulomb's law, but it points sideways, at right angles to both the piece and the line joining it to the point.",
      definition:
        "- Field of a current element \\(I\\,d\\vec{l}\\) at a point at position \\(\\vec{r}\\) from it: \\(d\\vec{B} = \\dfrac{\\mu_0}{4\\pi}\\,\\dfrac{I\\,d\\vec{l} \\times \\vec{r}}{r^{3}}\\).\n" +
        "- Size: \\(dB = \\dfrac{\\mu_0}{4\\pi}\\,\\dfrac{I\\,dl\\,\\sin\\theta}{r^{2}}\\), with \\(\\theta\\) the angle between \\(d\\vec{l}\\) and \\(\\vec{r}\\). Here \\(\\mu_0 = 4\\pi \\times 10^{-7}\\) T m/A.\n" +
        "- \\(d\\vec{B}\\) is perpendicular to both \\(d\\vec{l}\\) and \\(\\vec{r}\\). It is zero at points on the line of the element itself.\n" +
        "- **Like Coulomb's law:** both fields are long range and fall as \\(\\dfrac{1}{r^{2}}\\).\n" +
        "- **Unlike Coulomb's law:** the electric field comes from a scalar source (the charge q) and points along \\(\\vec{r}\\); the magnetic field comes from a vector source \\(I\\,d\\vec{l}\\) and points across \\(\\vec{r}\\), and it depends on the angle \\(\\theta\\).",
      formula: {
        label: "Biot-Savart law",
        latex: "d\\vec{B} = \\frac{\\mu_0}{4\\pi}\\,\\frac{I\\,d\\vec{l} \\times \\vec{r}}{r^{3}}, \\qquad dB = \\frac{\\mu_0}{4\\pi}\\,\\frac{I\\,dl\\,\\sin\\theta}{r^{2}}",
        symbols: [
          { symbol: "\\(I\\,d\\vec{l}\\)", meaning: "a small current element" },
          { symbol: "\\(\\vec{r}\\)", meaning: "position of the point from the element" },
          { symbol: "\\(\\mu_0\\)", meaning: "permeability of free space" },
        ],
      },
      authoredExample: {
        prompt:
          "An element \\(d\\vec{l} = 1\\) cm along \\(\\hat{i}\\) carries 10 A. Find the field it makes at a point 0.5 m away along \\(\\hat{j}\\).",
        steps: [
          "\\(d\\vec{l}\\) and \\(\\vec{r}\\) are at 90°, so \\(\\sin\\theta = 1\\).",
          "\\(dB = 10^{-7} \\times \\dfrac{10 \\times 10^{-2}}{(0.5)^{2}} = 10^{-7} \\times \\dfrac{0.1}{0.25} = 4 \\times 10^{-8}\\) T.",
          "Direction: \\(\\hat{i} \\times \\hat{j} = \\hat{k}\\).",
        ],
        answer: "\\(4 \\times 10^{-8}\\) T along \\(+\\hat{k}\\)",
      },
      selfCheckExample: {
        prompt:
          "A small current element lies along the x-axis at the origin. What field does it make at a point on the x-axis 1 m away?",
        steps: [
          "On the element's own line, \\(d\\vec{l}\\) and \\(\\vec{r}\\) are parallel, so \\(\\theta = 0\\).",
          "\\(\\sin 0 = 0\\), so \\(dB = 0\\).",
        ],
        answer: "Zero",
      },
      practiceSet: [
        { prompt: "What is the value of \\(\\mu_0\\) in SI units?", answer: "\\(4\\pi \\times 10^{-7}\\) T m/A" },
        { prompt: "In Biot-Savart's law, how does the field of a current element depend on the distance r from it?", answer: "As \\(1/r^{2}\\)" },
        { prompt: "What is the direction of the field of a current element compared with the element and the line to the point?", answer: "Perpendicular to both" },
        { prompt: "At what angle between the element and the line to the point is the field of a current element largest?", answer: "90°" },
      ],
      pyqExampleId: "6cefba21-5f3e-43d8-82d6-c90c2972bd23",
      traps: [
        {
          title: "No field along the element's own line",
          body: "Biot-Savart's law has \\(\\sin\\theta\\) in it, so a point lying on the line of a current element gets no field from that element at all.",
        },
        {
          title: "The magnetic source is a vector",
          body: "In Coulomb's law the source q is a scalar; in Biot-Savart's law the source \\(I\\,d\\vec{l}\\) is a vector. Swapping the two is a common wrong statement.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphmc-loop",
      name: "Field of a circular coil, an arc and a straight wire",
      intuition:
        "At the centre of a circular loop every small piece of wire is the same distance away and pushes the field the same way, so the pieces simply add. A part of a circle gives the same share of that field as its share of the angle. N turns wound tightly together act like one loop carrying N times the current.",
      definition:
        "- Centre of a coil of N turns, radius R: \\(B = \\dfrac{\\mu_0 N I}{2R}\\).\n" +
        "- Centre of an arc that subtends angle \\(\\theta\\) (in radians): \\(B = \\dfrac{\\mu_0 I \\theta}{4\\pi R}\\). A semicircle (\\(\\theta = \\pi\\)) gives \\(\\dfrac{\\mu_0 I}{4R}\\).\n" +
        "- On the axis at distance x from the centre: \\(B = \\dfrac{\\mu_0 I R^{2}}{2(x^{2} + R^{2})^{3/2}}\\).\n" +
        "- Direction: curl the fingers of the right hand along the current; the thumb gives the field at the centre.\n" +
        "- A long straight wire gives \\(B = \\dfrac{\\mu_0 I}{2\\pi d}\\) at distance d. A straight wire that starts at a point and runs to infinity gives half of that, \\(\\dfrac{\\mu_0 I}{4\\pi d}\\), at a point a distance d from it on the perpendicular through its end, since the two halves of an infinite wire contribute equally.\n" +
        "- Fields of several parts at one point add as vectors: parts that push the same way add, parts that push opposite ways subtract.",
      formula: {
        label: "Circular coil and arc",
        latex: "B_{\\text{centre}} = \\frac{\\mu_0 N I}{2R}, \\qquad B_{\\text{arc}} = \\frac{\\mu_0 I \\theta}{4\\pi R}, \\qquad B_{\\text{axis}} = \\frac{\\mu_0 I R^{2}}{2(x^{2} + R^{2})^{3/2}}",
        symbols: [
          { symbol: "\\(N\\)", meaning: "number of turns" },
          { symbol: "\\(\\theta\\)", meaning: "angle the arc subtends at the centre, in radians" },
          { symbol: "\\(x\\)", meaning: "distance along the axis from the centre" },
        ],
      },
      authoredExample: {
        prompt:
          "A wire bent into a semicircle of radius \\(\\pi\\) cm carries 5 A. Find the field at the centre of the semicircle.",
        steps: [
          "For a semicircle, \\(B = \\dfrac{\\mu_0 I}{4R}\\).",
          "\\(B = \\dfrac{4\\pi \\times 10^{-7} \\times 5}{4 \\times \\pi \\times 10^{-2}} = \\dfrac{5 \\times 10^{-7}}{10^{-2}} = 5 \\times 10^{-5}\\) T.",
        ],
        answer: "\\(5 \\times 10^{-5}\\) T",
      },
      selfCheckExample: {
        prompt:
          "A loop of radius R carries a current. How does the field on its axis at a distance R from the centre compare with the field at the centre?",
        steps: [
          "\\(\\dfrac{B_{\\text{axis}}}{B_{\\text{centre}}} = \\dfrac{R^{3}}{(x^{2} + R^{2})^{3/2}}\\).",
          "With \\(x = R\\): \\(\\dfrac{R^{3}}{(2R^{2})^{3/2}} = \\dfrac{1}{2\\sqrt{2}}\\).",
        ],
        answer: "\\(\\dfrac{1}{2\\sqrt{2}}\\) of the centre value, about 0.35 times",
      },
      practiceSet: [
        { prompt: "The current in a circular coil is reversed. What happens to the field at its centre?", answer: "Same size, opposite direction" },
        { prompt: "Write the field at the centre of an arc of radius R that subtends angle θ (in radians) and carries current I.", answer: "\\(B = \\dfrac{\\mu_0 I \\theta}{4\\pi R}\\)" },
        { prompt: "The radius of a single-turn loop is doubled with the same current. What happens to the field at its centre?", answer: "It halves" },
        { prompt: "A straight wire runs from a point P to infinity and carries current I. What field does it make at a point a distance d from P, on the perpendicular to the wire through P?", answer: "\\(\\dfrac{\\mu_0 I}{4\\pi d}\\)" },
      ],
      pyqExampleId: "548541f3-42fe-4727-93f9-cd7f4ad30184",
      traps: [
        {
          title: "Do not forget the number of turns",
          body: "A tightly wound coil of N turns gives N times the field of one turn: \\(B = \\dfrac{\\mu_0 N I}{2R}\\).",
        },
        {
          title: "The arc formula needs radians",
          body: "In \\(B = \\dfrac{\\mu_0 I \\theta}{4\\pi R}\\), put a quarter circle as \\(\\dfrac{\\pi}{2}\\), not 90.",
        },
        {
          title: "A semi-infinite wire gives half",
          body: "A straight wire running from a point to infinity gives \\(\\dfrac{\\mu_0 I}{4\\pi d}\\) beside its end, half the \\(\\dfrac{\\mu_0 I}{2\\pi d}\\) of a wire infinite both ways.",
        },
        {
          title: "Two halves of a loop can oppose",
          body: "When current enters a loop at one point and leaves at the opposite point, the two halves carry current round the centre in opposite senses. Their fields at the centre subtract, so with equal currents they cancel.",
        },
      ],
    },
  ],
};
