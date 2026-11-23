import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_EC_REFERENCE_NOTE: SubtopicNote = {
  subtopicName: "Reference Electrodes",
  title: "Reference Electrodes and the Standard Hydrogen Electrode",
  oneLineDefinition:
    "Why the potential of a single electrode cannot be measured, what a reference electrode is, and how the standard hydrogen electrode is built and used to find standard potentials.",
  whyItMatters:
    "6 questions. Five were set in board papers: a labelled diagram of the calomel electrode (2014), a labelled diagram of the primary reference electrode (2016), what a reference electrode is (2023), a cell of zinc with the standard hydrogen electrode and its potential at 0.01 M Zn²⁺ (2024), and a diagram of the standard hydrogen electrode with the emf of a magnesium and silver cell (2025). The textbook adds why one electrode's potential cannot be measured alone.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccec-reference-electrode",
      name: "What a reference electrode is",
      intuition:
        "You cannot measure the height of one point without a zero to measure from. Electrode potentials are the same: only the difference between two electrodes can be measured. So chemists picked one electrode, called its potential zero, and measure every other electrode against it.",
      definition:
        "- Every oxidation must be accompanied by a reduction, so one electrode alone cannot work and its potential cannot be measured.\n" +
        "- Two electrodes must be combined into a cell; what is measured is the cell potential, the algebraic sum of the two electrode potentials.\n" +
        "- If one electrode's potential is zero, the measured cell potential is the potential of the other electrode.\n" +
        "- A **reference electrode** is an electrode whose potential is arbitrarily taken as zero or is exactly known.",
      table: {
        columns: ["Reference electrode", "Type", "How its potential is known"],
        rows: [
          {
            cells: ["Standard hydrogen electrode (SHE)", "Primary", "Its potential is arbitrarily taken as exactly zero"],
            pyqExampleId: "3501ae47-9abb-411e-bd5c-e07389bdedfc",
            noteAmber: "Board 2023 asked what a reference electrode is: give the definition and name the primary and secondary ones.",
          },
          {
            cells: ["Calomel electrode", "Secondary", "Its potential is found by measuring it against SHE"],
            pyqExampleId: "c6287652-2c63-49ad-91bf-8ec2539fdc15",
            noteAmber: "Board 2014 asked for a labelled diagram of the calomel electrode. The present textbook only names it, so give it less time.",
          },
          { cells: ["Silver and silver chloride electrode", "Secondary", "Its potential is found by measuring it against SHE"] },
          { cells: ["Glass electrode", "Secondary", "Its potential is found by measuring it against SHE"] },
        ],
      },
      practiceSet: [
        { prompt: "Why can the potential of a single electrode not be measured?", answer: "Oxidation cannot occur without reduction, so only the potential of a complete cell of two electrodes can be measured" },
        { prompt: "Name two secondary reference electrodes.", answer: "Calomel electrode and silver and silver chloride electrode (also the glass electrode)" },
        { prompt: "What is the potential of the standard hydrogen electrode?", answer: "Zero, taken arbitrarily" },
      ],
      pyqExampleId: "3501ae47-9abb-411e-bd5c-e07389bdedfc",
      traps: [
        {
          title: "Calling SHE a secondary electrode",
          body: "SHE is the primary reference electrode. Calomel, silver and silver chloride, and glass electrodes are secondary: their potentials are measured against SHE.",
        },
        {
          title: "Saying the SHE potential was measured",
          body: "Its zero is chosen, not measured. Write 'arbitrarily taken as zero'.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccec-she",
      name: "The standard hydrogen electrode and its use",
      intuition:
        "The standard hydrogen electrode is a platinum plate bathed in hydrogen gas and 1 M acid. Platinum does not react; it only gives the hydrogen a surface to gain or lose electrons on. Join it to any electrode and the cell's voltage is that electrode's potential, with a sign set by which side gets reduced.",
      definition:
        "- **Construction:** a platinum plate coated with platinum black, joined to the external circuit through a sealed narrow glass tube containing mercury. It is surrounded by an outer jacket, dips in 1 M H⁺ solution, and hydrogen gas at 1 atm is bubbled through the side tube of the jacket to keep the solution saturated with H₂.\n" +
        "- Platinum is inert; platinum black adsorbs large amounts of H₂ and allows the change between the gas and the ions.\n" +
        "- **Formulation:** \\(\\text{Pt} \\mid \\text{H}_2(g, 1\\ \\text{atm}) \\mid \\text{H}^+(1\\ \\text{M})\\); as an anode it is written \\(\\text{Pt} \\mid \\text{H}_2(g, 1\\ \\text{atm}) \\mid \\text{H}^+(1\\ \\text{M}) \\parallel\\), and as a cathode \\(\\parallel \\text{H}^+(1\\ \\text{M}) \\mid \\text{H}_2(g, 1\\ \\text{atm}) \\mid \\text{Pt}\\).\n" +
        "- **Electrode reaction:** \\(2\\text{H}^+(1\\ \\text{M}) + 2e^- \\to \\text{H}_2(g, 1\\ \\text{atm})\\), with \\(E^0 = 0\\) V.\n" +
        "- **Use:** combine SHE with the electrode under test at 1 M; since \\(E^0_{\\text{SHE}} = 0\\), the measured \\(E^0_{\\text{cell}}\\) gives \\(E^0\\) of that electrode.\n" +
        "- **Difficulties:** pure and dry hydrogen is hard to get; the H₂ pressure cannot be kept exactly at 1 atm; the H⁺ concentration cannot be kept exactly at 1 M, as water evaporates with the bubbling gas.",
      formula: {
        label: "Standard potential using SHE",
        latex: "E^0_{\\text{cell}} = E^0_{\\text{cathode}} - E^0_{\\text{anode}}, \\qquad E^0_{\\text{SHE}} = 0",
      },
      authoredExample: {
        prompt:
          "A copper electrode in 1 M Cu²⁺ is combined with SHE. Copper is the cathode and the measured emf is 0.337 V. Write the cell formula and the cell reaction, and find the standard potential of copper.",
        steps: [
          "SHE is the anode, so it is written on the left: \\(\\text{Pt} \\mid \\text{H}_2(g, 1\\ \\text{atm}) \\mid \\text{H}^+(1\\ \\text{M}) \\parallel \\text{Cu}^{2+}(1\\ \\text{M}) \\mid \\text{Cu}(s)\\).",
          "Cell reaction: \\(\\text{H}_2(g) + \\text{Cu}^{2+}(aq) \\to 2\\text{H}^+(aq) + \\text{Cu}(s)\\).",
          "Formula: \\(E^0_{\\text{cell}} = E^0_{\\text{Cu}} - E^0_{\\text{SHE}}\\).",
          "Substitution: \\(0.337 = E^0_{\\text{Cu}} - 0\\), so \\(E^0_{\\text{Cu}} = +0.337\\) V.",
        ],
        answer: "E⁰ of copper = +0.337 V",
      },
      selfCheckExample: {
        prompt: "A nickel electrode in 1 M Ni²⁺ joined to SHE acts as the anode, and the cell emf is 0.257 V. What is the standard potential of nickel?",
        steps: ["SHE is the cathode: \\(0.257 = 0 - E^0_{\\text{Ni}}\\).", "\\(E^0_{\\text{Ni}} = -0.257\\) V."],
        answer: "−0.257 V",
      },
      practiceSet: [
        { prompt: "Why is the platinum in SHE coated with platinum black?", answer: "Platinum black adsorbs large quantities of hydrogen and lets the change between H₂ gas and H⁺ ions occur" },
        { prompt: "Write the electrode reaction of SHE.", answer: "\\(2\\text{H}^+(aq) + 2e^- \\to \\text{H}_2(g)\\)" },
        { prompt: "Give one difficulty in setting up SHE.", answer: "The H₂ pressure cannot be kept exactly at 1 atm (or: pure dry H₂ is hard to get; the H⁺ concentration drifts from 1 M)" },
      ],
      pyqExampleId: "dc00caae-0c7f-454a-8ea1-cbd56281eea3",
      traps: [
        {
          title: "No labels on the diagram",
          body: "A diagram question earns its marks for labels: platinum plate with platinum black, 1 M H⁺, the H₂ inlet at 1 atm, the jacket, and the wire through mercury to the terminal.",
        },
        {
          title: "Sign of the potential",
          body: "When the test electrode is the anode against SHE, its standard potential is the cell emf with a minus sign; when it is the cathode, it is the emf itself.",
        },
      ],
    },
  ],
};
