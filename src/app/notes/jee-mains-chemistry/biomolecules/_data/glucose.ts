import type { SubtopicNote } from "@/app/notes/_types";

export const GLUCOSE_BIO_NOTE: SubtopicNote = {
  subtopicName: "Monosaccharides: Classification and Glucose Reactions",
  title: "Monosaccharides: Classification and Glucose Reactions",
  oneLineDefinition:
    "Carbohydrates are sorted by how many units hydrolysis gives and by their carbonyl group and chain length; every monosaccharide is a reducing sugar, and each reaction of glucose (HI, NH₂OH, HCN, bromine water, acetic anhydride, nitric acid) proves one feature of its open-chain structure.",
  whyItMatters:
    "Seventeen PYQs, all multiple choice, three from 2026. Eight classify a sugar or name the colour test that picks it out: Seliwanoff's for ketoses, Barfoed's for monosaccharides, Tollens' and Fehling's for any reducing sugar. Nine are on the reactions of glucose and the structure they prove, or on the same reasoning applied to fructose and an unknown sugar; three of those are match-the-list questions pairing a reagent with its product.",
  concepts: [
    // C1 — classes and colour tests
    {
      kind: "reference" as const,
      slug: "jcbio-classification-tests",
      name: "Classes of carbohydrates and their colour tests",
      intuition:
        "Two questions sort any sugar. How many units does it give on hydrolysis: one, a few or hundreds? And is its carbonyl an aldehyde or a ketone, on a chain of how many carbons? The colour tests then tell sugars apart by what they can do: reduce a metal ion, dehydrate fast in acid, or stain with iodine.",
      definition:
        "- **Monosaccharides** cannot be hydrolysed further: glucose, fructose, galactose, ribose.\n" +
        "- **Oligosaccharides** give 2 to 10 monosaccharide units. The units need not be the same: sucrose gives glucose and fructose, lactose gives galactose and glucose, maltose gives two glucose.\n" +
        "- **Polysaccharides** give a very large number of units: starch, cellulose, glycogen.\n" +
        "- By carbonyl and chain length: glucose is an **aldohexose**, fructose a **ketohexose**, ribose an aldopentose, glyceraldehyde an aldotriose.\n" +
        "- **All monosaccharides, aldose or ketose, are reducing sugars** (NCERT). Fructose has no CHO, yet it reduces Tollens' reagent because in base it isomerises through an enediol to glucose and mannose.\n" +
        "- In solution a monosaccharide's open-chain and cyclic forms coexist at equilibrium, as for D-(+)-glucose; the small open-chain share is what reduces the reagent.\n" +
        "- The named colour tests (Benedict's, Barfoed's, Seliwanoff's, xanthoproteic) come from the practical manual, not from the chapter text of NCERT.",
      table: {
        columns: ["Test", "Reagent", "Positive for", "What you see"],
        rows: [
          { cells: ["Fehling's", "Copper(II) sulphate with sodium potassium tartrate in NaOH", "Every reducing sugar", "Red precipitate of Cu₂O"] },
          { cells: ["Benedict's", "Copper(II) sulphate with sodium citrate and sodium carbonate", "Every reducing sugar", "Orange-red precipitate of Cu₂O"] },
          { cells: ["Tollens'", "\\(\\mathrm{[Ag(NH_3)_2]^+}\\) in ammonia", "Every reducing sugar, fructose included", "Silver mirror"] },
          { cells: ["Barfoed's", "Copper(II) acetate in dilute acetic acid", "Reducing monosaccharides, within about two minutes", "Red Cu₂O; reducing disaccharides react only after long heating"] },
          { cells: ["Seliwanoff's", "Resorcinol in hydrochloric acid", "Ketoses quickly; aldoses and pentoses only slowly", "Cherry-red colour"] },
          { cells: ["Iodine", "Iodine in potassium iodide solution", "Starch", "Blue-black colour"] },
          { cells: ["Biuret", "Dilute copper(II) sulphate in NaOH", "Two or more peptide bonds: proteins, tripeptides, biuret itself", "Violet colour"] },
          { cells: ["Xanthoproteic", "Concentrated nitric acid", "Proteins with aromatic side chains", "Yellow colour, orange with ammonia"] },
        ],
        caption: "Seliwanoff's and the iodine test use no copper; Fehling's, Benedict's, Barfoed's and the biuret test all do.",
      },
      selfCheckExample: {
        prompt: "Name one test that tells glucose from sucrose, and one that tells glucose from fructose.",
        steps: [
          "Glucose is a reducing sugar and sucrose is not, so Fehling's or Tollens' reagent is positive for glucose only.",
          "Both glucose and fructose reduce Tollens' reagent, so that test cannot separate them.",
          "Seliwanoff's reagent turns cherry red quickly with a ketose (fructose) and only slowly with an aldose (glucose).",
        ],
        answer: "Fehling's (or Tollens') for glucose against sucrose; Seliwanoff's for glucose against fructose.",
      },
      practiceSet: [
        { prompt: "Classify ribose by its carbonyl group and chain length.", answer: "Aldopentose" },
        { prompt: "What colour does starch give with iodine?", answer: "Blue-black" },
        { prompt: "How many monosaccharide units does an oligosaccharide give on hydrolysis?", answer: "2 to 10" },
        { prompt: "What is the red precipitate formed by a reducing sugar with Fehling's solution?", answer: "Copper(I) oxide, Cu₂O" },
      ],
      pyqExampleId: "86762191-9cb4-4794-bc73-5e1b1be3d305", // 2026 — incorrect statement on carbohydrate classes
      traps: [
        {
          title: "Oligosaccharide units need not be identical",
          body: "Only maltose gives two identical units. Sucrose gives glucose and fructose, and lactose gives galactose and glucose, so a statement that the units are always the same is false.",
        },
        {
          title: "Fructose reduces Tollens' reagent without a CHO group",
          body: "In alkaline solution fructose rearranges through an enediol to glucose and mannose, which carry CHO. So a ketose still gives the silver mirror, and every monosaccharide counts as reducing.",
        },
        {
          title: "Seliwanoff's test uses no copper",
          body: "Seliwanoff's reagent is resorcinol in hydrochloric acid; it works by dehydrating the sugar to a furfural that couples with resorcinol. Fehling's, Benedict's, Barfoed's and the biuret test all use copper(II).",
        },
      ],
    },

    // C2 — reactions of glucose
    {
      kind: "formula" as const,
      slug: "jcbio-glucose-reactions",
      name: "Reactions that prove the open-chain structure of glucose",
      intuition:
        "Each reagent answers one question about glucose. HI strips every oxygen and shows the six carbons are in a straight chain. Hydroxylamine and HCN show a carbonyl group. Bromine water, a mild oxidant, turns it into an acid of the same length, so the carbonyl is an aldehyde. Acetic anhydride counts the OH groups. Nitric acid oxidises both ends, so the other end is a primary alcohol. Read the same way, the reactions of an unknown sugar give its structure.",
      definition:
        "- **HI, prolonged heating** → n-hexane: the six carbons form a straight chain. An unknown sugar giving isopentane has a branched chain.\n" +
        "- **\\(\\mathrm{NH_2OH}\\)** → oxime; **HCN** → cyanohydrin: a carbonyl group is present.\n" +
        "- **Bromine water** → gluconic acid, \\(\\mathrm{COOH(CHOH)_4CH_2OH}\\): the carbonyl is an aldehyde, and only the CHO is oxidised.\n" +
        "- **Acetic anhydride** → glucose pentaacetate: five OH groups, on five different carbons, since the compound is stable.\n" +
        "- **Nitric acid** → saccharic (glucaric) acid, \\(\\mathrm{COOH(CHOH)_4COOH}\\): both the CHO and the primary \\(\\mathrm{CH_2OH}\\) are oxidised.\n" +
        "- **\\(\\mathrm{NaHCO_3}\\)** → no reaction: glucose has no COOH.\n" +
        "- Adding HCN and hydrolysing the nitrile adds one carbon: fructose \\(\\mathrm{C_6H_{12}O_6}\\) gives the acid \\(\\mathrm{C_7H_{14}O_8}\\). \\(\\mathrm{NaBH_4}\\) reduces the carbonyl to a hexitol, \\(\\mathrm{C_6H_{14}O_6}\\), which HI then reduces to n-hexane.\n" +
        "- Preparation (NCERT): sucrose boiled with dilute HCl or \\(\\mathrm{H_2SO_4}\\) in alcoholic solution gives glucose and fructose; starch boiled with **dilute** \\(\\mathrm{H_2SO_4}\\) at 393 K under 2 to 3 atm gives glucose.\n" +
        "- Glucose dissolves in water because of its five OH groups, which hydrogen-bond with water, not because of its aldehyde group.",
      formula: {
        label: "Glucose with bromine water, nitric acid and acetic anhydride",
        latex:
          "\\mathrm{CHO(CHOH)_4CH_2OH} \\xrightarrow{\\mathrm{Br_2\\ water}} \\mathrm{COOH(CHOH)_4CH_2OH} \\qquad \\mathrm{CHO(CHOH)_4CH_2OH} \\xrightarrow{\\mathrm{HNO_3}} \\mathrm{COOH(CHOH)_4COOH} \\qquad M_{\\text{acetate}} = M_{\\text{sugar}} + 42\\,n_{\\mathrm{OH}}",
      },
      authoredExample: {
        prompt:
          "Glucose (molar mass 180 g mol\\(^{-1}\\)) is warmed with excess acetic anhydride. How many acetyl groups add, and what are the molecular formula and molar mass of the product?",
        steps: [
          "Glucose has five OH groups, so five acetyl groups add.",
          "Each acetylation replaces an H by \\(\\mathrm{COCH_3}\\), a net gain of \\(\\mathrm{C_2H_2O}\\) = 42 g mol\\(^{-1}\\).",
          "Formula: \\(\\mathrm{C_6H_{12}O_6} + 5\\,\\mathrm{C_2H_2O} = \\mathrm{C_{16}H_{22}O_{11}}\\).",
          "Molar mass: \\(180 + 5 \\times 42 = 390\\) g mol\\(^{-1}\\).",
        ],
        answer: "Five acetyl groups; glucose pentaacetate, \\(\\mathrm{C_{16}H_{22}O_{11}}\\), 390 g mol\\(^{-1}\\).",
      },
      selfCheckExample: {
        prompt: "Give the molecular formula of the product when glucose is oxidised by bromine water, and when it is oxidised by nitric acid.",
        steps: [
          "Bromine water turns only CHO into COOH: \\(\\mathrm{C_6H_{12}O_6}\\) gains one O, giving gluconic acid, \\(\\mathrm{C_6H_{12}O_7}\\).",
          "Nitric acid also turns the terminal \\(\\mathrm{CH_2OH}\\) into COOH, which gains one more O and loses two H: saccharic acid, \\(\\mathrm{C_6H_{10}O_8}\\).",
        ],
        answer: "Gluconic acid \\(\\mathrm{C_6H_{12}O_7}\\); saccharic acid \\(\\mathrm{C_6H_{10}O_8}\\).",
      },
      practiceSet: [
        { prompt: "What does prolonged heating of glucose with HI give?", answer: "n-Hexane" },
        { prompt: "What is the molecular formula of the cyanohydrin formed from glucose and HCN?", answer: "\\(\\mathrm{C_7H_{13}NO_6}\\)" },
        { prompt: "Which reagent oxidises only the CHO group of glucose?", answer: "Bromine water" },
        { prompt: "What does glucose give with \\(\\mathrm{NaHCO_3}\\)?", answer: "No reaction, since glucose has no COOH group" },
      ],
      pyqExampleId: "3ecb5fda-ba8d-4331-a5cb-86a815a49d44", // 2022 — HI / Br2 water / Ac2O / HNO3 match list
      traps: [
        {
          title: "Bromine water stops at one acid group",
          body: "Bromine water oxidises only the CHO of glucose and gives gluconic acid, a monocarboxylic acid. The dicarboxylic saccharic acid needs nitric acid, which also oxidises the terminal CH₂OH.",
        },
        {
          title: "Starch is hydrolysed by dilute acid",
          body: "NCERT boils starch with dilute H₂SO₄ at 393 K under 2 to 3 atm to get glucose. A statement that uses concentrated sulphuric acid is false.",
        },
        {
          title: "The acetate count is the OH count",
          body: "A sugar that forms a tetraacetate has four OH groups and a pentaacetate five. Glucose pentaacetate has no free CHO, so it does not react with hydroxylamine or 2,4-DNP.",
        },
      ],
    },
  ],
};
