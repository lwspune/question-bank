import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_TD_RACES_NOTE: SubtopicNote = {
  subtopicName: "Races",
  title: "Races",
  oneLineDefinition:
    "In a race, beating someone by so many metres tells you where the loser is when the winner finishes, beating by so many seconds tells you how much longer the loser needs, and a head start shortens one runner's distance or time.",
  whyItMatters:
    "Seven questions in the bank, and two of them are HARD. All are straight races; races round a circular track are on the Circular Tracks page. Every one turns on reading the race statement as two distances run in the same time, or two times for the same distance.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssctdrc-beats",
      name: "Beating by a distance or by a time",
      intuition:
        "When the winner crosses the line, the loser is still running. Beating by 50 m tells you where the loser is at that moment; beating by 10 seconds tells you how much longer the loser needs. When both are given, they describe the same gap, so the loser covers those metres in those seconds.",
      definition:
        "- **A beats B by \\(x\\) m** in a race of \\(d\\) m: in A's time, B runs \\(d - x\\). Their speeds are in the ratio \\(d : (d - x)\\).\n" +
        "- **A beats B by \\(t\\) s:** B's time \\(=\\) A's time \\(+ t\\).\n" +
        "- **By \\(x\\) m or \\(t\\) s:** B runs those \\(x\\) metres in \\(t\\) seconds, so B's speed is \\(\\frac{x}{t}\\). B's time for the race is \\(d\\) over that speed, and A's time is \\(t\\) less.\n" +
        "- **A beats both B and C:** B's and C's distances when A finishes give their speed ratio. Scale C's distance up to B's full race, then subtract, for the margin by which B beats C.",
      formula: {
        label: "Beating margins",
        latex: "\\frac{s_A}{s_B} = \\frac{d}{d - x} \\qquad s_B = \\frac{x}{t}",
        symbols: [
          { symbol: "\\(d\\)", meaning: "length of the race" },
          { symbol: "\\(x\\)", meaning: "winning margin in metres" },
          { symbol: "\\(t\\)", meaning: "winning margin in seconds" },
        ],
      },
      authoredExample: {
        prompt: "In a 600 m race A beats B by 60 m and A beats C by 105 m. By how many metres does B beat C in a 600 m race?",
        steps: [
          "When A runs 600 m, B runs 540 m and C runs 495 m, so B and C run in the ratio 540 : 495.",
          "When B runs 600 m, C runs \\(495 \\times \\frac{600}{540} = 550\\) m.",
          "B beats C by \\(600 - 550 = 50\\) m.",
        ],
        answer: "50 m",
      },
      selfCheckExample: {
        prompt: "In an 800 m race P beats Q by 40 m or by 8 seconds. How long does P take to run the race?",
        steps: [
          "Q runs 40 m in 8 seconds, so Q's speed is 5 m/s and Q takes \\(\\frac{800}{5} = 160\\) seconds.",
          "P finishes 8 seconds earlier: 152 seconds.",
        ],
        answer: "152 seconds",
      },
      practiceSet: [
        {
          prompt: "In a 400 m race A finishes in 50 seconds and B in 64 seconds. By how many metres does A beat B?",
          answer: "87.5 m",
          method: "B runs \\(\\frac{400}{64} = 6.25\\) m/s, so in 50 seconds he covers 312.5 m.",
        },
        { prompt: "In a 1000 m race X beats Y by 200 m. What is the ratio of X's speed to Y's speed?", answer: "5 : 4" },
        { prompt: "A beats B by 25 m in a 500 m race. How far has B run when A finishes?", answer: "475 m" },
        {
          prompt: "In a race A beats B by 45 m or by 9 seconds. What is B's speed?",
          answer: "5 m/s",
          method: "B runs 45 m in 9 seconds.",
        },
      ],
      pyqExampleId: "e809653c-5825-4f3a-8447-b1a131d46a75",
      traps: [
        {
          title: "Taking the margin as the loser's distance",
          body:
            "Beating someone by 80 m in a 1000 m race means the loser has run 920 m when the winner finishes. The 80 m is the gap, not the loser's distance.",
        },
        {
          title: "Subtracting the two margins",
          body:
            "If A beats B by 100 m and C by 190 m in a 1000 m race, B does not beat C by 90 m. When B finishes, C has run \\(810 \\times \\frac{1000}{900} = 900\\) m, so B wins by 100 m.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctdrc-start",
      name: "Head starts and dead heats",
      intuition:
        "A head start of \\(x\\) metres shortens the slower runner's race to \\(d - x\\), and a head start of \\(t\\) seconds lets him run \\(t\\) seconds longer. A dead heat means both reach the line at the same moment, so the two runs take the same time.",
      definition:
        "- **Head start in metres, dead heat:** \\(\\frac{d}{d - x} = \\frac{s_A}{s_B}\\).\n" +
        "- **Head start in seconds, dead heat:** B's time \\(=\\) A's time \\(+ t\\).\n" +
        "- **How long must the race be for a dead heat?** With speeds in the ratio \\(k : 1\\) and a head start of \\(x\\) m, \\(d = \\frac{kx}{k - 1}\\).\n" +
        "- **Two races, two unknowns:** write each race as the slower runner's distance \\(=\\) his speed \\(\\times\\) his time, and subtract one equation from the other. Check both races with your answer.",
      formula: {
        label: "Dead heat with a head start",
        latex: "\\frac{d}{d - x} = \\frac{s_A}{s_B} \\qquad d = \\frac{kx}{k - 1}",
        symbols: [
          { symbol: "\\(x\\)", meaning: "head start given to the slower runner, in metres" },
          { symbol: "\\(k\\)", meaning: "how many times as fast the faster runner is" },
        ],
      },
      authoredExample: {
        prompt: "A runs 1.5 times as fast as B. If A gives B a start of 110 m, how long must the race be for a dead heat?",
        steps: [
          "\\(d = \\frac{1.5 \\times 110}{1.5 - 1} = \\frac{165}{0.5} = 330\\) m.",
          "Check: B runs 220 m while A runs 330 m, and \\(330 : 220 = 3 : 2\\).",
        ],
        answer: "330 m",
      },
      selfCheckExample: {
        prompt: "In a 300 m race A gives B a start of 5 seconds and they finish together. B runs at 4 m/s. How long does A take?",
        steps: [
          "B takes \\(\\frac{300}{4} = 75\\) seconds.",
          "B started 5 seconds earlier and they finish together, so A takes \\(75 - 5 = 70\\) seconds.",
        ],
        answer: "70 seconds",
      },
      practiceSet: [
        { prompt: "A is twice as fast as B. What start in metres lets B tie with A in a 200 m race?", answer: "100 m" },
        {
          prompt: "A's and B's speeds are in the ratio 5 : 4. In a 500 m race, what start should A give B for a dead heat?",
          answer: "100 m",
          method: "B runs 400 m in A's time.",
        },
        {
          prompt: "In a 100 m race A takes 12 seconds and B takes 15 seconds. How many seconds' start can A give B and still tie?",
          answer: "3 seconds",
        },
        {
          prompt: "In a 400 m race A gives B a 40 m start and they finish together. What is the ratio of A's speed to B's speed?",
          answer: "10 : 9",
          method: "\\(400 : 360\\).",
        },
      ],
      pyqExampleId: "5208e6a1-074a-424f-b040-09cd5770064e",
      traps: [
        {
          title: "Adding the head start to the leader's distance",
          body:
            "A start of \\(x\\) metres shortens the slower runner's race to \\(d - x\\). The faster runner still runs the full distance.",
        },
        {
          title: "Treating a dead heat as a win",
          body:
            "In a dead heat both runners take the same time, so the head start alone makes up the whole difference in speed. No margin is left over.",
        },
      ],
    },
  ],
};
