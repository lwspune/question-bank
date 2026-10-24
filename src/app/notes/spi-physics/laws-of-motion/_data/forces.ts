import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_LM_FORCES_NOTE: SubtopicNote = {
  subtopicName: "Fundamental Forces and Levers",
  title: "Fundamental Forces and Levers",
  oneLineDefinition:
    "Every force in nature comes from four basic forces, of which gravity is the weakest, and a lever is a rigid bar turning about a fixed point, sorted into three classes by what sits in the middle.",
  whyItMatters:
    "Two questions in the bank, one EASY from the 2022 paper (the weakest basic force) and one MODERATE (which class of lever a hinged door is). Both are named facts, so the tables below are the whole job.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spilmfo-fundamental",
      name: "The four fundamental forces",
      intuition:
        "Gravity holds the planets in orbit, so it feels mighty. But between two small particles it is unbelievably weak: a small magnet lifts a pin against the pull of the whole Earth. It seems strong only because planets and stars are so massive.",
      definition:
        "- All forces in nature come from four **fundamental forces**: gravitational, weak nuclear, electromagnetic and strong nuclear.\n" +
        "- From weakest to strongest: **gravitational < weak nuclear < electromagnetic < strong nuclear**.\n" +
        "- **Gravitation is the weakest**, about \\(10^{-39}\\) times the strong nuclear force. It is always attractive and acts between all masses.\n" +
        "- The **strong nuclear force** is the strongest. It holds protons and neutrons together in the nucleus and acts only over very short distances.\n" +
        "- The **electromagnetic force** (the electrostatic force between charges is part of it) lies in between.",
      table: {
        columns: ["Force", "Strength (strong nuclear = 1)", "Range", "Acts between"],
        rows: [
          { cells: ["Strong nuclear", "1 (strongest)", "About 10⁻¹⁵ m, inside a nucleus", "Protons and neutrons"] },
          { cells: ["Electromagnetic", "About 10⁻²", "Unlimited", "Charged particles"] },
          { cells: ["Weak nuclear", "About 10⁻¹³", "Less than 10⁻¹⁶ m", "Particles in radioactive (beta) decay"] },
          { cells: ["Gravitational", "About 10⁻³⁹ (weakest)", "Unlimited", "All bodies with mass"] },
        ],
        caption: "Weakest to strongest: gravitational, weak nuclear, electromagnetic, strong nuclear.",
      },
      selfCheckExample: {
        prompt: "Which fundamental force holds the protons and neutrons of a nucleus together?",
        steps: ["Protons repel each other, so the binding force must be stronger than the electrostatic force.", "That is the strong nuclear force."],
        answer: "The strong nuclear force",
      },
      practiceSet: [
        { prompt: "Which is the strongest of the four fundamental forces?", answer: "The strong nuclear force" },
        { prompt: "Which fundamental force is always attractive and acts between all bodies with mass?", answer: "The gravitational force" },
        { prompt: "Put these in order from weakest to strongest: electromagnetic, gravitational, strong nuclear.", answer: "Gravitational, electromagnetic, strong nuclear" },
      ],
      pyqExampleId: "4b546455-99dd-4fcc-91d7-b66a092804e8",
      traps: [
        {
          title: "Thinking gravity is strong because planets feel it",
          body:
            "Gravity rules the motion of planets only because they are so massive. Between two particles it is the weakest of all the fundamental forces.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spilmfo-levers",
      name: "The three classes of lever",
      intuition:
        "A lever has three points: the fulcrum it turns on, the effort you apply and the load it moves. Whichever of the three sits in the middle decides the class.",
      definition:
        "- **First class:** the **fulcrum** is in the middle, between effort and load.\n" +
        "- **Second class:** the **load** is in the middle, between fulcrum and effort. The effort arm is always longer, so it always multiplies force.\n" +
        "- **Third class:** the **effort** is in the middle, between fulcrum and load. It never multiplies force, but it moves the load faster and farther.\n" +
        "- **Principle of the lever:** effort \\(\\times\\) effort arm \\(=\\) load \\(\\times\\) load arm, where each arm is measured from the fulcrum.\n" +
        "- A **door on hinges** is second class: the hinge is the fulcrum at one end, you push at the handle at the far end, and the door's weight acts in between.",
      table: {
        columns: ["Class", "In the middle", "Examples"],
        rows: [
          { cells: ["First", "Fulcrum", "See-saw, scissors, pliers, crowbar, beam balance"] },
          { cells: ["Second", "Load", "Nutcracker, wheelbarrow, bottle opener, door on hinges"] },
          { cells: ["Third", "Effort", "Fire tongs, forceps, fishing rod, the human forearm"] },
        ],
        caption: "Memory key, in class order 1, 2, 3, the middle point is F, L, E.",
      },
      selfCheckExample: {
        prompt: "In a wheelbarrow, which point lies in the middle, and what class of lever is it?",
        steps: [
          "The wheel is the fulcrum at one end and you lift at the handles at the other end.",
          "The load in the tray lies between them, so it is a second class lever.",
        ],
        answer: "The load; second class",
      },
      practiceSet: [
        { prompt: "What class of lever is a see-saw?", answer: "First class (fulcrum in the middle)" },
        { prompt: "In which class of lever does the effort lie between the fulcrum and the load?", answer: "Third class" },
        { prompt: "An effort of 20 N acts 1.5 m from the fulcrum of a lever and balances a load 0.5 m from the fulcrum. Find the load.", answer: "\\(\\frac{20 \\times 1.5}{0.5} = 60\\) N" },
        { prompt: "What class of lever is a pair of fire tongs?", answer: "Third class" },
      ],
      pyqExampleId: "2f278714-50bd-4fb2-9946-4a1b7108833b",
      traps: [
        {
          title: "Classing by where the fulcrum is",
          body:
            "The class depends on which of the three points is in the MIDDLE. A fulcrum at the end can belong to a second or a third class lever; look at whether the load or the effort is in between.",
        },
        {
          title: "Calling scissors a second class lever",
          body: "In scissors the pivot (the fulcrum) sits between the handles (effort) and the blades (load), so scissors are first class.",
        },
      ],
    },
  ],
};
