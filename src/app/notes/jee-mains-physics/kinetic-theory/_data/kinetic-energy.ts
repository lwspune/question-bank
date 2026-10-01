import type { SubtopicNote } from "@/app/notes/_types";

export const KINETIC_ENERGY_KTG_NOTE: SubtopicNote = {
  subtopicName: "Pressure, Kinetic Energy and Temperature",
  title: "Pressure, Kinetic Energy and Temperature",
  oneLineDefinition:
    "Gas pressure comes from molecules bouncing off the walls, P = (1/3)ρv²rms, and the average translational kinetic energy of a molecule, (3/2)kT, depends on the temperature alone.",
  whyItMatters:
    "Seventeen PYQs, one of them asking for a number, and one from 2026. Four ask where pressure comes from and how PV is related to the kinetic energy, eight turn a temperature into a kinetic energy or back, and five compare two gases at one temperature. All seventeen rest on one fact: the average translational kinetic energy of a molecule is (3/2)kT, whatever the gas, the pressure or the volume.",
  concepts: [
    // C1 — pressure from impacts
    {
      kind: "formula" as const,
      slug: "jpktg-pressure-ke",
      name: "Pressure from molecular impacts, and PV = (2/3)E",
      intuition:
        "A molecule that hits a wall and bounces back elastically reverses the part of its velocity that points at the wall, so it hands the wall a little momentum. Billions of such hits each second add up to a steady force on every square metre: the pressure. Averaging over all directions gives P = ⅓ρ⟨v²⟩, and multiplying by V shows that PV is two-thirds of the gas's translational kinetic energy.",
      definition:
        "- One elastic hit with velocity component u normal to the wall: momentum change \\(2mu\\).\n" +
        "- \\(P = \\dfrac{1}{3}\\dfrac{N}{V}m\\overline{v^{2}} = \\dfrac{1}{3}\\rho v_{rms}^{2}\\).\n" +
        "- \\(PV = \\dfrac{2}{3}E_{trans}\\), so \\(E_{trans} = \\dfrac{3}{2}PV = \\dfrac{3}{2}nRT\\). PV is NOT the translational energy itself.\n" +
        "- Translational kinetic energy per unit volume \\(= \\dfrac{3}{2}P\\).\n" +
        "- Number of molecules from P, V and the mean energy per molecule \\(\\overline{KE}\\): \\(N = \\dfrac{3PV}{2\\,\\overline{KE}}\\).\n" +
        "- Assumptions: molecules are points, exert no forces except in collisions, and collide elastically in a negligible time.",
      formula: {
        label: "Kinetic-theory pressure",
        latex: "P = \\frac{1}{3}\\rho v_{rms}^{2} \\qquad PV = \\frac{2}{3}E_{trans}",
      },
      authoredExample: {
        prompt:
          "A gas at a pressure of \\(1.5 \\times 10^{5}\\ \\text{Pa}\\) has a density of \\(1.8\\ \\text{kg/m}^{3}\\). Find the rms speed of its molecules and the translational kinetic energy in each cubic metre.",
        steps: [
          "\\(v_{rms} = \\sqrt{\\dfrac{3P}{\\rho}} = \\sqrt{\\dfrac{4.5 \\times 10^{5}}{1.8}} = \\sqrt{2.5 \\times 10^{5}} = 500\\ \\text{m/s}\\).",
          "Energy per m³ \\(= \\dfrac{3}{2}P = 2.25 \\times 10^{5}\\ \\text{J}\\).",
        ],
        answer: "500 m/s; \\(2.25 \\times 10^{5}\\ \\text{J}\\) per m³",
      },
      selfCheckExample: {
        prompt:
          "A 2 litre vessel holds a monatomic gas at \\(3 \\times 10^{5}\\ \\text{Pa}\\). The average kinetic energy of a molecule is \\(6 \\times 10^{-21}\\ \\text{J}\\). How many molecules are there?",
        steps: [
          "\\(PV = \\dfrac{2}{3}N\\,\\overline{KE}\\), so \\(N = \\dfrac{3PV}{2\\,\\overline{KE}}\\).",
          "\\(N = \\dfrac{3 \\times 3 \\times 10^{5} \\times 2 \\times 10^{-3}}{2 \\times 6 \\times 10^{-21}} = \\dfrac{1800}{1.2 \\times 10^{-20}} = 1.5 \\times 10^{23}\\).",
        ],
        answer: "\\(1.5 \\times 10^{23}\\) molecules",
      },
      practiceSet: [
        { prompt: "Pressure \\(1.2 \\times 10^{5}\\ \\text{Pa}\\), density \\(1\\ \\text{kg/m}^{3}\\): rms speed?", answer: "600 m/s" },
        { prompt: "PV of an ideal gas is what fraction of its translational kinetic energy?", answer: "\\(2/3\\)" },
        { prompt: "Translational kinetic energy in one cubic metre of gas at \\(2 \\times 10^{5}\\ \\text{Pa}\\)?", answer: "\\(3 \\times 10^{5}\\ \\text{J}\\)" },
        { prompt: "A molecule of mass m hits a wall with velocity component u normal to it and bounces back elastically. Momentum given to the wall?", answer: "\\(2mu\\)" },
      ],
      pyqExampleId: "3d911d84-f8dd-4631-b343-1dd750d939c1", // 24 Jan 2023: rms speed doubling + PV vs translational KE
      traps: [
        {
          title: "Taking PV as the kinetic energy",
          body: "PV is two-thirds of the translational kinetic energy, not equal to it. The energy is (3/2)PV.",
        },
        {
          title: "Squaring the mean speed",
          body: "Pressure depends on the mean of v², which is larger than the square of the mean speed. That is why the rms speed, not the average speed, appears in P = ⅓ρv²rms.",
        },
      ],
    },

    // C2 — KE and temperature
    {
      kind: "formula" as const,
      slug: "jpktg-ke-temperature",
      name: "Average kinetic energy is (3/2)kT",
      intuition:
        "Temperature is a measure of how much translational kinetic energy the molecules carry on average: (3/2)kT per molecule. So the energy is proportional to the kelvin temperature and to nothing else. Double the energy and the kelvin temperature doubles. To compare with an energy in electron-volts, set (3/2)kT equal to it.",
      definition:
        "- Per molecule: \\(\\overline{KE} = \\dfrac{3}{2}kT\\); per mole \\(\\dfrac{3}{2}RT\\); for n moles \\(\\dfrac{3}{2}nRT\\).\n" +
        "- \\(k = 1.38 \\times 10^{-23}\\ \\text{J/K}\\); \\(1\\ \\text{eV} = 1.6 \\times 10^{-19}\\ \\text{J}\\).\n" +
        "- \\(\\overline{KE} \\propto T\\) in kelvin. It does not depend on the pressure, the volume or the kind of gas.\n" +
        "- A ratio of energies is a ratio of kelvin temperatures; subtract 273 only at the end.\n" +
        "- An electron accelerated through a potential difference V gains \\(eV\\); set \\(\\dfrac{3}{2}kT = eV\\) to find the matching temperature.\n" +
        "- Total translational kinetic energy of a mass m of gas: \\(\\dfrac{3}{2}\\dfrac{m}{M}RT\\).",
      formula: {
        label: "Mean translational kinetic energy",
        latex: "\\overline{KE} = \\frac{3}{2}kT \\qquad E_{trans} = \\frac{3}{2}nRT",
      },
      authoredExample: {
        prompt:
          "The average translational kinetic energy of a gas molecule is E at 27 °C. At what temperature is it 3E? What is E in electron-volts? \\((k = 1.38 \\times 10^{-23}\\ \\text{J/K})\\)",
        steps: [
          "\\(\\overline{KE} \\propto T\\): \\(T = 3 \\times 300 = 900\\ \\text{K} = 627\\ ^{\\circ}\\text{C}\\).",
          "\\(E = \\dfrac{3}{2} \\times 1.38 \\times 10^{-23} \\times 300 = 6.21 \\times 10^{-21}\\ \\text{J}\\).",
          "In eV: \\(\\dfrac{6.21 \\times 10^{-21}}{1.6 \\times 10^{-19}} \\approx 0.039\\ \\text{eV}\\).",
        ],
        answer: "627 °C; about 0.039 eV",
      },
      selfCheckExample: {
        prompt:
          "At what temperature, in °C, is the average translational kinetic energy of a gas molecule \\(8.28 \\times 10^{-21}\\ \\text{J}\\)? \\((k = 1.38 \\times 10^{-23}\\ \\text{J/K})\\)",
        steps: [
          "\\(T = \\dfrac{2\\,\\overline{KE}}{3k} = \\dfrac{8.28 \\times 10^{-21}}{2.07 \\times 10^{-23}} = 400\\ \\text{K}\\).",
          "\\(400 - 273 = 127\\ ^{\\circ}\\text{C}\\).",
        ],
        answer: "127 °C",
      },
      practiceSet: [
        { prompt: "At 127 °C the mean kinetic energy of a molecule is E. At what temperature is it E/2?", answer: "200 K, that is −73 °C" },
        { prompt: "Total translational kinetic energy of 4 mol of a gas at 250 K \\((R = 8.31)\\)?", answer: "12 465 J" },
        { prompt: "A gas is compressed to half its volume at constant temperature. Does the mean kinetic energy of a molecule change?", answer: "No: it depends on T alone" },
        { prompt: "By what factor must the kelvin temperature rise for the mean kinetic energy to rise by 50%?", answer: "1.5" },
      ],
      pyqExampleId: "05a4a6bc-7bef-4978-82ef-6cf2c687a4bf", // 9 Apr 2024: -78 °C, energy doubled
      traps: [
        {
          title: "Doubling the Celsius temperature",
          body: "Twice the kinetic energy means twice the kelvin temperature. From 50 °C (323 K) that is 646 K, or 373 °C, not 100 °C.",
        },
        {
          title: "Per molecule or per mole",
          body: "(3/2)kT is for one molecule; (3/2)RT is for one mole. A numerical answer off by about 6 × 10²³ has mixed the two.",
        },
      ],
    },

    // C3 — same temperature, same KE
    {
      kind: "formula" as const,
      slug: "jpktg-same-ke",
      name: "Same temperature, same mean kinetic energy",
      intuition:
        "At one temperature every molecule, light or heavy, has the same average translational kinetic energy. A light molecule makes up for its small mass by moving fast, so its rms speed is higher, but its energy is the same. In a mixture the mass ratio of the gases changes nothing about the energy per molecule.",
      definition:
        "- Equal T: \\(\\tfrac{1}{2}m_1\\overline{v_1^{2}} = \\tfrac{1}{2}m_2\\overline{v_2^{2}}\\), so \\(v_{rms} \\propto \\dfrac{1}{\\sqrt{m}}\\).\n" +
        "- In any mixture the translational kinetic energy per molecule is in the ratio 1 : 1, whatever the mass ratio.\n" +
        "- Equal mean kinetic energy means equal temperature, whatever the size of the container.\n" +
        "- If rotation is counted, the total energy per molecule is \\(\\dfrac{f}{2}kT\\): a diatomic molecule then carries more than a monatomic one at the same T. Read \"average kinetic energy\" as translational unless the question says otherwise.\n" +
        "- The average velocity of the molecules, a vector, is zero, and so is their average momentum; the average speed is not.",
      formula: {
        label: "Equal temperatures",
        latex: "\\tfrac{1}{2}m_1\\overline{v_1^{2}} = \\tfrac{1}{2}m_2\\overline{v_2^{2}} = \\tfrac{3}{2}kT",
      },
      authoredExample: {
        prompt:
          "A vessel at 350 K holds neon (M = 20 g/mol) and krypton (M = 84 g/mol) in the ratio 3 : 1 by mass. Find the ratio of their average translational kinetic energies per molecule, and of their rms speeds.",
        steps: [
          "Same temperature, so the energies per molecule are equal: 1 : 1. The 3 : 1 mass ratio plays no part.",
          "\\(\\dfrac{v_{Ne}}{v_{Kr}} = \\sqrt{\\dfrac{84}{20}} = \\sqrt{4.2} \\approx 2.05\\).",
        ],
        answer: "1 : 1; about 2.05 : 1",
      },
      selfCheckExample: {
        prompt:
          "Helium (M = 4) and nitrogen (M = 28) are at the same temperature. Find the ratio of their mean translational kinetic energies per molecule and the ratio \\(v_{He} : v_{N_2}\\) of their rms speeds.",
        steps: [
          "Energies: equal, 1 : 1.",
          "Speeds: \\(\\sqrt{28/4} = \\sqrt{7}\\), so \\(\\sqrt{7} : 1\\).",
        ],
        answer: "1 : 1 and \\(\\sqrt{7} : 1\\)",
      },
      practiceSet: [
        { prompt: "Two gases have the same mean translational kinetic energy per molecule. What else must be the same?", answer: "Their temperature" },
        { prompt: "Average velocity (as a vector) of the molecules in a gas at rest?", answer: "Zero" },
        { prompt: "Ratio of the mean total kinetic energy of a rigid diatomic molecule to that of a monatomic one at the same T?", answer: "5 : 3" },
        { prompt: "At the same temperature, the molecular mass doubles. What happens to the rms speed?", answer: "It is divided by \\(\\sqrt{2}\\)" },
      ],
      pyqExampleId: "600799cf-cf62-4617-bdf1-bc71b7dd39fb", // 4 Apr 2026 Shift 2: H2 and O2, Assertion-Reason
      traps: [
        {
          title: "Letting the mass ratio decide the answer",
          body: "A mixture's mass ratio is a distractor here. The energy per molecule depends on T alone, so it is 1 : 1 for any mix.",
        },
        {
          title: "Equal energy is not equal speed",
          body: "At one temperature the lighter molecule moves faster. Equal kinetic energies make the speeds unequal, in the ratio √(m₂/m₁).",
        },
      ],
    },
  ],
};
