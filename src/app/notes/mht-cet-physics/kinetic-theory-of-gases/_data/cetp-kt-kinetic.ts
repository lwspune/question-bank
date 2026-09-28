import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/kinetic-theory-of-gases";

export const KINETIC_NOTE: SubtopicNote = {
  subtopicName: "Kinetic Theory — Pressure, RMS Speed, and Temperature",
  title: "Pressure and R.M.S. Speed From Molecular Motion",
  oneLineDefinition:
    "Molecules striking the walls give a pressure P = ⅓ρ⟨v²⟩, which is two thirds of the kinetic energy per unit volume; since that energy is fixed by temperature, the r.m.s. speed is √(3RT/M), rising as √T and falling as 1/√M.",
  whyItMatters:
    "36 PYQs, 8 of them HARD. Thirteen are about pressure itself — the assumptions of kinetic theory, pressure as two thirds of the kinetic energy density, the number of molecules from their energy, the mean free path. " +
    "Twenty scale the r.m.s. speed with temperature or molar mass, and include the speed of sound. Three chain it with an adiabatic expansion. Three cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-kt-pressure",
      name: "Pressure as Two Thirds of the Kinetic Energy Density",
      intuition:
        "Kinetic theory assumes identical point molecules that exert no force except in perfectly elastic collisions, so momentum and kinetic energy are both conserved. Their collisions with the WALLS — not with each other — make the pressure P = ⅓ρ⟨v²⟩ = ⅓(Nm/V)⟨v²⟩. Since the kinetic energy per unit volume is ½ρ⟨v²⟩, P = (2/3)(E/V). So pressure is proportional to the mean of the square of the speed. Halving each molecule's mass and doubling its speed doubles mv², and with it the pressure. From PV = NkT and E = (3/2)kT per molecule, the number of molecules is N = 3PV/(2E). The mean free path, the average distance between collisions, depends on how many molecules share each unit volume: at constant volume it does not change with temperature.",
      definition:
        "- Assumptions: identical molecules, elastic collisions, no force except in collision; pressure from **wall** collisions.\n" +
        "- \\(P = \\tfrac{1}{3}\\rho\\langle v^2\\rangle = \\tfrac{2}{3}\\dfrac{E}{V}\\) (7500 J in 10 L ⇒ \\(5\\times10^5\\) Pa).\n" +
        "- \\(P \\propto m\\langle v^2 \\rangle\\): m halved, v doubled ⇒ 2P.\n" +
        "- Molecules from energy: \\(N = \\dfrac{3PV}{2E}\\).\n" +
        "- Mean free path \\(\\lambda = \\dfrac{1}{\\sqrt{2}\\pi d^2 n}\\): unchanged when heated at constant volume.\n" +
        "- \\(T \\propto\\) mean square velocity.",
      formula: {
        label: "Kinetic pressure",
        latex: "P = \\frac{1}{3}\\rho\\langle v^2\\rangle = \\frac{2}{3}\\frac{E}{V}",
      },
      authoredExample: {
        prompt: "A 1 L vessel holds gas at 1.5 × 10⁵ Pa. Its total translational kinetic energy?",
        steps: ["E = (3/2)PV.", "E = 1.5 × 1.5 × 10⁵ × 10⁻³ = 225 J."],
        answer: "225 J",
      },
      selfCheckExample: {
        prompt: "Gas in a 2 L cylinder has 3000 J of translational kinetic energy. Pressure?",
        steps: ["P = (2/3) × 3000/0.002."],
        answer: "1 × 10⁶ Pa",
      },
      practiceSet: [
        { prompt: "Which is wrong in kinetic theory: pressure comes from collisions between molecules?", answer: "Wrong — it comes from collisions with the walls" },
        { prompt: "Pressure is proportional to the mean speed, the mean square speed, or the r.m.s. speed?", answer: "The mean square speed" },
      ],
      pyqExampleId: "f47707dc-ef93-4ba4-a7a4-a65efb4e863b",
      traps: [
        {
          title: "Writing P = ⅓ of the energy density",
          body:
            "P = ⅓ρv², but the kinetic energy density is ½ρv². So P is TWO thirds of the energy per unit volume.",
        },
        {
          title: "Heating a gas at constant volume changes its mean free path",
          body:
            "The mean free path depends on molecules per unit volume. In a rigid vessel that number does not change, so neither does the mean free path.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-kt-rms-speed",
      name: "R.M.S. Speed, Temperature and Molar Mass",
      intuition:
        "Equal average energy for all molecules at one temperature means lighter molecules move faster: v_rms = √(3RT/M) = √(3kT/m). Quadruple the kelvin temperature and the speed doubles; an isothermal compression leaves it alone. Two gases have the same r.m.s. speed when T/M is the same. Sound travels at √(γRT/M), a similar form with γ in place of 3, so its speed ratio between two gases at the same temperature is √(γ₁M₂/γ₂M₁).",
      definition:
        "- \\(v_{\\text{rms}} = \\sqrt{\\dfrac{3RT}{M}}\\); \\(v^2/T\\) constant; isothermal ⇒ unchanged.\n" +
        "- Doubling v needs 4T: −68 °C ⇒ 547 °C; 27 °C ⇒ 927 °C.\n" +
        "- Same speed: \\(\\dfrac{T_1}{M_1} = \\dfrac{T_2}{M_2}\\) (He at 57 °C ↔ O₂ at 2640 K).\n" +
        "- At constant P, doubling v means 4T and so 4V.\n" +
        "- Sound: \\(v = \\sqrt{\\dfrac{\\gamma RT}{M}}\\) (H₂ against He ⇒ \\(\\dfrac{\\sqrt{42}}{5}\\)).",
      formula: {
        label: "R.M.S. speed",
        latex: "v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}} = \\sqrt{\\frac{3kT}{m}}",
      },
      authoredExample: {
        prompt: "Hydrogen molecules (M = 2 g/mol) at 300 K: r.m.s. speed?",
        steps: ["v = √(3 × 8.31 × 300 / 0.002).", "v = √(3.74 × 10⁶) ≈ 1.93 × 10³ m/s."],
        answer: "≈ 1.93 km/s",
      },
      selfCheckExample: {
        prompt: "Oxygen has r.m.s. speed 500 m/s at 300 K. At 1200 K?",
        steps: ["T × 4 ⇒ speed × 2."],
        answer: "1000 m/s",
      },
      practiceSet: [
        { prompt: "Temperature raised from 127 °C to 527 °C. Ratio of r.m.s. speeds?", answer: "1 : √2" },
        { prompt: "A gas has 4 times the r.m.s. speed of a gas of molecular mass 32 at the same temperature. Its molecular mass?", answer: "2" },
      ],
      pyqExampleId: "904355a5-5987-4169-b1f2-b06f6a248de2",
      traps: [
        {
          title: "Scaling speed with temperature in °C",
          body:
            "−68 °C is 205 K; doubling the speed needs 820 K = 547 °C. Multiplying −68 by 4 gives nonsense.",
        },
        {
          title: "Scaling speed with T instead of √T",
          body:
            "v_rms ∝ √T. Four times the temperature doubles the speed; the options offer 4x as well.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-kt-rms-adiabatic",
      name: "R.M.S. Speed Through an Adiabatic Expansion",
      intuition:
        "To cut the r.m.s. speed k times, the temperature must fall k² times. In an adiabatic expansion TV^(γ−1) is constant, so the volume must grow by (k²)^(1/(γ−1)). With γ = 1.5 that exponent is 2, and the volume grows by k⁴: halving the speed needs 16 times the volume, cutting it three times needs 81.",
      definition:
        "- Speed ÷ k ⇒ T ÷ k² ⇒ \\(V \\times k^{2/(\\gamma - 1)}\\).\n" +
        "- γ = 1.5: speed ÷ 2 ⇒ V × 16; ÷ 3 ⇒ V × 81; ÷ 4 ⇒ V × 256.",
      formula: {
        label: "Adiabatic cooling",
        latex: "\\frac{V_2}{V_1} = \\left(\\frac{T_1}{T_2}\\right)^{1/(\\gamma - 1)}, \\qquad \\frac{T_1}{T_2} = \\left(\\frac{v_1}{v_2}\\right)^2",
      },
      authoredExample: {
        prompt: "A gas with γ = 1.5 expands adiabatically until its r.m.s. speed halves. By what factor has its volume grown?",
        steps: ["T falls 4 times.", "V₂/V₁ = 4^(1/0.5) = 16."],
        answer: "16",
      },
      selfCheckExample: {
        prompt: "A monoatomic gas (γ = 5/3) expands adiabatically until its r.m.s. speed halves. Volume factor?",
        steps: ["T ÷ 4; exponent 1/(2/3) = 3/2."],
        answer: "8",
      },
      practiceSet: [
        { prompt: "γ = 1.5; r.m.s. speed to be reduced 3 times. Expansion factor?", answer: "81" },
      ],
      pyqExampleId: "fcb36902-fa63-440a-8912-4ca34694eb84",
      traps: [
        {
          title: "Using the speed ratio as the temperature ratio",
          body:
            "Speed goes as √T, so halving the speed quarters the temperature. Feeding 2 instead of 4 into the adiabatic relation gives 4 instead of 16.",
        },
      ],
    },
  ],
  related: [
    { label: "Gas Laws — the bulk behaviour", href: `${BASE}/cetp-kt-gas-laws` },
    { label: "Equipartition — energy per degree of freedom", href: `${BASE}/cetp-kt-equipartition` },
  ],
};
