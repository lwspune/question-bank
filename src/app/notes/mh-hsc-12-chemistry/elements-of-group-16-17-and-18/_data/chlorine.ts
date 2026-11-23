import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_GP_CHLORINE_NOTE: SubtopicNote = {
  subtopicName: "Chlorine and Compounds of Chlorine",
  title: "Chlorine and Hydrogen Chloride",
  oneLineDefinition:
    "How chlorine is prepared and manufactured, its reactions with metals, ammonia, alkalis and slaked lime, why it bleaches only when moist, its uses, and the preparation and reactions of hydrogen chloride.",
  whyItMatters:
    "7 questions. Two were set in board papers, both in 2025: the reaction of chlorine with excess ammonia, and the bleaching action of chlorine in the presence of moisture. The textbook adds the action of chlorine on iron, the uses of chlorine, and the preparation, reactions and uses of hydrogen chloride.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccgp-chlorine-reactions",
      name: "Preparation and reactions of chlorine",
      intuition:
        "Chlorine wants one electron, so it pulls electrons from metals, from hydrogen and from anything that can be oxidised. Which product you get often depends on which reactant is in excess: with plenty of ammonia the ammonia soaks up the HCl formed, but with plenty of chlorine every hydrogen of ammonia is replaced.",
      definition:
        "- **Preparation:** oxidise hydrochloric acid with \\(\\text{MnO}_2\\) (\\(\\text{MnO}_2 + 4\\text{HCl} \\longrightarrow \\text{MnCl}_2 + \\text{Cl}_2 + 2\\text{H}_2\\text{O}\\)) or with \\(\\text{KMnO}_4\\); or heat common salt and \\(\\text{MnO}_2\\) with concentrated sulfuric acid.\n" +
        "- **Manufacture:** Deacon's process, \\(4\\text{HCl} + \\text{O}_2 \\xrightarrow{\\text{CuCl}_2,\\ 723\\ \\text{K}} 2\\text{Cl}_2 + 2\\text{H}_2\\text{O}\\); or electrolysis of brine, chlorine being set free at the anode.\n" +
        "- **Physical properties:** greenish-yellow gas with a pungent, suffocating smell; poisonous; liquefies easily (b.p. 239 K); dissolves in water to give chlorine water.\n" +
        "- **With metals and non-metals:** \\(2\\text{Fe} + 3\\text{Cl}_2 \\longrightarrow 2\\text{FeCl}_3\\); \\(2\\text{Al} + 3\\text{Cl}_2 \\longrightarrow 2\\text{AlCl}_3\\); \\(\\text{P}_4 + 6\\text{Cl}_2 \\longrightarrow 4\\text{PCl}_3\\).\n" +
        "- **With ammonia:** excess ammonia gives ammonium chloride and nitrogen, \\(8\\text{NH}_3 + 3\\text{Cl}_2 \\longrightarrow 6\\text{NH}_4\\text{Cl} + \\text{N}_2\\); excess chlorine gives explosive nitrogen trichloride, \\(\\text{NH}_3 + 3\\text{Cl}_2 \\longrightarrow \\text{NCl}_3 + 3\\text{HCl}\\).\n" +
        "- **With alkali:** cold, dilute alkali gives chloride and hypochlorite; hot, concentrated alkali gives chloride and chlorate. Dry slaked lime gives bleaching powder: \\(2\\text{Ca(OH)}_2 + 2\\text{Cl}_2 \\longrightarrow \\text{Ca(OCl)}_2 + \\text{CaCl}_2 + 2\\text{H}_2\\text{O}\\).\n" +
        "- **Oxidising agent:** it oxidises ferrous salts to ferric, sulfites to sulfates, \\(\\text{SO}_2\\) to sulfuric acid and iodine to iodic acid.",
      formula: {
        label: "Chlorine with sodium hydroxide",
        latex: "2\\text{NaOH}\\ (\\text{cold, dilute}) + \\text{Cl}_2 \\longrightarrow \\text{NaCl} + \\text{NaOCl} + \\text{H}_2\\text{O}",
      },
      authoredExample: {
        prompt: "What happens when chlorine reacts with (a) cold, dilute sodium hydroxide and (b) hot, concentrated sodium hydroxide? Write balanced equations.",
        steps: [
          "(a) A chloride and a hypochlorite form: \\(2\\text{NaOH} + \\text{Cl}_2 \\longrightarrow \\text{NaCl} + \\text{NaOCl} + \\text{H}_2\\text{O}\\).",
          "(b) A chloride and a chlorate form: \\(6\\text{NaOH} + 3\\text{Cl}_2 \\longrightarrow 5\\text{NaCl} + \\text{NaClO}_3 + 3\\text{H}_2\\text{O}\\).",
          "Check (b): 6 Na, 6 Cl, 6 O and 6 H on each side.",
        ],
        answer: "Cold, dilute: NaCl + NaOCl (sodium hypochlorite); hot, concentrated: NaCl + NaClO₃ (sodium chlorate)",
      },
      selfCheckExample: {
        prompt: "Write the reaction of chlorine with dry slaked lime and name the useful product.",
        steps: ["\\(2\\text{Ca(OH)}_2 + 2\\text{Cl}_2 \\longrightarrow \\text{Ca(OCl)}_2 + \\text{CaCl}_2 + 2\\text{H}_2\\text{O}\\).", "Check: 2 Ca, 4 Cl, 4 O and 4 H on each side."],
        answer: "Bleaching powder is formed",
      },
      practiceSet: [
        { prompt: "Write the reaction of chlorine with hydrogen sulfide.", answer: "\\(\\text{H}_2\\text{S} + \\text{Cl}_2 \\longrightarrow 2\\text{HCl} + \\text{S}\\)" },
        { prompt: "Name the catalyst and the temperature in Deacon's process.", answer: "Copper(II) chloride, 723 K" },
        { prompt: "Write the reaction of chlorine with aluminium.", answer: "\\(2\\text{Al} + 3\\text{Cl}_2 \\longrightarrow 2\\text{AlCl}_3\\)" },
        { prompt: "At which electrode is chlorine set free in the electrolysis of brine?", answer: "The anode" },
      ],
      pyqExampleId: "5e06c9dc-14be-4ff8-bb87-ccc0e0d9b18f",
      traps: [
        {
          title: "Which reactant is in excess",
          body: "Excess ammonia gives ammonium chloride and nitrogen; excess chlorine gives nitrogen trichloride. Read which one the question puts in excess before you write.",
        },
        {
          title: "Iron goes to +3",
          body: "Chlorine is a strong oxidising agent, so iron burns in it to ferric chloride, \\(\\text{FeCl}_3\\), not ferrous chloride.",
        },
        {
          title: "Cold and dilute against hot and concentrated",
          body: "Cold, dilute alkali gives hypochlorite; hot, concentrated alkali gives chlorate. State the condition with the equation.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccgp-bleaching",
      name: "Bleaching by chlorine and uses of chlorine",
      intuition:
        "Dry chlorine does not bleach. It first reacts with water to make hypochlorous acid, and that acid breaks down to give nascent oxygen, the real bleaching agent. The oxygen oxidises the coloured matter, so the colour does not come back.",
      definition:
        "- **Bleaching needs moisture:** chlorine liberates nascent oxygen from water, and the nascent oxygen oxidises coloured organic matter to colourless matter. Write the steps one a line.\n" +
        "- Bleaching by chlorine is **permanent**. It bleaches cotton fabrics, wood pulp and litmus. It is **not** used on delicate materials such as silk and wool, because it is a strong bleaching and oxidising agent and this dual action damages the material itself.\n" +
        "- **Uses of chlorine:** purifying (sterilising) drinking water; bleaching wood pulp for paper and rayon, and cotton and textiles; extracting gold and platinum; making dyes, drugs and organic compounds such as \\(\\text{CCl}_4\\), \\(\\text{CHCl}_3\\), DDT and refrigerants; making poisonous gases such as phosgene \\(\\text{COCl}_2\\), tear gas \\(\\text{CCl}_3\\text{NO}_2\\) and mustard gas.",
      formula: {
        label: "Chlorine bleaches through nascent oxygen",
        latex: "\\text{Cl}_2 + \\text{H}_2\\text{O} \\longrightarrow \\text{HCl} + \\text{HOCl}, \\qquad \\text{HOCl} \\longrightarrow \\text{HCl} + [\\text{O}]",
      },
      authoredExample: {
        prompt: "Why is chlorine not used to bleach silk and wool? Name two materials it is used to bleach.",
        steps: [
          "Chlorine bleaches through nascent oxygen, a strong oxidising agent.",
          "It is both a strong bleaching agent and a strong oxidising agent, and this dual action attacks the base material of a delicate fabric as well as its colour.",
          "So silk and wool would be damaged.",
          "It is used to bleach cotton fabrics and wood pulp (also litmus).",
        ],
        answer: "Its dual action as a strong bleaching and oxidising agent damages silk and wool; it bleaches cotton and wood pulp",
      },
      selfCheckExample: {
        prompt: "Name two poisonous gases prepared from chlorine.",
        steps: ["Chlorine is used to make phosgene \\(\\text{COCl}_2\\), tear gas \\(\\text{CCl}_3\\text{NO}_2\\) and mustard gas."],
        answer: "Any two of phosgene, tear gas and mustard gas",
      },
      practiceSet: [
        { prompt: "Which acid, formed from chlorine and water, releases nascent oxygen?", answer: "Hypochlorous acid, HOCl" },
        { prompt: "Is bleaching by chlorine temporary or permanent?", answer: "Permanent" },
        { prompt: "Name two organic compounds made using chlorine.", answer: "Any two of \\(\\text{CCl}_4\\), \\(\\text{CHCl}_3\\) and DDT" },
        { prompt: "Name two noble metals chlorine is used to extract.", answer: "Gold and platinum" },
      ],
      pyqExampleId: "801a6a08-d251-423c-90e8-071c714a25a1",
      traps: [
        {
          title: "Dry chlorine does not bleach",
          body: "Moisture is essential: without water no hypochlorous acid forms and no nascent oxygen is released.",
        },
        {
          title: "The bleaching agent is nascent oxygen",
          body: "Chlorine itself does not destroy the colour. Name nascent oxygen, [O], as the agent, and show how it forms.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccgp-hcl",
      name: "Hydrogen chloride",
      intuition:
        "Hydrogen chloride is made the way many volatile acids are: heat their salt with concentrated sulfuric acid, which is far less volatile, and the HCl gas escapes. In water it ionises almost completely, so hydrochloric acid is a strong acid; mixed with nitric acid it dissolves even gold.",
      definition:
        "- **Preparation:** heat common salt with concentrated sulfuric acid, in two stages, \\(\\text{NaCl} + \\text{H}_2\\text{SO}_4 \\xrightarrow{420\\ \\text{K}} \\text{NaHSO}_4 + \\text{HCl}\\), then \\(\\text{NaHSO}_4 + \\text{NaCl} \\xrightarrow{420\\ \\text{K}} \\text{Na}_2\\text{SO}_4 + \\text{HCl}\\). The gas is dried by passing it through concentrated sulfuric acid.\n" +
        "- **Physical properties:** colourless, pungent gas; liquefies easily (b.p. 189 K) and freezes at 159 K; highly soluble in water.\n" +
        "- **Acid:** \\(\\text{HCl} + \\text{H}_2\\text{O} \\longrightarrow \\text{H}_3\\text{O}^+ + \\text{Cl}^-\\), \\(K_a = 10^7\\); the solution is hydrochloric acid, a strong acid. Being a strong acid it sets carbon dioxide free from carbonates: \\(\\text{Na}_2\\text{CO}_3 + 2\\text{HCl} \\longrightarrow 2\\text{NaCl} + \\text{H}_2\\text{O} + \\text{CO}_2\\).\n" +
        "- **With ammonia:** white fumes of ammonium chloride, \\(\\text{NH}_3 + \\text{HCl} \\longrightarrow \\text{NH}_4\\text{Cl}\\).\n" +
        "- **Aqua regia:** three parts of concentrated HCl and one part of concentrated \\(\\text{HNO}_3\\); it dissolves gold and platinum.\n" +
        "- **Uses that follow from the chapter:** making aqua regia to dissolve noble metals, and preparing chlorine by oxidising HCl (with \\(\\text{MnO}_2\\) or \\(\\text{KMnO}_4\\), or in Deacon's process).",
      formula: {
        label: "Laboratory preparation of hydrogen chloride",
        latex: "\\text{NaCl} + \\text{H}_2\\text{SO}_4 \\xrightarrow{420\\ \\text{K}} \\text{NaHSO}_4 + \\text{HCl}",
      },
      authoredExample: {
        prompt: "What is aqua regia? Write the ionic equation for gold dissolving in it.",
        steps: [
          "Aqua regia is a mixture of three parts concentrated hydrochloric acid and one part concentrated nitric acid.",
          "\\(\\text{Au} + 4\\text{H}^+ + \\text{NO}_3^- + 4\\text{Cl}^- \\longrightarrow \\text{AuCl}_4^- + \\text{NO} + 2\\text{H}_2\\text{O}\\).",
          "Check atoms: 1 Au, 4 H, 1 N, 3 O, 4 Cl on each side. Check charge: \\(+4 - 1 - 4 = -1\\) on the left and \\(-1\\) on the right.",
        ],
        answer: "3 parts conc. HCl : 1 part conc. HNO₃; Au + 4H⁺ + NO₃⁻ + 4Cl⁻ → AuCl₄⁻ + NO + 2H₂O",
      },
      selfCheckExample: {
        prompt: "What is seen when a glass rod dipped in ammonia solution is held near hydrogen chloride gas? Write the equation.",
        steps: ["Dense white fumes form.", "\\(\\text{NH}_3 + \\text{HCl} \\longrightarrow \\text{NH}_4\\text{Cl}\\)."],
        answer: "White fumes of ammonium chloride",
      },
      practiceSet: [
        { prompt: "How is hydrogen chloride gas dried?", answer: "By passing it through concentrated sulfuric acid" },
        { prompt: "Give the dissociation constant of HCl in water.", answer: "\\(K_a = 10^7\\)" },
        { prompt: "What is the boiling point of liquid hydrogen chloride?", answer: "189 K" },
        { prompt: "Which noble metals dissolve in aqua regia?", answer: "Gold and platinum" },
      ],
      pyqExampleId: "7d06d088-2f8f-48ee-8058-1881262a4c6b",
      traps: [
        {
          title: "Aqua regia the wrong way round",
          body: "It is three parts hydrochloric acid to one part nitric acid, not the reverse.",
        },
        {
          title: "Uses need named products",
          body: "For 'two uses of HCl', name what it is used for, such as making aqua regia or preparing chlorine. A chemical property, like the white fumes with ammonia, is not a use.",
        },
      ],
    },
  ],
};
