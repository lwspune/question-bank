import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 12 Chemistry, Ch. 2 Electrochemistry. Statements checked against
 * the NCERT text (definitions and laws in the book's own words); most-asked
 * years and marks from the CBSE board past-paper questions in the bank,
 * 2022-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Chemistry",
  subjectRoute: "chemistry",
  chapterName: "Electrochemistry",
  chapterSlug: "electrochemistry",
  source: "NCERT Chemistry Part I (CBSE Class 12), Chapter 2",
  keyPoints: [
    {
      term: "Cell potential and cell notation",
      text: "The potential difference between the two electrodes of a galvanic cell; called emf when no current is drawn. Anode on the left, cathode on the right; a single line between metal and solution, a double line for the salt bridge (it completes the circuit and keeps the solutions neutral).",
    },
    {
      term: "Standard hydrogen electrode",
      text: "A platinum electrode coated with platinum black, dipped in an acidic solution (\\(\\ce{H+}\\) 1 M) with pure hydrogen gas at 1 bar bubbled through it: \\(\\ce{Pt(s) | H2(g) | H+(aq)}\\). It is assigned a zero potential at all temperatures.",
    },
    {
      term: "Meaning of standard electrode potential",
      text: "A positive \\(E^0\\) (\\(\\ce{Cu^2+}\\), +0.34 V) means the ion is reduced more easily than \\(\\ce{H+}\\). The more negative \\(E^0\\), the stronger the reducing agent: Zn (\\(-0.76\\) V) displaces Cu, so \\(\\ce{CuSO4}\\) cannot be kept in a zinc pot.",
    },
    {
      term: "Daniell cell against an external potential",
      text: "\\(E_{ext} < 1.1\\) V: electrons flow from Zn to Cu, Zn dissolves and Cu deposits. \\(E_{ext} = 1.1\\) V: no current, no reaction. \\(E_{ext} > 1.1\\) V: electrons flow from Cu to Zn and the cell works as an **electrolytic** cell.",
    },
    {
      term: "Conductivity and cell constant",
      text: "Conductivity \\(\\kappa\\) is the conductance of one unit volume of solution between electrodes of unit area at unit distance; unit S cm⁻¹. Cell constant \\(G^* = l/A\\), unit cm⁻¹. Resistance is measured with **AC** in a conductivity cell, because DC changes the composition of the solution.",
    },
    {
      term: "Molar conductivity",
      text: "The conductance of the volume \\(V\\) of solution containing one mole of electrolyte kept between two electrodes with area of cross section \\(A\\) and distance of unit length: \\(\\Lambda_m = \\kappa/c\\). Unit S cm² mol⁻¹. When concentration approaches zero it is the limiting molar conductivity \\(\\Lambda^0_m\\).",
    },
    {
      term: "Variation with dilution",
      text: "Conductivity always **decreases** on dilution, for weak and strong electrolytes: the number of ions per unit volume that carry the current decreases. Molar conductivity **increases**, because the volume containing one mole of electrolyte increases more than \\(\\kappa\\) falls.",
    },
    {
      term: "Strong and weak electrolytes",
      text: "Strong (KCl): \\(\\Lambda_m\\) increases slowly and linearly with \\(\\sqrt{c}\\), so \\(\\Lambda^0_m\\) is found by extrapolation. Weak (acetic acid): \\(\\Lambda_m\\) increases steeply on dilution as the degree of dissociation rises, so \\(\\Lambda^0_m\\) cannot be obtained by extrapolation.",
    },
    {
      term: "Kohlrausch law of independent migration of ions",
      text: "The limiting molar conductivity of an electrolyte can be represented as the sum of the individual contributions of the anion and cation of the electrolyte. Uses: \\(\\Lambda^0_m\\) of a weak electrolyte, its degree of dissociation and its dissociation constant.",
    },
    {
      term: "Products of electrolysis",
      text: "Depend on the material and the electrodes. Aqueous NaCl: \\(\\ce{H2}\\) at the cathode, \\(\\ce{Cl2}\\) (not \\(\\ce{O2}\\), because of the overpotential of oxygen) at the anode; NaOH stays, so pH rises. Molten NaCl: Na and \\(\\ce{Cl2}\\). Dilute \\(\\ce{H2SO4}\\): \\(\\ce{O2}\\) at the anode.",
    },
    {
      term: "Faraday's laws of electrolysis",
      text: "**First:** the amount of chemical reaction at any electrode is proportional to the quantity of electricity passed. **Second:** the amounts of different substances liberated by the same quantity of electricity are proportional to their chemical equivalent weights.",
    },
    {
      term: "Primary and secondary batteries",
      text: "Primary: the reaction occurs only once (dry cell, mercury cell). Secondary: recharged by passing current in the opposite direction (lead storage, nickel-cadmium). The mercury cell (hearing aids, watches) gives a constant 1.35 V: its overall reaction involves no ion in solution.",
    },
    {
      term: "Fuel cells",
      text: "Galvanic cells that convert the energy of combustion of fuels like hydrogen, methane, methanol directly into electrical energy. The \\(\\ce{H2-O2}\\) cell powered the Apollo space programme. About 70 % efficient against 40 % for thermal plants, and pollution free.",
    },
    {
      term: "Corrosion",
      text: "An electrochemical process: at one spot iron is oxidised (anode), at another oxygen is reduced (cathode); rust is \\(\\ce{Fe2O3.xH2O}\\). Prevented by paint, by a coating of Sn or Zn, or by a sacrificial electrode of a more active metal (Mg, Zn) that corrodes itself.",
    },
  ],
  formulas: [
    { label: "Standard cell potential", latex: "E^0_{cell} = E^0_{right} - E^0_{left} = E^0_{cathode} - E^0_{anode}" },
    {
      label: "Nernst equation for an electrode",
      latex: "E_{(M^{n+}/M)} = E^0_{(M^{n+}/M)} - \\frac{2.303RT}{nF}\\log\\frac{1}{[M^{n+}]} = E^0 - \\frac{0.059}{n}\\log\\frac{1}{[M^{n+}]}\\ (298\\ \\text{K})",
    },
    {
      label: "Nernst equation for a cell (298 K)",
      latex: "E_{cell} = E^0_{cell} - \\frac{0.059}{n}\\log\\frac{[\\text{products}]}{[\\text{reactants}]}",
      symbols: [{ symbol: "n", meaning: "electrons in the balanced cell reaction; pure solids and liquids are left out" }],
    },
    { label: "Daniell cell", latex: "E_{cell} = E^0_{cell} - \\frac{0.059}{2}\\log\\frac{[\\ce{Zn^2+}]}{[\\ce{Cu^2+}]}" },
    {
      label: "Standard cell potential and equilibrium constant",
      latex: "E^0_{cell} = \\frac{2.303RT}{nF}\\log K_c = \\frac{0.059}{n}\\log K_c\\ (298\\ \\text{K})",
    },
    {
      label: "Gibbs energy",
      latex: "\\Delta_r G = -nFE_{cell} \\qquad \\Delta_r G^0 = -nFE^0_{cell} = -2.303RT\\log K_c",
    },
    { label: "Resistance, resistivity, conductivity", latex: "R = \\rho\\,\\frac{l}{A} \\qquad \\kappa = \\frac{1}{\\rho} \\qquad G = \\frac{1}{R}" },
    { label: "Cell constant", latex: "G^* = \\frac{l}{A} = R\\,\\kappa" },
    {
      label: "Molar conductivity",
      latex: "\\Lambda_m = \\frac{\\kappa}{c} \\quad (\\text{SI}) \\qquad \\Lambda_m = \\frac{1000\\,\\kappa}{c} \\quad (\\text{S cm}^2\\,\\text{mol}^{-1})",
      symbols: [{ symbol: "1000", meaning: "with κ in S cm⁻¹ and c in mol L⁻¹, gives Λm in S cm² mol⁻¹" }],
    },
    { label: "Strong electrolyte", latex: "\\Lambda_m = \\Lambda^0_m - A\\sqrt{c}" },
    {
      label: "Kohlrausch law",
      latex: "\\Lambda^0_m = \\nu_+\\lambda^0_+ + \\nu_-\\lambda^0_-",
      symbols: [{ symbol: "ν₊, ν₋", meaning: "cations and anions from one formula unit" }],
    },
    {
      label: "Limiting molar conductivity of acetic acid",
      latex: "\\Lambda^0_m(\\ce{CH3COOH}) = \\Lambda^0_m(\\ce{HCl}) + \\Lambda^0_m(\\ce{CH3COONa}) - \\Lambda^0_m(\\ce{NaCl})",
    },
    { label: "Degree and constant of dissociation", latex: "\\alpha = \\frac{\\Lambda_m}{\\Lambda^0_m} \\qquad K_a = \\frac{c\\,\\alpha^2}{1 - \\alpha}" },
    {
      label: "Charge and the Faraday",
      latex: "Q = I\\,t \\qquad 1\\,F = 96487 \\approx 96500\\ \\text{C mol}^{-1} \\qquad \\text{mass} = \\frac{Q}{nF}\\times M",
    },
  ],
  derivations: [
    {
      title: "Relation between standard cell potential and equilibrium constant",
      steps: [
        "Nernst equation for the Daniell cell: \\(E_{cell} = E^0_{cell} - \\frac{2.303RT}{2F}\\log\\frac{[\\ce{Zn^2+}]}{[\\ce{Cu^2+}]}\\).",
        "As the reaction proceeds the voltage falls; at equilibrium \\(E_{cell} = 0\\) and the ratio of concentrations is \\(K_c\\).",
        "So \\(E^0_{cell} = \\frac{2.303RT}{nF}\\log K_c\\); at 298 K, \\(E^0_{cell} = \\frac{0.059}{n}\\log K_c\\).",
      ],
    },
    {
      title: "Gibbs energy of a cell reaction from its emf",
      steps: [
        "Electrical work = potential \\(\\times\\) charge; for \\(n\\) mol of electrons the charge is \\(nF\\).",
        "Reversible work done by a galvanic cell equals the decrease in its Gibbs energy, so \\(\\Delta_r G = -nFE_{cell}\\).",
        "Under standard conditions \\(\\Delta_r G^0 = -nFE^0_{cell}\\); with \\(\\Delta_r G^0 = -2.303RT\\log K_c\\) this gives the same \\(K_c\\) relation.",
      ],
    },
    {
      title: "Molar conductivity from conductivity",
      steps: [
        "\\(\\kappa\\) is the conductance of 1 cm³ of solution.",
        "The volume containing 1 mol of electrolyte is \\(V = \\frac{1000}{c}\\) cm³ for \\(c\\) in mol L⁻¹.",
        "\\(\\Lambda_m = \\kappa V = \\frac{1000\\,\\kappa}{c}\\) S cm² mol⁻¹.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Molar conductivity against square root of concentration",
      labels: ["y-axis Λm, x-axis √c", "KCl: nearly straight line", "extrapolated intercept = Λ⁰m", "CH₃COOH: steep rise near zero"],
    },
    {
      title: "Standard hydrogen electrode",
      labels: ["Pt foil coated with platinum black", "H₂ gas at 1 bar bubbled in", "H⁺ solution, 1 M", "Pt(s) | H₂(g) | H⁺(aq)"],
    },
    {
      title: "H₂-O₂ fuel cell",
      labels: ["porous carbon electrodes with Pt or Pd catalyst", "H₂ in at anode, O₂ in at cathode", "aqueous NaOH (or KOH) electrolyte", "water out"],
    },
    {
      title: "Lead storage battery",
      labels: ["anode: lead", "cathode: grid packed with PbO₂", "38 % H₂SO₄ electrolyte"],
    },
    {
      title: "Corrosion of iron",
      labels: ["anodic spot: Fe → Fe²⁺ + 2e⁻", "cathodic spot: O₂ + 4H⁺ + 4e⁻ → 2H₂O", "water drop with dissolved O₂ and CO₂", "rust Fe₂O₃·xH₂O"],
    },
  ],
  mostAsked: [
    {
      topic: "Nernst equation: emf of a cell or potential of a single electrode at 298 K",
      marks: 3,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Batteries and fuel cells: dry, mercury and lead storage cells (reactions, uses, constant potential), the \\(\\ce{H2-O2}\\) fuel cell and its advantages",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Conductivity, molar conductivity and cell constant: definitions, units, why AC and not DC, or a numerical with degree of dissociation",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Electrolysis: products for aqueous NaCl, \\(\\ce{CuCl2}\\), dilute \\(\\ce{H2SO4}\\) or \\(\\ce{AgNO3}\\); Faraday's laws; charge in faradays",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Variation of conductivity and molar conductivity with dilution for strong and weak electrolytes (the \\(\\Lambda_m\\) against \\(\\sqrt{c}\\) plot)",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Galvanic cells: \\(E^0_{cell}\\) from standard potentials, which metal is the anode or protects iron, effect of \\(E_{ext}\\), salt bridge",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Kohlrausch law of independent migration of ions: statement, \\(\\Lambda^0_m\\) of a weak electrolyte such as acetic acid, or a numerical",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "\\(\\Delta_r G^0\\) and \\(\\log K_c\\) from \\(E^0_{cell}\\) (or \\(E^0_{cell}\\) from \\(K_c\\)), and the signs for a spontaneous reaction",
      years: [2026, 2025, 2024, 2023, 2022],
    },
  ],
  mistakes: [
    {
      title: "Multiplying \\(E^0\\) by the coefficients",
      body: "\\(E^0\\) is intensive: for \\(\\ce{Fe + 2Ag+}\\), \\(E^0_{cell} = 0.80 - (-0.44) = 1.24\\) V, not \\(2 \\times 0.80\\). Only \\(n\\) and \\(\\Delta_r G\\) change with the equation.",
    },
    {
      title: "Wrong \\(n\\) or an upside-down log term",
      body: "\\(n\\) is the electrons transferred in the balanced cell reaction (6 for \\(\\ce{2Al + 3Ni^2+}\\)). The log term is products over reactants, each ion raised to its coefficient: \\(\\frac{[\\ce{Al^3+}]^2}{[\\ce{Ni^2+}]^3}\\). Leave out solids and pure liquids.",
    },
    {
      title: "Losing the 1000 or the units in molar conductivity",
      body: "With \\(\\kappa\\) in S cm⁻¹ and \\(c\\) in mol L⁻¹ use \\(\\Lambda_m = \\frac{1000\\,\\kappa}{c}\\), answer in S cm² mol⁻¹. Cell constant is in cm⁻¹, not ohm cm⁻¹.",
    },
    {
      title: "Saying conductivity increases on dilution",
      body: "On dilution conductivity \\(\\kappa\\) **decreases** (fewer ions per cm³) while molar conductivity \\(\\Lambda_m\\) **increases**. Keep the two apart in every reason question.",
    },
    {
      title: "Wrong charge in faradays",
      body: "Count electrons per mole: \\(\\ce{Ag+ -> Ag}\\) 1 F; \\(\\ce{Cu^2+ -> Cu}\\) 2 F; \\(\\ce{MnO4- -> Mn^2+}\\) 5 F; \\(\\ce{MnO4- -> MnO2}\\) 3 F; \\(\\ce{Cr2O7^2- -> 2Cr^3+}\\) 6 F; 1 mol \\(\\ce{H2O -> 1/2O2}\\) 2 F; 1 mol FeO to \\(\\ce{Fe2O3}\\) 1 F.",
    },
    {
      title: "Getting the lead storage reactions wrong",
      body: "In use: anode \\(\\ce{Pb + SO4^2- -> PbSO4 + 2e-}\\), cathode \\(\\ce{PbO2 + SO4^2- + 4H+ + 2e- -> PbSO4 + 2H2O}\\), overall \\(\\ce{Pb + PbO2 + 2H2SO4 -> 2PbSO4 + 2H2O}\\). On charging: \\(\\ce{2PbSO4 + 2H2O -> Pb + PbO2 + 2H2SO4}\\).",
    },
  ],
};

export default sheet;
