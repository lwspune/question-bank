import type { SubtopicNote } from "@/app/notes/_types";

export const HOFMANN_AMINE_NOTE: SubtopicNote = {
  subtopicName: "Hofmann Bromamide Degradation",
  title: "Hofmann Bromamide Degradation",
  oneLineDefinition:
    "A primary amide with bromine and alkali loses its carbonyl carbon as carbonate and gives a primary amine one carbon shorter, through an isocyanate.",
  whyItMatters:
    "Seventeen PYQs, one numerical, six from 2026. Six test the balanced equation, the isocyanate intermediate, the migrating group and which amides react; eleven hide the reaction inside a multistep sequence, often after a Grignard carboxylation, and ask for a structure or a mass.",
  concepts: [
    // C1 — equation and mechanism
    {
      kind: "formula" as const,
      slug: "jcamine-hofmann-mechanism",
      name: "Hofmann bromamide degradation: equation, intermediates and scope",
      intuition:
        "Bromine in alkali puts a bromine on the amide nitrogen. Base then removes the second N–H, bromide leaves, and the nitrogen is left with only six electrons. The group on the carbonyl carbon moves across to it, giving an isocyanate, R–N=C=O. Water adds to the isocyanate and carbon dioxide leaves, so the amine has one carbon fewer than the amide.",
      definition:
        "- Overall: one \\(\\mathrm{Br_2}\\) and four NaOH per mole of amide; by-products \\(\\mathrm{Na_2CO_3}\\), NaBr and water.\n" +
        "- Steps: \\(\\mathrm{RCONH_2 \\to RCONHBr}\\) (N-bromoamide) \\(\\to\\) its anion \\(\\to\\) R migrates as \\(\\mathrm{Br^-}\\) leaves \\(\\to\\) \\(\\mathrm{R{-}N{=}C{=}O}\\) (isocyanate) \\(\\to\\) \\(\\mathrm{RNH_2 + CO_2}\\), and \\(\\mathrm{CO_2}\\) ends as carbonate in the alkali.\n" +
        "- The migrating group can be alkyl or aryl. It moves to an electron-deficient nitrogen and keeps its configuration.\n" +
        "- Only an unsubstituted (primary) amide \\(\\mathrm{RCONH_2}\\) reacts: it needs two N–H hydrogens. An N-substituted amide \\(\\mathrm{RCONHR'}\\) does not give an amine.\n" +
        "- The product is always a primary amine.",
      formula: {
        label: "Hofmann bromamide degradation",
        latex: "\\mathrm{RCONH_2 + Br_2 + 4NaOH \\to RNH_2 + Na_2CO_3 + 2NaBr + 2H_2O}",
      },
      authoredExample: {
        prompt:
          "3-Phenylpropanamide, \\(\\mathrm{C_6H_5CH_2CH_2CONH_2}\\), is warmed with bromine and aqueous NaOH. Name the product and say where the carbonyl carbon goes.",
        steps: [
          "Bromination on nitrogen gives \\(\\mathrm{C_6H_5CH_2CH_2CONHBr}\\).",
          "Base removes the remaining N–H; as bromide leaves, the \\(\\mathrm{C_6H_5CH_2CH_2}\\) group moves from carbon to nitrogen, giving \\(\\mathrm{C_6H_5CH_2CH_2{-}N{=}C{=}O}\\).",
          "Hydrolysis of the isocyanate gives \\(\\mathrm{C_6H_5CH_2CH_2NH_2}\\) and \\(\\mathrm{CO_2}\\), which the alkali traps as \\(\\mathrm{Na_2CO_3}\\).",
        ],
        answer: "2-Phenylethanamine, \\(\\mathrm{C_6H_5CH_2CH_2NH_2}\\); the carbonyl carbon leaves as carbonate",
      },
      selfCheckExample: {
        prompt: "Which amide gives propan-2-amine, \\(\\mathrm{(CH_3)_2CHNH_2}\\), with bromine and KOH?",
        steps: [
          "The amine has one carbon fewer than the amide, and the group attached to nitrogen in the amine was attached to the carbonyl carbon in the amide.",
          "So the amide is \\(\\mathrm{(CH_3)_2CH{-}CONH_2}\\).",
        ],
        answer: "2-Methylpropanamide, \\(\\mathrm{(CH_3)_2CHCONH_2}\\)",
      },
      practiceSet: [
        { prompt: "How many moles of \\(\\mathrm{Br_2}\\) are used per mole of amide in Hofmann bromamide degradation?", answer: "One" },
        { prompt: "Does N-methylacetamide, \\(\\mathrm{CH_3CONHCH_3}\\), give an amine with \\(\\mathrm{Br_2}\\) and NaOH?", answer: "No: only an unsubstituted amide \\(\\mathrm{RCONH_2}\\) undergoes the degradation" },
        { prompt: "What does 4-methylbenzamide give with \\(\\mathrm{Br_2}\\) and NaOH?", answer: "4-Methylaniline, \\(\\mathrm{CH_3C_6H_4NH_2}\\)" },
        { prompt: "Name the intermediate that is hydrolysed to the amine in Hofmann bromamide degradation.", answer: "The isocyanate, \\(\\mathrm{R{-}N{=}C{=}O}\\)" },
      ],
      pyqExampleId: "12b5561d-f8c1-41dc-862a-e0afb543768f", // 2026 — stoichiometry, by-products, scope
      traps: [
        {
          title: "Benzamide gives aniline, not benzylamine",
          body: "Hofmann degradation removes the carbonyl carbon. \\(\\mathrm{C_6H_5CONH_2}\\) gives \\(\\mathrm{C_6H_5NH_2}\\). Benzylamine would come from reducing benzamide with \\(\\mathrm{LiAlH_4}\\).",
        },
        {
          title: "Aryl groups migrate too",
          body: "The group that moves from carbon to nitrogen can be alkyl or aryl. A statement that only an alkyl group migrates is false; benzamide reacts perfectly well.",
        },
        {
          title: "One bromine, four hydroxides",
          body: "The balanced equation uses one \\(\\mathrm{Br_2}\\) and four NaOH per amide. Two hydroxides neutralise the two HBr equivalents and two more trap \\(\\mathrm{CO_2}\\) as carbonate.",
        },
      ],
    },

    // C2 — Hofmann in multistep sequences
    {
      kind: "formula" as const,
      slug: "jcamine-hofmann-sequences",
      name: "Hofmann degradation in multistep sequences",
      intuition:
        "Most questions bury the Hofmann step inside a chain. The usual chain goes halide, Grignard, carboxylic acid, amide, amine. The Grignard step adds one carbon and the Hofmann step removes one, so the amine ends up where the halogen started, with the same number of carbons. On a benzene ring the \\(\\mathrm{NH_2}\\) appears exactly where the \\(\\mathrm{CONH_2}\\) was.",
      definition:
        "- Acid to amide: heat with \\(\\mathrm{NH_3}\\) (via the ammonium salt), or \\(\\mathrm{SOCl_2}\\) then \\(\\mathrm{NH_3}\\).\n" +
        "- Halide to acid: Mg in dry ether, then \\(\\mathrm{CO_2}\\), then \\(\\mathrm{H_3O^+}\\). This adds one carbon.\n" +
        "- Hofmann removes one carbon. So \\(\\mathrm{RX \\to RCOOH \\to RCONH_2 \\to RNH_2}\\) replaces X by \\(\\mathrm{NH_2}\\) with no net change in carbons.\n" +
        "- Ring position is kept: 3-chlorobenzamide gives 3-chloroaniline.\n" +
        "- The amine can then be taken on: \\(\\mathrm{CHCl_3/KOH}\\) gives the isocyanide; \\(\\mathrm{HNO_2}\\) gives an alcohol (aliphatic) or a diazonium salt (aryl).\n" +
        "- Acid hydrolysis of an isocyanide gives the amine back, with formic acid: \\(\\mathrm{RNC + 2H_2O \\xrightarrow{H^+} RNH_2 + HCOOH}\\). A nitrile instead gives \\(\\mathrm{RCOOH}\\).",
      formula: {
        label: "Halide to amine with the same carbon count",
        latex:
          "\\mathrm{RX \\xrightarrow{Mg,\\ ether} RMgX \\xrightarrow{CO_2,\\ H_3O^+} RCOOH \\xrightarrow{NH_3,\\ \\Delta} RCONH_2 \\xrightarrow{Br_2,\\ NaOH} RNH_2}",
      },
      authoredExample: {
        prompt:
          "1-Bromobutane is treated with (i) Mg in dry ether, (ii) \\(\\mathrm{CO_2}\\) then \\(\\mathrm{H_3O^+}\\), (iii) \\(\\mathrm{NH_3}\\) with heat, (iv) \\(\\mathrm{Br_2}\\) and NaOH. Identify each product.",
        steps: [
          "(i) \\(\\mathrm{CH_3(CH_2)_3MgBr}\\).",
          "(ii) The Grignard adds to \\(\\mathrm{CO_2}\\): pentanoic acid, \\(\\mathrm{CH_3(CH_2)_3COOH}\\) (five carbons).",
          "(iii) The ammonium salt loses water on heating: pentanamide, \\(\\mathrm{CH_3(CH_2)_3CONH_2}\\).",
          "(iv) Hofmann removes the carbonyl carbon: \\(\\mathrm{CH_3(CH_2)_3NH_2}\\) (four carbons).",
        ],
        answer: "Butan-1-amine: the \\(\\mathrm{NH_2}\\) sits where the bromine was, with the same four carbons",
      },
      selfCheckExample: {
        prompt:
          "4-Chlorobenzoic acid is treated with (i) \\(\\mathrm{SOCl_2}\\), (ii) \\(\\mathrm{NH_3}\\), (iii) \\(\\mathrm{Br_2}\\) and NaOH. What is the final product?",
        steps: [
          "\\(\\mathrm{SOCl_2}\\) gives the acid chloride and ammonia gives 4-chlorobenzamide.",
          "Hofmann degradation replaces \\(\\mathrm{CONH_2}\\) by \\(\\mathrm{NH_2}\\) at the same ring position.",
        ],
        answer: "4-Chloroaniline, \\(\\mathrm{ClC_6H_4NH_2}\\)",
      },
      practiceSet: [
        { prompt: "Butanoic acid is heated with \\(\\mathrm{NH_3}\\) and the product treated with \\(\\mathrm{Br_2}\\) and NaOH. What forms?", answer: "Propan-1-amine, \\(\\mathrm{CH_3CH_2CH_2NH_2}\\)" },
        { prompt: "By how many carbons does \\(\\mathrm{RX \\to RCOOH \\to RCONH_2 \\to RNH_2}\\) change the chain?", answer: "None: one carbon is added and one removed" },
        { prompt: "What does phenyl isocyanide, \\(\\mathrm{C_6H_5NC}\\), give on acid hydrolysis?", answer: "Aniline and formic acid" },
        { prompt: "What does 4-nitrobenzamide give with \\(\\mathrm{Br_2}\\) and NaOH?", answer: "4-Nitroaniline" },
      ],
      pyqExampleId: "706b1be4-6d34-42ea-84d3-78cfac3bf122", // 2024 — bromobenzene to benzoic acid to benzamide to aniline
      traps: [
        {
          title: "The Grignard route does not lengthen the amine",
          body: "\\(\\mathrm{CO_2}\\) adds one carbon, but the Hofmann step removes it again. Starting from bromobenzene you end at aniline, not benzylamine.",
        },
        {
          title: "Isocyanides and nitriles hydrolyse differently",
          body: "Acid hydrolysis of \\(\\mathrm{R{-}NC}\\) gives \\(\\mathrm{RNH_2}\\) and formic acid; acid hydrolysis of \\(\\mathrm{R{-}CN}\\) gives \\(\\mathrm{RCOOH}\\). The atom bonded to R decides.",
        },
      ],
    },
  ],
};
