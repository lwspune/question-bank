import type { SubtopicNote } from "@/app/notes/_types";

export const EARTH_MM_NOTE: SubtopicNote = {
  subtopicName: "The Earth's Field: Dip and Oscillating Magnets",
  title: "The Earth's Field: Dip and Oscillating Magnets",
  oneLineDefinition:
    "The earth's field B splits into a horizontal part B cos δ and a vertical part B sin δ, where δ is the angle of dip; the horizontal part is the one that cancels a magnet's field at a neutral point and sets the period of a magnet swinging in a horizontal plane.",
  whyItMatters:
    "Nine PYQs, one of them asking for a number, and none since 2023. Five resolve the earth's field into components or compare the dip read in some other plane with the true dip; four use the horizontal component, either to cancel a magnet's field or to time an oscillating needle. Each needs one relation, used with the right component.",
  concepts: [
    // C1 — components and dip
    {
      kind: "formula" as const,
      slug: "jpmm-dip",
      name: "Components of the earth's field and the angle of dip",
      intuition:
        "The earth's field at a place points down into the ground at the angle of dip δ. Its horizontal part, B cos δ, lies along the magnetic meridian; its vertical part is B sin δ. A dip circle set in some other vertical plane still feels the whole vertical part but only a share of the horizontal part, so it reads a steeper dip than the true one.",
      definition:
        "- \\(B_H = B\\cos\\delta\\), \\(B_V = B\\sin\\delta\\), \\(\\tan\\delta = B_V/B_H\\), \\(B = \\sqrt{B_H^{2} + B_V^{2}}\\).\n" +
        "- Declination is the angle between the geographic and the magnetic meridian. The dip formulas use the MAGNETIC meridian.\n" +
        "- A dip circle in a vertical plane at α to the magnetic meridian reads \\(\\delta'\\): \\(\\tan\\delta' = \\dfrac{\\tan\\delta}{\\cos\\alpha}\\). So \\(\\delta' \\geq \\delta\\), equal only in the meridian itself.\n" +
        "- In the plane perpendicular to the meridian (α = 90°) the needle stands vertical: \\(\\delta' = 90^{\\circ}\\).\n" +
        "- Apparent dips \\(\\delta_1\\) and \\(\\delta_2\\) in two perpendicular vertical planes: \\(\\cot^{2}\\delta = \\cot^{2}\\delta_1 + \\cot^{2}\\delta_2\\).\n" +
        "- At the magnetic equator δ = 0 and \\(B_V = 0\\); at a magnetic pole δ = 90° and \\(B_H = 0\\).",
      formula: {
        label: "Components, and dip in a plane at α to the meridian",
        latex:
          "B_H = B\\cos\\delta \\qquad B_V = B\\sin\\delta \\qquad \\tan\\delta' = \\frac{\\tan\\delta}{\\cos\\alpha} \\qquad \\cot^{2}\\delta = \\cot^{2}\\delta_1 + \\cot^{2}\\delta_2",
      },
      authoredExample: {
        prompt:
          "At a place the earth's total field is 0.5 G and the angle of dip is 53° \\((\\tan 53^{\\circ} = 4/3)\\). Find \\(B_H\\) and \\(B_V\\). A dip circle is then set in a vertical plane at 60° to the magnetic meridian. What dip does it show?",
        steps: [
          "From the 3-4-5 triangle, \\(\\cos\\delta = 3/5\\) and \\(\\sin\\delta = 4/5\\).",
          "\\(B_H = 0.5 \\times \\tfrac{3}{5} = 0.3\\ G\\), \\(B_V = 0.5 \\times \\tfrac{4}{5} = 0.4\\ G\\).",
          "In the turned plane only \\(B_H\\cos 60^{\\circ} = 0.15\\ G\\) is horizontal in the plane, while \\(B_V\\) is unchanged.",
          "\\(\\tan\\delta' = \\dfrac{0.4}{0.15} = \\dfrac{8}{3}\\), the same as \\(\\dfrac{\\tan\\delta}{\\cos 60^{\\circ}} = \\dfrac{4/3}{1/2}\\).",
        ],
        answer: "\\(B_H = 0.3\\ G\\), \\(B_V = 0.4\\ G\\); \\(\\delta' = \\tan^{-1}(8/3)\\)",
      },
      selfCheckExample: {
        prompt:
          "A dip circle set in a vertical plane at 60° to the magnetic meridian shows a dip of 45°. What is the true dip?",
        steps: [
          "\\(\\tan\\delta = \\tan\\delta' \\cos\\alpha = \\tan 45^{\\circ} \\times \\cos 60^{\\circ} = \\tfrac{1}{2}\\).",
          "The true dip is smaller than the apparent one, as it must be.",
        ],
        answer: "\\(\\delta = \\tan^{-1}(1/2) \\approx 26.6^{\\circ}\\)",
      },
      practiceSet: [
        { prompt: "At a place the horizontal and vertical components of the earth's field are equal. The angle of dip?", answer: "45°" },
        { prompt: "A dip circle is set in the vertical plane perpendicular to the magnetic meridian. What does it read?", answer: "90°" },
        { prompt: "A dip circle reads 45° in each of two perpendicular vertical planes. The true dip?", answer: "\\(\\tan^{-1}(1/\\sqrt{2})\\)", method: "\\(\\cot^{2}\\delta = 1 + 1 = 2\\)." },
        { prompt: "What are the angle of dip and the vertical component of the earth's field at the magnetic equator?", answer: "0° and zero" },
      ],
      pyqExampleId: "6d25a282-4539-4213-8191-23916e2bda8d", // 29 Jul 2022: total field from the vertical component and the dip
      traps: [
        {
          title: "Swapping sine and cosine",
          body: "The horizontal component is B cos δ and the vertical one is B sin δ. At a large dip the field is nearly vertical, so the vertical part is the larger one.",
        },
        {
          title: "Geographic meridian in place of magnetic",
          body: "The dip relations use the angle from the magnetic meridian. They give the same answer for the geographic meridian only when the declination is zero.",
        },
      ],
    },

    // C2 — B_H at work: neutral points and oscillations
    {
      kind: "formula" as const,
      slug: "jpmm-horizontal-field",
      name: "Horizontal component: neutral points and oscillating magnets",
      intuition:
        "A magnet that can turn only in a horizontal plane feels only the horizontal part of the earth's field. Pull it aside and it swings about the meridian like a pendulum, faster when B_H is larger. Near a fixed magnet there are points where its field exactly cancels B_H; a compass there points nowhere in particular. These are the neutral points.",
      definition:
        "- Period of a magnet swinging in a horizontal plane: \\(T = 2\\pi\\sqrt{\\dfrac{I}{MB_H}}\\). The frequency n (oscillations per minute) goes as \\(\\sqrt{MB_H/I}\\).\n" +
        "- Two magnets in the same field: \\(\\dfrac{T_1^{2}}{T_2^{2}} = \\dfrac{I_1}{I_2}\\cdot\\dfrac{M_2}{M_1}\\).\n" +
        "- One needle at two places: \\(n^{2} \\propto B_H = B\\cos\\delta\\), so \\(\\dfrac{n_1^{2}}{n_2^{2}} = \\dfrac{B_1\\cos\\delta_1}{B_2\\cos\\delta_2}\\).\n" +
        "- Neutral point: the magnet's field equals \\(B_H\\) and points the other way.\n" +
        "- N pole pointing north: the neutral points lie on the magnet's equatorial line, \\(\\dfrac{\\mu_0}{4\\pi}\\dfrac{M}{(r^{2} + l^{2})^{3/2}} = B_H\\).\n" +
        "- N pole pointing south: they lie on its axis, \\(\\dfrac{\\mu_0}{4\\pi}\\dfrac{2Mr}{(r^{2} - l^{2})^{2}} = B_H\\).",
      formula: {
        label: "Oscillation period and the frequency at two places",
        latex:
          "T = 2\\pi\\sqrt{\\frac{I}{MB_H}} \\qquad \\frac{n_1^{2}}{n_2^{2}} = \\frac{B_1\\cos\\delta_1}{B_2\\cos\\delta_2}",
      },
      authoredExample: {
        prompt:
          "A magnet swinging in a horizontal plane has a period of 2 s where \\(B_H = 0.36\\ G\\). What is its period where \\(B_H = 0.25\\ G\\)?",
        steps: [
          "I and M do not change, so \\(T \\propto 1/\\sqrt{B_H}\\).",
          "\\(T_2 = T_1\\sqrt{\\dfrac{B_{H1}}{B_{H2}}} = 2\\sqrt{\\dfrac{0.36}{0.25}} = 2 \\times 1.2\\).",
          "A weaker horizontal field gives a slower swing, so the period should rise. It does.",
        ],
        answer: "2.4 s",
      },
      selfCheckExample: {
        prompt:
          "A short bar magnet lies in the magnetic meridian with its N pole pointing north. A neutral point is found 10 cm from its centre. If \\(B_H = 0.3\\ G\\), find its magnetic moment. \\((\\mu_0/4\\pi = 10^{-7}\\ T\\,m\\,A^{-1},\\ 1\\ G = 10^{-4}\\ T)\\)",
        steps: [
          "With the N pole north, the neutral point is on the equatorial line, where the short-magnet field is \\(\\dfrac{\\mu_0}{4\\pi}\\dfrac{M}{r^{3}}\\).",
          "\\(10^{-7} \\times \\dfrac{M}{(0.1)^{3}} = 3 \\times 10^{-5}\\).",
          "\\(M = \\dfrac{3 \\times 10^{-5} \\times 10^{-3}}{10^{-7}} = 0.3\\ A\\,m^{2}\\).",
        ],
        answer: "\\(0.3\\ A\\,m^{2}\\)",
      },
      practiceSet: [
        { prompt: "Two magnets with equal moments of inertia swing in the same field with periods 1 s and 2 s. Find \\(M_1 : M_2\\).", answer: "4 : 1" },
        { prompt: "A needle makes 15 oscillations a minute where the dip is 60°. How many a minute at a place with the same total field and zero dip?", answer: "\\(15\\sqrt{2} \\approx 21\\)", method: "\\(n^{2} \\propto \\cos\\delta\\): \\(n^{2} = 225 \\times 2\\)." },
        { prompt: "A bar magnet lies in the meridian with its N pole pointing south. On which line do the neutral points lie?", answer: "On its axis" },
        { prompt: "A magnet's moment of inertia is made four times larger, with M and B_H unchanged. What happens to its period?", answer: "It doubles" },
      ],
      pyqExampleId: "832347df-7e3f-4010-910c-c7077df58f21", // 27 Jul 2022: oscillation magnetometer at two dips
      traps: [
        {
          title: "Using the total field for the period",
          body: "A needle swinging in a horizontal plane responds to B cos δ only. When the dip changes from place to place, the cos δ factor must go into the comparison.",
        },
        {
          title: "Oscillations per minute are a frequency",
          body: "The square of the number of oscillations per minute is proportional to B_H. The square of the period is inversely proportional to it. Mixing the two inverts the ratio.",
        },
      ],
    },
  ],
};
