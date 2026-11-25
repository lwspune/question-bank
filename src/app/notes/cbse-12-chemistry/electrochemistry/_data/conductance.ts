import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_EC_CONDUCTANCE_NOTE: SubtopicNote = {
  subtopicName: "Conductance of Electrolytic Solutions",
  title: "Conductance of Electrolytic Solutions and Kohlrausch's Law",
  oneLineDefinition:
    "Conductance, conductivity and the cell constant, molar conductivity, how both change on dilution for strong and weak electrolytes, and Kohlrausch's law with the degree of dissociation of a weak electrolyte.",
  whyItMatters:
    "74 questions. Sixty were set in board papers from 2022 to 2026, more than on any other page of this chapter. Every year the board asks you to find a cell constant or a conductivity from a resistance, to find the molar conductivity and degree of dissociation of a weak acid, to explain why conductivity falls and molar conductivity rises on dilution, and to state or use Kohlrausch's law. It also asks you to tell a strong electrolyte from a weak one by its graph (2022, 2023, 2026), why AC and not DC is used (2025, 2026), and sets assertion-reason items (2023, 2025) and a case study on a student's KCl readings (2023). The textbook adds NCERT's Examples 2.4 to 2.9 and its exercise numericals.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcec-conductivity",
      name: "Conductance, conductivity and cell constant",
      intuition:
        "A solution conducts because its ions move. How well a measured sample conducts depends on the solution and also on the cell: plates far apart or small plates give a large resistance. Conductivity removes the cell from the picture, because it is the conductance of one unit cube of solution. The cell constant, l/A, is the part that belongs to the cell.",
      definition:
        "- **Resistance:** \\(R = \\rho\\dfrac{l}{A}\\), where \\(\\rho\\) is the resistivity (Ω m, or Ω cm).\n" +
        "- **Conductance:** \\(G = \\dfrac{1}{R}\\), unit siemens: 1 S = 1 Ω⁻¹.\n" +
        "- **Conductivity:** \\(\\kappa = \\dfrac{1}{\\rho}\\), the conductance of a solution of unit length and unit area of cross section. SI unit S m⁻¹; also S cm⁻¹, with 1 S cm⁻¹ = 100 S m⁻¹.\n" +
        "- **Cell constant:** \\(G^{*} = \\dfrac{l}{A}\\), unit m⁻¹ or cm⁻¹. So \\(\\kappa = \\dfrac{G^{*}}{R}\\) and \\(G^{*} = \\kappa R\\).\n" +
        "- **Measurement:** the resistance is found on a Wheatstone bridge. An **AC** source is used, because DC would change the composition of the solution. The solution is held in a **conductivity cell**: two platinum electrodes coated with platinum black.\n" +
        "- G* is found first by filling the cell with KCl solution of known conductivity; the same cell then gives κ of any other solution from its resistance.\n" +
        "- Metallic conductance falls as temperature rises; electrolytic conductance rises as temperature rises.",
      formula: {
        label: "Conductivity from resistance",
        latex: "\\kappa = \\frac{1}{R}\\cdot\\frac{l}{A} = \\frac{G^{*}}{R}",
        symbols: [
          { symbol: "\\(G^{*}\\)", meaning: "cell constant, distance between electrodes over their area" },
          { symbol: "\\(R\\)", meaning: "measured resistance of the solution in ohm" },
        ],
      },
      authoredExample: {
        prompt:
          "A conductivity cell filled with 0.01 M KCl (κ = 1.41 × 10⁻³ S cm⁻¹) has a resistance of 250 Ω. Filled with a solution X, the same cell has a resistance of 500 Ω. Find the cell constant and the conductivity of X.",
        steps: [
          "Given: \\(\\kappa_{\\text{KCl}} = 1.41 \\times 10^{-3}\\) S cm⁻¹, \\(R_{\\text{KCl}} = 250\\ \\Omega\\), \\(R_X = 500\\ \\Omega\\).",
          "Formula: \\(G^{*} = \\kappa R\\), then \\(\\kappa_X = \\dfrac{G^{*}}{R_X}\\).",
          "Cell constant: \\(G^{*} = 1.41 \\times 10^{-3}\\ \\text{S cm}^{-1} \\times 250\\ \\Omega = 0.3525\\ \\text{cm}^{-1}\\).",
          "Conductivity of X: \\(\\kappa_X = \\dfrac{0.3525\\ \\text{cm}^{-1}}{500\\ \\Omega} = 7.05 \\times 10^{-4}\\ \\text{S cm}^{-1}\\).",
        ],
        answer: "G* = 0.3525 cm⁻¹; κ of X = 7.05 × 10⁻⁴ S cm⁻¹",
      },
      selfCheckExample: {
        prompt: "The electrodes of a conductivity cell are 1.5 cm apart and each has an area of 2.0 cm². A solution in it has a resistance of 150 Ω. Find the cell constant and the conductivity.",
        steps: ["\\(G^{*} = \\dfrac{l}{A} = \\dfrac{1.5}{2.0} = 0.75\\) cm⁻¹.", "\\(\\kappa = \\dfrac{G^{*}}{R} = \\dfrac{0.75}{150} = 5.0 \\times 10^{-3}\\) S cm⁻¹."],
        answer: "0.75 cm⁻¹; 5.0 × 10⁻³ S cm⁻¹",
      },
      practiceSet: [
        { prompt: "A solution has a resistance of 40 Ω. What is its conductance?", answer: "\\(G = 1/R = 0.025\\) S" },
        { prompt: "What is the unit of cell constant?", answer: "cm⁻¹ (SI unit m⁻¹)" },
        { prompt: "Why is an AC source, and not DC, used to measure the resistance of an electrolytic solution?", answer: "DC would electrolyse the solution and change its composition while it is being measured" },
        { prompt: "What are the electrodes of a conductivity cell made of?", answer: "Platinum, coated with platinum black" },
      ],
      pyqExampleId: "460fd2f9-a3c8-4f7a-b52c-e297cbb50039",
      traps: [
        {
          title: "Turning the cell constant upside down",
          body: "The cell constant is l/A, distance over area, so its unit is cm⁻¹. Writing A/l, or \\(G = \\kappa\\,l/A\\), is the wrong relation an MCQ offers; the right one is \\(G = \\kappa\\,A/l\\).",
        },
        {
          title: "Using the diameter as the radius",
          body: "For a column of solution, A = πr². Halve the diameter first; using the diameter makes the area four times too big.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcec-molar-conductivity",
      name: "Molar conductivity",
      intuition:
        "Conductivity counts the ions in one unit volume, so a stronger solution always wins and two solutions cannot be compared fairly. Molar conductivity counts the ions that come from one mole of the electrolyte, whatever volume that mole is spread through. That makes it the fair measure for comparing electrolytes.",
      definition:
        "- **Molar conductivity** \\(\\Lambda_m\\) at a given concentration is the conductance of the volume V of solution containing one mole of electrolyte, kept between two electrodes of area of cross section A and unit distance apart: \\(\\Lambda_m = \\kappa V\\).\n" +
        "- In terms of concentration: \\(\\Lambda_m = \\dfrac{\\kappa}{c}\\).\n" +
        "- With κ in S cm⁻¹ and c in mol L⁻¹: \\(\\Lambda_m = \\dfrac{\\kappa \\times 1000}{c}\\) in S cm² mol⁻¹. The 1000 changes litres to cm³.\n" +
        "- In SI, first change c to mol m⁻³ (1 mol L⁻¹ = 1000 mol m⁻³); then \\(\\Lambda_m = \\kappa/c\\) with κ in S m⁻¹ gives S m² mol⁻¹.\n" +
        "- **Units:** S cm² mol⁻¹, or S m² mol⁻¹ in SI. 1 S m² mol⁻¹ = 10⁴ S cm² mol⁻¹.\n" +
        "- **Limiting molar conductivity** \\(\\Lambda^{\\circ}_m\\): the molar conductivity when the concentration approaches zero.",
      formula: {
        label: "Molar conductivity",
        latex: "\\Lambda_m = \\frac{\\kappa \\times 1000}{c}",
        symbols: [
          { symbol: "\\(\\kappa\\)", meaning: "conductivity in S cm⁻¹" },
          { symbol: "\\(c\\)", meaning: "concentration in mol L⁻¹" },
          { symbol: "\\(\\Lambda_m\\)", meaning: "molar conductivity in S cm² mol⁻¹" },
        ],
      },
      authoredExample: {
        prompt: "The conductivity of a 0.03 M solution of an electrolyte is 3.9 × 10⁻³ S cm⁻¹. Calculate its molar conductivity.",
        steps: [
          "Given: \\(\\kappa = 3.9 \\times 10^{-3}\\) S cm⁻¹, \\(c = 0.03\\) mol L⁻¹.",
          "Formula: \\(\\Lambda_m = \\dfrac{\\kappa \\times 1000}{c}\\).",
          "Substitution: \\(\\Lambda_m = \\dfrac{3.9 \\times 10^{-3}\\ \\text{S cm}^{-1} \\times 1000\\ \\text{cm}^3\\ \\text{L}^{-1}}{0.03\\ \\text{mol L}^{-1}}\\).",
          "\\(\\Lambda_m = 130\\ \\text{S cm}^2\\ \\text{mol}^{-1}\\).",
        ],
        answer: "Λm = 130 S cm² mol⁻¹",
      },
      selfCheckExample: {
        prompt: "Express a molar conductivity of 0.0124 S m² mol⁻¹ in S cm² mol⁻¹.",
        steps: ["1 S m² mol⁻¹ = 10⁴ S cm² mol⁻¹.", "\\(0.0124 \\times 10^{4} = 124\\)."],
        answer: "124 S cm² mol⁻¹",
      },
      practiceSet: [
        {
          prompt: "A 0.002 M solution has a conductivity of 2.5 × 10⁻⁴ S cm⁻¹. Find its molar conductivity.",
          answer: "\\(\\Lambda_m = \\dfrac{2.5 \\times 10^{-4} \\times 1000}{0.002} = 125\\) S cm² mol⁻¹",
        },
        {
          prompt: "A solution has a molar conductivity of 150 S cm² mol⁻¹ and a conductivity of 0.0030 S cm⁻¹. What is its concentration?",
          answer: "\\(c = \\dfrac{1000\\,\\kappa}{\\Lambda_m} = \\dfrac{1000 \\times 0.0030}{150} = 0.02\\) M",
        },
        { prompt: "What is the SI unit of molar conductivity?", answer: "S m² mol⁻¹" },
      ],
      pyqExampleId: "f087383b-0456-4aab-b00d-17d2fb373f69",
      traps: [
        {
          title: "Forgetting the factor of 1000",
          body: "κ is per cm and c is per litre. Without the 1000 the answer is out by a factor of a thousand. Write the unit of every quantity in the substitution line and the factor shows itself.",
        },
        {
          title: "Writing the unit of molar conductivity wrongly",
          body: "It is S cm² mol⁻¹: cm squared, and mol to the power minus one. S cm⁻² mol⁻¹ and S cm² mol are both offered as wrong MCQ options.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcec-dilution",
      name: "Effect of dilution: strong and weak electrolytes",
      intuition:
        "Dilute a solution and two things happen. Any one cubic centimetre now holds fewer ions, so conductivity falls. But the one mole of electrolyte now fills a much bigger volume, and that bigger volume gains more than each cm³ loses, so molar conductivity rises. A strong electrolyte gains only a little; a weak one gains a lot, because dilution makes more of its molecules split into ions.",
      definition:
        "- **Conductivity always decreases on dilution**, for strong and weak electrolytes, because the number of ions per unit volume that carry the current decreases.\n" +
        "- **Molar conductivity increases on dilution**, because \\(\\Lambda_m = \\kappa V\\) and the increase in V more than makes up for the fall in κ.\n" +
        "- **Strong electrolytes:** \\(\\Lambda_m\\) increases slowly, following \\(\\Lambda_m = \\Lambda^{\\circ}_m - A c^{1/2}\\). A plot of \\(\\Lambda_m\\) against \\(c^{1/2}\\) is a straight line with intercept \\(\\Lambda^{\\circ}_m\\) and slope \\(-A\\); A depends on the type of electrolyte (1-1 such as NaCl, 2-1 such as CaCl₂, 2-2 such as MgSO₄).\n" +
        "- **Weak electrolytes:** \\(\\Lambda_m\\) increases steeply on dilution, especially near low concentrations, because the degree of dissociation rises and one mole gives more ions.\n" +
        "- So \\(\\Lambda^{\\circ}_m\\) of a weak electrolyte cannot be found by extrapolating to zero concentration; at such low concentration the conductivity is too small to measure accurately. It is found from **Kohlrausch's law**.",
      table: {
        columns: ["Asked", "What happens", "Reason to write"],
        rows: [
          {
            cells: ["Conductivity on dilution", "Decreases, for strong and weak electrolytes alike", "Fewer ions per unit volume to carry the current"],
            pyqExampleId: "73bdd003-07e9-47bc-afd2-01c2fa7c3ea0",
            noteAmber: "Board 2023 set this as assertion-reason: both true, and the reason explains the assertion.",
          },
          {
            cells: ["Molar conductivity on dilution", "Increases", "The volume holding one mole grows faster than the conductivity falls"],
            pyqExampleId: "b2030f4e-52fb-43cc-b01b-b9af14cd08d8",
            noteAmber: "Board 2024 asked this MCQ twice in one year, with the options in a different order.",
          },
          {
            cells: ["Strong electrolyte (KCl, NaCl)", "Λm rises slowly; Λm against √c is a straight line", "Fully ionised already; extrapolate the line to c = 0 to get Λ°m"],
            pyqExampleId: "3421b3ec-f156-4916-aeab-8e5479c25d28",
            noteAmber: "Board 2023 and 2025 asked when Λm equals Λ°m in Λm = Λ°m − A√c: as c approaches 0.",
          },
          {
            cells: ["Weak electrolyte (CH₃COOH)", "Λm rises steeply at low concentration; the curve is not a line", "Degree of dissociation rises on dilution; Λ°m comes from Kohlrausch's law, not from the graph"],
            pyqExampleId: "500a9010-3c9f-461f-9ac5-c206e82235b9",
            noteAmber: "Board 2026 asked this with a curve; 2022 and 2023 asked it from a graph too.",
          },
          {
            cells: ["Which one is weak?", "A small rise on dilution: strong. A large rise: weak", "Only a weak electrolyte gains new ions on dilution"],
            pyqExampleId: "0a34342f-abfa-4d1f-9449-932dc2feec44",
          },
        ],
      },
      practiceSet: [
        {
          prompt: "On dilution, the molar conductivity of electrolyte P rises 1.2 times and that of Q rises 20 times. Which is the weak electrolyte?",
          answer: "Q. Only a weak electrolyte gains many new ions on dilution",
        },
        {
          prompt: "Which has the higher molar conductivity: 0.001 M NaCl or 0.1 M NaCl?",
          answer: "0.001 M NaCl, the more dilute one",
        },
        {
          prompt: "What do the intercept and the slope of the straight line of Λm against √c give for a strong electrolyte?",
          answer: "The intercept is Λ°m; the slope is −A",
        },
      ],
      pyqExampleId: "fe799dd5-24c6-4f84-96d6-ed48a62e46b8",
      traps: [
        {
          title: "Mixing up the two quantities",
          body: "Conductivity falls on dilution; molar conductivity rises. Name the quantity in every sentence. Saying \"conductivity increases on dilution\" loses the mark even if you meant molar conductivity.",
        },
        {
          title: "Reading assertion-reason codes",
          body: "These papers print four codes: both true and R explains A; both true but R does not explain A; A true but R false; A false but R true. A reason that only names a quantity (\"Λ°m is Λm at zero concentration\") is true but explains nothing.",
        },
        {
          title: "Drawing the weak-electrolyte curve as a line",
          body: "Only the strong electrolyte gives a straight line against √c. The weak electrolyte's curve shoots up near the Λm axis and never gives an intercept. Label both axes on the graph.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcec-kohlrausch",
      name: "Kohlrausch's law and degree of dissociation",
      intuition:
        "At infinite dilution the ions are so far apart that each moves on its own, as if the other were not there. So the limiting molar conductivity of a salt is just its cation's share plus its anion's share. That lets you build Λ°m for a weak acid, which you cannot measure, from strong electrolytes that you can. Compare it with the measured Λm and you know what fraction of the acid has ionised.",
      definition:
        "- **Kohlrausch's law of independent migration of ions:** the limiting molar conductivity of an electrolyte can be represented as the sum of the individual contributions of the anion and cation of the electrolyte.\n" +
        "- For an electrolyte giving \\(\\nu_{+}\\) cations and \\(\\nu_{-}\\) anions: \\(\\Lambda^{\\circ}_m = \\nu_{+}\\lambda^{\\circ}_{+} + \\nu_{-}\\lambda^{\\circ}_{-}\\).\n" +
        "- NCERT's Table 2.4 (S cm² mol⁻¹, 298 K): H⁺ 349.6, Na⁺ 50.1, K⁺ 73.5, Ca²⁺ 119.0, Mg²⁺ 106.0, OH⁻ 199.1, Cl⁻ 76.3, Br⁻ 78.1, CH₃COO⁻ 40.9, SO₄²⁻ 160.0.\n" +
        "- **Weak electrolyte by combination:** \\(\\Lambda^{\\circ}_m(\\text{CH}_3\\text{COOH}) = \\Lambda^{\\circ}_m(\\text{HCl}) + \\Lambda^{\\circ}_m(\\text{CH}_3\\text{COONa}) - \\Lambda^{\\circ}_m(\\text{NaCl})\\).\n" +
        "- **Degree of dissociation:** \\(\\alpha = \\dfrac{\\Lambda_m}{\\Lambda^{\\circ}_m}\\).\n" +
        "- **Dissociation constant** of a weak acid: \\(K_a = \\dfrac{c\\alpha^2}{1 - \\alpha}\\).\n" +
        "- **Applications:** finding \\(\\Lambda^{\\circ}_m\\) of any electrolyte from the ions' values, and finding α and Ka of a weak electrolyte.",
      formula: {
        label: "Kohlrausch's law and degree of dissociation",
        latex: "\\Lambda^{\\circ}_m = \\nu_{+}\\lambda^{\\circ}_{+} + \\nu_{-}\\lambda^{\\circ}_{-}, \\qquad \\alpha = \\frac{\\Lambda_m}{\\Lambda^{\\circ}_m}, \\qquad K_a = \\frac{c\\alpha^2}{1 - \\alpha}",
      },
      authoredExample: {
        prompt:
          "The conductivity of 0.005 M acetic acid is 1.13 × 10⁻⁴ S cm⁻¹. Using λ°(H⁺) = 349.6 and λ°(CH₃COO⁻) = 40.9 S cm² mol⁻¹, find its degree of dissociation and its dissociation constant.",
        steps: [
          "Kohlrausch's law: \\(\\Lambda^{\\circ}_m = 349.6 + 40.9 = 390.5\\) S cm² mol⁻¹.",
          "Molar conductivity: \\(\\Lambda_m = \\dfrac{1.13 \\times 10^{-4} \\times 1000}{0.005} = 22.6\\) S cm² mol⁻¹.",
          "Degree of dissociation: \\(\\alpha = \\dfrac{22.6}{390.5} = 0.0579\\).",
          "Dissociation constant: \\(K_a = \\dfrac{c\\alpha^2}{1 - \\alpha} = \\dfrac{0.005 \\times (0.0579)^2}{1 - 0.0579} = 1.78 \\times 10^{-5}\\) mol L⁻¹.",
        ],
        answer: "α = 0.0579 (about 5.8 %); Ka = 1.78 × 10⁻⁵ mol L⁻¹",
      },
      selfCheckExample: {
        prompt: "Find Λ°m of Na₂SO₄. λ°(Na⁺) = 50.1, λ°(SO₄²⁻) = 160.0 S cm² mol⁻¹.",
        steps: ["Na₂SO₄ gives two Na⁺ and one SO₄²⁻.", "\\(\\Lambda^{\\circ}_m = 2(50.1) + 160.0 = 260.2\\) S cm² mol⁻¹."],
        answer: "260.2 S cm² mol⁻¹",
      },
      practiceSet: [
        {
          prompt: "Λ°m of HCl, HCOONa and NaCl are 425.9, 104.7 and 126.4 S cm² mol⁻¹. Find Λ°m of HCOOH.",
          answer: "\\(425.9 + 104.7 - 126.4 = 404.2\\) S cm² mol⁻¹",
        },
        {
          prompt: "A weak acid has Λm = 19.5 S cm² mol⁻¹ at a certain concentration, and Λ°m = 390 S cm² mol⁻¹. Find α.",
          answer: "\\(\\alpha = 19.5/390 = 0.05\\)",
        },
        {
          prompt: "A 0.02 M weak acid is 5 % dissociated. Find Ka.",
          answer: "\\(K_a = \\dfrac{0.02 \\times (0.05)^2}{1 - 0.05} = 5.3 \\times 10^{-5}\\) mol L⁻¹",
        },
      ],
      pyqExampleId: "2e5e703a-fe7d-4409-aee5-79a7acde79ad",
      traps: [
        {
          title: "Adding each ion only once",
          body: "Count every ion as often as the formula gives it: CaCl₂ is \\(\\lambda^{\\circ}_{\\text{Ca}^{2+}} + 2\\lambda^{\\circ}_{\\text{Cl}^{-}}\\). The charge on the ion is not a multiplier; the number of ions is.",
        },
        {
          title: "Picking the wrong salt to subtract",
          body: "In a combination, write the ions under each Λ°m and check that the unwanted ones cancel. For a weak base like NH₄OH you add NH₄Cl and NaOH and subtract NaCl.",
        },
        {
          title: "State the law at infinite dilution",
          body: "Kohlrausch's law is about the limiting molar conductivity. A statement that leaves out \"limiting\" or \"at infinite dilution\" is incomplete for the full mark.",
        },
      ],
    },
  ],
};
