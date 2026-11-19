import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_FL_LAWS_NOTE: SubtopicNote = {
  subtopicName: "Newton's Laws of Motion",
  title: "Newton's Laws of Motion",
  oneLineDefinition:
    "A body keeps its state of rest or motion unless an unbalanced force acts (inertia); the force equals mass times acceleration, the rate of change of momentum; and every action has an equal and opposite reaction on a different body.",
  whyItMatters:
    "Eight questions in the bank, four EASY, three MODERATE and one HARD. Two are about inertia (sparks leaving a grinding stone, and the laws used in a pole vault), three use the second law (a cyclone uprooting trees, comparing the forces on two spheres, and a force read from a velocity-time graph), and three are about action and reaction, including which forces help a horse pull a cart.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9flla-inertia",
      name: "First law and the three kinds of inertia",
      intuition:
        "Things are lazy about changing what they are doing. A parked bus wants to stay parked; once it is moving, it wants to keep moving in a straight line at the same speed. That laziness is inertia, and the heavier the thing, the more of it there is. Only an unbalanced force can make it change.",
      definition:
        "- **Newton's first law (law of inertia)**: a body stays at **rest**, or keeps moving with **uniform speed in a straight line**, unless an **unbalanced force** acts on it.\n" +
        "- **Inertia** is this tendency of a body not to change its state. Its measure is the body's **mass**: more mass, more inertia.\n" +
        "- **Inertia of rest**: a body at rest tends to stay at rest.\n" +
        "- **Inertia of motion**: a moving body tends to keep moving.\n" +
        "- **Inertia of direction**: a moving body tends to keep moving in the **same direction**, so anything leaving a turning wheel flies off along the **tangent**.\n" +
        "- One action can use all three laws: a pole vaulter's run carries him forward (first law), his force on the pole changes his momentum (second law), and the bent pole pushes him up as he pushes on it (third law).",
      table: {
        columns: ["Kind of inertia", "Meaning", "Everyday example"],
        rows: [
          { cells: ["Inertia of rest", "A body at rest resists starting to move", "Passengers fall backward when a bus starts suddenly; dust leaves a carpet that is beaten"] },
          { cells: ["Inertia of motion", "A moving body resists stopping", "Passengers fall forward when a bus brakes; a long jumper runs before jumping"] },
          { cells: ["Inertia of direction", "A moving body resists turning", "Passengers lean outward when a car turns; mud flies off a spinning wheel along the tangent"] },
        ],
        caption: "Ask what the body was doing before the change: at rest, moving, or moving in a direction.",
      },
      selfCheckExample: {
        prompt: "A passenger standing in a bus falls backward when the bus starts suddenly. Which kind of inertia is this?",
        steps: [
          "The bus starts moving, but the passenger's body was at rest.",
          "The upper body tends to stay at rest while the feet move with the bus.",
        ],
        answer: "Inertia of rest",
      },
      practiceSet: [
        { prompt: "Why does a long jumper run some distance before jumping?", answer: "By inertia of motion, the speed gained in the run carries the body further" },
        { prompt: "Which has more inertia, a cricket ball or a tennis ball of the same size?", answer: "The cricket ball, because it has more mass" },
        { prompt: "When a car takes a sharp turn, the passengers lean outward. Which kind of inertia is this?", answer: "Inertia of direction" },
        { prompt: "What is the measure of the inertia of a body?", answer: "Its mass" },
      ],
      pyqExampleId: "9f2b814d-91fd-42e9-8fc7-7258a91b6c88",
      traps: [
        {
          title: "Thinking inertia depends on speed",
          body: "Inertia depends only on mass. A heavy truck at rest has more inertia than a light bicycle moving fast.",
        },
        {
          title: "Calling a tangential flight inertia of motion",
          body: "When something leaves a turning wheel and flies off along the tangent, it is keeping its direction: that is inertia of direction.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hb9flla-second",
      name: "Second law: F = ma",
      intuition:
        "Push an empty shopping trolley and a full one with the same force: the empty one speeds up much faster. A bigger force gives a bigger change in speed, and a bigger mass gives a smaller one. So force is mass times acceleration. A fast, heavy mass of moving air in a cyclone carries so much momentum that stopping it at a tree means a huge force on the tree.",
      definition:
        "- **Newton's second law**: the rate of change of momentum is proportional to the applied force, and happens in the direction of the force.\n" +
        "- This gives \\(F = ma = \\frac{m(v-u)}{t}\\).\n" +
        "- Unit of force: the **newton (N)**. 1 N gives a mass of 1 kg an acceleration of 1 m/s².\n" +
        "- On a **velocity-time graph**, the acceleration is the **slope**: change in velocity divided by the time taken.\n" +
        "- To compare forces on different bodies, work out **m × a** for each. A larger acceleration does not mean a larger force if the mass is smaller.\n" +
        "- Change grams to kilograms first: 1 g = 0.001 kg.",
      formula: {
        label: "Newton's second law",
        latex: "F = ma \\qquad a = \\frac{v-u}{t} \\qquad F = \\frac{m(v-u)}{t}",
        symbols: [
          { symbol: "F", meaning: "net force, in newtons (N)" },
          { symbol: "m", meaning: "mass, in kilograms" },
          { symbol: "a", meaning: "acceleration, in m/s²" },
          { symbol: "u, v", meaning: "initial and final velocity, in m/s" },
          { symbol: "t", meaning: "time taken, in seconds" },
        ],
      },
      authoredExample: {
        prompt: "A car of mass 1200 kg speeds up from 10 m/s to 25 m/s in 5 s. Find its acceleration and the force acting on it.",
        steps: [
          "\\(a = \\frac{v-u}{t} = \\frac{25-10}{5} = 3\\) m/s².",
          "\\(F = ma = 1200 \\times 3 = 3600\\) N.",
        ],
        answer: "3 m/s² and 3600 N",
      },
      selfCheckExample: {
        prompt: "What force is needed to give a 500 g ball an acceleration of 6 m/s²?",
        steps: ["500 g = 0.5 kg.", "\\(F = 0.5 \\times 6 = 3\\) N."],
        answer: "3 N",
      },
      practiceSet: [
        { prompt: "A force of 20 N acts on a trolley of mass 4 kg. What is its acceleration?", answer: "\\(\\frac{20}{4} = 5\\) m/s²" },
        { prompt: "The velocity-time graph of a 2 kg cart is a straight line from 0 m/s to 12 m/s in 4 s. What force acts on it?", answer: "\\(a = \\frac{12}{4} = 3\\) m/s², so \\(F = 2 \\times 3 = 6\\) N" },
        { prompt: "The same force acts on two bodies, one with twice the mass of the other. How do their accelerations compare?", answer: "The heavier body gets half the acceleration" },
        { prompt: "Why does a cricketer pull his hands back while catching a fast ball?", answer: "Taking a longer time to stop the ball lowers the rate of change of momentum, so the force on his hands is smaller" },
      ],
      pyqExampleId: "c2e0f054-a1a7-48a9-9d00-fd4c9fce436c",
      traps: [
        {
          title: "Leaving the mass in grams",
          body: "F = ma needs the mass in kilograms. A 250 g body with an acceleration of 4 m/s² needs 1 N, not 1000 N.",
        },
        {
          title: "Taking the larger acceleration as the larger force",
          body: "Force is mass times acceleration. A light body can have a large acceleration from a small force, so work out m × a for each body.",
        },
        {
          title: "Reading the slope of a velocity-time graph as speed",
          body: "On a velocity-time graph the slope is the acceleration. Multiply it by the mass to get the force.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9flla-third",
      name: "Third law: action and reaction",
      intuition:
        "Push a wall and the wall pushes your hand back just as hard: you can feel it. Forces always come in pairs like this. The pair never cancel out, because one acts on the wall and the other on you. To walk, you push the ground backward and the ground pushes you forward.",
      definition:
        "- **Newton's third law**: to every action there is an **equal and opposite reaction**.\n" +
        "- Action and reaction are **equal in size** and **opposite in direction**.\n" +
        "- They act on **two different bodies**, so they **never cancel** each other.\n" +
        "- They act at the **same instant**: the reaction does not come after the action.\n" +
        "- A body moves forward when something **else** pushes it forward: the ground on your feet, the water on a swimmer, the gases on a rocket.",
      table: {
        columns: ["Action", "Reaction"],
        rows: [
          { cells: ["Your feet push the ground backward", "The ground pushes you forward"] },
          { cells: ["A swimmer pushes the water backward", "The water pushes the swimmer forward"] },
          { cells: ["A rocket pushes hot gases downward", "The gases push the rocket upward"] },
          { cells: ["A gun pushes the bullet forward", "The bullet pushes the gun backward (recoil)"] },
        ],
        caption: "Each pair acts on two different bodies, which is why both can make something move.",
      },
      selfCheckExample: {
        prompt: "When you push a wall, the wall pushes you back with an equal force. Why do these two forces not cancel each other?",
        steps: ["Your push acts on the wall.", "The wall's push acts on you, a different body."],
        answer: "They act on different bodies, and only forces on the same body can cancel.",
      },
      practiceSet: [
        { prompt: "A boat moves backward when a person jumps forward out of it. Which law of motion explains this?", answer: "Newton's third law" },
        { prompt: "How does the size of a reaction force compare with the size of its action force?", answer: "They are equal" },
        { prompt: "Does the reaction force act a moment after the action force?", answer: "No: action and reaction act at the same instant" },
        { prompt: "What pushes a swimmer forward through the water?", answer: "The water, pushing back on the swimmer as the swimmer pushes the water backward" },
      ],
      pyqExampleId: "937da5f3-cefc-4e68-bcc6-726e76d6c876",
      traps: [
        {
          title: "Thinking action and reaction cancel",
          body: "They act on different bodies, so they cannot cancel. Forces cancel only when they act on the same body.",
        },
        {
          title: "Saying the reaction comes after the action",
          body: "Action and reaction arise together, at the same instant. Neither comes first.",
        },
        {
          title: "Giving the heavier body the bigger force",
          body: "When a truck and a car collide, each pushes the other with the same force. The car changes speed more only because its mass is smaller.",
        },
      ],
    },
  ],
};
