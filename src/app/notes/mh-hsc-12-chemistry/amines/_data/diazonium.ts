import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_AM_DIAZONIUM_NOTE: SubtopicNote = {
  subtopicName: "Arene Diazonium Salts",
  title: "Reactions of Arene Diazonium Salts",
  oneLineDefinition:
    "The two kinds of reaction of arene diazonium salts: replacing the diazo group by Cl, Br, CN, I, H, OH, F or NO₂, and keeping it in azo coupling to make coloured azo dyes.",
  whyItMatters:
    "5 questions. Two were set in board papers, both in 2026: converting benzenediazonium chloride into benzene, and its coupling with phenol in alkaline medium (asked together with the zwitter ion of sulfanilic acid). The textbook adds the reaction with ethanol, a note on coupling reactions, and which compound contains the azo linkage.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccam-displacement",
      name: "Replacing the diazo group",
      intuition:
        "The \\(\\text{-N}_2^+\\) group is desperate to leave as nitrogen gas, one of the most stable molecules there is. So almost anything that can attack the ring carbon can push it out and take its place. One salt, benzenediazonium chloride, can therefore be turned into chlorobenzene, bromobenzene, iodobenzene, benzonitrile, phenol, fluorobenzene, nitrobenzene or plain benzene, just by changing the reagent.",
      definition:
        "- Arene diazonium salts show two types of reaction: those that **displace** the diazo group and those that **retain** it (coupling).\n" +
        "- The diazonium group is a very good leaving group, because of the positive charge on the nitrogen bonded to the ring. So arene diazonium salts undergo **nucleophilic substitution** with many nucleophiles, and nitrogen gas is given off each time.\n" +
        "- **Sandmeyer reaction** uses a copper(I) salt (good yield); **Gattermann reaction** uses copper powder with the acid.\n" +
        "- **Mild reduction** replaces the diazo group by hydrogen: \\(\\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^- + \\text{H}_3\\text{PO}_2 + \\text{H}_2\\text{O} \\rightarrow \\text{C}_6\\text{H}_6 + \\text{N}_2 + \\text{H}_3\\text{PO}_3 + \\text{HCl}\\). With ethanol the products are benzene, \\(\\text{N}_2\\), \\(\\text{CH}_3\\text{CHO}\\) and HCl.\n" +
        "- **Fluoroarenes:** fluoroboric acid precipitates the diazonium fluoroborate, which on heating gives the fluoroarene. The fluoroborate heated with aqueous NaNO₂ and copper gives the nitroarene.",
      table: {
        columns: ["Reaction", "Reagent", "Product from Ar-N₂⁺"],
        rows: [
          { cells: ["Sandmeyer", "CuCl/HCl, CuBr/HBr or CuCN/KCN", "Ar-Cl, Ar-Br or Ar-CN"] },
          { cells: ["Gattermann", "Cu powder with HCl or HBr", "Ar-Cl or Ar-Br"] },
          { cells: ["Iodoarene formation", "KI", "Ar-I"] },
          { cells: ["Mild reduction", "\\(\\text{H}_3\\text{PO}_2\\) and \\(\\text{H}_2\\text{O}\\), or ethanol", "Ar-H"] },
          { cells: ["Phenol formation", "\\(\\text{H}_2\\text{O}\\) at 283 K", "Ar-OH"] },
          { cells: ["Fluoroarene formation", "\\(\\text{HBF}_4\\), then heat", "Ar-F"] },
          { cells: ["Nitroarene formation", "Fluoroborate with aqueous \\(\\text{NaNO}_2\\) and Cu", "Ar-NO₂"] },
        ],
        caption: "Every one of these reactions also gives off nitrogen gas (textbook Table 13.5).",
      },
      selfCheckExample: {
        prompt: "Write the Sandmeyer reaction that converts benzenediazonium chloride into bromobenzene.",
        steps: [
          "The Sandmeyer reaction uses the copper(I) salt with its acid, here CuBr/HBr.",
          "\\(\\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^- \\xrightarrow{\\text{CuBr/HBr}} \\text{C}_6\\text{H}_5\\text{Br} + \\text{N}_2\\)",
        ],
        answer: "Bromobenzene and nitrogen gas, using CuBr/HBr",
      },
      practiceSet: [
        { prompt: "Which reagent converts benzenediazonium chloride into iodobenzene?", answer: "Potassium iodide, KI" },
        { prompt: "Which reagent converts benzenediazonium chloride into benzonitrile?", answer: "CuCN/KCN (Sandmeyer reaction)" },
        { prompt: "How is phenol obtained from benzenediazonium chloride?", answer: "By warming it with water at 283 K" },
        { prompt: "Which gas is given off whenever the diazo group is displaced?", answer: "Nitrogen" },
      ],
      pyqExampleId: "aad23189-707a-41bd-8e18-cde7f2188af7",
      traps: [
        {
          title: "Sandmeyer and Gattermann mixed up",
          body: "Sandmeyer uses a copper(I) salt (CuCl, CuBr, CuCN); Gattermann uses copper powder with HCl or HBr. Name the right one with its reagent.",
        },
        {
          title: "Half the products of a mild reduction",
          body: "With ethanol, the ethanol is oxidised to acetaldehyde; with \\(\\text{H}_3\\text{PO}_2\\), it becomes \\(\\text{H}_3\\text{PO}_3\\). Write these, with \\(\\text{N}_2\\) and HCl, or the equation is not balanced.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccam-coupling",
      name: "Azo coupling",
      intuition:
        "Here the diazonium ion does not leave; it attacks. It is a weak electrophile, so it can only attack a ring that is very rich in electrons, such as phenol or aniline. It bonds to that ring, usually at the para position, and the two rings end up joined by \\(\\text{-N=N-}\\). The long chain of alternating double bonds absorbs visible light, which is why azo compounds are brightly coloured dyes.",
      definition:
        "- Arene diazonium salts treated with reactive aromatic compounds such as **phenols or aromatic amines** give **azo compounds**: two aromatic rings joined through the **azo group, -N=N-**. The reaction is called **azo coupling**, and the diazo group is retained.\n" +
        "- Azo compounds have an extended conjugated system of double bonds, so they are **brightly coloured** and used as dyes. The acid-base indicator methyl orange is an azo dye.\n" +
        "- It is an example of **electrophilic aromatic substitution**: the diazonium ion is the electrophile.\n" +
        "- With **phenol** (alkaline medium): p-hydroxyazobenzene. With **aniline** (mild alkaline medium): p-aminoazobenzene, a yellow dye.\n" +
        "- **Orange dye test:** an aromatic primary amine is diazotised (conc. HCl, then aqueous NaNO₂, near 0 °C) and the solution is added to β-naphthol in NaOH. An orange dye confirms a primary aromatic amine.",
      formula: {
        label: "Coupling with phenol",
        latex: "\\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^- + \\text{C}_6\\text{H}_5\\text{OH} \\xrightarrow{\\text{OH}^-} p\\text{-HO-C}_6\\text{H}_4\\text{-N=N-C}_6\\text{H}_5 + \\text{HCl}",
      },
      authoredExample: {
        prompt: "Write the coupling reaction of benzenediazonium chloride with aniline. Name the product and give its colour.",
        steps: [
          "Aniline is an electron rich aromatic amine, so the diazonium ion attacks its ring at the para position, in mildly alkaline medium.",
          "\\(\\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^- + \\text{C}_6\\text{H}_5\\text{NH}_2 \\xrightarrow{\\text{OH}^-} p\\text{-H}_2\\text{N-C}_6\\text{H}_4\\text{-N=N-C}_6\\text{H}_5 + \\text{HCl}\\)",
          "The two rings are joined by the azo group, -N=N-, which is kept in the product.",
        ],
        answer: "p-Aminoazobenzene, a yellow dye",
      },
      selfCheckExample: {
        prompt: "Describe the orange dye test for a primary aromatic amine.",
        steps: [
          "Add 1 to 2 mL of conc. HCl to the amine, then aqueous NaNO₂ with cooling: the amine is diazotised.",
          "Pour this into a solution of β-naphthol in NaOH, keeping everything near 0 °C.",
          "An orange dye forms by azo coupling.",
        ],
        answer: "Diazotise, then couple with β-naphthol in NaOH: an orange dye shows a primary aromatic amine",
      },
      practiceSet: [
        { prompt: "Write the group that joins the two rings in an azo compound.", answer: "The azo group, -N=N-" },
        { prompt: "Name the azo dye used as an acid-base indicator.", answer: "Methyl orange" },
        { prompt: "In azo coupling, is the diazo group retained or lost?", answer: "Retained" },
        { prompt: "What kind of substitution is azo coupling?", answer: "Electrophilic aromatic substitution; the diazonium ion is the electrophile" },
      ],
      pyqExampleId: "7c81128a-d7ea-4d60-8d83-fdbd3acb455a",
      traps: [
        {
          title: "Losing nitrogen in coupling",
          body: "Coupling keeps both nitrogen atoms as -N=N-. No \\(\\text{N}_2\\) is given off; that happens only when the diazo group is displaced.",
        },
        {
          title: "Coupling at the wrong position",
          body: "The diazonium ion attacks the phenol or aniline ring para to the -OH or \\(\\text{-NH}_2\\) group. Write the product as p-hydroxyazobenzene or p-aminoazobenzene.",
        },
      ],
    },
  ],
};
