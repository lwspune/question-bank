import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_AT_PERIODIC_NOTE: SubtopicNote = {
  subtopicName: "Electron Configuration and the Periodic Table",
  title: "Electron Configuration and the Periodic Table",
  oneLineDefinition:
    "How electrons fill shells and set valency, how the modern periodic table is built on atomic number, how size and metallic character change across it, and the element facts CDS repeats.",
  whyItMatters:
    "Twelve CDS questions, the largest page in the chapter, and five of them from 2025 and 2026. The newer questions mix four statements about the table in one item, so the trends are worth knowing as rules rather than as single facts.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdschat-configuration",
      name: "Electron configuration and valency",
      intuition:
        "Electrons fill shells from the inside out: 2 in the first, 8 in the second, 8 in the third for the first twenty elements. The outermost (valence) electrons are the ones an atom gains, loses or shares, so they decide its chemistry and its valency.",
      definition:
        "The rules for the first twenty elements:\n" +
        "- Shells fill in the order **K = 2, L = 8, M = 8**, then the fourth shell.\n" +
        "- The **valence electrons** (outermost shell) decide **chemical properties**. The nucleus decides mass and identity.\n" +
        "- **Valency** = number of valence electrons if it is 1–4; = **8 − valence electrons** if it is 4–8.\n" +
        "- **Transition (d-block) elements** fill the d subshell of the shell below the outermost one: general configuration **(n−1)d¹⁻¹⁰ ns⁰⁻²**.",
      formula: {
        label: "Valency from valence electrons",
        latex: "\\text{valency} = \\begin{cases} v & v \\le 4 \\\\ 8 - v & v \\ge 4 \\end{cases}",
        symbols: [{ symbol: "\\(v\\)", meaning: "number of electrons in the outermost shell" }],
      },
      authoredExample: {
        prompt: "An element has atomic number 16. Write its electron configuration, name it and give its valency.",
        steps: [
          "Fill the shells: 2, then 8, then the remaining 6. Configuration 2, 8, 6.",
          "Z = 16 is sulphur.",
          "6 valence electrons, so valency = 8 − 6 = 2.",
        ],
        answer: "2, 8, 6: sulphur, valency 2.",
      },
      selfCheckExample: {
        prompt: "An element has atomic number 13. Give its configuration and its valency.",
        steps: [
          "2, 8, then 3 electrons in the third shell.",
          "3 valence electrons, which is 4 or fewer, so valency = 3.",
        ],
        answer: "2, 8, 3 (aluminium); valency 3.",
      },
      pyqExampleId: "418d76cb-fd8b-404f-88c4-eba4d7c64dc4",
      practiceSet: [
        { prompt: "What is the electron configuration of chlorine (Z = 17)?", answer: "2, 8, 7" },
        { prompt: "What is the valency of magnesium (Z = 12)?", answer: "2" },
        { prompt: "Which particles decide the chemical properties of an element?", answer: "The valence (outermost) electrons" },
        { prompt: "Which subshell is being filled in a transition element?", answer: "The (n−1)d subshell" },
      ],
      traps: [
        {
          title: "Chemistry comes from electrons, not the nucleus",
          body: "Protons fix which element it is and neutrons add mass, but chemical properties come from the **valence electrons**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschat-periodic-table",
      name: "How the modern periodic table is built",
      intuition:
        "Mendeleev arranged elements by atomic mass. Moseley showed that atomic number is the more fundamental property, and the modern table is arranged by it. Every column is a group of elements with the same outer configuration.",
      definition:
        "The structure:\n" +
        "- **Moseley** (X-ray spectra) showed that **atomic number is more fundamental than atomic mass**. The modern periodic law is based on atomic number.\n" +
        "- **18 groups, 7 periods**; blocks **s, p, d, f** by the subshell being filled.\n" +
        "- **Alkali metals**: group 1 (Li, Na, K, Rb, **Cs**). **Transition metals**: d-block (Fe, Cu, **Os**, Pt).\n" +
        "- **Lanthanoids** (4f): Ce to Lu, including **Sm**. **Actinoids** (5f): Th to Lr, including U, **Np**, Pu.\n" +
        "- **94** elements occur naturally (some, such as neptunium and plutonium, only in traces); the rest are made artificially.\n" +
        "- Several symbols come from Latin names: **Au** (aurum, gold), **Ag** (argentum, silver), **Sn** (stannum, tin), **Pb** (plumbum, lead), **Na** (natrium), **K** (kalium), **Fe** (ferrum), **Cu** (cuprum), **Hg** (hydrargyrum).",
      table: {
        columns: ["Fact", "Answer"],
        rows: [
          {
            cells: ["Who showed atomic number is more fundamental than atomic mass", "Henry Moseley"],
            pyqExampleId: "2bf11526-9bab-45aa-a0f9-5760b2b9660a",
          },
          {
            cells: ["Sm, Cs, Os, Np", "Lanthanoid, alkali metal, transition metal, actinoid"],
            noteAmber: "CDS 2026 (I) match-the-list.",
            pyqExampleId: "031ee9f2-fcd7-4eb9-abb7-6aad9adf7de1",
          },
          {
            cells: ["Naturally occurring elements", "94"],
            pyqExampleId: "a1d56563-481c-4ed3-ae4b-2897335e2d4a",
          },
          {
            cells: ["Symbols of gold, tin, lead", "Au, Sn, Pb"],
            pyqExampleId: "4b540227-24e5-442d-9ed1-ce243991b1fb",
          },
        ],
      },
      pyqExampleId: "031ee9f2-fcd7-4eb9-abb7-6aad9adf7de1",
      selfCheckExample: {
        prompt: "Give the symbols for silver, iron and mercury, and say where the symbols come from.",
        steps: [
          "Silver: Ag, from argentum.",
          "Iron: Fe, from ferrum.",
          "Mercury: Hg, from hydrargyrum.",
        ],
        answer: "Ag, Fe, Hg — all from their Latin names.",
      },
      practiceSet: [
        { prompt: "Is the modern periodic table arranged by atomic mass or atomic number?", answer: "Atomic number" },
        { prompt: "Is samarium (Sm) a lanthanoid or an actinoid?", answer: "A lanthanoid" },
        { prompt: "What is the symbol for tin?", answer: "Sn" },
        { prompt: "About how many elements occur in nature?", answer: "94" },
      ],
      traps: [
        {
          title: "Sn is tin, Sb is antimony",
          body: "Tin is **Sn** (stannum). **Sb** is antimony, and **Ga** is gallium, not gold. Gold is **Au**.",
        },
        {
          title: "Lanthanoids fill 4f, actinoids 5f",
          body: "Samarium (Sm) is a **lanthanoid**; neptunium (Np) is an **actinoid**. Osmium (Os) is a d-block transition metal and caesium (Cs) an alkali metal. Match-the-list options swap the two f-series.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschat-trends",
      name: "Trends in atomic size and metallic character",
      intuition:
        "Going down a group adds a new shell, so atoms get bigger and lose electrons more easily: more metallic. Going across a period adds protons to the same shell, which pulls the electrons in: atoms get smaller and less metallic.",
      definition:
        "The two directions:\n" +
        "- **Down a group**: atomic radius **increases**; metallic character **increases** (Be < Mg < Ca < Sr < Ba).\n" +
        "- **Across a period** (left to right): atomic radius **decreases**; metallic character **decreases**.\n" +
        "- So in period 2, Li > Be > … > O in size, and Na (period 3) is bigger than Li.\n" +
        "- **Isotopes** of an element have the same atomic number, so they sit in the **same place** in the table.\n" +
        "- **Germanium** and **tellurium** are metalloids in the p-block, not transition metals.",
      table: {
        columns: ["Property", "Down a group", "Across a period"],
        rows: [
          {
            cells: ["Atomic radius", "Increases", "Decreases"],
            noteAmber: "CDS 2024 (I): Na > Li > Be > O.",
            pyqExampleId: "aa704dcf-e842-458a-a9bf-42522d2e863c",
          },
          {
            cells: ["Metallic character", "Increases", "Decreases"],
            noteAmber: "CDS 2026 (I): Be < Ca < Sr < Ba is the right order of metallic character.",
            pyqExampleId: "630fcc82-79a5-41c4-991d-b1265314b8ea",
          },
          { cells: ["Ionisation energy", "Decreases", "Increases"] },
        ],
      },
      pyqExampleId: "aa704dcf-e842-458a-a9bf-42522d2e863c",
      selfCheckExample: {
        prompt: "Arrange K, Na and Mg in order of decreasing atomic radius.",
        steps: [
          "K is below Na in group 1, so K > Na.",
          "Mg is right of Na in period 3, so Na > Mg.",
        ],
        answer: "K > Na > Mg.",
      },
      practiceSet: [
        { prompt: "Does atomic radius increase or decrease across a period?", answer: "Decrease" },
        { prompt: "Which is more metallic, Ba or Be?", answer: "Ba" },
        { prompt: "Do the two isotopes of chlorine occupy different places in the periodic table?", answer: "No — the same place" },
      ],
      traps: [
        {
          title: "Radius falls across a period",
          body: "'Atomic radius increases from left to right' is **false**. More protons in the same shell pull the electrons closer, so size **decreases** across a period.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschat-element-facts",
      name: "Noble gases, alkali metals and other element facts",
      intuition:
        "A few element facts come back in CDS with a twist. Noble gases already have full shells, so they exist as single atoms. Caesium keeps time in atomic clocks. Phosphorus and sulphur form big molecules, not pairs.",
      definition:
        "The facts:\n" +
        "- **Noble gases** (He, Ne, Ar …) are **monatomic**: single atoms, because their shells are full. Helium is **not** diatomic.\n" +
        "- Hydrogen, nitrogen, oxygen and chlorine are **diatomic** (H₂, N₂, O₂, Cl₂). Phosphorus is **P₄** and sulphur **S₈**.\n" +
        "- **Caesium-133** is the timekeeper in **atomic clocks**; the SI second is defined by it.\n" +
        "- Nitrogen (2p³) has **three unpaired electrons**; carbon is **tetravalent**; chlorine has **two stable isotopes**.",
      table: {
        columns: ["Element", "Fact"],
        rows: [
          {
            cells: ["Helium", "Monatomic gas (full shell)"],
            noteAmber: "CDS 2019 (II) asked which is monatomic; CDS 2026 (I) had 'helium : diatomic gas' as the wrong pair.",
            pyqExampleId: "97cf7919-357c-4c25-8879-f3d4cea8841b",
          },
          {
            cells: ["Caesium", "Timekeeper in atomic clocks"],
            pyqExampleId: "0d2bb3a6-7b2b-4aea-91bc-610bf63fa1c5",
          },
          { cells: ["Nitrogen", "Three unpaired electrons (2p³)"] },
          { cells: ["Carbon", "Tetravalent"] },
          { cells: ["Phosphorus, sulphur", "Polyatomic: P₄, S₈"] },
        ],
      },
      pyqExampleId: "4ec7a439-6802-489e-96d8-64202dc711fa",
      practiceSet: [
        { prompt: "Which element is used as the timekeeper in atomic clocks?", answer: "Caesium" },
        { prompt: "Is argon monatomic or diatomic?", answer: "Monatomic" },
        { prompt: "How many unpaired electrons does a nitrogen atom have?", answer: "Three" },
        { prompt: "What is the molecular formula of white phosphorus?", answer: "P₄" },
      ],
      traps: [
        {
          title: "Noble gases are single atoms",
          body: "He, Ne and Ar exist as single atoms. A pair that says 'helium : diatomic gas' is the wrongly matched one.",
        },
      ],
    },
  ],
};
