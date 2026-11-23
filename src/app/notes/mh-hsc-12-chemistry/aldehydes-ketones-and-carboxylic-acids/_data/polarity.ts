import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_AK_POLARITY_NOTE: SubtopicNote = {
  subtopicName: "Polarity of the Carbonyl Group",
  title: "Polarity and Reactivity of the Carbonyl Group",
  oneLineDefinition:
    "Why the carbonyl carbon is positively polarised and attacked by nucleophiles, and why aldehydes are more reactive than ketones towards nucleophilic addition.",
  whyItMatters:
    "2 questions, both from the textbook exercise: counting the unshared electrons on oxygen in the two resonance structures of the carbonyl group, and explaining why aldehydes are more reactive than ketones towards nucleophilic addition. No board paper has set this page on its own yet, but every reaction on the reactions page starts from it.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccak-carbonyl-polarity",
      name: "The polar carbonyl group",
      intuition:
        "Oxygen is more electronegative than carbon, so it pulls the shared electrons of the C=O bond towards itself. Resonance goes further and moves the whole π pair onto oxygen. Either way the carbon is left short of electrons, and electron-rich reagents, nucleophiles, go for it.",
      definition:
        "- The polarity of the carbonyl group comes from the higher electronegativity of oxygen and from resonance.\n" +
        "- Resonance: \\(\\text{>C=O} \\longleftrightarrow \\text{>}\\overset{+}{\\text{C}}\\text{-}\\overset{-}{\\text{O}}\\). In the first structure oxygen has two lone pairs; in the second it has three and a negative charge.\n" +
        "- The carbonyl carbon is positively polarised, so it is **electron deficient** and **electrophilic**. A nucleophile (Nu:) attacks this carbon.\n" +
        "- This is why the typical reactions of aldehydes and ketones are **nucleophilic addition** reactions.",
      formula: {
        label: "Resonance in the carbonyl group",
        latex: "\\text{>C=O} \\longleftrightarrow \\text{>}\\overset{+}{\\text{C}}\\text{-}\\overset{-}{\\text{O}}",
      },
      authoredExample: {
        prompt: "Write the structure of propanone, show the polarity of its carbonyl group and state which atom a nucleophile attacks.",
        steps: [
          "Propanone: \\(\\text{CH}_3\\text{-CO-CH}_3\\).",
          "Oxygen pulls the electrons of C=O towards itself: \\(\\text{(CH}_3)_2\\overset{\\delta+}{\\text{C}}\\text{=}\\overset{\\delta-}{\\text{O}}\\).",
          "The \\(\\delta+\\) carbonyl carbon is electron deficient, so the nucleophile attacks it.",
        ],
        answer: "The carbonyl carbon (δ+) is attacked; the oxygen carries the partial negative charge",
      },
      selfCheckExample: {
        prompt: "In the C=O bond, which way do the π electrons shift, and what charge does that leave on the carbon?",
        steps: ["Oxygen is the more electronegative atom, so the π electrons move towards it."],
        answer: "Towards oxygen; the carbon becomes positive (δ+)",
      },
      practiceSet: [
        { prompt: "Why is the carbonyl carbon called electrophilic?", answer: "It is electron deficient (positively polarised), so it attracts electron-rich nucleophiles" },
        { prompt: "Is the carbonyl bond ionic, polar covalent or non-polar?", answer: "Polar covalent" },
      ],
      pyqExampleId: "8447214e-5f9d-468f-9080-a49926166bc2",
      traps: [
        {
          title: "The nucleophile going to oxygen",
          body: "A nucleophile seeks a positive centre, so it bonds to the carbonyl carbon. It is an electrophile, such as H⁺, that goes to the oxygen.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccak-reactivity-order",
      name: "Aldehydes against ketones towards nucleophiles",
      intuition:
        "A nucleophile wants a carbon that is as positive and as open as possible. An aldehyde's carbonyl carbon has only one alkyl group pushing electrons into it and only one bulky group in the way. A ketone's has two of each.",
      definition:
        "- **Electronic effect:** alkyl groups are electron donating (+I). The two alkyl groups of a ketone reduce the positive polarity, and so the electrophilicity, of the carbonyl carbon. An aldehyde has only one.\n" +
        "- **Steric effect:** the two bulky alkyl groups of a ketone get in the way of the incoming nucleophile (steric hindrance). The aldehyde's carbonyl carbon carries a small H and is less crowded.\n" +
        "- Hence aldehydes are more reactive than ketones towards nucleophilic addition.\n" +
        "- **Aromatic aldehydes** are less reactive than aliphatic aldehydes: the ring donates electrons by resonance and makes the carbonyl carbon less electrophilic.",
      table: {
        columns: ["Point", "Aldehyde, R-CHO", "Ketone, R-CO-R'"],
        rows: [
          {
            cells: ["Groups on the carbonyl carbon", "One alkyl group and one H", "Two alkyl groups"],
            pyqExampleId: "c826d499-015f-479c-a6ea-f3ec76dc0461",
            noteAmber: "The textbook exercise asks you to explain this; give both the electronic and the steric effect.",
          },
          { cells: ["Electronic effect", "One +I group: the carbon stays more positive", "Two +I groups lower the positive polarity"] },
          { cells: ["Steric effect", "Less crowded: easy approach for the nucleophile", "Two bulky groups hinder the nucleophile"] },
          { cells: ["Towards nucleophilic addition", "More reactive", "Less reactive"] },
        ],
      },
      practiceSet: [
        { prompt: "Arrange methanal, ethanal and propanone in decreasing order of reactivity towards nucleophilic addition.", answer: "Methanal > ethanal > propanone" },
        { prompt: "Why is benzaldehyde less reactive than ethanal towards nucleophiles?", answer: "The ring donates electrons by resonance and makes the carbonyl carbon less electrophilic" },
      ],
      traps: [
        {
          title: "Giving one reason for an 'explain'",
          body: "The full answer has two parts: the electronic (+I) effect and the steric effect. Writing only one of them loses half the marks.",
        },
      ],
    },
  ],
};
