import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_KM_GRAPHS_NOTE: SubtopicNote = {
  subtopicName: "Motion Graphs and Equations of Motion",
  title: "Motion Graphs and Equations of Motion",
  oneLineDefinition:
    "The shape of a motion graph tells you the kind of motion, the slope and area of a velocity-time graph give acceleration and distance, and three equations link speed, time and distance under steady acceleration.",
  whyItMatters:
    "Four questions in the bank, two of them from the 2022 paper: which graphs show constant speed, what the area under a velocity-time graph gives, a two-car velocity-time graph (the only HARD one), and how fast a monkey must jump to reach a branch. Two are EASY, one MODERATE and one HARD.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spikmgr-shapes",
      name: "What the shape of each motion graph means",
      intuition:
        "Before reading any numbers, look at two things: what is on the vertical axis, and whether the line is flat, sloping or curved. A flat line on one graph means something very different from a flat line on another.",
      definition:
        "- On a **distance-time** graph, a straight sloping line means **constant speed**; a flat line means the body is **at rest**; a curve bending upwards means it is speeding up.\n" +
        "- On a **speed-time** or **velocity-time** graph, a **flat** line means **constant speed** (or velocity); a straight sloping line means **constant acceleration**, so the speed is changing.\n" +
        "- On an **acceleration-time** graph, a flat line above zero means steady acceleration, so the speed keeps rising.\n" +
        "- **Read the axis label first.** The same flat line means rest on a distance-time graph and steady motion on a velocity-time graph.",
      table: {
        columns: ["Graph", "Line shape", "What the motion is"],
        rows: [
          { cells: ["Distance against time", "Flat", "At rest"] },
          { cells: ["Distance against time", "Straight, sloping up", "Constant speed"] },
          { cells: ["Distance against time", "Curving upwards", "Speeding up"] },
          { cells: ["Velocity against time", "Flat (above zero)", "Constant velocity, so constant speed"] },
          { cells: ["Velocity against time", "Straight, sloping up", "Constant acceleration, speed changing"] },
          { cells: ["Speed against time", "Straight, sloping up", "Speed rising steadily"] },
          { cells: ["Acceleration against time", "Flat (above zero)", "Constant acceleration, speed changing"] },
        ],
        caption: "Constant speed shows up as a sloping distance-time line or a flat speed or velocity-time line.",
      },
      selfCheckExample: {
        prompt: "A distance-time graph is a flat line. What is the body doing?",
        steps: ["Distance on the vertical axis does not change as time passes.", "So the body is not moving."],
        answer: "It is at rest.",
      },
      practiceSet: [
        { prompt: "What does a straight line sloping upwards on a velocity-time graph show?", answer: "Constant (uniform) acceleration" },
        { prompt: "A body moves with constant speed. What is the shape of its distance-time graph?", answer: "A straight line sloping upwards" },
        { prompt: "An acceleration-time graph is a flat line above zero. Is the speed constant?", answer: "No: the speed keeps changing (steady acceleration)." },
      ],
      pyqExampleId: "3004b31f-f3b1-4c15-ad40-fd0cf188e2a7",
      traps: [
        {
          title: "Reading a flat acceleration line as constant speed",
          body:
            "A flat line on an acceleration-time graph means the acceleration is steady, so the speed is changing all the time. Constant speed needs zero acceleration.",
        },
        {
          title: "Reading a flat distance-time line as constant speed",
          body: "A flat distance-time line means the body is at rest. Constant speed on that graph is a straight line that slopes.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spikmgr-area",
      name: "Slope and area of a velocity-time graph",
      intuition:
        "A velocity-time graph holds two answers. How steeply it climbs tells you how fast the velocity changes, which is acceleration. The space under it is velocity times time, which is how far the body went.",
      definition:
        "- **Slope** of a velocity-time graph \\(=\\) change in velocity \\(\\div\\) time taken \\(=\\) **acceleration**.\n" +
        "- **Area** under a velocity-time graph \\(=\\) **distance travelled** (the displacement, for motion in one direction).\n" +
        "- Split the area into rectangles and triangles: a rectangle is base \\(\\times\\) height, a triangle is \\(\\frac{1}{2} \\times\\) base \\(\\times\\) height.\n" +
        "- A line that is rising but flattening means the velocity is still **increasing, at a decreasing rate**; a falling line means slowing down.",
      formula: {
        label: "Velocity-time graph",
        latex:
          "a = \\text{slope} = \\frac{v - u}{t} \\qquad \\text{distance} = \\text{area under the graph}",
      },
      authoredExample: {
        prompt: "A car starts from rest and speeds up steadily to 24 m/s in 8 s, then keeps 24 m/s for 5 s more. From its velocity-time graph, find its acceleration in the first 8 s and the total distance.",
        steps: [
          "Acceleration \\(=\\) slope \\(= \\frac{24 - 0}{8} = 3\\ \\text{m/s}^2\\).",
          "Triangle for the first 8 s: \\(\\frac{1}{2} \\times 8 \\times 24 = 96\\) m.",
          "Rectangle for the next 5 s: \\(5 \\times 24 = 120\\) m.",
          "Total distance \\(= 96 + 120 = 216\\) m.",
        ],
        answer: "\\(3\\ \\text{m/s}^2\\) and 216 m",
      },
      selfCheckExample: {
        prompt: "A velocity-time graph falls in a straight line from 12 m/s to 0 in 3 s. Find the deceleration and the distance covered.",
        steps: [
          "Slope \\(= \\frac{0 - 12}{3} = -4\\ \\text{m/s}^2\\), a deceleration of \\(4\\ \\text{m/s}^2\\).",
          "Area of the triangle \\(= \\frac{1}{2} \\times 3 \\times 12 = 18\\) m.",
        ],
        answer: "\\(4\\ \\text{m/s}^2\\) and 18 m",
      },
      practiceSet: [
        { prompt: "What does the slope of a velocity-time graph give?", answer: "Acceleration" },
        { prompt: "A velocity-time graph is a flat line at 15 m/s for 6 s. How far does the body go?", answer: "\\(15 \\times 6 = 90\\) m" },
        { prompt: "A velocity-time graph rises in a straight line from 0 to 9 m/s in 3 s. What is the acceleration?", answer: "\\(3\\ \\text{m/s}^2\\)" },
        { prompt: "A velocity-time line still climbs but gets less steep each second. Is the body speeding up or slowing down?", answer: "Speeding up, but by less and less each second." },
      ],
      pyqExampleId: "ece24309-d8a9-4041-98e1-960e4cf557c7",
      traps: [
        {
          title: "Mixing up slope and area",
          body: "The slope of a velocity-time graph is the acceleration; the area under it is the distance. Area is never the acceleration.",
        },
        {
          title: "Comparing two bodies by their speed at one moment",
          body:
            "Which of two cars is ahead depends on the distance each has covered, which is the area under each graph up to that time, not on which one is faster at that instant.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spikmgr-equations",
      name: "The three equations of motion and a body thrown upwards",
      intuition:
        "When acceleration stays the same, five quantities are tied together: starting speed u, final speed v, acceleration a, time t and distance s. Each equation leaves one of them out, so pick the one without the quantity you were not given.",
      definition:
        "- The three equations hold only for **constant acceleration**.\n" +
        "- A body thrown **straight up** slows down at g (about \\(9.8\\ \\text{m/s}^2\\), often taken as 10). At the highest point its speed is **zero**.\n" +
        "- So to just reach a height h, the starting speed u satisfies \\(0 = u^2 - 2gh\\), that is \\(u^2 = 2gh\\).\n" +
        "- A body **dropped** from rest has u \\(= 0\\) and speeds up at g.",
      formula: {
        label: "Equations of motion",
        latex:
          "v = u + at \\qquad s = ut + \\tfrac{1}{2}at^2 \\qquad v^2 = u^2 + 2as \\qquad u = \\sqrt{2gh} \\text{ to reach height } h",
        symbols: [
          { symbol: "u", meaning: "starting velocity" },
          { symbol: "v", meaning: "final velocity" },
          { symbol: "a", meaning: "acceleration" },
          { symbol: "s", meaning: "distance (displacement)" },
          { symbol: "t", meaning: "time" },
        ],
      },
      authoredExample: {
        prompt: "A ball is thrown straight up at 20 m/s. Find the greatest height it reaches and the time it takes to get there. Take \\(g = 10\\ \\text{m/s}^2\\).",
        steps: [
          "At the top \\(v = 0\\). Use \\(v^2 = u^2 - 2gh\\): \\(0 = 400 - 20h\\), so \\(h = 20\\) m.",
          "Use \\(v = u - gt\\): \\(0 = 20 - 10t\\), so \\(t = 2\\) s.",
        ],
        answer: "20 m, reached in 2 s",
      },
      selfCheckExample: {
        prompt: "A stone is dropped from rest and falls for 3 s. Find its speed and the distance it falls. Take \\(g = 10\\ \\text{m/s}^2\\).",
        steps: [
          "\\(v = u + gt = 0 + 10 \\times 3 = 30\\) m/s.",
          "\\(s = ut + \\frac{1}{2}gt^2 = 0 + \\frac{1}{2} \\times 10 \\times 9 = 45\\) m.",
        ],
        answer: "30 m/s and 45 m",
      },
      practiceSet: [
        { prompt: "A car starts from rest with an acceleration of \\(2\\ \\text{m/s}^2\\). What is its speed after 5 s?", answer: "10 m/s" },
        { prompt: "A car starts from rest with an acceleration of \\(2\\ \\text{m/s}^2\\). How far does it go in 5 s?", answer: "\\(\\frac{1}{2} \\times 2 \\times 25 = 25\\) m" },
        { prompt: "With what speed must a ball be thrown straight up to reach a height of 5 m? Take \\(g = 10\\ \\text{m/s}^2\\).", answer: "\\(\\sqrt{2 \\times 10 \\times 5} = 10\\) m/s" },
        { prompt: "A car speeds up from 10 m/s to 30 m/s over 100 m. What is its acceleration?", answer: "\\(\\frac{900 - 100}{200} = 4\\ \\text{m/s}^2\\)" },
      ],
      pyqExampleId: "e914e30d-8305-4fdc-bce6-9dd69995385c",
      traps: [
        {
          title: "Forgetting the speed at the top is zero",
          body: "A body thrown up stops for an instant at its highest point. Put v = 0 there; that is what turns \\(v^2 = u^2 - 2gh\\) into \\(u = \\sqrt{2gh}\\).",
        },
        {
          title: "Using the equations when acceleration changes",
          body: "The three equations need steady acceleration. On a curved velocity-time graph, use the area and slope instead.",
        },
      ],
    },
  ],
};
