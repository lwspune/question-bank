import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Chemistry, Ch. 4 Chemical Thermodynamics. Laws and definitions
 * checked against the Balbharati text (wordings are the book's own, trimmed);
 * most-asked years from the board past-paper questions in the bank, 2014-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Chemistry",
  subjectRoute: "chemistry",
  chapterName: "Chemical Thermodynamics",
  chapterSlug: "chemical-thermodynamics",
  source: "Balbharati Chemistry Std XII (Maharashtra State Board), Chapter 4",
  keyPoints: [
    {
      term: "Extensive and intensive properties",
      text: "**Extensive:** depends on the amount of matter present (mass, volume, internal energy, heat capacity, number of moles). **Intensive:** independent of the amount of matter (pressure, temperature, surface tension, viscosity, melting point, specific heat).",
    },
    {
      term: "State and path functions",
      text: "A **state function** depends on the state of a system and is independent of the path followed to attain it (P, V, T, U, H). A **path function** depends on the path: work and heat.",
    },
    {
      term: "Types of processes",
      text: "**Isothermal:** temperature constant. **Isobaric:** pressure constant (\\(\\Delta P = 0\\)), as in an open container. **Isochoric:** volume constant (\\(\\Delta V = 0\\)), as in a closed container. **Adiabatic:** no exchange of heat between system and surroundings (\\(Q = 0\\)).",
    },
    {
      term: "Reversible process",
      text: "The driving and opposing forces differ by an infinitesimal amount, so an infinitesimal change can reverse it. It proceeds infinitely slowly, in an infinite number of steps, and the system stays in equilibrium with its surroundings throughout.",
    },
    {
      term: "Sign conventions of W and Q",
      text: "Energy entering the system is positive; energy leaving it is negative. **+Q:** heat absorbed by the system. **−Q:** heat released. **+W:** work done on the system. **−W:** work done by the system (expansion).",
    },
    {
      term: "First law of thermodynamics",
      text: "Energy is neither created nor destroyed and can only be converted from one form to another (the total internal energy of an isolated system is constant). \\(\\Delta U = Q + W\\). Work done by the system lowers its internal energy.",
    },
    {
      term: "First law for different processes",
      text: "**Isothermal:** \\(\\Delta U = 0\\), so \\(Q = -W\\). **Adiabatic:** \\(Q = 0\\), so \\(\\Delta U = W\\). **Isochoric:** \\(W = 0\\), so \\(\\Delta U = Q_v\\). **Isobaric:** \\(\\Delta U = Q_p - P_{ext}\\Delta V\\).",
    },
    {
      term: "Enthalpy",
      text: "Enthalpy of a system is the sum of its internal energy and the energy equivalent to PV work: \\(H = U + PV\\). At constant pressure \\(\\Delta H = Q_p\\). It is a state function and an extensive property.",
    },
    {
      term: "Enthalpies of phase change and atomization",
      text: "**Fusion:** one mole of solid to liquid; **vaporization:** one mole of liquid to vapour; **sublimation:** one mole of solid directly to vapour, all at constant T and P, so \\(\\Delta_{sub}H = \\Delta_{fus}H + \\Delta_{vap}H\\). **Atomization:** dissociation of one mole of gaseous substance into atoms.",
    },
    {
      term: "Standard enthalpy of formation",
      text: "The enthalpy change when one mole of pure compound in its standard state is formed from its elements in their standard states. It is zero for an element in its standard state.",
    },
    {
      term: "Standard enthalpy of combustion",
      text: "The standard enthalpy change accompanying a reaction in which one mole of the substance in its standard state is completely oxidised. Example: \\(\\ce{CH4 + 2O2 -> CO2 + 2H2O}\\) for methane.",
    },
    {
      term: "Hess's law of constant heat summation",
      text: "The enthalpy change for a chemical reaction is the same regardless of the path by which the reaction occurs, because enthalpy is a state function. **Application:** to calculate enthalpy changes of reactions that cannot be measured experimentally, by adding thermochemical equations.",
    },
    {
      term: "Entropy and the second law",
      text: "Entropy is a measure of molecular disorder or randomness; it increases on melting of ice and vaporisation of water (\\(\\Delta S\\) positive). **Second law:** the total entropy of a system and its surroundings increases in a spontaneous process: \\(\\Delta S_{total} = \\Delta S_{sys} + \\Delta S_{surr} > 0\\).",
    },
    {
      term: "Gibbs energy and spontaneity",
      text: "\\(G = H - TS\\); at constant T and P, \\(\\Delta G = \\Delta H - T\\Delta S\\). \\(\\Delta G < 0\\): spontaneous. \\(\\Delta G > 0\\): nonspontaneous. \\(\\Delta G = 0\\): at equilibrium. A spontaneous process occurs of its own and continues till equilibrium is reached.",
    },
  ],
  formulas: [
    { label: "First law", latex: "\\Delta U = Q + W" },
    { label: "Pressure-volume work", latex: "W = -P_{ext}\\Delta V = -P_{ext}(V_2 - V_1) \\qquad 1\\ \\text{dm}^3\\ \\text{bar} = 100\\ \\text{J}" },
    { label: "Maximum work (isothermal, reversible)", latex: "W_{max} = -2.303\\,nRT\\log_{10}\\frac{V_2}{V_1} = -2.303\\,nRT\\log_{10}\\frac{P_1}{P_2}" },
    { label: "Work in a chemical reaction", latex: "W = -\\Delta n_g RT" },
    { label: "Enthalpy and internal energy", latex: "\\Delta H = \\Delta U + P\\Delta V = \\Delta U + \\Delta n_g RT" },
    { label: "Enthalpy of reaction from formation", latex: "\\Delta_r H^0 = \\sum \\Delta_f H^0(\\text{products}) - \\sum \\Delta_f H^0(\\text{reactants})" },
    { label: "Enthalpy of reaction from bond enthalpies", latex: "\\Delta_r H^0 = \\sum H(\\text{bonds broken}) - \\sum H(\\text{bonds formed})" },
    { label: "Sublimation", latex: "\\Delta_{sub}H = \\Delta_{fus}H + \\Delta_{vap}H" },
    { label: "Gibbs energy", latex: "\\Delta G = \\Delta H - T\\Delta S \\qquad T_{equilibrium} = \\frac{\\Delta H}{\\Delta S}" },
    { label: "Gibbs energy and equilibrium constant", latex: "\\Delta G^0 = -2.303\\,RT\\log_{10}K" },
  ],
  derivations: [
    {
      title: "Derive the relationship between ΔH and ΔU for a gaseous reaction",
      steps: [
        "At constant pressure \\(\\Delta H = \\Delta U + P\\Delta V = \\Delta U + PV_2 - PV_1\\).",
        "\\(V_1\\): volume of the \\(n_1\\) moles of gaseous reactants; \\(V_2\\): of the \\(n_2\\) moles of gaseous products. For ideal gases \\(PV_1 = n_1RT\\), \\(PV_2 = n_2RT\\).",
        "So \\(P\\Delta V = (n_2 - n_1)RT = \\Delta n_g RT\\), and \\(\\Delta H = \\Delta U + \\Delta n_g RT\\).",
        "For solids and liquids, or when \\(\\Delta n_g = 0\\), \\(\\Delta H = \\Delta U\\).",
      ],
    },
    {
      title: "Derive an expression for maximum work in isothermal reversible expansion of an ideal gas",
      steps: [
        "n moles expand isothermally and reversibly from \\(V_1\\) to \\(V_2\\); in each step \\(P_{ext} = P - dP\\), so \\(dW = -(P - dP)dV \\approx -P\\,dV\\).",
        "Total work: \\(W_{max} = -\\int_{V_1}^{V_2} P\\,dV\\), with \\(P = \\frac{nRT}{V}\\).",
        "\\(W_{max} = -nRT\\int_{V_1}^{V_2}\\frac{dV}{V} = -2.303\\,nRT\\log_{10}\\frac{V_2}{V_1}\\).",
        "At constant T, \\(P_1V_1 = P_2V_2\\), so \\(W_{max} = -2.303\\,nRT\\log_{10}\\frac{P_1}{P_2}\\).",
      ],
    },
    {
      title: "Expression for pressure-volume work, and the work done in a chemical reaction",
      steps: [
        "Gas in a cylinder with a frictionless piston of area A expands against \\(P_{ext}\\) through distance \\(l\\): \\(W = -F l = -P_{ext}A l\\).",
        "\\(A l = \\Delta V\\), so \\(W = -P_{ext}\\Delta V\\). In free expansion (vacuum) \\(P_{ext} = 0\\), so \\(W = 0\\).",
        "In a reaction at constant T and P: \\(W = -P(V_2 - V_1) = -(n_2 - n_1)RT = -\\Delta n_g RT\\).",
      ],
    },
    {
      title: "First law for isothermal, adiabatic, isochoric and isobaric processes",
      steps: [
        "Start from \\(\\Delta U = Q + W\\).",
        "Isothermal: \\(\\Delta U = 0\\), so \\(Q = -W\\): heat absorbed equals work done by the system.",
        "Adiabatic: \\(Q = 0\\), so \\(\\Delta U = W\\). Isochoric: \\(\\Delta V = 0\\), \\(W = 0\\), so \\(\\Delta U = Q_v\\).",
        "Isobaric: \\(W = -P_{ext}\\Delta V\\), so \\(\\Delta U = Q_p - P_{ext}\\Delta V\\).",
      ],
    },
  ],
  diagrams: [
    { title: "Pressure-volume work", labels: ["cylinder with gas", "frictionless movable piston, area A", "external pressure Pext", "distance moved l", "V1 and V2"] },
    { title: "Sign conventions", labels: ["system and surroundings", "+Q heat absorbed", "−Q heat released", "+W work done on the system", "−W work done by the system"] },
    { title: "Enthalpies of fusion, vaporization and sublimation", labels: ["solid, liquid, vapour levels", "ΔfusH", "ΔvapH", "ΔsubH = ΔfusH + ΔvapH"] },
  ],
  mostAsked: [
    { topic: "First law of thermodynamics: state it, its equation for isothermal, adiabatic or isochoric processes, or ΔU from Q and W", years: [2026, 2024, 2022, 2019, 2018, 2017, 2016, 2015, 2014] },
    { topic: "Hess's law: state and explain it, or find an enthalpy of reaction, formation or combustion, or a bond enthalpy", years: [2026, 2025, 2024, 2022, 2020, 2019, 2017, 2016] },
    { topic: "Spontaneity: second law, entropy change, ΔG, or the temperature at which a reaction becomes spontaneous", years: [2026, 2025, 2024, 2023, 2020, 2015] },
    { topic: "Pressure-volume work: against a constant pressure, into vacuum, or in a reaction (\\(W = -\\Delta n_g RT\\)); sign convention", years: [2026, 2025, 2024, 2023, 2020, 2019, 2014] },
    { topic: "Define enthalpy, standard enthalpy of combustion, enthalpy of atomization, vaporization or sublimation, reversible process", years: [2024, 2022, 2020, 2017, 2016, 2015] },
    { topic: "Maximum work in isothermal reversible expansion: derive it, its conditions, or a numerical", years: [2025, 2024, 2023, 2022, 2019, 2017] },
    { topic: "Relation between ΔH and ΔU for a gaseous reaction: derive it, or find ΔU from ΔH, or Δng", years: [2026, 2025, 2023, 2018] },
    { topic: "Define extensive and intensive properties, isobaric and adiabatic processes", years: [2026, 2024, 2023] },
  ],
  mistakes: [
    {
      title: "Wrong signs of Q and W",
      body: "Heat released and work done by the system are both negative. A system that releases 10 kJ of heat and does 15 kJ of work has \\(\\Delta U = -10 - 15 = -25\\) kJ.",
    },
    {
      title: "Mixing kJ and J in \\(\\Delta G\\) or the change-over temperature",
      body: "\\(\\Delta S\\) is in J K⁻¹ and \\(\\Delta H\\) in kJ. Convert first: \\(T = \\frac{60\\,000\\ \\text{J}}{150\\ \\text{J K}^{-1}} = 400\\) K. With both negative, the reaction is spontaneous below 400 K.",
    },
    {
      title: "Counting liquids and solids in \\(\\Delta n_g\\)",
      body: "Only gaseous moles count: \\(\\Delta n_g = n_2 - n_1\\) (products minus reactants). For \\(\\ce{SO2 + 1/2 O2 -> SO3}\\), \\(\\Delta n_g = -0.5\\) per mole of \\(\\ce{SO2}\\); scale it for 2 or 4 moles.",
    },
    {
      title: "Giving work for expansion into vacuum",
      body: "Free expansion is against zero opposing force, so \\(W = 0\\) whatever the volumes.",
    },
    {
      title: "Leaving work in dm³ bar, or using R in the wrong units",
      body: "1 dm³ bar = 100 J. In \\(\\Delta H = \\Delta U + \\Delta n_g RT\\) use \\(R = 8.314 \\times 10^{-3}\\) kJ K⁻¹ mol⁻¹ when \\(\\Delta H\\) is in kJ.",
    },
    {
      title: "Confusing formation and combustion",
      body: "Formation: one mole of compound **made** from its elements in standard states. Combustion: one mole of substance **completely oxidised**. Reverse a reaction and the sign of \\(\\Delta H\\) changes.",
    },
  ],
};

export default sheet;
