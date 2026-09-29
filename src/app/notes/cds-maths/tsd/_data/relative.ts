import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_TD_RELATIVE_NOTE: SubtopicNote = {
  subtopicName: "Relative Speed: Chasing and Meeting",
  title: "Relative Speed: Chasing and Meeting",
  oneLineDefinition:
    "Two movers going the same way close their gap at the difference of their speeds; going towards each other, at the sum.",
  whyItMatters:
    "Thirteen PYQs. Every chase or meeting reduces to one division — gap ÷ relative speed — once you account for a head start. Answer the quantity asked: the time, the clock time, or the distance from a particular end.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdstd-chasing",
      name: "Chasing: the same direction",
      intuition:
        "If the chaser is \\(u\\) and the one ahead is \\(v\\), the gap shrinks by \\(u - v\\) every hour. A head start in time becomes a head start in distance: speed × head-start time.",
      definition:
        "- Time to catch up \\(= \\dfrac{\\text{gap}}{u - v}\\).\n" +
        "- A head start of \\(h\\) hours at speed \\(v\\) is a gap of \\(vh\\).\n" +
        "- Distance run by the chaser until catching up \\(= u\\times\\) that time \\(= \\dfrac{u\\cdot\\text{gap}}{u - v}\\).\n" +
        "- Several chasers meeting at one instant: set each distance equal at that time.",
      formula: {
        label: "Catching up",
        latex: "t = \\dfrac{\\text{gap}}{u - v}",
      },
      authoredExample: {
        prompt: "A cyclist leaves at \\(12\\) km/hr; \\(1\\) hour later a car follows at \\(36\\) km/hr. How far from the start does the car catch him?",
        steps: ["The gap is \\(12\\) km, closing at \\(24\\) km/hr: \\(\\dfrac12\\) hour.", "The car goes \\(36\\times\\dfrac12\\)."],
        answer: "\\(18\\) km.",
      },
      selfCheckExample: {
        prompt: "A thief \\(200\\) m ahead runs at \\(9\\) km/hr; a policeman chases at \\(12\\) km/hr. How far does the thief run before being caught?",
        steps: ["\\(0.2\\) km closes at \\(3\\) km/hr: \\(\\dfrac{1}{15}\\) hour.", "Thief: \\(9\\times\\dfrac{1}{15} = 0.6\\) km."],
        answer: "\\(600\\) m.",
      },
      practiceSet: [
        { prompt: "Gap \\(10\\) km, speeds \\(50\\) and \\(40\\). Time?", answer: "\\(1\\) hour" },
        { prompt: "\\(30\\)-minute head start at \\(40\\) km/hr. Gap?", answer: "\\(20\\) km" },
        { prompt: "X at \\(u\\), Y \\(d\\) ahead at \\(v\\). Distance X walks?", answer: "\\(\\dfrac{ud}{u - v}\\)" },
        { prompt: "Gap \\(1\\) km at \\(2\\) km/hr closing. Minutes?", answer: "\\(30\\)" },
      ],
      pyqExampleId: "bc96cce3-8074-4302-8995-8e62ccbdd72e", // 2018 (II) — thief at 40, owner at 60 after half an hour
      traps: [
        {
          title: "After the theft or after the start?",
          body:
            "The owner catches up one hour after setting off, which is one and a half hours after the theft. Options pair the right distance with the wrong reference time.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdstd-meeting",
      name: "Meeting: opposite directions",
      intuition:
        "Two trains heading towards each other close the distance at the sum of their speeds. If one leaves earlier, first move it forward by its head start, then share the rest.",
      definition:
        "- Time to meet \\(= \\dfrac{\\text{remaining distance}}{u + v}\\).\n" +
        "- A later start: subtract the distance the first covered alone.\n" +
        "- After meeting, if they take \\(t_1\\) and \\(t_2\\) hours to finish, their speeds satisfy \\(\\dfrac{u}{v} = \\sqrt{\\dfrac{t_2}{t_1}}\\).\n" +
        "- 'Meet mid-route': each covers half; the difference in their times equals the difference in starts.",
      formula: {
        label: "After meeting",
        latex: "\\dfrac uv = \\sqrt{\\dfrac{t_2}{t_1}}",
      },
      authoredExample: {
        prompt: "Two places are \\(500\\) km apart. A train leaves the first at 8 a.m. at \\(50\\) km/hr; another leaves the second at 10 a.m. at \\(75\\) km/hr towards it. When do they meet?",
        steps: ["By 10 a.m. the first has covered \\(100\\) km, leaving \\(400\\) km.", "They close at \\(125\\) km/hr: \\(3.2\\) hours \\(= 3\\) h \\(12\\) min."],
        answer: "1:12 p.m.",
      },
      selfCheckExample: {
        prompt: "After passing each other, one train takes \\(9\\) hours and the other \\(4\\) hours to finish. The first runs at \\(40\\) km/hr. Find the second's speed.",
        steps: ["\\(\\dfrac{u}{v} = \\sqrt{\\dfrac{4}{9}} = \\dfrac23\\), with \\(u = 40\\)."],
        answer: "\\(60\\) km/hr.",
      },
      practiceSet: [
        { prompt: "\\(300\\) km apart, speeds \\(40\\) and \\(60\\), same start. Hours to meet?", answer: "\\(3\\)" },
        { prompt: "How far from the slower one's start?", answer: "\\(120\\) km" },
        { prompt: "Lengths \\(300\\) and \\(200\\) m, closing \\(90\\) km/hr. Crossing time?", answer: "\\(20\\) s" },
        { prompt: "After meeting: \\(16\\) h and \\(1\\) h. Speed ratio?", answer: "\\(1 : 4\\)" },
      ],
      pyqExampleId: "3a617885-eb28-4c98-92d8-e522d1782bcf", // 2022 (II) — 1320 km, 6 a.m. at 60 and 2 p.m. at 80
      traps: [
        {
          title: "Distance from which end?",
          body:
            "'How far from Q' asks for the distance the train starting at Q has covered, not the one from P. Compute both; they must add to the total.",
        },
      ],
    },
  ],
};
