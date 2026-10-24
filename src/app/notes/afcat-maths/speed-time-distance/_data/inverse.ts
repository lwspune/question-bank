import type { SubtopicNote } from "@/app/notes/_types";

export const AF_STD_INVERSE_NOTE: SubtopicNote = {
  subtopicName: "Speed and Time in Inverse Proportion",
  title: "Speed and Time in Inverse Proportion",
  oneLineDefinition:
    "Over a fixed distance, time varies inversely with speed: ratios of speed turn upside down into ratios of time, a percent change in speed gives a different percent change in time, and a known trip gives the distance for a new speed.",
  whyItMatters:
    "Most of the page is EASY, and the one AFCAT question here (2018) is a driver behind schedule. The mark is lost by treating a percent rise in speed as the same percent cut in time: 25% faster saves 20% of the time, not 25%.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afstd-time-ratio",
      name: "Speed ratios turn into time ratios",
      intuition:
        "Over the same distance, twice the speed means half the time. So speeds in the ratio \\(a : b\\) give times in the ratio \\(b : a\\), and no distance is needed.",
      definition:
        "- Same distance: \\(\\dfrac{t_1}{t_2} = \\dfrac{v_2}{v_1}\\).\n" +
        "- At \\(\\tfrac pq\\) of the usual speed, the time is \\(\\tfrac qp\\) of the usual time.\n" +
        "- Three speeds \\(a : b : c\\): the times are \\(\\tfrac1a : \\tfrac1b : \\tfrac1c\\), cleared of fractions by the LCM.\n" +
        "- When distance and time both change, speed is distance over time: half the distance in double the time is a quarter of the speed.",
      formula: {
        label: "Same distance",
        latex: "\\dfrac{t_1}{t_2} = \\dfrac{v_2}{v_1}",
      },
      authoredExample: {
        prompt: "Three cars have speeds in the ratio \\(4 : 5 : 10\\). Find the ratio of the times they take over the same road.",
        steps: [
          "Times are \\(\\tfrac14 : \\tfrac15 : \\tfrac{1}{10}\\).",
          "Multiply by 20: \\(5 : 4 : 2\\).",
        ],
        answer: "\\(5 : 4 : 2\\).",
      },
      selfCheckExample: {
        prompt: "A train usually takes 6 h for a journey. How long does it take at \\(\\tfrac34\\) of its usual speed?",
        steps: ["The time becomes \\(\\tfrac43\\) of 6 h."],
        answer: "8 h.",
      },
      practiceSet: [
        { prompt: "A car takes 5 h. How long does it take at 1.25 times the speed?", answer: "4 h" },
        { prompt: "Two speeds are in the ratio \\(5 : 2\\). Find the ratio of the times over the same distance.", answer: "\\(2 : 5\\)" },
        { prompt: "At \\(\\tfrac57\\) of its usual speed a bus takes 14 h. What is its usual time?", answer: "10 h" },
        { prompt: "A is three times as fast as B, and B is twice as fast as C. Find the ratio of their speeds.", answer: "\\(6 : 2 : 1\\)" },
      ],
      pyqExampleId: "d14d117b-8ca4-4033-b13c-0f8f18667bb3",
      traps: [
        {
          title: "Turn the ratio upside down",
          body: "Speeds \\(4 : 5\\) do not give times \\(4 : 5\\). The faster car takes less time, so the times are \\(5 : 4\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afstd-via-distance",
      name: "Through the distance: a new speed or a new time",
      intuition:
        "When actual speeds or times are asked, find the fixed distance from the trip you know, then use it at the new speed or in the new time.",
      definition:
        "- \\(\\text{distance} = \\text{old speed} \\times \\text{old time}\\). Then new time \\(= \\dfrac{\\text{distance}}{\\text{new speed}}\\) and new speed \\(= \\dfrac{\\text{distance}}{\\text{new time}}\\).\n" +
        "- **Keeping to a schedule:** required speed \\(= \\dfrac{\\text{distance still to go}}{\\text{time still left}}\\).\n" +
        "- 'Increases its speed by 20%' means the new speed is \\(1.2\\) times the old.",
      formula: {
        label: "Keeping to a schedule",
        latex: "\\text{required speed} = \\dfrac{\\text{distance left}}{\\text{time left}}",
      },
      authoredExample: {
        prompt: "A bus must cover 280 km in 4 h. After 2 h it has covered only 110 km. At what speed must it run for the rest to arrive on time?",
        steps: [
          "Distance left: \\(280 - 110 = 170\\) km. Time left: 2 h.",
          "Required speed: \\(170 \\div 2 = 85\\) km/h.",
          "The plan was \\(280 \\div 4 = 70\\) km/h, so it must run 15 km/h faster than planned.",
        ],
        answer: "85 km/h.",
      },
      selfCheckExample: {
        prompt: "A train covers a route in 5 h at 72 km/h. How long does it take at 80 km/h?",
        steps: ["Distance: \\(72 \\times 5 = 360\\) km.", "At 80 km/h: \\(360 \\div 80 = 4.5\\) h."],
        answer: "4 h 30 min.",
      },
      practiceSet: [
        { prompt: "A car covers 210 km in 6 h. By how much must it raise its speed to do it in 5 h?", answer: "7 km/h" },
        {
          prompt: "A cyclist covers a route in 3 h at 16 km/h. He raises his speed by 25%. How long does he take now?",
          answer: "2 h 24 min",
          method: "48 km at 20 km/h.",
        },
        { prompt: "A truck at 50 km/h takes 6 h. If its speed falls by 20%, how long does it take?", answer: "7.5 h" },
      ],
      pyqExampleId: "4272546c-474b-4fa9-ba8a-8e3048e49d8d",
      traps: [
        {
          title: "Use the distance left, not the whole route",
          body: "After 110 of 280 km in 2 h, the bus needs 170 km in the 2 h left, which is 85 km/h. Dividing the whole 280 km by 2 h gives 140 km/h.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afstd-percent-change",
      name: "A percent change in speed and the change in time",
      intuition:
        "Speed times time is the fixed distance, so when speed is multiplied by a fraction, time is multiplied by the same fraction upside down. The two percentages are not equal.",
      definition:
        "- Speed up by \\(r\\%\\): time falls by \\(\\dfrac{r}{100 + r} \\times 100\\%\\).\n" +
        "- Slow down by \\(r\\%\\): time rises by \\(\\dfrac{r}{100 - r} \\times 100\\%\\).\n" +
        "- Fractions are quickest: 25% faster is \\(\\tfrac54\\) of the speed, so \\(\\tfrac45\\) of the time, which is 20% less.\n" +
        "- Time available falls from \\(T\\) to \\(T'\\): speed must rise by \\(\\dfrac{T - T'}{T'} \\times 100\\%\\).\n" +
        "- A change in speed itself, such as 80 to 64 km/h, is measured on the old speed: 16 of 80, so 20%.",
      formula: {
        label: "Speed and time move inversely",
        latex: "\\text{speed} \\times \\tfrac{a}{b} \\;\\Rightarrow\\; \\text{time} \\times \\tfrac{b}{a}",
      },
      authoredExample: {
        prompt: "A car's speed rises by 25%. By what percent does its time for a fixed trip fall?",
        steps: [
          "25% more speed is \\(\\tfrac54\\) of the speed.",
          "The time becomes \\(\\tfrac45\\) of the old time, a fall of \\(\\tfrac15\\).",
        ],
        answer: "20%.",
      },
      selfCheckExample: {
        prompt: "A bus usually takes 50 minutes. Today it leaves 10 minutes late and must still arrive on time. By what percent must it raise its speed?",
        steps: [
          "It has 40 minutes instead of 50, so the time is \\(\\tfrac45\\) of usual.",
          "The speed must be \\(\\tfrac54\\) of usual.",
        ],
        answer: "25%.",
      },
      practiceSet: [
        { prompt: "Speed falls by 20%. By what percent does the time rise?", answer: "25%" },
        { prompt: "Speed rises by 50%. By what percent does the time fall?", answer: "\\(33\\tfrac13\\%\\)" },
        { prompt: "Speed falls from 75 km/h to 60 km/h. By what percent does the time rise?", answer: "25%" },
        { prompt: "Speed falls by 40%. By what percent does the time rise?", answer: "\\(66\\tfrac23\\%\\)" },
      ],
      pyqExampleId: "d2f165be-f761-46dd-9135-83b08931ea78",
      traps: [
        {
          title: "The two percentages differ",
          body: "25% faster saves 20% of the time, not 25%. And 20% slower costs 25% more time, not 20%.",
        },
      ],
    },
  ],
};
