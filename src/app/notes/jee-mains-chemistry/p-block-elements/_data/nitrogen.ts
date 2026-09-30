import type { SubtopicNote } from "@/app/notes/_types";

export const NITROGEN_PB_NOTE: SubtopicNote = {
  subtopicName: "Nitrogen and Its Compounds",
  title: "Nitrogen and Its Compounds",
  oneLineDefinition:
    "Dinitrogen and its oxides from N₂O (+1) to N₂O₅ (+5), with the reactions that make dinitrogen, nitric oxide and nitric acid, and the tests that detect them.",
  whyItMatters:
    "Eighteen PYQs, all multiple choice, and one from 2026. Nine are about the oxides of nitrogen: oxidation states, which have an N–N bond, which are neutral and which has an odd electron; nine about making dinitrogen, the Ostwald process, the brown ring test, Nessler's reagent and the gases given off by common reactions.",
  concepts: [
    // C1 — oxides of nitrogen
    {
      kind: "reference" as const,
      slug: "jcpb-nitrogen-oxides",
      name: "Oxides of nitrogen: oxidation states, structures and nature",
      intuition:
        "Nitrogen forms oxides in every oxidation state from +1 to +5, because it makes strong pπ–pπ bonds with oxygen. The structures follow a pattern. The two lowest oxides, N₂O and NO, are neutral. The rest are acidic. Three of them, N₂O, N₂O₃ and N₂O₄, keep an N–N bond; N₂O₅ joins its two nitrogens through an oxygen bridge instead. NO₂ has 17 valence electrons, an odd number, so one electron is unpaired on nitrogen, and two NO₂ molecules pair up through an N–N bond to give N₂O₄.",
      definition:
        "- **Neutral oxides:** \\(\\mathrm{N_2O}\\) and \\(\\mathrm{NO}\\). All the others are acidic.\n" +
        "- **N–N bond present:** \\(\\mathrm{N_2O}\\), \\(\\mathrm{N_2O_3}\\), \\(\\mathrm{N_2O_4}\\). \\(\\mathrm{N_2O_5}\\) has an N–O–N bridge and no N–N bond.\n" +
        "- **Odd electron on nitrogen:** \\(\\mathrm{NO_2}\\) (and \\(\\mathrm{NO}\\)); both are paramagnetic.\n" +
        "- **Preparations:** \\(\\mathrm{NH_4NO_3 \\xrightarrow{\\Delta} N_2O + 2H_2O}\\); \\(\\mathrm{2Pb(NO_3)_2 \\xrightarrow{673\\,K} 2PbO + 4NO_2 + O_2}\\); \\(\\mathrm{4HNO_3 + P_4O_{10} \\rightarrow 2N_2O_5 + 4HPO_3}\\).\n" +
        "- **Nitrogen forms no +5 halide,** because it has no d orbitals to take five bonds.",
      table: {
        columns: ["Oxide", "Oxidation state of N", "Structure", "Nature"],
        rows: [
          { cells: ["\\(\\mathrm{N_2O}\\)", "+1", "Linear N≡N–O; one N–N bond", "Neutral; colourless gas"] },
          { cells: ["\\(\\mathrm{NO}\\)", "+2", "N=O with one unpaired electron", "Neutral; colourless gas"] },
          { cells: ["\\(\\mathrm{N_2O_3}\\)", "+3", "O=N–NO₂; one N–N bond", "Acidic; blue solid"] },
          { cells: ["\\(\\mathrm{NO_2}\\)", "+4", "Bent, odd electron on N; one N=O and one N–O", "Acidic; brown gas"], noteAmber: "The odd-electron oxide that dimerises to N₂O₄." },
          { cells: ["\\(\\mathrm{N_2O_4}\\)", "+4", "O₂N–NO₂; one N–N bond, no bridging O", "Acidic; colourless"] },
          { cells: ["\\(\\mathrm{N_2O_5}\\)", "+5", "O₂N–O–NO₂; one N–O–N bridge, no N–N bond", "Acidic; colourless solid, the anhydride of \\(\\mathrm{HNO_3}\\)"] },
        ],
        caption: "Only the two lowest oxides are neutral; only N₂O₅ bridges its nitrogens through oxygen.",
      },
      selfCheckExample: {
        prompt: "Lead nitrate is heated strongly. Name the brown gas given off, say why it dimerises on cooling, and describe the bond that joins the two halves of the dimer.",
        steps: [
          "\\(\\mathrm{2Pb(NO_3)_2 \\rightarrow 2PbO + 4NO_2 + O_2}\\): the brown gas is \\(\\mathrm{NO_2}\\).",
          "\\(\\mathrm{NO_2}\\) has an unpaired electron on nitrogen, so two molecules pair up.",
          "The dimer \\(\\mathrm{N_2O_4}\\) is \\(\\mathrm{O_2N{-}NO_2}\\): the halves are joined by an N–N bond, with no oxygen in between.",
        ],
        answer: "\\(\\mathrm{NO_2}\\); its odd electron pairs up; an N–N single bond, no bridging oxygen.",
      },
      practiceSet: [
        { prompt: "What is the oxidation state of nitrogen in \\(\\mathrm{N_2O_3}\\)?", answer: "+3" },
        { prompt: "Which oxide of nitrogen is the anhydride of nitric acid?", answer: "\\(\\mathrm{N_2O_5}\\)" },
        { prompt: "Arrange \\(\\mathrm{NO_3^-}\\), \\(\\mathrm{NO_2}\\), \\(\\mathrm{NO}\\), \\(\\mathrm{N_2O}\\) by oxidation state of N, highest first.", answer: "\\(\\mathrm{NO_3^- (+5) > NO_2 (+4) > NO (+2) > N_2O (+1)}\\)" },
        { prompt: "How many N–O–N bridges does \\(\\mathrm{N_2O_5}\\) contain?", answer: "One" },
      ],
      pyqExampleId: "d8025f0d-8cc8-416d-8a33-cbab867fcda8", // 26 Jun 2022 — the oxide with an odd electron on nitrogen
      traps: [
        {
          title: "N₂O₄ has no bridging oxygen",
          body: "When two \\(\\mathrm{NO_2}\\) molecules combine, the unpaired electrons on nitrogen form an N–N bond: \\(\\mathrm{O_2N{-}NO_2}\\). The number of bridging oxygen atoms is zero.",
        },
        {
          title: "N₂O and NO are neutral, not acidic",
          body: "Of the oxides of nitrogen, only \\(\\mathrm{N_2O}\\) and \\(\\mathrm{NO}\\) are neutral; they form no acid with water. \\(\\mathrm{N_2O_3}\\), \\(\\mathrm{NO_2}\\), \\(\\mathrm{N_2O_4}\\) and \\(\\mathrm{N_2O_5}\\) are acidic.",
        },
      ],
    },

    // C2 — dinitrogen, nitric oxide and nitric acid; tests
    {
      kind: "formula" as const,
      slug: "jcpb-nitrogen-compounds",
      name: "Preparing dinitrogen and nitric acid, and the nitrogen tests",
      intuition:
        "Dinitrogen is made by bringing nitrogen in −3 and +3 together: ammonium nitrite breaks up into N₂ and water. Very pure N₂ comes from heating an azide. Once made, N₂ is very unreactive because the N≡N bond needs 946 kJ/mol to break; even with oxygen it reacts only at very high temperatures, since forming NO is endothermic. Nitric acid is made the other way round, by oxidising ammonia step by step to NO, then NO₂, which water turns into HNO₃. The brown ring test catches the same NO: it bonds to iron(II) and gives a brown complex.",
      definition:
        "- **Dinitrogen:** \\(\\mathrm{NH_4Cl + NaNO_2 \\rightarrow N_2 + 2H_2O + NaCl}\\); \\(\\mathrm{(NH_4)_2Cr_2O_7 \\xrightarrow{\\Delta} N_2 + 4H_2O + Cr_2O_3}\\); very pure from \\(\\mathrm{Ba(N_3)_2 \\rightarrow Ba + 3N_2}\\).\n" +
        "- **\\(\\mathrm{N_2 + O_2 \\rightleftharpoons 2NO}\\)** is endothermic and needs about 2000 K or lightning, so the gases of air do not react normally.\n" +
        "- **Ostwald process:** \\(\\mathrm{4NH_3 + 5O_2 \\xrightarrow{Pt/Rh} 4NO + 6H_2O}\\); \\(\\mathrm{2NO + O_2 \\rightleftharpoons 2NO_2}\\); \\(\\mathrm{3NO_2 + H_2O \\rightarrow 2HNO_3 + NO}\\).\n" +
        "- **Brown ring test:** \\(\\mathrm{NO_3^- + 3Fe^{2+} + 4H^+ \\rightarrow NO + 3Fe^{3+} + 2H_2O}\\), then \\(\\mathrm{[Fe(H_2O)_6]^{2+} + NO \\rightarrow [Fe(H_2O)_5(NO)]^{2+} + H_2O}\\), the brown ring.\n" +
        "- **Nessler's reagent** (\\(\\mathrm{K_2[HgI_4]}\\) in alkali) gives a brown precipitate with ammonia.\n" +
        "- **Gases from common reactions:** \\(\\mathrm{KMnO_4 + HCl}\\) gives \\(\\mathrm{Cl_2}\\); \\(\\mathrm{Al + NaOH + H_2O}\\) gives \\(\\mathrm{H_2}\\); heating \\(\\mathrm{NaNO_3}\\) gives \\(\\mathrm{NaNO_2 + O_2}\\).\n" +
        "- **Industrial processes:** Haber for \\(\\mathrm{NH_3}\\), Ostwald for \\(\\mathrm{HNO_3}\\), Contact for \\(\\mathrm{H_2SO_4}\\), Hall–Héroult for aluminium.",
      formula: {
        label: "Dinitrogen, the Ostwald process and the brown ring",
        latex:
          "\\mathrm{NH_4Cl + NaNO_2 \\rightarrow N_2 + 2H_2O + NaCl} \\qquad \\mathrm{3NO_2 + H_2O \\rightarrow 2HNO_3 + NO} \\qquad \\mathrm{[Fe(H_2O)_6]^{2+} + NO \\rightarrow [Fe(H_2O)_5(NO)]^{2+} + H_2O}",
      },
      authoredExample: {
        prompt:
          "Write the three steps of the Ostwald process for nitric acid, starting from ammonia. Which gas is formed again in the last step and sent back?",
        steps: [
          "Ammonia is oxidised by air over a Pt/Rh gauze: \\(\\mathrm{4NH_3 + 5O_2 \\rightarrow 4NO + 6H_2O}\\).",
          "Nitric oxide combines with more oxygen: \\(\\mathrm{2NO + O_2 \\rightleftharpoons 2NO_2}\\).",
          "Nitrogen dioxide dissolves in water: \\(\\mathrm{3NO_2 + H_2O \\rightarrow 2HNO_3 + NO}\\). Nitrogen goes from +4 to +5 and to +2, a disproportionation.",
          "The NO formed in the last step is oxidised again and recycled.",
        ],
        answer: "\\(\\mathrm{NH_3 \\rightarrow NO \\rightarrow NO_2 \\rightarrow HNO_3}\\); nitric oxide is regenerated and recycled.",
      },
      selfCheckExample: {
        prompt: "Orange crystals of ammonium dichromate are heated and leave a green powder. Which gas is given off, and what is the green powder?",
        steps: [
          "\\(\\mathrm{(NH_4)_2Cr_2O_7 \\rightarrow N_2 + 4H_2O + Cr_2O_3}\\).",
          "Nitrogen goes from −3 to 0 while chromium goes from +6 to +3.",
        ],
        answer: "Dinitrogen; the green powder is \\(\\mathrm{Cr_2O_3}\\).",
      },
      practiceSet: [
        { prompt: "Which azide gives very pure dinitrogen on heating?", answer: "Barium azide, \\(\\mathrm{Ba(N_3)_2}\\)" },
        { prompt: "Which gas turns Nessler's reagent brown?", answer: "Ammonia" },
        { prompt: "Which industrial process makes sulphuric acid?", answer: "The Contact process" },
        { prompt: "Which gas is given off when aluminium dissolves in sodium hydroxide solution?", answer: "Hydrogen" },
      ],
      pyqExampleId: "a67ddfdf-39aa-4dbb-9200-5607ed9e499d", // 6 Apr 2026 S2 — the gas and the complex of the brown ring test
      traps: [
        {
          title: "Air does not form NO because the reaction is endothermic",
          body: "Nitrogen and oxygen need about 2000 K, as in lightning, to form NO, because \\(\\mathrm{N_2 + O_2 \\rightarrow 2NO}\\) absorbs heat. The reason is not that nitrogen oxides are unstable.",
        },
        {
          title: "The brown ring holds NO, not NO₂",
          body: "Iron(II) reduces nitrate to nitric oxide, and NO bonds to iron as \\(\\mathrm{[Fe(H_2O)_5(NO)]^{2+}}\\). No complex of \\(\\mathrm{NO_2}\\) or \\(\\mathrm{N_2O}\\) forms.",
        },
        {
          title: "Dilute nitric acid on lead sulphide gives NO, not N₂O",
          body: "\\(\\mathrm{3PbS + 8HNO_3 \\rightarrow 3Pb(NO_3)_2 + 2NO + 3S + 4H_2O}\\). The products are lead nitrate, sulphur, nitric oxide and water; nitrous oxide is not formed.",
        },
      ],
    },
  ],
};
