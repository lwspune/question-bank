import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_PHY_DYN_NEWTON_NOTE: SubtopicNote = {
  subtopicName: "Newton's Laws of Motion",
  title: "Mass, Weight and Newton's Three Laws",
  oneLineDefinition:
    "A body keeps its velocity unless a resultant force acts; the resultant force equals mass times acceleration; and forces always come in equal and opposite pairs acting on two different bodies.",
  whyItMatters:
    "Three past questions test the second law directly: what a constant resultant force does to a train's acceleration and velocity (2018), the starting acceleration of a rocket (2020), and the engine force on a car first at steady speed and then while accelerating (2025).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-dyn-mass-weight",
      name: "Mass and weight are different quantities",
      intuition:
        "Mass is how much matter a body has and how hard it is to speed up; it is the same everywhere. Weight is the pull of gravity on that mass, so it depends on where you are. An astronaut on the Moon keeps her mass but weighs about a sixth as much.",
      definition:
        "- **Mass** \\(m\\): a scalar, in kg, the same everywhere.\n" +
        "- **Weight** \\(W\\): the gravitational force on a body, a vector pointing down, in newtons.\n" +
        "- **Gravitational field strength** \\(g\\): the weight per kilogram, in N/kg. On Earth \\(g \\approx 9.8\\ \\text{N/kg}\\) (often rounded to 10); on the Moon about 1.6 N/kg.\n" +
        "- The N/kg of field strength is the same unit as the \\(\\text{m/s}^2\\) of free-fall acceleration.",
      formula: {
        label: "Weight",
        latex: "W = mg",
        symbols: [
          { symbol: "\\(W\\)", meaning: "weight, in N" },
          { symbol: "\\(m\\)", meaning: "mass, in kg" },
          { symbol: "\\(g\\)", meaning: "gravitational field strength, in N/kg" },
        ],
      },
      authoredExample: {
        prompt: "An astronaut has a mass of 60 kg. What are her mass and her weight on the Moon, where \\(g = 1.6\\ \\text{N/kg}\\)?",
        steps: [
          "Mass does not depend on place: still 60 kg.",
          "Weight on the Moon: \\(W = mg = 60 \\times 1.6 = 96\\ \\text{N}\\).",
        ],
        answer: "Mass 60 kg; weight 96 N",
      },
      selfCheckExample: {
        prompt:
          "An object weighs 49 N on Earth, where \\(g = 9.8\\ \\text{N/kg}\\). It is taken to a planet where \\(g = 3.7\\ \\text{N/kg}\\). What are its mass and its weight there?",
        options: ["1.9 kg and 18.5 N", "5.0 kg and 49 N", "5.0 kg and 18.5 N", "13 kg and 49 N", "13 kg and 18.5 N"],
        steps: [
          "Mass: \\(m = W/g = 49/9.8 = 5.0\\ \\text{kg}\\), and it is the same on the planet.",
          "Weight there: \\(5.0 \\times 3.7 = 18.5\\ \\text{N}\\).",
          "B keeps the Earth weight. D and E divide 49 N by the planet's \\(g\\). A divides the new weight by Earth's \\(g\\), as if mass changed.",
        ],
        answer: "(C) 5.0 kg and 18.5 N",
      },
      practiceSet: [
        { prompt: "What is the weight of a 0.25 kg apple, with \\(g = 10\\ \\text{N/kg}\\)?", answer: "2.5 N", method: "\\(W = mg\\)" },
        { prompt: "Which changes when you travel to the Moon: your mass, your weight, or both?", answer: "Only the weight", method: "\\(g\\) changes, \\(m\\) does not" },
        { prompt: "A body weighs 300 N where \\(g = 10\\ \\text{N/kg}\\). What is its mass?", answer: "30 kg", method: "\\(m = W/g\\)" },
      ],
      traps: [
        {
          title: "The kilogram is not a unit of weight",
          body: "In everyday speech people weigh 60 kg, but in physics weight is a force in newtons. A 60 kg person weighs about 590 N on Earth. An option giving a weight in kg, or a mass in N, is wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-dyn-first-law",
      name: "Newton's first law: balanced forces mean constant velocity",
      intuition:
        "A puck on smooth ice slides on and on; it only stops because something pushes on it. A body needs no force to keep moving, only to change how it moves. So when all the forces on a body cancel, it is either at rest or moving in a straight line at a steady speed.",
      definition:
        "**Newton's first law**: a body stays at rest, or keeps moving at constant velocity in a straight line, unless a **resultant (net) force** acts on it.\n" +
        "- **Inertia** is the tendency to keep the same velocity; mass measures it.\n" +
        "- Constant velocity tells you the resultant force is **zero**: the forces are **balanced**.\n" +
        "- So a car at a steady speed on a level road has an engine force exactly equal to the resistive forces.\n" +
        "- A **free-body diagram** shows one body alone with every force on it as an arrow; only forces ON that body go in it.",
      authoredExample: {
        prompt:
          "A lift of total mass 800 kg moves upwards at a steady 2.0 m/s. Taking \\(g = 10\\ \\text{N/kg}\\), what is the tension in the cable?",
        steps: [
          "Free-body diagram: tension \\(T\\) up, weight \\(mg = 800 \\times 10 = 8000\\ \\text{N}\\) down.",
          "Steady velocity means zero resultant force, so \\(T = 8000\\ \\text{N}\\).",
          "The upward motion needs no extra force; only a change of velocity would.",
        ],
        answer: "8000 N",
      },
      selfCheckExample: {
        prompt:
          "A parachutist of total mass 70 kg falls at a constant speed. Taking \\(g = 10\\ \\text{N/kg}\\), what is the upward air resistance on her?",
        options: ["0 N", "70 N", "less than 700 N", "700 N", "more than 700 N"],
        steps: [
          "Constant speed in a straight line means the resultant force is zero.",
          "So air resistance balances the weight: \\(70 \\times 10 = 700\\ \\text{N}\\).",
          "C is the common belief that the weight must win for her to keep falling; it would make her speed up. B confuses mass with weight.",
        ],
        answer: "(D) 700 N",
      },
      practiceSet: [
        { prompt: "A car moves at a steady 25 m/s on a level road with a driving force of 3000 N. What is the total resistive force?", answer: "3000 N", method: "Constant velocity, balanced forces" },
        { prompt: "A space probe far from any planet switches its engines off. What happens to its motion?", answer: "It keeps moving at constant velocity", method: "No resultant force" },
        { prompt: "What is the resultant force on a book resting on a table?", answer: "Zero", method: "It stays at rest" },
      ],
      traps: [
        {
          title: "Motion does not need a resultant force",
          body: "A body moving at constant velocity has zero resultant force. A resultant force is needed to change the velocity, not to keep it. Options claiming that the forward force must exceed the drag for a car to keep moving steadily are wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-dyn-second-law",
      name: "Newton's second law: resultant force equals mass times acceleration",
      intuition:
        "Push a trolley harder and it speeds up faster; load it with more mass and the same push speeds it up less. The acceleration follows the RESULTANT force, the sum of all the forces, not any single one. A constant resultant force gives a constant acceleration, so the velocity keeps rising steadily.",
      definition:
        "**Newton's second law**: \\(F_{\\text{net}} = ma\\), and the acceleration is in the direction of the resultant force.\n" +
        "- \\(1\\ \\text{N}\\) is the resultant force that gives 1 kg an acceleration of \\(1\\ \\text{m/s}^2\\).\n" +
        "- Method: draw the free-body diagram, add the forces along the line of motion with signs, then divide by the mass.\n" +
        "- Something pushed up against gravity (a rocket, a lift): \\(T - mg = ma\\), so \\(a = T/m - g\\).\n" +
        "- A car speeding up against friction: engine force \\(= f + ma\\).",
      formula: {
        label: "Newton's second law",
        latex: "F_{\\text{net}} = ma",
        symbols: [
          { symbol: "\\(F_{\\text{net}}\\)", meaning: "resultant of all forces on the body, in N" },
          { symbol: "\\(m\\)", meaning: "mass, in kg" },
          { symbol: "\\(a\\)", meaning: "acceleration, in m/s²" },
        ],
      },
      authoredExample: {
        prompt:
          "A crane cable lifts a 1200 kg load with a tension of 15 000 N. Taking \\(g = 10\\ \\text{N/kg}\\), what is the load's acceleration?",
        steps: [
          "Weight: \\(1200 \\times 10 = 12\\,000\\ \\text{N}\\) down. Tension: \\(15\\,000\\ \\text{N}\\) up.",
          "Resultant: \\(15\\,000 - 12\\,000 = 3000\\ \\text{N}\\) upwards.",
          "\\(a = 3000/1200 = 2.5\\ \\text{m/s}^2\\) upwards. Using the tension alone (12.5) forgets the weight.",
        ],
        answer: "\\(2.5\\ \\text{m/s}^2\\) upwards",
      },
      selfCheckExample: {
        prompt:
          "A child pulls a 25 kg sledge across level snow with a horizontal force of 120 N. Friction on the sledge is 45 N. What is its acceleration?",
        options: [
          "\\(4.8\\ \\text{m/s}^2\\)",
          "\\(1.8\\ \\text{m/s}^2\\)",
          "\\(6.6\\ \\text{m/s}^2\\)",
          "\\(0.33\\ \\text{m/s}^2\\)",
          "\\(3.0\\ \\text{m/s}^2\\)",
        ],
        steps: [
          "Resultant force: \\(120 - 45 = 75\\ \\text{N}\\) forwards.",
          "\\(a = 75/25 = 3.0\\ \\text{m/s}^2\\).",
          "A ignores friction. B uses friction alone. C adds friction to the pull. D divides the mass by the force.",
        ],
        answer: "(E) \\(3.0\\ \\text{m/s}^2\\)",
      },
      practiceSet: [
        { prompt: "A resultant force of 4.0 N acts on a 0.50 kg ball. What is its acceleration?", answer: "\\(8.0\\ \\text{m/s}^2\\)", method: "\\(a = F/m\\)" },
        { prompt: "A 2.0 kg object speeds up from 3.0 m/s to 9.0 m/s in 2.0 s. What resultant force acts?", answer: "6.0 N", method: "\\(a = 3.0\\ \\text{m/s}^2\\), \\(F = ma\\)" },
        { prompt: "A constant resultant force acts along a cart's motion. What happens to its acceleration and its velocity?", answer: "Acceleration stays constant; velocity increases", method: "\\(a = F/m\\) is fixed" },
      ],
      traps: [
        {
          title: "Subtract the weight for anything pushed upwards",
          body: "A rocket's thrust \\(T\\) is not its resultant force: its weight \\(mg\\) acts the other way. The starting acceleration is \\(a = T/m - g\\), not \\(T/m\\). Writing \\(T/m - mg\\) mixes an acceleration with a force and cannot be right.",
        },
        {
          title: "At the top of a vertical throw, the weight still acts",
          body: "The ball is momentarily at rest, but gravity has not switched off. The resultant force is the weight, and the acceleration is \\(g\\) downwards, the same as at every other point of the flight.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-dyn-third-law",
      name: "Newton's third law: action and reaction pairs",
      intuition:
        "You cannot push on something without it pushing back on you: lean on a wall and the wall holds you up. Every force is one half of an interaction between two bodies. The two halves are equal in size, opposite in direction, and act on different bodies, which is why they never cancel each other.",
      definition:
        "**Newton's third law**: if body A exerts a force on body B, then B exerts a force on A that is **equal in size, opposite in direction** and of the **same type**.\n" +
        "- The two forces of a pair act on **different bodies**, so they never appear in the same free-body diagram and never cancel.\n" +
        "- A book's weight and the table's push on the book are equal (when nothing accelerates) but are **not** a third-law pair: both act on the book, and they are different types of force.",
      table: {
        columns: ["Force", "Its third-law partner", "Type"],
        rows: [
          { cells: ["Earth pulls a book down (its weight)", "The book pulls the Earth up", "gravitational"] },
          { cells: ["Table pushes up on the book", "Book pushes down on the table", "contact (normal)"] },
          { cells: ["Your foot pushes the ground backwards", "The ground pushes your foot forwards", "friction"] },
          { cells: ["A rocket pushes exhaust gas backwards", "The gas pushes the rocket forwards", "contact"] },
          { cells: ["A swimmer pushes water backwards", "The water pushes the swimmer forwards", "contact"] },
        ],
      },
      selfCheckExample: {
        prompt: "A book rests on a table. Which force is the third-law partner of the book's weight?",
        options: [
          "the upward push of the table on the book",
          "the downward push of the book on the table",
          "the upward pull of the book on the Earth",
          "the pull of the Earth on the table",
          "the friction between the book and the table",
        ],
        steps: [
          "The weight is the Earth pulling the book. Its partner is the book pulling the Earth: same type (gravitational), opposite direction, on the other body.",
          "A is equal and opposite to the weight here, but it acts on the same body (the book) and is a contact force, so it is not the partner. B is the partner of A.",
        ],
        answer: "(C) the upward pull of the book on the Earth",
      },
      practiceSet: [
        { prompt: "The Earth pulls you down with 600 N. How hard do you pull the Earth?", answer: "600 N, upwards", method: "Third-law pair" },
        { prompt: "Do the two forces of a third-law pair act on the same body?", answer: "No, on different bodies", method: "That is why they do not cancel" },
        { prompt: "What pushes a walking person forwards?", answer: "Friction from the ground", method: "Partner of the foot pushing the ground back" },
      ],
      traps: [
        {
          title: "Weight and the normal force are not a third-law pair",
          body: "Both act on the same body, and they are different kinds of force. They are equal only when the body is not accelerating vertically. The real partner of a body's weight is its gravitational pull on the Earth.",
        },
      ],
    },
  ],
};
