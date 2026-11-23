import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_MG_FIELD_NOTE: SubtopicNote = {
  subtopicName: "Magnetic Field due to a Current",
  title: "The Biot-Savart Law and the Field of Wires, Arcs and Loops",
  oneLineDefinition:
    "The Biot-Savart law for the field of a current element, and the fields it gives for a long straight wire, a circular arc, the centre of a coil and a point on the axis of a loop.",
  whyItMatters:
    "19 questions, the largest page of the chapter. Eight were set in board papers: explain the Biot-Savart law (twice in 2024, once with a diagram), derive the field at the centre of a circular arc (2025, 2026) or state it and find the field at the centre of a loop (2025), and three short items: the unit Wb m⁻² (2022), the field 3 cm from a long wire (2022) and the field at the centre of a 200-turn coil (2024). The textbook adds the law applied to a long wire and to the axis of a loop, wires with arcs, two parallel wires and the field on the axis of a loop.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpmg-biot-savart",
      name: "The Biot-Savart law",
      intuition:
        "To find the field of any wire, cut it into tiny pieces and find the field of one piece first. A piece gives more field if it carries more current or is longer, less if the point is farther away, and nothing at all at a point straight along its own line. Then add up the pieces.",
      definition:
        "- **Statement:** the magnetic field \\(dB\\) at a point P due to a current element \\(I\\,dl\\) is directly proportional to the current \\(I\\), to the length \\(dl\\) and to \\(\\sin\\theta\\), and inversely proportional to the square of the distance \\(r\\) of P from the element. \\(\\theta\\) is the angle between \\(d\\vec{l}\\) and \\(\\vec{r}\\).\n" +
        "- So \\(dB = \\dfrac{\\mu_0}{4\\pi}\\dfrac{I\\,dl\\sin\\theta}{r^2}\\). In vector form, \\(d\\vec{B} = \\dfrac{\\mu_0}{4\\pi}\\dfrac{I\\,d\\vec{l} \\times \\vec{r}}{r^3}\\).\n" +
        "- \\(\\mu_0 = 4\\pi \\times 10^{-7}\\) T m/A is the permeability of free space, so \\(\\dfrac{\\mu_0}{4\\pi} = 10^{-7}\\) T m/A.\n" +
        "- **Direction:** \\(d\\vec{B}\\) is perpendicular to the plane containing \\(d\\vec{l}\\) and \\(\\vec{r}\\), along \\(d\\vec{l} \\times \\vec{r}\\).\n" +
        "- \\(dB = 0\\) for a point on the line of the element (\\(\\theta = 0^\\circ\\) or \\(180^\\circ\\)), and is greatest for \\(\\theta = 90^\\circ\\).\n" +
        "- The diagram: a wire with the current marked, a short element \\(dl\\), the line \\(r\\) to P, the angle \\(\\theta\\), and \\(dB\\) at P drawn perpendicular to the page.",
      formula: {
        label: "Biot-Savart law",
        latex: "dB = \\frac{\\mu_0}{4\\pi}\\,\\frac{I\\,dl\\sin\\theta}{r^2}, \\qquad d\\vec{B} = \\frac{\\mu_0}{4\\pi}\\,\\frac{I\\,d\\vec{l} \\times \\vec{r}}{r^3}",
        symbols: [
          { symbol: "\\(I\\,dl\\)", meaning: "current element" },
          { symbol: "\\(r\\)", meaning: "distance of the point from the element" },
          { symbol: "\\(\\theta\\)", meaning: "angle between the element and the line joining it to the point" },
          { symbol: "\\(\\mu_0\\)", meaning: "permeability of free space, 4π × 10⁻⁷ T m/A" },
        ],
      },
      authoredExample: {
        prompt:
          "A short element 1 cm long of a wire carrying 10 A lies at the origin along the \\(+x\\) axis. Find the magnetic field it produces at a point 0.5 m away on the \\(+y\\) axis, and its direction.",
        steps: [
          "Given: \\(I = 10\\) A, \\(dl = 0.01\\) m, \\(r = 0.5\\) m, \\(\\theta = 90^\\circ\\).",
          "Formula: \\(dB = \\dfrac{\\mu_0}{4\\pi}\\dfrac{I\\,dl\\sin\\theta}{r^2}\\).",
          "Substitution: \\(dB = 10^{-7} \\times \\dfrac{10 \\times 0.01 \\times 1}{(0.5)^2} = 4 \\times 10^{-8}\\) T.",
          "Direction: along \\(d\\vec{l} \\times \\vec{r}\\), that is \\(\\hat{i} \\times \\hat{j} = \\hat{k}\\), the \\(+z\\) direction.",
        ],
        answer: "\\(4 \\times 10^{-8}\\) T, along \\(+z\\)",
      },
      selfCheckExample: {
        prompt:
          "A current element 2 cm long carries 5 A. Find the field it produces at a point 20 cm away, if the line joining the element to the point makes 30° with the element.",
        steps: [
          "\\(dB = 10^{-7} \\times \\dfrac{5 \\times 0.02 \\times \\sin 30^\\circ}{(0.2)^2} = 10^{-7} \\times \\dfrac{0.05}{0.04}\\).",
          "\\(dB = 1.25 \\times 10^{-7}\\) T.",
        ],
        answer: "\\(1.25 \\times 10^{-7}\\) T",
      },
      practiceSet: [
        { prompt: "What is the value of \\(\\mu_0/4\\pi\\) in SI units?", answer: "\\(10^{-7}\\) T m/A" },
        { prompt: "At what angle between the element and the line to the point is the field of a current element greatest?", answer: "90°" },
        { prompt: "What field does a current element produce at a point lying along its own line?", answer: "Zero, since \\(\\sin 0^\\circ = 0\\)" },
      ],
      pyqExampleId: "89fb9811-f2ec-4e07-a875-a4a3a5e99ea0",
      traps: [
        {
          title: "A statement with no symbols explained",
          body: "When the board says 'explain', name every symbol in \\(dB = \\frac{\\mu_0}{4\\pi}\\frac{I\\,dl\\sin\\theta}{r^2}\\), give the direction of \\(d\\vec{B}\\), and draw the diagram if asked. The formula alone earns only part of the marks.",
        },
        {
          title: "Mixing \\(r^2\\) and \\(r^3\\) in the vector form",
          body: "With the vector \\(\\vec{r}\\) on top, divide by \\(r^3\\); with the unit vector \\(\\hat{r}\\) on top, divide by \\(r^2\\). Both are the same law; mixing them gives the wrong power.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpmg-straight-wire",
      name: "Field of a long straight wire",
      intuition:
        "The field of a long straight wire goes round it in circles, like rings on water around a stick. It weakens as you move away: twice as far, half the field. The right hand thumb rule gives the sense: thumb along the current, the curled fingers show the field.",
      definition:
        "Derivation outline (from the Biot-Savart law):\n" +
        "- Let P be at perpendicular distance \\(R\\) from the wire. Take an element \\(dl\\) at distance \\(l\\) from the foot of the perpendicular. Then \\(r = \\sqrt{l^2 + R^2}\\) and \\(\\sin\\theta = \\dfrac{R}{\\sqrt{l^2 + R^2}}\\).\n" +
        "- Every element gives \\(d\\vec{B}\\) in the same direction (into the page on one side), so the magnitudes add.\n" +
        "- The two halves of the wire give equal fields: \\(B = 2\\displaystyle\\int_0^\\infty \\dfrac{\\mu_0}{4\\pi}\\dfrac{IR\\,dl}{(l^2 + R^2)^{3/2}} = \\dfrac{\\mu_0 I}{2\\pi R}\\).\n" +
        "- A **semi-infinite** wire (ending at the foot of the perpendicular) gives half of this: \\(B = \\dfrac{\\mu_0 I}{4\\pi R}\\).\n" +
        "- Fields of two wires add as vectors. Check each wire's direction with the thumb rule before adding.",
      formula: {
        label: "Long straight wire",
        latex: "B = \\frac{\\mu_0 I}{2\\pi R} \\ (\\text{infinite}), \\qquad B = \\frac{\\mu_0 I}{4\\pi R} \\ (\\text{semi-infinite})",
        symbols: [
          { symbol: "\\(R\\)", meaning: "perpendicular distance of the point from the wire" },
          { symbol: "\\(I\\)", meaning: "current in the wire" },
        ],
      },
      authoredExample: {
        prompt:
          "Two long parallel wires 10 cm apart carry currents of 5 A each in opposite directions. Find the magnetic field at the point midway between them.",
        steps: [
          "Given: \\(I = 5\\) A for each wire; distance of the midpoint from each wire \\(R = 0.05\\) m.",
          "Field of one wire: \\(B_1 = \\dfrac{\\mu_0 I}{2\\pi R} = \\dfrac{2 \\times 10^{-7} \\times 5}{0.05} = 2 \\times 10^{-5}\\) T.",
          "By the thumb rule, opposite currents give fields in the same direction between the wires, so they add.",
          "\\(B = 2 \\times 2 \\times 10^{-5} = 4 \\times 10^{-5}\\) T.",
        ],
        answer: "\\(4 \\times 10^{-5}\\) T",
      },
      selfCheckExample: {
        prompt: "A long straight wire produces a field of \\(2 \\times 10^{-5}\\) T at a distance of 5 cm. What is the field at 10 cm from it?",
        steps: ["\\(B \\propto \\dfrac{1}{R}\\).", "Doubling the distance halves the field: \\(1 \\times 10^{-5}\\) T."],
        answer: "\\(1 \\times 10^{-5}\\) T",
      },
      practiceSet: [
        { prompt: "A long straight wire carrying a current I starts at a point O and runs off to infinity. Write the field at a point P at distance R from O, on the perpendicular to the wire through O.", answer: "\\(\\mu_0 I/(4\\pi R)\\), half that of an infinite wire" },
        { prompt: "What is the shape of the magnetic field lines round a long straight wire?", answer: "Concentric circles in planes perpendicular to the wire" },
      ],
      pyqExampleId: "d9855cac-e8db-4943-984f-1d4757ca302f",
      traps: [
        {
          title: "Distance left in centimetres",
          body: "\\(\\mu_0/(2\\pi) = 2 \\times 10^{-7}\\) T m/A works only with the distance in metres. Convert before you divide.",
        },
        {
          title: "Adding fields of two wires without checking directions",
          body: "Between two wires, like currents give opposite fields and opposite currents give fields in the same direction. Find each direction with the thumb rule before adding or subtracting.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpmg-arc",
      name: "Field at the centre of a circular arc",
      intuition:
        "Every piece of an arc is the same distance from the centre and at right angles to the line joining it to the centre, so every piece gives the largest possible field and all in the same direction. The field simply grows with the angle the arc covers. A full circle is just an arc of 2π.",
      definition:
        "Derivation outline:\n" +
        "- Take an arc of radius \\(r\\) subtending angle \\(\\theta\\) (in radian) at its centre O, carrying current \\(I\\).\n" +
        "- For every element \\(d\\vec{l}\\), the line to O is perpendicular to it, so \\(\\sin 90^\\circ = 1\\): \\(dB = \\dfrac{\\mu_0}{4\\pi}\\dfrac{I\\,dl}{r^2}\\).\n" +
        "- Every \\(d\\vec{B}\\) is in the same direction (perpendicular to the plane of the arc), so \\(B = \\dfrac{\\mu_0 I}{4\\pi r^2}\\displaystyle\\int dl\\).\n" +
        "- The arc length is \\(r\\theta\\), so \\(B = \\dfrac{\\mu_0 I\\theta}{4\\pi r}\\).\n" +
        "- Full loop (\\(\\theta = 2\\pi\\)): \\(B = \\dfrac{\\mu_0 I}{2r}\\). Semicircle (\\(\\theta = \\pi\\)): \\(B = \\dfrac{\\mu_0 I}{4r}\\).\n" +
        "- A straight lead pointing at the centre gives **no** field there (\\(\\theta = 0^\\circ\\) or \\(180^\\circ\\) for all its elements).\n" +
        "- Direction by the right hand rule: curl the fingers along the current; the thumb gives \\(\\vec{B}\\) at the centre.",
      formula: {
        label: "Circular arc at its centre",
        latex: "B = \\frac{\\mu_0 I\\theta}{4\\pi r}, \\qquad B_{loop} = \\frac{\\mu_0 I}{2r}",
        symbols: [
          { symbol: "\\(\\theta\\)", meaning: "angle the arc subtends at its centre, in radian" },
          { symbol: "\\(r\\)", meaning: "radius of the arc" },
        ],
      },
      authoredExample: {
        prompt: "A wire bent into a quarter of a circle of radius 5 cm carries a current of 10 A. Find the magnetic field at the centre of the arc.",
        steps: [
          "Given: \\(I = 10\\) A, \\(r = 0.05\\) m, \\(\\theta = 90^\\circ = \\dfrac{\\pi}{2}\\) rad.",
          "Formula: \\(B = \\dfrac{\\mu_0 I\\theta}{4\\pi r}\\).",
          "Substitution: \\(B = 10^{-7} \\times \\dfrac{10 \\times 1.571}{0.05}\\).",
          "\\(B = 3.14 \\times 10^{-5}\\) T, perpendicular to the plane of the arc.",
        ],
        answer: "\\(3.14 \\times 10^{-5}\\) T",
      },
      selfCheckExample: {
        prompt: "An arc of radius 10 cm subtends 60° at its centre and carries 6 A. Find the field at its centre.",
        steps: [
          "\\(\\theta = 60^\\circ = \\dfrac{\\pi}{3} = 1.047\\) rad.",
          "\\(B = 10^{-7} \\times \\dfrac{6 \\times 1.047}{0.1} = 6.28 \\times 10^{-6}\\) T.",
        ],
        answer: "\\(6.28 \\times 10^{-6}\\) T",
      },
      practiceSet: [
        { prompt: "Write the field at the centre of a semicircular wire of radius R carrying a current I.", answer: "\\(\\mu_0 I/(4R)\\)" },
        { prompt: "A straight wire runs straight towards the centre of an arc. What field does it give at that centre?", answer: "Zero" },
        { prompt: "Express an arc of 270° in radian.", answer: "\\(3\\pi/2\\) rad" },
      ],
      pyqExampleId: "c3cf66c5-bdc3-46e3-a624-8009c7b87c1f",
      traps: [
        {
          title: "Putting the angle in degrees",
          body: "\\(B = \\mu_0 I\\theta/(4\\pi r)\\) needs \\(\\theta\\) in radian. 90° must be written \\(\\pi/2\\).",
        },
        {
          title: "Counting straight leads that point at the centre",
          body: "In a wire made of an arc and straight pieces, a straight piece whose line passes through the centre adds nothing there. Add only the pieces that do contribute.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpmg-loop-axis",
      name: "Field at the centre and on the axis of a coil",
      intuition:
        "On the axis of a loop, each piece gives a field tilted off the axis, and the piece opposite it tilts the other way, so the sideways parts cancel and only the parts along the axis add up. The field is strongest at the centre and falls off quickly as you move along the axis. Far away, the loop looks like a small bar magnet.",
      definition:
        "- For a point P on the axis at distance \\(z\\) from the centre of a loop of radius \\(R\\): every \\(d\\vec{l}\\) is perpendicular to \\(\\vec{r}\\), and \\(r^2 = R^2 + z^2\\).\n" +
        "- The components \\(dB_{\\perp}\\) perpendicular to the axis cancel in pairs from diametrically opposite elements. The axial parts \\(dB_z = dB\\cos\\theta\\), with \\(\\cos\\theta = R/r\\), all add.\n" +
        "- Result for \\(N\\) turns: \\(B = \\dfrac{\\mu_0 NIR^2}{2(R^2 + z^2)^{3/2}}\\), along the axis.\n" +
        "- At the centre (\\(z = 0\\)): \\(B = \\dfrac{\\mu_0 NI}{2R}\\).\n" +
        "- Far away (\\(z \\gg R\\)): \\(B = \\dfrac{\\mu_0 NIR^2}{2z^3}\\), like the axial field of an electric dipole. So a current loop acts as a magnetic dipole.\n" +
        "- Direction: curl the right hand fingers along the current; the stretched thumb gives \\(\\vec{B}\\) along the axis.",
      formula: {
        label: "Field on the axis of a circular coil",
        latex: "B = \\frac{\\mu_0 NIR^2}{2(R^2 + z^2)^{3/2}}, \\qquad B_{centre} = \\frac{\\mu_0 NI}{2R}",
        symbols: [
          { symbol: "\\(z\\)", meaning: "distance of the point from the centre, along the axis" },
          { symbol: "\\(R\\)", meaning: "radius of the coil" },
          { symbol: "\\(N\\)", meaning: "number of turns" },
        ],
      },
      authoredExample: {
        prompt:
          "A coil of 50 turns and radius 3 cm carries a current of 2 A. Find the magnetic field at a point on its axis 4 cm from the centre.",
        steps: [
          "Given: \\(N = 50\\), \\(R = 0.03\\) m, \\(I = 2\\) A, \\(z = 0.04\\) m.",
          "Formula: \\(B = \\dfrac{\\mu_0 NIR^2}{2(R^2 + z^2)^{3/2}}\\).",
          "\\(R^2 + z^2 = 0.0009 + 0.0016 = 0.0025\\) m², so \\((R^2 + z^2)^{3/2} = 1.25 \\times 10^{-4}\\) m³.",
          "Substitution: \\(B = \\dfrac{4\\pi \\times 10^{-7} \\times 50 \\times 2 \\times 0.0009}{2 \\times 1.25 \\times 10^{-4}} = 4.52 \\times 10^{-4}\\) T, along the axis.",
        ],
        answer: "\\(4.52 \\times 10^{-4}\\) T",
      },
      selfCheckExample: {
        prompt: "A single loop of radius 5 cm carries 1 A. Find the field on its axis 1 m from the centre, treating 1 m as far away.",
        steps: [
          "\\(z \\gg R\\), so \\(B = \\dfrac{\\mu_0 IR^2}{2z^3} = \\dfrac{4\\pi \\times 10^{-7} \\times 1 \\times 0.0025}{2 \\times 1}\\).",
          "\\(B = 1.57 \\times 10^{-9}\\) T.",
        ],
        answer: "\\(1.57 \\times 10^{-9}\\) T",
      },
      practiceSet: [
        { prompt: "How does the field far out on the axis of a current loop depend on the distance z?", answer: "As \\(1/z^3\\)" },
        { prompt: "How is the direction of the field at the centre of a current loop found?", answer: "Curl the right hand fingers along the current; the stretched thumb gives the field" },
        { prompt: "By what factor does the field at the centre of a coil change if the number of turns is doubled and the current halved?", answer: "It is unchanged" },
      ],
      pyqExampleId: "998c46b9-c079-433f-a8a3-6a38b4d7f187",
      traps: [
        {
          title: "Using the centre formula off the centre",
          body: "\\(\\mu_0 NI/(2R)\\) holds only at the centre. At any other point on the axis use the full formula with \\((R^2 + z^2)^{3/2}\\).",
        },
        {
          title: "Forgetting N for a coil",
          body: "A closely wound coil of \\(N\\) turns gives \\(N\\) times the field of one turn. Leaving out \\(N\\) is the commonest slip in a centre-of-coil calculation.",
        },
      ],
    },
  ],
};
