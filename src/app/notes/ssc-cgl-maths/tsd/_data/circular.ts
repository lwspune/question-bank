import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_TD_CIRCULAR_NOTE: SubtopicNote = {
  subtopicName: "Circular Tracks",
  title: "Circular Tracks",
  oneLineDefinition:
    "On a circular track two runners meet whenever the faster has gained a whole lap (same direction) or the two together have covered a whole lap (opposite directions), and they are back at the start together after the LCM of their lap times.",
  whyItMatters:
    "Twenty-seven questions in the bank, fourteen of them MODERATE and two HARD. Three questions get asked: when do they first meet, when are they together at the starting point, and at how many points do they meet. Each has its own rule, and mixing them up is how the printed wrong options are made.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssctdct-first",
      name: "The first meeting on a circular track",
      intuition:
        "Going the same way, the faster runner meets the slower one when he has run exactly one lap more, so the lap is the gap and the difference of the speeds closes it. Going opposite ways, they meet when their two distances add up to one lap, so the sum of the speeds closes it.",
      definition:
        "- **Same direction:** first meeting after \\(\\frac{L}{s_1 - s_2}\\), and again after every such interval.\n" +
        "- **Opposite directions:** first meeting after \\(\\frac{L}{s_1 + s_2}\\).\n" +
        "- **Speeds in rounds an hour:** the same way they meet \\(r_1 - r_2\\) times an hour; opposite ways \\(r_1 + r_2\\) times.\n" +
        "- **Not starting together:** if one starts ahead on the track, the first catch closes only that start gap, not a full lap.\n" +
        "- **Meetings during a race:** the second meeting comes at twice the first meeting time, and so on. Count only the meetings before the faster runner finishes the race.\n" +
        "- Work in metres and seconds: change km/h with \\(\\frac{5}{18}\\) first.\n" +
        "- **Limit:** the two lap formulas need both runners to start from the same point at the same moment and keep steady speeds. A start gap changes only the first meeting, as above.",
      formula: {
        label: "First meeting on a circular track",
        latex: "t_{\\text{same}} = \\frac{L}{s_1 - s_2} \\qquad t_{\\text{opp}} = \\frac{L}{s_1 + s_2}",
        symbols: [
          { symbol: "\\(L\\)", meaning: "length of one lap" },
          { symbol: "\\(s_1, s_2\\)", meaning: "the two speeds, the first one the faster" },
        ],
      },
      authoredExample: {
        prompt: "Two cyclists start together from one point of a 1.8 km circular track at 18 km/h and 36 km/h. When do they first meet if they ride (a) the same way, (b) opposite ways?",
        steps: [
          "Speeds: 5 m/s and 10 m/s; the lap is 1800 m.",
          "(a) Same way: \\(\\frac{1800}{10 - 5} = 360\\) s, which is 6 minutes.",
          "(b) Opposite ways: \\(\\frac{1800}{10 + 5} = 120\\) s, which is 2 minutes.",
        ],
        answer: "(a) 6 minutes (b) 2 minutes",
      },
      selfCheckExample: {
        prompt: "Asha walks 4 rounds of a park an hour and Bina runs 10 rounds an hour, the same way, starting together at 6:00 a.m. When does Bina first pass Asha?",
        steps: [
          "Bina gains \\(10 - 4 = 6\\) rounds an hour, so she gains one round in 10 minutes.",
          "She first passes Asha at 6:10 a.m.",
        ],
        answer: "6:10 a.m.",
      },
      practiceSet: [
        {
          prompt: "On a 600 m track two runners at 5 m/s and 7 m/s start together in opposite directions. When do they first meet?",
          answer: "After 50 seconds",
          method: "\\(\\frac{600}{12}\\).",
        },
        {
          prompt: "On a 1 km circular track two cyclists at 20 km/h and 30 km/h ride the same way from one point. After how many minutes do they first meet?",
          answer: "6 minutes",
          method: "They close 1 km at 10 km/h.",
        },
        {
          prompt: "On a 500 m circular track P starts 100 m ahead of Q and both run the same way, Q at 6 m/s and P at 4 m/s. When does Q first catch P?",
          answer: "After 50 seconds",
          method: "Only the 100 m start gap is closed, at 2 m/s.",
        },
        {
          prompt: "Two walkers do 3 rounds and 5 rounds of a track an hour in opposite directions. How many times an hour do they meet?",
          answer: "8 times",
        },
      ],
      pyqExampleId: "afd52d99-a85c-44c0-8044-890a22e5709c",
      traps: [
        {
          title: "Using the difference of speeds for opposite directions",
          body:
            "Running towards each other round the track, both close the lap, so the speeds add. The difference is only for runners going the same way.",
        },
        {
          title: "Waiting for a full lap when one starts ahead",
          body:
            "If one runner starts some way ahead on the track, the first overtaking closes only that start gap. A full lap is needed only when both start from the same point.",
        },
        {
          title: "Counting a meeting after the race is over",
          body:
            "In a race of fixed length, the meetings stop when the faster runner finishes. A meeting time later than his finishing time does not count.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctdct-start",
      name: "Back at the starting point together",
      intuition:
        "A runner is at the starting point only after whole laps, that is at multiples of his lap time. Two runners are there together at a common multiple of both lap times, and the first such time is the LCM.",
      definition:
        "- **Lap time** \\(= \\frac{L}{s}\\) for each runner.\n" +
        "- **Together at the start** for the first time after the LCM of the lap times, whatever directions they run.\n" +
        "- Lap times with decimals or fractions: scale them to whole numbers, take the LCM and scale back. The LCM of 2.5 hours and 3 hours is 15 hours.\n" +
        "- **Three or more runners meeting anywhere** is a different question: the first time all of them meet is the LCM of the times between meetings of each pair, not of the lap times.\n" +
        "- **How many times at the start** in a period: divide the period by the LCM. Say plainly whether the moment of starting counts.",
      formula: {
        label: "Together at the starting point",
        latex: "t = \\text{LCM}\\left(\\frac{L}{s_1}, \\frac{L}{s_2}\\right)",
        symbols: [{ symbol: "\\(\\frac{L}{s}\\)", meaning: "a runner's time for one lap" }],
      },
      authoredExample: {
        prompt: "On a 360 m track A runs at 9 m/s and B at 6 m/s, starting together from the start line. When are they first together at the start line again?",
        steps: [
          "Lap times: \\(\\frac{360}{9} = 40\\) s and \\(\\frac{360}{6} = 60\\) s.",
          "LCM(40, 60) \\(= 120\\) s, which is 2 minutes. Check: A does 3 laps and B 2 laps.",
        ],
        answer: "After 2 minutes",
      },
      selfCheckExample: {
        prompt: "Three joggers take 6, 8 and 9 minutes for a lap and start together from the start line at 7:00 a.m. When are all three next at the start line together?",
        steps: ["LCM(6, 8, 9) \\(= 72\\) minutes.", "\\(7{:}00\\) a.m. plus 72 minutes is 8:12 a.m."],
        answer: "8:12 a.m.",
      },
      practiceSet: [
        { prompt: "Two runners take 12 minutes and 18 minutes for a lap. After how long are both at the start together?", answer: "36 minutes" },
        {
          prompt: "On a 500 m track two runners go at 5 m/s and 4 m/s from the start line. When are they first together at the start line again?",
          answer: "After 500 seconds",
          method: "Lap times 100 s and 125 s.",
        },
        {
          prompt: "Two cyclists take 1.5 hours and 2 hours for a lap. When are they first together at the start again?",
          answer: "After 6 hours",
          method: "In half hours the lap times are 3 and 4; their LCM is 12 half hours.",
        },
        {
          prompt: "Two runners with lap times of 4 minutes and 6 minutes start together. How many times are they together at the start in the next hour, not counting the start?",
          answer: "5 times",
          method: "Every 12 minutes.",
        },
      ],
      pyqExampleId: "63fb8008-96fb-4625-b143-8de141b2ca8a",
      traps: [
        {
          title: "Taking the LCM of the speeds",
          body:
            "The LCM is taken of the lap TIMES. For speeds of 4 m/s and 6 m/s on a 120 m track the lap times are 30 s and 20 s, so they are at the start together after 60 s.",
        },
        {
          title: "Giving the first meeting when the start is asked",
          body:
            "Runners can meet anywhere on the track long before both are back at the starting point. Read whether the question asks for any meeting or a meeting at the start.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctdct-points",
      name: "Distinct meeting points on a circular track",
      intuition:
        "Runners who keep going meet again and again, but only at a few fixed spots. Between two meetings each covers the same fraction of a lap as before, so the meeting points step round the track by equal amounts and come back to the start after a set number of steps.",
      definition:
        "- Write the two speeds in their **lowest ratio** \\(a : b\\).\n" +
        "- **Same direction:** they meet at \\(a - b\\) distinct points. **Opposite directions:** at \\(a + b\\) points.\n" +
        "- The points are spaced evenly round the track, and the starting point is one of them.\n" +
        "- **How many meetings in a time:** divide the time by the time between meetings and keep the whole number. Count a meeting that falls exactly at the end only if the question includes that moment.\n" +
        "- **Limit:** the rule needs a start from the same point at the same moment and steady speeds.",
      formula: {
        label: "Number of distinct meeting points",
        latex: "\\text{same direction: } a - b \\qquad \\text{opposite directions: } a + b",
        symbols: [{ symbol: "\\(a : b\\)", meaning: "the ratio of the speeds in lowest terms" }],
      },
      authoredExample: {
        prompt: "Two runners start together from one point of a circular track at 8 m/s and 6 m/s. At how many distinct points do they meet if they run (a) the same way, (b) opposite ways?",
        steps: [
          "\\(8 : 6 = 4 : 3\\) in lowest terms.",
          "(a) Same way: \\(4 - 3 = 1\\) point, the start itself. (b) Opposite ways: \\(4 + 3 = 7\\) points.",
        ],
        answer: "(a) 1 (b) 7",
      },
      selfCheckExample: {
        prompt: "M and N walk round a track in opposite directions at 3 rounds and 1 round an hour, starting together. How many times do they meet in 1 hour 50 minutes?",
        steps: [
          "Opposite ways they meet \\(3 + 1 = 4\\) times an hour, once every 15 minutes.",
          "110 minutes \\(\\div\\) 15 \\(= 7\\frac{1}{3}\\), so they meet 7 times.",
        ],
        answer: "7 times",
      },
      practiceSet: [
        { prompt: "Two runners on a circular track have speeds of 15 m/s and 10 m/s and run the same way. At how many distinct points do they meet?", answer: "1" },
        { prompt: "Two runners on a circular track have speeds of 15 m/s and 10 m/s and run in opposite directions. At how many distinct points do they meet?", answer: "5" },
        { prompt: "Two runners' speeds are in the ratio 7 : 3 and they run the same way round a track. At how many distinct points do they meet?", answer: "4" },
        {
          prompt: "Two walkers on a track meet 5 times an hour. How many times do they meet in 1 hour 30 minutes?",
          answer: "7 times",
          method: "7.5 meetings: the eighth comes after the period ends.",
        },
      ],
      pyqExampleId: "7f5b7609-9db8-4567-a2ab-c35e09a3f3b6",
      traps: [
        {
          title: "Using the speeds before reducing the ratio",
          body:
            "Speeds of 12 m/s and 18 m/s give 5 meeting points running opposite ways, from the lowest ratio 2 : 3. Adding 12 and 18 to get 30 points is wrong.",
        },
        {
          title: "Rounding up a part of a meeting",
          body:
            "10.5 meetings in a period means 10 meetings. The eleventh comes after the period is over.",
        },
      ],
    },
  ],
};
