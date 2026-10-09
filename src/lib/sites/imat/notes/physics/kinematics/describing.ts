import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_PHY_KIN_DESCRIBING_NOTE: SubtopicNote = {
  subtopicName: "Describing Motion",
  title: "Displacement, Velocity, Relative Motion and Acceleration",
  oneLineDefinition:
    "Velocity is how fast position changes, with a direction; acceleration is how fast velocity changes; and velocities measured by moving observers add like vectors.",
  whyItMatters:
    "Six of the eight past questions are on this page, all four ministry ones among them: a definition of velocity in 2026, the average velocity of a two-leg trip in 2023, one car overtaking another in 2025, and when Galilean transformations hold in 2026. The older papers asked for a displacement after four legs and a boat crossing a flowing river.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-kin-velocity",
      name: "Distance and displacement, speed and velocity",
      intuition:
        "Distance counts every step you take; displacement only cares where you end up compared with where you started, and in which direction. Speed and velocity follow the same split. A runner who finishes a lap where she began has covered a long distance at a good speed, yet her displacement and her average velocity are both zero.",
      definition:
        "- **Distance** (scalar): the length of the path. **Displacement** (vector): the straight line from start to finish, with its direction.\n" +
        "- **Average speed** = total distance ÷ total time. **Average velocity** = displacement ÷ total time.\n" +
        "- **Velocity** is the rate of change of position: it says how quickly, and in which direction, a body changes its position.\n" +
        "- In **uniform motion** (constant velocity in a straight line), \\(s = vt\\).\n" +
        "- Unit change: \\(1\\ \\text{m/s} = 3.6\\ \\text{km/h}\\). Divide km/h by 3.6 to get m/s.",
      formula: {
        label: "Average speed and average velocity",
        latex: "\\text{average speed} = \\frac{\\text{distance}}{t} \\qquad \\bar{v} = \\frac{\\Delta s}{t}",
        symbols: [
          { symbol: "\\(\\bar{v}\\)", meaning: "average velocity, a vector" },
          { symbol: "\\(\\Delta s\\)", meaning: "displacement, from start to finish, in m" },
          { symbol: "\\(t\\)", meaning: "total time taken, in s" },
        ],
      },
      authoredExample: {
        prompt:
          "A dog runs 30 m east to fetch a ball and then 40 m west, taking 10 s in all. Find its average speed and its average velocity.",
        steps: [
          "Distance: \\(30 + 40 = 70\\ \\text{m}\\), so average speed \\(= 70 / 10 = 7.0\\ \\text{m/s}\\).",
          "Displacement: 30 m east then 40 m west leaves the dog 10 m west of the start.",
          "Average velocity \\(= 10 / 10 = 1.0\\ \\text{m/s}\\) west. The direction is part of the answer.",
        ],
        answer: "Average speed 7.0 m/s; average velocity 1.0 m/s west",
      },
      selfCheckExample: {
        prompt:
          "A hiker walks 5.0 km due north and then 12 km due west, taking 2.5 hours in total. What is the size of her average velocity?",
        options: ["6.8 km/h", "2.8 km/h", "5.2 km/h", "13 km/h", "32.5 km/h"],
        steps: [
          "The two legs are at right angles, so the displacement is \\(\\sqrt{5.0^2 + 12^2} = 13\\ \\text{km}\\).",
          "Average velocity \\(= 13 / 2.5 = 5.2\\ \\text{km/h}\\).",
          "Option A divides the distance (17 km) by the time: that is the average speed. B subtracts the legs. D forgets to divide by the time, and E multiplies by it.",
        ],
        answer: "(C) 5.2 km/h",
      },
      practiceSet: [
        { prompt: "Convert 72 km/h to m/s.", answer: "20 m/s", method: "\\(72 / 3.6\\)" },
        { prompt: "Convert 15 m/s to km/h.", answer: "54 km/h", method: "\\(15 \\times 3.6\\)" },
        { prompt: "A car drives 60 km at 60 km/h and then 60 km at 30 km/h. What is its average speed?", answer: "40 km/h", method: "120 km in 1 h + 2 h = 3 h" },
        { prompt: "A swimmer swims two full lengths of a 50 m pool, ending where she started. What is her displacement?", answer: "Zero", method: "Same start and finish" },
      ],
      traps: [
        {
          title: "Average speed is not the average of the speeds",
          body: "Average speed is total distance over total time. Going 60 km at 60 km/h and 60 km back at 30 km/h gives 40 km/h, not 45 km/h, because more time is spent at the lower speed.",
        },
        {
          title: "Average velocity uses the straight-line displacement",
          body: "For a trip with legs at right angles, the displacement comes from Pythagoras, not from adding the legs. Dividing the total path by the time gives the average speed, and IMAT lists it as a wrong option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-kin-relative",
      name: "Relative velocity and Galilean transformations",
      intuition:
        "Velocity is always measured by someone. A passenger walking down a moving train has one velocity relative to the train and another relative to the ground. As long as one observer moves at a constant velocity in a straight line relative to the other, you get from one measurement to the other by simply adding or subtracting that velocity.",
      definition:
        "- The **velocity of A relative to B** is \\(v_{AB} = v_A - v_B\\) (vectors).\n" +
        "- Same direction: the relative speed is the **difference** of the speeds. Opposite directions: it is the **sum**.\n" +
        "- A boat or plane moving through water or air that itself moves: its velocity over the ground is the **vector sum** of its velocity through the medium and the medium's velocity.\n" +
        "- **Galilean transformations** (\\(x' = x - ut\\), \\(v' = v - u\\)) link two observers in **uniform rectilinear motion** relative to each other (constant velocity, straight line). They do not hold if one observer accelerates or rotates.\n" +
        "- Both observers then measure the **same acceleration** for any object. (At speeds near that of light, relativity replaces these rules.)",
      formula: {
        label: "Relative velocity",
        latex: "v_{AB} = v_A - v_B \\qquad t_{\\text{catch}} = \\frac{\\text{gap}}{v_A - v_B}",
        symbols: [
          { symbol: "\\(v_A, v_B\\)", meaning: "velocities of A and B measured by the same observer" },
          { symbol: "\\(t_{\\text{catch}}\\)", meaning: "time for A to close a gap on B ahead of it, moving the same way" },
        ],
      },
      authoredExample: {
        prompt:
          "A bus leaves a stop at a steady 15 m/s. A car passes the same stop 20 s later at a steady 25 m/s on the same road. How long after passing the stop does the car catch the bus?",
        steps: [
          "When the car passes the stop, the bus is \\(15 \\times 20 = 300\\ \\text{m}\\) ahead.",
          "Relative to the bus, the car closes the gap at \\(25 - 15 = 10\\ \\text{m/s}\\).",
          "Time to close it: \\(300 / 10 = 30\\ \\text{s}\\). Check: in 30 s the car goes 750 m and the bus, starting 300 m ahead, reaches \\(300 + 450 = 750\\ \\text{m}\\).",
        ],
        answer: "30 s after the car passes the stop",
      },
      selfCheckExample: {
        prompt:
          "A small plane points due north and flies at 120 m/s relative to the air. A wind blows towards the east at 50 m/s. What is the plane's speed relative to the ground?",
        options: ["170 m/s", "130 m/s", "120 m/s", "109 m/s", "70 m/s"],
        steps: [
          "The plane's velocity through the air (north) and the air's velocity (east) are at right angles.",
          "Ground speed \\(= \\sqrt{120^2 + 50^2} = \\sqrt{16\\,900} = 130\\ \\text{m/s}\\), aimed east of north.",
          "A and E add and subtract the speeds as if they were in a line. D subtracts the squares, which would be the case only if the plane aimed partly into the wind to fly due north.",
        ],
        answer: "(B) 130 m/s",
      },
      practiceSet: [
        { prompt: "Two trains approach each other on parallel tracks at 20 m/s and 30 m/s. At what rate does the gap between them close?", answer: "50 m/s", method: "Opposite directions: add" },
        { prompt: "A passenger walks forwards at 1.5 m/s along a train moving at 20 m/s. What is her speed relative to the ground?", answer: "21.5 m/s", method: "Same direction: add" },
        { prompt: "A swimmer heads straight across a river at 0.8 m/s through the water; the river flows at 0.6 m/s. What is his speed relative to the bank?", answer: "1.0 m/s", method: "\\(\\sqrt{0.8^2 + 0.6^2}\\)" },
        { prompt: "Do Galilean transformations hold between the ground and a car that is braking?", answer: "No", method: "The car's frame is accelerating" },
      ],
      traps: [
        {
          title: "Galilean transformations need uniform straight-line relative motion",
          body: "They hold only when one observer moves at a constant velocity in a straight line relative to the other. Accelerating, braking or rotating observers are excluded, even when the rotation is at a constant rate.",
        },
        {
          title: "Check the units before comparing a gap with a speed",
          body: "When speeds are in km/h and a gap is in metres, convert first. A gap of 400 m closed at 36 km/h (10 m/s) takes 40 s; dividing 400 by 36 gives a meaningless 11.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-kin-acceleration",
      name: "Acceleration: the rate of change of velocity",
      intuition:
        "Acceleration tells you how quickly the velocity is changing. Since velocity has a direction, a body accelerates when it speeds up, slows down, or simply turns. A car cruising at a steady 100 km/h on a straight road has zero acceleration, however fast it goes.",
      definition:
        "- **Acceleration** is the change of velocity per unit time, a vector measured in \\(\\text{m/s}^2\\).\n" +
        "- Slowing down is an acceleration opposite to the velocity (a negative value if forwards is positive), often called **deceleration**.\n" +
        "- **Uniform motion** means constant velocity, so zero acceleration. **Uniformly accelerated motion** means the acceleration is constant.\n" +
        "- A body can have zero velocity and still be accelerating (a ball at the top of its flight).",
      formula: {
        label: "Average acceleration",
        latex: "a = \\frac{\\Delta v}{\\Delta t} = \\frac{v - u}{t}",
        symbols: [
          { symbol: "\\(u\\)", meaning: "initial velocity, in m/s" },
          { symbol: "\\(v\\)", meaning: "final velocity, in m/s" },
          { symbol: "\\(t\\)", meaning: "time taken, in s" },
        ],
      },
      authoredExample: {
        prompt: "A car speeds up from 8.0 m/s to 26 m/s in 6.0 s on a straight road. What is its acceleration?",
        steps: [
          "Change in velocity: \\(26 - 8.0 = 18\\ \\text{m/s}\\).",
          "\\(a = 18 / 6.0 = 3.0\\ \\text{m/s}^2\\), in the direction of motion.",
        ],
        answer: "\\(3.0\\ \\text{m/s}^2\\)",
      },
      selfCheckExample: {
        prompt:
          "A train slows from 30 m/s to 12 m/s in 9.0 s along a straight track. Taking its direction of motion as positive, what is its acceleration?",
        options: [
          "\\(2.0\\ \\text{m/s}^2\\)",
          "\\(4.7\\ \\text{m/s}^2\\)",
          "\\(-3.3\\ \\text{m/s}^2\\)",
          "\\(1.3\\ \\text{m/s}^2\\)",
          "\\(-2.0\\ \\text{m/s}^2\\)",
        ],
        steps: [
          "\\(a = (v - u)/t = (12 - 30)/9.0 = -18/9.0 = -2.0\\ \\text{m/s}^2\\).",
          "The minus sign says the acceleration points against the motion: the train is slowing.",
          "A loses the sign; B adds the speeds; C uses only the starting speed; D uses only the final speed.",
        ],
        answer: "(E) \\(-2.0\\ \\text{m/s}^2\\)",
      },
      practiceSet: [
        { prompt: "A car reaches 100 km/h from rest in 5.0 s. What is its average acceleration?", answer: "About \\(5.6\\ \\text{m/s}^2\\)", method: "\\(100/3.6 = 27.8\\ \\text{m/s}\\), divided by 5.0" },
        { prompt: "A cyclist rides at a steady 10 m/s in a straight line for a minute. What is her acceleration?", answer: "Zero", method: "Velocity does not change" },
        { prompt: "A runner goes round a bend at a constant 6 m/s. Is she accelerating?", answer: "Yes", method: "Her direction, and so her velocity, changes" },
      ],
      traps: [
        {
          title: "Zero velocity does not mean zero acceleration",
          body: "At the top of its flight a ball thrown straight up is momentarily still, but gravity is still changing its velocity at \\(9.8\\ \\text{m/s}^2\\) downwards. Acceleration depends on how velocity is changing, not on its value.",
        },
      ],
    },
  ],
};
