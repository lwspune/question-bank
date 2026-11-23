import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_FL_FORCES_NOTE: SubtopicNote = {
  subtopicName: "Kinds of Force",
  title: "Kinds of Force",
  oneLineDefinition:
    "A force is a push or a pull: contact forces act only when bodies touch, non-contact forces act from a distance, balanced forces leave motion unchanged, and nature has four fundamental forces, the strongest being the short-range nuclear force.",
  whyItMatters:
    "Five questions in the bank, two EASY and three MODERATE. Two sort forces as contact or non-contact (one odd-one-out, one matching four everyday scenes, which also asks balanced or unbalanced), one asks what the forces on a body at rest or in uniform motion do to each other, one asks the properties of the nuclear force, and one asks which formula a pulley and block set-up can check.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9flfo-kinds",
      name: "Contact and non-contact, balanced and unbalanced forces",
      intuition:
        "Kick a ball and your foot must touch it: that is a contact force. A magnet pulls a pin from across the table without touching it: that is a non-contact force. A book on a table has two forces on it, its weight down and the table's push up. They are equal and opposite, so they balance and the book stays put.",
      definition:
        "- **Contact forces** act only when the bodies touch: muscular force, **friction**, the push of a surface, the **upthrust** of a liquid, the tension in a string.\n" +
        "- **Non-contact forces** act from a distance: **gravitational**, **magnetic** and **electrostatic** forces.\n" +
        "- **Balanced forces** are equal in size and opposite in direction, so the **net force is zero**. A body at **rest** stays at rest and a body in **uniform motion** keeps moving the same way. Forces still act on it; they **cancel** each other.\n" +
        "- **Unbalanced forces** leave a net force, which changes the body's **speed**, its **direction** or its **shape**.\n" +
        "- A floating ball: weight balanced by upthrust (balanced). A stone sinking in water: weight more than upthrust (unbalanced).\n" +
        "- When a force moves a body through a distance s along the force, it does **work** \\(W = F \\times s\\).",
      table: {
        columns: ["Force", "Contact or non-contact", "Example"],
        rows: [
          { cells: ["Muscular force", "Contact", "Pushing a loaded cart"] },
          { cells: ["Friction", "Contact", "Brakes slowing a bicycle"] },
          { cells: ["Upthrust", "Contact", "Water holding up a floating boat"] },
          { cells: ["Gravitational force", "Non-contact", "A mango falling from a tree"] },
          { cells: ["Magnetic force", "Non-contact", "A magnet pulling an iron pin"] },
          { cells: ["Electrostatic force", "Non-contact", "A rubbed comb pulling bits of paper"] },
        ],
        caption: "In an odd-one-out, ask of each force: does it need the bodies to touch?",
      },
      selfCheckExample: {
        prompt: "A book lies at rest on a table. Name two forces acting on it and say whether they are balanced.",
        steps: ["Its weight pulls it down; the table pushes it up.", "The book does not move, so the two are equal and opposite."],
        answer: "Its weight and the push of the table; they are balanced.",
      },
      practiceSet: [
        { prompt: "Which of these is a non-contact force: friction, magnetic force, muscular force?", answer: "Magnetic force" },
        { prompt: "A car moves at a steady speed along a straight road. What is the net force on it?", answer: "Zero: the forces on it are balanced" },
        { prompt: "A stone dropped into a pond sinks to the bottom. Are the forces on it balanced or unbalanced?", answer: "Unbalanced: its weight is more than the upthrust" },
        { prompt: "Name two things an unbalanced force can change about a moving body.", answer: "Its speed and its direction (it can also change its shape)" },
      ],
      pyqExampleId: "aebca697-7189-4426-b29f-258f60a44850",
      traps: [
        {
          title: "Saying no force acts on a body at rest",
          body: "A body at rest or in uniform motion still has forces on it, such as its weight and the push of the ground. They balance, so the net force is zero.",
        },
        {
          title: "Calling friction a non-contact force",
          body: "Friction acts only where two surfaces touch, so it is a contact force. Gravitational, magnetic and electrostatic forces act from a distance.",
        },
        {
          title: "Thinking a floating body has no forces on it",
          body: "A floating body has its weight acting down and the upthrust acting up. They are equal, so the forces are balanced.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9flfo-fundamental",
      name: "The four fundamental forces of nature",
      intuition:
        "Every push and pull around us comes down to just four basic forces. Gravity holds the Moon to the Earth. The electromagnetic force holds atoms together and makes friction and muscle pulls possible. Inside the nucleus, the strong nuclear force grips protons and neutrons so tightly that it beats the electric push between the protons, but it reaches only across the nucleus itself.",
      definition:
        "- **Gravitational force**: between all bodies with mass. Always attractive, very long range, and the **weakest** of the four.\n" +
        "- **Electromagnetic force**: between charged particles. Attractive or repulsive, long range.\n" +
        "- **Strong nuclear force**: between **nucleons** (protons and neutrons). The **strongest** force, but **very short range**, about the size of a nucleus (around \\(10^{-15}\\) m).\n" +
        "- The nuclear force acts between **any two nucleons** (proton and proton, neutron and neutron, proton and neutron) and **does not depend on electric charge**.\n" +
        "- **Weak nuclear force**: very short range; it is at work in some kinds of radioactive decay.\n" +
        "- In order of strength: strong nuclear, electromagnetic, weak nuclear, gravitational.",
      table: {
        columns: ["Force", "Acts between", "Range", "Strength"],
        rows: [
          { cells: ["Strong nuclear", "Nucleons (protons and neutrons)", "Very short, about the size of a nucleus", "Strongest"] },
          { cells: ["Electromagnetic", "Charged particles", "Long", "Second"] },
          { cells: ["Weak nuclear", "Particles in some radioactive decays", "Very short", "Third"] },
          { cells: ["Gravitational", "All bodies with mass", "Very long", "Weakest"] },
        ],
        caption: "Gravity feels strong only because planets have enormous masses; between two particles it is the weakest force.",
      },
      selfCheckExample: {
        prompt: "Two neutrons carry no electric charge. Why can the nuclear force still hold them together?",
        steps: ["The nuclear force acts between any two nucleons.", "It does not depend on electric charge."],
        answer: "Because the nuclear force does not depend on charge; it acts between neutrons as well as protons.",
      },
      practiceSet: [
        { prompt: "Which of the four fundamental forces is the weakest?", answer: "The gravitational force" },
        { prompt: "Over roughly what distance does the strong nuclear force act?", answer: "Only about the size of a nucleus, around \\(10^{-15}\\) m" },
        { prompt: "Between which particles does the strong nuclear force act?", answer: "Between nucleons: protons and neutrons" },
        { prompt: "Which fundamental force keeps the Moon moving round the Earth?", answer: "The gravitational force" },
      ],
      pyqExampleId: "1f4f8681-6cff-4b4c-aad3-7cd23b6338e7",
      traps: [
        {
          title: "Making the nuclear force depend on charge",
          body: "The nuclear force binds neutrons, which have no charge, as firmly as protons. It does not depend on electric charge.",
        },
        {
          title: "Calling gravity the strongest force",
          body: "Gravity is the weakest of the four. It seems strong only because bodies like the Earth have huge masses.",
        },
      ],
    },
  ],
};
