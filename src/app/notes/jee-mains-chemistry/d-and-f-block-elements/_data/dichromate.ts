import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/jee-mains-chemistry/d-and-f-block-elements";

export const DICHROMATE_DFB_NOTE: SubtopicNote = {
  subtopicName: "Potassium Dichromate and Chromium Compounds",
  title: "Potassium Dichromate and Chromium Compounds",
  oneLineDefinition:
    "Chromite ore is roasted to sodium chromate and turned into K₂Cr₂O₇, whose orange Cr₂O₇²⁻ and yellow CrO₄²⁻ interconvert with pH at a constant +6; in acid dichromate is a six-electron oxidant, and with a chloride it gives red CrO₂Cl₂, the start of the blue CrO₅ test.",
  whyItMatters:
    "Twenty-six PYQs, seventeen of them multiple choice, and seven from 2026, more than any other page. Eleven follow chromite ore to K₂Cr₂O₇ and the chromate–dichromate balance with pH; five use dichromate as an oxidant in acid; ten are the chromyl chloride test and the blue CrO₅ that ends it. Nine are numeric, and most of those are an oxidation state or a count of oxygen atoms.",
  concepts: [
    // C1 — preparation, chromate/dichromate, structure
    {
      kind: "formula" as const,
      slug: "jcdfb-chromate-dichromate",
      name: "From chromite ore to K₂Cr₂O₇, and chromate against dichromate",
      intuition:
        "Chromium starts as Cr(III) in chromite, \\(\\mathrm{FeCr_2O_4}\\). Roasting with sodium carbonate in air oxidises it to yellow sodium chromate, Cr(VI). After that chromium never changes its oxidation state again: acid simply joins two chromate ions into one orange dichromate ion and lets out a water molecule, and base splits it back.",
      definition:
        "- **Roasting**: \\(\\mathrm{4FeCr_2O_4 + 8Na_2CO_3 + 7O_2 \\rightarrow 8Na_2CrO_4 + 2Fe_2O_3 + 8CO_2}\\).\n" +
        "- **Acidify**: \\(\\mathrm{2Na_2CrO_4 + 2H^{+} \\rightarrow Na_2Cr_2O_7 + 2Na^{+} + H_2O}\\).\n" +
        "- **Exchange**: \\(\\mathrm{Na_2Cr_2O_7 + 2KCl \\rightarrow K_2Cr_2O_7 + 2NaCl}\\). The potassium salt is less soluble and crystallises as orange crystals.\n" +
        "- **pH balance**: \\(\\mathrm{2CrO_4^{2-} + 2H^{+} \\rightleftharpoons Cr_2O_7^{2-} + H_2O}\\). Acid favours orange dichromate; base favours yellow chromate. Cr is +6 in both.\n" +
        "- **Shapes**: \\(\\mathrm{CrO_4^{2-}}\\) is tetrahedral. \\(\\mathrm{Cr_2O_7^{2-}}\\) is two tetrahedra sharing one corner: Cr–O–Cr angle 126°, a bent, symmetrical bridge, 6 terminal oxygens and 1 bridging.\n" +
        "- \\(\\mathrm{K_2Cr_2O_7}\\) is a primary standard in volumetric analysis. \\(\\mathrm{Na_2Cr_2O_7}\\) is not: it is hygroscopic, so it cannot be weighed accurately.",
      formula: {
        label: "The chromate–dichromate equilibrium",
        latex: "\\mathrm{2CrO_4^{2-} + 2H^{+} \\rightleftharpoons Cr_2O_7^{2-} + H_2O} \\qquad \\text{Cr stays } +6",
      },
      authoredExample: {
        prompt:
          "0.4 mol of chromite, \\(\\mathrm{FeCr_2O_4}\\), is roasted with sodium carbonate in air. How many moles of \\(\\mathrm{O_2}\\) are used and of \\(\\mathrm{Na_2CrO_4}\\) formed, and how many moles of \\(\\mathrm{K_2Cr_2O_7}\\) can finally be made?",
        steps: [
          "From the equation, 4 mol of chromite use 7 mol of \\(\\mathrm{O_2}\\): \\(0.4 \\times 7/4 = 0.7\\) mol.",
          "Each chromite gives 2 chromates: \\(0.4 \\times 2 = 0.8\\) mol \\(\\mathrm{Na_2CrO_4}\\).",
          "Two chromates make one dichromate: \\(0.8/2 = 0.4\\) mol \\(\\mathrm{K_2Cr_2O_7}\\).",
        ],
        answer: "0.7 mol \\(\\mathrm{O_2}\\); 0.8 mol \\(\\mathrm{Na_2CrO_4}\\); 0.4 mol \\(\\mathrm{K_2Cr_2O_7}\\).",
      },
      selfCheckExample: {
        prompt:
          "How many terminal and how many bridging oxygen atoms does the dichromate ion have, and what is the oxidation state of chromium in it?",
        steps: [
          "Two \\(\\mathrm{CrO_4}\\) tetrahedra would have 8 oxygens; sharing one corner leaves 7.",
          "The shared one bridges; the other 6 are terminal, three on each Cr.",
          "\\(2x + 7(-2) = -2\\) gives \\(x = +6\\).",
        ],
        answer: "6 terminal, 1 bridging; Cr is +6.",
      },
      practiceSet: [
        { prompt: "Colours of chromate and dichromate?", answer: "Yellow and orange" },
        { prompt: "Which way does NaOH move the chromate–dichromate balance?", answer: "Towards chromate" },
        { prompt: "Difference in the oxidation state of Cr between chromate and dichromate?", answer: "0" },
        { prompt: "Oxidation state of Cr in chromite, \\(\\mathrm{FeCr_2O_4}\\)?", answer: "+3" },
        { prompt: "Shape of the chromate ion?", answer: "Tetrahedral" },
      ],
      pyqExampleId: "c872fd63-cac0-47cc-bf47-808e187b7291", // 2025 — KOH gives K2CrO4, then H2SO4 gives back K2Cr2O7
      traps: [
        {
          title: "Chromate to dichromate is not a redox change",
          body: "Colour changes from yellow to orange, but Cr is +6 on both sides. A question on 'the change in oxidation state' of Cr between chromate and dichromate has the answer 0.",
        },
        {
          title: "Only the potassium salt is a primary standard",
          body: "Sodium dichromate is hygroscopic, so a weighed sample is not pure. Potassium dichromate is less soluble, crystallises pure and is the primary standard.",
        },
      ],
    },

    // C2 — dichromate as an oxidant
    {
      kind: "formula" as const,
      slug: "jcdfb-dichromate-oxidant",
      name: "Acidified dichromate as an oxidising agent",
      intuition:
        "In acid, each chromium in dichromate drops from +6 to +3. Two chromiums per ion means six electrons per dichromate. The orange solution turns green as \\(\\mathrm{Cr^{3+}}\\) forms, so anything that turns acidified dichromate green is a reducing agent.",
      definition:
        "- **Half-reaction**: \\(\\mathrm{Cr_2O_7^{2-} + 14H^{+} + 6e^{-} \\rightarrow 2Cr^{3+} + 7H_2O}\\), \\(E^\\circ = +1.33\\) V.\n" +
        "- **n-factor** of \\(\\mathrm{K_2Cr_2O_7}\\) in acid = 6.\n" +
        "- Iodide: \\(\\mathrm{Cr_2O_7^{2-} + 14H^{+} + 6I^{-} \\rightarrow 2Cr^{3+} + 3I_2 + 7H_2O}\\).\n" +
        "- Iron(II): \\(\\mathrm{Cr_2O_7^{2-} + 14H^{+} + 6Fe^{2+} \\rightarrow 2Cr^{3+} + 6Fe^{3+} + 7H_2O}\\).\n" +
        "- Tin(II): \\(\\mathrm{Cr_2O_7^{2-} + 14H^{+} + 3Sn^{2+} \\rightarrow 2Cr^{3+} + 3Sn^{4+} + 7H_2O}\\).\n" +
        "- Hydrogen sulphide: \\(\\mathrm{Cr_2O_7^{2-} + 8H^{+} + 3H_2S \\rightarrow 2Cr^{3+} + 3S + 7H_2O}\\).\n" +
        "- Sulphur dioxide: \\(\\mathrm{Cr_2O_7^{2-} + 2H^{+} + 3SO_2 \\rightarrow 2Cr^{3+} + 3SO_4^{2-} + H_2O}\\). This is the dichromate-paper test for \\(\\mathrm{SO_2}\\).\n" +
        "- Species already in their higher state (\\(\\mathrm{Fe^{3+}}\\), \\(\\mathrm{Sn^{4+}}\\), \\(\\mathrm{SO_4^{2-}}\\)) cannot reduce it.",
      formula: {
        label: "Electron balance with dichromate",
        latex: "6 \\times n\\left(\\mathrm{Cr_2O_7^{2-}}\\right) = (\\text{electrons lost per reductant}) \\times n(\\text{reductant})",
      },
      authoredExample: {
        prompt:
          "How many moles of \\(\\mathrm{SO_2}\\) are oxidised to sulphate by 0.02 mol of acidified \\(\\mathrm{K_2Cr_2O_7}\\)?",
        steps: [
          "Electrons taken by dichromate: \\(6 \\times 0.02 = 0.12\\) mol.",
          "S goes from +4 in \\(\\mathrm{SO_2}\\) to +6 in sulphate: 2 electrons per \\(\\mathrm{SO_2}\\).",
          "\\(n(\\mathrm{SO_2}) = 0.12/2 = 0.06\\) mol, matching the 1 : 3 ratio in the balanced equation.",
        ],
        answer: "0.06 mol of \\(\\mathrm{SO_2}\\).",
      },
      selfCheckExample: {
        prompt:
          "What mass of \\(\\mathrm{KNO_2}\\) (M = 85 g/mol) is oxidised to nitrate by 0.01 mol of acidified \\(\\mathrm{K_2Cr_2O_7}\\)?",
        steps: [
          "Dichromate takes \\(6 \\times 0.01 = 0.06\\) mol of electrons.",
          "N goes from +3 in nitrite to +5 in nitrate: 2 electrons each, so \\(0.06/2 = 0.03\\) mol of \\(\\mathrm{KNO_2}\\).",
          "Mass \\(= 0.03 \\times 85 = 2.55\\) g.",
        ],
        answer: "2.55 g.",
      },
      practiceSet: [
        { prompt: "Oxidation state of Cr in the product when KI reacts with acidified dichromate?", answer: "+3" },
        { prompt: "n-factor of \\(\\mathrm{K_2Cr_2O_7}\\) in acid?", answer: "6" },
        { prompt: "Moles of \\(\\mathrm{I_2}\\) released per mole of dichromate?", answer: "3" },
        { prompt: "Colour change of acidified dichromate on reduction?", answer: "Orange to green" },
        { prompt: "Can \\(\\mathrm{Sn^{4+}}\\) change the colour of acidified dichromate?", answer: "No; it is already oxidised" },
      ],
      pyqExampleId: "a439cde5-df15-4ae5-8b04-d79e8f4f2cf5", // 2026 — Fe2+, Sn2+, I-, S2- all reduce acidified dichromate
      traps: [
        {
          title: "Electrons per what?",
          body: "One dichromate takes 6 electrons. But forming one \\(\\mathrm{I_2}\\) from iodide involves 2 electrons, and forming one S from sulphide also 2. Read whether a question counts per dichromate, per product molecule or per balanced equation before you add.",
        },
        {
          title: "The green paper is not proof of SO₂ alone",
          body: "Acidified dichromate paper turning green is the standard test for \\(\\mathrm{SO_2}\\), but \\(\\mathrm{H_2S}\\) also reduces dichromate and turns it green. The key follows the named test; the chemistry allows both.",
        },
      ],
    },

    // C3 — chromyl chloride and CrO5
    {
      kind: "formula" as const,
      slug: "jcdfb-chromyl-cro5",
      name: "The chromyl chloride test and blue CrO₅",
      intuition:
        "Heat a chloride with dichromate and concentrated sulphuric acid, and orange-red vapours of chromyl chloride come off. Chromium is still +6: nothing is reduced. The vapour dissolves in NaOH as yellow chromate, and chromate with hydrogen peroxide in acid gives a deep-blue peroxide, \\(\\mathrm{CrO_5}\\), that dissolves in amyl alcohol. Bromides and iodides give no chromyl compound, so the test picks out chloride.",
      definition:
        "- **Step 1**: \\(\\mathrm{4NaCl + K_2Cr_2O_7 + 6H_2SO_4 \\rightarrow 2CrO_2Cl_2 + 2KHSO_4 + 4NaHSO_4 + 3H_2O}\\).\n" +
        "- \\(\\mathrm{CrO_2Cl_2}\\): orange-red vapour, Cr +6, d⁰ (the same d count as Ti(IV), V(V) and Mn(VII)).\n" +
        "- **Step 2**: \\(\\mathrm{CrO_2Cl_2 + 4NaOH \\rightarrow Na_2CrO_4 + 2NaCl + 2H_2O}\\) (yellow solution).\n" +
        "- **Step 3**: \\(\\mathrm{CrO_4^{2-} + 2H^{+} + 2H_2O_2 \\rightarrow CrO_5 + 3H_2O}\\). The blue \\(\\mathrm{CrO_5}\\) is extracted into amyl alcohol or ether.\n" +
        "- **CrO₅ structure**:one Cr=O and two peroxo (O–O) groups, a butterfly shape. Cr is +6, not +10.\n" +
        "- With KBr instead of a chloride, brown bromine vapour comes off and the NaOH solution stays colourless: no chromate, no blue layer.",
      formula: {
        label: "Oxidation state of Cr in CrO₅",
        latex: "x + 1(-2) + 4(-1) = 0 \\;\\Rightarrow\\; x = +6",
      },
      authoredExample: {
        prompt:
          "Show that chromium in \\(\\mathrm{CrO_5}\\) is +6 and not +10, and count the peroxide oxygens.",
        steps: [
          "If every oxygen were oxide (−2), Cr would be +10, but Cr has only six valence electrons.",
          "The structure has one Cr=O oxygen (−2) and two O–O peroxo groups, 4 oxygens at −1 each.",
          "\\(x - 2 - 4 = 0\\), so \\(x = +6\\).",
        ],
        answer: "Cr is +6; 4 of the 5 oxygens are peroxide oxygens.",
      },
      selfCheckExample: {
        prompt:
          "A student runs the chromyl chloride test on potassium bromide instead of a chloride. What is seen when the vapour is passed into NaOH, and why?",
        steps: [
          "Bromide is oxidised by dichromate to bromine, which gives brown vapours.",
          "Bromine in NaOH gives colourless bromide and hypobromite; no chromium enters the solution.",
          "With no chromate, the \\(\\mathrm{H_2O_2}\\) step gives no blue layer.",
        ],
        answer: "A colourless solution, not yellow: no chromyl compound forms, so the test is negative.",
      },
      practiceSet: [
        { prompt: "Oxidation state of Cr in \\(\\mathrm{CrO_2Cl_2}\\)?", answer: "+6" },
        { prompt: "Colour of \\(\\mathrm{CrO_5}\\) in amyl alcohol?", answer: "Blue" },
        { prompt: "Yellow compound formed when chromyl chloride meets NaOH?", answer: "\\(\\mathrm{Na_2CrO_4}\\)" },
        { prompt: "Number of d electrons on Cr in chromyl chloride?", answer: "0" },
        { prompt: "Number of peroxo groups in \\(\\mathrm{CrO_5}\\)?", answer: "2" },
      ],
      pyqExampleId: "f62682e4-d2c5-416c-9647-06b8c7234f16", // 2026 — NaCl + K2Cr2O7 + conc. H2SO4: CrO2Cl2, Cr +6
      traps: [
        {
          title: "CrO₅ is +6, not +10",
          body: "Four of its five oxygens are in peroxo groups at −1. Treating all five as −2 gives an impossible +10.",
        },
        {
          title: "The formula is CrO₂Cl₂",
          body: "One chromium, two oxygens, two chlorines. Options such as \\(\\mathrm{Cr_2O_2Cl_2}\\) or a +5 or +3 state are the distractors; there is no redox for chromium in this step.",
        },
      ],
    },
  ],
  related: [
    { label: "Potassium Permanganate and Manganese Compounds — the other named oxidant", href: `${BASE}/jch-dfb-permanganate` },
    { label: "Oxides of Transition Metals — CrO₃ and the acidic oxides", href: `${BASE}/jch-dfb-oxides` },
  ],
};
