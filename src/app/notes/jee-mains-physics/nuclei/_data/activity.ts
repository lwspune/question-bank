import type { SubtopicNote } from "@/app/notes/_types";

export const ACTIVITY_NUC_NOTE: SubtopicNote = {
  subtopicName: "Decay Constant, Activity and Two-Isotope Decay",
  title: "Decay Constant, Activity and Two-Isotope Decay",
  oneLineDefinition:
    "Each nucleus decays with a fixed chance λ per second, so N = N₀e^(−λt), the half-life is ln 2/λ, the mean life is 1/λ and the activity is λN; two decay routes add their λ's.",
  whyItMatters:
    "Twenty PYQs, four of them numerical. Ten are from 2021, only one is later than 2023 (January 2025), and none is from 2026, which fits radioactivity leaving the syllabus in 2023-24. Nine use λ directly: activity from a mass, λ from two count rates, mean life against half-life. Eleven compare two decays: two isotopes side by side, one nucleus with two routes, or a chain A → B → C.",
  concepts: [
    // C1 — decay constant, mean life, activity
    {
      kind: "formula" as const,
      slug: "jpnuc-activity",
      name: "Decay constant, mean life and activity",
      intuition:
        "Every nucleus has the same small chance λ of decaying in each second, whatever its age and whatever the temperature or chemistry. So the number decaying per second, the activity, is λ times the number present, and the sample shrinks exponentially. The half-life and the mean life are two ways of writing 1/λ.",
      definition:
        "- \\(N = N_0e^{-\\lambda t}\\), activity \\(A = -\\dfrac{dN}{dt} = \\lambda N\\), and \\(A = A_0e^{-\\lambda t}\\).\n" +
        "- Half-life \\(T_{1/2} = \\dfrac{\\ln 2}{\\lambda} \\approx \\dfrac{0.693}{\\lambda}\\); mean life \\(\\tau = \\dfrac{1}{\\lambda} = \\dfrac{T_{1/2}}{\\ln 2} \\approx 1.44\\,T_{1/2}\\). The mean life is longer.\n" +
        "- Activity from a mass: \\(N = \\dfrac{m}{M}N_A\\), λ in \\(\\text{s}^{-1}\\), then \\(A = \\lambda N\\) in becquerel. \\(1\\ \\text{Ci} = 3.7 \\times 10^{10}\\) Bq.\n" +
        "- λ from two activities: \\(\\lambda = \\dfrac{\\ln(A_1/A_2)}{t_2 - t_1}\\).\n" +
        "- Time between two amounts: \\(t_2 - t_1 = \\dfrac{1}{\\lambda}\\ln\\dfrac{N_1}{N_2}\\).\n" +
        "- A graph of \\(\\ln N\\) against t is a straight line of slope \\(-\\lambda = -1/\\tau\\).\n" +
        "- Decay does not depend on temperature, pressure or chemical state.",
      formula: {
        label: "Decay law",
        latex: "N = N_0e^{-\\lambda t}, \\qquad T_{1/2} = \\frac{\\ln 2}{\\lambda}, \\qquad \\tau = \\frac{1}{\\lambda}, \\qquad A = \\lambda N",
      },
      authoredExample: {
        prompt:
          "A nuclide has decay constant \\(2 \\times 10^{-6}\\ \\text{s}^{-1}\\) and molar mass 100 g/mol. Find the activity of 5 μg of it, in Bq and in Ci. (Avogadro's number \\(6.0 \\times 10^{23}\\))",
        steps: [
          "Moles: \\(5 \\times 10^{-6}/100 = 5 \\times 10^{-8}\\).",
          "Nuclei: \\(N = 5 \\times 10^{-8} \\times 6.0 \\times 10^{23} = 3 \\times 10^{16}\\).",
          "\\(A = \\lambda N = 2 \\times 10^{-6} \\times 3 \\times 10^{16} = 6 \\times 10^{10}\\) Bq.",
          "In curies: \\(6 \\times 10^{10}/3.7 \\times 10^{10} = 1.6\\) Ci.",
        ],
        answer: "\\(6 \\times 10^{10}\\) Bq, about 1.6 Ci",
      },
      selfCheckExample: {
        prompt:
          "A count rate falls from 5000 to 1250 per minute in 20 minutes. Find the half-life, the decay constant and the mean life.",
        steps: [
          "\\(5000/1250 = 4 = 2^{2}\\): two half-lives in 20 min, so \\(T_{1/2} = 10\\) min.",
          "\\(\\lambda = \\ln 2/10 = 0.0693\\ \\text{min}^{-1}\\).",
          "\\(\\tau = 1/\\lambda = 14.4\\) min.",
        ],
        answer: "10 min; 0.0693 per min; 14.4 min",
      },
      practiceSet: [
        { prompt: "Half-life 20 minutes. Mean life?", answer: "About 28.9 minutes" },
        { prompt: "An activity of \\(7.4 \\times 10^{8}\\) Bq in curies?", answer: "0.02 Ci" },
        { prompt: "How long, in terms of λ, for N to fall from \\(0.8N_0\\) to \\(0.4N_0\\)?", answer: "\\(\\dfrac{\\ln 2}{\\lambda}\\), one half-life" },
        { prompt: "A graph of ln N against t has slope \\(-0.05\\ \\text{s}^{-1}\\). Mean life?", answer: "20 s" },
      ],
      pyqExampleId: "82323ca8-1aeb-4267-a15e-dd3312a7e249", // 10 Apr 2023: λ = 1.5 × 10^-5 per s, 1 μg at 60 g/mol, 15 × 10^10 Bq
      traps: [
        {
          title: "λ must be in per second for becquerel",
          body: "A becquerel is one decay per second. If the half-life is in days, turn it into seconds before finding λ, or the activity is off by 86 400.",
        },
        {
          title: "Mean life is longer than half-life",
          body: "\\(\\tau = T_{1/2}/0.693\\), so the mean life is about 1.44 half-lives. Multiplying by 0.693 instead gives a value that is too small.",
        },
        {
          title: "Decay ignores conditions",
          body: "Heating, pressure or a chemical reaction does not change λ. A statement saying it does is false.",
        },
      ],
    },

    // C2 — two isotopes, two routes, a chain
    {
      kind: "formula" as const,
      slug: "jpnuc-two-decays",
      name: "Two isotopes, two routes and a decay chain",
      intuition:
        "Two isotopes decay on their own clocks, so compare them by writing each one's law and dividing. One nucleus with two ways to decay is like a tank with two drains: the rates add, so λ adds and the effective half-life is shorter than either. In a chain A → B → C, B is fed by A and drained by its own decay, so it rises, peaks and falls.",
      definition:
        "- Two isotopes: \\(\\dfrac{N_1}{N_2} = \\dfrac{N_1(0)}{N_2(0)}e^{-(\\lambda_1 - \\lambda_2)t}\\). In half-lives: \\(\\dfrac{N_1}{N_2} = \\dfrac{N_1(0)}{N_2(0)}\\,2^{-(n_1 - n_2)}\\).\n" +
        "- Given masses, change to numbers first: \\(N = \\dfrac{m}{M}N_A\\).\n" +
        "- **Two routes (parallel decay):** \\(\\lambda = \\lambda_1 + \\lambda_2\\), so \\(\\dfrac{1}{T} = \\dfrac{1}{T_1} + \\dfrac{1}{T_2}\\) and \\(T = \\dfrac{T_1T_2}{T_1 + T_2}\\).\n" +
        "- **Chain A → B → C:** \\(\\dfrac{dN_B}{dt} = \\lambda_AN_A - \\lambda_BN_B\\). \\(N_B\\) grows while A feeds it faster than it decays, peaks when \\(\\lambda_AN_A = \\lambda_BN_B\\), then falls to zero.\n" +
        "- Chain with equal λ: \\(N_B = \\left[N_B(0) + \\lambda N_A(0)t\\right]e^{-\\lambda t}\\). Starting with no B, \\(N_B\\) starts at zero.",
      formula: {
        label: "Two routes add their decay constants",
        latex: "\\lambda = \\lambda_1 + \\lambda_2, \\qquad T = \\frac{T_1T_2}{T_1 + T_2}",
      },
      authoredExample: {
        prompt:
          "A nucleus can decay by two routes with half-lives 6 h and 12 h. Find its effective half-life and the fraction left after 8 h.",
        steps: [
          "\\(T = \\dfrac{6 \\times 12}{6 + 12} = \\dfrac{72}{18} = 4\\) h.",
          "8 h is two effective half-lives.",
          "Fraction left: \\(\\left(\\tfrac{1}{2}\\right)^{2} = \\tfrac{1}{4}\\).",
        ],
        answer: "4 h; a quarter is left",
      },
      selfCheckExample: {
        prompt:
          "Isotopes X (half-life 2 h) and Y (half-life 4 h) start with equal numbers of nuclei. Find \\(N_X/N_Y\\) after 12 h.",
        steps: [
          "X: 12/2 = 6 half-lives, so \\(1/64\\) is left.",
          "Y: 12/4 = 3 half-lives, so \\(1/8\\) is left.",
          "\\(N_X/N_Y = \\dfrac{1/64}{1/8} = \\dfrac{1}{8}\\).",
        ],
        answer: "1/8",
      },
      practiceSet: [
        { prompt: "Two routes with \\(\\lambda_1 = 0.02\\ \\text{s}^{-1}\\) and \\(\\lambda_2 = 0.03\\ \\text{s}^{-1}\\). Effective half-life?", answer: "About 13.9 s", method: "\\(\\ln 2/0.05\\)" },
        { prompt: "Isotopes with decay constants λ and 3λ start equal. When is the slow one's count e times the fast one's?", answer: "\\(t = \\dfrac{1}{2\\lambda}\\)" },
        { prompt: "Chain A → B → C with equal λ and \\(N_A(0) = 3N_B(0)\\). When is \\(N_B\\) largest?", answer: "\\(t = \\dfrac{2}{3\\lambda}\\)" },
        { prompt: "1 g samples of two nuclides with molar masses 10 and 20 g/mol. Ratio of their numbers of nuclei?", answer: "2 : 1" },
      ],
      pyqExampleId: "373f5e88-f247-419d-9b9c-ad7e0a6e4984", // 26 Jun 2022: two routes, half-lives 3.0 h and 4.5 h, 1.80 h
      traps: [
        {
          title: "Add decay constants, not half-lives",
          body: "Two routes make decay faster, so the effective half-life is SHORTER than either. Adding the half-lives gives a longer one, which is always wrong.",
        },
        {
          title: "Equal masses are not equal numbers",
          body: "If two samples have the same mass but different molar masses, the lighter nuclide has more nuclei. Convert to numbers before applying the decay law.",
        },
        {
          title: "Read where B starts",
          body: "If no B is present at first, its curve starts at zero, rises and falls. If some B is present, the curve starts above zero; whether it rises first depends on how much A feeds it.",
        },
      ],
    },
  ],
};
