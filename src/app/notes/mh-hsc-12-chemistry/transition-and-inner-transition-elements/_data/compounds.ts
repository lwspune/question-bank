import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_TR_COMPOUNDS_NOTE: SubtopicNote = {
  subtopicName: "Compounds of Mn and Cr",
  title: "Potassium Permanganate and Potassium Dichromate",
  oneLineDefinition:
    "How KMnO₄ and K₂Cr₂O₇ are prepared, the oxidising reactions the textbook prints for each, the uses of KMnO₄, and how to balance their redox equations by counting electrons.",
  whyItMatters:
    "8 questions. Four were set in board papers: the shape of the chromate ion (2015), the preparation of potassium dichromate from chromite ore (2024), the reaction of acidified K₂Cr₂O₇ with H₂S (2024), and balancing the reactions of dichromate with KI and with H₂S (2025). The textbook adds the oxidation state of manganese in manganate and permanganate, the uses of KMnO₄, and two equations to balance.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscctr-kmno4",
      name: "Potassium permanganate: preparation, reactions and uses",
      intuition:
        "Permanganate holds manganese in its highest state, +7, and manganese is always ready to fall back to a lower one. That makes KMnO₄ a strong oxidising agent. How far it falls depends on the medium: in acid it goes all the way to Mn²⁺, in neutral or weakly alkaline solution only to MnO₂.",
      definition:
        "- **Chemical oxidation:** \\(\\text{MnO}_2\\) is heated strongly with fused KOH and an oxidising agent, \\(\\text{KClO}_3\\), giving dark green potassium manganate, \\(\\text{K}_2\\text{MnO}_4\\).\n" +
        "- In a neutral or acidic medium the manganate disproportionates to \\(\\text{KMnO}_4\\) and \\(\\text{MnO}_2\\): \\(3\\text{K}_2\\text{MnO}_4 + 4\\text{CO}_2 + 2\\text{H}_2\\text{O} \\longrightarrow 2\\text{KMnO}_4 + \\text{MnO}_2 + 4\\text{KHCO}_3\\). The liquid is filtered through glass wool and evaporated; KMnO₄ forms almost black crystals.\n" +
        "- **Electrolytic oxidation:** an alkaline solution of manganate is electrolysed between iron electrodes; oxygen at the anode converts it to permanganate: \\(2\\text{K}_2\\text{MnO}_4 + \\text{H}_2\\text{O} + [\\text{O}] \\longrightarrow 2\\text{KMnO}_4 + 2\\text{KOH}\\).\n" +
        "- **In acidic medium** (reduced to Mn²⁺): \\(2\\text{MnO}_4^- + 10\\text{I}^- + 16\\text{H}^+ \\longrightarrow 2\\text{Mn}^{2+} + 5\\text{I}_2 + 8\\text{H}_2\\text{O}\\); \\(5\\text{S}^{2-} + 2\\text{MnO}_4^- + 16\\text{H}^+ \\longrightarrow 2\\text{Mn}^{2+} + 5\\text{S} + 8\\text{H}_2\\text{O}\\); \\(2\\text{MnO}_4^- + 5\\text{H}_2\\text{C}_2\\text{O}_4 + 6\\text{H}^+ \\longrightarrow 2\\text{Mn}^{2+} + 10\\text{CO}_2 + 8\\text{H}_2\\text{O}\\).\n" +
        "- **In neutral or weakly alkaline medium** (reduced to MnO₂): iodide to iodate, \\(2\\text{MnO}_4^- + \\text{H}_2\\text{O} + \\text{I}^- \\longrightarrow 2\\text{MnO}_2 + 2\\text{OH}^- + \\text{IO}_3^-\\); thiosulphate to sulphate; manganous salt to \\(\\text{MnO}_2\\), \\(2\\text{MnO}_4^- + 3\\text{Mn}^{2+} + 2\\text{H}_2\\text{O} \\longrightarrow 5\\text{MnO}_2 + 4\\text{H}^+\\).\n" +
        "- **Uses (8.7.3):** an antiseptic; the unsaturation test in the laboratory; volumetric analysis of reducing agents; detecting halides in qualitative analysis; a powerful oxidising agent in laboratory and industry.",
      formula: {
        label: "Preparation of K₂MnO₄, the first step to KMnO₄",
        latex:
          "3\\text{MnO}_2 + 6\\text{KOH} + \\text{KClO}_3 \\xrightarrow{\\text{fuse}} 3\\text{K}_2\\text{MnO}_4 + \\text{KCl} + 3\\text{H}_2\\text{O}",
      },
      authoredExample: {
        prompt:
          "Write the balanced ionic equation for the oxidation of Fe²⁺ by acidified KMnO₄, and find the change in the oxidation state of manganese.",
        steps: [
          "Equation (8.7.2): \\(\\text{MnO}_4^- + 5\\text{Fe}^{2+} + 8\\text{H}^+ \\longrightarrow \\text{Mn}^{2+} + 5\\text{Fe}^{3+} + 4\\text{H}_2\\text{O}\\).",
          "Charge check: left \\(-1 + 10 + 8 = +17\\); right \\(+2 + 15 = +17\\).",
          "Mn in \\(\\text{MnO}_4^-\\): \\(x + 4(-2) = -1\\), so \\(x = +7\\). In \\(\\text{Mn}^{2+}\\) it is +2.",
          "Each manganese gains 5 electrons; each of the five Fe²⁺ ions loses one.",
        ],
        answer: "Manganese is reduced from +7 to +2 while Fe²⁺ is oxidised to Fe³⁺",
      },
      selfCheckExample: {
        prompt: "What happens when carbon dioxide is passed through a solution of potassium manganate? Write the equation.",
        steps: [
          "In a neutral or acidic medium the green manganate disproportionates: part of the manganese (+6) rises to +7 and part falls to +4.",
          "\\(3\\text{K}_2\\text{MnO}_4 + 4\\text{CO}_2 + 2\\text{H}_2\\text{O} \\longrightarrow 2\\text{KMnO}_4 + \\text{MnO}_2 + 4\\text{KHCO}_3\\)",
        ],
        answer: "The manganate disproportionates to potassium permanganate and manganese dioxide",
      },
      practiceSet: [
        { prompt: "What is formed when KMnO₄ oxidises iodide in a neutral or weakly alkaline medium?", answer: "Iodate, \\(\\text{IO}_3^-\\) (and MnO₂)" },
        { prompt: "Name the colour of potassium manganate.", answer: "Dark green" },
        { prompt: "In the electrolytic preparation of KMnO₄, what converts manganate into permanganate?", answer: "The oxygen evolved at the anode" },
        { prompt: "What is the oxidation state of manganese in K₂MnO₄?", answer: "+6" },
      ],
      pyqExampleId: "4fc9cb9a-ed4b-4c22-84a0-2f70ef2cfd22",
      traps: [
        {
          title: "Ignoring the medium",
          body: "In acid, permanganate ends as Mn²⁺; in a neutral or weakly alkaline medium it ends as MnO₂. Writing Mn²⁺ for the iodide-to-iodate reaction is wrong.",
        },
        {
          title: "Writing O₂ for oxalic acid",
          body: "Oxalic acid is oxidised to carbon dioxide, not oxygen. A textbook exercise prints O₂ among the products by mistake; the equation cannot balance that way.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscctr-k2cr2o7",
      name: "Potassium dichromate from chromite ore",
      intuition:
        "Chromite ore holds chromium as +3. The preparation has one job: push chromium up to +6 and then get it out as the potassium salt. Air does the oxidising in the furnace, acid turns chromate into dichromate, and potassium chloride swaps the sodium for potassium because the potassium salt is the less soluble one.",
      definition:
        "- **Step 1, roasting with soda ash:** finely powdered chromite ore \\(\\text{FeO}\\cdot\\text{Cr}_2\\text{O}_3\\) is heated with anhydrous \\(\\text{Na}_2\\text{CO}_3\\) and a flux of lime in air, in a reverberatory furnace: \\(4(\\text{FeO}\\cdot\\text{Cr}_2\\text{O}_3) + 8\\text{Na}_2\\text{CO}_3 + 7\\text{O}_2 \\longrightarrow 8\\text{Na}_2\\text{CrO}_4 + 2\\text{Fe}_2\\text{O}_3 + 8\\text{CO}_2\\)\n" +
        "- **Step 2, acidification:** the sodium chromate is extracted with water and treated with concentrated sulphuric acid: \\(2\\text{Na}_2\\text{CrO}_4 + \\text{H}_2\\text{SO}_4 \\longrightarrow \\text{Na}_2\\text{Cr}_2\\text{O}_7 + \\text{Na}_2\\text{SO}_4 + \\text{H}_2\\text{O}\\)\n" +
        "- **Step 3, conversion:** potassium chloride is added to the concentrated sodium dichromate solution; the less soluble, orange-red \\(\\text{K}_2\\text{Cr}_2\\text{O}_7\\) separates: \\(\\text{Na}_2\\text{Cr}_2\\text{O}_7 + 2\\text{KCl} \\longrightarrow \\text{K}_2\\text{Cr}_2\\text{O}_7 + 2\\text{NaCl}\\)\n" +
        "- **Properties (8.7.5):** acidified K₂Cr₂O₇ oxidises iodide to iodine, which turns the solution brown, and H₂S to a pale yellow precipitate of sulphur; it is itself reduced to chromic sulphate, and the solution changes from orange to green.\n" +
        "- Board 2015 asked the shape of the chromate ion, \\(\\text{CrO}_4^{2-}\\): it is **tetrahedral**, chromium at the centre and four oxygen atoms at the corners. The present textbook does not teach this shape, so give it little time.",
      formula: {
        label: "The overall change in the preparation",
        latex: "\\text{Cr}^{+3}\\ (\\text{chromite}) \\xrightarrow{\\text{Na}_2\\text{CO}_3,\\ \\text{air}} \\text{Cr}^{+6}\\ (\\text{Na}_2\\text{CrO}_4) \\xrightarrow{\\text{H}_2\\text{SO}_4} \\text{Na}_2\\text{Cr}_2\\text{O}_7 \\xrightarrow{\\text{KCl}} \\text{K}_2\\text{Cr}_2\\text{O}_7",
      },
      authoredExample: {
        prompt:
          "Find the oxidation state of chromium in chromite ore, in sodium chromate and in potassium dichromate. In which step of the preparation is chromium oxidised?",
        steps: [
          "Chromite, \\(\\text{FeO}\\cdot\\text{Cr}_2\\text{O}_3\\): in \\(\\text{Cr}_2\\text{O}_3\\), \\(2x + 3(-2) = 0\\), so \\(x = +3\\).",
          "\\(\\text{Na}_2\\text{CrO}_4\\): \\(2(+1) + x + 4(-2) = 0\\), so \\(x = +6\\).",
          "\\(\\text{K}_2\\text{Cr}_2\\text{O}_7\\): \\(2(+1) + 2x + 7(-2) = 0\\), so \\(x = +6\\).",
          "Chromium goes from +3 to +6 only in step 1, the heating with sodium carbonate in air. Steps 2 and 3 do not change it.",
        ],
        answer: "+3, +6 and +6; chromium is oxidised in step 1, by the oxygen of the air",
      },
      selfCheckExample: {
        prompt: "What colour change is seen when H₂S is passed through acidified K₂Cr₂O₇ solution, and why?",
        steps: [
          "Dichromate (Cr +6, orange) oxidises H₂S to sulphur, a pale yellow precipitate.",
          "Chromium is reduced to +3, as chromic sulphate, which is green.",
        ],
        answer: "Orange to green, with a pale yellow precipitate of sulphur",
      },
      practiceSet: [
        { prompt: "Write the formula of chromite ore as the textbook gives it.", answer: "\\(\\text{FeO}\\cdot\\text{Cr}_2\\text{O}_3\\)" },
        { prompt: "What colour does the solution turn when acidified K₂Cr₂O₇ oxidises KI?", answer: "Brown, from the iodine set free" },
        { prompt: "What is the geometry of the chromate ion?", answer: "Tetrahedral" },
      ],
      pyqExampleId: "b7c767f3-fdb9-4f38-bda9-c0008c74b768",
      traps: [
        {
          title: "Copying the misprinted acidification step",
          body: "The textbook prints step 2 with NaCl among the products, which cannot be right: there is no chlorine on the left. Write \\(2\\text{Na}_2\\text{CrO}_4 + \\text{H}_2\\text{SO}_4 \\longrightarrow \\text{Na}_2\\text{Cr}_2\\text{O}_7 + \\text{Na}_2\\text{SO}_4 + \\text{H}_2\\text{O}\\).",
        },
        {
          title: "Leaving out the conditions of step 1",
          body: "A full answer names anhydrous sodium carbonate, a flux of lime, air and the reverberatory furnace. 'Chromite is heated' alone loses marks.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscctr-redox-balance",
      name: "Balancing dichromate and permanganate equations",
      intuition:
        "In every redox reaction the oxidising agent takes exactly as many electrons as the reducing agent gives up. Find how many electrons one unit of each gains or loses, make the two numbers equal, and the main coefficients fall out. The potassium, sulphate and water are filled in last.",
      definition:
        "- Write the oxidation states of the atoms that change.\n" +
        "- Electrons gained per oxidant: dichromate has **two** chromium atoms, each going from +6 to +3; permanganate has one manganese going from +7 to +2.\n" +
        "- Electrons lost per reductant: \\(2\\text{I}^- \\longrightarrow \\text{I}_2\\) loses 2; \\(\\text{H}_2\\text{S} \\longrightarrow \\text{S}\\) loses 2; \\(\\text{Fe}^{2+} \\longrightarrow \\text{Fe}^{3+}\\) loses 1.\n" +
        "- Multiply so that electrons gained equal electrons lost.\n" +
        "- Then balance K (as \\(\\text{K}_2\\text{SO}_4\\)), then sulphate (as \\(\\text{H}_2\\text{SO}_4\\)), then H (as \\(\\text{H}_2\\text{O}\\)), and check O last.",
      formula: {
        label: "Electron balance",
        latex: "\\text{electrons gained by the oxidising agent} = \\text{electrons lost by the reducing agent}",
      },
      authoredExample: {
        prompt: "Balance: \\(\\text{KMnO}_4 + \\text{KI} + \\text{H}_2\\text{SO}_4 \\longrightarrow \\text{K}_2\\text{SO}_4 + \\text{MnSO}_4 + \\text{I}_2 + \\text{H}_2\\text{O}\\)",
        steps: [
          "Mn: +7 to +2, a gain of 5 electrons per \\(\\text{KMnO}_4\\). Two \\(\\text{KMnO}_4\\) gain 10.",
          "I: \\(2\\text{I}^- \\longrightarrow \\text{I}_2\\) loses 2 electrons, so 10 electrons need \\(5\\,\\text{I}_2\\), that is 10 KI.",
          "K: \\(2 + 10 = 12\\), so \\(6\\,\\text{K}_2\\text{SO}_4\\). Sulphate: \\(6 + 2 = 8\\), so \\(8\\,\\text{H}_2\\text{SO}_4\\).",
          "H: 16 on the left, so \\(8\\,\\text{H}_2\\text{O}\\). O check: \\(8 + 32 = 40\\) on the left; \\(24 + 8 + 8 = 40\\) on the right.",
        ],
        answer:
          "\\(2\\text{KMnO}_4 + 10\\text{KI} + 8\\text{H}_2\\text{SO}_4 \\longrightarrow 6\\text{K}_2\\text{SO}_4 + 2\\text{MnSO}_4 + 5\\text{I}_2 + 8\\text{H}_2\\text{O}\\)",
      },
      selfCheckExample: {
        prompt: "Show that the electrons balance in \\(5\\text{S}^{2-} + 2\\text{MnO}_4^- + 16\\text{H}^+ \\longrightarrow 2\\text{Mn}^{2+} + 5\\text{S} + 8\\text{H}_2\\text{O}\\).",
        steps: [
          "Sulphur: \\(-2 \\to 0\\), a loss of 2 electrons each; five sulphide ions lose 10.",
          "Manganese: \\(+7 \\to +2\\), a gain of 5 electrons each; two permanganate ions gain 10.",
          "Charge check: left \\(-10 - 2 + 16 = +4\\); right \\(2 \\times 2 = +4\\).",
        ],
        answer: "10 electrons lost by sulphur equal 10 gained by manganese, and the charges match (+4 each side)",
      },
      practiceSet: [
        { prompt: "How many electrons does one permanganate ion gain when it is reduced to Mn²⁺?", answer: "5" },
        { prompt: "How many electrons are lost when five Fe²⁺ ions are oxidised to Fe³⁺?", answer: "5" },
        { prompt: "Which acid is used to acidify K₂Cr₂O₇ in the textbook's reactions?", answer: "Sulphuric acid" },
      ],
      pyqExampleId: "608b8b15-0a67-4ea1-b00f-b98c668ddab5",
      traps: [
        {
          title: "Forgetting that dichromate has two chromium atoms",
          body: "Each chromium gains three electrons, and there are two in \\(\\text{Cr}_2\\text{O}_7^{2-}\\). Counting only one halves the reductant and the equation will not balance.",
        },
        {
          title: "Balancing oxygen first",
          body: "Start with the electrons, then K, sulphate and H. Oxygen is the check at the end; starting with it leads to endless trial and error.",
        },
      ],
    },
  ],
};
