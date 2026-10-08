import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_PHY_KIN_ACCELERATED_NOTE: SubtopicNote = {
  subtopicName: "Uniformly Accelerated Motion",
  title: "Equations of Motion, Motion Graphs and Free Fall",
  oneLineDefinition:
    "When the acceleration is constant, four equations link displacement, the two velocities, the acceleration and the time; graphs show the same motion as gradients and areas.",
  whyItMatters:
    "The 2019 paper asked for the top speed and the distance of a car that accelerates and then cruises. Constant-acceleration working also sits inside many dynamics and energy questions, so it is worth making automatic.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-kin-suvat",
      name: "The equations of motion for constant acceleration",
      intuition:
        "With constant acceleration the velocity rises by the same amount every second, so the average velocity is just the average of the start and end values. Distance is that average times the time. The other equations follow from these two ideas. Each equation leaves out one of the five quantities, so pick the one that skips the quantity you neither know nor want.",
      definition:
        "For motion in a straight line with **constant acceleration** (the five quantities are often called **suvat**):\n" +
        "- \\(v = u + at\\) (no \\(s\\))\n" +
        "- \\(s = \\tfrac{1}{2}(u + v)t\\) (no \\(a\\))\n" +
        "- \\(s = ut + \\tfrac{1}{2}at^2\\) (no \\(v\\))\n" +
        "- \\(v^2 = u^2 + 2as\\) (no \\(t\\))\n" +
        "Choose a positive direction and give every vector quantity a sign. These equations do **not** apply when the acceleration changes; split the motion into stages instead.",
      formula: {
        label: "Equations of uniformly accelerated motion",
        latex: "v = u + at \\qquad s = ut + \\tfrac{1}{2}at^2 \\qquad v^2 = u^2 + 2as",
        symbols: [
          { symbol: "\\(s\\)", meaning: "displacement, in m" },
          { symbol: "\\(u, v\\)", meaning: "initial and final velocity, in m/s" },
          { symbol: "\\(a\\)", meaning: "constant acceleration, in m/s²" },
          { symbol: "\\(t\\)", meaning: "time, in s" },
        ],
      },
      authoredExample: {
        prompt:
          "A car moving at 4.0 m/s accelerates uniformly at \\(1.5\\ \\text{m/s}^2\\) for 8.0 s. Find its final velocity and the distance covered.",
        steps: [
          "\\(v = u + at = 4.0 + 1.5 \\times 8.0 = 16\\ \\text{m/s}\\).",
          "\\(s = ut + \\tfrac{1}{2}at^2 = 4.0 \\times 8.0 + \\tfrac{1}{2} \\times 1.5 \\times 64 = 32 + 48 = 80\\ \\text{m}\\).",
          "Check with the average velocity: \\(\\tfrac{1}{2}(4.0 + 16) \\times 8.0 = 10 \\times 8.0 = 80\\ \\text{m}\\).",
        ],
        answer: "16 m/s; 80 m",
      },
      selfCheckExample: {
        prompt:
          "A driver travelling at 24 m/s brakes with a constant deceleration of \\(3.0\\ \\text{m/s}^2\\). How far does the car travel before it stops?",
        options: ["192 m", "8.0 m", "72 m", "96 m", "48 m"],
        steps: [
          "No time is given or wanted, so use \\(v^2 = u^2 + 2as\\) with \\(v = 0\\) and \\(a = -3.0\\).",
          "\\(0 = 24^2 - 2 \\times 3.0 \\times s\\), so \\(s = 576 / 6.0 = 96\\ \\text{m}\\).",
          "A forgets the 2 (it is also what you get if the car kept 24 m/s for the whole 8.0 s). B is the stopping time, not a distance. C multiplies speed by deceleration. E uses the average speed for only half the stopping time.",
        ],
        answer: "(D) 96 m",
      },
      practiceSet: [
        { prompt: "From rest, a scooter accelerates at \\(2.0\\ \\text{m/s}^2\\) for 6.0 s. Find its final speed and the distance covered.", answer: "12 m/s; 36 m", method: "\\(v = at\\), \\(s = \\tfrac{1}{2}at^2\\)" },
        { prompt: "How far does a car travel while speeding up from 10 m/s to 30 m/s at \\(4.0\\ \\text{m/s}^2\\)?", answer: "100 m", method: "\\(s = (30^2 - 10^2)/(2 \\times 4.0)\\)" },
        { prompt: "How long does it take to stop from 18 m/s at a deceleration of \\(6.0\\ \\text{m/s}^2\\)?", answer: "3.0 s", method: "\\(t = 18/6.0\\)" },
        { prompt: "With the same braking, how does the stopping distance change if the starting speed doubles?", answer: "It becomes four times as long", method: "\\(s = u^2/2a\\)" },
      ],
      traps: [
        {
          title: "Stopping distance grows with the square of the speed",
          body: "From \\(v^2 = u^2 + 2as\\), the braking distance is \\(u^2 / 2a\\). Double the speed and the distance is four times as long, not twice.",
        },
        {
          title: "The equations hold only while the acceleration is constant",
          body: "A car that accelerates and then cruises has two stages with different accelerations. Work out each stage on its own and carry the speed at the end of one into the next.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-kin-graphs",
      name: "Motion graphs: gradients and areas",
      intuition:
        "A graph is a picture of the whole motion. The steepness of a line tells you how fast the plotted quantity is changing, so the slope of a position graph is the velocity and the slope of a velocity graph is the acceleration. The area under a velocity graph adds up velocity × time strips, which is displacement.",
      definition:
        "On a **displacement-time (s-t) graph**:\n" +
        "- the **gradient** is the velocity; a horizontal line means the body is at rest; a straight sloping line means constant velocity; a curve means the velocity is changing.\n" +
        "On a **velocity-time (v-t) graph**:\n" +
        "- the **gradient** is the acceleration; a horizontal line means constant velocity; a straight sloping line means constant acceleration;\n" +
        "- the **area** between the line and the time axis is the displacement (area below the axis counts as negative).\n" +
        "On an **acceleration-time graph**, the area is the change in velocity.",
      formula: {
        label: "Reading a v-t graph",
        latex: "a = \\text{gradient} = \\frac{\\Delta v}{\\Delta t} \\qquad s = \\text{area under the line}",
        symbols: [
          { symbol: "\\(\\Delta v / \\Delta t\\)", meaning: "rise over run of the v-t line" },
        ],
      },
      authoredExample: {
        prompt:
          "A tram starts from rest and speeds up uniformly to 12 m/s in 4.0 s, travels at 12 m/s for 10 s, then slows uniformly to rest in 6.0 s. Sketch the v-t graph in your head and find the accelerations and the total distance.",
        steps: [
          "Gradients: \\(12/4.0 = 3.0\\ \\text{m/s}^2\\), then 0, then \\(-12/6.0 = -2.0\\ \\text{m/s}^2\\).",
          "Areas: triangle \\(\\tfrac{1}{2} \\times 4.0 \\times 12 = 24\\ \\text{m}\\); rectangle \\(10 \\times 12 = 120\\ \\text{m}\\); triangle \\(\\tfrac{1}{2} \\times 6.0 \\times 12 = 36\\ \\text{m}\\).",
          "Total distance: \\(24 + 120 + 36 = 180\\ \\text{m}\\).",
        ],
        answer: "\\(3.0\\), 0 and \\(-2.0\\ \\text{m/s}^2\\); 180 m in total",
      },
      selfCheckExample: {
        prompt:
          "The v-t graph of a cyclist is a straight line from 6.0 m/s at \\(t = 0\\) to 14 m/s at \\(t = 10\\ \\text{s}\\). How far does the cyclist travel in these 10 s?",
        options: ["100 m", "140 m", "80 m", "40 m", "0.8 m"],
        steps: [
          "The area under the line is a trapezium: \\(\\tfrac{1}{2}(6.0 + 14) \\times 10 = 100\\ \\text{m}\\).",
          "B uses the final speed for the whole time. C uses only the change in speed. D is the triangle on top of the trapezium without the rectangle below it. E is the gradient, which is the acceleration in \\(\\text{m/s}^2\\).",
        ],
        answer: "(A) 100 m",
      },
      practiceSet: [
        { prompt: "An s-t graph is a straight line from 0 m to 60 m over 12 s. What is the velocity?", answer: "5.0 m/s", method: "Gradient \\(60/12\\)" },
        { prompt: "What does a horizontal line on an s-t graph mean?", answer: "The body is at rest", method: "Position does not change" },
        { prompt: "A v-t line rises from 3.0 m/s to 15 m/s in 4.0 s. What is the acceleration?", answer: "\\(3.0\\ \\text{m/s}^2\\)", method: "Gradient \\(12/4.0\\)" },
      ],
      traps: [
        {
          title: "The same flat line means different things on different graphs",
          body: "A horizontal line on an s-t graph means the body is standing still. On a v-t graph it means the body moves at a constant velocity. Read the axis labels before reading the shape.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-kin-free-fall",
      name: "Free fall and vertical throws",
      intuition:
        "Near the Earth's surface, and with air resistance ignored, every object falls with the same constant acceleration, whatever its mass. So free fall is just constant acceleration with \\(a = g\\) pointing down, and the equations of motion apply. A ball thrown straight up slows by about 10 m/s every second, stops for an instant, and comes back down as a mirror image of the way up.",
      definition:
        "- In **free fall** the only force is gravity and the acceleration is \\(g \\approx 9.8\\ \\text{m/s}^2\\) downwards (IMAT often says 10).\n" +
        "- Without air resistance, all bodies fall with the **same acceleration**, whatever their mass.\n" +
        "- For a vertical throw: at the highest point \\(v = 0\\) but \\(a = g\\) downwards; the time up equals the time down; the ball returns at the speed it was thrown.\n" +
        "- From rest: \\(v = gt\\) and \\(h = \\tfrac{1}{2}gt^2\\). Thrown up at \\(u\\): highest point \\(h = u^2 / 2g\\), reached after \\(t = u/g\\).",
      formula: {
        label: "Falling from rest and the highest point of a throw",
        latex: "h = \\tfrac{1}{2}gt^2, \\quad v = gt \\qquad h_{\\max} = \\frac{u^2}{2g}",
        symbols: [
          { symbol: "\\(g\\)", meaning: "acceleration of free fall, about 9.8 m/s²" },
          { symbol: "\\(h\\)", meaning: "height fallen or risen, in m" },
          { symbol: "\\(u\\)", meaning: "speed of an upward throw, in m/s" },
        ],
      },
      authoredExample: {
        prompt:
          "A stone is dropped from rest from a bridge 45 m above a river. Taking \\(g = 10\\ \\text{m/s}^2\\) and ignoring air resistance, how long does it fall and how fast does it hit the water?",
        steps: [
          "\\(h = \\tfrac{1}{2}gt^2\\), so \\(t = \\sqrt{2h/g} = \\sqrt{90/10} = 3.0\\ \\text{s}\\).",
          "\\(v = gt = 10 \\times 3.0 = 30\\ \\text{m/s}\\).",
          "Check with \\(v^2 = 2gh = 2 \\times 10 \\times 45 = 900\\), so \\(v = 30\\ \\text{m/s}\\).",
        ],
        answer: "3.0 s; 30 m/s",
      },
      selfCheckExample: {
        prompt:
          "A ball is thrown straight up at 20 m/s. Taking \\(g = 10\\ \\text{m/s}^2\\) and ignoring air resistance, how high does it rise above the point of release?",
        options: ["2.0 m", "40 m", "20 m", "10 m", "200 m"],
        steps: [
          "At the top \\(v = 0\\): \\(h = u^2/2g = 400/20 = 20\\ \\text{m}\\).",
          "A is the time to the top (2.0 s) written as a height. B forgets the 2 in \\(2g\\). E multiplies the speed by \\(g\\).",
        ],
        answer: "(C) 20 m",
      },
      practiceSet: [
        { prompt: "A coin is dropped from rest. Taking \\(g = 10\\ \\text{m/s}^2\\), how fast is it moving after 2.5 s?", answer: "25 m/s", method: "\\(v = gt\\)" },
        { prompt: "How far does an object fall from rest in the first 4.0 s? Take \\(g = 10\\ \\text{m/s}^2\\).", answer: "80 m", method: "\\(\\tfrac{1}{2} \\times 10 \\times 16\\)" },
        { prompt: "A hammer and a feather are dropped together on the airless Moon. Which lands first?", answer: "They land together", method: "Same acceleration without air resistance" },
        { prompt: "A ball is thrown up at 15 m/s. With \\(g = 10\\ \\text{m/s}^2\\), how long until it comes back to the hand?", answer: "3.0 s", method: "1.5 s up and 1.5 s down" },
      ],
      traps: [
        {
          title: "Heavier objects do not fall faster",
          body: "Without air resistance every body falls with the same acceleration \\(g\\). A heavier body has a larger weight, but also more mass to accelerate, and the two cancel. Air resistance is what makes a feather fall slowly on Earth.",
        },
      ],
    },
  ],
};
