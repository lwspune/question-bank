import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_WE_ENERGY_NOTE: SubtopicNote = {
  subtopicName: "Potential Energy and Conservation",
  title: "Potential Energy and Conservation",
  oneLineDefinition:
    "Potential energy stored in a spring (½kx²) and by height (mgh), the conservation of mechanical energy when only gravity and springs do work, and how it gives the speeds of a bob moving in a vertical circle.",
  whyItMatters:
    "Two NEET questions. NEET 2023 asked how a spring's stored energy changes when its stretch goes from 2 cm to 8 cm. NEET 2025 asked for the speed of a bob at the point where its string goes slack in a vertical circle, using energy conservation together with the condition for a slack string.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphwe-spring",
      name: "Potential energy of a spring",
      intuition:
        "Stretch or squeeze a spring and it pulls back towards its natural length, harder the further you move it. The work you do against that pull is not lost: it is stored in the spring as potential energy, ready to be given back. Because the force grows as you stretch, the stored energy grows faster still, as the square of the stretch.",
      definition:
        "- Spring force (Hooke's law): \\(F = -kx\\), where x is the stretch or compression from the natural length and k is the spring constant in N/m.\n" +
        "- Work done to stretch a spring slowly from its natural length by x is stored as **potential energy**: \\(U = \\tfrac{1}{2}kx^{2}\\).\n" +
        "- \\(U \\propto x^{2}\\): stretching n times as far stores \\(n^{2}\\) times the energy.\n" +
        "- The energy is the same for a stretch and a compression of the same size.\n" +
        "- A mass m hanging at rest stretches a spring by \\(x_0\\): \\(kx_0 = mg\\), so \\(k = \\dfrac{mg}{x_0}\\).\n" +
        "- A block of speed v stopped by a spring on a smooth floor: \\(\\tfrac{1}{2}mv^{2} = \\tfrac{1}{2}kx^{2}\\).",
      formula: {
        label: "Spring potential energy",
        latex: "F = -kx, \\qquad U = \\tfrac{1}{2}kx^{2}",
        symbols: [
          { symbol: "\\(k\\)", meaning: "spring constant" },
          { symbol: "\\(x\\)", meaning: "stretch or compression from the natural length" },
        ],
      },
      authoredExample: {
        prompt:
          "A spring of spring constant 800 N/m is compressed by 5 cm. How much energy does it store? What speed does it give a 0.5 kg block when it pushes the block off along a smooth floor?",
        steps: [
          "\\(U = \\tfrac{1}{2}(800)(0.05)^{2} = 400 \\times 0.0025 = 1\\) J.",
          "All of it becomes kinetic energy: \\(\\tfrac{1}{2}(0.5)v^{2} = 1\\), so \\(v^{2} = 4\\).",
          "\\(v = 2\\) m/s.",
        ],
        answer: "1 J; 2 m/s",
      },
      selfCheckExample: {
        prompt:
          "A 2 kg mass hung from a spring stretches it by 4 cm and hangs at rest. Find the spring constant and the energy stored. (g = 10 m/s²)",
        steps: [
          "\\(k = \\dfrac{mg}{x_0} = \\dfrac{20}{0.04} = 500\\) N/m.",
          "\\(U = \\tfrac{1}{2}(500)(0.04)^{2} = 250 \\times 0.0016 = 0.4\\) J.",
        ],
        answer: "500 N/m and 0.4 J",
      },
      practiceSet: [
        { prompt: "How much energy is stored in a spring of spring constant 200 N/m stretched by 10 cm?", answer: "1 J" },
        { prompt: "Two springs of spring constants k and 3k are stretched by the same length. What is the ratio of the energies stored, first to second?", answer: "1 : 3" },
        { prompt: "A 10 N force stretches a spring by 2 cm. What is its spring constant?", answer: "500 N/m" },
        { prompt: "In which direction does a spring's force act on a body attached to it?", answer: "Towards the natural length, opposite to the stretch or compression" },
      ],
      pyqExampleId: "1fba7789-e7a7-420e-917c-669fa311e696",
      traps: [
        {
          title: "Spring energy goes as the square of the stretch",
          body: "Stretching a spring three times as far stores nine times the energy, not three times, because \\(U = \\tfrac{1}{2}kx^{2}\\).",
        },
        {
          title: "Put the stretch in metres",
          body: "With k in N/m, x must be in metres: 5 cm is 0.05 m. Using x = 5 makes the energy \\(10^{4}\\) times too large.",
        },
        {
          title: "Compression stores energy too",
          body: "A spring squeezed by x stores the same \\(\\tfrac{1}{2}kx^{2}\\) as one stretched by x. The sign of x does not matter once it is squared.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphwe-conservation",
      name: "Conservation of mechanical energy and the vertical circle",
      visualizationSlug: "wep-energy-conservation-track",
      intuition:
        "Gravity and springs are conservative forces: the work they do depends only on where a body starts and ends, not on the path. Energy they take as potential energy they give back. So when only they do work, kinetic plus potential energy stays the same. A string pulling a bob round a circle is always at right angles to its motion, so it does no work either, and energy conservation alone gives the bob's speed at any height. The string's tension then tells you whether the bob stays on the circle: when the tension falls to zero, the string goes slack.",
      definition:
        "- Potential energy near the Earth: \\(U = mgh\\). Work by gravity depends only on the change in height.\n" +
        "- **Conservation of mechanical energy:** when only conservative forces do work, \\(\\tfrac{1}{2}mv_1^{2} + mgh_1 = \\tfrac{1}{2}mv_2^{2} + mgh_2\\).\n" +
        "- Falling h from rest on any smooth path: \\(v = \\sqrt{2gh}\\).\n" +
        "- Bob on a string of length l: at the lowest point \\(T - mg = \\dfrac{mv^{2}}{l}\\); at the top \\(T + mg = \\dfrac{mv^{2}}{l}\\).\n" +
        "- To just go round, the tension at the top is zero: \\(v_{\\text{top}} = \\sqrt{gl}\\), which needs \\(v_{\\text{bottom}} = \\sqrt{5gl}\\).\n" +
        "- At a point where the string makes angle \\(\\theta\\) above the horizontal, the bob is \\(l(1 + \\sin\\theta)\\) above the lowest point, and the string goes slack when \\(mg\\sin\\theta = \\dfrac{mv^{2}}{l}\\).",
      formula: {
        label: "Mechanical energy",
        latex: "\\tfrac{1}{2}mv_1^{2} + mgh_1 = \\tfrac{1}{2}mv_2^{2} + mgh_2, \\qquad v_{\\text{top}} = \\sqrt{gl}, \\quad v_{\\text{bottom}} = \\sqrt{5gl}",
      },
      authoredExample: {
        prompt:
          "A 0.2 kg bob on a string 1 m long is pulled aside until the string is horizontal, then released. Find its speed and the tension in the string at the lowest point. (g = 10 m/s²)",
        steps: [
          "It drops 1 m: \\(v^{2} = 2gl = 2 \\times 10 \\times 1 = 20\\), so \\(v = \\sqrt{20} \\approx 4.5\\) m/s.",
          "At the lowest point \\(T = mg + \\dfrac{mv^{2}}{l} = 0.2 \\times 10 + \\dfrac{0.2 \\times 20}{1}\\).",
          "\\(T = 2 + 4 = 6\\) N, three times the bob's weight.",
        ],
        answer: "About 4.5 m/s; 6 N",
      },
      selfCheckExample: {
        prompt:
          "A bob on a string 2 m long just manages to go round a vertical circle. Find its speed at the top and at the lowest point. (g = 10 m/s²)",
        steps: [
          "At the top the tension is just zero: \\(v_{\\text{top}}^{2} = gl = 20\\), so \\(v_{\\text{top}} \\approx 4.5\\) m/s.",
          "Energy from the top to the bottom, a drop of 2l = 4 m: \\(v_{\\text{bottom}}^{2} = 20 + 2 \\times 10 \\times 4 = 100\\).",
          "\\(v_{\\text{bottom}} = 10\\) m/s, which is \\(\\sqrt{5gl}\\).",
        ],
        answer: "About 4.5 m/s at the top; 10 m/s at the bottom",
      },
      practiceSet: [
        { prompt: "A stone is dropped from a height of 20 m. What is its speed just before it hits the ground? (g = 10 m/s²)", answer: "20 m/s" },
        { prompt: "A 1 kg ball is thrown straight up at 10 m/s. Taking the launch point as zero, what is its potential energy at the highest point?", answer: "50 J" },
        { prompt: "Three stones are thrown from the same cliff top with the same speed: one up, one down, one sideways. Which reaches the ground with the greatest speed?", answer: "All three land with the same speed" },
        { prompt: "What is the least speed a bob on a string of length l must have at the top of a vertical circle to keep going round?", answer: "\\(\\sqrt{gl}\\)" },
      ],
      pyqExampleId: "fc1b2ac1-a5f6-491a-9a21-c8d0676c2a24",
      traps: [
        {
          title: "Tension does no work but still matters",
          body: "The string's pull is at right angles to the bob's motion, so it does no work and drops out of the energy equation. It is still in the radial equation, and the string goes slack when it reaches zero.",
        },
        {
          title: "Just going round needs √(5gl) at the bottom",
          body: "A bob on a string needs \\(\\sqrt{gl}\\) at the top. Rising 2l on the way up adds \\(4gl\\) to \\(v^{2}\\), so the lowest point needs \\(v^{2} = 5gl\\), not \\(4gl\\).",
        },
        {
          title: "Measure every height from one level",
          body: "When the string makes angle \\(\\theta\\) above the horizontal, the bob is \\(l(1 + \\sin\\theta)\\) above the lowest point, not \\(l\\sin\\theta\\). Fix the lowest point as zero and keep it.",
        },
        {
          title: "Gravity's work ignores the path",
          body: "A body sliding down a smooth curved track reaches the same speed as one falling straight down the same height. Only the drop in height matters.",
        },
      ],
    },
  ],
};
