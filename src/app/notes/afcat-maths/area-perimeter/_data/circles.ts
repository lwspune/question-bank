import type { SubtopicNote } from "@/app/notes/_types";

export const AF_AP_CIRCLES_NOTE: SubtopicNote = {
  subtopicName: "Circles and Sectors",
  title: "Circles, Rings, Sectors and Grazing",
  oneLineDefinition:
    "Circumference 2πr and area πr², and the fraction θ/360 of each for an arc or a sector; rings, wheels, clock hands and tethered animals are those formulas in a story.",
  whyItMatters:
    "This is the chapter's biggest page and only one question on it is HARD. The marks go on small slips: a radius read as a diameter, a semicircle's perimeter without its straight edge, a ring worked as the square of the difference, or π taken as 3.14 when the options were worked with 22/7.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afap-circle",
      name: "Circumference and area",
      intuition:
        "The distance round any circle is a little over three times its diameter: that ratio is π. The area is π times the square of the radius. Know one of radius, diameter, circumference or area and the other three follow.",
      definition:
        "- **Circumference** \\(C = 2\\pi r = \\pi d\\). **Area** \\(A = \\pi r^2\\).\n" +
        "- From the circumference: \\(r = \\dfrac{C}{2\\pi}\\). From the area: \\(r = \\sqrt{\\dfrac{A}{\\pi}}\\).\n" +
        "- **A wheel** covers one circumference per turn: distance = turns × \\(2\\pi r\\).\n" +
        "- **A wire bent** into a new shape keeps its length: a circle's circumference becomes a square's perimeter, or the other way round.\n" +
        "- Use the value of π the question states. With 22/7, radii that are multiples of 7 come out whole.",
      formula: {
        label: "Circle",
        latex: "C = 2\\pi r = \\pi d,\\qquad A = \\pi r^2",
      },
      authoredExample: {
        prompt: "A circle has a circumference of 88 cm. Find its radius and its area. (Use \\(\\pi = \\tfrac{22}{7}\\).)",
        steps: [
          "\\(2 \\times \\tfrac{22}{7} \\times r = 88\\), so \\(r = 88 \\times \\tfrac{7}{44} = 14\\) cm.",
          "Area \\(= \\tfrac{22}{7} \\times 14^2 = 616\\) cm².",
        ],
        answer: "14 cm; 616 cm².",
      },
      selfCheckExample: {
        prompt: "A wire bent into a square of side 33 cm is reshaped into a circle. Find the area of the circle. (Use \\(\\pi = \\tfrac{22}{7}\\).)",
        steps: [
          "The wire is \\(4 \\times 33 = 132\\) cm, so \\(2\\pi r = 132\\) and \\(r = 21\\) cm.",
          "Area \\(= \\tfrac{22}{7} \\times 441 = 1386\\) cm².",
        ],
        answer: "1386 cm².",
      },
      practiceSet: [
        { prompt: "Find the circumference and area of a circle of radius 10.5 cm. (Use \\(\\pi = \\tfrac{22}{7}\\).)", answer: "\\(66\\) cm; \\(346.5\\) cm²" },
        { prompt: "A wheel of diameter 42 cm rolls 660 m. How many turns does it make? (Use \\(\\pi = \\tfrac{22}{7}\\).)", answer: "\\(500\\)", method: "One turn is 132 cm." },
        { prompt: "A circle has an area of 38.5 cm². Find its radius. (Use \\(\\pi = \\tfrac{22}{7}\\).)", answer: "\\(3.5\\) cm" },
        {
          prompt: "A circular floor of radius 7 m is to be painted, and one litre covers 7 m². How many litres are needed? (Use \\(\\pi = \\tfrac{22}{7}\\).)",
          answer: "\\(22\\) litres",
          method: "The floor is 154 m².",
        },
      ],
      pyqExampleId: "286cfda7-ac8a-4375-adb3-4836c7215134",
      traps: [
        {
          title: "Radius or diameter",
          body: "A circumference of 88 gives a radius of 14 and a diameter of 28. Options usually carry both; read which one the question asks for.",
        },
        {
          title: "Convert the distance first",
          body: "A wheel's circumference is in cm and the road is often in km or m. 660 m is 66,000 cm; dividing 660 by 132 gives 5 turns instead of 500.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afap-ring",
      name: "Rings, tracks and two circles",
      intuition:
        "A ring is a big circle with a small one taken out of its middle. Its area is the difference of the two areas, and its width is the difference of the two radii. Two circles that touch have their centres a sum of radii apart, or a difference.",
      definition:
        "- **Ring** with outer radius \\(R\\), inner \\(r\\): area \\(\\pi(R^2 - r^2) = \\pi(R + r)(R - r)\\).\n" +
        "- **A track of width \\(w\\)** round a circle of radius \\(r\\): \\(R = r + w\\), and the outer diameter is the inner diameter plus \\(2w\\).\n" +
        "- **Touching externally:** distance between centres \\(= r_1 + r_2\\). **Internally:** \\(R - r\\).\n" +
        "- Given the sum of two radii and the sum of their squares: \\(2r_1 r_2 = (r_1 + r_2)^2 - (r_1^2 + r_2^2)\\).",
      formula: {
        label: "Area of a ring",
        latex: "A = \\pi(R^2 - r^2) = \\pi(R + r)(R - r)",
      },
      authoredExample: {
        prompt: "A circular park of radius 35 m has a track 7 m wide all round it, outside. Find the area of the track. (Use \\(\\pi = \\tfrac{22}{7}\\).)",
        steps: [
          "The outer radius is \\(35 + 7 = 42\\) m.",
          "Area \\(= \\tfrac{22}{7}(42 + 35)(42 - 35) = \\tfrac{22}{7} \\times 77 \\times 7 = 1694\\) m².",
        ],
        answer: "1694 m².",
      },
      selfCheckExample: {
        prompt: "Two circles touch externally. Their centres are 12 cm apart and their areas add up to \\(74\\pi\\) cm². Find the radii.",
        steps: [
          "\\(r_1 + r_2 = 12\\) and \\(r_1^2 + r_2^2 = 74\\).",
          "\\(2r_1 r_2 = 144 - 74 = 70\\), so \\(r_1 r_2 = 35\\): the radii are 7 cm and 5 cm.",
        ],
        answer: "7 cm and 5 cm.",
      },
      practiceSet: [
        { prompt: "Find the area of the ring between circles of radii 10 cm and 4 cm. (Use \\(\\pi = 3.14\\).)", answer: "\\(263.76\\) cm²" },
        {
          prompt: "The inner edge of a circular track is 88 m round and the track is 7 m wide. Find the diameter of its outer edge. (Use \\(\\pi = \\tfrac{22}{7}\\).)",
          answer: "\\(42\\) m",
        },
        { prompt: "Find the area of the ring between circles of radii 25 cm and 24 cm. (Use \\(\\pi = \\tfrac{22}{7}\\).)", answer: "\\(154\\) cm²", method: "\\(\\tfrac{22}{7} \\times 49 \\times 1\\)." },
        { prompt: "Circles of radii 9 cm and 4 cm touch internally. How far apart are their centres?", answer: "\\(5\\) cm" },
      ],
      pyqExampleId: "41b5a02d-528c-4183-b303-a7914e89fbf1",
      traps: [
        {
          title: "Difference of squares, not square of the difference",
          body: "For radii 42 and 35 the ring is \\(\\pi(42^2 - 35^2)\\), which is 1694 with 22/7. Squaring the width, \\(\\pi \\times 7^2 = 154\\), is far too small.",
        },
        {
          title: "Width adds to the radius",
          body: "A 7 m track round a circle of radius 14 m makes the outer radius 21 m and the outer diameter 42 m. Adding 7 to the diameter gives 35, which is wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afap-sector",
      name: "Semicircles, arcs, sectors and clock hands",
      intuition:
        "A sector is a slice of the circle, like a slice of a round cake. If its angle is θ, it is \\(\\tfrac{\\theta}{360}\\) of the whole, so its arc is that fraction of the circumference and its area that fraction of the area. A semicircle is the 180° slice; a quadrant the 90° one.",
      definition:
        "- **Arc** \\(= \\dfrac{\\theta}{360} \\times 2\\pi r\\). **Sector area** \\(= \\dfrac{\\theta}{360} \\times \\pi r^2 = \\tfrac12 \\times \\text{arc} \\times r\\).\n" +
        "- **Perimeter of a sector** = arc + \\(2r\\). For a semicircle that is \\(\\pi r + 2r\\); its area is \\(\\tfrac12 \\pi r^2\\).\n" +
        "- **Clock hands:** the minute hand turns 6° a minute and sweeps a sector whose radius is its length. The hour hand turns half a degree a minute.\n" +
        "- A sector of a ring (between two radii of the same angle) is the big sector less the small one.",
      formula: {
        label: "Arc and sector",
        latex: "\\text{arc} = \\dfrac{\\theta}{360} \\times 2\\pi r,\\qquad \\text{sector} = \\dfrac{\\theta}{360} \\times \\pi r^2",
      },
      authoredExample: {
        prompt: "A sector of a circle of radius 21 cm has an angle of 120°. Find its arc, area and perimeter. (Use \\(\\pi = \\tfrac{22}{7}\\).)",
        steps: [
          "120° is a third of the circle. The circumference is \\(2 \\times \\tfrac{22}{7} \\times 21 = 132\\), so the arc is 44 cm.",
          "The full area is \\(\\tfrac{22}{7} \\times 441 = 1386\\), so the sector is 462 cm².",
          "Perimeter \\(= 44 + 2 \\times 21 = 86\\) cm.",
        ],
        answer: "44 cm; 462 cm²; 86 cm.",
      },
      selfCheckExample: {
        prompt: "Find the area and the perimeter of a semicircle of radius 14 cm. (Use \\(\\pi = \\tfrac{22}{7}\\).)",
        steps: [
          "Area \\(= \\tfrac12 \\times \\tfrac{22}{7} \\times 196 = 308\\) cm².",
          "Perimeter \\(= \\tfrac{22}{7} \\times 14 + 28 = 44 + 28 = 72\\) cm.",
        ],
        answer: "308 cm²; 72 cm.",
      },
      practiceSet: [
        { prompt: "Find the length of a 45° arc of a circle of radius 28 cm. (Use \\(\\pi = \\tfrac{22}{7}\\).)", answer: "\\(22\\) cm" },
        { prompt: "A sector of radius 10 cm has an arc of 22 cm. Find its area.", answer: "\\(110\\) cm²", method: "\\(\\tfrac12 \\times 22 \\times 10\\)." },
        {
          prompt: "A clock's minute hand is 7 cm long. Find the area it sweeps in 20 minutes. (Use \\(\\pi = \\tfrac{22}{7}\\).)",
          answer: "\\(\\dfrac{154}{3}\\) cm²",
          method: "20 minutes is 120°, a third of the circle.",
        },
        { prompt: "Find the perimeter of a quadrant of a circle of radius 14 cm. (Use \\(\\pi = \\tfrac{22}{7}\\).)", answer: "\\(50\\) cm" },
      ],
      pyqExampleId: "9b8b983f-b72f-41db-9f63-62e395d64441",
      traps: [
        {
          title: "A semicircle's edge includes its diameter",
          body: "The perimeter of a semicircle of radius 14 is \\(44 + 28 = 72\\). The curved part alone, 44, is the arc, not the perimeter.",
        },
        {
          title: "Minutes into degrees",
          body: "In 20 minutes the minute hand turns \\(20 \\times 6° = 120°\\), a third of the circle. Using \\(\\tfrac{20}{360}\\) of the circle treats minutes as degrees.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afap-grazing",
      name: "Animals tied with a rope",
      intuition:
        "A tethered animal can reach every point within a rope's length of the peg, so it grazes a circle. Walls and fences cut that circle down to the sector that lies on the animal's side of them.",
      definition:
        "- **Tied to a pole in the open:** a full circle, radius = rope.\n" +
        "- **Tied at a corner inside a field** whose angle there is θ: a sector of angle θ.\n" +
        "- **Tied at a corner outside a building or a fenced triangle** with angle θ there: the animal cannot go in, so it grazes a sector of \\(360° - \\theta\\).\n" +
        "- Animals at the three corners of a triangle with equal ropes graze sectors whose angles add to 180°: half a circle in all. At the four corners of a rectangle the quadrants make one full circle.\n" +
        "- These hold only while the rope is shorter than the walls beside the peg. A longer rope wraps round the next corner and adds more.",
      formula: {
        label: "Grazed area",
        latex: "\\text{area} = \\dfrac{\\theta}{360} \\times \\pi\\,(\\text{rope})^2",
      },
      authoredExample: {
        prompt: "A goat is tied at one corner of a square field of side 20 m with a rope 14 m long. What area can it graze, and what percentage of the field is that? (Use \\(\\pi = \\tfrac{22}{7}\\).)",
        steps: [
          "The corner of a square is 90°, so the goat grazes a quadrant of radius 14 m.",
          "\\(\\tfrac14 \\times \\tfrac{22}{7} \\times 196 = 154\\) m².",
          "The field is 400 m², so the share is \\(\\tfrac{154}{400} = 38.5\\%\\).",
        ],
        answer: "154 m²; 38.5%.",
      },
      selfCheckExample: {
        prompt: "A cow is tied with a 7 m rope at one corner, outside, of a rectangular shed whose walls are longer than 7 m. It cannot enter the shed. What area can it graze? (Use \\(\\pi = \\tfrac{22}{7}\\).)",
        steps: ["The shed takes the 90° corner, leaving \\(360° - 90° = 270°\\).", "\\(\\tfrac34 \\times \\tfrac{22}{7} \\times 49 = 115.5\\) m²."],
        answer: "115.5 m².",
      },
      practiceSet: [
        { prompt: "A horse is tied to a pole in an open field with a 21 m rope. What area can it graze? (Use \\(\\pi = \\tfrac{22}{7}\\).)", answer: "\\(1386\\) m²" },
        {
          prompt: "Four goats are tied at the four corners of a square field of side 28 m, each with a 7 m rope. What area of the field is left ungrazed? (Use \\(\\pi = \\tfrac{22}{7}\\).)",
          answer: "\\(630\\) m²",
          method: "Four quadrants make one circle of 154 m².",
        },
        { prompt: "A calf is tied with a 21 m rope at a corner of a field where the fences meet at 45°. What area can it graze inside the field? (Use \\(\\pi = \\tfrac{22}{7}\\).)", answer: "\\(173.25\\) m²" },
      ],
      pyqExampleId: "ea50fb46-a59e-4792-b8af-e4f466974af2",
      traps: [
        {
          title: "Only the angle at the peg",
          body: "At the corner of a square field the goat grazes a quadrant, \\(\\tfrac14\\) of the circle. Taking the whole circle counts grass on the far side of the fence.",
        },
        {
          title: "Check the rope against the walls",
          body: "The sector rule needs a rope shorter than the sides beside the peg. If the rope is longer than a side, the animal walks round that corner and grazes an extra sector there.",
        },
      ],
    },
  ],
};
