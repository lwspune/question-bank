import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Physics, Ch. 3 Kinetic Theory of Gases and Radiation. Statements
 * checked against the Balbharati text (law wordings are the book's own); most-asked
 * years from the 38 board past-paper questions in the bank, 2016-2026. Newton's
 * law of cooling (asked 2016-2018) is left out: the current book does not teach it.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Physics",
  subjectRoute: "physics",
  chapterName: "Kinetic Theory of Gases and Radiation",
  chapterSlug: "kinetic-theory-of-gases-and-radiation",
  source: "Balbharati Physics Std XII (Maharashtra State Board), Chapter 3",
  keyPoints: [
    {
      term: "Ideal gas",
      text: "A gas obeying the equation of state \\(PV = nRT\\) at all pressures and temperatures. Its intermolecular interactions are absent, so its molecules have **only kinetic energy**. A real gas behaves like an ideal gas at low pressure and high temperature, when its molecules are far apart.",
    },
    {
      term: "Assumptions of kinetic theory",
      text: "A gas has a very large number of identical molecules, like small hard spheres. They move randomly, in straight lines with constant velocity between collisions. Collisions with each other and with the walls are perfectly elastic. There are no intermolecular forces, so no potential energy. The size of a molecule is negligible compared with the distance between molecules.",
    },
    {
      term: "Mean free path",
      text: "The average distance traversed by a molecule with constant velocity between two successive collisions. It varies inversely with the number density \\(N/V\\) and with \\(d^2\\), the square of the molecular diameter: \\(\\lambda = \\frac{1}{\\sqrt{2}\\pi d^2 (N/V)}\\).",
    },
    {
      term: "Kinetic interpretation of temperature",
      text: "The average kinetic energy per molecule, \\(\\frac{3}{2}k_BT\\), is proportional to the absolute temperature \\(T\\) of the gas. This relates the macroscopic parameter \\(T\\) to the kinetic energy of a molecule. The internal energy of an ideal gas is purely kinetic.",
    },
    {
      term: "Degrees of freedom",
      text: "The total number of coordinates or independent quantities required to describe the position and configuration of the system completely. A monatomic gas (He) has 3 translational. A rigid diatomic molecule (\\(O_2\\), \\(N_2\\)) has 3 translational + 2 rotational = 5; a vibrating one adds 2 more (kinetic and potential terms).",
    },
    {
      term: "Law of equipartition of energy",
      text: "For a gas in thermal equilibrium at a temperature \\(T\\), the average energy for a molecule associated with each quadratic term is \\(\\frac{1}{2}k_BT\\). It is valid at high temperatures, not at extremely low temperatures where quantum effects become important.",
    },
    {
      term: "Coefficients a, r and t",
      text: "**Absorption** \\(a\\): ratio of heat absorbed to the total heat incident. **Reflection** \\(r\\): ratio of energy reflected to the total incident. **Transmission** \\(t_r\\): ratio of energy transmitted to the total incident. All are dimensionless and \\(a + r + t_r = 1\\).",
    },
    {
      term: "Diathermanous and athermanous",
      text: "**Diathermanous**: heat radiations can pass through (\\(t_r \\ne 0\\)), e.g. glass, quartz, sodium chloride, hydrogen, oxygen, dry air. **Athermanous**: largely opaque to heat radiations, \\(t_r = 0\\) and \\(a + r = 1\\), e.g. water, wood, iron, copper, moist air, benzene.",
    },
    {
      term: "Perfectly black body",
      text: "A body which absorbs the entire radiant energy incident on it: \\(a = 1\\), \\(r = 0\\), \\(t_r = 0\\), and \\(e = 1\\). Lamp black or platinum black absorb nearly 97% and resemble one. Good absorbers are good emitters; a good reflector is a poor emitter (hence silvered thermos walls).",
    },
    {
      term: "Emissive power and coefficient of emission",
      text: "**Emissive power** \\(R\\): the quantity of heat radiated per unit area per unit time, \\(R = \\frac{Q}{At}\\); unit W/m², dimensions \\([L^0M^1T^{-3}]\\). **Coefficient of emission** (emissivity) \\(e = \\frac{R}{R_B}\\): emissive power of the surface over that of a perfect black body at the same temperature.",
    },
    {
      term: "Kirchhoff's law of heat radiation",
      text: "At a given temperature, the ratio of emissive power to coefficient of absorption of a body is equal to the emissive power of a perfect blackbody at the same temperature for all wavelengths: \\(\\frac{R}{a} = R_B\\). Equivalently, emissivity equals absorptivity, \\(a = e\\).",
    },
    {
      term: "Spectrum of black body radiation",
      text: "At a given temperature the energy is not uniformly distributed: radiant power rises with wavelength, reaches a maximum at \\(\\lambda_{max}\\), then falls. The area under the curve is the total energy emitted per unit time per unit area. As \\(T\\) rises the peak shifts to shorter wavelengths and the area grows.",
    },
    {
      term: "Wien's displacement law",
      text: "The wavelength for which emissive power of a blackbody is maximum is inversely proportional to the absolute temperature of the blackbody: \\(\\lambda_{max}T = b\\). \\(\\lambda_{max}\\) gives the dominant colour; the law is used to find temperatures of the Sun and stars.",
    },
    {
      term: "Stefan-Boltzmann law",
      text: "The rate of emission of radiant energy per unit area, or the power radiated per unit area, of a perfect blackbody is directly proportional to the fourth power of its absolute temperature: \\(R = \\sigma T^4\\). Doubling \\(T\\) raises the power 16 times.",
    },
  ],
  formulas: [
    {
      label: "Ideal gas equation",
      latex: "PV = nRT = Nk_BT \\qquad R = N_Ak_B \\qquad n = \\frac{M}{M_0} = \\frac{N}{N_A}",
    },
    { label: "Mean free path", latex: "\\lambda = \\frac{1}{\\sqrt{2}\\pi d^2 (N/V)}" },
    {
      label: "Pressure of an ideal gas",
      latex: "P = \\frac{1}{3}\\frac{N}{V}m\\overline{v^2} = \\frac{1}{3}\\rho\\, v_{rms}^2",
      symbols: [
        { symbol: "N/V", meaning: "number of molecules per unit volume" },
        { symbol: "ρ", meaning: "density of the gas, Nm/V" },
      ],
    },
    {
      label: "rms speed",
      latex: "v_{rms} = \\sqrt{\\frac{3RT}{M_0}} = \\sqrt{\\frac{3k_BT}{m}} = \\sqrt{\\frac{3P}{\\rho}} \\qquad \\frac{v_1}{v_2} = \\sqrt{\\frac{T_1 M_2}{T_2 M_1}}",
      symbols: [{ symbol: "M₀", meaning: "molar mass, in kg/mol" }],
    },
    {
      label: "Kinetic energy and temperature",
      latex: "\\frac{1}{2}m\\overline{v^2} = \\frac{3}{2}k_BT \\qquad E = \\frac{3}{2}Nk_BT = \\frac{3}{2}PV",
    },
    { label: "Equipartition", latex: "\\text{energy per quadratic term} = \\frac{1}{2}k_BT" },
    {
      label: "Molar specific heats (Cv, Cp, γ)",
      latex: "\\text{mono: } \\tfrac{3}{2}R,\\ \\tfrac{5}{2}R,\\ \\tfrac{5}{3} \\qquad \\text{rigid di: } \\tfrac{5}{2}R,\\ \\tfrac{7}{2}R,\\ \\tfrac{7}{5} \\qquad \\text{vibrating di: } \\tfrac{7}{2}R,\\ \\tfrac{9}{2}R,\\ \\tfrac{9}{7}",
    },
    {
      label: "Polyatomic gas (f vibrational modes)",
      latex: "C_V = (3 + f)R \\qquad C_P = (4 + f)R \\qquad \\gamma = \\frac{4 + f}{3 + f}",
    },
    {
      label: "Mayer's relation (R/J when heat is in calories)",
      latex: "C_P - C_V = R \\qquad C_P - C_V = \\frac{R}{J} \\qquad S_P - S_V = \\frac{R}{M_0 J}",
    },
    { label: "Coefficients of radiation", latex: "a + r + t_r = 1 \\qquad e = \\frac{R}{R_B} \\qquad a = e" },
    { label: "Wien's displacement law", latex: "\\lambda_{max} T = b \\qquad b = 2.897 \\times 10^{-3}\\ \\text{m K}" },
    {
      label: "Stefan-Boltzmann law",
      latex: "R = \\sigma T^4 \\qquad Q = \\sigma A t T^4 \\qquad \\sigma = 5.67 \\times 10^{-8}\\ \\text{W m}^{-2}\\text{K}^{-4}",
    },
    {
      label: "Ordinary body, and net loss to surroundings",
      latex: "R = e\\sigma T^4 \\qquad P = e\\sigma A T^4 \\qquad R_{net} = e\\sigma\\left(T^4 - T_0^4\\right)",
    },
  ],
  derivations: [
    {
      title: "Derive an expression for the pressure exerted by a gas on the basis of kinetic theory",
      steps: [
        "Cubical box of side \\(L\\), \\(N\\) molecules of mass \\(m\\). A molecule with x-component \\(v_x\\) hits the shaded wall elastically: change in momentum \\(-2mv_x\\), so \\(2mv_x\\) is given to the wall.",
        "It returns to the same wall after travelling \\(2L\\), in time \\(\\Delta t = \\frac{2L}{v_x}\\). Average force \\(= \\frac{2mv_x}{2L/v_x} = \\frac{mv_x^2}{L}\\).",
        "Total force \\(= \\frac{m}{L}(v_{x1}^2 + v_{x2}^2 + \\dots)\\). Divide by area \\(L^2\\): \\(P = \\frac{mN\\overline{v_x^2}}{V}\\).",
        "No preferred direction, so \\(\\overline{v_x^2} = \\overline{v_y^2} = \\overline{v_z^2} = \\frac{1}{3}\\overline{v^2}\\). Hence \\(P = \\frac{1}{3}\\frac{N}{V}m\\overline{v^2}\\).",
      ],
    },
    {
      title: "Deduce Boyle's law using the expression for pressure",
      steps: [
        "From \\(P = \\frac{1}{3}\\frac{N}{V}m\\overline{v^2}\\), \\(PV = \\frac{1}{3}Nm\\overline{v^2} = \\frac{2}{3}N\\left(\\frac{1}{2}m\\overline{v^2}\\right)\\).",
        "For a fixed mass, \\(N\\) and \\(m\\) are constant; at constant temperature the mean kinetic energy \\(\\frac{1}{2}m\\overline{v^2}\\) is constant.",
        "So \\(PV\\) = constant at constant \\(T\\), that is \\(V \\propto \\frac{1}{P}\\): Boyle's law.",
      ],
    },
    {
      title: "Show that the rms speed of a gas molecule is proportional to the square root of its absolute temperature",
      steps: [
        "From the pressure expression, \\(\\overline{v^2} = \\frac{3PV}{Nm}\\).",
        "Use \\(PV = nRT\\) and \\(Nm = nM_0\\): \\(\\overline{v^2} = \\frac{3RT}{M_0}\\).",
        "\\(v_{rms} = \\sqrt{\\frac{3RT}{M_0}}\\). For a given gas \\(R\\) and \\(M_0\\) are constant, so \\(v_{rms} \\propto \\sqrt{T}\\).",
      ],
    },
    {
      title: "Show that the average energy per molecule is proportional to the absolute temperature",
      steps: [
        "Write \\(PV = \\frac{1}{3}Nm\\overline{v^2} = \\frac{2}{3}N\\left(\\frac{1}{2}m\\overline{v^2}\\right) = \\frac{2}{3}E\\), where \\(E\\) is the total kinetic energy (no potential energy in an ideal gas).",
        "With \\(PV = Nk_BT\\): \\(\\frac{2}{3}E = Nk_BT\\), so \\(E = \\frac{3}{2}Nk_BT\\).",
        "Energy per molecule \\(\\frac{E}{N} = \\frac{3}{2}k_BT\\), so it is proportional to \\(T\\).",
      ],
    },
    {
      title: "Prove Mayer's relation \\(C_P - C_V = \\frac{R}{J}\\)",
      steps: [
        "One mole of ideal gas in a cylinder with a light frictionless piston. Heated at constant volume: \\(dQ_1 = dE = C_V\\,dT\\) (no work done).",
        "Heated through the same \\(dT\\) at constant pressure: \\(dQ_2 = dE + P\\,dV = C_P\\,dT\\).",
        "\\(dE\\) depends only on temperature, so \\((C_P - C_V)dT = P\\,dV\\). From \\(PV = RT\\) at constant \\(P\\), \\(P\\,dV = R\\,dT\\).",
        "Hence \\(C_P - C_V = R\\). With heat in calories and work in joules, \\(C_P - C_V = \\frac{R}{J}\\).",
      ],
    },
    {
      title: "Using the law of equipartition of energy, find the molar specific heats of a monatomic gas",
      steps: [
        "A monatomic atom has 3 translational degrees of freedom, so its average energy is \\(3 \\times \\frac{1}{2}k_BT = \\frac{3}{2}k_BT\\).",
        "Internal energy per mole \\(E = \\frac{3}{2}N_Ak_BT = \\frac{3}{2}RT\\), so \\(C_V = \\frac{dE}{dT} = \\frac{3}{2}R\\).",
        "Mayer: \\(C_P = C_V + R = \\frac{5}{2}R\\), and \\(\\gamma = \\frac{C_P}{C_V} = \\frac{5}{3}\\). Rigid diatomic (5 dof): \\(\\frac{5}{2}R\\), \\(\\frac{7}{2}R\\), \\(\\frac{7}{5}\\).",
      ],
    },
    {
      title: "Derive the relation between the coefficients of absorption, reflection and transmission",
      steps: [
        "Of the heat \\(Q\\) incident on a surface, \\(Q_a\\) is absorbed, \\(Q_r\\) reflected and \\(Q_t\\) transmitted: \\(Q = Q_a + Q_r + Q_t\\).",
        "Divide by \\(Q\\): \\(1 = \\frac{Q_a}{Q} + \\frac{Q_r}{Q} + \\frac{Q_t}{Q}\\).",
        "By definition these ratios are \\(a\\), \\(r\\) and \\(t_r\\), so \\(a + r + t_r = 1\\).",
      ],
    },
    {
      title: "State and prove Kirchhoff's law of heat radiation",
      steps: [
        "Ordinary body A and perfect blackbody B, of identical shape, in an enclosure; in thermal equilibrium both are at the enclosure's temperature.",
        "Each receives \\(Q\\) per unit time. A absorbs \\(aQ\\); its temperature stays the same, so it emits what it absorbs: \\(aQ = R\\).",
        "For the blackbody, \\(Q = R_B\\). Dividing, \\(a = \\frac{R}{R_B}\\), i.e. \\(\\frac{R}{a} = R_B\\).",
        "Since \\(e = \\frac{R}{R_B}\\), we get \\(a = e\\). Hence the law is proved.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Ferry's perfectly black body",
      labels: [
        "double walled hollow sphere",
        "evacuated space between walls",
        "silvered outer surface",
        "lampblack inner surface",
        "tiny hole (aperture)",
        "conical projection opposite hole",
      ],
    },
    {
      title: "Spectral distribution of black body radiation",
      labels: [
        "y-axis: radiant power per unit wavelength",
        "x-axis: wavelength λ",
        "curves for T₁ > T₂ > T₃",
        "λmax of each peak, shifting left",
        "area under curve = total power",
      ],
    },
    {
      title: "Cubical box for the pressure of a gas",
      labels: ["side L, axes x, y, z", "shaded wall parallel to yz-plane", "molecule of mass m, velocity v", "component vx reversed on collision"],
    },
  ],
  mostAsked: [
    {
      topic: "Coefficients of absorption, reflection, transmission and emission; diathermanous and athermanous; state and prove Kirchhoff's law",
      years: [2026, 2025, 2024, 2016],
    },
    {
      topic: "Average kinetic energy per molecule \\(\\propto T\\), and the kinetic energy of a volume of gas at S.T.P. (numerical)",
      years: [2026, 2025, 2024, 2018],
    },
    {
      topic: "Degrees of freedom, molar specific heats by equipartition, and Mayer's relation (proof or a numerical)",
      years: [2026, 2024, 2022, 2016],
    },
    {
      topic: "Black body radiation: Ferry's black body with diagram, the energy distribution spectrum, Wien's law numerical",
      years: [2026, 2024, 2020, 2019, 2017],
    },
    {
      topic: "Derive the expression for pressure exerted by a gas, or deduce Boyle's law from it",
      years: [2026, 2023, 2022, 2020],
    },
    {
      topic: "rms speed: prove \\(v_{rms} \\propto \\sqrt{T}\\), or compare the rms speeds of hydrogen and oxygen",
      years: [2026, 2024, 2022, 2017],
    },
    {
      topic: "Stefan-Boltzmann law numericals: energy radiated, filament temperature, ratio of emissive powers or of heat loss",
      years: [2025, 2024, 2023],
    },
    {
      topic: "Ideal gas and its laws, assumptions of kinetic theory, mean free path",
      years: [2026, 2025, 2023, 2018],
    },
  ],
  mistakes: [
    {
      title: "Using °C in a formula",
      body: "Every formula here (\\(v_{rms}\\), \\(\\frac{3}{2}k_BT\\), \\(\\sigma T^4\\), \\(\\lambda_{max}T = b\\)) needs the absolute temperature. Add 273 first: 127°C is 400 K.",
    },
    {
      title: "Writing \\(e\\sigma(T - T_0)^4\\) for the net loss",
      body: "The net loss is \\(e\\sigma\\left(T^4 - T_0^4\\right)\\): raise each temperature to the fourth power, then subtract. When comparing two rates of loss, \\(e\\), \\(\\sigma\\) and \\(A\\) cancel.",
    },
    {
      title: "Calling \\(\\lambda_{max}\\) the longest wavelength emitted",
      body: "\\(\\lambda_{max}\\) is the wavelength of **maximum intensity**, not the maximum wavelength. It decreases as the temperature rises.",
    },
    {
      title: "Forgetting the unit conversions",
      body: "Convert to SI before substituting: 1 litre and 1000 cc are \\(10^{-3}\\) m³, 200 cm² is \\(200 \\times 10^{-4}\\) m², one minute is 60 s, molar mass in kg/mol.",
    },
    {
      title: "Mixing molar and principal specific heats",
      body: "\\(C_P - C_V = R\\) is for molar specific heats. For principal specific heats (per kg), \\(S_P - S_V = \\frac{R}{M_0 J}\\). With \\(\\gamma\\) and the difference given, solve \\(C_P = \\gamma C_V\\) together with Mayer's relation.",
    },
    {
      title: "Comparing rms speeds with temperature alone",
      body: "For two different gases, \\(v_{rms} \\propto \\sqrt{T/M_0}\\): both the temperature (in K) and the molar mass change the ratio.",
    },
  ],
};

export default sheet;
