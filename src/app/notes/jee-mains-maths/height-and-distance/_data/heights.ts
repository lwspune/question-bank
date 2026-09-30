import type { SubtopicNote } from "@/app/notes/_types";

export const HEIGHTS_HD_NOTE: SubtopicNote = {
  subtopicName: "Heights and Distances",
  title: "Heights and Distances",
  oneLineDefinition:
    "Finding heights and distances from angles of elevation and depression, using right triangles and the tangent of each angle.",
  whyItMatters:
    "Fifteen PYQs, all multiple choice, from 2021 to 2023. Six sight a tower or a moving object from two points; five have one part of a pole or tower subtending an angle at a point; four spread the observers across a horizontal plane, north and west of a tower or around a park. Three ideas cover the page.",
  concepts: [
    // C1 — two sightings
    {
      kind: "formula" as const,
      slug: "jhd-two-sightings",
      name: "Two angles of elevation",
      intuition:
        "Every sighting is a right triangle: height over horizontal distance is the tangent of the angle. With two sightings of the same height, write one equation for each and eliminate the unknown distance. For a moving object, the distance covered divided by the time gives its speed.",
      definition:
        "- Angle of elevation \\(\\theta\\), height \\(h\\), distance \\(d\\): \\(h=d\\tan\\theta\\).\n" +
        "- The angle of depression from the top equals the angle of elevation from below.\n" +
        "- \\(\\tan15^\\circ=2-\\sqrt3\\), \\(\\tan75^\\circ=2+\\sqrt3\\), \\(\\tan\\frac\\pi8=\\sqrt2-1\\).",
      formula: {
        label: "Height from a sighting",
        latex: "h=d\\tan\\theta",
      },
      authoredExample: {
        prompt: "From two points 40 m apart in line with a tower, the angles of elevation of its top are \\(30^\\circ\\) and \\(60^\\circ\\). Find its height.",
        steps: [
          "\\(h=d\\sqrt3\\) from the near point and \\(h=\\frac{d+40}{\\sqrt3}\\) from the far one.",
          "\\(3d=d+40\\), so \\(d=20\\).",
        ],
        answer: "\\(20\\sqrt3\\) m.",
      },
      selfCheckExample: {
        prompt: "From the top of a 50 m cliff, the angle of depression of a boat is \\(45^\\circ\\). How far is the boat from the foot of the cliff?",
        steps: [
          "\\(d=\\frac{50}{\\tan45^\\circ}\\).",
        ],
        answer: "\\(50\\) m.",
      },
      practiceSet: [
        { prompt: "\\(h\\) if \\(d=10\\) and \\(\\theta=60^\\circ\\)?", answer: "\\(10\\sqrt3\\)" },
        { prompt: "\\(d\\) if \\(h=30\\) and \\(\\theta=30^\\circ\\)?", answer: "\\(30\\sqrt3\\)" },
        { prompt: "\\(\\tan75^\\circ\\)?", answer: "\\(2+\\sqrt3\\)" },
        { prompt: "72 km/h in m/s?", answer: "\\(20\\)" },
      ],
      pyqExampleId: "d45a5c81-2d2d-4f73-83aa-7067c83e8c04", // 2022 — two poles seen from the midpoint of their feet
      traps: [
        {
          title: "Depression is measured from the horizontal",
          body: "The angle of depression is between the horizontal line at the observer's eye and the line of sight, not between the line of sight and the vertical wall.",
        },
      ],
    },

    // C2 — angle subtended by a part
    {
      kind: "formula" as const,
      slug: "jhd-subtended",
      name: "The angle subtended by part of a tower",
      intuition:
        "When part of a pole subtends an angle at a point, the angle is a difference of two elevations: the elevation of the top minus the elevation of the mark. Take the tangent of that difference with the subtraction formula, or add the known angles, as in \\(60^\\circ+15^\\circ=75^\\circ\\).",
      definition:
        "- Angle subtended by the part between heights \\(h_1<h_2\\): \\(\\beta-\\alpha\\), with \\(\\tan\\alpha=\\frac{h_1}d\\), \\(\\tan\\beta=\\frac{h_2}d\\).\n" +
        "- \\(\\tan(\\beta-\\alpha)=\\frac{\\tan\\beta-\\tan\\alpha}{1+\\tan\\beta\\tan\\alpha}\\).\n" +
        "- Equal angles subtended by two parts: the double-angle formula.",
      formula: {
        label: "Difference of elevations",
        latex: "\\tan(\\beta-\\alpha)=\\frac{\\tan\\beta-\\tan\\alpha}{1+\\tan\\beta\\tan\\alpha}",
      },
      authoredExample: {
        prompt: "A 10 m flagpole stands on a 10 m building. From a point 10 m from the base, what angle does the flagpole subtend?",
        steps: [
          "The top is at \\(\\tan^{-1}2\\), the roof at \\(45^\\circ\\).",
          "\\(\\tan(\\beta-\\alpha)=\\frac{2-1}{1+2}\\).",
        ],
        answer: "\\(\\tan^{-1}\\frac13\\).",
      },
      selfCheckExample: {
        prompt: "The top of a tower is seen at \\(60^\\circ\\) from a point 12 m away. What is the tower's height?",
        steps: [
          "\\(h=12\\tan60^\\circ\\).",
        ],
        answer: "\\(12\\sqrt3\\) m.",
      },
      practiceSet: [
        { prompt: "\\(\\tan(60^\\circ-45^\\circ)\\)?", answer: "\\(2-\\sqrt3\\)" },
        { prompt: "Elevations \\(30^\\circ\\) and \\(60^\\circ\\): angle subtended?", answer: "\\(30^\\circ\\)" },
        { prompt: "\\(\\tan2\\alpha\\) if \\(\\tan\\alpha=\\frac13\\)?", answer: "\\(\\frac34\\)" },
        { prompt: "Mark at \\(h_1\\), top at \\(h_2\\): which angle is larger?", answer: "The top's elevation" },
      ],
      pyqExampleId: "7b95f738-2144-4e14-ac47-f251cd8fdd3f", // 2022 — a pole subtends 30 degrees at the top of a tower
      traps: [
        {
          title: "Subtended is not elevation",
          body: "The angle a part subtends is the difference of two elevations, not the elevation of its top. Add or subtract the angles before taking a tangent.",
        },
      ],
    },

    // C3 — observers on the ground plane
    {
      kind: "formula" as const,
      slug: "jhd-ground-plane",
      name: "Observers spread over the ground",
      intuition:
        "When observers stand north, south or west of a tower, their distances from the foot are sides of a right triangle on the ground. Find each distance from the height and its angle, then use Pythagoras in the horizontal plane. Equal angles of elevation from several points mean equal distances from the foot, so the foot is a circumcentre.",
      definition:
        "- Each observer: distance from the foot \\(=h\\cot\\theta\\).\n" +
        "- Perpendicular directions (north and west): the distance between observers is \\(\\sqrt{d_1^2+d_2^2}\\).\n" +
        "- Equal elevations from \\(A,B,C\\): the foot is the circumcentre, so \\(h=R\\tan\\theta\\).",
      formula: {
        label: "Pythagoras on the ground",
        latex: "d_{12}=\\sqrt{(h\\cot\\theta_1)^2+(h\\cot\\theta_2)^2}",
      },
      authoredExample: {
        prompt: "A 12 m tower is seen at \\(45^\\circ\\) from a point due east and at \\(60^\\circ\\) from a point due north. How far apart are the two points?",
        steps: [
          "Distances \\(12\\) and \\(12\\cot60^\\circ=4\\sqrt3\\).",
          "\\(\\sqrt{144+48}\\).",
        ],
        answer: "\\(8\\sqrt3\\) m.",
      },
      selfCheckExample: {
        prompt: "A pole in a triangular park is seen at \\(45^\\circ\\) from each corner, and the circumradius is 6. Find the pole's height.",
        steps: [
          "The foot is the circumcentre, 6 m from each corner.",
        ],
        answer: "\\(6\\) m.",
      },
      practiceSet: [
        { prompt: "\\(h=10\\), \\(\\theta=45^\\circ\\): distance?", answer: "\\(10\\)" },
        { prompt: "Distances 6 and 8 in perpendicular directions: separation?", answer: "\\(10\\)" },
        { prompt: "\\(\\cot60^\\circ\\)?", answer: "\\(\\frac1{\\sqrt3}\\)" },
        { prompt: "Equal elevations from three corners: the foot is the?", answer: "Circumcentre" },
      ],
      pyqExampleId: "a9fa424e-ff9a-40ce-85a5-99c79770bcfe", // 2022 — observers north of and west of a tower
      traps: [
        {
          title: "Draw the ground view",
          body: "The observers' positions form a horizontal triangle separate from the vertical ones. Sketch the view from above before combining distances.",
        },
      ],
    },
  ],
};
