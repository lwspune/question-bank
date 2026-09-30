import type { SubtopicNote } from "@/app/notes/_types";

export const JEE_CH_KIN_RATE_NOTE: SubtopicNote = {
  subtopicName: "Rate of Reaction and Stoichiometry",
  title: "Rate of Reaction and Stoichiometry",
  oneLineDefinition:
    "The average rate is a change in concentration over a time interval; one rate of reaction is shared by every species once each species' rate is divided by its coefficient.",
  whyItMatters:
    "Nine PYQs, four of them multiple choice, and two from 2026. Five convert the rate of one species into the rate of another through the coefficients of the balanced equation; four measure a rate — an average rate read from a plot or from a change in concentration, or the iodide–hydrogen peroxide clock experiment. Two ideas cover the page.",
  concepts: [
    // C1 — average rate and how it is measured
    {
      kind: "formula" as const,
      slug: "jckin-measuring-rate",
      name: "Average rate from a change in concentration",
      intuition:
        "A rate says how fast a concentration changes. Over an interval, divide the change in concentration by the time taken. A reactant's concentration falls, so a minus sign keeps the rate positive. On a concentration–time plot, read both curves over the same interval: for \\(A \\rightarrow nB\\), the rise in \\([B]\\) is \\(n\\) times the fall in \\([A]\\).",
      definition:
        "- Average rate \\(= -\\dfrac{\\Delta[\\text{R}]}{\\Delta t} = +\\dfrac{\\Delta[\\text{P}]}{\\Delta t}\\) for a 1 : 1 reaction.\n" +
        "- Instantaneous rate \\(= -\\dfrac{d[\\text{R}]}{dt}\\), the slope of the tangent to the curve at that time.\n" +
        "- Unit: mol L\\(^{-1}\\) s\\(^{-1}\\). A rate per minute is 60 times a rate per second; a rate per hour is 60 times a rate per minute.\n" +
        "- For \\(A \\rightarrow nB\\): \\(n = \\dfrac{\\Delta[B]}{-\\Delta[A]}\\) over the same interval.\n" +
        "- The iodide–\\(\\mathrm{H_2O_2}\\) clock: \\(\\mathrm{H_2O_2 + 2I^- + 2H^+ \\rightarrow I_2 + 2H_2O}\\). A little thiosulphate turns the \\(\\mathrm{I_2}\\) back to \\(\\mathrm{I^-}\\) as it forms. When the thiosulphate is used up, \\(\\mathrm{I_2}\\) builds up and turns **starch** blue. Use fresh starch, keep thiosulphate LESS than KI, and record the time the instant the blue appears.",
      formula: {
        label: "Average rate",
        latex: "r_{\\text{av}} = -\\frac{\\Delta[\\text{R}]}{\\Delta t} = +\\frac{\\Delta[\\text{P}]}{\\Delta t}",
      },
      authoredExample: {
        prompt:
          "For \\(A \\rightarrow nB\\), \\([A]\\) falls from 0.080 M to 0.060 M in the first 5 min while \\([B]\\) rises from 0 to 0.040 M. Find \\(n\\), and the average rate of disappearance of \\(A\\) in mol L\\(^{-1}\\) h\\(^{-1}\\).",
        steps: [
          "\\(-\\Delta[A] = 0.080 - 0.060 = 0.020\\) M and \\(\\Delta[B] = 0.040\\) M, so \\(n = \\dfrac{0.040}{0.020} = 2\\).",
          "Rate \\(= \\dfrac{0.020}{5} = 0.004\\) mol L\\(^{-1}\\) min\\(^{-1}\\).",
          "Per hour: \\(0.004 \\times 60 = 0.24\\) mol L\\(^{-1}\\) h\\(^{-1}\\).",
        ],
        answer: "\\(n = 2\\); \\(0.24\\) mol L\\(^{-1}\\) h\\(^{-1}\\).",
      },
      selfCheckExample: {
        prompt:
          "In a 1 : 1 reaction, the concentration of the product rises from 0.15 mol L\\(^{-1}\\) at \\(t = 20\\) s to 0.33 mol L\\(^{-1}\\) at \\(t = 80\\) s. Find the average rate in mol L\\(^{-1}\\) min\\(^{-1}\\).",
        steps: [
          "\\(\\Delta[\\text{P}] = 0.18\\) mol L\\(^{-1}\\) over \\(\\Delta t = 60\\) s, so the rate is \\(0.003\\) mol L\\(^{-1}\\) s\\(^{-1}\\).",
          "Per minute: \\(0.003 \\times 60 = 0.18\\) mol L\\(^{-1}\\) min\\(^{-1}\\).",
        ],
        answer: "\\(0.18\\) mol L\\(^{-1}\\) min\\(^{-1}\\).",
      },
      practiceSet: [
        { prompt: "\\([A]\\) falls from 0.50 M to 0.30 M in 40 s. Average rate of disappearance of \\(A\\)?", answer: "\\(5 \\times 10^{-3}\\) mol L\\(^{-1}\\) s\\(^{-1}\\)" },
        { prompt: "Write 0.3 mol L\\(^{-1}\\) h\\(^{-1}\\) in mol L\\(^{-1}\\) min\\(^{-1}\\).", answer: "\\(0.005\\) mol L\\(^{-1}\\) min\\(^{-1}\\)" },
        { prompt: "In the iodide–\\(\\mathrm{H_2O_2}\\) clock reaction, which species turns starch blue?", answer: "Iodine, \\(\\mathrm{I_2}\\)" },
        { prompt: "For \\(A \\rightarrow nB\\), \\([A]\\) falls by 0.02 M while \\([B]\\) rises by 0.08 M. Find \\(n\\).", answer: "\\(4\\)" },
      ],
      pyqExampleId: "bbd42414-e03f-4de6-8e60-290df6c44e1f", // 2026 — A → nB, read n from the concentration–time plot
      traps: [
        {
          title: "Clock reaction: the time and the thiosulphate",
          body:
            "The time is recorded the instant the blue colour appears, because that is when the thiosulphate runs out. Thiosulphate must be LESS than KI; with more thiosulphate, iodine never builds up and the blue never comes.",
        },
        {
          title: "Minutes divided as if they were hours",
          body:
            "A change of 0.1 mol L\\(^{-1}\\) in 20 minutes is \\(\\dfrac{0.1}{1/3} = 0.3\\) mol L\\(^{-1}\\) h\\(^{-1}\\). Convert the time into the unit the question asks for before dividing.",
        },
      ],
    },

    // C2 — converting between species through the coefficients
    {
      kind: "formula" as const,
      slug: "jckin-coefficient-rates",
      name: "Rates of different species through the coefficients",
      intuition:
        "In \\(aA + bB \\rightarrow cC + dD\\), each species changes at its own speed: \\(A\\) is used up \\(a\\) times as fast as the reaction runs, \\(D\\) forms \\(d\\) times as fast. Divide each species' rate by its coefficient and all of them give one number, the rate of reaction.",
      definition:
        "- \\(r = -\\dfrac{1}{a}\\dfrac{d[A]}{dt} = -\\dfrac{1}{b}\\dfrac{d[B]}{dt} = \\dfrac{1}{c}\\dfrac{d[C]}{dt} = \\dfrac{1}{d}\\dfrac{d[D]}{dt}\\).\n" +
        "- From species X to species Y: rate of Y \\(= \\dfrac{y}{x} \\times\\) rate of X, where \\(x\\) and \\(y\\) are their coefficients.\n" +
        "- The **rate of reaction** is the per-coefficient value, not the rate of any one species.\n" +
        "- Check the unit asked for: 1 mmol dm\\(^{-3}\\) s\\(^{-1}\\) \\(= 10^{-3}\\) mol dm\\(^{-3}\\) s\\(^{-1}\\).",
      formula: {
        label: "Rate of reaction",
        latex:
          "r = -\\frac{1}{a}\\frac{d[A]}{dt} = -\\frac{1}{b}\\frac{d[B]}{dt} = \\frac{1}{c}\\frac{d[C]}{dt} = \\frac{1}{d}\\frac{d[D]}{dt}",
      },
      authoredExample: {
        prompt:
          "For \\(\\mathrm{4NH_3 + 5O_2 \\rightarrow 4NO + 6H_2O}\\), oxygen is used up at 0.025 mol L\\(^{-1}\\) s\\(^{-1}\\). Find the rate of reaction and the rate of formation of water.",
        steps: [
          "\\(r = \\dfrac{1}{5} \\times 0.025 = 0.005\\) mol L\\(^{-1}\\) s\\(^{-1}\\).",
          "Water: \\(6 \\times 0.005 = 0.030\\) mol L\\(^{-1}\\) s\\(^{-1}\\).",
        ],
        answer: "\\(r = 0.005\\); water forms at \\(0.030\\) mol L\\(^{-1}\\) s\\(^{-1}\\).",
      },
      selfCheckExample: {
        prompt:
          "For \\(\\mathrm{N_2 + 3H_2 \\rightarrow 2NH_3}\\), ammonia forms at \\(3.6 \\times 10^{-4}\\) mol L\\(^{-1}\\) s\\(^{-1}\\). Find the rate of disappearance of \\(\\mathrm{H_2}\\).",
        steps: [
          "\\(r = \\dfrac{1}{2} \\times 3.6 \\times 10^{-4} = 1.8 \\times 10^{-4}\\) mol L\\(^{-1}\\) s\\(^{-1}\\).",
          "\\(\\mathrm{H_2}\\): \\(3 \\times 1.8 \\times 10^{-4} = 5.4 \\times 10^{-4}\\) mol L\\(^{-1}\\) s\\(^{-1}\\).",
        ],
        answer: "\\(5.4 \\times 10^{-4}\\) mol L\\(^{-1}\\) s\\(^{-1}\\).",
      },
      practiceSet: [
        { prompt: "For \\(\\mathrm{2N_2O_5 \\rightarrow 4NO_2 + O_2}\\), \\(\\mathrm{O_2}\\) forms at 0.01 mol L\\(^{-1}\\) min\\(^{-1}\\). Rate of formation of \\(\\mathrm{NO_2}\\)?", answer: "\\(0.04\\) mol L\\(^{-1}\\) min\\(^{-1}\\)" },
        { prompt: "For \\(\\mathrm{2SO_2 + O_2 \\rightarrow 2SO_3}\\), \\(\\mathrm{SO_2}\\) is used up at 0.8 mol L\\(^{-1}\\) min\\(^{-1}\\). Rate of reaction?", answer: "\\(0.4\\) mol L\\(^{-1}\\) min\\(^{-1}\\)" },
        { prompt: "For \\(2A + B \\rightarrow 3C\\), \\(-\\dfrac{d[B]}{dt} = 0.2\\) mol L\\(^{-1}\\) s\\(^{-1}\\). Rate of formation of \\(C\\)?", answer: "\\(0.6\\) mol L\\(^{-1}\\) s\\(^{-1}\\)" },
        { prompt: "Write 6 mmol dm\\(^{-3}\\) s\\(^{-1}\\) in mol dm\\(^{-3}\\) s\\(^{-1}\\).", answer: "\\(6 \\times 10^{-3}\\)" },
      ],
      pyqExampleId: "edb78299-2aef-4a06-b54e-3cc91084e751", // 2026 — equal rates of two reactions, divide the Br⁻ rate by 5
      traps: [
        {
          title: "Two species' rates taken as equal",
          body:
            "In \\(\\mathrm{2N_2O_5 \\rightarrow 4NO_2 + O_2}\\), \\(\\mathrm{NO_2}\\) forms twice as fast as \\(\\mathrm{N_2O_5}\\) is used up, not at the same rate. Divide each species' rate by its own coefficient before comparing.",
        },
        {
          title: "A species' rate reported as the rate of reaction",
          body:
            "The rate of reaction is the species' rate divided by its coefficient. If \\(\\mathrm{Br^-}\\) (coefficient 5) is used up at \\(5 \\times 10^{-4}\\) mol L\\(^{-1}\\) s\\(^{-1}\\), the rate of reaction is \\(1 \\times 10^{-4}\\), not \\(5 \\times 10^{-4}\\).",
        },
      ],
    },
  ],
};
