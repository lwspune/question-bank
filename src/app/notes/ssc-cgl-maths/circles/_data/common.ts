import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_CI_COMMON_NOTE: SubtopicNote = {
  subtopicName: "Common Tangents and Common Chords",
  title: "Common Tangents and Common Chords",
  oneLineDefinition:
    "The distance between two centres decides how many common tangents two circles have, and one right triangle with that distance as hypotenuse gives the length of each kind.",
  whyItMatters:
    "Thirty questions in the bank, 16 EASY, 13 MODERATE and the chapter's only HARD one. Most are a direct or transverse tangent from the radii and the distance between the centres, sometimes run backwards. The MODERATE ones add the two formulas, compare them, or find the chord two intersecting circles share.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscicm-count",
      name: "Positions of two circles and the number of common tangents",
      intuition:
        "Pull two circles apart and they gain common tangents; push one inside the other and they lose them. Compare the distance between the centres with the sum and the difference of the radii, and the position, and the count, follow.",
      definition:
        "- Let \\(d\\) be the distance between the centres and \\(r_1 \\ge r_2\\) the radii.\n" +
        "- A **direct** common tangent has both circles on the same side of it. A **transverse** (internal) one crosses between them.\n" +
        "- Circles that cut each other have no transverse tangent: a line between them would have to cross the shared region.\n" +
        "- Three circles, each pair outside each other, have at most \\(3 \\times 4 = 12\\) common tangents in all.",
      table: {
        columns: ["Position", "Condition", "Common tangents"],
        rows: [
          { cells: ["One outside the other", "\\(d > r_1 + r_2\\)", "4: two direct, two transverse"] },
          { cells: ["Touching externally", "\\(d = r_1 + r_2\\)", "3: two direct, one at the point of contact"] },
          { cells: ["Cutting at two points", "\\(r_1 - r_2 < d < r_1 + r_2\\)", "2: both direct"] },
          { cells: ["Touching internally", "\\(d = r_1 - r_2\\)", "1: at the point of contact"] },
          { cells: ["One inside the other", "\\(d < r_1 - r_2\\)", "0"], noteAmber: "Concentric circles (d = 0) belong here." },
        ],
        caption: "Work out \\(r_1 + r_2\\) and \\(r_1 - r_2\\) first, then see where \\(d\\) falls.",
      },
      selfCheckExample: {
        prompt: "Two circles of radii 9 cm and 4 cm have their centres 13 cm apart. How many common tangents do they have?",
        steps: ["\\(r_1 + r_2 = 13 = d\\), so the circles touch externally.", "They have 3 common tangents."],
        answer: "3",
      },
      practiceSet: [
        { prompt: "Circles of radii 7 cm and 3 cm have centres 6 cm apart. How many common tangents do they have?", answer: "2" },
        { prompt: "Circles of radii 8 cm and 5 cm have centres 3 cm apart. How many common tangents do they have?", answer: "1" },
        { prompt: "Circles of radii 4 cm and 2 cm have centres 9 cm apart. How many common tangents do they have?", answer: "4" },
        { prompt: "How many common tangents do two concentric circles of different radii have?", answer: "0" },
      ],
      pyqExampleId: "4de0afc4-3dc2-4d92-8d60-10f261a5c006",
      traps: [
        {
          title: "Giving intersecting circles a transverse tangent",
          body: "Two circles that cut at two points have exactly two common tangents, and both are direct.",
        },
        {
          title: "Counting three tangents for internal touching",
          body: "Circles touching externally have 3 common tangents. Circles touching internally have only 1, the tangent at the point of contact.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscicm-direct",
      name: "Length of a direct common tangent",
      intuition:
        "The radii to the two points of contact are both perpendicular to the tangent, so they are parallel. Slide the tangent across by the smaller radius and you get a right triangle: the distance between the centres is the hypotenuse, the tangent is one leg and the difference of the radii is the other.",
      definition:
        "- **Direct common tangent:** \\(L^2 = d^2 - (r_1 - r_2)^2\\).\n" +
        "- Run backwards: \\(d^2 = L^2 + (r_1 - r_2)^2\\), or \\((r_1 - r_2)^2 = d^2 - L^2\\).\n" +
        "- **Equal radii:** the difference is 0, so \\(L = d\\). If the tangent equals the distance between the centres, the radii are equal.\n" +
        "- A direct tangent exists whenever neither circle is inside the other, including when they cut each other.\n" +
        "- The two direct tangents meet on the line of centres, beyond the smaller circle. That point divides the line of centres **externally in the ratio \\(r_1 : r_2\\)**, by similar right triangles.\n" +
        "- **Fast route with surd options:** compare squares. \\(L^2 = 448\\) matches \\(8\\sqrt{7}\\) because \\(64 \\times 7 = 448\\). An answer must also be less than \\(d\\).",
      formula: {
        label: "Direct common tangent",
        latex: "L = \\sqrt{d^2 - (r_1 - r_2)^2}",
        symbols: [
          { symbol: "L", meaning: "the length of the direct common tangent" },
          { symbol: "d", meaning: "the distance between the centres" },
          { symbol: "\\(r_1, r_2\\)", meaning: "the two radii" },
        ],
      },
      authoredExample: {
        prompt: "Two circles of radii 11 cm and 4 cm have their centres 25 cm apart. Find the length of a direct common tangent.",
        steps: [
          "The difference of the radii is \\(11 - 4 = 7\\) cm.",
          "\\(L = \\sqrt{25^2 - 7^2} = \\sqrt{625 - 49} = \\sqrt{576} = 24\\) cm.",
          "Fast route: 7, 24, 25 is a triple.",
        ],
        answer: "24 cm",
      },
      selfCheckExample: {
        prompt: "A direct common tangent of two circles of radii 10 cm and 3 cm is 24 cm long. How far apart are the centres?",
        steps: ["\\(d^2 = 24^2 + (10 - 3)^2 = 576 + 49 = 625\\).", "\\(d = 25\\) cm."],
        answer: "25 cm",
      },
      practiceSet: [
        { prompt: "Two circles of equal radius have their centres 14 cm apart. How long is a direct common tangent?", answer: "14 cm" },
        { prompt: "Circles of radii 6 cm and 1 cm have their centres 13 cm apart. Find a direct common tangent.", answer: "12 cm" },
        { prompt: "Circles of radii 8 cm and 2 cm have their centres 10 cm apart. Find a direct common tangent.", answer: "8 cm" },
        {
          prompt: "The direct common tangents of two circles with centres P and Q and radii 6 cm and 2 cm meet PQ produced at A. In what ratio does A divide PQ?",
          answer: "Externally in the ratio 3 : 1",
        },
      ],
      pyqExampleId: "755f1230-f8b6-4fe3-afc6-6d61a72a4782",
      traps: [
        {
          title: "Using the sum of the radii for a direct tangent",
          body: "The direct tangent uses the difference of the radii, because both radii point the same way from the tangent. The sum belongs to the transverse tangent.",
        },
        {
          title: "Treating the tangent as the hypotenuse",
          body: "The distance between the centres is the longest side. A direct common tangent is always shorter than that distance unless the radii are equal.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscicm-transverse",
      name: "Length of a transverse common tangent, and the two tangents together",
      intuition:
        "For a transverse tangent the two radii to the points of contact point in opposite directions. Sliding one across now adds the radii, so the leg of the right triangle is the sum of the radii instead of the difference.",
      definition:
        "- **Transverse common tangent:** \\(M^2 = d^2 - (r_1 + r_2)^2\\). It exists only when the circles are outside each other, \\(d > r_1 + r_2\\).\n" +
        "- **Subtract the two formulas:** \\(L^2 - M^2 = (r_1 + r_2)^2 - (r_1 - r_2)^2 = 4r_1 r_2\\). This gives the product of the radii from the two tangents alone.\n" +
        "- **Add them:** \\(L^2 + M^2 = 2d^2 - 2(r_1^2 + r_2^2)\\).\n" +
        "- The transverse tangents cross the line of centres between the centres, dividing it **internally in the ratio \\(r_1 : r_2\\)**. The two pieces of one transverse tangent, from that point to each point of contact, are in the same ratio.",
      formula: {
        label: "Transverse common tangent",
        latex: "M = \\sqrt{d^2 - (r_1 + r_2)^2} \\qquad L^2 - M^2 = 4r_1 r_2",
        symbols: [
          { symbol: "M", meaning: "the length of the transverse common tangent" },
          { symbol: "L", meaning: "the length of the direct common tangent" },
        ],
      },
      authoredExample: {
        prompt:
          "Two circles of radii 7 cm and 5 cm have their centres 20 cm apart. Find the lengths of a transverse and a direct common tangent.",
        steps: [
          "Transverse: \\(M = \\sqrt{20^2 - 12^2} = \\sqrt{400 - 144} = \\sqrt{256} = 16\\) cm.",
          "Direct: \\(L = \\sqrt{20^2 - 2^2} = \\sqrt{396} = 6\\sqrt{11}\\) cm.",
          "Check: \\(L^2 - M^2 = 396 - 256 = 140 = 4 \\times 7 \\times 5\\).",
        ],
        answer: "Transverse 16 cm, direct \\(6\\sqrt{11}\\) cm",
      },
      selfCheckExample: {
        prompt: "The direct and transverse common tangents of two circles are 13 cm and 11 cm long. Find the product of the radii.",
        steps: ["\\(4r_1 r_2 = L^2 - M^2 = 169 - 121 = 48\\).", "\\(r_1 r_2 = 12\\)."],
        answer: "12",
      },
      practiceSet: [
        { prompt: "Circles of radii 3 cm and 2 cm have their centres 13 cm apart. Find a transverse common tangent.", answer: "12 cm" },
        {
          prompt: "Two circles of radii 4 cm and 6 cm have their centres 8 cm apart. Do they have a transverse common tangent?",
          answer: "No: 8 is less than 4 + 6, so the circles cut each other",
        },
        {
          prompt: "A transverse common tangent of two circles is 15 cm and their centres are 17 cm apart. Find the sum of the radii.",
          answer: "8 cm",
        },
        {
          prompt: "Two circles have radii 6 cm and 3 cm. A transverse common tangent crosses the line joining the centres at E. In what ratio does E divide that line?",
          answer: "Internally in the ratio 2 : 1",
        },
      ],
      pyqExampleId: "98bd46fe-3c4c-4822-ac95-c6480c72d122",
      traps: [
        {
          title: "Swapping the sum and the difference",
          body: "Direct tangent: \\(d^2 - (r_1 - r_2)^2\\). Transverse tangent: \\(d^2 - (r_1 + r_2)^2\\). The transverse one is always the shorter.",
        },
        {
          title: "Finding a transverse tangent for circles that cut",
          body: "If \\(d\\) is less than the sum of the radii, \\(d^2 - (r_1 + r_2)^2\\) is negative: there is no transverse tangent.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscicm-chord",
      name: "The common chord of two intersecting circles",
      intuition:
        "Two circles that cut at A and B share the chord AB. Each centre is equally far from A and from B, so both centres lie on the perpendicular bisector of AB. The line of centres therefore cuts the common chord at right angles, at its midpoint.",
      definition:
        "- The **line of centres is the perpendicular bisector of the common chord**.\n" +
        "- Let the chord's midpoint be \\(x\\) from the first centre and \\(d - x\\) from the second, and let \\(h\\) be half the chord. Then \\(h^2 = r_1^2 - x^2 = r_2^2 - (d - x)^2\\). Solve the second equality for \\(x\\); the \\(x^2\\) terms cancel.\n" +
        "- **Equal radii:** the midpoint is halfway, \\(x = \\frac{d}{2}\\).\n" +
        "- **Each circle through the other's centre** (equal radii \\(r\\), so \\(d = r\\)): the common chord is \\(r\\sqrt{3}\\).\n" +
        "- **The common chord, produced, bisects every common tangent:** a point X on line AB has \\(XP^2 = XA \\times XB = XQ^2\\) for the points of contact P and Q, by the tangent rule of power of a point.",
      formula: {
        label: "Common chord",
        latex: "h^2 = r_1^2 - x^2 = r_2^2 - (d - x)^2 \\qquad \\text{Chord} = 2h",
        symbols: [
          { symbol: "h", meaning: "half the common chord" },
          { symbol: "x", meaning: "the distance from the first centre to the chord's midpoint" },
          { symbol: "d", meaning: "the distance between the centres" },
        ],
      },
      authoredExample: {
        prompt: "Two circles of radii 10 cm and 17 cm cut each other, and their centres are 21 cm apart. Find the length of their common chord.",
        steps: [
          "\\(100 - x^2 = 289 - (21 - x)^2 = 289 - 441 + 42x - x^2\\).",
          "So \\(100 = -152 + 42x\\), giving \\(x = 6\\) cm.",
          "\\(h = \\sqrt{100 - 36} = 8\\) cm, so the chord is \\(16\\) cm. Check: \\(17^2 - 15^2 = 64 = 8^2\\).",
        ],
        answer: "16 cm",
      },
      selfCheckExample: {
        prompt: "Two equal circles of radius 5 cm have their centres 6 cm apart. Find their common chord.",
        steps: ["The chord's midpoint is halfway, 3 cm from each centre.", "\\(h = \\sqrt{25 - 9} = 4\\) cm, so the chord is 8 cm."],
        answer: "8 cm",
      },
      practiceSet: [
        {
          prompt: "Two equal circles of radius 8 cm each pass through the other's centre. Find their common chord.",
          answer: "\\(8\\sqrt{3}\\) cm",
        },
        { prompt: "At what angle does the common chord of two intersecting circles meet the line joining their centres?", answer: "90°" },
        {
          prompt: "Two circles meet at A and B. Line AB, produced, meets a common tangent at X, with XA = 4 cm and XB = 9 cm. How far is X from each point of contact?",
          answer: "6 cm",
        },
        {
          prompt: "Two equal circles of radius 17 cm have a common chord of 30 cm. How far apart are their centres?",
          answer: "16 cm",
          method: "Each centre is \\(\\sqrt{289 - 225} = 8\\) cm from the chord.",
        },
      ],
      pyqExampleId: "fb031c01-a8ec-4b54-8b53-5da2af8142a2",
      traps: [
        {
          title: "Putting the chord's midpoint halfway between unequal circles",
          body: "Only equal circles have the common chord halfway between the centres. For unequal radii, find the split of d from the two right triangles.",
        },
        {
          title: "Forgetting to double half the chord",
          body: "The right triangles give half the common chord. Double it before matching the options.",
        },
      ],
    },
  ],
};
