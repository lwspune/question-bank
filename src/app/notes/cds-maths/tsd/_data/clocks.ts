import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_TD_CLOCKS_NOTE: SubtopicNote = {
  subtopicName: "Clocks and Angles",
  title: "Clocks and Angles",
  oneLineDefinition:
    "The minute hand turns 6° a minute and the hour hand 0.5°, so the minute hand gains 5.5° every minute.",
  whyItMatters:
    "Five PYQs. Two numbers do it all: the angle between the hands at h:m is |30h − 5.5m|, and the hands coincide every 720/11 minutes. The second hand gains 354° a minute on the minute hand.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdstd-clocks",
      name: "Angles between the hands",
      intuition:
        "Treat the hands as runners on a circular track. The hour hand starts \\(30h\\) degrees ahead at \\(h\\) o'clock, and the minute hand closes that gap at \\(5.5^\\circ\\) a minute.",
      definition:
        "- Minute hand: \\(6^\\circ\\)/min. Hour hand: \\(30^\\circ\\)/hour \\(= 0.5^\\circ\\)/min. Second hand: \\(360^\\circ\\)/min.\n" +
        "- Angle at \\(h{:}m\\): \\(|30h - 5.5m|\\) (take \\(360^\\circ\\) minus it if over \\(180^\\circ\\) and the smaller angle is asked).\n" +
        "- Hands coincide after \\(h\\) o'clock at \\(\\dfrac{60h}{11}\\) minutes past: \\(\\dfrac{720}{11}\\) minutes apart, \\(11\\) times in \\(12\\) hours.\n" +
        "- Second and minute hands coincide every \\(\\dfrac{60}{59}\\) minutes.\n" +
        "- Radians: multiply degrees by \\(\\dfrac{\\pi}{180}\\).",
      formula: {
        label: "Angle between the hands",
        latex: "\\theta = |30h - 5.5m|",
      },
      authoredExample: {
        prompt: "Find the angle between the hands at \\(7{:}30\\).",
        steps: ["\\(|30\\times 7 - 5.5\\times 30| = |210 - 165|\\)."],
        answer: "\\(45^\\circ\\).",
      },
      selfCheckExample: {
        prompt: "When between \\(2\\) and \\(3\\) o'clock do the hands coincide?",
        steps: ["\\(\\dfrac{60\\times 2}{11} = \\dfrac{120}{11} = 10\\tfrac{10}{11}\\) minutes past \\(2\\)."],
        answer: "At \\(10\\tfrac{10}{11}\\) minutes past \\(2\\).",
      },
      practiceSet: [
        { prompt: "Angle at \\(3{:}00\\)?", answer: "\\(90^\\circ\\)" },
        { prompt: "Angle at \\(9{:}30\\)?", answer: "\\(105^\\circ\\)" },
        { prompt: "Degrees the hour hand turns in \\(20\\) minutes?", answer: "\\(10^\\circ\\)" },
        { prompt: "Times the hands coincide in a day?", answer: "\\(22\\)" },
      ],
      pyqExampleId: "7dff968b-4569-4d7f-b991-ccf9e9c38670", // 2022 (II) — angle at 4 hours 40 minutes
      traps: [
        {
          title: "The hour hand moves too",
          body:
            "At \\(8{:}20\\) the hour hand is not on the \\(8\\); it has moved \\(10^\\circ\\) toward the \\(9\\). Ignoring that gives \\(120^\\circ\\) instead of \\(130^\\circ\\).",
        },
      ],
    },
  ],
};
