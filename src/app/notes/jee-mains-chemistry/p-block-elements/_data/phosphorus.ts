import type { SubtopicNote } from "@/app/notes/_types";

export const PHOSPHORUS_PB_NOTE: SubtopicNote = {
  subtopicName: "Phosphorus and Its Oxoacids",
  title: "Phosphorus and Its Oxoacids",
  oneLineDefinition:
    "The allotropes and chlorides of phosphorus and its oxoacids, from H₃PO₂ to H₄P₂O₇, where only the P–OH hydrogens ionise and any P–H bond makes the acid a reducing agent.",
  whyItMatters:
    "Nineteen PYQs, fifteen of them multiple choice, and all from 2021 to 2023. Six test the allotropes and the reactions of white phosphorus and its chlorides; six ask for oxidation states and bond counts in the oxoacids; seven count ionisable hydrogens or pick the acid that reduces silver nitrate.",
  concepts: [
    // C1 — allotropes and reactions
    {
      kind: "formula" as const,
      slug: "jcpb-phosphorus-reactions",
      name: "Allotropes of phosphorus and reactions of white phosphorus and its chlorides",
      intuition:
        "White phosphorus is made of separate P₄ tetrahedra with strained 60° angles, so it is very reactive. In hot alkali its zero oxidation state splits two ways: some phosphorus goes down to −3 in phosphine and some goes up to +1 in hypophosphite. That is disproportionation. With thionyl chloride it is chlorinated to PCl₃. The chlorides then hydrolyse: every P–Cl becomes P–OH, which gives phosphorous acid from PCl₃ and phosphoric acid from PCl₅.",
      definition:
        "- **Allotropes:** white (\\(\\mathrm{P_4}\\), reactive, glows in air, stored under water); red (polymeric, from heating white P at 573 K in an inert atmosphere); black.\n" +
        "- **Black phosphorus:** α-black from red P heated in a sealed tube at 803 K; β-black from white P heated at 473 K under high pressure.\n" +
        "- **White P with hot concentrated NaOH:** \\(\\mathrm{P_4 + 3NaOH + 3H_2O \\rightarrow PH_3 + 3NaH_2PO_2}\\).\n" +
        "- **With thionyl chloride:** \\(\\mathrm{P_4 + 8SOCl_2 \\rightarrow 4PCl_3 + 4SO_2 + 2S_2Cl_2}\\).\n" +
        "- **Hydrolysis:** \\(\\mathrm{PCl_3 + 3H_2O \\rightarrow H_3PO_3 + 3HCl}\\); \\(\\mathrm{PCl_5 + 4H_2O \\rightarrow H_3PO_4 + 5HCl}\\).\n" +
        "- **With alcohols:** \\(\\mathrm{3C_2H_5OH + PCl_3 \\rightarrow 3C_2H_5Cl + H_3PO_3}\\).\n" +
        "- **Red phosphorus with alkali** gives hypophosphoric acid, \\(\\mathrm{H_4P_2O_6}\\), as NCERT's oxoacid table lists it.",
      formula: {
        label: "Key reactions of phosphorus",
        latex:
          "\\mathrm{P_4 + 3NaOH + 3H_2O \\rightarrow PH_3 + 3NaH_2PO_2} \\qquad \\mathrm{P_4 + 8SOCl_2 \\rightarrow 4PCl_3 + 4SO_2 + 2S_2Cl_2} \\qquad \\mathrm{PCl_3 + 3H_2O \\rightarrow H_3PO_3 + 3HCl} \\qquad \\mathrm{PCl_5 + 4H_2O \\rightarrow H_3PO_4 + 5HCl}",
      },
      authoredExample: {
        prompt:
          "White phosphorus is boiled with concentrated NaOH in an inert atmosphere. Name the gas and the salt formed, and give the oxidation state of phosphorus in each.",
        steps: [
          "\\(\\mathrm{P_4 + 3NaOH + 3H_2O \\rightarrow PH_3 + 3NaH_2PO_2}\\).",
          "In phosphine, \\(\\mathrm{PH_3}\\): \\(x + 3(+1) = 0\\), so P is −3.",
          "In sodium hypophosphite, \\(\\mathrm{NaH_2PO_2}\\): \\(1 + 2 + x - 4 = 0\\), so P is +1.",
          "Phosphorus goes from 0 to both −3 and +1: a disproportionation.",
        ],
        answer: "Phosphine (P −3) and sodium hypophosphite (P +1).",
      },
      selfCheckExample: {
        prompt: "Phosphorus pentachloride is added to excess water. Which acid forms, and how many of its hydrogens are ionisable?",
        steps: [
          "\\(\\mathrm{PCl_5 + 4H_2O \\rightarrow H_3PO_4 + 5HCl}\\).",
          "Orthophosphoric acid is \\(\\mathrm{OP(OH)_3}\\): all three hydrogens are on oxygen, none on phosphorus.",
        ],
        answer: "\\(\\mathrm{H_3PO_4}\\); all three hydrogens ionise.",
      },
      practiceSet: [
        { prompt: "Which allotrope forms when red phosphorus is heated in a sealed tube at 803 K?", answer: "α-black phosphorus" },
        { prompt: "How many moles of \\(\\mathrm{SO_2}\\) form when one mole of \\(\\mathrm{P_4}\\) reacts with thionyl chloride?", answer: "4" },
        { prompt: "What acid does \\(\\mathrm{PCl_3}\\) give on hydrolysis?", answer: "Phosphorous acid, \\(\\mathrm{H_3PO_3}\\)" },
        { prompt: "What is the phosphorus product when ethanol reacts with \\(\\mathrm{PCl_3}\\)?", answer: "\\(\\mathrm{H_3PO_3}\\) (with ethyl chloride)" },
      ],
      pyqExampleId: "a7ee7dfd-8095-49c8-8ad7-51dfbd277559", // 25 Jan 2023 — SOCl₂ with white P, then hydrolysis to a dibasic acid
      traps: [
        {
          title: "Thionyl chloride gives PCl₃, not PCl₅ or POCl₃",
          body: "\\(\\mathrm{P_4 + 8SOCl_2 \\rightarrow 4PCl_3 + 4SO_2 + 2S_2Cl_2}\\). The by-products are sulphur dioxide and disulphur dichloride, not chlorine.",
        },
        {
          title: "Heating red phosphorus gives α-black, not β-black",
          body: "α-black phosphorus comes from red phosphorus in a sealed tube at 803 K. β-black comes from white phosphorus at 473 K under high pressure.",
        },
      ],
    },

    // C2 — structures of the oxoacids
    {
      kind: "reference" as const,
      slug: "jcpb-p-oxoacid-structure",
      name: "Oxoacids of phosphorus: formulas, oxidation states and bonds",
      intuition:
        "Every phosphorus oxoacid is built from tetrahedral phosphorus with one P=O. The other three positions carry OH, H, an O bridge to another phosphorus, or a direct P–P bond. Read the name for the oxidation state: '-ous' acids are +1 or +3, '-ic' acids are +4 or +5, and 'pyro' means two units joined by a P–O–P bridge. Hypophosphorous acid (+1) and hypophosphoric acid (+4) sound alike but are different: the first has two P–H bonds, the second a P–P bond.",
      definition:
        "- **Oxidation state** from the formula: H is +1, O is −2. For \\(\\mathrm{H_4P_2O_6}\\): \\(4 + 2x - 12 = 0\\), so \\(x = +4\\).\n" +
        "- **P–O–P bridges:** \\(\\mathrm{H_4P_2O_7}\\) 1, cyclic \\(\\mathrm{(HPO_3)_3}\\) 3, \\(\\mathrm{P_4O_{10}}\\) 6.\n" +
        "- **σ and π bonds:** each P=O has one π bond. \\(\\mathrm{H_4P_2O_7}\\) has 12 σ and 2 π.\n" +
        "- **Most oxygen atoms** in one formula: pyrophosphoric acid, \\(\\mathrm{H_4P_2O_7}\\), with seven.",
      table: {
        columns: ["Acid", "Formula", "Oxidation state of P", "Bonds in the structure"],
        rows: [
          { cells: ["Hypophosphorous (phosphinic)", "\\(\\mathrm{H_3PO_2}\\)", "+1", "Two P–H, one P–OH, one P=O"] },
          { cells: ["Orthophosphorous (phosphonic)", "\\(\\mathrm{H_3PO_3}\\)", "+3", "One P–H, two P–OH, one P=O"] },
          { cells: ["Pyrophosphorous", "\\(\\mathrm{H_4P_2O_5}\\)", "+3", "Two P–H, two P–OH, two P=O, one P–O–P"] },
          { cells: ["Hypophosphoric", "\\(\\mathrm{H_4P_2O_6}\\)", "+4", "One P–P, four P–OH, two P=O"], noteAmber: "Hypophosphoric (+4, P–P bond) is not hypophosphorous (+1, two P–H)." },
          { cells: ["Orthophosphoric", "\\(\\mathrm{H_3PO_4}\\)", "+5", "Three P–OH, one P=O"] },
          { cells: ["Pyrophosphoric", "\\(\\mathrm{H_4P_2O_7}\\)", "+5", "Four P–OH, two P=O, one P–O–P"] },
          { cells: ["Cyclotrimetaphosphoric", "\\(\\mathrm{(HPO_3)_3}\\)", "+5", "A ring with three P–O–P, three P–OH, three P=O"] },
          { cells: ["Phosphorus(V) oxide", "\\(\\mathrm{P_4O_{10}}\\)", "+5", "Six P–O–P bridges and four P=O (the anhydride, not an acid)"] },
        ],
        caption: "Pyrophosphorous is +3 with P–H bonds; pyrophosphoric is +5 with none.",
      },
      selfCheckExample: {
        prompt: "How many σ bonds and how many π bonds are there in one molecule of orthophosphoric acid, \\(\\mathrm{H_3PO_4}\\)?",
        steps: [
          "The structure is \\(\\mathrm{OP(OH)_3}\\): three P–O(H) bonds, three O–H bonds and one P=O.",
          "σ bonds: 3 + 3 + 1 = 7. π bonds: only the P=O has one.",
        ],
        answer: "7 σ bonds and 1 π bond.",
      },
      practiceSet: [
        { prompt: "What is the oxidation state of P in hypophosphorous acid?", answer: "+1" },
        { prompt: "What is the oxidation state of P in pyrophosphorous acid, \\(\\mathrm{H_4P_2O_5}\\)?", answer: "+3" },
        { prompt: "How many P–O–P bonds are in \\(\\mathrm{P_4O_{10}}\\)?", answer: "6" },
        { prompt: "Which phosphorus oxoacid contains a P–P bond?", answer: "Hypophosphoric acid, \\(\\mathrm{H_4P_2O_6}\\)" },
      ],
      pyqExampleId: "e72d39e0-8ffe-48f3-9496-f0fc913592a4", // 15 Apr 2023 — P–O–P count in H₄P₂O₇, (HPO₃)₃ and P₄O₁₀
      traps: [
        {
          title: "Hypophosphorous is +1; hypophosphoric is +4",
          body: "The '-ous' acid \\(\\mathrm{H_3PO_2}\\) has phosphorus at +1 with two P–H bonds. The '-ic' acid \\(\\mathrm{H_4P_2O_6}\\) has phosphorus at +4 with a P–P bond.",
        },
        {
          title: "Pyrophosphoric acid has only one P–O–P bridge",
          body: "\\(\\mathrm{H_4P_2O_7}\\) is two \\(\\mathrm{H_3PO_4}\\) units joined by losing one water, so there is exactly one P–O–P. It is the cyclic trimer \\(\\mathrm{(HPO_3)_3}\\) that has three.",
        },
      ],
    },

    // C3 — basicity and reducing power
    {
      kind: "formula" as const,
      slug: "jcpb-p-oxoacid-basicity",
      name: "Basicity and reducing power of phosphorus oxoacids",
      intuition:
        "Only a hydrogen on oxygen can leave as H⁺, because the O–H bond is polar. A hydrogen bonded straight to phosphorus stays put. So count P–OH groups for the basicity and ignore P–H. The P–H hydrogens do something else: they make the acid a reducing agent. An acid with a P–H bond reduces silver nitrate to a silver mirror, and on heating it disproportionates.",
      definition:
        "- **Basicity = number of P–OH groups.** \\(\\mathrm{H_3PO_2}\\) monobasic, \\(\\mathrm{H_3PO_3}\\) dibasic, \\(\\mathrm{H_3PO_4}\\) tribasic, \\(\\mathrm{H_4P_2O_5}\\) dibasic, \\(\\mathrm{H_4P_2O_6}\\) and \\(\\mathrm{H_4P_2O_7}\\) tetrabasic.\n" +
        "- **Non-ionisable H = number of P–H bonds:** 2 in \\(\\mathrm{H_3PO_2}\\), 1 in \\(\\mathrm{H_3PO_3}\\), 2 in \\(\\mathrm{H_4P_2O_5}\\), none in \\(\\mathrm{H_3PO_4}\\).\n" +
        "- **P–H makes an acid reducing:** \\(\\mathrm{4AgNO_3 + 2H_2O + H_3PO_2 \\rightarrow 4Ag + 4HNO_3 + H_3PO_4}\\).\n" +
        "- **On heating:** \\(\\mathrm{4H_3PO_3 \\rightarrow 3H_3PO_4 + PH_3}\\).\n" +
        "- **\\(\\mathrm{PCl_3}\\) with phosphorous acid:** \\(\\mathrm{5H_3PO_3 + PCl_3 \\rightarrow 3H_4P_2O_5 + 3HCl}\\), pyrophosphorous acid.\n" +
        "- **Neutralisation** uses one NaOH per P–OH: \\(\\mathrm{H_3PO_2 + NaOH \\rightarrow NaH_2PO_2 + H_2O}\\).",
      formula: {
        label: "Counting rule for phosphorus oxoacids",
        latex:
          "\\text{basicity} = \\text{number of } \\mathrm{P{-}OH} \\text{ groups} \\qquad \\text{non-ionisable H} = \\text{number of } \\mathrm{P{-}H} \\text{ bonds} \\qquad \\mathrm{P{-}H} \\text{ present} \\Rightarrow \\text{reducing}",
      },
      authoredExample: {
        prompt:
          "What volume of 0.2 M NaOH exactly neutralises 25 mL of 0.1 M \\(\\mathrm{H_3PO_3}\\)? What volume neutralises 25 mL of 0.1 M \\(\\mathrm{H_3PO_2}\\)?",
        steps: [
          "\\(\\mathrm{H_3PO_3}\\) is \\(\\mathrm{HP(O)(OH)_2}\\): two P–OH, so dibasic. \\(\\mathrm{H_3PO_2}\\) is \\(\\mathrm{H_2P(O)(OH)}\\): one P–OH, so monobasic.",
          "Acid present in each: \\(25 \\times 0.1 = 2.5\\) mmol.",
          "For \\(\\mathrm{H_3PO_3}\\): NaOH needed \\(= 2 \\times 2.5 = 5.0\\) mmol, volume \\(= 5.0 / 0.2 = 25\\) mL.",
          "For \\(\\mathrm{H_3PO_2}\\): NaOH needed \\(= 2.5\\) mmol, volume \\(= 2.5 / 0.2 = 12.5\\) mL.",
        ],
        answer: "25 mL for \\(\\mathrm{H_3PO_3}\\) and 12.5 mL for \\(\\mathrm{H_3PO_2}\\).",
      },
      selfCheckExample: {
        prompt: "Which of \\(\\mathrm{H_3PO_2}\\), \\(\\mathrm{H_3PO_3}\\) and \\(\\mathrm{H_3PO_4}\\) can reduce silver nitrate to silver, and what is the basicity of each?",
        steps: [
          "P–H bonds: two in \\(\\mathrm{H_3PO_2}\\), one in \\(\\mathrm{H_3PO_3}\\), none in \\(\\mathrm{H_3PO_4}\\). Only the first two are reducing.",
          "P–OH groups: one, two and three.",
        ],
        answer: "\\(\\mathrm{H_3PO_2}\\) and \\(\\mathrm{H_3PO_3}\\) reduce it; basicities 1, 2 and 3.",
      },
      practiceSet: [
        { prompt: "How many non-ionisable hydrogens are in phosphinic acid, \\(\\mathrm{H_3PO_2}\\)?", answer: "2" },
        { prompt: "What is the basicity of pyrophosphorous acid, \\(\\mathrm{H_4P_2O_5}\\)?", answer: "2" },
        { prompt: "Does \\(\\mathrm{H_4P_2O_7}\\) give a silver mirror with silver nitrate?", answer: "No; it has no P–H bond" },
        { prompt: "What does phosphorous acid give on heating?", answer: "Orthophosphoric acid and phosphine" },
      ],
      pyqExampleId: "19863613-1a9a-480e-9f90-ee21fb7cab1c", // 24 Jan 2023 — the phosphorus oxoacid that gives a silver mirror
      traps: [
        {
          title: "H₃PO₃ is dibasic, not tribasic",
          body: "One of its three hydrogens is bonded to phosphorus and never ionises. Phosphorous acid gives \\(\\mathrm{NaH_2PO_3}\\) and \\(\\mathrm{Na_2HPO_3}\\), never \\(\\mathrm{Na_3PO_3}\\).",
        },
        {
          title: "H₃PO₂ with NaOH gives NaH₂PO₂",
          body: "Hypophosphorous acid has one P–OH, so it takes one NaOH and the salt keeps both P–H hydrogens: \\(\\mathrm{NaH_2PO_2}\\). Writing \\(\\mathrm{NaH_2PO_3}\\) changes the phosphorus compound.",
        },
        {
          title: "Complete hydrolysis of PCl₃ gives H₃PO₃",
          body: "Every P–Cl becomes P–OH, but one of the three ends up as P–H after rearrangement to \\(\\mathrm{HP(O)(OH)_2}\\). The product has two ionisable hydrogens and one non-ionisable.",
        },
      ],
    },
  ],
};
