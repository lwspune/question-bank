import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_MF_CAPILLARITY_NOTE: SubtopicNote = {
  subtopicName: "Capillary Action",
  title: "Capillary Action",
  oneLineDefinition:
    "Why a liquid rises or falls in a tube of fine bore, the derivation of h = 2T cos θ / rρg, how to use it in calculations, and where capillarity is seen in daily life.",
  whyItMatters:
    "10 questions. Five were set in board papers: derive the expression for capillary rise (2019), say what capillarity is and give two applications (2020), the rise in a tube of half the radius (2022), the ratio of rises in two tubes (2025), and blotting paper (2026). The textbook adds the rise of water in a fine tube and the angle of contact of mercury from its fall.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpmf-capillary-rise",
      name: "Rise of a liquid in a capillary tube",
      intuition:
        "Water clings to glass, so all round the inside of a thin tube the surface tension pulls the water upward along the wall. The water climbs until the weight of the raised column balances that upward pull. A thinner tube holds a lighter column for the same rim, so the water climbs higher. Mercury does not cling to glass, so the pull is downward and the mercury level falls.",
      definition:
        "- A capillary tube of radius \\(r\\) dips in a liquid of density \\(\\rho\\) and surface tension \\(T\\) that wets the tube. The meniscus is concave, the angle of contact \\(\\theta\\) is acute, and the liquid rises to a height \\(h\\).\n" +
        "- The liquid touches the tube along its circumference \\(2\\pi r\\). The force of surface tension is \\(T \\times 2\\pi r\\), along the tangent to the meniscus, at \\(\\theta\\) to the wall.\n" +
        "- Its vertical component \\(2\\pi r T\\cos\\theta\\) acts upward.\n" +
        "- Weight of the raised column (the small volume of the meniscus neglected): \\(\\pi r^2 h\\rho g\\).\n" +
        "- At equilibrium \\(\\pi r^2 h\\rho g = 2\\pi r T\\cos\\theta\\), so \\(h = \\dfrac{2T\\cos\\theta}{r\\rho g}\\).\n" +
        "- The same result follows from pressure: below the concave meniscus the pressure is less than atmospheric by \\(\\dfrac{2T}{R}\\), with \\(R = \\dfrac{r}{\\cos\\theta}\\), and the column makes up the difference, \\(h\\rho g = \\dfrac{2T}{R}\\).\n" +
        "- For an obtuse \\(\\theta\\) (mercury in glass), \\(\\cos\\theta\\) is negative and \\(h\\) is negative: the level falls.",
      formula: {
        label: "Capillary rise",
        latex: "h = \\frac{2T\\cos\\theta}{r\\rho g}",
        symbols: [
          { symbol: "\\(h\\)", meaning: "height of rise above the outside level" },
          { symbol: "\\(\\theta\\)", meaning: "angle of contact" },
          { symbol: "\\(r\\)", meaning: "radius of the bore of the tube" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the height to which water rises in a clean glass capillary of radius 0.2 mm. Surface tension of water \\(= 0.072\\) N/m, angle of contact \\(= 0^{\\circ}\\), density \\(= 1000\\) kg/m³, \\(g = 9.8\\) m/s².",
        steps: [
          "Given: \\(r = 0.2\\) mm \\(= 2 \\times 10^{-4}\\) m, \\(T = 0.072\\) N/m, \\(\\cos\\theta = 1\\), \\(\\rho = 1000\\) kg/m³.",
          "Formula: \\(h = \\dfrac{2T\\cos\\theta}{r\\rho g}\\).",
          "Substitution: \\(h = \\dfrac{2 \\times 0.072 \\times 1}{2 \\times 10^{-4} \\times 1000 \\times 9.8} = \\dfrac{0.144}{1.96} = 0.0735\\) m.",
        ],
        answer: "0.0735 m, about 7.3 cm",
      },
      selfCheckExample: {
        prompt:
          "A liquid of density 1200 kg/m³ rises 2 cm in a capillary of diameter 1 mm. The angle of contact is zero. Find its surface tension. (\\(g = 9.8\\) m/s²)",
        steps: [
          "\\(r = 0.5\\) mm \\(= 5 \\times 10^{-4}\\) m.",
          "\\(T = \\dfrac{rh\\rho g}{2\\cos\\theta} = \\dfrac{5 \\times 10^{-4} \\times 0.02 \\times 1200 \\times 9.8}{2} = 0.0588\\) N/m.",
        ],
        answer: "0.0588 N/m",
      },
      practiceSet: [
        {
          prompt: "In the derivation of capillary rise, why is only \\(2\\pi r T\\cos\\theta\\) used and not \\(2\\pi r T\\)?",
          answer: "Only the vertical component of the surface tension force holds up the column",
        },
        { prompt: "Why does the liquid stop rising in a capillary tube?", answer: "The weight of the raised column becomes equal to the upward component of the surface tension force" },
        { prompt: "What does a negative value of h mean?", answer: "The liquid level in the tube falls below the outside level (obtuse angle of contact)" },
      ],
      pyqExampleId: "c4afe8e3-484b-4bf5-bfb5-278d5a8ac4bd",
      traps: [
        {
          title: "Leaving out cos θ",
          body: "The surface tension force acts along the tangent at the angle of contact, not straight up. Without \\(\\cos\\theta\\) the derivation is incomplete.",
        },
        {
          title: "No diagram in the derivation",
          body: "Draw the tube, the concave meniscus, the angle \\(\\theta\\), the height \\(h\\) and the force \\(T\\) along the tangent. The diagram carries a mark of its own.",
        },
        {
          title: "Weight of the column written with the diameter",
          body: "The column is a cylinder of radius \\(r\\): its volume is \\(\\pi r^2 h\\). Using the diameter makes the result four times wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpmf-capillary-calc",
      name: "Capillary calculations",
      intuition:
        "Most board calculations change one thing and keep the rest the same. For one liquid in tubes of the same glass, only the radius changes, so the rise goes as one over the radius. Turn the formula round and the same rise measures the surface tension or the angle of contact.",
      definition:
        "- Same liquid, same glass, same temperature: \\(T\\), \\(\\theta\\), \\(\\rho\\) and \\(g\\) are fixed, so \\(h \\propto \\dfrac{1}{r}\\) and \\(h_1 r_1 = h_2 r_2\\).\n" +
        "- Surface tension by capillary rise: \\(T = \\dfrac{rh\\rho g}{2\\cos\\theta}\\).\n" +
        "- Angle of contact: \\(\\cos\\theta = \\dfrac{rh\\rho g}{2T}\\). For a fall, put \\(h\\) negative; \\(\\cos\\theta\\) comes out negative and \\(\\theta\\) is obtuse.\n" +
        "- Use SI units throughout: \\(r\\) and \\(h\\) in m, \\(T\\) in N/m, \\(\\rho\\) in kg/m³.",
      formula: {
        label: "Same liquid, two tubes",
        latex: "h \\propto \\frac{1}{r} \\quad \\Rightarrow \\quad h_1 r_1 = h_2 r_2",
      },
      authoredExample: {
        prompt:
          "A liquid of surface tension 0.05 N/m and density 900 kg/m³ rises 4 cm in a capillary of radius 0.2 mm. Find the angle of contact. (\\(g = 9.8\\) m/s²)",
        steps: [
          "Given: \\(T = 0.05\\) N/m, \\(\\rho = 900\\) kg/m³, \\(h = 0.04\\) m, \\(r = 2 \\times 10^{-4}\\) m.",
          "Formula: \\(\\cos\\theta = \\dfrac{rh\\rho g}{2T}\\).",
          "Substitution: \\(\\cos\\theta = \\dfrac{2 \\times 10^{-4} \\times 0.04 \\times 900 \\times 9.8}{2 \\times 0.05} = \\dfrac{0.07056}{0.1} = 0.7056\\).",
          "\\(\\theta = \\cos^{-1}(0.7056) \\approx 45^{\\circ}\\).",
        ],
        answer: "About 45°",
      },
      selfCheckExample: {
        prompt:
          "A glass capillary of radius 1 mm dips in mercury. Surface tension of mercury \\(= 0.465\\) N/m, density \\(= 13600\\) kg/m³, \\(\\cos\\theta = -0.77\\). Find the change in level. (\\(g = 9.8\\) m/s²)",
        steps: [
          "\\(h = \\dfrac{2 \\times 0.465 \\times (-0.77)}{10^{-3} \\times 13600 \\times 9.8} = \\dfrac{-0.716}{133.3} = -5.37 \\times 10^{-3}\\) m.",
          "The minus sign means a fall.",
        ],
        answer: "The mercury falls about 5.4 mm below the outside level",
      },
      practiceSet: [
        { prompt: "Rearrange the capillary rise formula to give the surface tension.", answer: "\\(T = \\dfrac{rh\\rho g}{2\\cos\\theta}\\)" },
        {
          prompt: "Water rises 4 cm in a capillary on Earth. How high would it rise in the same tube where g is half as large?",
          answer: "8 cm, since \\(h \\propto 1/g\\)",
        },
        { prompt: "A liquid meets a tube at an angle of contact of 90°. How far does it rise?", answer: "Not at all: \\(\\cos 90^{\\circ} = 0\\), so \\(h = 0\\)" },
      ],
      pyqExampleId: "2c48ea50-8c6a-45ac-896b-046528ba2f7f",
      traps: [
        {
          title: "Rise proportional to the radius",
          body: "The rise goes as \\(1/r\\): the narrower tube gives the greater rise. Inverting the ratio gives the wrong option in an MCQ.",
        },
        {
          title: "Losing the sign for mercury",
          body: "For mercury the level falls, so \\(h\\) is negative and \\(\\cos\\theta\\) is negative. Write the angle as obtuse, more than 90°.",
        },
        {
          title: "Radius in millimetres",
          body: "Convert the radius to metres before substituting. A radius left in mm makes \\(h\\) a thousand times too small.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpmf-capillarity-uses",
      name: "Capillarity in daily life",
      intuition:
        "Any material full of fine pores or narrow gaps acts like a bundle of capillary tubes. A liquid that wets the material climbs into the gaps on its own.",
      definition:
        "- **Capillarity** (capillary action) is the rise or fall of a liquid in a tube of very fine bore dipped in the liquid.\n" +
        "- A liquid that wets the tube (acute angle of contact, concave meniscus) rises; one that does not wet it (obtuse angle, convex meniscus) falls.\n" +
        "- When the board asks for applications, name two and say in one line how capillarity acts in each.",
      table: {
        columns: ["Example", "How capillarity acts"],
        rows: [
          {
            cells: ["Blotting paper", "Its fine pores act as capillaries and draw up the ink"],
            pyqExampleId: "9cdc74d0-9804-47cc-ac56-9ef3b86941c5",
            noteAmber: "Board 2026 asked which phenomenon blotting paper shows.",
          },
          {
            cells: ["Wick of a lamp", "Oil rises through the fine pores of the wick to the flame"],
            pyqExampleId: "86aa3eb9-03c1-4f7f-ae83-275b728a5cff",
            noteAmber: "Board 2020 asked what capillarity is, with two applications.",
          },
          { cells: ["Towel or cloth", "Water is drawn into the fine gaps between the fibres"] },
          { cells: ["Plants", "Water rises from the roots through fine tubes in the stem"] },
        ],
      },
      practiceSet: [
        { prompt: "Define capillarity.", answer: "The rise or fall of a liquid in a tube of very fine bore dipped in the liquid" },
        { prompt: "Does mercury rise or fall in a glass capillary?", answer: "It falls, because it does not wet glass" },
      ],
      traps: [
        {
          title: "An application without the reason",
          body: "Naming 'wick of a lamp' alone may earn half the mark. Add the line: oil rises through the fine pores of the wick by capillary action.",
        },
      ],
    },
  ],
};
