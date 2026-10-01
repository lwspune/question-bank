import type { SubtopicNote } from "@/app/notes/_types";

export const FRICTION_LOM_NOTE: SubtopicNote = {
  subtopicName: "Static and Kinetic Friction",
  title: "Static and Kinetic Friction",
  oneLineDefinition:
    "Static friction takes any value up to μs N to stop sliding; once a body slides, kinetic friction is fixed at μk N, so every friction question is first a question about the normal reaction N.",
  whyItMatters:
    "Thirty PYQs, twenty-five of them multiple choice, and four from 2026: the largest page in the chapter. Fourteen are on a level surface: stopping distances, a force pulled or pushed at an angle, blocks that must move together, and the work done against friction. Eight hold a block on an incline or push it up the slope; eight let it slide down, and five of those compare the time on a rough slope with the time on a smooth one.",
  concepts: [
    // C1 — level surfaces
    {
      kind: "formula" as const,
      slug: "jplom-level-friction",
      name: "Friction on a level surface",
      intuition:
        "Friction depends on how hard the surfaces are pressed together, the normal reaction N, and on the materials, through μ. It does not depend on the area of contact. Before a body slides, static friction is only as large as it needs to be. A force at an angle changes N, and so changes the friction: pulling slightly upward makes a heavy box easier to start.",
      definition:
        "- Static: \\(f_s \\le \\mu_s N\\), self-adjusting. Kinetic: \\(f_k = \\mu_k N\\) once sliding. Neither depends on the area of contact.\n" +
        "- A force F at \\(\\theta\\) above the horizontal: \\(N = mg - F\\sin\\theta\\). Below the horizontal (a push): \\(N = mg + F\\sin\\theta\\).\n" +
        "- Least pull at \\(\\theta\\) to start the body: \\(F = \\dfrac{\\mu mg}{\\cos\\theta + \\mu\\sin\\theta}\\).\n" +
        "- Sliding to a stop: deceleration \\(\\mu g\\), distance \\(\\dfrac{v^{2}}{2\\mu g}\\), time \\(\\dfrac{v}{\\mu g}\\).\n" +
        "- Two stacked blocks pushed by a force on the lower one: the top block can reach at most \\(\\mu_s g\\), so they move together only up to \\(F = (m + M)\\mu_s g\\).\n" +
        "- Work done against friction over a distance s: \\(\\mu N s\\).\n" +
        "- A bag dropped on a belt moving at v slips \\(\\dfrac{v^{2}}{2\\mu g}\\) relative to the belt. A chain on a table can hang over the edge by at most the fraction \\(\\dfrac{\\mu}{1 + \\mu}\\).",
      formula: {
        label: "Friction and the least starting pull",
        latex: "f_s \\le \\mu_s N,\\quad f_k = \\mu_k N, \\qquad F_{\\min} = \\frac{\\mu mg}{\\cos\\theta + \\mu\\sin\\theta}",
      },
      authoredExample: {
        prompt:
          "A 20 kg crate rests on a floor with \\(\\mu_s = 0.5\\). It is pulled by a rope at \\(37^{\\circ}\\) above the horizontal (\\(\\sin 37^{\\circ} = 0.6\\), \\(\\cos 37^{\\circ} = 0.8\\)). Find the least force that starts it, and compare with a horizontal pull. (g = 10 m/s²)",
        steps: [
          "The pull lifts part of the weight: \\(N = 200 - 0.6F\\).",
          "At the point of slipping: \\(0.8F = 0.5(200 - 0.6F) = 100 - 0.3F\\).",
          "\\(1.1F = 100\\), so \\(F \\approx 90.9\\) N.",
          "A horizontal pull needs \\(\\mu mg = 100\\) N, so the angled pull is easier.",
        ],
        answer: "About 90.9 N, against 100 N for a horizontal pull.",
      },
      selfCheckExample: {
        prompt:
          "A block slides at 6 m/s onto a floor with \\(\\mu_k = 0.3\\). How far does it go, and for how long? (g = 10 m/s²)",
        steps: [
          "Deceleration \\(\\mu g = 3\\ \\text{m/s}^{2}\\).",
          "Distance \\(\\dfrac{36}{2 \\times 3} = 6\\) m; time \\(\\dfrac{6}{3} = 2\\) s.",
        ],
        answer: "6 m in 2 s.",
      },
      practiceSet: [
        { prompt: "A 1 kg block sits on a 4 kg block on a smooth table, with \\(\\mu_s = 0.4\\) between them. Largest horizontal force on the lower block for them to move together? (g = 10 m/s²)", answer: "20 N" },
        { prompt: "μ = 0.25 between a chain and a table. Largest fraction of the chain that can hang over the edge?", answer: "0.2" },
        { prompt: "A bag is dropped on a belt moving at 3 m/s with μ = 0.5. How far does it slip on the belt? (g = 10 m/s²)", answer: "0.9 m" },
        { prompt: "A 10 kg block is pushed with 50 N at \\(37^{\\circ}\\) below the horizontal, \\(\\mu_k = 0.2\\). Kinetic friction? (g = 10 m/s², sin 37° = 0.6)", answer: "26 N" },
      ],
      pyqExampleId: "3b0574d9-9cfd-448b-9a52-718eb1937181", // 2023: 10 kg pulled at 30°, μs = 0.25, F = 25.2 N
      traps: [
        {
          title: "N is not mg when the force is at an angle",
          body: "An angled pull lifts part of the weight and an angled push adds to it. Using μmg for the friction here gives the horizontal-force answer, which is always among the options.",
        },
        {
          title: "Static friction is only as large as it needs to be",
          body: "A 10 kg block with μs = 0.5 pushed by 20 N does not move, and the friction is 20 N, not 50 N. μs N is the limit, reached only at the point of slipping.",
        },
        {
          title: "Area of contact does not matter",
          body: "Turning a brick on its side changes the area but not the friction. Both static and kinetic friction depend on the materials (through μ) and on N only.",
        },
      ],
    },

    // C2 — holding or pushing on an incline
    {
      kind: "formula" as const,
      slug: "jplom-incline-hold",
      name: "Holding and pushing a block on a rough incline",
      intuition:
        "Friction always opposes the motion, or the motion that would happen without it. Pushing a block up the slope, friction acts down the slope and adds to the weight's pull. Holding it from sliding down, friction acts up the slope and helps you. That flip of direction is the whole difference between the two forces.",
      definition:
        "- Angle of repose: the block just starts to slide when \\(\\tan\\theta = \\mu_s\\).\n" +
        "- Least force along the slope to push it up: \\(F_1 = mg(\\sin\\theta + \\mu\\cos\\theta)\\).\n" +
        "- Least force along the slope to stop it sliding down: \\(F_2 = mg(\\sin\\theta - \\mu\\cos\\theta)\\). \\(F_1 - F_2 = 2\\mu mg\\cos\\theta\\).\n" +
        "- If \\(\\mu > \\tan\\theta\\) the block stays put by itself; to slide it down at constant velocity, push with \\(mg(\\mu\\cos\\theta - \\sin\\theta)\\).\n" +
        "- A block at rest, or sliding at constant velocity: the surface's total force (N plus friction) equals mg, straight up.\n" +
        "- On a curved surface y = f(x), a block can rest wherever the slope \\(dy/dx \\le \\mu\\).",
      formula: {
        label: "Push up and hold",
        latex: "F_{\\text{up}} = mg(\\sin\\theta + \\mu\\cos\\theta), \\qquad F_{\\text{hold}} = mg(\\sin\\theta - \\mu\\cos\\theta)",
      },
      authoredExample: {
        prompt:
          "A 10 kg block lies on a \\(37^{\\circ}\\) incline with \\(\\mu = 0.5\\) (\\(\\sin 37^{\\circ} = 0.6\\)). Find the least force along the slope (a) to push it up and (b) to stop it sliding down. (g = 10 m/s²)",
        steps: [
          "Weight along the slope: \\(mg\\sin\\theta = 60\\) N. Largest friction: \\(\\mu mg\\cos\\theta = 0.5 \\times 80 = 40\\) N.",
          "(a) Friction acts down the slope: \\(F_1 = 60 + 40 = 100\\) N.",
          "(b) Friction acts up the slope: \\(F_2 = 60 - 40 = 20\\) N.",
        ],
        answer: "(a) 100 N; (b) 20 N.",
      },
      selfCheckExample: {
        prompt:
          "A 2 kg block lies on a \\(30^{\\circ}\\) incline with coefficient of friction 0.8. Does it slide by itself? What force down the slope moves it at constant velocity? (g = 10 m/s²)",
        steps: [
          "\\(\\mu\\cos 30^{\\circ} = 0.8 \\times 0.866 = 0.69\\), more than \\(\\sin 30^{\\circ} = 0.5\\), so it stays put.",
          "\\(F = mg(\\mu\\cos\\theta - \\sin\\theta) = 20(0.69 - 0.5) \\approx 3.9\\) N.",
        ],
        answer: "It does not slide; about 3.9 N.",
      },
      practiceSet: [
        { prompt: "A block just starts to slide when the incline reaches \\(37^{\\circ}\\). \\(\\mu_s\\)?", answer: "0.75" },
        { prompt: "A 3 kg block rests on a rough incline. Size of the total force from the incline on it? (g = 10 m/s²)", answer: "30 N" },
        { prompt: "A block rests on a surface \\(y = x^{2}/2\\) (in metres) with μ = 0.4. Highest point where it can stay?", answer: "y = 0.08 m" },
        { prompt: "For a 4 kg block on a \\(30^{\\circ}\\) incline with μ = 0.25, find \\(F_1 - F_2\\). (g = 10 m/s²)", answer: "\\(10\\sqrt{3} \\approx 17.3\\) N" },
      ],
      pyqExampleId: "34e8764f-71f5-409f-afbe-deb8e4115d64", // 2023: push-up force = 2 × hold force at 45°, μ = 1/3
      traps: [
        {
          title: "Friction flips direction between push and hold",
          body: "Pushing up, friction points down the slope: add μmg cos θ. Holding against sliding, it points up the slope: subtract it. Using the same sign in both gives F₁ − F₂ = 0.",
        },
        {
          title: "The contact force is the full weight",
          body: "For a block at rest or at constant velocity on an incline, N and friction together balance mg. The total contact force is mg, not mg cos θ.",
        },
        {
          title: "μ > tan θ means it will not slide by itself",
          body: "Then the force to move it down is mg(μ cos θ − sin θ). A negative answer from the 'hold' formula is the sign that the block needs a push, not a brake.",
        },
      ],
    },

    // C3 — sliding down
    {
      kind: "formula" as const,
      slug: "jplom-incline-slide",
      name: "Sliding down a rough incline",
      intuition:
        "A block sliding down feels the weight's pull along the slope, mg sin θ, minus kinetic friction, μmg cos θ. From rest, the time to cover a length goes as one over the square root of the acceleration. So a block that takes twice as long on a rough slope has a quarter of the acceleration it would have on a smooth one.",
      definition:
        "- Sliding down: \\(a = g(\\sin\\theta - \\mu_k\\cos\\theta)\\). Moving up and slowing: \\(a = g(\\sin\\theta + \\mu_k\\cos\\theta)\\), down the slope.\n" +
        "- From rest over a length l: \\(t = \\sqrt{2l/a}\\), \\(v = \\sqrt{2al}\\).\n" +
        "- Rough time = n × smooth time: \\(a_{\\text{rough}} = a_{\\text{smooth}}/n^{2}\\), so \\(\\mu = \\tan\\theta\\left(1 - \\dfrac{1}{n^{2}}\\right)\\). At \\(45^{\\circ}\\), \\(\\mu = 1 - \\dfrac{1}{n^{2}}\\).\n" +
        "- Constant velocity down the slope: \\(\\mu_k = \\tan\\theta\\).\n" +
        "- Any extra force (an electric force, a push) with a part perpendicular to the slope changes N; resolve it as well.",
      formula: {
        label: "Sliding down",
        latex: "a = g(\\sin\\theta - \\mu\\cos\\theta), \\qquad \\mu = \\tan\\theta\\left(1 - \\frac{1}{n^{2}}\\right)",
      },
      authoredExample: {
        prompt:
          "A block slides from rest down 8 m of a \\(37^{\\circ}\\) incline with \\(\\mu_k = 0.25\\) (\\(\\sin 37^{\\circ} = 0.6\\), \\(\\cos 37^{\\circ} = 0.8\\)). Find its acceleration, the time taken and its speed at the bottom. (g = 10 m/s²)",
        steps: [
          "\\(a = 10(0.6 - 0.25 \\times 0.8) = 10 \\times 0.4 = 4\\ \\text{m/s}^{2}\\).",
          "\\(t = \\sqrt{2 \\times 8/4} = 2\\) s.",
          "\\(v = at = 8\\) m/s.",
        ],
        answer: "\\(4\\ \\text{m/s}^{2}\\), 2 s, 8 m/s.",
      },
      selfCheckExample: {
        prompt:
          "A block takes twice as long to slide down a rough \\(30^{\\circ}\\) incline as down a smooth one of the same length. Find \\(\\mu_k\\).",
        steps: [
          "Twice the time means a quarter of the acceleration: \\(\\sin\\theta - \\mu\\cos\\theta = \\tfrac{1}{4}\\sin\\theta\\).",
          "\\(\\mu = \\tfrac{3}{4}\\tan 30^{\\circ} = \\dfrac{3}{4\\sqrt{3}} = \\dfrac{\\sqrt{3}}{4} \\approx 0.43\\).",
        ],
        answer: "\\(\\sqrt{3}/4 \\approx 0.43\\)",
      },
      practiceSet: [
        { prompt: "A block slides down a \\(45^{\\circ}\\) incline with \\(\\mu_k = 0.5\\). Acceleration? (g = 10 m/s²)", answer: "\\(5/\\sqrt{2} \\approx 3.5\\ \\text{m/s}^{2}\\)" },
        { prompt: "A block slides down a \\(37^{\\circ}\\) incline at constant velocity. \\(\\mu_k\\)?", answer: "0.75" },
        { prompt: "On a \\(45^{\\circ}\\) incline with \\(\\mu_k = 0.5\\), how many times longer is the slide than on a smooth incline?", answer: "\\(\\sqrt{2}\\)" },
        { prompt: "A block is sent up a \\(30^{\\circ}\\) incline with \\(\\mu_k = 0.2\\sqrt{3}\\). Its deceleration? (g = 10 m/s²)", answer: "\\(8\\ \\text{m/s}^{2}\\)" },
      ],
      pyqExampleId: "2f5ab985-cd02-43a8-9cf2-109340688dbd", // 2026: 50% more time on a rough 45° incline, μ = 5/9
      traps: [
        {
          title: "Time ratios are squared",
          body: "Time goes as 1/√a. Taking 50% more time means the acceleration is smaller by a factor of 1.5² = 2.25, not 1.5. That is why the answer at 45° is 1 − 1/2.25 = 5/9.",
        },
        {
          title: "Friction on a slope is μ mg cos θ",
          body: "On an incline, N = mg cos θ. Writing the friction as μmg, the level-floor value, makes it too large and gives a wrong μ.",
        },
        {
          title: "An extra force can change N",
          body: "A horizontal electric force on a charged block has a part pressing it into the slope or lifting it off. Add that part to mg cos θ before multiplying by μ.",
        },
      ],
    },
  ],
};
