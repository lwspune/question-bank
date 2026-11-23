import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_CK_RATE_NOTE: SubtopicNote = {
  subtopicName: "Rate of Reaction",
  title: "Rate of a Reaction: Average and Instantaneous",
  oneLineDefinition:
    "What the rate of a reaction means, the average rate over a time interval, the instantaneous rate found from a tangent, and how the rates of consumption and formation of different species are linked by the balanced equation.",
  whyItMatters:
    "3 questions, all from the textbook: how the instantaneous rate is found, the rates of formation of NO₂ and O₂ when N₂O₅ decomposes, and the link between the rates of change of N₂, H₂ and NH₃. No board question in this bank is filed on this page, but every rate law and rate constant in the chapter is built on these definitions.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccck-average-instantaneous",
      name: "Average rate and instantaneous rate",
      intuition:
        "A reaction is fast at the start, when there is plenty of reactant, and slows down later. So a rate measured over a long interval is only an average. To know how fast the reaction is going at one moment, shrink the interval to almost nothing: that is the slope of the concentration against time curve at that moment.",
      definition:
        "- **Rate of reaction:** the decrease in concentration of a reactant per unit time, or the increase in concentration of a product per unit time. Its unit is mol dm⁻³ s⁻¹.\n" +
        "- **Average rate** for \\(\\text{A} \\to \\text{B}\\): \\(-\\dfrac{\\Delta[\\text{A}]}{\\Delta t} = \\dfrac{\\Delta[\\text{B}]}{\\Delta t}\\). The minus sign makes the rate positive, because \\([\\text{A}]\\) falls.\n" +
        "- **Instantaneous rate:** the rate at one particular instant. Replace \\(\\Delta c/\\Delta t\\) by the derivative \\(dc/dt\\): rate \\(= -\\dfrac{d[\\text{A}]}{dt} = \\dfrac{d[\\text{B}]}{dt}\\).\n" +
        "- **How it is found:** measure the concentration of a reactant or product at different times, plot it against time (Fig. 6.1), draw a tangent to the curve at time \\(t_1\\). The slope of the tangent is the instantaneous rate at \\(t_1\\).\n" +
        "- In chemical kinetics we work with instantaneous rates, not average rates.",
      formula: {
        label: "Average and instantaneous rate for A to B",
        latex: "\\text{average rate} = -\\frac{\\Delta[\\text{A}]}{\\Delta t}, \\qquad \\text{instantaneous rate} = -\\frac{d[\\text{A}]}{dt} = \\frac{d[\\text{B}]}{dt}",
      },
      authoredExample: {
        prompt:
          "In the reaction \\(\\text{A} \\to \\text{B}\\), the concentration of A falls from 0.50 mol dm⁻³ to 0.38 mol dm⁻³ in 40 s. Calculate the average rate of the reaction over this interval.",
        steps: [
          "Given: \\([\\text{A}]_1 = 0.50\\) mol dm⁻³, \\([\\text{A}]_2 = 0.38\\) mol dm⁻³, \\(\\Delta t = 40\\) s.",
          "Formula: average rate \\(= -\\dfrac{\\Delta[\\text{A}]}{\\Delta t}\\).",
          "Substitution: average rate \\(= -\\dfrac{(0.38 - 0.50)\\ \\text{mol dm}^{-3}}{40\\ \\text{s}} = \\dfrac{0.12\\ \\text{mol dm}^{-3}}{40\\ \\text{s}}\\).",
          "Average rate \\(= 3.0 \\times 10^{-3}\\) mol dm⁻³ s⁻¹.",
        ],
        answer: "Average rate = 3.0 × 10⁻³ mol dm⁻³ s⁻¹",
      },
      selfCheckExample: {
        prompt:
          "In a reaction, the concentration of a product rises from 0 to 0.024 mol dm⁻³ in the first 2 minutes. Find the average rate of its formation in mol dm⁻³ s⁻¹.",
        steps: ["2 minutes = 120 s.", "Average rate \\(= \\dfrac{0.024}{120} = 2.0 \\times 10^{-4}\\) mol dm⁻³ s⁻¹."],
        answer: "2.0 × 10⁻⁴ mol dm⁻³ s⁻¹",
      },
      practiceSet: [
        { prompt: "Why is a minus sign written before the rate of change of a reactant's concentration?", answer: "The reactant's concentration falls with time, so \\(d[\\text{A}]/dt\\) is negative; the minus sign makes the rate positive" },
        { prompt: "On a graph of reactant concentration against time, what gives the instantaneous rate at a time t₁?", answer: "The slope of the tangent drawn to the curve at \\(t_1\\)" },
        { prompt: "What is the unit of the rate of a reaction?", answer: "mol dm⁻³ s⁻¹ (concentration divided by time)" },
      ],
      pyqExampleId: "46bee8a6-2316-4f77-82bc-19d588231bfb",
      traps: [
        {
          title: "A chord is not a tangent",
          body: "The line joining two points on the curve gives the average rate between them. The instantaneous rate needs a tangent that touches the curve at one point only.",
        },
        {
          title: "No figure in a 'determine graphically' answer",
          body: "When asked how the instantaneous rate is determined, draw the concentration against time curve with the tangent at \\(t_1\\) and label the axes. Words alone lose the diagram mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccck-rate-stoichiometry",
      name: "Rate of reaction and the balanced equation",
      intuition:
        "In \\(\\text{A} + 3\\text{B} \\to 2\\text{C}\\), every time one mole of A is used, three moles of B go with it and two moles of C appear. So B disappears three times as fast as A, and C appears twice as fast. Dividing each rate by its coefficient gives one number, the rate of the reaction, whichever species you watch.",
      definition:
        "- For \\(a\\text{A} + b\\text{B} \\to c\\text{C} + d\\text{D}\\): rate \\(= -\\dfrac{1}{a}\\dfrac{d[\\text{A}]}{dt} = -\\dfrac{1}{b}\\dfrac{d[\\text{B}]}{dt} = \\dfrac{1}{c}\\dfrac{d[\\text{C}]}{dt} = \\dfrac{1}{d}\\dfrac{d[\\text{D}]}{dt}\\).\n" +
        "- Reactants carry a minus sign (their concentrations fall); products carry a plus sign.\n" +
        "- Example from the book: for \\(\\text{A} + 3\\text{B} \\to 2\\text{C}\\), \\(-\\dfrac{d[\\text{B}]}{dt} = -3\\dfrac{d[\\text{A}]}{dt}\\) and \\(\\dfrac{d[\\text{C}]}{dt} = -2\\dfrac{d[\\text{A}]}{dt}\\).\n" +
        "- **Method:** first find the rate of reaction from the species you are given, then multiply by each coefficient to get the rate of any other species.",
      formula: {
        label: "Rate for aA + bB to cC + dD",
        latex: "\\text{rate} = -\\frac{1}{a}\\frac{d[\\text{A}]}{dt} = -\\frac{1}{b}\\frac{d[\\text{B}]}{dt} = \\frac{1}{c}\\frac{d[\\text{C}]}{dt} = \\frac{1}{d}\\frac{d[\\text{D}]}{dt}",
      },
      authoredExample: {
        prompt:
          "For the reaction \\(4\\text{NH}_3(\\text{g}) + 5\\text{O}_2(\\text{g}) \\to 4\\text{NO}(\\text{g}) + 6\\text{H}_2\\text{O}(\\text{g})\\), ammonia is consumed at 0.020 mol dm⁻³ s⁻¹. Find the rate of the reaction, the rate of consumption of O₂ and the rates of formation of NO and H₂O.",
        steps: [
          "Given: \\(-\\dfrac{d[\\text{NH}_3]}{dt} = 0.020\\) mol dm⁻³ s⁻¹.",
          "Formula: rate \\(= -\\dfrac{1}{4}\\dfrac{d[\\text{NH}_3]}{dt} = -\\dfrac{1}{5}\\dfrac{d[\\text{O}_2]}{dt} = \\dfrac{1}{4}\\dfrac{d[\\text{NO}]}{dt} = \\dfrac{1}{6}\\dfrac{d[\\text{H}_2\\text{O}]}{dt}\\).",
          "Rate of reaction \\(= \\dfrac{1}{4} \\times 0.020 = 0.0050\\) mol dm⁻³ s⁻¹.",
          "O₂ consumed: \\(5 \\times 0.0050 = 0.025\\) mol dm⁻³ s⁻¹. NO formed: \\(4 \\times 0.0050 = 0.020\\) mol dm⁻³ s⁻¹. H₂O formed: \\(6 \\times 0.0050 = 0.030\\) mol dm⁻³ s⁻¹.",
        ],
        answer: "Rate of reaction 0.0050; O₂ consumed 0.025; NO formed 0.020; H₂O formed 0.030 (all in mol dm⁻³ s⁻¹)",
      },
      selfCheckExample: {
        prompt:
          "For \\(2\\text{SO}_2(\\text{g}) + \\text{O}_2(\\text{g}) \\to 2\\text{SO}_3(\\text{g})\\), SO₃ is formed at 0.012 mol dm⁻³ s⁻¹. At what rate is O₂ consumed?",
        steps: ["Rate of reaction \\(= \\dfrac{1}{2} \\times 0.012 = 0.006\\) mol dm⁻³ s⁻¹.", "O₂ has coefficient 1, so it is consumed at 0.006 mol dm⁻³ s⁻¹."],
        answer: "0.006 mol dm⁻³ s⁻¹",
      },
      practiceSet: [
        { prompt: "Write the rate expression for \\(2\\text{H}_2\\text{O}_2 \\to 2\\text{H}_2\\text{O} + \\text{O}_2\\) in terms of all three species.", answer: "rate \\(= -\\dfrac{1}{2}\\dfrac{d[\\text{H}_2\\text{O}_2]}{dt} = \\dfrac{1}{2}\\dfrac{d[\\text{H}_2\\text{O}]}{dt} = \\dfrac{d[\\text{O}_2]}{dt}\\)" },
        { prompt: "In \\(\\text{A} + 3\\text{B} \\to 2\\text{C}\\), A is used up at 0.01 mol dm⁻³ s⁻¹. How fast is C formed?", answer: "0.02 mol dm⁻³ s⁻¹" },
        { prompt: "For a reaction in which one mole of A gives one mole of B, compare the rate of consumption of A and the rate of formation of B.", answer: "They are equal" },
      ],
      pyqExampleId: "0d71ba78-5910-4c09-8697-06c12182aa1d",
      traps: [
        {
          title: "Multiplying instead of dividing by the coefficient",
          body: "The rate of reaction is each species' rate divided by its coefficient. Going from the rate of reaction to the rate of a species, you multiply. Mixing up the two directions gives an answer several times too large or too small.",
        },
        {
          title: "Dropping the minus sign for a reactant",
          body: "Write \\(-\\dfrac{d[\\text{N}_2]}{dt}\\), not \\(\\dfrac{d[\\text{N}_2]}{dt}\\), when you equate it to the rate of reaction. Without the sign the relation says the reactant is being formed.",
        },
      ],
    },
  ],
};
