import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 12 Chemistry, Ch. 3 Chemical Kinetics. Statements checked against
 * the NCERT text (definitions in the book's own words); most-asked years and
 * marks from the CBSE board past-paper questions in the bank, 2022-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Chemistry",
  subjectRoute: "chemistry",
  chapterName: "Chemical Kinetics",
  chapterSlug: "chemical-kinetics",
  source: "NCERT Chemistry Part I (CBSE Class 12), Chapter 3",
  keyPoints: [
    {
      term: "Rate of reaction",
      text: "The change in concentration of a reactant or product in unit time. **Average rate** depends on the change in concentration and the time taken for it. **Instantaneous rate** is the average rate over the smallest interval \\(dt\\): the slope of the tangent at time \\(t\\). Factors: concentration, temperature, catalyst.",
    },
    {
      term: "Rate law and rate constant",
      text: "Rate law is the expression in which reaction rate is given in terms of molar concentration of reactants with each term raised to some power, which may or may not equal its stoichiometric coefficient. The constant \\(k\\) is the rate constant: the rate when every concentration is 1 mol L⁻¹.",
    },
    {
      term: "Order of a reaction",
      text: "The sum of the powers of the concentration terms in the rate law. It is an experimental quantity and can be 0, 1, 2, 3 and even a fraction. A zero order reaction means that the rate of reaction is independent of the concentration of reactants.",
    },
    {
      term: "Molecularity",
      text: "The number of reacting species (atoms, ions or molecules) taking part in an elementary reaction, which must collide simultaneously in order to bring about a chemical reaction. It cannot be zero or a non integer.",
    },
    {
      term: "Elementary and complex reactions",
      text: "Reactions taking place in one step are elementary; a sequence of elementary reactions (the mechanism) gives a complex reaction. The slowest step is the **rate determining step**; the order of a complex reaction is given by the slowest step. For a complex reaction molecularity has no meaning.",
    },
    {
      term: "Order against molecularity",
      text: "Order is experimental, may be zero or fractional, and applies to elementary and complex reactions. Molecularity is theoretical, always a whole number (1, 2 or 3), and applies only to elementary reactions.",
    },
    {
      term: "Zero order reaction",
      text: "Rate is independent of concentration. Examples: decomposition of gaseous ammonia on a hot platinum surface at high pressure (the surface is saturated), some enzyme catalysed reactions. \\([R]\\) against \\(t\\) is a straight line of slope \\(-k\\), intercept \\([R]_0\\).",
    },
    {
      term: "First order reaction",
      text: "Rate is proportional to the first power of the reactant concentration. Examples: hydrogenation of ethene, all natural and artificial radioactive decay. \\(\\ln[R]\\) against \\(t\\) is a straight line of slope \\(-k\\); its half-life does not depend on \\([R]_0\\).",
    },
    {
      term: "Half-life",
      text: "The time in which the concentration of a reactant is reduced to one half of its initial concentration. Zero order: \\(t_{1/2} \\propto [R]_0\\). First order: \\(t_{1/2}\\) independent of \\([R]_0\\).",
    },
    {
      term: "Pseudo first order reaction",
      text: "A reaction of higher order that behaves as first order because one reactant is in large excess, so its concentration does not get altered much. Examples: acid hydrolysis of ethyl acetate (water in excess), inversion of cane sugar.",
    },
    {
      term: "Temperature and activation energy",
      text: "For a rise in temperature by 10°, the rate constant is nearly doubled. Activation energy \\(E_a\\) is the energy required to form the activated complex. Raising the temperature increases the fraction of molecules with energy \\(\\geq E_a\\), \\(e^{-E_a/RT}\\).",
    },
    {
      term: "Catalyst",
      text: "A substance which increases the rate of a reaction without itself undergoing any permanent chemical change. It provides an alternate pathway with lower activation energy. It does not alter \\(\\Delta G\\) or the equilibrium constant, and does not catalyse non-spontaneous reactions.",
    },
    {
      term: "Collision frequency and effective collisions",
      text: "Collision frequency \\(Z\\): the number of collisions per second per unit volume of the reaction mixture. Effective collisions: those in which molecules collide with sufficient kinetic energy (threshold energy) and proper orientation, so that bonds break and new bonds form.",
    },
  ],
  formulas: [
    {
      label: "Rate in terms of each species",
      latex: "aA + bB \\to cC + dD: \\quad \\text{Rate} = -\\frac{1}{a}\\frac{d[A]}{dt} = -\\frac{1}{b}\\frac{d[B]}{dt} = \\frac{1}{c}\\frac{d[C]}{dt} = \\frac{1}{d}\\frac{d[D]}{dt}",
    },
    { label: "Rate law", latex: "\\text{Rate} = k[A]^x[B]^y \\qquad \\text{order} = x + y" },
    { label: "Zero order", latex: "k = \\frac{[R]_0 - [R]}{t} \\qquad t_{1/2} = \\frac{[R]_0}{2k}" },
    {
      label: "First order",
      latex: "k = \\frac{2.303}{t}\\log\\frac{[R]_0}{[R]} \\qquad t_{1/2} = \\frac{0.693}{k}",
    },
    {
      label: "First order, gas phase",
      latex: "k = \\frac{2.303}{t}\\log\\frac{p_i}{2p_i - p_t}",
      symbols: [{ symbol: "pᵢ, pₜ", meaning: "initial pressure and total pressure at time t, for A(g) → B(g) + C(g)" }],
    },
    {
      label: "Units of rate constant",
      latex: "k:\\ (\\text{mol L}^{-1})^{1-n}\\,\\text{s}^{-1} \\quad \\text{zero: mol L}^{-1}\\text{s}^{-1};\\ \\text{first: s}^{-1};\\ \\text{second: L mol}^{-1}\\text{s}^{-1}",
    },
    { label: "Arrhenius equation", latex: "k = A\\,e^{-E_a/RT} \\qquad \\ln k = \\ln A - \\frac{E_a}{RT}" },
    {
      label: "Rate constants at two temperatures",
      latex: "\\log\\frac{k_2}{k_1} = \\frac{E_a}{2.303R}\\left[\\frac{T_2 - T_1}{T_1T_2}\\right]",
      symbols: [{ symbol: "R", meaning: "8.314 J K⁻¹ mol⁻¹; T in kelvin" }],
    },
    {
      label: "Slope of the Arrhenius plot",
      latex: "\\ln k \\text{ vs } \\frac{1}{T}: \\text{slope} = -\\frac{E_a}{R} \\qquad \\log k \\text{ vs } \\frac{1}{T}: \\text{slope} = -\\frac{E_a}{2.303R}",
    },
    { label: "Collision theory", latex: "\\text{Rate} = P\\,Z_{AB}\\,e^{-E_a/RT}" },
  ],
  derivations: [
    {
      title: "Integrated rate equation for a zero order reaction",
      steps: [
        "For \\(R \\to P\\): \\(\\text{Rate} = -\\frac{d[R]}{dt} = k[R]^0 = k\\).",
        "Integrate: \\([R] = -kt + I\\); at \\(t = 0\\), \\([R] = [R]_0\\), so \\(I = [R]_0\\).",
        "\\([R] = [R]_0 - kt\\), so \\(k = \\frac{[R]_0 - [R]}{t}\\).",
      ],
    },
    {
      title: "Integrated rate equation for a first order reaction",
      steps: [
        "\\(-\\frac{d[R]}{dt} = k[R]\\), so \\(\\frac{d[R]}{[R]} = -k\\,dt\\).",
        "Integrate: \\(\\ln[R] = -kt + I\\); at \\(t = 0\\), \\(I = \\ln[R]_0\\).",
        "\\(\\ln\\frac{[R]_0}{[R]} = kt\\), so \\(k = \\frac{2.303}{t}\\log\\frac{[R]_0}{[R]}\\).",
      ],
    },
    {
      title: "Half-life of zero and first order reactions",
      steps: [
        "Put \\([R] = \\frac{[R]_0}{2}\\) at \\(t = t_{1/2}\\).",
        "Zero order: \\(t_{1/2} = \\frac{[R]_0}{2k}\\), proportional to the initial concentration.",
        "First order: \\(k = \\frac{2.303}{t_{1/2}}\\log 2\\), so \\(t_{1/2} = \\frac{0.693}{k}\\), independent of \\([R]_0\\).",
      ],
    },
    {
      title: "Show that for a first order reaction \\(t_{99\\%} = 2t_{90\\%}\\) and \\(t_{99.9\\%} = 10\\,t_{1/2}\\)",
      steps: [
        "\\(t_{90\\%} = \\frac{2.303}{k}\\log\\frac{100}{10} = \\frac{2.303}{k}\\).",
        "\\(t_{99\\%} = \\frac{2.303}{k}\\log\\frac{100}{1} = \\frac{2.303 \\times 2}{k} = 2t_{90\\%}\\).",
        "\\(t_{99.9\\%} = \\frac{2.303}{k}\\log 1000 = \\frac{6.909}{k}\\), and \\(t_{1/2} = \\frac{0.693}{k}\\), so \\(t_{99.9\\%} \\approx 10\\,t_{1/2}\\).",
      ],
    },
  ],
  diagrams: [
    {
      title: "Concentration against time, zero order",
      labels: ["y-axis [R], x-axis t", "straight line falling", "intercept = [R]₀", "slope = -k"],
    },
    {
      title: "ln[R] against t, first order",
      labels: ["y-axis ln[R], x-axis t", "straight line falling", "intercept = ln[R]₀", "slope = -k"],
    },
    {
      title: "log([R]₀/[R]) against t, first order",
      labels: ["straight line through origin", "slope = k/2.303"],
    },
    {
      title: "Potential energy against reaction coordinate",
      labels: ["reactants and products levels", "activated complex at the peak", "Ea marked from reactants to peak", "ΔH (reaction enthalpy)"],
    },
    {
      title: "Effect of a catalyst on activation energy",
      labels: ["energy profile without catalyst", "lower peak with catalyst", "Ea lowered", "reactant and product levels unchanged"],
    },
    {
      title: "Plot of ln k against 1/T",
      labels: ["straight line falling", "slope = -Ea/R", "intercept = ln A"],
    },
  ],
  mostAsked: [
    {
      topic: "Temperature, catalyst and collisions: Arrhenius equation, \\(E_a\\) from rates at two temperatures, the \\(\\ln k\\) against \\(1/T\\) plot, effective collisions",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Order and molecularity: definitions, differences, complex reactions and the rate determining step, pseudo first order reactions",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "First order reaction: \\(k\\), half-life or time for a given % completion from the integrated rate equation, or show that \\(t_{99\\%} = 2t_{90\\%}\\)",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Rate law: order from a rate law or initial-rate data, and the change in rate when a concentration changes",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Graphs and half-life: slope and intercept of \\([R]\\) or \\(\\ln[R]\\) against \\(t\\), zero order reactions, and how \\(t_{1/2}\\) depends on \\([R]_0\\)",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Rate of reaction: average and instantaneous rate, rate in terms of each reactant and product, factors affecting rate",
      marks: 1,
      years: [2026, 2024, 2023, 2022],
    },
    {
      topic: "Units of the rate constant: write them for an order, or find the order from them",
      marks: 1,
      years: [2025, 2024, 2023, 2022],
    },
  ],
  mistakes: [
    {
      title: "Reading the order from the balanced equation",
      body: "Order comes only from the rate law (experiment). For \\(\\ce{A + 2B -> P}\\) with Rate \\(= k[A]^{1/2}[B]\\), the order is 1.5, not 3. For \\(\\ce{CHCl3 + Cl2 -> CCl4 + HCl}\\), Rate \\(= k[\\ce{CHCl3}][\\ce{Cl2}]^{1/2}\\): order 1.5.",
    },
    {
      title: "Wrong factor when concentration changes",
      body: "Rate \\(\\propto [A]^n\\): tripling a second order reactant makes the rate 9 times; rate 27 times on tripling means third order; 16 times on a fourfold rise means second order. Change each reactant separately, then multiply.",
    },
    {
      title: "Using \\(\\%\\) completed in place of \\(\\%\\) left",
      body: "In \\(\\log\\frac{[R]_0}{[R]}\\), \\([R]\\) is what is **left**. 75 % complete means \\([R] = 25\\), ratio 4; 30 % complete means ratio \\(\\frac{100}{70}\\). Mass works as well as concentration (5 g to 3 g: ratio \\(\\frac{5}{3}\\)).",
    },
    {
      title: "Mixing up the two Arrhenius forms",
      body: "With \\(\\log\\) use \\(2.303R\\); with \\(\\ln\\) use \\(R\\). Convert °C to K (17 °C = 290 K). \\(R = 8.314\\) J K⁻¹ mol⁻¹ gives \\(E_a\\) in J mol⁻¹; divide by 1000 for kJ.",
    },
    {
      title: "Wrong signs on rate expressions",
      body: "Reactant terms carry a minus sign and are divided by their coefficients: for \\(\\ce{N2 + 3H2 -> 2NH3}\\), Rate \\(= -\\frac{d[\\ce{N2}]}{dt} = -\\frac{1}{3}\\frac{d[\\ce{H2}]}{dt} = \\frac{1}{2}\\frac{d[\\ce{NH3}]}{dt}\\).",
    },
    {
      title: "Saying a catalyst changes \\(\\Delta H\\), \\(\\Delta G\\) or \\(K\\)",
      body: "A catalyst lowers only \\(E_a\\) (so \\(k\\) rises). Enthalpy, Gibbs energy and the equilibrium constant stay the same; it speeds up the forward and backward reactions alike.",
    },
  ],
};

export default sheet;
