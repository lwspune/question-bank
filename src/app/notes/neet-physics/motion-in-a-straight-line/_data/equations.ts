import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_MS_EQUATIONS_NOTE: SubtopicNote = {
  subtopicName: "Uniform Acceleration and Free Fall",
  title: "Uniform Acceleration and Free Fall",
  oneLineDefinition:
    "The three equations of uniformly accelerated motion, the distance covered in the nth second, and motion under gravity for a body dropped or thrown straight up.",
  whyItMatters:
    "Seven NEET questions from 2021 to 2026, the most of any page. Two use the nth-second formula (a block on a smooth incline in 2021, the 1 : 3 : 5 : 7 ratio of a falling body in 2022), one stops a bullet inside a wooden block in 2023, and four are about gravity: the height where kinetic energy is three times potential energy (2021), a ball thrown up from a bridge (2023), and in 2026 a falling ruler caught after different reaction times and the velocity-time graph of a ball thrown up.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphms-equations",
      name: "Equations of uniformly accelerated motion",
      intuition:
        "When the acceleration stays the same, five quantities describe the motion: the starting velocity u, the final velocity v, the acceleration a, the time t and the displacement s. Each equation of motion leaves one of them out. Pick the equation that leaves out the quantity you neither know nor need, and the problem takes one line.",
      definition:
        "- \\(v = u + at\\) (no s).\n" +
        "- \\(s = ut + \\tfrac{1}{2}at^{2}\\) (no v).\n" +
        "- \\(v^{2} = u^{2} + 2as\\) (no t).\n" +
        "- \\(s = \\dfrac{u + v}{2}\\,t\\) (no a): the average velocity is the mean of the start and end velocities, true only for uniform acceleration.\n" +
        "- Take one direction as positive. A body slowing down has a negative a.\n" +
        "- Stopping distance from speed u with retardation a: \\(s = \\dfrac{u^{2}}{2a}\\), so it goes as the square of the speed.",
      formula: {
        label: "Equations of motion",
        latex: "v = u + at, \\qquad s = ut + \\tfrac{1}{2}at^{2}, \\qquad v^{2} = u^{2} + 2as",
        symbols: [
          { symbol: "\\(u\\)", meaning: "initial velocity" },
          { symbol: "\\(v\\)", meaning: "final velocity" },
          { symbol: "\\(a\\)", meaning: "constant acceleration" },
          { symbol: "\\(s\\)", meaning: "displacement in time t" },
        ],
      },
      authoredExample: {
        prompt:
          "A car moving at 20 m/s brakes with a uniform retardation of \\(5\\ \\text{m/s}^{2}\\). Find the time it takes to stop and the distance it covers while stopping.",
        steps: [
          "\\(0 = 20 - 5t\\), so \\(t = 4\\ \\text{s}\\).",
          "\\(0 = 20^{2} - 2 \\times 5 \\times s\\), so \\(s = \\dfrac{400}{10} = 40\\ \\text{m}\\).",
        ],
        answer: "4 s and 40 m",
      },
      selfCheckExample: {
        prompt:
          "A car's stopping distance is 10 m when it moves at 36 km/h. With the same braking, what is its stopping distance at 72 km/h?",
        steps: [
          "\\(s = \\dfrac{u^{2}}{2a}\\), so with a fixed, \\(s \\propto u^{2}\\).",
          "The speed doubles, so the distance becomes \\(2^{2} = 4\\) times: \\(4 \\times 10 = 40\\ \\text{m}\\).",
        ],
        answer: "40 m",
      },
      practiceSet: [
        { prompt: "A body starts from rest with acceleration \\(2\\ \\text{m/s}^{2}\\). How far does it go in 5 s?", answer: "25 m" },
        { prompt: "A body's velocity rises uniformly from 10 m/s to 30 m/s in 4 s. How far does it go in that time?", answer: "80 m" },
        { prompt: "A scooter at 15 m/s stops in 3 s with uniform retardation. What is the retardation?", answer: "\\(5\\ \\text{m/s}^{2}\\)" },
        { prompt: "A body with initial velocity 5 m/s and acceleration \\(2\\ \\text{m/s}^{2}\\) covers 50 m. What is its final velocity?", answer: "15 m/s" },
      ],
      pyqExampleId: "868a9e58-d8d8-49d1-9e65-06316685957b",
      traps: [
        {
          title: "Only for constant acceleration",
          body: "The equations of motion hold only when the acceleration does not change. If it changes with time, use \\(v = \\dfrac{dx}{dt}\\) and integration instead.",
        },
        {
          title: "Stopping distance goes as the speed squared",
          body: "Doubling the speed makes the stopping distance four times, not two times, for the same braking.",
        },
        {
          title: "Losing half the speed is not covering half the distance",
          body: "A body slowing uniformly from u to \\(\\dfrac{u}{2}\\) has already covered three quarters of its full stopping distance, because distance depends on \\(u^{2} - v^{2}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphms-nth-second",
      name: "Distance in the nth second",
      intuition:
        "The distance covered during one particular second, say the 5th, is the distance covered in 5 s minus the distance covered in 4 s. For a body starting from rest with uniform acceleration, these one-second distances grow as the odd numbers 1, 3, 5, 7, while the total distances after 1, 2, 3 seconds grow as the squares 1, 4, 9.",
      definition:
        "- Distance in the nth second: \\(s_{n} = u + \\dfrac{a}{2}(2n - 1)\\).\n" +
        "- From rest: \\(s_1 : s_2 : s_3 : s_4 = 1 : 3 : 5 : 7\\).\n" +
        "- From rest, total distances after 1 s, 2 s, 3 s: \\(1 : 4 : 9\\).\n" +
        "- Two seconds one after the other differ by a: \\(s_{n+1} - s_{n} = a\\).",
      formula: {
        label: "Distance in the nth second",
        latex: "s_{n} = u + \\frac{a}{2}(2n - 1)",
        symbols: [
          { symbol: "\\(s_{n}\\)", meaning: "distance covered during the nth second only" },
        ],
      },
      authoredExample: {
        prompt:
          "A body moves with initial velocity 4 m/s and uniform acceleration \\(2\\ \\text{m/s}^{2}\\). How far does it go in the 5th second?",
        steps: [
          "\\(s_{5} = 4 + \\dfrac{2}{2}(2 \\times 5 - 1) = 4 + 9 = 13\\ \\text{m}\\).",
          "Check: in 5 s it covers \\(20 + 25 = 45\\ \\text{m}\\), in 4 s it covers \\(16 + 16 = 32\\ \\text{m}\\), and \\(45 - 32 = 13\\ \\text{m}\\).",
        ],
        answer: "13 m",
      },
      selfCheckExample: {
        prompt:
          "A body starting from rest with uniform acceleration covers 9 m in its 5th second. What is its acceleration?",
        steps: [
          "\\(s_{5} = 0 + \\dfrac{a}{2}(2 \\times 5 - 1) = \\dfrac{9a}{2}\\).",
          "\\(\\dfrac{9a}{2} = 9\\), so \\(a = 2\\ \\text{m/s}^{2}\\).",
        ],
        answer: "\\(2\\ \\text{m/s}^{2}\\)",
      },
      practiceSet: [
        { prompt: "A body starting from rest with uniform acceleration covers 2 m in its 1st second. How far does it go in its 3rd second?", answer: "10 m" },
        { prompt: "A body starts from rest with acceleration \\(4\\ \\text{m/s}^{2}\\). How far does it go in its 2nd second?", answer: "6 m" },
        { prompt: "A body starts from rest with uniform acceleration. What is the ratio of the total distances it covers in 1 s, 2 s and 3 s?", answer: "1 : 4 : 9" },
        { prompt: "A body has uniform acceleration \\(3\\ \\text{m/s}^{2}\\). By how much does the distance in its 6th second exceed the distance in its 5th second?", answer: "3 m" },
      ],
      pyqExampleId: "63a3c603-1742-45c9-bd02-8972ff083673",
      traps: [
        {
          title: "In the nth second is not in n seconds",
          body: "\\(s_{n}\\) is the distance covered in one second only. The distance covered in the first n seconds is \\(un + \\tfrac{1}{2}an^{2}\\).",
        },
        {
          title: "The odd-number ratio needs a start from rest",
          body: "The ratio 1 : 3 : 5 : 7 holds only when \\(u = 0\\). With a starting velocity, use \\(s_{n} = u + \\dfrac{a}{2}(2n - 1)\\) for each second.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphms-free-fall",
      name: "Free fall from rest",
      intuition:
        "Near the Earth's surface, with air resistance neglected, every body falls with the same acceleration g, about 9.8 m/s², whatever its mass. A body dropped from rest is just uniform acceleration with \\(u = 0\\) and \\(a = g\\). The distance fallen grows as the square of the time, which is why a dropped ruler falls much further when you are slow to catch it.",
      definition:
        "- Taking down as positive: \\(h = \\tfrac{1}{2}gt^{2}\\), \\(v = gt\\), \\(v^{2} = 2gh\\).\n" +
        "- Mass does not appear: a heavy and a light body dropped together land together if air resistance is neglected.\n" +
        "- A ruler dropped and caught after a reaction time \\(t_r\\) falls \\(d = \\tfrac{1}{2}gt_r^{2}\\), so a longer reaction time means a longer fall.\n" +
        "- After falling a height h from rest, the body's kinetic energy is mgh, the potential energy it has lost.",
      formula: {
        label: "Falling from rest",
        latex: "h = \\tfrac{1}{2}gt^{2}, \\qquad v = gt, \\qquad v = \\sqrt{2gh}",
      },
      authoredExample: {
        prompt:
          "A stone is dropped from a tower 45 m high \\((g = 10\\ \\text{m/s}^{2})\\). How long does it take to reach the ground, and how fast is it moving then?",
        steps: [
          "\\(45 = \\tfrac{1}{2} \\times 10 \\times t^{2} = 5t^{2}\\), so \\(t^{2} = 9\\) and \\(t = 3\\ \\text{s}\\).",
          "\\(v = gt = 10 \\times 3 = 30\\ \\text{m/s}\\).",
        ],
        answer: "3 s and 30 m/s",
      },
      selfCheckExample: {
        prompt:
          "A body is dropped from a height H. At what height above the ground is its speed half of its landing speed?",
        steps: [
          "\\(v^{2} = 2g \\times (\\text{distance fallen})\\), so half the speed means a quarter of the distance fallen.",
          "Landing means falling H, so half the landing speed comes after falling \\(\\dfrac{H}{4}\\).",
          "Height above the ground \\(= H - \\dfrac{H}{4} = \\dfrac{3H}{4}\\).",
        ],
        answer: "\\(\\dfrac{3H}{4}\\)",
      },
      practiceSet: [
        { prompt: "A ball is dropped from a height of 80 m \\((g = 10\\ \\text{m/s}^{2})\\). How long does it take to reach the ground?", answer: "4 s" },
        { prompt: "A heavy ball and a light ball are dropped together from the same height, with air resistance neglected. Which lands first?", answer: "They land together" },
        { prompt: "How fast is a body moving after falling 5 m from rest \\((g = 10\\ \\text{m/s}^{2})\\)?", answer: "10 m/s" },
        { prompt: "A body dropped from rest falls 4.9 m in its first second. How far does it fall in its first 2 s?", answer: "19.6 m" },
      ],
      pyqExampleId: "44e68b1a-dfac-4a18-9b17-33a58f590f68",
      traps: [
        {
          title: "Mass does not change g",
          body: "With air resistance neglected, a heavier body does not fall faster. Every body has the same acceleration g.",
        },
        {
          title: "Use the value of g the question gives",
          body: "Work with \\(g = 10\\ \\text{m/s}^{2}\\) or \\(9.8\\ \\text{m/s}^{2}\\), whichever the question states. Mixing them shifts the answer onto a wrong option.",
        },
        {
          title: "Distance fallen grows as the time squared",
          body: "Falling from rest for twice the time covers four times the distance, not twice. In \\(h = \\tfrac{1}{2}gt^{2}\\) the time is squared.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphms-thrown-up",
      name: "Thrown straight up",
      intuition:
        "A ball thrown straight up loses g of speed every second, stops for an instant at the top and then falls back. All the way, the acceleration is g downwards, even at the top where the velocity is zero. So one set of equations covers the whole flight: take up as positive and put the acceleration as minus g. A displacement that comes out negative simply means the ball is below the point it was thrown from.",
      definition:
        "- Up positive: \\(v = u - gt\\), \\(s = ut - \\tfrac{1}{2}gt^{2}\\), \\(v^{2} = u^{2} - 2gs\\).\n" +
        "- Time to the top: \\(\\dfrac{u}{g}\\). Greatest height: \\(\\dfrac{u^{2}}{2g}\\). Back at the hand after \\(\\dfrac{2u}{g}\\), moving at speed u.\n" +
        "- A negative s means the ball is below the point of throw, as when it falls past a bridge or a tower.\n" +
        "- At the top the velocity is zero but the acceleration is still g downwards.\n" +
        "- The velocity-time graph is one straight line of slope \\(-g\\): it starts at \\(+u\\), crosses zero at the top and goes on to negative values.",
      formula: {
        label: "Thrown up, up taken as positive",
        latex: "v = u - gt, \\qquad s = ut - \\tfrac{1}{2}gt^{2}, \\qquad H = \\frac{u^{2}}{2g}",
        symbols: [
          { symbol: "\\(H\\)", meaning: "greatest height above the point of throw" },
        ],
      },
      authoredExample: {
        prompt:
          "A ball is thrown up at 20 m/s \\((g = 10\\ \\text{m/s}^{2})\\). Find its greatest height and the time it takes to come back to the hand.",
        steps: [
          "\\(H = \\dfrac{u^{2}}{2g} = \\dfrac{400}{20} = 20\\ \\text{m}\\).",
          "Back at the hand when \\(s = 0\\): \\(0 = 20t - 5t^{2}\\), so \\(t = 4\\ \\text{s}\\).",
        ],
        answer: "20 m and 4 s",
      },
      selfCheckExample: {
        prompt:
          "A ball is thrown up at 20 m/s \\((g = 10\\ \\text{m/s}^{2})\\). At what times is it 15 m above the point of throw?",
        steps: [
          "\\(15 = 20t - 5t^{2}\\), that is \\(t^{2} - 4t + 3 = 0\\).",
          "\\((t - 1)(t - 3) = 0\\), so \\(t = 1\\ \\text{s}\\) going up and \\(t = 3\\ \\text{s}\\) coming down.",
        ],
        answer: "1 s and 3 s",
      },
      practiceSet: [
        { prompt: "A ball thrown straight up comes back to the thrower after 6 s \\((g = 10\\ \\text{m/s}^{2})\\). How fast was it thrown?", answer: "30 m/s" },
        { prompt: "What are the velocity and acceleration of a ball at the top of its upward flight?", answer: "Velocity zero; acceleration g downwards" },
        { prompt: "With up taken as positive, what does the velocity-time graph of a ball thrown up and caught look like?", answer: "One straight line of slope \\(-g\\), crossing the time axis at the top" },
        { prompt: "How high does a ball thrown straight up at 30 m/s rise \\((g = 10\\ \\text{m/s}^{2})\\)?", answer: "45 m" },
      ],
      pyqExampleId: "c3310a73-007b-4bb7-8556-6155d40cf714",
      traps: [
        {
          title: "Zero velocity at the top, not zero acceleration",
          body: "At the highest point the ball stops for an instant, but gravity still acts, so its acceleration is g downwards.",
        },
        {
          title: "Keep the sign of the displacement",
          body: "When the ball lands below the point of throw, its displacement is negative. With \\(s = ut - \\tfrac{1}{2}gt^{2}\\) for the whole flight, a negative s gives the depth below the start; there is no need to split the flight at the top.",
        },
        {
          title: "Velocity changes sign, speed does not",
          body: "The velocity-time graph of the flight is one straight line through zero. A V-shaped graph is the speed, not the velocity.",
        },
      ],
    },
  ],
};
