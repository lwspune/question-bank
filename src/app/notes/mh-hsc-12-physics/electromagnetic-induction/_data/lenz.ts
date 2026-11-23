import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_EM_LENZ_NOTE: SubtopicNote = {
  subtopicName: "Lenz's Law",
  title: "Lenz's Law",
  oneLineDefinition:
    "Lenz's law gives the direction of an induced current: it always opposes the change in flux that causes it, which is why Faraday's law carries a minus sign and why energy is conserved.",
  whyItMatters:
    "2 questions. One was set in a board paper: what the negative sign in Lenz's law shows (2020). The textbook asks you to state and explain Lenz's law in the light of the conservation of energy.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpem-lenz-law",
      name: "Lenz's law and the direction of the induced current",
      intuition:
        "The induced current always fights back. Push a north pole towards a coil and the coil turns its near face into a north pole to push the magnet away. Pull the magnet back and the coil turns that face into a south pole to hold it. The coil never helps the change; it always resists it.",
      definition:
        "- **Statement:** the direction of the induced current in a circuit is such that the magnetic field produced by it opposes the change in the magnetic flux that induces the current. The induced e.m.f. acts in the same direction as the induced current.\n" +
        "- It is the **change** in flux that is opposed, not the flux itself. If the field through a loop is increasing, the induced current's field is opposite to it; if the field is decreasing, the induced current's field is along it.\n" +
        "- For a conductor moving in a field, the force on the induced current opposes the motion.\n" +
        "- The **negative sign** in \\(e = -\\dfrac{d\\phi}{dt}\\) is Lenz's law written into Faraday's law: when the flux increases (\\(d\\phi/dt\\) positive), the e.m.f. is negative, that is, it opposes the increase.\n" +
        "- For a conductor that is not part of a closed circuit, imagine a circuit joining its ends, use Lenz's law to find the current, and read off which end is positive.\n" +
        "- **Jumping ring:** a metal ring on an iron core flies up when current is switched on in the coil below. The induced current in the ring is opposite to the coil's current, and opposite currents repel.",
      formula: {
        label: "Faraday's law with Lenz's sign",
        latex: "e = -N\\frac{d\\phi}{dt}",
      },
      authoredExample: {
        prompt:
          "The north pole of a bar magnet is pushed towards a closed circular coil. Using Lenz's law, find the polarity of the face of the coil nearer the magnet and the direction of the induced current as seen from the magnet's side.",
        steps: [
          "The flux through the coil, due to the magnet, is increasing.",
          "By Lenz's law the induced current must oppose this increase, so it must repel the approaching north pole.",
          "So the near face of the coil becomes a north pole.",
          "A face is a north pole when the current in it, seen from that face, is anticlockwise.",
        ],
        answer: "Near face is a north pole; the current is anticlockwise as seen from the magnet",
      },
      selfCheckExample: {
        prompt:
          "The north pole of a magnet is pulled away from a closed loop. What pole appears on the face of the loop nearer the magnet, and is the magnet attracted or repelled?",
        steps: [
          "The flux through the loop is decreasing, so the induced current tries to keep it.",
          "The near face becomes a south pole, which attracts the retreating north pole.",
        ],
        answer: "A south pole; the magnet is attracted, so its retreat is opposed",
      },
      practiceSet: [
        { prompt: "Does Lenz's law oppose the magnetic flux or the change in it?", answer: "The change in the flux" },
        { prompt: "The magnetic field through a loop is decreasing. Is the field of the induced current along the original field or against it?", answer: "Along it, trying to keep the flux from falling" },
        { prompt: "In the jumping ring experiment, why does the ring fly up when the current is switched on?", answer: "The current induced in the ring flows opposite to the current in the coil, and opposite currents repel" },
      ],
      pyqExampleId: "a0b3f7df-ad84-4c50-ab45-57b51b50dc2d",
      traps: [
        {
          title: "Opposing the flux instead of its change",
          body: "When the flux is falling, the induced current supports the original field. Writing 'the induced current opposes the magnetic field' is wrong; it opposes the change.",
        },
        {
          title: "Reading the minus sign as a size",
          body: "The minus sign does not make the e.m.f. smaller. It only gives the direction: opposite to the change. In a calculation of magnitude, write \\(|e|\\).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpem-lenz-energy",
      name: "Lenz's law and conservation of energy",
      intuition:
        "Because the induced current always resists, you have to push to make it flow. That push is work, and the work is exactly the electrical energy that appears in the coil. If the current helped instead, it would feed itself and make energy from nothing.",
      definition:
        "- **The argument (textbook):** suppose the induced current helped the change that causes it. Then the current and the flux would grow without limit, producing heat at no extra cost: a perpetual motion machine. That breaks the law of conservation of energy. So Lenz's law is a necessary consequence of the conservation of energy.\n" +
        "- Because the induced current opposes the change, an external agent must do work against it. This mechanical work is converted into electrical energy, and then into heat in the coil.\n" +
        "- General form: every effect of induction acts in opposition to the cause that produces it.\n" +
        "- A 'state and explain' answer needs the statement, the magnet-and-coil example with the poles named, and the energy argument.",
      table: {
        columns: ["Case", "What the induced current does", "Where the energy comes from"],
        rows: [
          {
            cells: [
              "North pole pushed towards a coil",
              "The near face becomes a north pole and repels the magnet",
              "The work you do against the repulsion becomes electrical energy",
            ],
            pyqExampleId: "80d85d18-4dc5-467b-bbc6-6fa4ae4b6b1d",
          },
          {
            cells: [
              "North pole pulled away from the coil",
              "The near face becomes a south pole and attracts the magnet",
              "The work you do against the attraction",
            ],
          },
          {
            cells: [
              "Wire moved across a magnetic field",
              "The force on the induced current acts against the motion",
              "The work done to keep the wire moving appears as heat in the circuit",
            ],
          },
          {
            cells: [
              "Imagined case: induced current helps the change",
              "Current and flux would grow without limit",
              "None: energy from nothing, which is impossible",
            ],
          },
        ],
      },
      practiceSet: [
        { prompt: "Why must an external agent do work to move a magnet towards a closed coil?", answer: "The induced current repels the approaching magnet, so a force must be applied against it" },
        { prompt: "Lenz's law is a consequence of which conservation law?", answer: "The law of conservation of energy" },
        { prompt: "What does the mechanical work done in moving a magnet near a closed coil finally become?", answer: "Electrical energy, which appears as heat in the coil" },
      ],
      traps: [
        {
          title: "Explaining without an example",
          body: "'The induced current opposes the change' alone is a statement, not an explanation. Add the magnet and coil, name the pole that appears, and say what work is done.",
        },
        {
          title: "Saying energy is created",
          body: "Induction creates no energy. The electrical energy comes from the work done against the opposing force, and the two are equal.",
        },
      ],
    },
  ],
};
