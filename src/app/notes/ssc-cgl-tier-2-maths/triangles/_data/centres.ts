import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_TR_CENTRES_NOTE: SubtopicNote = {
  subtopicName: "Centres of a Triangle",
  title: "Centres of a Triangle",
  oneLineDefinition:
    "The incentre, orthocentre and circumcentre each make a fixed angle with two corners; the inradius and circumradius come straight from the sides, and the centroid cuts every median two to one.",
  whyItMatters:
    "14 questions in the Tier II bank, 12 EASY and 2 MODERATE. Almost every one is a single formula about one centre, so learning the results below is worth more than any amount of angle chasing.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2trce-angles",
      name: "Angles at the incentre, orthocentre and circumcentre",
      intuition:
        "Each centre makes a fixed angle with two of the corners, and that angle depends only on the third angle of the triangle. Learn the three results and most centre-angle questions take one line.",
      definition:
        "- Incentre I, where the angle bisectors meet: \\(\\angle BIC = 90^\\circ + \\frac{A}{2}\\).\n" +
        "- Orthocentre H, where the altitudes meet: \\(\\angle BHC = 180^\\circ - A\\).\n" +
        "- Circumcentre O, the point equally far from all three corners: \\(\\angle BOC = 2A\\) when A is acute.\n" +
        "- The incentre halves each angle: \\(\\angle IBC = \\frac{B}{2}\\).",
      formula: {
        label: "Angles at the centres",
        latex: "\\angle BIC = 90^\\circ + \\tfrac{A}{2}, \\quad \\angle BHC = 180^\\circ - A, \\quad \\angle BOC = 2A",
      },
      authoredExample: {
        prompt: "In triangle ABC, angle A = 70°. Find the angle that BC makes at the incentre, at the orthocentre and at the circumcentre.",
        steps: ["Incentre: \\(90^\\circ + 35^\\circ = 125^\\circ\\).", "Orthocentre: \\(180^\\circ - 70^\\circ = 110^\\circ\\).", "Circumcentre: \\(2 \\times 70^\\circ = 140^\\circ\\)."],
        answer: "\\(125^\\circ\\), \\(110^\\circ\\), \\(140^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "The bisectors of angles B and C of triangle ABC meet at I, and angle BIC = 118°. Find angle A.",
        steps: ["\\(90^\\circ + \\frac{A}{2} = 118^\\circ\\).", "\\(A = 56^\\circ\\)."],
        answer: "\\(56^\\circ\\)",
      },
      practiceSet: [
        { prompt: "Angle A = 50°. Find angle BIC, where I is the incentre.", answer: "\\(115^\\circ\\)" },
        { prompt: "Angle A = 64°. Find angle BOC, where O is the circumcentre.", answer: "\\(128^\\circ\\)" },
        { prompt: "Angle BHC = 125°, where H is the orthocentre. Find angle A.", answer: "\\(55^\\circ\\)" },
      ],
      pyqExampleId: "89eba20d-4a07-4dbc-9b9a-e9424c2a028a",
      traps: [
        {
          title: "Using the circumcentre rule at the incentre",
          body: "At the incentre the angle is \\(90^\\circ + \\frac{A}{2}\\); at the circumcentre it is \\(2A\\). With A = 70° these are 125° and 140°: check which centre the stem names.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2trce-radii",
      name: "Inradius and circumradius",
      intuition:
        "The incircle touches all three sides; the circumcircle passes through all three corners. For an equilateral triangle both radii come from the side alone, and in a right triangle the hypotenuse is a diameter of the circumcircle.",
      definition:
        "- Equilateral triangle of side a: height \\(\\frac{\\sqrt{3}}{2}a\\), circumradius \\(\\frac{a}{\\sqrt{3}}\\) (two thirds of the height), inradius \\(\\frac{a}{2\\sqrt{3}}\\) (one third of it).\n" +
        "- Right triangle with legs a, b and hypotenuse c: circumradius \\(\\frac{c}{2}\\), inradius \\(\\frac{a + b - c}{2}\\).\n" +
        "- Any triangle: inradius \\(=\\) area \\(\\div\\) semi-perimeter.",
      formula: {
        label: "Radii",
        latex: "R_{\\text{equilateral}} = \\frac{a}{\\sqrt{3}}, \\quad r_{\\text{equilateral}} = \\frac{a}{2\\sqrt{3}}, \\quad r_{\\text{right}} = \\frac{a + b - c}{2}",
      },
      authoredExample: {
        prompt: "A right triangle has legs of 15 cm and 20 cm. Find the radius of its incircle and of its circumcircle.",
        steps: ["The hypotenuse is 25 cm, so the circumradius is 12.5 cm.", "Inradius \\(= \\frac{15 + 20 - 25}{2} = 5\\) cm."],
        answer: "5 cm and 12.5 cm",
      },
      selfCheckExample: {
        prompt: "An equilateral triangle has height 9 cm. Find its circumradius and its inradius.",
        steps: ["Circumradius \\(= \\frac{2}{3} \\times 9 = 6\\) cm.", "Inradius \\(= \\frac{1}{3} \\times 9 = 3\\) cm."],
        answer: "6 cm and 3 cm",
      },
      practiceSet: [
        { prompt: "Find the circumradius of an equilateral triangle of side \\(6\\sqrt{3}\\) cm.", answer: "6 cm" },
        { prompt: "A triangle has area 84 cm² and perimeter 42 cm. Find its inradius.", answer: "4 cm" },
        { prompt: "A right triangle has legs 7 and 24. How long is the radius of the circle through its three corners?", answer: "12.5" },
      ],
      pyqExampleId: "18157320-06cc-41cd-bbc4-e413252adf02",
      traps: [
        {
          title: "Swapping the two radii",
          body: "In an equilateral triangle the circumradius is TWICE the inradius: two thirds of the height against one third. Using one for the other halves or doubles the answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2trce-centroid",
      name: "The centroid and medians",
      intuition:
        "The three medians meet at the centroid, which cuts each median two to one from the corner. In a right triangle the median to the hypotenuse is half the hypotenuse, which turns many centroid questions into a single step.",
      definition:
        "- \\(AG : GD = 2 : 1\\), where AD is a median and G is the centroid.\n" +
        "- The median to the hypotenuse of a right triangle is half the hypotenuse.\n" +
        "- In an equilateral triangle the centroid, incentre, circumcentre and orthocentre are one and the same point.\n" +
        "- In a right triangle the orthocentre is the corner with the right angle.\n" +
        "- The medians cut a triangle into six pieces of equal area; when two medians \\(m_1, m_2\\) cross at right angles, the area is \\(\\frac{2}{3}m_1 m_2\\).",
      formula: {
        label: "Centroid and median",
        latex: "AG = \\tfrac{2}{3}AD, \\quad \\text{median to the hypotenuse} = \\tfrac{1}{2} \\times \\text{hypotenuse}",
      },
      authoredExample: {
        prompt: "A right triangle has legs 9 cm and 40 cm. How far is its centroid from the corner with the right angle?",
        steps: ["The hypotenuse is 41 cm, so the median from the right angle is 20.5 cm.", "The centroid is \\(\\frac{2}{3} \\times 20.5 = \\frac{41}{3} \\approx 13.7\\) cm from that corner."],
        answer: "\\(\\frac{41}{3}\\) cm",
      },
      selfCheckExample: {
        prompt: "Two medians of a triangle, 9 cm and 12 cm long, cross at right angles. Find the triangle's area.",
        steps: ["Area \\(= \\frac{2}{3} \\times 9 \\times 12\\).", "\\(= 72\\ \\text{cm}^2\\)."],
        answer: "\\(72\\ \\text{cm}^2\\)",
      },
      practiceSet: [
        { prompt: "A median is 15 cm long. How far is the centroid from the corner it starts at?", answer: "10 cm" },
        { prompt: "A right triangle has hypotenuse 26 cm. Find the median to the hypotenuse.", answer: "13 cm" },
        { prompt: "Where is the orthocentre of a triangle with angles 90°, 60° and 30°?", answer: "At the corner with the 90° angle" },
      ],
      pyqExampleId: "cd4aa8b6-2e67-43ac-84ac-1289568679cd",
      traps: [
        {
          title: "Placing the centroid at the middle of the median",
          body: "The centroid is two thirds of the way down a median from the corner, not halfway. On a median of 15 cm it is 10 cm from the corner and 5 cm from the side.",
        },
      ],
    },
  ],
};
