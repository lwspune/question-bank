import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_AM_SYNTHESIS_NOTE: SubtopicNote = {
  subtopicName: "Importance of Diazonium Salts in Synthesis of Aromatic Compounds",
  title: "Diazonium Salts in Synthesis",
  oneLineDefinition:
    "Using the diazonium group to put F, I, CN, OH or NO₂ on a ring where direct substitution cannot, and to remove an amino group once it has steered other groups into place.",
  whyItMatters:
    "3 questions, all from the NCERT chapter: Example 9.5 (4-nitrotoluene to 2-bromobenzoic acid), in-text question 9.9 (3-methylaniline to 3-nitrotoluene, and aniline to 1,3,5-tribromobenzene) and Exercise 9.8 with nine conversions. The board sets the same kind of multi-step route as \"convert\" and \"identify A, B and C\" questions, filed on the reactions and diazonium pages; 2026 asked for the 1,3,5-tribromobenzene route.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcam-synthesis",
      name: "Planning a route through the diazonium salt",
      intuition:
        "Direct substitution on a ring only puts groups where the groups already there send them, and some groups (F, I, CN) cannot be put on directly at all. A diazonium salt solves both problems. Use an -NH₂ or -NO₂ group to steer other groups into place, turn the -NH₂ into -N₂⁺, and then swap it for whatever you need, or for plain hydrogen to remove it.",
      definition:
        "- Diazonium salts are very good intermediates for putting **-F, -Cl, -Br, -I, -CN, -OH and -NO₂** on an aromatic ring.\n" +
        "- **Aryl fluorides and iodides** cannot be prepared by direct halogenation.\n" +
        "- The **cyano group** cannot be put on by nucleophilic substitution of chlorine in chlorobenzene, but benzonitrile is easily made from the diazonium salt.\n" +
        "- So the route is used for substituted aromatic compounds that **cannot be made by direct substitution** of benzene or a substituted benzene.\n" +
        "- **Planning:** (1) put each new group on while the right directing group is present; (2) reduce -NO₂ to -NH₂ if needed; (3) diazotise at 273 to 278 K; (4) replace the diazonium group, or remove it with H₃PO₂ or ethanol.",
      formula: {
        label: "The diazonium route",
        latex: "\\text{Ar-NH}_2 \\xrightarrow[\\text{273-278 K}]{\\text{NaNO}_2 + \\text{HCl}} \\text{Ar-N}_2^+\\text{Cl}^- \\xrightarrow{\\text{reagent}} \\text{Ar-Y} + \\text{N}_2",
        symbols: [
          { symbol: "\\(\\text{Y}\\)", meaning: "the group that replaces the diazonium group (Cl, Br, I, F, CN, OH, NO₂ or H)" },
        ],
      },
      authoredExample: {
        prompt: "Convert benzene into m-dibromobenzene.",
        steps: [
          "The two bromines must be meta, so put the first one on while a meta director is present: nitrate first.",
          "\\(\\text{C}_6\\text{H}_6 \\xrightarrow{\\text{conc. HNO}_3 + \\text{conc. H}_2\\text{SO}_4} \\text{C}_6\\text{H}_5\\text{NO}_2 \\xrightarrow{\\text{Br}_2,\\ \\text{FeBr}_3} \\text{m-BrC}_6\\text{H}_4\\text{NO}_2\\)",
          "Reduce the nitro group to an amino group.",
          "\\(\\text{m-BrC}_6\\text{H}_4\\text{NO}_2 \\xrightarrow{\\text{Sn} + \\text{HCl}} \\text{m-BrC}_6\\text{H}_4\\text{NH}_2\\)",
          "Diazotise, then replace the diazonium group by bromine (Sandmeyer).",
          "\\(\\text{m-BrC}_6\\text{H}_4\\text{NH}_2 \\xrightarrow[\\text{cold}]{\\text{NaNO}_2 + \\text{HCl}} \\text{m-BrC}_6\\text{H}_4\\text{N}_2^+\\text{Cl}^- \\xrightarrow{\\text{CuBr/HBr}} \\text{m-C}_6\\text{H}_4\\text{Br}_2 + \\text{N}_2\\)",
        ],
        answer: "Nitration, bromination, reduction, diazotisation and Sandmeyer's reaction give m-dibromobenzene",
      },
      selfCheckExample: {
        prompt: "Convert nitrobenzene into phenol.",
        steps: [
          "Reduce: \\(\\text{C}_6\\text{H}_5\\text{NO}_2 \\xrightarrow{\\text{Fe} + \\text{HCl}} \\text{C}_6\\text{H}_5\\text{NH}_2\\)",
          "Diazotise in the cold: \\(\\text{C}_6\\text{H}_5\\text{NH}_2 \\xrightarrow{\\text{NaNO}_2 + \\text{HCl}} \\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^-\\)",
          "Warm the solution: the salt is hydrolysed. \\(\\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^- + \\text{H}_2\\text{O} \\longrightarrow \\text{C}_6\\text{H}_5\\text{OH} + \\text{N}_2 + \\text{HCl}\\)",
        ],
        answer: "Reduction, diazotisation, then warming with water gives phenol",
      },
      practiceSet: [
        { prompt: "Why is fluorobenzene made from aniline rather than by direct fluorination of benzene?", answer: "Aryl fluorides cannot be made by direct halogenation; the diazonium salt with HBF₄ gives the fluoroborate, which on heating gives fluorobenzene" },
        { prompt: "Why is benzonitrile made from a diazonium salt and not from chlorobenzene?", answer: "The cyano group cannot be put on by nucleophilic substitution of chlorine in chlorobenzene; CuCN replaces the diazonium group easily" },
        { prompt: "Which reagent removes a diazonium group and leaves hydrogen in its place?", answer: "Hypophosphorous acid (H₃PO₂) with water, or ethanol" },
      ],
      pyqExampleId: "835bad37-00cf-4ab2-b847-c6a8dac0d077",
      traps: [
        {
          title: "Steps in the wrong order",
          body: "A group goes where the groups already on the ring send it. Brominate nitrobenzene to get meta; brominate aniline and you get ortho and para (in fact all three positions). Decide the order before writing the first arrow.",
        },
        {
          title: "Leaving out the diazotisation conditions",
          body: "Every diazotisation arrow needs NaNO₂ + HCl and the cold (273 to 278 K). Marks are lost for a bare arrow from -NH₂ to the product.",
        },
      ],
    },
  ],
};
