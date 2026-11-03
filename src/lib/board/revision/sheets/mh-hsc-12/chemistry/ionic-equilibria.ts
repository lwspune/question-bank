import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Chemistry, Ch. 3 Ionic Equilibria. Definitions and laws checked
 * against the Balbharati text (wordings are the book's own, trimmed); most-asked
 * years from the board past-paper questions in the bank, 2022-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Chemistry",
  subjectRoute: "chemistry",
  chapterName: "Ionic Equilibria",
  chapterSlug: "ionic-equilibria",
  source: "Balbharati Chemistry Std XII (Maharashtra State Board), Chapter 3",
  keyPoints: [
    {
      term: "Strong and weak electrolytes",
      text: "**Strong:** ionize completely or almost completely (strong acids, strong bases and salts). **Weak:** dissociate to a smaller extent in aqueous solution (weak acids and weak bases); ions and unionized molecules stay in ionic equilibrium.",
    },
    {
      term: "Degree of dissociation",
      text: "The fraction of the total number of moles of the electrolyte that dissociates into its ions when the equilibrium is attained, \\(\\alpha\\). Percent dissociation \\(= \\alpha \\times 100\\).",
    },
    {
      term: "Brønsted-Lowry acids and bases",
      text: "An **acid** donates a proton to another substance; a **base** accepts a proton. A pair of an acid and a base differing by a proton is a **conjugate acid-base pair**: in \\(\\ce{HCl + H2O <=> H3O+ + Cl-}\\), HCl and \\(\\ce{Cl-}\\) are one pair, \\(\\ce{H3O+}\\) and \\(\\ce{H2O}\\) the other.",
    },
    {
      term: "Lewis acids and bases",
      text: "A Lewis **acid** is any species that accepts a share in an electron pair (\\(\\ce{H+}\\), \\(\\ce{AlCl3}\\)); a Lewis **base** is any species that donates a share in an electron pair (\\(\\ce{NH3}\\)).",
    },
    {
      term: "Amphoteric nature of water",
      text: "Water can act as an acid as well as a base. It is a base towards HCl (\\(\\ce{H2O + HCl -> H3O+ + Cl-}\\)) and an acid towards \\(\\ce{NH3}\\) (\\(\\ce{H2O + NH3 -> NH4+ + OH-}\\)).",
    },
    {
      term: "Ostwald's dilution law",
      text: "For a weak electrolyte, \\(K_a = \\alpha^2 c\\), so \\(\\alpha = \\sqrt{K_a/c}\\): the degree of dissociation is inversely proportional to the square root of the concentration, or directly proportional to the square root of the volume containing 1 mol. Dilution increases \\(\\alpha\\).",
    },
    {
      term: "Ionic product of water",
      text: "\\(K_w = [\\ce{H3O+}][\\ce{OH-}] = 1.0 \\times 10^{-14}\\) at 298 K. In pure water \\([\\ce{H3O+}] = [\\ce{OH-}] = 1.0 \\times 10^{-7}\\) M. \\(K_w\\) is constant at a given temperature.",
    },
    {
      term: "pH and pOH",
      text: "pH is the negative logarithm to the base 10 of the concentration of \\(\\ce{H+}\\) ions in mol dm⁻³; pOH likewise for \\(\\ce{OH-}\\). At 298 K: neutral pH = 7, acidic pH < 7, basic pH > 7, and pH + pOH = 14. Blood is kept at pH 7.36 to 7.42.",
    },
    {
      term: "Hydrolysis of salts",
      text: "Ions of a salt react with water and upset \\([\\ce{H3O+}] = [\\ce{OH-}]\\). Strong acid + strong base salt (NaCl): neutral, no hydrolysis. Strong acid + weak base (\\(\\ce{CuSO4}\\), \\(\\ce{NH4Cl}\\)): acidic. Weak acid + strong base (\\(\\ce{CH3COONa}\\)): basic. Weak acid + weak base: depends on \\(K_a\\) and \\(K_b\\).",
    },
    {
      term: "Buffer solution",
      text: "A solution which resists drastic changes in pH when a small amount of strong acid or strong base or water is added to it. **Acidic buffer:** a weak acid and its salt with a strong base (\\(\\ce{CH3COOH + CH3COONa}\\)). **Basic buffer:** a weak base and its salt with a strong acid (\\(\\ce{NH4OH + NH4Cl}\\)).",
    },
    {
      term: "Solubility product",
      text: "In the saturated solution of a sparingly soluble salt, the product of the equilibrium concentrations of the constituent ions, each raised to the power of its coefficient in the balanced equation, at a given temperature: \\(K_{sp}\\).",
    },
    {
      term: "Molar solubility",
      text: "The number of moles of a compound that dissolve to give one litre of saturated solution. Molar solubility (mol/L) = solubility in g/L divided by the molar mass.",
    },
    {
      term: "Condition of precipitation",
      text: "Ionic product (IP) has the same form as \\(K_{sp}\\) but with concentrations under any condition. IP = \\(K_{sp}\\): saturated. IP > \\(K_{sp}\\): supersaturated, **precipitation occurs**. IP < \\(K_{sp}\\): unsaturated, no precipitate.",
    },
    {
      term: "Common ion effect",
      text: "The ionisation of a weak electrolyte is suppressed in presence of a strong electrolyte containing an ion common to the weak electrolyte. Example: \\(\\ce{CH3COONa}\\) suppresses the dissociation of \\(\\ce{CH3COOH}\\). It is a special case of Le Chatelier's principle.",
    },
  ],
  formulas: [
    { label: "Ostwald's dilution law (weak acid)", latex: "K_a = \\frac{\\alpha^2 c}{1 - \\alpha} \\approx \\alpha^2 c \\qquad \\alpha = \\sqrt{\\frac{K_a}{c}} \\qquad [\\mathrm{H^+}] = \\sqrt{K_a c}" },
    { label: "Weak base", latex: "\\alpha = \\sqrt{\\frac{K_b}{c}} \\qquad [\\mathrm{OH^-}] = \\sqrt{K_b c}" },
    { label: "pH and pOH", latex: "\\mathrm{pH} = -\\log_{10}[\\mathrm{H_3O^+}] \\qquad \\mathrm{pOH} = -\\log_{10}[\\mathrm{OH^-}]" },
    { label: "Water at 298 K", latex: "K_w = [\\mathrm{H_3O^+}][\\mathrm{OH^-}] = 1.0 \\times 10^{-14} \\qquad \\mathrm{pH} + \\mathrm{pOH} = 14" },
    { label: "Henderson-Hasselbalch (acidic buffer)", latex: "\\mathrm{pH} = \\mathrm{p}K_a + \\log_{10}\\frac{[\\text{salt}]}{[\\text{acid}]}" },
    { label: "Henderson-Hasselbalch (basic buffer)", latex: "\\mathrm{pOH} = \\mathrm{p}K_b + \\log_{10}\\frac{[\\text{salt}]}{[\\text{base}]}" },
    { label: "Solubility product of BxAy", latex: "K_{sp} = [\\mathrm{B^{y+}}]^x[\\mathrm{A^{x-}}]^y = x^x y^y S^{x+y}" },
    { label: "Common cases", latex: "\\mathrm{AgBr}: K_{sp} = S^2 \\qquad \\mathrm{PbI_2}: K_{sp} = 4S^3 \\qquad \\mathrm{Al(OH)_3}: K_{sp} = 27S^4" },
  ],
  derivations: [
    {
      title: "Derive Ostwald's dilution law for a weak acid",
      steps: [
        "\\(\\ce{HA <=> H+ + A-}\\). Start with \\(c\\) mol dm⁻³; at equilibrium \\([\\ce{HA}] = c(1 - \\alpha)\\), \\([\\ce{H+}] = [\\ce{A-}] = \\alpha c\\).",
        "\\(K_a = \\frac{[\\ce{H+}][\\ce{A-}]}{[\\ce{HA}]} = \\frac{\\alpha c \\cdot \\alpha c}{c(1 - \\alpha)} = \\frac{\\alpha^2 c}{1 - \\alpha}\\).",
        "For a weak acid \\(\\alpha \\ll 1\\), so \\(1 - \\alpha \\approx 1\\) and \\(K_a = \\alpha^2 c\\).",
        "Hence \\(\\alpha = \\sqrt{K_a/c}\\) and, with \\(V = 1/c\\), \\(\\alpha = \\sqrt{K_a V}\\): \\(\\alpha\\) increases on dilution.",
      ],
    },
    {
      title: "Derive the relationship between pH and pOH",
      steps: [
        "Ionic product of water: \\(K_w = [\\ce{H3O+}][\\ce{OH-}]\\).",
        "Take \\(\\log_{10}\\) and multiply by \\(-1\\): \\(-\\log K_w = -\\log[\\ce{H3O+}] - \\log[\\ce{OH-}]\\).",
        "So \\(\\mathrm{p}K_w = \\mathrm{pH} + \\mathrm{pOH}\\). At 298 K \\(K_w = 1.0 \\times 10^{-14}\\), so \\(\\mathrm{pH} + \\mathrm{pOH} = 14\\).",
      ],
    },
    {
      title: "Explain buffer action of sodium acetate-acetic acid buffer",
      steps: [
        "\\(\\ce{CH3COONa}\\) dissociates completely, giving a large concentration of \\(\\ce{CH3COO-}\\); weak \\(\\ce{CH3COOH}\\) stays mostly undissociated.",
        "Added acid: \\(\\ce{H+}\\) is consumed by the conjugate base, \\(\\ce{CH3COO- + H+ -> CH3COOH}\\).",
        "Added base: \\(\\ce{OH-}\\) is neutralised by the acid, \\(\\ce{CH3COOH + OH- -> CH3COO- + H2O}\\).",
        "Either way \\([\\ce{H+}]\\) hardly changes, so the pH stays nearly constant.",
      ],
    },
    {
      title: "Relation between solubility and solubility product",
      steps: [
        "\\(\\ce{B_xA_y(s) <=> xB^{y+}(aq) + yA^{x-}(aq)}\\), with molar solubility \\(S\\).",
        "In the saturated solution \\([\\ce{B^{y+}}] = xS\\) and \\([\\ce{A^{x-}}] = yS\\).",
        "\\(K_{sp} = (xS)^x (yS)^y = x^x y^y S^{x+y}\\).",
        "Examples: \\(\\ce{PbI2}\\): \\(K_{sp} = S(2S)^2 = 4S^3\\); \\(\\ce{Al(OH)3}\\): \\(K_{sp} = S(3S)^3 = 27S^4\\).",
      ],
    },
  ],
  diagrams: [
    { title: "pH scale", labels: ["0 to 14 at 298 K", "acidic: pH less than 7", "neutral: pH 7", "basic: pH more than 7"] },
  ],
  mostAsked: [
    { topic: "Ostwald's dilution law: derive it, or find the dissociation constant, percent dissociation or [H⁺] of a weak acid", years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "pH and pOH of strong acid or base solutions, or [OH⁻] from pH", years: [2026, 2025, 2024, 2023] },
    { topic: "Buffer solution: define it, Henderson-Hasselbalch equation, buffer action, pH of a buffer or of blood", years: [2026, 2025, 2024] },
    { topic: "Brønsted-Lowry acids and bases, conjugate acid-base pair, amphoteric nature of water, relation between pH and pOH", years: [2026, 2025, 2024] },
    { topic: "Define or explain the common ion effect", years: [2026, 2025] },
    { topic: "Solubility product: solubility from it, or its relation with solubility for a given salt", years: [2026, 2023] },
  ],
  mistakes: [
    {
      title: "Using \\(\\alpha = \\sqrt{K_a/c}\\) for a strong acid",
      body: "HCl is completely dissociated: \\([\\ce{H+}] = c\\). 0.01 M HCl has pH 2 and pOH 12; 0.001 M HCl has pH 3. Ostwald's law is only for weak electrolytes.",
    },
    {
      title: "Reporting pH for a base without the step via pOH",
      body: "From \\([\\ce{OH-}]\\) find pOH first, then pH = 14 − pOH. For \\([\\ce{OH-}] = 2 \\times 10^{-4}\\), pOH = 3.70 and pH = 10.30.",
    },
    {
      title: "Writing \\(K_{sp} = S^2\\) for every salt",
      body: "Raise each ion's concentration to its coefficient: \\(\\ce{PbI2}\\) gives \\(4S^3\\), \\(\\ce{Al(OH)3}\\) gives \\(27S^4\\). Give solubility in g dm⁻³ by multiplying \\(S\\) by the molar mass.",
    },
    {
      title: "Inverting the ratio in Henderson-Hasselbalch",
      body: "For an acidic buffer it is \\(\\log\\frac{[\\text{salt}]}{[\\text{acid}]}\\). 0.05 M NaF with 0.01 M HF: pH = 3.1427 + log 5 = 3.84.",
    },
    {
      title: "Forgetting that dilution raises \\(\\alpha\\)",
      body: "\\(\\alpha \\propto 1/\\sqrt{c}\\). Tripling the concentration from 0.05 M to 0.15 M lowers 10% dissociation to \\(10/\\sqrt{3} = 5.77\\)%.",
    },
  ],
};

export default sheet;
