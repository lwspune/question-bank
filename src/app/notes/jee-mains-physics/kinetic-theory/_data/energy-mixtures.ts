import type { SubtopicNote } from "@/app/notes/_types";

export const ENERGY_MIXTURES_KTG_NOTE: SubtopicNote = {
  subtopicName: "Internal Energy and Gas Mixtures",
  title: "Internal Energy and Gas Mixtures",
  oneLineDefinition:
    "The internal energy of an ideal gas is n(f/2)RT, all of it kinetic; a mixture behaves like one gas whose degrees of freedom and Cv are mole-weighted averages, and gases mixed at different temperatures share their total energy.",
  whyItMatters:
    "Eighteen PYQs, four of them asking for a number, and one from 2026. Ten find an internal energy or the heat needed to change it, and eight replace a mixture by one equivalent gas or find the temperature after mixing. Weight everything by moles, and average f or Cv, never γ.",
  concepts: [
    // C1 — internal energy
    {
      kind: "formula" as const,
      slug: "jpktg-internal-energy",
      name: "Internal energy U = n(f/2)RT",
      intuition:
        "The molecules of an ideal gas do not attract each other, so there is no potential energy between them: the internal energy is all kinetic, (f/2)kT per molecule. It depends on the temperature alone. Because nRT = PV, the internal energy can also be found from the pressure and volume without knowing T.",
      definition:
        "- \\(U = n\\dfrac{f}{2}RT = N\\dfrac{f}{2}kT = \\dfrac{f}{2}PV\\).\n" +
        "- \\(\\Delta U = nC_v\\Delta T\\) for any process; at constant volume the heat supplied is exactly this: \\(Q = nC_v\\Delta T\\).\n" +
        "- The translational part alone is \\(\\dfrac{3}{2}nRT\\).\n" +
        "- To multiply \\(v_{rms}\\) by a factor k, multiply the kelvin temperature by \\(k^{2}\\).\n" +
        "- A mixture: add the internal energies of its parts, \\(U = \\sum n_i\\dfrac{f_i}{2}RT\\).\n" +
        "- An insulated container of gas moving at speed v and stopped suddenly: the ordered kinetic energy, \\(\\tfrac{1}{2}Mv^{2}\\) per mole, becomes internal energy, so \\(C_v\\Delta T = \\tfrac{1}{2}Mv^{2}\\).",
      formula: {
        label: "Internal energy of an ideal gas",
        latex: "U = n\\frac{f}{2}RT = \\frac{f}{2}PV \\qquad \\Delta U = nC_v\\Delta T",
      },
      authoredExample: {
        prompt:
          "A vessel holds 3 mol of neon and 2 mol of nitrogen at temperature T. Ignoring vibration, find the total internal energy, and its value at 300 K. \\((R = 8.31)\\)",
        steps: [
          "Neon: \\(f = 3\\), so \\(3 \\times \\dfrac{3}{2}RT = 4.5RT\\).",
          "Nitrogen, rigid: \\(f = 5\\), so \\(2 \\times \\dfrac{5}{2}RT = 5RT\\).",
          "\\(U = 9.5RT\\). At 300 K: \\(9.5 \\times 8.31 \\times 300 \\approx 2.37 \\times 10^{4}\\ \\text{J}\\).",
        ],
        answer: "\\(9.5RT\\); about \\(2.37 \\times 10^{4}\\ \\text{J}\\)",
      },
      selfCheckExample: {
        prompt:
          "How much heat, at constant volume, raises the rms speed of the molecules in 0.5 mol of helium at 200 K by a factor of \\(\\sqrt{2}\\)? \\((R = 8.31)\\)",
        steps: [
          "\\(v_{rms} \\propto \\sqrt{T}\\), so T doubles: 200 K to 400 K, \\(\\Delta T = 200\\ \\text{K}\\).",
          "\\(Q = nC_v\\Delta T = 0.5 \\times \\dfrac{3}{2} \\times 8.31 \\times 200 \\approx 1247\\ \\text{J}\\).",
        ],
        answer: "About 1247 J",
      },
      practiceSet: [
        { prompt: "Internal energy of the air in a 2 m³ box at \\(10^{5}\\ \\text{Pa}\\) (treat air as a rigid diatomic gas)?", answer: "\\(5 \\times 10^{5}\\ \\text{J}\\)", method: "\\(\\tfrac{5}{2}PV\\)." },
        { prompt: "Total energy of 6 rigid diatomic molecules at temperature T?", answer: "\\(15kT\\)" },
        { prompt: "Heat to warm 3 mol of argon by 10 K at constant volume \\((R = 8.3)\\)?", answer: "373.5 J" },
        { prompt: "An insulated box of monatomic gas of molar mass M moves at speed v and is stopped. Rise in temperature?", answer: "\\(\\dfrac{Mv^{2}}{3R}\\)", method: "\\(\\tfrac{3}{2}R\\Delta T = \\tfrac{1}{2}Mv^{2}\\)." },
      ],
      pyqExampleId: "84bb8d28-737e-4ebe-8c3a-1aa986b7cea7", // 31 Jan 2024: 8 mol argon + 6 mol oxygen
      traps: [
        {
          title: "k for molecules, R for moles",
          body: "Ten molecules carry an energy measured in kT; ten moles carry one measured in RT. The options often offer both with the same number in front.",
        },
        {
          title: "\"Neglect vibration\" sets f = 5",
          body: "A diatomic gas with vibration ignored is rigid: f = 5, not 7. Only an explicit vibrational mode adds 2.",
        },
      ],
    },

    // C2 — mixtures
    {
      kind: "formula" as const,
      slug: "jpktg-mixtures",
      name: "A mixture as one equivalent gas, and the temperature after mixing",
      intuition:
        "In a mixture the energies add, so the heat capacity of the whole is the sum of the parts. Divide by the total moles and you get the mixture's Cv: a mole-weighted mean. The same holds for f, and γ then follows from 1 + 2/f. When gases at different temperatures are mixed with no energy lost, the total internal energy before equals the total after, which fixes the final temperature.",
      definition:
        "- \\(f_{mix} = \\dfrac{n_1f_1 + n_2f_2}{n_1 + n_2}\\), \\(C_{v,mix} = \\dfrac{n_1C_{v1} + n_2C_{v2}}{n_1 + n_2} = \\dfrac{f_{mix}}{2}R\\).\n" +
        "- \\(C_{p,mix} = C_{v,mix} + R\\), \\(\\gamma_{mix} = 1 + \\dfrac{2}{f_{mix}}\\). Equivalently \\(\\dfrac{n_1 + n_2}{\\gamma_{mix} - 1} = \\dfrac{n_1}{\\gamma_1 - 1} + \\dfrac{n_2}{\\gamma_2 - 1}\\).\n" +
        "- Mixing at different temperatures with no loss: \\(T = \\dfrac{\\sum n_if_iT_i}{\\sum n_if_i}\\). If all the f are equal, this is the mole-weighted mean of the temperatures.\n" +
        "- Speed of sound \\(v_s = \\sqrt{\\gamma RT/M}\\) and \\(v_{rms} = \\sqrt{3RT/M}\\), so \\(\\dfrac{v_{rms}}{v_s} = \\sqrt{\\dfrac{3}{\\gamma}}\\). In a mixture use \\(\\gamma_{mix}\\) and the mole-weighted molar mass.",
      formula: {
        label: "Equivalent gas",
        latex: "f_{mix} = \\frac{n_1f_1 + n_2f_2}{n_1 + n_2} \\qquad \\gamma_{mix} = 1 + \\frac{2}{f_{mix}}",
      },
      authoredExample: {
        prompt:
          "2 mol of helium are mixed with 3 mol of a rigid diatomic gas. Find \\(C_v\\), \\(C_p\\) and \\(\\gamma\\) for the mixture.",
        steps: [
          "\\(f_{mix} = \\dfrac{2 \\times 3 + 3 \\times 5}{5} = \\dfrac{21}{5} = 4.2\\).",
          "\\(C_v = \\dfrac{4.2}{2}R = 2.1R\\); \\(C_p = 3.1R\\).",
          "\\(\\gamma = \\dfrac{3.1}{2.1} = \\dfrac{31}{21} \\approx 1.48\\).",
        ],
        answer: "\\(2.1R\\), \\(3.1R\\), \\(\\gamma \\approx 1.48\\)",
      },
      selfCheckExample: {
        prompt:
          "In an insulated container, 3 mol of a monatomic gas at 300 K are mixed with 1 mol of a rigid diatomic gas at 468 K. Find the final temperature.",
        steps: [
          "Weights \\(n_if_i\\): \\(3 \\times 3 = 9\\) and \\(1 \\times 5 = 5\\).",
          "\\(T = \\dfrac{9 \\times 300 + 5 \\times 468}{9 + 5} = \\dfrac{2700 + 2340}{14} = 360\\ \\text{K}\\).",
        ],
        answer: "360 K",
      },
      practiceSet: [
        { prompt: "Equal numbers of moles of a monatomic and a rigid diatomic gas. \\(\\gamma\\) of the mixture?", answer: "1.5", method: "\\(f_{mix} = 4\\)." },
        { prompt: "How many moles of a monatomic gas, mixed with 1 mol of a gas with f = 6, give \\(f_{mix} = 4\\)?", answer: "2 mol" },
        { prompt: "1 mol of a gas at T is mixed with 3 mol of the same gas at 3T, with no energy lost. Final temperature?", answer: "2.5T" },
        { prompt: "In a gas, \\(v_{rms}/v_s = \\sqrt{9/5}\\). Find \\(\\gamma\\).", answer: "5/3: the gas behaves as monatomic" },
      ],
      pyqExampleId: "370704d5-ef0b-464f-9427-115ee4ec9778", // 29 Jan 2024: N mol of f = 6 gas + 2 mol monatomic
      traps: [
        {
          title: "Averaging γ directly",
          body: "For equal moles of a monatomic and a rigid diatomic gas, the mean of 5/3 and 7/5 is about 1.53, but the true γ is 1.5. Average f or Cv first, then find γ.",
        },
        {
          title: "Weighting temperatures by moles alone",
          body: "When the gases have different f, each one's energy is n(f/2)RT, so the final temperature is weighted by nf, not by n.",
        },
      ],
    },
  ],
};
