import type { SubtopicNote } from "@/app/notes/_types";

export const PROJECTILE_NOTE: SubtopicNote = {
  subtopicName: "Projectile and Vertical Motion",
  title: "Projectile and Vertical Motion",
  oneLineDefinition:
    "Vertical throws and projectiles are constant-acceleration motion under gravity; the key idea is that horizontal and vertical motions are independent, so each is handled with the same equations of motion using g.",
  whyItMatters:
    "Three PYQs, all EASY-to-MODERATE, and they reward a single habit: treat the vertical motion (with acceleration g) and the horizontal motion (constant velocity) separately. " +
    "Straight-up throws use v² = u² − 2gh and v = u − gt with v = 0 at the top; horizontal projectiles get their fall time from the height alone and their range from that time. Take g = 10 m/s² unless told otherwise, and the marks fall out.",
  concepts: [
    // 1 — vertical throw up
    {
      kind: "formula" as const,
      slug: "vertical-throw",
      name: "Vertical throw — straight up under gravity",
      intuition:
        "Throw a ball straight up and gravity decelerates it at g until, at the highest point, its velocity is momentarily zero. The equations of motion apply with a = −g (taking up as positive). The speed it had on the way up is exactly the speed it returns with.",
      definition:
        "For a body thrown straight up with speed \\(u\\) (take up as positive, \\(a = -g\\)):\n" +
        "- velocity: \\(v = u - gt\\), which is **0 at the maximum height**;\n" +
        "- maximum height: \\(v^2 = u^2 - 2gh \\Rightarrow h_{\\max} = \\dfrac{u^2}{2g}\\);\n" +
        "- time to the top: \\(t = \\dfrac{u}{g}\\). The ascent and descent times are equal.",
      formula: {
        label: "Vertical throw (up positive, a = −g)",
        latex: "v = u - gt, \\qquad h_{\\max} = \\dfrac{u^2}{2g}, \\qquad t_{\\text{up}} = \\dfrac{u}{g}",
        symbols: [
          { symbol: "u", meaning: "launch speed (upward)" },
          { symbol: "g", meaning: "acceleration due to gravity (≈ 10 m/s²)" },
          { symbol: "\\(h_{\\max}\\)", meaning: "maximum height" },
        ],
      },
      authoredExample: {
        prompt:
          "A ball is thrown straight up and reaches a maximum height of 20 m. With what speed was it thrown? (g = 10 m/s²)",
        steps: [
          "At the top \\(v = 0\\); use \\(v^2 = u^2 - 2gh\\) ⟹ \\(0 = u^2 - 2gh\\).",
          "\\(u = \\sqrt{2gh} = \\sqrt{2 \\times 10 \\times 20} = \\sqrt{400}\\).",
          "\\(u = 20\\) m/s.",
        ],
        answer: "20 m/s.",
      },
      selfCheckExample: {
        prompt:
          "A ball is thrown straight up at 40 m/s. How long does it take to reach the highest point? (g = 10 m/s²)",
        steps: [
          "At the top \\(v = 0\\); use \\(v = u - gt\\) ⟹ \\(0 = 40 - 10t\\).",
          "\\(t = \\dfrac{40}{10} = 4\\) s.",
        ],
        answer: "4 s.",
      },
      practiceSet: [
        { prompt: "Thrown up at 30 m/s. Max height? (g = 10)", answer: "45 m", method: "u²/2g = 900/20" },
        { prompt: "Thrown up at 20 m/s. Time to top? (g = 10)", answer: "2 s", method: "u/g = 20/10" },
        { prompt: "At the highest point of a vertical throw, the velocity is?", answer: "0" },
        { prompt: "Reaches 5 m max height. Launch speed? (g = 10)", answer: "10 m/s", method: "√(2gh) = √100" },
      ],
      pyqExampleId: "29b78b37-de7f-475a-8fa8-43db5b01773f", // 2021 — h = 20 m → u = 20 m/s
      traps: [
        {
          title: "Velocity is zero at the top, acceleration is NOT",
          body:
            "At the highest point the velocity is momentarily 0, but the acceleration is still g downward — gravity never switches off. Use v = 0 only for the velocity, never set a = 0 at the top.",
        },
      ],
    },

    // 2 — horizontal projectile — VIZ
    {
      kind: "formula" as const,
      slug: "horizontal-projectile",
      name: "Horizontal projectile — independence of motions",
      intuition:
        "Fire a ball horizontally off a cliff and two things happen at once and independently: it keeps a constant horizontal speed (no horizontal force), while gravity pulls it down exactly as if it had been dropped. The fall time depends only on the height; the horizontal range is that time times the launch speed.",
      definition:
        "A projectile launched **horizontally** with speed \\(u\\) from height \\(h\\):\n" +
        "- vertical motion is free fall: time to land \\(t = \\sqrt{\\dfrac{2h}{g}}\\) (independent of \\(u\\));\n" +
        "- horizontal motion is uniform: range \\(R = u\\,t\\).\n" +
        "The horizontal and vertical motions are **independent** — they share only the time \\(t\\).",
      visualizationSlug: "kin-projectile-parabola",
      formula: {
        label: "Horizontal projectile",
        latex: "t = \\sqrt{\\dfrac{2h}{g}}, \\qquad R = u\\,t",
        symbols: [
          { symbol: "u", meaning: "horizontal launch speed" },
          { symbol: "h", meaning: "launch height" },
          { symbol: "t", meaning: "time of flight" },
          { symbol: "R", meaning: "horizontal range" },
        ],
      },
      authoredExample: {
        prompt:
          "A stone is thrown horizontally at 12 m/s from the top of a 20 m building. How far from the base does it land? (g = 10 m/s²)",
        steps: [
          "Fall time from the height alone: \\(t = \\sqrt{\\dfrac{2h}{g}} = \\sqrt{\\dfrac{2 \\times 20}{10}} = \\sqrt{4} = 2\\) s.",
          "Horizontal range: \\(R = u\\,t = 12 \\times 2 = 24\\) m.",
        ],
        answer: "24 m.",
      },
      selfCheckExample: {
        prompt:
          "A ball is rolled off a 5 m table at 4 m/s. How far from the table does it land? (g = 10 m/s²)",
        steps: [
          "Fall time: \\(t = \\sqrt{\\dfrac{2 \\times 5}{10}} = \\sqrt{1} = 1\\) s.",
          "Range: \\(R = u\\,t = 4 \\times 1 = 4\\) m.",
        ],
        answer: "4 m.",
      },
      practiceSet: [
        { prompt: "Thrown horizontally from 45 m. Time to land? (g = 10)", answer: "3 s", method: "√(2×45/10) = √9" },
        { prompt: "Two balls — one dropped, one thrown horizontally — leave the same height together. Which lands first?", answer: "They land together", method: "same vertical free-fall" },
        { prompt: "Range if u = 10 m/s and flight time 2 s?", answer: "20 m", method: "R = u t" },
        { prompt: "Does the fall time of a horizontal projectile depend on its launch speed?", answer: "No — only on the height" },
      ],
      pyqExampleId: "cfec546a-ad71-4be3-982b-968fd8fc8cd7", // 2023 — R = 24 m
      traps: [
        {
          title: "Horizontal speed never affects the fall time",
          body:
            "A faster horizontal throw lands farther away but takes the SAME time to fall, because the vertical motion is independent free fall. Get the time from the height (t = √(2h/g)) first, then multiply by u for the range.",
        },
      ],
    },
  ],
};
