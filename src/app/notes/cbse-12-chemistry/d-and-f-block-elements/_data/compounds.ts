import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_DF_COMPOUNDS_NOTE: SubtopicNote = {
  subtopicName: "Some Important Compounds of Transition Elements",
  title: "Potassium Dichromate and Potassium Permanganate",
  oneLineDefinition:
    "Oxides and oxoanions of the 3d metals, the preparation of K₂Cr₂O₇ from chromite ore and of KMnO₄ from pyrolusite, the chromate and dichromate change with pH, and how to complete and balance the oxidising reactions of both.",
  whyItMatters:
    "35 questions. Twenty-nine were set in board papers from 2023 to 2026, eleven of them in 2025. Every year from 2023 to 2026 the board asked you to complete and balance ionic equations of permanganate and dichromate (with Fe²⁺, I⁻, sulphite, oxalate, thiosulphate, Sn²⁺ and H₂S), to give the products of heating KMnO₄, and what happens to dichromate or chromate when the pH changes. It also asked the preparation of KMnO₄ from pyrolusite (2024, 2025, 2026), the steps from chromite ore to K₂Cr₂O₇ (2025, 2026), and what alkaline permanganate turns iodide into (2023, 2025).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcdf-dichromate",
      name: "Oxides, chromate and potassium dichromate",
      intuition:
        "Chromite ore holds chromium at +3. To make dichromate you push it up to +6 with air while fusing with sodium carbonate, turn the yellow chromate into orange dichromate with acid, and then swap sodium for potassium. Chromate and dichromate are the same chromium(VI): only the pH decides which one you have.",
      definition:
        "- **Step 1:** chromite ore is fused with sodium carbonate in free access of air, giving yellow sodium chromate (equation in the box).\n" +
        "- **Step 2:** the filtered chromate solution is acidified with sulphuric acid; orange sodium dichromate crystallises: \\(2\\text{Na}_2\\text{CrO}_4 + 2\\text{H}^+ \\longrightarrow \\text{Na}_2\\text{Cr}_2\\text{O}_7 + 2\\text{Na}^+ + \\text{H}_2\\text{O}\\).\n" +
        "- **Step 3:** potassium chloride is added. Potassium dichromate is less soluble than the sodium salt, so orange crystals of it separate: \\(\\text{Na}_2\\text{Cr}_2\\text{O}_7 + 2\\text{KCl} \\longrightarrow \\text{K}_2\\text{Cr}_2\\text{O}_7 + 2\\text{NaCl}\\).\n" +
        "- **pH:** \\(2\\text{CrO}_4^{2-} + 2\\text{H}^+ \\longrightarrow \\text{Cr}_2\\text{O}_7^{2-} + \\text{H}_2\\text{O}\\) and \\(\\text{Cr}_2\\text{O}_7^{2-} + 2\\text{OH}^- \\longrightarrow 2\\text{CrO}_4^{2-} + \\text{H}_2\\text{O}\\). Acid turns yellow chromate orange; alkali turns orange dichromate yellow. Chromium is +6 in both, so this is not a redox change.\n" +
        "- **Structures:** the chromate ion is tetrahedral. The dichromate ion is two tetrahedra sharing one corner, with a Cr-O-Cr bond angle of 126°. Its six terminal Cr-O bonds are equivalent; the two bonds to the shared oxygen are different.\n" +
        "- **Oxidising action** in acid: \\(\\text{Cr}_2\\text{O}_7^{2-} + 14\\text{H}^+ + 6e^- \\longrightarrow 2\\text{Cr}^{3+} + 7\\text{H}_2\\text{O}\\) (\\(E^\\circ = 1.33\\) V). It oxidises iodide to iodine, sulphide to sulphur, tin(II) to tin(IV) and iron(II) to iron(III). K₂Cr₂O₇ is a primary standard in volumetric analysis.\n" +
        "- **Oxides and oxoanions:** the highest oxidation number in the oxides equals the group number (Sc₂O₃ to Mn₂O₇). The oxoanions VO₄³⁻, CrO₄²⁻ and MnO₄⁻ show V +5, Cr +6 and Mn +7, each equal to its group number.",
      formula: {
        label: "Chromite ore to sodium chromate",
        latex: "4\\text{FeCr}_2\\text{O}_4 + 8\\text{Na}_2\\text{CO}_3 + 7\\text{O}_2 \\longrightarrow 8\\text{Na}_2\\text{CrO}_4 + 2\\text{Fe}_2\\text{O}_3 + 8\\text{CO}_2",
      },
      authoredExample: {
        prompt: "Find the oxidation state of chromium in the chromate and the dichromate ions, and use it to say whether the colour change of dichromate in alkali is a redox reaction.",
        steps: [
          "Chromate, CrO₄²⁻: \\(x + 4(-2) = -2\\), so \\(x = +6\\).",
          "Dichromate, Cr₂O₇²⁻: \\(2x + 7(-2) = -2\\), so \\(2x = 12\\) and \\(x = +6\\).",
          "In alkali: \\(\\text{Cr}_2\\text{O}_7^{2-} + 2\\text{OH}^- \\longrightarrow 2\\text{CrO}_4^{2-} + \\text{H}_2\\text{O}\\); orange turns yellow.",
          "Chromium stays at +6, so nothing is oxidised or reduced.",
        ],
        answer: "+6 in both; the change is an acid-base equilibrium, not a redox reaction",
      },
      selfCheckExample: {
        prompt: "Why is potassium chloride added to sodium dichromate in the last step of making potassium dichromate?",
        steps: ["Sodium dichromate is more soluble than potassium dichromate.", "Adding KCl makes the less soluble potassium salt crystallise out."],
        answer: "To obtain K₂Cr₂O₇, which is less soluble and crystallises: Na₂Cr₂O₇ + 2KCl → K₂Cr₂O₇ + 2NaCl",
      },
      practiceSet: [
        { prompt: "What is the shape of the chromate ion?", answer: "Tetrahedral" },
        { prompt: "What is seen when acid is added to a yellow solution of potassium chromate?", answer: "It turns orange: chromate changes to dichromate" },
        { prompt: "Name the oxometal anions of the 3d series in which the metal shows its group number as oxidation state.", answer: "VO₄³⁻ (V +5), CrO₄²⁻ (Cr +6) and MnO₄⁻ (Mn +7)" },
        { prompt: "Which is acidic, CrO or CrO₃?", answer: "CrO₃ (CrO is basic)" },
      ],
      pyqExampleId: "850f6500-ce19-492e-97cc-ec343281b362",
      traps: [
        {
          title: "Calling the chromate and dichromate change redox",
          body: "Chromium is +6 in both ions. The change is set by pH alone; acid gives dichromate, alkali gives chromate.",
        },
        {
          title: "Leaving out air or the colours",
          body: "Step 1 needs free access of air (the O₂ in the equation does the oxidising). Write the colours: yellow chromate, orange dichromate. Most \"identify A, B, C\" questions are solved from the colours.",
        },
        {
          title: "Saying all Cr-O bonds in dichromate are equal",
          body: "Six terminal Cr-O bonds are equivalent; the two bonds to the shared oxygen are not. Board 2023 asked exactly this.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcdf-permanganate",
      name: "Potassium permanganate: preparation, heating and the medium",
      intuition:
        "Pyrolusite is MnO₂, manganese +4. Fusing it with alkali in air takes manganese to +6, the green manganate. A second step, by electrolysis or by acid, takes it to +7, the purple permanganate. Permanganate is a strong oxidising agent, and how far it falls depends on the medium.",
      definition:
        "- **Step 1:** MnO₂ is fused with KOH and an oxidising agent (air or KNO₃), giving dark green potassium manganate (equation in the box).\n" +
        "- **Step 2:** manganate disproportionates in a neutral or acidic solution: \\(3\\text{MnO}_4^{2-} + 4\\text{H}^+ \\longrightarrow 2\\text{MnO}_4^- + \\text{MnO}_2 + 2\\text{H}_2\\text{O}\\). Commercially it is oxidised electrolytically in alkaline solution: \\(\\text{MnO}_4^{2-} \\longrightarrow \\text{MnO}_4^- + e^-\\).\n" +
        "- In the laboratory a manganese(II) salt is oxidised by peroxodisulphate: \\(2\\text{Mn}^{2+} + 5\\text{S}_2\\text{O}_8^{2-} + 8\\text{H}_2\\text{O} \\longrightarrow 2\\text{MnO}_4^- + 10\\text{SO}_4^{2-} + 16\\text{H}^+\\).\n" +
        "- KMnO₄ forms dark purple (almost black) crystals. On heating it decomposes at 513 K: \\(2\\text{KMnO}_4 \\longrightarrow \\text{K}_2\\text{MnO}_4 + \\text{MnO}_2 + \\text{O}_2\\).\n" +
        "- Manganate and permanganate are tetrahedral. Green manganate is paramagnetic (one unpaired electron); permanganate is diamagnetic.\n" +
        "- **The medium decides the product:** \\(\\text{MnO}_4^- + 8\\text{H}^+ + 5e^- \\longrightarrow \\text{Mn}^{2+} + 4\\text{H}_2\\text{O}\\) in acid; \\(\\text{MnO}_4^- + 4\\text{H}^+ + 3e^- \\longrightarrow \\text{MnO}_2 + 2\\text{H}_2\\text{O}\\); \\(\\text{MnO}_4^- + e^- \\longrightarrow \\text{MnO}_4^{2-}\\).\n" +
        "- **In neutral or faintly alkaline solution:** iodide goes to iodate, \\(2\\text{MnO}_4^- + \\text{H}_2\\text{O} + \\text{I}^- \\longrightarrow 2\\text{MnO}_2 + 2\\text{OH}^- + \\text{IO}_3^-\\); thiosulphate goes to sulphate; Mn²⁺ goes to MnO₂.\n" +
        "- Permanganate titrations in the presence of HCl are unsatisfactory, because HCl is oxidised to chlorine.\n" +
        "- **Uses:** analytical chemistry, an oxidant in organic chemistry, bleaching wool, cotton and silk, and decolourising oils.",
      formula: {
        label: "Pyrolusite to potassium manganate",
        latex: "2\\text{MnO}_2 + 4\\text{KOH} + \\text{O}_2 \\longrightarrow 2\\text{K}_2\\text{MnO}_4 + 2\\text{H}_2\\text{O}",
      },
      authoredExample: {
        prompt: "What happens when potassium permanganate is heated to 513 K? Write the equation and show the change in the oxidation state of manganese.",
        steps: [
          "\\(2\\text{KMnO}_4 \\xrightarrow{513\\ \\text{K}} \\text{K}_2\\text{MnO}_4 + \\text{MnO}_2 + \\text{O}_2\\)",
          "Mn in KMnO₄: \\(+1 + x + 4(-2) = 0\\), so \\(x = +7\\).",
          "Mn in K₂MnO₄: \\(2 + x - 8 = 0\\), so \\(x = +6\\). Mn in MnO₂: +4.",
          "Oxygen of the permanganate is released as O₂.",
        ],
        answer: "It gives K₂MnO₄ (Mn +6), MnO₂ (Mn +4) and oxygen gas",
      },
      selfCheckExample: {
        prompt: "Why is a permanganate titration not carried out in the presence of hydrochloric acid?",
        steps: ["Permanganate is a strong enough oxidising agent to oxidise HCl to chlorine.", "Some permanganate is used up on the acid, so the titre is wrong."],
        answer: "HCl is oxidised to chlorine by permanganate, so the result is unsatisfactory",
      },
      practiceSet: [
        { prompt: "What is the colour of potassium manganate?", answer: "Dark green" },
        { prompt: "What does iodide become when it is oxidised by KMnO₄ in a neutral or faintly alkaline solution?", answer: "Iodate, IO₃⁻" },
        { prompt: "Which reagent oxidises a manganese(II) salt to permanganate in the laboratory?", answer: "Peroxodisulphate, S₂O₈²⁻" },
        { prompt: "Is KMnO₄ paramagnetic or diamagnetic?", answer: "Diamagnetic: Mn is +7, 3d⁰" },
      ],
      pyqExampleId: "1ca22409-1192-4e37-bbe5-6249392870bc",
      traps: [
        {
          title: "Stopping at fusion",
          body: "Fusing MnO₂ with KOH in air gives K₂MnO₄ (green, Mn +6), not KMnO₄. Board 2024 offered KMnO₄ as the wrong option. Permanganate needs the second step.",
        },
        {
          title: "Ignoring the medium",
          body: "In acid, permanganate ends as Mn²⁺ and iodide as I₂. In neutral or faintly alkaline solution it ends as MnO₂ and iodide as IO₃⁻.",
        },
        {
          title: "Missing a product on heating",
          body: "Heating KMnO₄ gives three products: K₂MnO₄, MnO₂ and O₂. Leaving out O₂ leaves the equation unbalanced.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcdf-redox-equations",
      name: "Completing ionic equations of MnO₄⁻ and Cr₂O₇²⁻",
      intuition:
        "Every one of these equations is two half-reactions added together. Permanganate in acid takes five electrons, dichromate takes six; the reducing agent gives a known number. Make the electrons equal, add, and check the charge.",
      definition:
        "- **Oxidant half-reactions** (acid): \\(\\text{MnO}_4^- + 8\\text{H}^+ + 5e^- \\longrightarrow \\text{Mn}^{2+} + 4\\text{H}_2\\text{O}\\); \\(\\text{Cr}_2\\text{O}_7^{2-} + 14\\text{H}^+ + 6e^- \\longrightarrow 2\\text{Cr}^{3+} + 7\\text{H}_2\\text{O}\\).\n" +
        "- **Reductant half-reactions:** \\(\\text{Fe}^{2+} \\longrightarrow \\text{Fe}^{3+} + e^-\\); \\(2\\text{I}^- \\longrightarrow \\text{I}_2 + 2e^-\\); \\(\\text{C}_2\\text{O}_4^{2-} \\longrightarrow 2\\text{CO}_2 + 2e^-\\); \\(\\text{Sn}^{2+} \\longrightarrow \\text{Sn}^{4+} + 2e^-\\); \\(\\text{H}_2\\text{S} \\longrightarrow \\text{S} + 2\\text{H}^+ + 2e^-\\); \\(\\text{SO}_3^{2-} + \\text{H}_2\\text{O} \\longrightarrow \\text{SO}_4^{2-} + 2\\text{H}^+ + 2e^-\\); \\(\\text{NO}_2^- + \\text{H}_2\\text{O} \\longrightarrow \\text{NO}_3^- + 2\\text{H}^+ + 2e^-\\).\n" +
        "- **Method:** multiply each half so the electrons lost equal the electrons gained, add them, cancel what appears on both sides, then check atoms and total charge.\n" +
        "- In neutral or faintly alkaline solution permanganate takes three electrons and ends as MnO₂: \\(8\\text{MnO}_4^- + 3\\text{S}_2\\text{O}_3^{2-} + \\text{H}_2\\text{O} \\longrightarrow 8\\text{MnO}_2 + 6\\text{SO}_4^{2-} + 2\\text{OH}^-\\).",
      formula: {
        label: "Balancing rule",
        latex: "\\text{electrons gained by the oxidant} = \\text{electrons lost by the reductant}",
      },
      authoredExample: {
        prompt: "Complete and balance the reaction of permanganate with oxalate ions in acidic solution.",
        steps: [
          "Oxidant: \\(\\text{MnO}_4^- + 8\\text{H}^+ + 5e^- \\longrightarrow \\text{Mn}^{2+} + 4\\text{H}_2\\text{O}\\) (5 electrons).",
          "Reductant: \\(\\text{C}_2\\text{O}_4^{2-} \\longrightarrow 2\\text{CO}_2 + 2e^-\\) (2 electrons).",
          "Lowest common multiple 10: take the first twice and the second five times.",
          "Add: \\(2\\text{MnO}_4^- + 5\\text{C}_2\\text{O}_4^{2-} + 16\\text{H}^+ \\longrightarrow 2\\text{Mn}^{2+} + 10\\text{CO}_2 + 8\\text{H}_2\\text{O}\\).",
          "Charge check: left \\(-2 - 10 + 16 = +4\\); right \\(2 \\times (+2) = +4\\).",
        ],
        answer: "2MnO₄⁻ + 5C₂O₄²⁻ + 16H⁺ → 2Mn²⁺ + 10CO₂ + 8H₂O",
      },
      selfCheckExample: {
        prompt: "Complete and balance: acidified dichromate reacting with hydrogen sulphide.",
        steps: [
          "Dichromate takes 6 electrons; H₂S gives 2 (to S), so take three H₂S.",
          "\\(\\text{Cr}_2\\text{O}_7^{2-} + 3\\text{H}_2\\text{S} + 8\\text{H}^+ \\longrightarrow 2\\text{Cr}^{3+} + 3\\text{S} + 7\\text{H}_2\\text{O}\\)",
          "Charge: left \\(-2 + 8 = +6\\); right \\(+6\\).",
        ],
        answer: "Cr₂O₇²⁻ + 3H₂S + 8H⁺ → 2Cr³⁺ + 3S + 7H₂O",
      },
      practiceSet: [
        { prompt: "Complete: MnO₄⁻ + NO₂⁻ + H⁺ (acid).", answer: "\\(2\\text{MnO}_4^- + 5\\text{NO}_2^- + 6\\text{H}^+ \\longrightarrow 2\\text{Mn}^{2+} + 5\\text{NO}_3^- + 3\\text{H}_2\\text{O}\\)" },
        { prompt: "Complete: Cr₂O₇²⁻ + I⁻ + H⁺ (acid).", answer: "\\(\\text{Cr}_2\\text{O}_7^{2-} + 6\\text{I}^- + 14\\text{H}^+ \\longrightarrow 2\\text{Cr}^{3+} + 3\\text{I}_2 + 7\\text{H}_2\\text{O}\\)" },
        { prompt: "Complete: MnO₄⁻ + Fe²⁺ + H⁺ (acid).", answer: "\\(\\text{MnO}_4^- + 5\\text{Fe}^{2+} + 8\\text{H}^+ \\longrightarrow \\text{Mn}^{2+} + 5\\text{Fe}^{3+} + 4\\text{H}_2\\text{O}\\)" },
      ],
      pyqExampleId: "6f392407-5ac7-4043-af6e-9016ad8edd2e",
      traps: [
        {
          title: "Skipping the charge check",
          body: "An equation can balance in atoms and still be wrong in charge. Add up the charges on both sides before you move on; it catches a wrong H⁺ count at once.",
        },
        {
          title: "Wrong product for the reducing agent",
          body: "Oxalate gives CO₂ (not O₂), sulphite gives sulphate, H₂S and S²⁻ give sulphur, nitrite gives nitrate, Sn²⁺ gives Sn⁴⁺.",
        },
        {
          title: "Using Mn²⁺ in a neutral or alkaline medium",
          body: "With iodide or thiosulphate in neutral or faintly alkaline solution the product is MnO₂ and OH⁻ appears on the right.",
        },
      ],
    },
  ],
};
