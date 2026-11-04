import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Mathematics (Part II), Ch. 6 Differential Equations. Definitions
 * are the Balbharati text's own, trimmed; every solution re-checked by
 * differentiating it back; most-asked years from the 41 board past-paper
 * questions in the bank, 2015-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Differential Equations",
  chapterSlug: "differential-equations",
  source: "Balbharati Mathematics and Statistics Part II Std XII (Maharashtra State Board), Chapter 6",
  keyPoints: [
    {
      term: "Differential equation",
      text: "An equation which contains the derivative of a function is called a differential equation.",
    },
    {
      term: "Order",
      text: "The order of a differential equation is the highest order of the derivative appearing in the equation.",
    },
    {
      term: "Degree",
      text: "The degree is the power of the highest ordered derivative present in the equation. To find it, each derivative must have a positive integer index: clear roots and fractional powers first.",
    },
    {
      term: "Degree not defined",
      text: "If the equation cannot be expressed as a polynomial in the derivatives (as \\(e^{dy/dx} + \\frac{dy}{dx} = x\\)), the degree is not defined; its order is still 1. Order and degree, when defined, are always positive integers.",
    },
    {
      term: "Formation of a differential equation",
      text: "Sometimes we need to eliminate the arbitrary constants from a given relation. It may be done by differentiation: differentiate as many times as there are constants, then eliminate them.",
    },
    {
      term: "General solution",
      text: "A solution in which the number of arbitrary constants is equal to the order of the differential equation is the general solution.",
    },
    {
      term: "Particular solution",
      text: "A solution obtained from the general solution by giving particular values to the arbitrary constants (from the given conditions) is the particular solution.",
    },
    {
      term: "Separation of variables",
      text: "If the equation can be written as \\(f(x)\\,dx = g(y)\\,dy\\), integrate both sides. The above method is known as the method of separation of variables.",
    },
    {
      term: "Reducible to separable form",
      text: "When \\(x\\) and \\(y\\) appear only as \\(ax + by + c\\) (or as \\(x^2 + y^2\\)), put that expression equal to \\(u\\); the equation then separates in \\(u\\) and \\(x\\).",
    },
    {
      term: "Homogeneous differential equation",
      text: "If all terms have the same degree, the equation is called a homogeneous differential equation. To solve it, use the substitution \\(y = vx\\) (or \\(x = vy\\)).",
    },
    {
      term: "Linear differential equation",
      text: "The equation \\(\\frac{dy}{dx} + Py = Q\\), where \\(P, Q\\) are functions of \\(x\\) (or constants), is called a linear differential equation; \\(e^{\\int P\\,dx}\\) is its integrating factor (I.F.).",
    },
    {
      term: "Linear in x",
      text: "For \\(\\frac{dx}{dy} + Px = Q\\), where \\(P, Q\\) are constants or functions of \\(y\\), the I.F. is \\(e^{\\int P\\,dy}\\) and the solution is \\(x(\\text{I.F.}) = \\int Q(\\text{I.F.})\\,dy + c\\).",
    },
    {
      term: "Growth and decay",
      text: "In growth (population, bacteria) the rate of change is proportional to the amount present: \\(\\frac{dP}{dt} = kP\\), \\(k > 0\\). In radioactive decay the rate of disintegration is proportional to the amount present, with a negative sign.",
    },
    {
      term: "Newton's law of cooling",
      text: "The rate of change of temperature of a cooling body is proportional to the difference between the temperature of the body and that of its surrounding medium.",
    },
  ],
  formulas: [
    {
      label: "Variables separable",
      latex: "f(x)\\,dx = g(y)\\,dy \\;\\Rightarrow\\; \\int f(x)\\,dx = \\int g(y)\\,dy + c",
    },
    {
      label: "Homogeneous: put y = vx",
      latex: "y = vx, \\quad \\frac{dy}{dx} = v + x\\frac{dv}{dx}",
    },
    {
      label: "Homogeneous: put x = vy",
      latex: "x = vy, \\quad \\frac{dx}{dy} = v + y\\frac{dv}{dy}",
    },
    {
      label: "Reducible form",
      latex: "\\frac{dy}{dx} = f(ax + by + c): \\ u = ax + by + c, \\ \\frac{du}{dx} = a + b\\frac{dy}{dx}",
    },
    {
      label: "Linear in y",
      latex: "\\frac{dy}{dx} + Py = Q: \\quad \\text{I.F.} = e^{\\int P\\,dx}, \\quad y(\\text{I.F.}) = \\int Q(\\text{I.F.})\\,dx + c",
    },
    {
      label: "Linear in x",
      latex: "\\frac{dx}{dy} + Px = Q: \\quad \\text{I.F.} = e^{\\int P\\,dy}, \\quad x(\\text{I.F.}) = \\int Q(\\text{I.F.})\\,dy + c",
    },
    {
      label: "Integrating factors met most often",
      latex: "P = \\tfrac{1}{x}: x \\quad P = \\tfrac{n}{x}: x^n \\quad P = \\tan x: \\sec x \\quad P = \\cot x: \\sin x \\quad P = \\sec x: \\sec x + \\tan x",
    },
    {
      label: "Growth",
      latex: "\\frac{dP}{dt} = kP \\;\\Rightarrow\\; P = c\\,e^{kt}, \\quad k > 0",
    },
    {
      label: "Radioactive decay",
      latex: "\\frac{dx}{dt} = -kx \\;\\Rightarrow\\; x = a\\,e^{-kt}, \\quad k > 0",
      symbols: [{ symbol: "a", meaning: "the amount at t = 0" }],
    },
    {
      label: "Half life",
      latex: "\\frac{a}{2} = a\\,e^{-kT} \\;\\Rightarrow\\; T = \\frac{\\log 2}{k}",
    },
    {
      label: "Newton's law of cooling",
      latex: "\\frac{d\\theta}{dt} = -k(\\theta - \\theta_0) \\;\\Rightarrow\\; \\theta = \\theta_0 + (\\theta_1 - \\theta_0)\\,e^{-kt}",
      symbols: [
        { symbol: "\\(\\theta_0\\)", meaning: "temperature of the surroundings" },
        { symbol: "\\(\\theta_1\\)", meaning: "temperature of the body at t = 0" },
      ],
    },
    {
      label: "Motion: acceleration proportional to velocity",
      latex: "\\frac{d^2s}{dt^2} = k\\,\\frac{ds}{dt}",
    },
    {
      label: "Eliminating A and B from exponentials",
      latex: "y = Ae^{mx} + Be^{-mx} \\;\\Rightarrow\\; \\frac{d^2y}{dx^2} = m^2y",
    },
    {
      label: "Eliminating constants with log x",
      latex: "y = c_1\\cos(\\log x) + c_2\\sin(\\log x) \\;\\Rightarrow\\; x^2\\frac{d^2y}{dx^2} + x\\frac{dy}{dx} + y = 0",
    },
  ],
  derivations: [
    {
      title: "Solve the linear equation \\(\\frac{dy}{dx} + \\frac{y}{x} = x^3 - 3\\)",
      steps: [
        "\\(P = \\frac{1}{x}\\), \\(Q = x^3 - 3\\). I.F. \\(= e^{\\int \\frac{1}{x}dx} = e^{\\log x} = x\\).",
        "\\(y \\cdot x = \\int (x^3 - 3)x\\,dx + c = \\int (x^4 - 3x)\\,dx + c\\).",
        "\\(xy = \\frac{x^5}{5} - \\frac{3x^2}{2} + c\\) is the general solution.",
      ],
    },
    {
      title: "Solve \\(dr + (2r\\cot\\theta + \\sin 2\\theta)\\,d\\theta = 0\\)",
      steps: [
        "Write it as \\(\\frac{dr}{d\\theta} + (2\\cot\\theta)r = -\\sin 2\\theta\\): linear in \\(r\\).",
        "I.F. \\(= e^{\\int 2\\cot\\theta\\,d\\theta} = e^{2\\log\\sin\\theta} = \\sin^2\\theta\\).",
        "\\(r\\sin^2\\theta = -\\int 2\\sin^3\\theta\\cos\\theta\\,d\\theta = -\\frac{\\sin^4\\theta}{2} + c\\).",
      ],
    },
    {
      title: "Solve the homogeneous equation \\(x^2\\frac{dy}{dx} = x^2 + xy + y^2\\)",
      steps: [
        "\\(\\frac{dy}{dx} = 1 + \\frac{y}{x} + \\frac{y^2}{x^2}\\). Put \\(y = vx\\): \\(v + x\\frac{dv}{dx} = 1 + v + v^2\\).",
        "Separate: \\(\\frac{dv}{1 + v^2} = \\frac{dx}{x}\\), so \\(\\tan^{-1}v = \\log x + c\\).",
        "Replace \\(v\\): \\(\\tan^{-1}\\left(\\frac{y}{x}\\right) = \\log x + c\\).",
      ],
    },
    {
      title: "Solve \\((x^2 + y^2)\\,dx - 2xy\\,dy = 0\\)",
      steps: [
        "\\(\\frac{dy}{dx} = \\frac{x^2 + y^2}{2xy}\\), homogeneous. Put \\(y = vx\\): \\(x\\frac{dv}{dx} = \\frac{1 + v^2}{2v} - v = \\frac{1 - v^2}{2v}\\).",
        "\\(\\frac{2v}{1 - v^2}dv = \\frac{dx}{x}\\), so \\(-\\log(1 - v^2) = \\log x + \\log c\\), giving \\(x(1 - v^2) = c\\).",
        "With \\(v = \\frac{y}{x}\\): \\(x^2 - y^2 = cx\\).",
      ],
    },
    {
      title: "Find the particular solution of \\(\\frac{dy}{dx} = e^{2y}\\cos x\\) when \\(x = \\frac{\\pi}{6}\\), \\(y = 0\\)",
      steps: [
        "Separate: \\(e^{-2y}\\,dy = \\cos x\\,dx\\), so \\(-\\frac{1}{2}e^{-2y} = \\sin x + c\\).",
        "At \\(x = \\frac{\\pi}{6}\\), \\(y = 0\\): \\(-\\frac{1}{2} = \\frac{1}{2} + c\\), so \\(c = -1\\).",
        "Particular solution: \\(2\\sin x + e^{-2y} = 2\\), that is \\(e^{2y}(2\\sin x - 2) + 1 = 0\\).",
      ],
    },
    {
      title: "Solve \\(3e^x\\tan y\\,dx + (1 + e^x)\\sec^2 y\\,dy = 0\\)",
      steps: [
        "Divide by \\((1 + e^x)\\tan y\\): \\(\\frac{3e^x}{1 + e^x}dx + \\frac{\\sec^2 y}{\\tan y}dy = 0\\).",
        "Integrate: \\(3\\log(1 + e^x) + \\log\\tan y = \\log c\\).",
        "General solution: \\((1 + e^x)^3\\tan y = c\\).",
      ],
    },
    {
      title: "Solve \\(1 + \\frac{dy}{dx} = \\csc(x + y)\\) by putting \\(x + y = u\\)",
      steps: [
        "\\(x + y = u\\) gives \\(1 + \\frac{dy}{dx} = \\frac{du}{dx}\\), so \\(\\frac{du}{dx} = \\csc u\\).",
        "Separate: \\(\\sin u\\,du = dx\\), so \\(-\\cos u = x + c\\).",
        "General solution: \\(x + \\cos(x + y) + c = 0\\).",
      ],
    },
    {
      title: "Obtain the differential equation by eliminating \\(A\\) and \\(B\\) from \\(y = Ae^{5x} + Be^{-5x}\\)",
      steps: [
        "Two constants, so differentiate twice: \\(\\frac{dy}{dx} = 5Ae^{5x} - 5Be^{-5x}\\).",
        "\\(\\frac{d^2y}{dx^2} = 25Ae^{5x} + 25Be^{-5x} = 25y\\).",
        "Required equation: \\(\\frac{d^2y}{dx^2} = 25y\\) (order 2, matching the two constants).",
      ],
    },
    {
      title: "Obtain the differential equation by eliminating \\(c_1, c_2\\) from \\(y = c_1\\cos(\\log x) + c_2\\sin(\\log x)\\)",
      steps: [
        "Differentiate: \\(\\frac{dy}{dx} = \\frac{1}{x}[-c_1\\sin(\\log x) + c_2\\cos(\\log x)]\\), so \\(x\\frac{dy}{dx} = -c_1\\sin(\\log x) + c_2\\cos(\\log x)\\).",
        "Differentiate again: \\(x\\frac{d^2y}{dx^2} + \\frac{dy}{dx} = -\\frac{1}{x}[c_1\\cos(\\log x) + c_2\\sin(\\log x)] = -\\frac{y}{x}\\).",
        "Required equation: \\(x^2\\frac{d^2y}{dx^2} + x\\frac{dy}{dx} + y = 0\\).",
      ],
    },
    {
      title: "A body cools from 100°C to 60°C in 20 minutes; surroundings 20°C. When will it be 40°C?",
      steps: [
        "Newton's law: \\(\\frac{d\\theta}{dt} = -k(\\theta - 20)\\), so \\(\\theta = 20 + 80e^{-kt}\\) (\\(\\theta = 100\\) at \\(t = 0\\)).",
        "At \\(t = 20\\), \\(60 = 20 + 80e^{-20k}\\), so \\(e^{-20k} = \\frac{1}{2}\\).",
        "For \\(\\theta = 40\\): \\(e^{-kt} = \\frac{1}{4} = \\left(e^{-20k}\\right)^2\\), so \\(t = 40\\) minutes.",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    {
      topic: "Variables separable: general solution, or a particular solution from given values",
      years: [2026, 2025, 2024, 2023, 2022, 2020, 2018],
    },
    {
      topic: "Form the differential equation by eliminating arbitrary constants (or from a description, as a particle's motion)",
      years: [2025, 2024, 2022, 2019, 2018, 2017, 2015],
    },
    {
      topic: "Order or degree of a differential equation",
      years: [2026, 2025, 2023, 2022, 2020],
    },
    {
      topic: "Linear differential equation: the integrating factor, or the solution",
      years: [2025, 2024, 2020, 2019],
    },
    {
      topic: "Homogeneous differential equation: solve with \\(y = vx\\)",
      years: [2026, 2025, 2024, 2015],
    },
    {
      topic: "Reduce to separable form by a substitution: \\(x + y = u\\) or \\(x^2 + y^2 = u\\)",
      years: [2024, 2022, 2019, 2016],
    },
    {
      topic: "Newton's law of cooling: find a temperature or a time",
      years: [2026, 2025],
    },
  ],
  mistakes: [
    {
      title: "Reading the degree before clearing the powers",
      body: "In \\(\\sqrt{1 + \\left(\\frac{dy}{dx}\\right)^2} = \\left(\\frac{d^2y}{dx^2}\\right)^{3/2}\\), square first: \\(1 + \\left(\\frac{dy}{dx}\\right)^2 = \\left(\\frac{d^2y}{dx^2}\\right)^3\\). Order 2, degree 3, not \\(\\frac{3}{2}\\).",
    },
    {
      title: "Giving a degree when none exists",
      body: "\\(e^{dy/dx} + \\frac{dy}{dx} = x\\) is not a polynomial in \\(\\frac{dy}{dx}\\): its order is 1 and its degree is not defined.",
    },
    {
      title: "Taking the I.F. before the standard form",
      body: "\\(x\\frac{dy}{dx} + 2y = x^2\\log x\\): divide by \\(x\\) first, so \\(P = \\frac{2}{x}\\) and I.F. \\(= x^2\\), not \\(e^{2x}\\).",
    },
    {
      title: "Leaving \\(v\\) in the answer",
      body: "After solving a homogeneous equation with \\(y = vx\\), replace \\(v\\) by \\(\\frac{y}{x}\\). The answer must be in \\(x\\) and \\(y\\).",
    },
    {
      title: "Stopping at the general solution",
      body: "A particular solution needs \\(c\\) found from the given values and put back: write the final equation without \\(c\\).",
    },
    {
      title: "Dropping the surroundings in Newton's law",
      body: "The rate is proportional to \\(\\theta - \\theta_0\\), not \\(\\theta\\). For 80°C to 50°C in 30 min at 25°C: \\(e^{-30k} = \\frac{5}{11}\\), and after 1 hour \\(\\theta = 25 + 55\\left(\\frac{5}{11}\\right)^2 \\approx 36.4\\)°C.",
    },
  ],
};

export default sheet;
