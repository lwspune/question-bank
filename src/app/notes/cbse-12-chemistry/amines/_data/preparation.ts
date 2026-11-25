import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_AM_PREPARATION_NOTE: SubtopicNote = {
  subtopicName: "Preparation of Amines",
  title: "Preparation of Amines",
  oneLineDefinition:
    "NCERT's six methods: reduction of nitro compounds, nitriles and amides, ammonolysis of alkyl halides, Gabriel phthalimide synthesis and Hoffmann bromamide degradation, chosen by the carbon count and the class of amine you want.",
  whyItMatters:
    "51 questions, forty-three of them from board papers. Hoffmann bromamide degradation is asked every year from 2022 to 2026: which compound gives it, its reagents, the form in which the lost carbon leaves, or the step that drops one carbon in an \"identify A, B and C\" chain. Gabriel synthesis came as assertion-reason in 2024, 2025 and 2026 (why aromatic amines cannot be made by it), ammonolysis in 2023, 2024 and 2025 (why it gives a mixture), and the reduction of nitrobenzene or of a nitrile every year.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcam-reduction",
      name: "Reduction of nitro compounds, nitriles and amides",
      intuition:
        "Reduction only adds hydrogen (and takes away oxygen); it never adds or removes a carbon. So a reduction product has exactly the carbons of the starting compound. A nitro group becomes an amino group, a nitrile -C≡N becomes -CH₂NH₂, and an amide -CONH₂ becomes -CH₂NH₂.",
      definition:
        "- **Nitro compounds** are reduced by hydrogen with finely divided **nickel, palladium or platinum**, or by a **metal in acid** (Sn + HCl, Fe + HCl). Nitroalkanes are reduced the same way to alkanamines.\n" +
        "- **Iron scrap and HCl is preferred:** the FeCl₂ formed is hydrolysed and releases HCl during the reaction, so only a small amount of acid is needed to start it.\n" +
        "- In the acid the amine forms as its salt; a base such as NaOH sets the free amine free.\n" +
        "- **Nitriles** are reduced by **LiAlH₄** or by catalytic hydrogenation to primary amines, R-CH₂NH₂. This is used for the **ascent** of the amine series: R-X with cyanide, then reduction, gives an amine with one carbon more than R.\n" +
        "- **Amides** are reduced by **LiAlH₄** (then water) to amines with the same number of carbons: R-CONH₂ gives R-CH₂NH₂.",
      formula: {
        label: "Reduction of nitrobenzene to aniline",
        latex: "\\text{C}_6\\text{H}_5\\text{NO}_2 \\xrightarrow{\\text{Fe scrap} + \\text{HCl}} \\text{C}_6\\text{H}_5\\text{NH}_2",
      },
      authoredExample: {
        prompt: "Convert 1-bromopropane into butan-1-amine. Name the reagents.",
        steps: [
          "Count the carbons: three in, four out, so one carbon must be added. Cyanide adds it.",
          "\\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{Br} \\xrightarrow{\\text{ethanolic NaCN}} \\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CN}\\) (butanenitrile)",
          "Reduce the nitrile; the carbon count stays at four.",
          "\\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CN} \\xrightarrow{\\text{LiAlH}_4 \\text{ or } \\text{H}_2/\\text{Ni}} \\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CH}_2\\text{NH}_2\\)",
        ],
        answer: "Ethanolic NaCN gives butanenitrile; LiAlH₄ (or H₂ with Ni) reduces it to butan-1-amine",
      },
      selfCheckExample: {
        prompt: "Benzamide, C₆H₅CONH₂, is reduced with LiAlH₄ and then water. Write the product and its name.",
        steps: [
          "LiAlH₄ reduces the C=O of the amide to CH₂ and keeps every carbon.",
          "\\(\\text{C}_6\\text{H}_5\\text{CONH}_2 \\xrightarrow[\\text{(ii) H}_2\\text{O}]{\\text{(i) LiAlH}_4} \\text{C}_6\\text{H}_5\\text{CH}_2\\text{NH}_2\\)",
        ],
        answer: "C₆H₅CH₂NH₂, benzylamine (phenylmethanamine), with all seven carbons kept",
      },
      practiceSet: [
        { prompt: "Why is iron scrap and HCl preferred to tin and HCl for reducing nitrobenzene?", answer: "The FeCl₂ formed is hydrolysed and releases HCl, so only a small amount of HCl is needed to start the reaction" },
        { prompt: "Name the amine formed when nitromethane is reduced with hydrogen over palladium.", answer: "Methanamine, CH₃NH₂" },
        { prompt: "How will you convert benzene into aniline?", answer: "Nitrate with conc. HNO₃ and conc. H₂SO₄ to nitrobenzene, then reduce with Sn and HCl (or Fe and HCl) and free the amine with NaOH" },
      ],
      pyqExampleId: "8892e446-f3d8-4a48-9d40-5a895c245958",
      traps: [
        {
          title: "Losing or gaining a carbon in a reduction",
          body: "A nitrile keeps its -CN carbon when reduced: CH₃CH₂CN gives CH₃CH₂CH₂NH₂, propan-1-amine, with three carbons, never ethylamine or butylamine. Count carbons before and after.",
        },
        {
          title: "The wrong reagent for a nitro group",
          body: "For nitrobenzene to aniline use the reagents NCERT names for nitro groups: H₂ with Ni, Pd or Pt, or Sn or Fe with HCl. Board 2023 offered LiAlH₄ as the choice that is not good for this.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcam-ammonolysis",
      name: "Ammonolysis of alkyl halides",
      intuition:
        "Ammonia's lone pair attacks the carbon of an alkyl halide and pushes the halide out. The amine formed still has a lone pair, and its alkyl group makes that lone pair even more available, so it attacks the next halide molecule too. The reaction runs on to secondary and tertiary amines and a quaternary salt unless ammonia is in large excess.",
      definition:
        "- An alkyl or benzyl halide is heated with an **ethanolic solution of ammonia** in a **sealed tube at 373 K**. The halogen is replaced by -NH₂ (nucleophilic substitution). Cleavage of the C-X bond by ammonia is called **ammonolysis**.\n" +
        "- The primary amine formed is itself a nucleophile and reacts further with the halide, giving **secondary and tertiary amines and finally a quaternary ammonium salt**.\n" +
        "- The free amine is obtained from its ammonium salt by treatment with a **strong base** (NaOH).\n" +
        "- **Disadvantage:** the product is a **mixture** of 1°, 2° and 3° amines and the quaternary salt.\n" +
        "- **A large excess of ammonia** gives the primary amine as the major product.\n" +
        "- Reactivity of halides with amines: **RI > RBr > RCl**.",
      formula: {
        label: "Ammonolysis runs on to the quaternary salt",
        latex: "\\text{R-X} \\xrightarrow{\\text{NH}_3} \\text{RNH}_2 \\xrightarrow{\\text{RX}} \\text{R}_2\\text{NH} \\xrightarrow{\\text{RX}} \\text{R}_3\\text{N} \\xrightarrow{\\text{RX}} \\text{R}_4\\text{N}^+\\text{X}^-",
      },
      authoredExample: {
        prompt: "Write the equations for bromomethane reacting with ethanolic ammonia until the quaternary salt forms. Name each product.",
        steps: [
          "\\(\\text{CH}_3\\text{Br} \\xrightarrow{\\text{NH}_3} \\text{CH}_3\\text{NH}_2\\) (methanamine)",
          "\\(\\text{CH}_3\\text{NH}_2 \\xrightarrow{\\text{CH}_3\\text{Br}} (\\text{CH}_3)_2\\text{NH}\\) (N-methylmethanamine)",
          "\\((\\text{CH}_3)_2\\text{NH} \\xrightarrow{\\text{CH}_3\\text{Br}} (\\text{CH}_3)_3\\text{N}\\) (N,N-dimethylmethanamine)",
          "\\((\\text{CH}_3)_3\\text{N} \\xrightarrow{\\text{CH}_3\\text{Br}} (\\text{CH}_3)_4\\text{N}^+\\text{Br}^-\\) (tetramethylammonium bromide)",
        ],
        answer: "Methanamine, then N-methylmethanamine, N,N-dimethylmethanamine and tetramethylammonium bromide",
      },
      selfCheckExample: {
        prompt: "Why is ammonolysis of an alkyl halide not a good way to make a pure primary amine?",
        steps: [
          "The primary amine formed is a nucleophile, so it reacts with more alkyl halide.",
          "That gives the secondary amine, then the tertiary amine, then the quaternary salt.",
          "The product is a mixture that is hard to separate.",
        ],
        answer: "It gives a mixture of primary, secondary and tertiary amines and the quaternary salt",
      },
      practiceSet: [
        { prompt: "Arrange RCl, RBr and RI in order of reactivity towards ammonia.", answer: "RI > RBr > RCl" },
        { prompt: "How is the free amine obtained from its ammonium salt?", answer: "By treating the salt with a strong base such as NaOH" },
        { prompt: "What is the main product when ammonia reacts with a large excess of ethyl bromide?", answer: "The quaternary salt, tetraethylammonium bromide, (C₂H₅)₄N⁺Br⁻" },
      ],
      pyqExampleId: "106117a1-9690-4d12-9766-2a9577540f42",
      traps: [
        {
          title: "\"Ammonolysis gives mainly secondary amines\"",
          body: "False, and the board used it as a false Reason in 2023 and 2024. Ammonolysis gives a mixture; excess ammonia makes the primary amine the major product.",
        },
        {
          title: "Mixing up which reagent is in excess",
          body: "Excess ammonia gives mainly the primary amine. Excess alkyl halide drives the reaction to the quaternary ammonium salt. Read which one the question puts in excess.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcam-gabriel",
      name: "Gabriel phthalimide synthesis",
      intuition:
        "Phthalimide has one N-H. Remove that hydrogen with KOH and the nitrogen becomes a negative ion that attacks an alkyl halide. Because the nitrogen has no other hydrogen to lose, it can take only one alkyl group, so the amine set free at the end is always a pure primary amine.",
      definition:
        "- **Step 1:** phthalimide with **ethanolic KOH** forms the potassium salt of phthalimide.\n" +
        "- **Step 2:** heating this salt with an **alkyl halide** gives N-alkylphthalimide (nucleophilic substitution by the phthalimide anion).\n" +
        "- **Step 3:** **alkaline hydrolysis** sets the primary amine free.\n" +
        "- It is used to prepare **primary amines** only.\n" +
        "- **Aromatic primary amines cannot be prepared this way**, because aryl halides do not undergo nucleophilic substitution with the anion formed by phthalimide.",
      formula: {
        label: "Gabriel phthalimide synthesis",
        latex: "\\text{C}_6\\text{H}_4(\\text{CO})_2\\text{NH} \\xrightarrow{\\text{KOH (ethanolic)}} \\text{C}_6\\text{H}_4(\\text{CO})_2\\text{N}^-\\text{K}^+ \\xrightarrow[\\Delta]{\\text{R-X}} \\text{C}_6\\text{H}_4(\\text{CO})_2\\text{N-R} \\xrightarrow{\\text{NaOH (aq)}} \\text{R-NH}_2 + \\text{C}_6\\text{H}_4(\\text{COONa})_2",
        symbols: [
          { symbol: "\\(\\text{C}_6\\text{H}_4(\\text{CO})_2\\text{NH}\\)", meaning: "phthalimide" },
          { symbol: "\\(\\text{R-X}\\)", meaning: "an alkyl halide (not an aryl halide)" },
        ],
      },
      authoredExample: {
        prompt: "Prepare propan-1-amine by Gabriel phthalimide synthesis.",
        steps: [
          "Phthalimide with ethanolic KOH gives potassium phthalimide.",
          "Heat it with 1-bromopropane: \\(\\text{C}_6\\text{H}_4(\\text{CO})_2\\text{N}^-\\text{K}^+ + \\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{Br} \\longrightarrow \\text{C}_6\\text{H}_4(\\text{CO})_2\\text{N-CH}_2\\text{CH}_2\\text{CH}_3 + \\text{KBr}\\)",
          "Hydrolyse with aqueous NaOH: \\(\\text{C}_6\\text{H}_4(\\text{CO})_2\\text{N-C}_3\\text{H}_7 \\xrightarrow{\\text{NaOH (aq)}} \\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{NH}_2 + \\text{C}_6\\text{H}_4(\\text{COONa})_2\\)",
        ],
        answer: "Potassium phthalimide and 1-bromopropane give N-propylphthalimide, whose alkaline hydrolysis gives propan-1-amine",
      },
      selfCheckExample: {
        prompt: "Can benzylamine, C₆H₅CH₂NH₂, be made by Gabriel synthesis? Give the reason.",
        steps: [
          "Benzylamine would come from benzyl chloride, C₆H₅CH₂Cl.",
          "In benzyl chloride the halogen is on a CH₂ carbon outside the ring, not on the ring itself.",
          "Benzyl halides undergo nucleophilic substitution easily, so the phthalimide anion can attack.",
        ],
        answer: "Yes: benzyl chloride undergoes nucleophilic substitution with the phthalimide anion, unlike an aryl halide",
      },
      practiceSet: [
        { prompt: "What is the role of ethanolic KOH in Gabriel synthesis?", answer: "It forms the potassium salt of phthalimide, whose anion is the nucleophile" },
        { prompt: "Which class of amine does Gabriel synthesis give?", answer: "Primary amines only" },
        { prompt: "What is the last step of Gabriel synthesis?", answer: "Alkaline hydrolysis of the N-alkylphthalimide, which sets the primary amine free" },
      ],
      pyqExampleId: "53c0923c-d935-42f9-bf37-4b23f50ddc18",
      traps: [
        {
          title: "A Reason that only restates the fact",
          body: "\"Gabriel synthesis is used for aliphatic primary amines\" is true but does not say why aromatic amines fail, so it is not the explanation (B). The explanation is that aryl halides do not undergo nucleophilic substitution with the phthalimide anion.",
        },
        {
          title: "Code (D) in Chemistry",
          body: "In CBSE Chemistry papers (D) means the Assertion is false and the Reason is true. \"Aromatic primary amines can be prepared by Gabriel synthesis\" with the true reason about aryl halides is (D).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcam-hofmann",
      name: "Hoffmann bromamide degradation",
      intuition:
        "Bromine and alkali on an amide pull the carbonyl carbon out of the molecule; it leaves as carbonate. The alkyl or aryl group that was on that carbon moves across to the nitrogen. So the amine has one carbon fewer than the amide. That one-carbon drop is what lets you spot the reaction in a chain.",
      definition:
        "- An **amide** is treated with **bromine in an aqueous or ethanolic solution of NaOH** (bromine and NaOH together act as NaOBr).\n" +
        "- The alkyl or aryl group **migrates** from the carbonyl carbon to the nitrogen.\n" +
        "- The amine formed has **one carbon less** than the amide; the carbonyl carbon leaves as **carbonate** (Na₂CO₃).\n" +
        "- It works for aromatic amides too: benzamide gives aniline.\n" +
        "- Use it to step **down** the series by one carbon (an acid, through its amide, to the amine with one carbon fewer). Use cyanide and reduction to step up.\n" +
        "- An acid is turned into its amide by heating its ammonium salt (acid + NH₃, then heat); a nitrile gives the amide by **partial** hydrolysis.",
      formula: {
        label: "Hoffmann bromamide degradation",
        latex: "\\text{R-CONH}_2 + \\text{Br}_2 + 4\\text{NaOH} \\longrightarrow \\text{R-NH}_2 + \\text{Na}_2\\text{CO}_3 + 2\\text{NaBr} + 2\\text{H}_2\\text{O}",
      },
      authoredExample: {
        prompt: "Convert propanoic acid into ethanamine.",
        steps: [
          "Count the carbons: three in, two out, so one carbon must be lost. That is Hoffmann degradation of the amide.",
          "Make the amide: \\(\\text{CH}_3\\text{CH}_2\\text{COOH} \\xrightarrow{\\text{NH}_3} \\text{CH}_3\\text{CH}_2\\text{COONH}_4 \\xrightarrow{\\Delta} \\text{CH}_3\\text{CH}_2\\text{CONH}_2 + \\text{H}_2\\text{O}\\)",
          "Degrade it: \\(\\text{CH}_3\\text{CH}_2\\text{CONH}_2 + \\text{Br}_2 + 4\\text{NaOH} \\longrightarrow \\text{CH}_3\\text{CH}_2\\text{NH}_2 + \\text{Na}_2\\text{CO}_3 + 2\\text{NaBr} + 2\\text{H}_2\\text{O}\\)",
        ],
        answer: "Propanoic acid with NH₃ and heat gives propanamide; Br₂ and NaOH turn it into ethanamine",
      },
      selfCheckExample: {
        prompt: "Write the structure and IUPAC name of the amide that gives butan-1-amine by Hoffmann bromamide degradation.",
        steps: [
          "Butan-1-amine, CH₃CH₂CH₂CH₂NH₂, has four carbons.",
          "The amide must have one carbon more: five.",
        ],
        answer: "CH₃CH₂CH₂CH₂CONH₂, pentanamide",
      },
      practiceSet: [
        { prompt: "In what form is the carbonyl carbon of the amide lost in Hoffmann bromamide degradation?", answer: "As carbonate ion (sodium carbonate)" },
        { prompt: "Which amine does 2-methylpropanamide, (CH₃)₂CHCONH₂, give with Br₂ and NaOH?", answer: "Propan-2-amine, (CH₃)₂CHNH₂" },
        { prompt: "Name the reagents of Hoffmann bromamide degradation.", answer: "The amide, bromine and NaOH (aqueous or ethanolic)" },
      ],
      pyqExampleId: "6ae2575a-2776-4312-bfa1-ddf36f630cfc",
      traps: [
        {
          title: "Reduction of an amide is not Hoffmann",
          body: "LiAlH₄ keeps every carbon: propanamide gives propan-1-amine. Br₂ with NaOH removes one: propanamide gives ethanamine. Board 2025 asked which reagent turns propanamide into propanamine; the answer was LiAlH₄.",
        },
        {
          title: "Full hydrolysis instead of partial",
          body: "In a chain like R-CN, then OH⁻ (partial hydrolysis), then Br₂ + NaOH, the middle product is the amide R-CONH₂, not the acid. Only the amide undergoes Hoffmann degradation.",
        },
        {
          title: "Picking the product as the reactant",
          body: "\"Hoffmann degradation is given by\" asks for the amide, R-CONH₂. The amine R-NH₂ is its product.",
        },
      ],
    },
  ],
};
