import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_AM_PREPARATION_NOTE: SubtopicNote = {
  subtopicName: "Preparation of Amines",
  title: "Preparing Amines",
  oneLineDefinition:
    "The textbook's six ways of making amines: ammonolysis, three reductions (of nitro compounds, nitriles and amides), Gabriel synthesis and Hofmann bromamide degradation, and how to choose one by counting carbon atoms.",
  whyItMatters:
    "22 questions. Twelve were set in board papers from 2015 to 2026: notes on Gabriel phthalimide synthesis (2015) and Hofmann bromamide degradation (2017, 2018), ethylamine from methyl iodide (2015) and from acetaldoxime (2020), the reduction of acetamide (2023, 2025) and of ethyl cyanide (2024), the amine Hofmann degradation gives from acetamide (2024, 2025), converting acetamide into ethylamine (2026), and naming the Mendius reduction (2026). The textbook adds ammonolysis, nitro compounds and longer step up and step down conversions.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccam-ammonolysis-gabriel",
      name: "Ammonolysis and Gabriel phthalimide synthesis",
      intuition:
        "Ammonia can push a halogen out of an alkyl halide and leave an amino group behind. The trouble is that the amine it makes is a better nucleophile than ammonia, so it attacks more alkyl halide and you end up with a mixture. Gabriel's method gets round this: the nitrogen is held inside phthalimide, so only one alkyl group can ever get onto it, and the product is a pure primary amine.",
      definition:
        "- **Ammonolysis:** an alkyl halide heated with alcoholic ammonia in excess, in a sealed tube at 373 K, undergoes nucleophilic substitution: the halogen is replaced by \\(\\text{-NH}_2\\). Breaking the C-X bond by ammonia is called ammonolysis, or alkylation of ammonia.\n" +
        "- Order of reactivity of alkyl halides: R-I > R-Br > R-Cl.\n" +
        "- **Drawback:** the primary amine formed is a stronger nucleophile than ammonia, so unless ammonia is in large excess it reacts further to give secondary and tertiary amines and finally a quaternary ammonium salt.\n" +
        "- tert-Butyl bromide with alcoholic ammonia gives isobutylene instead: elimination wins through the stable tertiary butyl carbocation.\n" +
        "- **Gabriel phthalimide synthesis,** for primary amines only, in three stages:\n" +
        "- Stage 1: phthalimide + alcoholic KOH gives potassium phthalimide and water (the H on the imide nitrogen is acidic).\n" +
        "- Stage 2: potassium phthalimide + R-X gives N-alkylphthalimide and KX.\n" +
        "- Stage 3: alkaline hydrolysis of N-alkylphthalimide with aqueous NaOH gives sodium phthalate and the primary amine R-NH₂.\n" +
        "- **Limitation:** aromatic amines cannot be made this way, because aryl halides do not undergo nucleophilic substitution with the anion formed from phthalimide.",
      formula: {
        label: "Ammonolysis and the last stage of Gabriel synthesis",
        latex:
          "\\text{R-X} + \\text{NH}_3\\ (\\text{alc., excess}) \\xrightarrow{373\\ \\text{K, sealed tube}} \\text{R-NH}_2, \\qquad \\text{N-alkylphthalimide} \\xrightarrow{\\text{NaOH(aq)}} \\text{sodium phthalate} + \\text{R-NH}_2",
      },
      authoredExample: {
        prompt:
          "Write the reaction for the ammonolysis of ethyl bromide. Why must ammonia be used in large excess, and what forms if it is not?",
        steps: [
          "Ethyl bromide is heated with excess alcoholic ammonia in a sealed tube at 373 K:",
          "\\(\\text{C}_2\\text{H}_5\\text{Br} + 2\\text{NH}_3 \\xrightarrow{\\text{alc., 373 K}} \\text{C}_2\\text{H}_5\\text{NH}_2 + \\text{NH}_4\\text{Br}\\)",
          "Ethylamine is a stronger nucleophile than ammonia. If ammonia is not in large excess, it attacks more ethyl bromide: \\(\\text{C}_2\\text{H}_5\\text{NH}_2 + \\text{C}_2\\text{H}_5\\text{Br} \\rightarrow (\\text{C}_2\\text{H}_5)_2\\text{NH} + \\text{HBr}\\).",
          "The reaction then goes on to \\((\\text{C}_2\\text{H}_5)_3\\text{N}\\) and finally \\((\\text{C}_2\\text{H}_5)_4\\text{N}^+\\text{Br}^-\\).",
        ],
        answer: "Ethylamine forms; without a large excess of ammonia a mixture of 1°, 2° and 3° amines and the quaternary salt forms",
      },
      selfCheckExample: {
        prompt: "Which amine does Gabriel phthalimide synthesis give when the alkyl halide used is benzyl chloride, \\(\\text{C}_6\\text{H}_5\\text{CH}_2\\text{Cl}\\)? At which stage is the benzyl group attached?",
        steps: [
          "The benzyl group is attached at the second stage: potassium phthalimide with \\(\\text{C}_6\\text{H}_5\\text{CH}_2\\text{Cl}\\) gives N-benzylphthalimide and KCl.",
          "Hydrolysis with aqueous NaOH then frees the amine, \\(\\text{C}_6\\text{H}_5\\text{CH}_2\\text{NH}_2\\), with sodium phthalate.",
        ],
        answer: "Benzylamine (phenylmethanamine), \\(\\text{C}_6\\text{H}_5\\text{CH}_2\\text{NH}_2\\)",
      },
      practiceSet: [
        { prompt: "Arrange R-Cl, R-I and R-Br in order of reactivity towards ammonia.", answer: "R-I > R-Br > R-Cl" },
        { prompt: "What is formed when tert-butyl bromide is heated with alcoholic ammonia?", answer: "Isobutylene (2-methylpropene), by elimination" },
        { prompt: "Can aniline be prepared by Gabriel phthalimide synthesis?", answer: "No. Aryl halides do not undergo nucleophilic substitution with the phthalimide anion" },
        { prompt: "Which reagent turns phthalimide into potassium phthalimide?", answer: "Alcoholic potassium hydroxide" },
      ],
      pyqExampleId: "4db4cc61-2a35-48c0-8526-226db052f7b8",
      traps: [
        {
          title: "Calling ammonolysis a clean route to a primary amine",
          body: "Ammonolysis gives a mixture unless ammonia is in large excess, because the primary amine reacts further. For a pure primary amine the textbook uses Gabriel synthesis.",
        },
        {
          title: "Gabriel synthesis for aniline",
          body: "Gabriel synthesis cannot make an aromatic amine. In a 'write a note' answer, state this limitation and its reason: aryl halides do not undergo nucleophilic substitution with the phthalimide anion.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccam-reduction",
      name: "Reduction of nitro compounds, nitriles and amides",
      intuition:
        "Three families of compounds already carry a nitrogen atom joined to carbon, and adding hydrogen turns that nitrogen into an amino group. A nitro group loses its two oxygen atoms; a cyano group's triple bond fills up with four hydrogen atoms; an amide's C=O becomes CH₂. In every case the product is a primary amine, and no carbon is lost.",
      definition:
        "- **Nitro compounds:** aliphatic and aromatic nitro compounds are reduced to primary amines by a metal and acid (Sn/HCl, Fe/HCl or Zn/HCl), by catalytic hydrogenation (H₂ with Ni, Pt or Pd), or by LiAlH₄ in ether. Six hydrogen atoms are used: \\(\\text{R-NO}_2 + 6[\\text{H}] \\xrightarrow{\\text{Sn/HCl}} \\text{R-NH}_2 + 2\\text{H}_2\\text{O}\\).\n" +
        "- **Alkyl cyanides (nitriles):** reduction with sodium and ethanol is the **Mendius reduction**; LiAlH₄ also works. \\(\\text{R-C}\\equiv\\text{N} + 4[\\text{H}] \\rightarrow \\text{R-CH}_2\\text{-NH}_2\\). The nitrile carbon stays and carries the amino group.\n" +
        "- **Amides:** reduced by LiAlH₄ in ether (then \\(\\text{H}_3\\text{O}^+\\)) or by Na/C₂H₅OH to primary amines with the SAME number of carbon atoms: \\(\\text{CH}_3\\text{CONH}_2 + 4[\\text{H}] \\rightarrow \\text{CH}_3\\text{CH}_2\\text{NH}_2 + \\text{H}_2\\text{O}\\).\n" +
        "- **Oximes (board 2020 only):** an oxime is reduced the same way, \\(\\text{CH}_3\\text{CH=NOH} + 4[\\text{H}] \\xrightarrow{\\text{Na/C}_2\\text{H}_5\\text{OH}} \\text{CH}_3\\text{CH}_2\\text{NH}_2 + \\text{H}_2\\text{O}\\). The present textbook does not teach this method, so give it less time.",
      formula: {
        label: "Three reductions to primary amines",
        latex:
          "\\text{R-NO}_2 + 6[\\text{H}] \\xrightarrow{\\text{Sn/HCl}} \\text{R-NH}_2 + 2\\text{H}_2\\text{O}, \\quad \\text{R-C}\\equiv\\text{N} + 4[\\text{H}] \\xrightarrow{\\text{Na/C}_2\\text{H}_5\\text{OH}} \\text{R-CH}_2\\text{NH}_2, \\quad \\text{R-CONH}_2 + 4[\\text{H}] \\xrightarrow{\\text{LiAlH}_4} \\text{R-CH}_2\\text{NH}_2 + \\text{H}_2\\text{O}",
      },
      authoredExample: {
        prompt: "Write the reaction and name the product: (a) 2-nitropropane is reduced with Sn/HCl; (b) benzamide is reduced with LiAlH₄ in ether.",
        steps: [
          "(a) Reduction of a nitro compound by metal and acid; six hydrogen atoms are used:",
          "\\((\\text{CH}_3)_2\\text{CH-NO}_2 + 6[\\text{H}] \\xrightarrow{\\text{Sn/HCl}} (\\text{CH}_3)_2\\text{CH-NH}_2 + 2\\text{H}_2\\text{O}\\)",
          "The product is propan-2-amine (isopropylamine). Three carbon atoms in, three out.",
          "(b) Reduction of an amide; the C=O group becomes CH₂:",
          "\\(\\text{C}_6\\text{H}_5\\text{CONH}_2 + 4[\\text{H}] \\xrightarrow{\\text{LiAlH}_4,\\ \\text{ether}} \\text{C}_6\\text{H}_5\\text{CH}_2\\text{NH}_2 + \\text{H}_2\\text{O}\\)",
          "The product is benzylamine (phenylmethanamine). Seven carbon atoms in, seven out.",
        ],
        answer: "(a) Propan-2-amine; (b) benzylamine (phenylmethanamine)",
      },
      selfCheckExample: {
        prompt: "Which nitrile gives butan-1-amine on Mendius reduction? Write the reaction.",
        steps: [
          "Butan-1-amine is \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CH}_2\\text{NH}_2\\). Its \\(\\text{-CH}_2\\text{NH}_2\\) carbon was the nitrile carbon.",
          "So the nitrile is \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{C}\\equiv\\text{N}\\), butanenitrile (propyl cyanide).",
          "\\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{C}\\equiv\\text{N} + 4[\\text{H}] \\xrightarrow{\\text{Na/C}_2\\text{H}_5\\text{OH}} \\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CH}_2\\text{NH}_2\\)",
        ],
        answer: "Butanenitrile (propyl cyanide)",
      },
      practiceSet: [
        { prompt: "What name is given to the reduction of an alkyl cyanide by sodium and ethanol?", answer: "Mendius reduction" },
        { prompt: "How many [H] are needed to reduce one \\(\\text{-NO}_2\\) group to \\(\\text{-NH}_2\\)?", answer: "Six" },
        { prompt: "Name the product when nitrobenzene is reduced with Fe/HCl.", answer: "Aniline (benzenamine)" },
        { prompt: "Does reducing an amide with LiAlH₄ change the number of carbon atoms?", answer: "No. The amine has the same number of carbon atoms as the amide" },
      ],
      pyqExampleId: "ef90d9d8-f768-4b75-b84f-f0ba7f876011",
      traps: [
        {
          title: "Losing count of the nitrile carbon",
          body: "In \\(\\text{R-C}\\equiv\\text{N}\\) the cyano carbon stays and becomes the \\(\\text{-CH}_2\\text{-}\\) next to nitrogen. Methyl cyanide (two carbon atoms) gives ethylamine, not methylamine.",
        },
        {
          title: "Leaving water out of the equation",
          body: "Reduction of a nitro group gives \\(2\\text{H}_2\\text{O}\\), and of an amide gives \\(\\text{H}_2\\text{O}\\). An unbalanced equation loses the equation mark even when the product is right.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccam-hofmann",
      name: "Hofmann bromamide degradation",
      intuition:
        "Warm an amide with bromine and strong alkali, and the carbon of its C=O group is thrown out as carbonate. The group that was attached to that carbon moves onto the nitrogen. So the amide loses one carbon and becomes a primary amine: a way of walking down a series by one carbon.",
      definition:
        "- Also called Hofmann rearrangement, Hofmann bromamide degradation or Hofmann hypobromite degradation.\n" +
        "- An amide is **warmed with bromine and concentrated aqueous KOH**.\n" +
        "- The product is a **primary amine with one carbon atom less** than the amide: the -CO- group is removed, and leaves as \\(\\text{K}_2\\text{CO}_3\\).\n" +
        "- It is a **step down** reaction, and the amine formed is always primary.\n" +
        "- Textbook example: acetamide gives methylamine, \\(\\text{CH}_3\\text{CONH}_2 + \\text{Br}_2 + 4\\text{KOH(aq)} \\rightarrow \\text{CH}_3\\text{NH}_2 + 2\\text{KBr} + \\text{K}_2\\text{CO}_3 + 2\\text{H}_2\\text{O}\\).",
      formula: {
        label: "Hofmann bromamide degradation",
        latex: "\\text{R-CONH}_2 + \\text{Br}_2 + 4\\text{KOH(aq)} \\xrightarrow{\\text{warm}} \\text{R-NH}_2 + 2\\text{KBr} + \\text{K}_2\\text{CO}_3 + 2\\text{H}_2\\text{O}",
      },
      authoredExample: {
        prompt: "Write the reaction by which benzamide is converted into aniline. Name the reaction and comment on the number of carbon atoms.",
        steps: [
          "Benzamide, \\(\\text{C}_6\\text{H}_5\\text{CONH}_2\\), is warmed with bromine and concentrated aqueous KOH:",
          "\\(\\text{C}_6\\text{H}_5\\text{CONH}_2 + \\text{Br}_2 + 4\\text{KOH(aq)} \\rightarrow \\text{C}_6\\text{H}_5\\text{NH}_2 + 2\\text{KBr} + \\text{K}_2\\text{CO}_3 + 2\\text{H}_2\\text{O}\\)",
          "This is Hofmann bromamide degradation.",
          "Benzamide has 7 carbon atoms and aniline has 6: the carbonyl carbon leaves as \\(\\text{K}_2\\text{CO}_3\\), so it is a step down reaction.",
        ],
        answer: "Aniline, by Hofmann bromamide degradation; one carbon atom is lost (7 to 6)",
      },
      selfCheckExample: {
        prompt: "Which amide gives propan-2-amine on Hofmann bromamide degradation?",
        steps: [
          "Propan-2-amine is \\((\\text{CH}_3)_2\\text{CH-NH}_2\\), with 3 carbon atoms, so the amide has 4.",
          "Put back the -CO- group between the isopropyl group and \\(\\text{-NH}_2\\): \\((\\text{CH}_3)_2\\text{CH-CONH}_2\\).",
        ],
        answer: "2-Methylpropanamide, \\((\\text{CH}_3)_2\\text{CHCONH}_2\\)",
      },
      practiceSet: [
        { prompt: "Name the amine formed when butanamide undergoes Hofmann bromamide degradation.", answer: "Propan-1-amine" },
        { prompt: "Why is Hofmann degradation called a step down reaction?", answer: "The amine formed has one carbon atom less than the amide" },
        { prompt: "In which compound does the carbonyl carbon of the amide end up?", answer: "Potassium carbonate, \\(\\text{K}_2\\text{CO}_3\\)" },
        { prompt: "Can Hofmann bromamide degradation give a secondary amine?", answer: "No. It always gives a primary amine" },
      ],
      pyqExampleId: "49fb1608-ffd3-4cd2-be2f-5f2869279c68",
      traps: [
        {
          title: "Bromine alone",
          body: "The reagent is bromine WITH concentrated aqueous KOH (or NaOH), and the equation needs 4 KOH. Writing only \\(\\text{Br}_2\\) over the arrow loses the reagent mark.",
        },
        {
          title: "Keeping all the carbon atoms",
          body: "Hofmann degradation of acetamide gives methylamine, not ethylamine. Only LiAlH₄ reduction of the amide keeps every carbon atom.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccam-step-up-down",
      name: "Step up and step down conversions",
      intuition:
        "Before choosing a reaction, count the carbon atoms in the starting compound and in the amine you want. One more carbon: go through a cyanide. One fewer: go through an amide and Hofmann degradation. The same number: reduce a nitro compound or an amide. The count tells you the method before you write a single equation.",
      definition:
        "- **Step up (one carbon more):** alkyl halide + KCN gives the alkyl cyanide, which Na/C₂H₅OH reduces: \\(\\text{R-X} \\rightarrow \\text{R-CN} \\rightarrow \\text{R-CH}_2\\text{NH}_2\\).\n" +
        "- **Step down (one carbon less):** Hofmann bromamide degradation of the amide: \\(\\text{R-CONH}_2 \\rightarrow \\text{R-NH}_2\\).\n" +
        "- **Same number:** reduce the amide (LiAlH₄) or the nitro compound (Sn/HCl), or use Gabriel synthesis on the alkyl halide.\n" +
        "- **Useful links from other chapters:** a primary aliphatic amine with nitrous acid gives the alcohol; an alcohol gives the alkyl halide (for example with SOCl₂); a carboxylic acid with ammonia gives the ammonium salt, which on heating gives the amide.\n" +
        "- Use KCN, not AgCN: AgCN gives an isocyanide, R-NC, whose reduction gives a secondary amine.\n" +
        "- In the answer, write each step as a full equation, name every intermediate, and end with a line on the carbon count.",
      formula: {
        label: "Choosing the route by carbon count",
        latex:
          "\\text{up: } \\text{R-X} \\xrightarrow{\\text{KCN}} \\text{R-CN} \\xrightarrow{\\text{Na/C}_2\\text{H}_5\\text{OH}} \\text{R-CH}_2\\text{NH}_2, \\qquad \\text{down: } \\text{R-CONH}_2 \\xrightarrow{\\text{Br}_2,\\ \\text{KOH}} \\text{R-NH}_2",
      },
      authoredExample: {
        prompt: "Prepare propan-1-amine, \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{NH}_2\\), from (a) ethyl bromide, (b) butanamide, (c) propanamide.",
        steps: [
          "Propan-1-amine has 3 carbon atoms.",
          "(a) Ethyl bromide has 2, so step up by one through the cyanide: \\(\\text{C}_2\\text{H}_5\\text{Br} + \\text{KCN} \\rightarrow \\text{C}_2\\text{H}_5\\text{CN} + \\text{KBr}\\), then \\(\\text{C}_2\\text{H}_5\\text{CN} + 4[\\text{H}] \\xrightarrow{\\text{Na/C}_2\\text{H}_5\\text{OH}} \\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{NH}_2\\).",
          "(b) Butanamide has 4, so step down by Hofmann degradation: \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CONH}_2 + \\text{Br}_2 + 4\\text{KOH} \\rightarrow \\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{NH}_2 + 2\\text{KBr} + \\text{K}_2\\text{CO}_3 + 2\\text{H}_2\\text{O}\\).",
          "(c) Propanamide has 3, the same, so reduce it: \\(\\text{CH}_3\\text{CH}_2\\text{CONH}_2 + 4[\\text{H}] \\xrightarrow{\\text{LiAlH}_4} \\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{NH}_2 + \\text{H}_2\\text{O}\\).",
        ],
        answer: "(a) KCN then Na/C₂H₅OH (step up); (b) Br₂ and KOH (step down); (c) LiAlH₄ (same carbon count)",
      },
      selfCheckExample: {
        prompt: "Write the reactions to convert propanoic acid into ethanamine.",
        steps: [
          "Propanoic acid has 3 carbon atoms and ethanamine 2, so the last step is Hofmann degradation of propanamide.",
          "\\(\\text{CH}_3\\text{CH}_2\\text{COOH} + \\text{NH}_3 \\rightarrow \\text{CH}_3\\text{CH}_2\\text{COONH}_4 \\xrightarrow{\\Delta} \\text{CH}_3\\text{CH}_2\\text{CONH}_2 + \\text{H}_2\\text{O}\\)",
          "\\(\\text{CH}_3\\text{CH}_2\\text{CONH}_2 + \\text{Br}_2 + 4\\text{KOH} \\rightarrow \\text{CH}_3\\text{CH}_2\\text{NH}_2 + 2\\text{KBr} + \\text{K}_2\\text{CO}_3 + 2\\text{H}_2\\text{O}\\)",
        ],
        answer: "Acid to ammonium salt, heat to propanamide, then Hofmann bromamide degradation",
      },
      practiceSet: [
        { prompt: "Ethyl iodide is to be turned into propan-1-amine. Is this a step up or a step down conversion?", answer: "Step up: one carbon atom is added through the cyanide" },
        { prompt: "Which reaction converts pentanamide into butan-1-amine?", answer: "Hofmann bromamide degradation" },
        { prompt: "Which reagent turns ethylamine into ethanol?", answer: "Nitrous acid (NaNO₂ and dilute HCl)" },
        { prompt: "Why is KCN, and not AgCN, used to step up an alkyl halide to a primary amine?", answer: "AgCN gives an isocyanide, which on reduction gives a secondary amine" },
      ],
      pyqExampleId: "4b067072-0826-4703-a436-8daf09eb90ab",
      traps: [
        {
          title: "Choosing the reaction before counting",
          body: "Butanamide into butan-1-amine keeps 4 carbon atoms, so it is LiAlH₄ reduction. Hofmann degradation would give propan-1-amine and score nothing.",
        },
        {
          title: "Skipping the intermediate",
          body: "In a conversion, name and write each intermediate (the cyanide, the alcohol, the amide). A single arrow from start to finish shows no chemistry and loses most of the marks.",
        },
      ],
    },
  ],
};
