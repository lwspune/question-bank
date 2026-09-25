import type { SubtopicNote } from "@/app/notes/_types";

export const PREPARATION_NOTE: SubtopicNote = {
  subtopicName: "Preparation of Amines",
  title: "Preparation of Amines",
  oneLineDefinition:
    "Amines are made by reducing nitriles (Mendius, Na/ethanol, one carbon MORE than the halide), amides (LiAlH₄, same carbons) and nitro compounds (Sn/HCl), by the Hofmann bromamide degradation of an amide (one carbon FEWER) and by Gabriel phthalimide synthesis (primary only), or by ammonolysis and alkylation of halides.",
  whyItMatters:
    "14 PYQs, none HARD. Nine are reductions — CH₃Br → KCN → Na/EtOH → ethylamine (the chapter's most repeated sequence), which amide LiAlH₄ turns into ethanamine, how many H atoms reduce a nitrile (4) or a nitro compound (6), acetic acid → SOCl₂ → NH₃ → acetamide; five are Hofmann degradation (loss of CO, 28 g mol⁻¹; acetamide → methylamine), Gabriel (what is never formed), and ammonolysis followed by methylation. " +
    "Two cards.",
  concepts: [
    // 1 — reductions
    {
      kind: "formula" as const,
      slug: "cetam-reduction-routes",
      name: "Reductions: Nitrile, Amide and Nitro to Amine",
      intuition:
        "Count carbons before and after. A nitrile made from R–X has one carbon more than R, and reducing it (Mendius, Na/ethanol or LiAlH₄, 4 H atoms) keeps them all: CH₃Br → CH₃CN → CH₃CH₂NH₂. An amide reduced by LiAlH₄ keeps its carbons: acetamide → ethanamine. A nitro compound needs 6 H atoms: nitroethane → ethylamine. Nothing is lost in any of these.",
      definition:
        "- **Mendius**: \\(\\text{RCN} + 4[\\text{H}] \\xrightarrow{\\text{Na/C}_2\\text{H}_5\\text{OH or LiAlH}_4} \\text{RCH}_2\\text{NH}_2\\). No carbon lost. Acetonitrile needs **4** H atoms per mole.\n" +
        "- Sequence: \\(\\text{CH}_3\\text{Br} \\xrightarrow{\\text{KCN}} \\text{CH}_3\\text{CN} \\xrightarrow{\\text{Na/EtOH}} \\text{CH}_3\\text{CH}_2\\text{NH}_2\\) (ethylamine). Butanenitrile comes from n-propyl chloride + alcoholic KCN.\n" +
        "- **Amide**: \\(\\text{CH}_3\\text{CONH}_2 \\xrightarrow{\\text{LiAlH}_4} \\text{CH}_3\\text{CH}_2\\text{NH}_2\\) — A for ethanamine is acetamide, not propanamide or C₂H₅CN (which gives propanamine).\n" +
        "- **Nitro**: \\(\\text{C}_2\\text{H}_5\\text{NO}_2 + 6[\\text{H}] \\xrightarrow{\\text{Sn/HCl}} \\text{C}_2\\text{H}_5\\text{NH}_2 + 2\\text{H}_2\\text{O}\\) — **6** H atoms.\n" +
        "- Making the amide: acetic acid \\(\\xrightarrow{\\text{SOCl}_2}\\) acetyl chloride \\(\\xrightarrow{\\text{NH}_3}\\) **acetamide**. A Grignard with NH₃ is just protonated: EtMgCl + NH₃ → ethane.",
      formula: {
        label: "Three reductions",
        latex:
          "\\text{RCN} \\xrightarrow{4[\\text{H}]} \\text{RCH}_2\\text{NH}_2;\\quad \\text{RCONH}_2 \\xrightarrow{\\text{LiAlH}_4} \\text{RCH}_2\\text{NH}_2;\\quad \\text{RNO}_2 \\xrightarrow{6[\\text{H}]} \\text{RNH}_2",
      },
      authoredExample: {
        prompt: "Starting from ethyl bromide, make propan-1-amine, and say how many H atoms the reduction step consumes.",
        steps: [
          "Ethyl bromide + KCN → propanenitrile (three carbons); Na/ethanol reduction with 4 H atoms → propan-1-amine.",
        ],
        answer: "\\(\\text{C}_2\\text{H}_5\\text{Br} \\to \\text{C}_2\\text{H}_5\\text{CN} \\to \\text{C}_3\\text{H}_7\\text{NH}_2\\); 4 H",
      },
      selfCheckExample: {
        prompt: "Which A gives ethanamine with LiAlH₄: C₂H₅CN, CH₃CONH₂, C₂H₅CONH₂, CH₃NO₂?",
        steps: [
          "Two carbons must survive; a nitrile from C₂H₅CN would give three, CH₃NO₂ one. Acetamide.",
        ],
        answer: "\\(\\text{CH}_3\\text{CONH}_2\\)",
      },
      practiceSet: [
        { prompt: "CH₃Br → (KCN) A → (Na/C₂H₅OH) B: B?", answer: "Ethylamine" },
        { prompt: "H atoms to reduce 1 mol acetonitrile?", answer: "4" },
        { prompt: "H atoms to reduce 1 mol nitroethane with Sn/HCl?", answer: "6" },
        { prompt: "Acetic acid → (SOCl₂) A → (NH₃) B: B?", answer: "Acetamide" },
      ],
      pyqExampleId: "5e5358ca-3471-4b90-af33-7c62c2af1f38",
      traps: [
        {
          title: "Forgetting that cyanide adds a carbon",
          body:
            "Methyl bromide ends as ETHYLamine — the CN carbon becomes CH₂. 'Methylamine' is the offered wrong answer in every version of the sequence.",
        },
      ],
    },

    // 2 — Hofmann degradation and Gabriel
    {
      kind: "formula" as const,
      slug: "cetam-hofmann-degradation-and-gabriel",
      name: "Hofmann Bromamide Degradation, Gabriel Synthesis and Ammonolysis",
      intuition:
        "Hofmann degradation is the one route that LOSES a carbon: an amide with Br₂ and concentrated KOH gives the amine with one carbon fewer, the CO leaving as carbonate — a drop of 28 g mol⁻¹. Gabriel synthesis makes primary amines only: potassium phthalimide + R–X → N-alkylphthalimide → hydrolysis gives the amine and phthalate; phthalic acid itself never appears under the basic conditions. Ammonolysis of R–X gives a mixture that alkylates on.",
      definition:
        "- **Hofmann degradation**: \\(\\text{RCONH}_2 + \\text{Br}_2 + 4\\text{KOH} \\to \\text{RNH}_2 + \\text{K}_2\\text{CO}_3 + 2\\text{KBr} + 2\\text{H}_2\\text{O}\\). Acetamide → **methylamine**. Loss in molar mass = CO = **28 g mol⁻¹**.\n" +
        "- **Gabriel**: phthalimide \\(\\xrightarrow{\\text{KOH}}\\) potassium phthalimide \\(\\xrightarrow{\\text{R-X}}\\) N-alkylphthalimide \\(\\xrightarrow{\\text{NaOH(aq)}}\\) **primary amine** + sodium phthalate. NOT formed: phthalic acid. Aryl halides do not work.\n" +
        "- **Ammonolysis**: benzyl chloride + NH₃ → benzylamine; then 2 CH₃I → \\(\\text{C}_6\\text{H}_5\\text{CH}_2\\text{N(CH}_3)_2\\) (tertiary). Excess R–X goes on to the quaternary salt.\n" +
        "- Hofmann DEGRADATION (amide → amine, one C fewer) is not Hofmann ELIMINATION (quaternary salt → alkene).",
      formula: {
        label: "Hofmann bromamide degradation",
        latex:
          "\\text{RCONH}_2 \\xrightarrow{\\text{Br}_2,\\ \\text{KOH (conc.)}} \\text{RNH}_2 \\quad (\\text{one carbon fewer; } -28\\ \\text{g mol}^{-1})",
      },
      authoredExample: {
        prompt: "Which amide gives propan-1-amine by Hofmann degradation, and which nitrile gives it by Mendius reduction?",
        steps: [
          "Degradation loses a carbon: butanamide (C₄). Reduction keeps them: propanenitrile (C₃).",
        ],
        answer: "Butanamide; propanenitrile",
      },
      selfCheckExample: {
        prompt: "Which is NOT obtained at any stage of Gabriel synthesis: potassium phthalimide, N-alkylphthalimide, phthalic acid, primary amine?",
        steps: [
          "Basic hydrolysis gives the phthalate salt, never the free acid.",
        ],
        answer: "Phthalic acid",
      },
      practiceSet: [
        { prompt: "Acetamide + Br₂ + conc. KOH gives?", answer: "Methylamine" },
        { prompt: "Loss in molar mass in Hofmann degradation?", answer: "28 g mol⁻¹ (CO)" },
        { prompt: "N-alkylphthalimide + aq. NaOH gives phthalate and?", answer: "A primary amine" },
        { prompt: "Benzyl chloride + NH₃, then 2 CH₃I gives?", answer: "\\(\\text{C}_6\\text{H}_5\\text{CH}_2\\text{N(CH}_3)_2\\)" },
      ],
      pyqExampleId: "7bd036fb-a73b-4f87-8940-9fc4c3609946",
      traps: [
        {
          title: "Losing CO₂ (44) instead of CO (28)",
          body:
            "The amide's carbonyl leaves as carbonate, but the MOLECULE loses C=O: 12 + 16 = 28. Amine mass = amide mass − 28.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Reactions and Basicity — Hofmann elimination, the other Hofmann",
      href: "/notes/mht-cet-chemistry/amines/cetam-reactions-and-basicity",
    },
    {
      label: "Halogen Derivatives — KCN versus AgCN on the halide",
      href: "/notes/mht-cet-chemistry/halogen-derivatives/cethal-nucleophilic-substitution",
    },
  ],
};
