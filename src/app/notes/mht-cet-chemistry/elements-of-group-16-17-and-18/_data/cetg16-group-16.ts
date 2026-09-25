import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/elements-of-group-16-17-and-18";

export const GROUP_16_NOTE: SubtopicNote = {
  subtopicName: "Group 16 Chalcogens, Oxygen, Sulphur and Ozone",
  title: "Group 16: Chalcogen Trends, Hydrides, Oxygen, Ozone and Sulphur",
  oneLineDefinition:
    "The chalcogens O, S, Se, Te and Po (ns² np⁴) grow larger, denser, less reactive and easier to ionise down the group; their hydrides H₂E become less stable but more acidic; oxygen forms O₂ and the less stable, strongly oxidising O₃; and sulphur has the most allotropes and gives SO₂, sulphuric acid and oleum.",
  whyItMatters:
    "25 PYQs, none HARD. Eight are family and trends — which group is the chalcogens, which element does not belong (astatine, twice), ionisation enthalpy, density, reactivity and atomic size; six are hydrides and oxygen against sulphur — thermal stability, acidity, hybridisation, the colourless odourless hydride; four are oxygen and ozone — O₂ against O₃, the O–O bond length, ozone's properties and what depletes the layer; seven are sulphur — allotropes, the S–S–S angle, SO₂ manufacture, oleum, disulphuric acid, baryte and galena. " +
    "Four cards.",
  concepts: [
    // 1 — family and trends
    {
      kind: "formula" as const,
      slug: "cetg16-chalcogen-trends",
      name: "The Chalcogen Family and Its Trends",
      intuition:
        "Group 16 is O, S, Se, Te and the radioactive Po, all ns² np⁴ with two unpaired p electrons. Going down, each atom adds a shell: atoms get LARGER, ionisation enthalpy and electronegativity FALL, density RISES and metallic character increases (O and S non-metals, Se and Te metalloids, Po a metal). Reactivity falls down the group, so oxygen is the most reactive. Across a period size shrinks, so Se (period 4, group 16) is bigger than Br beside it and bigger than S and Cl above.",
      definition:
        "- **Chalcogens** = **Group 16**: O, S, Se, Te, Po. **Astatine** is Group 17, NOT a chalcogen.\n" +
        "- **Ionisation enthalpy** decreases down: O > **S > Se > Te > Po**; the lowest of {Po, Te, Br, Kr} is **Po**.\n" +
        "- **Atomic size** increases down and decreases across: largest of {S, Se, Cl, Br} is **Se**.\n" +
        "- **Density** increases down: highest of {O, S, Se, Te} is **Te**.\n" +
        "- **Reactivity**: **O > S > Se > Te > Po**.",
      formula: {
        label: "Down group 16",
        latex: "\\text{size}\\uparrow,\\ \\text{density}\\uparrow,\\ \\text{IE}\\downarrow,\\ \\text{reactivity}\\downarrow:\\quad \\text{S} > \\text{Se} > \\text{Te} > \\text{Po}\\ (\\text{IE})",
      },
      authoredExample: {
        prompt: "Arrange S, Te and Se in increasing atomic size and in decreasing first ionisation enthalpy.",
        steps: [
          "Size grows down the group: S < Se < Te.",
          "Ionisation enthalpy falls down the group: S > Se > Te.",
        ],
        answer: "S < Se < Te; S > Se > Te",
      },
      selfCheckExample: {
        prompt: "Which element does NOT belong to the chalcogen family: At, Po, Se, Te?",
        steps: [
          "Astatine is the halogen below iodine.",
        ],
        answer: "At",
      },
      practiceSet: [
        { prompt: "Which group are the chalcogens?", answer: "Group 16" },
        { prompt: "Decreasing ionisation enthalpy: S, Se, Te, Po?", answer: "S > Se > Te > Po" },
        { prompt: "Highest density: O, S, Se, Te?", answer: "Te" },
        { prompt: "Lowest first ionisation enthalpy: Po, Te, Br, Kr?", answer: "Po" },
      ],
      pyqExampleId: "d05f2eda-6ae3-4ed9-9681-4bde105e16c6",
      traps: [
        {
          title: "Putting astatine in group 16",
          body:
            "Astatine sits next to polonium in period 6 but in group 17 — it is a halogen. The chalcogen list ends at Po.",
        },
      ],
    },

    // 2 — hydrides and O vs S
    {
      kind: "formula" as const,
      slug: "cetg16-hydrides",
      name: "Hydrides H₂E and Oxygen Against Sulphur",
      intuition:
        "All the hydrides H₂E have the central atom sp³ hybridised with two lone pairs, so they are bent. As E gets bigger the E–H bond gets longer and weaker. A weaker bond means LOWER thermal stability (H₂O most stable, H₂Te least) and HIGHER acidity (H₂Te gives up H⁺ most easily). Water stands apart: a colourless, odourless liquid, while H₂S, H₂Se and H₂Te are foul-smelling gases. Oxygen also differs from sulphur in oxidation states: with no d orbitals it cannot expand its octet, so it shows −2 (and −1, +2 in OF₂) but never +4 or +6, which sulphur does.",
      definition:
        "- **Hybridisation** of E in \\(\\text{H}_2\\text{E}\\): **\\(sp^3\\)**; bond angle falls H₂O 104.5° → H₂S 92° → H₂Se 91° → H₂Te 90°.\n" +
        "- **Thermal stability**: \\(\\text{H}_2\\text{O} > \\text{H}_2\\text{S} > \\text{H}_2\\text{Se} > \\text{H}_2\\text{Te}\\); lowest **H₂Te**.\n" +
        "- **Acidity**: \\(\\text{H}_2\\text{O} < \\text{H}_2\\text{S} < \\text{H}_2\\text{Se} < \\text{H}_2\\text{Te}\\); most acidic **H₂Te**.\n" +
        "- Colourless, odourless hydride: **oxygen's** (H₂O); NH₃, H₂S, H₂Se all smell.\n" +
        "- **O vs S**: both have two unpaired electrons; O is a gas and S a solid; H₂O is more stable than H₂S; S shows −2, +2, +4, +6 but O does **not** show +4 or +6.",
      formula: {
        label: "Group 16 hydrides",
        latex: "\\text{stability: } \\text{H}_2\\text{O} > \\text{H}_2\\text{S} > \\text{H}_2\\text{Se} > \\text{H}_2\\text{Te};\\quad \\text{acidity: reverse}",
      },
      authoredExample: {
        prompt: "Which of H₂S and H₂Se is the stronger acid, and which is more thermally stable?",
        steps: [
          "The Se–H bond is longer and weaker, so H₂Se ionises more easily and decomposes more easily.",
        ],
        answer: "H₂Se is the stronger acid; H₂S is more stable",
      },
      selfCheckExample: {
        prompt: "Which hydride has the lowest thermal stability: H₂O, H₂Te, H₂Se, H₂S?",
        steps: [
          "The weakest E–H bond is Te–H.",
        ],
        answer: "H₂Te",
      },
      practiceSet: [
        { prompt: "Correct order of thermal stability of group 16 hydrides?", answer: "H₂Te < H₂Se < H₂S < H₂O" },
        { prompt: "Highest acidic nature: H₂O, H₂S, H₂Se, H₂Te?", answer: "H₂Te" },
        { prompt: "Hybridisation of the central atom in group 16 hydrides?", answer: "sp³" },
        { prompt: "False about O and S: both show −2, +4 and +6?", answer: "False — oxygen does not show +4 or +6" },
      ],
      pyqExampleId: "1677f600-6b67-4ec9-a5e6-2d8402f6b458",
      traps: [
        {
          title: "Expecting stability and acidity to run the same way",
          body:
            "They run opposite. The weak Te–H bond makes H₂Te the least stable AND the most acidic hydride.",
        },
      ],
    },

    // 3 — oxygen and ozone
    {
      kind: "formula" as const,
      slug: "cetg16-oxygen-and-ozone",
      name: "Dioxygen and Ozone",
      intuition:
        "Making ozone from oxygen, 3O₂ → 2O₃, is uphill: it absorbs heat (ΔH positive) and turns three molecules into two (ΔS negative), so ozone is the LESS stable form and readily gives up an O atom — a strong oxidising and bleaching agent. O₂ has two unpaired electrons and is paramagnetic; O₃ is bent, diamagnetic, with two equal O–O bonds of 128 pm, between a single and a double bond because of resonance. In the stratosphere it absorbs harmful UV; nitric oxide and CFCs destroy it.",
      definition:
        "- \\(3\\text{O}_2 \\to 2\\text{O}_3\\): **ΔH positive** (endothermic), **ΔS negative**; O₃ is **less** stable than O₂.\n" +
        "- **O₂** paramagnetic; **O₃** diamagnetic, **angular** (about 117°), O–O **128 pm** (single 148 pm, double 121 pm).\n" +
        "- Ozone is a **strong oxidising** agent (NOT reducing), a bleaching agent, and absorbs UV.\n" +
        "- **Ozone depletion**: NO (\\(\\text{NO} + \\text{O}_3 \\to \\text{NO}_2 + \\text{O}_2\\)) and CFCs; He, CO₂ and H₂ do not.",
      formula: {
        label: "Formation of ozone",
        latex: "3\\text{O}_2 \\rightarrow 2\\text{O}_3;\\quad \\Delta H > 0,\\ \\Delta S < 0",
      },
      authoredExample: {
        prompt: "Explain why ozone is a stronger oxidising agent than oxygen.",
        steps: [
          "O₃ lies above O₂ in enthalpy, so O₃ → O₂ + [O] is downhill and releases a reactive oxygen atom.",
        ],
        answer: "O₃ decomposes exothermically to O₂ + [O]",
      },
      selfCheckExample: {
        prompt: "Which is correct: O₂ and O₃ are both paramagnetic; ΔH for forming O₃ from O₂ is positive; ΔS is positive; O₃ is more stable?",
        steps: [
          "Only the enthalpy statement is right.",
        ],
        answer: "ΔH for forming O₃ from O₂ is positive",
      },
      practiceSet: [
        { prompt: "O–O bond length in ozone?", answer: "128 pm" },
        { prompt: "NOT correct about ozone: strong reducing agent, angular, bleaching agent, absorbs UV?", answer: "Strong reducing agent" },
        { prompt: "Gas that depletes the ozone layer: He, NO, CO₂, H₂?", answer: "NO" },
      ],
      pyqExampleId: "c6ed5580-eb9d-44c4-a21b-aa6d5c55973f",
      traps: [
        {
          title: "Calling ozone paramagnetic like oxygen",
          body:
            "O₂ has two unpaired electrons; O₃ has none. Only O₂ is paramagnetic.",
        },
      ],
    },

    // 4 — sulphur and its compounds
    {
      kind: "reference" as const,
      slug: "cetg16-sulphur-and-compounds",
      name: "Sulphur: Allotropes, SO₂, Oleum and Ores",
      intuition:
        "Sulphur has more allotropes than any other group 16 element — rhombic, monoclinic, plastic and more — and both crystalline forms are built from puckered S₈ crowns with an S–S–S angle of 107°. Industrially SO₂ comes from roasting sulphide ores (zinc blende, iron pyrites); in the lab from a sulphite and dilute acid. SO₂ → SO₃ in the contact process, and SO₃ absorbed in sulphuric acid gives oleum, H₂S₂O₇. Several ores are sulphides or sulphates: galena PbS, baryte BaSO₄.",
      definition:
        "- **Allotropes**: sulphur has the **most** (rhombic α, monoclinic β, plastic…); S₈ is a puckered crown, **∠S–S–S = 107°**.\n" +
        "- **SO₂ in industry**: by **roasting zinc sulphide and iron pyrites** (4FeS₂ + 11O₂ → 2Fe₂O₃ + 8SO₂); in the lab from \\(\\text{Na}_2\\text{SO}_3\\) + dilute acid.\n" +
        "- **Oleum** (fuming sulphuric acid, pyrosulphuric/disulphuric acid) = **H₂S₂O₇**, made as H₂SO₄ + SO₃ → H₂S₂O₇. By the usual structure each S has two S=O and two single S–O bonds; one paper keyed 'one double and two single' — the official letter is kept in the bank.\n" +
        "- **Ores**: galena **PbS**; baryte **BaSO₄** (Ba, S, O); zinc blende ZnS; iron pyrites FeS₂; gypsum CaSO₄·2H₂O.",
      table: {
        columns: ["Name", "Formula", "Remember"],
        rows: [
          { cells: ["Oleum", "H₂S₂O₇", "H₂SO₄ + SO₃"], noteAmber: "H₂S₂O₃ is thiosulphuric, H₂S₂O₈ peroxodisulphuric." },
          { cells: ["Galena", "PbS", "lead ore"] },
          { cells: ["Baryte", "BaSO₄", "Ba, S, O"] },
          { cells: ["Zinc blende", "ZnS", "roasted for SO₂"] },
          { cells: ["Iron pyrites", "FeS₂", "roasted for SO₂"] },
          { cells: ["Gypsum", "CaSO₄·2H₂O", "—"] },
        ],
        caption: "Sulphides and sulphates of sulphur's chapter.",
      },
      selfCheckExample: {
        prompt: "What is the molecular formula of oleum?",
        steps: [
          "SO₃ dissolved in H₂SO₄.",
        ],
        answer: "H₂S₂O₇",
      },
      practiceSet: [
        { prompt: "Group 16 element with the most allotropes?", answer: "S" },
        { prompt: "∠S–S–S in rhombic sulphur?", answer: "107°" },
        { prompt: "Industrial method for SO₂?", answer: "Roasting zinc sulphide and iron pyrites" },
        { prompt: "Formula of galena?", answer: "PbS" },
        { prompt: "Elements in baryte?", answer: "Ba, S, O" },
      ],
      pyqExampleId: "bfcaeeb5-f9c2-4c61-b5b9-8b4f1db874c2",
      traps: [
        {
          title: "Taking the S–S–S angle as 104.5° or 120°",
          body:
            "104.5° is water's H–O–H angle and 120° a flat ring. The S₈ crown is puckered at 107°.",
        },
      ],
    },
  ],
  related: [
    { label: "Group 17 — the halogens beside the chalcogens", href: `${BASE}/cetg16-group-17` },
  ],
};
