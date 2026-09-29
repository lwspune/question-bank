import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_TD_RACES_NOTE: SubtopicNote = {
  subtopicName: "Races",
  title: "Races",
  oneLineDefinition:
    "In a race the runners' speeds are in the ratio of the distances they cover in the same time; a start or a beat is just a difference in distance or time.",
  whyItMatters:
    "Five PYQs, two of them HARD. Turn every 'A beats B by 150 m' into a speed ratio (1000 : 850), then combine ratios through a common runner. On a circular track, the winner laps the loser once for every full lap gained.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdstd-races",
      name: "Starts, beats and laps",
      intuition:
        "While the winner runs the full course, the loser runs the course minus the beat. Those two distances, run in the same time, are in the ratio of the speeds.",
      definition:
        "- 'A beats B by \\(x\\) m in a \\(D\\) m race': \\(v_A : v_B = D : (D - x)\\).\n" +
        "- 'A gives B a start of \\(s\\) m': B runs only \\(D - s\\).\n" +
        "- 'Beats by \\(t\\) seconds': B's time is A's time plus \\(t\\).\n" +
        "- Circular track of length \\(c\\): the winner passes the other once for each full \\(c\\) gained.\n" +
        "- Chain ratios through a runner common to two races.",
      formula: {
        label: "Beat by a distance",
        latex: "v_A : v_B = D : (D - x)",
      },
      authoredExample: {
        prompt: "In a \\(400\\) m race A beats B by \\(40\\) m. In a \\(500\\) m race, by how much would A beat B?",
        steps: ["\\(v_A : v_B = 400 : 360 = 10 : 9\\).", "When A runs \\(500\\) m, B runs \\(450\\) m."],
        answer: "\\(50\\) m.",
      },
      selfCheckExample: {
        prompt: "A runs \\(100\\) m in \\(20\\) s and gives B a \\(10\\) m start; they finish together. Find B's speed.",
        steps: ["B runs \\(90\\) m in \\(20\\) s."],
        answer: "\\(4.5\\) m/s.",
      },
      practiceSet: [
        { prompt: "A beats B by \\(20\\) m in \\(200\\) m. \\(v_A : v_B\\)?", answer: "\\(10 : 9\\)" },
        { prompt: "Speeds \\(3 : 2\\), \\(3\\) km race on a \\(0.5\\) km track. Times A laps B?", answer: "\\(2\\)" },
        { prompt: "A : B \\(= 5 : 4\\), B : C \\(= 6 : 5\\). A : C?", answer: "\\(3 : 2\\)" },
        { prompt: "A runs \\(100\\) m in \\(10\\) s, beats B by \\(2\\) s. B's speed?", answer: "\\(\\dfrac{25}{3}\\) m/s" },
      ],
      pyqExampleId: "70113ad8-abf5-4c79-baa6-42cbb4380b9e", // 2017 (I) — A at 5/3 m/s gives a 4 m start, beats by 12 s
      traps: [
        {
          title: "Count only complete laps",
          body:
            "Gaining \\(3.2\\) laps means passing the other runner \\(3\\) times, not \\(3.2\\) and not \\(4\\). A pass happens each time a WHOLE extra lap is gained.",
        },
      ],
    },
  ],
};
