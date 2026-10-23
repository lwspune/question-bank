import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_TW_PIPES_NOTE: SubtopicNote = {
  subtopicName: "Pipes and Cisterns",
  title: "Pipes and Cisterns",
  oneLineDefinition:
    "A pipe is a worker whose job is one tankful: filling pipes add their rates, and emptying pipes and leaks take theirs away.",
  whyItMatters:
    "Fifty-two questions in the bank, tied with work rates as the biggest page of the chapter, and thirty-four of them come from the 2024 shifts. Twenty-four are MODERATE and three HARD: inlets and outlets open together, a leak, one pipe so many times as fast as another, and pipes opened or closed partway.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssctwpc-net",
      name: "Inlets and outlets open together",
      intuition:
        "Each filling pipe adds its share of the tank every hour, and each emptying pipe takes its share away. What counts is how much is left in the tank at the end of each hour: the net rate.",
      definition:
        "- An **inlet** that fills the tank in \\(a\\) hours adds \\(\\frac{1}{a}\\) of it each hour. An **outlet** that empties a full tank in \\(b\\) hours takes away \\(\\frac{1}{b}\\) each hour.\n" +
        "- **Net rate** \\(=\\) all the inlets' rates \\(-\\) all the outlets' rates. Time to fill \\(= 1 \\div\\) net rate.\n" +
        "- **\\(n\\) identical pipes** together have \\(n\\) times one pipe's rate.\n" +
        "- **LCM units:** take the tank as the LCM of the times and give each pipe plus or minus its units an hour.\n" +
        "- **One inlet and one outlet, fast route:** the tank fills in \\(\\frac{ab}{b - a}\\) hours when \\(b > a\\). If the outlet is the faster one, a full tank empties instead.\n" +
        "- Watch the unit asked: hours \\(\\times 60\\) gives minutes.",
      formula: {
        label: "Net rate of pipes",
        latex: "\\text{Net} = \\sum \\frac{1}{a_i} - \\sum \\frac{1}{b_j} \\qquad T = \\frac{ab}{b - a}",
        symbols: [
          { symbol: "\\(a_i\\)", meaning: "hours each filling pipe needs alone" },
          { symbol: "\\(b_j\\)", meaning: "hours each emptying pipe needs to empty a full tank" },
          { symbol: "a, b", meaning: "the same two times for a single inlet and a single outlet" },
          { symbol: "T", meaning: "hours to fill the tank with both open" },
        ],
      },
      authoredExample: {
        prompt: "Pipes A and B can fill a tank in 12 hours and 15 hours. Pipe C can empty the full tank in 20 hours. All three are opened together on an empty tank. How long does it take to fill?",
        steps: [
          "Take the tank as 60 units. A adds 5 units an hour, B adds 4 and C takes away 3.",
          "Net rate \\(= 5 + 4 - 3 = 6\\) units an hour.",
          "Time \\(= 60 \\div 6 = 10\\) hours.",
          "Check: \\(\\frac{1}{12} + \\frac{1}{15} - \\frac{1}{20} = \\frac{5 + 4 - 3}{60} = \\frac{1}{10}\\).",
        ],
        answer: "10 hours",
      },
      selfCheckExample: {
        prompt: "Each of 5 inlet pipes can fill a tank in 40 hours, and each of 3 outlet pipes can empty it in 30 hours. All 8 pipes are opened on an empty tank. How long does it take to fill?",
        steps: [
          "Net rate \\(= \\frac{5}{40} - \\frac{3}{30} = \\frac{1}{8} - \\frac{1}{10} = \\frac{1}{40}\\) of the tank an hour.",
          "So the tank fills in 40 hours.",
          "Check with a 120-unit tank: each inlet adds 3 and each outlet takes away 4, so the net is \\(15 - 12 = 3\\) units an hour.",
        ],
        answer: "40 hours",
      },
      practiceSet: [
        {
          prompt: "A tap fills a tank in 6 hours and a drain empties the full tank in 9 hours. With both open, how long does the empty tank take to fill?",
          answer: "18 hours",
          method: "\\(\\frac{6 \\times 9}{9 - 6} = 18\\).",
        },
        { prompt: "Two pipes can fill a tank in 15 minutes and 10 minutes. How long do they take together?", answer: "6 minutes" },
        {
          prompt: "Three pipes fill a tank in 10, 20 and 20 hours, and a fourth pipe empties it in 4 hours. With all four open on a full tank, how long does it take to empty?",
          answer: "20 hours",
          method: "\\(\\frac{1}{10} + \\frac{1}{20} + \\frac{1}{20} - \\frac{1}{4} = -\\frac{1}{20}\\): the tank loses \\(\\frac{1}{20}\\) an hour.",
        },
      ],
      pyqExampleId: "d4edc48f-aeef-44dd-ba28-9875170b1e29",
      traps: [
        {
          title: "Adding an outlet's rate",
          body:
            "An emptying pipe works against the others, so its rate is taken away. Pipes of 12 and 15 hours with a 20-hour drain fill the tank in 10 hours; adding the drain gives a wrong 5 hours.",
        },
        {
          title: "Answering in the wrong unit",
          body:
            "If the options are in minutes, convert the hours: \\(\\frac{9}{4}\\) hours is 135 minutes.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctwpc-leak",
      name: "Finding a leak from the slower fill",
      intuition:
        "If a pipe should fill a tank in 8 hours but takes longer because of a leak, the leak drains the difference between the two rates every hour.",
      definition:
        "- **Leak rate** \\(=\\) the pipe's rate \\(-\\) the rate with the leak \\(= \\frac{1}{a} - \\frac{1}{b}\\).\n" +
        "- **Fast route:** the leak alone empties a full tank in \\(\\frac{ab}{b - a}\\) hours.\n" +
        "- \"It takes \\(k\\) hours extra\" means \\(b = a + k\\).\n" +
        "- **A leak that lets out a part of the supply:** if \\(\\frac{1}{4}\\) of the water runs out, only \\(\\frac{3}{4}\\) of the pipes' rate stays in the tank.",
      formula: {
        label: "Time for the leak to empty the tank",
        latex: "T_{\\text{leak}} = \\frac{ab}{b - a}",
        symbols: [
          { symbol: "a", meaning: "hours the pipe needs with no leak" },
          { symbol: "b", meaning: "hours it needs with the leak" },
        ],
      },
      authoredExample: {
        prompt: "A pipe can fill a tank in 10 hours. Because of a leak it takes 15 hours. How long would the leak take to empty the full tank?",
        steps: [
          "Leak rate \\(= \\frac{1}{10} - \\frac{1}{15} = \\frac{3 - 2}{30} = \\frac{1}{30}\\) of the tank an hour.",
          "So the leak empties the full tank in 30 hours.",
          "Fast route: \\(\\frac{10 \\times 15}{15 - 10} = 30\\).",
        ],
        answer: "30 hours",
      },
      selfCheckExample: {
        prompt: "A tap fills a cistern in 4 hours, but a leak makes it take 1 hour longer. How long does the leak alone take to empty the full cistern?",
        steps: [
          "With the leak the tap takes 5 hours.",
          "\\(\\frac{4 \\times 5}{5 - 4} = 20\\) hours.",
        ],
        answer: "20 hours",
      },
      practiceSet: [
        { prompt: "A pipe fills a tank in 3 hours; with a leak it takes 4 hours. How long does the leak take to empty the full tank?", answer: "12 hours" },
        {
          prompt: "Two pipes together fill \\(\\frac{1}{8}\\) of a tank an hour. A leak lets \\(\\frac{1}{5}\\) of the water out. What part of the tank is filled each hour now?",
          answer: "\\(\\frac{1}{10}\\)",
          method: "\\(\\frac{4}{5} \\times \\frac{1}{8}\\).",
        },
        {
          prompt: "A leak empties a full tank in 30 hours. A pipe that fills the tank in 10 hours is opened with the leak. How long does the empty tank take to fill?",
          answer: "15 hours",
          method: "\\(\\frac{1}{10} - \\frac{1}{30} = \\frac{1}{15}\\).",
        },
      ],
      pyqExampleId: "bfb0fd53-7d08-4a2b-9ac0-3e2e4d979ee6",
      traps: [
        {
          title: "Taking the extra hours as the leak's time",
          body:
            "If a leak makes a 10-hour fill take 2 hours longer, the leak does not empty the tank in 2 hours. It takes \\(\\frac{10 \\times 12}{12 - 10} = 60\\) hours.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctwpc-ratio",
      name: "One pipe so many times as fast as another",
      intuition:
        "If one pipe is 3 times as fast as another, call the slow pipe's rate r and the fast one's 3r. Together they are worth 4 slow pipes, and the time with both open gives r.",
      definition:
        "- **\"k times as fast\":** rates \\(r\\) and \\(kr\\). Together \\((k + 1)r = \\frac{1}{T}\\), so the slower pipe alone takes \\((k + 1)T\\) and the faster takes \\(\\frac{(k + 1)T}{k}\\).\n" +
        "- **\"One and a half times as fast\"** is a rate ratio of \\(3 : 2\\). Write every ratio in whole numbers first.\n" +
        "- **\"Takes \\(\\frac{4}{5}\\) of the time\"** means the rates are \\(5 : 4\\), because time and rate are inverse.\n" +
        "- **Times that differ by a fixed amount:** call them \\(x\\) and \\(x + d\\), write \\(\\frac{1}{x} + \\frac{1}{x + d} = \\frac{1}{T}\\) and solve the quadratic. Testing the options in product over sum is often quicker.",
      formula: {
        label: "Pipes in a speed ratio",
        latex: "T_{\\text{slow}} = (k + 1)T \\qquad T_{\\text{fast}} = \\frac{(k + 1)T}{k}",
        symbols: [
          { symbol: "k", meaning: "how many times as fast the faster pipe is" },
          { symbol: "T", meaning: "time to fill with both pipes open" },
        ],
      },
      authoredExample: {
        prompt: "One pipe fills a tank 3 times as fast as another. Together they fill it in 30 minutes. How long does the slower pipe take alone?",
        steps: [
          "Rates \\(r\\) and \\(3r\\), so together \\(4r = \\frac{1}{30}\\) and \\(r = \\frac{1}{120}\\).",
          "The slower pipe takes 120 minutes, and the faster \\(\\frac{120}{3} = 40\\) minutes.",
          "Check: \\(\\frac{1}{120} + \\frac{1}{40} = \\frac{1 + 3}{120} = \\frac{1}{30}\\).",
        ],
        answer: "120 minutes",
      },
      selfCheckExample: {
        prompt: "Two pipes together fill a tank in 12 hours. One of them, alone, takes 10 hours less than the other. How long does the faster pipe take alone?",
        steps: [
          "Let the faster take \\(x\\) hours and the slower \\(x + 10\\). Then \\(\\frac{1}{x} + \\frac{1}{x + 10} = \\frac{1}{12}\\).",
          "\\(12(2x + 10) = x(x + 10)\\), so \\(x^2 - 14x - 120 = 0\\), that is \\((x - 20)(x + 6) = 0\\).",
          "A time cannot be negative, so \\(x = 20\\). Check: \\(\\frac{20 \\times 30}{50} = 12\\).",
        ],
        answer: "20 hours",
      },
      practiceSet: [
        {
          prompt: "One pipe fills a tank twice as fast as another. Together they take 20 minutes. How long does the faster pipe take alone?",
          answer: "30 minutes",
          method: "\\(\\frac{3 \\times 20}{2} = 30\\).",
        },
        { prompt: "Pipe A takes \\(\\frac{2}{3}\\) of the time pipe B takes to fill a tank. What is the ratio of their rates, A : B?", answer: "3 : 2" },
        { prompt: "One pipe is 5 times as fast as another. Together they fill a tank in 10 minutes. How long does the slower pipe take alone?", answer: "60 minutes" },
      ],
      pyqExampleId: "1f79f7ab-71b3-4563-adec-a0a8154b183e",
      traps: [
        {
          title: "Multiplying the joint time by k instead of k + 1",
          body:
            "If one pipe is 3 times as fast and together they take 30 minutes, the slower pipe alone takes \\(4 \\times 30 = 120\\) minutes, not \\(3 \\times 30\\). The two pipes together are worth \\(k + 1\\) slow pipes.",
        },
        {
          title: "Keeping the wrong root",
          body:
            "In \\(\\frac{1}{x} + \\frac{1}{x + d} = \\frac{1}{T}\\) one root makes a time negative or shorter than the joint time. Only the root that keeps every time positive and longer than the joint time is the answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctwpc-partway",
      name: "Pipes opened or closed partway",
      intuition:
        "This is workers joining and leaving with pipes: split the time into stretches, find the net rate in each, and add what each stretch fills.",
      definition:
        "- **Each stretch** fills net rate \\(\\times\\) its time. The stretches add to one tank, or to the level the question asks for.\n" +
        "- **A pipe closed \\(k\\) minutes before full:** let the total be \\(T\\); that pipe runs \\(T - k\\). Solve as for a worker who leaves before the end.\n" +
        "- **\"After how long should B be closed?\"** The pipe that runs the whole time fills its share; the rest is B's, so B's running time \\(=\\) the rest \\(\\div\\) B's rate.\n" +
        "- **Clock times:** count hours from the first opening, then add them back to the clock.\n" +
        "- **Alternate hours:** use cycles as for alternate days, but with an outlet in the cycle the tank can fill partway through an inlet's hour before the cycle ends. Stop at the first inlet hour that reaches full.\n" +
        "- **Rates that change:** after the change, use the new rates for what is left.\n" +
        "- A wall built by one worker and knocked down by another works the same way: the one knocking it down is an outlet.",
      authoredExample: {
        prompt: "Pipes A and B fill a tank in 12 hours and 18 hours. Both are opened together, and after 3 hours A is closed. How much longer does B take to fill the tank?",
        steps: [
          "Take the tank as 36 units. A fills 3 units an hour and B fills 2.",
          "In 3 hours together they fill \\(3 \\times 5 = 15\\) units, leaving 21.",
          "B alone needs \\(21 \\div 2 = 10.5\\) more hours.",
        ],
        answer: "10.5 hours",
      },
      selfCheckExample: {
        prompt: "An inlet fills a tank in 6 hours and an outlet empties it in 9 hours. On an empty tank they are opened alternately for one hour each, inlet first. After how many hours is the tank full?",
        steps: [
          "Take the tank as 18 units. The inlet adds 3 units an hour and the outlet takes away 2, so a 2-hour cycle adds 1.",
          "The tank fills during an inlet hour once the level is at least \\(18 - 3 = 15\\). That happens after 15 cycles, 30 hours.",
          "The next inlet hour adds the last 3 units, so the tank is full after 31 hours, not after 18 cycles.",
        ],
        answer: "31 hours",
      },
      practiceSet: [
        {
          prompt: "Pipes A and B fill a tank in 10 minutes and 15 minutes. Both are opened, A runs for the whole 8 minutes the tank takes to fill, and B is closed partway. For how many minutes was B open?",
          answer: "3 minutes",
          method: "A fills \\(\\frac{4}{5}\\), so B fills \\(\\frac{1}{5}\\) of the tank, which takes B 3 minutes.",
        },
        {
          prompt: "Pipe A fills a tank in 4 hours and is opened at 9 a.m. Pipe B, which also fills the tank in 4 hours, is opened at 10 a.m. When is the tank full?",
          answer: "11:30 a.m.",
          method: "At 10 a.m. \\(\\frac{1}{4}\\) is full; the rest takes \\(\\frac{3}{4} \\div \\frac{1}{2} = 1.5\\) hours.",
        },
        {
          prompt: "Pipes P and Q fill a tank in 15 minutes and 30 minutes. Both are opened, and P is closed 3 minutes before the tank is full. How long does the tank take to fill?",
          answer: "12 minutes",
          method: "\\(\\frac{T - 3}{15} + \\frac{T}{30} = 1\\).",
        },
      ],
      pyqExampleId: "772f954d-402e-445b-bd87-9a81e9822269",
      traps: [
        {
          title: "Running whole cycles with an outlet in them",
          body:
            "With an inlet adding 3 units an hour and an outlet taking 2, an 18-unit tank fills in an inlet hour once the level reaches 15, after 31 hours. Dividing 18 by the cycle's net 1 unit gives a wrong 36 hours.",
        },
      ],
    },
  ],
};
