import type { SubtopicNote } from "@/app/notes/_types";

export const EQUATIONS_AND_GRAPHS_NOTE: SubtopicNote = {
  subtopicName: "Equations of Motion and Graphs",
  title: "Equations of Motion and Motion Graphs",
  oneLineDefinition:
    "For motion with constant acceleration the three equations v = u + at, s = ut + ½at², and v² = u² + 2as link the five quantities u, v, a, s, t; a motion graph reads the same physics off slopes (acceleration) and areas (displacement).",
  whyItMatters:
    "This is the engine room of the chapter — 15 PYQs, the most of any subtopic, and the source of most of its HARD questions. " +
    "Almost every numerical reduces to picking the right one of the three equations and substituting carefully (watch the sign of a when decelerating). " +
    "The graph questions test two rules over and over: on a velocity-time graph the slope is the acceleration and the area is the displacement; on a position-time graph the slope is the velocity. Master the substitution discipline and the graph-reading rules and this subtopic is yours.",
  concepts: [
    // 1 — acceleration (foundation)
    {
      kind: "formula" as const,
      slug: "acceleration-definition",
      name: "Acceleration — rate of change of velocity",
      intuition:
        "Acceleration measures how fast the velocity is changing. Speeding up gives positive acceleration; slowing down (deceleration) gives negative acceleration in the direction of motion. A change in direction at constant speed is still an acceleration, because velocity is a vector.",
      definition:
        "**Acceleration** is the rate of change of velocity: \\(a = \\dfrac{v - u}{t}\\) (a vector, SI unit m/s\\(^2\\)). " +
        "Uniform (constant) acceleration means \\(a\\) does not change with time. A negative value in the direction of motion is a **deceleration** (retardation). Even with constant speed, turning is an acceleration.",
      formula: {
        label: "Acceleration",
        latex: "a = \\dfrac{v - u}{t}",
        symbols: [
          { symbol: "a", meaning: "acceleration (m/s²)" },
          { symbol: "u", meaning: "initial velocity" },
          { symbol: "v", meaning: "final velocity" },
          { symbol: "t", meaning: "time interval" },
        ],
      },
      authoredExample: {
        prompt:
          "A car's velocity rises from 10 m/s to 30 m/s in 5 s. Find its acceleration.",
        steps: [
          "\\(a = \\dfrac{v - u}{t} = \\dfrac{30 - 10}{5}\\).",
          "\\(a = \\dfrac{20}{5} = 4\\) m/s\\(^2\\).",
        ],
        answer: "4 m/s².",
      },
      selfCheckExample: {
        prompt:
          "A train slows from 20 m/s to 8 m/s in 6 s. Find its acceleration and say what the sign means.",
        steps: [
          "\\(a = \\dfrac{8 - 20}{6} = \\dfrac{-12}{6} = -2\\) m/s\\(^2\\).",
          "The negative sign means the acceleration opposes the motion — the train is decelerating.",
        ],
        answer: "−2 m/s² (a deceleration).",
      },
      practiceSet: [
        { prompt: "Velocity 0 → 12 m/s in 4 s. Acceleration?", answer: "3 m/s²", method: "(12−0)/4" },
        { prompt: "Velocity 15 m/s → 0 in 3 s. Acceleration?", answer: "−5 m/s²", method: "(0−15)/3" },
        { prompt: "SI unit of acceleration?", answer: "m/s²" },
        { prompt: "Can a body moving at constant speed have acceleration?", answer: "Yes — if its direction changes" },
      ],
      pyqExampleId: "7d2e6aa1-12ae-453b-948c-5ddd9c1ee774", // 2018 — avg accel from graph −1 m/s²
      traps: [
        {
          title: "Deceleration is negative acceleration, not 'no' acceleration",
          body:
            "Slowing down is still acceleration — just opposite to the velocity, so it carries a minus sign in the direction of motion. From a velocity-time graph, average acceleration over an interval = (change in velocity) / (time), e.g. (4 − 8)/(12 − 8) = −1 m/s².",
        },
      ],
    },

    // 2 — three equations of motion
    {
      kind: "formula" as const,
      slug: "three-equations-of-motion",
      name: "The three equations of motion",
      intuition:
        "Three equations connect the five quantities u, v, a, s, t for constant acceleration. Each equation leaves out exactly one of the five — pick the one missing the quantity you neither know nor want. They only hold when acceleration is constant.",
      definition:
        "For **constant acceleration**:\n" +
        "- \\(v = u + at\\) (no \\(s\\)) — velocity after time \\(t\\).\n" +
        "- \\(s = ut + \\tfrac{1}{2}at^2\\) (no \\(v\\)) — displacement after time \\(t\\).\n" +
        "- \\(v^2 = u^2 + 2as\\) (no \\(t\\)) — velocity after displacement \\(s\\).\n" +
        "Use a consistent sign convention: take one direction as positive and give \\(a\\) a minus sign when it opposes the motion.",
      formula: {
        label: "Equations of motion (constant a)",
        latex: "v = u + at \\qquad s = ut + \\tfrac{1}{2}at^2 \\qquad v^2 = u^2 + 2as",
        symbols: [
          { symbol: "u", meaning: "initial velocity" },
          { symbol: "v", meaning: "final velocity" },
          { symbol: "a", meaning: "acceleration (constant)" },
          { symbol: "s", meaning: "displacement" },
          { symbol: "t", meaning: "time" },
        ],
      },
      authoredExample: {
        prompt:
          "A car at 12 m/s brakes uniformly and stops in 45 m. Find its acceleration.",
        steps: [
          "Known: \\(u = 12\\), \\(v = 0\\), \\(s = 45\\); unknown \\(a\\); \\(t\\) not wanted → use \\(v^2 = u^2 + 2as\\).",
          "\\(0 = 12^2 + 2a(45) = 144 + 90a\\).",
          "\\(a = \\dfrac{-144}{90} = -1.6\\) m/s\\(^2\\) (the minus sign = braking).",
        ],
        answer: "−1.6 m/s².",
      },
      selfCheckExample: {
        prompt:
          "A body starts from rest with acceleration 2 m/s². How far does it travel in the first 10 s?",
        steps: [
          "\\(u = 0\\), \\(a = 2\\), \\(t = 10\\); want \\(s\\) → use \\(s = ut + \\tfrac{1}{2}at^2\\).",
          "\\(s = 0 + \\tfrac{1}{2}(2)(10)^2 = \\tfrac{1}{2}(2)(100) = 100\\) m.",
        ],
        answer: "100 m.",
      },
      practiceSet: [
        { prompt: "From rest, a = 3 m/s². Velocity after 4 s?", answer: "12 m/s", method: "v = u + at = 0 + 3×4" },
        { prompt: "u = 5 m/s, a = 2 m/s². Distance in 3 s?", answer: "24 m", method: "5×3 + ½×2×9" },
        { prompt: "u = 0, a = 4 m/s², s = 8 m. Final speed?", answer: "8 m/s", method: "v² = 0 + 2×4×8 = 64" },
        { prompt: "Which equation has no time t?", answer: "v² = u² + 2as" },
      ],
      pyqExampleId: "269ba1aa-d608-407b-a212-cb29c237dc26", // 2025 — braking 12 m/s over 45 m → −1.6
      traps: [
        {
          title: "v² − u² = 2as, with the right sign",
          body:
            "The third equation is \\(v^2 - u^2 = 2as\\), i.e. \\(v^2 = u^2 + 2as\\). A common wrong form writes \\(u^2 - v^2 = 2as\\) — that flips the sign and is the false option the bank tests. When decelerating, keep \\(a\\) negative rather than reordering \\(u\\) and \\(v\\).",
        },
        {
          title: "These equations need CONSTANT acceleration",
          body:
            "v = u + at and friends apply only while a is constant. For a journey in two phases with different accelerations, apply the equations to each phase separately and add the results (as in the 'first t s at 2 m/s², next 10 s at 5 m/s²' problem).",
        },
      ],
    },

    // 3 — distance in the nth second
    {
      kind: "formula" as const,
      slug: "distance-in-nth-second",
      name: "Distance covered in the nth second",
      intuition:
        "The distance covered during one particular second (say the 5th second) is not the same as the total distance after 5 seconds. It is the gap between the total after n seconds and the total after (n−1) seconds, which simplifies to a neat formula.",
      definition:
        "The distance travelled during the **nth second** of uniformly accelerated motion is " +
        "\\(s_n = u + \\tfrac{1}{2}a(2n - 1)\\). " +
        "It is a distance covered in a 1-second interval, derived as \\(s_{(n)} - s_{(n-1)}\\) from \\(s = ut + \\tfrac{1}{2}at^2\\).",
      formula: {
        label: "Distance in the nth second",
        latex: "s_n = u + \\tfrac{1}{2}a(2n - 1)",
        symbols: [
          { symbol: "s_n", meaning: "distance during the nth second" },
          { symbol: "u", meaning: "initial velocity" },
          { symbol: "a", meaning: "acceleration" },
          { symbol: "n", meaning: "the second of interest" },
        ],
      },
      authoredExample: {
        prompt:
          "A body starts from rest with acceleration 4 m/s². How far does it travel during the 3rd second?",
        steps: [
          "Use \\(s_n = u + \\tfrac{1}{2}a(2n - 1)\\) with \\(u = 0\\), \\(a = 4\\), \\(n = 3\\).",
          "\\(s_3 = 0 + \\tfrac{1}{2}(4)(2\\cdot3 - 1) = 2(5) = 10\\) m.",
        ],
        answer: "10 m.",
      },
      selfCheckExample: {
        prompt:
          "A car moving at 6 m/s accelerates at 2 m/s². Distance covered in the 4th second?",
        steps: [
          "\\(s_n = u + \\tfrac{1}{2}a(2n - 1)\\) with \\(u = 6\\), \\(a = 2\\), \\(n = 4\\).",
          "\\(s_4 = 6 + \\tfrac{1}{2}(2)(2\\cdot4 - 1) = 6 + (7) = 13\\) m.",
        ],
        answer: "13 m.",
      },
      practiceSet: [
        { prompt: "From rest, a = 2 m/s². Distance in the 1st second?", answer: "1 m", method: "½×2×(2−1)" },
        { prompt: "From rest, a = 10 m/s². Distance in the 2nd second?", answer: "15 m", method: "½×10×(4−1)" },
        { prompt: "Is sₙ a distance for one second or the total after n seconds?", answer: "Distance during the single nth second" },
      ],
      pyqExampleId: "d14b6fbc-79fa-4407-91ca-7a667bda9d17", // 2025 — wrong-equation MCQ incl. nth-second
      traps: [
        {
          title: "The nth-second distance is not the total distance",
          body:
            "sₙ = u + ½a(2n−1) gives the distance in a 1-second slice, not the cumulative s = ut + ½at². The valid NDA form is u + ½a(2n−1); options that drop the ½ or write (2n+1) are wrong.",
        },
      ],
    },

    // 4 — velocity-time graph (slope = a, area = s) — VIZ
    {
      kind: "formula" as const,
      slug: "velocity-time-graph",
      name: "Reading a velocity-time graph",
      intuition:
        "On a velocity-time graph, how steep the line is tells you the acceleration, and how much area sits under the line tells you the displacement. Uniform acceleration plots as a straight line; uniform velocity plots as a flat horizontal line.",
      definition:
        "On a **velocity-time graph**:\n" +
        "- the **slope** = acceleration (a straight line ⟹ uniform acceleration; a horizontal line ⟹ zero acceleration, constant velocity);\n" +
        "- the **area** between the line and the time axis = displacement.\n" +
        "An upward-sloping segment is acceleration; a downward-sloping segment is deceleration.",
      visualizationSlug: "kin-velocity-time-graph",
      formula: {
        label: "Velocity-time graph readings",
        latex: "a = \\text{slope} = \\dfrac{\\Delta v}{\\Delta t}, \\qquad s = \\text{area under the graph}",
        symbols: [
          { symbol: "\\(\\Delta v\\)", meaning: "change in velocity" },
          { symbol: "\\(\\Delta t\\)", meaning: "time interval" },
          { symbol: "s", meaning: "displacement" },
        ],
      },
      authoredExample: {
        prompt:
          "A velocity-time graph is a straight line rising from 4 m/s at t = 0 to 12 m/s at t = 4 s. Find the acceleration and the displacement in those 4 s.",
        steps: [
          "Acceleration = slope = \\(\\dfrac{12 - 4}{4 - 0} = 2\\) m/s\\(^2\\).",
          "Displacement = area = trapezium = \\(\\tfrac{1}{2}(4 + 12)(4) = \\tfrac{1}{2}(16)(4) = 32\\) m.",
        ],
        answer: "Acceleration 2 m/s²; displacement 32 m.",
      },
      selfCheckExample: {
        prompt:
          "On a velocity-time graph the velocity falls from 8 m/s at t = 8 s to 4 m/s at t = 12 s. Find the average acceleration over that interval.",
        steps: [
          "Average acceleration = slope = \\(\\dfrac{4 - 8}{12 - 8} = \\dfrac{-4}{4}\\).",
          "\\(= -1\\) m/s\\(^2\\) (a deceleration).",
        ],
        answer: "−1 m/s².",
      },
      practiceSet: [
        { prompt: "A horizontal velocity-time line means what acceleration?", answer: "Zero (constant velocity)" },
        { prompt: "Velocity-time slope gives which quantity?", answer: "Acceleration" },
        { prompt: "Area under a velocity-time graph gives which quantity?", answer: "Displacement" },
        { prompt: "Rectangle of v = 5 m/s held for 6 s gives what displacement?", answer: "30 m", method: "area = 5 × 6" },
      ],
      pyqExampleId: "7d2e6aa1-12ae-453b-948c-5ddd9c1ee774", // 2018 — avg accel −1 from v-t graph
      traps: [
        {
          title: "Slope is acceleration; AREA is displacement — don't swap them",
          body:
            "On a velocity-time graph the slope gives acceleration and the area gives displacement. A frequent error reads the area as a velocity or the slope as a distance. Also: a segment with positive slope (CD) is the accelerated part, a negative-slope segment (AB) is decelerated.",
        },
      ],
    },

    // 5 — position-time graph — VIZ
    {
      kind: "formula" as const,
      slug: "position-time-graph",
      name: "Reading a position-time graph",
      intuition:
        "On a position-time (x-t) graph the slope is the velocity. A straight line means constant velocity; a curve that gets steeper means the velocity is rising — acceleration. Watch the axis order: if TIME is on the vertical axis and position on the horizontal, the speed is 1/slope, so a steeper line means a SLOWER object.",
      definition:
        "On a **position-time graph** (x vertical, t horizontal): the **slope** \\(= \\dfrac{dx}{dt} =\\) velocity. " +
        "A straight line ⟹ constant velocity; a curve ⟹ changing velocity (acceleration). " +
        "If the axes are swapped so that **time is plotted against position** (t vertical, x horizontal), then speed \\(= dx/dt = 1/\\text{slope}\\): a steeper t-x line means a lower speed.",
      visualizationSlug: "kin-position-time-graph",
      formula: {
        label: "Position-time slope",
        latex: "v = \\dfrac{dx}{dt} = \\text{slope of the } x\\text{-}t \\text{ graph}",
        symbols: [
          { symbol: "x", meaning: "position" },
          { symbol: "t", meaning: "time" },
          { symbol: "v", meaning: "velocity (slope)" },
        ],
      },
      authoredExample: {
        prompt:
          "A position-time graph is a straight line from (0 s, 0 m) to (4 s, 20 m). What is the velocity, and is the motion accelerated?",
        steps: [
          "Velocity = slope = \\(\\dfrac{20 - 0}{4 - 0} = 5\\) m/s.",
          "The graph is straight, so the slope (velocity) is constant — no acceleration.",
        ],
        answer: "Velocity 5 m/s; uniform motion (no acceleration).",
      },
      selfCheckExample: {
        prompt:
          "Three objects A, B, C are shown on a time-versus-position graph (t on the vertical axis). C's line is the steepest, A's the least steep. Rank their speeds.",
        steps: [
          "On a t-x graph, speed = dx/dt = 1/slope.",
          "Steepest t-x line (C) ⟹ smallest speed; least steep line (A) ⟹ largest speed.",
          "So \\(V_A > V_B > V_C\\).",
        ],
        answer: "\\(V_A > V_B > V_C\\).",
      },
      practiceSet: [
        { prompt: "On an x-t graph, the slope is which quantity?", answer: "Velocity" },
        { prompt: "A straight x-t line means what kind of motion?", answer: "Uniform (constant velocity)" },
        { prompt: "A curving x-t graph indicates what?", answer: "Changing velocity — acceleration" },
        { prompt: "On a t-x graph, a steeper line means a faster or slower object?", answer: "Slower", method: "speed = 1/slope" },
      ],
      pyqExampleId: "bceb7f19-5074-4f87-90da-42a4db1af8aa", // 2019 — t-x graph, V_A>V_B>V_C
      traps: [
        {
          title: "Check which axis is which before reading the slope",
          body:
            "On the usual x-t graph the slope is the velocity directly. But if the figure plots TIME on the vertical axis against position, then speed = 1/slope, so the steepest line is the SLOWEST object — the reverse of the instinct.",
        },
      ],
    },

    // 6 — interpreting motion (skydiver / constant accel / v=u+at as distance-time)
    {
      kind: "formula" as const,
      slug: "interpreting-motion-graphs",
      name: "Interpreting motion: shapes and statements",
      intuition:
        "Beyond reading numbers off a graph, the NDA asks you to match a physical situation to the right graph shape, or to judge which statement about a motion is true. A skydiver speeds up, levels off at terminal velocity, then slows when the parachute opens — a smooth rounded curve, not a sharp triangle.",
      definition:
        "Key interpretation rules:\n" +
        "- For uniform acceleration from rest, distance grows **quadratically** with time (a parabola), not linearly.\n" +
        "- With constant non-zero acceleration, the distance covered depends on the **initial velocity** u and the time, not on any initial displacement.\n" +
        "- A **skydiver** accelerates, approaches terminal velocity (curve flattens), then decelerates after the parachute opens — a smooth rounded rise and gradual fall.\n" +
        "- Treating \\(v = u + at\\) as a distance-time relation gives a straight line with a positive intercept when \\(u \\neq 0\\).",
      authoredExample: {
        prompt:
          "An object moves with constant non-zero acceleration for a fixed time. Does the distance it covers depend on its initial velocity?",
        steps: [
          "Distance is \\(s = ut + \\tfrac{1}{2}at^2\\).",
          "The first term \\(ut\\) carries the initial velocity u, so a larger u gives a larger s for the same a and t.",
          "Hence the distance DOES depend on the initial velocity (and it grows quadratically, not linearly, in t).",
        ],
        answer: "Yes — distance depends on the initial velocity u (via the ut term).",
      },
      selfCheckExample: {
        prompt:
          "Which speed-time shape matches a skydiver's jump: (a) a sharp rise then sharp drop, or (b) a rounded rise to a flat top then a gradual fall to zero?",
        steps: [
          "The diver first accelerates as gravity exceeds drag — speed rises.",
          "Drag grows until it balances gravity — speed levels off at terminal velocity (curve flattens).",
          "When the parachute opens, drag jumps and speed falls gradually toward a low landing speed.",
          "That is a smooth rounded curve — shape (b).",
        ],
        answer: "Shape (b): rounded rise to a flat top, then a gradual fall.",
      },
      practiceSet: [
        { prompt: "From rest with constant a, distance grows how with time?", answer: "Quadratically (parabola)", method: "s = ½at²" },
        { prompt: "Does distance covered depend on initial DISPLACEMENT?", answer: "No — only on u, a, t" },
        { prompt: "v = u + at plotted as distance-time (u ≠ 0) is what shape?", answer: "Straight line with positive intercept" },
        { prompt: "A skydiver's speed-time curve at terminal velocity does what?", answer: "Flattens (levels off)" },
      ],
      pyqExampleId: "245a05ab-8e06-48a4-b266-3d1469b7d75b", // 2019 — distance depends on initial velocity
      traps: [
        {
          title: "Quadratic, not linear, distance growth",
          body:
            "Under constant acceleration the distance grows as t² (a parabola), so 'distance increases linearly with time' is false. And it depends on the initial velocity u, not on any starting position.",
        },
      ],
    },
  ],
};
