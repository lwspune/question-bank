import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_M2_ARCS_NOTE: SubtopicNote = {
  subtopicName: "Arc Length and Sector Perimeter",
  title: "Arc Length and Sector Perimeter",
  oneLineDefinition:
    "An arc is the same fraction of the circumference as its angle is of 360°, and a sector's perimeter is that arc plus two radii.",
  whyItMatters:
    "Nineteen questions in the bank, fifteen EASY and four MODERATE; ten come from the 2024 shifts and four from 2025. The angle fraction learnt here is the same one the sector-area page uses, and radians, which thirteen questions from the 2025 shifts use, are introduced on this page.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscm2ar-arc",
      name: "Arc length as a fraction of the circumference",
      intuition:
        "Cut a round cake into pieces at the centre. A piece with a 90° corner carries a quarter of the cake's rim, because 90° is a quarter of the full 360°. Every arc works the same way: its share of the rim equals its angle's share of 360°.",
      definition:
        "- An **arc** is a piece of the circle's boundary. Its **central angle** \\(\\theta\\) is the angle it makes at the centre.\n" +
        "- Arc length \\(l = \\frac{\\theta}{360^\\circ} \\times 2\\pi r\\).\n" +
        "- **Fractions worth knowing:** \\(30^\\circ\\) is \\(\\frac{1}{12}\\), \\(45^\\circ\\) is \\(\\frac{1}{8}\\), \\(60^\\circ\\) is \\(\\frac{1}{6}\\), \\(72^\\circ\\) is \\(\\frac{1}{5}\\), \\(90^\\circ\\) is \\(\\frac{1}{4}\\), \\(120^\\circ\\) is \\(\\frac{1}{3}\\), \\(180^\\circ\\) is \\(\\frac{1}{2}\\).\n" +
        "- **Working back:** the whole circumference is \\(\\frac{360^\\circ}{\\theta} \\times l\\). Then \\(r = \\frac{C}{2\\pi}\\), and the circle's area \\(\\pi r^2\\) follows.\n" +
        "- A **chord equal to the radius** makes an equilateral triangle with the two radii, so its arc has a \\(60^\\circ\\) angle.\n" +
        "- The **minor arc** uses \\(\\theta\\); the **major arc** is the rest, \\(\\frac{360^\\circ - \\theta}{360^\\circ}\\) of the circumference. Together they make the whole circle.\n" +
        "- **Fast route:** find the fraction first, then take that part of \\(2\\pi r\\). With \\(\\theta = 40^\\circ\\) the arc is \\(\\frac{1}{9}\\) of the circumference, nothing more. Always safe.",
      formula: {
        label: "Arc length",
        latex: "l = \\frac{\\theta}{360^\\circ} \\times 2\\pi r \\qquad C = \\frac{360^\\circ}{\\theta} \\times l",
        symbols: [
          { symbol: "\\(\\theta\\)", meaning: "central angle in degrees" },
          { symbol: "l", meaning: "arc length" },
        ],
      },
      authoredExample: {
        prompt: "An arc makes an angle of 40° at the centre of a circle of radius 63 cm. Find its length. (Take \\(\\pi = \\frac{22}{7}\\).)",
        steps: [
          "Fraction of the circle: \\(\\frac{40}{360} = \\frac{1}{9}\\).",
          "Circumference \\(= 2 \\times \\frac{22}{7} \\times 63 = 396\\) cm.",
          "Arc \\(= \\frac{396}{9} = 44\\) cm.",
        ],
        answer: "44 cm",
      },
      selfCheckExample: {
        prompt: "An arc 33 cm long makes an angle of 45° at the centre of a circle. Find the radius. (Take \\(\\pi = \\frac{22}{7}\\).)",
        steps: [
          "\\(45^\\circ\\) is \\(\\frac{1}{8}\\) of the circle, so the circumference is \\(8 \\times 33 = 264\\) cm.",
          "\\(r = \\frac{264}{2 \\times \\frac{22}{7}} = \\frac{264 \\times 7}{44} = 42\\) cm.",
        ],
        answer: "42 cm",
      },
      practiceSet: [
        { prompt: "An arc makes an angle of 90° at the centre of a circle of radius 14 cm. What is its length? (Take \\(\\pi = \\frac{22}{7}\\).)", answer: "22 cm" },
        { prompt: "An arc is one third of its circle's circumference. What angle does it make at the centre?", answer: "120°" },
        { prompt: "In a circle of radius 9 cm, a chord is 9 cm long. What angle does it make at the centre?", answer: "60°" },
        { prompt: "An arc that makes 60° at the centre of a circle is 11 cm long. What is the circle's circumference?", answer: "66 cm" },
      ],
      pyqExampleId: "af8a9734-bd65-47b3-ba28-85339460b93b",
      traps: [
        {
          title: "Doubling a diameter that is already a diameter",
          body: "If the stem gives the diameter, the circumference is \\(\\pi d\\). Writing \\(2\\pi d\\) doubles the arc.",
        },
        {
          title: "Taking the minor arc for the major one",
          body: "A chord cuts the circle into two arcs. The smaller uses \\(\\theta\\); the larger uses \\(360^\\circ - \\theta\\). Read which one the stem asks for.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm2ar-perimeter",
      name: "Perimeter of a sector",
      intuition:
        "A sector is a slice of a circle, like a slice of pizza. Walk round its edge and you cover the curved crust and the two straight cut edges. The cut edges are radii.",
      definition:
        "- A **sector** is the region between two radii and the arc joining them.\n" +
        "- **Perimeter of a sector** \\(=\\) arc \\(+ 2r\\).\n" +
        "- A **semicircle's** perimeter is \\(\\pi r + 2r\\).\n" +
        "- When a piece is cut away from a round object, the piece left over is also a sector: its angle is \\(360^\\circ\\) minus the cut angle, and its perimeter still includes both straight cut edges.\n" +
        "- **Fast route:** with \\(\\pi = \\frac{22}{7}\\) and a radius that is a multiple of 7, the circumference is a whole number, so find it first and take the fraction. Safe when the angle's fraction divides it evenly; otherwise keep the fraction to the end.",
      formula: {
        label: "Perimeter of a sector",
        latex: "P = 2r + \\frac{\\theta}{360^\\circ} \\times 2\\pi r \\qquad P_{\\text{semicircle}} = \\pi r + 2r",
      },
      authoredExample: {
        prompt: "Find the perimeter of a sector of radius 42 cm and angle 30°. (Take \\(\\pi = \\frac{22}{7}\\).)",
        steps: [
          "Circumference \\(= 2 \\times \\frac{22}{7} \\times 42 = 264\\) cm. \\(30^\\circ\\) is \\(\\frac{1}{12}\\) of the circle.",
          "Arc \\(= \\frac{264}{12} = 22\\) cm.",
          "Perimeter \\(= 22 + 42 + 42 = 106\\) cm.",
        ],
        answer: "106 cm",
      },
      selfCheckExample: {
        prompt: "Find the perimeter of a semicircular plate of radius 14 cm. (Take \\(\\pi = \\frac{22}{7}\\).)",
        steps: ["Curved edge \\(= \\pi r = \\frac{22}{7} \\times 14 = 44\\) cm.", "Straight edge \\(= 2r = 28\\) cm.", "Perimeter \\(= 44 + 28 = 72\\) cm."],
        answer: "72 cm",
      },
      practiceSet: [
        { prompt: "A sector has radius 7 cm and angle 90°. What is its perimeter? (Take \\(\\pi = \\frac{22}{7}\\).)", answer: "25 cm", method: "Arc \\(= 11\\), plus \\(14\\)." },
        { prompt: "A sector of radius 10 cm has a perimeter of 30 cm. What is the length of its arc?", answer: "10 cm" },
        { prompt: "A sector has radius 28 cm and angle 45°. What is its perimeter? (Take \\(\\pi = \\frac{22}{7}\\).)", answer: "78 cm", method: "Arc \\(= \\frac{176}{8} = 22\\), plus \\(56\\)." },
        { prompt: "One quarter of a round cake of radius 14 cm is cut out. What is the perimeter of the quarter that is cut out? (Take \\(\\pi = \\frac{22}{7}\\).)", answer: "50 cm", method: "Arc \\(= 22\\), plus \\(28\\)." },
      ],
      pyqExampleId: "72e30282-b2e8-4ba8-b182-7ebc09ae121b",
      traps: [
        {
          title: "Leaving out the radii",
          body: "The arc alone is not the perimeter of a sector. Add both straight edges, \\(2r\\).",
        },
        {
          title: "Counting the radius once",
          body: "A sector has TWO straight edges, one along each radius. A semicircle's straight edge is the diameter, which is also \\(2r\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm2ar-radian",
      name: "Radians: arc length equals radius times angle",
      intuition:
        "Lay the radius along the rim of the circle. The angle at the centre it covers is one radian. An arc twice as long as the radius covers two radians, so in radians an arc is simply radius times angle.",
      definition:
        "- **One radian** is the central angle whose arc equals the radius. A full turn is \\(2\\pi\\) radians, so \\(\\pi\\) radians \\(= 180^\\circ\\), and one radian is about \\(57.3^\\circ\\).\n" +
        "- **Converting:** degrees \\(=\\) radians \\(\\times \\frac{180^\\circ}{\\pi}\\); radians \\(=\\) degrees \\(\\times \\frac{\\pi}{180^\\circ}\\).\n" +
        "- Common angles: \\(\\frac{\\pi}{6} = 30^\\circ\\), \\(\\frac{\\pi}{4} = 45^\\circ\\), \\(\\frac{\\pi}{3} = 60^\\circ\\), \\(\\frac{\\pi}{2} = 90^\\circ\\), \\(\\frac{2\\pi}{3} = 120^\\circ\\), \\(\\frac{3\\pi}{4} = 135^\\circ\\), \\(\\pi = 180^\\circ\\).\n" +
        "- **With the angle in radians:** arc \\(l = r\\theta\\), so \\(\\theta = \\frac{l}{r}\\) and \\(r = \\frac{l}{\\theta}\\).\n" +
        "- The straight line joining the arc's ends, the **chord**, is \\(2r\\sin\\frac{\\theta}{2}\\), always a little shorter than the arc.\n" +
        "- **Fast route:** an angle with \\(\\pi\\) in it: replace \\(\\pi\\) by \\(180^\\circ\\) to read it in degrees. An angle given as a plain number (2, 1.5) is in radians: use \\(l = r\\theta\\) directly, never the 360 fraction.",
      formula: {
        label: "Radian measure",
        latex: "l = r\\theta \\qquad \\pi \\text{ radians} = 180^\\circ \\qquad \\theta_{\\text{rad}} = \\theta^\\circ \\times \\frac{\\pi}{180^\\circ}",
        symbols: [{ symbol: "\\(\\theta\\)", meaning: "central angle in radians in the first formula" }],
      },
      authoredExample: {
        prompt: "An arc 15 cm long is cut from a circle of radius 6 cm. Find the angle at the centre in radians and in degrees.",
        steps: [
          "\\(\\theta = \\frac{l}{r} = \\frac{15}{6} = 2.5\\) radians.",
          "In degrees: \\(2.5 \\times \\frac{180^\\circ}{\\pi} = \\frac{450^\\circ}{\\pi} \\approx 143.2^\\circ\\).",
        ],
        answer: "2.5 radians, about 143.2°",
      },
      selfCheckExample: {
        prompt: "Change \\(\\frac{5\\pi}{6}\\) radians to degrees, and find the arc this angle cuts off in a circle of radius 12 cm.",
        steps: ["\\(\\frac{5 \\times 180^\\circ}{6} = 150^\\circ\\).", "Arc \\(= r\\theta = 12 \\times \\frac{5\\pi}{6} = 10\\pi\\) cm."],
        answer: "150°, \\(10\\pi\\) cm",
      },
      practiceSet: [
        { prompt: "Change \\(\\frac{2\\pi}{3}\\) radians to degrees.", answer: "120°" },
        { prompt: "Change 135° to radians.", answer: "\\(\\frac{3\\pi}{4}\\)" },
        { prompt: "A circle has a radius of 4 cm. What length of arc does a central angle of 1.5 radians cut off?", answer: "6 cm" },
        { prompt: "An arc 18 cm long makes an angle of 3 radians at the centre. What is the radius?", answer: "6 cm" },
      ],
      pyqExampleId: "b448f576-7930-4ba8-893c-4354479f52e5",
      traps: [
        {
          title: "Putting degrees into l = rθ",
          body: "The rule \\(l = r\\theta\\) needs \\(\\theta\\) in radians. With \\(60^\\circ\\), first write \\(\\frac{\\pi}{3}\\); otherwise the arc comes out 60 times the radius.",
        },
        {
          title: "Taking the chord for the arc",
          body: "\\(2r\\sin\\frac{\\theta}{2}\\) is the straight chord between the arc's ends. The curved arc is \\(r\\theta\\), which is always longer.",
        },
      ],
    },
  ],
};
