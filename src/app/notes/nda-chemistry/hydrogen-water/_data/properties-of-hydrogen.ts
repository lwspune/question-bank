import type { SubtopicNote } from "@/app/notes/_types";

export const PROPERTIES_OF_HYDROGEN_NOTE: SubtopicNote = {
  subtopicName: "Properties of Hydrogen",
  title: "Properties of Hydrogen",
  oneLineDefinition:
    "Hydrogen is the lightest element — a colourless, odourless, diatomic gas that is almost insoluble in water and unreactive at room temperature because the H–H bond is very strong.",
  whyItMatters:
    "Four PYQs, mostly EASY-to-MODERATE recall: the colour of the gas, a 'which statement about dihydrogen is NOT correct' trap, and one HARD question on how a large volume of hydrogen is stored. " +
    "The traps live in the named facts — syngas is CO plus hydrogen, not nitrogen-anything, and large volumes of hydrogen are held by interstitial transition-metal hydrides. Learn the physical-property line and the three hydride types and the marks are free.",
  concepts: [
    // foundation — physical properties of the gas
    {
      kind: "reference" as const,
      slug: "physical-properties-of-dihydrogen",
      name: "Physical properties of dihydrogen",
      intuition:
        "Hydrogen is element number 1 — one proton, one electron, the simplest and lightest atom. In its natural state it exists as a diatomic molecule H₂ (dihydrogen). " +
        "Because it is so light and the two atoms are held by a very strong bond, the gas is colourless, lighter than air, almost insoluble in water, and slow to react unless heated.",
      definition:
        "The physical-property facts the bank tests:\n" +
        "- **State and look** — a **colourless**, odourless, tasteless gas at room temperature.\n" +
        "- **Density** — the **lightest** of all gases; lighter than air, so it rises.\n" +
        "- **Solubility** — almost **insoluble in water**.\n" +
        "- **Molecular form** — exists as **diatomic H₂** (dihydrogen), not single atoms.\n" +
        "- **Reactivity** — **inert (unreactive) at room temperature** because the H–H bond dissociation enthalpy is very high (about 436 kJ/mol); it needs heat, light or a catalyst to react.",
      table: {
        columns: ["Property", "Value / fact"],
        rows: [
          {
            cells: ["Colour", "Colourless (also odourless, tasteless)"],
            noteAmber: "Hydrogen gas is colourless — a coloured-flame or coloured-gas option is always wrong.",
            pyqExampleId: "91ad7377-84c8-44e6-a53d-7f78cda1df13",
          },
          { cells: ["Density vs air", "Lighter than air (lightest of all gases)"] },
          { cells: ["Solubility in water", "Almost insoluble"] },
          { cells: ["Molecular form", "Diatomic, H₂ (dihydrogen)"] },
          { cells: ["Reactivity at room temperature", "Inert — strong H–H bond, about 436 kJ/mol"] },
        ],
        caption: "Lightest, colourless, insoluble, diatomic, and unreactive until heated.",
      },
      pyqExampleId: "91ad7377-84c8-44e6-a53d-7f78cda1df13", // colour of hydrogen gas
      selfCheckExample: {
        prompt:
          "A gas is the lightest of all gases, colourless, and almost insoluble in water, yet it does not react with most substances at room temperature. Name the gas and explain its low reactivity.",
        steps: [
          "Lightest gas, colourless and insoluble in water describes hydrogen, H₂.",
          "It is unreactive at room temperature because the H–H bond is very strong (high bond dissociation enthalpy, about 436 kJ/mol).",
          "Breaking that bond needs added energy — heat, light or a catalyst.",
        ],
        answer: "Hydrogen (H₂); the strong H–H bond keeps it inert at room temperature.",
      },
      practiceSet: [
        { prompt: "What is the colour of hydrogen gas?", answer: "Colourless" },
        { prompt: "Is hydrogen lighter or heavier than air?", answer: "Lighter than air" },
        { prompt: "Is hydrogen soluble in water?", answer: "No — almost insoluble" },
        { prompt: "In what molecular form does hydrogen normally exist?", answer: "Diatomic H₂ (dihydrogen)" },
        { prompt: "Why is hydrogen unreactive at room temperature?", answer: "The H–H bond dissociation enthalpy is very high" },
      ],
      traps: [
        {
          title: "Hydrogen is colourless, not pale-blue",
          body:
            "Hydrogen gas itself is **colourless**. It burns with a pale-blue flame, but the gas you collect is colourless — do not confuse the flame colour with the gas colour.",
        },
      ],
    },

    // hydrides — the three types (the HARD storage question lives here)
    {
      kind: "reference" as const,
      slug: "hydrides-and-storage",
      name: "Types of hydrides and hydrogen storage",
      intuition:
        "When hydrogen combines with another element it forms a hydride, and the kind of hydride depends on the partner. Reactive metals give salt-like (ionic) hydrides; non-metals give covalent (molecular) hydrides; and many transition metals trap hydrogen inside their crystal lattice to give metallic hydrides. " +
        "That last type is how a very large volume of hydrogen can be stored in a small metal block.",
      definition:
        "The three classes of hydride, by the partner element:\n" +
        "- **Ionic (saline) hydrides** — hydrogen plus a **highly reactive metal** (alkali and alkaline-earth metals, e.g. NaH, CaH₂); the metal donates an electron and hydrogen becomes the H⁻ ion.\n" +
        "- **Covalent (molecular) hydrides** — hydrogen plus a **non-metal** (e.g. CH₄, NH₃, H₂O, HCl); shared electron pairs, often gases or volatile liquids.\n" +
        "- **Metallic (interstitial / non-stoichiometric) hydrides** — hydrogen absorbed into the lattice of a **transition metal** (e.g. palladium); the hydrogen sits between the metal atoms, so the formula is not a whole-number ratio. **A very large volume of hydrogen can be stored this way.**\n" +
        "Syngas (synthesis gas) is a separate fact: it is a mixture of **carbon monoxide (CO) and hydrogen (H₂)** — never nitrogen oxides.",
      table: {
        columns: ["Hydride type", "Forms with", "Example", "Key point"],
        rows: [
          { cells: ["Ionic / saline", "Reactive metals (alkali, alkaline-earth)", "NaH, CaH₂", "Contains the H⁻ ion"] },
          { cells: ["Covalent / molecular", "Non-metals", "CH₄, NH₃, H₂O, HCl", "Shared electron pairs"] },
          {
            cells: ["Metallic / interstitial", "Transition metals (e.g. palladium)", "PdH₍ₓ₎", "Stores a very large volume of hydrogen; non-stoichiometric"],
            noteAmber: "Large-volume hydrogen storage = non-stoichiometric (interstitial) hydrides, NOT hydrogen peroxide or simple hydrides.",
            pyqExampleId: "f38b1ac1-50e6-4403-a7f8-5581fa8e60cd",
          },
        ],
        caption: "Reactive metal → ionic; non-metal → covalent; transition metal → metallic (the storage type).",
      },
      pyqExampleId: "f38b1ac1-50e6-4403-a7f8-5581fa8e60cd", // large volume of hydrogen via non-stoichiometric hydrides
      selfCheckExample: {
        prompt:
          "Hydrogen reacts with sodium at high temperature to give a solid. What type of hydride is this, and which ion of hydrogen does it contain?",
        steps: [
          "Sodium is a highly reactive alkali metal, so the product is an ionic (saline) hydride, NaH.",
          "In an ionic hydride the metal loses an electron and hydrogen gains it.",
          "So hydrogen is present as the H⁻ (hydride) ion.",
        ],
        answer: "An ionic (saline) hydride, NaH, containing the H⁻ ion.",
      },
      practiceSet: [
        { prompt: "Which hydride type stores a very large volume of hydrogen?", answer: "Metallic / interstitial (non-stoichiometric) hydrides" },
        { prompt: "NaH and CaH₂ are which type of hydride?", answer: "Ionic (saline) hydrides" },
        { prompt: "Methane (CH₄) and ammonia (NH₃) are which type of hydride?", answer: "Covalent (molecular) hydrides" },
        { prompt: "Which metal is the classic absorber of hydrogen?", answer: "Palladium" },
        { prompt: "Syngas is a mixture of which two gases?", answer: "Carbon monoxide (CO) and hydrogen (H₂)" },
      ],
      traps: [
        {
          title: "Syngas is CO + H₂, never NO₂ + H₂",
          body:
            "Synthesis gas (syngas) is a mixture of **carbon monoxide and hydrogen**. A statement that syngas is a mixture of NO₂ and H₂ is the false one the bank plants.",
        },
        {
          title: "Storage is interstitial hydrides, not H₂O₂",
          body:
            "Large volumes of hydrogen are accommodated by **non-stoichiometric (interstitial) hydrides** of transition metals like palladium — not by hydrogen peroxide and not by simple alkali-metal hydrides.",
        },
      ],
    },
  ],
};
