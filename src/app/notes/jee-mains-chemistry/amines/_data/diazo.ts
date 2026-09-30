import type { SubtopicNote } from "@/app/notes/_types";

export const DIAZO_AMINE_NOTE: SubtopicNote = {
  subtopicName: "Diazonium Salts: Stability and Replacement Reactions",
  title: "Diazonium Salts: Stability and Replacement Reactions",
  oneLineDefinition:
    "A primary aryl amine with nitrous acid in the cold gives an arenediazonium salt, whose N₂ group can be replaced by halogen, cyanide, OH or H — so NH₂ can direct a substitution and then be removed.",
  whyItMatters:
    "Twenty-nine PYQs, three numerical, six from 2026, the largest page in the chapter. Four rank diazonium salts by stability; twelve ask what a reagent puts in place of the diazo group; thirteen ask for the reagents, in order, of a synthesis that uses the amino group as a temporary director.",
  concepts: [
    // C1 — diazotisation and stability
    {
      kind: "formula" as const,
      slug: "jcamine-diazo-stability",
      name: "Diazotisation and the stability of diazonium salts",
      intuition:
        "Nitrous acid, made in the cold from sodium nitrite and hydrochloric acid, converts \\(\\mathrm{ArNH_2}\\) into \\(\\mathrm{ArN_2^+}\\). On an aryl group the positive charge is spread into the ring, so the salt survives in cold solution. On an alkyl group there is no such spreading, and the ion loses \\(\\mathrm{N_2}\\) at once. Groups that push electrons into the ring spread the charge further and make the salt more stable.",
      definition:
        "- Diazotisation is done at 273–278 K and the salt is used at once; on warming the solution gives phenol and \\(\\mathrm{N_2}\\).\n" +
        "- Arenediazonium ions are stabilised by resonance with the ring; alkanediazonium ions are not.\n" +
        "- Stability of para-substituted salts: electron donors raise it, electron acceptors lower it, for example \\(\\mathrm{OCH_3 > CH_3 > H > NO_2}\\).\n" +
        "- The nitrogen must be on the ring: benzylamine behaves as an aliphatic amine and gives no stable diazonium salt.\n" +
        "- Benzenediazonium fluoroborate, \\(\\mathrm{C_6H_5N_2^+BF_4^-}\\), is stable enough to isolate as a solid.\n" +
        "- o-Phenylenediamine with nitrous acid diazotises one \\(\\mathrm{NH_2}\\), which is captured by the other to give benzotriazole.",
      formula: {
        label: "Diazotisation of aniline",
        latex:
          "\\mathrm{C_6H_5NH_2 + NaNO_2 + 2HCl \\xrightarrow{273{-}278\\ K} C_6H_5N_2^+Cl^- + NaCl + 2H_2O}",
      },
      authoredExample: {
        prompt:
          "Arrange in decreasing stability: 4-methylbenzenediazonium chloride, benzenediazonium chloride and ethanediazonium chloride.",
        steps: [
          "Ethanediazonium has its \\(\\mathrm{N_2^+}\\) on an \\(sp^3\\) carbon: no resonance, it loses \\(\\mathrm{N_2}\\) at once. Least stable.",
          "Both aryl salts are stabilised by resonance with the ring.",
          "The para \\(\\mathrm{CH_3}\\) pushes electron density into the ring (hyperconjugation), spreading the positive charge further.",
        ],
        answer: "4-Methylbenzenediazonium > benzenediazonium > ethanediazonium",
      },
      selfCheckExample: {
        prompt:
          "Which of benzylamine and 4-methylaniline gives a stable diazonium salt with \\(\\mathrm{NaNO_2}\\) and HCl at 273 K? Explain.",
        steps: [
          "Both have formula \\(\\mathrm{C_7H_9N}\\) and both are primary amines.",
          "In 4-methylaniline the nitrogen is on a ring carbon, so the diazonium ion is resonance-stabilised.",
          "In benzylamine the nitrogen is on \\(\\mathrm{CH_2}\\); its diazonium ion is aliphatic and loses \\(\\mathrm{N_2}\\) at once.",
        ],
        answer: "4-Methylaniline; benzylamine gives \\(\\mathrm{N_2}\\) and benzyl alcohol",
      },
      practiceSet: [
        { prompt: "Why is an arenediazonium ion more stable than an alkanediazonium ion?", answer: "Its positive charge is delocalised into the benzene ring" },
        { prompt: "At what temperature is aniline diazotised?", answer: "273–278 K" },
        { prompt: "What forms when o-phenylenediamine is treated with nitrous acid?", answer: "Benzotriazole" },
        { prompt: "Which diazonium salt is stable enough to isolate as a dry solid?", answer: "Benzenediazonium fluoroborate, \\(\\mathrm{C_6H_5N_2^+BF_4^-}\\)" },
      ],
      pyqExampleId: "47828321-2a0e-40b6-a49b-da2bdce43c11", // 2026 — p-OMe, H, p-CN, p-NO2 diazonium salts
      traps: [
        {
          title: "Electron-withdrawing groups destabilise the diazonium salt",
          body: "A para nitro or cyano group pulls electrons away from a ring that is already carrying a positive charge, so the salt becomes less stable. A para methoxy group does the opposite.",
        },
        {
          title: "Only a nitrogen on the ring gives a stable salt",
          body: "Diazotisation at 273–278 K gives a usable salt only from a primary aromatic amine. Aliphatic amines, benzylamine included, lose nitrogen at once.",
        },
      ],
    },

    // C2 — replacement reactions
    {
      kind: "reference" as const,
      slug: "jcamine-diazo-replacement",
      name: "Replacement reactions of arenediazonium salts",
      intuition:
        "\\(\\mathrm{N_2}\\) is one of the best leaving groups in chemistry, so the diazo group can be swapped for almost anything. Each replacement has its own reagent, and questions test the pairing: which reagent gives which product, and which halogens a copper(I) salt can deliver.",
      definition:
        "- **Sandmeyer**: CuCl/HCl, CuBr/HBr or CuCN/KCN give ArCl, ArBr or ArCN. **Gattermann**: copper powder with HCl or HBr does the same for Cl and Br.\n" +
        "- Iodine needs no catalyst: KI gives ArI.\n" +
        "- Fluorine: \\(\\mathrm{HBF_4}\\) gives the fluoroborate, which on heating gives ArF (Balz–Schiemann).\n" +
        "- Warm water gives phenol.\n" +
        "- Reduction to ArH: hypophosphorous acid (\\(\\mathrm{H_3PO_2}\\)) or ethanol; ethanol is oxidised to ethanal.\n" +
        "- ArCN can be hydrolysed to ArCOOH, which is a way to put COOH on a ring.",
      table: {
        columns: ["Reagent", "Product from ArN₂⁺", "Name or note"],
        rows: [
          { cells: ["\\(\\mathrm{CuCl/HCl}\\)", "ArCl", "Sandmeyer"] },
          { cells: ["\\(\\mathrm{CuBr/HBr}\\)", "ArBr", "Sandmeyer"] },
          { cells: ["\\(\\mathrm{CuCN/KCN}\\)", "ArCN", "Sandmeyer"] },
          { cells: ["Cu powder with HCl or HBr", "ArCl or ArBr", "Gattermann"] },
          { cells: ["KI", "ArI", "No copper needed"] },
          { cells: ["\\(\\mathrm{HBF_4}\\), then heat", "ArF, with \\(\\mathrm{BF_3}\\) and \\(\\mathrm{N_2}\\)", "Balz–Schiemann"] },
          { cells: ["\\(\\mathrm{H_2O}\\), warm", "ArOH", "Phenol and \\(\\mathrm{N_2}\\)"] },
          { cells: ["\\(\\mathrm{H_3PO_2}\\) and \\(\\mathrm{H_2O}\\)", "ArH", "Reductive removal; \\(\\mathrm{H_3PO_3}\\) forms"] },
          { cells: ["\\(\\mathrm{CH_3CH_2OH}\\)", "ArH", "Ethanol is oxidised to ethanal"] },
        ],
        caption: "Sandmeyer delivers Cl, Br and CN only; F and I come by other reagents.",
      },
      selfCheckExample: {
        prompt:
          "Name the reagents that convert benzenediazonium chloride into (a) benzonitrile, (b) iodobenzene and (c) fluorobenzene.",
        steps: [
          "(a) Cyanide by Sandmeyer: CuCN with KCN.",
          "(b) Iodide needs no copper: KI.",
          "(c) Fluoride by Balz–Schiemann: \\(\\mathrm{HBF_4}\\) to give the fluoroborate, then heat.",
        ],
        answer: "(a) CuCN/KCN; (b) KI; (c) \\(\\mathrm{HBF_4}\\), then heat",
      },
      practiceSet: [
        { prompt: "What does benzenediazonium chloride give on warming with water?", answer: "Phenol" },
        { prompt: "Which reagent replaces the diazo group by hydrogen?", answer: "Hypophosphorous acid, \\(\\mathrm{H_3PO_2}\\) (or ethanol)" },
        { prompt: "How does the Gattermann reaction differ from the Sandmeyer reaction?", answer: "It uses copper powder with HX instead of a copper(I) halide" },
        { prompt: "How many of chloro-, bromo- and iodobenzene can be made by the Sandmeyer reaction?", answer: "Two: chloro- and bromobenzene (iodobenzene is made with KI)" },
      ],
      pyqExampleId: "4c98a75f-63ed-44ae-b95b-b8353ca4963b", // 2026 — ethanol from propanoic acid reduces PhN2+ to benzene
      traps: [
        {
          title: "Ethanol reduces, it does not make an ether",
          body: "Benzenediazonium chloride with ethanol gives benzene and ethanal. A reaction claiming phenetole, \\(\\mathrm{C_6H_5OC_2H_5}\\), as the product is wrong.",
        },
        {
          title: "Fluoro- and iodobenzene are not Sandmeyer products",
          body: "Copper(I) salts deliver chloride, bromide and cyanide. Iodobenzene comes from KI; fluorobenzene comes from the fluoroborate on heating.",
        },
      ],
    },

    // C3 — synthesis with NH2 as a temporary director
    {
      kind: "formula" as const,
      slug: "jcamine-diazo-synthesis",
      name: "Synthesis planning with diazonium salts: the amino group as a temporary director",
      intuition:
        "The amino group, and the nitro group it comes from, can direct a substitution to a place no other group would, and then be replaced or removed through the diazonium salt. So the order of steps is the whole question: ask which group is on the ring at the moment each substitution happens, and what it directs.",
      definition:
        "- \\(\\mathrm{NO_2}\\) directs **meta**; \\(\\mathrm{NH_2}\\) (or \\(\\mathrm{NHCOCH_3}\\)) directs **ortho and para**. Reducing \\(\\mathrm{NO_2}\\) to \\(\\mathrm{NH_2}\\) switches the director.\n" +
        "- Brominate a nitro compound first to put Br meta; reduce, diazotise, then replace the \\(\\mathrm{N_2^+}\\).\n" +
        "- Brominate the amine to put Br ortho and para to it; then remove the \\(\\mathrm{N_2^+}\\) with \\(\\mathrm{H_3PO_2}\\), leaving a pattern that no direct bromination could give.\n" +
        "- Protect the amine (acetylate) when only one bromine is wanted.\n" +
        "- A side-chain \\(\\mathrm{CH_3}\\) can be oxidised to COOH by \\(\\mathrm{KMnO_4}\\), usually as a late step, because COOH directs meta.",
      formula: {
        label: "Removing the amino group after it has directed",
        latex:
          "\\mathrm{ArNH_2 \\xrightarrow{NaNO_2,\\ HCl,\\ 273\\ K} ArN_2^+Cl^- \\xrightarrow{H_3PO_2,\\ H_2O} ArH + N_2}",
      },
      authoredExample: {
        prompt: "Give the reagents, in order, to make 3-bromophenol from nitrobenzene.",
        steps: [
          "Br must end up meta to O. Only the nitro group directs meta, so brominate while \\(\\mathrm{NO_2}\\) is still there: \\(\\mathrm{Br_2/FeBr_3}\\) gives 3-bromonitrobenzene.",
          "Reduce the nitro group: Sn/HCl gives 3-bromoaniline.",
          "Diazotise at 273–278 K: \\(\\mathrm{NaNO_2/HCl}\\).",
          "Warm with water to replace \\(\\mathrm{N_2^+}\\) by OH.",
        ],
        answer: "(i) \\(\\mathrm{Br_2/FeBr_3}\\); (ii) Sn/HCl; (iii) \\(\\mathrm{NaNO_2/HCl}\\), 273 K; (iv) \\(\\mathrm{H_2O}\\), warm",
      },
      selfCheckExample: {
        prompt: "Give the reagents, in order, to make 3-bromotoluene from 4-methylaniline.",
        steps: [
          "Br is wanted ortho to \\(\\mathrm{NH_2}\\) (meta to \\(\\mathrm{CH_3}\\)), but only one Br: protect the amine by acetylation.",
          "Brominate: the acetamido group directs Br ortho to itself, since its para position holds \\(\\mathrm{CH_3}\\).",
          "Hydrolyse the amide, diazotise, and remove the \\(\\mathrm{N_2^+}\\) with \\(\\mathrm{H_3PO_2}\\).",
        ],
        answer: "(i) \\(\\mathrm{(CH_3CO)_2O}\\); (ii) \\(\\mathrm{Br_2/CH_3COOH}\\); (iii) \\(\\mathrm{H_3O^+}\\), heat; (iv) \\(\\mathrm{NaNO_2/HCl}\\), 273 K; (v) \\(\\mathrm{H_3PO_2}\\)",
      },
      practiceSet: [
        { prompt: "Why must nitrobenzene be brominated before it is reduced, when 3-bromoaniline is the target?", answer: "\\(\\mathrm{NO_2}\\) directs meta; after reduction \\(\\mathrm{NH_2}\\) would direct ortho and para" },
        { prompt: "Give the reagents to convert 4-nitrotoluene into 4-methylphenol.", answer: "(i) Sn/HCl; (ii) \\(\\mathrm{NaNO_2/HCl}\\), 273 K; (iii) \\(\\mathrm{H_2O}\\), warm" },
        { prompt: "Give the reagents to convert aniline into benzoic acid.", answer: "(i) \\(\\mathrm{NaNO_2/HCl}\\), 273 K; (ii) CuCN/KCN; (iii) \\(\\mathrm{H_3O^+}\\), heat (hydrolysis of the nitrile)" },
        { prompt: "Give the reagents to convert nitrobenzene into 1,3-dibromobenzene.", answer: "(i) \\(\\mathrm{Br_2/Fe}\\); (ii) Sn/HCl; (iii) \\(\\mathrm{NaNO_2/HCl}\\); (iv) CuBr/HBr" },
      ],
      pyqExampleId: "207bb59f-5f1f-483b-9bd6-f16bf6512489", // 2023 — 1,3,5-tribromobenzene from aniline via H3PO2
      traps: [
        {
          title: "The director is whatever is on the ring at that step",
          body: "The same nitrogen directs meta as \\(\\mathrm{NO_2}\\) and ortho-para as \\(\\mathrm{NH_2}\\). A sequence that reduces before brominating puts the bromine in a different place from one that brominates first.",
        },
        {
          title: "Removing NH₂ leaves the pattern it created",
          body: "After \\(\\mathrm{H_3PO_2}\\) removes the diazo group, the substituents stay where the amino group sent them. Two bromines placed ortho and para to an \\(\\mathrm{NH_2}\\) are meta to each other once the \\(\\mathrm{NH_2}\\) is gone.",
        },
      ],
    },
  ],
};
