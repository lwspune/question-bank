import type { SubtopicNote } from "@/app/notes/_types";

export const MOMENTUM_AND_IMPULSE_NOTE: SubtopicNote = {
  subtopicName: "Impulse and Momentum",
  title: "Impulse and Momentum",
  oneLineDefinition:
    "Momentum p = mv is the 'quantity of motion'; impulse is the product of force and the time it acts, and equals the change in momentum it produces.",
  whyItMatters:
    "A compact, high-yield subtopic — roughly 5 PYQs across 2019–2026. " +
    "The two ideas are p = mv and impulse = Ft = change in momentum, plus the everyday cushioning principle (pulling hands back, jumping onto sand) that all derive from spreading a momentum change over a longer time to cut the force. " +
    "One formula and one principle clear the whole subtopic.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "linear-momentum",
      name: "Linear momentum, p = mv",
      intuition:
        "Momentum captures how hard a body is to stop — it grows with both mass and velocity. A slow truck and a fast bullet can carry the same momentum. Because velocity is a vector, momentum is a vector too: it has direction, and reversing direction changes the momentum even if the speed is unchanged.",
      definition:
        "**Linear momentum** is the product of a body's mass and velocity, \\(\\vec{p} = m\\vec{v}\\). " +
        "It is a **vector** pointing along the velocity, with SI unit **kg m/s**. " +
        "Because it is a vector, a change in DIRECTION changes the momentum even at constant speed — this is why a bouncing ball's momentum changes while its speed (and kinetic energy) need not.",
      formula: {
        label: "Linear momentum",
        latex: "\\vec{p} = m\\vec{v}",
        symbols: [
          { symbol: "p", meaning: "linear momentum (kg m/s), a vector" },
          { symbol: "m", meaning: "mass (kg)" },
          { symbol: "v", meaning: "velocity (m/s), a vector" },
        ],
      },
      authoredExample: {
        prompt:
          "A 2 kg ball moving at 5 m/s strikes a wall and bounces straight back at 5 m/s. Find the change in its momentum.",
        steps: [
          "Take the initial direction as positive: initial momentum \\(p_i = 2 \\times 5 = +10\\,\\text{kg m/s}\\).",
          "After bouncing it moves the opposite way at the same speed: \\(p_f = 2 \\times (-5) = -10\\,\\text{kg m/s}\\).",
          "Change \\(\\Delta p = p_f - p_i = -10 - 10 = -20\\,\\text{kg m/s}\\).",
        ],
        answer: "20 kg m/s, directed away from the wall (the magnitude is 2mv, not zero).",
      },
      selfCheckExample: {
        prompt:
          "When a ball bounces elastically off the ground (no energy lost), which quantity changes suddenly: speed, momentum, or kinetic energy?",
        steps: [
          "Elastic bounce: the speed magnitude is unchanged, so speed is the same.",
          "Kinetic energy depends only on speed (\\(\\tfrac12 mv^2\\)), so it is unchanged.",
          "Momentum is a vector; the vertical direction reverses, so momentum changes.",
        ],
        answer: "Its momentum — because momentum is a vector and its direction reverses.",
      },
      practiceSet: [
        { prompt: "What is the formula for linear momentum?", answer: "p = mv" },
        { prompt: "Momentum of a 3 kg body at 4 m/s?", answer: "12 kg m/s" },
        { prompt: "Is momentum a scalar or a vector?", answer: "Vector" },
        { prompt: "A ball bounces back at the same speed. Does its momentum change?", answer: "Yes — direction reverses, so the vector changes" },
      ],
      pyqExampleId: "c7d058ac-2514-40b6-b12c-9976aea93867", // 2019 — bouncing ball, momentum changes
      traps: [
        {
          title: "On an elastic bounce, momentum changes but speed and KE don't",
          body:
            "NDA 2019 asked what changes suddenly when a ball bounces with no energy loss. Speed and kinetic energy (scalars depending on speed only) are unchanged; MOMENTUM changes because its direction reverses. The change in momentum is 2mv, not zero.",
        },
      ],
    },

    {
      kind: "formula" as const,
      slug: "impulse-momentum-theorem",
      name: "Impulse = change in momentum; the cushioning principle",
      intuition:
        "Impulse is force multiplied by the time it acts, and it equals the change in momentum it produces. The key insight: to change a body's momentum by a fixed amount, a small force over a long time does the same job as a large force over a short time. So if you can stretch out the contact TIME, you cut the peak FORCE — this is why a fielder pulls his hands back and why landing on sand hurts less.",
      definition:
        "**Impulse** \\(J = F\\,\\Delta t\\) equals the change in momentum: \\(F\\,\\Delta t = \\Delta p = m(v - u)\\) (the impulse-momentum theorem). " +
        "Graphically, impulse is the **area under a force-time graph**. " +
        "Since \\(F = \\Delta p / \\Delta t\\), increasing the contact time \\(\\Delta t\\) for the same \\(\\Delta p\\) **reduces the force** — the basis of all cushioning.",
      formula: {
        label: "Impulse-momentum theorem",
        latex: "J = F\\,\\Delta t = \\Delta p = m(v - u)",
        symbols: [
          { symbol: "J", meaning: "impulse (N·s, equivalently kg m/s)" },
          { symbol: "F", meaning: "(average) force" },
          { symbol: "Δt", meaning: "time over which the force acts" },
          { symbol: "Δp = m(v − u)", meaning: "change in momentum" },
        ],
      },
      authoredExample: {
        prompt:
          "A 0.15 kg cricket ball arrives at 20 m/s and is brought to rest by a fielder. If he stops it in 0.5 s instead of 0.1 s, compare the average force in the two cases.",
        steps: [
          "Change in momentum is the same either way: \\(\\Delta p = m(v - u) = 0.15 \\times (0 - 20) = -3\\,\\text{kg m/s}\\) (magnitude 3 N·s).",
          "Quick stop: \\(F = \\Delta p / \\Delta t = 3 / 0.1 = 30\\,\\text{N}\\).",
          "Slow stop (hands pulled back): \\(F = 3 / 0.5 = 6\\,\\text{N}\\).",
          "Five times the time means one-fifth the force.",
        ],
        answer: "30 N for the quick stop vs 6 N for the cushioned stop — stretching the time cuts the force fivefold.",
      },
      selfCheckExample: {
        prompt:
          "The force on a 10 kg object follows a force-time graph that is a trapezoid: it rises linearly from 0 to 20 N over the first 5 s, stays at 20 N from 5 s to 20 s, then falls linearly back to 0 from 20 s to 25 s. Find the final speed (it started from rest).",
        steps: [
          "Impulse = area under the F-t graph.",
          "Rising triangle: \\(\\tfrac12 \\times 5 \\times 20 = 50\\,\\text{N·s}\\).",
          "Flat top: \\(15 \\times 20 = 300\\,\\text{N·s}\\). Falling triangle: \\(\\tfrac12 \\times 5 \\times 20 = 50\\,\\text{N·s}\\).",
          "Total impulse \\(= 50 + 300 + 50 = 400\\,\\text{N·s} = \\Delta p\\).",
          "Final speed \\(v = \\Delta p / m = 400 / 10 = 40\\,\\text{m/s}\\).",
        ],
        answer: "40 m/s.",
      },
      practiceSet: [
        { prompt: "What does impulse equal?", answer: "The change in momentum (FΔt = Δp)" },
        { prompt: "What is the SI unit of impulse?", answer: "N·s (= kg m/s)" },
        { prompt: "On a force-time graph, impulse is represented by what?", answer: "The area under the graph" },
        { prompt: "Why does a fielder pull his hands back when catching a ball?", answer: "To increase the contact time and so reduce the force on his hands" },
      ],
      pyqExampleId: "fd494b7f-151c-41a2-ac55-ab25d3c0bd95", // 2025 — fielder pulls hands back (cushioning)
      traps: [
        {
          title: "Cushioning increases TIME to reduce FORCE",
          body:
            "Jumping onto sand, pulling hands back, crumple zones in cars, bending knees on landing — all work by increasing the impact TIME. The momentum change Δp is fixed; spreading it over a longer Δt lowers the peak force F = Δp/Δt. The reason is reduced force (reduced acceleration), not reduced momentum change.",
        },
        {
          title: "Net force on the floor in a bounce includes weight",
          body:
            "When a ball bounces, the floor's reaction must both reverse the ball's momentum AND support its weight. NDA 2024 (0.1 kg dropped from 0.45 m, rebounds to 0.20 m, contact 0.1 s): impact force = Δp/t = 0.1(3+2)/0.1 = 5 N, then add mg = 1 N to get 6 N net.",
        },
      ],
    },
  ],
};
