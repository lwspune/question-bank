import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_TD_AVERAGE_NOTE: SubtopicNote = {
  subtopicName: "Average Speed and Speed–Time Ratios",
  title: "Average Speed and Speed–Time Ratios",
  oneLineDefinition:
    "Average speed is total distance over total time, and over a fixed distance the times are in the inverse ratio of the speeds.",
  whyItMatters:
    "Twenty-two PYQs, the largest page in the chapter and mostly EASY. Two traps catch students: averaging the speeds instead of dividing total distance by total time, and forgetting that a slower speed means a proportionally longer time.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdstd-average-speed",
      name: "Average speed",
      intuition:
        "An average speed must reproduce the whole trip: the same distance in the same time. So it is total distance ÷ total time — and because slower legs take longer, it leans toward the slower speed.",
      definition:
        "- Average speed \\(= \\dfrac{\\text{total distance}}{\\text{total time}}\\).\n" +
        "- Equal DISTANCES at \\(a\\) and \\(b\\): the average is the harmonic mean \\(\\dfrac{2ab}{a + b}\\).\n" +
        "- Equal TIMES at \\(a\\) and \\(b\\): the average is \\(\\dfrac{a + b}{2}\\).\n" +
        "- Stoppages: with running speed \\(u\\) and overall speed \\(v\\), the train stops \\(\\dfrac{u - v}{u}\\times 60\\) minutes per hour.",
      formula: {
        label: "Equal distances",
        latex: "\\bar v = \\dfrac{2ab}{a + b}",
      },
      authoredExample: {
        prompt: "A car goes to a town at \\(60\\) km/hr and returns at \\(40\\) km/hr. Find its average speed.",
        steps: ["Equal distances: \\(\\dfrac{2\\times 60\\times 40}{100}\\)."],
        answer: "\\(48\\) km/hr.",
      },
      selfCheckExample: {
        prompt: "A man walks \\(6\\) km at \\(3\\) km/hr and then \\(10\\) km at \\(5\\) km/hr. Find his average speed.",
        steps: ["Times \\(2\\) h and \\(2\\) h: \\(16\\) km in \\(4\\) h."],
        answer: "\\(4\\) km/hr.",
      },
      practiceSet: [
        { prompt: "Out at \\(20\\), back at \\(30\\) km/hr. Average?", answer: "\\(24\\) km/hr" },
        { prompt: "\\(1\\) hour at \\(40\\) and \\(1\\) hour at \\(60\\). Average?", answer: "\\(50\\) km/hr" },
        { prompt: "Running \\(50\\), overall \\(40\\) km/hr. Minutes stopped per hour?", answer: "\\(12\\)" },
        { prompt: "Average of \\(x\\) out and \\(2x\\) back over equal distances?", answer: "\\(\\dfrac{4x}{3}\\)" },
      ],
      pyqExampleId: "3d1e060b-f0e3-4d6e-abe3-fd2caaa227ac", // 2018 (I) — 60 out, y back, average 48
      traps: [
        {
          title: "Not the average of the speeds",
          body:
            "Going at \\(60\\) and returning at \\(40\\) gives \\(48\\), not \\(50\\). The plain average is right only when equal TIMES, not equal distances, are spent at each speed.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdstd-speed-time-ratio",
      name: "Speed and time over a fixed distance",
      intuition:
        "For a fixed distance, speed × time is constant. Travel at \\(\\dfrac45\\) of your speed and you take \\(\\dfrac54\\) of your time; the extra quarter is the lateness.",
      definition:
        "- Same distance: \\(t_1 : t_2 = v_2 : v_1\\).\n" +
        "- At \\(\\dfrac pq\\) of the usual speed the time is \\(\\dfrac qp\\) of usual; the delay is \\(\\left(\\dfrac qp - 1\\right)\\times\\) usual time.\n" +
        "- 'Early at \\(a\\), late at \\(b\\)': the two times differ by early + late minutes, so \\(\\dfrac db - \\dfrac da =\\) that difference.\n" +
        "- Units: \\(1\\) km/hr \\(= \\dfrac{5}{18}\\) m/s; \\(1\\) hectare \\(= 10{,}000\\) m\\(^2\\).",
      formula: {
        label: "Fixed distance",
        latex: "v_1 t_1 = v_2 t_2",
      },
      authoredExample: {
        prompt: "At \\(\\dfrac34\\) of his usual speed a man is \\(15\\) minutes late. Find his usual time.",
        steps: ["The time becomes \\(\\dfrac43\\) of usual, so the delay is \\(\\dfrac13\\) of the usual time.", "\\(\\dfrac13t = 15\\)."],
        answer: "\\(45\\) minutes.",
      },
      selfCheckExample: {
        prompt: "Walking at \\(4\\) km/hr a student is \\(10\\) minutes early; at \\(3\\) km/hr, \\(5\\) minutes late. Find the distance.",
        steps: ["The times differ by \\(15\\) minutes: \\(\\dfrac d3 - \\dfrac d4 = \\dfrac14\\).", "\\(\\dfrac{d}{12} = \\dfrac14\\)."],
        answer: "\\(3\\) km.",
      },
      practiceSet: [
        { prompt: "Speeds \\(3 : 4 : 5\\). Times for the same distance?", answer: "\\(20 : 15 : 12\\)" },
        { prompt: "Speed up by \\(25\\%\\). Time changes by?", answer: "\\(-20\\%\\)" },
        { prompt: "\\(72\\) km/hr in m/s?", answer: "\\(20\\)" },
        { prompt: "\\(15\\) m/s in km/hr?", answer: "\\(54\\)" },
      ],
      pyqExampleId: "19ea5fc1-4c63-4875-bcb4-569651ed6dc8", // 2021 (I) — 4/5 of usual speed, 12 minutes late
      traps: [
        {
          title: "Early plus late",
          body:
            "'\\(40\\) minutes early at one speed and \\(40\\) minutes late at another' means the two times differ by \\(80\\) minutes, not \\(40\\) and not \\(0\\).",
        },
      ],
    },
  ],
};
