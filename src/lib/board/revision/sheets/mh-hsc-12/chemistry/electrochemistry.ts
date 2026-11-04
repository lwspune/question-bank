import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Chemistry, Ch. 5 Electrochemistry. Statements checked against the
 * Balbharati text (definitions and laws in the book's own words); most-asked
 * years from the board past-paper questions in the bank, 2014-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Chemistry",
  subjectRoute: "chemistry",
  chapterName: "Electrochemistry",
  chapterSlug: "electrochemistry",
  source: "Balbharati Chemistry Std XII (Maharashtra State Board), Chapter 5",
  keyPoints: [
    {
      term: "Conductivity",
      text: "The electrical conductance of a conductor of unit length and unit area of cross section, that is, of unit cube of material: \\(\\kappa = \\frac{1}{\\rho}\\). SI unit S m⁻¹; common unit \\(\\Omega^{-1}\\) cm⁻¹.",
    },
    {
      term: "Cell constant",
      text: "For a given cell, the ratio of separation \\(l\\) between the two electrodes divided by the area of cross section \\(a\\) of the electrode. SI unit m⁻¹, conveniently expressed in cm⁻¹.",
    },
    {
      term: "Molar conductivity",
      text: "The electrolytic conductivity \\(\\kappa\\) divided by the molar concentration \\(c\\): the conductance due to the ions from 1 mole of electrolyte. SI unit S m² mol⁻¹; common unit \\(\\Omega^{-1}\\) cm² mol⁻¹.",
    },
    {
      term: "Molar conductivity and dilution",
      text: "It increases on dilution. A **strong** electrolyte reaches a limiting value \\(\\Lambda_0\\) (molar conductivity at zero concentration). A **weak** electrolyte rises rapidly on dilution but stays below \\(\\Lambda_0\\) even at 0.001 M.",
    },
    {
      term: "Kohlrausch law of independent migration of ions",
      text: "At infinite dilution each ion migrates independent of co-ion and contributes to total molar conductivity of an electrolyte irrespective of the nature of other ion to which it is associated. Used to find \\(\\Lambda_0\\) of a weak electrolyte.",
    },
    {
      term: "Electrolytic and galvanic cells",
      text: "**Electrolytic:** a nonspontaneous reaction is forced by direct current; electrical energy becomes chemical energy; anode positive. **Galvanic:** a spontaneous reaction produces electricity; chemical energy becomes electrical energy; anode negative.",
    },
    {
      term: "Electrolysis of aqueous NaCl",
      text: "\\(\\ce{H2}\\) is liberated at the cathode and \\(\\ce{Cl2}\\) (not \\(\\ce{O2}\\), because of overvoltage) at the anode. \\(\\ce{Na+}\\) stays and \\(\\ce{OH-}\\) forms, so NaCl solution becomes NaOH solution.",
    },
    {
      term: "Salt bridge",
      text: "A U tube holding a saturated solution of an inert electrolyte (KCl or \\(\\ce{NH4NO3}\\)) in agar gel. It completes the electrical circuit, prevents mixing of the two solutions and maintains electrical neutrality in both by transfer of ions.",
    },
    {
      term: "Cell notation",
      text: "Anode (\\(-\\)) at the extreme left, cathode (\\(+\\)) at the extreme right. A single vertical line is a phase boundary; a double vertical line means a salt bridge. Oxidation is written for the left electrode, reduction for the right.",
    },
    {
      term: "Standard potential",
      text: "The potential under standard conditions: 1 M solutions, 1 atm gases, pure solids and liquids, 25 °C. By IUPAC convention, the standard potential of an electrode is its standard **reduction** potential.",
    },
    {
      term: "Reference electrode and SHE",
      text: "A reference electrode is an electrode whose potential is arbitrarily taken as zero or is exactly known. SHE, \\(\\ce{H+}(1M) | \\ce{H2}(g, 1 atm) | Pt\\), with \\(E^0 = 0.000\\) V, is the primary reference electrode.",
    },
    {
      term: "Primary and secondary cells",
      text: "In a primary cell (dry cell) the reaction cannot be reversed once the chemicals are used up. In a secondary cell (lead accumulator, NICAD, mercury cell) they are regenerated: a galvanic cell on discharge, an electrolytic cell on recharging.",
    },
    {
      term: "Fuel cells",
      text: "The reactants are not placed within the cell; they are continuously supplied to the electrodes from a reservoir. The \\(\\ce{H2-O2}\\) cell is nonpolluting (the only product is water) and about 70 % efficient.",
    },
    {
      term: "Electrochemical series",
      text: "Electrodes with their half reactions arranged according to their decreasing standard potentials. Uses: relative strength of oxidising agents and of reducing agents, and spontaneity of redox reactions.",
    },
  ],
  formulas: [
    {
      label: "Conductivity and cell constant",
      latex: "\\kappa = \\frac{1}{R}\\times\\frac{l}{a} \\qquad \\text{cell constant} = \\frac{l}{a} = \\kappa R",
    },
    {
      label: "Molar conductivity",
      latex: "\\Lambda = \\frac{1000\\,\\kappa}{c}",
      symbols: [
        { symbol: "κ", meaning: "conductivity in Ω⁻¹ cm⁻¹" },
        { symbol: "c", meaning: "concentration in mol L⁻¹; Λ comes out in Ω⁻¹ cm² mol⁻¹" },
      ],
    },
    {
      label: "Kohlrausch law",
      latex: "\\Lambda_0 = n_+\\lambda_0^{+} + n_-\\lambda_0^{-}",
      symbols: [{ symbol: "n₊, n₋", meaning: "moles of cation and anion in the formula" }],
    },
    { label: "Degree of dissociation of a weak electrolyte", latex: "\\alpha = \\frac{\\Lambda}{\\Lambda_0}" },
    {
      label: "Quantity of electricity",
      latex: "Q = I\\,t \\qquad \\text{moles of electrons} = \\frac{Q}{96500} \\qquad 1\\,F = 96500\\ \\text{C}",
    },
    {
      label: "Mass of product in electrolysis",
      latex: "W = \\frac{I\\,t}{96500} \\times \\text{mole ratio} \\times M",
      symbols: [{ symbol: "mole ratio", meaning: "moles of product per mole of electrons in the half reaction" }],
    },
    { label: "Standard cell potential", latex: "E^0_{cell} = E^0_{cathode} - E^0_{anode}" },
    {
      label: "Nernst equation (25 °C)",
      latex: "E_{cell} = E^0_{cell} - \\frac{0.0592}{n}\\log_{10}\\frac{[C]^c[D]^d}{[A]^a[B]^b}",
    },
    {
      label: "Single electrode, metal ion and metal (25 °C)",
      latex: "E = E^0 - \\frac{0.0592}{n}\\log_{10}\\frac{1}{[M^{n+}]}",
    },
    { label: "Gibbs energy and cell potential", latex: "\\Delta G = -nFE_{cell} \\qquad \\Delta G^0 = -nFE^0_{cell}" },
    {
      label: "Standard cell potential and equilibrium constant",
      latex: "E^0_{cell} = \\frac{2.303RT}{nF}\\log_{10}K = \\frac{0.0592}{n}\\log_{10}K \\ (25\\,^\\circ\\text{C})",
    },
  ],
  derivations: [
    {
      title: "Relation between conductivity and molar conductivity",
      steps: [
        "Conductivity \\(\\kappa\\) is the conductance of 1 cm³ of solution.",
        "Let \\(V\\) cm³ contain 1 mole of electrolyte; its conductance is the molar conductivity, so \\(\\Lambda = \\kappa V\\).",
        "For concentration \\(c\\) mol L⁻¹, \\(V = \\frac{1000}{c}\\) cm³, so \\(\\Lambda = \\frac{1000\\,\\kappa}{c}\\).",
      ],
    },
    {
      title: "Mass of product formed in electrolysis",
      steps: [
        "Charge passed: \\(Q = I\\,t\\) (current in A, time in s).",
        "Moles of electrons \\(= \\frac{Q}{96500}\\).",
        "Moles of product \\(=\\) moles of electrons \\(\\times\\) mole ratio (from the half reaction, e.g. \\(\\frac{1}{2}\\) for \\(\\ce{Cu^2+ + 2e- -> Cu}\\)).",
        "Mass \\(W =\\) moles of product \\(\\times\\) molar mass.",
      ],
    },
    {
      title: "Gibbs energy change of a cell reaction",
      steps: [
        "Electrical work \\(=\\) charge passed \\(\\times\\) cell potential \\(= nFE_{cell}\\).",
        "This maximum useful work equals the decrease in Gibbs energy: electrical work \\(= -\\Delta G\\).",
        "So \\(\\Delta G = -nFE_{cell}\\), and under standard conditions \\(\\Delta G^0 = -nFE^0_{cell}\\).",
        "A spontaneous reaction has \\(\\Delta G < 0\\), so \\(E_{cell}\\) must be positive.",
      ],
    },
    {
      title: "Relation between standard cell potential and equilibrium constant",
      steps: [
        "From the cell: \\(\\Delta G^0 = -nFE^0_{cell}\\).",
        "From thermodynamics: \\(\\Delta G^0 = -RT\\ln K\\).",
        "Equate: \\(nFE^0_{cell} = RT\\ln K\\), so \\(E^0_{cell} = \\frac{2.303RT}{nF}\\log_{10}K\\).",
        "At 25 °C: \\(E^0_{cell} = \\frac{0.0592}{n}\\log_{10}K\\).",
      ],
    },
  ],
  diagrams: [
    {
      title: "Lead storage cell (lead accumulator)",
      labels: ["anode (-): Pb plates with spongy lead", "cathode (+): Pb plates with PbO₂", "38 % H₂SO₄", "plates arranged alternately"],
    },
    {
      title: "H₂-O₂ fuel cell",
      labels: ["anode and cathode: porous carbon rods with Pt", "H₂ in at anode, O₂ in at cathode", "electrolyte: hot aqueous KOH", "H₂O out"],
    },
    {
      title: "Standard hydrogen electrode",
      labels: ["platinised platinum plate", "1 M H⁺ ion solution", "pure dry H₂ gas at 1 atm", "glass jacket", "mercury and Cu wire contact"],
    },
    {
      title: "Salt bridge",
      labels: ["U tube", "saturated KCl solution + agar gel", "glass wool plugs", "kept in distilled water"],
    },
  ],
  mostAsked: [
    {
      topic: "Cell potential: \\(E^0_{cell}\\) from standard potentials, or a Nernst equation numerical",
      years: [2026, 2025, 2024, 2022, 2020, 2015],
    },
    {
      topic: "Conductivity, cell constant and molar conductivity: SI units, the relation, or a numerical",
      years: [2026, 2024, 2023, 2019, 2017, 2014],
    },
    {
      topic: "Electrolysis numericals: charge, Faradays, time or mass deposited",
      years: [2025, 2024, 2022, 2018, 2017, 2016],
    },
    { topic: "\\(\\ce{H2-O2}\\) fuel cell: diagram, electrode reactions, electrolyte, advantages or uses", years: [2026, 2023, 2018, 2017] },
    { topic: "Lead accumulator: labelled diagram and reactions during discharge", years: [2026, 2025, 2024, 2018] },
    { topic: "Define electrochemical series and write its applications", years: [2026, 2024, 2020, 2019] },
    { topic: "Standard hydrogen electrode and reference electrodes: diagram, definition, or a cell with SHE", years: [2025, 2024, 2023, 2016] },
    { topic: "Gibbs energy change from cell potential, or \\(E^0_{cell}\\) and equilibrium constant", years: [2026, 2023, 2015] },
  ],
  mistakes: [
    {
      title: "Multiplying \\(E^0\\) by the coefficients",
      body: "\\(E^0_{cell}\\) is an **intensive** property: it does not change when the reaction is multiplied by 2. Only \\(\\Delta G\\) and \\(n\\) scale with the equation.",
    },
    {
      title: "Dropping the 1000 in molar conductivity",
      body: "With \\(\\kappa\\) in \\(\\Omega^{-1}\\) cm⁻¹ and \\(c\\) in mol L⁻¹, use \\(\\Lambda = \\frac{1000\\,\\kappa}{c}\\) to get \\(\\Omega^{-1}\\) cm² mol⁻¹. Write the unit with every answer.",
    },
    {
      title: "Leaving time in minutes",
      body: "In \\(Q = I\\,t\\), time is in seconds: 100 minutes is 6000 s. Then use the mole ratio of the half reaction, not 1, to get moles of product.",
    },
    {
      title: "Writing \\(\\ce{O2}\\) at the anode for aqueous NaCl",
      body: "The experiment gives \\(\\ce{Cl2}\\) at the anode (overvoltage) and \\(\\ce{H2}\\) at the cathode, with NaOH left in solution.",
    },
    {
      title: "Mixing up the signs of anode and cathode",
      body: "Oxidation is always at the anode. The anode is **negative** in a galvanic cell but **positive** in an electrolytic cell. In cell notation the anode goes on the left.",
    },
    {
      title: "Wrong \\(n\\) in the Nernst equation",
      body: "\\(n\\) is the number of electrons in the balanced cell reaction (2 for \\(\\ce{Zn + Cu^2+}\\), 6 for \\(\\ce{2Al + 3Ni^2+}\\)). Pure solids do not appear in the concentration term.",
    },
  ],
};

export default sheet;
