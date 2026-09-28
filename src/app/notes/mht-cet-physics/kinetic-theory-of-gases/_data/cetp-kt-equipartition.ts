import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/kinetic-theory-of-gases";

export const EQUIPARTITION_NOTE: SubtopicNote = {
  subtopicName: "Average KE, Equipartition, and Specific Heats",
  title: "Average Kinetic Energy, Equipartition and Specific Heats",
  oneLineDefinition:
    "At temperature T every molecule has average translational kinetic energy (3/2)kT whatever its mass, and each degree of freedom carries ½kT; counting f degrees of freedom gives C_v = (f/2)R, C_p = C_v + R and γ = 1 + 2/f.",
  whyItMatters:
    "25 PYQs, 3 of them HARD. Ten use the average kinetic energy — it depends only on absolute temperature, and a container brought suddenly to rest turns its motion into heat. " +
    "Fifteen count degrees of freedom to get C_v, C_p and γ, including a mixture of three gases and the same heat given at constant pressure and at constant volume. Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-kt-average-ke",
      name: "Average Kinetic Energy Depends Only on Temperature",
      intuition:
        "The average translational kinetic energy of a molecule is (3/2)kT, the same for every gas at the same temperature — nitrogen and oxygen at one temperature have equal average kinetic energy though their speeds differ. So temperature measures that energy, and it goes as the kelvin temperature: halving the energy halves T in kelvin. An ideal monoatomic gas has no potential energy, so its internal energy is entirely kinetic. When an insulated container moving at speed V stops suddenly, the bulk kinetic energy ½MV² per mole becomes internal energy, n C_v ΔT, so ΔT = MV²/(fR).",
      definition:
        "- \\(\\bar{E} = \\tfrac{3}{2}kT\\) per molecule, independent of mass; \\(\\bar{E} \\propto T\\) (kelvin).\n" +
        "- 399 °C ⇒ E; E/2 at 336 K = 63 °C. 27 °C ⇒ E; 327 °C ⇒ 2E.\n" +
        "- Ideal gas: internal energy is all kinetic.\n" +
        "- Container of molar mass M stopped: \\(\\Delta T = \\dfrac{MV^2}{fR}\\) (monoatomic 3R, rigid diatomic 5R).\n" +
        "- Mean square x-velocity is one third of the mean square speed: \\(\\langle v_x^2 \\rangle = \\dfrac{kT}{m}\\).",
      formula: {
        label: "Average kinetic energy",
        latex: "\\bar{E} = \\frac{3}{2}kT, \\qquad \\text{each degree of freedom } \\tfrac{1}{2}kT",
      },
      authoredExample: {
        prompt: "The average kinetic energy of a gas molecule at 27 °C is 6.2 × 10⁻²¹ J. What is it at 127 °C?",
        steps: ["E ∝ T: 300 K → 400 K.", "E = 6.2 × 10⁻²¹ × 4/3 ≈ 8.3 × 10⁻²¹ J."],
        answer: "≈ 8.3 × 10⁻²¹ J",
      },
      selfCheckExample: {
        prompt: "Ratio of average kinetic energies at 127 °C and 327 °C?",
        steps: ["400 : 600."],
        answer: "2 : 3",
      },
      practiceSet: [
        { prompt: "At a given temperature, which is the same for all molecules on average: velocity, momentum or kinetic energy?", answer: "Kinetic energy" },
        { prompt: "Translational KE of N₂ is 0.042 eV. Of O₂ at double the temperature?", answer: "0.084 eV" },
      ],
      pyqExampleId: "b70c4772-f194-438e-8c50-ba7995f562e6",
      traps: [
        {
          title: "Letting the heavier gas have more kinetic energy",
          body:
            "At one temperature all gases have the same average kinetic energy. Molar mass changes the SPEED, not the energy.",
        },
        {
          title: "Halving the Celsius temperature",
          body:
            "E ∝ T in kelvin. E/2 at 399 °C (672 K) means 336 K, which is 63 °C — not 199.5 °C.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-kt-specific-heats",
      name: "Degrees of Freedom, C_v, C_p and γ",
      intuition:
        "A monoatomic molecule moves in 3 directions: f = 3. A rigid diatomic molecule also rotates about 2 axes: f = 5. A diatomic molecule that vibrates adds 2 more: f = 7. Each degree of freedom holds ½RT per mole, so C_v = (f/2)R, C_p = C_v + R and γ = 1 + 2/f: 5/3, 7/5 and 9/7. Written with γ, C_v = R/(γ − 1) and C_p = γR/(γ − 1), so R/C_v = γ − 1 identifies the gas. For a mixture, add n·C_v over the components and divide by the total moles. Giving the same heat to a gas at constant pressure and at constant volume raises the temperature γ times more at constant volume.",
      definition:
        "- f = 3 (monoatomic), 5 (rigid diatomic), 7 (diatomic with vibration).\n" +
        "- \\(C_v = \\dfrac{f}{2}R\\), \\(C_p = C_v + R\\), \\(\\gamma = 1 + \\dfrac{2}{f}\\).\n" +
        "- \\(C_v = \\dfrac{R}{\\gamma - 1}\\), \\(C_p = \\dfrac{\\gamma R}{\\gamma - 1}\\); \\(\\dfrac{R}{C_v} = 0.4\\) ⇒ rigid diatomic.\n" +
        "- Polyatomic with f vibrational modes: \\(C_v = (3 + f)R\\), \\(\\gamma = \\dfrac{4 + f}{3 + f}\\).\n" +
        "- Mixture: \\(C_{v,\\text{mix}} = \\dfrac{\\sum n_iC_{v,i}}{\\sum n_i}\\) (4 H₂, 2 He, 1 H₂O ⇒ \\(C_p = \\dfrac{23}{7}R\\)).\n" +
        "- Same heat, constant P (A) and constant V (B): \\(\\Delta T_B = \\gamma\\,\\Delta T_A\\) (49 K ⇒ 35 K).\n" +
        "- Per unit mass: \\(C_p - C_v = \\dfrac{R}{M}\\), so \\(\\rho = \\dfrac{P}{T(C_p - C_v)}\\).",
      formula: {
        label: "Equipartition",
        latex: "C_v = \\frac{f}{2}R, \\qquad C_p = C_v + R, \\qquad \\gamma = 1 + \\frac{2}{f}",
      },
      authoredExample: {
        prompt: "Heat needed to raise 14 g of nitrogen (M = 28) by 48 °C at constant pressure?",
        steps: ["n = 0.5 mol; C_p = 7R/2.", "Q = 0.5 × 3.5R × 48 = 84R."],
        answer: "84R",
      },
      selfCheckExample: {
        prompt: "A gas has 6 degrees of freedom. γ?",
        steps: ["1 + 2/6."],
        answer: "4/3",
      },
      practiceSet: [
        { prompt: "Ratio γ(rigid diatomic) : γ(monoatomic)?", answer: "21 : 25" },
        { prompt: "Diatomic gas with one vibrational mode: C_v?", answer: "7R/2" },
      ],
      pyqExampleId: "0220e952-5c13-4a00-9e99-6332f077d22b",
      traps: [
        {
          title: "Averaging the specific heats of a mixture by gas, not by mole",
          body:
            "Weight each C_v by its number of moles. Four moles of hydrogen count four times as much as one mole of water vapour.",
        },
        {
          title: "Counting one vibrational degree of freedom",
          body:
            "A vibrational mode stores both kinetic and potential energy, so it adds 2 to f. A vibrating diatomic has f = 7 and C_v = 7R/2.",
        },
      ],
    },
  ],
  related: [
    { label: "Kinetic Theory — pressure and r.m.s. speed", href: `${BASE}/cetp-kt-kinetic` },
    { label: "Thermodynamics — the first law with C_v and C_p", href: "/notes/mht-cet-physics/thermodynamics/cetp-td-first-law" },
  ],
};
