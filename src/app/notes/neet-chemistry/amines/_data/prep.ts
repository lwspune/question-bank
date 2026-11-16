import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_AM_PREP_NOTE: SubtopicNote = {
  subtopicName: "Preparation of Amines",
  title: "Preparation of Amines",
  oneLineDefinition:
    "How amines are made: by reducing nitro compounds, nitriles and amides, by ammonolysis of alkyl halides, by the Gabriel phthalimide synthesis, and by the Hoffmann bromamide degradation of amides.",
  whyItMatters:
    "Six NEET questions from 2023 to 2026. Two ask which reagents reduce a nitrile to a primary amine (2026) and which route fails to give a primary amine, the isocyanide (2023). Two follow a chain of reagents: an alkyl iodide through a nitrile and an amide to a Hoffmann product (2024), and an alkene through HBr with peroxide, KCN and Na(Hg) to an amine (2025). One asks which reactions give aniline (Re-NEET 2026), and one tests why aniline cannot be made by the Gabriel synthesis (2024).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "ncham-reduction",
      name: "Reduction routes to amines",
      intuition:
        "Nitrogen in a nitro group, a nitrile or an amide is joined to oxygen or held by a multiple bond. Add hydrogen and it ends up as an NH₂ group. Which compound you start from decides how many carbons the amine has: a nitro compound and an amide keep their carbons, and a nitrile keeps its CN carbon as a CH₂, so making the nitrile from an alkyl halide adds one carbon to the chain.",
      definition:
        "- **Nitro compounds:** hydrogen over finely divided Ni, Pd or Pt, or a metal in acid (Sn and HCl, or scrap iron and HCl), gives the amine. Nitrobenzene gives aniline.\n" +
        "- Iron and HCl is preferred: the \\(\\text{FeCl}_2\\) formed is hydrolysed and releases HCl, so only a little acid is needed to start the reaction.\n" +
        "- **Nitriles:** \\(\\text{LiAlH}_4\\) then water, \\(\\text{H}_2\\)/Ni, or Na(Hg) in ethanol gives a primary amine, \\(\\text{R-CH}_2\\text{-NH}_2\\). Since the nitrile is made from an alkyl halide and KCN, this route gives an amine with **one carbon more** than the halide.\n" +
        "- **Amides:** \\(\\text{LiAlH}_4\\) then water reduces \\(\\text{R-CONH}_2\\) to \\(\\text{R-CH}_2\\text{-NH}_2\\), with the same carbons.\n" +
        "- **Isocyanides:** reduction of \\(\\text{R-NC}\\) puts the N between two carbons, so the product is a **secondary** amine, \\(\\text{R-NH-CH}_3\\).",
      table: {
        columns: ["Starting compound", "Reagent", "Product"],
        rows: [
          { cells: ["Nitro compound, \\(\\text{Ar-NO}_2\\)", "\\(\\text{H}_2\\) with Ni, Pd or Pt; or Sn and HCl; or Fe and HCl", "Primary amine, \\(\\text{Ar-NH}_2\\)"] },
          { cells: ["Nitrile, \\(\\text{R-CN}\\)", "\\(\\text{LiAlH}_4\\) then \\(\\text{H}_2\\text{O}\\); \\(\\text{H}_2\\)/Ni; Na(Hg) in \\(\\text{C}_2\\text{H}_5\\text{OH}\\)", "Primary amine, \\(\\text{R-CH}_2\\text{-NH}_2\\)"], pyqExampleId: "33acee02-d9de-41f4-be5f-62123d8f56f4", noteAmber: "NEET 2026: LiAlH₄, H₂/Ni and Na(Hg) in ethanol reduce a nitrile to a primary amine; Br₂ with aqueous NaOH does not." },
          { cells: ["Amide, \\(\\text{R-CONH}_2\\)", "\\(\\text{LiAlH}_4\\) then \\(\\text{H}_2\\text{O}\\)", "Primary amine, \\(\\text{R-CH}_2\\text{-NH}_2\\)"] },
          { cells: ["Isocyanide, \\(\\text{R-NC}\\)", "\\(\\text{LiAlH}_4\\) then \\(\\text{H}_3\\text{O}^+\\)", "Secondary amine, \\(\\text{R-NH-CH}_3\\)"], pyqExampleId: "454056be-0e34-4e79-adfa-6a464b701648", noteAmber: "NEET 2023: CH₃NC with LiAlH₄ gave CH₃NHCH₃, the only option that was not a primary amine." },
        ],
      },
      pyqExampleId: "33acee02-d9de-41f4-be5f-62123d8f56f4",
      selfCheckExample: {
        prompt: "Name the amine formed when benzamide, C₆H₅CONH₂, is reduced with LiAlH₄ and water, and the amine formed when nitrobenzene is reduced with Sn and HCl.",
        steps: [
          "\\(\\text{LiAlH}_4\\) turns the C=O of the amide into \\(\\text{CH}_2\\) and keeps every carbon: \\(\\text{C}_6\\text{H}_5\\text{CH}_2\\text{NH}_2\\), benzylamine.",
          "Sn and HCl reduce the \\(\\text{NO}_2\\) group on the ring to \\(\\text{NH}_2\\): \\(\\text{C}_6\\text{H}_5\\text{NH}_2\\), aniline.",
        ],
        answer: "Benzylamine from benzamide; aniline from nitrobenzene",
      },
      practiceSet: [
        { prompt: "Why is scrap iron with HCl preferred to tin with HCl for reducing nitrobenzene?", answer: "The \\(\\text{FeCl}_2\\) formed is hydrolysed and releases HCl, so only a small amount of acid is needed" },
        { prompt: "What does propanamide, CH₃CH₂CONH₂, give when reduced with LiAlH₄ followed by water?", answer: "Propan-1-amine, \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{NH}_2\\)" },
        { prompt: "When a nitrile is reduced with H₂ over Ni, does the amine have the same number of carbon atoms as the nitrile?", answer: "Yes: the CN carbon becomes the \\(\\text{CH}_2\\) next to \\(\\text{NH}_2\\)" },
        { prompt: "Which one gives N-methylmethanamine, CH₃NHCH₃, on reduction with LiAlH₄: CH₃CN or CH₃NC?", answer: "\\(\\text{CH}_3\\text{NC}\\), the isocyanide" },
      ],
      traps: [
        {
          title: "A nitrile and an isocyanide give different amines",
          body: "Reducing \\(\\text{R-CN}\\) gives the primary amine \\(\\text{R-CH}_2\\text{NH}_2\\). Reducing \\(\\text{R-NC}\\) gives the secondary amine \\(\\text{R-NH-CH}_3\\), because the nitrogen already sits between two carbons.",
        },
        {
          title: "The nitrile route adds a carbon",
          body: "An alkyl halide with KCN gives a nitrile with one more carbon, and reduction keeps it. Bromoethane, with two carbons, ends up as propan-1-amine, with three.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ncham-hoffmann",
      name: "Hoffmann bromamide degradation",
      intuition:
        "An amide warmed with bromine and sodium hydroxide loses its C=O carbon as carbonate. The alkyl or aryl group moves from the carbonyl carbon onto the nitrogen, and what is left is a primary amine with one carbon fewer than the amide. It is the one common route that shortens the chain.",
      definition:
        "- A primary amide with \\(\\text{Br}_2\\) in aqueous or ethanolic NaOH gives a **primary amine** with **one carbon atom less** than the amide.\n" +
        "- The alkyl or aryl group **migrates** from the carbonyl carbon to the nitrogen.\n" +
        "- The carbonyl carbon leaves as sodium carbonate.\n" +
        "- Benzamide gives aniline, so this route does make aromatic amines.\n" +
        "- Compare: \\(\\text{LiAlH}_4\\) reduces the same amide to an amine with the **same** number of carbons.",
      formula: {
        label: "Hoffmann bromamide degradation",
        latex: "\\text{R-CONH}_2 + \\text{Br}_2 + 4\\,\\text{NaOH} \\rightarrow \\text{R-NH}_2 + \\text{Na}_2\\text{CO}_3 + 2\\,\\text{NaBr} + 2\\,\\text{H}_2\\text{O}",
        symbols: [
          { symbol: "\\(\\text{R-CONH}_2\\)", meaning: "a primary amide" },
          { symbol: "\\(\\text{R-NH}_2\\)", meaning: "the primary amine, one carbon shorter" },
        ],
      },
      authoredExample: {
        prompt: "Pentanamide, CH₃CH₂CH₂CH₂CONH₂, is warmed with bromine and NaOH. Name the amine formed.",
        steps: [
          "Pentanamide has five carbons, one of them in the CONH₂ group.",
          "The carbonyl carbon leaves as \\(\\text{Na}_2\\text{CO}_3\\), and the butyl group moves onto the nitrogen.",
          "The product is \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CH}_2\\text{NH}_2\\), with four carbons.",
        ],
        answer: "Butan-1-amine",
      },
      selfCheckExample: {
        prompt: "Which amide gives methanamine, CH₃NH₂, by Hoffmann bromamide degradation?",
        steps: [
          "The amine has one carbon, so the amide must have two.",
          "The two-carbon amide is \\(\\text{CH}_3\\text{CONH}_2\\).",
        ],
        answer: "Ethanamide (acetamide), CH₃CONH₂",
      },
      practiceSet: [
        { prompt: "How many carbon atoms are in the amine formed when hexanamide undergoes Hoffmann bromamide degradation?", answer: "Five: the product is pentan-1-amine" },
        { prompt: "What does benzamide give with bromine and NaOH?", answer: "Aniline, \\(\\text{C}_6\\text{H}_5\\text{NH}_2\\)" },
        { prompt: "In the Hoffmann bromamide degradation, which group moves from the carbonyl carbon to the nitrogen?", answer: "The alkyl or aryl group" },
        { prompt: "Ethanamide is treated once with LiAlH₄ and water, and once with Br₂ and NaOH. Name the two amines.", answer: "Ethanamine with \\(\\text{LiAlH}_4\\) (same carbons); methanamine with \\(\\text{Br}_2\\) and NaOH (one carbon fewer)" },
      ],
      pyqExampleId: "098109ff-9335-4ddd-b417-6402e19f2e37",
      traps: [
        {
          title: "One carbon fewer, not one more",
          body: "The Hoffmann reaction removes the carbonyl carbon. An amide with n carbons gives an amine with n minus 1 carbons. It is the nitrile route that adds a carbon.",
        },
        {
          title: "Bromine and NaOH act on amides, not nitriles",
          body: "\\(\\text{Br}_2\\) with NaOH is the Hoffmann reagent for a \\(\\text{CONH}_2\\) group. It does not reduce a nitrile to an amine.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ncham-gabriel",
      name: "Ammonolysis and the Gabriel phthalimide synthesis",
      intuition:
        "Ammonia's lone pair can push out the halogen of an alkyl halide. The trouble is that the amine formed also has a lone pair, so it attacks more alkyl halide, and you get a mixture. The Gabriel synthesis avoids this: the nitrogen of phthalimide can take only one alkyl group, so hydrolysis then releases a pure primary amine.",
      definition:
        "- **Ammonolysis:** an alkyl halide heated with an ethanolic solution of ammonia in a sealed tube at 373 K gives a primary amine. This amine reacts further, so the product is a **mixture** of primary, secondary and tertiary amines and the quaternary ammonium salt.\n" +
        "- Using a **large excess of ammonia** makes the primary amine the main product.\n" +
        "- The amine comes out as its ammonium salt; a strong base such as NaOH releases the free amine.\n" +
        "- Order of reactivity of the halides: RI > RBr > RCl.\n" +
        "- **Gabriel phthalimide synthesis:** phthalimide with ethanolic KOH gives its potassium salt; this, heated with an alkyl halide, gives an N-alkylphthalimide; alkaline hydrolysis then gives the **primary amine** alone.\n" +
        "- Aromatic primary amines **cannot** be made this way: aryl halides do not undergo nucleophilic substitution with the anion formed by phthalimide.",
      table: {
        columns: ["Method", "Reagents", "Product", "Limit"],
        rows: [
          { cells: ["Ammonolysis", "Alkyl halide and ethanolic \\(\\text{NH}_3\\), sealed tube, 373 K", "Mixture of 1°, 2° and 3° amines and the quaternary salt", "Excess \\(\\text{NH}_3\\) needed for the primary amine to be the main product"] },
          { cells: ["Gabriel synthesis", "Phthalimide and ethanolic KOH, then an alkyl halide, then alkaline hydrolysis", "Primary amine only", "No aromatic amines, as aryl halides do not react"], pyqExampleId: "a4f2820a-aa7a-49b9-a1c4-98e734a56b76", noteAmber: "NEET 2024: both statements were true. Aniline cannot be made by the Gabriel synthesis, and it does not undergo Friedel-Crafts alkylation." },
        ],
      },
      pyqExampleId: "a4f2820a-aa7a-49b9-a1c4-98e734a56b76",
      selfCheckExample: {
        prompt: "Bromoethane is heated with ethanolic ammonia. Why is ethanamine not the only product, and how can it be made the main one?",
        steps: [
          "Ammonia replaces the Br, giving ethanamine as its salt.",
          "Ethanamine has a lone pair too, so it attacks more bromoethane. This gives diethylamine, then triethylamine, then the tetraethylammonium salt.",
          "With a large excess of ammonia, a bromoethane molecule is far more likely to meet ammonia than ethanamine.",
        ],
        answer: "The amine formed reacts further with the halide; a large excess of ammonia makes ethanamine the main product",
      },
      practiceSet: [
        { prompt: "Which method gives a primary amine free of secondary and tertiary amines: ammonolysis of an alkyl halide or the Gabriel phthalimide synthesis?", answer: "The Gabriel phthalimide synthesis" },
        { prompt: "Arrange RCl, RBr and RI by their reactivity in ammonolysis.", answer: "RI > RBr > RCl" },
        { prompt: "In the Gabriel synthesis, which reagent turns phthalimide into its potassium salt?", answer: "Ethanolic KOH" },
        { prompt: "After ammonolysis the amine is present as its ammonium salt. How is the free amine obtained?", answer: "By treating the salt with a strong base such as NaOH" },
      ],
      traps: [
        {
          title: "Gabriel does not make aniline",
          body: "The Gabriel synthesis needs the halide to be substituted by the phthalimide anion. An aryl halide such as chlorobenzene does not react this way, so aromatic primary amines are made by reducing nitro compounds instead.",
        },
        {
          title: "Ammonolysis gives a mixture",
          body: "Ammonolysis of an alkyl halide does not stop at the primary amine. It gives primary, secondary and tertiary amines and the quaternary ammonium salt, unless ammonia is in large excess.",
        },
      ],
    },
  ],
};
