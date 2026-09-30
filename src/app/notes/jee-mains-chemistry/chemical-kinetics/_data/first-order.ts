import type { SubtopicNote } from "@/app/notes/_types";

export const JEE_CH_KIN_FIRST_ORDER_NOTE: SubtopicNote = {
  subtopicName: "First Order Reactions and Half-Life",
  title: "First Order Reactions and Half-Life",
  oneLineDefinition:
    "k = (2.303/t) log([A]₀/[A]) and t½ = 0.693/k: a first-order half-life does not depend on the starting amount, so every time is a multiple of it set by a logarithm.",
  whyItMatters:
    "Twenty-eight PYQs, twenty-one of them numerical, and five from 2026 — the chapter's largest page. Twelve find a time, a fraction left or a rate constant from the integrated law; ten compare the times to two levels of completion, such as 99.9% against 90%, or two reactants decaying at different speeds; six use the exponential form, read a plot, turn a ratio of rates into a ratio of concentrations, or test statements. Three ideas cover the page.",
  concepts: [
    // C1 — the integrated law
    {
      kind: "formula" as const,
      slug: "jckin-first-order-time",
      name: "The integrated first-order law and the half-life",
      intuition:
        "For \\(r = k[A]\\), integrating gives \\(\\ln\\dfrac{[A]_0}{[A]} = kt\\). Only the RATIO by which the concentration falls matters, so each half-life takes the same time from any starting amount: \\(t_{1/2} = \\dfrac{0.693}{k}\\). Put in what REMAINS, not what has reacted.",
      definition:
        "- \\(k = \\dfrac{2.303}{t}\\log\\dfrac{[A]_0}{[A]}\\), or \\(t = \\dfrac{2.303}{k}\\log\\dfrac{[A]_0}{[A]}\\).\n" +
        "- \\([A]\\) is what remains: 70% decomposed means \\(\\dfrac{[A]_0}{[A]} = \\dfrac{100}{30}\\).\n" +
        "- \\(t_{1/2} = \\dfrac{0.693}{k}\\), independent of \\([A]_0\\). Unit of \\(k\\): time\\(^{-1}\\).\n" +
        "- Moles, masses or partial pressures can stand in for concentration when the volume is fixed.\n" +
        "- After \\(n\\) half-lives, \\(\\left(\\tfrac12\\right)^n\\) remains. When the ratio is a power of 2, count half-lives instead of taking logs.\n" +
        "- Logs to keep at hand: \\(\\log 2 = 0.301\\), \\(\\log 3 = 0.477\\), \\(\\log 5 = 0.699\\), \\(\\ln 10 = 2.303\\).",
      formula: {
        label: "Integrated first-order law",
        latex: "k = \\frac{2.303}{t}\\log\\frac{[A]_0}{[A]}\\qquad t_{1/2} = \\frac{0.693}{k}",
      },
      authoredExample: {
        prompt:
          "A first-order reaction has \\(t_{1/2} = 20\\) min. How long does it take for 70% of the reactant to decompose? (\\(\\log 3 = 0.477\\))",
        steps: [
          "\\(k = \\dfrac{0.693}{20} = 0.03465\\) min\\(^{-1}\\).",
          "70% decomposed leaves 30%: \\(\\log\\dfrac{100}{30} = 1 - 0.477 = 0.523\\).",
          "\\(t = \\dfrac{2.303}{0.03465} \\times 0.523 = 66.46 \\times 0.523 = 34.8\\) min.",
        ],
        answer: "About \\(34.8\\) min.",
      },
      selfCheckExample: {
        prompt:
          "A first-order reaction has \\(k = 2.303 \\times 10^{-2}\\) s\\(^{-1}\\). What percentage of the reactant remains after 50 s? (\\(\\sqrt{10} = 3.16\\))",
        steps: [
          "\\(\\log\\dfrac{[A]_0}{[A]} = \\dfrac{kt}{2.303} = \\dfrac{2.303 \\times 10^{-2} \\times 50}{2.303} = 0.5\\).",
          "\\(\\dfrac{[A]_0}{[A]} = 10^{0.5} = 3.16\\), so \\(\\dfrac{[A]}{[A]_0} = 0.316\\).",
        ],
        answer: "About \\(31.6\\%\\).",
      },
      practiceSet: [
        { prompt: "A first-order reaction has \\(t_{1/2} = 10\\) min. Find \\(k\\).", answer: "\\(0.0693\\) min\\(^{-1}\\)" },
        { prompt: "A first-order reaction has \\(k = 0.1\\) s\\(^{-1}\\). Time for \\([A]\\) to fall to one-tenth?", answer: "\\(23.03\\) s" },
        { prompt: "80% of a first-order reactant has decomposed. Value of \\([A]_0/[A]\\)?", answer: "\\(5\\)" },
        { prompt: "Fraction of a first-order reactant left after 4 half-lives?", answer: "\\(\\tfrac{1}{16}\\)" },
      ],
      pyqExampleId: "4efc8cb8-5126-4c49-9e4e-f4d4be5eb0ab", // 2026 — half-life 6.93 min, time for 99% completion
      traps: [
        {
          title: "The percent decomposed used as [A]",
          body:
            "70% decomposed leaves 30%. Use \\(\\log\\dfrac{100}{30}\\), not \\(\\log\\dfrac{100}{70}\\); the second gives a time far too short.",
        },
        {
          title: "Expiry time of a drug",
          body:
            "A drug that stops working at 50% decomposition expires after ONE half-life. If it falls to one-eighth in 18 months, that is three half-lives, so \\(t_{1/2} = 6\\) months and the expiry is 6 months — not 18, and not 9.",
        },
      ],
    },

    // C2 — ratios of completion times
    {
      kind: "formula" as const,
      slug: "jckin-completion-ratios",
      name: "Comparing the times to two levels of completion",
      intuition:
        "Every first-order time is \\(\\dfrac{2.303}{k}\\) times a logarithm. Divide two such times and \\(k\\) cancels: the ratio of times is the ratio of the logs. The same idea handles two reactants with different half-lives — write each as \\([X]_0\\left(\\tfrac12\\right)^{t/t_{1/2}}\\) and set them equal.",
      definition:
        "- \\(\\dfrac{t_1}{t_2} = \\dfrac{\\log([A]_0/[A]_1)}{\\log([A]_0/[A]_2)}\\) for one reaction.\n" +
        "- Landmarks in half-lives: \\(t_{75\\%} = 2t_{1/2}\\), \\(t_{87.5\\%} = 3t_{1/2}\\), \\(t_{90\\%} = 3.32t_{1/2}\\), \\(t_{99\\%} = 6.64t_{1/2}\\), \\(t_{99.9\\%} \\approx 10t_{1/2}\\).\n" +
        "- \\(t_{99\\%} = 2t_{90\\%}\\) and \\(t_{99.9\\%} = 3t_{90\\%}\\), since \\(\\log 100 = 2\\) and \\(\\log 1000 = 3\\).\n" +
        "- For two different reactions, bring in their \\(k\\) values: \\(k_1 : k_2\\) is the inverse of \\(t_{1/2,1} : t_{1/2,2}\\).\n" +
        "- Two decaying reactants: \\([A]_0\\left(\\tfrac12\\right)^{t/t_A} = [B]_0\\left(\\tfrac12\\right)^{t/t_B}\\), then solve for \\(t\\).",
      formula: {
        label: "Ratio of two completion times",
        latex: "\\frac{t_1}{t_2} = \\frac{\\log([A]_0/[A]_1)}{\\log([A]_0/[A]_2)}",
      },
      authoredExample: {
        prompt: "For a first-order reaction, find \\(\\dfrac{t_{99\\%}}{t_{75\\%}}\\). (\\(\\log 2 = 0.301\\))",
        steps: [
          "99% complete leaves 1%: \\(\\log 100 = 2\\). 75% complete leaves 25%: \\(\\log 4 = 0.602\\).",
          "\\(\\dfrac{t_{99\\%}}{t_{75\\%}} = \\dfrac{2}{0.602} = 3.32\\).",
        ],
        answer: "\\(3.32\\).",
      },
      selfCheckExample: {
        prompt:
          "Reactants \\(A\\) and \\(B\\) decay by first order from \\([A]_0 = 4[B]_0\\), with half-lives 10 min for \\(A\\) and 30 min for \\(B\\). When are their concentrations equal?",
        steps: [
          "\\(4[B]_0\\left(\\tfrac12\\right)^{t/10} = [B]_0\\left(\\tfrac12\\right)^{t/30}\\), so \\(4 = 2^{t/10 - t/30} = 2^{t/15}\\).",
          "\\(\\dfrac{t}{15} = 2\\), so \\(t = 30\\) min.",
        ],
        answer: "\\(30\\) min.",
      },
      practiceSet: [
        { prompt: "\\(t_{87.5\\%}\\) of a first-order reaction, in half-lives?", answer: "\\(3\\)" },
        { prompt: "\\(t_{99.9\\%} / t_{90\\%}\\) for a first-order reaction?", answer: "\\(3\\)" },
        { prompt: "\\(t_{90\\%}\\) of a first-order reaction, in half-lives?", answer: "\\(3.32\\)" },
        { prompt: "\\(t_{93.75\\%}\\) of a first-order reaction, in half-lives?", answer: "\\(4\\) (one-sixteenth left)" },
      ],
      pyqExampleId: "1ffe9994-eb1a-4919-b801-96f99cce7805", // 2026 — t to one-eighth over t to one-tenth
      traps: [
        {
          title: "67% complete read as two-thirds left",
          body:
            "67% complete leaves about one-third, so \\(t = \\dfrac{2.303}{k}\\log 3 \\approx 1.58\\,t_{1/2}\\). Using \\(\\log 1.5\\) (two-thirds left) answers the question for 33% completion.",
        },
        {
          title: "Times scaled like the percentages",
          body:
            "99.9% completion does not take about twice as long as 90%: the logs are 3 and 1, so it takes three times as long.",
        },
      ],
    },

    // C3 — exponential form, plots, rate ratios
    {
      kind: "formula" as const,
      slug: "jckin-first-order-forms",
      name: "Exponential form, straight-line plots and rate ratios",
      intuition:
        "The same law can be written as an exponential, as a straight line, or through the rate. \\([A] = [A]_0e^{-kt}\\) gives the fraction decomposed. \\(\\ln[A]\\) against \\(t\\) is a straight line of slope \\(-k\\). And because \\(r = k[A]\\), a ratio of two rates is a ratio of two concentrations.",
      definition:
        "- \\([A] = [A]_0e^{-kt}\\); fraction decomposed \\(= 1 - e^{-kt}\\).\n" +
        "- \\(\\ln\\dfrac{[A]}{[A]_0}\\) (or \\(\\ln\\dfrac{p}{p^0}\\)) against \\(t\\): straight line through the origin, slope \\(-k\\). With \\(\\log\\): slope \\(-\\dfrac{k}{2.303}\\).\n" +
        "- \\(\\dfrac{r_1}{r_2} = \\dfrac{[A]_1}{[A]_2}\\) for first order, so rates at two times feed straight into \\(k = \\dfrac{2.303}{t}\\log\\dfrac{r_1}{r_2}\\).\n" +
        "- \\(r = k[A]^{1/2}[B]^{1/2}\\) with \\([A]_0 = [B]_0\\) in a 1 : 1 reaction: \\([A] = [B]\\) throughout, so \\(r = k[A]\\), first order.\n" +
        "- A first-order reaction never reaches 100%: \\(e^{-kt}\\) is never zero.",
      formula: {
        label: "Exponential form",
        latex: "[A] = [A]_0\\,e^{-kt}\\qquad \\ln\\frac{[A]}{[A]_0} = -kt",
      },
      authoredExample: {
        prompt:
          "The rate of a first-order reaction is 0.090 mol L\\(^{-1}\\) s\\(^{-1}\\) at 10 min and 0.030 mol L\\(^{-1}\\) s\\(^{-1}\\) at 30 min. Find its half-life. (\\(\\log 2 = 0.301\\), \\(\\log 3 = 0.477\\))",
        steps: [
          "Rate \\(\\propto [A]\\), so \\([A]\\) fell by a factor of 3 in 20 min.",
          "\\(k = \\dfrac{2.303}{20}\\log 3 = 0.1152 \\times 0.477 = 0.0549\\) min\\(^{-1}\\).",
          "\\(t_{1/2} = \\dfrac{0.693}{0.0549} = 12.6\\) min.",
        ],
        answer: "About \\(12.6\\) min.",
      },
      selfCheckExample: {
        prompt:
          "For a first-order gas decomposition, the plot of \\(\\ln(p/p^0)\\) against \\(t\\) (in s) is a straight line of slope \\(-2.31 \\times 10^{-3}\\) s\\(^{-1}\\). Find the half-life.",
        steps: [
          "Slope \\(= -k\\), so \\(k = 2.31 \\times 10^{-3}\\) s\\(^{-1}\\).",
          "\\(t_{1/2} = \\dfrac{0.693}{2.31 \\times 10^{-3}} = 300\\) s.",
        ],
        answer: "\\(300\\) s.",
      },
      practiceSet: [
        { prompt: "Fraction of a first-order reactant decomposed after time \\(t\\)?", answer: "\\(1 - e^{-kt}\\)" },
        { prompt: "Slope of \\(\\log[A]\\) against \\(t\\) for a first-order reaction?", answer: "\\(-\\dfrac{k}{2.303}\\)" },
        { prompt: "\\(r = k[A]^{1/2}[B]^{1/2}\\) for \\(A + B \\rightarrow C\\) with \\([A]_0 = [B]_0\\). The reaction behaves as what order?", answer: "First order, \\(r = k[A]\\)" },
        { prompt: "The rate of a first-order reaction falls from 0.08 to 0.02 mol L\\(^{-1}\\) s\\(^{-1}\\) in 30 min. Half-life?", answer: "\\(15\\) min (two half-lives)" },
      ],
      pyqExampleId: "800d0a7d-9685-48b4-8bb8-7ce0771c9184", // 2026 — fraction decomposed, 1 − e^(−kt)
      traps: [
        {
          title: "A first-order reaction that 'completes'",
          body:
            "\\([A] = [A]_0e^{-kt}\\) is never zero, so a first-order reaction never reaches 100% in a finite time. A statement that it completes in 1000 s is false.",
        },
        {
          title: "Rate ratio used for any order",
          body:
            "A ratio of rates equals a ratio of concentrations only for first order. For second order the rate ratio is the SQUARE of the concentration ratio.",
        },
      ],
    },
  ],
};
