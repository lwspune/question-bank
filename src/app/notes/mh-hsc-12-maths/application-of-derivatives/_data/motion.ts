import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_AD_MOTION_NOTE: SubtopicNote = {
  subtopicName: "Velocity, Acceleration and Jerk",
  title: "Velocity, Acceleration and Jerk",
  oneLineDefinition:
    "For a particle moving on a line with displacement s at time t, velocity is ds/dt, acceleration is the second derivative and jerk is the third.",
  whyItMatters:
    "7 questions, five of them from board papers, four of those from 2024 to 2026: the acceleration when the velocity is zero (2016), the time when the acceleration has a given value (2024), the acceleration at an instant (an MCQ in 2025), the velocity and displacement when the acceleration is given (2025) and the velocity at time t (2026). The textbook rows are the two solved examples of section 2.1.4.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmad-velocity",
      name: "Velocity as the rate of change of displacement",
      intuition:
        "Velocity tells you how fast the displacement is changing at one instant, so it is the derivative of s with respect to t. Speed is the size of the velocity without its sign, and a particle is at rest at the instants when its velocity is zero.",
      definition:
        "- If \\(s = f(t)\\) is the displacement of a particle moving on a straight line, its velocity is \\(v = \\dfrac{ds}{dt} = f'(t)\\).\n" +
        "- Speed is the absolute value of the velocity, \\(|v|\\).\n" +
        "- The particle is at rest when \\(v = 0\\).",
      formula: {
        label: "Velocity",
        latex: "v = \\frac{ds}{dt}",
        symbols: [
          { symbol: "\\(s\\)", meaning: "displacement at time t" },
          { symbol: "\\(v\\)", meaning: "velocity at time t" },
        ],
      },
      authoredExample: {
        prompt: "The displacement of a particle at time \\(t\\) seconds is \\(s = t^3 - 6t^2 + 9t\\) metres. Find its velocity at \\(t = 4\\) and the times when it is at rest.",
        steps: [
          "Given: \\(s = t^3 - 6t^2 + 9t\\).",
          "Velocity: \\(v = \\dfrac{ds}{dt} = 3t^2 - 12t + 9\\).",
          "At \\(t = 4\\): \\(v = 3(16) - 12(4) + 9 = 48 - 48 + 9 = 9\\) m/sec.",
          "At rest: \\(3t^2 - 12t + 9 = 0\\), so \\(t^2 - 4t + 3 = 0\\) and \\((t - 1)(t - 3) = 0\\).",
        ],
        answer: "Velocity 9 m/sec at \\(t = 4\\); at rest at \\(t = 1\\) sec and \\(t = 3\\) sec",
      },
      selfCheckExample: {
        prompt: "A particle has velocity \\(v = 4 - 2t\\) m/sec. When is it at rest, and what is its speed at \\(t = 3\\)?",
        steps: ["At rest: \\(4 - 2t = 0\\), so \\(t = 2\\).", "At \\(t = 3\\): \\(v = -2\\), so the speed is \\(|-2| = 2\\) m/sec."],
        answer: "At rest at \\(t = 2\\) sec; speed 2 m/sec at \\(t = 3\\)",
      },
      practiceSet: [
        { prompt: "Find the velocity at \\(t = 3\\) seconds of a particle whose displacement is \\(s = t^3 + 2t\\) metres.", answer: "29 m/sec" },
        { prompt: "What is the speed of a particle whose velocity is \\(-6\\) m/sec?", answer: "6 m/sec" },
      ],
      pyqExampleId: "4dcb3090-3957-4a82-8948-16c189b9e976",
      traps: [
        {
          title: "Dividing s by t",
          body: "The velocity at an instant is \\(\\dfrac{ds}{dt}\\), the derivative. Displacement divided by time is a different number and earns nothing here.",
        },
        {
          title: "A negative speed",
          body: "Velocity can be negative (the particle moves back); speed is \\(|v|\\) and never negative.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmad-acceleration",
      name: "Acceleration and jerk",
      intuition:
        "Acceleration is the rate of change of velocity, so it is the second derivative of the displacement. Jerk is the rate of change of acceleration, the third derivative: a sudden change in acceleration is what you feel as a jerk in a vehicle. Most board questions give one condition (a velocity or an acceleration), use it to find t, and then ask for the other quantities at that t.",
      definition:
        "- Acceleration: \\(a = \\dfrac{dv}{dt} = \\dfrac{d^2s}{dt^2}\\).\n" +
        "- Jerk: \\(j = \\dfrac{da}{dt} = \\dfrac{d^3s}{dt^3}\\).\n" +
        "- If the acceleration does not depend on \\(t\\), the motion is uniformly accelerated.\n" +
        "- Board layout: write \\(s\\) as (I), \\(v = \\dfrac{ds}{dt}\\) as (II), \\(a = \\dfrac{dv}{dt}\\) as (III); use the given condition in the right equation to find \\(t\\); put that \\(t\\) into the others.",
      formula: {
        label: "Acceleration and jerk",
        latex: "a = \\frac{dv}{dt} = \\frac{d^2s}{dt^2}, \\qquad j = \\frac{da}{dt} = \\frac{d^3s}{dt^3}",
      },
      authoredExample: {
        prompt:
          "The displacement of a particle is \\(s = t^3 - 3t^2 + 4t\\) metres at time \\(t\\) seconds. Find its velocity and displacement when its acceleration is 6 m/sec\\(^2\\), and find its jerk.",
        steps: [
          "\\(s = t^3 - 3t^2 + 4t\\) . . . (I)",
          "\\(v = \\dfrac{ds}{dt} = 3t^2 - 6t + 4\\) . . . (II)",
          "\\(a = \\dfrac{dv}{dt} = 6t - 6\\) . . . (III)",
          "Given \\(a = 6\\): from (III), \\(6t - 6 = 6\\), so \\(t = 2\\).",
          "From (II): \\(v = 12 - 12 + 4 = 4\\) m/sec. From (I): \\(s = 8 - 12 + 8 = 4\\) m.",
          "Jerk: \\(j = \\dfrac{da}{dt} = 6\\) m/sec\\(^3\\).",
        ],
        answer: "At \\(t = 2\\) sec: velocity 4 m/sec, displacement 4 m; jerk 6 m/sec\\(^3\\)",
      },
      selfCheckExample: {
        prompt: "The displacement of a particle is \\(s = 2t^3 + t\\). Find its acceleration at \\(t = 1\\).",
        steps: ["\\(v = 6t^2 + 1\\).", "\\(a = 12t = 12\\) at \\(t = 1\\)."],
        answer: "12 units/sec\\(^2\\)",
      },
      practiceSet: [
        { prompt: "Find the jerk of a particle whose displacement is \\(s = t^4\\).", answer: "\\(j = 24t\\)" },
        { prompt: "A particle has displacement \\(s = 7t^2 + 5\\). Is its motion uniformly accelerated?", answer: "Yes, \\(a = 14\\) at every instant" },
      ],
      pyqExampleId: "44b766b3-a2e9-4847-b04f-c8ecf863c539",
      traps: [
        {
          title: "Stopping at the first derivative",
          body: "\\(\\dfrac{ds}{dt}\\) is the velocity. The acceleration needs one more differentiation, \\(\\dfrac{d^2s}{dt^2}\\).",
        },
        {
          title: "Writing d/dt of dv/dt for the acceleration",
          body: "\\(\\dfrac{d}{dt}\\left(\\dfrac{dv}{dt}\\right)\\) is the jerk, the third derivative of \\(s\\). The acceleration is \\(\\dfrac{dv}{dt}\\).",
        },
        {
          title: "Putting the given acceleration into s",
          body: "A given acceleration goes into the equation for \\(a\\) to find \\(t\\). Only then does that \\(t\\) go into \\(v\\) and \\(s\\).",
        },
      ],
    },
  ],
};
