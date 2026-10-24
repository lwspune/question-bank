import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_CI_CHORDS_NOTE: SubtopicNote = {
  subtopicName: "Chords and Perpendiculars",
  title: "Chords and Perpendiculars",
  oneLineDefinition:
    "The perpendicular from the centre cuts a chord into two equal halves, so the radius, the half-chord and the chord's distance from the centre always make a right triangle.",
  whyItMatters:
    "Forty questions in the bank, 34 EASY and 6 MODERATE, the largest page of the chapter. Most are one right triangle: two of radius, half-chord and distance are given and you find the third. The MODERATE ones put two chords, or two circles with one centre, into the same figure.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscich-facts",
      name: "Parts of a circle and the equal-chord facts",
      intuition:
        "A circle is every point at one fixed distance, the radius, from the centre. Straight lines meet it in a small number of ways, and each way has a name SSC expects you to know. Equal chords behave the same in every respect, because a chord's position is fixed by its length.",
      definition:
        "- A **chord** joins two points of the circle. A **diameter** is a chord through the centre: it is \\(2r\\) long and is the **longest chord**. Its distance from the centre is 0.\n" +
        "- A **radius** is not a chord: one end is at the centre, not on the circle.\n" +
        "- A **secant** is a line that cuts the circle at two points (a chord extended both ways). A **tangent** touches it at exactly one point, and the radius to that point is perpendicular to the tangent.\n" +
        "- The **perpendicular from the centre to a chord bisects the chord**, and the line from the centre to the midpoint of a chord is perpendicular to it.\n" +
        "- **Equal chords** subtend equal angles at the centre, cut off equal arcs and are **equally far from the centre**. Each of these facts works backwards too.\n" +
        "- Of two chords, the **longer one is nearer the centre**.\n" +
        "- Circles with equal radii are congruent, and since the circumference is \\(2\\pi r\\), circumferences are in the same ratio as radii.",
      formula: {
        label: "Longest chord",
        latex: "\\text{Diameter} = 2r",
        symbols: [{ symbol: "r", meaning: "the radius" }],
      },
      authoredExample: {
        prompt:
          "Which statement is false? (a) A chord nearer the centre is longer. (b) Equal chords subtend equal angles at the centre. (c) A secant meets a circle at exactly one point. (d) The perpendicular from the centre to a chord bisects the chord.",
        steps: [
          "(a) is true: the longer of two chords is the nearer one.",
          "(b) is true: equal chords give equal angles at the centre.",
          "(d) is true: this is the basic chord fact.",
          "(c) is false: a secant cuts the circle at two points. The line that meets it at exactly one point is a tangent.",
        ],
        answer: "(c)",
      },
      selfCheckExample: {
        prompt:
          "In a circle, chords PQ and RS are equal, and PQ subtends 72° at the centre. What angle does RS subtend at the centre, and how do the distances of PQ and RS from the centre compare?",
        steps: ["Equal chords subtend equal angles at the centre, so RS subtends 72°.", "Equal chords are equally far from the centre."],
        answer: "72°, and the two distances are equal",
      },
      practiceSet: [
        { prompt: "The radius of a circle is 9 cm. How long is its longest chord?", answer: "18 cm" },
        { prompt: "What is the distance of a diameter from the centre of its circle?", answer: "0" },
        {
          prompt: "Two chords of a circle are 6 cm and 4 cm from the centre. Which chord is longer?",
          answer: "The chord 4 cm from the centre",
        },
        { prompt: "What is a line that meets a circle at exactly one point called?", answer: "A tangent" },
      ],
      pyqExampleId: "9f12128c-6941-4779-97ee-f8cd64b06020",
      traps: [
        {
          title: "Calling the radius the longest chord",
          body: "A radius ends at the centre, so it is not a chord at all. The longest chord is the diameter, twice the radius.",
        },
        {
          title: "Mixing up a secant and a tangent",
          body: "A secant cuts the circle at two points; a tangent touches it at one. A chord extended both ways is a secant.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscich-halfchord",
      name: "Half-chord, distance from the centre and radius",
      intuition:
        "Drop the perpendicular from the centre O to a chord AB. It meets the chord at its midpoint M. Now OM, MA and the radius OA form a right triangle with the right angle at M, and the radius is the longest side.",
      definition:
        "- Let the chord be \\(c\\) long and \\(p\\) from the centre. The right triangle has sides \\(p\\), \\(\\frac{c}{2}\\) and hypotenuse \\(r\\).\n" +
        "- **Halve the chord first.** Putting the whole chord into the triangle is the commonest slip.\n" +
        "- \"The perpendicular from the centre\", \"the distance of the chord from the centre\" and \"the segment from the centre to the midpoint\" all mean \\(p\\).\n" +
        "- If the question asks for the chord, double the half-chord at the end.\n" +
        "- **Fast route: spot a triple.** 3, 4, 5 and 5, 12, 13 and 8, 15, 17 and 7, 24, 25 and 20, 21, 29, and their multiples, fill most of these questions. If two sides fit a triple, read off the third. Use it only when the numbers really fit: 6 and 8 give 10, but 6 and 9 are not part of any of these.\n" +
        "- For an approximate answer, place the square between two perfect squares: \\(\\sqrt{193}\\) lies between 13 and 14, close to 14 because 193 is close to 196.",
      formula: {
        label: "Chord, distance and radius",
        latex: "r^2 = p^2 + \\left(\\frac{c}{2}\\right)^2 \\qquad c = 2\\sqrt{r^2 - p^2}",
        symbols: [
          { symbol: "r", meaning: "the radius" },
          { symbol: "p", meaning: "the perpendicular distance of the chord from the centre" },
          { symbol: "c", meaning: "the length of the chord" },
        ],
      },
      authoredExample: {
        prompt: "A chord of a circle is 30 cm long and lies 8 cm from the centre. Find the radius.",
        steps: [
          "The perpendicular from the centre halves the chord, so the half-chord is 15 cm.",
          "\\(r^2 = 8^2 + 15^2 = 64 + 225 = 289\\), so \\(r = 17\\) cm.",
          "Fast route: 8, 15, 17 is a triple, so the radius is 17 cm at sight.",
        ],
        answer: "17 cm",
      },
      selfCheckExample: {
        prompt: "A circle has a radius of 41 cm. A chord is 9 cm from the centre. How long is the chord?",
        steps: [
          "Half-chord \\(= \\sqrt{41^2 - 9^2} = \\sqrt{1681 - 81} = \\sqrt{1600} = 40\\) cm.",
          "Chord \\(= 2 \\times 40 = 80\\) cm. (9, 40, 41 is a triple.)",
        ],
        answer: "80 cm",
      },
      practiceSet: [
        {
          prompt: "A chord of a circle of radius 25 cm is 7 cm from the centre. How long is the chord?",
          answer: "48 cm",
          method: "Half-chord \\(= \\sqrt{625 - 49} = 24\\), then double it.",
        },
        { prompt: "A chord 18 cm long is 12 cm from the centre of a circle. What is the radius?", answer: "15 cm" },
        {
          prompt: "The radius of a circle is 10 cm and one of its chords is 12 cm long. How far is the chord from the centre?",
          answer: "8 cm",
        },
        {
          prompt: "In a circle of radius 6 cm, a chord is 4 cm from the centre. Find the length of the chord in surd form.",
          answer: "\\(4\\sqrt{5}\\) cm",
          method: "Half-chord \\(= \\sqrt{36 - 16} = \\sqrt{20} = 2\\sqrt{5}\\).",
        },
      ],
      pyqExampleId: "12bf744b-0bc8-48f1-8436-e3e46b95c75b",
      traps: [
        {
          title: "Putting the whole chord in the right triangle",
          body:
            "The triangle uses half the chord. For a chord of 70 cm at 12 cm from the centre, the radius is \\(\\sqrt{144 + 1225} = 37\\) cm, not \\(\\sqrt{144 + 4900}\\).",
        },
        {
          title: "Stopping at the half-chord",
          body: "The triangle gives half the chord. When the question asks for the chord, double that answer before choosing an option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscich-concentric",
      name: "A chord of the larger of two concentric circles",
      intuition:
        "Concentric circles share one centre. A chord of the bigger circle that just touches the smaller circle is a tangent to it, so the small radius to the touching point is perpendicular to the chord. That small radius is the chord's distance from the centre, and the touching point is the chord's midpoint.",
      definition:
        "- **Concentric** circles have the same centre and different radii.\n" +
        "- A chord of the outer circle (radius \\(R\\)) that touches the inner circle (radius \\(r\\)) is \\(r\\) from the centre, so its length is \\(2\\sqrt{R^2 - r^2}\\).\n" +
        "- The point of contact is the **midpoint** of that chord.\n" +
        "- A line that cuts both circles makes two chords at the same distance from the centre. Write the right triangle for each and the distance cancels: \\(R^2 - r^2 = \\left(\\frac{C}{2}\\right)^2 - \\left(\\frac{c}{2}\\right)^2\\).",
      formula: {
        label: "Concentric circles",
        latex: "\\text{Chord} = 2\\sqrt{R^2 - r^2} \\qquad R^2 - r^2 = \\left(\\frac{C}{2}\\right)^2 - \\left(\\frac{c}{2}\\right)^2",
        symbols: [
          { symbol: "R", meaning: "the radius of the outer circle" },
          { symbol: "r", meaning: "the radius of the inner circle" },
          { symbol: "C", meaning: "the chord the line makes on the outer circle" },
          { symbol: "c", meaning: "the chord the same line makes on the inner circle" },
        ],
      },
      authoredExample: {
        prompt:
          "Two concentric circles have radii 13 cm and 12 cm. Find the length of the chord of the larger circle that touches the smaller circle.",
        steps: [
          "The chord touches the inner circle, so it is 12 cm from the centre.",
          "Half-chord \\(= \\sqrt{13^2 - 12^2} = \\sqrt{169 - 144} = 5\\) cm.",
          "Chord \\(= 2 \\times 5 = 10\\) cm.",
        ],
        answer: "10 cm",
      },
      selfCheckExample: {
        prompt:
          "A straight line cuts two concentric circles. The chord it makes on the inner circle is 10 cm and the chord on the outer circle is 24 cm. Find the difference of the squares of the two radii.",
        steps: [
          "Both chords are the same distance \\(p\\) from the centre, so \\(R^2 = p^2 + 12^2\\) and \\(r^2 = p^2 + 5^2\\).",
          "\\(R^2 - r^2 = 144 - 25 = 119\\). The distance cancels and is never needed.",
        ],
        answer: "119 cm²",
      },
      practiceSet: [
        {
          prompt: "Two concentric circles have radii 5 cm and 3 cm. Find the length of the chord of the larger circle that touches the smaller one.",
          answer: "8 cm",
        },
        {
          prompt: "A chord of the larger of two concentric circles is 20 cm long and touches the smaller circle at P. How far is P from either end of the chord?",
          answer: "10 cm",
        },
        {
          prompt: "A chord 16 cm long of the outer of two concentric circles touches the inner circle, whose radius is 6 cm. Find the radius of the outer circle.",
          answer: "10 cm",
        },
        {
          prompt: "Two concentric circles have radii 7 cm and 5 cm. Find the length of the chord of the larger circle that touches the smaller one, in surd form.",
          answer: "\\(4\\sqrt{6}\\) cm",
          method: "\\(2\\sqrt{49 - 25} = 2\\sqrt{24} = 4\\sqrt{6}\\).",
        },
      ],
      pyqExampleId: "3472f736-ce5f-4408-969d-2ef37d1a520e",
      traps: [
        {
          title: "Treating the inner radius as half the chord",
          body: "The inner radius is the chord's distance from the centre. The half-chord is \\(\\sqrt{R^2 - r^2}\\), found from the right triangle.",
        },
        {
          title: "Taking the point of contact as an end of the chord",
          body: "A chord of the outer circle that touches the inner circle is touched at its midpoint, so each piece is half the chord.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscich-parallel",
      name: "Two parallel chords and the radius",
      intuition:
        "Two parallel chords are both perpendicular to one line through the centre. Each chord makes its own right triangle with the same radius, and the gap between the chords is either the difference or the sum of their two distances from the centre.",
      definition:
        "- Each chord's distance is \\(p = \\sqrt{r^2 - \\left(\\frac{c}{2}\\right)^2}\\). The longer chord is nearer the centre.\n" +
        "- **Same side of the centre:** gap \\(= p_1 - p_2\\). **Opposite sides:** gap \\(= p_1 + p_2\\).\n" +
        "- **Radius unknown:** call the nearer distance \\(p\\). Write \\(r^2\\) twice, once with each half-chord, and set them equal. The \\(p^2\\) terms cancel and a simple equation for \\(p\\) is left.\n" +
        "- If the stem does not say which side, try one. A negative distance means the chords lie the other way.\n" +
        "- **Fast route:** test the options. For each radius, find both distances and see whether they differ (or add) to the gap. It is quick because the options are few, and safe because a wrong radius cannot pass both checks.",
      formula: {
        label: "Two parallel chords",
        latex: "\\text{gap} = p_1 - p_2 \\text{ (same side)} \\qquad \\text{gap} = p_1 + p_2 \\text{ (opposite sides)}",
        symbols: [
          { symbol: "\\(p_1, p_2\\)", meaning: "the distances of the two chords from the centre" },
        ],
      },
      authoredExample: {
        prompt:
          "Two parallel chords of a circle of radius 25 cm are 40 cm and 30 cm long. Find the distance between them when they lie (a) on the same side of the centre and (b) on opposite sides.",
        steps: [
          "40 cm chord: \\(p_1 = \\sqrt{625 - 400} = 15\\) cm.",
          "30 cm chord: \\(p_2 = \\sqrt{625 - 225} = 20\\) cm.",
          "(a) Same side: \\(20 - 15 = 5\\) cm. (b) Opposite sides: \\(20 + 15 = 35\\) cm.",
        ],
        answer: "(a) 5 cm (b) 35 cm",
      },
      selfCheckExample: {
        prompt:
          "Two parallel chords of lengths 6 cm and 8 cm lie on opposite sides of the centre of a circle, 7 cm apart. Find the radius.",
        steps: [
          "Half-chords are 3 and 4. Let the 6 cm chord be \\(p\\) from the centre; the other is \\(7 - p\\) away.",
          "\\(9 + p^2 = 16 + (7 - p)^2 = 16 + 49 - 14p + p^2\\), so \\(14p = 56\\) and \\(p = 4\\).",
          "\\(r^2 = 9 + 16 = 25\\), so \\(r = 5\\) cm. Check: the other chord is 3 cm away and \\(16 + 9 = 25\\).",
        ],
        answer: "5 cm",
      },
      practiceSet: [
        {
          prompt: "In a circle of radius 29 cm, parallel chords of 40 cm and 42 cm lie on opposite sides of the centre. How far apart are they?",
          answer: "41 cm",
          method: "Distances \\(\\sqrt{841 - 400} = 21\\) and \\(\\sqrt{841 - 441} = 20\\); add them.",
        },
        {
          prompt: "In a circle of radius 41 cm, parallel chords of 80 cm and 18 cm lie on the same side of the centre. How far apart are they?",
          answer: "31 cm",
          method: "Distances 9 and 40; subtract.",
        },
        {
          prompt: "Two parallel chords of a circle are 3 cm and 5 cm from the centre. Which one is longer?",
          answer: "The chord 3 cm from the centre",
        },
        {
          prompt: "Two parallel chords lie 2 cm and 9 cm from the centre of a circle, on opposite sides. How far apart are they?",
          answer: "11 cm",
        },
      ],
      pyqExampleId: "ff2225eb-8199-4b6f-99f8-fbc25ee1c8be",
      traps: [
        {
          title: "Subtracting the distances for chords on opposite sides",
          body: "When the centre lies between two parallel chords, the gap is the sum of their distances from the centre, not the difference.",
        },
        {
          title: "Placing the longer chord farther from the centre",
          body: "The longer chord is always the nearer one. If your working puts it farther away, a half-chord has been paired with the wrong distance.",
        },
      ],
    },
  ],
};
