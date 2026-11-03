import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 12 Mathematics (NCERT Part II), Ch. 9 Differential Equations.
 * Definitions and the three methods in NCERT's own wording, trimmed; every
 * solution below was checked by substituting it back; most-asked years and
 * marks from the 141 CBSE board past-paper questions in the bank, 2022-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Differential Equations",
  chapterSlug: "differential-equations",
  source: "NCERT Mathematics Part II (CBSE Class 12), Chapter 9",
  keyPoints: [
    {
      term: "Differential equation",
      text: "An equation involving derivatives of the dependent variable with respect to independent variable (variables) is known as a differential equation.",
    },
    {
      term: "Order",
      text: "Order of a differential equation is the order of the highest order derivative occurring in the differential equation.",
    },
    {
      term: "Degree",
      text: "Degree is defined only if the equation is a polynomial equation in its derivatives. Degree (when defined) is the highest power (positive integer only) of the highest order derivative in it. With \\(\\sin(y')\\), \\(e^{y'}\\) or \\(\\log(y'')\\) it is not defined.",
    },
    {
      term: "Order and degree are positive integers",
      text: "Order and degree (if defined) of a differential equation are always positive integers.",
    },
    {
      term: "General and particular solution",
      text: "A function which satisfies the equation is its solution. The solution which contains as many arbitrary constants as the order is the **general solution**; one free from arbitrary constants is a **particular solution**.",
    },
    {
      term: "Variables separable",
      text: "Used when the variables can be separated completely, i.e. terms containing \\(y\\) remain with \\(dy\\) and terms containing \\(x\\) remain with \\(dx\\): \\(\\int h(y)\\,dy = \\int g(x)\\,dx + C\\).",
    },
    {
      term: "Homogeneous function",
      text: "A function \\(F(x, y)\\) is said to be homogeneous function of degree \\(n\\) if \\(F(\\lambda x, \\lambda y) = \\lambda^n F(x, y)\\) for any nonzero constant \\(\\lambda\\). Equivalently \\(F(x, y) = x^n g\\left(\\frac{y}{x}\\right)\\).",
    },
    {
      term: "Homogeneous differential equation",
      text: "\\(\\frac{dy}{dx} = F(x, y)\\) is homogeneous if \\(F(x, y)\\) is a homogeneous function of degree zero. To solve, make the substitution \\(y = vx\\), separate the variables, integrate, then replace \\(v\\) by \\(\\frac{y}{x}\\).",
    },
    {
      term: "The form dx/dy = F(x, y)",
      text: "If the homogeneous equation is in the form \\(\\frac{dx}{dy} = F(x, y)\\), with \\(F\\) homogeneous of degree zero, make the substitution \\(x = vy\\) and proceed in the same way.",
    },
    {
      term: "Linear differential equation",
      text: "A differential equation of the form \\(\\frac{dy}{dx} + Py = Q\\), where \\(P\\) and \\(Q\\) are constants or functions of \\(x\\) only, is called a first order linear differential equation.",
    },
    {
      term: "Integrating factor",
      text: "Multiplying by \\(g(x) = e^{\\int P\\,dx}\\) makes the L.H.S. the derivative of \\(y\\,g(x)\\). This function is called the Integrating Factor (I.F.). Then \\(y\\,(\\text{I.F.}) = \\int (Q \\times \\text{I.F.})\\,dx + C\\).",
    },
    {
      term: "Linear in x",
      text: "For \\(\\frac{dx}{dy} + P_1 x = Q_1\\), where \\(P_1\\) and \\(Q_1\\) are constants or functions of \\(y\\) only, I.F. \\(= e^{\\int P_1\\,dy}\\) and \\(x\\,(\\text{I.F.}) = \\int (Q_1 \\times \\text{I.F.})\\,dy + C\\).",
    },
    {
      term: "Growth and decay",
      text: "When a rate of growth is proportional to the amount present, \\(\\frac{dN}{dt} = kN\\). Separating, \\(N = N_0 e^{kt}\\); use the two given values to find \\(N_0\\) and \\(k\\).",
    },
  ],
  formulas: [
    { label: "Variables separable", latex: "\\frac{dy}{dx} = g(x)\\,h(y) \\;\\Rightarrow\\; \\int \\frac{dy}{h(y)} = \\int g(x)\\,dx + C" },
    { label: "Homogeneous function of degree n", latex: "F(\\lambda x, \\lambda y) = \\lambda^n F(x, y)" },
    { label: "Substitution for a homogeneous equation", latex: "y = vx: \\; \\frac{dy}{dx} = v + x\\frac{dv}{dx} \\qquad x = vy: \\; \\frac{dx}{dy} = v + y\\frac{dv}{dy}" },
    { label: "Linear in y", latex: "\\frac{dy}{dx} + Py = Q: \\quad \\text{I.F.} = e^{\\int P\\,dx}, \\quad y\\,(\\text{I.F.}) = \\int Q\\,(\\text{I.F.})\\,dx + C" },
    { label: "Linear in x", latex: "\\frac{dx}{dy} + P_1 x = Q_1: \\quad \\text{I.F.} = e^{\\int P_1\\,dy}, \\quad x\\,(\\text{I.F.}) = \\int Q_1\\,(\\text{I.F.})\\,dy + C" },
    { label: "Exponential of a log", latex: "e^{\\log f(x)} = f(x) \\qquad e^{k\\log x} = x^k \\qquad e^{-\\log x} = \\frac{1}{x}" },
    { label: "Growth or decay", latex: "\\frac{dN}{dt} = kN \\;\\Rightarrow\\; N = N_0\\,e^{kt}" },
  ],
  derivations: [
    {
      title: "Show that \\((x^2 - y^2)\\,dx + 2xy\\,dy = 0\\) is homogeneous and solve it",
      steps: [
        "\\(\\frac{dy}{dx} = \\frac{y^2 - x^2}{2xy} = F(x, y)\\), and \\(F(\\lambda x, \\lambda y) = \\lambda^0 F(x, y)\\): homogeneous of degree zero.",
        "Put \\(y = vx\\): \\(v + x\\frac{dv}{dx} = \\frac{v^2 - 1}{2v}\\), so \\(x\\frac{dv}{dx} = -\\frac{1 + v^2}{2v}\\).",
        "Separate: \\(\\frac{2v\\,dv}{1 + v^2} = -\\frac{dx}{x}\\), so \\(\\log(1 + v^2) = -\\log|x| + \\log C\\), i.e. \\(x(1 + v^2) = C\\).",
        "Put \\(v = \\frac{y}{x}\\): \\(x^2 + y^2 = Cx\\).",
      ],
    },
    {
      title: "Solve \\(x\\frac{dy}{dx} = y - x\\sin^2\\left(\\frac{y}{x}\\right)\\), given \\(y(1) = \\frac{\\pi}{6}\\)",
      steps: [
        "Put \\(y = vx\\): \\(v + x\\frac{dv}{dx} = v - \\sin^2 v\\), so \\(\\operatorname{cosec}^2 v\\,dv = -\\frac{dx}{x}\\).",
        "Integrate: \\(-\\cot v = -\\log|x| - C\\), i.e. \\(\\cot\\frac{y}{x} = \\log|x| + C\\).",
        "At \\(x = 1\\), \\(y = \\frac{\\pi}{6}\\): \\(\\cot\\frac{\\pi}{6} = \\sqrt{3} = C\\). So \\(\\cot\\frac{y}{x} = \\log|x| + \\sqrt{3}\\).",
      ],
    },
    {
      title: "Solve \\((1 + x^2)\\frac{dy}{dx} + 2xy = 4x^2\\), given \\(y(0) = 0\\)",
      steps: [
        "Divide by \\(1 + x^2\\): \\(\\frac{dy}{dx} + \\frac{2x}{1 + x^2}y = \\frac{4x^2}{1 + x^2}\\). I.F. \\(= e^{\\int \\frac{2x}{1 + x^2}dx} = 1 + x^2\\).",
        "\\(y(1 + x^2) = \\int 4x^2\\,dx = \\frac{4x^3}{3} + C\\).",
        "\\(y(0) = 0\\) gives \\(C = 0\\): \\(y = \\frac{4x^3}{3(1 + x^2)}\\).",
      ],
    },
    {
      title: "Find the particular solution of \\(\\frac{dy}{dx} - 3y\\cot x = \\sin 2x\\), given \\(y = 2\\) when \\(x = \\frac{\\pi}{2}\\)",
      steps: [
        "\\(P = -3\\cot x\\): I.F. \\(= e^{-3\\log\\sin x} = \\frac{1}{\\sin^3 x}\\).",
        "\\(\\frac{y}{\\sin^3 x} = \\int \\frac{2\\sin x\\cos x}{\\sin^3 x}\\,dx = \\int 2\\cos x\\,(\\sin x)^{-2}\\,dx = -\\frac{2}{\\sin x} + C\\).",
        "\\(y = -2\\sin^2 x + C\\sin^3 x\\). At \\(x = \\frac{\\pi}{2}\\): \\(2 = -2 + C\\), \\(C = 4\\). So \\(y = 4\\sin^3 x - 2\\sin^2 x\\).",
      ],
    },
    {
      title: "Find the general solution of \\(y\\,dx - (x + 2y^2)\\,dy = 0\\)",
      steps: [
        "Write it as linear in \\(x\\): \\(\\frac{dx}{dy} - \\frac{1}{y}x = 2y\\).",
        "I.F. \\(= e^{-\\int \\frac{1}{y}dy} = e^{-\\log y} = \\frac{1}{y}\\).",
        "\\(\\frac{x}{y} = \\int 2y\\cdot\\frac{1}{y}\\,dy = 2y + C\\), so \\(x = 2y^2 + Cy\\).",
      ],
    },
    {
      title: "Solve \\((\\tan^{-1}y - x)\\,dy = (1 + y^2)\\,dx\\)",
      steps: [
        "\\(\\frac{dx}{dy} + \\frac{x}{1 + y^2} = \\frac{\\tan^{-1}y}{1 + y^2}\\): linear in \\(x\\), I.F. \\(= e^{\\tan^{-1}y}\\).",
        "\\(x\\,e^{\\tan^{-1}y} = \\int \\frac{\\tan^{-1}y}{1 + y^2}e^{\\tan^{-1}y}\\,dy\\). Put \\(\\tan^{-1}y = t\\): \\(\\int t e^t\\,dt = (t - 1)e^t + C\\).",
        "\\(x = \\tan^{-1}y - 1 + C e^{-\\tan^{-1}y}\\).",
      ],
    },
    {
      title: "Find the particular solution of \\((1 + e^{2x})\\,dy + (1 + y^2)e^x\\,dx = 0\\), given \\(y(1) = 0\\)",
      steps: [
        "Separate: \\(\\frac{dy}{1 + y^2} = -\\frac{e^x\\,dx}{1 + e^{2x}}\\).",
        "Integrate (put \\(e^x = t\\) on the right): \\(\\tan^{-1}y = -\\tan^{-1}e^x + C\\).",
        "\\(y(1) = 0\\) gives \\(C = \\tan^{-1}e\\): \\(\\tan^{-1}y + \\tan^{-1}e^x = \\tan^{-1}e\\).",
      ],
    },
    {
      title: "Bacteria grow at a rate proportional to the number present: 1000 at \\(t = 0\\), 2000 at \\(t = 1\\). Find \\(k\\) and \\(N(t)\\)",
      steps: [
        "\\(\\frac{dN}{dt} = kN\\): \\(\\int \\frac{dN}{N} = \\int k\\,dt\\), so \\(\\log N = kt + C\\) and \\(N = N_0 e^{kt}\\).",
        "\\(t = 0\\): \\(N_0 = 1000\\). \\(t = 1\\): \\(2000 = 1000e^k\\), so \\(k = \\log 2\\).",
        "\\(N = 1000\\,e^{t\\log 2} = 1000 \\cdot 2^t\\).",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    { topic: "Solve a homogeneous differential equation (\\(y = vx\\)), general or particular solution", marks: 3, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Order and degree (sum or product), including degree not defined", marks: 1, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Variables separable: general solution, or a particular solution from a given value", marks: 1, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Solve a linear differential equation, in \\(y\\) or in \\(x\\) (\\(y\\,dx = (x + 2y^2)\\,dy\\))", marks: 3, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Find the integrating factor, or say whether an equation is linear", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Case study: growth or decay (bacteria, cooling, a dissolving sphere), find \\(k\\) and the solution", marks: 2, years: [2025, 2024, 2023] },
    { topic: "Number of arbitrary constants, or of solutions, with a given condition", marks: 1, years: [2024, 2023] },
  ],
  mistakes: [
    {
      title: "Reading the degree off an unexpanded derivative",
      body: "\\(\\frac{d}{dx}\\left(\\frac{dy}{dx}\\right)^3 = 0\\) is \\(3\\left(\\frac{dy}{dx}\\right)^2\\frac{d^2y}{dx^2} = 0\\): order 2, degree 1. If any derivative sits inside \\(\\sin\\), \\(\\log\\) or \\(e^{(\\,)}\\), the degree is not defined.",
    },
    {
      title: "Finding P before making the coefficient of dy/dx 1",
      body: "\\(2x\\frac{dy}{dx} - y = 3\\) becomes \\(\\frac{dy}{dx} - \\frac{1}{2x}y = \\frac{3}{2x}\\), so I.F. \\(= e^{-\\frac{1}{2}\\log x} = \\frac{1}{\\sqrt{x}}\\), not \\(e^{-x}\\).",
    },
    {
      title: "Treating \\(y\\,dx = (x + 2y^2)\\,dy\\) as linear in \\(y\\)",
      body: "It is not linear in \\(y\\) (a \\(y^2\\) term), but it is linear in \\(x\\): write \\(\\frac{dx}{dy} + P_1 x = Q_1\\) and integrate with respect to \\(y\\).",
    },
    {
      title: "Leaving v in the answer",
      body: "After \\(y = vx\\), replace \\(v\\) by \\(\\frac{y}{x}\\) at the end; after \\(x = vy\\), by \\(\\frac{x}{y}\\).",
    },
    {
      title: "Stopping at the general solution",
      body: "When a condition such as \\(y(1) = 0\\) is given, find \\(C\\) and write the particular solution. A general solution of a first order equation has exactly one arbitrary constant.",
    },
  ],
};

export default sheet;
