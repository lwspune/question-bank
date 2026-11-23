import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_SS_CONDUCTION_NOTE: SubtopicNote = {
  subtopicName: "Electrical Properties of Solids",
  title: "Band Theory, Conductors, Insulators and Semiconductors",
  oneLineDefinition:
    "Conductors, insulators and semiconductors by conductivity and by band theory (valence band, conduction band, band gap), how temperature changes conduction, and n-type and p-type semiconductors made by doping.",
  whyItMatters:
    "8 questions, one of them from a board paper: 2014 asked how many valence electrons the impurity for an n-type silicon semiconductor must have. The textbook asks you to define the bands, classify band pictures, explain why a semiconductor conducts better when hot and explain n-type doping with a diagram.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccss-bands",
      name: "Band theory: metals, insulators and semiconductors",
      intuition:
        "In a solid the energy levels of the atoms merge into bands. Electrons conduct only if they can reach a band where they are free to move. In a metal they are already there; in an insulator a wide gap keeps them out; in a semiconductor the gap is narrow, so heat lifts a few electrons across, and more as it gets hotter.",
      definition:
        "- **Conduction band:** the highest energy band containing electrons, formed from the outermost levels of the atoms; partially occupied or vacant. Its electrons are mobile and conduct when a potential is applied.\n" +
        "- **Valence band:** the band of lower energy than the conduction band. Its electrons are tightly bound to their nuclei and not free to move.\n" +
        "- **Band gap:** the energy difference between the two bands. A gap too large for thermal energy to cross is called the **forbidden zone**.\n" +
        "- In a semiconductor, more electrons cross the small gap as the temperature rises, so its conductivity increases. In a metal the cations vibrate more as it gets hotter and interrupt the electrons, so its conductivity decreases.\n" +
        "- A pure semiconductor with a very low but finite conductivity is an **intrinsic semiconductor**.",
      table: {
        columns: ["Point", "Metal (conductor)", "Semiconductor", "Insulator"],
        rows: [
          { cells: ["Conductivity (Ω⁻¹ m⁻¹)", "10⁴ to 10⁷", "10⁻⁶ to 10⁴", "10⁻²⁰ to 10⁻¹⁰"] },
          { cells: ["Bands", "Conduction band partly filled (Na) or overlapping an empty band (Mg)", "Valence band full, conduction band empty", "Valence band full, conduction band empty"] },
          { cells: ["Band gap", "None", "Small", "Large (forbidden zone)"] },
          {
            cells: ["Rising temperature", "Conductivity decreases", "Conductivity increases", "Thermal energy still cannot lift electrons across the gap"],
            pyqExampleId: "90d516aa-7d4c-4452-93b9-5d37a39d3efd",
            noteAmber: "The textbook exercise asks how and why a semiconductor's conductivity changes with temperature.",
          },
          { cells: ["Examples (band gap)", "Sodium (0 eV), magnesium", "Silicon (1.12 eV), germanium (0.67 eV)", "Diamond (5.47 eV)"] },
        ],
      },
      practiceSet: [
        { prompt: "What is the forbidden zone?", answer: "A band gap too large for thermal energy to promote electrons across" },
        { prompt: "Which band's electrons conduct electricity?", answer: "The conduction band's" },
        { prompt: "Why does the conductivity of a metal fall when it is heated?", answer: "The metal cations vibrate more and interrupt the flow of electrons" },
      ],
      traps: [
        {
          title: "Saying all solids conduct better when hot",
          body: "A semiconductor conducts better when hot; a metal conducts WORSE. A 'distinguish' answer needs both directions.",
        },
        {
          title: "Band diagrams without labels",
          body: "When a question says 'with diagrams', draw the valence band, the conduction band and the gap for each solid, and label all three. An unlabelled sketch earns little.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccss-doping",
      name: "Doping: n-type and p-type semiconductors",
      intuition:
        "Silicon has four valence electrons and uses all four to bond to its four neighbours. Swap in an atom with five, and one electron is left over to roam: that is n-type. Swap in an atom with three, and one bond is an electron short, leaving a hole that behaves like a positive charge: that is p-type.",
      definition:
        "- **Doping:** adding a minute quantity of an impurity (the **dopant**) to a semiconductor to increase its conductivity. A doped semiconductor is an **extrinsic semiconductor**.\n" +
        "- **n-type:** a group 14 semiconductor (Si, Ge) doped with a group 15 element (P, As, Sb, Bi). Four of the five valence electrons of P bond to the four Si neighbours; the extra electron goes into the conduction band, so the conductivity rises.\n" +
        "- **p-type:** Si or Ge doped with a group 13 element (B, Ga, In). B forms bonds with only three Si atoms; the missing fourth electron leaves a **hole**, which accepts electrons and behaves as a positive charge.\n" +
        "- Intrinsic or extrinsic, the material is electrically neutral.",
      table: {
        columns: ["Point", "n-type", "p-type"],
        rows: [
          {
            cells: ["Dopant added to Si or Ge", "Group 15: P, As, Sb, Bi (five valence electrons)", "Group 13: B, Ga, In (three valence electrons)"],
            pyqExampleId: "d35371a7-3615-4872-85da-68a8c5f174e1",
            noteAmber: "Board 2014 asked how many valence electrons the impurity for an n-type semiconductor must have.",
          },
          { cells: ["What the dopant atom does", "Uses four electrons in bonds; one electron is left over", "Bonds to three Si atoms only; one electron short"] },
          { cells: ["Charge carriers", "Extra electrons in the conduction band (negative)", "Holes in the valence band (behave as positive)"] },
          { cells: ["Example", "Si doped with P", "Si doped with B"] },
        ],
      },
      practiceSet: [
        { prompt: "Germanium is doped with gallium. Which type of semiconductor is formed?", answer: "p-type" },
        { prompt: "Is an n-type semiconductor negatively charged?", answer: "No. It is electrically neutral; 'n' names the charge carriers" },
        { prompt: "What is a hole in a p-type semiconductor?", answer: "An electron vacancy left where a bond lacks its fourth electron; it behaves as a positive charge" },
      ],
      traps: [
        {
          title: "Reading 'n' as a negative charge on the crystal",
          body: "The 'n' says the carriers are negative electrons. Each P atom brings its own extra proton as well, so the crystal stays neutral.",
        },
        {
          title: "Matching the group to the wrong type",
          body: "Group 15 (one electron extra) gives n-type; group 13 (one electron short) gives p-type. Count the valence electrons against silicon's four.",
        },
      ],
    },
  ],
};
