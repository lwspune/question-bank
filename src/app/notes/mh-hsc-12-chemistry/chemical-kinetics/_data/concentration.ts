import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_CK_CONCENTRATION_NOTE: SubtopicNote = {
  subtopicName: "Rate of Reaction and Reactant Concentration",
  title: "Rate Law, Order and the Rate Constant",
  oneLineDefinition:
    "The rate law rate = k[A]ˣ[B]ʸ, what the exponents tell you about the effect of concentration, the order of a reaction found from experimental data, and the rate constant with its units.",
  whyItMatters:
    "14 questions. Five were set in board papers: the order when a fourfold rise in concentration only doubles the rate (2017), the rate constant of a first order reaction from its rate (2019), a rate law from two doubling experiments (2024), the effect of concentration when the order is negative (2025), and a rate constant for a reaction third order overall (2026). The textbook adds rate laws from tables of initial rates, the rate constant of NOBr decomposition and how the rate changes when concentrations are doubled or cut.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccck-rate-law",
      name: "The rate law and what its exponents mean",
      intuition:
        "The rate law is the experiment's report card: it says how strongly the rate responds to each reactant. An exponent of 1 means the rate follows the concentration exactly; 2 means doubling the concentration makes the rate four times; 0 means that reactant does not matter at all. The exponents come from experiment, never from the balanced equation.",
      definition:
        "- **Rate law:** for \\(a\\text{A} + b\\text{B} \\to c\\text{C} + d\\text{D}\\), rate \\(= k[\\text{A}]^x[\\text{B}]^y\\). It is also called the **differential rate law**.\n" +
        "- \\(k\\) is the **rate constant**: independent of concentration, but it varies with temperature. For unit concentrations of A and B, \\(k\\) equals the rate.\n" +
        "- \\(x\\) and \\(y\\) are **determined experimentally**. They are not necessarily equal to the coefficients \\(a\\) and \\(b\\), and may be whole numbers, zero or fractions.\n" +
        "- **Effect of the exponent** \\(x\\) of \\([\\text{A}]\\):\n" +
        "- \\(x = 1\\): the rate changes in the same ratio as \\([\\text{A}]\\).\n" +
        "- \\(x = 2\\): doubling \\([\\text{A}]\\) makes the rate four times.\n" +
        "- \\(x = 0\\): the rate is independent of \\([\\text{A}]\\).\n" +
        "- \\(x < 0\\): the rate decreases as \\([\\text{A}]\\) increases.\n" +
        "- The coefficients are the exponents only for an **elementary** (single-step) reaction, such as \\(2\\text{NO}_2 \\to 2\\text{NO} + \\text{O}_2\\), rate \\(= k[\\text{NO}_2]^2\\).",
      formula: {
        label: "Rate law",
        latex: "\\text{rate} = k[\\text{A}]^x[\\text{B}]^y",
        symbols: [
          { symbol: "\\(k\\)", meaning: "rate constant, depends on temperature only" },
          { symbol: "\\(x, y\\)", meaning: "orders with respect to A and B, found by experiment" },
        ],
      },
      authoredExample: {
        prompt:
          "The rate law of a reaction is rate \\(= k[\\text{A}]^2[\\text{B}]\\). By what factor does the rate change if \\([\\text{A}]\\) is doubled and \\([\\text{B}]\\) is halved at the same time?",
        steps: [
          "Given: rate \\(= k[\\text{A}]^2[\\text{B}]\\); new \\([\\text{A}] = 2[\\text{A}]\\), new \\([\\text{B}] = \\tfrac{1}{2}[\\text{B}]\\).",
          "New rate \\(= k(2[\\text{A}])^2\\left(\\tfrac{1}{2}[\\text{B}]\\right) = 4 \\times \\tfrac{1}{2} \\times k[\\text{A}]^2[\\text{B}]\\).",
          "New rate \\(= 2 \\times\\) old rate.",
        ],
        answer: "The rate doubles",
      },
      selfCheckExample: {
        prompt:
          "For \\(\\text{NO}_2(\\text{g}) + \\text{CO}(\\text{g}) \\to \\text{NO}(\\text{g}) + \\text{CO}_2(\\text{g})\\), rate \\(= k[\\text{NO}_2]^2\\). What happens to the rate if (a) \\([\\text{CO}]\\) is doubled, (b) \\([\\text{NO}_2]\\) is tripled?",
        steps: ["(a) CO does not appear in the rate law (order zero), so the rate is unchanged.", "(b) \\(3^2 = 9\\), so the rate becomes nine times."],
        answer: "(a) No change; (b) nine times",
      },
      practiceSet: [
        { prompt: "Rate \\(= k[\\text{A}]^{1/2}\\). By what factor does the rate change when \\([\\text{A}]\\) is made nine times?", answer: "Three times, since \\(9^{1/2} = 3\\)" },
        { prompt: "Does the rate constant change when the concentration of a reactant is increased?", answer: "No. \\(k\\) is independent of concentration; it changes only with temperature" },
        { prompt: "Rate \\(= k[\\text{X}][\\text{Y}]\\). Both concentrations are made one third. What happens to the rate?", answer: "It becomes one ninth" },
        { prompt: "When are the coefficients of a balanced equation equal to the exponents in its rate law?", answer: "Only when the reaction is elementary, that is, it takes place in a single step" },
      ],
      pyqExampleId: "7953b505-554b-49dc-9408-b38c5ff96a5a",
      traps: [
        {
          title: "Reading the rate law off the balanced equation",
          body: "For \\(2\\text{A} + \\text{B} \\to\\) products the rate law need not be \\(k[\\text{A}]^2[\\text{B}]\\). The exponents are found by experiment; only an elementary reaction lets you write them from the equation.",
        },
        {
          title: "Saying k changes with concentration",
          body: "Raising a concentration raises the rate, not the rate constant. \\(k\\) changes only when the temperature changes.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccck-order",
      name: "Order of a reaction from experimental data",
      intuition:
        "To find how the rate depends on one reactant, change that reactant alone and watch the rate. Compare two experiments in which every other concentration is the same; the ratio of the rates is the ratio of concentrations raised to the unknown order.",
      definition:
        "- **Order:** for rate \\(= k[\\text{A}]^x[\\text{B}]^y\\), the overall order is \\(x + y\\), the sum of the powers of the concentration terms in the rate law. \\(x\\) is the order with respect to A and \\(y\\) with respect to B.\n" +
        "- The order is **determined experimentally**. It can be a whole number, a fraction (\\(\\text{CH}_3\\text{CHO} \\to \\text{CH}_4 + \\text{CO}\\), rate \\(= k[\\text{CH}_3\\text{CHO}]^{3/2}\\), order 3/2) or zero (CO in \\(\\text{NO}_2 + \\text{CO}\\)). Reactions of order higher than three are rare.\n" +
        "- **Method from initial rates:**\n" +
        "- Write rate \\(= k[\\text{A}]^x[\\text{B}]^y\\) for each experiment, numbering the equations.\n" +
        "- Divide two equations in which \\([\\text{B}]\\) is the same: \\(k\\) and \\([\\text{B}]^y\\) cancel, leaving (ratio of rates) \\(=\\) (ratio of \\([\\text{A}]\\))\\(^x\\). Solve for \\(x\\).\n" +
        "- Do the same with \\([\\text{A}]\\) fixed, or substitute the known \\(x\\), to find \\(y\\).\n" +
        "- Write the rate law and the overall order.",
      formula: {
        label: "Comparing two experiments with [B] fixed",
        latex: "\\frac{\\text{rate}_2}{\\text{rate}_1} = \\left(\\frac{[\\text{A}]_2}{[\\text{A}]_1}\\right)^x",
      },
      authoredExample: {
        prompt:
          "For \\(2\\text{NO}(\\text{g}) + \\text{O}_2(\\text{g}) \\to 2\\text{NO}_2(\\text{g})\\) three experiments gave these initial rates. Experiment 1: [NO] = 0.01 and [O₂] = 0.01 mol dm⁻³, rate \\(2.5 \\times 10^{-5}\\) mol dm⁻³ s⁻¹. Experiment 2: [NO] = 0.02 and [O₂] = 0.01 mol dm⁻³, rate \\(1.0 \\times 10^{-4}\\) mol dm⁻³ s⁻¹. Experiment 3: [NO] = 0.02 and [O₂] = 0.02 mol dm⁻³, rate \\(2.0 \\times 10^{-4}\\) mol dm⁻³ s⁻¹. Find the rate law, the overall order and the rate constant.",
        steps: [
          "Let rate \\(= k[\\text{NO}]^x[\\text{O}_2]^y\\).",
          "Experiments 1 and 2 (\\([\\text{O}_2]\\) fixed): \\(\\dfrac{1.0 \\times 10^{-4}}{2.5 \\times 10^{-5}} = 4 = \\left(\\dfrac{0.02}{0.01}\\right)^x = 2^x\\), so \\(x = 2\\).",
          "Experiments 2 and 3 (\\([\\text{NO}]\\) fixed): \\(\\dfrac{2.0 \\times 10^{-4}}{1.0 \\times 10^{-4}} = 2 = 2^y\\), so \\(y = 1\\).",
          "Rate law: rate \\(= k[\\text{NO}]^2[\\text{O}_2]\\); overall order \\(2 + 1 = 3\\).",
          "From experiment 1: \\(k = \\dfrac{2.5 \\times 10^{-5}\\ \\text{mol dm}^{-3}\\ \\text{s}^{-1}}{(0.01\\ \\text{mol dm}^{-3})^2 \\times 0.01\\ \\text{mol dm}^{-3}} = 25\\) dm⁶ mol⁻² s⁻¹.",
        ],
        answer: "rate = k[NO]²[O₂], third order overall, k = 25 dm⁶ mol⁻² s⁻¹",
      },
      selfCheckExample: {
        prompt: "When the concentration of A alone is made four times, the rate of a reaction becomes sixteen times. What is the order with respect to A?",
        steps: ["\\(16 = 4^x\\).", "\\(x = 2\\)."],
        answer: "Second order in A",
      },
      practiceSet: [
        { prompt: "For \\(\\text{H}_2(\\text{g}) + \\text{I}_2(\\text{g}) \\to 2\\text{HI}(\\text{g})\\), rate \\(= k[\\text{H}_2][\\text{I}_2]\\). What is the overall order?", answer: "Second order (first order in each)" },
        { prompt: "\\(\\text{CHCl}_3 + \\text{Cl}_2 \\to \\text{CCl}_4 + \\text{HCl}\\) is first order in CHCl₃ and half order in Cl₂. Write the rate law and the overall order.", answer: "rate \\(= k[\\text{CHCl}_3][\\text{Cl}_2]^{1/2}\\); order 3/2" },
        { prompt: "Can the order of a reaction be zero or a fraction?", answer: "Yes. Order is found by experiment and may be zero, a fraction or a whole number" },
      ],
      pyqExampleId: "1b38ab87-e313-4a73-bb77-ef82c444a96f",
      traps: [
        {
          title: "Changing two concentrations and solving for both at once",
          body: "When two concentrations change together, the rate ratio holds both orders. Find one order first from experiments where only one concentration changes, then substitute it.",
        },
        {
          title: "Order taken from the coefficients",
          body: "In \\(2\\text{A} + \\text{B} \\to\\) products the order in A came out as 1 in the textbook's data. A coefficient of 2 does not mean second order.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccck-rate-constant",
      name: "Calculating the rate constant and its units",
      intuition:
        "Once the rate law is known, the rate constant is just the rate divided by the concentration terms. Its unit changes with the order, because the concentration units must cancel to leave a rate.",
      definition:
        "- From rate \\(= k[\\text{A}]^x[\\text{B}]^y\\): \\(k = \\dfrac{\\text{rate}}{[\\text{A}]^x[\\text{B}]^y}\\).\n" +
        "- Carry the units through the substitution: rate in mol dm⁻³ s⁻¹ and each concentration in mol dm⁻³.\n" +
        "- For an overall order \\(n\\), the unit of \\(k\\) is \\((\\text{mol dm}^{-3})^{1-n}\\ \\text{s}^{-1}\\): s⁻¹ for first order, dm³ mol⁻¹ s⁻¹ for second order, dm⁶ mol⁻² s⁻¹ for third order.\n" +
        "- M stands for mol dm⁻³ (mol L⁻¹), so M⁻¹ s⁻¹ is the same as dm³ mol⁻¹ s⁻¹.",
      formula: {
        label: "Rate constant",
        latex: "k = \\frac{\\text{rate}}{[\\text{A}]^x[\\text{B}]^y}",
      },
      authoredExample: {
        prompt:
          "The reaction \\(\\text{A} + \\text{B} \\to \\text{P}\\) is first order in A and first order in B. Its rate is \\(4.8 \\times 10^{-4}\\) mol dm⁻³ s⁻¹ when \\([\\text{A}] = 0.12\\) mol dm⁻³ and \\([\\text{B}] = 0.25\\) mol dm⁻³. Calculate the rate constant.",
        steps: [
          "Given: rate \\(= 4.8 \\times 10^{-4}\\) mol dm⁻³ s⁻¹, \\([\\text{A}] = 0.12\\) mol dm⁻³, \\([\\text{B}] = 0.25\\) mol dm⁻³.",
          "Formula: rate \\(= k[\\text{A}][\\text{B}]\\), so \\(k = \\dfrac{\\text{rate}}{[\\text{A}][\\text{B}]}\\).",
          "Substitution: \\(k = \\dfrac{4.8 \\times 10^{-4}\\ \\text{mol dm}^{-3}\\ \\text{s}^{-1}}{0.12\\ \\text{mol dm}^{-3} \\times 0.25\\ \\text{mol dm}^{-3}} = \\dfrac{4.8 \\times 10^{-4}}{0.030}\\).",
          "\\(k = 0.016\\) dm³ mol⁻¹ s⁻¹.",
        ],
        answer: "k = 0.016 dm³ mol⁻¹ s⁻¹ (= 1.6 × 10⁻² M⁻¹ s⁻¹)",
      },
      selfCheckExample: {
        prompt: "A first order reaction has a rate of \\(2.4 \\times 10^{-5}\\) M s⁻¹ when the reactant concentration is 0.40 M. Find the rate constant.",
        steps: ["\\(k = \\dfrac{\\text{rate}}{[\\text{A}]} = \\dfrac{2.4 \\times 10^{-5}\\ \\text{M s}^{-1}}{0.40\\ \\text{M}}\\).", "\\(k = 6.0 \\times 10^{-5}\\) s⁻¹."],
        answer: "6.0 × 10⁻⁵ s⁻¹",
      },
      practiceSet: [
        { prompt: "What is the unit of k for a reaction that is second order overall, with concentration in mol dm⁻³ and time in s?", answer: "dm³ mol⁻¹ s⁻¹" },
        { prompt: "Rate \\(= k[\\text{A}]^2\\), \\(k = 0.50\\) dm³ mol⁻¹ s⁻¹ and \\([\\text{A}] = 0.30\\) mol dm⁻³. Find the rate.", answer: "\\(0.50 \\times (0.30)^2 = 0.045\\) mol dm⁻³ s⁻¹" },
        { prompt: "What is the rate constant equal to when every concentration in the rate law is 1 mol dm⁻³?", answer: "The rate of the reaction" },
      ],
      pyqExampleId: "ec208f55-9f9f-43fb-acbd-f36a6697f935",
      traps: [
        {
          title: "Squaring the wrong concentration",
          body: "Read which reactant is second order before you substitute. 'Second order in A, first order in B' means \\([\\text{A}]^2[\\text{B}]\\); swapping them gives a different answer from the same data.",
        },
        {
          title: "No unit, or the rate's unit, on k",
          body: "Write the unit of \\(k\\) from the overall order. A third order rate constant is in dm⁶ mol⁻² s⁻¹; copying mol dm⁻³ s⁻¹ from the rate loses the mark.",
        },
      ],
    },
  ],
};
