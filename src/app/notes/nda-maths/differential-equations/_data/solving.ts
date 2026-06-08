import type { SubtopicNote } from "@/app/notes/_types";

export const SOLVING_NOTE: SubtopicNote = {
  subtopicName: "Solving and Verifying ODEs — Separable, IVP, and Applications",
  title: "Solving ODEs — Separable, Substitution, Integrating Factor",
  oneLineDefinition:
    "First-order ODEs are solved by a small toolkit: separate the variables, reduce a tangled one by substitution, or use an integrating factor for the linear case — then fit any initial condition.",
  whyItMatters:
    "29 PYQs, the biggest subtopic and the home of most HARD questions. The whole skill is reading the equation's shape to pick the method: separable if the variables come apart, a substitution v = x ± y if they don't, an integrating factor if it is linear. Applications add growth/decay and particle-motion initial-value problems.",
  concepts: [
    // 1 — separable
    {
      kind: "formula" as const,
      slug: "separable-variables",
      name: "Separation of variables",
      intuition:
        "The first thing to try: get all the y's (with dy) on one side and all the x's (with dx) on the other, then integrate both sides. Most first-order NDA equations either separate directly or do so after a small rewrite (taking logs, or recognising an exponential).",
      definition:
        "The separable method:\n" +
        "- Write the equation as \\(g(y)\\,dy = f(x)\\,dx\\), then integrate both sides — don't forget the single arbitrary constant.\n" +
        "- Exponentials separate: \\(\\ln\\big(\\tfrac{dy}{dx}\\big) = ax+by \\Rightarrow \\tfrac{dy}{dx}=e^{ax}e^{by} \\Rightarrow e^{-by}\\,dy=e^{ax}\\,dx\\).\n" +
        "- A constant derivative integrates trivially: \\(\\cos\\big(\\tfrac{dy}{dx}\\big)=p \\Rightarrow \\tfrac{dy}{dx}=\\cos^{-1}p \\Rightarrow y = x\\cos^{-1}p + C\\).",
      authoredExample: {
        prompt: "Solve \\(\\dfrac{dy}{dx} = (1+y^2)\\) — i.e. \\(dy = (1+y^2)\\,dx\\).",
        steps: [
          "Separate: \\(\\dfrac{dy}{1+y^2} = dx\\).",
          "Integrate both sides: \\(\\tan^{-1}y = x + C\\).",
        ],
        answer: "\\(\\tan^{-1}y = x + C\\) (so \\(y = \\tan(x+C)\\)).",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\ln\\big(\\dfrac{dy}{dx}\\big) + y = x\\).",
        steps: [
          "Rearrange: \\(\\ln\\big(\\tfrac{dy}{dx}\\big) = x - y\\), so \\(\\tfrac{dy}{dx} = e^{x-y} = e^x e^{-y}\\).",
          "Separate: \\(e^{y}\\,dy = e^{x}\\,dx\\).",
          "Integrate: \\(e^{y} = e^{x} + K\\), i.e. \\(e^{x} - e^{y} = c\\).",
        ],
        answer: "\\(e^{x} - e^{y} = c\\).",
      },
      practiceSet: [
        { prompt: "Solve \\(x\\,dy - y\\,dx = 0\\).", answer: "\\(y = cx\\)", method: "\\(\\frac{dy}{y}=\\frac{dx}{x}\\)" },
        { prompt: "Separate \\(\\frac{dy}{dx} = e^{2y}\\).", answer: "\\(e^{-2y}\\,dy = dx\\)" },
        { prompt: "Solve \\(\\frac{dy}{dx} = (\\ln 5)\\,y\\).", answer: "\\(y = A\\cdot 5^{x}\\)", method: "\\(\\frac{dy}{y}=\\ln5\\,dx\\)" },
        { prompt: "After separating, never forget the?", answer: "Arbitrary constant" },
      ],
      pyqExampleId: "11c2e7b7-1139-40ae-91c7-d47e83dd9029", // ln(dy/dx)+y=x → eˣ-eʸ=c
      traps: [
        {
          title: "Take logs / exponentials to unlock separation",
          body:
            "Equations like \\(\\ln(dy/dx)=ax+by\\) look non-separable until you exponentiate: \\(dy/dx=e^{ax}e^{by}\\) splits cleanly. Always check whether one rewrite makes the variables come apart before reaching for a heavier method.",
        },
      ],
    },

    // 2 — reducible by substitution
    {
      kind: "formula" as const,
      slug: "reducible-by-substitution",
      name: "Reducible to separable by substitution",
      intuition:
        "When x and y appear glued together as a combination like \\(x+y\\) or \\(y-x\\), substitute a new variable for that combination. The substitution turns a tangled equation into a separable one in the new variable. Also learn to spot exact differentials like \\(d(xy)\\) and \\(d(x/y)\\).",
      definition:
        "Two reduction tricks:\n" +
        "- **Substitute the combination**: if the equation depends on \\(x+y\\) (or \\(y-x\\)), set \\(v=x+y\\), so \\(\\tfrac{dv}{dx}=1+\\tfrac{dy}{dx}\\), and the equation becomes separable in \\(v\\).\n" +
        "- **Recognise exact differentials**: \\(x\\,dy+y\\,dx=d(xy)\\); \\(\\dfrac{x\\,dy-y\\,dx}{y^2}=d\\!\\big(\\tfrac{x}{y}\\big)\\); \\(x\\,dx+y\\,dy=\\tfrac12 d(x^2+y^2)\\).",
      authoredExample: {
        prompt: "Solve \\(\\dfrac{dy}{dx} = \\cos(y-x) + 1\\).",
        steps: [
          "Let \\(v = y - x\\), so \\(\\dfrac{dv}{dx} = \\dfrac{dy}{dx} - 1 = \\cos v\\).",
          "Separate: \\(\\dfrac{dv}{\\cos v} = dx \\Rightarrow \\sec v\\,dv = dx\\).",
          "Integrate: \\(\\ln|\\sec v + \\tan v| = x + c_1\\), so \\(\\sec(y-x)+\\tan(y-x) = Ae^{x}\\).",
        ],
        answer: "\\(\\sec(y-x)+\\tan(y-x) = Ae^{x}\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\dfrac{dx}{dy} = \\dfrac{x+y+1}{x+y-1}\\).",
        steps: [
          "Let \\(v = x+y\\), so \\(\\dfrac{dv}{dy} = \\dfrac{dx}{dy}+1 = \\dfrac{v+1}{v-1}+1 = \\dfrac{2v}{v-1}\\).",
          "Separate: \\(\\dfrac{v-1}{2v}\\,dv = dy \\Rightarrow \\tfrac12\\big(1 - \\tfrac1v\\big)dv = dy\\).",
          "Integrate: \\(\\tfrac12(v - \\ln|v|) = y + C \\Rightarrow (x+y) - \\ln|x+y| = 2y + c\\).",
        ],
        answer: "\\(x - y - \\ln|x+y| = c\\).",
      },
      practiceSet: [
        { prompt: "For an equation in \\(x+y\\), substitute?", answer: "\\(v = x+y\\)" },
        { prompt: "\\(x\\,dy + y\\,dx = ?\\)", answer: "\\(d(xy)\\)" },
        { prompt: "\\(\\frac{x\\,dy - y\\,dx}{y^2} = ?\\)", answer: "\\(d(x/y)\\)" },
      ],
      pyqExampleId: "7a0c2752-4dfd-4c2c-b662-e7af36e4fbd2", // dx/dy=(x+y+1)/(x+y-1)
      traps: [
        {
          title: "Spot the glued combination first",
          body:
            "If you cannot separate directly, look for \\(x+y\\) or \\(y-x\\) appearing as a unit — that is the signal to substitute \\(v\\) for it. Trying to force separation without the substitution leads nowhere.",
        },
      ],
    },

    // 3 — linear / integrating factor
    {
      kind: "formula" as const,
      slug: "linear-equations-integrating-factor",
      name: "Linear equations and the integrating factor",
      intuition:
        "A first-order LINEAR equation — y appears only to the first power, multiplied by functions of x — is solved by multiplying through by an integrating factor that turns the left side into the derivative of a product. Sometimes the equation is linear in x instead of y, so flip it to dx/dy first.",
      definition:
        "The integrating-factor method:\n" +
        "- Standard form: \\(\\dfrac{dy}{dx} + P(x)\\,y = Q(x)\\).\n" +
        "- **Integrating factor** \\(\\mu = e^{\\int P\\,dx}\\); then \\(\\dfrac{d}{dx}(\\mu y) = \\mu Q\\), so \\(\\mu y = \\int \\mu Q\\,dx + c\\).\n" +
        "- If the equation is linear in \\(x\\), use \\(\\dfrac{dx}{dy} + P(y)\\,x = Q(y)\\) with \\(\\mu = e^{\\int P\\,dy}\\).\n" +
        "- **Bernoulli** \\(\\dfrac{dy}{dx}+Py = Qy^{n}\\): substitute \\(v=y^{1-n}\\) to make it linear.",
      formula: {
        label: "Integrating factor",
        latex: "\\mu = e^{\\int P(x)\\,dx},\\qquad \\frac{d}{dx}(\\mu y) = \\mu Q",
      },
      authoredExample: {
        prompt: "Solve \\(\\dfrac{dy}{dx} + \\dfrac{y}{x} = x\\).",
        steps: [
          "Here \\(P = \\tfrac1x\\), so \\(\\mu = e^{\\int \\frac1x dx} = e^{\\ln x} = x\\).",
          "\\(\\dfrac{d}{dx}(xy) = x\\cdot x = x^2\\).",
          "Integrate: \\(xy = \\dfrac{x^3}{3} + c\\), so \\(y = \\dfrac{x^2}{3} + \\dfrac{c}{x}\\).",
        ],
        answer: "\\(xy = \\dfrac{x^3}{3} + c\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\(y\\,dx - (x + 2y^2)\\,dy = 0\\).",
        steps: [
          "It is linear in \\(x\\): \\(\\dfrac{dx}{dy} - \\dfrac{x}{y} = 2y\\). Here \\(P(y) = -\\tfrac1y\\).",
          "\\(\\mu = e^{\\int -\\frac1y dy} = e^{-\\ln y} = \\tfrac1y\\); then \\(\\dfrac{d}{dy}\\big(\\tfrac{x}{y}\\big) = 2\\).",
          "Integrate: \\(\\dfrac{x}{y} = 2y + c\\), so \\(x = 2y^2 + cy\\).",
        ],
        answer: "\\(x = 2y^2 + cy\\).",
      },
      practiceSet: [
        { prompt: "Integrating factor for \\(\\frac{dy}{dx}+Py=Q\\)?", answer: "\\(e^{\\int P\\,dx}\\)" },
        { prompt: "IF for \\(\\frac{dy}{dx}+\\frac{1}{x}y = ...\\)?", answer: "\\(x\\)", method: "\\(e^{\\ln x}\\)" },
        { prompt: "Bernoulli \\(\\frac{dy}{dx}+Py=Qy^2\\): substitute?", answer: "\\(v = y^{-1}\\)" },
      ],
      pyqExampleId: "38c9ec71-cb06-4e17-b468-93f24866e8c2", // y dx-(x+2y²)dy=0 → x=2y²+cy
      traps: [
        {
          title: "If it is not linear in y, try linear in x",
          body:
            "\\(y\\,dx - (x+2y^2)\\,dy = 0\\) is not linear in \\(y\\), but rewriting as \\(\\frac{dx}{dy}-\\frac{x}{y}=2y\\) makes it linear in \\(x\\). Flipping to \\(dx/dy\\) is the move when y-as-the-function fails.",
        },
      ],
    },

    // 4 — applications and IVP (diagram)
    {
      kind: "formula" as const,
      slug: "applications-and-ivp",
      name: "Initial-value problems and growth/decay",
      intuition:
        "An initial value pins down the arbitrary constant: solve the ODE generally, then plug in the given point. The classic application is exponential growth and decay — anything whose rate of change is proportional to its current amount. Verifying a proposed solution just means substituting it back.",
      definition:
        "Applications and verification:\n" +
        "- **Growth/decay**: \\(\\dfrac{dy}{dt} = ky\\) has solution \\(y = y_0 e^{kt}\\) (\\(k>0\\) growth, \\(k<0\\) decay — radioactivity, cooling).\n" +
        "- **IVP**: find the general solution, then use the condition (e.g. \\(y(0)=y_0\\)) to fix the constant.\n" +
        "- **Verify** a candidate by substituting it into the ODE; a factored equation like \\((y')^2 - x\\,y' = 0\\) splits into \\(y'=0\\) and \\(y'=x\\), giving two solution families.",
      visualizationSlug: "defeq-growth-decay",
      authoredExample: {
        prompt: "A particle starts at the origin with \\(\\dfrac{dx}{dt} = x + 1\\). How long to travel 24 m?",
        steps: [
          "Separate: \\(\\dfrac{dx}{x+1} = dt\\), integrate: \\(\\ln(x+1) = t + C\\).",
          "At \\(t=0, x=0\\): \\(\\ln 1 = C \\Rightarrow C = 0\\).",
          "When \\(x = 24\\): \\(t = \\ln 25 = \\ln 5^2 = 2\\ln 5\\).",
        ],
        answer: "\\(2\\ln 5\\) seconds.",
      },
      selfCheckExample: {
        prompt: "If \\(\\dfrac{dy}{dx} = (\\ln 5)\\,y\\) with \\(y(0) = \\ln 5\\), find \\(y(1)\\).",
        steps: [
          "General solution: \\(\\dfrac{dy}{y} = \\ln 5\\,dx \\Rightarrow y = A\\,5^{x}\\).",
          "Apply \\(y(0) = \\ln 5\\): \\(A = \\ln 5\\).",
          "\\(y(1) = \\ln 5\\cdot 5^{1} = 5\\ln 5\\).",
        ],
        answer: "\\(5\\ln 5\\).",
      },
      practiceSet: [
        { prompt: "Solution of \\(\\frac{dy}{dt}=ky\\)?", answer: "\\(y = y_0 e^{kt}\\)" },
        { prompt: "Radioactive decay has \\(k\\) ___ 0.", answer: "less than (k < 0)" },
        { prompt: "Factor \\((y')^2 - x\\,y' = 0\\).", answer: "\\(y'(y'-x)=0\\): \\(y=c\\) or \\(y=\\frac{x^2}{2}+c\\)" },
      ],
      pyqExampleId: "adba6a5d-d147-4fa7-ae84-97eff1bceea8", // particle dx/dt=x+1 → 2ln5
      traps: [
        {
          title: "Apply the initial condition to the GENERAL solution",
          body:
            "Solve fully (keeping the arbitrary constant) BEFORE substituting the initial value. Plugging the condition in too early — before integrating — loses the constant you are trying to determine.",
        },
      ],
    },
  ],
};
