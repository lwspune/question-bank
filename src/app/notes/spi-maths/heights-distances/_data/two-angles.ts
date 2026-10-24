import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_HD_TWO_ANGLES_NOTE: SubtopicNote = {
  subtopicName: "Two Angles of Elevation",
  title: "Two Angles of Elevation",
  oneLineDefinition:
    "When a height is seen at two angles, from two points or as two heights stacked on each other, write one tan equation for each triangle and solve the two together.",
  whyItMatters:
    "Fifteen questions in the bank and the hardest page in the chapter: ten MODERATE and five HARD, and the 2022 paper's question is here. Seven use complementary angles from two points, six have an observer who walks or a shadow that changes, and two stack one height on another.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spihdtw-complementary",
      name: "Complementary angles from two points: h = √(ab)",
      intuition:
        "Two points on one line with the foot of a tower see its top at angles that add to \\(90^\\circ\\). One triangle gives \\(\\tan\\theta\\), the other gives \\(\\cot\\theta\\), and since \\(\\tan\\theta \\times \\cot\\theta = 1\\), multiplying the two equations removes the angle altogether.",
      definition:
        "- From distance \\(a\\): \\(\\tan\\theta = \\dfrac{h}{a}\\). From distance \\(b\\): \\(\\tan(90^\\circ - \\theta) = \\cot\\theta = \\dfrac{h}{b}\\).\n" +
        "- Multiply: \\(1 = \\dfrac{h^2}{ab}\\), so \\(h = \\sqrt{ab}\\).\n" +
        "- \\(30^\\circ\\) and \\(60^\\circ\\) are complementary, so the same result holds for them.\n" +
        "- With **two different heights** seen from one point, the same multiplication works: \\(\\dfrac{h_1}{d_1} \\times \\dfrac{h_2}{d_2} = 1\\).\n" +
        "- The nearer point sees the larger angle.",
      formula: {
        label: "Height from complementary angles",
        latex: "h = \\sqrt{ab}",
        symbols: [
          { symbol: "a, b", meaning: "distances of the two points from the foot of the tower" },
          { symbol: "h", meaning: "height of the tower" },
        ],
      },
      authoredExample: {
        prompt: "From two points 4 m and 9 m from the foot of a tower, in one straight line with it, the angles of elevation of its top are complementary. Find the height of the tower.",
        steps: [
          "\\(\\tan\\theta = \\dfrac{h}{4}\\) and \\(\\cot\\theta = \\dfrac{h}{9}\\).",
          "Multiply: \\(1 = \\dfrac{h^2}{36}\\), so \\(h^2 = 36\\).",
          "\\(h = 6\\) m.",
        ],
        answer: "6 m",
      },
      selfCheckExample: {
        prompt: "A pole and a tree stand 24 m apart, and the tree is twice as tall as the pole. From the point midway between their feet, the angles of elevation of their tops are complementary. Find the height of the pole.",
        steps: [
          "The midpoint is 12 m from each. Let the pole be h, so the tree is 2h.",
          "\\(\\tan\\theta = \\dfrac{h}{12}\\) and \\(\\cot\\theta = \\dfrac{2h}{12}\\). Multiply: \\(\\dfrac{2h^2}{144} = 1\\).",
          "\\(h^2 = 72\\), so \\(h = 6\\sqrt{2}\\) m.",
        ],
        answer: "\\(6\\sqrt{2}\\) m",
      },
      practiceSet: [
        {
          prompt: "The angles of elevation of a tower from points 3 m and 27 m from its foot, in one line with it, are complementary. What is its height?",
          answer: "\\(\\sqrt{81} = 9\\) m",
        },
        {
          prompt: "A tower is seen at \\(60^\\circ\\) from a point 10 m from its foot and at \\(30^\\circ\\) from a point 30 m from its foot. What is its height?",
          answer: "\\(\\sqrt{300} = 10\\sqrt{3}\\) m",
        },
        {
          prompt: "A tower is 12 m high. One point is 8 m from its foot. How far from the foot, on the same line, is the point that sees the top at the complementary angle?",
          answer: "\\(\\frac{12^2}{8} = 18\\) m",
        },
      ],
      pyqExampleId: "a0676602-d105-4c51-a00d-00eb8338bd09",
      traps: [
        {
          title: "Adding or multiplying the distances",
          body:
            "The height is the square root of the product of the two distances, not their sum and not their product. With distances 4 m and 9 m it is 6 m, not 13 m or 36 m.",
        },
        {
          title: "Giving the farther point the bigger angle",
          body:
            "The closer you stand to a tower, the steeper you look up. The point at the smaller distance sees the larger angle, so match \\(60^\\circ\\) with the nearer point.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spihdtw-walk",
      name: "An observer who walks, or a shadow that changes",
      intuition:
        "One height, two triangles that share it. The observer walks a known distance d between the two sightings, or the sun moves and the shadow shortens by d. Write the ground distance from each point in terms of h; the difference of the two is d.",
      definition:
        "- From each point, ground distance \\(= h\\cot(\\text{angle})\\).\n" +
        "- The walk is the **difference** of the two distances: \\(d = h\\cot\\alpha - h\\cot\\beta\\), with \\(\\beta\\) the larger angle.\n" +
        "- So \\(h = \\dfrac{d}{\\cot\\alpha - \\cot\\beta}\\).\n" +
        "- A shadow that changes is the same picture with the sun moving instead of the observer.\n" +
        "- **Speed:** distance moved over time. A distance in km over a time in seconds becomes km/h when multiplied by 3600.",
      formula: {
        label: "Height from two angles and the walk between them",
        latex: "h = \\frac{d}{\\cot\\alpha - \\cot\\beta}",
        symbols: [
          { symbol: "d", meaning: "distance walked towards the foot (or change in shadow length)" },
          { symbol: "α", meaning: "the smaller angle, from the farther point" },
          { symbol: "β", meaning: "the larger angle, from the nearer point" },
        ],
      },
      authoredExample: {
        prompt: "A man sees the top of a tower at an angle of elevation of \\(30^\\circ\\). He walks 20 m straight towards it and now sees the top at \\(60^\\circ\\). Find the height of the tower.",
        steps: [
          "Let the second point be x from the foot. Then \\(h = x\\tan 60^\\circ = x\\sqrt{3}\\).",
          "From the first point: \\(h = (x + 20)\\tan 30^\\circ = \\dfrac{x + 20}{\\sqrt{3}}\\).",
          "So \\(x\\sqrt{3} \\times \\sqrt{3} = x + 20\\): \\(3x = x + 20\\), \\(x = 10\\).",
          "\\(h = 10\\sqrt{3}\\) m, about 17.3 m.",
        ],
        answer: "\\(10\\sqrt{3}\\) m",
      },
      selfCheckExample: {
        prompt: "The sun's elevation rises from \\(30^\\circ\\) to \\(60^\\circ\\). By how much does the shadow of a 15 m tower shorten?",
        steps: [
          "At \\(30^\\circ\\) the shadow is \\(15\\cot 30^\\circ = 15\\sqrt{3}\\) m.",
          "At \\(60^\\circ\\) it is \\(15\\cot 60^\\circ = \\dfrac{15}{\\sqrt{3}} = 5\\sqrt{3}\\) m.",
          "It shortens by \\(15\\sqrt{3} - 5\\sqrt{3} = 10\\sqrt{3}\\) m.",
        ],
        answer: "\\(10\\sqrt{3}\\) m",
      },
      practiceSet: [
        {
          prompt: "An observer walks straight towards a 60 m tower, and the angle of elevation of its top changes from \\(30^\\circ\\) to \\(60^\\circ\\). How far did the observer walk?",
          answer: "\\(60\\sqrt{3} - 20\\sqrt{3} = 40\\sqrt{3}\\) m",
        },
        {
          prompt: "A plane flies level at a height of 1 km. Seen from a point on the ground, its angle of elevation falls from \\(60^\\circ\\) to \\(30^\\circ\\). How far did it fly?",
          answer: "\\(\\sqrt{3} - \\frac{1}{\\sqrt{3}} = \\frac{2}{\\sqrt{3}}\\) km",
        },
        {
          prompt: "A tower is seen at \\(60^\\circ\\) from a point 10 m from its foot. How much farther along the same line must you walk away to see it at \\(30^\\circ\\)?",
          answer: "20 m (the height is \\(10\\sqrt{3}\\) m, so the new distance is \\(10\\sqrt{3} \\times \\sqrt{3} = 30\\) m)",
        },
      ],
      pyqExampleId: "ffeb8bdc-4d75-4084-860e-94604fbd0892",
      traps: [
        {
          title: "Using the walk as a whole distance",
          body:
            "The distance walked is the gap between the two points, not either point's distance from the foot. Give each point its own distance, x and \\(x + d\\).",
        },
        {
          title: "Subtracting tan instead of cot",
          body:
            "The ground distances are \\(h\\cot\\alpha\\) and \\(h\\cot\\beta\\), so the formula has \\(\\cot\\alpha - \\cot\\beta\\) below the line. A denominator of \\(\\tan\\beta - \\tan\\alpha\\) is a printed wrong option.",
        },
        {
          title: "Leaving a speed in km per second",
          body:
            "2 km in 10 seconds is \\(2 \\times \\frac{3600}{10} = 720\\) km/h. Multiply by 3600 and divide by the seconds; dividing by 3600 gives a speed far too small.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spihdtw-stacked",
      name: "A flagstaff on a tower, a cloud and its reflection",
      intuition:
        "When one height sits on top of another, both tops are seen from the same ground point, so both triangles share the same ground distance. Find that distance from the triangle you can solve, then use it in the other.",
      definition:
        "- **Flagstaff on a tower:** the top of the flagstaff is at height tower \\(+\\) flagstaff above the ground. Use that total in the second tan equation.\n" +
        "- The shared ground distance comes from the first sighting: \\(d = \\dfrac{\\text{tower}}{\\tan(\\text{first angle})}\\).\n" +
        "- **Reflection in a lake:** a still lake works as a mirror, so the image of a cloud C metres above the water is C metres below it. From a point h metres above the lake, the cloud is \\(C - h\\) above eye level and its image is \\(C + h\\) below.",
      formula: {
        label: "Reflection in still water",
        latex: "\\text{rise to the cloud} = C - h, \\qquad \\text{drop to its image} = C + h",
      },
      authoredExample: {
        prompt: "A flagstaff stands on a building 20 m high. From a point on the ground, the angles of elevation of the bottom and the top of the flagstaff are \\(45^\\circ\\) and \\(60^\\circ\\). Find the length of the flagstaff.",
        steps: [
          "Bottom of the flagstaff (top of the building) at \\(45^\\circ\\): the point is 20 m from the foot.",
          "Top of the flagstaff: \\(\\tan 60^\\circ = \\dfrac{20 + f}{20}\\), so \\(20 + f = 20\\sqrt{3}\\).",
          "\\(f = 20(\\sqrt{3} - 1)\\) m, about 14.6 m.",
        ],
        answer: "\\(20(\\sqrt{3} - 1)\\) m",
      },
      selfCheckExample: {
        prompt: "A statue 5 m tall stands on a pedestal. From a point on the ground, the top of the pedestal is seen at \\(30^\\circ\\) and the top of the statue at \\(45^\\circ\\). Find the height of the pedestal.",
        steps: [
          "Let the pedestal be p. Then the point is \\(p\\sqrt{3}\\) from the foot.",
          "\\(\\tan 45^\\circ = \\dfrac{p + 5}{p\\sqrt{3}} = 1\\), so \\(p\\sqrt{3} = p + 5\\).",
          "\\(p = \\dfrac{5}{\\sqrt{3} - 1} = \\dfrac{5(\\sqrt{3} + 1)}{2}\\) m, about 6.83 m.",
        ],
        answer: "\\(\\frac{5(\\sqrt{3} + 1)}{2}\\) m",
      },
      practiceSet: [
        {
          prompt: "A tower 10 m high has a flag pole on top. From a point 10 m from the foot of the tower, the top of the pole is seen at \\(60^\\circ\\). How long is the pole?",
          answer: "\\(10\\sqrt{3} - 10 = 10(\\sqrt{3} - 1)\\) m",
        },
        {
          prompt: "A bird hovers 40 m above a still lake. How far below the surface does its reflection appear?",
          answer: "40 m",
        },
        {
          prompt: "A man stands on a jetty 5 m above a lake and looks at a cloud 65 m above the water. How far below his eye level is the cloud's reflection?",
          answer: "\\(65 + 5 = 70\\) m",
        },
      ],
      pyqExampleId: "02806c6c-8773-44cf-80e2-87c5506c8258",
      traps: [
        {
          title: "Using the flagstaff alone for its top",
          body:
            "The top of a flagstaff on a tower is the tower plus the flagstaff above the ground. Putting only the flagstaff's length over the distance gives an angle that is far too small.",
        },
        {
          title: "Measuring the reflection from the observer",
          body:
            "The image is as far below the water as the cloud is above it. From a point above the lake, the drop to the image is the cloud's height plus the observer's height, not minus.",
        },
      ],
    },
  ],
};
