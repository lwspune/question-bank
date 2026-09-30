import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/jee-mains-chemistry/d-and-f-block-elements";

export const OXSTATES_DFB_NOTE: SubtopicNote = {
  subtopicName: "Oxidation States and Electrode Potentials",
  title: "Oxidation States and Electrode Potentials",
  oneLineDefinition:
    "Transition metals show many oxidation states because their (n−1)d and ns electrons are close in energy; the E° values of the M²⁺/M and M³⁺/M²⁺ couples then say which ions reduce water or acid, which are strong oxidants, and why Cu²⁺ rather than Cu⁺ survives in water.",
  whyItMatters:
    "Twenty-seven PYQs, twenty-two of them multiple choice, and one from 2026. Ten ask which oxidation states a metal shows and how their stability changes down a group; thirteen read E° values to decide which ion liberates hydrogen or is the strongest oxidant, several of them finishing with a magnetic moment; four ask why Cu²⁺, not Cu⁺, survives in water. The E° table below settles most of them.",
  concepts: [
    // C1 — oxidation states
    {
      kind: "reference" as const,
      slug: "jcdfb-ox-states",
      name: "Oxidation states of the 3d metals",
      intuition:
        "A transition metal can lose its ns electrons and then some or all of its d electrons, one at a time, so its oxidation states differ in steps of one. The number of states is largest in the middle of the series, where there are the most electrons to lose and the most orbitals to hold them. Manganese reaches +7 by using all seven 3d and 4s electrons.",
      definition:
        "- **Most states**: Mn (+2 to +7). **Only one state**: Sc (+3).\n" +
        "- Early metals reach their group number (Ti +4, V +5, Cr +6, Mn +7). After Mn the highest states fall, and +2 becomes common.\n" +
        "- **Oxygen and fluorine** stabilise high states. Mn reaches +7 only in \\(\\mathrm{Mn_2O_7}\\); its highest fluoride is \\(\\mathrm{MnF_4}\\) (+4). Oxygen can form multiple bonds to the metal, fluorine cannot.\n" +
        "- **Down a group** the higher states become MORE stable: Mo(VI) and W(VI) are more stable than Cr(VI), so \\(\\mathrm{CrO_3}\\) is the strongest oxidant of the three. Ru and Os reach +8 (\\(\\mathrm{RuO_4}\\), \\(\\mathrm{OsO_4}\\)).\n" +
        "- This is the opposite of the p-block, where the lower state gets more stable down a group (Pb(II) over Pb(IV)).\n" +
        "- The red of ruby is \\(\\mathrm{Cr^{3+}}\\) in \\(\\mathrm{Al_2O_3}\\).",
      table: {
        columns: ["Metal", "Oxidation states", "Most stable in water", "Highest fluoride and oxide"],
        rows: [
          { cells: ["Sc", "+3", "+3", "\\(\\mathrm{ScF_3}\\), \\(\\mathrm{Sc_2O_3}\\)"], noteAmber: "The only 3d metal with a single oxidation state besides 0." },
          { cells: ["Ti", "+2, +3, +4", "+4", "\\(\\mathrm{TiF_4}\\), \\(\\mathrm{TiO_2}\\)"] },
          { cells: ["V", "+2, +3, +4, +5", "+4 (as \\(\\mathrm{VO^{2+}}\\)) and +5", "\\(\\mathrm{VF_5}\\), \\(\\mathrm{V_2O_5}\\)"] },
          { cells: ["Cr", "+2, +3, +4, +5, +6", "+3", "\\(\\mathrm{CrF_6}\\), \\(\\mathrm{CrO_3}\\)"] },
          { cells: ["Mn", "+2, +3, +4, +5, +6, +7", "+2", "\\(\\mathrm{MnF_4}\\), \\(\\mathrm{Mn_2O_7}\\)"], noteAmber: "Highest oxide (+7) and highest fluoride (+4) differ by 3." },
          { cells: ["Fe", "+2, +3 (+4 and +6 rare)", "+3 in air, +2 without it", "\\(\\mathrm{FeF_3}\\), \\(\\mathrm{Fe_2O_3}\\)"] },
          { cells: ["Co", "+2, +3, +4", "+2", "\\(\\mathrm{CoF_3}\\), \\(\\mathrm{Co_3O_4}\\)"] },
          { cells: ["Ni", "+2, +3, +4", "+2", "\\(\\mathrm{NiF_2}\\), NiO"] },
          { cells: ["Cu", "+1, +2", "+2", "\\(\\mathrm{CuF_2}\\), CuO"] },
          { cells: ["Zn", "+2", "+2", "\\(\\mathrm{ZnF_2}\\), ZnO"] },
        ],
        caption: "The number of states peaks at Mn; the ends of the series (Sc, Zn) show one.",
      },
      selfCheckExample: {
        prompt:
          "Which is the stronger oxidising agent, the permanganate ion \\(\\mathrm{MnO_4^{-}}\\) or the perrhenate ion \\(\\mathrm{ReO_4^{-}}\\)? Both contain the metal in the +7 state.",
        steps: [
          "Re lies two places below Mn in group 7.",
          "Down a d-block group the highest state becomes more stable, so Re(VII) has little tendency to be reduced.",
          "Mn(VII) is the least stable +7 state of the group, so it is the strongest oxidant.",
        ],
        answer: "\\(\\mathrm{MnO_4^{-}}\\).",
      },
      practiceSet: [
        { prompt: "Which 3d metal shows the most oxidation states?", answer: "Mn" },
        { prompt: "Common oxidation states of the element with Z = 24?", answer: "+2 to +6 (Cr)" },
        { prompt: "Difference between Mn's oxidation state in \\(\\mathrm{Mn_2O_7}\\) and in \\(\\mathrm{MnF_4}\\)?", answer: "3" },
        { prompt: "Is Cr(VI) more or less stable than W(VI)?", answer: "Less stable" },
        { prompt: "Which two metals reach +8 in their oxides?", answer: "Ru and Os" },
      ],
      pyqExampleId: "6271d20e-b644-404a-8bf9-01fd8ccba714", // 2025 — CrO3 stronger oxidant than MoO3; Cr(VI) less stable
      traps: [
        {
          title: "The d-block trend runs the other way from the p-block",
          body: "In group 14 the lower state gets more stable down the group. In a d-block group the HIGHER state does. So 'Cr(VI) is more stable than Mo(VI)' is false, and that is exactly why \\(\\mathrm{CrO_3}\\) is the stronger oxidant.",
        },
        {
          title: "Scandium has no +4",
          body: "Sc loses 3d¹4s² to reach the argon core and stops. A statement giving Sc a +4 state, oxidising or not, is false.",
        },
      ],
    },

    // C2 — electrode potentials
    {
      kind: "reference" as const,
      slug: "jcdfb-electrode-potentials",
      name: "E° values: which ions reduce acid and which oxidise",
      intuition:
        "An E° value measures how much an ion wants electrons. A negative E°(M³⁺/M²⁺) means M²⁺ would rather lose an electron, so it reduces H⁺ to hydrogen. A large positive one means M³⁺ grabs electrons, so it is a strong oxidant. The stable shells explain the extremes: Cr²⁺ loses an electron to reach a half-filled t₂g³, and Mn³⁺ gains one to reach 3d⁵.",
      definition:
        "- **M²⁺/M**: negative for every 3d metal except Cu (+0.34 V). So Cu does not liberate hydrogen from dilute acids.\n" +
        "- Mn, Ni and Zn are more negative than the trend predicts: \\(\\mathrm{Mn^{2+}}\\) is 3d⁵, \\(\\mathrm{Zn^{2+}}\\) is 3d¹⁰, and \\(\\mathrm{Ni^{2+}}\\) has a very negative hydration enthalpy.\n" +
        "- **M³⁺/M²⁺**: Ti, V and Cr are negative, so \\(\\mathrm{Ti^{2+}}\\), \\(\\mathrm{V^{2+}}\\) and \\(\\mathrm{Cr^{2+}}\\) are reductants that liberate hydrogen from dilute acid.\n" +
        "- Mn (+1.57) and Co (+1.97) are large and positive, so \\(\\mathrm{Mn^{3+}}\\) and \\(\\mathrm{Co^{3+}}\\) are strong oxidants. Fe (+0.77) is lower, because \\(\\mathrm{Fe^{3+}}\\) is already 3d⁵.\n" +
        "- The hydration enthalpy of \\(\\mathrm{Mn^{2+}}\\) is the least negative of the 2+ ions: a 3d⁵ ion gains no crystal-field stabilisation.\n" +
        "- In a combined question, find the ion from the E° clue, then count its d electrons as a free gaseous ion for the magnetic moment.",
      table: {
        columns: ["Metal", "E° of M²⁺/M (V)", "E° of M³⁺/M²⁺ (V)", "What it means"],
        rows: [
          { cells: ["Ti", "−1.63", "−0.37", "Ti²⁺ is a reductant and liberates hydrogen"] },
          { cells: ["V", "−1.18", "−0.26", "V²⁺ is a reductant and liberates hydrogen"] },
          { cells: ["Cr", "−0.90", "−0.41", "Cr²⁺ is a strong reductant: it becomes Cr³⁺, d³"] },
          { cells: ["Mn", "−1.18", "+1.57", "Mn³⁺ is a strong oxidant: it becomes Mn²⁺, d⁵"] },
          { cells: ["Fe", "−0.44", "+0.77", "Fe³⁺ is a mild oxidant; lower than Mn because Fe³⁺ is d⁵"] },
          { cells: ["Co", "−0.28", "+1.97", "Co³⁺ is the strongest oxidant of the series in water"] },
          { cells: ["Ni", "−0.25", "No simple Ni³⁺ in water", "Ni²⁺ is the stable ion"] },
          { cells: ["Cu", "+0.34", "No Cu³⁺ in water", "The only positive M²⁺/M value: Cu gives no hydrogen with dilute acid"], noteAmber: "Cu has the highest M²⁺/M value of the 3d series." },
          { cells: ["Zn", "−0.76", "No Zn³⁺ in water", "Zn²⁺ (d¹⁰) is the only ion"] },
        ],
        caption: "Negative M³⁺/M²⁺: the 2+ ion reduces acid. Large positive M³⁺/M²⁺: the 3+ ion is a strong oxidant.",
      },
      selfCheckExample: {
        prompt:
          "Using the M²⁺/M values, which of Zn, Fe, Ni and Cu does not give hydrogen with dilute hydrochloric acid?",
        steps: [
          "A metal liberates hydrogen when its M²⁺/M potential is below 0 V.",
          "Zn −0.76, Fe −0.44 and Ni −0.25 are negative; Cu is +0.34.",
        ],
        answer: "Copper.",
      },
      practiceSet: [
        { prompt: "How many of \\(\\mathrm{Ti^{2+}}\\), \\(\\mathrm{V^{2+}}\\) and \\(\\mathrm{Cr^{2+}}\\) liberate hydrogen from dilute acid?", answer: "All 3" },
        { prompt: "Stronger oxidant: \\(\\mathrm{Mn^{3+}}\\) or \\(\\mathrm{Fe^{3+}}\\)?", answer: "\\(\\mathrm{Mn^{3+}}\\)" },
        { prompt: "Which 2+ ion of the 3d series has the least negative hydration enthalpy?", answer: "\\(\\mathrm{Mn^{2+}}\\)" },
        { prompt: "Is E°(Fe³⁺/Fe²⁺) greater than E°(Mn³⁺/Mn²⁺)?", answer: "No: +0.77 V against +1.57 V" },
        { prompt: "Which of \\(\\mathrm{Ti^{2+}}\\), \\(\\mathrm{V^{2+}}\\), \\(\\mathrm{Cr^{2+}}\\) and \\(\\mathrm{Co^{2+}}\\) cannot liberate hydrogen from dilute acid, and what is its spin-only moment as a free ion?", answer: "\\(\\mathrm{Co^{2+}}\\) (E° of Co³⁺/Co²⁺ is +1.97 V); 3d⁷, 3 unpaired: 3.87 BM" },
      ],
      pyqExampleId: "7f23b2a7-1271-440b-9a61-df890d11f902", // 2023 — V2+ and Cr2+ liberate H2 (E° values given)
      traps: [
        {
          title: "Iron's M³⁺/M²⁺ value is not above manganese's",
          body: "\\(\\mathrm{Fe^{3+}}\\) is already 3d⁵, so it gains little by taking an electron: +0.77 V. \\(\\mathrm{Mn^{3+}}\\) reaches 3d⁵ by taking one: +1.57 V. A statement that iron's value is greater is false.",
        },
        {
          title: "Count the free ion unless a complex is named",
          body: "When a question pairs an E° clue with a magnetic moment 'in the gaseous state' or with no ligand named, count the free ion. \\(\\mathrm{Co^{3+}}\\) is 3d⁶ with 4 unpaired electrons as a free ion, although its complex with water is low spin.",
        },
      ],
    },

    // C3 — copper(I) and copper(II)
    {
      kind: "formula" as const,
      slug: "jcdfb-copper",
      name: "Why Cu²⁺ is the stable copper ion in water",
      intuition:
        "Cu⁺ has the tidy 3d¹⁰ configuration, so it looks like the more stable ion. In water it is not. The small, doubly charged Cu²⁺ attracts water so strongly that its hydration enthalpy is far more negative than that of Cu⁺, and this more than pays for the second ionisation enthalpy. So Cu⁺ disproportionates in water.",
      definition:
        "- **Disproportionation**: \\(\\mathrm{2Cu^{+}(aq) \\rightarrow Cu^{2+}(aq) + Cu(s)}\\).\n" +
        "- The reason is the MORE negative hydration enthalpy of \\(\\mathrm{Cu^{2+}}\\), not a smaller one.\n" +
        "- Cu(I) compounds that are insoluble survive: CuCl, CuI, \\(\\mathrm{Cu_2O}\\). They are white or colourless in the solid (except \\(\\mathrm{Cu_2O}\\), red) because Cu⁺ is 3d¹⁰.\n" +
        "- **Cu²⁺ with iodide**: \\(\\mathrm{2Cu^{2+} + 4I^{-} \\rightarrow Cu_2I_2(s) + I_2}\\). \\(\\mathrm{Cu_2I_2}\\) and CuI are the same white solid. \\(\\mathrm{CuI_2}\\) does not exist.\n" +
        "- The iodine is titrated with thiosulphate: \\(\\mathrm{I_2 + 2Na_2S_2O_3 \\rightarrow 2NaI + Na_2S_4O_6}\\) (sodium tetrathionate).\n" +
        "- So one \\(\\mathrm{Cu^{2+}}\\) uses one thiosulphate in the end: this is the iodometric estimation of copper.",
      formula: {
        label: "Iodometry of copper(II)",
        latex: "\\mathrm{2Cu^{2+} + 4I^{-} \\rightarrow Cu_2I_2 + I_2} \\qquad \\mathrm{I_2 + 2S_2O_3^{2-} \\rightarrow 2I^{-} + S_4O_6^{2-}}",
      },
      authoredExample: {
        prompt:
          "A solution containing 0.02 mol of \\(\\mathrm{CuSO_4}\\) is treated with excess KI. How many moles of iodine are released, and how many moles of \\(\\mathrm{Na_2S_2O_3}\\) are needed to titrate it?",
        steps: [
          "\\(\\mathrm{2Cu^{2+} \\rightarrow 1\\,I_2}\\), so iodine \\(= 0.02/2 = 0.01\\) mol.",
          "\\(\\mathrm{1\\,I_2 \\rightarrow 2\\,S_2O_3^{2-}}\\), so thiosulphate \\(= 2 \\times 0.01 = 0.02\\) mol.",
          "Check: one thiosulphate per copper ion, as expected.",
        ],
        answer: "0.01 mol of \\(\\mathrm{I_2}\\); 0.02 mol of \\(\\mathrm{Na_2S_2O_3}\\).",
      },
      selfCheckExample: {
        prompt:
          "One solid is CuCl and the other is \\(\\mathrm{CuSO_4 \\cdot 5H_2O}\\). Which is blue and paramagnetic, and which is white and diamagnetic?",
        steps: [
          "CuCl contains Cu⁺, which is 3d¹⁰: no unpaired electron and no d–d transition.",
          "The hydrated sulphate contains Cu²⁺, 3d⁹: one unpaired electron and a d–d transition in the visible.",
        ],
        answer: "\\(\\mathrm{CuSO_4 \\cdot 5H_2O}\\) is blue and paramagnetic; CuCl is white and diamagnetic.",
      },
      practiceSet: [
        { prompt: "Products when Cu⁺ is put in water?", answer: "Cu²⁺ and Cu" },
        { prompt: "White precipitate from Cu²⁺ and KI?", answer: "\\(\\mathrm{Cu_2I_2}\\) (CuI)" },
        { prompt: "Sulphur product when iodine reacts with thiosulphate?", answer: "Tetrathionate, \\(\\mathrm{S_4O_6^{2-}}\\)" },
        { prompt: "Does copper liberate hydrogen from dilute HCl?", answer: "No: E°(Cu²⁺/Cu) = +0.34 V" },
      ],
      pyqExampleId: "9ee25a0c-6fbf-44ff-b2e4-716e7d04bc42", // 2023 — Cu2+ more stable; the hydration-enthalpy reason as stated is false
      traps: [
        {
          title: "The hydration enthalpy of Cu²⁺ is larger, not smaller",
          body: "Cu²⁺ is stable in water BECAUSE its hydration enthalpy is much more negative than that of Cu⁺. A reason that says it is 'much less' than that of Cu⁺ is false, even when the assertion beside it is true.",
        },
        {
          title: "Cu₂I₂ and CuI are one compound",
          body: "\\(\\mathrm{Cu_2I_2}\\) is only CuI written for two copper atoms. When both appear as options, they name the same white precipitate.",
        },
      ],
    },
  ],
  related: [
    { label: "Electronic Configuration and General Properties — the stable shells behind these values", href: `${BASE}/jch-dfb-config` },
    { label: "Oxides of Transition Metals — oxidation state and acidity", href: `${BASE}/jch-dfb-oxides` },
  ],
};
