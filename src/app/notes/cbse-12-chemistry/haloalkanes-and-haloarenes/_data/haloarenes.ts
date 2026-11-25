import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_HA_HALOARENES_NOTE: SubtopicNote = {
  subtopicName: "Preparation of Haloarenes",
  title: "Preparation of Haloarenes",
  oneLineDefinition:
    "Aryl halides by electrophilic substitution of arenes with chlorine or bromine and a Lewis acid catalyst, and from aromatic amines through diazonium salts (Sandmeyer's reaction).",
  whyItMatters:
    "1 question, from the 2023 board paper: which species attacks benzene when it is chlorinated with AlCl₃. The page is small, but its two methods are how a conversion such as aniline to chlorobenzene or benzene to bromobenzene is answered on the reactions page.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcha-arene-prep",
      name: "Ring halogenation and Sandmeyer's reaction",
      intuition:
        "A benzene ring is rich in electrons, so it is attacked by a positive species, not by a halogen molecule itself. A Lewis acid such as FeCl₃ pulls the halogen molecule apart to make that positive species. The other route starts from aniline: turn the -NH₂ into a diazonium group, then let a copper(I) halide replace it.",
      definition:
        "- **Electrophilic substitution:** aryl chlorides and bromides are made from arenes with **chlorine or bromine and a Lewis acid catalyst** such as iron or iron(III) chloride, in the dark.\n" +
        "- The Lewis acid produces the electrophile (Cl⁺ or Br⁺), which attacks the ring; loss of H⁺ restores the ring.\n" +
        "- From toluene the ortho and para isomers form; they are easily separated because their melting points differ widely.\n" +
        "- **Iodination** is reversible and needs an oxidising agent (HNO₃ or HIO₄) to oxidise the HI formed.\n" +
        "- **Fluoro compounds** are not made this way: fluorine is too reactive.\n" +
        "- **Sandmeyer's reaction:** a primary aromatic amine in cold aqueous mineral acid with NaNO₂ gives a diazonium salt; mixing it with **cuprous chloride or cuprous bromide** replaces the diazonium group by -Cl or -Br.\n" +
        "- For an aryl iodide no cuprous halide is needed: the diazonium salt is simply shaken with **potassium iodide**.",
      formula: {
        label: "Ring halogenation of an arene",
        latex: "\\text{C}_6\\text{H}_6 + \\text{Cl}_2 \\xrightarrow{\\text{Fe or FeCl}_3,\\ \\text{dark}} \\text{C}_6\\text{H}_5\\text{Cl} + \\text{HCl}",
      },
      authoredExample: {
        prompt: "Convert aniline into chlorobenzene. Name the reaction.",
        steps: [
          "Diazotise: aniline in cold dilute HCl with NaNO₂ gives benzenediazonium chloride.",
          "\\(\\text{C}_6\\text{H}_5\\text{NH}_2 + \\text{NaNO}_2 + 2\\text{HCl} \\xrightarrow{\\text{cold}} \\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^- + \\text{NaCl} + 2\\text{H}_2\\text{O}\\)",
          "Replace the diazonium group with cuprous chloride.",
          "\\(\\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^- \\xrightarrow{\\text{Cu}_2\\text{Cl}_2} \\text{C}_6\\text{H}_5\\text{Cl} + \\text{N}_2\\)",
        ],
        answer: "Diazotisation, then Sandmeyer's reaction with cuprous chloride gives chlorobenzene",
      },
      selfCheckExample: {
        prompt: "Toluene is treated with bromine in the presence of iron in the dark. Name the products and say how they are separated.",
        steps: [
          "A Lewis acid in the dark means substitution on the ring.",
          "The CH₃ group sends the bromine to the ortho and para positions.",
          "The two isomers have very different melting points, so they are easily separated.",
        ],
        answer: "o-Bromotoluene and p-bromotoluene, separated by the difference in their melting points",
      },
      practiceSet: [
        { prompt: "Why is iodination of benzene carried out with an oxidising agent such as HNO₃?", answer: "The reaction is reversible; the oxidising agent removes the HI formed by oxidising it" },
        { prompt: "How is iodobenzene made from benzenediazonium chloride?", answer: "By shaking the diazonium salt with potassium iodide; no cuprous halide is needed" },
        { prompt: "Why is fluorobenzene not made by direct fluorination of benzene?", answer: "Fluorine is too reactive" },
      ],
      pyqExampleId: "55ae9742-956e-40a3-b526-704a732859bc",
      traps: [
        {
          title: "Light instead of a Lewis acid",
          body: "Halogen with a Lewis acid in the dark substitutes the RING. Halogen with UV light or heat attacks a side chain. The condition over the arrow decides which product you write.",
        },
        {
          title: "Naming the wrong attacking species",
          body: "The ring attacks an electrophile, so the attacking species is positive (Cl⁺). Cl⁻ and AlCl₄⁻ are negative and only take part after the attack.",
        },
      ],
    },
  ],
};
