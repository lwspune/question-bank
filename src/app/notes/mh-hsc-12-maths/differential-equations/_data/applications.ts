import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_DE_APPLICATIONS_NOTE: SubtopicNote = {
  subtopicName: "Applications of Differential Equations",
  title: "Applications: Growth, Decay, Cooling and Other Rates",
  oneLineDefinition:
    "Turning a statement about a rate of change into a differential equation, solving it, and finding the constants from the given readings: population and bacteria growth, radioactive decay, Newton's law of cooling, and rates of volume and area.",
  whyItMatters:
    "24 questions, two of them from board papers, both on Newton's law of cooling: the temperature of a body after 1 hour (2025) and the time a body takes to cool to 40 °C (2026). The textbook rows are section 6.5 with its solved examples (population and bacteria, radioactive decay and half life, Newton's law of cooling, surface area), Exercise 6.6, and Questions 8, 9 and 10 and two MCQs of the Miscellaneous Exercise.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmde-growth",
      name: "Growth and decay: rate proportional to the amount",
      intuition:
        "A population, a culture of bacteria or a radioactive mass changes at a rate proportional to how much of it is there. The more there is, the faster it changes, and the solution is an exponential. Two readings fix the two constants: the starting value, and the growth factor over a known time.",
      definition:
        "- **Growth** (population, bacteria): \\(\\dfrac{dP}{dt} = kP\\), \\(k > 0\\). Separate and integrate: \\(\\log P = kt + c_1\\), so \\(P = c\\,e^{kt}\\).\n" +
        "- **Decay** (radioactive substance): \\(\\dfrac{dx}{dt} = -kx\\), \\(k > 0\\), so \\(x = x_0\\,e^{-kt}\\), where \\(x_0\\) is the amount at \\(t = 0\\).\n" +
        "- The constant in front is the initial value: put \\(t = 0\\).\n" +
        "- **Half life:** the time in which half the amount of a radioactive substance disintegrates.\n" +
        "- Keep \\(e^{kT}\\) as a number from the data (for example \\(e^{10k} = \\dfrac{3}{2}\\)) and raise it to a power, instead of finding \\(k\\) as a decimal.",
      formula: {
        label: "Growth and decay",
        latex: "\\dfrac{dx}{dt} = kx \\Rightarrow x = a\\,e^{kt}, \\qquad \\dfrac{dx}{dt} = -kx \\Rightarrow x = x_0\\,e^{-kt} \\quad (k > 0)",
        symbols: [
          { symbol: "\\(a\\), \\(x_0\\)", meaning: "the amount at time t = 0" },
          { symbol: "\\(k\\)", meaning: "the constant of proportionality" },
        ],
      },
      authoredExample: {
        prompt:
          "The population of a town grows at a rate proportional to the population. It was 20,000 in 2000 and 30,000 in 2010. Find the population in 2020.",
        steps: [
          "Let \\(P\\) be the population \\(t\\) years after 2000. Then \\(\\dfrac{dP}{dt} = kP\\), \\(k > 0\\).",
          "Separate and integrate: \\(\\int \\dfrac{dP}{P} = \\int k\\,dt\\), so \\(\\log P = kt + c_1\\) and \\(P = c\\,e^{kt}\\) ... (1)",
          "At \\(t = 0\\), \\(P = 20000\\): \\(c = 20000\\), so \\(P = 20000\\,e^{kt}\\).",
          "At \\(t = 10\\), \\(P = 30000\\): \\(e^{10k} = \\dfrac{30000}{20000} = \\dfrac{3}{2}\\).",
          "At \\(t = 20\\): \\(P = 20000\\,e^{20k} = 20000\\left(e^{10k}\\right)^2 = 20000 \\times \\dfrac{9}{4} = 45000\\).",
        ],
        answer: "The population in 2020 will be 45,000",
      },
      selfCheckExample: {
        prompt: "A radioactive substance has a half life of 10 years. What fraction of the original amount is left after 30 years?",
        steps: [
          "\\(x = x_0\\,e^{-kt}\\) and \\(e^{-10k} = \\dfrac{1}{2}\\).",
          "After 30 years: \\(x = x_0\\left(e^{-10k}\\right)^3 = x_0 \\times \\dfrac{1}{8}\\).",
        ],
        answer: "One-eighth of the original amount",
      },
      practiceSet: [
        { prompt: "Bacteria increase at a rate proportional to their number and treble in 2 hours. How many times the original number are there after 6 hours?", answer: "27 times" },
        { prompt: "Write the differential equation and its solution for an amount \\(x\\) that decays at a rate proportional to \\(x\\).", answer: "\\(\\dfrac{dx}{dt} = -kx\\) (\\(k > 0\\)), \\(x = x_0\\,e^{-kt}\\)" },
        { prompt: "If \\(e^{5k} = 2\\), find \\(e^{15k}\\).", answer: "8" },
      ],
      pyqExampleId: "44fe18d1-8e7c-445a-a4cf-6bc9f75e1ec1",
      traps: [
        {
          title: "The wrong sign for decay",
          body: "A decaying mass needs \\(\\dfrac{dx}{dt} = -kx\\) with \\(k > 0\\). With \\(+kx\\) the model grows, and every later number comes out wrong.",
        },
        {
          title: "Rounding k too early",
          body: "Finding \\(k\\) as a decimal and then \\(e^{kt}\\) again loses accuracy. Keep \\(e^{kT}\\) as the exact ratio from the data and raise it to the power the question needs.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmde-cooling",
      name: "Newton's law of cooling",
      intuition:
        "A cup of tea cools fast while it is much hotter than the room, and slowly as it nears room temperature. Newton's law says the rate of cooling is proportional to the difference between the body's temperature and the surroundings. So it is the difference, not the temperature, that decays exponentially.",
      definition:
        "- **Newton's law of cooling:** the rate of change of temperature of a cooling body is proportional to the difference between its temperature and that of the surrounding medium.\n" +
        "- \\(\\dfrac{d\\theta}{dt} = -k(\\theta - \\theta_0)\\), \\(k > 0\\); the minus sign shows the difference is decreasing.\n" +
        "- Separate: \\(\\int \\dfrac{d\\theta}{\\theta - \\theta_0} = -\\int k\\,dt\\), so \\(\\log(\\theta - \\theta_0) = -kt + c\\).\n" +
        "- With \\(\\theta = \\theta_1\\) at \\(t = 0\\): \\(\\theta = \\theta_0 + (\\theta_1 - \\theta_0)e^{-kt}\\).\n" +
        "- In equal intervals of time the difference \\(\\theta - \\theta_0\\) is multiplied by the same factor.",
      formula: {
        label: "Newton's law of cooling",
        latex: "\\dfrac{d\\theta}{dt} = -k(\\theta - \\theta_0) \\;\\Rightarrow\\; \\theta = \\theta_0 + (\\theta_1 - \\theta_0)\\,e^{-kt}",
        symbols: [
          { symbol: "\\(\\theta\\)", meaning: "temperature of the body at time t" },
          { symbol: "\\(\\theta_0\\)", meaning: "temperature of the surrounding medium" },
          { symbol: "\\(\\theta_1\\)", meaning: "temperature of the body at t = 0" },
          { symbol: "\\(k\\)", meaning: "a positive constant" },
        ],
      },
      authoredExample: {
        prompt: "A body at \\(90^\\circ\\)C is placed in a room at \\(30^\\circ\\)C. It cools to \\(75^\\circ\\)C in 10 minutes. Find its temperature after 20 minutes.",
        steps: [
          "By Newton's law of cooling, \\(\\dfrac{d\\theta}{dt} = -k(\\theta - 30)\\), \\(k > 0\\).",
          "Separate and integrate: \\(\\log(\\theta - 30) = -kt + c_1\\), so \\(\\theta - 30 = c\\,e^{-kt}\\) ... (1)",
          "At \\(t = 0\\), \\(\\theta = 90\\): \\(c = 60\\).",
          "At \\(t = 10\\), \\(\\theta = 75\\): \\(45 = 60\\,e^{-10k}\\), so \\(e^{-10k} = \\dfrac{3}{4}\\).",
          "At \\(t = 20\\): \\(\\theta - 30 = 60\\left(e^{-10k}\\right)^2 = 60 \\times \\dfrac{9}{16} = 33.75\\).",
          "\\(\\theta = 30 + 33.75 = 63.75\\).",
        ],
        answer: "The temperature after 20 minutes is \\(63.75^\\circ\\)C",
      },
      selfCheckExample: {
        prompt: "A body at \\(95^\\circ\\)C cools in a room at \\(25^\\circ\\)C. Write the differential equation of Newton's law of cooling and its solution.",
        steps: [
          "\\(\\dfrac{d\\theta}{dt} = -k(\\theta - 25)\\), \\(k > 0\\).",
          "\\(\\theta = 25 + (95 - 25)e^{-kt}\\).",
        ],
        answer: "\\(\\dfrac{d\\theta}{dt} = -k(\\theta - 25)\\); \\(\\theta = 25 + 70\\,e^{-kt}\\)",
      },
      practiceSet: [
        {
          prompt: "A body cools in a room. Does it lose more degrees in the first 10 minutes or in the next 10 minutes?",
          answer: "In the first 10 minutes, when it is further above room temperature",
        },
        {
          prompt: "A body cools in a room at \\(20^\\circ\\)C. Its temperature is now \\(80^\\circ\\)C and \\(e^{-10k} = \\dfrac{1}{3}\\). Find its temperature after 10 minutes.",
          answer: "\\(20 + 60 \\times \\dfrac{1}{3} = 40^\\circ\\)C",
        },
      ],
      pyqExampleId: "c9830b25-a146-400e-93b6-f3b6aeb63eac",
      traps: [
        {
          title: "Using the temperature instead of the difference",
          body: "It is \\(\\theta - \\theta_0\\) that is multiplied by \\(e^{-kt}\\). Writing \\(\\theta = \\theta_1 e^{-kt}\\) forgets the room and lets the body cool below room temperature.",
        },
        {
          title: "An answer without its unit",
          body: "End with the unit the question uses: '... is \\(63.75^\\circ\\)C' or '... takes 30 minutes'. A bare number loses the last mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmde-rates",
      name: "Other rate problems: volume, surface area and curves",
      intuition:
        "Balloons, raindrops, cones being filled, money running out and curves described by their tangents all follow the same plan. Name the variables, write the given rate as a differential equation, separate and integrate, and use the given readings to find the constants.",
      definition:
        "- 'Changes at a constant rate' means \\(\\dfrac{dV}{dt} = k\\).\n" +
        "- Sphere: \\(V = \\dfrac{4}{3}\\pi r^3\\), surface area \\(S = 4\\pi r^2\\); by the chain rule \\(\\dfrac{dV}{dt} = 4\\pi r^2\\dfrac{dr}{dt}\\).\n" +
        "- Slope of the tangent at \\((x, y)\\) is \\(\\dfrac{dy}{dx}\\); slope of the normal is \\(-\\dfrac{dx}{dy}\\).\n" +
        "- There are usually two unknown constants (\\(k\\) and the constant of integration), so two readings are needed.",
      formula: {
        label: "From a rate to a formula",
        latex: "\\dfrac{dQ}{dt} = f(Q) \\;\\Rightarrow\\; \\int \\dfrac{dQ}{f(Q)} = \\int dt \\;\\Rightarrow\\; \\text{two readings give the two constants}",
      },
      authoredExample: {
        prompt: "The slope of the tangent at any point \\((x, y)\\) of a curve is \\(\\dfrac{y}{2x}\\). The curve passes through \\((4, 2)\\). Find its equation.",
        steps: [
          "\\(\\dfrac{dy}{dx} = \\dfrac{y}{2x}\\), so \\(\\dfrac{dy}{y} = \\dfrac{dx}{2x}\\).",
          "Integrate: \\(\\log y = \\dfrac{1}{2}\\log x + \\log c\\), so \\(y = c\\sqrt{x}\\) ... (1)",
          "The curve passes through \\((4, 2)\\): \\(2 = c\\sqrt{4} = 2c\\), so \\(c = 1\\).",
          "Put \\(c = 1\\) in (1): \\(y = \\sqrt{x}\\).",
        ],
        answer: "The curve is \\(y^2 = x\\)",
      },
      selfCheckExample: {
        prompt: "A spherical drop of water evaporates at a rate proportional to its surface area. Show that its radius decreases at a constant rate.",
        steps: [
          "\\(\\dfrac{dV}{dt} = -k(4\\pi r^2)\\), \\(k > 0\\), and \\(\\dfrac{dV}{dt} = 4\\pi r^2\\dfrac{dr}{dt}\\).",
          "So \\(4\\pi r^2\\dfrac{dr}{dt} = -4\\pi k r^2\\), giving \\(\\dfrac{dr}{dt} = -k\\), a constant.",
        ],
        answer: "\\(\\dfrac{dr}{dt} = -k\\)",
      },
      practiceSet: [
        { prompt: "Integrate \\(\\dfrac{dA}{dt} = -k\\sqrt{A}\\).", answer: "\\(2\\sqrt{A} = -kt + c\\)" },
        { prompt: "Write the slope of the normal to a curve at \\((x, y)\\) in terms of a derivative.", answer: "\\(-\\dfrac{dx}{dy}\\)" },
      ],
      pyqExampleId: "38282b26-b111-4740-8ddc-d969c080e3e8",
      traps: [
        {
          title: "One reading for two constants",
          body: "The constant of integration and the constant of proportionality are both unknown. Use the starting value for one and the second reading for the other before answering.",
        },
        {
          title: "Differentiating V without the chain rule",
          body: "\\(V = \\dfrac{4}{3}\\pi r^3\\) changes with time through \\(r\\), so \\(\\dfrac{dV}{dt} = 4\\pi r^2\\dfrac{dr}{dt}\\), not \\(4\\pi r^2\\).",
        },
      ],
    },
  ],
};
