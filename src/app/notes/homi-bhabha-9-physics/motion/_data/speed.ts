import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_MO_SPEED_NOTE: SubtopicNote = {
  subtopicName: "Speed and Velocity",
  title: "Speed and Velocity",
  oneLineDefinition:
    "Rest and motion are judged against a reference point; distance is the whole path and displacement the straight line from start to finish, so speed is distance per unit time and velocity is speed in a given direction.",
  whyItMatters:
    "Nine questions in the bank, five EASY, three MODERATE and one HARD. Two ask what rest and motion mean (a person in a bus, a bullet that spins as it flies). Four set distance against displacement and speed against velocity, one of them a run round a circular track that ends where it began. Three are speed sums: two round a circular path, and the HARD one a car whose velocity doubles every two seconds.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9mosp-kinds",
      name: "Rest, motion and kinds of motion",
      intuition:
        "Sit in a moving train and look at the person opposite: they stay in the same place, so they are at rest compared with you. Look out of the window and the trees rush past. Whether something is at rest or moving depends on what you compare it with. Motion also comes in different kinds, and one body can have two kinds at once.",
      definition:
        "- A body is **at rest** if its position does not change with time compared with a **reference point**, and **in motion** if it does.\n" +
        "- Rest and motion are **relative**: a passenger in a moving bus is at rest compared with the bus but moving compared with the trees outside.\n" +
        "- **Linear** motion is along a straight line; **circular** motion is along a circle; **rotational** motion is spinning about an axis; **oscillatory** (vibrational) motion is to and fro about a fixed point.\n" +
        "- One body can have **two motions at once**: a bullet fired from a rifle moves straight ahead (linear) and spins about its own axis (rotational); the wheel of a moving cycle rolls forward and turns.",
      table: {
        columns: ["Kind of motion", "What happens", "Examples"],
        rows: [
          { cells: ["Linear", "Moves along a straight line", "A car on a straight road, a stone dropped from a height"] },
          { cells: ["Circular", "Moves along a circle", "The tip of a clock's hand, a stone whirled on a string"] },
          { cells: ["Rotational", "Spins about an axis", "A spinning top, a fan, the Earth about its axis"] },
          { cells: ["Oscillatory (vibrational)", "Moves to and fro about a fixed point", "A swinging pendulum, a plucked guitar string"] },
        ],
        caption: "A bullet from a rifle is both linear and rotational.",
      },
      selfCheckExample: {
        prompt: "A girl sits in a moving train. Is she at rest or in motion compared with her seat, and compared with a pole on the platform?",
        steps: ["Her position does not change compared with the seat.", "Her position keeps changing compared with the pole."],
        answer: "At rest compared with the seat; in motion compared with the pole",
      },
      practiceSet: [
        { prompt: "What kind of motion does the pendulum of a wall clock have?", answer: "Oscillatory motion: it swings to and fro about a fixed point" },
        { prompt: "Name the two kinds of motion of the wheel of a moving bicycle.", answer: "Rotational (it turns about its axle) and linear (it moves forward along the road)" },
        { prompt: "What kind of motion does a spinning top have?", answer: "Rotational motion" },
        { prompt: "When is a body said to be at rest?", answer: "When its position does not change with time compared with a reference point" },
      ],
      pyqExampleId: "1fced7e4-cacd-4181-bf98-60dbea00dc99",
      traps: [
        {
          title: "Thinking rest is the same for everyone",
          body: "Rest and motion depend on the reference point. A body at rest compared with a bus is moving compared with the road if the bus moves.",
        },
        {
          title: "Giving a body only one kind of motion",
          body: "A bullet from a rifle moves forward in a straight line and spins at the same time, so its motion is both linear and rotational.",
        },
        {
          title: "Calling a pendulum's swing circular motion",
          body: "A pendulum goes to and fro about a fixed point, so its motion is oscillatory.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9mosp-velocity",
      name: "Distance and displacement, speed and velocity",
      intuition:
        "Walk once round a playground and stop where you began. Your feet have covered the whole track, that is the distance. But you are back at the start, so you have not been displaced at all. Speed uses the distance; velocity uses the displacement, and so it also carries a direction.",
      definition:
        "- **Distance**: the total length of the path covered. **Displacement**: the shortest straight-line distance from the start to the end, in a stated direction.\n" +
        "- Displacement is never more than distance. It is **zero** when the body comes back to its start. Along a straight line in one direction, displacement **equals** distance (ratio 1 : 1).\n" +
        "- **Speed** = distance ÷ time. **Velocity** = displacement ÷ time: velocity is **speed in a given direction**.\n" +
        "- **Average speed** = total distance ÷ total time. **Average velocity** = total displacement ÷ total time. After a full round on a closed path the average velocity is **zero**.\n" +
        "- **Uniform motion**: equal distances in equal intervals of time. Then the average speed equals the speed at every instant.\n" +
        "- Unit: m/s. To change km/h to m/s multiply by \\(\\frac{5}{18}\\): 18 km/h = 5 m/s, 36 km/h = 10 m/s.",
      table: {
        columns: ["Quantity", "Meaning", "Can it be zero for a body that has moved?"],
        rows: [
          { cells: ["Distance", "Total length of the path", "No"] },
          { cells: ["Displacement", "Straight line from start to end, with direction", "Yes, after coming back to the start"] },
          { cells: ["Average speed", "Total distance ÷ total time", "No"] },
          { cells: ["Average velocity", "Total displacement ÷ total time", "Yes, after a full round"] },
        ],
        caption: "Neither speed nor velocity is always bigger: along a straight line in one direction they are equal.",
      },
      selfCheckExample: {
        prompt: "A boy walks 40 m east and then 30 m west along the same road. What distance has he covered, and what is his displacement?",
        steps: ["Distance adds up the whole path: \\(40 + 30 = 70\\) m.", "Displacement is where he ends compared with the start: 10 m east."],
        answer: "Distance 70 m; displacement 10 m east",
      },
      practiceSet: [
        { prompt: "A cyclist rides 2 km to school and back home along the same road. What distance has she covered, and what is her displacement?", answer: "Distance 4 km; displacement zero" },
        { prompt: "Change 72 km/h into m/s.", answer: "\\(72 \\times \\frac{5}{18} = 20\\) m/s" },
        { prompt: "Which quantity tells both how fast a body moves and in which direction?", answer: "Velocity" },
        { prompt: "A body moves with a uniform speed of 4 m/s for 10 s. What is its average speed?", answer: "4 m/s: in uniform motion the average speed equals the speed at every instant" },
      ],
      pyqExampleId: "11b10935-8e12-4113-9521-8846c560ae14",
      traps: [
        {
          title: "Taking average velocity equal to average speed on a closed path",
          body: "After a full round the displacement is zero, so the average velocity is zero, even though the average speed is not.",
        },
        {
          title: "Thinking displacement can be more than distance",
          body: "The straight line from start to end is the shortest path, so displacement is always less than or equal to distance.",
        },
        {
          title: "Thinking velocity is always bigger, or always smaller, than speed",
          body: "Velocity is speed with a direction. Along a straight line in one direction the two are equal; on a winding or returning path the average velocity is smaller.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hb9mosp-speed",
      name: "Speed on straight and circular paths",
      intuition:
        "Speed is just how much ground you cover each second. On a circular track, one round is the length of the circle, its circumference. When a trip has several stretches, add up all the distances and all the times; do not simply average the speeds, unless each stretch took the same time.",
      definition:
        "- **Speed** = distance ÷ time: \\(v = \\frac{s}{t}\\). Change minutes to seconds (or hours) first.\n" +
        "- One round of a circle of radius r is its **circumference** \\(2\\pi r\\) (or \\(\\pi d\\) for diameter d), with \\(\\pi = \\frac{22}{7}\\) or 3.14.\n" +
        "- Speed on a circular path = (number of rounds × \\(2\\pi r\\)) ÷ time.\n" +
        "- **Average speed** = total distance ÷ total time. Only when every stretch takes the **same time** is it the plain average of the speeds.\n" +
        "- Distance in a stretch at a steady speed = speed × time.",
      formula: {
        label: "Speed",
        latex: "v = \\frac{s}{t} \\qquad \\text{one round} = 2\\pi r = \\pi d \\qquad v_{av} = \\frac{\\text{total distance}}{\\text{total time}}",
        symbols: [
          { symbol: "v", meaning: "speed, in m/s" },
          { symbol: "s", meaning: "distance, in metres" },
          { symbol: "t", meaning: "time, in seconds" },
          { symbol: "r", meaning: "radius of the circular path" },
          { symbol: "d", meaning: "diameter of the circular path" },
        ],
      },
      authoredExample: {
        prompt: "A cyclist goes 5 times round a circular track of radius 21 m in 1 minute. Find the cyclist's speed and average velocity. Take π = 22/7.",
        steps: [
          "One round: \\(2 \\times \\frac{22}{7} \\times 21 = 132\\) m. Five rounds: \\(5 \\times 132 = 660\\) m.",
          "Time: 1 minute = 60 s. Speed \\(= \\frac{660}{60} = 11\\) m/s.",
          "After whole rounds the cyclist is back at the start, so the displacement and the average velocity are zero.",
        ],
        answer: "Speed 11 m/s; average velocity 0 m/s",
      },
      selfCheckExample: {
        prompt: "A bus travels 30 km in the first hour and 50 km in the second hour. What is its average speed?",
        steps: ["Total distance \\(30 + 50 = 80\\) km in a total time of 2 h.", "\\(\\frac{80}{2} = 40\\) km/h."],
        answer: "40 km/h",
      },
      practiceSet: [
        { prompt: "A runner goes once round a circular track of diameter 14 m in 11 s. What is the runner's speed? Take π = 22/7.", answer: "\\(\\frac{22}{7} \\times 14 = 44\\) m, so \\(\\frac{44}{11} = 4\\) m/s" },
        { prompt: "A train covers 120 km in 1 hour 30 minutes. What is its average speed?", answer: "\\(\\frac{120}{1.5} = 80\\) km/h" },
        { prompt: "A car moves at 10 m/s for 4 s and then at 20 m/s for 4 s. What is its average speed?", answer: "\\(\\frac{40 + 80}{8} = 15\\) m/s" },
        { prompt: "A cyclist rides 2 km at 10 km/h and then 2 km at 20 km/h. What is the average speed for the whole ride?", answer: "Times 0.2 h and 0.1 h, so \\(\\frac{4}{0.3} \\approx 13.3\\) km/h, not 15 km/h" },
      ],
      pyqExampleId: "ea4f9068-f152-4443-b5ef-0f88bb3a26ff",
      traps: [
        {
          title: "Averaging the speeds when the times differ",
          body: "Average speed is total distance divided by total time. The plain average of two speeds is right only when both stretches take the same time.",
        },
        {
          title: "Using the radius as the length of one round",
          body: "One round of a circle is \\(2\\pi r\\). A track of radius 7 m is 44 m round, not 7 m.",
        },
        {
          title: "Leaving the time in minutes",
          body: "For a speed in m/s the time must be in seconds. 300 m in 2 minutes is \\(\\frac{300}{120} = 2.5\\) m/s, not 150 m/s.",
        },
      ],
    },
  ],
};
