import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_AN_HALFLIFE_NOTE: SubtopicNote = {
  subtopicName: "Law of Radioactive Decay, Half-Life and Average Life",
  title: "The Law of Radioactive Decay, Half-Life and Average Life",
  oneLineDefinition:
    "The law of radioactive decay and its derivation, the exponential decay curve, half-life and average life, and activity with its units, the becquerel and the curie.",
  whyItMatters:
    "16 questions. Five were set in board papers: state and derive the law of radioactive decay and draw its graph (2019, 2025), define one becquerel or give the SI unit of activity (2025), find the half-life from the decay constant (2016), and find the decay constant from two activities (2023). The textbook adds average life, the activity of a given mass, carbon dating, the strength of a cobalt source and a mixture of two phosphorus isotopes.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpan-decay-law",
      name: "The law of radioactive decay",
      intuition:
        "You can never say when one particular nucleus will decay. But in a large sample, the more nuclei there are, the more decay each second, just as a bigger crowd has more people leaving a hall every minute. A count that falls at a rate proportional to itself falls exponentially: quickly at first, then more and more slowly, never quite reaching zero.",
      definition:
        "**Law:** the number of nuclei decaying per unit time is proportional to the number of undecayed nuclei present at that instant.\n" +
        "**Derivation** (N undecayed nuclei at time t, \\(N_0\\) at t = 0):\n" +
        "- In a short time dt, \\(dN \\propto N\\,dt\\), so \\(dN = -\\lambda N\\,dt\\). \\(\\lambda\\) is the **decay constant**; the minus sign shows N decreases.\n" +
        "- Separate the variables: \\(\\dfrac{dN}{N} = -\\lambda\\,dt\\).\n" +
        "- Integrate from \\(N_0\\) at t = 0 to N at t: \\(\\int_{N_0}^{N} \\dfrac{dN}{N} = -\\lambda \\int_0^t dt\\), so \\(\\ln\\dfrac{N}{N_0} = -\\lambda t\\).\n" +
        "- Hence \\(N = N_0 e^{-\\lambda t}\\).\n" +
        "- **Activity** (decays per unit time): \\(A = -\\dfrac{dN}{dt} = \\lambda N = A_0 e^{-\\lambda t}\\), with \\(A_0 = \\lambda N_0\\).\n" +
        "- **Units of activity:** SI unit the **becquerel**, 1 Bq = 1 decay per second. Also the curie: 1 Ci = \\(3.7 \\times 10^{10}\\) Bq.\n" +
        "- **Graph:** N on the y-axis against t on the x-axis. The curve starts at \\(N_0\\), falls steeply then more slowly, passes \\(N_0/2\\) at one half-life and \\(N_0/4\\) at two, and approaches the time axis without ever touching it.",
      formula: {
        label: "Decay law",
        latex: "N = N_0 e^{-\\lambda t}, \\qquad A = \\lambda N = A_0 e^{-\\lambda t}",
        symbols: [
          { symbol: "\\(N_0\\)", meaning: "number of undecayed nuclei at t = 0" },
          { symbol: "\\(\\lambda\\)", meaning: "decay constant (per second, per day, ...)" },
          { symbol: "\\(A\\)", meaning: "activity, in becquerel" },
        ],
      },
      authoredExample: {
        prompt:
          "A sample has \\(8.0 \\times 10^{20}\\) undecayed nuclei, and its decay constant is 0.05 per day. How many undecayed nuclei are left after 20 days?",
        steps: [
          "Given: \\(N_0 = 8.0 \\times 10^{20}\\), \\(\\lambda = 0.05\\) per day, \\(t = 20\\) days.",
          "Formula: \\(N = N_0 e^{-\\lambda t}\\), with \\(\\lambda t = 0.05 \\times 20 = 1\\).",
          "Substitution: \\(N = 8.0 \\times 10^{20} \\times e^{-1} = 8.0 \\times 10^{20} \\times 0.368\\).",
          "\\(N = 2.94 \\times 10^{20}\\).",
        ],
        answer: "\\(2.94 \\times 10^{20}\\) nuclei",
      },
      selfCheckExample: {
        prompt: "What fraction of the nuclei of a radioactive sample is left undecayed after a time \\(t = 1/\\lambda\\)?",
        steps: ["\\(N/N_0 = e^{-\\lambda t} = e^{-1}\\).", "\\(e^{-1} = 0.37\\)."],
        answer: "\\(1/e\\), about 37%",
      },
      practiceSet: [
        { prompt: "Express an activity of 2 mCi in becquerel.", answer: "\\(7.4 \\times 10^7\\) Bq" },
        { prompt: "According to the decay law, after how long does a radioactive sample decay completely?", answer: "Never in a finite time: N reaches zero only as t tends to infinity" },
        { prompt: "What does the minus sign in \\(dN = -\\lambda N\\,dt\\) tell you?", answer: "The number of undecayed nuclei decreases with time" },
      ],
      pyqExampleId: "960ab823-53bb-4ab4-918d-b8fb6662fcb8",
      traps: [
        {
          title: "A graph with no labels or a straight line",
          body: "The decay curve is exponential, not a straight line. Label the axes (N and t), mark \\(N_0\\) on the N axis, and mark \\(N_0/2\\) at \\(T_{1/2}\\).",
        },
        {
          title: "Defining the becquerel without 'per second'",
          body: "1 Bq is one decay (disintegration) per second. 'One disintegration' alone is not a unit of activity.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpan-half-life",
      name: "Half-life and average life",
      intuition:
        "Exponential decay has a lovely property: it always takes the same time to lose half of whatever is left. That time is the half-life. After one half-life half remain, after two a quarter, after three an eighth, however many you started with. Different nuclei live for different times; their average lifetime is a little longer than the half-life.",
      definition:
        "**Derivation of the half-life:**\n" +
        "- Put \\(N = N_0/2\\) at \\(t = T_{1/2}\\) in \\(N = N_0 e^{-\\lambda t}\\): \\(\\dfrac{N_0}{2} = N_0 e^{-\\lambda T_{1/2}}\\).\n" +
        "- So \\(e^{\\lambda T_{1/2}} = 2\\), and \\(T_{1/2} = \\dfrac{\\ln 2}{\\lambda} = \\dfrac{0.693}{\\lambda}\\).\n" +
        "- After n half-lives the number left is \\(N_0/2^n\\).\n" +
        "- **Average life** \\(\\tau = \\dfrac{1}{\\lambda}\\), so \\(T_{1/2} = 0.693\\,\\tau\\).\n" +
        "- \\(\\lambda\\), \\(T_{1/2}\\) and \\(\\tau\\) must be in matching time units (per day with days, per second with seconds).",
      formula: {
        label: "Half-life and average life",
        latex: "T_{1/2} = \\frac{0.693}{\\lambda}, \\qquad \\tau = \\frac{1}{\\lambda}, \\qquad N = \\frac{N_0}{2^n}",
      },
      authoredExample: {
        prompt:
          "The half-life of a radioactive substance is 5 days. Find its decay constant, its average life and the fraction of a sample left after 20 days.",
        steps: [
          "Given: \\(T_{1/2} = 5\\) days, \\(t = 20\\) days.",
          "Decay constant: \\(\\lambda = \\dfrac{0.693}{T_{1/2}} = \\dfrac{0.693}{5} = 0.1386\\) per day.",
          "Average life: \\(\\tau = \\dfrac{1}{\\lambda} = \\dfrac{1}{0.1386} = 7.215\\) days.",
          "20 days is \\(n = 20/5 = 4\\) half-lives, so the fraction left is \\(1/2^4 = 1/16\\).",
        ],
        answer: "0.1386 per day; 7.215 days; 1/16",
      },
      selfCheckExample: {
        prompt: "A radioactive sample has a half-life of 2 hours. What fraction of it has decayed after 6 hours?",
        steps: ["6 hours is 3 half-lives, so the fraction left is \\(1/2^3 = 1/8\\).", "Fraction decayed \\(= 1 - 1/8 = 7/8\\)."],
        answer: "7/8",
      },
      practiceSet: [
        { prompt: "How many half-lives must pass for a radioactive sample to fall to 1/32 of its initial number?", answer: "5" },
        { prompt: "A sample falls to one quarter of its initial number in 12 days. Find its half-life.", answer: "6 days" },
        { prompt: "Which is longer for the same species: the half-life or the average life?", answer: "The average life (\\(\\tau = T_{1/2}/0.693\\))" },
      ],
      pyqExampleId: "d360b5d8-f593-4746-ba47-24db87db642c",
      traps: [
        {
          title: "Reading 'decayed' as 'left'",
          body: "\\(N_0/2^n\\) is what is LEFT. The fraction decayed is \\(1 - 1/2^n\\): after two half-lives, 3/4 has decayed.",
        },
        {
          title: "Mixing time units",
          body: "If \\(\\lambda\\) is per year, \\(T_{1/2}\\) comes out in years. Convert before you substitute, and write the unit with the answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpan-activity",
      name: "Activity, two readings and the mass of a source",
      intuition:
        "Activity is what a counter actually measures: decays per second. It is λN, so it falls with exactly the same exponential as N. Two readings of activity, taken some time apart, therefore give the decay constant directly, without knowing how much was there at the start. And to know N for a given mass, count the atoms the chemistry way, with Avogadro's number.",
      definition:
        "- \\(A = \\lambda N\\), so \\(A = A_0 e^{-\\lambda t}\\).\n" +
        "- **Two readings** \\(A_1\\) at \\(t_1\\) and \\(A_2\\) at \\(t_2\\): \\(\\dfrac{A_2}{A_1} = e^{-\\lambda(t_2 - t_1)}\\), so \\(\\lambda = \\dfrac{1}{t_2 - t_1}\\ln\\dfrac{A_1}{A_2}\\).\n" +
        "- **Number of nuclei in a mass m** of a species of gram atomic mass M: \\(N = \\dfrac{m}{M} \\times N_A\\), with \\(N_A = 6.022 \\times 10^{23}\\) per mole.\n" +
        "- **Carbon dating:** a living sample fixes the starting activity per gram \\(A_0\\); the age of an old sample of activity A is \\(t = \\dfrac{1}{\\lambda}\\ln\\dfrac{A_0}{A}\\).\n" +
        "- **Parent and daughter:** the number of daughter nuclei stays constant when they are made as fast as they decay, \\(N_p\\lambda_p = N_d\\lambda_d\\).",
      formula: {
        label: "Activity",
        latex: "A = \\lambda N = \\frac{0.693}{T_{1/2}}\\,N, \\qquad \\frac{A_2}{A_1} = e^{-\\lambda (t_2 - t_1)}",
      },
      authoredExample: {
        prompt:
          "Find the activity of 1 g of radium-226, whose half-life is 1600 years. (1 year = \\(3.154 \\times 10^7\\) s, \\(N_A = 6.022 \\times 10^{23}\\) per mole, 1 Ci = \\(3.7 \\times 10^{10}\\) Bq)",
        steps: [
          "Given: \\(m = 1\\) g, \\(M = 226\\) g, \\(T_{1/2} = 1600 \\times 3.154 \\times 10^7 = 5.046 \\times 10^{10}\\) s.",
          "Decay constant: \\(\\lambda = \\dfrac{0.693}{5.046 \\times 10^{10}} = 1.373 \\times 10^{-11}\\ \\text{s}^{-1}\\).",
          "Number of nuclei: \\(N = \\dfrac{1}{226} \\times 6.022 \\times 10^{23} = 2.665 \\times 10^{21}\\).",
          "Activity: \\(A = \\lambda N = 1.373 \\times 10^{-11} \\times 2.665 \\times 10^{21} = 3.66 \\times 10^{10}\\) Bq, which is about 0.99 Ci.",
        ],
        answer: "\\(3.66 \\times 10^{10}\\) Bq (about 1 Ci)",
      },
      selfCheckExample: {
        prompt: "A sample contains \\(2 \\times 10^{20}\\) radioactive nuclei with decay constant \\(3 \\times 10^{-9}\\ \\text{s}^{-1}\\). Find its activity in becquerel and in curie.",
        steps: ["\\(A = \\lambda N = 3 \\times 10^{-9} \\times 2 \\times 10^{20} = 6 \\times 10^{11}\\) Bq.", "In curie: \\(6 \\times 10^{11} / 3.7 \\times 10^{10} = 16.2\\) Ci."],
        answer: "\\(6 \\times 10^{11}\\) Bq, 16.2 Ci",
      },
      practiceSet: [
        { prompt: "How many nuclei are there in 2 g of a nuclide of mass number 200? (\\(N_A = 6.022 \\times 10^{23}\\) per mole)", answer: "\\(6.022 \\times 10^{21}\\)" },
        { prompt: "Two samples hold equal numbers of nuclei. One has a half-life of 2 days, the other 4 days. Find the ratio of their activities.", answer: "2 : 1 (activity is inversely proportional to half-life)" },
        { prompt: "In carbon dating, what fixes the activity per gram the old sample had when it died?", answer: "The activity per gram of carbon in a living sample" },
      ],
      pyqExampleId: "a81734ba-87a3-48bb-aa21-8fceb7526ec6",
      traps: [
        {
          title: "Putting the mass in place of N",
          body: "Activity is \\(\\lambda N\\), where N is a NUMBER of nuclei. Convert the mass with \\(N = (m/M)N_A\\) first.",
        },
        {
          title: "Decay constant per hour, answer wanted per second",
          body: "A decay constant found from readings in hours is per hour. To give it in SI units, divide by 3600.",
        },
      ],
    },
  ],
};
