import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_DF_POSITION_NOTE: SubtopicNote = {
  subtopicName: "Position in the Periodic Table",
  title: "The d-Block and f-Block in the Periodic Table",
  oneLineDefinition:
    "Where the d-block and the f-block sit in the periodic table, the four transition series, the two inner transition series, and why zinc, cadmium and mercury are not called transition elements.",
  whyItMatters:
    "4 questions. Two were set in the 2026 board paper: an assertion-reason item on why zinc, cadmium and mercury are not transition elements, and an MCQ asking which of four metals is not a transition metal. The NCERT exercises add the characteristics of transition elements and how to pick out inner transition elements from their atomic numbers.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbcdf-dblock",
      name: "The d-block and the four transition series",
      intuition:
        "The d-block is the wide middle of the periodic table, groups 3 to 12, between the s-block and the p-block. In these elements the new electron goes into the d orbitals of the shell below the outermost one. That inner filling is what gives them their own family of properties.",
      definition:
        "- **d-block:** groups 3 to 12. The d orbitals of the penultimate shell, \\((n-1)d\\), receive electrons, giving four rows: the 3d, 4d, 5d and 6d series.\n" +
        "- **Transition metal (IUPAC):** a metal with an incomplete d subshell either in the neutral atom or in its ions.\n" +
        "- **Zinc, cadmium and mercury** (group 12) have \\((n-1)d^{10}ns^2\\). The d orbitals are completely filled in the ground state and in their common oxidation state (+2), so they are not regarded as transition metals. Being the end members of the 3d, 4d and 5d series, their chemistry is studied along with the transition metals.\n" +
        "- **Why \"transition\":** their chemical properties were seen as transitional between those of the s-block and the p-block.\n" +
        "- **Characteristic properties**, all from partly filled d orbitals: variable oxidation states, coloured ions, complex formation, catalytic activity, paramagnetism, interstitial compounds and alloys, hard metals with high melting points.",
      table: {
        columns: ["Series", "Orbitals being filled", "Elements"],
        rows: [
          { cells: ["First (3d)", "3d", "Sc (21) to Zn (30)"] },
          { cells: ["Second (4d)", "4d", "Y (39) to Cd (48)"] },
          { cells: ["Third (5d)", "5d", "La (57), then Hf (72) to Hg (80)"] },
          { cells: ["Fourth (6d)", "6d", "Ac (89), then Rf (104) to Cn (112)"] },
          {
            cells: ["Group 12 (Zn, Cd, Hg)", "d¹⁰ in the atom and in the +2 ion", "d-block members, but not transition metals"],
            noteAmber: "Board 2026 asked this as an assertion-reason item and again as an MCQ (which of Sc, Ag, Hg, Cu is not a transition metal).",
          },
        ],
        caption: "The gap in the third and fourth series is where the f-block (the lanthanoids after La and the actinoids after Ac) fits in.",
      },
      selfCheckExample: {
        prompt: "Name the orbitals filled in the third transition series, and say why the series jumps from lanthanum (57) to hafnium (72).",
        steps: [
          "The third series fills the 5d orbitals.",
          "After lanthanum the next fourteen electrons go into the 4f orbitals (the lanthanoids, Ce to Lu), so 5d filling resumes only at hafnium.",
        ],
        answer: "5d orbitals; the 4f orbitals of the lanthanoids are filled in between",
      },
      practiceSet: [
        { prompt: "Which groups of the periodic table make up the d-block?", answer: "Groups 3 to 12" },
        { prompt: "Why are zinc, cadmium and mercury studied with the transition metals although they are not transition metals?", answer: "They are the end members of the 3d, 4d and 5d series" },
        { prompt: "Give three properties of transition elements that come from their partly filled d orbitals.", answer: "Any three of: variable oxidation states, coloured ions, paramagnetism, complex formation, catalytic activity" },
      ],
      pyqExampleId: "cf82909d-a436-45a1-8e4e-75280d6dc439",
      traps: [
        {
          title: "Calling every d-block element a transition element",
          body: "Zinc, cadmium and mercury are in the d-block but are not transition elements: their d subshell is full (d¹⁰) in the atom AND in the +2 ion. Say both halves; \"full in the ground state\" alone loses the mark.",
        },
        {
          title: "Forgetting the ion half of the definition",
          body: "A metal is a transition metal if its d subshell is incomplete in the atom OR in an ion. Copper (3d¹⁰4s¹) and silver (4d¹⁰5s¹) qualify through Cu²⁺ (3d⁹) and Ag²⁺ (4d⁹).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcdf-fblock",
      name: "The f-block: lanthanoids and actinoids",
      intuition:
        "In the f-block the new electron goes deeper still, into the f orbitals two shells below the outermost one. These elements are pulled out into a separate panel at the bottom of the periodic table so the table does not become too wide.",
      definition:
        "- **f-block (inner transition elements):** the elements in which the 4f and 5f orbitals are progressively filled. They are placed in a separate panel at the bottom of the periodic table.\n" +
        "- **Lanthanoids:** the fourteen elements after lanthanum, Ce (58) to Lu (71), filling 4f.\n" +
        "- **Actinoids:** the fourteen elements after actinium, Th (90) to Lr (103), filling 5f.\n" +
        "- Lanthanum and actinium are usually discussed with their series because they closely resemble them.\n" +
        "- To decide whether an atomic number belongs to an inner transition element, check whether it falls from 58 to 71 or from 90 to 103.",
      formula: {
        label: "General electronic configuration of the f-block",
        latex: "(n-2)f^{1-14}\\,(n-1)d^{0-1}\\,ns^{2}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "the outermost shell: 6 for the lanthanoids, 7 for the actinoids" },
          { symbol: "\\((n-2)f\\)", meaning: "the f orbitals two shells inside, which are being filled" },
        ],
      },
      authoredExample: {
        prompt: "Which of the atomic numbers 47, 63, 80 and 90 belong to inner transition elements?",
        steps: [
          "Lanthanoids are 58 to 71; actinoids are 90 to 103.",
          "47 is silver, a 4d element: not inner transition.",
          "63 is europium, inside 58 to 71: a lanthanoid.",
          "80 is mercury, the end of the 5d series: not inner transition.",
          "90 is thorium, the first actinoid: inner transition.",
        ],
        answer: "63 (europium) and 90 (thorium)",
      },
      selfCheckExample: {
        prompt: "Hafnium has atomic number 72, just after the lanthanoids. Is it an inner transition element?",
        steps: [
          "The lanthanoids end at lutetium, 71, where the 4f orbitals are full (4f¹⁴).",
          "In hafnium the next electrons go into 5d, so it belongs to the third transition series.",
        ],
        answer: "No. Hafnium is a d-block (5d) element",
      },
      practiceSet: [
        { prompt: "Which orbitals are filled across the lanthanoids?", answer: "4f" },
        { prompt: "Name the first and the last actinoid.", answer: "Thorium (90) and lawrencium (103)" },
        { prompt: "Write the general electronic configuration of the f-block elements.", answer: "\\((n-2)f^{1-14}\\,(n-1)d^{0-1}\\,ns^{2}\\)" },
      ],
      pyqExampleId: "da3ddec9-3fc2-4b48-8436-94fce7231bfc",
      traps: [
        {
          title: "Counting lanthanum and actinium as members",
          body: "The lanthanoids are the fourteen elements AFTER lanthanum (Ce to Lu) and the actinoids the fourteen AFTER actinium (Th to Lr). La and Ac are discussed with them but head the d-series.",
        },
        {
          title: "Writing (n−1)f",
          body: "The f orbitals being filled are two shells inside, \\((n-2)f\\). For a lanthanoid that is 4f with 6s outermost.",
        },
      ],
    },
  ],
};
