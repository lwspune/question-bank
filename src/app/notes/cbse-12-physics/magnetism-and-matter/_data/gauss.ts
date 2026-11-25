import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_MM_GAUSS_NOTE: SubtopicNote = {
  subtopicName: "Magnetism and Gauss's Law",
  title: "Magnetism and Gauss's Law",
  oneLineDefinition:
    "Gauss's law for magnetism: the net magnetic flux through any closed surface is zero, because isolated magnetic poles do not exist, and how magnetic field lines differ from electric field lines.",
  whyItMatters:
    "3 questions. One was set in a board paper (2023): do magnetic field lines show the force on a moving charge, and how would Gauss's law of magnetism change if monopoles existed. The textbook adds the same two ideas with two more parts, and a set of field-line pictures to judge right or wrong.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpmm-gauss-law",
      name: "Gauss's law for magnetism",
      intuition:
        "Magnetic field lines are closed loops. Draw any closed surface: every line that goes out through it must come back in somewhere, so what leaves and what enters always balance. In electrostatics the flux is not zero when the surface holds a charge, because lines start on charges. Nothing like a magnetic charge has ever been found.",
      definition:
        "- Magnetic flux through a small area element: \\(\\Delta\\phi_B = \\vec{B} \\cdot \\Delta\\vec{S}\\). The unit of flux is the weber (Wb), \\(1\\ \\text{Wb} = 1\\ \\text{T m}^2\\).\n" +
        "- **Gauss's law for magnetism:** the net magnetic flux through any closed surface is zero, \\(\\phi_B = \\sum_{\\text{all}} \\vec{B} \\cdot \\Delta\\vec{S} = 0\\).\n" +
        "- Compare Gauss's law of electrostatics: \\(\\sum \\vec{E} \\cdot \\Delta\\vec{S} = \\dfrac{q}{\\varepsilon_0}\\), with \\(q\\) the charge enclosed.\n" +
        "- The difference says that **isolated magnetic poles (monopoles) do not exist**: there are no sources or sinks of \\(\\vec{B}\\). The simplest magnetic element is a dipole or a current loop.\n" +
        "- **If monopoles existed**, the flux through a closed surface would equal \\(\\mu_0 q_m\\), where \\(q_m\\) is the magnetic charge enclosed.\n" +
        "- Magnetic field lines are **not** lines of force on a moving charge: the force \\(\\vec{F} = q\\vec{v} \\times \\vec{B}\\) is always at right angles to \\(\\vec{B}\\).\n" +
        "- A system can have a magnetic moment even when its net charge is zero, as the atoms of a paramagnetic material do.",
      formula: {
        label: "Gauss's law for magnetism",
        latex: "\\phi_B = \\sum_{\\text{all}} \\vec{B} \\cdot \\Delta\\vec{S} = 0 \\qquad \\Big(\\text{with monopoles: } \\oint \\vec{B} \\cdot d\\vec{S} = \\mu_0 q_m\\Big)",
      },
      authoredExample: {
        prompt:
          "A closed surface is drawn round the north pole of a bar magnet only. A flux of \\(4 \\times 10^{-4}\\) Wb leaves the surface near the pole. Find the flux that enters the rest of the surface, and the net flux through it.",
        steps: [
          "Gauss's law for magnetism: net flux through any closed surface \\(= 0\\).",
          "The lines leaving near the pole run on inside the magnet and come back in through the part of the surface the magnet crosses.",
          "So the flux entering is \\(4 \\times 10^{-4}\\) Wb, and the net flux is \\(4 \\times 10^{-4} - 4 \\times 10^{-4} = 0\\).",
        ],
        answer: "\\(4 \\times 10^{-4}\\) Wb enters; the net flux is zero",
      },
      selfCheckExample: {
        prompt:
          "The outward magnetic fluxes through five faces of a closed cube are \\(+2\\), \\(-5\\), \\(+1\\), \\(+4\\) and \\(-3\\) mWb. Find the flux through the sixth face.",
        steps: ["The net flux must be zero.", "Sum of the five: \\(2 - 5 + 1 + 4 - 3 = -1\\) mWb, so the sixth face carries \\(+1\\) mWb."],
        answer: "+1 mWb (1 mWb outward)",
      },
      practiceSet: [
        { prompt: "What is the net magnetic flux through any closed surface?", answer: "Zero" },
        { prompt: "What does Gauss's law for magnetism tell us about magnetic poles?", answer: "Isolated magnetic poles (monopoles) do not exist" },
        { prompt: "What is the simplest magnetic element?", answer: "A magnetic dipole or a current loop" },
        { prompt: "Can a system have a magnetic moment though its net charge is zero?", answer: "Yes. Its charges may add to zero while its current loops give a net magnetic moment, as in a paramagnetic atom" },
      ],
      pyqExampleId: "964d2230-c619-448f-b7a1-b8e5903ca7de",
      traps: [
        {
          title: "Calling magnetic field lines lines of force",
          body: "The force on a moving charge, \\(q\\vec{v} \\times \\vec{B}\\), is perpendicular to \\(\\vec{B}\\), so it never points along a field line. Give this reason; the word No alone earns nothing.",
        },
        {
          title: "Writing the modified law wrongly",
          body: "With monopoles the magnetic flux becomes \\(\\mu_0 q_m\\), with \\(\\mu_0\\) multiplying. Do not copy the \\(1/\\varepsilon_0\\) of the electric law.",
        },
        {
          title: "Thinking zero flux means zero field",
          body: "The net flux is zero even where the field is strong. What enters the surface simply equals what leaves it.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpmm-field-lines",
      name: "Magnetic and electric field lines compared",
      intuition:
        "Magnetic and electric field lines are drawn by the same rules, a tangent for the direction and crowding for the strength, but they come from different sources. Electric lines start and end on charges. Magnetic lines have nothing to start or end on, so they must close on themselves.",
      definition:
        "- The board asks you to judge whether a picture of field lines is right, and to give the reason. Check three things: do the lines start or end anywhere, do they cross, and is the net flux through a closed surface zero.\n" +
        "- A closed loop of a static magnetic field line must enclose a region through which a current flows, like the lines inside a toroid or round a straight wire.",
      table: {
        columns: ["Point", "Magnetic field lines", "Electrostatic field lines"],
        rows: [
          { cells: ["Start and end", "No start or end: continuous closed loops", "Start on positive charge, end on negative charge or at infinity"] },
          { cells: ["Closed loops", "Always closed; a loop must enclose a current", "Never form closed loops"] },
          { cells: ["Crossing", "Never cross", "Never cross"] },
          { cells: ["Net flux through a closed surface", "Always zero", "Equal to q/ε₀; not zero when charge is enclosed"] },
          { cells: ["Field round a long straight source", "Circles round a current-carrying wire", "Radial lines from a charged wire"] },
          { cells: ["At the edges of pole pieces or plates", "Curve outwards (fringing)", "Curve outwards (fringing)"] },
          { cells: ["What the direction shows", "How a small compass needle sets; not the force on a moving charge", "The force on a positive charge"] },
        ],
      },
      practiceSet: [
        { prompt: "Can a static magnetic field line form a closed loop round empty space?", answer: "No. A closed loop must enclose a region through which a current flows" },
        { prompt: "Can electrostatic field lines form closed loops?", answer: "No" },
        { prompt: "Where is the magnetic field of a toroid found?", answer: "Inside its windings, confined to the toroid" },
      ],
      pyqExampleId: "cd3ef2fc-8afb-42bd-b5b0-848304b1f30b",
      traps: [
        {
          title: "Lines leaving a magnetic 'charge'",
          body: "A picture with all its lines leaving one point or one plate cannot be a magnetic field: the flux through a surface round it would not be zero. That picture is an electric field.",
        },
        {
          title: "Perfectly straight lines up to the edge",
          body: "Lines between pole pieces, or at the ends of a solenoid, curve out at the edges. A picture with them straight and sharply cut off is wrong.",
        },
      ],
    },
  ],
};
