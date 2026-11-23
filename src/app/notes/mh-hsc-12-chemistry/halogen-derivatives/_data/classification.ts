import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_HD_CLASSIFICATION_NOTE: SubtopicNote = {
  subtopicName: "Classification of Halogen Derivatives",
  title: "Classifying Halogen Derivatives",
  oneLineDefinition:
    "How halogen derivatives are sorted by the kind of carbon the halogen is joined to: alkyl, allylic, benzylic, vinylic, haloalkyne and aryl, and why a halogen on an sp² carbon holds on more tightly.",
  whyItMatters:
    "6 questions. Three were set in board papers: pick out the allylic halide (2023), the vinylic halide (2024) and the benzylic halide (2024) from four structures. The textbook adds a match-the-pairs and two questions on the resonance of a vinyl halide.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscchd-classes",
      name: "The classes of monohalogen compounds",
      intuition:
        "To name the class, look only at the carbon that holds the halogen. Ask two things: is it sp³, sp² or sp, and what is it next to? A halogen on a saturated carbon in a chain is an alkyl halide. Put a double bond or a benzene ring one carbon away and it becomes allylic or benzylic. Put the halogen right on the double bond or on the ring and it becomes vinylic or aryl.",
      definition:
        "- By the hydrocarbon skeleton, halogen derivatives are **haloalkanes, haloalkenes, haloalkynes and haloarenes**. By the number of halogen atoms they are mono, di, tri and poly halogen compounds.\n" +
        "- Monohalogen compounds are further classified by the **position of the halogen** and the **hybridisation of the carbon** it is bonded to.\n" +
        "- An alkyl halide is **primary, secondary or tertiary** according to whether the carbon carrying the halogen is joined to one, two or three other carbons: \\(\\text{R-CH}_2\\text{-X}\\), \\(\\text{R}_2\\text{CH-X}\\), \\(\\text{R}_3\\text{C-X}\\).\n" +
        "- **Allylic** and **benzylic** halides have the halogen on an sp³ carbon; **vinylic** and **aryl** halides have it on an sp² carbon; a **haloalkyne** has it on an sp carbon.",
      table: {
        columns: ["Class", "Halogen is bonded to", "Example"],
        rows: [
          {
            cells: ["Alkyl halide (haloalkane)", "an sp³ carbon of a saturated carbon skeleton", "\\(\\text{CH}_3\\text{CH}_2\\text{Br}\\) (primary), \\((\\text{CH}_3)_3\\text{C-Br}\\) (tertiary)"],
          },
          {
            cells: ["Allylic halide", "an sp³ carbon next to a carbon-carbon double bond", "\\(\\text{CH}_2\\text{=CH-CH}_2\\text{-X}\\)"],
            pyqExampleId: "01f5d23d-e2d5-4650-92ce-4a86684cc6a4",
            noteAmber: "Board 2023 asked you to pick the allylic halide from four structures.",
          },
          {
            cells: ["Benzylic halide", "an sp³ carbon which is itself bonded to an aromatic ring", "\\(\\text{C}_6\\text{H}_5\\text{-CH}_2\\text{-X}\\)"],
            pyqExampleId: "eea2d141-f80c-43af-b977-70ac4556f446",
            noteAmber: "Board 2024 asked you to pick the benzylic halide from four drawn structures.",
          },
          { cells: ["Vinylic halide (a haloalkene)", "an sp² carbon of a double bond in an aliphatic chain", "\\(\\text{CH}_2\\text{=CH-X}\\)"] },
          { cells: ["Haloalkyne", "an sp carbon of a triple bond", "\\(\\text{HC}\\equiv\\text{C-X}\\)"] },
          { cells: ["Aryl halide (haloarene)", "an sp² carbon of an aromatic ring", "\\(\\text{C}_6\\text{H}_5\\text{-X}\\)"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Name the class of each: (i) \\((\\text{CH}_3)_2\\text{CH-Cl}\\), (ii) \\(\\text{C}_6\\text{H}_5\\text{-CH}_2\\text{Br}\\), (iii) \\(\\text{HC}\\equiv\\text{C-Cl}\\).",
        steps: [
          "(i) The chlorine is on an sp³ carbon joined to two other carbons: a secondary alkyl halide.",
          "(ii) The bromine is on the sp³ \\(\\text{CH}_2\\) carbon attached to the ring: a benzylic halide.",
          "(iii) The chlorine is on an sp carbon of a triple bond: a haloalkyne.",
        ],
        answer: "Secondary alkyl halide; benzylic halide; haloalkyne",
      },
      practiceSet: [
        { prompt: "What is the hybridisation of the carbon carrying the halogen in an allylic halide?", answer: "sp³" },
        { prompt: "Bromobenzene and benzyl bromide both contain a benzene ring. Which one is the aryl halide?", answer: "Bromobenzene: its bromine is on a ring carbon. Benzyl bromide is benzylic" },
        { prompt: "Is 2-bromo-2-methylpropane a primary, secondary or tertiary halide?", answer: "Tertiary: the carbon carrying bromine is joined to three other carbons" },
        { prompt: "Name the class of \\(\\text{CH}_2\\text{=CH-CH}_2\\text{-I}\\).", answer: "Allylic halide" },
      ],
      pyqExampleId: "aa494b90-e223-454a-b872-09ba2f53b76f",
      traps: [
        {
          title: "Allylic is next to the double bond, vinylic is on it",
          body: "In \\(\\text{CH}_2\\text{=CH-CH}_2\\text{-X}\\) the halogen is one carbon away from the double bond, so it is allylic. In \\(\\text{CH}_2\\text{=CH-X}\\) it sits on a doubly bonded carbon, so it is vinylic. Check which carbon carries the halogen before you answer.",
        },
        {
          title: "Benzylic is not aryl",
          body: "A halogen on a ring carbon makes an aryl halide, even if the ring also carries a methyl group. Only a halogen on the sp³ carbon attached to the ring makes a benzylic halide.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscchd-sp2-halides",
      name: "A halogen on an sp² carbon: the shorter C-X bond",
      intuition:
        "When the halogen sits right on a double bond or a benzene ring, one of its lone pairs can spread into the pi electrons next door. The carbon-halogen bond then behaves partly like a double bond, so it becomes shorter and stronger, and the halogen is much harder to pull off. That one idea explains why vinyl and aryl halides are so unreactive.",
      definition:
        "- **Resonance effect:** one lone pair on the halogen is in conjugation with the pi electrons. Resonance structures can be drawn with a carbon-halogen double bond, so the C-X bond gets **partial double bond character**.\n" +
        "- **sp² state of carbon:** the carbon holding the halogen is sp² hybridised, not sp³ as in a haloalkane.\n" +
        "- Result: the C-X bond is **shorter and stronger**. The book's figures: C-Cl is **169 pm** in chlorobenzene against **178 pm** in an alkyl chloride.\n" +
        "- In an allylic or benzylic halide the halogen is on an sp³ carbon, one carbon away from the pi system, so this resonance is not possible.\n" +
        "- The same resonance puts more electron density at the **ortho and para** positions of a haloarene, which is why its electrophilic substitution goes ortho and para (see the substitution page).",
      authoredExample: {
        prompt: "Explain why the C-Cl bond in chlorobenzene is shorter than the C-Cl bond in chloromethane.",
        steps: [
          "In chlorobenzene one lone pair on chlorine is in conjugation with the pi electrons of the ring.",
          "Resonance structures can be drawn in which the carbon-chlorine bond is a double bond, so the real bond has partial double bond character.",
          "The carbon holding chlorine is sp² hybridised in chlorobenzene but sp³ in chloromethane.",
          "So the bond in chlorobenzene is shorter and stronger: 169 pm against 178 pm in an alkyl chloride.",
        ],
        answer: "Partial double bond character from resonance and the sp² carbon make it shorter (169 pm against 178 pm)",
      },
      selfCheckExample: {
        prompt:
          "In which of \\(\\text{CH}_2\\text{=CH-CH}_2\\text{-Cl}\\) and \\(\\text{CH}_2\\text{=CH-Cl}\\) can a lone pair of chlorine come into conjugation with the double bond? Give the reason.",
        steps: [
          "In \\(\\text{CH}_2\\text{=CH-Cl}\\) the chlorine is on a doubly bonded carbon, right beside the pi bond, so its lone pair can conjugate.",
          "In \\(\\text{CH}_2\\text{=CH-CH}_2\\text{-Cl}\\) an sp³ \\(\\text{CH}_2\\) group lies between chlorine and the double bond, so no conjugation is possible.",
        ],
        answer: "Only in vinyl chloride, \\(\\text{CH}_2\\text{=CH-Cl}\\)",
      },
      practiceSet: [
        { prompt: "What is the hybridisation of the carbon carrying the halogen in a haloarene?", answer: "sp²" },
        { prompt: "Give the C-Cl bond lengths in chlorobenzene and in an alkyl chloride.", answer: "169 pm in chlorobenzene, 178 pm in an alkyl chloride" },
        { prompt: "Name the two reasons the textbook gives for the low reactivity of aryl halides.", answer: "The resonance effect and the sp² hybrid state of the carbon" },
      ],
      pyqExampleId: "f78b58a2-ba1c-45e2-bb45-9183d5181a39",
      traps: [
        {
          title: "Name the partial double bond character",
          body: "Writing only 'the bond is stronger due to resonance' loses a mark. Say that a lone pair of the halogen is in conjugation with the pi electrons, so the C-X bond gets partial double bond character and becomes shorter.",
        },
        {
          title: "Shorter bond, not longer",
          body: "Partial double bond character shortens the bond. A vinyl or aryl C-X bond is shorter than the alkyl one, never longer.",
        },
      ],
    },
  ],
};
