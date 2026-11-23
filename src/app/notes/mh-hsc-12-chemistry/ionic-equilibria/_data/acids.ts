import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_IE_ACIDS_NOTE: SubtopicNote = {
  subtopicName: "Acids and Bases",
  title: "Acids and Bases: Three Theories and Conjugate Pairs",
  oneLineDefinition:
    "The Arrhenius, Bronsted-Lowry and Lewis definitions of acids and bases, conjugate acid-base pairs, and why water can act as both an acid and a base.",
  whyItMatters:
    "10 questions, three of them from board papers: define acids and bases by the Bronsted-Lowry theory (2024), define a conjugate acid-base pair (2025) and explain the amphoteric nature of water (2026). The textbook adds the Arrhenius and Lewis theories, why cations are Lewis acids, labelling conjugate pairs and a reaction in which water acts as a base.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccie-theories",
      name: "Arrhenius, Bronsted-Lowry and Lewis theories",
      intuition:
        "Each theory widens the one before it. Arrhenius looked only at water: an acid gives H⁺ ions and a base gives OH⁻ ions. Bronsted and Lowry looked at the proton itself: an acid gives a proton away and a base takes it, in water or not. Lewis looked at the electron pair that forms the new bond: the base donates a share in the pair and the acid accepts it.",
      definition:
        "- **Arrhenius theory:** an acid is a substance that contains hydrogen and gives rise to \\(\\text{H}^+\\) ions in aqueous solution, for example \\(\\text{HCl} \\xrightarrow{\\text{water}} \\text{H}^+ + \\text{Cl}^-\\). A base contains the OH group and produces \\(\\text{OH}^-\\) ions in aqueous solution, for example \\(\\text{NaOH} \\rightarrow \\text{Na}^+ + \\text{OH}^-\\).\n" +
        "- Limits of the Arrhenius theory: it applies only to aqueous solutions, and it cannot explain the basicity of \\(\\text{NH}_3\\) and \\(\\text{Na}_2\\text{CO}_3\\), which have no OH group.\n" +
        "- **Bronsted-Lowry theory (1923):** an acid is a substance that **donates a proton** (\\(\\text{H}^+\\)) to another substance; a base is a substance that **accepts a proton** from another substance. Example: \\(\\text{HCl} + \\text{NH}_3 \\rightleftharpoons \\text{NH}_4^+ + \\text{Cl}^-\\).\n" +
        "- **Lewis theory (G.N. Lewis, 1923):** an acid is any species that **accepts a share in an electron pair**; a base is any species that **donates a share in an electron pair**. Examples: \\(\\text{H}^+ + :\\text{NH}_3 \\rightarrow \\text{NH}_4^+\\) and \\(\\text{BF}_3 + :\\text{NH}_3 \\rightarrow \\text{F}_3\\text{B} \\leftarrow \\text{NH}_3\\).\n" +
        "- A cation is electron deficient, so it can accept a share in a lone pair: every cation is a Lewis acid. \\(\\text{AlCl}_3\\), like \\(\\text{BF}_3\\), has an incomplete octet and is a Lewis acid.",
      table: {
        columns: ["Theory", "Acid", "Base", "Example"],
        rows: [
          {
            cells: [
              "Arrhenius",
              "Contains H and gives H⁺ ions in water",
              "Contains OH and gives OH⁻ ions in water",
              "\\(\\text{HCl} \\rightarrow \\text{H}^+ + \\text{Cl}^-\\)",
            ],
            pyqExampleId: "c51dc46f-d680-40e7-aa11-0e24f95058e3",
          },
          {
            cells: [
              "Bronsted-Lowry",
              "Proton donor",
              "Proton acceptor",
              "\\(\\text{HCl} + \\text{NH}_3 \\rightleftharpoons \\text{NH}_4^+ + \\text{Cl}^-\\)",
            ],
            pyqExampleId: "62680fa8-73ab-4920-89a7-6970c77d6298",
            noteAmber: "Board 2024 asked for both Bronsted-Lowry definitions, together with the derivation of pH + pOH = 14.",
          },
          {
            cells: [
              "Lewis",
              "Accepts a share in an electron pair",
              "Donates a share in an electron pair",
              "\\(\\text{BF}_3 + \\text{NH}_3 \\rightarrow \\text{F}_3\\text{B} \\leftarrow \\text{NH}_3\\)",
            ],
            pyqExampleId: "1f8ec24b-5b7f-478d-8e6e-24c71c611ac6",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Why is \\(\\text{BF}_3\\) a Lewis acid even though it is not an Arrhenius acid?",
        steps: [
          "\\(\\text{BF}_3\\) has no hydrogen, so it cannot give \\(\\text{H}^+\\) ions in water: it is not an Arrhenius acid.",
          "Boron has only six electrons around it after forming three bonds, so it can accept a share in a lone pair, for example from \\(\\text{NH}_3\\).",
        ],
        answer: "It accepts a share in an electron pair, which is the Lewis definition of an acid",
      },
      practiceSet: [
        { prompt: "Name a base whose basicity the Arrhenius theory cannot explain.", answer: "\\(\\text{NH}_3\\) (or \\(\\text{Na}_2\\text{CO}_3\\)): it has no OH group" },
        { prompt: "Is the \\(\\text{Fe}^{3+}\\) ion a Lewis acid or a Lewis base?", answer: "A Lewis acid: a cation can accept a share in an electron pair" },
        { prompt: "In \\(\\text{HCl} + \\text{NH}_3 \\rightleftharpoons \\text{NH}_4^+ + \\text{Cl}^-\\), which reactant is the Bronsted acid?", answer: "HCl, because it donates the proton" },
        { prompt: "Why is every Bronsted base also a Lewis base?", answer: "To accept a proton it must donate a lone pair to it, which makes it an electron-pair donor" },
      ],
      traps: [
        {
          title: "Swapping donor and acceptor in the Lewis theory",
          body: "A Lewis acid ACCEPTS a share in an electron pair; a Lewis base DONATES it. In Bronsted-Lowry the acid donates a proton. Students mix the two because the acid 'donates' in one and 'accepts' in the other.",
        },
        {
          title: "Leaving out 'in aqueous solution'",
          body: "The Arrhenius definitions hold only in water. A definition without 'in aqueous solution' loses the mark, and that phrase is also the theory's main limitation.",
        },
      ],
      pyqExampleId: "62680fa8-73ab-4920-89a7-6970c77d6298",
    },
    {
      kind: "formula" as const,
      slug: "hsccie-conjugate",
      name: "Conjugate acid-base pairs",
      intuition:
        "When an acid gives away a proton, what is left behind can take a proton back, so it is a base. That leftover is the acid's conjugate base. In the same way, a base that has taken a proton becomes an acid, its conjugate acid. The two members of a pair always differ by exactly one proton.",
      definition:
        "- The base produced when an acid releases a proton is the **conjugate base** of that acid.\n" +
        "- The acid produced when a base accepts a proton is the **conjugate acid** of that base.\n" +
        "- A pair of an acid and a base **differing by one proton** is a **conjugate acid-base pair**.\n" +
        "- Every Bronsted-Lowry reaction has two pairs. Label them acid₁/base₁ and acid₂/base₂: \\(\\underset{\\text{acid}_1}{\\text{HCl}} + \\underset{\\text{base}_2}{\\text{H}_2\\text{O}} \\rightleftharpoons \\underset{\\text{acid}_2}{\\text{H}_3\\text{O}^+} + \\underset{\\text{base}_1}{\\text{Cl}^-}\\).",
      formula: {
        label: "Conjugate pair",
        latex: "\\text{acid} \\rightleftharpoons \\text{conjugate base} + \\text{H}^+",
      },
      authoredExample: {
        prompt:
          "Label the acids, bases and the two conjugate acid-base pairs in \\(\\text{NH}_3 + \\text{H}_2\\text{O} \\rightleftharpoons \\text{NH}_4^+ + \\text{OH}^-\\).",
        steps: [
          "\\(\\text{NH}_3\\) accepts a proton and becomes \\(\\text{NH}_4^+\\): \\(\\text{NH}_3\\) is base₁ and \\(\\text{NH}_4^+\\) is acid₁.",
          "\\(\\text{H}_2\\text{O}\\) donates a proton and becomes \\(\\text{OH}^-\\): \\(\\text{H}_2\\text{O}\\) is acid₂ and \\(\\text{OH}^-\\) is base₂.",
          "Each pair differs by one proton.",
        ],
        answer: "Pairs: \\(\\text{NH}_4^+ / \\text{NH}_3\\) and \\(\\text{H}_2\\text{O} / \\text{OH}^-\\)",
      },
      selfCheckExample: {
        prompt: "Write the conjugate base and the conjugate acid of \\(\\text{HCO}_3^-\\).",
        steps: [
          "Remove one proton: \\(\\text{HCO}_3^- \\rightarrow \\text{CO}_3^{2-}\\).",
          "Add one proton: \\(\\text{HCO}_3^- \\rightarrow \\text{H}_2\\text{CO}_3\\).",
        ],
        answer: "Conjugate base \\(\\text{CO}_3^{2-}\\); conjugate acid \\(\\text{H}_2\\text{CO}_3\\)",
      },
      practiceSet: [
        { prompt: "What is the conjugate base of \\(\\text{H}_2\\text{SO}_4\\)?", answer: "\\(\\text{HSO}_4^-\\)" },
        { prompt: "What is the conjugate acid of \\(\\text{NH}_3\\)?", answer: "\\(\\text{NH}_4^+\\)" },
        { prompt: "Write the conjugate base of \\([\\text{Al(H}_2\\text{O)}_6]^{3+}\\).", answer: "\\([\\text{Al(H}_2\\text{O)}_5\\text{OH}]^{2+}\\): one coordinated water loses a proton and the charge falls by one" },
      ],
      pyqExampleId: "f2d5caf8-6172-4110-93e1-5889b4b359f9",
      traps: [
        {
          title: "Members that differ by two protons",
          body: "\\(\\text{H}_2\\text{CO}_3\\) and \\(\\text{CO}_3^{2-}\\) are NOT a conjugate pair: they differ by two protons. A conjugate pair differs by exactly one.",
        },
        {
          title: "Removing a whole water molecule instead of a proton",
          body: "To get the conjugate base of a hydrated ion, take one \\(\\text{H}^+\\) from one coordinated water, which becomes OH, and lower the charge by one. Removing a whole \\(\\text{H}_2\\text{O}\\) leaves the charge unchanged and is wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccie-amphoteric",
      name: "Amphoteric nature of water",
      intuition:
        "Water is not fixed as an acid or a base. Put it beside a substance that wants a proton more, and water gives one up. Put it beside a substance that gives protons away more easily, and water takes one. Its role depends on its partner.",
      definition:
        "- The ability of water to act as an acid as well as a base is called its **amphoteric nature**.\n" +
        "- Water acts as an **acid towards \\(\\text{NH}_3\\)**: \\(\\text{H}_2\\text{O} + \\text{NH}_3 \\rightleftharpoons \\text{OH}^- + \\text{NH}_4^+\\).\n" +
        "- Water acts as a **base towards HCl**: \\(\\text{H}_2\\text{O} + \\text{HCl} \\rightleftharpoons \\text{H}_3\\text{O}^+ + \\text{Cl}^-\\).\n" +
        "- In pure water, one molecule acts as an acid and another as a base (autoionisation): \\(\\text{H}_2\\text{O} + \\text{H}_2\\text{O} \\rightleftharpoons \\text{H}_3\\text{O}^+ + \\text{OH}^-\\).",
      authoredExample: {
        prompt:
          "State whether water acts as an acid or a base in each reaction, with a reason: (a) \\(\\text{CH}_3\\text{COO}^- + \\text{H}_2\\text{O} \\rightleftharpoons \\text{CH}_3\\text{COOH} + \\text{OH}^-\\); (b) \\(\\text{HNO}_3 + \\text{H}_2\\text{O} \\rightarrow \\text{H}_3\\text{O}^+ + \\text{NO}_3^-\\).",
        steps: [
          "(a) Water gives a proton to \\(\\text{CH}_3\\text{COO}^-\\) and is left as \\(\\text{OH}^-\\): it is a proton donor, an acid.",
          "(b) Water takes a proton from \\(\\text{HNO}_3\\) and becomes \\(\\text{H}_3\\text{O}^+\\): it is a proton acceptor, a base.",
        ],
        answer: "(a) acid; (b) base",
      },
      selfCheckExample: {
        prompt: "Name the two conjugate acid-base pairs in the autoionisation of water, \\(\\text{H}_2\\text{O} + \\text{H}_2\\text{O} \\rightleftharpoons \\text{H}_3\\text{O}^+ + \\text{OH}^-\\).",
        steps: ["The molecule that donates a proton becomes \\(\\text{OH}^-\\).", "The molecule that accepts a proton becomes \\(\\text{H}_3\\text{O}^+\\)."],
        answer: "\\(\\text{H}_2\\text{O} / \\text{OH}^-\\) and \\(\\text{H}_3\\text{O}^+ / \\text{H}_2\\text{O}\\)",
      },
      practiceSet: [
        { prompt: "Which ion does water form when it acts as a base?", answer: "The hydronium ion, \\(\\text{H}_3\\text{O}^+\\)" },
        { prompt: "Which ion does water form when it acts as an acid?", answer: "The hydroxide ion, \\(\\text{OH}^-\\)" },
        { prompt: "Towards \\(\\text{NH}_3\\), does water act as an acid or a base?", answer: "As an acid: it donates a proton to \\(\\text{NH}_3\\)" },
      ],
      pyqExampleId: "365e333b-845e-40e0-8183-8fa1784761f0",
      traps: [
        {
          title: "Giving only one reaction",
          body: "'Amphoteric' means both roles. An answer with only the HCl reaction shows water as a base and nothing more; write one reaction for each role and name the role under each.",
        },
      ],
    },
  ],
};
