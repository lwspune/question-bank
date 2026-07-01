import type { SubtopicNote } from "@/app/notes/_types";

export const NEWTONS_COOLING_NOTE: SubtopicNote = {
  subtopicName: "Newton's Law of Cooling",
  title: "Newton's Law of Cooling",
  oneLineDefinition:
    "A hot body cools at a rate proportional to how much hotter it is than its surroundings. This single named model turns every cooling question into: subtract the surrounding temperature, then track how that difference decays.",
  whyItMatters:
    "A compact, high-yield model — 5 PYQs sit here (3 HARD, 2 MODERATE) and MHT-CET repeats it almost verbatim year on year (2023, 2024, 2025). Every question is the same shape: cooling data over one interval fixes the rate, and you predict the temperature (or the time) over a second interval. " +
    "The traps are always the same three: forgetting to subtract the surrounding temperature before taking logs, mishandling the minus sign, and missing the clean (ratio) shortcut when the time-steps are equal.",
  concepts: [
    // 1 — the cooling model (foundation, PYQ-less formula variant → lint-exempt)
    {
      kind: "formula" as const,
      slug: "cetde-cooling-model",
      name: "The Cooling Model — Rate Proportional to Temperature Excess",
      intuition:
        "A cup of coffee cools fast when it is much hotter than the room and slowly once it is nearly room temperature. Newton's law captures exactly that: the cooling rate is proportional to the gap between the body and its surroundings. Once the gap is zero, cooling stops. The key move is to always work with the DIFFERENCE from the surrounding temperature, never the raw temperature.",
      definition:
        "Let \\(\\theta\\) be the body's temperature and \\(\\theta_s\\) the (constant) surrounding temperature. Newton's law of cooling states that the rate of cooling is proportional to the temperature excess \\(\\theta - \\theta_s\\):\n" +
        "\\[\\dfrac{d\\theta}{dt} = -k(\\theta - \\theta_s), \\qquad k > 0.\\]\n" +
        "- The **minus sign** is built in because a body hotter than its surroundings cools DOWN — \\(\\theta\\) decreases, so \\(\\tfrac{d\\theta}{dt}<0\\).\n" +
        "- \\(k>0\\) is a positive constant fixed by the body and medium.\n" +
        "- The equation is **separable**: everything in \\(\\theta\\) goes with \\(d\\theta\\), everything in \\(t\\) with \\(dt\\).",
      formula: {
        label: "Newton's law of cooling",
        latex: "\\dfrac{d\\theta}{dt} = -k(\\theta - \\theta_s), \\qquad k > 0",
        symbols: [
          { symbol: "\\theta", meaning: "temperature of the body at time t" },
          { symbol: "\\theta_s", meaning: "surrounding (ambient) temperature — constant" },
          { symbol: "k", meaning: "positive cooling constant" },
        ],
      },
      authoredExample: {
        prompt:
          "Water at \\(90^\\circ\\text{C}\\) sits in a room at \\(20^\\circ\\text{C}\\). Write the differential equation governing its cooling and identify the temperature excess at the start.",
        steps: [
          "Newton's law: \\(\\dfrac{d\\theta}{dt} = -k(\\theta - \\theta_s)\\) with the surrounding temperature \\(\\theta_s = 20\\).",
          "So the model is \\(\\dfrac{d\\theta}{dt} = -k(\\theta - 20)\\).",
          "The temperature excess at \\(t=0\\) is \\(\\theta_0 - \\theta_s = 90 - 20 = 70^\\circ\\text{C}\\) — this is the quantity that decays, not the \\(90\\) itself.",
        ],
        answer:
          "\\(\\dfrac{d\\theta}{dt} = -k(\\theta - 20)\\); initial excess \\(= 70^\\circ\\text{C}\\).",
      },
      selfCheckExample: {
        prompt:
          "A body at \\(60^\\circ\\text{C}\\) cools in surroundings at \\(15^\\circ\\text{C}\\). What is the temperature excess, and in which direction does \\(\\theta\\) change?",
        steps: [
          "Temperature excess \\(= \\theta - \\theta_s = 60 - 15 = 45^\\circ\\text{C}\\).",
          "Since the body is hotter than its surroundings, \\(\\theta - \\theta_s > 0\\), so \\(\\dfrac{d\\theta}{dt} = -k(\\theta - \\theta_s) < 0\\): the temperature falls.",
        ],
        answer: "Excess \\(= 45^\\circ\\text{C}\\); \\(\\theta\\) decreases (the body cools).",
      },
      practiceSet: [
        { prompt: "Body at \\(80^\\circ\\), room at \\(25^\\circ\\). Initial temperature excess?", answer: "\\(55^\\circ\\text{C}\\)", method: "\\(\\theta_0 - \\theta_s = 80 - 25\\)" },
        { prompt: "In \\(\\dfrac{d\\theta}{dt} = -k(\\theta - \\theta_s)\\), what does the minus sign encode?", answer: "The body cools (\\(\\theta\\) decreases)", method: "hotter-than-surroundings ⇒ negative rate" },
        { prompt: "When does cooling stop under this model?", answer: "When \\(\\theta = \\theta_s\\)", method: "then \\(\\theta - \\theta_s = 0\\)" },
        { prompt: "Which quantity decays exponentially — \\(\\theta\\) or \\(\\theta - \\theta_s\\)?", answer: "\\(\\theta - \\theta_s\\)", method: "always subtract the surrounding temperature first" },
      ],
      traps: [
        {
          title: "Always work with the excess \\(\\theta - \\theta_s\\), not \\(\\theta\\)",
          body:
            "The quantity that obeys clean exponential decay is the temperature EXCESS \\(\\theta - \\theta_s\\), not the raw temperature \\(\\theta\\). A body at \\(90^\\circ\\) in a \\(20^\\circ\\) room does not decay toward \\(0\\) — it decays toward \\(20\\). Subtract the surrounding temperature before doing anything else.",
        },
        {
          title: "The minus sign and \\(k>0\\) together mean cooling",
          body:
            "Write the model as \\(\\dfrac{d\\theta}{dt} = -k(\\theta - \\theta_s)\\) with \\(k>0\\). The minus sign is what makes a hot body cool. Absorbing the sign into \\(k\\) (letting \\(k<0\\)) and then also writing a minus is a common double-negative slip.",
        },
      ],
    },

    // 2 — solving the ODE: separate → log form → exponential form (anchored)
    {
      kind: "formula" as const,
      slug: "cetde-solving-log-form",
      name: "Solving the Cooling Equation — Log Form and Exponential Form",
      intuition:
        "The cooling equation is separable, so integrating gives a logarithm of the excess. Exponentiating that gives the working formula: the temperature excess starts at its initial value and multiplies by \\(e^{-kt}\\). Both forms are useful — the log form fits the data, the exponential form predicts the answer.",
      definition:
        "Separate and integrate \\(\\dfrac{d\\theta}{dt} = -k(\\theta - \\theta_s)\\):\n" +
        "\\[\\int\\dfrac{d\\theta}{\\theta - \\theta_s} = -\\int k\\,dt \\;\\Rightarrow\\; \\log(\\theta - \\theta_s) = -kt + c.\\]\n" +
        "Exponentiating and using the initial excess \\(\\theta_0 - \\theta_s\\) at \\(t=0\\):\n" +
        "\\[\\theta - \\theta_s = (\\theta_0 - \\theta_s)\\,e^{-kt}.\\]\n" +
        "- The **log form** \\(\\log(\\theta - \\theta_s) = -kt + c\\) is what you plug the two data points into.\n" +
        "- The **exponential form** \\(\\theta - \\theta_s = (\\theta_0 - \\theta_s)e^{-kt}\\) is what you evaluate for the final answer.\n" +
        "Here \\(\\log\\) is the natural logarithm.",
      formula: {
        label: "Log form and its exponential solution",
        latex:
          "\\log(\\theta - \\theta_s) = -kt + c \\qquad\\Longleftrightarrow\\qquad \\theta - \\theta_s = (\\theta_0 - \\theta_s)\\,e^{-kt}",
        symbols: [
          { symbol: "\\theta_0", meaning: "initial temperature of the body (at t = 0)" },
          { symbol: "c", meaning: "constant of integration = \\log(\\theta_0 - \\theta_s)" },
        ],
      },
      authoredExample: {
        prompt:
          "A body at \\(70^\\circ\\text{C}\\) is in surroundings at \\(20^\\circ\\text{C}\\). Given \\(k = \\tfrac{1}{10}\\log 2\\) per minute, find its temperature after \\(10\\) minutes.",
        steps: [
          "Exponential form: \\(\\theta - 20 = (70 - 20)e^{-kt} = 50\\,e^{-kt}\\).",
          "At \\(t = 10\\): \\(kt = \\tfrac{1}{10}\\log 2 \\times 10 = \\log 2\\), so \\(e^{-kt} = e^{-\\log 2} = \\tfrac12\\).",
          "Thus \\(\\theta - 20 = 50 \\times \\tfrac12 = 25\\), giving \\(\\theta = 45^\\circ\\text{C}\\).",
        ],
        answer: "\\(\\theta = 45^\\circ\\text{C}\\).",
      },
      selfCheckExample: {
        prompt:
          "A liquid at \\(80^\\circ\\text{C}\\) cools to \\(50^\\circ\\text{C}\\) in surroundings at \\(20^\\circ\\text{C}\\) in \\(20\\) minutes. Using the log form, find the time taken to reach \\(35^\\circ\\text{C}\\).",
        steps: [
          "Log form: \\(\\log(\\theta - 20) = -kt + c\\). At \\(t=0\\), \\(\\theta=80\\): \\(c = \\log 60\\).",
          "At \\(t=20\\), \\(\\theta=50\\): \\(\\log 30 = -20k + \\log 60 \\Rightarrow 20k = \\log 60 - \\log 30 = \\log 2\\), so \\(k = \\tfrac{1}{20}\\log 2\\).",
          "At \\(\\theta=35\\): \\(\\log 15 = -\\tfrac{t}{20}\\log 2 + \\log 60 \\Rightarrow \\tfrac{t}{20}\\log 2 = \\log 60 - \\log 15 = \\log 4 = 2\\log 2\\).",
          "So \\(\\tfrac{t}{20} = 2\\), giving \\(t = 40\\) min.",
        ],
        answer: "\\(t = 40\\) minutes.",
      },
      practiceSet: [
        { prompt: "Integrate \\(\\dfrac{d\\theta}{\\theta - \\theta_s} = -k\\,dt\\).", answer: "\\(\\log(\\theta - \\theta_s) = -kt + c\\)", method: "standard \\(\\int du/u = \\log u\\)" },
        { prompt: "Write the exponential form when \\(\\theta_0 = 100,\\ \\theta_s = 20\\).", answer: "\\(\\theta - 20 = 80\\,e^{-kt}\\)", method: "initial excess \\(= 80\\)" },
        { prompt: "If \\(e^{-kt} = \\tfrac14\\) and \\(\\theta_0 - \\theta_s = 60\\), find \\(\\theta - \\theta_s\\).", answer: "\\(15\\)", method: "\\(60 \\times \\tfrac14\\)" },
        { prompt: "The constant \\(c\\) in the log form equals?", answer: "\\(\\log(\\theta_0 - \\theta_s)\\)", method: "put \\(t=0\\) in \\(\\log(\\theta-\\theta_s)=-kt+c\\)" },
      ],
      pyqExampleId: "5a83f102-dec8-48c1-981f-b8592430a7b9", // 370→330 in 10min, air 290K, time to reach 295K → 40 min
      traps: [
        {
          title: "Take the log of the EXCESS, not the temperature",
          body:
            "The integral of \\(\\dfrac{d\\theta}{\\theta - \\theta_s}\\) is \\(\\log(\\theta - \\theta_s)\\), never \\(\\log\\theta\\). Feeding the raw temperature into the log (writing \\(\\log 370\\) instead of \\(\\log 80\\)) is the most common wrong start on these questions.",
        },
        {
          title: "Here \\(\\log\\) means natural log",
          body:
            "Throughout this model \\(\\log = \\log_e\\). The base cancels out anyway because you always take a ratio of two logs (or a ratio of excesses), so you never actually need its numerical value — but keep the notation consistent.",
        },
      ],
    },

    // 3 — two-stage cooling: fix k on the first interval, predict on the second (anchored)
    {
      kind: "formula" as const,
      slug: "cetde-two-stage-cooling",
      name: "Two-Stage Cooling — Fix the Rate, Then Predict",
      intuition:
        "Almost every exam cooling question gives you the temperature after ONE interval and asks for the temperature (or time) after a SECOND interval. The recipe is fixed: use the first interval's data to pin down \\(e^{-k\\Delta t}\\) (you never even need \\(k\\) itself), then substitute into the second interval.",
      definition:
        "Divide the two exponential-form equations to eliminate the unknown constants. Writing \\(E(t) = \\theta(t) - \\theta_s\\) for the excess:\n" +
        "\\[\\dfrac{E(t_2)}{E(t_1)} = e^{-k(t_2 - t_1)}.\\]\n" +
        "Procedure:\n" +
        "- **Stage 1:** from the given interval, compute the ratio of excesses to get \\(e^{-k\\Delta t}\\) (e.g. \\(\\tfrac{60-20}{80-20} = \\tfrac{2}{3}\\)).\n" +
        "- **Stage 2:** raise that ratio to the power (new interval \\(\\div\\) first interval) and multiply the current excess by it.\n" +
        "You work entirely with the multiplier \\(e^{-k\\Delta t}\\) — the value of \\(k\\) never has to be found.",
      formula: {
        label: "Ratio of excesses over two intervals",
        latex:
          "\\dfrac{\\theta_2 - \\theta_s}{\\theta_1 - \\theta_s} = e^{-k(t_2 - t_1)}",
        symbols: [
          { symbol: "\\theta_1, \\theta_2", meaning: "temperatures at times t₁, t₂" },
          { symbol: "\\theta_s", meaning: "surrounding temperature — subtracted from both" },
        ],
      },
      authoredExample: {
        prompt:
          "A body cools from \\(90^\\circ\\text{C}\\) to \\(60^\\circ\\text{C}\\) in a room at \\(30^\\circ\\text{C}\\) in \\(20\\) minutes. Find its temperature after \\(40\\) minutes.",
        steps: [
          "Excesses: start \\(90 - 30 = 60\\); after 20 min \\(60 - 30 = 30\\).",
          "Stage 1 — the 20-minute multiplier: \\(e^{-20k} = \\dfrac{30}{60} = \\dfrac{1}{2}\\).",
          "Stage 2 — \\(40\\) min is two \\(20\\)-min steps, so multiply the initial excess by the square of the multiplier: \\(\\theta - 30 = 60\\left(\\tfrac{1}{2}\\right)^2 = 60 \\times \\tfrac{1}{4} = 15\\).",
          "So \\(\\theta = 30 + 15 = 45^\\circ\\text{C}\\).",
        ],
        answer: "\\(\\theta = 45^\\circ\\text{C}\\).",
      },
      selfCheckExample: {
        prompt:
          "A body cools from \\(80^\\circ\\text{C}\\) to \\(60^\\circ\\text{C}\\) in a room at \\(30^\\circ\\text{C}\\) in \\(30\\) minutes. Find its temperature after one hour.",
        steps: [
          "Excesses: start \\(80 - 30 = 50\\); after 30 min \\(60 - 30 = 30\\).",
          "30-minute multiplier: \\(e^{-30k} = \\dfrac{30}{50} = \\dfrac{3}{5}\\).",
          "One hour = two steps: \\(\\theta - 30 = 50\\left(\\tfrac{3}{5}\\right)^2 = 50 \\times \\tfrac{9}{25} = 18\\).",
          "So \\(\\theta = 30 + 18 = 48^\\circ\\text{C}\\).",
        ],
        answer: "\\(\\theta = 48^\\circ\\text{C}\\).",
      },
      practiceSet: [
        { prompt: "Excess \\(50\\to30\\) in one step; what is the multiplier?", answer: "\\(\\tfrac{3}{5}\\)", method: "\\(30/50\\)" },
        { prompt: "Multiplier \\(\\tfrac{2}{3}\\) per step, initial excess \\(60\\). Excess after 2 steps?", answer: "\\(60\\left(\\tfrac{2}{3}\\right)^2 = \\tfrac{80}{3} \\approx 26.7\\)", method: "square the ratio" },
        { prompt: "Body \\(70\\to50\\), room \\(30\\). Multiplier over that interval?", answer: "\\(\\tfrac{1}{2}\\)", method: "\\((50-30)/(70-30)=20/40\\)" },
        { prompt: "To find the second-interval temperature, do you need the value of \\(k\\)?", answer: "No", method: "work with the multiplier \\(e^{-k\\Delta t}\\) only" },
      ],
      pyqExampleId: "d492f367-a3d1-4b32-a24b-3708f5499918", // 80→50 in 30min, room 25, after 1hr → 36.36°C
      traps: [
        {
          title: "Subtract the surrounding temperature BEFORE forming the ratio",
          body:
            "The ratio that stays constant is of the EXCESSES, not the raw temperatures. For \\(80\\to50\\) in a \\(25^\\circ\\) room the multiplier is \\(\\dfrac{50-25}{80-25} = \\dfrac{25}{55}\\), not \\(\\dfrac{50}{80}\\). Using the bare temperatures is the number-one error and gives a wrong answer every time.",
        },
        {
          title: "Match the exponent to the number of equal intervals",
          body:
            "If the first interval is \\(30\\) min and the target time is \\(60\\) min, that is \\(60/30 = 2\\) steps, so the multiplier is SQUARED. For \\(20\\) minutes after a \\(5\\)-minute interval it is \\(20/5 = 4\\) steps — the ratio to the FOURTH power. Miscounting the number of steps changes the exponent.",
        },
      ],
    },

    // 4 — the (ratio)ⁿ shortcut for equal time-steps (anchored)
    {
      kind: "formula" as const,
      slug: "cetde-equal-step-ratio-shortcut",
      name: "The (Ratio)ⁿ Shortcut for Equal Time-Steps",
      intuition:
        "When the target time is a whole-number multiple of the given interval, you can skip logarithms entirely. Over each EQUAL time-step the temperature excess is multiplied by the SAME fixed ratio — so it forms a geometric progression. Just raise the one-step ratio to the number of steps.",
      definition:
        "Over equal time-steps of length \\(\\Delta t\\), the excess \\(\\theta - \\theta_s\\) is multiplied by the constant factor \\(r = e^{-k\\Delta t}\\) each step — a geometric sequence:\n" +
        "\\[\\theta_n - \\theta_s = (\\theta_0 - \\theta_s)\\,r^{\\,n}, \\qquad r = e^{-k\\Delta t}.\\]\n" +
        "- Find \\(r\\) from one interval as a ratio of excesses.\n" +
        "- After \\(n\\) equal steps, the excess is \\((\\theta_0 - \\theta_s)\\,r^n\\); add \\(\\theta_s\\) back for the temperature.\n" +
        "This is exact (not an approximation) and avoids logs whenever the times are commensurate.",
      formula: {
        label: "Geometric decay of the excess over n equal steps",
        latex: "\\theta_n - \\theta_s = (\\theta_0 - \\theta_s)\\,r^{\\,n}, \\qquad r = e^{-k\\Delta t}",
        symbols: [
          { symbol: "r", meaning: "one-step ratio of excesses (constant for equal Δt)" },
          { symbol: "n", meaning: "number of equal time-steps = total time ÷ Δt" },
        ],
      },
      authoredExample: {
        prompt:
          "A body cools from \\(70^\\circ\\text{C}\\) to \\(50^\\circ\\text{C}\\) in \\(10\\) minutes; the surroundings are at \\(30^\\circ\\text{C}\\). Find the temperature after cooling for \\(30\\) minutes.",
        steps: [
          "Excesses: start \\(70 - 30 = 40\\); after 10 min \\(50 - 30 = 20\\). One-step ratio \\(r = \\dfrac{20}{40} = \\dfrac12\\).",
          "\\(30\\) min \\(= 3\\) steps of \\(10\\) min, so \\(n = 3\\).",
          "Excess after 3 steps: \\(40\\left(\\tfrac12\\right)^3 = 40 \\times \\tfrac{1}{8} = 5\\).",
          "Temperature: \\(\\theta = 30 + 5 = 35^\\circ\\text{C}\\).",
        ],
        answer: "\\(\\theta = 35^\\circ\\text{C}\\).",
      },
      selfCheckExample: {
        prompt:
          "A spherical ball at \\(80^\\circ\\text{C}\\) cools to \\(60^\\circ\\text{C}\\) in \\(5\\) minutes; surroundings at \\(20^\\circ\\text{C}\\). Find its temperature after \\(20\\) minutes.",
        steps: [
          "Excesses: start \\(80 - 20 = 60\\); after 5 min \\(60 - 20 = 40\\). One-step ratio \\(r = \\dfrac{40}{60} = \\dfrac23\\).",
          "\\(20\\) min \\(= 4\\) steps of \\(5\\) min, so \\(n = 4\\).",
          "Excess: \\(60\\left(\\tfrac23\\right)^4 = 60 \\times \\tfrac{16}{81} = \\tfrac{960}{81} \\approx 11.85\\).",
          "Temperature: \\(\\theta \\approx 20 + 11.85 = 31.85^\\circ\\text{C}\\).",
        ],
        answer: "\\(\\theta \\approx 31.85^\\circ\\text{C}\\).",
      },
      practiceSet: [
        { prompt: "One-step ratio \\(\\tfrac12\\), initial excess \\(80\\), \\(n=4\\). Final excess?", answer: "\\(5\\)", method: "\\(80\\left(\\tfrac12\\right)^4\\)" },
        { prompt: "Ratio \\(\\tfrac23\\), initial excess \\(60\\), \\(n=2\\). Final excess?", answer: "\\(\\tfrac{80}{3} \\approx 26.7\\)", method: "\\(60\\left(\\tfrac23\\right)^2\\)" },
        { prompt: "Interval 5 min, target 20 min. How many steps \\(n\\)?", answer: "\\(4\\)", method: "\\(20 \\div 5\\)" },
        { prompt: "Equal time-steps ⇒ the excesses form which kind of sequence?", answer: "Geometric (constant ratio)", method: "multiply by \\(r\\) each step" },
      ],
      pyqExampleId: "7fcc14b5-c4a0-4f3e-86da-22f2048addf2", // 100→60 in 15min, surroundings 20, after 1hr → 25°C
      traps: [
        {
          title: "Equal steps ⇒ geometric ratio of the EXCESSES",
          body:
            "The excess is multiplied by the same ratio each equal step, so it decays geometrically — NOT linearly. Between \\(100\\to60\\) the drop was \\(40^\\circ\\); the next equal step is not another \\(40^\\circ\\) but a HALVING of the excess (\\(80\\to40\\to20\\to10\\to5\\)). Treating cooling as a constant per-step drop overshoots badly.",
        },
        {
          title: "Count n as total time ÷ interval, then raise the ratio to that power",
          body:
            "The exponent \\(n\\) is the number of equal intervals, not the number of minutes. For a \\(15\\)-min interval and a \\(60\\)-min target, \\(n = 60/15 = 4\\), so use \\(r^4\\). Plugging \\(n = 60\\) (the minutes) instead of \\(4\\) (the steps) is a fatal slip.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Solving ODEs — separable, IVP, and applications (NDA)",
      href: "/notes/nda-maths/differential-equations/solving",
    },
  ],
};
