import type { SubtopicNote } from "@/app/notes/_types";

export const AZO_AMINE_NOTE: SubtopicNote = {
  subtopicName: "Coupling Reactions and Azo Dyes",
  title: "Coupling Reactions and Azo Dyes",
  oneLineDefinition:
    "A diazonium ion keeps its nitrogen and attacks a very electron-rich ring, usually para to OH or NH₂, to give a coloured azo compound, Ar–N=N–Ar′.",
  whyItMatters:
    "Nineteen PYQs, four numerical, three from 2026. Twelve ask for the coupling product, the partner or the medium, including the β-naphthol test for aryl amines; seven are dye stoichiometry, percentage of nitrogen and the Griess–Ilosvay test for nitrite.",
  concepts: [
    // C1 — coupling
    {
      kind: "formula" as const,
      slug: "jcamine-coupling",
      name: "Coupling of diazonium salts with phenols and aryl amines",
      intuition:
        "In coupling the diazonium ion does not lose nitrogen; it acts as an electrophile. It is a weak one, so it attacks only rings strongly activated by OH, O⁻, \\(\\mathrm{NH_2}\\) or \\(\\mathrm{NR_2}\\). It goes para to the activating group, or ortho when para is taken. The \\(\\mathrm{{-}N{=}N{-}}\\) bridge joins two rings into one long conjugated system, which is why the products are coloured.",
      definition:
        "- With phenol in mildly **alkaline** solution (the phenoxide ion is the reactive form): 4-hydroxyazobenzene, orange.\n" +
        "- With aniline in mildly **acidic** solution: 4-aminoazobenzene (aniline yellow), yellow.\n" +
        "- With 2-naphthol (β-naphthol) in NaOH: 1-phenylazo-2-naphthol, orange-red. This is the confirmatory test for a primary aromatic amine.\n" +
        "- Attack is para to the activating group; if para is blocked, ortho.\n" +
        "- Methyl groups ortho to an \\(\\mathrm{N(CH_3)_2}\\) group twist it out of the ring plane, cut its resonance with the ring and slow coupling.\n" +
        "- Aliphatic diazonium ions decompose before they can couple, so they give no dye.",
      formula: {
        label: "Coupling of benzenediazonium chloride with phenol",
        latex:
          "\\mathrm{C_6H_5N_2^+Cl^- + C_6H_5OH \\xrightarrow{OH^-} C_6H_5{-}N{=}N{-}C_6H_4{-}OH\\ (para) + HCl}",
      },
      authoredExample: {
        prompt:
          "Benzenediazonium chloride is coupled (a) with 2-naphthol in NaOH and (b) with aniline in mildly acidic solution. Give each product and its colour.",
        steps: [
          "(a) 2-Naphthol is most activated at C1, next to the OH; the aryl diazonium attacks there.",
          "The product is 1-phenylazo-2-naphthol, an orange-red dye.",
          "(b) Aniline is attacked para to \\(\\mathrm{NH_2}\\); mild acid keeps the diazonium ion intact without protonating all the aniline.",
          "The product is 4-aminoazobenzene, \\(\\mathrm{C_6H_5N{=}NC_6H_4NH_2}\\), yellow.",
        ],
        answer: "(a) 1-Phenylazo-2-naphthol, orange-red; (b) 4-aminoazobenzene (aniline yellow), yellow",
      },
      selfCheckExample: {
        prompt:
          "Where does benzenediazonium chloride couple on 4-methylphenol in alkaline solution, and what is the product?",
        steps: [
          "The OH group directs para, but the para position already holds \\(\\mathrm{CH_3}\\).",
          "Coupling then goes ortho to OH.",
        ],
        answer: "Ortho to OH: 4-methyl-2-(phenylazo)phenol",
      },
      practiceSet: [
        { prompt: "In what medium does a diazonium salt couple with phenol?", answer: "Mildly alkaline" },
        { prompt: "In what medium does a diazonium salt couple with aniline?", answer: "Mildly acidic" },
        { prompt: "What is the colour of 4-aminoazobenzene (aniline yellow)?", answer: "Yellow" },
        { prompt: "Does the diazonium salt from ethanamine couple with 2-naphthol?", answer: "No: it loses \\(\\mathrm{N_2}\\) before it can couple" },
      ],
      pyqExampleId: "d845fa01-edec-431a-8827-5e97978611e2", // 2021 — benzenediazonium couples para on N,N-dimethylaniline
      traps: [
        {
          title: "Coupling keeps the nitrogen",
          body: "In replacement reactions \\(\\mathrm{N_2}\\) leaves; in coupling both nitrogens stay in the product as the \\(\\mathrm{{-}N{=}N{-}}\\) bridge. An azo dye always contains the two nitrogens of the diazonium ion.",
        },
        {
          title: "Only strongly activated rings couple",
          body: "The diazonium ion is a weak electrophile. Benzene, toluene or chlorobenzene do not couple; phenols, naphthols and aryl amines do.",
        },
        {
          title: "Ortho methyls slow coupling on dimethylanilines",
          body: "Two methyl groups beside \\(\\mathrm{N(CH_3)_2}\\) push it out of the ring plane. Its lone pair no longer feeds the ring, so the ring is less activated and couples more slowly.",
        },
      ],
    },

    // C2 — dye stoichiometry and the Griess–Ilosvay test
    {
      kind: "formula" as const,
      slug: "jcamine-azo-dyes",
      name: "Azo dye stoichiometry and the Griess–Ilosvay test",
      intuition:
        "Every molecule of dye uses one diazonium ion, so moles of dye equal moles of the amine that was diazotised. If the same amine is also the coupling partner, each dye molecule uses two of it. The Griess–Ilosvay test turns this chemistry into a test for nitrite ion: nitrite diazotises sulphanilic acid, and the salt couples with 1-naphthylamine to give a red dye.",
      definition:
        "- Moles of dye = moles of diazotised amine (with the partner in excess).\n" +
        "- Useful molar masses: aniline 93; 4-aminoazobenzene \\(\\mathrm{C_{12}H_{11}N_3}\\) 197; 4-hydroxyazobenzene \\(\\mathrm{C_{12}H_{10}N_2O}\\) 198.\n" +
        "- % N = (mass of N in one molecule/M) × 100.\n" +
        "- **Griess–Ilosvay test** for \\(\\mathrm{NO_2^-}\\): sulphanilic acid and 1-naphthylamine (α-naphthylamine) in acetic acid; nitrite diazotises the sulphanilic acid and the salt couples para to \\(\\mathrm{NH_2}\\) on the naphthylamine, giving a red azo dye.\n" +
        "- Diazoaminobenzene, \\(\\mathrm{C_6H_5N{=}N{-}NHC_6H_5}\\), warmed with aniline and a little aniline hydrochloride, rearranges to 4-aminoazobenzene.",
      formula: {
        label: "Mass of dye from the diazotised amine",
        latex:
          "n(\\text{dye}) = n(\\mathrm{ArNH_2}) \\qquad m(\\text{dye}) = n(\\text{dye}) \\times M(\\text{dye}) \\qquad \\%\\mathrm{N} = \\dfrac{\\text{mass of N}}{M} \\times 100",
      },
      authoredExample: {
        prompt:
          "4.65 g of aniline is diazotised and the salt is coupled with excess aniline. What mass of aniline yellow forms, assuming complete conversion?",
        steps: [
          "Moles of diazotised aniline = 4.65/93 = 0.050 mol.",
          "Each diazonium ion gives one molecule of 4-aminoazobenzene, \\(\\mathrm{C_{12}H_{11}N_3}\\) (M = 144 + 11 + 42 = 197).",
          "Mass = 0.050 × 197 = 9.85 g.",
        ],
        answer: "9.85 g",
      },
      selfCheckExample: {
        prompt:
          "What is the percentage of nitrogen in 1-phenylazo-2-naphthol, \\(\\mathrm{C_{16}H_{12}N_2O}\\)? (H = 1, C = 12, N = 14, O = 16)",
        steps: [
          "M = 16 × 12 + 12 × 1 + 2 × 14 + 16 = 248.",
          "Mass of nitrogen = 28.",
          "28/248 × 100 = 11.3.",
        ],
        answer: "11.3%",
      },
      practiceSet: [
        { prompt: "What is the molar mass of 4-aminoazobenzene, \\(\\mathrm{C_{12}H_{11}N_3}\\)?", answer: "197 g/mol" },
        { prompt: "Which two reagents are used in the Griess–Ilosvay test, and what does it detect?", answer: "Sulphanilic acid and 1-naphthylamine; it detects nitrite ion (red colour)" },
        { prompt: "0.20 mol of aniline is diazotised and coupled with excess 2-naphthol. How many moles of dye form?", answer: "0.20 mol" },
        { prompt: "What does diazoaminobenzene give when warmed with aniline and a little aniline hydrochloride?", answer: "4-Aminoazobenzene" },
      ],
      pyqExampleId: "7b5a37df-fd3d-44c1-a95c-313003680161", // 2024 — mass of the orange dye from aniline and phenol
      traps: [
        {
          title: "When aniline plays both roles, it is used twice",
          body: "To make aniline yellow from aniline alone, one aniline is diazotised and a second is the coupling partner. The moles of dye are half the moles of aniline used in total, but equal to the moles of diazonium salt.",
        },
        {
          title: "The Griess–Ilosvay colour is red",
          body: "The azo dye from diazotised sulphanilic acid and 1-naphthylamine is red. The test detects nitrite; it uses the amine chemistry but is not a test for amines.",
        },
      ],
    },
  ],
};
