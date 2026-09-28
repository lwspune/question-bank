import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/motion-in-a-plane";

export const KINEMATICS_NOTE: SubtopicNote = {
  subtopicName: "Kinematics — Equations of Motion, Free Fall, and Graphs",
  title: "Equations of Motion and Motion Graphs",
  oneLineDefinition:
    "Under constant acceleration v = u + at, s = ut + ½at² and v² = u² + 2as; when the acceleration changes, velocity is the slope of the position–time graph, acceleration the slope of the velocity–time graph, and each area under a graph gives the change in the quantity above it.",
  whyItMatters:
    "19 PYQs, none HARD. Ten use the equations of motion — braking distances, free fall from a tower, a ball thrown up from a bridge, the distance in the nth second, average speed. " +
    "Nine read a graph or differentiate a position: speed from x(t) and y(t), when acceleration is zero, distance and displacement from a velocity graph. Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-mp-equations-of-motion",
      name: "The Equations of Motion",
      intuition:
        "Three equations cover constant acceleration; pick the one that leaves out what you are not given. Stopping from speed v at deceleration a takes a distance v²/2a, so n times the speed needs n² times the deceleration for the same distance. A body falling from rest covers distances in the ratio 1 : 3 : 5… in successive seconds, and in the nth second covers a(2n − 1)/2. Starting at the midpoint of two speeds v₁ and v₂, the speed is √((v₁² + v₂²)/2), not their average. Over equal distances at speeds v and v/3 the average speed is the harmonic mean 2v₁v₂/(v₁ + v₂). Check whether a braking vehicle stops before the time asked about.",
      definition:
        "- \\(v = u + at\\), \\(s = ut + \\tfrac{1}{2}at^2\\), \\(v^2 = u^2 + 2as\\); nth second: \\(s_n = u + \\tfrac{a}{2}(2n - 1)\\).\n" +
        "- Stopping distance \\(\\dfrac{v^2}{2a}\\) ⇒ speed × n needs deceleration × n².\n" +
        "- Free fall for t/2 of a fall lasting t: H/4 fallen; for T/4: H/16.\n" +
        "- Midpoint speed: \\(\\sqrt{\\dfrac{v_1^2 + v_2^2}{2}}\\) (20 and 30 ⇒ 25.5 m/s).\n" +
        "- Equal distances: \\(v_{\\text{avg}} = \\dfrac{2v_1v_2}{v_1 + v_2}\\).",
      formula: {
        label: "Equations of motion",
        latex: "v = u + at, \\qquad s = ut + \\tfrac{1}{2}at^2, \\qquad v^2 = u^2 + 2as",
      },
      authoredExample: {
        prompt: "A ball is thrown up at 10 m/s from a 15 m high bridge. When does it hit the water? (g = 10 m/s²)",
        steps: ["Taking up as positive, −15 = 10t − 5t².", "t² − 2t − 3 = 0, so t = 3 s."],
        answer: "3 s",
      },
      selfCheckExample: {
        prompt: "A car at 20 m/s brakes at 5 m/s². Stopping distance?",
        steps: ["v²/2a = 400/10."],
        answer: "40 m",
      },
      practiceSet: [
        { prompt: "Ratio of distance in the nth second to distance in n seconds, from rest?", answer: "2/n − 1/n²" },
        { prompt: "Half the distance at V, half at V/3. Average speed?", answer: "V/2" },
      ],
      pyqExampleId: "add1662a-9d25-408a-a647-187f6b4c9e5b",
      traps: [
        {
          title: "Averaging speeds over equal distances",
          body:
            "Equal DISTANCES take unequal times, so the average speed is the harmonic mean. V and V/3 give V/2, not 2V/3.",
        },
        {
          title: "Running the equations past the stop",
          body:
            "A vehicle braking from 15 m/s at 0.3 m/s² stops at 50 s. After that it stays put; s = ut + ½at² at 60 s would have it reversing.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-mp-graphs-calculus",
      name: "Motion Graphs and Calculus",
      intuition:
        "Velocity is dx/dt and acceleration dv/dt; going the other way, integrate. On an x–t graph a flat line means rest and a straight sloping line uniform velocity; on a v–t graph the slope is acceleration and the area is displacement. Distance counts every area as positive, displacement subtracts the parts below the axis. On an a–t graph the area is the change in velocity. In two dimensions, find vₓ and v_y separately and combine: x = at², y = bt² gives speed 2t√(a² + b²).",
      definition:
        "- \\(v = \\dfrac{dx}{dt}\\), \\(a = \\dfrac{dv}{dt}\\); \\(x = at^2 - bt^3\\) ⇒ a = 0 at \\(t = \\dfrac{a}{3b}\\).\n" +
        "- a varying: integrate twice (\\(a = 6t + 5\\) from rest ⇒ 18 m in 2 s).\n" +
        "- v–t: slope = acceleration, area = displacement; distance adds |areas| (areas 6, −2, 4, −2, 4 ⇒ 10 : 18).\n" +
        "- a–t area = Δv (triangle 8 m/s² × 10 s ⇒ 40 m/s).\n" +
        "- 2-D: \\(v = \\sqrt{v_x^2 + v_y^2}\\).",
      formula: {
        label: "Calculus of motion",
        latex: "v = \\frac{dx}{dt}, \\qquad a = \\frac{dv}{dt}, \\qquad \\Delta x = \\int v\\,dt",
      },
      authoredExample: {
        prompt: "A particle's position is x = t³ − 6t² + 9t. When is it momentarily at rest?",
        steps: ["v = 3t² − 12t + 9 = 3(t − 1)(t − 3).", "v = 0 at t = 1 s and t = 3 s."],
        answer: "t = 1 s and t = 3 s",
      },
      selfCheckExample: {
        prompt: "x = 3t² − t³. When is the acceleration zero?",
        steps: ["a = 6 − 6t."],
        answer: "t = 1 s",
      },
      practiceSet: [
        { prompt: "The acceleration is found from which graph feature?", answer: "The slope of the v–t graph" },
      ],
      pyqExampleId: "ca59be6b-e5a4-4879-a7dd-d41029ed81be",
      traps: [
        {
          title: "Using s = ½at² when a changes with time",
          body:
            "With a = 6t + 5, the equations of motion do not apply. Integrate a to get v, then v to get x.",
        },
      ],
    },
  ],
  related: [
    { label: "Vectors", href: `${BASE}/cetp-mp-vectors` },
    { label: "Relative Motion — two bodies at once", href: `${BASE}/cetp-mp-relative-motion` },
  ],
};
