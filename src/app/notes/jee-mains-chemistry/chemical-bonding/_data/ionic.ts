import type { SubtopicNote } from "@/app/notes/_types";

export const IONIC_BOND_NOTE: SubtopicNote = {
  subtopicName: "Ionic Bonding, Lattice Enthalpy and Fajans' Rules",
  title: "Ionic Bonding, Lattice Enthalpy and Fajans' Rules",
  oneLineDefinition:
    "An ionic solid is held by its lattice enthalpy, found from a Born-Haber cycle, and Fajans' rules say how far a small or highly charged cation distorts the anion and gives the bond covalent character.",
  whyItMatters:
    "Nine PYQs, seven of them multiple choice, and one from 2026. Four use the Born-Haber cycle or lattice enthalpy: for a lattice enthalpy, a bond enthalpy, a melting-point order or an order of ionic character. Five rank compounds by covalent character with Fajans' rules. Two ideas cover the page.",
  concepts: [
    // C1 — Born-Haber cycle and lattice enthalpy
    {
      kind: "formula" as const,
      slug: "jcbond-born-haber",
      name: "The Born-Haber cycle and lattice enthalpy",
      intuition:
        "You cannot measure a lattice enthalpy directly, but Hess's law lets you walk round it. Take the metal and non-metal from their standard states to gaseous ions step by step, then let the ions fall together into the solid. The total must equal the enthalpy of formation.",
      definition:
        "- Steps for \\(\\mathrm{M(s) + \\tfrac{1}{2}X_2(g) \\rightarrow MX(s)}\\): sublimation of M, ionisation of M, half the X–X bond enthalpy, electron gain by X, then the ions forming the lattice.\n" +
        "- \\(\\Delta_f H = \\Delta_{sub}H + \\Delta_i H + \\tfrac{1}{2}\\Delta_{diss}H + \\Delta_{eg}H + \\Delta_{lattice}H\\), with the lattice term for ions coming TOGETHER (negative).\n" +
        "- If the data give the lattice enthalpy as the solid breaking into ions (positive), subtract it instead.\n" +
        "- Lattice enthalpy grows with the ion charges and falls as the ions get larger: \\(|\\Delta_{lattice}H| \\propto \\dfrac{z^+ z^-}{r^+ + r^-}\\). Melting points follow it.\n" +
        "- For one cation with several partners, the partner with the more negative electron gain enthalpy forms the more ionic compound.",
      formula: {
        label: "Born-Haber cycle",
        latex:
          "\\Delta_f H = \\Delta_{sub}H + \\Delta_i H + \\tfrac{1}{2}\\Delta_{diss}H + \\Delta_{eg}H + \\Delta_{lattice}H",
      },
      authoredExample: {
        prompt:
          "For NaCl: sublimation of Na \\(= 108\\), ionisation enthalpy of Na \\(= 496\\), bond enthalpy of \\(\\mathrm{Cl_2}\\) \\(= 242\\), electron gain enthalpy of Cl \\(= -349\\) and \\(\\Delta_f H(\\mathrm{NaCl}) = -411\\), all in kJ mol\\(^{-1}\\). Find the lattice enthalpy of NaCl.",
        steps: [
          "Half the bond enthalpy: \\(\\tfrac{1}{2}(242) = 121\\).",
          "Sum of the steps up to gaseous ions: \\(108 + 496 + 121 - 349 = 376\\).",
          "\\(-411 = 376 + \\Delta_{lattice}H\\), so \\(\\Delta_{lattice}H = -787\\) kJ mol\\(^{-1}\\).",
        ],
        answer: "\\(-787\\) kJ mol\\(^{-1}\\) for forming the lattice; its magnitude is 787.",
      },
      selfCheckExample: {
        prompt:
          "For KCl: sublimation of K \\(= 89\\), ionisation enthalpy of K \\(= 419\\), bond enthalpy of \\(\\mathrm{Cl_2}\\) \\(= 242\\), electron gain enthalpy of Cl \\(= -349\\), lattice enthalpy (ions to solid) \\(= -717\\), all in kJ mol\\(^{-1}\\). Find \\(\\Delta_f H\\) of KCl.",
        steps: [
          "\\(\\Delta_f H = 89 + 419 + 121 - 349 - 717\\).",
          "\\(89 + 419 + 121 = 629\\); \\(629 - 349 = 280\\); \\(280 - 717 = -437\\).",
        ],
        answer: "\\(-437\\) kJ mol\\(^{-1}\\).",
      },
      practiceSet: [
        { prompt: "Which has the higher lattice enthalpy, MgO or NaCl?", answer: "MgO (ion charges 2+ and 2−)" },
        { prompt: "Which has the higher melting point, NaF or NaBr?", answer: "NaF (the smaller anion)" },
        { prompt: "In the cycle for \\(\\mathrm{CaCl_2}\\), how much of the Cl–Cl bond enthalpy is used?", answer: "One full bond enthalpy (two Cl atoms)" },
        { prompt: "Element E bonds with P (\\(\\Delta_{eg}H = -300\\)) and Q (\\(\\Delta_{eg}H = -340\\)). Which product is more ionic?", answer: "EQ" },
      ],
      pyqExampleId: "7d1e21b3-bc8a-46fc-8b8f-98e0cda575c4", // 2026 — magnitude of the lattice enthalpy of LiF
      traps: [
        {
          title: "Half the bond enthalpy, not all of it",
          body: "One formula unit of MX needs one X atom, which is half an \\(\\mathrm{X_2}\\) molecule. Adding the whole bond enthalpy shifts the answer by half of it.",
        },
        {
          title: "Check which way the lattice step runs",
          body: "Lattice enthalpy is quoted both for the solid breaking into ions (positive) and for ions forming the solid (negative). Write the step in the direction of the cycle and give it the matching sign, then answer with the magnitude if that is what is asked.",
        },
      ],
    },

    // C2 — Fajans' rules
    {
      kind: "reference" as const,
      slug: "jcbond-fajans",
      name: "Fajans' rules and covalent character",
      intuition:
        "A cation pulls on the electron cloud of the anion next to it. A small, highly charged cation pulls hard, and a large anion's cloud is easy to pull. The more the cloud is drawn in between the two ions, the more the bond is shared, so it becomes more covalent.",
      definition:
        "- Covalent character rises as the cation gets smaller: \\(\\mathrm{Li^+ > Na^+ > K^+ > Cs^+}\\).\n" +
        "- It rises with the cation's charge: \\(\\mathrm{Sn^{4+}}\\) compounds are more covalent than \\(\\mathrm{Sn^{2+}}\\) ones.\n" +
        "- It rises as the anion gets larger: \\(\\mathrm{I^- > Br^- > Cl^- > F^-}\\).\n" +
        "- A cation with an 18-electron outer shell (\\(\\mathrm{Cu^+}\\), \\(\\mathrm{Ag^+}\\), \\(\\mathrm{Zn^{2+}}\\)) polarises more than a noble-gas cation of the same size and charge, because its d electrons shield the nucleus poorly.\n" +
        "- Between two atoms, ionic character grows with their electronegativity difference.",
      table: {
        columns: ["Rule", "Order of covalent character", "Why"],
        rows: [
          { cells: ["Smaller cation", "\\(\\mathrm{LiCl > NaCl > KCl > CsCl}\\)", "\\(\\mathrm{Li^+}\\) is the smallest and most polarising"] },
          { cells: ["Higher cation charge", "\\(\\mathrm{AlCl_3 > MgCl_2 > NaCl}\\); \\(\\mathrm{SnCl_4 > SnCl_2}\\)", "More charge on a smaller ion"] },
          { cells: ["Larger anion", "\\(\\mathrm{CaI_2 > CaBr_2 > CaCl_2 > CaF_2}\\); \\(\\mathrm{KI > KF}\\)", "\\(\\mathrm{I^-}\\) has the largest, softest cloud"] },
          { cells: ["18-electron cation", "\\(\\mathrm{CuCl > NaCl}\\); \\(\\mathrm{AgCl > KCl}\\)", "d electrons shield the nuclear charge poorly"] },
          { cells: ["Electronegativity difference", "Ionic character: \\(\\mathrm{N_2 < ClF_3 < SO_2 < K_2O < LiF}\\)", "\\(\\Delta\\chi\\) is 0 for \\(\\mathrm{N_2}\\), about 0.8 for Cl–F, 0.9 for S–O"] },
        ],
        caption: "The same polarisation that adds covalent character lowers the melting point and the solubility in water.",
      },
      selfCheckExample: {
        prompt: "Arrange \\(\\mathrm{BeCl_2}\\), \\(\\mathrm{MgCl_2}\\) and \\(\\mathrm{BaCl_2}\\) in decreasing covalent character.",
        steps: [
          "All three have the same anion and a 2+ cation.",
          "The cation size grows \\(\\mathrm{Be^{2+} < Mg^{2+} < Ba^{2+}}\\), so the polarising power falls in that order.",
        ],
        answer: "\\(\\mathrm{BeCl_2 > MgCl_2 > BaCl_2}\\).",
      },
      practiceSet: [
        { prompt: "Which is more covalent, LiI or LiF?", answer: "LiI" },
        { prompt: "Which is more covalent, \\(\\mathrm{FeCl_3}\\) or \\(\\mathrm{FeCl_2}\\)?", answer: "\\(\\mathrm{FeCl_3}\\)" },
        { prompt: "Why is AgCl less ionic than KCl?", answer: "\\(\\mathrm{Ag^+}\\) has an 18-electron shell and polarises \\(\\mathrm{Cl^-}\\) more" },
        { prompt: "Which bond is more ionic, C–F or C–Cl?", answer: "C–F (larger electronegativity difference)" },
      ],
      pyqExampleId: "5c18d64f-a5c1-447e-ba0f-87329f5ec681", // 2023 — pick the correct pairs of covalent-character orders
      traps: [
        {
          title: "A bigger cation means LESS covalent",
          body: "Size works in opposite directions for the two ions. A large anion raises covalent character; a large cation lowers it. So KF is less covalent than LiF, and KI is more covalent than KF.",
        },
        {
          title: "Rank electron gain by magnitude",
          body: "For one metal bonded to several non-metals, the most ionic product comes from the partner that releases the most energy on gaining an electron, the most negative value. Ranking the values as signed numbers puts the order backwards.",
        },
      ],
    },
  ],
};
