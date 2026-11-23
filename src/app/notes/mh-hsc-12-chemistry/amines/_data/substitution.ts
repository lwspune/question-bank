import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_AM_SUBSTITUTION_NOTE: SubtopicNote = {
  subtopicName: "Electrophilic Aromatic Substitution in Aromatic Amines",
  title: "Substitution in the Ring of Aniline",
  oneLineDefinition:
    "Why the amino group makes aniline so reactive towards bromination, nitration and sulfonation, and how protecting it as acetanilide gives a single para product.",
  whyItMatters:
    "2 questions, both from the textbook: the scheme for preparing p-bromoaniline from aniline (a solved problem), and converting aniline into p-nitroaniline and into sulphanilic acid. No board paper in this bank asked this page on its own, but the board's 2024 and 2026 questions on the zwitter ion of sulfanilic acid come from its sulfonation.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccam-bromination",
      name: "Bromination and protecting the amino group",
      intuition:
        "The lone pair on nitrogen feeds electrons into the ring, so aniline reacts with bromine water at once and at all three ortho and para positions. To get just one bromine atom in, you first tie up that lone pair by turning \\(\\text{-NH}_2\\) into an acetylamino group. The ring is then calmer, bromine goes in once at the para position, and you take the acetyl group off again at the end.",
      definition:
        "- The amino group is **ortho and para directing** and a **powerful ring activating** group, so aromatic amines readily undergo electrophilic substitution.\n" +
        "- **Bromination:** aniline with bromine water at room temperature gives a **white precipitate of 2,4,6-tribromoaniline**.\n" +
        "- **Protection:** acetylation of aniline gives acetanilide. In acetanilide the lone pair on N is also in resonance with the acetyl group, so ring activation decreases.\n" +
        "- So acetanilide on bromination (Br₂ in acetic acid) gives the monobromo product, p-bromoacetanilide.\n" +
        "- Acid catalysed hydrolysis then removes the acetyl group and gives back \\(\\text{-NH}_2\\): p-bromoaniline.\n" +
        "- Scheme: aniline \\(\\xrightarrow{\\text{CH}_3\\text{COCl, base}}\\) acetanilide \\(\\xrightarrow{\\text{Br}_2,\\ \\text{acetic acid}}\\) p-bromoacetanilide \\(\\xrightarrow{\\text{H}^+,\\ \\text{hydrolysis}}\\) p-bromoaniline.",
      formula: {
        label: "Bromination of aniline",
        latex: "\\text{C}_6\\text{H}_5\\text{NH}_2 + 3\\text{Br}_2\\ (\\text{aq}) \\rightarrow \\text{C}_6\\text{H}_2\\text{Br}_3\\text{NH}_2\\ (2,4,6\\text{-tribromoaniline}) + 3\\text{HBr}",
      },
      authoredExample: {
        prompt: "What happens when aniline is treated with bromine water at room temperature? Write the equation and explain the result.",
        steps: [
          "The \\(\\text{-NH}_2\\) group is a powerful ring activator and directs to the ortho and para positions.",
          "So all three of those positions (2, 4 and 6) are brominated at once:",
          "\\(\\text{C}_6\\text{H}_5\\text{NH}_2 + 3\\text{Br}_2 \\rightarrow \\text{C}_6\\text{H}_2\\text{Br}_3\\text{NH}_2 + 3\\text{HBr}\\)",
          "Observation: a white precipitate.",
        ],
        answer: "A white precipitate of 2,4,6-tribromoaniline",
      },
      selfCheckExample: {
        prompt: "How many moles of bromine react with one mole of aniline in bromine water, and how many moles of HBr form?",
        steps: [
          "Three ring hydrogen atoms (at 2, 4 and 6) are replaced by Br.",
          "Each substitution uses one \\(\\text{Br}_2\\) and releases one HBr.",
        ],
        answer: "3 mol of Br₂ react and 3 mol of HBr form",
      },
      practiceSet: [
        { prompt: "Is the amino group ortho and para directing or meta directing?", answer: "Ortho and para directing" },
        { prompt: "What colour is the precipitate of 2,4,6-tribromoaniline?", answer: "White" },
        { prompt: "Name the compound formed when aniline is acetylated.", answer: "Acetanilide" },
        { prompt: "How is the acetyl group removed after substitution?", answer: "By acid catalysed hydrolysis" },
      ],
      pyqExampleId: "58a903c0-a5cc-4c1e-98b8-ebde0dd60042",
      traps: [
        {
          title: "Expecting a monobromo product from aniline",
          body: "Bromine water with aniline gives 2,4,6-tribromoaniline, not p-bromoaniline. A single bromine needs the protection, bromination and hydrolysis route.",
        },
        {
          title: "Forgetting to take the protection off",
          body: "Bromination of acetanilide gives p-bromoacetanilide. The scheme for p-bromoaniline is not complete until the hydrolysis step is written.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccam-nitration-sulfonation",
      name: "Nitration and sulfonation",
      intuition:
        "Nitration is done in strong acid, and strong acid protonates the amino group. The \\(\\text{-NH}_3^+\\) group it becomes pulls electrons out of the ring and sends the nitro group to the meta position, so direct nitration gives a lot of m-nitroaniline. Protecting the amino group as acetanilide stops this. Sulfonation starts by forming a salt too, but heating it gives sulfanilic acid, which carries an acid and a base in one molecule.",
      definition:
        "- **Direct nitration** of aniline (conc. HNO₃ + conc. H₂SO₄ at 288 K) gives a mixture: p-nitroaniline 51%, m-nitroaniline 47%, o-nitroaniline 2%.\n" +
        "- Reason: in the acidic medium \\(\\text{-NH}_2\\) is protonated to \\(\\text{-NH}_3^+\\), which is **meta directing and deactivating**, so a considerable amount of m-nitroaniline forms.\n" +
        "- **For p-nitroaniline as the major product:** protect \\(\\text{-NH}_2\\) by acetylation (acetic anhydride, pyridine), nitrate the acetanilide (conc. HNO₃ + conc. H₂SO₄, 288 K) to p-nitroacetanilide, then hydrolyse the amide (\\(\\text{H}^+\\) or \\(\\text{OH}^-\\)).\n" +
        "- **Sulfonation:** aniline with concentrated sulfuric acid forms anilinium hydrogensulfate, which on heating with sulfuric acid at 453 to 473 K gives p-aminobenzenesulfonic acid (**sulfanilic acid**) as the major product.\n" +
        "- Sulfanilic acid exists as a salt called a **dipolar ion or zwitter ion**, \\(^+\\text{H}_3\\text{N-C}_6\\text{H}_4\\text{-SO}_3^-\\), produced by the reaction between the acidic group and the basic group in the same molecule.",
      formula: {
        label: "Sulfonation of aniline",
        latex: "\\text{C}_6\\text{H}_5\\text{NH}_2 \\xrightarrow{\\text{conc. H}_2\\text{SO}_4} \\text{C}_6\\text{H}_5\\text{NH}_3^+\\text{HSO}_4^- \\xrightarrow{453\\text{ to }473\\ \\text{K}} p\\text{-H}_2\\text{N-C}_6\\text{H}_4\\text{-SO}_3\\text{H}",
      },
      authoredExample: {
        prompt: "Direct nitration of aniline gives nearly as much m-nitroaniline as p-nitroaniline, though \\(\\text{-NH}_2\\) is ortho and para directing. Explain.",
        steps: [
          "Nitration is done in conc. HNO₃ and conc. H₂SO₄, a strongly acidic medium.",
          "The basic \\(\\text{-NH}_2\\) group takes a proton and becomes \\(\\text{-NH}_3^+\\), the anilinium ion.",
          "\\(\\text{-NH}_3^+\\) has no lone pair to give the ring; it withdraws electrons, so it is meta directing and deactivating.",
          "Part of the aniline reacts as the anilinium ion, so the product is a mixture: about 51% para, 47% meta and 2% ortho.",
        ],
        answer: "In acid, \\(\\text{-NH}_2\\) becomes the meta directing \\(\\text{-NH}_3^+\\) group",
      },
      selfCheckExample: {
        prompt: "Name the product formed when acetanilide is nitrated with conc. HNO₃ and conc. H₂SO₄ at 288 K, and the product of its hydrolysis.",
        steps: [
          "The acetylamino group is ortho and para directing but only mildly activating, so the nitro group enters para: p-nitroacetanilide.",
          "Hydrolysis of the amide gives back \\(\\text{-NH}_2\\): p-nitroaniline.",
        ],
        answer: "p-Nitroacetanilide, then p-nitroaniline",
      },
      practiceSet: [
        { prompt: "What does the \\(\\text{-NH}_2\\) group become in strongly acidic medium, and how does it direct?", answer: "\\(\\text{-NH}_3^+\\): meta directing and deactivating" },
        { prompt: "What salt forms first when aniline reacts with concentrated sulfuric acid?", answer: "Anilinium hydrogensulfate" },
        { prompt: "At what temperature is anilinium hydrogensulfate heated to give sulfanilic acid?", answer: "453 to 473 K" },
        { prompt: "Why does sulfanilic acid exist as a zwitter ion?", answer: "Its acidic \\(\\text{-SO}_3\\text{H}\\) group protonates its basic \\(\\text{-NH}_2\\) group" },
      ],
      pyqExampleId: "66db32dc-5e7f-4b69-8738-4918e28b37bf",
      traps: [
        {
          title: "Nitrating aniline directly for the para product",
          body: "Direct nitration gives nearly half m-nitroaniline. For p-nitroaniline write all three steps: acetylation, nitration of acetanilide, hydrolysis.",
        },
        {
          title: "Drawing sulfanilic acid without its charges",
          body: "When the zwitter ion is asked for, show \\(^+\\text{H}_3\\text{N-}\\) on one end and \\(\\text{-SO}_3^-\\) on the other, and say the molecule is neutral overall.",
        },
      ],
    },
  ],
};
