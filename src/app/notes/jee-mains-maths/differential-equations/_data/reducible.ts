import type { SubtopicNote } from "@/app/notes/_types";

export const REDUCIBLE_DE_NOTE: SubtopicNote = {
  subtopicName: "Equations Reducible to Linear",
  title: "Equations Reducible to Linear",
  oneLineDefinition:
    "Equations that become linear after a change of viewpoint: treating x as the unknown function of y, dividing a Bernoulli equation by a power of y, or substituting for a function of y such as tan y or e to the power sin y.",
  whyItMatters:
    "Nineteen PYQs. None is linear in y as printed, and each becomes the previous pages' routine after one move. Seven are linear in x once dx/dy is taken as the unknown; five are Bernoulli; seven hide a function of y whose derivative sits next to dy/dx. Three ideas cover the page.",
  concepts: [
    // C1 — linear in x
    {
      kind: "formula" as const,
      slug: "jde-linear-in-x",
      name: "Linear in x: dx/dy + P(y)x = Q(y)",
      intuition:
        "If \\(y\\) appears in awkward places but \\(x\\) appears only to the first power, flip the derivative. Write the equation as \\(\\frac{dx}{dy}+P(y)\\,x=Q(y)\\); the integrating factor is \\(e^{\\int P\\,dy}\\) and everything is integrated in \\(y\\). The given point is still \\((x,y)\\), so read it the right way round.",
      definition:
        "- \\(\\frac{dx}{dy}+P(y)x=Q(y)\\Rightarrow x\\,e^{\\int P\\,dy}=\\int Q\\,e^{\\int P\\,dy}\\,dy+C\\).\n" +
        "- Signal: terms like \\(\\tan^{-1}y\\), \\(y^3\\), \\(e^y\\) multiplying \\(dx\\) or standing alone, with \\(x\\) linear.\n" +
        "- \\(y^2\\,dx+\\left(x-\\frac1y\\right)dy=0\\Rightarrow\\frac{dx}{dy}+\\frac{x}{y^2}=\\frac{1}{y^3}\\).",
      formula: {
        label: "Linear in x",
        latex: "\\frac{dx}{dy}+P(y)\\,x=Q(y)\\ \\Rightarrow\\ x\\,e^{\\int P\\,dy}=\\int Q\\,e^{\\int P\\,dy}\\,dy+C",
      },
      authoredExample: {
        prompt: "Solve \\((x+y^2)\\,dy=y\\,dx\\) for \\(x=x(y)\\) with \\(x(1)=0\\).",
        steps: [
          "\\(\\frac{dx}{dy}-\\frac{x}{y}=y\\); integrating factor \\(\\frac1y\\).",
          "\\(\\frac xy=y+C\\), and \\(x(1)=0\\) gives \\(C=-1\\).",
        ],
        answer: "\\(x=y^2-y\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\frac{dx}{dy}+x=e^{-y}\\) with \\(x(0)=1\\).",
        steps: [
          "\\((xe^y)'=1\\Rightarrow xe^y=y+1\\).",
        ],
        answer: "\\(x=(y+1)e^{-y}\\).",
      },
      practiceSet: [
        { prompt: "Integrating factor of \\(x'+\\frac2yx=y\\)?", answer: "\\(y^2\\)" },
        { prompt: "Is \\((x-y^3)dy+y\\,dx=0\\) linear in \\(x\\)?", answer: "Yes" },
        { prompt: "Integrating factor of \\(x'+\\frac{x}{1+y^2}=0\\)?", answer: "\\(e^{\\tan^{-1}y}\\)" },
        { prompt: "\\(x(y)\\) through \\((2,1)\\): the condition is?", answer: "\\(x=2\\) when \\(y=1\\)" },
      ],
      pyqExampleId: "388d10b6-f0f6-446c-94d1-18010858e22f", // 2022 — (tan^-1 y - x) dy = (1 + y^2) dx through (1, 0)
      traps: [
        {
          title: "Integrate in y throughout",
          body: "Once \\(x\\) is the unknown, every integral is with respect to \\(y\\), including the integrating factor. Writing \\(e^{\\int P\\,dx}\\) out of habit mixes the variables.",
        },
      ],
    },

    // C2 — Bernoulli
    {
      kind: "formula" as const,
      slug: "jde-bernoulli",
      name: "Bernoulli equations",
      intuition:
        "An equation \\(\\frac{dy}{dx}+Py=Qy^n\\) is linear except for the \\(y^n\\). Divide by \\(y^n\\) and put \\(z=y^{1-n}\\): then \\(\\frac{dz}{dx}=(1-n)y^{-n}\\frac{dy}{dx}\\) and the equation becomes linear in \\(z\\). The commonest case is \\(n=2\\), with \\(z=\\frac1y\\).",
      definition:
        "- \\(y'+Py=Qy^n\\): put \\(z=y^{1-n}\\), giving \\(z'+(1-n)Pz=(1-n)Q\\).\n" +
        "- \\(n=2\\): \\(z=\\frac1y\\), \\(z'-Pz=-Q\\).\n" +
        "- \\(n=3\\): \\(z=\\frac1{y^2}\\), \\(z'-2Pz=-2Q\\).\n" +
        "- Shift first if needed: \\(y'=(y+1)(\\dots)\\) suggests \\(Y=y+1\\).",
      formula: {
        label: "Bernoulli substitution",
        latex: "y'+Py=Qy^n,\\ z=y^{1-n}\\ \\Rightarrow\\ z'+(1-n)P\\,z=(1-n)Q",
      },
      authoredExample: {
        prompt: "Solve \\(\\frac{dy}{dx}+\\frac yx=y^2\\) with \\(y(1)=1\\).",
        steps: [
          "\\(z=\\frac1y\\): \\(z'-\\frac zx=-1\\); integrating factor \\(\\frac1x\\).",
          "\\(\\frac zx=-\\ln x+C\\), \\(C=1\\).",
        ],
        answer: "\\(y=\\frac{1}{x(1-\\ln x)}\\).",
      },
      selfCheckExample: {
        prompt: "Which substitution makes \\(y'-y=xy^3\\) linear?",
        steps: [
          "\\(n=3\\), so \\(z=y^{1-3}\\).",
        ],
        answer: "\\(z=\\frac1{y^2}\\).",
      },
      practiceSet: [
        { prompt: "Substitution for \\(y'+y=y^2e^x\\)?", answer: "\\(z=\\frac1y\\)" },
        { prompt: "Substitution for \\(y'+y=\\sqrt y\\)?", answer: "\\(z=\\sqrt y\\)" },
        { prompt: "\\(z=\\frac1y\\): \\(z'\\)?", answer: "\\(-\\frac{y'}{y^2}\\)" },
        { prompt: "Is \\(y'=y^2\\) Bernoulli?", answer: "Yes, and also separable" },
      ],
      pyqExampleId: "c628456e-77be-457a-b3bc-71ff869d54c3", // 2021 — (2xy^2 - y)dx + x dy = 0 through (2, 1)
      traps: [
        {
          title: "The factor 1 - n",
          body: "With \\(z=y^{-1}\\), \\(z'=-y^{-2}y'\\): the minus sign flips both \\(P\\) and \\(Q\\). Forgetting it gives an integrating factor of the wrong sign.",
        },
      ],
    },

    // C3 — substitute a function of y
    {
      kind: "formula" as const,
      slug: "jde-sub-fy",
      name: "Substituting for a function of y",
      intuition:
        "Look for a function of \\(y\\) whose derivative already multiplies \\(\\frac{dy}{dx}\\). In \\(\\sec^2y\\,y'+P\\tan y=Q\\), put \\(u=\\tan y\\): the equation is linear in \\(u\\). The same works for \\(u=\\sin y\\), \\(\\cos y\\), \\(e^{y}\\), \\(e^{-y}\\), \\(e^{\\sin y}\\) or \\(x\\ln x\\) — divide by whatever makes the derivative appear.",
      definition:
        "- \\(u=\\tan y\\): \\(u'=\\sec^2y\\,y'\\); divide by \\(\\cos^2y\\) first.\n" +
        "- \\(u=\\cos y\\): \\(u'=-\\sin y\\,y'\\).\n" +
        "- \\(u=e^{-y}\\): \\(u'=-e^{-y}y'\\).\n" +
        "- \\(u=e^{\\sin y}\\): \\(u'=e^{\\sin y}\\cos y\\,y'\\).",
      formula: {
        label: "Substitution",
        latex: "f'(y)\\,\\frac{dy}{dx}+P(x)\\,f(y)=Q(x),\\ u=f(y)\\ \\Rightarrow\\ \\frac{du}{dx}+Pu=Q",
      },
      authoredExample: {
        prompt: "Solve \\(\\cos y\\,\\frac{dy}{dx}+\\sin y=1\\) with \\(y(0)=0\\).",
        steps: [
          "\\(u=\\sin y\\): \\(u'+u=1\\), so \\(u=1+Ce^{-x}\\), \\(C=-1\\).",
        ],
        answer: "\\(\\sin y=1-e^{-x}\\).",
      },
      selfCheckExample: {
        prompt: "Which substitution makes \\(e^{y}\\,y'+e^{y}=x\\) linear?",
        steps: [
          "\\((e^y)'=e^yy'\\).",
        ],
        answer: "\\(u=e^y\\): \\(u'+u=x\\).",
      },
      practiceSet: [
        { prompt: "Substitution for \\(\\sec^2y\\,y'+x\\tan y=x\\)?", answer: "\\(u=\\tan y\\)" },
        { prompt: "Divide \\(y'+x\\sin2y=x^3\\cos^2y\\) by?", answer: "\\(\\cos^2y\\)" },
        { prompt: "\\(u=\\cos y\\): \\(u'\\)?", answer: "\\(-\\sin y\\,y'\\)" },
        { prompt: "\\(\\sin2y\\) in terms of \\(\\tan y\\) after dividing by \\(\\cos^2y\\)?", answer: "\\(2\\tan y\\)" },
      ],
      pyqExampleId: "65c7bd86-5df9-4ac3-9d5f-eeda97e83542", // 2024 — sec y y' + 2x sin y = x^3 cos y, y(1) = 0
      traps: [
        {
          title: "sin 2y becomes 2 tan y",
          body: "After dividing by \\(\\cos^2y\\), \\(\\sin2y\\) becomes \\(2\\tan y\\), not \\(\\tan y\\). The factor 2 goes straight into the integrating factor.",
        },
      ],
    },
  ],
};
