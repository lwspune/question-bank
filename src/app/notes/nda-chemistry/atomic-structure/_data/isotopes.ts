import type { SubtopicNote } from "@/app/notes/_types";

export const ISOTOPES_NOTE: SubtopicNote = {
  subtopicName: "Isotopes and Isoelectronic Species",
  title: "Isotopes and Isoelectronic Species",
  oneLineDefinition:
    "Isotopes are atoms of the same element with different mass numbers; isoelectronic species are different particles that happen to have the same number of electrons.",
  whyItMatters:
    "6 PYQs, and two skills carry them all: counting electrons to test whether two species are isoelectronic, and the weighted-average-mass calculation (forwards and backwards). " +
    "The bank also keeps one pure-recall favourite — cobalt-60 is the cancer-treatment isotope.",
  concepts: [
    // FOUNDATION — isotopes vs isoelectronic (REFERENCE)
    {
      kind: "reference" as const,
      slug: "isotopes-vs-isoelectronic",
      name: "Isotopes, isobars and isoelectronic species — the definitions",
      intuition:
        "Three 'iso-' words sound alike but mean different things. Isotopes share the proton count (same element); isobars share the mass number (different elements); isoelectronic species share the electron count. " +
        "The bank's whole isoelectronic question is just 'count the electrons in each and find the match'.",
      definition:
        "The three definitions to keep separate:\n" +
        "- **Isotopes** — same number of **protons** (same element, same Z), different number of **neutrons** (different mass number). Example: ³⁵Cl and ³⁷Cl.\n" +
        "- **Isobars** — same **mass number (A)**, different elements (different Z). Example: ⁴⁰Ar and ⁴⁰Ca.\n" +
        "- **Isoelectronic species** — same number of **electrons**, regardless of element or charge. Example: Na⁺, F⁻, O²⁻ and Ne all have **10 electrons**.\n" +
        "For ions, electrons = protons − charge (subtract for +, add for −).",
      table: {
        columns: ["Term", "What is the same", "What differs", "Example"],
        rows: [
          { cells: ["Isotopes", "Protons (Z) — same element", "Neutrons / mass number", "³⁵Cl and ³⁷Cl"] },
          { cells: ["Isobars", "Mass number (A)", "Element / proton count", "⁴⁰Ar and ⁴⁰Ca"] },
          {
            cells: ["Isoelectronic", "Number of electrons", "Element and charge", "Na⁺, F⁻, O²⁻, Ne (all 10 e⁻)"],
            noteAmber: "To test isoelectronic species, just count electrons: protons minus the charge.",
          },
        ],
      },
      pyqExampleId: "58dfcfd7-4dcd-40c1-8b2d-fade0131377a", // isoelectronic pairs
      selfCheckExample: {
        prompt: "Which species has the same number of electrons as a neutral chlorine atom ³⁵₁₇Cl: ³²₁₆S, ³⁴₁₆S⁺, ⁴⁰₁₈Ar⁺, or ³⁵₁₆S²⁻?",
        steps: [
          "Neutral Cl has Z = 17, so 17 electrons.",
          "³²₁₆S: 16 electrons. ³⁴₁₆S⁺: 16 − 1 = 15. ³⁵₁₆S²⁻: 16 + 2 = 18.",
          "⁴⁰₁₈Ar⁺: 18 − 1 = 17 electrons — the match.",
        ],
        answer: "⁴⁰₁₈Ar⁺ — it has 17 electrons, the same as neutral chlorine.",
      },
      practiceSet: [
        { prompt: "How many electrons does the fluoride ion F⁻ have? (F has Z = 9)", answer: "10", method: "9 + 1 for the negative charge" },
        { prompt: "Are K⁺ (Z = 19) and Ne (Z = 10) isoelectronic?", answer: "No", method: "K⁺ has 18 electrons, Ne has 10" },
        { prompt: "Two atoms have the same mass number but different atomic numbers. What are they called?", answer: "Isobars" },
        { prompt: "³⁵Cl and ³⁷Cl differ only in their number of which particle?", answer: "Neutrons", method: "same protons → isotopes" },
      ],
      traps: [
        {
          title: "N⁻ is NOT isoelectronic with F⁻",
          body:
            "F⁻ has 10 electrons (9 + 1). N⁻ has only 7 + 1 = **8** electrons, so it is the odd one out. Always recount: protons ± charge.",
        },
        {
          title: "Isotopes vs isobars vs isoelectronic",
          body:
            "Same protons → **isotopes**. Same mass number → **isobars**. Same electrons → **isoelectronic**. Mixing these up is the most common slip here.",
        },
      ],
    },

    // average atomic mass (FORMULA) — Cl forward calc + boron reverse calc
    {
      kind: "formula" as const,
      slug: "isotope-average-mass-and-abundance",
      name: "Average atomic mass and finding isotope abundance",
      intuition:
        "The periodic-table mass is a weighted average of the isotope masses. Given the proportions you can find the average; given the average you can work backwards to the proportions. " +
        "The forward question (chlorine is 35.5 u) and the reverse question (what % of each boron isotope?) are both standard.",
      definition:
        "The weighted-average relation, used both ways:\n" +
        "- **Forwards** — average = Σ(mass × fraction). Chlorine: ³⁵Cl and ³⁷Cl in ratio 3 : 1 → (3 × 35 + 1 × 37)/4 = 142/4 = **35.5 u**.\n" +
        "- **Backwards** — set the unknown abundance as x out of 100 and solve. Boron averages 10.81 with isotopes ¹⁰B and ¹¹B: (10x + 11(100 − x))/100 = 10.81 → x = 19, so **19% ¹⁰B and 81% ¹¹B**.",
      formula: {
        label: "Weighted average and back-solving abundance",
        latex: "\\bar{M} = \\frac{m_1 x + m_2 (100 - x)}{100}",
        symbols: [
          { symbol: "\\(\\bar{M}\\)", meaning: "average atomic mass" },
          { symbol: "m_1, m_2", meaning: "isotope masses" },
          { symbol: "x", meaning: "percentage abundance of isotope 1" },
        ],
      },
      pyqExampleId: "8ae835bd-a479-45e1-ad7b-4ea706476fb8", // boron abundance 19/81
      authoredExample: {
        prompt:
          "Boron has two isotopes ¹⁰B (mass 10) and ¹¹B (mass 11). Its relative atomic mass is 10.81. Find the percentage abundance of each isotope.",
        steps: [
          "Let the abundance of ¹⁰B be x% and ¹¹B be (100 − x)%.",
          "Weighted average: (10x + 11(100 − x))/100 = 10.81.",
          "1100 − x = 1081, so x = 19.",
          "¹⁰B = 19% and ¹¹B = 81%.",
        ],
        answer: "19% ¹⁰B and 81% ¹¹B.",
      },
      selfCheckExample: {
        prompt: "Chlorine exists as ³⁵Cl and ³⁷Cl in the ratio 3 : 1. Find its average atomic mass.",
        steps: [
          "The ratio 3 : 1 has 4 parts total.",
          "Weighted sum = 3 × 35 + 1 × 37 = 105 + 37 = 142.",
          "Divide by 4: 142 / 4 = 35.5 u.",
        ],
        answer: "35.5 u.",
      },
      practiceSet: [
        { prompt: "³⁵Cl and ³⁷Cl occur in the ratio 3 : 1. What is chlorine's average atomic mass?", answer: "35.5 u", method: "(3×35 + 1×37)/4" },
        { prompt: "An element averages 10.81 u from isotopes of mass 10 and 11. What % is the mass-10 isotope?", answer: "19%", method: "back-solve 10x + 11(100−x) = 1081" },
      ],
      traps: [
        {
          title: "Read the order of the answer",
          body:
            "For boron the abundances are **19% ¹⁰B and 81% ¹¹B** — the heavier isotope is the more common one. Options often swap the order (81% and 19%); match each percentage to the right isotope.",
        },
      ],
    },

    // radioisotope uses (REFERENCE)
    {
      kind: "reference" as const,
      slug: "radioisotope-uses",
      name: "Useful radioactive isotopes",
      intuition:
        "Some isotopes are radioactive and have famous medical or industrial uses. The NDA's reliable one: cobalt-60 is used to treat cancer (radiotherapy). " +
        "Don't confuse it with iodine-131 (thyroid) or carbon-14 (dating).",
      definition:
        "The radioisotope uses the bank tests:\n" +
        "- **Cobalt-60** — gamma source for **cancer treatment** (radiotherapy).\n" +
        "- **Iodine-131** — used for **thyroid** disorders.\n" +
        "- **Carbon-14** — used for **radiocarbon dating** of fossils.\n" +
        "- **Uranium-235** — nuclear fuel / fission.",
      table: {
        columns: ["Isotope", "Main use"],
        rows: [
          {
            cells: ["Cobalt-60", "Cancer treatment (radiotherapy)"],
            noteAmber: "NDA 2020 — the isotope used to treat cancer is cobalt-60. (Cobalt, not iodine.)",
          },
          { cells: ["Iodine-131", "Treating thyroid disorders"] },
          { cells: ["Carbon-14", "Radiocarbon dating of fossils"] },
          { cells: ["Uranium-235", "Nuclear fuel (fission)"] },
        ],
      },
      pyqExampleId: "66c11611-cab9-4f4e-919d-650e3b15ec91", // Co cancer
      practiceSet: [
        { prompt: "Which element's isotope is used to treat cancer?", answer: "Cobalt (cobalt-60)" },
        { prompt: "Which isotope is used for radiocarbon dating?", answer: "Carbon-14" },
        { prompt: "Iodine-131 is used to treat disorders of which gland?", answer: "The thyroid" },
      ],
      traps: [
        {
          title: "Cobalt-60 for cancer, iodine-131 for thyroid",
          body:
            "The cancer-treatment isotope is **cobalt-60**, not iodine. Iodine-131 is the thyroid one. The bank lists both as options.",
        },
      ],
    },
  ],
};
