import type { SubtopicNote } from "@/app/notes/_types";

export const PREP_AMINE_NOTE: SubtopicNote = {
  subtopicName: "Preparation: Reduction, Ammonolysis and Gabriel Synthesis",
  title: "Preparation: Reduction, Ammonolysis and Gabriel Synthesis",
  oneLineDefinition:
    "Amines are made by reducing nitro compounds, nitriles and amides, by letting ammonia displace a halide, or by Gabriel synthesis when a pure primary amine is needed.",
  whyItMatters:
    "Nineteen PYQs, four numerical, three from 2026. Eight ask which reagent reduces a nitro compound, nitrile or amide to an amine, and what the carbon count becomes; four test ammonolysis of alkyl halides; seven test what Gabriel synthesis can and cannot make, often by counting isomers.",
  concepts: [
    // C1 — reduction routes
    {
      kind: "reference" as const,
      slug: "jcamine-reduction",
      name: "Reduction routes to amines: nitro compounds, nitriles and amides",
      intuition:
        "Three nitrogen groups can be reduced to an amine. A nitro group becomes \\(\\mathrm{NH_2}\\) on the same carbon, which is how aryl amines are made. A nitrile and an amide both become \\(\\mathrm{CH_2NH_2}\\). The carbon count tells you which route was used: going through a nitrile adds one carbon to the halide you started from.",
      definition:
        "- Nitro compounds: a metal in acid (\\(\\mathrm{Sn/HCl}\\), \\(\\mathrm{Fe/HCl}\\), \\(\\mathrm{Zn/HCl}\\)) or hydrogen over a catalyst (Pd, Pt, Raney Ni). Iron scrap with HCl is preferred in industry: the \\(\\mathrm{FeCl_2}\\) formed hydrolyses and releases HCl, so only a little acid is needed.\n" +
        "- Nitriles: \\(\\mathrm{LiAlH_4}\\), \\(\\mathrm{H_2/Ni}\\) or \\(\\mathrm{Na(Hg)/C_2H_5OH}\\) give \\(\\mathrm{RCH_2NH_2}\\). Since \\(\\mathrm{RCN}\\) comes from \\(\\mathrm{RX + KCN}\\), this route lengthens the chain by one carbon.\n" +
        "- Amides: \\(\\mathrm{LiAlH_4}\\) then water gives \\(\\mathrm{RCH_2NH_2}\\), with no loss of carbon.\n" +
        "- \\(\\mathrm{SnCl_2/HCl}\\) on a nitrile stops at the imine, which hydrolyses to an aldehyde (Stephen reduction). It does not give an amine.",
      table: {
        columns: ["Starting compound", "Reagent", "Product", "Carbon count"],
        rows: [
          { cells: ["\\(\\mathrm{C_6H_5NO_2}\\)", "\\(\\mathrm{Sn/HCl}\\), \\(\\mathrm{Fe/HCl}\\) or \\(\\mathrm{H_2/Pd}\\)", "\\(\\mathrm{C_6H_5NH_2}\\)", "Unchanged"] },
          { cells: ["\\(\\mathrm{RC{\\equiv}N}\\)", "\\(\\mathrm{LiAlH_4}\\), \\(\\mathrm{H_2/Ni}\\) or \\(\\mathrm{Na(Hg)/C_2H_5OH}\\)", "\\(\\mathrm{RCH_2NH_2}\\)", "One more than the halide RX"] },
          { cells: ["\\(\\mathrm{RCONH_2}\\)", "\\(\\mathrm{LiAlH_4}\\), then \\(\\mathrm{H_2O}\\)", "\\(\\mathrm{RCH_2NH_2}\\)", "Unchanged"] },
          { cells: ["\\(\\mathrm{RC{\\equiv}N}\\)", "\\(\\mathrm{SnCl_2/HCl}\\), then \\(\\mathrm{H_3O^+}\\)", "\\(\\mathrm{RCHO}\\), not an amine", "Unchanged"] },
          { cells: ["\\(\\mathrm{RCONH_2}\\)", "\\(\\mathrm{Br_2}\\) and NaOH (Hofmann)", "\\(\\mathrm{RNH_2}\\)", "One fewer"] },
        ],
        caption: "Reduction keeps every carbon; only the Hofmann route drops one.",
      },
      selfCheckExample: {
        prompt: "Give the reagents to convert bromoethane into propan-1-amine.",
        steps: [
          "The amine has three carbons and the halide has two, so one carbon must be added.",
          "Ethanolic KCN replaces Br by CN: \\(\\mathrm{CH_3CH_2Br \\to CH_3CH_2CN}\\).",
          "Reduction of the nitrile gives \\(\\mathrm{CH_3CH_2CH_2NH_2}\\).",
        ],
        answer: "(i) KCN (ethanolic), (ii) \\(\\mathrm{LiAlH_4}\\) or \\(\\mathrm{H_2/Ni}\\)",
      },
      practiceSet: [
        { prompt: "What does \\(\\mathrm{CH_3CONH_2}\\) give with \\(\\mathrm{LiAlH_4}\\) followed by water?", answer: "Ethanamine, \\(\\mathrm{CH_3CH_2NH_2}\\)" },
        { prompt: "Why is iron scrap with HCl preferred for reducing nitrobenzene on a large scale?", answer: "\\(\\mathrm{FeCl_2}\\) hydrolyses and releases HCl, so only a small amount of acid is needed" },
        { prompt: "What does \\(\\mathrm{CH_3CN}\\) give with \\(\\mathrm{SnCl_2/HCl}\\) followed by hydrolysis?", answer: "Ethanal, \\(\\mathrm{CH_3CHO}\\) (Stephen reduction)" },
        { prompt: "What does \\(\\mathrm{C_6H_5CN}\\) give with \\(\\mathrm{LiAlH_4}\\)?", answer: "Benzylamine, \\(\\mathrm{C_6H_5CH_2NH_2}\\)" },
      ],
      pyqExampleId: "bbb1c594-6fc5-4038-95fe-7503d3b869c8", // 2021 — reagents that take nitrobenzene to aniline
      traps: [
        {
          title: "Nitrobenzene needs acid or a catalyst to reach aniline",
          body: "A metal reduces nitrobenzene to aniline only in acid. In neutral solution the reduction stops at intermediate stages; for example \\(\\mathrm{Zn/NH_4Cl}\\) gives N-phenylhydroxylamine.",
        },
        {
          title: "Two amide reactions, two carbon counts",
          body: "\\(\\mathrm{LiAlH_4}\\) reduces \\(\\mathrm{RCONH_2}\\) to \\(\\mathrm{RCH_2NH_2}\\) and keeps every carbon. \\(\\mathrm{Br_2}\\) with NaOH turns the same amide into \\(\\mathrm{RNH_2}\\), one carbon shorter.",
        },
      ],
    },

    // C2 — ammonolysis
    {
      kind: "formula" as const,
      slug: "jcamine-ammonolysis",
      name: "Ammonolysis of alkyl halides",
      intuition:
        "Ammonia has a lone pair and can displace a halide from an alkyl halide by SN2. The trouble is that the amine it makes is a better nucleophile than ammonia, so it attacks more halide. The result is a mixture of primary, secondary and tertiary amines and the quaternary salt.",
      definition:
        "- The halide is heated with ethanolic ammonia in a sealed tube. Each amine is formed as its salt, since the HX released protonates it.\n" +
        "- Strong base (NaOH) liberates the free amine from its salt: \\(\\mathrm{RNH_3^+X^- + NaOH \\to RNH_2 + NaX + H_2O}\\).\n" +
        "- A large excess of ammonia favours the primary amine; excess halide carries the reaction to the quaternary salt \\(\\mathrm{R_4N^+X^-}\\).\n" +
        "- Reactivity of the halide: RI > RBr > RCl. Aryl halides do not react under these conditions.\n" +
        "- An α-halo acid with ammonia gives the amino acid in good yield: the product exists as a zwitterion, whose \\(\\mathrm{NH_3^+}\\) has no lone pair to attack further.",
      formula: {
        label: "Successive alkylation in ammonolysis",
        latex:
          "\\mathrm{NH_3 \\xrightarrow{RX} RNH_2 \\xrightarrow{RX} R_2NH \\xrightarrow{RX} R_3N \\xrightarrow{RX} R_4N^+X^-}",
      },
      authoredExample: {
        prompt:
          "1-Bromopropane is heated with ethanolic ammonia in a sealed tube and the mixture is then shaken with NaOH solution. What products can form, and how is the primary amine made the main product?",
        steps: [
          "\\(\\mathrm{NH_3}\\) displaces bromide: \\(\\mathrm{CH_3CH_2CH_2Br + NH_3 \\to CH_3CH_2CH_2NH_3^+Br^-}\\).",
          "The free propan-1-amine attacks more 1-bromopropane, giving \\(\\mathrm{(C_3H_7)_2NH}\\), then \\(\\mathrm{(C_3H_7)_3N}\\), then \\(\\mathrm{(C_3H_7)_4N^+Br^-}\\).",
          "NaOH frees each amine from its hydrobromide salt; the quaternary salt has no N–H to lose and stays a salt.",
          "Using a large excess of ammonia makes it much more likely that the halide meets ammonia than an amine.",
        ],
        answer: "Propan-1-amine, dipropylamine, tripropylamine and tetrapropylammonium bromide; excess ammonia makes propan-1-amine the main product",
      },
      selfCheckExample: {
        prompt:
          "Which of these gives an amine when heated with ethanolic ammonia: chlorobenzene or 1-chlorobutane?",
        steps: [
          "Ammonolysis is a nucleophilic substitution at an \\(sp^3\\) carbon.",
          "The C–Cl bond of chlorobenzene has partial double-bond character and the ring blocks backside attack, so it does not react under these conditions.",
        ],
        answer: "Only 1-chlorobutane (it gives butan-1-amine and its further alkylation products)",
      },
      practiceSet: [
        { prompt: "Why is NaOH added after ammonolysis of an alkyl halide?", answer: "To liberate the free amine from its ammonium salt" },
        { prompt: "Arrange the alkyl halides RCl, RBr and RI by reactivity towards ammonia.", answer: "RI > RBr > RCl" },
        { prompt: "Which favours the primary amine in ammonolysis: excess ammonia or excess alkyl halide?", answer: "Excess ammonia" },
        { prompt: "What is the final product when methylamine is treated with a large excess of iodomethane?", answer: "Tetramethylammonium iodide, \\(\\mathrm{(CH_3)_4N^+I^-}\\)" },
      ],
      pyqExampleId: "f0a5c9cb-7a42-4c38-a29f-c3f00d214d93", // 2021 — which reaction is ammonolysis
      traps: [
        {
          title: "Ammonolysis rarely gives one amine",
          body: "Each amine formed is a better nucleophile than ammonia and reacts again. Expect a mixture of 1°, 2° and 3° amines and the quaternary salt; only a large excess of ammonia makes the primary amine dominant.",
        },
        {
          title: "Ammonolysis breaks a C–X bond",
          body: "Ammonolysis means ammonia replacing a halogen on an alkyl or benzyl carbon. Acylation of an amine, reduction of a nitrile or protonation of aniline by HCl is not ammonolysis.",
        },
      ],
    },

    // C3 — Gabriel synthesis
    {
      kind: "formula" as const,
      slug: "jcamine-gabriel",
      name: "Gabriel phthalimide synthesis of primary amines",
      intuition:
        "Phthalimide has one N–H between two carbonyl groups, which makes it acidic. Its anion attacks an alkyl halide once, and then the nitrogen has no hydrogen left to react again. Hydrolysis releases a single primary amine, with no over-alkylation. Because the key step is SN2, it only works on halides that allow SN2.",
      definition:
        "- Phthalimide + ethanolic KOH gives potassium phthalimide; its anion is stabilised by both carbonyl groups.\n" +
        "- The anion displaces halide from a primary, benzylic or allylic halide (SN2) to give an N-alkylphthalimide.\n" +
        "- Hydrolysis with aqueous NaOH (or reaction with hydrazine) releases \\(\\mathrm{RNH_2}\\).\n" +
        "- It makes **primary** amines only, and never aryl amines: aryl halides do not undergo SN2 with the phthalimide anion.\n" +
        "- A tertiary halide undergoes elimination instead, so a tertiary alkyl amine cannot be made this way.\n" +
        "- Phthalimide itself comes from phthalic acid (or its anhydride) heated with ammonia.",
      formula: {
        label: "Gabriel phthalimide synthesis",
        latex:
          "\\text{phthalimide} \\xrightarrow{\\mathrm{KOH}} \\text{K-phthalimide} \\xrightarrow{\\mathrm{RX}} \\text{N-alkylphthalimide} \\xrightarrow{\\mathrm{NaOH(aq)}} \\mathrm{RNH_2} + \\text{phthalate}",
      },
      authoredExample: {
        prompt:
          "How many of the amines with molecular formula \\(\\mathrm{C_7H_9N}\\) can be made by Gabriel phthalimide synthesis?",
        steps: [
          "List the isomers with a benzene ring: benzylamine \\(\\mathrm{C_6H_5CH_2NH_2}\\); 2-, 3- and 4-methylaniline; N-methylaniline \\(\\mathrm{C_6H_5NHCH_3}\\).",
          "Gabriel synthesis gives only primary amines, so N-methylaniline is out.",
          "The three methylanilines are aryl amines: their nitrogen would have to be attached to a ring carbon by SN2, which fails.",
          "Benzylamine has \\(\\mathrm{NH_2}\\) on an \\(sp^3\\) carbon: potassium phthalimide + benzyl chloride, then hydrolysis.",
        ],
        answer: "One (benzylamine)",
      },
      selfCheckExample: {
        prompt: "Can 2-methylpropan-2-amine, \\(\\mathrm{(CH_3)_3C{-}NH_2}\\), be made by Gabriel phthalimide synthesis? Explain.",
        steps: [
          "It is a primary amine, but its nitrogen is on a tertiary carbon.",
          "The halide needed, 2-bromo-2-methylpropane, cannot undergo SN2; the phthalimide anion acts as a base and eliminates HBr to give an alkene.",
        ],
        answer: "No: the tertiary halide gives elimination, not substitution",
      },
      practiceSet: [
        { prompt: "Why is the N–H of phthalimide acidic?", answer: "Its anion is stabilised by delocalisation onto both carbonyl groups" },
        { prompt: "Which amine is obtained from potassium phthalimide and 1-bromobutane, after hydrolysis?", answer: "Butan-1-amine, \\(\\mathrm{CH_3CH_2CH_2CH_2NH_2}\\)" },
        { prompt: "Can aniline be made by Gabriel phthalimide synthesis?", answer: "No: chlorobenzene does not undergo SN2 with the phthalimide anion" },
        { prompt: "What compound forms when phthalic acid is heated with ammonia and then heated strongly?", answer: "Phthalimide, \\(\\mathrm{C_8H_5NO_2}\\)" },
      ],
      pyqExampleId: "887f7824-0535-4014-b023-055c6dea244b", // 2023 — C8H11N isomers Gabriel can make
      traps: [
        {
          title: "Gabriel gives no aryl amines",
          body: "4-Methoxyaniline, aniline or any amine with \\(\\mathrm{NH_2}\\) on a ring carbon cannot be made by Gabriel synthesis, because an aryl halide does not undergo SN2.",
        },
        {
          title: "Gabriel gives no secondary amines",
          body: "After one alkylation the nitrogen of the phthalimide carries no hydrogen, so only one alkyl group can be attached. The product after hydrolysis is always a primary amine.",
        },
      ],
    },
  ],
};
