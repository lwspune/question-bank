import type { SubtopicNote } from "@/app/notes/_types";

export const DETECTION_GOC_NOTE: SubtopicNote = {
  subtopicName: "Lassaigne's Test and Estimation of Nitrogen",
  title: "Lassaigne's Test and Estimation of Nitrogen",
  oneLineDefinition:
    "Fusing an organic compound with sodium turns its nitrogen, sulphur and halogens into cyanide, sulphide and halide ions that give coloured tests; nitrogen is then measured either as N₂ gas (Dumas' method) or as ammonia (Kjeldahl's method).",
  whyItMatters:
    "Thirty-eight PYQs, eleven of them asking for a number, and three from 2026. Eighteen are about Lassaigne's test: which elements it detects, the colour and formula of each product, why the extract is boiled with nitric acid, and which nitrogen compounds fail it. Twelve are about Dumas' method, mostly a volume of N₂ turned into a percentage. Eight are about Kjeldahl's method, where the traps are the dibasic sulphuric acid and the compounds the method cannot handle.",
  concepts: [
    // C1 — Lassaigne's test
    {
      kind: "reference" as const,
      slug: "jcgoc-lassaigne",
      name: "Lassaigne's test for nitrogen, sulphur, halogens and phosphorus",
      intuition:
        "Nitrogen, sulphur and halogens bonded covalently in an organic molecule give none of the usual ionic tests. Fusing the compound with sodium metal turns them into ionic NaCN, Na₂S and NaX. The fused mass is boiled with water, and this sodium fusion extract is then tested for each ion.",
      definition:
        "- Sodium fusion: \\(\\mathrm{Na + C + N \\to NaCN}\\); \\(\\mathrm{2Na + S \\to Na_2S}\\); \\(\\mathrm{Na + X \\to NaX}\\). Phosphorus is detected as phosphate after oxidation.\n" +
        "- NaCN forms only when the compound contains carbon as well as nitrogen. Hydrazine, hydroxylamine and ammonium salts have no carbon and fail the test; urea, glycine and phenylhydrazine pass.\n" +
        "- With both N and S present, the fusion can give NaSCN, which turns blood red with \\(\\mathrm{Fe^{3+}}\\) and gives no Prussian blue. With excess sodium it breaks down: \\(\\mathrm{NaSCN + 2Na \\to NaCN + Na_2S}\\).\n" +
        "- Before the halogen test, boil the extract with dilute \\(\\mathrm{HNO_3}\\) to decompose NaCN and \\(\\mathrm{Na_2S}\\); otherwise they give their own precipitates with \\(\\mathrm{AgNO_3}\\). Never use HCl, which adds chloride.\n" +
        "- Iodine can also be shown by adding \\(\\mathrm{CHCl_3}\\) and chlorine water: the \\(\\mathrm{CHCl_3}\\) layer turns violet.\n" +
        "- Carbon and hydrogen are detected differently, by heating with CuO: \\(\\mathrm{CO_2}\\) turns lime water milky and water turns anhydrous \\(\\mathrm{CuSO_4}\\) blue. Oxygen is not detected by Lassaigne's test.",
      table: {
        columns: ["Element", "In the extract as", "Reagent", "Positive result"],
        rows: [
          { cells: ["Nitrogen", "NaCN", "\\(\\mathrm{FeSO_4}\\), boil, then conc. \\(\\mathrm{H_2SO_4}\\)", "Prussian blue, \\(\\mathrm{Fe_4[Fe(CN)_6]_3}\\)"] },
          { cells: ["Sulphur", "\\(\\mathrm{Na_2S}\\)", "Sodium nitroprusside", "Violet, \\(\\mathrm{Na_4[Fe(CN)_5NOS]}\\)"] },
          { cells: ["Sulphur", "\\(\\mathrm{Na_2S}\\)", "Ethanoic acid and lead acetate", "Black precipitate of PbS"] },
          {
            cells: ["Nitrogen and sulphur together", "NaSCN", "\\(\\mathrm{Fe^{3+}}\\) (iron(III) chloride)", "Blood red, \\(\\mathrm{[Fe(SCN)]^{2+}}\\)"],
            noteAmber: "With excess sodium the thiocyanate breaks down, and the separate cyanide and sulphide tests work instead.",
          },
          { cells: ["Chlorine", "NaCl", "Boil with \\(\\mathrm{HNO_3}\\), then \\(\\mathrm{AgNO_3}\\)", "White AgCl, soluble in ammonia"] },
          { cells: ["Bromine", "NaBr", "Boil with \\(\\mathrm{HNO_3}\\), then \\(\\mathrm{AgNO_3}\\)", "Pale yellow AgBr, sparingly soluble in ammonia"] },
          { cells: ["Iodine", "NaI", "Boil with \\(\\mathrm{HNO_3}\\), then \\(\\mathrm{AgNO_3}\\)", "Yellow AgI, insoluble in ammonia"] },
          { cells: ["Phosphorus", "\\(\\mathrm{Na_3PO_4}\\) (after oxidation with \\(\\mathrm{Na_2O_2}\\))", "\\(\\mathrm{HNO_3}\\) and ammonium molybdate", "Yellow \\(\\mathrm{(NH_4)_3PO_4 \\cdot 12MoO_3}\\)"] },
        ],
        caption: "The fusion extract detects nitrogen, sulphur, the halogens and phosphorus, and nothing else.",
      },
      selfCheckExample: {
        prompt:
          "A sodium fusion extract is boiled with dilute \\(\\mathrm{HNO_3}\\) and then treated with \\(\\mathrm{AgNO_3}\\). A pale yellow precipitate forms that dissolves only slightly in ammonia. Which halogen does the compound contain?",
        steps: [
          "AgCl is white and dissolves in ammonia; AgI is yellow and does not dissolve at all.",
          "A pale yellow precipitate, sparingly soluble in ammonia, is AgBr.",
        ],
        answer: "Bromine.",
      },
      practiceSet: [
        { prompt: "What is the formula of Prussian blue?", answer: "\\(\\mathrm{Fe_4[Fe(CN)_6]_3}\\)" },
        { prompt: "Why is the extract boiled with dilute \\(\\mathrm{HNO_3}\\) before the halogen test?", answer: "To decompose NaCN and \\(\\mathrm{Na_2S}\\)" },
        { prompt: "Does hydrazine, \\(\\mathrm{N_2H_4}\\), give Lassaigne's test for nitrogen?", answer: "No; it has no carbon, so NaCN cannot form" },
        { prompt: "What colour does sodium nitroprusside give with sulphide ion?", answer: "Violet" },
      ],
      pyqExampleId: "f2179875-45ce-47b5-ad17-8dc61cb0efdf", // 2022 — sodium thiocyanate and excess sodium
      traps: [
        {
          title: "No carbon, no cyanide",
          body: "The nitrogen test depends on NaCN, which needs carbon from the compound. Hydrazine and hydroxylamine contain nitrogen but no carbon, so they give no Prussian blue.",
        },
        {
          title: "Nitric acid, not hydrochloric acid",
          body: "The extract is acidified with \\(\\mathrm{HNO_3}\\) before adding \\(\\mathrm{AgNO_3}\\). HCl would add chloride and give white AgCl whatever the compound contained.",
        },
        {
          title: "Lassaigne's test cannot detect oxygen",
          body: "The fusion extract shows N, S, halogens and P. A set of elements that includes oxygen or carbon is not what the sodium fusion extract detects.",
        },
      ],
    },

    // C2 — Dumas method
    {
      kind: "formula" as const,
      slug: "jcgoc-dumas",
      name: "Dumas method for nitrogen",
      intuition:
        "Heat the compound with copper(II) oxide and all its nitrogen comes off as nitrogen gas. Collect the gas, correct its volume to STP, and its mass gives the percentage of nitrogen directly.",
      definition:
        "- The compound is heated with CuO in an atmosphere of \\(\\mathrm{CO_2}\\): carbon gives \\(\\mathrm{CO_2}\\), hydrogen gives water and nitrogen gives \\(\\mathrm{N_2}\\), with some oxides of nitrogen.\n" +
        "- The gases pass over heated copper gauze, which reduces the oxides of nitrogen to \\(\\mathrm{N_2}\\).\n" +
        "- The \\(\\mathrm{N_2}\\) is collected over KOH solution, which absorbs the \\(\\mathrm{CO_2}\\).\n" +
        "- Gas collected over an aqueous solution is wet: its own pressure is the measured pressure minus the aqueous tension, f.\n" +
        "- CuO needed for \\(\\mathrm{C_xH_yN_z}\\): \\((2x + y/2)\\) mol per mole of compound.\n" +
        "- Dumas' method works for every kind of nitrogen compound.",
      formula: {
        label: "Percentage of nitrogen (Dumas)",
        latex:
          "V_{\\mathrm{STP}} = \\dfrac{(p - f)\\,V}{T} \\times \\dfrac{273}{760} \\qquad \\%\\,\\mathrm{N} = \\dfrac{28}{22400} \\times \\dfrac{V_{\\mathrm{STP}}\\,(\\text{mL})}{m\\,(\\text{g})} \\times 100",
      },
      authoredExample: {
        prompt:
          "In Dumas' method, 0.25 g of an organic compound gives 40 mL of nitrogen collected at 290 K and 740 mm Hg. The aqueous tension at 290 K is 20 mm Hg. Find the percentage of nitrogen.",
        steps: [
          "Pressure of dry \\(\\mathrm{N_2}\\) \\(= 740 - 20 = 720\\) mm Hg.",
          "\\(V_{\\mathrm{STP}} = \\dfrac{720 \\times 40}{290} \\times \\dfrac{273}{760} = 35.67\\) mL.",
          "Mass of \\(\\mathrm{N_2}\\) \\(= \\dfrac{28 \\times 35.67}{22400} = 0.04459\\) g.",
          "\\(\\%\\,\\mathrm{N} = \\dfrac{0.04459}{0.25} \\times 100 = 17.8\\%\\).",
        ],
        answer: "17.8% nitrogen.",
      },
      selfCheckExample: {
        prompt:
          "In Dumas' method, 0.35 g of a compound gives 28.0 mL of \\(\\mathrm{N_2}\\), already reduced to STP. Find the percentage of nitrogen.",
        steps: [
          "Mass of \\(\\mathrm{N_2}\\) \\(= \\dfrac{28 \\times 28.0}{22400} = 0.035\\) g.",
          "\\(\\%\\,\\mathrm{N} = \\dfrac{0.035}{0.35} \\times 100\\).",
        ],
        answer: "10.0% nitrogen.",
      },
      practiceSet: [
        { prompt: "In Dumas' method, over what are the gases passed to reduce the oxides of nitrogen?", answer: "Heated copper gauze" },
        { prompt: "What absorbs the \\(\\mathrm{CO_2}\\) before the nitrogen is measured?", answer: "KOH solution" },
        { prompt: "How many moles of CuO does one mole of \\(\\mathrm{C_3H_9N}\\) need in Dumas' method?", answer: "10.5 (\\(2 \\times 3 + 9/2\\))" },
        { prompt: "What is the mass of 22.4 mL of \\(\\mathrm{N_2}\\) at STP?", answer: "0.028 g" },
      ],
      pyqExampleId: "dda39e1f-8fe2-4492-94ed-5bfa488ecc46", // 2026 — Dumas % N with aqueous tension
      traps: [
        {
          title: "Subtract the aqueous tension first",
          body: "The collected nitrogen is saturated with water vapour. Use the measured pressure minus the aqueous tension before reducing the volume to STP; forgetting it raises the answer by a few per cent.",
        },
        {
          title: "Nitrogen gas is 28, not 14",
          body: "22400 mL of \\(\\mathrm{N_2}\\) at STP weighs 28 g. Using 14 g halves the percentage.",
        },
        {
          title: "Copper gauze, not copper oxide, reduces the oxides",
          body: "Copper(II) oxide oxidises the compound; the heated copper gauze further along reduces any oxides of nitrogen back to \\(\\mathrm{N_2}\\).",
        },
      ],
    },

    // C3 — Kjeldahl method
    {
      kind: "formula" as const,
      slug: "jcgoc-kjeldahl",
      name: "Kjeldahl method for nitrogen",
      intuition:
        "Digest the compound so that its nitrogen becomes ammonium sulphate, release the ammonia with alkali, and catch it in a known amount of standard acid. The acid used up tells you the moles of ammonia, and each ammonia molecule carries one nitrogen atom.",
      definition:
        "- The compound is heated with concentrated \\(\\mathrm{H_2SO_4}\\) and a little \\(\\mathrm{CuSO_4}\\), which acts as a catalyst. Its nitrogen becomes \\(\\mathrm{(NH_4)_2SO_4}\\).\n" +
        "- Excess NaOH releases \\(\\mathrm{NH_3}\\), which is distilled into a known volume of standard acid. The acid left over is titrated with alkali.\n" +
        "- Moles of N = moles of \\(\\mathrm{NH_3}\\) = moles of acid used × basicity (2 for \\(\\mathrm{H_2SO_4}\\), 1 for HCl).\n" +
        "- The method fails for nitro and azo compounds and for nitrogen in a ring (pyridine): their nitrogen does not all turn into ammonium sulphate.\n" +
        "- In the formula, V is the volume of acid actually neutralised by the ammonia, in mL, and M its molarity.",
      formula: {
        label: "Percentage of nitrogen (Kjeldahl)",
        latex:
          "\\%\\,\\mathrm{N} = \\dfrac{1.4 \\times M \\times V \\times b}{m} \\qquad (b = \\text{basicity of the acid},\\ V \\text{ in mL},\\ m \\text{ in g})",
      },
      authoredExample: {
        prompt:
          "In Kjeldahl's method, the ammonia from 0.60 g of an organic compound neutralises 10 mL of 0.5 M \\(\\mathrm{H_2SO_4}\\). Find the percentage of nitrogen.",
        steps: [
          "Moles of \\(\\mathrm{H_2SO_4}\\) \\(= 0.5 \\times 10/1000 = 0.005\\).",
          "\\(\\mathrm{H_2SO_4}\\) is dibasic, so moles of \\(\\mathrm{NH_3}\\) \\(= 2 \\times 0.005 = 0.010\\) = moles of N.",
          "Mass of N \\(= 0.010 \\times 14 = 0.14\\) g.",
          "\\(\\%\\,\\mathrm{N} = 0.14/0.60 \\times 100 = 23.3\\%\\). Check: \\(1.4 \\times 0.5 \\times 10 \\times 2 / 0.60 = 23.3\\).",
        ],
        answer: "23.3% nitrogen.",
      },
      selfCheckExample: {
        prompt:
          "The ammonia from 0.40 g of an organic compound neutralises 25 mL of 0.2 M HCl. Find the percentage of nitrogen.",
        steps: [
          "Moles of HCl \\(= 0.2 \\times 25/1000 = 0.005\\). HCl is monobasic, so moles of \\(\\mathrm{NH_3}\\) \\(= 0.005\\).",
          "Mass of N \\(= 0.005 \\times 14 = 0.07\\) g.",
          "\\(\\%\\,\\mathrm{N} = 0.07/0.40 \\times 100\\).",
        ],
        answer: "17.5% nitrogen.",
      },
      practiceSet: [
        { prompt: "What is the role of \\(\\mathrm{CuSO_4}\\) in Kjeldahl's method?", answer: "It is a catalyst" },
        { prompt: "Can Kjeldahl's method estimate the nitrogen in nitrobenzene?", answer: "No" },
        { prompt: "How many moles of \\(\\mathrm{NH_3}\\) does 1 mol of \\(\\mathrm{H_2SO_4}\\) neutralise?", answer: "2" },
        { prompt: "Into which salt is the nitrogen converted during digestion?", answer: "Ammonium sulphate, \\(\\mathrm{(NH_4)_2SO_4}\\)" },
      ],
      pyqExampleId: "69b41820-c614-41be-ae14-729a49a0131e", // 2026 — Kjeldahl % N with dibasic H2SO4
      traps: [
        {
          title: "Sulphuric acid is dibasic",
          body: "One mole of \\(\\mathrm{H_2SO_4}\\) neutralises two moles of \\(\\mathrm{NH_3}\\). Forgetting the factor of 2 gives exactly half the right percentage, and that value is always among the options.",
        },
        {
          title: "Not for nitro, azo or ring nitrogen",
          body: "Kjeldahl's method does not work for nitro and azo compounds or for pyridine, because their nitrogen is not fully converted into ammonium sulphate. Use Dumas' method for them.",
        },
        {
          title: "Use the acid actually neutralised",
          body: "When a question gives the total acid and the excess titrated back with alkali, the ammonia used only the difference. Subtract before you multiply by the basicity.",
        },
      ],
    },
  ],
};
