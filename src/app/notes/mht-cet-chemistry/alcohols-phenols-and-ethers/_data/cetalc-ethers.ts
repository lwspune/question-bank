import type { SubtopicNote } from "@/app/notes/_types";

export const ETHERS_NOTE: SubtopicNote = {
  subtopicName: "Ethers, Preparation and Reactions",
  title: "Ethers: Preparation and Reactions",
  oneLineDefinition:
    "Ethers R–O–R' are made by the Williamson synthesis — a sodium alkoxide displacing a halide by SN2, so the halide must be primary or methyl and never aryl — and are cleaved by hot HI at the alkyl–oxygen bond, an aryl alkyl ether giving the phenol plus the alkyl iodide; cold concentrated H₂SO₄ merely protonates them to oxonium salts.",
  whyItMatters:
    "13 PYQs, none HARD. Five are Williamson — which method makes ethers, which halide will NOT work (chlorobenzene), what methyl bromide gives with sodium tert-butoxide; eight are reactions — ethers in cold concentrated H₂SO₄ (oxonium salts, three times), anisole or ethoxybenzene with HI or dilute acid (phenol plus the alkyl fragment), anisole with bromine in acetic acid (para), and which heterocycle lacks oxygen. " +
    "Two cards.",
  concepts: [
    // 1 — Williamson
    {
      kind: "formula" as const,
      slug: "cetalc-williamson-synthesis",
      name: "Williamson Synthesis: Alkoxide Plus Primary Halide",
      intuition:
        "The alkoxide is a nucleophile; the halide is its target. Because the step is SN2, put the crowding on the ALKOXIDE side and keep the halide primary: sodium tert-butoxide + methyl bromide gives methyl tert-butyl ether cleanly, whereas tert-butyl bromide + methoxide would eliminate. An aryl halide cannot be the target at all — its C–X bond has double-bond character and resists SN2.",
      definition:
        "- \\(\\text{R-ONa} + \\text{R'-X} \\to \\text{R-O-R'} + \\text{NaX}\\) (SN2). Method of choice for unsymmetrical ethers.\n" +
        "- Does NOT work with \\(\\text{C}_6\\text{H}_5\\text{Cl}\\) (aryl halide); poor with tertiary halides (elimination). Ethyl chloride, propyl chloride, methyl bromide are fine.\n" +
        "- \\(\\text{CH}_3\\text{Br} + (\\text{CH}_3)_3\\text{CONa} \\to (\\text{CH}_3)_3\\text{C-O-CH}_3\\), **2-methoxy-2-methylpropane** (MTBE) — not isobutylene.\n" +
        "- Anisole from sodium phenoxide + \\(\\text{CH}_3\\text{I}\\) (the phenoxide is the nucleophile, the methyl halide the target).\n" +
        "- Symmetrical ethers also from two alcohols with conc. \\(\\text{H}_2\\text{SO}_4\\) at 413 K. Methoxymethane is the simplest ether; benzenol and benzene-1,2-diol are phenols, propan-2-ol an alcohol.",
      formula: {
        label: "Williamson synthesis",
        latex:
          "\\text{R-O}^-\\text{Na}^+ + \\text{R'-X} \\xrightarrow{\\text{SN2}} \\text{R-O-R'} + \\text{NaX} \\quad (\\text{R'X primary; never aryl})",
      },
      authoredExample: {
        prompt: "Plan a Williamson synthesis of ethyl tert-butyl ether and say which pairing must be avoided.",
        steps: [
          "Sodium tert-butoxide + ethyl bromide. The reverse pairing, sodium ethoxide + tert-butyl bromide, gives 2-methylpropene by elimination.",
        ],
        answer: "\\((\\text{CH}_3)_3\\text{CONa} + \\text{C}_2\\text{H}_5\\text{Br}\\); avoid tert-butyl bromide as the halide",
      },
      selfCheckExample: {
        prompt: "Which of ethyl chloride, tert-butyl chloride, chlorobenzene and propyl chloride will NOT undergo Williamson synthesis at all?",
        steps: [
          "The aryl halide — no SN2 at an sp² carbon.",
        ],
        answer: "Chlorobenzene",
      },
      practiceSet: [
        { prompt: "Method for preparing ethers from an alkyl halide?", answer: "Sodium alkoxide on the alkyl halide (Williamson)" },
        { prompt: "Methyl bromide + sodium tert-butoxide gives?", answer: "2-Methoxy-2-methylpropane" },
        { prompt: "Which does NOT undergo Williamson synthesis: C₂H₅Cl, C₆H₅Cl, C₃H₇Cl?", answer: "C₆H₅Cl" },
        { prompt: "Identify the ether: benzenol, benzene-1,2-diol, methoxymethane, propan-2-ol?", answer: "Methoxymethane" },
      ],
      pyqExampleId: "e8e25a4a-e372-4625-baa9-d941085e7ead",
      traps: [
        {
          title: "Expecting isobutylene from methyl bromide and tert-butoxide",
          body:
            "Elimination needs a β-hydrogen on the HALIDE; methyl bromide has none. The bulky base simply attacks the unhindered methyl carbon: MTBE forms.",
        },
      ],
    },

    // 2 — reactions of ethers
    {
      kind: "formula" as const,
      slug: "cetalc-reactions-of-ethers",
      name: "Reactions of Ethers: Oxonium Salts, HI Cleavage, Anisole",
      intuition:
        "The ether oxygen has lone pairs, so cold concentrated H₂SO₄ simply protonates it — the ether dissolves as an oxonium salt. Hot concentrated HI breaks the bond: for a dialkyl ether the smaller alkyl leaves as iodide (SN2); for an aryl alkyl ether the aryl–O bond cannot break, so anisole gives PHENOL and iodomethane. Dilute acid hydrolyses anisole to phenol and methanol. On the ring, OCH₃ is an activating o/p director and bromine in acetic acid gives mainly p-bromoanisole.",
      definition:
        "- Cold conc. \\(\\text{H}_2\\text{SO}_4\\): \\(\\text{R}_2\\text{O} + \\text{H}_2\\text{SO}_4 \\to [\\text{R}_2\\text{OH}]^+\\text{HSO}_4^-\\), an **oxonium salt** — not an alkanol, acid or alkyl hydrogen sulphate.\n" +
        "- Hot HI, 398 K: \\(\\text{C}_6\\text{H}_5\\text{OCH}_3 \\to \\text{C}_6\\text{H}_5\\text{OH} + \\text{CH}_3\\text{I}\\); ethoxybenzene → phenol + ethyl iodide. Never iodobenzene.\n" +
        "- Dilute \\(\\text{H}_2\\text{SO}_4\\), heat: anisole → **phenol + methanol**.\n" +
        "- Electrophilic substitution on anisole: \\(\\text{Br}_2\\)/acetic acid → **p-bromoanisole** (major); nitration → o/p-nitroanisole; Friedel–Crafts → o/p products.\n" +
        "- Oxygen heterocycles: furan, THF, pyran; **pyrrole** has nitrogen instead.",
      formula: {
        label: "Cleavage by HI",
        latex:
          "\\text{Ar-O-R} + \\text{HI} \\xrightarrow{\\Delta} \\text{Ar-OH} + \\text{R-I} \\quad (\\text{aryl-O bond survives})",
      },
      authoredExample: {
        prompt: "Give the products of (i) ethyl methyl ether and (ii) ethyl phenyl ether with excess hot HI.",
        steps: [
          "(i) Both alkyl: the smaller group leaves first as CH₃I and the ethanol formed reacts on to C₂H₅I with excess HI. (ii) Aryl alkyl: phenol + ethyl iodide.",
        ],
        answer: "(i) CH₃I + C₂H₅I (excess); (ii) phenol + C₂H₅I",
      },
      selfCheckExample: {
        prompt: "What forms when an ether is dissolved in cold concentrated sulphuric acid, and what does anisole give with dilute sulphuric acid on heating?",
        steps: [
          "Protonation only — an oxonium salt. Hydrolysis — phenol and methanol.",
        ],
        answer: "Oxonium salt; phenol + methanol",
      },
      practiceSet: [
        { prompt: "Ether + cold conc. H₂SO₄ gives?", answer: "Oxonium salt" },
        { prompt: "Ethoxybenzene + hot conc. HI gives?", answer: "Phenol + ethyl iodide" },
        { prompt: "Anisole + Br₂ in acetic acid, major product?", answer: "p-Bromoanisole" },
        { prompt: "Which lacks oxygen as heteroatom: furan, THF, 4H-pyran, pyrrole?", answer: "Pyrrole" },
      ],
      pyqExampleId: "c8fd88af-c64b-42ba-b995-f4c7c607b320",
      traps: [
        {
          title: "Cleaving the aryl side with HI",
          body:
            "The aryl–oxygen bond has partial double-bond character and does not break. Anisole gives phenol + CH₃I; 'iodobenzene + methanol' is the planted option.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Halogen Derivatives — the SN2 that Williamson runs on",
      href: "/notes/mht-cet-chemistry/halogen-derivatives/cethal-nucleophilic-substitution",
    },
    {
      label: "Nomenclature — alkoxy names and ether isomers",
      href: "/notes/mht-cet-chemistry/alcohols-phenols-and-ethers/cetalc-nomenclature",
    },
  ],
};
