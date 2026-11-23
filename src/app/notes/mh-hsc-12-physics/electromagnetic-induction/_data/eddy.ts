import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_EM_EDDY_NOTE: SubtopicNote = {
  subtopicName: "Eddy Currents",
  title: "Eddy Currents",
  oneLineDefinition:
    "Eddy currents are induced currents that swirl inside a solid piece of metal when the flux through it changes; they oppose motion, turn mechanical energy into heat, and are put to use in brakes, meters and furnaces.",
  whyItMatters:
    "4 questions. Two were set in board papers: what eddy currents are (2024), and what they are with two applications (2026). The textbook adds a copper pendulum that stops quickly between the poles of a magnet.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscpem-eddy-currents",
      name: "What eddy currents are",
      intuition:
        "Replace a wire loop by a solid metal plate and move it through a field. The induced current no longer has one path to follow, so it swirls round inside the plate like an eddy in a stream. Lenz's law still holds, so the swirling currents drag against the motion and the plate warms up.",
      definition:
        "- **Definition:** when the magnetic flux through a solid conductor changes, induced currents flow in closed loops within the body of the conductor. They swirl about as if caught in an eddy of water, and are called eddy currents.\n" +
        "- **Pendulum (textbook):** a conducting plate swings like a pendulum through a magnetic field. Each time it enters and leaves the field, part of its mechanical energy becomes heat, and after a few swings it stops. The heat warms the plate.\n" +
        "- If slots are cut in the plate, the paths are broken, the eddy currents become small, and the plate swings for much longer.",
      table: {
        columns: ["Point", "Eddy currents"],
        rows: [
          {
            cells: ["What they are", "Induced currents that circulate in closed loops inside a solid conductor when the flux through it changes"],
            pyqExampleId: "9c425bf1-319c-44e6-b5d9-189afd5d8f88",
            noteAmber: "Board 2024 asked: what are eddy currents?",
          },
          { cells: ["Why the name", "They swirl about inside the metal like eddies in water"] },
          { cells: ["Direction", "Given by Lenz's law: they oppose the motion or the change that causes them"] },
          { cells: ["Energy", "Mechanical energy is turned into heat in the conductor"] },
          { cells: ["How to reduce them", "Break the conducting path: cut slots in a plate, or build a core from thin sheets insulated from one another"] },
        ],
      },
      practiceSet: [
        { prompt: "A copper plate swings between the poles of a magnet and stops quickly. What happens to its mechanical energy?", answer: "It is turned into heat by the eddy currents, and the plate warms up" },
        { prompt: "How can the eddy currents in a metal plate be made small?", answer: "Cut slots in it to break the paths of the currents" },
        { prompt: "Which law gives the direction of eddy currents?", answer: "Lenz's law" },
      ],
      traps: [
        {
          title: "Eddy currents in a wire",
          body: "Eddy currents flow in a solid block or plate of metal, where the current has no single path. A current in a wire loop is an ordinary induced current.",
        },
        {
          title: "Saying the energy is lost",
          body: "The pendulum's energy is not destroyed. Say it is converted into heat in the conductor, which is what the textbook question asks.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpem-eddy-uses",
      name: "Uses of eddy currents",
      intuition:
        "The same drag that stops the copper pendulum can be put to work. It can stop a wheel without anything rubbing, settle a meter's pointer at once, or heat a metal until it melts.",
      definition:
        "- The board asked for two applications in 2026, and the textbook exercise asks for them, but the present textbook's section on eddy currents does not list any. Learn two well, give each a line on how it works, and spend less time here than on the derivations.\n" +
        "- Braking and damping follow straight from the pendulum the textbook describes: the eddy currents oppose the motion.\n" +
        "- Where eddy currents only waste energy, as in a transformer core, the core is made of thin insulated sheets.",
      table: {
        columns: ["Use", "How eddy currents help"],
        rows: [
          {
            cells: [
              "Electromagnetic braking",
              "A metal disc or drum fixed to a train's wheel turns between the poles of an electromagnet. Eddy currents in it oppose the rotation and slow the train smoothly, with no rubbing parts.",
            ],
            pyqExampleId: "72f71b7d-1421-4de6-ac76-1b493fc6aaaa",
            noteAmber: "Board 2026 asked for two applications.",
          },
          {
            cells: [
              "Electromagnetic damping",
              "The coil of a galvanometer is wound on a metal frame. Eddy currents in the frame oppose its swing, so the pointer stops at its reading at once.",
            ],
          },
          {
            cells: [
              "Induction furnace",
              "A metal placed inside a coil carrying a high-frequency alternating current gets large eddy currents, and their heat melts it.",
            ],
          },
        ],
      },
      practiceSet: [
        { prompt: "Name one device in which eddy currents are a nuisance, and say how they are reduced there.", answer: "A transformer core; it is made of thin sheets insulated from one another" },
        { prompt: "Why does the pointer of a galvanometer whose coil is wound on a metal frame settle quickly?", answer: "Eddy currents in the frame oppose its motion (electromagnetic damping)" },
        { prompt: "What kind of current flows in the coil of an induction furnace?", answer: "A high-frequency alternating current" },
      ],
      traps: [
        {
          title: "Naming without explaining",
          body: "Each application needs one line of how the eddy currents act. 'Electromagnetic braking' alone does not earn the mark.",
        },
      ],
    },
  ],
};
