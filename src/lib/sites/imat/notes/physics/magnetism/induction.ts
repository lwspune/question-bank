import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_PHY_MAG_INDUCTION_NOTE: SubtopicNote = {
  subtopicName: "Electromagnetic Induction",
  title: "Electromagnetic Induction, Generators and Transformers",
  oneLineDefinition:
    "A changing magnetic flux through a coil induces a voltage in it, in the direction that opposes the change; generators and transformers are built on this.",
  whyItMatters:
    "The 2013 paper asked which changes alter the voltage from an AC generator, and the 2022 paper asked which way the induced current flows when a magnet moves into or out of a coil. Transformers are in the syllabus but have not been asked yet.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-mag-faraday",
      name: "Magnetic flux and Faraday's law of induction",
      intuition:
        "Magnetic flux counts how much field passes through a loop. While that amount is changing, a voltage appears in the loop; when it stops changing, the voltage stops. The faster the change and the more turns of wire, the bigger the voltage. It does not matter how the change is made: move the magnet, move the coil, or change the current in an electromagnet.",
      definition:
        "- **Magnetic flux** through a flat loop of area \\(A\\): \\(\\Phi = BA\\cos\\theta\\), where \\(\\theta\\) is the angle between the field and the normal to the loop. Unit: the **weber** (\\(1\\ \\text{Wb} = 1\\ \\text{T m}^2\\)).\n" +
        "- **Faraday's law**: the induced e.m.f. equals the rate of change of flux linkage, \\(\\varepsilon = N\\,\\Delta\\Phi/\\Delta t\\).\n" +
        "- **No change, no e.m.f.**: a magnet held still inside a coil induces nothing.\n" +
        "- The e.m.f. grows with the number of turns, the field strength, the coil area and the speed of the change. The **thickness** of the wire does not change the e.m.f.; it only changes the resistance, and so the current.",
      formula: {
        label: "Faraday's law",
        latex: "\\Phi = B A \\cos\\theta \\qquad \\varepsilon = N \\frac{\\Delta \\Phi}{\\Delta t}",
        symbols: [
          { symbol: "\\(\\Phi\\)", meaning: "magnetic flux through one turn, in Wb" },
          { symbol: "\\(N\\)", meaning: "number of turns of the coil" },
          { symbol: "\\(\\Delta t\\)", meaning: "time taken for the change, in s" },
          { symbol: "\\(\\varepsilon\\)", meaning: "average induced e.m.f., in V" },
        ],
      },
      authoredExample: {
        prompt:
          "A coil of 200 turns, each of area \\(5.0 \\times 10^{-3}\\ \\text{m}^2\\), sits at right angles to a magnetic field. The field rises steadily from 0 to 0.40 T in 0.10 s. Find the e.m.f. induced.",
        steps: [
          "Change of flux through one turn: \\(\\Delta\\Phi = \\Delta B \\times A = 0.40 \\times 5.0 \\times 10^{-3} = 2.0 \\times 10^{-3}\\ \\text{Wb}\\).",
          "\\(\\varepsilon = N\\,\\Delta\\Phi/\\Delta t = 200 \\times 2.0 \\times 10^{-3} / 0.10 = 4.0\\ \\text{V}\\).",
          "Once the field stops rising, the e.m.f. drops to zero.",
        ],
        answer: "4.0 V",
      },
      selfCheckExample: {
        prompt:
          "A coil of 50 turns, each of area 0.020 m², lies at right angles to a magnetic field. The field falls steadily from 0.60 T to 0.20 T in 0.040 s. What is the induced e.m.f.?",
        options: ["10 V", "0.20 V", "15 V", "0.40 V", "20 V"],
        steps: [
          "\\(\\Delta B = 0.60 - 0.20 = 0.40\\ \\text{T}\\), so \\(\\Delta\\Phi = 0.40 \\times 0.020 = 8.0 \\times 10^{-3}\\ \\text{Wb}\\) per turn.",
          "\\(\\varepsilon = 50 \\times 8.0 \\times 10^{-3} / 0.040 = 10\\ \\text{V}\\).",
          "B forgets the 50 turns. C uses the starting field instead of the change. D forgets to divide by the time. E adds the two fields.",
        ],
        answer: "(A) 10 V",
      },
      practiceSet: [
        { prompt: "What is the flux through a loop of area 0.10 m² at right angles to a 0.30 T field?", answer: "0.030 Wb", method: "\\(BA\\)" },
        { prompt: "A bar magnet rests without moving inside a coil. What e.m.f. is induced?", answer: "None", method: "The flux is not changing" },
        { prompt: "A coil is rewound with twice as many turns, and the magnet is moved exactly as before. What happens to the e.m.f.?", answer: "It doubles", method: "\\(\\varepsilon \\propto N\\)" },
      ],
      traps: [
        {
          title: "A strong field alone induces nothing",
          body: "Induction needs a change of flux. A coil in a huge but steady field, with nothing moving, has no induced e.m.f. What matters is how fast the flux changes, not how big it is.",
        },
        {
          title: "Thicker wire does not raise the induced e.m.f.",
          body: "The e.m.f. depends on the number of turns, the field, the area and the speed of change. Thicker wire lowers the resistance, so more current flows for the same e.m.f., but the e.m.f. itself is unchanged.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-mag-lenz",
      name: "Lenz's law: the direction of the induced current",
      intuition:
        "If an induced current helped the change that made it, it would make the change bigger, which would make more current, for ever: free energy. Nature does not allow that. So the induced current always flows in the direction that fights the change, and you have to do work against it. That work is where the electrical energy comes from.",
      definition:
        "**Lenz's law**: the induced current flows in the direction that **opposes the change** of flux that produced it. (This is the minus sign often written in Faraday's law, \\(\\varepsilon = -N\\,\\Delta\\Phi/\\Delta t\\).)\n" +
        "- Push a **N pole into** one end of a coil: that end becomes a **N pole**, to push the magnet back.\n" +
        "- Pull the N pole **out**: that end becomes a **S pole**, to pull it back. The current reverses.\n" +
        "- Swapping the pole (S instead of N) also reverses the current. So pushing a S pole in gives the same current as pulling a N pole out of the same end.\n" +
        "- Moving faster gives a bigger current in the same direction.\n" +
        "- Induced **eddy currents** in solid metal also oppose motion: this is how magnetic brakes work.",
      authoredExample: {
        prompt:
          "The N pole of a bar magnet is pushed towards end P of a coil connected to a meter, and the meter swings to the right. Predict the meter for: (a) the N pole pulled away from P; (b) the S pole pushed towards P; (c) the N pole pushed towards P twice as fast.",
        steps: [
          "Pushing the N pole in: P becomes a N pole to repel it. Call that current direction \"right\".",
          "(a) Pulling the N pole away: P must become a S pole to attract it back, so the current reverses: left.",
          "(b) The S pole approaching: P becomes a S pole to repel it, again the reverse of the original: left.",
          "(c) Same change, made faster: same direction, larger current: further to the right.",
        ],
        answer: "(a) left; (b) left; (c) right, with a bigger swing",
      },
      selfCheckExample: {
        prompt:
          "A strong magnet is dropped down a long vertical copper tube. How does its fall compare with its fall down an identical plastic tube?",
        options: [
          "It falls with the same acceleration in both tubes",
          "It sticks to the inside of the copper tube, because copper is magnetic",
          "It falls more slowly in the copper tube, because the currents induced in the copper oppose its motion",
          "It falls faster in the copper tube, because the induced currents pull it down",
          "It stops and stays at rest inside the copper tube",
        ],
        steps: [
          "The moving magnet changes the flux through each ring of copper, inducing eddy currents. By Lenz's law they oppose the motion, so the magnet falls slowly.",
          "Plastic is an insulator, so no current flows there and the magnet falls freely. Copper is not ferromagnetic (B). D breaks Lenz's law. E is impossible: if the magnet stopped, the flux would stop changing and the braking current would vanish.",
        ],
        answer: "(C) It falls more slowly in the copper tube, because the currents induced in the copper oppose its motion",
      },
      practiceSet: [
        { prompt: "The S pole of a magnet is pulled out of end Q of a coil. What pole appears at Q?", answer: "A N pole", method: "It attracts the leaving S pole back" },
        { prompt: "Pushing a N pole into end X gives a clockwise current. Name another action at end X giving the same direction.", answer: "Pulling a S pole out of end X", method: "Swapping the pole and the motion reverses the current twice" },
        { prompt: "Where does the electrical energy of an induced current come from?", answer: "From the work done against the opposing force", method: "Lenz's law is energy conservation" },
      ],
      traps: [
        {
          title: "The induced current opposes the change, not the field",
          body: "Lenz's law opposes the change of flux. If the flux through a coil is falling, the induced current tries to keep it up, making a field in the same direction as the original one. Reversing either the pole or the direction of motion reverses the current; reversing both leaves it unchanged.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-mag-transformer",
      name: "Generators and transformers",
      intuition:
        "A generator turns a coil in a magnetic field, so the flux through it rises and falls over and over, and the induced voltage swings back and forth: alternating current. A transformer uses the same idea without moving parts. An alternating current in one coil makes a changing flux in an iron core, which induces a voltage in a second coil; the ratio of turns sets the ratio of voltages.",
      definition:
        "- **AC generator**: a coil of \\(N\\) turns and area \\(A\\) spinning at angular speed \\(\\omega\\) in a field \\(B\\) gives a peak e.m.f. \\(\\varepsilon_0 = NBA\\omega\\). Faster spinning raises both the peak e.m.f. and the frequency.\n" +
        "- **Transformer**: \\(V_s/V_p = N_s/N_p\\). More turns on the secondary: **step-up**; fewer: **step-down**.\n" +
        "- In an ideal transformer, power in = power out: \\(V_p I_p = V_s I_s\\). Stepping the voltage up steps the current **down** by the same factor.\n" +
        "- A transformer works only on **AC**. A steady DC current gives a steady flux, so nothing is induced in the secondary.\n" +
        "- Power lines use very high voltages so that the current, and the \\(I^2 R\\) heating loss in the cables, is small.",
      formula: {
        label: "Ideal transformer",
        latex: "\\frac{V_s}{V_p} = \\frac{N_s}{N_p} \\qquad V_p I_p = V_s I_s",
        symbols: [
          { symbol: "\\(V_p, V_s\\)", meaning: "primary and secondary voltages (AC), in V" },
          { symbol: "\\(N_p, N_s\\)", meaning: "number of turns on the primary and secondary coils" },
          { symbol: "\\(I_p, I_s\\)", meaning: "primary and secondary currents, in A" },
        ],
      },
      authoredExample: {
        prompt:
          "A phone charger steps 230 V AC down to 11.5 V. Its primary coil has 1200 turns. How many turns does the secondary need? If the secondary supplies 2.0 A, what current does the ideal transformer draw from the mains?",
        steps: [
          "\\(N_s = N_p \\times V_s/V_p = 1200 \\times 11.5/230 = 60\\) turns.",
          "Power out: \\(11.5 \\times 2.0 = 23\\ \\text{W}\\). Power in is the same, so \\(I_p = 23/230 = 0.10\\ \\text{A}\\).",
          "The voltage fell by a factor of 20 and the current rose by the same factor.",
        ],
        answer: "60 turns; 0.10 A",
      },
      selfCheckExample: {
        prompt:
          "An ideal transformer has 500 turns on its primary and 2000 turns on its secondary. The primary is connected to a 120 V AC supply. Which statement is correct?",
        options: [
          "The output is 480 V, and the secondary current is 4 times the primary current",
          "The output is 480 V, and the secondary current is a quarter of the primary current",
          "The output is 30 V, and the secondary current is 4 times the primary current",
          "The output is 120 V, and the two currents are equal",
          "The output is 480 V, and the output power is 4 times the input power",
        ],
        steps: [
          "\\(V_s = 120 \\times 2000/500 = 480\\ \\text{V}\\): a step-up transformer.",
          "Power in = power out, so the current is stepped down by the same factor of 4.",
          "A keeps the voltage right but breaks energy conservation; E says so openly. C uses the turns ratio upside down.",
        ],
        answer: "(B) The output is 480 V, and the secondary current is a quarter of the primary current",
      },
      practiceSet: [
        { prompt: "A transformer with turns ratio \\(N_s : N_p = 1 : 20\\) is connected to 240 V AC. What is the output voltage?", answer: "12 V", method: "\\(240/20\\)" },
        { prompt: "The primary of a transformer is connected to a 12 V car battery. What is the steady output voltage?", answer: "Zero", method: "DC gives no changing flux" },
        { prompt: "A generator coil is turned twice as fast. What happens to the peak e.m.f.?", answer: "It doubles (and so does the frequency)", method: "\\(\\varepsilon_0 = NBA\\omega\\)" },
      ],
      traps: [
        {
          title: "A transformer cannot increase power",
          body: "A step-up transformer raises the voltage but lowers the current by the same factor, so the power out is at most the power in. An option where both voltage and current go up, or where power is gained, is always wrong.",
        },
        {
          title: "Transformers do not work on DC",
          body: "Induction needs a changing flux. A steady direct current makes a steady flux in the core, so the secondary has no e.m.f. once the current has settled.",
        },
      ],
    },
  ],
};
