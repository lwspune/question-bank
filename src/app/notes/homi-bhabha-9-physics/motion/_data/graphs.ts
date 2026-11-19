import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_MO_GRAPHS_NOTE: SubtopicNote = {
  subtopicName: "Acceleration and Graphs of Motion",
  title: "Acceleration and Graphs of Motion",
  oneLineDefinition:
    "Acceleration is the change of velocity each second, a = (v − u)/t; on a displacement-time graph the slope is the velocity, and on a velocity-time graph the slope is the acceleration and the area underneath is the distance.",
  whyItMatters:
    "Nine questions in the bank, two EASY and seven MODERATE. Three are about acceleration (a table of velocities rising by equal steps, a car whose speed in km/h turns out unchanged, and s = ut + ½at²). Two read a displacement-time graph and four a velocity-time graph, for the distance, the average velocity, the acceleration or a slowing body.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hb9mogr-acceleration",
      name: "Acceleration and the equations of motion",
      intuition:
        "Press the accelerator and the car's speed climbs: 10 m/s, then 12, then 14, one step every second. That steady climb of 2 m/s every second is its acceleration. Brake and the speed falls each second: that is retardation, a negative acceleration. A car cruising at one steady velocity has no acceleration at all, however fast it goes.",
      definition:
        "- **Acceleration** = change in velocity ÷ time: \\(a = \\frac{v - u}{t}\\), in \\(\\mathrm{m/s^2}\\).\n" +
        "- **Uniformly accelerated motion**: the velocity changes by equal amounts in equal times.\n" +
        "- **Retardation** (deceleration) is acceleration against the motion: the velocity falls and a is negative.\n" +
        "- If the velocity does not change, the acceleration is **zero**. Change km/h to m/s (× \\(\\frac{5}{18}\\)) before comparing velocities.\n" +
        "- For uniform acceleration: \\(v = u + at\\), \\(s = ut + \\frac{1}{2}at^2\\), \\(v^2 = u^2 + 2as\\).",
      formula: {
        label: "Equations of motion",
        latex: "a = \\frac{v - u}{t} \\qquad v = u + at \\qquad s = ut + \\frac{1}{2}at^2 \\qquad v^2 = u^2 + 2as",
        symbols: [
          { symbol: "u", meaning: "initial velocity, in m/s" },
          { symbol: "v", meaning: "final velocity, in m/s" },
          { symbol: "a", meaning: "acceleration, in m/s²" },
          { symbol: "t", meaning: "time, in seconds" },
          { symbol: "s", meaning: "displacement, in metres" },
        ],
      },
      authoredExample: {
        prompt: "A scooter moving at 4 m/s speeds up uniformly at 2 m/s² for 5 s. Find its final velocity and the distance it covers in those 5 s.",
        steps: [
          "\\(v = u + at = 4 + 2 \\times 5 = 14\\) m/s.",
          "\\(s = ut + \\frac{1}{2}at^2 = 4 \\times 5 + \\frac{1}{2} \\times 2 \\times 25 = 20 + 25 = 45\\) m.",
          "Check: \\(v^2 = 16 + 2 \\times 2 \\times 45 = 196\\), and \\(14^2 = 196\\).",
        ],
        answer: "14 m/s and 45 m",
      },
      selfCheckExample: {
        prompt: "A car's velocity rises from 10 m/s to 25 m/s in 5 s. What is its acceleration?",
        steps: ["\\(a = \\frac{25 - 10}{5} = \\frac{15}{5} = 3\\ \\mathrm{m/s^2}\\)."],
        answer: "3 m/s²",
      },
      practiceSet: [
        { prompt: "A bus moving at 20 m/s is braked uniformly and stops in 10 s. What is its acceleration?", answer: "\\(\\frac{0 - 20}{10} = -2\\ \\mathrm{m/s^2}\\), a retardation of 2 m/s²" },
        { prompt: "A body starts from rest with an acceleration of 4 m/s². How far does it go in 3 s?", answer: "\\(\\frac{1}{2} \\times 4 \\times 9 = 18\\) m" },
        { prompt: "A car moves at a steady 54 km/h for 2 minutes. What is its acceleration?", answer: "Zero: its velocity (15 m/s) does not change" },
        { prompt: "A body's velocity is 0, 3, 6 and 9 m/s at 0, 1, 2 and 3 s. What kind of motion is this, and what is the acceleration?", answer: "Uniformly accelerated motion, with \\(a = 3\\ \\mathrm{m/s^2}\\)" },
      ],
      pyqExampleId: "0961f149-c2b9-478e-bd93-3101e3e2163f",
      traps: [
        {
          title: "Thinking a fast body must be accelerating",
          body: "Acceleration is a change of velocity. A train going at a steady 100 km/h in a straight line has zero acceleration.",
        },
        {
          title: "Comparing velocities in different units",
          body: "Change km/h to m/s first. 18 km/h is 5 m/s, so a body going from 5 m/s to 18 km/h has not sped up at all.",
        },
        {
          title: "Forgetting the half in s = ut + ½at²",
          body: "From rest at 2 m/s² for 4 s, the distance is \\(\\frac{1}{2} \\times 2 \\times 16 = 16\\) m, not 32 m.",
        },
        {
          title: "Thinking retardation is a separate quantity",
          body: "Retardation is just acceleration that slows the body down. It has the same unit, m/s², and a negative sign.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9mogr-distance",
      name: "Reading a displacement-time graph",
      intuition:
        "A displacement-time graph shows where the body is at each moment. If the line climbs steadily, the body moves away at a steady velocity. If the line is flat, the body is not going anywhere. The steeper the line, the faster the body moves.",
      definition:
        "- The **slope** of a displacement-time graph is the **velocity**.\n" +
        "- A **straight sloping line** means equal displacements in equal times: **uniform velocity**, zero acceleration. Its velocity-time graph is a **horizontal line**.\n" +
        "- A **flat (horizontal) line** means the position is not changing: the body is **at rest**.\n" +
        "- A **steeper** straight line means a **greater** velocity.\n" +
        "- A line sloping **down** towards the time axis means the body is moving **back** towards its starting point.\n" +
        "- A line that **curves upward**, getting steeper, means the velocity is increasing: **accelerated** motion.",
      table: {
        columns: ["Shape of the displacement-time graph", "What the body is doing"],
        rows: [
          { cells: ["Straight line sloping up", "Moving away with uniform velocity"] },
          { cells: ["Flat line", "At rest"] },
          { cells: ["Straight line sloping down", "Coming back towards the start with uniform velocity"] },
          { cells: ["Curve getting steeper", "Speeding up (accelerating)"] },
        ],
        caption: "Any straight sloping part is uniform motion, whether it slopes up or down.",
      },
      selfCheckExample: {
        prompt: "On a displacement-time graph, a body's line is flat from 4 s to 9 s. What is the body doing in that time?",
        steps: ["A flat line means the displacement does not change."],
        answer: "It is at rest",
      },
      practiceSet: [
        { prompt: "What does the slope of a displacement-time graph give?", answer: "The velocity" },
        { prompt: "Two straight displacement-time lines start from the origin, and one is steeper. Which body is faster?", answer: "The body with the steeper line" },
        { prompt: "A displacement-time graph is a straight line rising from the origin. What does the velocity-time graph of the same motion look like?", answer: "A horizontal straight line, because the velocity is constant" },
        { prompt: "A displacement-time graph curves upward and gets steeper and steeper. What is happening to the velocity?", answer: "It is increasing: the body is accelerating" },
      ],
      pyqExampleId: "31a6e084-cec9-4a52-96dc-cf37c4e96cc5",
      traps: [
        {
          title: "Reading a flat line as uniform motion",
          body: "On a displacement-time graph a flat line means the body is at rest. Uniform motion is a straight line that slopes.",
        },
        {
          title: "Reading a straight sloping line as acceleration",
          body: "A straight displacement-time line has a constant slope, so the velocity is constant and the acceleration is zero.",
        },
        {
          title: "Thinking a line sloping down means slowing down",
          body: "On a displacement-time graph a straight line sloping down means the body is coming back towards its start at a steady velocity.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hb9mogr-velocity",
      name: "Reading a velocity-time graph",
      intuition:
        "A velocity-time graph shows how fast the body goes at each moment. How steeply the line climbs tells you the acceleration. The area under the line tells you the distance, because distance is velocity × time, and a rectangle's area is height × width.",
      definition:
        "- The **slope** of a velocity-time graph is the **acceleration**.\n" +
        "- A **horizontal** line: uniform velocity, zero acceleration. A **straight line rising**: uniform acceleration. A **straight line falling**: uniform **retardation** (the body is slowing down).\n" +
        "- The **area under the graph** between two times is the **distance** covered: a rectangle (v × t), a triangle (\\(\\frac{1}{2}\\) × base × height) or a trapezium (half the sum of the two velocities × time).\n" +
        "- For uniform acceleration, **average velocity** = \\(\\frac{u + v}{2}\\), and distance = average velocity × time.\n" +
        "- Read the **scale** on each axis (for example 1 cm = 5 s) and the units (km/h with hours, m/s with seconds).",
      formula: {
        label: "Velocity-time graph",
        latex: "a = \\text{slope} = \\frac{v - u}{t} \\qquad s = \\text{area under the graph} = \\frac{u + v}{2} \\times t",
        symbols: [
          { symbol: "u", meaning: "velocity at the start of the interval" },
          { symbol: "v", meaning: "velocity at the end of the interval" },
          { symbol: "t", meaning: "length of the time interval" },
          { symbol: "s", meaning: "distance covered in the interval" },
        ],
      },
      authoredExample: {
        prompt: "On a velocity-time graph, the velocity rises in a straight line from 4 m/s at t = 2 s to 20 m/s at t = 10 s. Find the acceleration, the average velocity and the distance covered between 2 s and 10 s.",
        steps: [
          "Time interval: \\(10 - 2 = 8\\) s. Acceleration \\(= \\frac{20 - 4}{8} = 2\\ \\mathrm{m/s^2}\\).",
          "Average velocity \\(= \\frac{4 + 20}{2} = 12\\) m/s.",
          "Distance = area of the trapezium \\(= 12 \\times 8 = 96\\) m.",
        ],
        answer: "2 m/s², 12 m/s and 96 m",
      },
      selfCheckExample: {
        prompt: "A velocity-time graph is a horizontal line at 15 m/s. How far does the body go between t = 4 s and t = 10 s?",
        steps: ["The area is a rectangle: \\(15 \\times (10 - 4) = 15 \\times 6 = 90\\) m."],
        answer: "90 m",
      },
      practiceSet: [
        { prompt: "What does the slope of a velocity-time graph give?", answer: "The acceleration" },
        { prompt: "A velocity-time graph falls in a straight line from 20 m/s to zero in 5 s. What distance does the body cover?", answer: "Area of the triangle \\(= \\frac{1}{2} \\times 5 \\times 20 = 50\\) m" },
        { prompt: "A velocity-time graph rises in a straight line from zero to 30 m/s in 6 s. What is the acceleration?", answer: "\\(\\frac{30}{6} = 5\\ \\mathrm{m/s^2}\\)" },
        { prompt: "What does the area under a velocity-time graph give?", answer: "The distance covered" },
      ],
      pyqExampleId: "e8d330a8-a8c3-467f-a9bf-daeb3bc9ad0e",
      traps: [
        {
          title: "Taking the height of the line as the distance",
          body: "The height of a velocity-time graph is the velocity. The distance is the area under the line between the two times.",
        },
        {
          title: "Reading a falling velocity-time line as moving backwards",
          body: "A velocity-time line falling towards zero means the body is slowing down (retardation), still moving forward.",
        },
        {
          title: "Ignoring the scale",
          body: "Read each axis by its scale. If 1 cm stands for 8 m/s, a point 2 cm up is 16 m/s, not 2 m/s.",
        },
      ],
    },
  ],
};
