import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_MM_MATERIALS_NOTE: SubtopicNote = {
  subtopicName: "Magnetic Properties of Materials",
  title: "Magnetic Properties of Materials",
  oneLineDefinition:
    "Diamagnetic, paramagnetic and ferromagnetic materials: their susceptibility and permeability, the examples NCERT names, how each behaves in a magnetic field, and how domains explain ferromagnetism.",
  whyItMatters:
    "24 questions, every one from a board paper: eight in 2023, five in 2024, six in 2025 and five in 2026. Almost all are one-mark items: pick the material with a negative or small positive susceptibility, a permeability below that of free space or a relative permeability far above one; say how a diamagnetic piece behaves near either pole of a magnet or in a uniform field; and judge assertion-reason pairs on field lines in copper, atomic moments and heating a ferromagnet. The one long answer (2024) asks what ferromagnetic materials are and how domains explain them, with diagrams.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbpmm-classes",
      name: "The three classes by susceptibility and permeability",
      intuition:
        "Every material answers a magnetic field in one of three ways, and the sign and size of its susceptibility tell you which. Negative: it magnetises against the field. Small and positive: it magnetises a little along the field. Large: it magnetises strongly along the field. The board's one-mark questions mostly ask you to place a named substance in the right class.",
      definition:
        "- **Diamagnetic:** \\(-1 \\le \\chi < 0\\), \\(0 \\le \\mu_r < 1\\), \\(\\mu < \\mu_0\\).\n" +
        "- **Paramagnetic:** \\(0 < \\chi < \\varepsilon\\) (\\(\\varepsilon\\) a small positive number), \\(1 < \\mu_r < 1 + \\varepsilon\\), \\(\\mu > \\mu_0\\).\n" +
        "- **Ferromagnetic:** \\(\\chi \\gg 1\\), \\(\\mu_r \\gg 1\\) (more than 1000), \\(\\mu \\gg \\mu_0\\).\n" +
        "- A diamagnetic atom has **no net magnetic moment**: the moments of its electrons cancel. Paramagnetic and ferromagnetic atoms carry a **permanent** moment of their own.\n" +
        "- Learn NCERT's examples by name, and watch the compounds: copper is diamagnetic but copper chloride is paramagnetic; sodium is paramagnetic but sodium chloride is diamagnetic.",
      table: {
        columns: ["Point", "Diamagnetic", "Paramagnetic", "Ferromagnetic"],
        rows: [
          {
            cells: ["Susceptibility χ", "Small and negative", "Small and positive", "Large and positive"],
            noteAmber: "Board 2026 asked which material has χ in the range from −1 up to 0: copper.",
          },
          {
            cells: ["Relative permeability μᵣ", "Slightly less than 1 (between 0 and 1)", "Slightly more than 1", "Very large, more than 1000"],
            pyqExampleId: "964a4bad-15b5-404b-896f-e101c9d757a1",
          },
          {
            cells: ["Permeability μ", "Less than μ₀", "More than μ₀", "Much more than μ₀"],
            noteAmber: "Board 2023 and 2025 asked which substance has a permeability less than that of free space: copper.",
          },
          { cells: ["Atom's own magnetic moment", "Zero", "Permanent, pointing at random", "Permanent, lined up within domains"] },
          {
            cells: ["Examples in NCERT", "Bismuth, copper, lead, silicon, nitrogen (at STP), water, sodium chloride", "Aluminium, sodium, calcium, oxygen (at STP), copper chloride", "Iron, cobalt, nickel, gadolinium; the alloy alnico"],
            pyqExampleId: "65223e4b-7289-4acf-9c66-ced8c8f3bc54",
          },
        ],
      },
      practiceSet: [
        { prompt: "Is copper chloride paramagnetic or diamagnetic?", answer: "Paramagnetic" },
        { prompt: "Is sodium chloride paramagnetic or diamagnetic?", answer: "Diamagnetic" },
        { prompt: "Name two paramagnetic substances from NCERT's list.", answer: "Any two of aluminium, sodium, calcium, oxygen (at STP), copper chloride" },
        { prompt: "What is the relative permeability of a superconductor?", answer: "Zero (it is a perfect diamagnet, \\(\\chi = -1\\))" },
      ],
      pyqExampleId: "93d1ec60-8b41-4d1a-9367-359cd2a6ef63",
      traps: [
        {
          title: "Copper and copper chloride",
          body: "Copper is diamagnetic, copper chloride paramagnetic. Sodium is paramagnetic, sodium chloride diamagnetic. Options pair these on purpose, so read the name to the end.",
        },
        {
          title: "Saying every atom has a magnetic moment",
          body: "A diamagnetic atom has zero net moment; its moment in a field is induced. Only paramagnetic and ferromagnetic atoms carry a moment of their own.",
        },
        {
          title: "Reading μᵣ between 0 and 1 as paramagnetic",
          body: "A relative permeability less than 1 means a negative susceptibility, so the material is diamagnetic. Paramagnetic μᵣ is slightly MORE than 1.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpmm-behaviour",
      name: "How each class behaves in a magnetic field",
      intuition:
        "A diamagnetic material magnetises against the field, so a magnet pushes it away, whichever pole you bring near. Paramagnetic and ferromagnetic materials magnetise along the field, so a magnet pulls them in, weakly or strongly. All of this needs a field that changes from place to place: in a uniform field the pushes on the two ends of a piece cancel.",
      definition:
        "- **Why diamagnetism happens:** orbiting electrons act like current loops. In a field, those whose moment is along the field slow down and those opposite speed up (Lenz's law), so the atom gets a net moment **opposite** to the field, and is repelled.\n" +
        "- Diamagnetism is present in **all** substances, but it is so weak that paramagnetism or ferromagnetism hides it.\n" +
        "- **Superconductors** are perfect diamagnets: \\(\\chi = -1\\), \\(\\mu_r = 0\\), the field lines are completely expelled (the **Meissner effect**). They are used to levitate fast trains.\n" +
        "- **Paramagnetism:** the atoms' moments point at random because of thermal motion. A strong field and a low temperature line them up along the field, until all are aligned (saturation). χ and μᵣ depend on the temperature.\n" +
        "- **Assertion-reason**, marked as: (A) both true and R explains A; (B) both true but R does not explain A; (C) A true, R false; (D) both false. Judge each statement alone first, then ask whether R is the cause of A.",
      table: {
        columns: ["Point", "Diamagnetic", "Paramagnetic", "Ferromagnetic"],
        rows: [
          {
            cells: ["Field lines through a bar of it", "Pushed out; field inside slightly weaker", "Drawn in a little; field inside slightly stronger", "Drawn in strongly; highly concentrated"],
            pyqExampleId: "ac5309ef-86ef-4c50-abdf-e7bc48be4136",
          },
          { cells: ["In a non-uniform field it moves", "From strong field to weak field", "From weak field to strong field", "Strongly towards the strong field"] },
          { cells: ["Near a pole of a magnet", "Weakly repelled", "Weakly attracted", "Strongly attracted"] },
          {
            cells: ["Free piece in a uniform field", "No net force, so it does not move", "No net force, so it does not move", "No net force, so it does not move"],
            pyqExampleId: "e781a3e4-dd3b-4606-adb6-e0182ddf5add",
          },
          { cells: ["Cause", "Moment induced opposite to the field", "Permanent moments partly lined up with the field", "Domains turn and grow along the field"] },
        ],
      },
      practiceSet: [
        { prompt: "A paramagnetic rod is placed in a non-uniform magnetic field. Which way does it tend to move?", answer: "From the weak field towards the strong field" },
        { prompt: "What is the complete expulsion of field lines from a superconductor called?", answer: "The Meissner effect" },
        { prompt: "Is diamagnetism found in all substances?", answer: "Yes, but it is so weak that paramagnetism or ferromagnetism usually hides it" },
        { prompt: "How do the field lines behave when a bar of bismuth is placed in a magnetic field?", answer: "They are pushed out of the bar, and the field inside it is reduced" },
      ],
      pyqExampleId: "da1784a1-81d3-40cc-803b-c5d896545bf4",
      traps: [
        {
          title: "Both true is not the same as R explains A",
          body: "'Diamagnetic materials show magnetism' and 'they have no permanent moment' are both true, but the magnetism comes from an INDUCED moment, so R does not explain A. Ask what causes A before choosing (A).",
        },
        {
          title: "Forgetting that a uniform field gives no net force",
          body: "Repelled or attracted describes a piece in a non-uniform field. In a uniform field the forces on its two ends cancel, whatever the material.",
        },
        {
          title: "Concentrating the lines in copper",
          body: "Copper is diamagnetic, so the lines are pushed OUT of a copper bar. Lines crowd into paramagnetic and ferromagnetic materials only.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpmm-ferro",
      name: "Ferromagnetism and magnetic domains",
      intuition:
        "In iron the atomic moments do something paramagnetic atoms never do: neighbours line up with each other by themselves, in patches called domains. An unmagnetised nail is full of domains pointing in all directions, so they cancel. A field turns them and lets the well-aligned ones grow, and the nail becomes a strong magnet.",
      definition:
        "- **Ferromagnetic materials** get **strongly** magnetised in an external field and are strongly attracted by a magnet: iron, cobalt, nickel, gadolinium. Their μᵣ is more than 1000.\n" +
        "- **Domain:** a region in which the atomic moments line up in one direction by themselves. A domain is about 1 mm across and holds about \\(10^{11}\\) atoms, and each has a net magnetisation.\n" +
        "- **No field:** the domains point at random, so there is no bulk magnetisation. Diagram: a block split into patches with arrows in different directions.\n" +
        "- **In a field \\(B_0\\):** the domains turn towards \\(B_0\\), and those already along \\(B_0\\) grow. They can join into a single giant domain. Diagram: the same block with all arrows along \\(B_0\\).\n" +
        "- **Hard ferromagnets** keep their magnetisation when the field is removed (alnico, lodestone): used for permanent magnets and compass needles. **Soft ferromagnets** lose it (soft iron).\n" +
        "- **Temperature:** at a high enough temperature the domain structure breaks up and a ferromagnet becomes paramagnetic. This loss of magnetisation is **gradual**.",
      table: {
        columns: ["Point", "Fact"],
        rows: [
          {
            cells: ["Domain", "A region of about 1 mm holding about 10¹¹ atoms whose moments all point one way"],
            noteAmber: "Board 2024 asked: what are ferromagnetic materials? Explain ferromagnetism with diagrams, using magnetic domains.",
          },
          { cells: ["With no external field", "Domains point at random, so the bulk magnetisation is zero"] },
          { cells: ["In an external field", "Domains turn along the field and those along it grow, giving a large magnetisation"] },
          { cells: ["Field removed: hard ferromagnet", "Magnetisation stays (alnico, lodestone); used for permanent magnets"] },
          { cells: ["Field removed: soft ferromagnet", "Magnetisation disappears (soft iron)"] },
          { cells: ["Heated strongly", "Domains break up; it becomes paramagnetic, and the magnetisation fades gradually"] },
        ],
      },
      practiceSet: [
        { prompt: "Name a hard ferromagnetic material.", answer: "Alnico (or lodestone)" },
        { prompt: "Name a soft ferromagnetic material.", answer: "Soft iron" },
        { prompt: "About how many atoms does a domain hold?", answer: "About \\(10^{11}\\)" },
        { prompt: "Should a compass needle be made of a hard or a soft ferromagnet?", answer: "Hard, so that it keeps its magnetisation" },
      ],
      pyqExampleId: "f11021aa-78ad-483c-af8f-e54b5a4ccdd7",
      traps: [
        {
          title: "Defining a ferromagnet as one that stays magnetised",
          body: "All ferromagnets are strongly magnetised in a field, but only HARD ones keep it when the field is removed. Soft iron loses it.",
        },
        {
          title: "No diagrams in the domain answer",
          body: "When the board asks for diagrams, the marks are for two labelled sketches: domains pointing at random with no field, and domains lined up along \\(B_0\\).",
        },
        {
          title: "Calling the loss of magnetisation sudden",
          body: "As a ferromagnet is heated, its magnetisation fades gradually as the domains break up. It does not vanish all at once.",
        },
      ],
    },
  ],
};
