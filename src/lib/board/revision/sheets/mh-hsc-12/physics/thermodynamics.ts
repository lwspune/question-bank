import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Physics, Ch. 4 Thermodynamics. Statements checked against the
 * Balbharati text (law wordings are the book's own); most-asked years from the
 * 30 board past-paper questions in the bank, 2017-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Physics",
  subjectRoute: "physics",
  chapterName: "Thermodynamics",
  chapterSlug: "thermodynamics",
  source: "Balbharati Physics Std XII (Maharashtra State Board), Chapter 4",
  keyPoints: [
    {
      term: "Zeroth law of thermodynamics",
      text: "If two systems are each in thermal equilibrium with a third system, they are also in thermal equilibrium with each other. Systems in thermal equilibrium are at the same temperature: this is why a thermometer can measure temperature.",
    },
    {
      term: "Thermodynamic system and surroundings",
      text: "A group of objects that forms a unit which may exchange energy with its surroundings. Anything not part of the system is its **surroundings** (environment). **Open**: exchanges energy and matter (kettle). **Closed**: energy only (boiler). **Isolated**: neither (thermos flask).",
    },
    {
      term: "Internal energy",
      text: "The energy associated with the random, disordered motion of the molecules of a system. For an ideal gas it depends only on temperature. It can be changed in two ways: by heating the system or by doing work on it.",
    },
    {
      term: "Heat",
      text: "The energy transferred between a system and its environment because of a temperature difference between them. \\(Q > 0\\) when the system gains heat, \\(Q < 0\\) when it loses heat.",
    },
    {
      term: "Thermodynamic equilibrium",
      text: "All three at once. **Mechanical**: no unbalanced forces within the system or with its surroundings (same pressure throughout). **Chemical**: no chemical reactions and no transfer of matter by diffusion. **Thermal**: temperature uniform throughout and not changing with time.",
    },
    {
      term: "First law of thermodynamics",
      text: "\\(\\Delta U = Q - W\\): the change in internal energy of a system is the difference between the heat supplied to the system and the work done by it. It extends the law of conservation of energy to systems that exchange heat and work.",
    },
    {
      term: "Work done by a system",
      text: "\\(dW = p\\,dV\\). In expansion the work done by the gas is positive; in compression it is negative. The area under the p-V curve is the work, and it depends on the path, not only on the initial and final states.",
    },
    {
      term: "Thermodynamic process",
      text: "A procedure by which the initial state of a system changes to its final state. Types: isothermal (constant T), isobaric (constant p), isochoric (constant V), adiabatic (no heat exchanged), cyclic, and free expansion.",
    },
    {
      term: "Isothermal process",
      text: "Pressure and volume change at constant temperature: \\(\\Delta T = 0\\), so for an ideal gas \\(\\Delta U = 0\\) and \\(Q = W\\). It is very slow, and the system stays in thermal equilibrium with its environment. Any change of phase is isothermal.",
    },
    {
      term: "Adiabatic process",
      text: "No transfer of heat to or from the system: \\(Q = 0\\), so \\(\\Delta U = -W\\). Achieved by perfect insulation or a very rapid change (a punctured tyre). Adiabatic expansion cools the gas; adiabatic compression heats it.",
    },
    {
      term: "Isobaric and isochoric processes",
      text: "**Isobaric**: constant pressure, \\(W = p\\Delta V\\); the heat goes partly into work and partly into internal energy. **Isochoric**: constant volume, so \\(W = 0\\) and \\(Q = \\Delta U\\): all the heat raises the internal energy.",
    },
    {
      term: "Cyclic process",
      text: "A process that returns a system to its initial state. \\(\\Delta U = 0\\), so \\(Q = W\\). The net work is the area enclosed by the loop on the p-V diagram. Every heat engine works on a cyclic process.",
    },
    {
      term: "Carnot engine",
      text: "A hypothetical, reversible engine of maximum efficiency. Cycle: isothermal expansion AB, adiabatic expansion BC, isothermal compression CD, adiabatic compression DA. All Carnot engines between the same two temperatures have the same efficiency, whatever the working substance.",
    },
    {
      term: "Second law of thermodynamics",
      text: "**Kelvin-Planck**: it is impossible to extract heat \\(Q_H\\) from a hot reservoir and use it all to do work; some heat must go to a cold reservoir (no perfect engine). **Clausius**: heat cannot flow from a colder body to a warmer body without work being done (no perfect refrigerator).",
    },
  ],
  formulas: [
    { label: "Work done by a gas", latex: "W = \\int_{V_i}^{V_f} p\\,dV \\qquad W = p(V_f - V_i) \\text{ at constant } p" },
    { label: "First law", latex: "\\Delta U = Q - W \\qquad Q = \\Delta U + W" },
    {
      label: "Isothermal process",
      latex: "pV = \\text{constant} \\qquad W = Q = nRT\\ln\\frac{V_f}{V_i} = 2.303\\,nRT\\log_{10}\\frac{V_f}{V_i} = nRT\\ln\\frac{p_i}{p_f}",
    },
    { label: "Isobaric process", latex: "W = p\\Delta V = nR(T_f - T_i) \\qquad \\Delta U = nC_V\\Delta T" },
    { label: "Isochoric process", latex: "W = 0 \\qquad Q = \\Delta U = nC_V\\Delta T" },
    { label: "Adiabatic process", latex: "pV^\\gamma = \\text{constant} \\qquad Q = 0 \\qquad \\Delta U = -W \\qquad \\gamma = \\frac{C_p}{C_V}" },
    { label: "Adiabatic work", latex: "W = \\frac{p_iV_i - p_fV_f}{\\gamma - 1} = \\frac{nR(T_i - T_f)}{\\gamma - 1}" },
    {
      label: "Adiabatic ratio",
      latex: "\\gamma = \\frac{5}{3} \\text{ (monatomic)} \\qquad \\gamma = \\frac{7}{5} \\text{ (diatomic)} \\qquad \\gamma = \\frac{4}{3} \\text{ (triatomic)}",
    },
    { label: "Cyclic process", latex: "\\Delta U = 0 \\qquad Q = W = \\text{area of the loop}" },
    { label: "Efficiency of a heat engine", latex: "\\eta = \\frac{W}{Q_H} = 1 - \\frac{|Q_C|}{Q_H}" },
    { label: "Coefficient of performance of a refrigerator", latex: "K = \\frac{Q_C}{|W|} = \\frac{Q_C}{|Q_H| - Q_C}" },
    { label: "Carnot engine and Carnot refrigerator", latex: "\\eta = 1 - \\frac{T_C}{T_H} \\qquad K = \\frac{T_C}{T_H - T_C}" },
  ],
  derivations: [
    {
      title: "Work done by a gas in changing its volume",
      steps: [
        "Gas in a cylinder with a movable, massless, frictionless piston of area \\(A\\); the gas exerts a force \\(F = pA\\) on it.",
        "The piston moves through \\(dx\\): \\(dW = F\\,dx = pA\\,dx = p\\,dV\\).",
        "From \\(V_i\\) to \\(V_f\\): \\(W = \\int_{V_i}^{V_f} p\\,dV\\), the area under the p-V curve.",
        "At constant pressure \\(W = p(V_f - V_i)\\). Expansion gives \\(W > 0\\), compression \\(W < 0\\).",
      ],
    },
    {
      title: "Obtain an expression for the work done during an isothermal process",
      steps: [
        "Ideal gas at constant \\(T\\) expands from \\(V_i\\) to \\(V_f\\): \\(W = \\int_{V_i}^{V_f} p\\,dV\\).",
        "From \\(pV = nRT\\), \\(p = \\frac{nRT}{V}\\), so \\(W = nRT\\int_{V_i}^{V_f} \\frac{dV}{V}\\).",
        "\\(W = nRT\\ln\\frac{V_f}{V_i} = 2.303\\,nRT\\log_{10}\\frac{V_f}{V_i}\\).",
        "Internal energy depends only on \\(T\\), so \\(\\Delta U = 0\\) and \\(Q = W\\): all the heat absorbed is converted into work.",
      ],
    },
    {
      title: "Work done during an adiabatic process",
      steps: [
        "Adiabatic: \\(Q = 0\\) and \\(pV^\\gamma = C\\), where \\(\\gamma = \\frac{C_p}{C_V}\\).",
        "\\(W = \\int_{V_i}^{V_f} \\frac{C}{V^\\gamma}\\,dV = \\frac{C}{1 - \\gamma}\\left(V_f^{1-\\gamma} - V_i^{1-\\gamma}\\right)\\).",
        "Put \\(C = p_fV_f^\\gamma = p_iV_i^\\gamma\\): \\(W = \\frac{p_iV_i - p_fV_f}{\\gamma - 1}\\).",
        "With \\(pV = nRT\\): \\(W = \\frac{nR(T_i - T_f)}{\\gamma - 1}\\). Expansion (\\(W > 0\\)) gives \\(T_f < T_i\\): the gas cools.",
      ],
    },
    {
      title: "Explain a cyclic process with a p-V diagram",
      steps: [
        "The system goes from A to B along path 1 and comes back to A along path 2: the initial and final states are the same.",
        "So \\(\\Delta U = 0\\), and the first law gives \\(Q = W\\).",
        "Work from A to B is the area under path 1; work from B to A is the area under path 2, negative because the volume decreases.",
        "Net work = area enclosed by the loop: positive for a clockwise loop, negative for an anticlockwise one.",
      ],
    },
    {
      title: "Efficiency of a heat engine",
      steps: [
        "In one cycle the working substance absorbs \\(Q_H\\) at the source, rejects \\(|Q_C|\\) at the sink and does work \\(W\\).",
        "The process is cyclic, so \\(\\Delta U = 0\\) and \\(W = Q_H - |Q_C|\\).",
        "\\(\\eta = \\frac{W}{Q_H} = 1 - \\frac{|Q_C|}{Q_H}\\). Some heat is always rejected, so \\(\\eta < 1\\).",
        "For a Carnot engine \\(\\frac{|Q_C|}{Q_H} = \\frac{T_C}{T_H}\\), so \\(\\eta = 1 - \\frac{T_C}{T_H}\\).",
      ],
    },
    {
      title: "Coefficient of performance of a refrigerator",
      steps: [
        "The refrigerant absorbs \\(Q_C\\) from the cold region, the compressor does work \\(|W|\\) on it, and it rejects \\(|Q_H|\\) to the hot surroundings.",
        "The process is cyclic, so \\(|Q_H| = Q_C + |W|\\).",
        "\\(K = \\frac{Q_C}{|W|} = \\frac{Q_C}{|Q_H| - Q_C}\\), a dimensionless number: larger is better.",
        "For a Carnot refrigerator, \\(K = \\frac{T_C}{T_H - T_C}\\): very large when the temperature difference is small.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Positive and negative work with varying pressure",
      labels: ["axes p and V", "expansion: arrow towards larger V, W > 0", "compression: arrow towards smaller V, W < 0", "shaded area under the curve = work"],
    },
    {
      title: "p-V diagram of an isothermal process",
      labels: ["isotherm, pV = constant", "initial state (Vi, pi) and final state (Vf, pf)", "shaded area under the curve = work done"],
    },
    {
      title: "p-V diagram of a cyclic process",
      labels: ["closed loop through A and B", "path 1 (A to B) and path 2 (B to A) with arrows", "enclosed area = net work", "axes p and V"],
    },
    {
      title: "Energy flow diagram of a heat engine",
      labels: ["hot reservoir (source) at TH", "heat QH into the engine", "work W out of the engine", "heat QC rejected to the cold reservoir (sink) at TC"],
    },
    {
      title: "Energy flow diagram of a refrigerator",
      labels: ["cold reservoir at TC, heat QC drawn out", "work W done on the refrigerant", "heat QH rejected to the hot reservoir at TH"],
    },
    {
      title: "Carnot cycle",
      labels: ["AB isothermal expansion at TH", "BC adiabatic expansion", "CD isothermal compression at TC", "DA adiabatic compression", "QH absorbed on AB, QC rejected on CD"],
    },
  ],
  mostAsked: [
    { topic: "Isothermal process: define it, derive \\(W = nRT\\ln\\frac{V_f}{V_i}\\), or a numerical", years: [2026, 2025, 2024, 2023, 2020, 2017] },
    { topic: "First law of thermodynamics: conservation of energy, its form for a process, or a numerical on \\(\\Delta U\\)", years: [2026, 2024, 2023, 2022] },
    { topic: "Define mechanical, chemical and thermal equilibrium; the zeroth law", years: [2026, 2025, 2022] },
    { topic: "Adiabatic process: what it is, its work and \\(\\gamma\\), or a numerical", years: [2026, 2025, 2023] },
    { topic: "Explain a cyclic process with a neat p-V diagram", years: [2026, 2024] },
    { topic: "Thermodynamic system, surroundings and thermodynamic process", years: [2025, 2024, 2022] },
    { topic: "Positive and negative work on a p-V diagram, or work at constant pressure", years: [2024, 2022] },
    { topic: "Carnot engine efficiency or Carnot refrigerator coefficient of performance: a numerical", years: [2026, 2025] },
  ],
  mistakes: [
    {
      title: "Getting the sign of W or Q wrong",
      body: "In \\(\\Delta U = Q - W\\), \\(W\\) is work done **by** the system. Work done **on** the gas is negative, and heat released is negative: 104 kJ of work on a gas that releases 125 kJ gives \\(\\Delta U = -125 - (-104) = -21\\) kJ.",
    },
    {
      title: "Reading \\(\\ln\\) as \\(\\log_{10}\\)",
      body: "\\(W = nRT\\ln\\frac{V_f}{V_i}\\) uses the natural log; with common logs write \\(2.303\\,nRT\\log_{10}\\frac{V_f}{V_i}\\). Put \\(T\\) in kelvin; the volumes may stay in litres, since only their ratio enters.",
    },
    {
      title: "Celsius in the Carnot formulas",
      body: "\\(\\eta = 1 - \\frac{T_C}{T_H}\\) and \\(K = \\frac{T_C}{T_H - T_C}\\) need kelvin. Efficiency is a fraction; multiply by 100 only to quote a percentage.",
    },
    {
      title: "Mixing up isothermal and adiabatic",
      body: "Isothermal: \\(\\Delta T = 0\\), \\(\\Delta U = 0\\), \\(Q = W\\), and heat **is** exchanged. Adiabatic: \\(Q = 0\\), the temperature changes and \\(\\Delta U = -W\\). The adiabatic curve is steeper than the isotherm.",
    },
    {
      title: "Writing \\(Q = W = 0\\) for a cyclic process",
      body: "Only \\(\\Delta U = 0\\) over a cycle. \\(Q = W\\) = the area of the loop, which is not zero; its sign depends on the direction round the loop.",
    },
    {
      title: "Work in a free expansion",
      body: "The volume increases, but there is no piston to push: \\(Q = W = 0\\) and \\(\\Delta U = 0\\). Free expansion is not in equilibrium and cannot be plotted on a p-V diagram.",
    },
  ],
};

export default sheet;
