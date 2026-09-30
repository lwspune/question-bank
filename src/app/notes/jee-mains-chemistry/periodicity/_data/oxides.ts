import type { SubtopicNote } from "@/app/notes/_types";

export const OXIDES_PER_NOTE: SubtopicNote = {
  subtopicName: "Nature of Oxides and Group 14 Trends",
  title: "Nature of Oxides and Group 14 Trends",
  oneLineDefinition:
    "Oxides turn from basic to amphoteric to acidic across a period, a few oxides of nitrogen and carbon are neutral, and in group 14 the oxides grow more basic and the lower oxidation state more stable going down.",
  whyItMatters:
    "Twenty PYQs, seventeen of them multiple choice, and five from 2026. Five follow the change in oxide nature across a period or what an oxide gives with water; eight classify a list of oxides as acidic, basic, amphoteric or neutral, often as a count; seven test group 14, from its oxides to the inert pair effect and bond enthalpies.",
  concepts: [
    // C1 — basic to acidic across a period
    {
      kind: "reference" as const,
      slug: "jcper-oxide-trend",
      name: "Oxides across a period: basic to acidic",
      intuition:
        "A metal oxide gives a hydroxide with water, so it is basic. A non-metal oxide gives an oxoacid, so it is acidic. Across a period the elements turn from metals into non-metals, and their oxides turn from basic, through amphoteric in the middle, to acidic.",
      definition:
        "- Extreme left (group 1): strongly **basic** oxides. Extreme right (group 17): strongly **acidic** oxides.\n" +
        "- Middle: **amphoteric** (reacts with both acids and bases) or **neutral** (reacts with neither).\n" +
        "- Basic strength falls across and rises down: \\(\\mathrm{K_2O > Na_2O > MgO > Al_2O_3}\\).\n" +
        "- A higher oxidation state gives a more acidic oxide.",
      table: {
        columns: ["Oxide", "Nature", "With water"],
        rows: [
          { cells: ["\\(\\mathrm{Na_2O}\\)", "Strongly basic", "\\(\\mathrm{Na_2O + H_2O \\to 2NaOH}\\)"] },
          { cells: ["\\(\\mathrm{MgO}\\)", "Basic", "Forms \\(\\mathrm{Mg(OH)_2}\\), sparingly soluble"] },
          { cells: ["\\(\\mathrm{Al_2O_3}\\)", "Amphoteric", "Insoluble; dissolves in both acids and alkalis"] },
          { cells: ["\\(\\mathrm{SiO_2}\\)", "Acidic", "Insoluble; reacts with hot NaOH to give a silicate"] },
          { cells: ["\\(\\mathrm{P_4O_{10}}\\)", "Acidic", "\\(\\mathrm{P_4O_{10} + 6H_2O \\to 4H_3PO_4}\\)"] },
          { cells: ["\\(\\mathrm{SO_3}\\)", "Acidic", "\\(\\mathrm{SO_3 + H_2O \\to H_2SO_4}\\)"] },
          { cells: ["\\(\\mathrm{Cl_2O_7}\\)", "Strongly acidic", "\\(\\mathrm{Cl_2O_7 + H_2O \\to 2HClO_4}\\)"] },
        ],
        caption: "Period 3 oxides in their highest oxidation states, from sodium to chlorine.",
      },
      selfCheckExample: {
        prompt:
          "\\(\\mathrm{N_2O_5 + H_2O \\to 2X}\\) and \\(\\mathrm{CaO + H_2O \\to Y}\\). Name X and Y and say which oxide is acidic.",
        steps: [
          "\\(\\mathrm{N_2O_5}\\) is a non-metal oxide: it gives nitric acid, so X is \\(\\mathrm{HNO_3}\\).",
          "CaO is a metal oxide: it gives calcium hydroxide, so Y is \\(\\mathrm{Ca(OH)_2}\\).",
        ],
        answer: "X = \\(\\mathrm{HNO_3}\\), Y = \\(\\mathrm{Ca(OH)_2}\\); \\(\\mathrm{N_2O_5}\\) is the acidic oxide.",
      },
      practiceSet: [
        { prompt: "Oxygen atoms in the acid formed from \\(\\mathrm{SO_3}\\) and water?", answer: "4 (\\(\\mathrm{H_2SO_4}\\))" },
        { prompt: "Which is more basic, \\(\\mathrm{K_2O}\\) or MgO?", answer: "\\(\\mathrm{K_2O}\\)" },
        { prompt: "Does an element at the extreme left of the table form acidic oxides?", answer: "No; basic oxides" },
        { prompt: "Which pair is acidic: \\(\\mathrm{B_2O_3}\\) and \\(\\mathrm{SiO_2}\\), or CaO and \\(\\mathrm{SiO_2}\\)?", answer: "\\(\\mathrm{B_2O_3}\\) and \\(\\mathrm{SiO_2}\\)" },
      ],
      pyqExampleId: "e06a71a7-20a5-4f81-936b-ef24ff1486fe", // 2025 — oxides of the extreme left and extreme right
      traps: [
        {
          title: "CO is not acidic",
          body: "\\(\\mathrm{CO_2}\\) is acidic, but CO is neutral: it forms no acid with water and does not react with alkalis. Do not carry the nature of one oxide of an element over to another.",
        },
      ],
    },

    // C2 — classifying a list of oxides
    {
      kind: "reference" as const,
      slug: "jcper-oxide-classify",
      name: "Acidic, basic, amphoteric and neutral oxides",
      intuition:
        "Most counting questions are settled by a short list. Learn the three neutral oxides and the common amphoteric ones; almost everything else is acidic if it comes from a non-metal or a metal in a high oxidation state, and basic if it comes from a metal in a low one.",
      definition:
        "- **Neutral**: CO, NO, \\(\\mathrm{N_2O}\\). Only these three.\n" +
        "- **Amphoteric**: \\(\\mathrm{Al_2O_3}\\), \\(\\mathrm{As_2O_3}\\), \\(\\mathrm{Cr_2O_3}\\), BeO, ZnO, SnO, \\(\\mathrm{SnO_2}\\), PbO, \\(\\mathrm{PbO_2}\\), \\(\\mathrm{V_2O_5}\\).\n" +
        "- **Acidic**: \\(\\mathrm{CO_2}\\), \\(\\mathrm{SiO_2}\\), \\(\\mathrm{B_2O_3}\\), \\(\\mathrm{N_2O_3}\\), \\(\\mathrm{NO_2}\\), \\(\\mathrm{N_2O_5}\\), \\(\\mathrm{P_4O_{10}}\\), \\(\\mathrm{SO_2}\\), \\(\\mathrm{SO_3}\\), \\(\\mathrm{Cl_2O_7}\\), \\(\\mathrm{Mn_2O_7}\\), \\(\\mathrm{CrO_3}\\).\n" +
        "- **Basic**: \\(\\mathrm{Na_2O}\\), \\(\\mathrm{K_2O}\\), MgO, CaO, BaO, \\(\\mathrm{V_2O_3}\\), CrO.\n" +
        "- Hydroxides follow their oxides: \\(\\mathrm{Be(OH)_2}\\) and \\(\\mathrm{Al(OH)_3}\\) are amphoteric, \\(\\mathrm{B(OH)_3}\\) is acidic, NaOH and \\(\\mathrm{Ca(OH)_2}\\) are basic.",
      table: {
        columns: ["Element", "Low oxidation state oxide", "High oxidation state oxide"],
        rows: [
          { cells: ["Nitrogen", "\\(\\mathrm{N_2O}\\), NO: neutral", "\\(\\mathrm{N_2O_3}\\), \\(\\mathrm{NO_2}\\), \\(\\mathrm{N_2O_5}\\): acidic"] },
          { cells: ["Carbon", "CO: neutral", "\\(\\mathrm{CO_2}\\): acidic"] },
          { cells: ["Vanadium", "\\(\\mathrm{V_2O_3}\\): basic", "\\(\\mathrm{V_2O_5}\\): amphoteric"] },
          { cells: ["Chromium", "CrO: basic; \\(\\mathrm{Cr_2O_3}\\): amphoteric", "\\(\\mathrm{CrO_3}\\): acidic"] },
          { cells: ["Manganese", "MnO: basic", "\\(\\mathrm{Mn_2O_7}\\): acidic"] },
          { cells: ["Sulphur", "\\(\\mathrm{SO_2}\\): acidic", "\\(\\mathrm{SO_3}\\): more strongly acidic"] },
        ],
        caption: "For one element, the higher the oxidation state, the more acidic the oxide.",
      },
      selfCheckExample: {
        prompt:
          "How many of these are amphoteric: ZnO, \\(\\mathrm{CO_2}\\), BeO, \\(\\mathrm{SO_2}\\), \\(\\mathrm{Cr_2O_3}\\), \\(\\mathrm{K_2O}\\)?",
        steps: [
          "\\(\\mathrm{CO_2}\\) and \\(\\mathrm{SO_2}\\) are acidic; \\(\\mathrm{K_2O}\\) is basic.",
          "ZnO, BeO and \\(\\mathrm{Cr_2O_3}\\) are amphoteric.",
        ],
        answer: "Three.",
      },
      practiceSet: [
        { prompt: "Name the three neutral oxides.", answer: "CO, NO and \\(\\mathrm{N_2O}\\)" },
        { prompt: "Is \\(\\mathrm{NO_2}\\) neutral or acidic?", answer: "Acidic" },
        { prompt: "Nature of \\(\\mathrm{Mn_2O_7}\\)?", answer: "Acidic" },
        { prompt: "Nature of \\(\\mathrm{B(OH)_3}\\)?", answer: "Acidic" },
      ],
      pyqExampleId: "4e551c07-8fde-4441-bbd7-e793f8b5cfba", // 2022 — count the acidic oxides in a list
      traps: [
        {
          title: "Not every nitrogen oxide is acidic",
          body: "\\(\\mathrm{N_2O}\\) and NO are neutral, while \\(\\mathrm{N_2O_3}\\), \\(\\mathrm{NO_2}\\) and \\(\\mathrm{N_2O_5}\\) are acidic. In a counting question, sort the nitrogen oxides one by one.",
        },
        {
          title: "NO is neutral, not amphoteric",
          body: "\\(\\mathrm{Al_2O_3}\\) is amphoteric, but NO reacts with neither acids nor bases. A statement that calls both amphoteric is false.",
        },
      ],
    },

    // C3 — group 14
    {
      kind: "reference" as const,
      slug: "jcper-group14",
      name: "Group 14: oxides, inert pair effect and bond strength",
      intuition:
        "Group 14 runs from a non-metal (C) through two metalloids (Si, Ge) to two metals (Sn, Pb), so its oxides run from acidic to amphoteric. Going down, the two s electrons are held back more and more (the inert pair effect), so +2 becomes more stable than +4 at lead.",
      definition:
        "- Dioxides: \\(\\mathrm{CO_2}\\), \\(\\mathrm{SiO_2}\\), \\(\\mathrm{GeO_2}\\) acidic; \\(\\mathrm{SnO_2}\\), \\(\\mathrm{PbO_2}\\) amphoteric. \\(\\mathrm{CO_2}\\) is the most acidic.\n" +
        "- Monoxides: CO neutral, GeO acidic, SnO and PbO amphoteric.\n" +
        "- **Inert pair effect**: \\(\\mathrm{Pb^{2+}}\\) is more stable than \\(\\mathrm{Pb^{4+}}\\), so \\(\\mathrm{PbO_2}\\) is an oxidant; \\(\\mathrm{Sn^{4+}}\\) is more stable than \\(\\mathrm{Sn^{2+}}\\), so \\(\\mathrm{SnCl_2}\\) is a reductant.\n" +
        "- Bond enthalpy falls down the group: C–C 348, Si–Si 297, Ge–Ge 260, Sn–Sn 240 kJ mol⁻¹.\n" +
        "- Carbon: \\(^{12}\\mathrm{C}\\) and \\(^{13}\\mathrm{C}\\) are stable, \\(^{14}\\mathrm{C}\\) is radioactive; carbon cannot exceed a covalency of four, having no d orbitals; it shows −4 to +4.",
      table: {
        columns: ["Element", "Class", "Oxides", "Electronegativity", "Melting point (K)"],
        rows: [
          { cells: ["C", "Non-metal", "CO neutral, \\(\\mathrm{CO_2}\\) acidic", "2.5", "4373"] },
          { cells: ["Si", "Metalloid", "\\(\\mathrm{SiO_2}\\) acidic", "1.8", "1693"] },
          { cells: ["Ge", "Metalloid", "GeO and \\(\\mathrm{GeO_2}\\) acidic", "1.8", "1218"] },
          { cells: ["Sn", "Metal", "SnO and \\(\\mathrm{SnO_2}\\) amphoteric", "1.8", "505"], noteAmber: "Tin has the lowest melting point in the group, below lead." },
          { cells: ["Pb", "Metal", "PbO and \\(\\mathrm{PbO_2}\\) amphoteric", "1.9", "600"] },
        ],
        caption: "Electronegativity does not fall steadily from Si to Pb: it stays at 1.8 and then rises to 1.9.",
      },
      selfCheckExample: {
        prompt:
          "\\(\\mathrm{PbO_2}\\) oxidises hot concentrated HCl to chlorine, while \\(\\mathrm{SnCl_2}\\) is used as a reducing agent. Explain both with one idea.",
        steps: [
          "Down group 14 the inert pair effect makes +2 more stable at the bottom.",
          "For lead, +2 is more stable than +4, so \\(\\mathrm{Pb^{4+}}\\) in \\(\\mathrm{PbO_2}\\) takes electrons and is reduced to \\(\\mathrm{Pb^{2+}}\\).",
          "For tin, +4 is more stable than +2, so \\(\\mathrm{Sn^{2+}}\\) gives electrons and is oxidised to \\(\\mathrm{Sn^{4+}}\\).",
        ],
        answer: "The inert pair effect: +2 is preferred for lead, +4 for tin.",
      },
      practiceSet: [
        { prompt: "Which group 14 dioxide is the most acidic?", answer: "\\(\\mathrm{CO_2}\\)" },
        { prompt: "Is GeO acidic or amphoteric?", answer: "Acidic" },
        { prompt: "Which is stronger, the Si–Si or the Ge–Ge bond?", answer: "Si–Si (297 against 260 kJ mol⁻¹)" },
        { prompt: "Which carbon isotope is radioactive?", answer: "\\(^{14}\\mathrm{C}\\)" },
      ],
      pyqExampleId: "7901cd33-9c45-4328-b7c8-f3622e2da972", // 2024 — amphoteric oxides among group 14 oxides
      traps: [
        {
          title: "GeO is not amphoteric",
          body: "SnO and PbO are amphoteric, and it is tempting to extend that to GeO. Germanium's monoxide is distinctly acidic, like its dioxide.",
        },
        {
          title: "Lowest melting point is tin, not lead",
          body: "Lead is lower in the group, but tin melts at 505 K and lead at 600 K. The melting points fall from C to Sn and rise again at Pb.",
        },
      ],
    },
  ],
};
