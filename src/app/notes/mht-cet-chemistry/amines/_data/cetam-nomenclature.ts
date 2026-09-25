import type { SubtopicNote } from "@/app/notes/_types";

export const NOMENCLATURE_NOTE: SubtopicNote = {
  subtopicName: "Nomenclature and Classification of Amines",
  title: "Nomenclature and Classification of Amines",
  oneLineDefinition:
    "An amine is primary, secondary or tertiary by how many carbon groups sit on the nitrogen (not on the carbon), simple or mixed by whether those groups match, aliphatic or aromatic by whether one is an aryl ring; IUPAC names use -amine on the longest chain with N-prefixes for the other groups.",
  whyItMatters:
    "19 PYQs, none HARD. Twelve are classification — which named or drawn compound is primary, secondary, tertiary, an aromatic mixed 3° amine, or a molecular formula (cyclohexylamine C₆H₁₃N, p-toluidine C₇H₉N); seven are IUPAC names (allylamine, ethylmethylisopropylamine, a drawn pentenamine, sulphanilic acid) and the C₄H₁₁N isomer counts. " +
    "Two cards.",
  concepts: [
    // 1 — classes and formulas
    {
      kind: "formula" as const,
      slug: "cetam-classes-and-formulas",
      name: "Primary, Secondary, Tertiary; Simple and Mixed; Aliphatic and Aromatic",
      intuition:
        "Count the carbons on NITROGEN. One — primary (R–NH₂), two — secondary (R₂NH), three — tertiary (R₃N). tert-Butylamine is a PRIMARY amine: the tertiary carbon is beside the point. Same groups — simple; different — mixed. Any aryl group directly on N makes it aromatic; benzylamine (PhCH₂NH₂) is aliphatic because the ring is one carbon away.",
      definition:
        "- **Primary**: phenylmethanamine (benzylamine), 4-bromobenzenamine, propan-2-amine, ethane-1,2-diamine, cyclohexanamine, butan-1-amine.\n" +
        "- **Secondary**: N-methylethanamine, N-methylmethanamine, N-phenylbenzenamine (diphenylamine), N-methylaniline.\n" +
        "- **Tertiary**: N,N-dimethylaniline, N-ethyl-N-methylpropan-2-amine, N,N-dimethyl-1-butanamine, triphenylamine.\n" +
        "- \\((\\text{C}_6\\text{H}_5)_3\\text{N}\\): 3° aromatic SIMPLE; \\(\\text{C}_6\\text{H}_5\\text{N(CH}_3)_2\\): 3° aromatic MIXED (aryl + two methyls); \\((\\text{C}_2\\text{H}_5)_3\\text{N}\\): 3° aliphatic simple.\n" +
        "- Formulas: cyclohexylamine \\(\\text{C}_6\\text{H}_{11}\\text{NH}_2 = \\text{C}_6\\text{H}_{13}\\text{N}\\); p-toluidine \\(\\text{CH}_3\\text{C}_6\\text{H}_4\\text{NH}_2 = \\text{C}_7\\text{H}_9\\text{N}\\). Amide grades count the CARBON groups on the amide N: primary \\(\\text{R-CO-NH}_2\\), secondary \\(\\text{R-CO-NH-R}'\\) (one H left), tertiary \\(\\text{R-CO-NR}'_2\\).",
      formula: {
        label: "Degree of an amine",
        latex:
          "\\text{RNH}_2\\ (1^\\circ),\\quad \\text{R}_2\\text{NH}\\ (2^\\circ),\\quad \\text{R}_3\\text{N}\\ (3^\\circ) \\quad — \\text{ count groups on N, not on C}",
      },
      authoredExample: {
        prompt: "Classify N-ethylaniline, (CH₃)₃CNH₂ and N-methyl-N-phenylaniline by degree and by simple/mixed, aliphatic/aromatic.",
        steps: [
          "N-Ethylaniline: two groups on N (phenyl, ethyl) — 2°, aromatic, mixed. tert-Butylamine: one group — 1°, aliphatic. N-Methyl-N-phenylaniline: three groups (two phenyl, one methyl) — 3°, aromatic, mixed.",
        ],
        answer: "2° aromatic mixed; 1° aliphatic; 3° aromatic mixed",
      },
      selfCheckExample: {
        prompt: "Which is NOT a tertiary amine: N,N-dimethylaniline, N-methyl-N-phenylaniline, butan-1-amine, N,N-dimethyl-1-butanamine? And what is the formula of cyclohexylamine?",
        steps: [
          "Butan-1-amine has one carbon on N. \\(\\text{C}_6\\text{H}_{13}\\text{N}\\).",
        ],
        answer: "Butan-1-amine; \\(\\text{C}_6\\text{H}_{13}\\text{N}\\)",
      },
      practiceSet: [
        { prompt: "Class of \\((\\text{C}_6\\text{H}_5)_3\\text{N}\\)?", answer: "3° aromatic simple amine" },
        { prompt: "Aromatic mixed 3° amine: \\(\\text{C}_6\\text{H}_5\\text{NHC}_2\\text{H}_5\\), \\((\\text{C}_2\\text{H}_5)_3\\text{N}\\), \\(\\text{C}_6\\text{H}_5\\text{N(CH}_3)_2\\)?", answer: "\\(\\text{C}_6\\text{H}_5\\text{N(CH}_3)_2\\)" },
        { prompt: "Molecular formula of p-toluidine?", answer: "\\(\\text{C}_7\\text{H}_9\\text{N}\\)" },
        { prompt: "Secondary amine: propan-2-amine or N-methylethanamine?", answer: "N-Methylethanamine" },
      ],
      pyqExampleId: "d74470bd-95a3-4949-8a91-a9fe1a7a2b5a",
      traps: [
        {
          title: "Grading the amine by its carbon",
          body:
            "tert-Butylamine and propan-2-amine are PRIMARY amines — one carbon on N. The 1°/2°/3° label for amines counts nitrogen's substituents, unlike alcohols and halides.",
        },
      ],
    },

    // 2 — IUPAC names and isomers
    {
      kind: "formula" as const,
      slug: "cetam-iupac-names-and-isomers",
      name: "IUPAC Names, N-Prefixes and Counting C₄H₁₁N Isomers",
      intuition:
        "Take the longest chain carrying N as the parent alkanamine, number so the amine carbon is lowest, and write the other groups on nitrogen as N-prefixes in alphabetical order. For isomer counts of C₄H₁₁N, list the four primary amines (four butyl skeletons), three secondary (diethyl, methylpropyl, methylisopropyl) and one tertiary (N,N-dimethylethanamine): eight in all.",
      definition:
        "- Allylamine \\(\\text{CH}_2\\text{=CH-CH}_2\\text{NH}_2\\) = **prop-2-en-1-amine**. \\(\\text{CH}_3\\text{CH=CH-CH(NH}_2)\\text{CH}_3\\) = **pent-3-en-2-amine**.\n" +
        "- Ethylmethylisopropylamine: the isopropyl chain is the parent → **N-ethyl-N-methylpropan-2-amine**.\n" +
        "- \\(\\text{C}_4\\text{H}_{11}\\text{N}\\): four 1°, **three 2°** (diethylamine, N-methylpropan-1-amine, N-methylpropan-2-amine), **one 3°** (N,N-dimethylethanamine).\n" +
        "- Sulphanilic acid = 4-aminobenzenesulphonic acid (\\(\\text{H}_2\\text{N-C}_6\\text{H}_4\\text{-SO}_3\\text{H}\\)), a zwitterion.\n" +
        "- Reagents to keep straight: hydrazine \\(\\text{NH}_2\\text{NH}_2\\), hydroxylamine \\(\\text{NH}_2\\text{OH}\\), semicarbazide \\(\\text{NH}_2\\text{NHCONH}_2\\), **phenylhydrazine \\(\\text{C}_6\\text{H}_5\\text{NHNH}_2\\)** (one phenyl — \\(\\text{C}_6\\text{H}_5\\text{NHNHC}_6\\text{H}_5\\) is wrong).",
      formula: {
        label: "N-prefix naming",
        latex:
          "\\text{longest chain on N} \\to \\text{alkan-}k\\text{-amine};\\quad \\text{other N groups} \\to N\\text{-alkyl prefixes, alphabetical}",
      },
      authoredExample: {
        prompt: "Name \\((\\text{CH}_3)_2\\text{N-CH}_2\\text{CH}_2\\text{CH}_3\\) and \\(\\text{CH}_3\\text{CH}_2\\text{-NH-CH(CH}_3)_2\\).",
        steps: [
          "Propane is the parent with two N-methyls: N,N-dimethylpropan-1-amine. Isopropyl (propan-2-) is the parent with an N-ethyl: N-ethylpropan-2-amine.",
        ],
        answer: "N,N-Dimethylpropan-1-amine; N-ethylpropan-2-amine",
      },
      selfCheckExample: {
        prompt: "How many secondary and how many tertiary amines have the formula C₄H₁₁N?",
        steps: [
          "Secondary: diethyl, methyl-n-propyl, methyl-isopropyl — three. Tertiary: only dimethylethyl — one.",
        ],
        answer: "3 secondary; 1 tertiary",
      },
      practiceSet: [
        { prompt: "IUPAC name of allylamine?", answer: "Prop-2-en-1-amine" },
        { prompt: "IUPAC name of ethylmethylisopropylamine?", answer: "N-Ethyl-N-methylpropan-2-amine" },
        { prompt: "Tertiary amines with formula C₄H₁₁N?", answer: "One" },
        { prompt: "Common name of 4-aminobenzenesulphonic acid?", answer: "Sulphanilic acid" },
      ],
      pyqExampleId: "a8c278ea-ae2f-4265-b20f-e344794b400b",
      traps: [
        {
          title: "Taking the ethyl as the parent chain",
          body:
            "Isopropyl has three carbons to ethyl's two, so propan-2-amine is the parent and ethyl and methyl become N-prefixes. 'N-Methyl-N-isopropylethanamine' is the planted option.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Reactions and Basicity — why the degree matters",
      href: "/notes/mht-cet-chemistry/amines/cetam-reactions-and-basicity",
    },
    {
      label: "Basic Principles — the IUPAC priority order",
      href: "/notes/mht-cet-chemistry/basic-principles-of-organic-chemistry/cetbp-nomenclature-and-functional-groups",
    },
  ],
};
