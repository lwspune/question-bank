import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_AM_DIAZONIUM_NOTE: SubtopicNote = {
  subtopicName: "Diazonium Salts",
  title: "Diazonium Salts",
  oneLineDefinition:
    "What nitrous acid does to primary amines: aromatic amines give diazonium salts that are stable only in the cold, aliphatic amines give an alcohol and nitrogen gas, and a benzenediazonium salt is the starting point for putting Cl, Br, I, F, CN, OH, NO₂ or H on the ring, or for making azo dyes.",
  whyItMatters:
    "Eight NEET questions from 2021 to 2026. Three end with a primary aliphatic amine meeting nitrous acid: ethanamine giving ethanol at the end of a chain from methanol (Re-NEET 2024) and from ethane (2026), and benzylamine giving benzyl alcohol after LiAlH₄ on benzonitrile (2022). Two are statements on how stable diazonium salts are and how they are made (2022, 2025). Three are replacement reactions: ethanol replacing the diazo group by hydrogen (2021), Cu₂Br₂ and HBr followed by a Grignard step (2023), and KI at the end of a four-step chain (Re-NEET 2024).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ncham-diazotisation",
      name: "Diazotisation and the stability of diazonium salts",
      intuition:
        "Nitrous acid turns the NH₂ of a primary aromatic amine into the diazonium group, N₂⁺. Nitrous acid itself is unstable, so it is made in the flask from sodium nitrite and hydrochloric acid. The product survives only because the positive charge is spread over the benzene ring, and even then only in ice-cold solution, so it is made at 273 to 278 K and used at once.",
      definition:
        "- Diazonium salts have the general formula \\(\\text{R-N}_2^+\\text{X}^-\\). Converting a primary aromatic amine into one is called **diazotisation**.\n" +
        "- Aniline reacts with nitrous acid, made in the mixture from \\(\\text{NaNO}_2\\) and HCl, at **273 to 278 K** to give benzenediazonium chloride.\n" +
        "- Arenediazonium ions are stabilised by **resonance** with the ring. Even so, the salt is stable only for a short time in cold solution, so it is not stored and is used immediately.\n" +
        "- Benzenediazonium chloride is a colourless crystalline solid, readily soluble in water. It is stable in the cold but reacts with water when warmed, and it **decomposes easily in the dry state**.\n" +
        "- Benzenediazonium fluoroborate is insoluble in water and stable at room temperature.\n" +
        "- Primary **aliphatic** amines form highly unstable alkyldiazonium salts that cannot be kept at all.",
      formula: {
        label: "Diazotisation of aniline at 273 to 278 K",
        latex: "\\text{C}_6\\text{H}_5\\text{NH}_2 + \\text{NaNO}_2 + 2\\,\\text{HCl} \\xrightarrow{273\\text{-}278\\ \\text{K}} \\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^- + \\text{NaCl} + 2\\,\\text{H}_2\\text{O}",
        symbols: [
          { symbol: "\\(\\text{NaNO}_2 + \\text{HCl}\\)", meaning: "make the nitrous acid in the flask" },
          { symbol: "\\(\\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^-\\)", meaning: "benzenediazonium chloride" },
        ],
      },
      authoredExample: {
        prompt: "4-Methylaniline (p-toluidine) is treated with NaNO₂ and HCl at 273 K. Name the product and say why the temperature is kept so low.",
        steps: [
          "The \\(\\text{NH}_2\\) group on the ring becomes \\(\\text{N}_2^+\\), with chloride as the counter ion.",
          "The product is \\(\\text{CH}_3\\text{C}_6\\text{H}_4\\text{N}_2^+\\text{Cl}^-\\), 4-methylbenzenediazonium chloride.",
          "Arenediazonium salts are stable only for a short time in cold solution; warmed, they react with water.",
        ],
        answer: "4-Methylbenzenediazonium chloride; it is stable only in the cold",
      },
      selfCheckExample: {
        prompt: "In the diazotisation of aniline, why are two moles of HCl used for each mole of aniline?",
        steps: [
          "One mole of HCl reacts with \\(\\text{NaNO}_2\\) to make nitrous acid: \\(\\text{NaNO}_2 + \\text{HCl} \\rightarrow \\text{HNO}_2 + \\text{NaCl}\\).",
          "The second supplies the chloride of the salt: \\(\\text{C}_6\\text{H}_5\\text{NH}_2 + \\text{HNO}_2 + \\text{HCl} \\rightarrow \\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^- + 2\\,\\text{H}_2\\text{O}\\).",
        ],
        answer: "One to make HNO₂ from NaNO₂, one to form the diazonium chloride",
      },
      practiceSet: [
        { prompt: "Which benzenediazonium salt is insoluble in water and stable at room temperature?", answer: "Benzenediazonium fluoroborate" },
        { prompt: "What is the conversion of a primary aromatic amine into its diazonium salt called?", answer: "Diazotisation" },
        { prompt: "Why is an arenediazonium ion more stable than an alkyldiazonium ion?", answer: "Its positive charge is spread over the benzene ring by resonance" },
        { prompt: "What does benzenediazonium chloride look like, and does it dissolve in water?", answer: "A colourless crystalline solid that is readily soluble in water" },
      ],
      pyqExampleId: "48338818-2477-41c9-8276-18bfcf001ac8",
      traps: [
        {
          title: "Stable only in the cold",
          body: "Arenediazonium salts are stable for a short time at 273 to 278 K. Warmed, they react with water, and benzenediazonium chloride decomposes easily when dry, which is why it is used at once.",
        },
        {
          title: "Nitrous acid is made in the flask",
          body: "\\(\\text{HNO}_2\\) is not taken from a bottle. It is made in the reaction mixture from \\(\\text{NaNO}_2\\) and HCl.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ncham-nitrous-aliphatic",
      name: "Nitrous acid with primary aliphatic amines",
      intuition:
        "A primary aliphatic amine meets nitrous acid exactly as aniline does, but its diazonium ion has no ring to spread the charge over. It falls apart as soon as it forms: nitrogen gas bubbles off and water takes its place, so the amine ends up as an alcohol with the same carbon chain.",
      definition:
        "- A primary aliphatic amine with nitrous acid (\\(\\text{NaNO}_2\\) and HCl) gives a highly unstable alkyldiazonium salt, which with water gives an **alcohol** and **nitrogen gas**.\n" +
        "- The nitrogen is given off **quantitatively**, which is used in the estimation of amino acids and proteins.\n" +
        "- An amine whose \\(\\text{NH}_2\\) is on an \\(sp^3\\) carbon is aliphatic even if a ring is present elsewhere: benzylamine, \\(\\text{C}_6\\text{H}_5\\text{CH}_2\\text{NH}_2\\), gives benzyl alcohol.\n" +
        "- Only an amine with \\(\\text{NH}_2\\) on the ring itself, such as aniline, gives a diazonium salt that lasts in the cold.",
      formula: {
        label: "Nitrous acid on a primary aliphatic amine",
        latex: "\\text{R-NH}_2 + \\text{HNO}_2 \\xrightarrow{\\text{NaNO}_2 + \\text{HCl}} [\\text{R-N}_2^+\\text{Cl}^-] \\xrightarrow{\\text{H}_2\\text{O}} \\text{R-OH} + \\text{N}_2 + \\text{HCl}",
        symbols: [
          { symbol: "\\([\\text{R-N}_2^+\\text{Cl}^-]\\)", meaning: "the alkyldiazonium salt, which decomposes at once" },
          { symbol: "\\(\\text{R-OH}\\)", meaning: "the alcohol, with the same carbon chain as the amine" },
        ],
      },
      authoredExample: {
        prompt: "Propan-1-amine, CH₃CH₂CH₂NH₂, is treated with NaNO₂ and HCl and then with water. Name the organic product and the gas.",
        steps: [
          "Propan-1-amine is a primary aliphatic amine, so its diazonium salt is highly unstable.",
          "It loses \\(\\text{N}_2\\), and water puts an OH where the \\(\\text{NH}_2\\) was.",
          "The product is \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{OH}\\).",
        ],
        answer: "Propan-1-ol and nitrogen gas",
      },
      selfCheckExample: {
        prompt: "Aniline and benzylamine are each treated with NaNO₂ and HCl at 273 K. Which gives a diazonium salt that lasts in the cold, and what does the other give with water?",
        steps: [
          "In aniline the \\(\\text{NH}_2\\) is on the ring, so its diazonium ion is stabilised by resonance: benzenediazonium chloride, stable in the cold.",
          "In benzylamine the \\(\\text{NH}_2\\) is on a \\(\\text{CH}_2\\) group, so it is an aliphatic amine. Its diazonium salt loses \\(\\text{N}_2\\) at once.",
          "With water this gives \\(\\text{C}_6\\text{H}_5\\text{CH}_2\\text{OH}\\).",
        ],
        answer: "Aniline gives the lasting salt; benzylamine gives benzyl alcohol and nitrogen",
      },
      practiceSet: [
        { prompt: "What gas is given off when ethanamine reacts with nitrous acid?", answer: "Nitrogen, \\(\\text{N}_2\\)" },
        { prompt: "Why is the reaction of nitrous acid with primary aliphatic amines used to estimate amino acids and proteins?", answer: "The nitrogen gas is given off quantitatively, so its volume measures the amino groups" },
        { prompt: "Can the diazonium salt of a primary aliphatic amine be kept in ice-cold solution like benzenediazonium chloride?", answer: "No: it is highly unstable and decomposes at once to an alcohol and nitrogen" },
        { prompt: "Which one gives an alcohol and nitrogen gas with NaNO₂ and HCl in the cold: CH₃CH₂NH₂ or C₆H₅NH₂?", answer: "\\(\\text{CH}_3\\text{CH}_2\\text{NH}_2\\), which gives ethanol" },
      ],
      pyqExampleId: "31374afb-8d33-4478-a734-ed51d05d81f0",
      traps: [
        {
          title: "An aliphatic amine ends as an alcohol",
          body: "A primary aliphatic amine with nitrous acid does not give a diazonium salt you can use. It gives an alcohol and nitrogen gas, so ethanamine ends as ethanol.",
        },
        {
          title: "Benzylamine is an aliphatic amine",
          body: "A benzene ring in the molecule does not make an amine aromatic. In \\(\\text{C}_6\\text{H}_5\\text{CH}_2\\text{NH}_2\\) the \\(\\text{NH}_2\\) is on a \\(\\text{CH}_2\\), so nitrous acid gives benzyl alcohol.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ncham-replacement",
      name: "Replacement and coupling reactions of diazonium salts",
      intuition:
        "The diazo group leaves as nitrogen gas, one of the most stable molecules there is, so almost any group can take its place on the ring. That makes a benzenediazonium salt the easy way to put on groups that cannot be added to benzene directly, such as iodine, fluorine, CN or OH. In coupling reactions the nitrogen stays, and the N=N joins two rings to make a coloured azo dye.",
      definition:
        "- **Sandmeyer reaction:** \\(\\text{Cu}_2\\text{Cl}_2\\)/HCl, \\(\\text{Cu}_2\\text{Br}_2\\)/HBr or CuCN/KCN replace the diazo group by Cl, Br or CN. **Gattermann reaction:** copper powder with HCl or HBr gives the same halides.\n" +
        "- **Iodine:** shaking with **KI** gives iodobenzene. Iodine is not easy to put into the benzene ring directly, so this is the way to make it.\n" +
        "- **Fluorine:** fluoroboric acid precipitates the fluoroborate, which on heating gives the aryl fluoride.\n" +
        "- **Hydrogen:** mild reducing agents, **hypophosphorous acid** (\\(\\text{H}_3\\text{PO}_2\\)) or **ethanol**, replace the diazo group by H and give the arene. They are oxidised to phosphorous acid and ethanal.\n" +
        "- **OH:** if the solution warms to 283 K the salt is hydrolysed to phenol.\n" +
        "- **Coupling:** with phenol (alkaline) it gives p-hydroxyazobenzene, an orange dye; with aniline (mildly acidic) p-aminoazobenzene, a yellow dye. The N=N is kept.",
      table: {
        columns: ["Reagent", "Group put in", "Product from benzenediazonium chloride", "Name"],
        rows: [
          { cells: ["\\(\\text{Cu}_2\\text{Cl}_2\\)/HCl", "Cl", "Chlorobenzene", "Sandmeyer reaction"] },
          { cells: ["\\(\\text{Cu}_2\\text{Br}_2\\)/HBr", "Br", "Bromobenzene", "Sandmeyer reaction"], pyqExampleId: "ceeb82d2-25dd-48a8-968b-94498587714a", noteAmber: "NEET 2023: bromobenzene from this step, then Mg in dry ether and water, gave benzene." },
          { cells: ["Cu powder with HCl or HBr", "Cl or Br", "Chlorobenzene or bromobenzene", "Gattermann reaction"] },
          { cells: ["CuCN/KCN", "CN", "Benzonitrile", "Sandmeyer reaction"] },
          { cells: ["KI", "I", "Iodobenzene", "Replacement by iodide"], pyqExampleId: "3d700032-5546-47eb-8eda-1c24ff7d91b1", noteAmber: "Re-NEET 2024: after chlorination, Sn/HCl and diazotisation, KI put iodine where the NH₂ had been." },
          { cells: ["\\(\\text{HBF}_4\\), then heat", "F", "Fluorobenzene", "Via the fluoroborate"] },
          { cells: ["\\(\\text{H}_3\\text{PO}_2\\) or \\(\\text{CH}_3\\text{CH}_2\\text{OH}\\)", "H", "Benzene", "Reduction"], pyqExampleId: "06ddb0b7-6e4e-4afa-9852-52fa51f27985", noteAmber: "NEET 2021: ethanol turned 2,4,6-tribromobenzenediazonium chloride into 1,3,5-tribromobenzene." },
          { cells: ["Water, warmed to 283 K", "OH", "Phenol", "Hydrolysis"] },
          { cells: ["Phenol, alkaline", "N=N kept, ring joined at para", "p-Hydroxyazobenzene, orange dye", "Coupling"] },
          { cells: ["Aniline, mildly acidic", "N=N kept, ring joined at para", "p-Aminoazobenzene, yellow dye", "Coupling"] },
        ],
      },
      pyqExampleId: "06ddb0b7-6e4e-4afa-9852-52fa51f27985",
      selfCheckExample: {
        prompt: "How is benzonitrile, C₆H₅CN, made from aniline in two steps?",
        steps: [
          "Diazotise aniline with \\(\\text{NaNO}_2\\) and HCl at 273 to 278 K, giving benzenediazonium chloride.",
          "Treat it with CuCN and KCN (Sandmeyer reaction): CN replaces the diazo group and \\(\\text{N}_2\\) is given off.",
        ],
        answer: "NaNO₂ and HCl at 273 to 278 K, then CuCN/KCN",
      },
      practiceSet: [
        { prompt: "Which reagent, followed by heating, turns benzenediazonium chloride into fluorobenzene?", answer: "Fluoroboric acid, \\(\\text{HBF}_4\\)" },
        { prompt: "What dye forms when benzenediazonium chloride couples with phenol in alkaline solution, and what colour is it?", answer: "p-Hydroxyazobenzene, an orange dye" },
        { prompt: "Benzenediazonium chloride gives chlorobenzene with Cu₂Cl₂ and HCl, and also with copper powder and HCl. Name the two reactions.", answer: "Sandmeyer reaction and Gattermann reaction" },
        { prompt: "Why is iodobenzene made by shaking benzenediazonium chloride with KI rather than by putting iodine into benzene directly?", answer: "Iodine is not easy to introduce into the benzene ring directly" },
      ],
      traps: [
        {
          title: "Ethanol puts in H, not OH",
          body: "Ethanol and \\(\\text{H}_3\\text{PO}_2\\) reduce the diazonium salt to the arene. The OH group comes from warming the salt with water, not from ethanol.",
        },
        {
          title: "KI needs no copper",
          body: "Iodobenzene forms on simply shaking the diazonium salt with KI. The copper(I) salts are for Cl, Br and CN.",
        },
        {
          title: "Coupling keeps the nitrogen",
          body: "In every replacement reaction \\(\\text{N}_2\\) leaves. In coupling with phenol or aniline the two nitrogens stay as an N=N link between the rings.",
        },
      ],
    },
  ],
};
