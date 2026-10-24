import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_M2_CIRCLES_NOTE: SubtopicNote = {
  subtopicName: "Circumference, Wheels and Rings",
  title: "Circumference, Wheels and Rings",
  oneLineDefinition:
    "A circle's boundary is 2πr long and it encloses πr²; a wheel moves one circumference per turn, and a ring is the difference of two circles.",
  whyItMatters:
    "Twenty-five questions in the bank, twenty-two EASY and three MODERATE, nineteen of them from the 2025 shifts. Circumference and area are the base for the arc and sector pages that follow, and the ring questions all reduce to one difference of squares.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscm2ci-circumference",
      name: "Circumference, wheel revolutions and fencing a circle",
      intuition:
        "Roll a wheel through one full turn and it lays its whole rim on the road. So the distance per turn is the circumference, and counting turns is just dividing a distance by that one length.",
      definition:
        "- **Circumference** \\(C = 2\\pi r = \\pi d\\). For every circle, \\(\\frac{C}{d} = \\pi \\approx 3.14\\).\n" +
        "- Use \\(\\pi = \\frac{22}{7}\\) when the radius is a multiple of 7, and \\(3.14\\) otherwise, unless the stem says which.\n" +
        "- **Revolutions** of a wheel \\(=\\) distance covered \\(\\div\\) circumference. Change both to the same unit first.\n" +
        "- **Fencing cost** \\(=\\) circumference \\(\\times\\) rate per metre; turned round, circumference \\(=\\) cost \\(\\div\\) rate.\n" +
        "- **Part of a turn** covers the same part of the circumference: a quarter turn covers \\(\\frac{1}{4}C\\), and a minute hand moves half its circle in 30 minutes.\n" +
        "- \\(C\\) is proportional to \\(r\\): circumferences, radii and diameters are all in the same ratio.",
      formula: {
        label: "Circumference and revolutions",
        latex: "C = 2\\pi r = \\pi d \\qquad N = \\frac{\\text{distance}}{C}",
        symbols: [
          { symbol: "r, d", meaning: "radius and diameter" },
          { symbol: "N", meaning: "number of revolutions" },
        ],
      },
      authoredExample: {
        prompt: "A wheel of radius 35 cm rolls 1.1 km along a road. How many revolutions does it make? (Take \\(\\pi = \\frac{22}{7}\\).)",
        steps: [
          "Circumference \\(= 2 \\times \\frac{22}{7} \\times 35 = 220\\) cm.",
          "Distance \\(= 1.1\\ \\text{km} = 110000\\) cm.",
          "Revolutions \\(= \\frac{110000}{220} = 500\\).",
        ],
        answer: "500",
      },
      selfCheckExample: {
        prompt: "A circular track has a diameter of 42 m. How far does a runner go in 3 complete rounds? (Take \\(\\pi = \\frac{22}{7}\\).)",
        steps: ["One round \\(= \\pi d = \\frac{22}{7} \\times 42 = 132\\) m.", "Three rounds \\(= 3 \\times 132 = 396\\) m."],
        answer: "396 m",
      },
      practiceSet: [
        { prompt: "What is the circumference of a circle of radius 21 cm? (Take \\(\\pi = \\frac{22}{7}\\).)", answer: "132 cm" },
        { prompt: "The circumferences of two circles are in the ratio 4 : 7. What is the ratio of their radii?", answer: "4 : 7" },
        { prompt: "A clock's minute hand is 7 cm long. How far does its tip travel in 15 minutes? (Take \\(\\pi = \\frac{22}{7}\\).)", answer: "11 cm", method: "A quarter of \\(2 \\times \\frac{22}{7} \\times 7 = 44\\)." },
        { prompt: "A circle has a circumference of 88 cm. What is its diameter? (Take \\(\\pi = \\frac{22}{7}\\).)", answer: "28 cm" },
      ],
      pyqExampleId: "3acac9ab-2963-4b1d-9e3e-0d0a21d810f4",
      traps: [
        {
          title: "A whole-number ratio for circumference to diameter",
          body: "Circumference divided by diameter is \\(\\pi\\) for every circle, a little over 3. A ratio such as \\(3 : 5\\) would make the circumference shorter than the diameter, which no circle can have.",
        },
        {
          title: "Dividing kilometres by centimetres",
          body: "For revolutions, put the distance and the circumference in the same unit. A speed in km/h and a radius in cm must both become cm (and per minute, if revolutions per minute are asked).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm2ci-area",
      name: "Area of a circle and how it scales with the radius",
      intuition:
        "A circle is a shape that keeps its form as it grows, so the scaling rule from triangles applies: area goes as the square of the radius. Double the radius and the area is four times as large.",
      definition:
        "- **Area** \\(A = \\pi r^2\\). Part of a circle (a quarter left, \\(90\\%\\) painted) is that part of \\(\\pi r^2\\).\n" +
        "- Area ratio \\(= (\\text{radius ratio})^2 = (\\text{circumference ratio})^2\\).\n" +
        "- A radius down \\(10\\%\\) makes the area \\(0.81\\) of the old, \\(19\\%\\) less.\n" +
        "- **One circle equal to two:** if its area equals the sum of circles of radii \\(r_1\\) and \\(r_2\\), then \\(R^2 = r_1^2 + r_2^2\\). The \\(\\pi\\) cancels, so a Pythagorean triple gives \\(R\\) at once (6, 8 give 10).\n" +
        "- **Same boundary, different shape:** a wire of length \\(L\\) bent into a circle encloses \\(\\frac{L^2}{4\\pi}\\); bent into a square it encloses \\(\\frac{L^2}{16}\\). The circle wins by the factor \\(\\frac{4}{\\pi} \\approx 1.27\\).",
      formula: {
        label: "Area of a circle",
        latex: "A = \\pi r^2 \\qquad \\frac{A_2}{A_1} = \\left(\\frac{r_2}{r_1}\\right)^2 \\qquad R^2 = r_1^2 + r_2^2",
        symbols: [{ symbol: "R", meaning: "radius of the circle whose area is the sum of the other two" }],
      },
      authoredExample: {
        prompt: "The radius of a circular plate is increased from 7 cm to 21 cm. Find the new area, and how many times the old area it is. (Take \\(\\pi = \\frac{22}{7}\\).)",
        steps: [
          "Old area \\(= \\frac{22}{7} \\times 49 = 154\\ \\text{cm}^2\\). New area \\(= \\frac{22}{7} \\times 441 = 1386\\ \\text{cm}^2\\).",
          "\\(\\frac{1386}{154} = 9\\).",
          "Fast route: the radius is 3 times as long, so the area is \\(3^2 = 9\\) times as large.",
        ],
        answer: "\\(1386\\ \\text{cm}^2\\), 9 times",
      },
      selfCheckExample: {
        prompt: "Find the radius of a circle whose area equals the sum of the areas of two circles of radii 6 cm and 8 cm.",
        steps: ["\\(\\pi R^2 = \\pi(6^2 + 8^2) = 100\\pi\\).", "\\(R = 10\\) cm."],
        answer: "10 cm",
      },
      practiceSet: [
        { prompt: "What is the area of a circle of radius 3.5 cm? (Take \\(\\pi = \\frac{22}{7}\\).)", answer: "\\(38.5\\ \\text{cm}^2\\)" },
        { prompt: "The radius of a circle is doubled. How many times its old area is the new area?", answer: "4 times" },
        { prompt: "The radius of a circle is increased by 40%. By what percentage does its area increase?", answer: "96%" },
        {
          prompt: "A wire 88 cm long is bent into a circle. What area does it enclose? (Take \\(\\pi = \\frac{22}{7}\\).)",
          answer: "\\(616\\ \\text{cm}^2\\)",
          method: "\\(2\\pi r = 88\\) gives \\(r = 14\\).",
        },
      ],
      pyqExampleId: "b6078eed-efa4-4941-82da-95ca4daa7b2f",
      traps: [
        {
          title: "Using a circumference ratio as an area ratio",
          body: "Circumferences in the ratio \\(3 : 5\\) mean radii \\(3 : 5\\) and areas \\(9 : 25\\). Square the length ratio before using it for area.",
        },
        {
          title: "Adding radii to add areas",
          body: "A circle with the area of two circles of radii 8 and 15 has \\(R = \\sqrt{64 + 225} = 17\\), not \\(8 + 15 = 23\\). Radii add only when circumferences are added.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm2ci-ring",
      name: "Area of a ring, a circular track or a path round a circle",
      intuition:
        "A ring is a big circle with a small circle taken out of its middle. Its area is the big area minus the small one, and writing that difference as a product makes the arithmetic short.",
      definition:
        "- Ring with outer radius \\(R\\) and inner radius \\(r\\): area \\(= \\pi(R^2 - r^2) = \\pi(R - r)(R + r)\\). The width is \\(R - r\\).\n" +
        "- **Path outside** a circle of radius \\(r\\): \\(R = r + w\\). **Path inside** the edge of a circle of radius \\(R\\): \\(r = R - w\\).\n" +
        "- **Fast route:** \\(\\pi \\times\\) width \\(\\times\\) (sum of radii). For \\(r = 20\\), \\(w = 2.5\\): \\(\\pi \\times 2.5 \\times 42.5\\). Always safe; it is the same difference of squares.\n" +
        "- **Chord of the outer circle touching the inner one:** the radius to the touching point is perpendicular to the chord and halves it, so \\(R^2 - r^2 = \\left(\\frac{c}{2}\\right)^2\\) and the ring's area is \\(\\pi\\left(\\frac{c}{2}\\right)^2\\), with no radii needed.\n" +
        "- **Ratios:** with \\(R : r = 3 : 2\\), areas are \\(9 : 4\\), so ring : inner circle \\(= 5 : 4\\).",
      formula: {
        label: "Area of a ring",
        latex: "A = \\pi(R^2 - r^2) = \\pi(R - r)(R + r) \\qquad A = \\pi\\left(\\frac{c}{2}\\right)^2",
        symbols: [
          { symbol: "R, r", meaning: "outer and inner radii" },
          { symbol: "c", meaning: "chord of the outer circle that touches the inner circle" },
        ],
      },
      authoredExample: {
        prompt: "A circular pond of radius 21 m has a path 3.5 m wide around it. Find the area of the path. (Take \\(\\pi = \\frac{22}{7}\\).)",
        steps: [
          "Outer radius \\(R = 21 + 3.5 = 24.5\\) m.",
          "\\(R^2 - r^2 = (24.5 - 21)(24.5 + 21) = 3.5 \\times 45.5 = 159.25\\).",
          "Area \\(= \\frac{22}{7} \\times 159.25 = 500.5\\ \\text{m}^2\\).",
        ],
        answer: "\\(500.5\\ \\text{m}^2\\)",
      },
      selfCheckExample: {
        prompt: "Two circles with the same centre have radii 13 cm and 5 cm. A chord of the larger circle touches the smaller one. Find the length of the chord.",
        steps: ["Half the chord \\(= \\sqrt{13^2 - 5^2} = \\sqrt{144} = 12\\) cm.", "Chord \\(= 24\\) cm."],
        answer: "24 cm",
      },
      practiceSet: [
        { prompt: "A ring has an outer radius of 9 cm and an inner radius of 5 cm. What is its area in terms of π?", answer: "\\(56\\pi\\ \\text{cm}^2\\)" },
        { prompt: "A ring has an outer radius of 15 cm and an inner radius of 12 cm. What percentage of the full outer circle is the ring?", answer: "36%", method: "\\(\\frac{225 - 144}{225} = \\frac{81}{225}\\)." },
        { prompt: "A circular park has a radius of 20 m, and a path 2 m wide runs round the inside of its edge. What is the area of the path in terms of π?", answer: "\\(76\\pi\\ \\text{m}^2\\)", method: "\\(20^2 - 18^2 = 76\\)." },
        { prompt: "A chord 16 cm long of the larger of two circles with the same centre touches the smaller circle. What is the area between the circles in terms of π?", answer: "\\(64\\pi\\ \\text{cm}^2\\)" },
      ],
      pyqExampleId: "651a11c0-7432-4367-a7e1-df8a578278b1",
      traps: [
        {
          title: "Squaring the width",
          body: "A path 2 m wide round a circle of radius 10 m has area \\(\\pi(12^2 - 10^2) = 44\\pi\\), not \\(\\pi \\times 2^2\\). The width is a difference of radii, not a radius.",
        },
        {
          title: "Swapping inner and outer radii",
          body: "The outer radius is always the larger. For a path outside, add the width to the circle's radius; for a path inside, subtract it.",
        },
      ],
    },
  ],
};
