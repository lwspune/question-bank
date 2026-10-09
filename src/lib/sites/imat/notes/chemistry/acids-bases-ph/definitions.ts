import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_ABP_DEFINITIONS_NOTE: SubtopicNote = {
  subtopicName: "Acid-Base Definitions",
  title: "What Makes an Acid or a Base: Three Definitions",
  oneLineDefinition:
    "Arrhenius looks at ions in water, Brønsted-Lowry at proton transfer, and Lewis at electron pairs; each definition is wider than the one before.",
  whyItMatters:
    "Five past questions test the definitions. The ministry papers asked what role nitric acid plays when it meets a stronger acid (2023), what ammonia is when it gives its lone pair to a boron compound (2024), and which statement fits the Brønsted-Lowry theory (2024).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-abp-theories",
      name: "Arrhenius, Brønsted-Lowry and Lewis definitions of acids and bases",
      intuition:
        "Chemists widened the idea of an acid three times. Arrhenius only counted substances that make ions in water. Brønsted and Lowry noticed that the real event is a proton (an H⁺ ion) moving from one particle to another, in water or not. Lewis went one step further: the proton is accepted because the base has a lone pair to give it, so any electron-pair donor is a base and any acceptor is an acid.",
      definition:
        "- **Arrhenius**: an acid releases \\(\\mathrm{H^+}\\) (really \\(\\mathrm{H_3O^+}\\)) in water; a base releases \\(\\mathrm{OH^-}\\) in water.\n" +
        "- **Brønsted-Lowry**: an acid is a **proton donor**; a base is a **proton acceptor**. Water is not needed.\n" +
        "- **Lewis**: an acid is an **electron-pair acceptor**; a base is an **electron-pair donor**. The bond formed is a dative (coordinate) bond.\n" +
        "- Every Arrhenius acid is a Brønsted-Lowry acid, and every Brønsted-Lowry base is a Lewis base (it uses a lone pair to hold the proton).\n" +
        "- A Lewis acid does not need hydrogen: \\(\\mathrm{BF_3}\\), \\(\\mathrm{AlCl_3}\\) and metal ions such as \\(\\mathrm{Fe^{3+}}\\) are Lewis acids.",
      table: {
        columns: ["Theory", "Acid", "Base", "Example"],
        rows: [
          {
            cells: [
              "Arrhenius",
              "Gives \\(\\mathrm{H^+}\\) in water",
              "Gives \\(\\mathrm{OH^-}\\) in water",
              "\\(\\mathrm{HCl}\\) and \\(\\mathrm{KOH}\\) in water",
            ],
          },
          {
            cells: [
              "Brønsted-Lowry",
              "Proton donor",
              "Proton acceptor",
              "\\(\\mathrm{NH_3 + H_2O \\rightleftharpoons NH_4^+ + OH^-}\\): water donates, ammonia accepts",
            ],
          },
          {
            cells: [
              "Lewis",
              "Electron-pair acceptor",
              "Electron-pair donor",
              "\\(\\mathrm{AlCl_3 + Cl^- \\rightarrow AlCl_4^-}\\): \\(\\mathrm{AlCl_3}\\) accepts the pair",
            ],
            noteAmber: "A Lewis acid often has an incomplete octet (boron, aluminium) or is a positive metal ion.",
          },
        ],
        caption: "Each definition includes the one above it, so a reaction can be acid-base in the Lewis sense even when no proton moves.",
      },
      selfCheckExample: {
        prompt: "Which statement is the Lewis definition of a base?",
        options: [
          "A species that accepts a pair of electrons",
          "A species that donates a pair of electrons to form a dative bond",
          "A species that donates a proton",
          "A species that releases hydroxide ions in water",
          "A species that gains electrons in a reaction",
        ],
        steps: [
          "Lewis bases donate an electron pair; Lewis acids accept one. So B is right.",
          "A is the Lewis acid. C is the Brønsted-Lowry acid. D is the Arrhenius base, a narrower idea.",
          "E describes reduction: gaining electrons outright is redox, not sharing a pair.",
        ],
        answer: "(B) A species that donates a pair of electrons to form a dative bond",
      },
      practiceSet: [
        { prompt: "In \\(\\mathrm{BF_3 + F^- \\rightarrow BF_4^-}\\), which species is the Lewis acid?", answer: "\\(\\mathrm{BF_3}\\)", method: "Boron has only six outer electrons and accepts the fluoride's lone pair" },
        { prompt: "When \\(\\mathrm{Cu^{2+}}\\) forms \\(\\mathrm{[Cu(H_2O)_6]^{2+}}\\), is the copper ion a Lewis acid or a Lewis base?", answer: "A Lewis acid", method: "Each water molecule donates a lone pair to the ion" },
        { prompt: "Which theory of acids needs water to be present?", answer: "Arrhenius", method: "It defines acids and bases by the ions they give in water" },
        { prompt: "Is a proton acceptor always a Lewis base?", answer: "Yes", method: "To accept \\(\\mathrm{H^+}\\) it must give the proton an electron pair" },
      ],
      traps: [
        {
          title: "A Lewis acid does not have to contain hydrogen",
          body: "Students often assume every acid has an H to give. In the Lewis sense, \\(\\mathrm{BF_3}\\), \\(\\mathrm{AlCl_3}\\) and metal ions are acids because they accept an electron pair. The base is the species with the lone pair, such as \\(\\mathrm{NH_3}\\), \\(\\mathrm{H_2O}\\) or a halide ion.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-abp-conjugates",
      name: "Conjugate acid-base pairs in a proton transfer",
      intuition:
        "When an acid gives away a proton, what is left behind could take a proton back: it is a base. That leftover is the acid's conjugate base. In the same way, a base that has taken a proton becomes a conjugate acid. So every Brønsted-Lowry reaction has two pairs, and the two members of a pair differ by exactly one \\(\\mathrm{H^+}\\).",
      definition:
        "- The **conjugate base** of an acid is the acid minus one \\(\\mathrm{H^+}\\): \\(\\mathrm{HNO_2 \\rightarrow NO_2^-}\\).\n" +
        "- The **conjugate acid** of a base is the base plus one \\(\\mathrm{H^+}\\): \\(\\mathrm{NH_3 \\rightarrow NH_4^+}\\).\n" +
        "- Adding or removing \\(\\mathrm{H^+}\\) changes the charge by one: a neutral acid gives a 1− conjugate base.\n" +
        "- Whether a substance acts as an acid or a base depends on its partner. Nitric acid is an acid in water, but it accepts a proton (acts as a base) from an even stronger acid.",
      formula: {
        label: "Two conjugate pairs in every proton transfer",
        latex: "\\underbrace{\\mathrm{HA}}_{\\text{acid}} + \\underbrace{\\mathrm{B}}_{\\text{base}} \\rightleftharpoons \\underbrace{\\mathrm{A^-}}_{\\text{conj. base}} + \\underbrace{\\mathrm{HB^+}}_{\\text{conj. acid}}",
        symbols: [
          { symbol: "\\(\\mathrm{HA / A^-}\\)", meaning: "the first pair: the acid and what is left when it loses \\(\\mathrm{H^+}\\)" },
          { symbol: "\\(\\mathrm{B / HB^+}\\)", meaning: "the second pair: the base and what it becomes after gaining \\(\\mathrm{H^+}\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "In pure ethanoic acid, perchloric acid reacts: \\(\\mathrm{HClO_4 + CH_3COOH \\rightarrow ClO_4^- + CH_3COOH_2^+}\\). Identify the acid, the base and the two conjugate pairs.",
        steps: [
          "\\(\\mathrm{HClO_4}\\) loses a proton and becomes \\(\\mathrm{ClO_4^-}\\), so it is the acid, and \\(\\mathrm{ClO_4^-}\\) is its conjugate base.",
          "\\(\\mathrm{CH_3COOH}\\) gains a proton and becomes \\(\\mathrm{CH_3COOH_2^+}\\), so here it is the base, and \\(\\mathrm{CH_3COOH_2^+}\\) is its conjugate acid.",
          "Ethanoic acid is normally an acid; it acts as a base only because perchloric acid is a much stronger proton donor.",
        ],
        answer: "Acid \\(\\mathrm{HClO_4}\\), base \\(\\mathrm{CH_3COOH}\\); pairs \\(\\mathrm{HClO_4 / ClO_4^-}\\) and \\(\\mathrm{CH_3COOH_2^+ / CH_3COOH}\\)",
      },
      selfCheckExample: {
        prompt:
          "Consider \\(\\mathrm{HSO_4^- + CO_3^{2-} \\rightarrow SO_4^{2-} + HCO_3^-}\\). Which of these is a conjugate acid-base pair?",
        options: [
          "\\(\\mathrm{HSO_4^-}\\) and \\(\\mathrm{CO_3^{2-}}\\)",
          "\\(\\mathrm{SO_4^{2-}}\\) and \\(\\mathrm{HCO_3^-}\\)",
          "\\(\\mathrm{HSO_4^-}\\) and \\(\\mathrm{HCO_3^-}\\)",
          "\\(\\mathrm{CO_3^{2-}}\\) and \\(\\mathrm{SO_4^{2-}}\\)",
          "\\(\\mathrm{HCO_3^-}\\) and \\(\\mathrm{CO_3^{2-}}\\)",
        ],
        steps: [
          "A conjugate pair differs by exactly one \\(\\mathrm{H^+}\\) and has the same core atoms.",
          "\\(\\mathrm{CO_3^{2-}}\\) gains \\(\\mathrm{H^+}\\) to become \\(\\mathrm{HCO_3^-}\\): that is a pair. (The other pair is \\(\\mathrm{HSO_4^- / SO_4^{2-}}\\), not offered.)",
          "A and B pair the two reactants or the two products. C and D pair two acids or two bases from different parents.",
        ],
        answer: "(E) \\(\\mathrm{HCO_3^-}\\) and \\(\\mathrm{CO_3^{2-}}\\)",
      },
      practiceSet: [
        { prompt: "What is the conjugate base of \\(\\mathrm{H_2SO_4}\\)?", answer: "\\(\\mathrm{HSO_4^-}\\)", method: "Remove one \\(\\mathrm{H^+}\\)" },
        { prompt: "What is the conjugate acid of \\(\\mathrm{H_2O}\\)?", answer: "\\(\\mathrm{H_3O^+}\\)", method: "Add one \\(\\mathrm{H^+}\\)" },
        { prompt: "What is the conjugate base of \\(\\mathrm{H_2O}\\)?", answer: "\\(\\mathrm{OH^-}\\)", method: "Remove one \\(\\mathrm{H^+}\\)" },
        { prompt: "In \\(\\mathrm{CH_3NH_2 + H_2O \\rightleftharpoons CH_3NH_3^+ + OH^-}\\), which species is the Brønsted-Lowry acid?", answer: "\\(\\mathrm{H_2O}\\)", method: "Water gives its proton to the amine" },
      ],
      traps: [
        {
          title: "A conjugate pair differs by H⁺, not by OH⁻",
          body: "The conjugate base is what remains after an acid loses a proton. It is never formed by adding \\(\\mathrm{OH^-}\\), and a conjugate acid is never formed by removing \\(\\mathrm{OH^-}\\). Options that describe conjugates in terms of hydroxide ions mix up Brønsted-Lowry with Arrhenius.",
        },
        {
          title: "An acid can act as a base",
          body: "A substance's role depends on its partner. Nitric or ethanoic acid accepts a proton from a much stronger acid, such as sulfuric or perchloric acid, and in that reaction it is the base.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-abp-amphoteric",
      name: "Amphoteric and amphiprotic substances",
      intuition:
        "Some substances can go either way. A species that holds an H it can lose and also has a lone pair to take an H⁺ can donate or accept a proton, depending on what it meets. Water is the everyday example: with an acid it accepts a proton, with a base it gives one.",
      definition:
        "- An **amphoteric** substance can react both as an acid and as a base.\n" +
        "- An **amphiprotic** species can both **donate and accept a proton**. All amphiprotic species are amphoteric.\n" +
        "- Typical amphiprotic species: water, and ions that still carry an acidic H, such as \\(\\mathrm{HCO_3^-}\\), \\(\\mathrm{HPO_4^{2-}}\\) and \\(\\mathrm{H_2PO_4^-}\\).\n" +
        "- Amphoteric oxides and hydroxides: \\(\\mathrm{Al_2O_3}\\), \\(\\mathrm{Al(OH)_3}\\), \\(\\mathrm{ZnO}\\), \\(\\mathrm{Zn(OH)_2}\\). They dissolve in strong acid and in strong alkali.\n" +
        "- **Amino acids** carry an acidic \\(\\mathrm{-COOH}\\) and a basic \\(\\mathrm{-NH_2}\\) group, so they are amphoteric too.",
      table: {
        columns: ["Substance", "Acting as an acid", "Acting as a base"],
        rows: [
          { cells: ["Water", "\\(\\mathrm{H_2O \\rightarrow OH^-}\\) (gives \\(\\mathrm{H^+}\\) to \\(\\mathrm{NH_3}\\))", "\\(\\mathrm{H_2O \\rightarrow H_3O^+}\\) (takes \\(\\mathrm{H^+}\\) from \\(\\mathrm{HCl}\\))"] },
          { cells: ["Hydrogencarbonate ion", "\\(\\mathrm{HCO_3^- \\rightarrow CO_3^{2-}}\\)", "\\(\\mathrm{HCO_3^- \\rightarrow H_2CO_3}\\)"] },
          { cells: ["Aluminium hydroxide", "\\(\\mathrm{Al(OH)_3 + OH^- \\rightarrow [Al(OH)_4]^-}\\)", "\\(\\mathrm{Al(OH)_3 + 3H^+ \\rightarrow Al^{3+} + 3H_2O}\\)"] },
          { cells: ["Amino acid (glycine)", "\\(\\mathrm{-COOH \\rightarrow -COO^-}\\)", "\\(\\mathrm{-NH_2 \\rightarrow -NH_3^+}\\)"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which species can act both as a Brønsted-Lowry acid and as a Brønsted-Lowry base?",
        options: [
          "\\(\\mathrm{HPO_4^{2-}}\\)",
          "\\(\\mathrm{Cl^-}\\)",
          "\\(\\mathrm{NH_4^+}\\)",
          "\\(\\mathrm{CO_3^{2-}}\\)",
          "\\(\\mathrm{H_3O^+}\\)",
        ],
        steps: [
          "\\(\\mathrm{HPO_4^{2-}}\\) can lose \\(\\mathrm{H^+}\\) (to \\(\\mathrm{PO_4^{3-}}\\)) and gain \\(\\mathrm{H^+}\\) (to \\(\\mathrm{H_2PO_4^-}\\)), so it is amphiprotic.",
          "\\(\\mathrm{CO_3^{2-}}\\) has no H to give, so it can only be a base. \\(\\mathrm{NH_4^+}\\) and \\(\\mathrm{H_3O^+}\\) have no lone pair free to take another proton, so they are only acids.",
          "\\(\\mathrm{Cl^-}\\) is the conjugate base of a strong acid and does not take protons in water.",
        ],
        answer: "(A) \\(\\mathrm{HPO_4^{2-}}\\)",
      },
      practiceSet: [
        { prompt: "Is \\(\\mathrm{HCO_3^-}\\) amphiprotic?", answer: "Yes", method: "It can become \\(\\mathrm{CO_3^{2-}}\\) or \\(\\mathrm{H_2CO_3}\\)" },
        { prompt: "Name an oxide that dissolves in both hydrochloric acid and sodium hydroxide solution.", answer: "\\(\\mathrm{Al_2O_3}\\) or \\(\\mathrm{ZnO}\\)", method: "Amphoteric oxides" },
        { prompt: "Which group of an amino acid lets it act as a base?", answer: "The amino group, \\(\\mathrm{-NH_2}\\)", method: "Its lone pair accepts \\(\\mathrm{H^+}\\)" },
      ],
      traps: [
        {
          title: "Amphoteric does not mean neutral",
          body: "An amphoteric substance reacts with acids AND with bases. That says nothing about the pH of its own solution: \\(\\mathrm{NaHCO_3}\\) solution is slightly basic, \\(\\mathrm{NaH_2PO_4}\\) solution slightly acidic. Do not pick pH 7 just because a species is amphoteric.",
        },
      ],
    },
  ],
};
