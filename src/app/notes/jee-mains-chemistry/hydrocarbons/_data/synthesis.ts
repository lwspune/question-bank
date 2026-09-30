import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/jee-mains-chemistry/hydrocarbons";

export const SYNTHESIS_HC_NOTE: SubtopicNote = {
  subtopicName: "Friedel-Crafts, Side-Chain Oxidation and Arene Synthesis",
  title: "Friedel–Crafts, Side-Chain Oxidation and Arene Synthesis",
  oneLineDefinition:
    "Friedel–Crafts alkylation goes through a carbocation that may rearrange, while acylation does not; hot KMnO₄ cuts any side chain with a benzylic H down to –COOH; and the order in which groups are put on a ring decides where they end up.",
  whyItMatters:
    "Nineteen PYQs, sixteen of them multiple choice, and three from 2026. Five are Friedel–Crafts products or the carbocation behind them, including rearranged and ring-closing alkylations. Seven oxidise a side chain with KMnO₄, then often ask for a count of π bonds or a mass of product. Seven give or ask for the order of reagents that builds a disubstituted benzene. Three of the nineteen ask for a number.",
  concepts: [
    // C1 — Friedel–Crafts
    {
      kind: "reference" as const,
      slug: "jchc-friedel-crafts",
      name: "Friedel–Crafts alkylation and acylation",
      intuition:
        "In alkylation, AlCl₃ turns an alkyl halide into a carbocation. If that cation is primary or secondary and a hydride or methyl shift would make it more stable, it shifts before it attacks the ring, so the alkyl group on the product may not match the halide. The product is also more reactive than benzene, so more alkyl groups can go on. Acylation avoids both problems: the acylium ion does not rearrange, and the C=O it puts on the ring deactivates it, so only one acyl group enters.",
      definition:
        "- **Alkylation**: \\(\\mathrm{C_6H_6 + RCl \\xrightarrow{anhyd.\\ AlCl_3} C_6H_5R + HCl}\\). Rearrangement and polyalkylation are both likely.\n" +
        "- An alkene with HF or H₂SO₄, or an alcohol with acid, can supply the carbocation instead of RCl.\n" +
        "- A chain bearing both the ring and the cation can close a new ring (intramolecular alkylation), usually six-membered.\n" +
        "- **Acylation**: \\(\\mathrm{C_6H_6 + RCOCl \\xrightarrow{anhyd.\\ AlCl_3} C_6H_5COR + HCl}\\). No rearrangement, one substitution.\n" +
        "- To attach an unbranched chain, acylate and then reduce C=O to CH₂ (Clemmensen: Zn–Hg, conc. HCl).",
      table: {
        columns: ["Reagent with benzene and AlCl₃", "Cation formed", "Does it rearrange?", "Main product"],
        rows: [
          { cells: ["\\(\\mathrm{CH_3Cl}\\)", "\\(\\mathrm{CH_3^+}\\)", "No", "Toluene"] },
          { cells: ["\\(\\mathrm{(CH_3)_2CHCH_2Cl}\\) (isobutyl chloride)", "Primary, shifts to tertiary", "Yes (hydride shift)", "tert-Butylbenzene"] },
          { cells: ["Cyclohexene with HF", "Cyclohexyl cation", "No", "Cyclohexylbenzene"] },
          { cells: ["\\(\\mathrm{CH_3CH_2CH_2COCl}\\)", "Acylium ion", "No", "Butyrophenone (1-phenylbutan-1-one)"] },
          { cells: ["\\(\\mathrm{CH_3CH_2CH_2COCl}\\), then Zn–Hg/HCl", "Acylium ion", "No", "n-Butylbenzene"] },
        ],
        caption: "Alkyl halides can rearrange before they attack; acyl chlorides never do, so acylation then reduction gives a straight chain.",
      },
      selfCheckExample: {
        prompt: "Benzene is treated with 1-chloro-2-methylpropane and anhydrous AlCl₃. What is the major product?",
        steps: [
          "AlCl₃ removes Cl⁻, leaving the primary cation \\(\\mathrm{(CH_3)_2CH{-}CH_2^+}\\).",
          "A hydride shifts from the next carbon, giving the tertiary cation \\(\\mathrm{(CH_3)_3C^+}\\), which attacks the ring.",
        ],
        answer: "tert-Butylbenzene",
      },
      practiceSet: [
        { prompt: "Why does acylation stop after one group enters?", answer: "The C=O deactivates the ring" },
        { prompt: "How would you make n-propylbenzene from benzene without rearrangement?", answer: "CH₃CH₂COCl/AlCl₃, then Clemmensen reduction" },
        { prompt: "What product does benzene give with propan-2-ol and conc. H₂SO₄?", answer: "Cumene (isopropylbenzene)" },
        { prompt: "Can nitrobenzene be methylated by CH₃Cl and AlCl₃?", answer: "No; its ring is too deactivated" },
      ],
      pyqExampleId: "4f2ec620-4434-4a97-9728-c8d456b1c17d", // 2022 — the stable carbocation in alkylation with 1-chloropropane
      traps: [
        {
          title: "The alkyl group on the ring may differ from the halide",
          body: "A primary or secondary cation that can shift to a more stable one does so first. Always ask whether a hydride or methyl shift is possible before writing the product.",
        },
        {
          title: "Polyalkylation is likely, not certain",
          body: "An alkyl group activates the ring, so a second alkylation can follow. Using excess benzene keeps the monoalkyl product as the main one.",
        },
      ],
    },

    // C2 — side-chain oxidation
    {
      kind: "formula" as const,
      slug: "jchc-side-chain-oxidation",
      name: "Side-chain oxidation to benzoic acid",
      intuition:
        "Hot KMnO₄ (or acidified K₂Cr₂O₇) attacks the side chain at the benzylic carbon, the one joined to the ring. If that carbon has at least one H, the whole chain is cut back to one carbon and becomes –COOH, however long the chain was. If the benzylic carbon has no H, as in a tert-butyl group, the chain survives. The ring itself is not touched.",
      definition:
        "- Any side chain with a benzylic H → –COOH: methyl, ethyl, propyl, isopropyl, –CH=CH₂ and –CH₂COOCH₃ all give benzoic acid.\n" +
        "- No benzylic H (–C(CH₃)₃, –C(CH₃)₂OH): no oxidation.\n" +
        "- In alkaline KMnO₄ the product is the carboxylate salt; acidifying gives the acid.\n" +
        "- Two side chains give a dicarboxylic acid: p-xylene gives terephthalic acid.",
      formula: {
        label: "Side-chain oxidation",
        latex: "\\mathrm{C_6H_5{-}CH_2R \\xrightarrow{(i)\\ KMnO_4,\\ KOH,\\ \\Delta\\quad (ii)\\ H_3O^+} C_6H_5{-}COOH}",
      },
      authoredExample: {
        prompt: "1-tert-Butyl-4-methylbenzene is heated with alkaline KMnO₄ and then acidified. What forms?",
        steps: [
          "The CH₃ group has benzylic H, so it becomes –COOH.",
          "The tert-butyl group's benzylic carbon carries three methyls and no H, so it is not oxidised.",
          "The ring keeps both positions: –COOH and –C(CH₃)₃ are para.",
        ],
        answer: "4-tert-Butylbenzoic acid",
      },
      selfCheckExample: {
        prompt: "What does n-propylbenzene give with hot alkaline KMnO₄, followed by acid?",
        steps: [
          "The benzylic carbon of the propyl chain has two H.",
          "The chain is cut back to the benzylic carbon, which becomes –COOH; the other two carbons are lost.",
        ],
        answer: "Benzoic acid",
      },
      practiceSet: [
        { prompt: "Does tert-butylbenzene give benzoic acid with hot KMnO₄?", answer: "No; it has no benzylic H" },
        { prompt: "What does 4-methylisopropylbenzene (p-cymene) give with hot KMnO₄?", answer: "Terephthalic acid (benzene-1,4-dicarboxylic acid)" },
        { prompt: "How many π bonds are there in benzoic acid?", answer: "4 (three in the ring, one C=O)" },
        { prompt: "0.2 mol of benzoic acid reacts with excess NaHCO₃. What volume of CO₂ forms at STP?", answer: "4.48 L" },
      ],
      pyqExampleId: "e16f7aa6-06a0-42a0-b47a-6d8cabc4cfc6", // 2024 — side-chain oxidation, then nitration; π-bond count
      traps: [
        {
          title: "The whole chain goes, however long",
          body: "Ethylbenzene, propylbenzene and isobutylbenzene all give benzoic acid, with one carbon left on the ring. The product is never phenylacetic acid.",
        },
        {
          title: "Check for a benzylic H before oxidising",
          body: "tert-Butylbenzene and 2-phenylpropan-2-ol have no H on the benzylic carbon, so hot KMnO₄ leaves them alone.",
        },
        {
          title: "–COOH directs the next group meta",
          body: "Once the side chain has become –COOH, it is a meta-directing, deactivating group. A nitration after oxidation goes meta; a nitration before it goes ortho and para to the alkyl group.",
        },
      ],
    },

    // C3 — order of steps
    {
      kind: "reference" as const,
      slug: "jchc-arene-sequence",
      name: "Choosing the order of steps for a disubstituted benzene",
      intuition:
        "The first group on the ring decides where the second goes. So work backwards from the target: if the two groups are meta, the first one put on must be a meta director; if they are ortho or para, it must be an ortho-para director. Two more rules narrow the choice: Friedel–Crafts cannot be done on a deactivated ring, and a group can be changed after it is placed (CH₃ to COOH, NO₂ to NH₂), which lets you use its directing effect before it changes.",
      definition:
        "- Meta target: put the meta director on first.\n" +
        "- Ortho or para target: put the ortho-para director on first; separate the para isomer.\n" +
        "- Do any Friedel–Crafts step BEFORE adding –NO₂, –COR or –SO₃H.\n" +
        "- Oxidising CH₃ to COOH switches the group from ortho-para to meta directing; reducing NO₂ to NH₂ switches it from meta to ortho-para.",
      table: {
        columns: ["Target", "Order of steps", "Why this order", "Wrong order gives"],
        rows: [
          { cells: ["m-Bromonitrobenzene", "HNO₃/H₂SO₄, then Br₂/FeBr₃", "–NO₂ sends Br meta", "o- and p-bromonitrobenzene"] },
          { cells: ["p-Bromonitrobenzene", "Br₂/FeBr₃, then HNO₃/H₂SO₄; separate para", "–Br sends NO₂ ortho and para", "m-Bromonitrobenzene"] },
          { cells: ["m-Nitroacetophenone", "CH₃COCl/AlCl₃, then HNO₃/H₂SO₄", "Acylation fails on nitrobenzene; –COCH₃ sends NO₂ meta", "No reaction at the acylation step"] },
          { cells: ["3-Bromobenzoic acid (from toluene)", "KMnO₄, then Br₂/FeBr₃", "–COOH sends Br meta", "2- and 4-bromobenzoic acid"] },
          { cells: ["4-Bromobenzoic acid (from toluene)", "Br₂/FeBr₃, separate para, then KMnO₄", "–CH₃ sends Br ortho and para", "3-Bromobenzoic acid"] },
        ],
        caption: "Work back from the target: the relationship of the two groups tells you which one went on first.",
      },
      selfCheckExample: {
        prompt: "Give the order of reagents to make p-nitrobenzoic acid from benzene.",
        steps: [
          "The groups are para, so the first group must be ortho-para directing: put on CH₃ (CH₃Cl/AlCl₃) to make toluene.",
          "Nitrate (HNO₃/H₂SO₄) and separate the para isomer.",
          "Oxidise the CH₃ with hot KMnO₄ and acidify.",
        ],
        answer: "CH₃Cl/AlCl₃; HNO₃/H₂SO₄; KMnO₄, then H₃O⁺",
      },
      practiceSet: [
        { prompt: "Which goes on first for m-chloronitrobenzene: Cl or NO₂?", answer: "NO₂" },
        { prompt: "Why can m-nitroacetophenone not be made by acylating nitrobenzene?", answer: "Friedel–Crafts fails on the deactivated nitrobenzene ring" },
        { prompt: "What does reducing –NO₂ to –NH₂ do to its directing effect?", answer: "Changes it from meta to ortho-para" },
        { prompt: "Which order makes 3-bromobenzoic acid from toluene?", answer: "Oxidise with KMnO₄ first, then brominate" },
      ],
      pyqExampleId: "ca7e0a6e-1bf5-4310-af0f-aee023e42475", // 2021 — order of reagents for 3-nitrobenzoic acid from benzene
      traps: [
        {
          title: "Friedel–Crafts must come before any strong deactivator",
          body: "Once –NO₂, –COR or –SO₃H is on the ring, AlCl₃ reactions stop working. A sequence that nitrates first and alkylates or acylates later is wrong.",
        },
        {
          title: "A later change of group can flip its direction",
          body: "–CH₃ directs ortho and para but becomes –COOH (meta) after oxidation. The step order must use each group while it has the directing effect you need.",
        },
      ],
    },
  ],
  related: [
    { label: "Electrophilic Substitution: Reactivity and Directing Effects — the rules behind every sequence", href: `${BASE}/jch-hc-eas` },
  ],
};
