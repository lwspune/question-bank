import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_CK_RATE_NOTE: SubtopicNote = {
  subtopicName: "Rate of a Chemical Reaction",
  title: "Rate of a Reaction: Average, Instantaneous and Per Species",
  oneLineDefinition:
    "What the rate of a reaction means, the average rate over an interval, the instantaneous rate from a tangent, and how the rates of the different reactants and products are tied together by the balanced equation.",
  whyItMatters:
    "23 questions, seventeen of them from board papers. The board asks you to define the rate of a reaction (2022, twice) and the average rate (2023, the same question in two sets). In 2023, 2024 and 2026 it set MCQs linking the rates of two species through their coefficients, such as d[B]/dt for 3A to 2B (three in 2023, one in 2024, three in 2026). Short numericals ask the average rate and the rate of formation of NO₂ when N₂O₅ decomposes (2022, 2023), the rate of reaction and of H₂ use from the rate of NH₃ formation (2022), and the rates of N₂ and H₂ formation in the zero order decomposition of NH₃ (2025). Two MCQs ask for which order the rate and the rate constant have the same unit (2023, 2025). The textbook adds the butyl chloride table and N₂O₅ in CCl₄.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcck-average-rate",
      name: "Average rate and instantaneous rate",
      intuition:
        "A reaction is fast at the start, when there is plenty of reactant, and slows down as the reactant is used up. So a rate worked out over a long interval is only an average. To know how fast the reaction is going at one moment, shrink the interval to almost nothing: that is the slope of the concentration against time curve at that moment.",
      definition:
        "- **Rate of a reaction:** the change in concentration of a reactant or a product in unit time. It is the rate of decrease in concentration of any one reactant, or the rate of increase in concentration of any one product.\n" +
        "- **Average rate** for \\(\\text{R} \\rightarrow \\text{P}\\): \\(r_{av} = -\\dfrac{\\Delta[\\text{R}]}{\\Delta t} = +\\dfrac{\\Delta[\\text{P}]}{\\Delta t}\\). \\(\\Delta[\\text{R}]\\) is negative, so it is multiplied by \\(-1\\) to make the rate positive.\n" +
        "- The average rate depends on the change in concentration and on the time taken for that change, so it changes with the interval you choose.\n" +
        "- **Instantaneous rate:** the average rate over the smallest interval, as \\(\\Delta t \\rightarrow 0\\): \\(r_{inst} = -\\dfrac{d[\\text{R}]}{dt} = +\\dfrac{d[\\text{P}]}{dt}\\).\n" +
        "- **How it is found:** plot the concentration against time, draw a tangent to the curve at the chosen time, and find its slope.\n" +
        "- **Units:** concentration time⁻¹, usually mol L⁻¹ s⁻¹. For gases measured by partial pressure, atm s⁻¹.",
      formula: {
        label: "Average and instantaneous rate for R to P",
        latex: "r_{av} = -\\frac{\\Delta[\\text{R}]}{\\Delta t} = \\frac{\\Delta[\\text{P}]}{\\Delta t}, \\qquad r_{inst} = -\\frac{d[\\text{R}]}{dt} = \\frac{d[\\text{P}]}{dt}",
      },
      authoredExample: {
        prompt:
          "For a reaction \\(\\text{R} \\rightarrow \\text{P}\\), the concentration of R falls from 0.080 mol L⁻¹ to 0.050 mol L⁻¹ in 15 minutes. Calculate the average rate in mol L⁻¹ min⁻¹ and in mol L⁻¹ s⁻¹.",
        steps: [
          "Given: \\([\\text{R}]_1 = 0.080\\) mol L⁻¹, \\([\\text{R}]_2 = 0.050\\) mol L⁻¹, \\(\\Delta t = 15\\) min.",
          "Formula: \\(r_{av} = -\\dfrac{\\Delta[\\text{R}]}{\\Delta t}\\).",
          "Substitution: \\(r_{av} = -\\dfrac{(0.050 - 0.080)\\ \\text{mol L}^{-1}}{15\\ \\text{min}} = \\dfrac{0.030}{15} = 2.0 \\times 10^{-3}\\) mol L⁻¹ min⁻¹.",
          "In seconds: \\(\\dfrac{2.0 \\times 10^{-3}}{60} = 3.3 \\times 10^{-5}\\) mol L⁻¹ s⁻¹.",
        ],
        answer: "2.0 × 10⁻³ mol L⁻¹ min⁻¹ = 3.3 × 10⁻⁵ mol L⁻¹ s⁻¹",
      },
      selfCheckExample: {
        prompt:
          "The concentration of a product rises from 0 to 0.036 mol L⁻¹ in the first 2 minutes of a reaction. Find the average rate of its formation in mol L⁻¹ s⁻¹.",
        steps: ["2 minutes = 120 s.", "Average rate \\(= \\dfrac{0.036}{120} = 3.0 \\times 10^{-4}\\) mol L⁻¹ s⁻¹."],
        answer: "3.0 × 10⁻⁴ mol L⁻¹ s⁻¹",
      },
      practiceSet: [
        { prompt: "Why is a minus sign written before \\(\\Delta[\\text{R}]/\\Delta t\\) for a reactant?", answer: "The reactant's concentration falls, so \\(\\Delta[\\text{R}]\\) is negative; the minus sign makes the rate positive" },
        { prompt: "On a graph of concentration of a reactant against time, what gives the instantaneous rate at a time t?", answer: "The slope of the tangent drawn to the curve at time t" },
        { prompt: "Convert a rate of 1.2 × 10⁻² mol L⁻¹ min⁻¹ into mol L⁻¹ s⁻¹.", answer: "\\(2.0 \\times 10^{-4}\\) mol L⁻¹ s⁻¹" },
        { prompt: "What is the unit of rate for a gas reaction followed by partial pressure, with time in seconds?", answer: "atm s⁻¹" },
      ],
      pyqExampleId: "789c44f1-bc65-444e-b39e-56ef307e6c95",
      traps: [
        {
          title: "A chord is not a tangent",
          body: "The line joining two points on the curve gives the average rate between them. The instantaneous rate needs a tangent that touches the curve at one point.",
        },
        {
          title: "Leaving out the time unit change",
          body: "If the time is given in minutes and the rate is asked per second, divide by 60. A rate written without its unit, or in the wrong time unit, loses the answer mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcck-rate-coefficients",
      name: "Rate of reaction and the balanced equation",
      intuition:
        "In \\(2\\text{HI} \\rightarrow \\text{H}_2 + \\text{I}_2\\), two molecules of HI are used up for every molecule of H₂ formed, so HI disappears twice as fast as H₂ appears. Dividing each species' rate by its coefficient gives one number, the rate of the reaction, whichever species you watch.",
      definition:
        "- For \\(a\\text{A} + b\\text{B} \\rightarrow c\\text{C} + d\\text{D}\\): rate \\(= -\\dfrac{1}{a}\\dfrac{\\Delta[\\text{A}]}{\\Delta t} = -\\dfrac{1}{b}\\dfrac{\\Delta[\\text{B}]}{\\Delta t} = +\\dfrac{1}{c}\\dfrac{\\Delta[\\text{C}]}{\\Delta t} = +\\dfrac{1}{d}\\dfrac{\\Delta[\\text{D}]}{\\Delta t}\\).\n" +
        "- Reactants take a minus sign, products a plus sign.\n" +
        "- Example from the book: for \\(2\\text{HI} \\rightarrow \\text{H}_2 + \\text{I}_2\\), rate \\(= -\\dfrac{1}{2}\\dfrac{\\Delta[\\text{HI}]}{\\Delta t} = \\dfrac{\\Delta[\\text{H}_2]}{\\Delta t} = \\dfrac{\\Delta[\\text{I}_2]}{\\Delta t}\\).\n" +
        "- **Method:** from the species you are given, find the rate of reaction (divide by its coefficient). Then multiply by another species' coefficient to get that species' own rate.\n" +
        "- **Rate of reaction** is one number for the whole reaction. **Rate of formation** or **rate of disappearance** of a species is that species' own \\(\\Delta[\\ ]/\\Delta t\\), with no division.",
      formula: {
        label: "Rate for aA + bB to cC + dD",
        latex: "\\text{rate} = -\\frac{1}{a}\\frac{d[\\text{A}]}{dt} = -\\frac{1}{b}\\frac{d[\\text{B}]}{dt} = \\frac{1}{c}\\frac{d[\\text{C}]}{dt} = \\frac{1}{d}\\frac{d[\\text{D}]}{dt}",
      },
      authoredExample: {
        prompt:
          "For the reaction \\(4\\text{PH}_3(\\text{g}) \\rightarrow \\text{P}_4(\\text{g}) + 6\\text{H}_2(\\text{g})\\), PH₃ is used up at 4.8 × 10⁻³ mol L⁻¹ s⁻¹. Find the rate of the reaction and the rates of formation of P₄ and H₂.",
        steps: [
          "Given: \\(-\\dfrac{\\Delta[\\text{PH}_3]}{\\Delta t} = 4.8 \\times 10^{-3}\\) mol L⁻¹ s⁻¹.",
          "Formula: rate \\(= -\\dfrac{1}{4}\\dfrac{\\Delta[\\text{PH}_3]}{\\Delta t} = \\dfrac{\\Delta[\\text{P}_4]}{\\Delta t} = \\dfrac{1}{6}\\dfrac{\\Delta[\\text{H}_2]}{\\Delta t}\\).",
          "Rate of reaction \\(= \\dfrac{1}{4} \\times 4.8 \\times 10^{-3} = 1.2 \\times 10^{-3}\\) mol L⁻¹ s⁻¹.",
          "P₄ formed: \\(1 \\times 1.2 \\times 10^{-3} = 1.2 \\times 10^{-3}\\) mol L⁻¹ s⁻¹. H₂ formed: \\(6 \\times 1.2 \\times 10^{-3} = 7.2 \\times 10^{-3}\\) mol L⁻¹ s⁻¹.",
        ],
        answer: "Rate of reaction 1.2 × 10⁻³; P₄ formed 1.2 × 10⁻³; H₂ formed 7.2 × 10⁻³ (all in mol L⁻¹ s⁻¹)",
      },
      selfCheckExample: {
        prompt:
          "In the decomposition \\(2\\text{N}_2\\text{O}_5 \\rightarrow 4\\text{NO}_2 + \\text{O}_2\\), oxygen is formed at 1.5 × 10⁻⁴ mol L⁻¹ s⁻¹. At what rate is N₂O₅ used up?",
        steps: ["Rate of reaction \\(= \\dfrac{\\Delta[\\text{O}_2]}{\\Delta t} = 1.5 \\times 10^{-4}\\) mol L⁻¹ s⁻¹.", "N₂O₅ used: \\(2 \\times 1.5 \\times 10^{-4} = 3.0 \\times 10^{-4}\\) mol L⁻¹ s⁻¹."],
        answer: "3.0 × 10⁻⁴ mol L⁻¹ s⁻¹",
      },
      practiceSet: [
        { prompt: "Write the rate of reaction for \\(\\text{H}_2 + \\text{I}_2 \\rightarrow 2\\text{HI}\\) in terms of all three species.", answer: "rate \\(= -\\dfrac{\\Delta[\\text{H}_2]}{\\Delta t} = -\\dfrac{\\Delta[\\text{I}_2]}{\\Delta t} = \\dfrac{1}{2}\\dfrac{\\Delta[\\text{HI}]}{\\Delta t}\\)" },
        { prompt: "In \\(\\text{X} + 2\\text{Y} \\rightarrow \\text{Z}\\), Y is used up at 0.04 mol L⁻¹ s⁻¹. How fast is Z formed?", answer: "0.02 mol L⁻¹ s⁻¹" },
        { prompt: "In \\(\\text{Hg(l)} + \\text{Cl}_2(\\text{g}) \\rightarrow \\text{HgCl}_2(\\text{s})\\), compare the rate of use of Cl₂ with the rate of formation of HgCl₂.", answer: "They are equal, since every coefficient is 1" },
      ],
      pyqExampleId: "b2b422c4-2590-4be0-b9e4-777dcae1a393",
      traps: [
        {
          title: "Rate of formation is not the rate of reaction",
          body: "When a question asks the rate of formation of a product, give that product's own \\(\\Delta[\\ ]/\\Delta t\\). Divide by the coefficient only when the rate of the reaction is asked.",
        },
        {
          title: "Multiplying where you should divide",
          body: "Going from a species' rate to the rate of reaction, divide by its coefficient. Going from the rate of reaction to a species' rate, multiply. Mixing the two directions gives an answer several times too big or too small.",
        },
        {
          title: "Dropping the minus sign for a reactant",
          body: "Write \\(-\\dfrac{d[\\text{A}]}{dt}\\) when you equate a reactant's term to the rate. Without the sign the expression says the reactant is being formed, and an MCQ option built on that slip is always offered.",
        },
      ],
    },
  ],
};
