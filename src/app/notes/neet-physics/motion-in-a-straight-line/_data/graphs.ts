import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_MS_GRAPHS_NOTE: SubtopicNote = {
  subtopicName: "Calculus and Motion Graphs",
  title: "Calculus and Motion Graphs",
  oneLineDefinition:
    "Velocity and acceleration as derivatives of position, a = v dv/dx when velocity is known against position, integrating back from acceleration, and the slopes and areas of position, velocity and acceleration graphs.",
  whyItMatters:
    "Four NEET questions, from 2022 to 2025. Two differentiate: the initial velocity and initial acceleration from a fourth-degree position equation in Re-NEET 2024, and the acceleration from t = x² + x in NEET 2025. Two read graphs: two position-time lines at 30° and 45° in 2022, and the acceleration-time graph that matches a velocity graph that rises, stays flat and falls in 2024.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphms-derivatives",
      name: "Velocity and acceleration from position",
      intuition:
        "Instantaneous velocity is how fast the position is changing at one moment, and acceleration is how fast the velocity is changing. So when the position is given as an equation in time, differentiate once to get the velocity and once more to get the acceleration. Going the other way, from acceleration back to velocity or position, you integrate and add the starting value.",
      definition:
        "- \\(v = \\dfrac{dx}{dt}\\) and \\(a = \\dfrac{dv}{dt} = \\dfrac{d^{2}x}{dt^{2}}\\).\n" +
        "- Power rule: \\(\\dfrac{d}{dt}(t^{n}) = nt^{n-1}\\). A constant term gives zero.\n" +
        "- **Initial** means \\(t = 0\\), put in after differentiating.\n" +
        "- Backwards: \\(v = u + \\displaystyle\\int_{0}^{t} a\\,dt\\) and \\(x = x_0 + \\displaystyle\\int_{0}^{t} v\\,dt\\).\n" +
        "- If x is a quadratic in t, the acceleration is the same at every instant (uniform). A cubic or higher power gives an acceleration that changes with time.\n" +
        "- **Retardation**: the acceleration is opposite to the velocity, so the body slows down.",
      formula: {
        label: "Derivatives of position",
        latex: "v = \\frac{dx}{dt}, \\qquad a = \\frac{dv}{dt} = \\frac{d^{2}x}{dt^{2}}, \\qquad v = u + \\int_{0}^{t} a\\,dt",
        symbols: [
          { symbol: "\\(u\\)", meaning: "velocity at t = 0" },
          { symbol: "\\(x_0\\)", meaning: "position at t = 0" },
        ],
      },
      authoredExample: {
        prompt:
          "A particle moves as \\(x = t^{3} - 6t^{2} + 9t + 2\\) (x in metres, t in seconds). Find its velocity at the instant its acceleration is zero.",
        steps: [
          "\\(v = \\dfrac{dx}{dt} = 3t^{2} - 12t + 9\\).",
          "\\(a = \\dfrac{dv}{dt} = 6t - 12 = 0\\) gives \\(t = 2\\ \\text{s}\\).",
          "\\(v(2) = 12 - 24 + 9 = -3\\ \\text{m/s}\\).",
        ],
        answer: "\\(-3\\ \\text{m/s}\\) (3 m/s in the negative direction)",
      },
      selfCheckExample: {
        prompt:
          "A particle starts from rest at the origin with acceleration \\(a = (6t + 2)\\ \\text{m/s}^{2}\\). Where is it at \\(t = 2\\ \\text{s}\\)?",
        steps: [
          "\\(v = \\displaystyle\\int_{0}^{t} (6t + 2)\\,dt = 3t^{2} + 2t\\), since \\(u = 0\\).",
          "\\(x = \\displaystyle\\int_{0}^{t} (3t^{2} + 2t)\\,dt = t^{3} + t^{2}\\), since \\(x_0 = 0\\).",
          "\\(x(2) = 8 + 4 = 12\\ \\text{m}\\).",
        ],
        answer: "12 m",
      },
      practiceSet: [
        { prompt: "A particle moves as \\(x = 5 + 3t + 2t^{2}\\) (SI units). What is its velocity at \\(t = 2\\ \\text{s}\\)?", answer: "\\(11\\ \\text{m/s}\\)" },
        { prompt: "A particle moves as \\(x = 4t^{3}\\) (SI units). What is its acceleration at \\(t = 1\\ \\text{s}\\)?", answer: "\\(24\\ \\text{m/s}^{2}\\)" },
        { prompt: "A body moves as \\(x = 2t^{2} + 7\\) (SI units). Is its acceleration uniform?", answer: "Yes: \\(4\\ \\text{m/s}^{2}\\) at every instant" },
        { prompt: "A body starts from rest with acceleration \\(a = 3t^{2}\\ \\text{m/s}^{2}\\). What is its velocity at \\(t = 2\\ \\text{s}\\)?", answer: "\\(8\\ \\text{m/s}\\)" },
      ],
      pyqExampleId: "5739bff8-7e95-46a8-92e4-50b4f1a13804",
      traps: [
        {
          title: "Differentiate first, then put in time zero",
          body: "Putting \\(t = 0\\) into the position equation gives the starting position, not the initial velocity. Differentiate first, then put \\(t = 0\\).",
        },
        {
          title: "Zero velocity is not zero acceleration",
          body: "Where a body turns back its velocity is zero, but its acceleration usually is not. Find the turning point from \\(v = 0\\) and the instant of steady velocity from \\(a = 0\\).",
        },
        {
          title: "Add the starting value when you integrate",
          body: "Integrating the acceleration gives the change in velocity. Add the initial velocity u (and the starting position for x), or the answer is right only for a body starting from rest at the origin.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphms-vdvdx",
      name: "Acceleration when velocity is given against position",
      intuition:
        "Sometimes the velocity is known at each position, not at each time. You cannot differentiate it with respect to time directly. The chain rule helps: the change of v with time is the change of v with position times how fast the position changes, which is v itself. So the acceleration is \\(v\\dfrac{dv}{dx}\\).",
      definition:
        "- \\(a = \\dfrac{dv}{dt} = \\dfrac{dv}{dx}\\cdot\\dfrac{dx}{dt} = v\\dfrac{dv}{dx}\\).\n" +
        "- If \\(v^{2}\\) is given in terms of x: \\(a = \\dfrac{1}{2}\\dfrac{d(v^{2})}{dx}\\).\n" +
        "- If time is given in terms of position: \\(v = \\dfrac{dx}{dt} = \\dfrac{1}{dt/dx}\\), then use \\(a = v\\dfrac{dv}{dx}\\).\n" +
        "- A negative a while v is positive means the body is slowing down.",
      formula: {
        label: "Acceleration from velocity against position",
        latex: "a = v\\frac{dv}{dx} = \\frac{1}{2}\\frac{d(v^{2})}{dx}, \\qquad v = \\frac{1}{dt/dx}",
      },
      authoredExample: {
        prompt:
          "The velocity of a particle depends on its position as \\(v = 2\\sqrt{x}\\) (v in m/s, x in m). Find its acceleration.",
        steps: [
          "Square it: \\(v^{2} = 4x\\).",
          "\\(a = \\dfrac{1}{2}\\dfrac{d(v^{2})}{dx} = \\dfrac{1}{2} \\times 4 = 2\\ \\text{m/s}^{2}\\), the same everywhere.",
        ],
        answer: "\\(2\\ \\text{m/s}^{2}\\), uniform",
      },
      selfCheckExample: {
        prompt:
          "A particle moves so that \\(v = 3x + 1\\) (SI units). What is its acceleration when \\(x = 1\\ \\text{m}\\)?",
        steps: [
          "\\(\\dfrac{dv}{dx} = 3\\), and at \\(x = 1\\) the velocity is \\(v = 4\\ \\text{m/s}\\).",
          "\\(a = v\\dfrac{dv}{dx} = 4 \\times 3 = 12\\ \\text{m/s}^{2}\\).",
        ],
        answer: "\\(12\\ \\text{m/s}^{2}\\)",
      },
      practiceSet: [
        { prompt: "A particle moves with \\(v = x^{2}\\) (SI units). What is its acceleration at \\(x = 2\\ \\text{m}\\)?", answer: "\\(16\\ \\text{m/s}^{2}\\)" },
        { prompt: "For a particle, \\(v^{2} = 16 - 4x\\) (SI units). What is its acceleration?", answer: "\\(-2\\ \\text{m/s}^{2}\\), a retardation of \\(2\\ \\text{m/s}^{2}\\)" },
        { prompt: "Write the acceleration of a particle in terms of its velocity v and \\(\\dfrac{dv}{dx}\\).", answer: "\\(a = v\\dfrac{dv}{dx}\\)" },
        { prompt: "A particle moves with \\(v = 4 - x\\) (SI units). What is its acceleration at \\(x = 1\\ \\text{m}\\)?", answer: "\\(-3\\ \\text{m/s}^{2}\\)" },
      ],
      pyqExampleId: "8f6a43cb-e0f5-48dc-877f-409cf30b9850",
      traps: [
        {
          title: "The change of v with x is not the acceleration",
          body: "\\(\\dfrac{dv}{dx}\\) has the unit \\(\\text{s}^{-1}\\), not \\(\\text{m/s}^{2}\\). Multiply it by v to get the acceleration.",
        },
        {
          title: "Invert when time is given against position",
          body: "When time is given in terms of position, differentiating gives \\(\\dfrac{dt}{dx}\\). The velocity is its reciprocal, \\(v = \\dfrac{1}{dt/dx}\\), not \\(\\dfrac{dt}{dx}\\) itself.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphms-graphs",
      name: "Slopes and areas of motion graphs",
      intuition:
        "Every motion graph hides two readings. The slope of a graph tells you the rate of change of what is plotted: the slope of position against time is the velocity, and the slope of velocity against time is the acceleration. The area under a graph adds things up over time: the area under velocity-time is the displacement, and the area under acceleration-time is the change in velocity.",
      definition:
        "- Position-time graph: slope = velocity. A straight line at angle θ to the time axis has \\(v = \\tan\\theta\\) (equal scales on both axes).\n" +
        "- Velocity-time graph: slope = acceleration; area = displacement, with area below the time axis counted negative. For the distance, add all the areas as positive.\n" +
        "- Acceleration-time graph: area = change in velocity.\n" +
        "- **Uniform velocity**: straight sloping position-time line, flat velocity-time line, zero acceleration.\n" +
        "- **Uniform acceleration**: position-time graph a parabola, velocity-time graph a straight sloping line, acceleration-time graph a flat line.\n" +
        "- A velocity-time graph that rises in a straight line, stays flat, then falls in a straight line has an acceleration-time graph of a positive step, then zero, then a negative step.",
      formula: {
        label: "Slopes and areas",
        latex: "v = \\frac{dx}{dt}\\ \\text{(slope)}, \\qquad \\Delta x = \\int v\\,dt\\ \\text{(area)}, \\qquad \\Delta v = \\int a\\,dt\\ \\text{(area)}",
      },
      authoredExample: {
        prompt:
          "A car starts from rest, speeds up uniformly to 20 m/s in 10 s, runs at 20 m/s for 20 s, then stops uniformly in 5 s. Use its velocity-time graph to find the distance covered and the acceleration in each part.",
        steps: [
          "Area of the first triangle: \\(\\tfrac{1}{2} \\times 10 \\times 20 = 100\\ \\text{m}\\). Rectangle: \\(20 \\times 20 = 400\\ \\text{m}\\). Last triangle: \\(\\tfrac{1}{2} \\times 5 \\times 20 = 50\\ \\text{m}\\).",
          "Distance \\(= 100 + 400 + 50 = 550\\ \\text{m}\\).",
          "Slopes: \\(\\dfrac{20}{10} = 2\\ \\text{m/s}^{2}\\), then 0, then \\(-\\dfrac{20}{5} = -4\\ \\text{m/s}^{2}\\).",
        ],
        answer: "550 m; \\(2\\ \\text{m/s}^{2}\\), 0 and \\(-4\\ \\text{m/s}^{2}\\)",
      },
      selfCheckExample: {
        prompt:
          "A particle starts from rest. Its acceleration is \\(4\\ \\text{m/s}^{2}\\) for 3 s and then \\(-2\\ \\text{m/s}^{2}\\) for the next 2 s. What is its velocity at \\(t = 5\\ \\text{s}\\)?",
        steps: [
          "Area under the acceleration-time graph: \\(4 \\times 3 + (-2) \\times 2 = 12 - 4 = 8\\ \\text{m/s}\\).",
          "It started from rest, so \\(v = 0 + 8 = 8\\ \\text{m/s}\\).",
        ],
        answer: "8 m/s",
      },
      practiceSet: [
        { prompt: "What does the slope of a velocity-time graph give?", answer: "The acceleration" },
        { prompt: "What does the area under an acceleration-time graph give?", answer: "The change in velocity" },
        { prompt: "What is the shape of the position-time graph of a body starting from rest with uniform acceleration?", answer: "A parabola" },
        { prompt: "A velocity-time graph is a flat line at 5 m/s from \\(t = 0\\) to \\(t = 4\\ \\text{s}\\). What is the displacement?", answer: "20 m" },
      ],
      pyqExampleId: "23d6a7e9-d09d-4477-bdd6-c2f149a1d444",
      traps: [
        {
          title: "Area gives displacement, not distance",
          body: "Area under the velocity-time graph below the time axis is negative displacement. For the distance, take every area as positive and add.",
        },
        {
          title: "Read the slope, not the height",
          body: "A high point on a position-time graph means the body is far away, not that it is fast. Its velocity is the slope of the graph at that point.",
        },
        {
          title: "A straight sloping velocity line is not uniform velocity",
          body: "A straight sloping velocity-time line means uniform acceleration. Uniform velocity is a flat velocity-time line, or a straight sloping position-time line.",
        },
      ],
    },
  ],
};
