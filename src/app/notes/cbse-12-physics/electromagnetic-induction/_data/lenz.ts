import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_EI_LENZ_NOTE: SubtopicNote = {
  subtopicName: "Lenz's Law and Conservation of Energy",
  title: "Lenz's Law and Conservation of Energy",
  oneLineDefinition:
    "Lenz's law for the direction of an induced current, why it follows from conservation of energy, the forces it explains between magnets, rings and loops, and the flux and emf graphs of a loop crossing a field.",
  whyItMatters:
    "23 questions, nineteen of them from board papers. The board asks you to state Lenz's law and explain how it follows from conservation of energy (2024, 2025), find the direction of an induced current (2023, 2025, 2026), say whether a ring or a falling magnet is pushed back (2023, 2025, 2026), explain the jumping ring experiment (2023), and plot the flux and emf of a loop pulled through a field (2025, 2026). The textbook adds direction questions on loops and coils.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpei-lenz-law",
      name: "Lenz's law and the direction of an induced current",
      intuition:
        "Nature resists change. Push a magnet towards a coil and the coil's induced current turns its near face into the same pole as the magnet, pushing it back. Pull the magnet away and the near face becomes the opposite pole, pulling it back. The induced current always works against the change that made it.",
      definition:
        "- **Statement:** the polarity of the induced emf is such that it tends to produce a current which opposes the change in magnetic flux that produced it.\n" +
        "- It is the minus sign in \\(\\varepsilon = -N\\dfrac{d\\Phi_B}{dt}\\).\n" +
        "- **Steps for a direction:** (1) find the direction of the flux through the loop; (2) decide whether it is increasing or decreasing; (3) the induced current makes its own flux opposite to the original if it is increasing, and along it if it is decreasing; (4) turn that into clockwise or anticlockwise with the right-hand rule.\n" +
        "- A face of a coil is a **north pole** when the current, seen from that face, flows anticlockwise, and a **south pole** when it flows clockwise.\n" +
        "- A magnet approaching a closed coil meets a like pole and is repelled; a magnet moving away meets an unlike pole and is attracted. Either way its motion is opposed.\n" +
        "- With an open circuit an emf is still induced, with the same polarity rule, but no current flows.",
      authoredExample: {
        prompt:
          "The south pole of a bar magnet faces a closed coil and the magnet is moved away from the coil. Find the direction of the induced current, seen from the magnet's side, and the pole on the near face of the coil.",
        steps: [
          "Field lines enter a south pole, so at the coil the magnet's field points towards the magnet.",
          "The magnet moves away, so this flux through the coil decreases.",
          "By Lenz's law the induced current tries to keep the flux, so it makes its own field towards the magnet. The near face then attracts the receding south pole, so it must be a north pole.",
          "A north face, seen from that side, carries an anticlockwise current.",
        ],
        answer: "Anticlockwise, seen from the magnet's side; the near face becomes a north pole",
      },
      selfCheckExample: {
        prompt:
          "A long straight wire carries a current to the right, and a rectangular loop lies flat below it in the same plane. The current in the wire is decreasing. In which sense does the induced current flow in the loop, as drawn?",
        steps: [
          "By the right-hand rule, the wire's field below it points into the page.",
          "The current is falling, so this inward flux through the loop decreases.",
          "The induced current tries to keep the inward flux, so it flows clockwise.",
        ],
        answer: "Clockwise",
      },
      practiceSet: [
        { prompt: "Which feature of the induced emf does Lenz's law give?", answer: "Its direction (polarity)" },
        { prompt: "The north pole of a magnet is pushed towards a closed coil. Which pole appears on the near face of the coil?", answer: "A north pole, which repels the magnet" },
        { prompt: "Seen from one face, the current in a coil flows clockwise. Which pole is that face?", answer: "A south pole" },
        { prompt: "A magnet is pushed towards a coil whose circuit is open. Is an emf induced? Does a current flow?", answer: "An emf is induced, but no current flows" },
      ],
      pyqExampleId: "ab08c1fc-f42b-4c6e-883b-5eb695958815",
      traps: [
        {
          title: "Opposing the flux instead of its change",
          body: "The induced current opposes the CHANGE in flux. When the flux is decreasing, the induced current acts to keep it, so its own flux points the same way as the original.",
        },
        {
          title: "Clockwise from the wrong side",
          body: "Clockwise seen from one side is anticlockwise seen from the other. Always say where you are looking from: 'seen from the magnet's side' or 'seen from above'.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpei-lenz-energy",
      name: "Lenz's law follows from conservation of energy",
      intuition:
        "Imagine the induced current helped the change instead of opposing it. A small push on a magnet would make the coil pull it in faster, which would make the current bigger, which would pull harder still. Energy would appear from nowhere. Because that is impossible, the induced current must oppose the change, and you must do work to make the change happen.",
      definition:
        "- **The argument:** suppose the induced current flowed the other way, so that a south pole faced an approaching north pole. The magnet would be attracted and would speed up with no work done on it, and its kinetic energy would grow without limit. That would be a perpetual-motion machine, which breaks the law of conservation of energy.\n" +
        "- **What really happens:** the coil repels the approaching magnet, so a person must do work to push it in. That work appears as electrical energy and is dissipated as heat (Joule heating) by the induced current.\n" +
        "- So Lenz's law is a consequence of conservation of energy: the energy of the induced current comes from the work done against the opposing force.\n" +
        "- **Assertion-reason items** are marked on four codes: both true and R explains A; both true and R does not explain A; A true and R false; and a fourth that the paper itself defines (A false and R true, or both false). Judge each statement alone first, then ask whether R is the reason for A.",
      authoredExample: {
        prompt:
          "Assertion (A): Work must be done to push a bar magnet into a closed coil. Reason (R): By Lenz's law the closed coil repels an approaching magnet. Choose the correct code.",
        steps: [
          "A alone: the coil pushes back on the magnet, so a force must be applied through a distance. A is true.",
          "R alone: the induced current makes a like pole face the magnet, so the coil repels it. R is true.",
          "Is R the reason for A? Yes: the work is needed because of the repulsion.",
        ],
        answer: "Both true, and R is the correct explanation of A",
      },
      selfCheckExample: {
        prompt:
          "Assertion (A): Lenz's law is a consequence of the law of conservation of energy. Reason (R): The induced emf in a coil is proportional to the magnetic flux linked with it. Choose the correct code.",
        steps: [
          "A is true: an induced current that helped the change would create energy from nothing.",
          "R is false: the emf is proportional to the rate of change of flux, not to the flux.",
        ],
        answer: "A is true, but R is false",
      },
      practiceSet: [
        { prompt: "Where does the energy of the induced current come from when a magnet is pushed into a coil?", answer: "From the work done against the repulsion between the coil and the magnet" },
        { prompt: "What would happen if an induced current helped the change instead of opposing it?", answer: "The change would grow by itself, creating energy from nothing, which breaks conservation of energy" },
        { prompt: "In an assertion-reason item both statements are true but R does not explain A. Which code is it?", answer: "Both true, and R is not the correct explanation of A (option B in the board's codes)" },
      ],
      pyqExampleId: "ee00390c-161b-4846-bd64-6fd2e3ef0a4a",
      traps: [
        {
          title: "Explaining with no example",
          body: "The board asks you to explain 'with an example'. Name the magnet, the pole that faces it, the repulsion or attraction, and the work done against it. A bare statement of the law earns half.",
        },
        {
          title: "Choosing 'R explains A' because both are true",
          body: "Two true statements need not be cause and effect. Board 2024 paired Lenz's law with a true fact about ideal inductors, and R did not explain A.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpei-lenz-forces",
      name: "Forces from induced currents: rings, loops and falling magnets",
      intuition:
        "An induced current always pushes back against whatever caused it. A ring repels a magnet coming towards it and pulls on a magnet moving away. A magnet falling near closed metal is slowed down. But the push needs a current: if the ring has a cut, no current flows and there is no push at all.",
      definition:
        "- First find whether the flux through the conductor is increasing or decreasing; the force on it then opposes the motion or change that caused it.\n" +
        "- A closed loop is needed for a current, and so for a force. A cut ring still has an induced emf but no current, so it exerts no force.\n" +
        "- **A magnet falling through a metal tube** is slowed by currents induced in the tube wall (eddy currents). Board 2023 asked this, but the present NCERT book does not teach eddy currents, so give it less time: Lenz's law alone answers it.",
      table: {
        columns: ["Situation", "What happens", "Why"],
        rows: [
          {
            cells: ["A magnet, N pole first, is moved towards a light copper ring hung on a string", "The ring is repelled and swings away", "The flux through the ring increases, so the induced current makes the near face a north pole"],
            noteAmber: "Board 2026 asked what happens to the ring and why.",
          },
          {
            cells: ["A magnet is moved away from a closed ring", "The ring is attracted and follows the magnet", "The flux decreases, so the induced current tries to keep it and an unlike pole faces the magnet"],
          },
          {
            cells: ["The current in loop A rises while loop B lies close to it", "Loop B is repelled", "B's induced current flows opposite to A's, and opposite currents repel"],
            noteAmber: "Board 2026 asked this as an MCQ.",
          },
          {
            cells: ["A magnet is dropped through a ring with a cut", "It falls with acceleration g", "An emf is induced but no current flows, so there is no opposing force"],
            noteAmber: "Board 2025 and 2026 both asked this with a cut ring.",
          },
          {
            cells: ["A magnet is dropped along a hollow metal tube", "It falls with acceleration less than g", "Currents induced in the tube wall oppose its motion"],
            noteAmber: "Board 2023 asked this; it rests on eddy currents, which the present book leaves out.",
          },
          {
            cells: ["A metal ring sits on the iron core of a coil and the switch is closed", "The ring jumps up", "The rising flux induces a current that gives the ring's lower face the same polarity as the coil's face, so they repel"],
            noteAmber: "Board 2023 set this jumping ring experiment as a case study. Reversing the battery still makes the ring jump.",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "A bar magnet, with its south pole facing a light aluminium ring hung by a thread, is moved away from the ring. What does the ring do, and which pole appears on its near face?",
        steps: [
          "The flux through the ring decreases as the magnet moves away.",
          "The induced current tries to keep the flux, so the near face becomes the unlike pole: a north pole.",
          "North attracts south, so the ring moves after the magnet.",
        ],
        answer: "It is attracted and follows the magnet; its near face becomes a north pole",
      },
      practiceSet: [
        { prompt: "A magnet is dropped towards a closed copper ring. Is its acceleration more than, equal to or less than g as it approaches?", answer: "Less than g" },
        { prompt: "Why does a magnet fall freely through a ring with a cut?", answer: "No current can flow round an open ring, so there is no opposing force" },
        { prompt: "In the jumping ring experiment the battery terminals are reversed. Does the ring still jump?", answer: "Yes. The induced current reverses too, so the force is still a repulsion" },
      ],
      pyqExampleId: "dfaa427e-a26c-48b4-bd8f-58d6974a4ca7",
      traps: [
        {
          title: "Forgetting the cut",
          body: "A cut ring has an induced emf but no current. With no current there is no force, so a magnet falls through it with acceleration g.",
        },
        {
          title: "Attraction when the magnet approaches",
          body: "An approaching magnet meets a like pole and is repelled; a receding magnet meets an unlike pole and is attracted. Both oppose the motion.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpei-loop-crossing",
      name: "A loop crossing a field region: flux and emf graphs",
      intuition:
        "Pull a square loop through a strip of field at steady speed. While it enters, the area inside grows steadily, so the flux rises in a straight line and the emf is constant. While it is wholly inside, the flux is constant and the emf is zero. While it leaves, the flux falls and the emf is constant again, but in the opposite sense.",
      definition:
        "- Flux at any moment: B times the area of the loop inside the field. A square loop of side a moving at speed v takes a time \\(a/v\\) to enter.\n" +
        "- While entering or leaving: \\(|\\varepsilon| = Bav\\), constant, and a current flows only then.\n" +
        "- Entering, the flux increases; leaving, it decreases. So by Lenz's law the induced current flows one way round while the loop enters and the other way while it leaves.\n" +
        "- **The graphs:** flux against time is a trapezium (a straight rise, a flat top, a straight fall); emf against time is two rectangular pulses of opposite sign with zero between them. Mark the maximum flux \\(Ba^2\\), the emf \\(Bav\\) and the times on the axes.\n" +
        "- While the flux changes, a force opposes the motion, so outside work is needed; while the loop is wholly inside, none is.",
      formula: {
        label: "Square loop of side a at speed v",
        latex: "\\Phi_{max} = Ba^2, \\qquad |\\varepsilon| = Bav, \\qquad t_{enter} = \\frac{a}{v}",
      },
      authoredExample: {
        prompt:
          "A square loop of side 10 cm moves face-on at 2 cm/s into a region of uniform field 0.5 T that is 30 cm wide. Find the maximum flux, the emf while it enters, and the times during which an emf is induced, counting t = 0 when its front edge reaches the field.",
        steps: [
          "Given: \\(a = 0.10\\) m, \\(v = 0.02\\ \\text{m s}^{-1}\\), \\(B = 0.5\\) T.",
          "Maximum flux: \\(\\Phi_{max} = Ba^2 = 0.5 \\times 0.01 = 5 \\times 10^{-3}\\) Wb.",
          "Emf while entering: \\(|\\varepsilon| = Bav = 0.5 \\times 0.10 \\times 0.02 = 1 \\times 10^{-3}\\) V.",
          "It enters fully in \\(10/2 = 5\\) s. Its front edge reaches the far side of the field after moving 30 cm, at 15 s, and the loop is out at 20 s.",
          "So the emf is 1 mV from 0 to 5 s, zero from 5 s to 15 s, and 1 mV of the opposite sign from 15 s to 20 s.",
        ],
        answer: "\\(5 \\times 10^{-3}\\) Wb; 1 mV; from 0 to 5 s and from 15 s to 20 s",
      },
      selfCheckExample: {
        prompt:
          "A square loop of side 4 cm is pulled out of a uniform field of 0.2 T at 1 cm/s. Find the emf while it leaves and how long the induced current lasts.",
        steps: [
          "\\(|\\varepsilon| = Bav = 0.2 \\times 0.04 \\times 0.01 = 8 \\times 10^{-5}\\) V.",
          "It takes \\(4/1 = 4\\) s for the whole loop to leave.",
        ],
        answer: "\\(8 \\times 10^{-5}\\) V for 4 s",
      },
      practiceSet: [
        { prompt: "A loop is wholly inside a uniform field and moving at steady speed. What emf is induced?", answer: "Zero" },
        { prompt: "What is the shape of the graph of flux against time as a square loop passes at steady speed through a wide field region?", answer: "A trapezium: a straight rise, a flat top and a straight fall" },
        { prompt: "How do the emfs while entering and while leaving compare?", answer: "Equal in size and opposite in sign" },
      ],
      pyqExampleId: "b18b9e35-2f16-41fa-b1a9-5688181be5fd",
      traps: [
        {
          title: "A curved flux graph",
          body: "At steady speed the area inside the field changes at a steady rate, so the flux rises and falls in straight lines, not curves.",
        },
        {
          title: "An emf during the flat top",
          body: "When the flux is constant the emf is zero. Drawing an emf there loses the graph mark.",
        },
        {
          title: "Graphs with no values",
          body: "The graphs carry the marks. Label both axes and mark the maximum flux, the emf and every time at which the graph changes.",
        },
      ],
    },
  ],
};
