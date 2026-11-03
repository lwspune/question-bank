import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Chemistry, Ch. 6 Chemical Kinetics. Statements checked against the
 * Balbharati text (definitions in the book's own words); most-asked years from
 * the board past-paper questions in the bank, 2014-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Chemistry",
  subjectRoute: "chemistry",
  chapterName: "Chemical Kinetics",
  chapterSlug: "chemical-kinetics",
  source: "Balbharati Chemistry Std XII (Maharashtra State Board), Chapter 6",
  keyPoints: [
    {
      term: "Rate of reaction",
      text: "How rapidly the reactants are consumed or the products are formed: the change in concentration per unit time. For \\(\\ce{aA + bB -> cC + dD}\\), rate \\(= -\\frac{1}{a}\\frac{d[A]}{dt} = \\frac{1}{c}\\frac{d[C]}{dt}\\).",
    },
    {
      term: "Instantaneous rate",
      text: "The rate at a given time \\(t_1\\): the slope of the tangent drawn to the concentration versus time curve at \\(t_1\\), written \\(\\frac{dc}{dt}\\).",
    },
    {
      term: "Rate law and rate constant",
      text: "Rate is proportional to the molar concentrations of the reactants raised to simple powers: rate \\(= k[A]^x[B]^y\\). The rate constant \\(k\\) is independent of concentration and varies with temperature; for unit concentrations, \\(k\\) equals the rate.",
    },
    {
      term: "Order of reaction",
      text: "The sum of the powers of the concentration terms in the rate law expression, \\(x + y\\). It is found by experiment and may be an integer, a fraction or zero.",
    },
    {
      term: "Elementary reaction and molecularity",
      text: "An elementary reaction occurs in a single step and cannot be broken down further. The molecularity of an elementary reaction is the number of reactant molecules taking part in it: unimolecular, bimolecular. It is always a whole number.",
    },
    {
      term: "Order versus molecularity",
      text: "**Order:** experimentally determined; sum of powers in the rate law; integer, fraction or zero. **Molecularity:** a theoretical entity; number of molecules in an elementary step; an integer. They may or may not be equal.",
    },
    {
      term: "Rate determining step",
      text: "A complex reaction takes place as a series of elementary steps. The slowest step is the rate determining step: it determines the rate of the overall reaction, so the rate law is written from the slow step.",
    },
    {
      term: "Reaction intermediate",
      text: "A species formed in one step and consumed in the next (Cl in \\(\\ce{2NO2Cl -> 2NO2 + Cl2}\\)). It does not appear in the overall reaction, and its concentration does not appear in the rate law.",
    },
    {
      term: "Half life",
      text: "The time required for the reactant concentration to fall to one half of its initial value. For a first order reaction it is independent of the initial concentration; for a zero order reaction it is proportional to it.",
    },
    {
      term: "Zero order reaction",
      text: "The rate is independent of the reactant concentration. Examples: decomposition of \\(\\ce{NH3}\\) on platinum, of \\(\\ce{N2O}\\) on hot Pt, of \\(\\ce{PH3}\\) on hot tungsten at high pressure.",
    },
    {
      term: "Pseudo first order reaction",
      text: "A reaction expected to be of higher order that follows first order kinetics, because one reactant is in large excess. Example: acid hydrolysis of methyl acetate, where water is the solvent and its concentration stays constant.",
    },
    {
      term: "Activation energy",
      text: "The minimum kinetic energy the colliding molecules must possess for reaction: the height of the energy barrier between reactants and products. A collision succeeds only with energy \\(\\ge E_a\\) **and** proper orientation.",
    },
    {
      term: "Effect of temperature",
      text: "Rate constants depend strongly on temperature. A rise in temperature increases the fraction of molecules with energy equal to or greater than \\(E_a\\), so the rate increases (Arrhenius equation).",
    },
    {
      term: "Catalyst",
      text: "A substance added to the reactants that increases the rate of the reaction without itself being consumed. It provides an alternative pathway of lower activation energy (\\(\\ce{H2O2}\\) with \\(\\ce{I-}\\): 76 to 57 kJ mol⁻¹).",
    },
  ],
  formulas: [
    { label: "Rate law and overall order", latex: "\\text{rate} = k[A]^x[B]^y \\qquad \\text{order} = x + y" },
    {
      label: "First order: integrated rate law",
      latex: "k = \\frac{2.303}{t}\\log_{10}\\frac{[A]_0}{[A]_t}",
    },
    { label: "First order: half life", latex: "t_{1/2} = \\frac{0.693}{k}" },
    {
      label: "First order, gas phase",
      latex: "k = \\frac{2.303}{t}\\log_{10}\\frac{P_i}{2P_i - P}",
      symbols: [
        { symbol: "Pi", meaning: "initial pressure of A" },
        { symbol: "P", meaning: "total pressure at time t, for A(g) to B(g) + C(g)" },
      ],
    },
    {
      label: "Zero order: integrated law and half life",
      latex: "kt = [A]_0 - [A]_t \\qquad t_{1/2} = \\frac{[A]_0}{2k}",
    },
    {
      label: "Units of rate constant",
      latex: "\\text{zero: mol L}^{-1}\\,\\text{s}^{-1} \\qquad \\text{first: s}^{-1} \\qquad \\text{second: L mol}^{-1}\\,\\text{s}^{-1}",
    },
    {
      label: "Arrhenius equation",
      latex: "k = A\\,e^{-E_a/RT} \\qquad \\log_{10}k = \\log_{10}A - \\frac{E_a}{2.303RT}",
    },
    {
      label: "Activation energy from two temperatures",
      latex: "\\log_{10}\\frac{k_2}{k_1} = \\frac{E_a}{2.303R}\\left(\\frac{T_2 - T_1}{T_1T_2}\\right)",
    },
  ],
  derivations: [
    {
      title: "Integrated rate law for a first order reaction",
      steps: [
        "For \\(\\ce{A -> P}\\): rate \\(= -\\frac{d[A]}{dt} = k[A]\\), so \\(\\frac{d[A]}{[A]} = -k\\,dt\\).",
        "Integrate from \\([A]_0\\) at \\(t = 0\\) to \\([A]_t\\) at \\(t\\): \\(\\ln[A]_t - \\ln[A]_0 = -kt\\).",
        "So \\(k = \\frac{2.303}{t}\\log_{10}\\frac{[A]_0}{[A]_t}\\).",
      ],
    },
    {
      title: "Relation between half life and rate constant for a first order reaction",
      steps: [
        "Start from \\(k = \\frac{2.303}{t}\\log_{10}\\frac{[A]_0}{[A]_t}\\).",
        "At \\(t = t_{1/2}\\), \\([A]_t = \\frac{[A]_0}{2}\\), so \\(k = \\frac{2.303}{t_{1/2}}\\log_{10}2 = \\frac{2.303 \\times 0.3010}{t_{1/2}}\\).",
        "Hence \\(t_{1/2} = \\frac{0.693}{k}\\): independent of the initial concentration.",
      ],
    },
    {
      title: "Time for 99.9 % completion is three times that for 90 % completion",
      steps: [
        "90 %: \\([A]_t = 0.1[A]_0\\), so \\(t_{90} = \\frac{2.303}{k}\\log_{10}10 = \\frac{2.303}{k}\\).",
        "99.9 %: \\([A]_t = 0.001[A]_0\\), so \\(t_{99.9} = \\frac{2.303}{k}\\log_{10}1000 = \\frac{3 \\times 2.303}{k}\\).",
        "Hence \\(t_{99.9} = 3\\,t_{90}\\).",
      ],
    },
    {
      title: "Integrated rate law and half life of a zero order reaction",
      steps: [
        "Rate \\(= -\\frac{d[A]}{dt} = k[A]^0 = k\\), so \\(d[A] = -k\\,dt\\).",
        "Integrate from \\([A]_0\\) at \\(t = 0\\) to \\([A]_t\\) at \\(t\\): \\([A]_t - [A]_0 = -kt\\), so \\(kt = [A]_0 - [A]_t\\).",
        "Units of \\(k\\): mol dm⁻³ s⁻¹, the same as the rate.",
        "At \\(t_{1/2}\\), \\([A]_t = \\frac{[A]_0}{2}\\), so \\(t_{1/2} = \\frac{[A]_0}{2k}\\).",
      ],
    },
    {
      title: "Arrhenius equation: activation energy from rate constants at two temperatures",
      steps: [
        "\\(k = A\\,e^{-E_a/RT}\\); take logs: \\(\\log_{10}k = \\log_{10}A - \\frac{E_a}{2.303RT}\\).",
        "A plot of \\(\\log_{10}k\\) against \\(\\frac{1}{T}\\) is a straight line of slope \\(-\\frac{E_a}{2.303R}\\).",
        "Write it at \\(T_1\\) and \\(T_2\\) and subtract: \\(\\log_{10}\\frac{k_2}{k_1} = \\frac{E_a}{2.303R}\\left(\\frac{T_2 - T_1}{T_1T_2}\\right)\\).",
      ],
    },
  ],
  diagrams: [
    {
      title: "Potential energy barrier",
      labels: ["energy on the vertical axis", "reactants and products", "activated complex at the top", "activation energy Ea", "ΔH between reactants and products"],
    },
    {
      title: "Potential energy barriers for catalysed and uncatalysed reactions",
      labels: ["uncatalysed barrier (Ea)1", "catalysed barrier (Ea)2, lower", "reactants and products at the same levels"],
    },
    {
      title: "Arrhenius plot: log10 k against 1/T",
      labels: ["straight line", "slope = -Ea/2.303R", "intercept = log10 A"],
    },
    {
      title: "First order: log10 [A]t against time",
      labels: ["straight line", "slope = -k/2.303", "intercept = log10 [A]0"],
    },
    {
      title: "Zero order: [A]t against time",
      labels: ["straight line", "slope = -k", "intercept = [A]0"],
    },
  ],
  mostAsked: [
    {
      topic: "Zero order reaction: define it, derive its integrated rate law, its half life or the unit of k",
      years: [2026, 2025, 2024, 2023, 2020, 2018],
    },
    {
      topic: "Derive the relation between half life and rate constant for a first order reaction, or a half life numerical",
      years: [2025, 2024, 2022, 2019, 2014],
    },
    {
      topic: "Molecularity, order versus molecularity, and complex reactions (rate law from the slow step, reaction intermediate)",
      years: [2026, 2025, 2017],
    },
    {
      topic: "First order numericals: rate constant from the fraction decomposed, or 99.9 % versus 90 % completion",
      years: [2026, 2023, 2019, 2016],
    },
    { topic: "Rate law, order and rate constant from rate data", years: [2026, 2025, 2024, 2017] },
    { topic: "Order of reaction from the unit of rate constant", years: [2026, 2025, 2024] },
    { topic: "Arrhenius equation: derive it, or find the activation energy from two temperatures", years: [2026, 2019, 2017] },
    { topic: "Pseudo first order reaction, with an example", years: [2023, 2020] },
  ],
  mistakes: [
    {
      title: "Writing the rate law from the overall equation",
      body: "Order is found by experiment. For a complex reaction, write the rate law from the **slow** step, and never put the intermediate's concentration in it.",
    },
    {
      title: "Giving a molecularity of zero or a fraction",
      body: "Molecularity applies to an elementary step and is a whole number. Order can be zero or a fraction.",
    },
    {
      title: "Forgetting 2.303 when changing ln to log",
      body: "\\(\\ln x = 2.303\\log_{10}x\\). Keep \\(\\frac{[A]_0}{[A]_t}\\) right way up: for 60 % decomposed, \\([A]_t = 0.4[A]_0\\), not \\(0.6[A]_0\\).",
    },
    {
      title: "Using the first order half life for a zero order reaction",
      body: "\\(t_{1/2} = \\frac{0.693}{k}\\) is only for first order (independent of \\([A]_0\\)). For zero order, \\(t_{1/2} = \\frac{[A]_0}{2k}\\).",
    },
    {
      title: "Mismatched units in Arrhenius numericals",
      body: "Temperatures in kelvin; with \\(R = 8.314\\) J K⁻¹ mol⁻¹, \\(E_a\\) comes out in J mol⁻¹, so divide by 1000 for kJ mol⁻¹.",
    },
    {
      title: "Mixing time units with \\(k\\)",
      body: "If \\(k\\) is in min⁻¹, \\(t_{1/2}\\) is in minutes. Convert before comparing with an answer in seconds.",
    },
  ],
};

export default sheet;
