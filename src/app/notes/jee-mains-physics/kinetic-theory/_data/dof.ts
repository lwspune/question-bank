import type { SubtopicNote } from "@/app/notes/_types";

export const DOF_KTG_NOTE: SubtopicNote = {
  subtopicName: "Degrees of Freedom and Specific Heats",
  title: "Degrees of Freedom and Specific Heats",
  oneLineDefinition:
    "Each degree of freedom of a molecule holds ½kT of energy on average, so the count f fixes the molar heat capacities, Cv = fR/2 and Cp = Cv + R, and their ratio γ = 1 + 2/f.",
  whyItMatters:
    "Eighteen PYQs, one of them asking for a number, and one from 2026. Five count degrees of freedom or state the equipartition law, and thirteen work with Cv, Cp and γ: a formula in terms of f, a value for a given molecule, or a comparison between two gases. Count each vibrational mode as two, and γ follows straight from 1 + 2/f.",
  concepts: [
    // C1 — counting degrees of freedom (reference)
    {
      kind: "reference" as const,
      slug: "jpktg-dof-count",
      name: "Counting degrees of freedom",
      intuition:
        "A degree of freedom is an independent way for a molecule to hold energy. Every molecule can move in three directions. A linear molecule can also spin about two axes; spin about its own axis stores almost nothing. A non-linear molecule can spin about three. Each mode of vibration stores both kinetic and potential energy, so it counts twice. Equipartition then gives ½kT to every degree of freedom.",
      definition:
        "- Equipartition: average energy \\(\\tfrac{1}{2}kT\\) per degree of freedom per molecule, \\(\\tfrac{1}{2}RT\\) per mole.\n" +
        "- Translation: 3 for every molecule. A monatomic gas has no rotational degrees of freedom.\n" +
        "- Rotation: 2 for a linear molecule (every diatomic, and CO₂), 3 for a non-linear one (H₂O, NH₃, CH₄).\n" +
        "- Vibration: each mode adds 2, one kinetic and one potential. At room temperature most diatomics are rigid, with no vibration.\n" +
        "- Mean energy per molecule \\(= \\dfrac{f}{2}kT\\). For a rigid diatomic, rotation carries \\(kT\\) and translation \\(\\tfrac{3}{2}kT\\).\n" +
        "- In JEE wording, \"triatomic\" without more detail usually means non-linear.",
      table: {
        columns: ["Gas", "f (trans + rot + vib)", "Cv", "Cp", "γ"],
        rows: [
          { cells: ["Monatomic (He, Ne, Ar)", "3 (3 + 0 + 0)", "3R/2", "5R/2", "5/3 ≈ 1.67"] },
          { cells: ["Rigid diatomic (N₂, O₂ near room temperature)", "5 (3 + 2 + 0)", "5R/2", "7R/2", "7/5 = 1.40"] },
          { cells: ["Diatomic with one vibrational mode", "7 (3 + 2 + 2)", "7R/2", "9R/2", "9/7 ≈ 1.29"] },
          { cells: ["Rigid linear triatomic (CO₂)", "5 (3 + 2 + 0)", "5R/2", "7R/2", "7/5 = 1.40"] },
          { cells: ["Rigid non-linear (H₂O, NH₃, CH₄)", "6 (3 + 3 + 0)", "3R", "4R", "4/3 ≈ 1.33"] },
          { cells: ["Non-linear with v vibrational modes", "6 + 2v", "(3 + v)R", "(4 + v)R", "(4 + v)/(3 + v)"], noteAmber: "Each vibrational mode adds 2 to f, so it adds R to both Cv and Cp." },
        ],
        caption: "\\(\\gamma = 1 + 2/f\\): more degrees of freedom always means a smaller \\(\\gamma\\).",
      },
      selfCheckExample: {
        prompt:
          "Find the number of degrees of freedom and the mean energy per mole at 400 K for (a) argon, (b) rigid CO₂, (c) a diatomic gas with one vibrational mode. \\((R = 8.31)\\)",
        steps: [
          "\\(RT = 8.31 \\times 400 = 3324\\ \\text{J}\\); energy per mole \\(= \\dfrac{f}{2}RT\\).",
          "(a) \\(f = 3\\): \\(1.5 \\times 3324 = 4986\\ \\text{J}\\).",
          "(b) linear, \\(f = 5\\): \\(2.5 \\times 3324 = 8310\\ \\text{J}\\).",
          "(c) \\(f = 3 + 2 + 2 = 7\\): \\(3.5 \\times 3324 = 11\\,634\\ \\text{J}\\).",
        ],
        answer: "3, 5 and 7; 4986 J, 8310 J and 11 634 J",
      },
      practiceSet: [
        { prompt: "Degrees of freedom of a rigid CO₂ molecule?", answer: "5: it is linear" },
        { prompt: "A non-linear molecule with three vibrational modes: f?", answer: "12" },
        { prompt: "Mean rotational energy of one rigid diatomic molecule at temperature T?", answer: "\\(kT\\)" },
        { prompt: "Why does a linear molecule have only two rotational degrees of freedom?", answer: "Its moment of inertia about its own axis is almost zero, so spin about that axis stores almost no energy" },
      ],
      pyqExampleId: "dd8f8817-a872-403a-a72a-4545515449fc", // 4 Apr 2024: translational and rotational f of CH4
      traps: [
        {
          title: "Counting a vibrational mode once",
          body: "A vibration stores kinetic and potential energy, so one mode adds 2 to f. Counting it as 1 gives the wrong Cv and γ.",
        },
        {
          title: "Linear and non-linear triatomics",
          body: "CO₂ is a straight line and has 5 degrees of freedom when rigid; H₂O is bent and has 6. The shape, not the number of atoms, decides the rotations.",
        },
      ],
    },

    // C2 — Cv, Cp, gamma
    {
      kind: "formula" as const,
      slug: "jpktg-gamma",
      name: "Cv, Cp and γ from the degrees of freedom",
      intuition:
        "One mole of an ideal gas has internal energy (f/2)RT, so warming it by 1 K at constant volume takes (f/2)R: that is Cv. At constant pressure the gas also expands and does work R for every kelvin, so Cp = Cv + R. Their ratio γ = 1 + 2/f falls as f grows, because the extra R becomes a smaller share of a bigger Cv.",
      definition:
        "- \\(C_v = \\dfrac{f}{2}R\\), \\(C_p = \\left(\\dfrac{f}{2} + 1\\right)R\\), \\(C_p - C_v = R\\) (Mayer's relation, per mole of ideal gas).\n" +
        "- \\(\\gamma = \\dfrac{C_p}{C_v} = 1 + \\dfrac{2}{f}\\); \\(\\dfrac{C_v}{C_p} = \\dfrac{f}{f + 2}\\); \\(f = \\dfrac{2}{\\gamma - 1}\\).\n" +
        "- In terms of \\(\\gamma\\): \\(C_v = \\dfrac{R}{\\gamma - 1}\\), \\(C_p = \\dfrac{\\gamma R}{\\gamma - 1}\\).\n" +
        "- \\(\\Delta U = nC_v\\Delta T = \\dfrac{nR\\,\\Delta T}{\\gamma - 1}\\) for any process between two temperatures.\n" +
        "- In the classical theory \\(\\gamma\\) does not depend on temperature, as long as no new mode of motion switches on.\n" +
        "- To compare two gases, find each \\(\\gamma\\) from its own f, then divide.",
      formula: {
        label: "Heat capacities of an ideal gas",
        latex: "C_v = \\frac{f}{2}R \\qquad C_p = C_v + R \\qquad \\gamma = 1 + \\frac{2}{f}",
      },
      authoredExample: {
        prompt:
          "Find Cv, Cp and γ for a rigid non-linear triatomic gas, and the ratio of the γ of a rigid diatomic gas to this one.",
        steps: [
          "Non-linear and rigid: \\(f = 3 + 3 = 6\\), so \\(C_v = 3R\\), \\(C_p = 4R\\), \\(\\gamma = \\dfrac{4}{3}\\).",
          "Rigid diatomic: \\(f = 5\\), \\(\\gamma = 1 + \\dfrac{2}{5} = \\dfrac{7}{5}\\).",
          "Ratio: \\(\\dfrac{7/5}{4/3} = \\dfrac{21}{20}\\).",
        ],
        answer: "3R, 4R, 4/3; ratio 21/20",
      },
      selfCheckExample: {
        prompt:
          "An ideal gas has \\(C_p = 29.1\\ \\text{J mol}^{-1}\\text{K}^{-1}\\). Find Cv, γ and f. \\((R = 8.31)\\)",
        steps: [
          "\\(C_v = C_p - R = 29.1 - 8.31 = 20.8\\ \\text{J mol}^{-1}\\text{K}^{-1}\\).",
          "\\(\\gamma = \\dfrac{29.1}{20.8} \\approx 1.40\\).",
          "\\(f = \\dfrac{2C_v}{R} = \\dfrac{41.6}{8.31} \\approx 5\\): a rigid diatomic gas.",
        ],
        answer: "\\(C_v \\approx 20.8\\), \\(\\gamma \\approx 1.40\\), f = 5",
      },
      practiceSet: [
        { prompt: "Degrees of freedom of a gas with \\(\\gamma = 4/3\\)?", answer: "6" },
        { prompt: "\\(C_v/C_p\\) for a gas with f = 7?", answer: "\\(7/9\\)" },
        { prompt: "2 mol of a gas with \\(\\gamma = 1.5\\) warm by 10 K. Change in internal energy \\((R = 8.3)\\)?", answer: "332 J", method: "\\(nR\\Delta T/(\\gamma - 1)\\)." },
        { prompt: "An ideal monatomic gas is heated from 300 K to 600 K. Does \\(\\gamma\\) change?", answer: "No: it stays 5/3" },
      ],
      pyqExampleId: "c0c7adf6-558d-4598-a551-ca76693a677f", // 2 Apr 2025: γA/γB = 1 + 1/n, NAT
      traps: [
        {
          title: "Expecting γ to grow with f",
          body: "γ = 1 + 2/f, so more degrees of freedom give a SMALLER γ. A gas with vibration has a lower γ than the same gas held rigid.",
        },
        {
          title: "Cp − Cv = R is per mole",
          body: "For specific heats per kilogram the difference is R/M. Check the units the question uses before subtracting.",
        },
      ],
    },
  ],
};
