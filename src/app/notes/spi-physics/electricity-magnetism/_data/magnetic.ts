import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_EM_MAGNETIC_NOTE: SubtopicNote = {
  subtopicName: "Magnetic Effects of Current",
  title: "Magnetic Effects of Current",
  oneLineDefinition:
    "A current makes a magnetic field around it, a current placed in a magnetic field feels a force (the motor), and a coil turned in a magnetic field makes a current (the generator).",
  whyItMatters:
    "Five questions in the bank: three EASY, one MODERATE and one HARD. They ask the field inside a solenoid, which pole an anticlockwise current makes, what the forefinger stands for in Fleming's left hand rule, how often a generator's current reverses, and the torque on a coil. Each turns on one rule, so learn which rule goes with which device.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spiemmg-field",
      name: "The magnetic field of a wire, a loop and a solenoid",
      intuition:
        "Every current is surrounded by a magnetic field. Bend the wire into a loop and the field is squeezed through the middle; wind many loops into a long coil (a solenoid) and it behaves just like a bar magnet.",
      definition:
        "- **Right hand thumb rule:** hold the wire with the thumb along the current; the curled fingers show the direction of the field.\n" +
        "- **Clock rule:** look at one face of a loop. If the current flows **clockwise**, that face is a **south** pole; if **anticlockwise**, a **north** pole.\n" +
        "- Field lines leave the N pole and enter the S pole outside a magnet, and **never cross**.\n" +
        "- A solenoid's field gets stronger with more turns, more current, or a **soft iron core** (which makes it an electromagnet).",
      table: {
        columns: ["Source", "Shape of the field lines"],
        rows: [
          { cells: ["Straight wire", "Circles around the wire, centred on it; weaker farther away"] },
          { cells: ["Circular loop", "Circles near the wire; nearly straight lines at the centre"] },
          {
            cells: ["Solenoid, inside", "Parallel straight lines: the field is uniform"],
            noteAmber: "Uniform inside a long solenoid, not circular.",
          },
          { cells: ["Solenoid, outside", "Like a bar magnet: from the N end round to the S end"] },
          { cells: ["Bar magnet", "N to S outside, S to N inside, forming closed loops"] },
        ],
        caption: "Circular lines belong to a straight wire; straight parallel lines to the inside of a solenoid.",
      },
      selfCheckExample: {
        prompt: "You look at a loop and the current in it flows clockwise. Which magnetic pole faces you?",
        steps: ["Clock rule: clockwise current makes a south pole."],
        answer: "South pole",
      },
      practiceSet: [
        { prompt: "What is the shape of the field lines around a long straight wire carrying current?", answer: "Circles centred on the wire" },
        { prompt: "Name two ways to make the field of a solenoid stronger.", answer: "More turns, more current (or a soft iron core)" },
        { prompt: "What is put inside a solenoid to make an electromagnet?", answer: "A soft iron core" },
        { prompt: "Can two magnetic field lines cross each other?", answer: "No" },
      ],
      pyqExampleId: "8f583588-0ada-442a-8396-01e6a7298c6e",
      traps: [
        {
          title: "Calling the field inside a solenoid circular",
          body: "Circular field lines are around a straight wire. Inside a long solenoid the lines are straight and parallel, so the field is uniform.",
        },
        {
          title: "Mixing up the clock rule",
          body: "Seen from a face, clockwise current gives a south pole and anticlockwise gives a north pole.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiemmg-motor",
      name: "Force on a current in a magnetic field: the motor",
      intuition:
        "A wire carrying current across a magnetic field is pushed sideways. An electric motor uses this push to keep a coil turning, so it changes electrical energy into motion.",
      definition:
        "- **Fleming's left hand rule:** stretch the thumb, forefinger and middle finger of the LEFT hand at right angles. **F**orefinger: **f**ield. Middle finger: current. Thumb: force (motion).\n" +
        "- The force is largest when the current is at right angles to the field, and **zero** when the current runs along the field.\n" +
        "- For a wire at right angles to the field: \\(F = BIL\\).\n" +
        "- On a coil of N turns and area A, the turning effect (torque) is \\(\\tau = NIAB\\sin\\theta\\), where \\(\\theta\\) is the angle between the field and the line at right angles to the coil (its normal). If the coil's PLANE makes an angle \\(\\alpha\\) with the field, \\(\\tau = NIAB\\cos\\alpha\\).\n" +
        "- In a DC motor a **split ring commutator** reverses the current in the coil every half turn, so it keeps turning the same way.",
      formula: {
        label: "Force on a wire and torque on a coil",
        latex: "F = BIL \\qquad \\tau = NIAB\\sin\\theta",
        symbols: [
          { symbol: "B", meaning: "magnetic field, in tesla" },
          { symbol: "I", meaning: "current, in amperes" },
          { symbol: "L", meaning: "length of wire in the field, in metres" },
          { symbol: "N", meaning: "number of turns of the coil" },
          { symbol: "A", meaning: "area of the coil, in square metres" },
          { symbol: "θ", meaning: "angle between the field and the normal to the coil" },
        ],
      },
      authoredExample: {
        prompt: "A wire 0.4 m long carries a current of 5 A at right angles to a magnetic field of 0.2 T. Find the force on it.",
        steps: ["\\(F = BIL = 0.2 \\times 5 \\times 0.4 = 0.4\\) N."],
        answer: "0.4 N",
      },
      selfCheckExample: {
        prompt: "A coil of 50 turns and area 0.01 square metre carries 2 A in a field of 0.1 T. Its plane lies along the field. Find the torque on it.",
        steps: [
          "The plane is along the field, so the normal is at \\(90^\\circ\\) to it and \\(\\sin 90^\\circ = 1\\).",
          "\\(\\tau = 50 \\times 2 \\times 0.01 \\times 0.1 \\times 1 = 0.1\\) N m.",
        ],
        answer: "0.1 N m",
      },
      practiceSet: [
        { prompt: "In Fleming's left hand rule, what does the thumb show?", answer: "The direction of the force (motion)" },
        { prompt: "A wire carries current along the direction of a magnetic field. What force acts on it?", answer: "Zero" },
        { prompt: "Which part of a DC motor reverses the current in the coil every half turn?", answer: "The split ring commutator" },
        { prompt: "What energy change happens in an electric motor?", answer: "Electrical energy to mechanical energy" },
      ],
      pyqExampleId: "1c86c7ac-6555-47b4-a26a-ad509adc3ed9",
      traps: [
        {
          title: "Using the right hand for a motor",
          body: "The LEFT hand rule gives the force on a current, as in a motor. The right hand rule is for the induced current in a generator.",
        },
        {
          title: "Measuring the angle from the coil's plane",
          body: "In \\(\\tau = NIAB\\sin\\theta\\), \\(\\theta\\) is measured from the coil's normal. If the plane makes \\(30^\\circ\\) with the field, the normal makes \\(60^\\circ\\), and \\(\\sin 60^\\circ = \\cos 30^\\circ\\).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiemmg-induction",
      name: "Electromagnetic induction and the generator",
      intuition:
        "Run the motor backwards: turn a coil in a magnetic field and a current flows in it. Whenever the magnetic field through a coil changes, a current is induced. This is how power stations make electricity.",
      definition:
        "- **Electromagnetic induction** (Faraday): a changing magnetic field through a coil, or a coil moving across a field, induces a current.\n" +
        "- **Fleming's right hand rule:** thumb along the motion, forefinger along the field, middle finger along the induced current.\n" +
        "- In an AC generator each side of the coil moves up for half a turn and down for the next half, so the current **reverses every half revolution**.",
      table: {
        columns: ["Fact", "Value"],
        rows: [
          { cells: ["Energy change in a generator", "Mechanical energy to electrical energy"] },
          { cells: ["Rule for the induced current", "Fleming's right hand rule"] },
          {
            cells: ["Current reverses", "Once every half revolution of the coil"],
            noteAmber: "Twice in each full turn, not once.",
          },
          { cells: ["Rings in an AC generator", "Slip rings (current keeps alternating)"] },
          { cells: ["Rings in a DC generator", "Split ring commutator (current flows one way)"] },
          { cells: ["AC frequency in India", "50 Hz, so the current changes direction 100 times a second"] },
        ],
        caption: "A motor and a generator are built alike: a coil, a magnet and rings. Only the energy change is reversed.",
      },
      selfCheckExample: {
        prompt: "The coil of an AC generator makes 30 turns each second. How many times each second does the current change direction?",
        steps: ["The current reverses twice in each turn.", "\\(30 \\times 2 = 60\\) times a second."],
        answer: "60",
      },
      practiceSet: [
        { prompt: "What energy change happens in an electric generator?", answer: "Mechanical energy to electrical energy" },
        { prompt: "Which rule gives the direction of the induced current?", answer: "Fleming's right hand rule" },
        { prompt: "Which rings does an AC generator use?", answer: "Slip rings" },
        { prompt: "Who discovered electromagnetic induction?", answer: "Michael Faraday" },
      ],
      pyqExampleId: "47870cce-5a7d-45f4-8a7b-314ead63494c",
      traps: [
        {
          title: "One reversal per turn",
          body: "The current reverses every HALF revolution, so twice in each full turn. A 50 Hz supply changes direction 100 times a second.",
        },
      ],
    },
  ],
};
