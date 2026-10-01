import type { SubtopicNote } from "@/app/notes/_types";

export const TRAJECTORY_PLANE_NOTE: SubtopicNote = {
  subtopicName: "Projectile: Velocity, Trajectory and Projection from a Height",
  title: "Projectile: Velocity, Trajectory and Projection from a Height",
  oneLineDefinition:
    "During the flight the horizontal velocity u cos θ never changes while the vertical velocity falls by g every second; the path is the parabola y = x tan θ − gx²/(2u² cos²θ), and a body thrown horizontally from a height h falls for √(2h/g) whatever its speed.",
  whyItMatters:
    "Twenty-four PYQs, seventeen of them multiple choice, and three from 2026. Thirteen ask about the state of the projectile at one instant: its speed, its direction, its height at a given time, or its kinetic energy at the top. Four give the equation of the path and seven throw the body from a height, horizontally or down a stairway. Each of them starts from the same fact: the horizontal velocity is the same at every point of the flight.",
  concepts: [
    // C1 — velocity at an instant, KE at the top
    {
      kind: "formula" as const,
      slug: "jpplane-velocity-energy",
      name: "Velocity and kinetic energy during the flight",
      intuition:
        "The horizontal velocity u cos θ is the same at launch, at the top and at landing. Only the vertical velocity changes: it falls by g every second, is zero at the top, and comes back to −u sin θ on landing. So at the top the speed is u cos θ, not zero, and the kinetic energy there is the launch value times cos²θ. A projectile passes each height twice, at two times placed symmetrically about the top.",
      definition:
        "- \\(v_x = u\\cos\\theta\\) throughout; \\(v_y = u\\sin\\theta - gt\\).\n" +
        "- Speed \\(v = \\sqrt{v_x^{2} + v_y^{2}}\\); direction \\(\\tan\\beta = \\dfrac{u\\sin\\theta - gt}{u\\cos\\theta}\\) above the horizontal.\n" +
        "- At the top: speed \\(u\\cos\\theta\\), kinetic energy \\(K\\cos^{2}\\theta\\) where K is the launch value; potential energy is greatest there.\n" +
        "- Height at time t: \\(y = u\\sin\\theta\\,t - \\tfrac{1}{2}gt^{2}\\).\n" +
        "- Same height at \\(t_1\\) and \\(t_2\\): \\(T = t_1 + t_2\\) and \\(h = \\tfrac{1}{2}gt_1t_2\\).\n" +
        "- Change in momentum from launch to landing: \\(2mu\\sin\\theta\\), straight down.",
      formula: {
        label: "Velocity during the flight",
        latex:
          "v_x = u\\cos\\theta,\\ v_y = u\\sin\\theta - gt \\qquad K_{top} = K\\cos^{2}\\theta \\qquad h = \\tfrac{1}{2}gt_1t_2",
      },
      authoredExample: {
        prompt:
          "A ball is thrown at 50 m/s at \\(53^{\\circ}\\) to the horizontal \\((\\sin 53^{\\circ} = 0.8,\\ g = 10\\ \\text{m/s}^{2})\\). Find its velocity 2 s after launch, and the fraction of its launch kinetic energy it has at the top.",
        steps: [
          "\\(v_x = 50(0.6) = 30\\ \\text{m/s}\\); \\(v_y = 40 - 10(2) = 20\\ \\text{m/s}\\).",
          "Speed \\(= \\sqrt{900 + 400} = 10\\sqrt{13} \\approx 36\\ \\text{m/s}\\), at \\(\\tan^{-1}\\tfrac{2}{3}\\) above the horizontal (still rising).",
          "At the top \\(K_{top}/K = \\cos^{2}53^{\\circ} = 0.36\\).",
        ],
        answer: "\\(10\\sqrt{13}\\ \\text{m/s}\\) at \\(\\tan^{-1}(2/3)\\) above the horizontal; 0.36 of K",
      },
      selfCheckExample: {
        prompt:
          "A projectile is at the same height 2 s and 6 s after launch \\((g = 10\\ \\text{m/s}^{2})\\). Find its time of flight, the vertical component of its launch velocity and that height.",
        steps: [
          "\\(T = 2 + 6 = 8\\ \\text{s}\\), so \\(u\\sin\\theta = \\dfrac{gT}{2} = 40\\ \\text{m/s}\\).",
          "\\(h = \\tfrac{1}{2}(10)(2)(6) = 60\\ \\text{m}\\). Check: \\(40(2) - 5(4) = 60\\).",
        ],
        answer: "8 s, 40 m/s, 60 m",
      },
      practiceSet: [
        { prompt: "Thrown with kinetic energy K at \\(45^{\\circ}\\). Kinetic energy at the top?", answer: "K/2" },
        { prompt: "Thrown at 30 m/s at \\(37^{\\circ}\\) \\((\\cos 37^{\\circ} = 0.8)\\). Speed at the top?", answer: "24 m/s" },
        { prompt: "A 0.5 kg ball thrown at 20 m/s at \\(30^{\\circ}\\) lands at its launch level. Change in its momentum?", answer: "10 kg m/s, downwards" },
      ],
      pyqExampleId: "117c0bcb-5e09-47c1-88f6-db19ca8c3267", // 22 Jan 2026 Shift 1: speed at 45° gives the launch speed
      traps: [
        {
          title: "Zero speed at the top",
          body: "Only the vertical velocity is zero at the top. The horizontal velocity u cos θ is still there, so the speed and the kinetic energy are not zero.",
        },
        {
          title: "cos θ instead of cos²θ",
          body: "Kinetic energy goes as speed squared. The speed at the top is u cos θ, so the kinetic energy there is K cos²θ: at 37° (cos 37° = 0.8) that is 0.64K, not 0.8K.",
        },
      ],
    },

    // C2 — equation of the trajectory
    {
      kind: "formula" as const,
      slug: "jpplane-trajectory",
      name: "Equation of the trajectory",
      intuition:
        "Eliminate t between x = u cos θ t and y = u sin θ t − ½gt², and the path comes out as y = x tan θ − (a constant) x²: a parabola opening downwards. Read it backwards when the question gives the path: the coefficient of x is the slope at launch, tan θ, and the coefficient of x² fixes the horizontal speed. The range and the height follow from the same two numbers.",
      definition:
        "- \\(y = x\\tan\\theta - \\dfrac{gx^{2}}{2u^{2}\\cos^{2}\\theta} = x\\tan\\theta\\left(1 - \\dfrac{x}{R}\\right)\\).\n" +
        "- Given \\(y = \\alpha x - \\beta x^{2}\\): \\(\\tan\\theta = \\alpha\\), \\(R = \\dfrac{\\alpha}{\\beta}\\), \\(H = \\dfrac{\\alpha^{2}}{4\\beta}\\) (at \\(x = R/2\\)), and \\(\\beta = \\dfrac{g}{2u_x^{2}}\\).\n" +
        "- The vertical launch speed is \\(u_y = \\alpha u_x\\).\n" +
        "- A point (x, y) on the path: substitute it into the equation to find u or θ.",
      formula: {
        label: "Path of a projectile",
        latex:
          "y = x\\tan\\theta - \\frac{gx^{2}}{2u^{2}\\cos^{2}\\theta} \\qquad y = \\alpha x - \\beta x^{2}:\\ R = \\frac{\\alpha}{\\beta},\\ H = \\frac{\\alpha^{2}}{4\\beta}",
      },
      authoredExample: {
        prompt:
          "A projectile follows \\(y = 2x - \\dfrac{x^{2}}{20}\\) (x, y in metres, \\(g = 10\\ \\text{m/s}^{2}\\)). Find the angle of projection, the range, the greatest height and the launch speed.",
        steps: [
          "\\(\\alpha = 2\\), \\(\\beta = \\tfrac{1}{20}\\): \\(\\tan\\theta = 2\\).",
          "\\(R = \\alpha/\\beta = 40\\ \\text{m}\\); \\(H = \\dfrac{4}{4/20} = 20\\ \\text{m}\\).",
          "\\(\\dfrac{g}{2u_x^{2}} = \\dfrac{1}{20}\\) gives \\(u_x = 10\\ \\text{m/s}\\); \\(u_y = 2u_x = 20\\ \\text{m/s}\\); \\(u = 10\\sqrt{5}\\ \\text{m/s}\\). Check: \\(H = u_y^{2}/2g = 20\\).",
        ],
        answer: "\\(\\tan^{-1}2\\); 40 m; 20 m; \\(10\\sqrt{5}\\ \\text{m/s}\\)",
      },
      selfCheckExample: {
        prompt:
          "A ball thrown from the ground at \\(53^{\\circ}\\) \\((\\tan 53^{\\circ} = 4/3,\\ \\cos 53^{\\circ} = 0.6)\\) passes through a point 15 m away horizontally and 15 m up. Find its launch speed \\((g = 10\\ \\text{m/s}^{2})\\).",
        steps: [
          "\\(15 = 15\\cdot\\dfrac{4}{3} - \\dfrac{10(225)}{2u^{2}(0.36)} = 20 - \\dfrac{3125}{u^{2}}\\).",
          "\\(u^{2} = 625\\), so \\(u = 25\\ \\text{m/s}\\). Check: \\(u_x = 15\\), so x = 15 m at t = 1 s, where \\(y = 20 - 5 = 15\\).",
        ],
        answer: "25 m/s",
      },
      practiceSet: [
        { prompt: "Path \\(y = x - 0.1x^{2}\\). Angle, range and greatest height?", answer: "\\(45^{\\circ}\\), 10 m, 2.5 m" },
        { prompt: "In \\(y = \\alpha x - \\beta x^{2}\\), what does \\(\\alpha\\) give?", answer: "tan θ, the slope at launch" },
        { prompt: "Path \\(y = 3x - 5x^{2}\\) \\((g = 10)\\). Horizontal launch speed?", answer: "1 m/s", method: "\\(g/(2u_x^{2}) = 5\\)." },
      ],
      pyqExampleId: "4a51d597-4e06-4482-bf54-8534c37c8d85", // 27 Jul 2022: path through a point, then momentum at T/√2
      traps: [
        {
          title: "Dropping the cos²θ",
          body: "The x² coefficient is g/(2u² cos²θ) = g/(2uₓ²): it uses the horizontal speed, not the launch speed. Using g/(2u²) gives the wrong speed.",
        },
        {
          title: "The top is at x = R/2",
          body: "The greatest height comes halfway across. Setting dy/dx = 0 gives x = α/2β, which is R/2; substituting gives H = α²/4β.",
        },
      ],
    },

    // C3 — thrown horizontally from a height
    {
      kind: "formula" as const,
      slug: "jpplane-from-height",
      name: "Thrown horizontally from a height",
      intuition:
        "A body thrown horizontally starts with no vertical velocity, so it falls exactly as a dropped body does: it takes √(2h/g) to reach the ground, however fast it is thrown. The horizontal speed only decides how far out it lands. A packet dropped from a plane is the same problem, with the plane's speed as the horizontal speed.",
      definition:
        "- Time of fall \\(t = \\sqrt{2h/g}\\); horizontal distance \\(x = u\\sqrt{2h/g}\\).\n" +
        "- Landing velocity: \\(v_x = u\\), \\(v_y = \\sqrt{2gh}\\), \\(v = \\sqrt{u^{2} + 2gh}\\), at \\(\\tan^{-1}\\dfrac{\\sqrt{2gh}}{u}\\) below the horizontal.\n" +
        "- Distance from the release point to the landing point: \\(\\sqrt{x^{2} + h^{2}}\\).\n" +
        "- Stairway, steps of height and width d: the ball reaches the level of step n at \\(x = u\\sqrt{2nd/g}\\) and lands on step n if \\(x \\le nd\\). The least speed to reach step n just clears the corner of step n − 1: \\(u^{2} = \\dfrac{g(n - 1)d}{2}\\).\n" +
        "- A body that falls from H and is turned horizontal at height h (speed kept) spends \\(\\sqrt{2(H - h)/g} + \\sqrt{2h/g}\\) in the air, greatest at \\(h = H/2\\).\n" +
        "- 'Thrown at an angle from a tower' may be above or below the horizontal: solve \\(-h = u_yt - \\tfrac{1}{2}gt^{2}\\) with the sign of \\(u_y\\) set by the stem.",
      formula: {
        label: "Horizontal projection from height h",
        latex: "t = \\sqrt{\\frac{2h}{g}} \\qquad x = u\\sqrt{\\frac{2h}{g}} \\qquad v = \\sqrt{u^{2} + 2gh}",
      },
      authoredExample: {
        prompt:
          "A stone is thrown horizontally at 15 m/s from the top of a 45 m tower \\((g = 10\\ \\text{m/s}^{2})\\). When and where does it land, and with what velocity?",
        steps: [
          "\\(t = \\sqrt{\\dfrac{2 \\times 45}{10}} = 3\\ \\text{s}\\); \\(x = 15 \\times 3 = 45\\ \\text{m}\\) from the foot.",
          "\\(v_y = 10 \\times 3 = 30\\ \\text{m/s}\\), \\(v_x = 15\\ \\text{m/s}\\).",
          "\\(v = \\sqrt{225 + 900} = 15\\sqrt{5} \\approx 33.5\\ \\text{m/s}\\), at \\(\\tan^{-1}2\\) below the horizontal.",
        ],
        answer: "After 3 s, 45 m from the foot; \\(15\\sqrt{5}\\ \\text{m/s}\\) at \\(\\tan^{-1}2\\) below the horizontal",
      },
      selfCheckExample: {
        prompt:
          "A ball rolls off the top of a stairway at 1.5 m/s. Each step is 0.2 m high and 0.2 m wide. On which step does it first land? \\((g = 10\\ \\text{m/s}^{2})\\)",
        steps: [
          "At the level of step n it has fallen 0.2n m, which takes \\(\\sqrt{0.04n}\\) s, so \\(x = 1.5\\sqrt{0.04n} = 0.3\\sqrt{n}\\).",
          "It lands on step n when \\(0.3\\sqrt{n} \\le 0.2n\\), that is \\(\\sqrt{n} \\ge 1.5\\), \\(n \\ge 2.25\\).",
          "So n = 3: there \\(x \\approx 0.52\\ \\text{m}\\), between 0.4 m and 0.6 m.",
        ],
        answer: "The third step",
      },
      practiceSet: [
        { prompt: "Thrown horizontally at 10 m/s from 80 m \\((g = 10)\\). Time and distance from the foot?", answer: "4 s and 40 m" },
        { prompt: "A plane at 500 m flying at 100 m/s drops a packet \\((g = 10)\\). How far ahead of the release point does it land?", answer: "1000 m" },
        { prompt: "The height of a cliff is made four times, the throwing speed kept. Effect on the distance from the foot?", answer: "Doubled" },
      ],
      pyqExampleId: "e2ce7815-4415-4b28-b769-5ca42c4401e8", // 7 Apr 2025: object dropped from a helicopter, displacement of the landing point
      traps: [
        {
          title: "Giving the horizontally thrown body a vertical speed",
          body: "Thrown horizontally means v_y = 0 at release. The time of fall is √(2h/g), the same as dropping it; a faster throw lands farther out but not sooner.",
        },
        {
          title: "Horizontal distance is not displacement",
          body: "The landing point is x out and h down from the release point. The displacement is √(x² + h²); the horizontal distance x alone is a common wrong option.",
        },
      ],
    },
  ],
};
