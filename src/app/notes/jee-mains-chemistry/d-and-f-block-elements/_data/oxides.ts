import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/jee-mains-chemistry/d-and-f-block-elements";

export const OXIDES_DFB_NOTE: SubtopicNote = {
  subtopicName: "Oxides of Transition Metals",
  title: "Oxides of Transition Metals",
  oneLineDefinition:
    "A transition metal's oxides turn from basic to amphoteric to acidic as its oxidation state rises, and the highest oxides such as Mn₂O₇ are covalent molecules built from shared tetrahedra.",
  whyItMatters:
    "Eighteen PYQs, fourteen of them multiple choice, and two from 2026. Twelve ask whether an oxide is basic, amphoteric or acidic, most often for vanadium and chromium, and several then ask for the magnetic moment of the metal in it; six are about the structure of Mn₂O₇ and the mixed oxides such as Fe₃O₄. One rule, oxidation state against acidity, answers most of the page.",
  concepts: [
    // C1 — acid-base character
    {
      kind: "reference" as const,
      slug: "jcdfb-oxide-character",
      name: "Basic, amphoteric and acidic oxides",
      intuition:
        "In a low oxidation state the metal ion is large and weakly polarising, so its oxide is ionic and basic, like an s-block oxide. As the oxidation state rises the metal pulls the oxide electrons towards itself, the bonding turns covalent, and the oxide starts to behave like a non-metal oxide: acidic. The middle states are amphoteric.",
      definition:
        "- **Rule**: for one metal, higher oxidation state → less ionic, less basic, more acidic.\n" +
        "- **Vanadium**: \\(\\mathrm{V_2O_3}\\) (+3) basic > \\(\\mathrm{V_2O_4}\\) (+4) less basic > \\(\\mathrm{V_2O_5}\\) (+5) amphoteric, mainly acidic.\n" +
        "- \\(\\mathrm{V_2O_4}\\) dissolves in acids to give vanadyl salts, \\(\\mathrm{VO^{2+}}\\).\n" +
        "- \\(\\mathrm{V_2O_5}\\) gives \\(\\mathrm{VO_4^{3-}}\\) in alkali and \\(\\mathrm{VO_2^{+}}\\) in acid. V stays +5 in both.\n" +
        "- **Chromium**: CrO basic, \\(\\mathrm{Cr_2O_3}\\) amphoteric, \\(\\mathrm{CrO_3}\\) acidic (gives \\(\\mathrm{H_2CrO_4}\\) and \\(\\mathrm{H_2Cr_2O_7}\\)).\n" +
        "- **Manganese**: MnO basic, \\(\\mathrm{Mn_2O_7}\\) acidic (gives \\(\\mathrm{HMnO_4}\\)).\n" +
        "- **Zinc**: ZnO and \\(\\mathrm{Zn(OH)_2}\\) are amphoteric. \\(\\mathrm{Zn + 2NaOH + 2H_2O \\rightarrow Na_2[Zn(OH)_4] + H_2}\\).\n" +
        "- **Cr³⁺ with dilute NaOH**: a green precipitate of hydrated \\(\\mathrm{Cr_2O_3}\\) (\\(\\mathrm{Cr_2O_3 \\cdot nH_2O}\\)); in excess alkali it dissolves as \\(\\mathrm{[Cr(OH)_4]^{-}}\\).",
      table: {
        columns: ["Oxide", "Metal oxidation state", "Character", "With acid or alkali"],
        rows: [
          { cells: ["\\(\\mathrm{V_2O_3}\\)", "+3", "Basic", "Dissolves in acid to give \\(\\mathrm{V^{3+}}\\) salts"] },
          { cells: ["\\(\\mathrm{V_2O_4}\\)", "+4", "Less basic (weakly amphoteric)", "Dissolves in acid to give \\(\\mathrm{VO^{2+}}\\) salts"] },
          { cells: ["\\(\\mathrm{V_2O_5}\\)", "+5", "Amphoteric, mainly acidic", "\\(\\mathrm{VO_4^{3-}}\\) in alkali, \\(\\mathrm{VO_2^{+}}\\) in acid"], noteAmber: "The contact-process catalyst, but not a basic oxide." },
          { cells: ["CrO", "+2", "Basic", "Dissolves in acid to give \\(\\mathrm{Cr^{2+}}\\)"] },
          { cells: ["\\(\\mathrm{Cr_2O_3}\\)", "+3", "Amphoteric", "Reacts with both acid and alkali"] },
          { cells: ["\\(\\mathrm{CrO_3}\\)", "+6", "Acidic", "With water gives chromic acid, \\(\\mathrm{H_2CrO_4}\\)"] },
          { cells: ["MnO", "+2", "Basic", "Dissolves in acid to give \\(\\mathrm{Mn^{2+}}\\)"] },
          { cells: ["\\(\\mathrm{Mn_2O_7}\\)", "+7", "Acidic", "With water gives permanganic acid, \\(\\mathrm{HMnO_4}\\)"] },
          { cells: ["ZnO", "+2", "Amphoteric", "Zincate, \\(\\mathrm{[Zn(OH)_4]^{2-}}\\), in excess alkali"] },
        ],
        caption: "Down each metal's column of oxides, the character moves from basic to acidic as the oxidation state rises.",
      },
      selfCheckExample: {
        prompt:
          "Arrange CrO, \\(\\mathrm{Cr_2O_3}\\) and \\(\\mathrm{CrO_3}\\) in increasing acidic character, and give the spin-only magnetic moment of chromium in the basic one.",
        steps: [
          "Oxidation states: +2, +3, +6. Acidity rises with the oxidation state.",
          "The basic oxide is CrO. Cr²⁺ is 3d⁴ with 4 unpaired electrons.",
          "\\(\\mu = \\sqrt{4 \\times 6} = \\sqrt{24} = 4.90\\) BM.",
        ],
        answer: "CrO < \\(\\mathrm{Cr_2O_3}\\) < \\(\\mathrm{CrO_3}\\); 4.90 BM.",
      },
      practiceSet: [
        { prompt: "Character of \\(\\mathrm{Cr_2O_3}\\)?", answer: "Amphoteric" },
        { prompt: "Oxidation state of V in the anion formed when \\(\\mathrm{V_2O_5}\\) dissolves in alkali?", answer: "+5, in \\(\\mathrm{VO_4^{3-}}\\)" },
        { prompt: "How many of \\(\\mathrm{V_2O_3}\\), CrO, \\(\\mathrm{CrO_3}\\) and \\(\\mathrm{Mn_2O_7}\\) are acidic?", answer: "2 (\\(\\mathrm{CrO_3}\\) and \\(\\mathrm{Mn_2O_7}\\))" },
        { prompt: "Zinc product with excess aqueous NaOH?", answer: "\\(\\mathrm{[Zn(OH)_4]^{2-}}\\), with hydrogen gas" },
        { prompt: "Spin-only moment of vanadium in its most basic oxide?", answer: "2.83 BM (V³⁺, d²)" },
      ],
      pyqExampleId: "6f59d1c2-5a37-4a59-b805-a840f629cebc", // 2023 — basicity V2O3 > V2O4 > V2O5
      traps: [
        {
          title: "V₂O₄ with acid gives VO²⁺",
          body: "Vanadium(IV) in acid is the vanadyl ion, \\(\\mathrm{VO^{2+}}\\). The ion \\(\\mathrm{VO_2^{+}}\\) is vanadium(V), formed from \\(\\mathrm{V_2O_5}\\). Match the oxidation state before choosing.",
        },
        {
          title: "Ionic character falls as the oxidation state rises",
          body: "A higher oxidation state gives a MORE covalent oxide, which is why \\(\\mathrm{Mn_2O_7}\\) is a liquid and not an ionic solid. A statement that ionic character increases with oxidation number is false.",
        },
      ],
    },

    // C2 — structures and mixed oxides
    {
      kind: "reference" as const,
      slug: "jcdfb-oxide-structure",
      name: "Structure of Mn₂O₇ and the mixed oxides",
      intuition:
        "The highest oxides are not ionic lattices. \\(\\mathrm{Mn_2O_7}\\) is a molecule: two \\(\\mathrm{MnO_4}\\) tetrahedra joined through one shared oxygen. Oxygen holds manganese at +7 because each terminal oxygen forms a double bond. A mixed oxide is different again: one formula that hides two oxidation states of the same metal.",
      definition:
        "- **Mn₂O₇**: each Mn is tetrahedral. Two tetrahedra share one corner oxygen.\n" +
        "- 7 oxygens: 1 bridging (two Mn–O–Mn bonds) and 6 terminal (six Mn=O bonds). There is no Mn–Mn bond.\n" +
        "- It is covalent: a green oil at room temperature.\n" +
        "- **Mixed oxides** hold one metal in two states: \\(\\mathrm{Mn_3O_4}\\) (MnO·\\(\\mathrm{Mn_2O_3}\\)), \\(\\mathrm{Fe_3O_4}\\) (FeO·\\(\\mathrm{Fe_2O_3}\\)), \\(\\mathrm{Co_3O_4}\\) (CoO·\\(\\mathrm{Co_2O_3}\\)). Each has +2 and +3.\n" +
        "- Average oxidation state in \\(\\mathrm{M_3O_4}\\) is \\(+8/3\\), which is the sign of a mixed oxide.\n" +
        "- \\(\\mathrm{Fe_2O_3}\\), \\(\\mathrm{Cr_2O_3}\\), \\(\\mathrm{V_2O_4}\\) and \\(\\mathrm{Ti_2O_3}\\) hold one state only: not mixed.\n" +
        "- Oxidation state in the common oxides: \\(\\mathrm{Fe_2O_3}\\) +3 < \\(\\mathrm{MnO_2}\\) +4 < \\(\\mathrm{V_2O_5}\\) +5 < \\(\\mathrm{CrO_3}\\) +6.",
      table: {
        columns: ["Oxide", "Metal oxidation state", "Structure or make-up", "Point tested"],
        rows: [
          { cells: ["\\(\\mathrm{Mn_2O_7}\\)", "+7", "Two \\(\\mathrm{MnO_4}\\) tetrahedra sharing one O", "6 terminal Mn=O, 1 bridging O, covalent green oil"], noteAmber: "Mn is tetrahedral, not octahedral, and there is no Mn–Mn bond." },
          { cells: ["\\(\\mathrm{CrO_3}\\)", "+6", "Chains of \\(\\mathrm{CrO_4}\\) tetrahedra sharing corners", "Acidic, strong oxidant"] },
          { cells: ["\\(\\mathrm{Mn_3O_4}\\)", "+2 and +3", "MnO·\\(\\mathrm{Mn_2O_3}\\)", "Mixed oxide; paramagnetic"] },
          { cells: ["\\(\\mathrm{Fe_3O_4}\\)", "+2 and +3", "FeO·\\(\\mathrm{Fe_2O_3}\\)", "Mixed oxide; magnetite, strongly magnetic"] },
          { cells: ["\\(\\mathrm{Co_3O_4}\\)", "+2 and +3", "CoO·\\(\\mathrm{Co_2O_3}\\)", "Mixed oxide"] },
          { cells: ["\\(\\mathrm{Fe_2O_3}\\)", "+3", "One oxidation state", "Not a mixed oxide"] },
        ],
        caption: "A formula M₃O₄ with an average state of +8/3 hides a +2 and a +3 metal.",
      },
      selfCheckExample: {
        prompt:
          "In \\(\\mathrm{Fe_3O_4}\\), which oxidation states does iron show, how many iron atoms have each, and what is the average?",
        steps: [
          "Write it as FeO·\\(\\mathrm{Fe_2O_3}\\): one Fe at +2 and two Fe at +3.",
          "Total \\(= 2 + 3 + 3 = +8\\), which balances four oxide ions (−8).",
          "Average \\(= 8/3 \\approx +2.67\\).",
        ],
        answer: "One Fe(II) and two Fe(III); average \\(+8/3\\).",
      },
      practiceSet: [
        { prompt: "Number of Mn=O bonds in \\(\\mathrm{Mn_2O_7}\\)?", answer: "6" },
        { prompt: "Number of bridging oxygens in \\(\\mathrm{Mn_2O_7}\\)?", answer: "1" },
        { prompt: "Physical state of \\(\\mathrm{Mn_2O_7}\\) at room temperature?", answer: "A green oil" },
        { prompt: "How many of \\(\\mathrm{Fe_2O_3}\\), \\(\\mathrm{Fe_3O_4}\\), \\(\\mathrm{Mn_3O_4}\\) and \\(\\mathrm{Cr_2O_3}\\) are mixed oxides?", answer: "2" },
        { prompt: "Increasing oxidation state: \\(\\mathrm{CrO_3}\\), \\(\\mathrm{V_2O_5}\\), \\(\\mathrm{MnO_2}\\), \\(\\mathrm{Fe_2O_3}\\)?", answer: "\\(\\mathrm{Fe_2O_3}\\) < \\(\\mathrm{MnO_2}\\) < \\(\\mathrm{V_2O_5}\\) < \\(\\mathrm{CrO_3}\\)" },
      ],
      pyqExampleId: "47e88f76-13c2-41ca-b12a-ad6499290f67", // 2026 — Mn2O7: +7, O stabilises by multiple bonds, covalent, one bridging O
      traps: [
        {
          title: "Mn₂O₇ is covalent, not ionic",
          body: "It is a molecular liquid. A statement calling \\(\\mathrm{Mn_2O_7}\\) an ionic oxide is false; so is one that puts Mn in an octahedron.",
        },
        {
          title: "An M₂O₃ or M₃O₄ formula alone does not decide 'mixed'",
          body: "Check for two oxidation states. \\(\\mathrm{Fe_3O_4}\\) is mixed (+2 and +3); \\(\\mathrm{Fe_2O_3}\\) is all +3 and \\(\\mathrm{V_2O_4}\\) all +4.",
        },
      ],
    },
  ],
  related: [
    { label: "Oxidation States and Electrode Potentials — which states each metal shows", href: `${BASE}/jch-dfb-oxstates` },
    { label: "Potassium Dichromate and Chromium Compounds — what CrO₃ and chromates do next", href: `${BASE}/jch-dfb-dichromate` },
  ],
};
