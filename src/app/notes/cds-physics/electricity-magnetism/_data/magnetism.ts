import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PH_EM_MAGNETISM_NOTE: SubtopicNote = {
  subtopicName: "Magnetism and Induction",
  title: "Magnetism and Induction",
  oneLineDefinition:
    "Magnetic materials and field lines, the Earth's field, the field round a current and the hand rules, the force on a moving charge, and induced current with the transformer.",
  whyItMatters:
    "Thirteen CDS questions from 2016 (II) to 2026 (II), three of them from 2026 (II) alone. Four ask about magnets and field lines, four about the field of a current and the rules for its direction, two about the force on a moving charge, and three about induced current and the transformer. The one HARD question in the chapter is here.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsphem-magnets",
      name: "Magnets, magnetic materials and field lines",
      intuition:
        "Field lines are a picture of a magnet's pull. Outside a bar magnet they leave the north pole and enter the south pole, and inside the magnet they run back from south to north, so every line is a closed loop. Where the lines crowd together the field is strong. Materials answer a magnet in three ways: most are pushed away very weakly, some are pulled in weakly, and only a few, like iron, are pulled in strongly.",
      definition:
        "What to know:\n" +
        "- Field lines run **north to south outside** a magnet and **south to north inside** it; they form **closed loops**.\n" +
        "- Two field lines **never cross**: the field at a point has only one direction. Lines **closer together** mean a **stronger** field. They are not always parallel.\n" +
        "- **Diamagnetic** materials are weakly pushed away; **paramagnetic** ones are weakly pulled in; **ferromagnetic** ones are strongly pulled in and can be made into magnets.\n" +
        "- Ferromagnetism needs tiny regions (domains) of lined-up atoms held in a **solid**, so liquids and gases are never ferromagnetic. Above its **Curie temperature** a ferromagnet becomes paramagnetic.\n" +
        "- The **Earth's field** at a place is fixed by three things: **declination** (angle between geographic north and magnetic north), **dip or inclination** (angle the field makes with the horizontal) and the **horizontal component**. Declination and dip together give its **direction**.",
      table: {
        columns: ["Type", "Behaviour near a magnet", "Examples"],
        rows: [
          { cells: ["Diamagnetic", "Weakly pushed away", "Bismuth, copper, silver, water"] },
          { cells: ["Paramagnetic", "Weakly pulled in", "Aluminium, sodium, oxygen"] },
          {
            cells: ["Ferromagnetic", "Strongly pulled in; can become a magnet", "Iron, cobalt, nickel"],
            noteAmber: "CDS 2016 (II): liquids and gases never show ferromagnetism.",
            pyqExampleId: "c5af57ba-b83b-4b66-90a9-374446dea97d",
          },
        ],
      },
      pyqExampleId: "c5af57ba-b83b-4b66-90a9-374446dea97d",
      selfCheckExample: {
        prompt: "Inside a bar magnet, in which direction do the field lines run? Why can two field lines never cross?",
        steps: [
          "Outside the magnet the lines go from north to south; to close the loop they run from south to north inside.",
          "At a crossing point the field would have two directions at once, which cannot happen.",
        ],
        answer: "South to north inside; a crossing would give the field two directions at one point.",
      },
      practiceSet: [
        { prompt: "Is aluminium diamagnetic, paramagnetic or ferromagnetic?", answer: "Paramagnetic" },
        { prompt: "What happens to a ferromagnetic material when it is heated above its Curie temperature?", answer: "It becomes paramagnetic" },
        { prompt: "Near which parts of a bar magnet are its field lines closest together?", answer: "Near the poles, where the field is strongest" },
        { prompt: "What is the dip (inclination) of the Earth's field at a place?", answer: "The angle the field makes with the horizontal" },
      ],
      traps: [
        {
          title: "Ferromagnetism needs a solid",
          body: "Its domains need atoms held in a fixed crystal. The atoms of a **liquid** or **gas** move about freely, so fluids can be diamagnetic or paramagnetic but **never ferromagnetic**.",
        },
        {
          title: "Field lines never cross, and need not be parallel",
          body: "Field lines **never cross**, inside a magnet or outside it. They curve from pole to pole, so they are **parallel only where the field is uniform** (for example inside a long solenoid).",
        },
        {
          title: "Declination alone does not give the direction",
          body: "Declination gives the field's angle **across** the ground; dip gives its tilt **below** the horizontal. You need **both** to fix the direction of the Earth's field.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsphem-field",
      name: "Magnetic field of a current and the hand rules",
      intuition:
        "In 1820 Oersted saw that a current deflects a compass needle: a current makes a magnetic field. Round a straight wire the field lines are circles. Inside a long coil (a solenoid) they are straight and parallel, so the coil acts like a bar magnet. Three hand rules are easy to mix up, so learn what each one is for.",
      definition:
        "What to know:\n" +
        "- **Straight wire**: field lines are **concentric circles** round the wire; the field is weaker farther away.\n" +
        "- **Circular loop**: near the centre the lines are almost straight.\n" +
        "- **Long solenoid**: inside, the field is **uniform** and the lines are **parallel straight lines**; outside, it looks like a bar magnet's field. A soft iron core makes it an **electromagnet**.\n" +
        "- The field grows with the **current** and the **number of turns**.\n" +
        "- Two parallel wires: currents the **same way attract**, **opposite ways repel**. Close wires with equal and opposite currents: midway between them the two fields **add**; far away they almost **cancel**.\n" +
        "- **Faraday's law** gives only the **size** of an induced emf; **Lenz's law** gives its direction.",
      table: {
        columns: ["Rule", "What it gives", "How to hold the hand"],
        rows: [
          {
            cells: ["Right-hand thumb rule", "Direction of the field round a current", "Thumb along the current; curled fingers show the field"],
            noteAmber: "CDS 2025 (I): the right-hand thumb rule gives the field round a straight conductor.",
            pyqExampleId: "fb6ca5a6-98b2-4dc0-a8dd-c5973664095c",
          },
          { cells: ["Fleming's left-hand rule", "Direction of the force on a current in a field (motor rule)", "Forefinger field, middle finger current, thumb force"] },
          { cells: ["Fleming's right-hand rule", "Direction of the induced current (generator rule)", "Forefinger field, thumb motion, middle finger induced current"] },
          { cells: ["Hund's rule", "Not a magnetism rule: it fills electrons into orbitals", "Not a hand rule (chemistry)"] },
        ],
      },
      pyqExampleId: "fb6ca5a6-98b2-4dc0-a8dd-c5973664095c",
      selfCheckExample: {
        prompt: "A current flows vertically upward in a long straight wire. Seen from above, do the magnetic field lines go clockwise or anticlockwise?",
        steps: [
          "Point the right thumb upward, along the current.",
          "Seen from above, the curled fingers turn anticlockwise.",
        ],
        answer: "Anticlockwise",
      },
      practiceSet: [
        { prompt: "What is a solenoid with a soft iron core called?", answer: "An electromagnet" },
        { prompt: "Two long parallel wires carry currents in the same direction. Do they attract or repel each other?", answer: "They attract" },
        { prompt: "Who first showed that an electric current deflects a compass needle?", answer: "Hans Christian Oersted, in 1820" },
        { prompt: "How does the field round a long straight wire change as you move farther from it?", answer: "It gets weaker" },
      ],
      traps: [
        {
          title: "Thumb rule for the field, Fleming's rules for force and induced current",
          body: "The **right-hand thumb rule** gives the field round a current. **Fleming's left-hand** rule gives the **force** (motors); **Fleming's right-hand** rule gives the **induced current** (generators). Hund's rule is chemistry.",
        },
        {
          title: "Between opposite currents the fields add",
          body: "Midway between two close wires with **opposite** currents, both fields point the **same way**, so the field is **strong** there, not zero. It is **far away** that the two nearly cancel.",
        },
        {
          title: "Inside a long solenoid the lines are straight",
          body: "The field inside a long solenoid is **uniform**: parallel straight lines along its axis. They are not circles, ellipses or curves.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsphem-force",
      name: "Force on a moving charge and on a current",
      intuition:
        "A magnetic field pushes on a charge only while it moves across the field lines. The push is greatest when the charge moves at right angles to the field and zero when it moves along the field. The push is always at right angles to the motion, so it bends the path without changing the speed. A current is just moving charges, so a wire carrying a current across a field is pushed too: that is how a motor turns.",
      definition:
        "The rules:\n" +
        "- On a charge: \\(F = qvB\\sin\\theta\\), with \\(\\theta\\) the angle between velocity and field. **Maximum** at \\(\\theta = 90^{\\circ}\\); **zero** when parallel or anti-parallel.\n" +
        "- On a wire: \\(F = BIl\\sin\\theta\\).\n" +
        "- **Direction**: Fleming's left-hand rule, or \\(\\vec{F} = q\\,\\vec{v} \\times \\vec{B}\\). For a **positive** charge the \"current\" points along its velocity; for an **electron**, turn the answer round.\n" +
        "- The force is at right angles to the velocity, so it does **no work**: the speed stays the same and the path curves (a circle when \\(\\theta = 90^{\\circ}\\)).\n" +
        "- The **electric motor** works on the force on a current-carrying coil in a field.",
      formula: {
        label: "Magnetic force",
        latex: "F = qvB\\sin\\theta \\qquad F = BIl\\sin\\theta \\qquad \\vec{F} = q\\,\\vec{v} \\times \\vec{B}",
        symbols: [
          { symbol: "q, v", meaning: "charge and its speed" },
          { symbol: "B", meaning: "magnetic field, in tesla" },
          { symbol: "θ", meaning: "angle between the velocity (or current) and the field" },
          { symbol: "I, l", meaning: "current and length of wire in the field" },
        ],
      },
      authoredExample: {
        prompt:
          "A proton (charge \\(1.6 \\times 10^{-19}\\) C) moves north at \\(2 \\times 10^{6}\\) m/s in a field of 0.5 T pointing vertically upward. Find the size and the direction of the force on it. Then find the force on a 0.2 m wire carrying 3 A at right angles to the same field.",
        steps: [
          "Velocity (north) and field (up) are at right angles, so \\(\\sin\\theta = 1\\).",
          "\\(F = qvB = 1.6 \\times 10^{-19} \\times 2 \\times 10^{6} \\times 0.5 = 1.6 \\times 10^{-13}\\) N.",
          "Direction: take east, north and up as x, y and z. North \\(\\times\\) up \\(= \\hat{y} \\times \\hat{z} = \\hat{x}\\), which is east. The proton is positive, so the force is towards the **east**.",
          "Wire: \\(F = BIl = 0.5 \\times 3 \\times 0.2 = 0.3\\) N.",
        ],
        answer: "\\(1.6 \\times 10^{-13}\\) N towards the east; 0.3 N on the wire.",
      },
      selfCheckExample: {
        prompt:
          "An electron and a proton enter the same magnetic field with the same velocity, at right angles to the field. Compare the sizes and the directions of the forces on them.",
        steps: [
          "Both carry a charge of the same size, with the same \\(v\\) and \\(B\\), so \\(qvB\\) is the same.",
          "Their charges have opposite signs, so the forces point opposite ways.",
        ],
        answer: "Equal in size, opposite in direction.",
      },
      pyqExampleId: "f4b5fcc5-6831-4614-b715-8c2150a7ed8f",
      practiceSet: [
        { prompt: "Can a magnetic field change the speed of a moving charged particle?", answer: "No. The force is at right angles to the motion, so it changes only the direction" },
        { prompt: "A 0.5 m wire carrying 4 A lies at right angles to a field of 0.2 T. What force acts on it?", answer: "0.4 N", method: "\\(F = BIl\\)" },
        { prompt: "Which device works on the force on a current-carrying coil in a magnetic field: a motor or a generator?", answer: "The electric motor" },
        { prompt: "At what angle to the field must a charge move for the magnetic force on it to be zero?", answer: "0° or 180° (along the field)" },
      ],
      traps: [
        {
          title: "No force along the field",
          body: "If the charge moves **parallel** or **anti-parallel** to the field, \\(\\sin\\theta = 0\\) and there is **no** magnetic force. The force is biggest at **right angles**.",
        },
        {
          title: "Turn the answer round for an electron",
          body: "Fleming's left-hand rule and \\(q\\,\\vec{v} \\times \\vec{B}\\) give the force on a **positive** charge. An electron moving the same way feels the force in the **opposite** direction.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsphem-induction",
      name: "Electromagnetic induction and the transformer",
      intuition:
        "When the magnetic field through a coil changes, a voltage appears in the coil and drives a current. Nothing happens while the magnet sits still; it is the change that counts, and a faster change gives a bigger voltage. A generator uses this by spinning a coil in a field. A transformer uses it to raise or lower an alternating voltage, and it works only with AC, because a steady current gives no change.",
      definition:
        "The rules:\n" +
        "- **Faraday's law**: induced emf \\(= N \\times\\) rate of change of magnetic flux. Faster change, bigger emf.\n" +
        "- **Lenz's law**: the induced current opposes the change that causes it (hence the minus sign).\n" +
        "- **Fleming's right-hand rule** gives the direction of the induced current. A **generator** turns mechanical energy into electrical energy.\n" +
        "- **Transformer** (AC only): \\(\\dfrac{V_s}{V_p} = \\dfrac{N_s}{N_p}\\). Step-up: more turns on the secondary. In an ideal transformer \\(V_pI_p = V_sI_s\\), so stepping the voltage up steps the current down.\n" +
        "- A transformer heats up from its **losses**: heating of the windings (\\(I^{2}R\\), copper loss) and losses in the core (**hysteresis** and **eddy currents**). The core is made of thin **laminated** sheets to cut eddy currents; big ones are cooled by oil.",
      formula: {
        label: "Induction and the transformer",
        latex: "\\varepsilon = -N\\dfrac{\\Delta\\Phi}{\\Delta t} \\qquad \\dfrac{V_s}{V_p} = \\dfrac{N_s}{N_p} = \\dfrac{I_p}{I_s}",
        symbols: [
          { symbol: "N", meaning: "number of turns in the coil" },
          { symbol: "ΔΦ/Δt", meaning: "rate of change of magnetic flux" },
          { symbol: "p, s", meaning: "primary and secondary coils" },
        ],
      },
      authoredExample: {
        prompt:
          "A transformer lowers the 220 V mains to 11 V for a doorbell. Its primary has 2000 turns. How many turns does the secondary need? If the bell draws 2 A, what current does an ideal transformer take from the mains?",
        steps: [
          "\\(N_s = N_p \\times \\dfrac{V_s}{V_p} = 2000 \\times \\dfrac{11}{220} = 100\\) turns.",
          "Ideal: \\(V_pI_p = V_sI_s\\), so \\(I_p = \\dfrac{11 \\times 2}{220} = 0.1\\) A.",
        ],
        answer: "100 turns; 0.1 A from the mains.",
      },
      selfCheckExample: {
        prompt: "The magnetic flux through a coil of 50 turns changes by 0.02 Wb in 0.1 s. What emf is induced?",
        steps: ["\\(\\varepsilon = N\\dfrac{\\Delta\\Phi}{\\Delta t} = 50 \\times \\dfrac{0.02}{0.1} = 50 \\times 0.2 = 10\\) V."],
        answer: "10 V",
      },
      pyqExampleId: "d1386d9b-1450-45b7-80f4-2462239ed375",
      practiceSet: [
        { prompt: "Does a transformer work on a steady DC supply?", answer: "No. A steady current gives no change of flux, so nothing is induced" },
        { prompt: "A transformer has 100 turns on the primary and 500 on the secondary. Is it a step-up or a step-down transformer?", answer: "Step-up (it raises the voltage 5 times)" },
        { prompt: "What energy change takes place in an electric generator?", answer: "Mechanical to electrical" },
        { prompt: "Why is the core of a transformer made of thin laminated sheets?", answer: "To cut the eddy-current loss in the core" },
      ],
      traps: [
        {
          title: "Step-up voltage means step-down current",
          body: "A transformer cannot make energy. If it raises the **voltage** 10 times, the **current** on that side is about one tenth. Power in = power out (ideal).",
        },
        {
          title: "A magnet at rest induces nothing",
          body: "Induction needs a **change** of flux. A magnet held still inside a coil gives **no** current; moving it in or out gives one, and moving it faster gives a bigger one.",
        },
        {
          title: "A transformer heats up from its own losses",
          body: "The heat comes from the **current in the windings** (\\(I^{2}R\\)) and from **hysteresis and eddy currents** in the core. The cooling oil gets hot because of that heat; it is not the cause.",
        },
      ],
    },
  ],
};
