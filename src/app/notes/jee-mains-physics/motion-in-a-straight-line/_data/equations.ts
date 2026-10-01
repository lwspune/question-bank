import type { SubtopicNote } from "@/app/notes/_types";

export const EQUATIONS_SL_NOTE: SubtopicNote = {
  subtopicName: "Equations of Uniformly Accelerated Motion",
  title: "Equations of Uniformly Accelerated Motion",
  oneLineDefinition:
    "Under constant acceleration, v = u + at, s = ut + ½at² and v² = u² + 2as; pick the one that leaves out the quantity you are neither given nor asked for.",
  whyItMatters:
    "Twenty-one PYQs, nine of them asking for a number, and two from 2026. Nine apply the equations to one stretch of motion, six are about braking and stopping distances, and six about the distance covered in one particular second. The algebra is short; what costs marks is a sign on a retardation or an \"in the nth second\" read as \"in n seconds\".",
  concepts: [
    // C1 — choosing the equation
    {
      kind: "formula" as const,
      slug: "jpsl-pick-equation",
      name: "Choosing the right equation of motion",
      intuition:
        "Each equation links four of the five quantities u, v, a, s and t. List what is given and what is asked; the one quantity that is neither tells you which equation to use. When a body speeds up and then slows down, draw the velocity–time graph: it is a triangle, and its area is the distance.",
      definition:
        "- No s: \\(v = u + at\\). No v: \\(s = ut + \\tfrac{1}{2}at^{2}\\). No t: \\(v^{2} = u^{2} + 2as\\). No a: \\(s = \\dfrac{u + v}{2}\\,t\\).\n" +
        "- Speed at the MIDDLE of a distance (the middle of a train passing a post): \\(v_m = \\sqrt{\\dfrac{u^{2} + v^{2}}{2}}\\). Speed at the middle of the TIME: \\(\\dfrac{u + v}{2}\\).\n" +
        "- Speeding up at \\(\\alpha\\) from rest, then braking at \\(\\beta\\) to rest, total time t: \\(v_{max} = \\dfrac{\\alpha\\beta t}{\\alpha + \\beta}\\), distance \\(= \\tfrac{1}{2}v_{max}t = \\dfrac{\\alpha\\beta t^{2}}{2(\\alpha + \\beta)}\\).\n" +
        "- In that case \\(\\dfrac{t_1}{t_2} = \\dfrac{\\beta}{\\alpha}\\): the same speed is gained and lost.\n" +
        "- A constant force from rest: \\(a = F/m\\) along each axis, then \\(s = \\tfrac{1}{2}at^{2}\\) along each axis.\n" +
        "- Sliding up a smooth incline: \\(a = -g\\sin\\theta\\), so it stops after \\(\\dfrac{u^{2}}{2g\\sin\\theta}\\).",
      formula: {
        label: "Equations of motion",
        latex: "v = u + at \\qquad s = ut + \\tfrac{1}{2}at^{2} \\qquad v^{2} = u^{2} + 2as \\qquad s = \\frac{u + v}{2}\\,t",
      },
      authoredExample: {
        prompt:
          "A car speeds up uniformly from \\(10\\ \\text{m/s}\\) to \\(30\\ \\text{m/s}\\) over 200 m. Find the acceleration, the time taken and the speed at the halfway mark.",
        steps: [
          "No t given or asked first, so \\(v^{2} = u^{2} + 2as\\): \\(900 = 100 + 400a\\), \\(a = 2\\ \\text{m/s}^{2}\\).",
          "\\(t = \\dfrac{v - u}{a} = \\dfrac{20}{2} = 10\\ \\text{s}\\). Check: \\(\\dfrac{10 + 30}{2} \\times 10 = 200\\ \\text{m}\\).",
          "Halfway in distance: \\(v_m = \\sqrt{\\dfrac{100 + 900}{2}} = \\sqrt{500} = 22.4\\ \\text{m/s}\\), not 20 m/s.",
        ],
        answer: "\\(2\\ \\text{m/s}^{2}\\), 10 s, \\(22.4\\ \\text{m/s}\\)",
      },
      selfCheckExample: {
        prompt:
          "A scooter starts from rest at \\(2\\ \\text{m/s}^{2}\\), then brakes at \\(3\\ \\text{m/s}^{2}\\) and stops. The whole trip takes 10 s. Find the top speed and the distance.",
        steps: [
          "\\(v_{max} = \\dfrac{2 \\times 3 \\times 10}{2 + 3} = 12\\ \\text{m/s}\\); it speeds up for 6 s and brakes for 4 s.",
          "The v–t graph is a triangle: distance \\(= \\tfrac{1}{2} \\times 12 \\times 10 = 60\\ \\text{m}\\).",
        ],
        answer: "\\(12\\ \\text{m/s}\\) and 60 m",
      },
      practiceSet: [
        { prompt: "From rest at \\(4\\ \\text{m/s}^{2}\\): distance in the first 5 s?", answer: "50 m" },
        { prompt: "A car at \\(20\\ \\text{m/s}\\) stops in 50 m. Its acceleration?", answer: "\\(-4\\ \\text{m/s}^{2}\\)" },
        { prompt: "A 10 N force acts on a 2 kg block at rest on a smooth floor. Distance in 4 s?", answer: "40 m" },
        { prompt: "Speed goes from \\(4\\ \\text{m/s}\\) to \\(16\\ \\text{m/s}\\) in 6 s, uniformly. Distance?", answer: "60 m", method: "\\(s = \\dfrac{u + v}{2}t\\)" },
      ],
      pyqExampleId: "a6cae242-d16b-4bf9-8f16-834af057a38c", // 2021 Paper 3: speed of the middle of a train passing a post
      traps: [
        {
          title: "Mid-distance speed is not the mean speed",
          body: "The middle of a train passes the post when half the LENGTH has gone by, so its speed is √((u² + v²)/2). The mean (u + v)/2 is the speed at half the TIME.",
        },
        {
          title: "The ratio of times is upside down",
          body: "Speeding up at a₁ and braking at a₂ over the same speed change gives t₁/t₂ = a₂/a₁. The larger acceleration takes the shorter time.",
        },
      ],
    },

    // C2 — braking and stopping distances
    {
      kind: "formula" as const,
      slug: "jpsl-braking",
      name: "Braking and stopping distance",
      intuition:
        "With constant braking, the stopping distance is u²/2a. It grows with the SQUARE of the speed: twice the speed needs four times the distance. When a body loses part of its speed over a known distance, write v² = u² − 2as for that part and for the rest, and divide; the retardation cancels.",
      definition:
        "- Stopping distance \\(s = \\dfrac{u^{2}}{2a}\\); stopping time \\(t = \\dfrac{u}{a}\\).\n" +
        "- Same retardation: \\(s \\propto u^{2}\\). One third of the speed stops in one ninth of the distance.\n" +
        "- Distance in a uniform stop of known time: \\(s = \\dfrac{u}{2}\\,t\\).\n" +
        "- A bullet slowing from u to ku over \\(d_1\\) stops after a further \\(d_2\\): \\(\\dfrac{d_2}{d_1} = \\dfrac{k^{2}}{1 - k^{2}}\\).\n" +
        "- Braking applied late: \\(v^{2} = u^{2} - 2as\\) with the shorter s gives the speed left over.\n" +
        "- Two cars braking towards each other: each stops after its own \\(u^{2}/2a\\); subtract both from the gap.",
      formula: {
        label: "Stopping distance",
        latex: "s = \\frac{u^{2}}{2a} \\qquad \\frac{s_2}{s_1} = \\left(\\frac{u_2}{u_1}\\right)^{2}",
      },
      authoredExample: {
        prompt:
          "A car at \\(72\\ \\text{km/h}\\) stops in 40 m. Find its retardation, and the stopping distance at \\(108\\ \\text{km/h}\\) with the same brakes.",
        steps: [
          "\\(72\\ \\text{km/h} = 20\\ \\text{m/s}\\): \\(a = \\dfrac{u^{2}}{2s} = \\dfrac{400}{80} = 5\\ \\text{m/s}^{2}\\).",
          "\\(108\\ \\text{km/h} = 30\\ \\text{m/s}\\): \\(s = \\dfrac{900}{10} = 90\\ \\text{m}\\).",
          "Check with the ratio: \\((30/20)^{2} \\times 40 = 2.25 \\times 40 = 90\\ \\text{m}\\).",
        ],
        answer: "\\(5\\ \\text{m/s}^{2}\\); 90 m",
      },
      selfCheckExample: {
        prompt:
          "A bullet loses half its speed after going 6 cm into a block. How much further does it go before stopping, if the resistance is constant?",
        steps: [
          "First part: \\(u^{2} - \\tfrac{1}{4}u^{2} = \\tfrac{3}{4}u^{2} = 2a \\times 6\\).",
          "Second part: \\(\\tfrac{1}{4}u^{2} = 2a \\times d\\). Dividing, \\(d = 6 \\times \\dfrac{1/4}{3/4} = 2\\ \\text{cm}\\).",
        ],
        answer: "2 cm",
      },
      practiceSet: [
        { prompt: "Two cars 200 m apart drive towards each other at \\(15\\ \\text{m/s}\\) each and brake at \\(1.5\\ \\text{m/s}^{2}\\). The gap when both stop?", answer: "50 m" },
        { prompt: "A bus at \\(54\\ \\text{km/h}\\) stops uniformly in 5 s. Distance?", answer: "37.5 m" },
        { prompt: "A car stops in 20 m from speed u. With the same brakes, from u/2?", answer: "5 m" },
        { prompt: "From \\(30\\ \\text{m/s}\\) the brakes need 150 m. Applied only 100 m before the line, the speed at the line?", answer: "\\(\\sqrt{300} \\approx 17.3\\ \\text{m/s}\\)" },
      ],
      pyqExampleId: "59a2252c-d7f8-4c74-b591-3f7964843128", // 27 Jan 2024: bullet loses a third of its speed
      traps: [
        {
          title: "Stopping distance is not proportional to speed",
          body: "Halving the speed quarters the stopping distance. Scaling the distance by the speed ratio alone is the usual wrong option.",
        },
        {
          title: "Loses one third, or keeps one third?",
          body: "\"Loses one third of its velocity\" leaves 2u/3. \"Velocity becomes one third\" leaves u/3. The two give very different answers.",
        },
      ],
    },

    // C3 — distance in the nth second
    {
      kind: "formula" as const,
      slug: "jpsl-nth-second",
      name: "Distance in the nth second",
      intuition:
        "The distance in the nth second is the distance in n seconds minus the distance in n − 1 seconds. Under constant acceleration it rises by a fixed amount, a, every second. From rest the distances in successive seconds go 1 : 3 : 5 : 7, and the total distance grows as t².",
      definition:
        "- \\(s_n = u + \\dfrac{a}{2}(2n - 1)\\).\n" +
        "- Consecutive seconds differ by a: \\(s_{n+1} - s_n = a\\); seconds k apart differ by ka.\n" +
        "- From rest: \\(s_1 : s_2 : s_3 = 1 : 3 : 5\\), and \\(s \\propto t^{2}\\), so the next equal interval covers three times the first.\n" +
        "- From rest, \\(\\dfrac{s_{n-1}}{s_n} = \\dfrac{2n - 3}{2n - 1}\\).\n" +
        "- Displacement \\(\\Delta s\\) and velocity gain \\(\\Delta v\\) over one second fix the speed at its start: \\(\\Delta s = v + \\tfrac{1}{2}\\Delta v\\).",
      formula: {
        label: "Distance in the nth second",
        latex: "s_n = u + \\frac{a}{2}(2n - 1)",
      },
      authoredExample: {
        prompt:
          "A body covers 20 m in its 3rd second and 32 m in its 5th second, with constant acceleration. Find u and a.",
        steps: [
          "The 5th and 3rd seconds are two seconds apart: \\(s_5 - s_3 = 2a = 12\\), so \\(a = 6\\ \\text{m/s}^{2}\\).",
          "\\(s_3 = u + \\dfrac{6}{2}(5) = u + 15 = 20\\), so \\(u = 5\\ \\text{m/s}\\).",
          "Check: \\(s_5 = 5 + 3 \\times 9 = 32\\ \\text{m}\\).",
        ],
        answer: "\\(u = 5\\ \\text{m/s}\\), \\(a = 6\\ \\text{m/s}^{2}\\)",
      },
      selfCheckExample: {
        prompt:
          "From rest, a toy covers 8 m in its first 2 s. How far does it go in the next 2 s, and in the 4th second alone?",
        steps: [
          "\\(s \\propto t^{2}\\): in 4 s it covers \\(8 \\times 4 = 32\\ \\text{m}\\), so the next 2 s give 24 m.",
          "\\(8 = \\tfrac{1}{2}a(4)\\) gives \\(a = 4\\ \\text{m/s}^{2}\\); \\(s_4 = \\dfrac{4}{2}(7) = 14\\ \\text{m}\\).",
        ],
        answer: "24 m; 14 m",
      },
      practiceSet: [
        { prompt: "From rest, the ratio of distances in the 1st, 2nd and 3rd seconds?", answer: "1 : 3 : 5" },
        { prompt: "\\(u = 10\\ \\text{m/s}\\), \\(a = 2\\ \\text{m/s}^{2}\\). Distance in the 6th second?", answer: "21 m" },
        { prompt: "From rest, the ratio of the distance in the nth second to the distance in n seconds?", answer: "\\(\\dfrac{2n - 1}{n^{2}}\\)" },
        { prompt: "The velocity grows by \\(4\\ \\text{m/s}\\) each second. By how much does the distance in each second grow?", answer: "4 m" },
      ],
      pyqExampleId: "4cabbe29-7ba1-403a-8d1d-7f6f1bb7dce6", // 4 Apr 2024: distances in the nth and (n + 2)th seconds
      traps: [
        {
          title: "\"In the nth second\" is not \"in n seconds\"",
          body: "In the 5th second means between t = 4 s and t = 5 s. In 5 seconds means from t = 0 to t = 5 s. Read the stem twice.",
        },
        {
          title: "Seconds two apart differ by 2a",
          body: "The nth and (n + 2)th seconds differ by 2a, not a. Dividing the difference by 1 doubles the acceleration.",
        },
      ],
    },
  ],
};
