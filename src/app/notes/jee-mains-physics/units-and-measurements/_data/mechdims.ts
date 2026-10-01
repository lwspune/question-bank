import type { SubtopicNote } from "@/app/notes/_types";

export const MECHDIMS_UNIT_NOTE: SubtopicNote = {
  subtopicName: "Dimensions of Mechanical and Thermal Quantities",
  title: "Dimensions of Mechanical and Thermal Quantities",
  oneLineDefinition:
    "Every quantity's dimensions come from the equation that defines it, written in mass M, length L, time T and temperature K.",
  whyItMatters:
    "Thirty-five PYQs, thirty-four of them multiple choice, and four from 2026. Twenty-three are match-the-list questions that pair four quantities with four dimensional formulas; six ask which pair of quantities has, or does not have, the same dimensions; the other six ask for the dimensions of one or two named quantities, from a unit, a formula or a ratio. A table learned once answers most of them in seconds.",
  concepts: [
    // C1 — mechanical quantities
    {
      kind: "reference" as const,
      slug: "jpunit-mech-formulae",
      name: "Dimensions of mechanical quantities",
      intuition:
        "Start from force, \\(F = ma\\), which is \\(MLT^{-2}\\). Almost everything else is force combined with a length, an area or a time: energy is force × length, pressure is force ÷ area, surface tension is force ÷ length. Remember the defining equation and the dimensions follow in one line.",
      definition:
        "- Force \\(MLT^{-2}\\); energy, work and torque \\(ML^{2}T^{-2}\\); power \\(ML^{2}T^{-3}\\).\n" +
        "- Momentum and impulse \\(MLT^{-1}\\); angular momentum and angular impulse \\(ML^{2}T^{-1}\\).\n" +
        "- Pressure, stress, every elastic modulus and energy density \\(ML^{-1}T^{-2}\\).\n" +
        "- Surface tension and spring constant (force per length) \\(MT^{-2}\\).\n" +
        "- Viscosity, from \\(F = \\eta A\\,\\dfrac{dv}{dx}\\): \\(ML^{-1}T^{-1}\\); its SI unit is the pascal-second.\n" +
        "- A ratio of two quantities has the ratio of their dimensions.",
      table: {
        columns: ["Quantity", "Defining relation", "Dimensions", "SI unit"],
        rows: [
          { cells: ["Force", "\\(F = ma\\)", "\\(MLT^{-2}\\)", "newton (N)"] },
          { cells: ["Work, energy, torque", "\\(W = Fs,\\ \\tau = rF\\)", "\\(ML^{2}T^{-2}\\)", "J (N m for torque)"] },
          { cells: ["Power", "\\(P = W/t\\)", "\\(ML^{2}T^{-3}\\)", "watt (W)"] },
          { cells: ["Momentum, impulse", "\\(p = mv,\\ J = Ft\\)", "\\(MLT^{-1}\\)", "kg m/s or N s"] },
          { cells: ["Angular momentum, angular impulse", "\\(L = mvr,\\ \\tau t\\)", "\\(ML^{2}T^{-1}\\)", "kg m²/s"] },
          { cells: ["Moment of inertia", "\\(I = mr^{2}\\)", "\\(ML^{2}\\)", "kg m²"] },
          { cells: ["Pressure, stress, Young's modulus, bulk modulus", "\\(F/A\\)", "\\(ML^{-1}T^{-2}\\)", "pascal (Pa)"] },
          { cells: ["Pressure gradient", "\\(dP/dx\\)", "\\(ML^{-2}T^{-2}\\)", "Pa/m"] },
          { cells: ["Compressibility", "\\(1/\\text{bulk modulus}\\)", "\\(M^{-1}LT^{2}\\)", "Pa⁻¹"] },
          { cells: ["Surface tension, spring constant", "\\(F/l,\\ F/x\\)", "\\(MT^{-2}\\)", "N/m"] },
          { cells: ["Coefficient of viscosity", "\\(F = \\eta A\\,dv/dx\\)", "\\(ML^{-1}T^{-1}\\)", "pascal-second (Pa s)"] },
          { cells: ["Intensity of a wave", "power ÷ area", "\\(MT^{-3}\\)", "W/m²"] },
          { cells: ["Gravitational constant G", "\\(F = Gm_1m_2/r^{2}\\)", "\\(M^{-1}L^{3}T^{-2}\\)", "N m²/kg²"] },
          { cells: ["Gravitational potential", "energy ÷ mass", "\\(L^{2}T^{-2}\\)", "J/kg"] },
          { cells: ["Angular speed, frequency, velocity gradient", "\\(\\omega = \\theta/t,\\ dv/dx\\)", "\\(T^{-1}\\)", "s⁻¹"] },
        ],
        caption: "Each row follows from its defining relation; force, MLT⁻², is the starting point for most of them.",
      },
      selfCheckExample: {
        prompt:
          "The intensity of a wave is the power it carries per unit area. Find its dimensions and its SI unit.",
        steps: [
          "Power is \\(ML^{2}T^{-3}\\) and area is \\(L^{2}\\).",
          "\\(\\dfrac{ML^{2}T^{-3}}{L^{2}} = MT^{-3}\\).",
        ],
        answer: "\\(MT^{-3}\\); watt per square metre.",
      },
      practiceSet: [
        { prompt: "Dimensions of a pressure gradient?", answer: "\\(ML^{-2}T^{-2}\\)" },
        { prompt: "Dimensions of compressibility?", answer: "\\(M^{-1}LT^{2}\\)" },
        { prompt: "A quantity has the SI unit N s m⁻². What are its dimensions?", answer: "\\(ML^{-1}T^{-1}\\) (viscosity)" },
        { prompt: "Dimensions of Young's modulus divided by density?", answer: "\\(L^{2}T^{-2}\\) (a speed squared)" },
      ],
      pyqExampleId: "02d9e955-82e1-42ad-b0b6-554df653f14c", // 2026: viscosity, surface tension, pressure, surface energy
      traps: [
        {
          title: "Surface energy and surface tension are not the same entry",
          body: "Surface tension is force per length, MT⁻². A match list that names 'surface energy' means an energy, ML²T⁻². Read the exact words before matching.",
        },
        {
          title: "Viscosity has one power of time, pressure has two",
          body: "Viscosity is ML⁻¹T⁻¹ and pressure is ML⁻¹T⁻². The two differ only in the power of T, and match lists put them side by side to catch a slip.",
        },
      ],
    },

    // C2 — thermal and modern-physics constants
    {
      kind: "reference" as const,
      slug: "jpunit-heat-modern",
      name: "Dimensions of thermal and modern-physics constants",
      intuition:
        "A constant takes whatever dimensions make its equation balance. Boltzmann's constant turns temperature into energy (\\(E = k_BT\\)), so it is energy per kelvin. Planck's constant turns frequency into energy (\\(E = h\\nu\\)), so it is energy × time. Write the equation, isolate the constant, and read off its dimensions.",
      definition:
        "- \\(k_B = E/T\\): \\(ML^{2}T^{-2}K^{-1}\\). Gas constant \\(R = PV/(nT)\\): \\(ML^{2}T^{-2}K^{-1}\\text{mol}^{-1}\\).\n" +
        "- Specific heat \\(c = Q/(m\\Delta T)\\): \\(L^{2}T^{-2}K^{-1}\\). Latent heat \\(L = Q/m\\): \\(L^{2}T^{-2}\\) (no K).\n" +
        "- Thermal conductivity, from \\(\\dfrac{Q}{t} = kA\\dfrac{\\Delta T}{l}\\): \\(MLT^{-3}K^{-1}\\).\n" +
        "- Stefan's constant, from \\(\\dfrac{P}{A} = \\sigma T^{4}\\): \\(MT^{-3}K^{-4}\\).\n" +
        "- Planck's constant \\(h = E/\\nu\\): \\(ML^{2}T^{-1}\\), the same as angular momentum.\n" +
        "- Stopping potential is a voltage, \\(ML^{2}T^{-3}A^{-1}\\); work function is an energy, \\(ML^{2}T^{-2}\\).\n" +
        "- Rydberg constant (it gives \\(1/\\lambda\\)): \\(L^{-1}\\). Decay constant (\\(N = N_0e^{-\\lambda t}\\)): \\(T^{-1}\\).",
      table: {
        columns: ["Constant or quantity", "Equation it comes from", "Dimensions"],
        rows: [
          { cells: ["Boltzmann constant \\(k_B\\)", "\\(E = \\tfrac{3}{2}k_BT\\)", "\\(ML^{2}T^{-2}K^{-1}\\)"] },
          { cells: ["Gas constant R", "\\(PV = nRT\\)", "\\(ML^{2}T^{-2}K^{-1}\\text{mol}^{-1}\\)"] },
          { cells: ["Specific heat capacity", "\\(Q = mc\\Delta T\\)", "\\(L^{2}T^{-2}K^{-1}\\)"] },
          { cells: ["Latent heat", "\\(Q = mL\\)", "\\(L^{2}T^{-2}\\)"], noteAmber: "No temperature in latent heat, so it differs from specific heat." },
          { cells: ["Thermal conductivity", "\\(Q/t = kA\\,\\Delta T/l\\)", "\\(MLT^{-3}K^{-1}\\)"] },
          { cells: ["Stefan's constant \\(\\sigma\\)", "\\(P/A = \\sigma T^{4}\\)", "\\(MT^{-3}K^{-4}\\)"] },
          { cells: ["Planck's constant h", "\\(E = h\\nu\\)", "\\(ML^{2}T^{-1}\\)"] },
          { cells: ["Work function", "\\(h\\nu = \\phi + K_{\\max}\\)", "\\(ML^{2}T^{-2}\\)"] },
          { cells: ["Stopping potential", "\\(eV_0 = K_{\\max}\\)", "\\(ML^{2}T^{-3}A^{-1}\\)"] },
          { cells: ["Rydberg constant", "\\(1/\\lambda = R(1/n_1^{2} - 1/n_2^{2})\\)", "\\(L^{-1}\\)"] },
          { cells: ["Decay constant", "\\(N = N_0e^{-\\lambda t}\\)", "\\(T^{-1}\\)"] },
        ],
        caption: "Each constant has the dimensions that balance its equation.",
      },
      selfCheckExample: {
        prompt:
          "Heat flows through a slab at the rate \\(\\dfrac{Q}{t} = kA\\dfrac{\\Delta T}{l}\\). Find the dimensions of the thermal conductivity k.",
        steps: [
          "\\(k = \\dfrac{(Q/t)\\,l}{A\\,\\Delta T}\\).",
          "\\(Q/t\\) is a power, \\(ML^{2}T^{-3}\\); so \\(k = \\dfrac{ML^{2}T^{-3} \\cdot L}{L^{2} \\cdot K}\\).",
        ],
        answer: "\\(MLT^{-3}K^{-1}\\)",
      },
      practiceSet: [
        { prompt: "Dimensions of latent heat?", answer: "\\(L^{2}T^{-2}\\)" },
        { prompt: "Dimensions of Planck's constant?", answer: "\\(ML^{2}T^{-1}\\)" },
        { prompt: "Dimensions of the Rydberg constant?", answer: "\\(L^{-1}\\)" },
        { prompt: "Dimensions of Boltzmann's constant times temperature?", answer: "\\(ML^{2}T^{-2}\\) (an energy)" },
      ],
      pyqExampleId: "3f1af500-a60e-4035-8c11-7553bcda62e3", // 2026: Boltzmann, Stefan, Planck and G constants
      traps: [
        {
          title: "Stopping potential is a voltage, not an energy",
          body: "The stopping potential V₀ satisfies eV₀ = K_max, so V₀ itself is energy per charge, ML²T⁻³A⁻¹. Only eV₀ is an energy. The work function, by contrast, is an energy, ML²T⁻².",
        },
        {
          title: "Specific heat carries K⁻¹, latent heat does not",
          body: "Specific heat is energy per mass per kelvin, L²T⁻²K⁻¹. Latent heat is energy per mass, L²T⁻². They are a standard 'different dimensions' pair.",
        },
      ],
    },

    // C3 — same and different dimensions
    {
      kind: "reference" as const,
      slug: "jpunit-same-dims",
      name: "Pairs of quantities with the same dimensions",
      intuition:
        "Different physical ideas can share dimensions. Torque and energy are both force × length; Planck's constant and angular momentum are both energy × time. To test a pair, write both dimensional formulas and compare every power. One power out of place makes the pair different.",
      definition:
        "- Same: torque and energy; Planck's constant and angular momentum; pressure, stress, Young's modulus and energy density; velocity gradient, decay constant, angular speed and frequency; impulse and momentum.\n" +
        "- Different: specific heat and latent heat; linear momentum and torque; surface tension and impulse.\n" +
        "- A product such as pressure × time is viscosity: \\(ML^{-1}T^{-2} \\times T = ML^{-1}T^{-1}\\).\n" +
        "- \\(\\sqrt{uG}\\), with u an energy density, is \\(\\sqrt{ML^{-1}T^{-2} \\cdot M^{-1}L^{3}T^{-2}} = LT^{-2}\\): force per unit mass.",
      table: {
        columns: ["Pair", "Dimensions of the first", "Dimensions of the second", "Same?"],
        rows: [
          { cells: ["Torque and energy", "\\(ML^{2}T^{-2}\\)", "\\(ML^{2}T^{-2}\\)", "Yes"] },
          { cells: ["Planck's constant and angular momentum", "\\(ML^{2}T^{-1}\\)", "\\(ML^{2}T^{-1}\\)", "Yes"] },
          { cells: ["Stress and energy density", "\\(ML^{-1}T^{-2}\\)", "\\(ML^{-1}T^{-2}\\)", "Yes"] },
          { cells: ["Velocity gradient and decay constant", "\\(T^{-1}\\)", "\\(T^{-1}\\)", "Yes"] },
          { cells: ["Pressure × time and viscosity", "\\(ML^{-1}T^{-1}\\)", "\\(ML^{-1}T^{-1}\\)", "Yes"] },
          { cells: ["Specific heat and latent heat", "\\(L^{2}T^{-2}K^{-1}\\)", "\\(L^{2}T^{-2}\\)", "No"], noteAmber: "The only difference is K⁻¹." },
          { cells: ["Linear momentum and torque", "\\(MLT^{-1}\\)", "\\(ML^{2}T^{-2}\\)", "No"] },
          { cells: ["Surface tension and impulse", "\\(MT^{-2}\\)", "\\(MLT^{-1}\\)", "No"] },
        ],
        caption: "Compare every power of M, L, T and K; one mismatch makes the pair different.",
      },
      selfCheckExample: {
        prompt:
          "Which of these pairs do NOT have the same dimensions: (i) work and moment of a force, (ii) stress and Young's modulus, (iii) force and power?",
        steps: [
          "(i) Both are \\(ML^{2}T^{-2}\\).",
          "(ii) Both are \\(ML^{-1}T^{-2}\\).",
          "(iii) Force is \\(MLT^{-2}\\) and power is \\(ML^{2}T^{-3}\\).",
        ],
        answer: "Pair (iii), force and power.",
      },
      practiceSet: [
        { prompt: "Do frequency and angular speed have the same dimensions?", answer: "Yes, both \\(T^{-1}\\)" },
        { prompt: "Do impulse and linear momentum have the same dimensions?", answer: "Yes, both \\(MLT^{-1}\\)" },
        { prompt: "Which quantity has the dimensions of pressure × time?", answer: "Coefficient of viscosity" },
        { prompt: "Do energy density and pressure gradient have the same dimensions?", answer: "No: \\(ML^{-1}T^{-2}\\) and \\(ML^{-2}T^{-2}\\)" },
      ],
      pyqExampleId: "da8694b7-b635-4e94-acd3-40a9b4f68841", // 2025: the pair not having the same dimensions
      traps: [
        {
          title: "Same dimensions do not mean the same quantity",
          body: "Torque and work are both ML²T⁻², but torque is not an energy: it is a turning effect, and it is not measured in joules. A statement that they 'have the same dimensions' is true; one that they 'are the same quantity' is not.",
        },
      ],
    },
  ],
};
