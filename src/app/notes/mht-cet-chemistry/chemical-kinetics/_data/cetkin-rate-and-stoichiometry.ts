import type { SubtopicNote } from "@/app/notes/_types";

export const RATE_AND_STOICHIOMETRY_NOTE: SubtopicNote = {
  subtopicName: "Rate of Reaction, Stoichiometry and Average Rate",
  title: "Rate of Reaction, Stoichiometry and Average Rate",
  oneLineDefinition:
    "For aA + bB → cC + dD the single rate is −(1/a)d[A]/dt = −(1/b)d[B]/dt = (1/c)d[C]/dt = (1/d)d[D]/dt; one species' rate converts to another's through the ratio of coefficients, and the average rate is Δ[X]/Δt.",
  whyItMatters:
    "26 PYQs, none HARD — the chapter's entry page and its most repetitive: given the rate at which one species appears or disappears, find another's (N₂ + 3H₂ → 2NH₃ and 2N₂O₅ → 4NO₂ + O₂ recur every year), write the rate expression with the right signs and reciprocals, or read a balanced equation back off a rate expression. " +
    "The only errors are a missed coefficient ratio or a sign.",
  concepts: [
    // 1 — stoichiometric relations
    {
      kind: "formula" as const,
      slug: "cetkin-average-rate-and-stoichiometric-relations",
      name: "Converting One Species' Rate to Another's: Multiply by the Coefficient Ratio",
      intuition:
        "Each mole of reaction consumes \\(a\\) of A and makes \\(c\\) of C, so C appears \\(\\dfrac{c}{a}\\) times as fast as A disappears. Divide every rate by its coefficient to get the ONE rate of reaction, then multiply by the target's coefficient.",
      definition:
        "- \\(\\text{N}_2 + 3\\text{H}_2 \\to 2\\text{NH}_3\\): NH\\(_3\\) forms twice as fast as N\\(_2\\) disappears (\\(2.22 \\times 10^{-3} \\to 4.44 \\times 10^{-3}\\)); N\\(_2\\) disappears at half the NH\\(_3\\) rate (\\(0.088 \\to 0.044\\)).\n" +
        "- \\(2\\text{N}_2\\text{O}_5 \\to 4\\text{NO}_2 + \\text{O}_2\\): O\\(_2\\) forms at half the N\\(_2\\)O\\(_5\\) rate (\\(0.02 \\to 0.01\\)); NO\\(_2\\) forms at twice it (\\(0.06 \\to 0.12\\), \\(x \\to 2x\\)); the rate of reaction from NO\\(_2\\) rising \\(5.2 \\times 10^{-3}\\) M in \\(100\\) s is \\(\\dfrac{1}{4}\\dfrac{5.2 \\times 10^{-3}}{100} = 1.3 \\times 10^{-5}\\).\n" +
        "- \\(3\\text{I}^- + \\text{S}_2\\text{O}_8^{2-} \\to \\text{I}_3^- + 2\\text{SO}_4^{2-}\\): with SO\\(_4^{2-}\\) at \\(2.2 \\times 10^{-2}\\), S\\(_2\\)O\\(_8^{2-}\\) goes at \\(1.1 \\times 10^{-2}\\) and I\\(^-\\) at \\(3.3 \\times 10^{-2}\\); SO\\(_4^{2-}\\) at \\(0.044\\) means I\\(^-\\) at \\(0.066\\).\n" +
        "- \\(2\\text{A} + \\text{B} \\to 3\\text{C}\\): C at \\(1.3 \\times 10^{-4}\\) means A at \\(\\dfrac23 \\times 1.3 \\times 10^{-4} = 8.66 \\times 10^{-5}\\). \\(\\text{A} + 3\\text{B} \\to 2\\text{C}\\): A at \\(1.4\\) means C at \\(2.8\\). \\(2\\text{NH}_3 \\to \\text{N}_2 + 3\\text{H}_2\\) with rate \\(2.5 \\times 10^{-6}\\): H\\(_2\\) at \\(7.5 \\times 10^{-6}\\).\n" +
        "- Equal coefficients, equal rates: CH\\(_3\\)Br + OH\\(^-\\) → CH\\(_3\\)OH + Br\\(^-\\), NO\\(_2\\) + CO → NO + CO\\(_2\\). Average rate \\(= \\dfrac{\\Delta[\\text{product}]}{\\Delta t}\\): \\(\\dfrac{0.05}{20} = 0.0025\\) M s\\(^{-1}\\).",
      formula: {
        label: "Rate of reaction",
        latex:
          "\\text{rate} = -\\frac{1}{a}\\frac{d[A]}{dt} = -\\frac{1}{b}\\frac{d[B]}{dt} = \\frac{1}{c}\\frac{d[C]}{dt} = \\frac{1}{d}\\frac{d[D]}{dt}",
      },
      authoredExample: {
        prompt: "For \\(4\\text{NH}_3 + 5\\text{O}_2 \\to 4\\text{NO} + 6\\text{H}_2\\text{O}\\), NH\\(_3\\) disappears at \\(0.24\\) mol dm\\(^{-3}\\) s\\(^{-1}\\). Find the rates of disappearance of O\\(_2\\) and of formation of H\\(_2\\)O.",
        steps: [
          "Rate of reaction \\(= \\dfrac{0.24}{4} = 0.06\\).",
          "O\\(_2\\): \\(5 \\times 0.06 = 0.30\\); H\\(_2\\)O: \\(6 \\times 0.06 = 0.36\\) mol dm\\(^{-3}\\) s\\(^{-1}\\).",
        ],
        answer: "O\\(_2\\): \\(0.30\\); H\\(_2\\)O: \\(0.36\\) mol dm\\(^{-3}\\) s\\(^{-1}\\)",
      },
      selfCheckExample: {
        prompt: "In \\(2\\text{SO}_2 + \\text{O}_2 \\to 2\\text{SO}_3\\), SO\\(_3\\) forms at \\(8 \\times 10^{-3}\\) mol dm\\(^{-3}\\) s\\(^{-1}\\). Find the rate of reaction and the rate of disappearance of O\\(_2\\).",
        steps: [
          "Rate \\(= \\dfrac{8 \\times 10^{-3}}{2} = 4 \\times 10^{-3}\\); O\\(_2\\) has coefficient \\(1\\), so it disappears at \\(4 \\times 10^{-3}\\).",
        ],
        answer: "Rate \\(4 \\times 10^{-3}\\); O\\(_2\\) at \\(4 \\times 10^{-3}\\) mol dm\\(^{-3}\\) s\\(^{-1}\\)",
      },
      practiceSet: [
        { prompt: "NH\\(_3\\) rate if N\\(_2\\) disappears at \\(2.22 \\times 10^{-3}\\)?", answer: "\\(4.44 \\times 10^{-3}\\)" },
        { prompt: "O\\(_2\\) rate if N\\(_2\\)O\\(_5\\) disappears at \\(0.02\\)?", answer: "\\(0.01\\)" },
        { prompt: "I\\(^-\\) rate if SO\\(_4^{2-}\\) forms at \\(0.044\\)?", answer: "\\(0.066\\)" },
        { prompt: "Average rate for \\(\\Delta[P] = 0.05\\) M in \\(20\\) s?", answer: "\\(0.0025\\) M s\\(^{-1}\\)" },
      ],
      pyqExampleId: "50589aad-c4d8-45fc-9251-f3b7d8429372",
      traps: [
        {
          title: "Multiplying when you should divide",
          body:
            "N\\(_2\\) at \\(0.044\\) means NH\\(_3\\) at \\(0.088\\); NH\\(_3\\) at \\(0.088\\) means N\\(_2\\) at \\(0.044\\). Set up the equal-rates chain and read the direction off the coefficients rather than guessing which way the factor goes.",
        },
      ],
    },

    // 2 — rate expression and reading the equation
    {
      kind: "formula" as const,
      slug: "cetkin-rate-expression-and-reading-the-equation",
      name: "Writing the Rate Expression, and Reading the Equation Back From It",
      intuition:
        "Reactants carry a minus sign (their concentration falls), products a plus; each term is divided by its own coefficient. Reverse the reading: a negative term with \\(\\dfrac12\\) in front is a reactant with coefficient \\(2\\).",
      definition:
        "- \\(\\text{N}_2 + 3\\text{H}_2 \\rightleftharpoons 2\\text{NH}_3\\): \\(-\\dfrac{d[\\text{N}_2]}{dt} = -\\dfrac13\\dfrac{d[\\text{H}_2]}{dt} = +\\dfrac12\\dfrac{d[\\text{NH}_3]}{dt}\\); cross-multiplied, \\(3\\dfrac{d[\\text{NH}_3]}{dt} = -2\\dfrac{d[\\text{H}_2]}{dt}\\).\n" +
        "- \\(2\\text{NO} + 2\\text{H}_2 \\to \\text{N}_2 + 2\\text{H}_2\\text{O}\\): \\(-\\dfrac{d[\\text{NO}]}{dt} = \\dfrac{d[\\text{H}_2\\text{O}]}{dt}\\) (same coefficient), \\(\\dfrac{d[\\text{N}_2]}{dt} = -\\dfrac12\\dfrac{d[\\text{H}_2]}{dt} = \\dfrac12\\dfrac{d[\\text{H}_2\\text{O}]}{dt}\\).\n" +
        "- Reading back: \\(-\\dfrac12\\dfrac{d[x]}{dt} = -\\dfrac{d[y]}{dt} = \\dfrac12\\dfrac{d[z]}{dt}\\) is \\(2x + y \\to 2z\\); \\(\\dfrac13\\dfrac{d[x]}{dt} = -\\dfrac12\\dfrac{d[y]}{dt} = -\\dfrac{d[Z]}{dt}\\) is \\(2y + Z \\to 3x\\); \\(-\\dfrac1a\\dfrac{d[A]}{dt} = -\\dfrac1b\\dfrac{d[B]}{dt} = \\dfrac1c\\dfrac{d[C]}{dt} = \\dfrac1d\\dfrac{d[D]}{dt}\\) is \\(aA + bB \\to cC + dD\\).\n" +
        "- Options that put a coefficient IN FRONT (\\(-3\\dfrac{d[\\text{H}_2]}{dt}\\)) instead of as a reciprocal, or drop the minus on a reactant, are the standard distractors.",
      formula: {
        label: "Signs and reciprocals",
        latex:
          "\\text{reactant: } -\\frac{1}{\\text{coeff}}\\frac{d[\\cdot]}{dt} \\qquad \\text{product: } +\\frac{1}{\\text{coeff}}\\frac{d[\\cdot]}{dt}",
      },
      authoredExample: {
        prompt: "Write the rate expression for \\(2\\text{H}_2\\text{O}_2 \\to 2\\text{H}_2\\text{O} + \\text{O}_2\\) and relate the O\\(_2\\) rate to the H\\(_2\\)O\\(_2\\) rate.",
        steps: [
          "\\(-\\dfrac12\\dfrac{d[\\text{H}_2\\text{O}_2]}{dt} = \\dfrac12\\dfrac{d[\\text{H}_2\\text{O}]}{dt} = \\dfrac{d[\\text{O}_2]}{dt}\\).",
          "So \\(\\dfrac{d[\\text{O}_2]}{dt} = -\\dfrac12\\dfrac{d[\\text{H}_2\\text{O}_2]}{dt}\\).",
        ],
        answer: "O\\(_2\\) forms at half the rate at which H\\(_2\\)O\\(_2\\) disappears.",
      },
      selfCheckExample: {
        prompt: "A rate is written \\(-\\dfrac13\\dfrac{d[P]}{dt} = -\\dfrac12\\dfrac{d[Q]}{dt} = \\dfrac{d[R]}{dt}\\). Write the reaction.",
        steps: [
          "P and Q are reactants with coefficients \\(3\\) and \\(2\\); R is a product with coefficient \\(1\\).",
        ],
        answer: "\\(3P + 2Q \\to R\\)",
      },
      practiceSet: [
        { prompt: "Sign of \\(\\dfrac{d[\\text{reactant}]}{dt}\\) in a rate expression?", answer: "Negative" },
        { prompt: "Term for H\\(_2\\) in N\\(_2\\) + 3H\\(_2\\) → 2NH\\(_3\\)?", answer: "\\(-\\dfrac13\\dfrac{d[\\text{H}_2]}{dt}\\)" },
        { prompt: "Reaction for \\(-\\dfrac12\\dfrac{d[x]}{dt} = -\\dfrac{d[y]}{dt} = \\dfrac12\\dfrac{d[z]}{dt}\\)?", answer: "\\(2x + y \\to 2z\\)" },
        { prompt: "\\(3\\dfrac{d[\\text{NH}_3]}{dt}\\) equals?", answer: "\\(-2\\dfrac{d[\\text{H}_2]}{dt}\\)" },
      ],
      pyqExampleId: "dc399830-0b07-4762-86ac-90849795f078",
      traps: [
        {
          title: "Coefficient in front instead of as a reciprocal",
          body:
            "The term for H\\(_2\\) is \\(-\\dfrac13\\dfrac{d[\\text{H}_2]}{dt}\\), not \\(-3\\dfrac{d[\\text{H}_2]}{dt}\\). Option (A) on every N\\(_2\\)/H\\(_2\\)/NH\\(_3\\) stem is the inverted version.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Rate Law and Order — what the rate depends on",
      href: "/notes/mht-cet-chemistry/chemical-kinetics/cetkin-rate-law-and-order",
    },
  ],
};
