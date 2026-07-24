import type { SubtopicNote } from "@/app/notes/_types";

export const ACID_BASE_THEORIES_NOTE: SubtopicNote = {
  subtopicName: "Theories of Acids and Bases",
  title: "Theories of Acids and Bases",
  oneLineDefinition:
    "The three definitions of acids and bases (Arrhenius, Bronsted-Lowry, Lewis), how to spot the conjugate acid-base pair in an equilibrium, and which species are amphoteric.",
  whyItMatters:
    "Around thirteen PYQs here, every one EASY and pure recall — the opening free marks of the chapter. " +
    "They cluster three ways: match a definition to its theory (Lewis base donates an electron pair; a Bronsted base accepts a proton), pick the conjugate acid-base pair out of an equilibrium reaction, and name the amphoteric species (almost always water). " +
    "Memorise the three definitions, learn the one-proton rule for conjugate pairs, and this whole subtopic is guaranteed marks.",
  concepts: [
    // Concept 1 — the three theories (reference table + Lewis/BL identification)
    {
      kind: "reference" as const,
      slug: "cetie-abt-three-theories",
      name: "The three theories: Arrhenius, Bronsted-Lowry and Lewis",
      intuition:
        "Chemists defined 'acid' and 'base' three times, each definition wider than the last. Arrhenius talks about ions released in water; Bronsted-Lowry talks about giving and taking a proton; Lewis talks about giving and taking an electron pair. " +
        "The bank tests these as straight identify-the-species recall, so learn each definition well enough to point at the acid and the base in any list.",
      definition:
        "The three definitions of acids and bases, each broader than the last:\n" +
        "- **Arrhenius** — an **acid** dissociates in water to give \\(\\text{H}^+\\); a **base** dissociates in water to give \\(\\text{OH}^-\\). Limited to aqueous solutions.\n" +
        "- **Bronsted-Lowry** — an **acid** is a **proton \\((\\text{H}^+)\\) donor**; a **base** is a **proton acceptor**. Works beyond water.\n" +
        "- **Lewis** — an **acid** is an **electron-pair acceptor**; a **base** is an **electron-pair donor**. The most general definition.\n" +
        "So \\(\\text{NH}_3\\) (lone pair on N) is a Lewis **base**, while \\(\\text{BF}_3\\), \\(\\text{AlCl}_3\\), \\(\\text{BCl}_3\\) and \\(\\text{Cu}^{2+}\\) (electron-deficient) are Lewis **acids**.",
      table: {
        columns: ["Theory", "Acid is", "Base is", "Example acid / base"],
        rows: [
          {
            cells: [
              "Arrhenius",
              "Gives \\(\\text{H}^+\\) in water",
              "Gives \\(\\text{OH}^-\\) in water",
              "\\(\\text{HCl}\\) / \\(\\text{NaOH}\\)",
            ],
          },
          {
            cells: [
              "Bronsted-Lowry",
              "Proton \\((\\text{H}^+)\\) donor",
              "Proton \\((\\text{H}^+)\\) acceptor",
              "\\(\\text{HCl}\\) / \\(\\text{NH}_3\\)",
            ],
            noteAmber:
              "A Bronsted base ACCEPTS a proton — this is why \\(\\text{NH}_3\\) 'acts as a base when reacted with water' (it takes an \\(\\text{H}^+\\) to become \\(\\text{NH}_4^+\\)).",
          },
          {
            cells: [
              "Lewis",
              "Electron-pair acceptor",
              "Electron-pair donor",
              "\\(\\text{BF}_3\\) / \\(\\text{NH}_3\\)",
            ],
            noteAmber:
              "\\(\\text{BCl}_3\\) is a Lewis acid but NOT a Bronsted acid — it accepts an electron pair yet has no proton to donate.",
          },
        ],
        caption:
          "Each later theory contains the earlier one; a Lewis acid is the most general kind.",
      },
      pyqExampleId: "e69dd0f5-15ce-4555-adea-983c9209f856", // which is a Lewis base -> NH3
      selfCheckExample: {
        prompt:
          "From the list \\(\\text{BF}_3\\), \\(\\text{Cu}^{2+}\\), \\(\\text{AlCl}_3\\), \\(\\text{NH}_3\\), identify the Lewis base and explain why.",
        steps: [
          "A Lewis base donates an electron pair; a Lewis acid accepts one.",
          "\\(\\text{BF}_3\\), \\(\\text{AlCl}_3\\) and \\(\\text{Cu}^{2+}\\) are electron-deficient, so they accept a pair (Lewis acids).",
          "\\(\\text{NH}_3\\) has a lone pair on nitrogen that it donates.",
        ],
        answer: "\\(\\text{NH}_3\\) is the Lewis base (it donates the nitrogen lone pair).",
      },
      practiceSet: [
        { prompt: "Under the Arrhenius theory, an acid gives which ion in water?", answer: "\\(\\text{H}^+\\)" },
        { prompt: "Under the Bronsted-Lowry theory, a base is defined as a what?", answer: "Proton \\((\\text{H}^+)\\) acceptor" },
        { prompt: "Under the Lewis theory, a base is defined as a what?", answer: "Electron-pair donor" },
        { prompt: "Is \\(\\text{BCl}_3\\) a Lewis acid or base?", answer: "Lewis acid", method: "electron-deficient boron accepts an electron pair" },
        { prompt: "Which activity does a Lewis base exhibit?", answer: "Donates a pair of electrons" },
      ],
      traps: [
        {
          title: "Match the activity to the right theory",
          body:
            "'Donate a pair of electrons' is the **Lewis base** definition. Do not confuse it with 'accept \\(\\text{H}^+\\)' (that is a **Bronsted** base) or 'donate \\(\\text{OH}^-\\)' (that is an **Arrhenius** base). A Lewis base gives an electron pair, not a proton or a hydroxide ion.",
        },
        {
          title: "Lewis acid vs Bronsted acid",
          body:
            "\\(\\text{BCl}_3\\) is a **Lewis acid but not a Bronsted acid** — it accepts an electron pair but has no \\(\\text{H}^+\\) to donate. \\(\\text{HNO}_3\\) and \\(\\text{HSO}_4^-\\) are both Lewis and Bronsted acids because they can donate a proton too.",
        },
      ],
    },

    // Concept 2 — conjugate acid-base pairs (formula/technique: minus one H+)
    {
      kind: "formula" as const,
      slug: "cetie-abt-conjugate-pairs",
      name: "Conjugate acid-base pairs",
      intuition:
        "When a Bronsted acid donates its proton, what is left is its conjugate base; when a base accepts a proton, it becomes its conjugate acid. So a conjugate acid-base pair is any two species that differ by exactly one \\(\\text{H}^+\\) — the acid being the one with the extra proton.",
      definition:
        "A **conjugate acid-base pair** differs by exactly **one proton** \\((\\text{H}^+)\\):\n" +
        "- The **conjugate base** of an acid = the acid **minus one** \\(\\text{H}^+\\) (and its charge drops by one).\n" +
        "- The **conjugate acid** of a base = the base **plus one** \\(\\text{H}^+\\) (charge rises by one).\n" +
        "- In an equilibrium such as \\(\\text{HCl} + \\text{NH}_3 \\rightleftharpoons \\text{NH}_4^+ + \\text{Cl}^-\\), the two pairs are \\(\\text{HCl}/\\text{Cl}^-\\) and \\(\\text{NH}_4^+/\\text{NH}_3\\).",
      formula: {
        label: "Conjugate base from an acid",
        latex: "\\text{Acid} \\;\\rightleftharpoons\\; \\text{Conjugate base} + \\text{H}^+",
        symbols: [
          { symbol: "\\(\\text{Acid}\\)", meaning: "proton donor (the species with the extra H+)" },
          { symbol: "\\(\\text{Conjugate base}\\)", meaning: "what remains after the acid loses one H+" },
          { symbol: "\\(\\text{H}^+\\)", meaning: "the single proton that distinguishes the pair" },
        ],
      },
      pyqExampleId: "ed5b1dc0-faa0-4046-b889-ff30d45161ad", // conjugate base of HClO4 -> ClO4-
      authoredExample: {
        prompt:
          "For the equilibrium \\(\\text{H}_2\\text{SO}_3 + \\text{H}_2\\text{O} \\rightleftharpoons \\text{HSO}_3^- + \\text{H}_3\\text{O}^+\\), identify a conjugate acid-base pair.",
        steps: [
          "Find two species that differ by one \\(\\text{H}^+\\).",
          "\\(\\text{H}_2\\text{SO}_3\\) loses a proton to become \\(\\text{HSO}_3^-\\), so they differ by exactly one \\(\\text{H}^+\\).",
          "The one with the extra proton \\((\\text{H}_2\\text{SO}_3)\\) is the acid; \\(\\text{HSO}_3^-\\) is its conjugate base.",
        ],
        answer: "\\(\\text{H}_2\\text{SO}_3\\) (acid) and \\(\\text{HSO}_3^-\\) (conjugate base).",
      },
      selfCheckExample: {
        prompt: "What is the conjugate base of \\(\\text{HPO}_4^{2-}\\)?",
        steps: [
          "The conjugate base is the species minus one \\(\\text{H}^+\\).",
          "Remove one \\(\\text{H}^+\\) from \\(\\text{HPO}_4^{2-}\\): the formula loses an H and the charge drops by one.",
        ],
        answer: "\\(\\text{PO}_4^{3-}\\).",
      },
      practiceSet: [
        { prompt: "Conjugate base of \\(\\text{HClO}_4\\)?", answer: "\\(\\text{ClO}_4^-\\)", method: "remove one \\(\\text{H}^+\\)" },
        { prompt: "Conjugate acid of \\(\\text{NH}_3\\)?", answer: "\\(\\text{NH}_4^+\\)", method: "add one \\(\\text{H}^+\\)" },
        { prompt: "In \\(\\text{HCl}+\\text{NH}_3 \\rightleftharpoons \\text{NH}_4^+ + \\text{Cl}^-\\), name the pair with \\(\\text{NH}_3\\).", answer: "\\(\\text{NH}_4^+\\) and \\(\\text{NH}_3\\)" },
        { prompt: "How many protons separate an acid from its conjugate base?", answer: "Exactly one" },
      ],
      traps: [
        {
          title: "Conjugate base of a strong acid is weak",
          body:
            "The conjugate base of a strong acid like \\(\\text{HClO}_4\\) is \\(\\text{ClO}_4^-\\), which is a very **weak** base. In general, the stronger the acid, the weaker its conjugate base — don't expect \\(\\text{ClO}_4^-\\) to behave like a strong base.",
        },
        {
          title: "Pick species differing by ONE proton — not a random pair",
          body:
            "In \\(\\text{HCl}+\\text{NH}_3 \\rightleftharpoons \\text{NH}_4^+ + \\text{Cl}^-\\), the pair is \\(\\text{NH}_4^+/\\text{NH}_3\\), NOT \\(\\text{NH}_4^+/\\text{HCl}\\) or \\(\\text{Cl}^-/\\text{NH}_4^+\\). A conjugate pair must be the **same core species** before and after losing one \\(\\text{H}^+\\).",
        },
      ],
    },

    // Concept 3 — amphoteric species (reference)
    {
      kind: "reference" as const,
      slug: "cetie-abt-amphoteric",
      name: "Amphoteric species",
      intuition:
        "Some species can play either role — donating a proton when faced with a base, or accepting one when faced with an acid. Water is the textbook example, and it is nearly always the bank's answer to 'which is amphoteric'.",
      definition:
        "An **amphoteric** (or amphiprotic) species can act as **both** an acid and a base:\n" +
        "- **Water** \\((\\text{H}_2\\text{O})\\) donates a proton to become \\(\\text{OH}^-\\) (acting as an acid) and accepts a proton to become \\(\\text{H}_3\\text{O}^+\\) (acting as a base). It is the classic amphoteric compound.\n" +
        "- **Hydrogencarbonate** \\((\\text{HCO}_3^-)\\) is also amphoteric — it can lose an \\(\\text{H}^+\\) to give \\(\\text{CO}_3^{2-}\\) or gain one to give \\(\\text{H}_2\\text{CO}_3\\).\n" +
        "- Compounds like \\(\\text{HCl}\\) (acid only), \\(\\text{NaOH}\\) (base only) and \\(\\text{CH}_3\\text{COOH}\\) (acid only) are **not** amphoteric.",
      table: {
        columns: ["Species", "Amphoteric?", "Why"],
        rows: [
          {
            cells: [
              "\\(\\text{H}_2\\text{O}\\)",
              "Yes",
              "Gives \\(\\text{OH}^-\\) (acid) and takes \\(\\text{H}^+\\) to form \\(\\text{H}_3\\text{O}^+\\) (base)",
            ],
            noteAmber: "Water is the bank's default answer for 'which species is amphoteric'.",
          },
          {
            cells: [
              "\\(\\text{HCO}_3^-\\)",
              "Yes",
              "Loses \\(\\text{H}^+\\) to \\(\\text{CO}_3^{2-}\\) or gains \\(\\text{H}^+\\) to \\(\\text{H}_2\\text{CO}_3\\)",
            ],
          },
          { cells: ["\\(\\text{HCl}\\)", "No", "Only donates a proton (acid only)"] },
          { cells: ["\\(\\text{NaOH}\\)", "No", "Only gives \\(\\text{OH}^-\\) (base only)"] },
          {
            cells: ["\\(\\text{CH}_3\\text{COOH}\\)", "No", "Acts only as an acid (donates a proton)"],
          },
        ],
        caption: "Amphoteric = can be either acid or base; water and \\(\\text{HCO}_3^-\\) are the standard examples.",
      },
      pyqExampleId: "d6056afb-9fe7-45d3-a62e-ba2b55239049", // amphoteric -> H2O
      selfCheckExample: {
        prompt:
          "From \\(\\text{HCl}\\), \\(\\text{H}_2\\text{O}\\), \\(\\text{CH}_3\\text{COOH}\\), \\(\\text{NaOH}\\), which one is amphoteric?",
        steps: [
          "Look for the species that can both donate and accept a proton.",
          "\\(\\text{HCl}\\) and \\(\\text{CH}_3\\text{COOH}\\) only donate protons; \\(\\text{NaOH}\\) only supplies \\(\\text{OH}^-\\).",
          "\\(\\text{H}_2\\text{O}\\) can do both — donate to form \\(\\text{OH}^-\\) or accept to form \\(\\text{H}_3\\text{O}^+\\).",
        ],
        answer: "\\(\\text{H}_2\\text{O}\\).",
      },
      practiceSet: [
        { prompt: "Which common compound is amphoteric: \\(\\text{HCl}\\), \\(\\text{H}_2\\text{O}\\), \\(\\text{NaOH}\\)?", answer: "\\(\\text{H}_2\\text{O}\\)" },
        { prompt: "Name another amphoteric species besides water.", answer: "\\(\\text{HCO}_3^-\\) (hydrogencarbonate)" },
        { prompt: "Is \\(\\text{NaOH}\\) amphoteric?", answer: "No", method: "it acts only as a base" },
        { prompt: "What does water become when it acts as a Bronsted base?", answer: "\\(\\text{H}_3\\text{O}^+\\)" },
      ],
      traps: [
        {
          title: "Water is amphoteric — acetic acid is not",
          body:
            "\\(\\text{H}_2\\text{O}\\) is amphoteric because it both donates and accepts protons. \\(\\text{CH}_3\\text{COOH}\\) is a distractor here: it can lose a proton to a stronger base, but it does not readily accept one, so it acts **only as an acid** and is not amphoteric.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Acid-Base Theory, Oxides and Electrolytes (NDA Chemistry)",
      href: "/notes/nda-chemistry/acids-bases-salts/acid-acid-base-theory",
    },
  ],
};
