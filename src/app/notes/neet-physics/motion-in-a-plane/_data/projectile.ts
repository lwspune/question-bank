import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_MP_PROJECTILE_NOTE: SubtopicNote = {
  subtopicName: "Vectors and Projectile Motion",
  title: "Vectors and Projectile Motion",
  oneLineDefinition:
    "Adding and resolving vectors, the dot and cross products, relative velocity, and a projectile's motion split into a steady horizontal part and a vertical part pulled by g, with its height, time of flight and range.",
  whyItMatters:
    "Four NEET questions, all from 2021 to 2023 and none since. One drops a ball from an accelerating car and asks its velocity two seconds later (2021), one asks the speed at the top of the path when the angle is given from the vertical (2022), one asks a bullet's maximum height (2023), and one takes a speed from a body going round a circle and asks the angle that lifts it to a height of 4R (2021). No past-year question tests vectors alone, but every one of these splits a velocity into parts.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphmp-vectors",
      name: "Vectors and velocity in a plane",
      intuition:
        "A vector has a size and a direction, so two of them add like arrows, tip to tail, not like plain numbers. The easy way to handle any vector in a plane is to split it into a part along x and a part along y. Add all the x parts, add all the y parts, then rebuild the result. Motion works the same way: the x part and the y part of a velocity change on their own, each by its own acceleration.",
      definition:
        "- Two vectors A and B at an angle θ add to \\(R = \\sqrt{A^{2} + B^{2} + 2AB\\cos\\theta}\\). The resultant lies between \\(|A - B|\\) and \\(A + B\\); at right angles it is \\(\\sqrt{A^{2} + B^{2}}\\).\n" +
        "- Components at angle θ from the x-axis: \\(A_x = A\\cos\\theta\\), \\(A_y = A\\sin\\theta\\). Size: \\(A = \\sqrt{A_x^{2} + A_y^{2} + A_z^{2}}\\). **Unit vector**: \\(\\hat{A} = \\dfrac{\\vec{A}}{A}\\), size 1.\n" +
        "- **Dot product**: \\(\\vec{A}\\cdot\\vec{B} = AB\\cos\\theta = A_xB_x + A_yB_y + A_zB_z\\), a scalar. It is zero when the vectors are perpendicular.\n" +
        "- **Cross product**: \\(|\\vec{A}\\times\\vec{B}| = AB\\sin\\theta\\), a vector perpendicular to both. It is zero when they are parallel, and \\(\\vec{B}\\times\\vec{A} = -\\vec{A}\\times\\vec{B}\\).\n" +
        "- **Relative velocity**: the velocity of A as seen from B is \\(\\vec{v}_{AB} = \\vec{v}_A - \\vec{v}_B\\).\n" +
        "- Constant acceleration in a plane: \\(\\vec{v} = \\vec{u} + \\vec{a}t\\), worked one component at a time. A body let go from a moving vehicle starts with the vehicle's velocity at that instant, and after that only gravity acts on it.",
      formula: {
        label: "Vectors in a plane",
        latex:
          "R = \\sqrt{A^{2} + B^{2} + 2AB\\cos\\theta}, \\qquad \\vec{A}\\cdot\\vec{B} = AB\\cos\\theta, \\qquad \\vec{v}_{AB} = \\vec{v}_A - \\vec{v}_B",
        symbols: [
          { symbol: "\\(\\theta\\)", meaning: "angle between the two vectors" },
          { symbol: "\\(\\vec{v}_{AB}\\)", meaning: "velocity of A relative to B" },
        ],
      },
      authoredExample: {
        prompt: "Two forces of 3 N and 5 N act at a point with an angle of \\(60^{\\circ}\\) between them. Find the size of their resultant.",
        steps: [
          "\\(R^{2} = 3^{2} + 5^{2} + 2(3)(5)\\cos 60^{\\circ}\\).",
          "\\(R^{2} = 9 + 25 + 15 = 49\\), so \\(R = 7\\ \\text{N}\\).",
        ],
        answer: "7 N",
      },
      selfCheckExample: {
        prompt:
          "For what value of a are the vectors \\(2\\hat{i} + a\\hat{j} + \\hat{k}\\) and \\(3\\hat{i} - 2\\hat{j} + 4\\hat{k}\\) perpendicular?",
        steps: [
          "Perpendicular vectors have a zero dot product.",
          "\\((2)(3) + (a)(-2) + (1)(4) = 0\\), so \\(10 - 2a = 0\\).",
        ],
        answer: "a = 5",
      },
      practiceSet: [
        {
          prompt: "Rain falls straight down at 6 m/s. A man walks along a level road at 8 m/s. How fast does the rain appear to fall to him?",
          answer: "10 m/s",
          method: "\\(\\vec{v}_{\\text{rain}} - \\vec{v}_{\\text{man}}\\) has parts 6 and 8 at right angles.",
        },
        { prompt: "Write the unit vector along \\(3\\hat{i} + 4\\hat{j}\\).", answer: "\\(\\dfrac{3\\hat{i} + 4\\hat{j}}{5}\\)" },
        { prompt: "What is the angle between \\(\\vec{A}\\times\\vec{B}\\) and \\(\\vec{A}\\)?", answer: "\\(90^{\\circ}\\)" },
        {
          prompt: "A velocity of 10 m/s makes \\(30^{\\circ}\\) with the x-axis. Find its x and y components.",
          answer: "\\(5\\sqrt{3}\\) m/s and 5 m/s",
        },
      ],
      pyqExampleId: "0472d26f-fec9-4563-9486-b12460e563a7",
      traps: [
        {
          title: "Sizes do not simply add",
          body: "A 3 N and a 4 N force give 7 N only when they point the same way. At right angles they give 5 N; at any other angle use \\(R^{2} = A^{2} + B^{2} + 2AB\\cos\\theta\\).",
        },
        {
          title: "Dot zero, cross zero",
          body: "A zero dot product means the vectors are perpendicular. A zero cross product means they are parallel (or opposite). Mixing the two up flips the answer.",
        },
        {
          title: "Relative velocity is a subtraction",
          body: "The velocity of A seen from B is \\(\\vec{v}_A - \\vec{v}_B\\), worked as vectors. For two cars moving at right angles, the relative speed is \\(\\sqrt{v_A^{2} + v_B^{2}}\\), not \\(v_A - v_B\\).",
        },
        {
          title: "A dropped body keeps the velocity, not the acceleration",
          body: "A ball let go from an accelerating car or train starts with the vehicle's velocity at that moment. The vehicle's acceleration does not go with it: once released, its only acceleration is g downward.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphmp-projectile",
      name: "Projectile motion: the two parts of the velocity",
      visualizationSlug: "kin-projectile-parabola",
      intuition:
        "Once a ball leaves the hand, the only force on it (ignoring air) is its weight, which is vertical. So nothing changes its horizontal velocity: that part stays the same all the way. The vertical part starts upward, falls by g every second, becomes zero at the top and then grows downward. Put the two parts together and the path is a parabola.",
      definition:
        "- Launched with speed u at angle θ above the horizontal: \\(u_x = u\\cos\\theta\\), \\(u_y = u\\sin\\theta\\).\n" +
        "- At time t: \\(v_x = u\\cos\\theta\\) (never changes) and \\(v_y = u\\sin\\theta - gt\\). Position: \\(x = (u\\cos\\theta)t\\), \\(y = (u\\sin\\theta)t - \\tfrac{1}{2}gt^{2}\\).\n" +
        "- **Path**: \\(y = x\\tan\\theta - \\dfrac{gx^{2}}{2u^{2}\\cos^{2}\\theta}\\), a parabola. The number in front of x is \\(\\tan\\theta\\).\n" +
        "- The acceleration is g downward at every point, the top included. At the top \\(v_y = 0\\), so the speed there is \\(u\\cos\\theta\\), the smallest on the path, and only there is the velocity perpendicular to the acceleration.\n" +
        "- Thrown horizontally with speed u from a height h: it falls like a dropped body, so \\(t = \\sqrt{\\dfrac{2h}{g}}\\), and it lands \\(u\\sqrt{\\dfrac{2h}{g}}\\) away.\n" +
        "- If the angle is given from the vertical, the angle from the horizontal is \\(90^{\\circ}\\) minus it.",
      formula: {
        label: "Velocity of a projectile",
        latex:
          "v_x = u\\cos\\theta, \\qquad v_y = u\\sin\\theta - gt, \\qquad y = x\\tan\\theta - \\frac{gx^{2}}{2u^{2}\\cos^{2}\\theta}",
        symbols: [
          { symbol: "\\(u\\)", meaning: "speed of projection" },
          { symbol: "\\(\\theta\\)", meaning: "angle of projection above the horizontal" },
        ],
      },
      authoredExample: {
        prompt:
          "A stone is thrown horizontally at 15 m/s from the top of a cliff 20 m high. Take g = 10 m/s². How long does it take to reach the ground, how far from the foot of the cliff does it land, and with what speed?",
        steps: [
          "Vertically it starts from rest: \\(20 = \\tfrac{1}{2}(10)t^{2}\\), so \\(t = 2\\ \\text{s}\\).",
          "Horizontally: \\(x = 15 \\times 2 = 30\\ \\text{m}\\).",
          "On landing \\(v_x = 15\\) and \\(v_y = 10 \\times 2 = 20\\), so \\(v = \\sqrt{15^{2} + 20^{2}} = 25\\ \\text{m/s}\\).",
        ],
        answer: "2 s, 30 m, 25 m/s",
      },
      selfCheckExample: {
        prompt:
          "A ball is projected at 25 m/s at an angle θ above the horizontal, with sin θ = 0.8 and cos θ = 0.6. Take g = 10 m/s². Find its velocity components and its speed 1 s later.",
        steps: [
          "\\(v_x = 25 \\times 0.6 = 15\\ \\text{m/s}\\), the same as at launch.",
          "\\(v_y = 25 \\times 0.8 - 10 \\times 1 = 10\\ \\text{m/s}\\), still upward.",
          "\\(v = \\sqrt{15^{2} + 10^{2}} = \\sqrt{325} \\approx 18\\ \\text{m/s}\\).",
        ],
        answer: "15 m/s and 10 m/s; about 18 m/s",
      },
      practiceSet: [
        {
          prompt: "A particle is projected with velocity \\((5\\hat{i} + 10\\hat{j})\\) m/s, with g = 10 m/s² along \\(-\\hat{j}\\). Write the equation of its path.",
          answer: "\\(y = 2x - \\dfrac{x^{2}}{5}\\)",
          method: "\\(t = x/5\\), then \\(y = 10t - 5t^{2}\\).",
        },
        { prompt: "At how many points of a projectile's path is its velocity perpendicular to its acceleration?", answer: "One: the highest point" },
        {
          prompt: "A ball is projected at 20 m/s at \\(30^{\\circ}\\) above the horizontal. Take g = 10 m/s². After how long does its vertical velocity become zero?",
          answer: "1 s",
          method: "\\(t = \\dfrac{u\\sin\\theta}{g} = \\dfrac{10}{10}\\).",
        },
        { prompt: "A projectile's path is \\(y = x - \\dfrac{x^{2}}{40}\\), in metres. What is its angle of projection?", answer: "\\(45^{\\circ}\\)" },
      ],
      pyqExampleId: "8c337d88-e650-4f07-9e93-d1ae897a7bcd",
      traps: [
        {
          title: "The speed at the top is not zero",
          body: "At the highest point only the vertical part of the velocity is zero. The horizontal part \\(u\\cos\\theta\\) is still there, so the speed is \\(u\\cos\\theta\\).",
        },
        {
          title: "An angle from the vertical",
          body: "A ball thrown at \\(60^{\\circ}\\) to the vertical is thrown at \\(30^{\\circ}\\) to the horizontal. Convert first, then use \\(u\\cos\\theta\\) and \\(u\\sin\\theta\\) with the angle from the horizontal.",
        },
        {
          title: "The acceleration at the top is still g",
          body: "Gravity does not switch off at the top of the path. The acceleration of a projectile is g downward at every point, so it is neither zero nor smallest at the top.",
        },
        {
          title: "Horizontal speed does not change the fall time",
          body: "A body thrown horizontally from a height h reaches the ground in \\(\\sqrt{2h/g}\\), the same time as one dropped from rest. A faster throw only makes it land farther away.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphmp-height-range",
      name: "Maximum height, time of flight and range",
      intuition:
        "The vertical part of the velocity decides how long the ball stays up and how high it goes. The horizontal part then decides how far it travels in that time. So time of flight and height depend on u sin θ alone, while the range needs both parts. That is why a steep throw goes high and a flat throw goes low, and 45° in between sends it farthest.",
      definition:
        "- These hold when the ball lands at the level it was thrown from.\n" +
        "- Time of flight \\(T = \\dfrac{2u\\sin\\theta}{g}\\). Maximum height \\(H = \\dfrac{u^{2}\\sin^{2}\\theta}{2g}\\). Range \\(R = \\dfrac{u^{2}\\sin 2\\theta}{g}\\).\n" +
        "- The range is largest at \\(\\theta = 45^{\\circ}\\): \\(R_{\\max} = \\dfrac{u^{2}}{g}\\), and then \\(H = \\dfrac{R_{\\max}}{4}\\).\n" +
        "- Angles θ and \\(90^{\\circ} - \\theta\\) give the same range, but different heights and times.\n" +
        "- Two useful links: \\(H = \\dfrac{gT^{2}}{8}\\) and \\(\\tan\\theta = \\dfrac{4H}{R}\\).\n" +
        "- Launched from a height (a tower, a cliff), these formulas do not apply: use \\(y = (u\\sin\\theta)t - \\tfrac{1}{2}gt^{2}\\) with the real drop.",
      formula: {
        label: "Height, time and range",
        latex:
          "T = \\frac{2u\\sin\\theta}{g}, \\qquad H = \\frac{u^{2}\\sin^{2}\\theta}{2g}, \\qquad R = \\frac{u^{2}\\sin 2\\theta}{g}",
      },
      authoredExample: {
        prompt:
          "A ball is kicked at 20 m/s at \\(60^{\\circ}\\) above level ground. Take g = 10 m/s². Find its time of flight and its range, and the other angle that gives the same range.",
        steps: [
          "\\(T = \\dfrac{2 \\times 20 \\times \\sin 60^{\\circ}}{10} = 2\\sqrt{3} \\approx 3.5\\ \\text{s}\\).",
          "\\(R = \\dfrac{20^{2}\\sin 120^{\\circ}}{10} = 40 \\times \\dfrac{\\sqrt{3}}{2} = 20\\sqrt{3} \\approx 34.6\\ \\text{m}\\).",
          "The same range comes from \\(90^{\\circ} - 60^{\\circ} = 30^{\\circ}\\).",
        ],
        answer: "about 3.5 s, about 34.6 m, and \\(30^{\\circ}\\)",
      },
      selfCheckExample: {
        prompt: "A ball thrown at \\(45^{\\circ}\\) lands 40 m away on level ground. What was its maximum height?",
        steps: [
          "At \\(45^{\\circ}\\) the range is the largest one, \\(\\dfrac{u^{2}}{g} = 40\\ \\text{m}\\).",
          "\\(H = \\dfrac{u^{2}\\sin^{2}45^{\\circ}}{2g} = \\dfrac{40 \\times 0.5}{2} = 10\\ \\text{m}\\), that is a quarter of the range.",
        ],
        answer: "10 m",
      },
      practiceSet: [
        { prompt: "What is the largest range of a ball thrown at 30 m/s on level ground? Take g = 10 m/s².", answer: "90 m, at \\(45^{\\circ}\\)" },
        { prompt: "Two balls are thrown with the same speed at \\(25^{\\circ}\\) and \\(65^{\\circ}\\). How do their ranges compare?", answer: "They are equal" },
        {
          prompt: "A projectile stays in the air for 4 s on level ground. Take g = 10 m/s². What is its maximum height?",
          answer: "20 m",
          method: "\\(H = \\dfrac{gT^{2}}{8} = \\dfrac{10 \\times 16}{8}\\).",
        },
        { prompt: "A projectile's range equals its maximum height. What is \\(\\tan\\theta\\) for its angle of projection?", answer: "4", method: "\\(\\tan\\theta = \\dfrac{4H}{R}\\)." },
      ],
      pyqExampleId: "1a6d6239-d724-4110-990b-fd0e0cff2fbd",
      traps: [
        {
          title: "sin squared for height, sin 2θ for range",
          body: "Height uses \\(\\sin^{2}\\theta\\) over 2g; range uses \\(\\sin 2\\theta\\) over g. Swapping them is the commonest slip on this page.",
        },
        {
          title: "Equal ranges, unequal heights",
          body: "Throws at θ and \\(90^{\\circ} - \\theta\\) land at the same place, but the steeper one goes higher and stays up longer.",
        },
        {
          title: "Level ground only",
          body: "\\(T = \\dfrac{2u\\sin\\theta}{g}\\) and \\(R = \\dfrac{u^{2}\\sin 2\\theta}{g}\\) assume the ball lands at its launch height. From the top of a tower, solve \\(y = (u\\sin\\theta)t - \\tfrac{1}{2}gt^{2}\\) with the real drop instead.",
        },
      ],
    },
  ],
};
