import type { SubtopicNote } from "@/app/notes/_types";

export const CALCULUS_SL_NOTE: SubtopicNote = {
  subtopicName: "Variable Acceleration: Differentiate and Integrate",
  title: "Variable Acceleration: Differentiate and Integrate",
  oneLineDefinition:
    "When the acceleration is not constant, the equations of motion fail: differentiate a position to get velocity and acceleration, use a = v dv/dx when velocity is given in terms of position, and integrate an acceleration with the starting values to get back velocity and position.",
  whyItMatters:
    "Twenty-three PYQs, six of them asking for a number, and two from 2026. Twelve give the position as a function of time and ask for a velocity, an acceleration or a turning point; seven give the velocity in terms of position; four integrate an acceleration, a velocity or a force. Recognising which of the three is given is most of the work.",
  concepts: [
    // C1 — differentiate x(t)
    {
      kind: "formula" as const,
      slug: "jpsl-differentiate",
      name: "Position as a function of time: differentiate",
      intuition:
        "If x(t) is given, velocity is its derivative and acceleration is the derivative of that. A turning point is where the velocity is zero, because that is where the body reverses. \"Velocity when the acceleration is zero\" means: solve a = 0 for t, then put that t into v. Vectors are handled one component at a time.",
      definition:
        "- \\(v = \\dfrac{dx}{dt}\\), \\(a = \\dfrac{dv}{dt} = \\dfrac{d^{2}x}{dt^{2}}\\).\n" +
        "- Turning point: \\(v = 0\\). Velocity when \\(a = 0\\): solve \\(a = 0\\), substitute in v.\n" +
        "- Distance over an interval with a turning point: add the sizes of the displacements on each side.\n" +
        "- Implicit relations such as \\(x^{2} = c + t^{2}\\): differentiate both sides, \\(xv = t\\), then again, \\(v^{2} + xa = 1\\).\n" +
        "- \\(\\vec r = x(t)\\hat i + y(t)\\hat j\\): \\(\\vec v\\) and \\(\\vec a\\) component by component; force \\(= m\\vec a\\).\n" +
        "- Given t as a function of x: \\(\\dfrac{dx}{dt} = 1 \\big/ \\dfrac{dt}{dx}\\).",
      formula: {
        label: "Differentiate",
        latex: "v = \\frac{dx}{dt} \\qquad a = \\frac{dv}{dt} = \\frac{d^{2}x}{dt^{2}}",
      },
      authoredExample: {
        prompt:
          "\\(x = t^{3} - 9t^{2} + 24t\\) (x in m, t in s). Find when the particle turns, its velocity when the acceleration is zero, and the distance covered in the first 4 s.",
        steps: [
          "\\(v = 3t^{2} - 18t + 24 = 3(t - 2)(t - 4)\\): it turns at \\(t = 2\\ \\text{s}\\) and \\(t = 4\\ \\text{s}\\).",
          "\\(a = 6t - 18 = 0\\) at \\(t = 3\\ \\text{s}\\); there \\(v = 27 - 54 + 24 = -3\\ \\text{m/s}\\).",
          "\\(x(0) = 0\\), \\(x(2) = 8 - 36 + 48 = 20\\ \\text{m}\\), \\(x(4) = 64 - 144 + 96 = 16\\ \\text{m}\\).",
          "Distance \\(= 20 + 4 = 24\\ \\text{m}\\); displacement only 16 m.",
        ],
        answer: "Turns at 2 s and 4 s; \\(-3\\ \\text{m/s}\\); 24 m",
      },
      selfCheckExample: {
        prompt:
          "\\(x = 2t^{3} - 6t^{2} + 10\\) (x in m, t in s). Find the velocity when the acceleration becomes zero.",
        steps: [
          "\\(v = 6t^{2} - 12t\\), \\(a = 12t - 12\\).",
          "\\(a = 0\\) at \\(t = 1\\ \\text{s}\\); \\(v = 6 - 12 = -6\\ \\text{m/s}\\).",
        ],
        answer: "\\(-6\\ \\text{m/s}\\)",
      },
      practiceSet: [
        { prompt: "\\(x = 3t^{2} + 2t\\). Velocity at \\(t = 3\\ \\text{s}\\)?", answer: "\\(20\\ \\text{m/s}\\)" },
        { prompt: "\\(x^{2} = 4 + t^{2}\\). Acceleration in terms of x?", answer: "\\(a = 4/x^{3}\\)", method: "\\(xv = t\\), then \\(v^{2} + xa = 1\\)." },
        { prompt: "\\(\\vec r = 2t^{2}\\hat i + 3t\\hat j\\) m. Acceleration?", answer: "\\(4\\hat i\\ \\text{m/s}^{2}\\)" },
        { prompt: "\\(x = 12t - t^{3}\\). When does the particle turn?", answer: "At \\(t = 2\\ \\text{s}\\)" },
      ],
      pyqExampleId: "67066473-c0fa-448e-992e-3f5de3f20a9c", // 28 Jan 2026 Shift 2: statements about x = 4t³ − 3t
      traps: [
        {
          title: "A turning point is v = 0, not a = 0",
          body: "The body reverses where its velocity changes sign. Where a = 0 the velocity is largest or smallest, which is a different instant.",
        },
        {
          title: "Distance across a turning point",
          body: "If the body turns inside the interval, x(end) − x(start) is only the displacement. Split at the turning point and add the sizes.",
        },
      ],
    },

    // C2 — a = v dv/dx
    {
      kind: "formula" as const,
      slug: "jpsl-v-dv-dx",
      name: "Velocity as a function of position: a = v dv/dx",
      intuition:
        "When v is given in terms of x, the chain rule turns dv/dt into v dv/dx. A velocity that grows as the square root of x gives a constant acceleration, which is why v = k√x keeps appearing: it is uniform acceleration from rest in disguise. When time is given in terms of position, flip it first: v = 1/(dt/dx).",
      definition:
        "- \\(a = \\dfrac{dv}{dt} = v\\dfrac{dv}{dx}\\).\n" +
        "- \\(v = k\\sqrt{x}\\): \\(v^{2} = k^{2}x\\), so \\(a = \\dfrac{k^{2}}{2}\\), constant; force \\(= \\dfrac{mk^{2}}{2}\\).\n" +
        "- \\(v = \\sqrt{c + bx}\\): \\(a = \\dfrac{b}{2}\\).\n" +
        "- \"Velocity grows by k per metre\" means \\(\\dfrac{dv}{dx} = k\\), so \\(a = kv\\).\n" +
        "- \\(t = \\alpha x^{2} + \\beta x\\): \\(v = \\dfrac{1}{2\\alpha x + \\beta}\\) and \\(a = -2\\alpha v^{3}\\).\n" +
        "- A velocity field \\(v_x(x)\\): \\(a_x = v_x\\dfrac{\\partial v_x}{\\partial x}\\), one component at a time.",
      formula: {
        label: "Chain rule",
        latex: "a = v\\frac{dv}{dx} \\qquad v = k\\sqrt{x} \\Rightarrow a = \\frac{k^{2}}{2}",
      },
      authoredExample: {
        prompt:
          "A 2 kg body moves along x with \\(v = 6\\sqrt{x}\\) (v in m/s, x in m). Find its acceleration and the force on it.",
        steps: [
          "\\(\\dfrac{dv}{dx} = \\dfrac{3}{\\sqrt{x}}\\), so \\(a = 6\\sqrt{x} \\times \\dfrac{3}{\\sqrt{x}} = 18\\ \\text{m/s}^{2}\\).",
          "Check: \\(v^{2} = 36x = 2ax\\) gives \\(a = 18\\).",
          "\\(F = ma = 2 \\times 18 = 36\\ \\text{N}\\).",
        ],
        answer: "\\(18\\ \\text{m/s}^{2}\\); 36 N",
      },
      selfCheckExample: {
        prompt:
          "Time and position are related by \\(t = 2x^{2} + x\\) (t in s, x in m). Find the velocity and the acceleration at x = 1 m.",
        steps: [
          "\\(\\dfrac{dt}{dx} = 4x + 1 = 5\\), so \\(v = \\tfrac{1}{5} = 0.2\\ \\text{m/s}\\).",
          "\\(a = v\\dfrac{dv}{dx} = \\dfrac{1}{4x + 1} \\times \\dfrac{-4}{(4x + 1)^{2}} = -\\dfrac{4}{125}\\).",
        ],
        answer: "\\(0.2\\ \\text{m/s}\\); \\(-0.032\\ \\text{m/s}^{2}\\)",
      },
      practiceSet: [
        { prompt: "\\(v = \\sqrt{9 + 16x}\\). Acceleration?", answer: "\\(8\\ \\text{m/s}^{2}\\)" },
        { prompt: "Velocity grows by \\(3\\ \\text{m/s}\\) per metre. Acceleration where \\(v = 10\\ \\text{m/s}\\)?", answer: "\\(30\\ \\text{m/s}^{2}\\)" },
        { prompt: "A 0.5 kg body has \\(v = 8\\sqrt{x}\\). Force on it?", answer: "16 N" },
        { prompt: "\\(\\vec v = 2x\\hat i\\). Acceleration at x = 3 m?", answer: "\\(12\\hat i\\ \\text{m/s}^{2}\\)" },
      ],
      pyqExampleId: "954a44b3-8a18-4bb5-8e99-df12803b03c8", // 31 Jan 2024: t = αx² + βx, a in terms of v
      traps: [
        {
          title: "dv/dx is not the acceleration",
          body: "\"Velocity increases at 5 m/s per metre\" is dv/dx. The acceleration is v times that, so it depends on where the body is.",
        },
        {
          title: "Inverting the derivative but not the function",
          body: "From t(x), v is 1/(dt/dx), not dt/dx. Check the units: dt/dx is in seconds per metre.",
        },
      ],
    },

    // C3 — integrate
    {
      kind: "formula" as const,
      slug: "jpsl-integrate",
      name: "Acceleration or force as a function of time: integrate",
      intuition:
        "Going the other way, integrate the acceleration to get the velocity and integrate again to get the position. Each integration needs a starting value: the initial velocity and the initial position. A force that varies with time does the same job through a = F/m, and its area against time is the change in momentum.",
      definition:
        "- \\(v = u + \\displaystyle\\int_0^{t} a\\,dt\\), \\(x = x_0 + \\displaystyle\\int_0^{t} v\\,dt\\).\n" +
        "- Displacement between \\(t_1\\) and \\(t_2\\): \\(\\displaystyle\\int_{t_1}^{t_2} v\\,dt\\).\n" +
        "- \\(F(t)\\): \\(m\\Delta v = \\displaystyle\\int F\\,dt\\), the area under F–t.\n" +
        "- If v changes sign inside the interval, the integral is the displacement; the distance needs the parts added as sizes.\n" +
        "- Two bodies, one with \\(a \\propto t\\) and one with constant a: their gap is a cubic in t, so they meet at most three times.",
      formula: {
        label: "Integrate with the starting values",
        latex: "v(t) = u + \\int_0^{t} a\\,dt \\qquad x(t) = x_0 + \\int_0^{t} v\\,dt",
      },
      authoredExample: {
        prompt:
          "A particle at x = 0 moving at \\(2\\ \\text{m/s}\\) has acceleration \\(a = 6t\\ \\text{m/s}^{2}\\). Find its velocity and position at \\(t = 2\\ \\text{s}\\).",
        steps: [
          "\\(v = 2 + \\displaystyle\\int_0^{t} 6t\\,dt = 2 + 3t^{2}\\).",
          "\\(x = \\displaystyle\\int_0^{t} (2 + 3t^{2})\\,dt = 2t + t^{3}\\).",
          "At \\(t = 2\\): \\(v = 2 + 12 = 14\\ \\text{m/s}\\), \\(x = 4 + 8 = 12\\ \\text{m}\\).",
        ],
        answer: "\\(14\\ \\text{m/s}\\) and 12 m",
      },
      selfCheckExample: {
        prompt:
          "A force \\(F = 12t\\) N acts on a 3 kg body that starts from rest. Find its speed after 3 s.",
        steps: [
          "\\(a = 4t\\), so \\(v = \\displaystyle\\int_0^{t} 4t\\,dt = 2t^{2}\\).",
          "At \\(t = 3\\): \\(v = 18\\ \\text{m/s}\\). Check: \\(\\displaystyle\\int_0^{3} 12t\\,dt = 54 = 3 \\times 18\\).",
        ],
        answer: "\\(18\\ \\text{m/s}\\)",
      },
      practiceSet: [
        { prompt: "\\(v = 3t^{2} + 2\\), \\(x(0) = 0\\). Position at \\(t = 1\\ \\text{s}\\)?", answer: "3 m" },
        { prompt: "\\(a = 2t\\), starting from rest. Velocity at \\(t = 3\\ \\text{s}\\)?", answer: "\\(9\\ \\text{m/s}\\)" },
        { prompt: "\\(v = 4 - 2t\\) from \\(t = 0\\) to 3 s. Displacement and distance?", answer: "3 m and 5 m", method: "It turns at \\(t = 2\\ \\text{s}\\), at x = 4 m." },
        { prompt: "\\(F = 10 - 2t\\) N acts on 1 kg from rest for 5 s. Final speed?", answer: "\\(25\\ \\text{m/s}\\)" },
      ],
      pyqExampleId: "f7d3c495-7af0-42e6-b465-b7e30d6d8032", // 2021 Paper 15: a = αt + βt², displacement from 1 s to 2 s
      traps: [
        {
          title: "Dropping the starting value",
          body: "An integral fixes the change, not the value. Leaving out the initial velocity or position shifts every answer that follows.",
        },
        {
          title: "Differentiating when you should integrate",
          body: "If v(t) is given and a displacement is asked, integrate v. Differentiating gives the acceleration, which is often among the options.",
        },
      ],
    },
  ],
};
