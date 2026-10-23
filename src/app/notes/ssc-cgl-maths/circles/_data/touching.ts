import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_CI_TOUCHING_NOTE: SubtopicNote = {
  subtopicName: "Touching Circles",
  title: "Touching Circles",
  oneLineDefinition:
    "When two circles touch, the distance between their centres is the sum or the difference of the radii, and for circles touching externally the direct common tangent shrinks to 2√(r₁r₂).",
  whyItMatters:
    "Twelve questions in the bank, 9 EASY and 3 MODERATE. Nine of them ask for the direct common tangent of two circles that touch externally, which is one square root once you know the shortcut. The other three use the distance between the centres, or the right angle that the point of contact makes with the ends of a direct tangent.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscito-tangent",
      name: "Direct common tangent of two circles touching externally",
      intuition:
        "Circles that touch externally have their centres exactly \\(r_1 + r_2\\) apart. Put that distance into the direct tangent formula and the two squares collapse to a single product.",
      definition:
        "- Touching externally means \\(d = r_1 + r_2\\).\n" +
        "- The direct tangent then has \\(L^2 = (r_1 + r_2)^2 - (r_1 - r_2)^2 = 4r_1 r_2\\), so **\\(L = 2\\sqrt{r_1 r_2}\\)**.\n" +
        "- **The shortcut is safe only when the circles touch externally.** For circles apart or cutting each other, go back to \\(\\sqrt{d^2 - (r_1 - r_2)^2}\\).\n" +
        "- Run backwards: \\(r_1 r_2 = \\frac{L^2}{4}\\), so one radius and the tangent give the other radius.\n" +
        "- A question that says only \"their common tangent\" for circles touching externally means a direct one: the third tangent, at the point of contact, has no length between two points of contact.",
      formula: {
        label: "Touching circles, direct tangent",
        latex: "L = 2\\sqrt{r_1 r_2}",
        symbols: [
          { symbol: "L", meaning: "the direct common tangent between its two points of contact" },
          { symbol: "\\(r_1, r_2\\)", meaning: "the radii of the two touching circles" },
        ],
      },
      authoredExample: {
        prompt: "Two circles of radii 9 cm and 4 cm touch each other externally. Find the length of their direct common tangent.",
        steps: [
          "Full method: the centres are \\(9 + 4 = 13\\) cm apart, so \\(L = \\sqrt{13^2 - 5^2} = \\sqrt{144} = 12\\) cm.",
          "Fast route: \\(L = 2\\sqrt{9 \\times 4} = 2 \\times 6 = 12\\) cm.",
        ],
        answer: "12 cm",
      },
      selfCheckExample: {
        prompt: "Two circles touch each other externally and have radii 8 cm and 2 cm. How long is their direct common tangent?",
        steps: ["\\(L = 2\\sqrt{8 \\times 2} = 2\\sqrt{16} = 8\\) cm.", "Check: \\(\\sqrt{10^2 - 6^2} = 8\\)."],
        answer: "8 cm",
      },
      practiceSet: [
        { prompt: "Circles of radii 3 cm and 12 cm touch externally. Find their direct common tangent.", answer: "12 cm" },
        { prompt: "Circles of radii a and 4a touch externally. Find their direct common tangent.", answer: "4a" },
        { prompt: "Two equal circles of radius 5 cm touch externally. Find their direct common tangent.", answer: "10 cm" },
        {
          prompt: "Two circles touching externally have a direct common tangent of 12 cm, and one radius is 4 cm. Find the other radius.",
          answer: "9 cm",
          method: "\\(4r_1 r_2 = 144\\), so \\(r_1 r_2 = 36\\).",
        },
      ],
      pyqExampleId: "79c67aaa-2907-45e4-8ff2-99a42c7e00dc",
      traps: [
        {
          title: "Using \\(2\\sqrt{r_1 r_2}\\) for circles that do not touch",
          body: "The shortcut assumes the centres are exactly \\(r_1 + r_2\\) apart. When the distance is given and is different, use \\(\\sqrt{d^2 - (r_1 - r_2)^2}\\).",
        },
        {
          title: "Taking the sum of the radii as the tangent",
          body: "\\(r_1 + r_2\\) is the distance between the centres of touching circles. The tangent is \\(2\\sqrt{r_1 r_2}\\), which is never longer than that.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscito-contact",
      name: "Centres, the point of contact, and a circle touching two others",
      intuition:
        "Two touching circles share a tangent at the point of contact, and both radii to that point are perpendicular to it. So the two centres and the point of contact lie on one straight line, and the distance between the centres is found by adding or subtracting radii.",
      definition:
        "- **Touching externally:** \\(d = r_1 + r_2\\). **Touching internally:** \\(d = r_1 - r_2\\). The point of contact lies on the line of centres.\n" +
        "- The **least** distance between centres for exactly three common tangents is \\(r_1 + r_2\\): any closer and the circles cut, with only two.\n" +
        "- For circles touching externally at P, with a direct common tangent touching them at A and B: the tangent at P meets AB at M, and the tangents from M are equal, so \\(MA = MP = MB\\). Hence **\\(\\angle APB = 90^\\circ\\)**.\n" +
        "- A third circle of radius \\(r\\) touching two circles externally has its centre \\(r_1 + r\\) and \\(r_2 + r\\) from their centres. Put those lengths into the triangle the question describes.",
      formula: {
        label: "Distance between touching centres",
        latex: "d = r_1 + r_2 \\text{ (external)} \\qquad d = r_1 - r_2 \\text{ (internal)}",
        symbols: [{ symbol: "d", meaning: "the distance between the centres" }],
      },
      authoredExample: {
        prompt:
          "Circles with centres A and B have radii 9 cm and 2 cm, and AB = 13 cm. A third circle with centre C and radius r cm touches both externally, and \\(\\angle ACB = 90^\\circ\\). Find r.",
        steps: [
          "Touching externally: \\(AC = 9 + r\\) and \\(BC = 2 + r\\).",
          "Right angle at C: \\((9 + r)^2 + (2 + r)^2 = 13^2\\), so \\(2r^2 + 22r + 85 = 169\\) and \\(r^2 + 11r - 42 = 0\\).",
          "\\((r + 14)(r - 3) = 0\\), so \\(r = 3\\). Check: \\(AC = 12\\), \\(BC = 5\\), and \\(144 + 25 = 169\\).",
        ],
        answer: "3 cm",
      },
      selfCheckExample: {
        prompt:
          "Two circles touch externally at P. A direct common tangent touches them at A and B. If \\(\\angle PBA = 38^\\circ\\), find \\(\\angle PAB\\).",
        steps: ["\\(\\angle APB = 90^\\circ\\), because the point of contact sees AB at a right angle.", "\\(\\angle PAB = 180^\\circ - 90^\\circ - 38^\\circ = 52^\\circ\\)."],
        answer: "52°",
      },
      practiceSet: [
        { prompt: "Circles of radii 7 cm and 4 cm touch externally. How far apart are their centres?", answer: "11 cm" },
        { prompt: "Circles of radii 7 cm and 4 cm touch internally. How far apart are their centres?", answer: "3 cm" },
        {
          prompt: "What is the least distance between the centres of circles of radii 9 cm and 4 cm for which exactly three common tangents exist?",
          answer: "13 cm",
        },
        {
          prompt: "Two circles touch externally at P, and a direct common tangent touches them at A and B. What is \\(\\angle APB\\)?",
          answer: "90°",
        },
      ],
      pyqExampleId: "1bd83874-669f-44ef-a746-8e4208062c77",
      traps: [
        {
          title: "Adding the radii for circles touching internally",
          body: "Circles touching internally have one inside the other, so the distance between their centres is the difference of the radii.",
        },
        {
          title: "Using a radius alone for the distance to a third touching circle",
          body: "A circle of radius \\(r\\) touching a circle of radius \\(r_1\\) externally has its centre \\(r_1 + r\\) away, the sum of both radii.",
        },
      ],
    },
  ],
};
