import type { SubtopicNote } from "@/app/notes/_types";

export const BOILING_POINT_ELEVATION_NOTE: SubtopicNote = {
  subtopicName: "Elevation of Boiling Point",
  title: "Elevation of Boiling Point",
  oneLineDefinition:
    "A non-volatile solute raises the boiling point by ΔTb = Kb · m (times i for an electrolyte); rearranged, M₂ = 1000 Kb W₂/(ΔTb W₁) gives the solute's molar mass.",
  whyItMatters:
    "28 PYQs, two HARD — the chapter's second-largest page and the purest formula drill on it. Molality from ΔTb and Kb (eleven sittings), Kb from a boiling point, moles or solvent mass from the same equation, the molar-mass rearrangement, and the ranking of electrolyte solutions by i·m (five sittings). " +
    "Two things cost marks: the solvent mass must be in kilograms, and a stem that gives the boiling POINT needs ΔTb subtracted first.",
  concepts: [
    // 1 — ΔTb = Kb m
    {
      kind: "formula" as const,
      slug: "cetsol-delta-tb-equals-kb-m",
      name: "ΔTb = Kb · m: Solve for Any One of Molality, Kb, Moles or Solvent Mass",
      intuition:
        "The elevation is proportional to how many solute particles there are per kilogram of solvent. Kb is the solvent's constant (the elevation a \\(1\\) molal solution would show); everything else in the stem is either given or asked.",
      definition:
        "- \\(m = \\dfrac{\\Delta T_b}{K_b}\\): \\(\\dfrac{1.75}{3.5} = 0.5\\), \\(\\dfrac{0.5}{2.40} = 0.21\\), \\(\\dfrac{1.89}{3.15} = 0.6\\), \\(\\dfrac{7.15}{2.75} = 2.6\\), \\(\\dfrac{0.2}{0.52} = 0.385\\), \\(\\dfrac{0.39}{0.52} = 0.75\\) mol kg\\(^{-1}\\).\n" +
        "- \\(K_b = \\dfrac{\\Delta T_b}{m}\\): boiling point \\(319.8\\) K against the solvent's \\(319.5\\) K gives \\(\\Delta T_b = 0.3\\), and \\(0.12\\) m gives \\(K_b = 2.5\\) K kg mol\\(^{-1}\\). From masses: \\(1.5\\) g of a \\(150\\) g mol\\(^{-1}\\) solute in \\(30\\) g solvent is \\(m = 0.333\\), so \\(K_b = \\dfrac{0.65}{0.333} = 1.95\\).\n" +
        "- Moles \\(n = m \\times W_{\\text{solvent}}(\\text{kg})\\): \\(\\Delta T_b = 0.8\\), \\(K_b = 2\\), \\(0.5\\) kg gives \\(n = 0.2\\). Solvent mass \\(= \\dfrac{n}{m}\\): \\(0.01\\) mol with \\(m = 0.3\\) gives \\(0.033\\) kg.\n" +
        "- Elevation is proportional to molality: \\(0.1\\) m glucose boils at \\(100.16^\\circ\\)C, so \\(0.5\\) m boils at \\(100.8^\\circ\\)C. Equal boiling points mean equal molality: \\(18\\) g dm\\(^{-3}\\) glucose (\\(0.1\\) mol) and \\(6\\) g dm\\(^{-3}\\) of A give \\(M_A = 60\\).\n" +
        "- Mass of solute from a boiling point: \\(85^\\circ\\)C against \\(76^\\circ\\)C with \\(K_b = 2.7\\): \\(m = \\dfrac{9}{2.7}\\), moles \\(= \\dfrac{10}{3} \\times 0.16\\), mass \\(= 64\\) g.",
      formula: {
        label: "Boiling point elevation",
        latex:
          "\\Delta T_b = K_b\\,m = K_b\\,\\frac{n_2}{W_1(\\text{kg})} \\qquad T_b = T_b^\\circ + \\Delta T_b",
      },
      authoredExample: {
        prompt: "A solution of \\(2\\) g of a non-volatile solute (\\(M = 80\\) g mol\\(^{-1}\\)) in \\(50\\) g of a solvent boils \\(0.9\\) K above the pure solvent. Find \\(K_b\\).",
        steps: [
          "\\(m = \\dfrac{2/80}{0.05} = 0.5\\) mol kg\\(^{-1}\\).",
          "\\(K_b = \\dfrac{0.9}{0.5} = 1.8\\) K kg mol\\(^{-1}\\).",
        ],
        answer: "\\(1.8\\) K kg mol\\(^{-1}\\)",
      },
      selfCheckExample: {
        prompt: "How many grams of urea (\\(60\\) g mol\\(^{-1}\\)) must be dissolved in \\(250\\) g of water to raise its boiling point by \\(0.26\\) K? (\\(K_b = 0.52\\))",
        steps: [
          "\\(m = 0.5\\); moles \\(= 0.5 \\times 0.25 = 0.125\\); mass \\(= 7.5\\) g.",
        ],
        answer: "\\(7.5\\) g",
      },
      practiceSet: [
        { prompt: "\\(m\\) if \\(\\Delta T_b = 1.75\\), \\(K_b = 3.5\\)?", answer: "\\(0.5\\) mol kg\\(^{-1}\\)" },
        { prompt: "\\(K_b\\) if \\(\\Delta T_b = 0.3\\), \\(m = 0.12\\)?", answer: "\\(2.5\\) K kg mol\\(^{-1}\\)" },
        { prompt: "Moles if \\(m = 0.4\\) in \\(0.5\\) kg solvent?", answer: "\\(0.2\\)" },
        { prompt: "\\(0.5\\) m glucose boils at? (\\(0.1\\) m boils at \\(100.16^\\circ\\)C)", answer: "\\(100.8^\\circ\\)C" },
      ],
      pyqExampleId: "53b66545-060f-4a84-b0c1-ae3c3e7f0d56",
      traps: [
        {
          title: "Grams where kilograms belong",
          body:
            "Molality is per KILOGRAM of solvent. \\(30\\) g is \\(0.03\\) kg; leaving it as \\(30\\) drops the answer by a factor of \\(1000\\), and the option list is built around that.",
        },
      ],
    },

    // 2 — molar mass
    {
      kind: "formula" as const,
      slug: "cetsol-molar-mass-from-boiling-point",
      name: "Molar Mass From ΔTb: M₂ = 1000 Kb W₂ / (ΔTb W₁)",
      intuition:
        "Substitute \\(m = \\dfrac{W_2 \\times 1000}{M_2 W_1}\\) into \\(\\Delta T_b = K_b m\\) and solve for \\(M_2\\). \\(W_2\\) is the solute mass, \\(W_1\\) the solvent mass in grams; the \\(1000\\) converts grams to kilograms.",
      definition:
        "- \\(M_2 = \\dfrac{1000\\,K_b\\,W_2}{\\Delta T_b\\,W_1}\\): \\(5\\) g in \\(50\\) g boiling \\(1.6\\) K high with \\(K_b = 3.2\\): \\(\\dfrac{1000 \\times 3.2 \\times 5}{1.6 \\times 50} = 200\\); \\(0.35\\) g in \\(100\\) g, \\(\\Delta T_b = 0.01\\), \\(K_b = 0.5\\): \\(175\\); \\(3.5\\) g in \\(100\\) g, \\(0.35\\) K, \\(K_b = 2.5\\): \\(250\\).\n" +
        "- Recognise the formula among rearrangements: \\(K_b\\) and \\(W_2\\) in the numerator, \\(\\Delta T_b\\) and \\(W_1\\) in the denominator.\n" +
        "- A boiling POINT (\\(119.6^\\circ\\)C against \\(118^\\circ\\)C) must first become \\(\\Delta T_b = 1.6\\) K.",
      formula: {
        label: "Molar mass",
        latex:
          "M_2 = \\frac{1000\\,K_b\\,W_2}{\\Delta T_b\\,W_1}",
      },
      authoredExample: {
        prompt: "\\(2.4\\) g of a solute in \\(60\\) g of benzene (\\(K_b = 2.53\\) K kg mol\\(^{-1}\\)) raises the boiling point by \\(0.506\\) K. Find the molar mass.",
        steps: [
          "\\(M_2 = \\dfrac{1000 \\times 2.53 \\times 2.4}{0.506 \\times 60} = \\dfrac{6072}{30.36} = 200\\).",
        ],
        answer: "\\(200\\) g mol\\(^{-1}\\)",
      },
      selfCheckExample: {
        prompt: "A solution of \\(4\\) g of a solute in \\(40\\) g of a solvent (\\(K_b = 1.8\\)) boils at \\(81.2^\\circ\\)C; the solvent boils at \\(80^\\circ\\)C. Find the molar mass.",
        steps: [
          "\\(\\Delta T_b = 1.2\\); \\(M_2 = \\dfrac{1000 \\times 1.8 \\times 4}{1.2 \\times 40} = 150\\).",
        ],
        answer: "\\(150\\) g mol\\(^{-1}\\)",
      },
      practiceSet: [
        { prompt: "\\(\\dfrac{1000 \\times 3.2 \\times 5}{1.6 \\times 50} = ?\\)", answer: "\\(200\\)" },
        { prompt: "Which goes in the numerator: \\(W_1\\) or \\(W_2\\)?", answer: "\\(W_2\\) (solute)" },
        { prompt: "\\(\\Delta T_b\\) for a solution boiling at \\(119.6^\\circ\\)C in a solvent boiling at \\(118^\\circ\\)C?", answer: "\\(1.6\\) K" },
        { prompt: "\\(M_2\\) for \\(3.5\\) g in \\(100\\) g, \\(\\Delta T_b = 0.35\\), \\(K_b = 2.5\\)?", answer: "\\(250\\) g mol\\(^{-1}\\)" },
      ],
      pyqExampleId: "cbcb2f65-4afa-4281-9b3b-6732b7355324",
      traps: [
        {
          title: "Swapping W₁ and W₂",
          body:
            "\\(W_2\\) (solute) is on top, \\(W_1\\) (solvent) below. The swap changes \\(200\\) to \\(2\\) — not on the list — but on the formula-recognition stem the swapped option is (B).",
        },
      ],
    },

    // 3 — comparing electrolytes
    {
      kind: "formula" as const,
      slug: "cetsol-comparing-electrolyte-solutions-by-i-m",
      name: "Ranking Electrolyte Solutions: Compare i × m",
      intuition:
        "For an electrolyte \\(\\Delta T_b = i K_b m\\), and with complete dissociation \\(i\\) is the number of ions per formula unit. At the same \\(K_b\\), the solution with the largest \\(i \\times m\\) has the largest elevation; compute the product for each option and rank.",
      definition:
        "- \\(i\\): KCl, NaCl, KNO\\(_3\\), MgSO\\(_4\\), AlPO\\(_4\\) → \\(2\\); BaCl\\(_2\\), CaCl\\(_2\\), MgCl\\(_2\\), Na\\(_2\\)SO\\(_4\\) → \\(3\\); AlCl\\(_3\\) → \\(4\\); Al\\(_2\\)(SO\\(_4\\))\\(_3\\) → \\(5\\).\n" +
        "- Maximum elevation among \\(0.1\\) m KCl (\\(0.2\\)), \\(0.05\\) m NaCl (\\(0.1\\)), \\(0.1\\) m BaCl\\(_2\\) (\\(0.3\\)), \\(0.1\\) m MgSO\\(_4\\) (\\(0.2\\)): BaCl\\(_2\\). Equimolal: AlCl\\(_3\\) (\\(i = 4\\)) beats BaCl\\(_2\\), KCl, NaCl.\n" +
        "- Minimum: \\(0.01\\) m MgCl\\(_2\\) (\\(0.03\\)) below \\(0.1\\) m AlCl\\(_3\\), \\(1\\) m KCl, \\(0.5\\) m NaCl; \\(0.05\\) m CaCl\\(_2\\) (\\(0.15\\)) below \\(0.1\\) m NaCl, \\(0.2\\) m KNO\\(_3\\), \\(0.1\\) m Na\\(_2\\)SO\\(_4\\); \\(0.05\\) m MgCl\\(_2\\) (\\(0.15\\)) below \\(0.2\\) m KCl, \\(0.1\\) m NaCl, \\(1\\) m AlCl\\(_3\\).\n" +
        "- True/false stems: the boiling point of a solution of a non-volatile solute is ALWAYS higher than the pure solvent's; the relative lowering equals the mole fraction of the SOLUTE (not the solvent).",
      formula: {
        label: "Electrolyte elevation",
        latex:
          "\\Delta T_b = i\\,K_b\\,m \\qquad \\text{rank by } i \\times m",
      },
      authoredExample: {
        prompt: "Rank by boiling point elevation: \\(0.1\\) m Na\\(_2\\)SO\\(_4\\), \\(0.15\\) m KCl, \\(0.05\\) m Al\\(_2\\)(SO\\(_4\\))\\(_3\\), \\(0.2\\) m glucose.",
        steps: [
          "\\(i \\times m\\): \\(0.3\\), \\(0.3\\), \\(0.25\\), \\(0.2\\).",
        ],
        answer: "Na\\(_2\\)SO\\(_4\\) = KCl > Al\\(_2\\)(SO\\(_4\\))\\(_3\\) > glucose",
      },
      selfCheckExample: {
        prompt: "Which has the lower boiling point: \\(0.02\\) m AlCl\\(_3\\) or \\(0.03\\) m BaCl\\(_2\\)?",
        steps: [
          "\\(4 \\times 0.02 = 0.08\\) against \\(3 \\times 0.03 = 0.09\\).",
        ],
        answer: "\\(0.02\\) m AlCl\\(_3\\) (smaller \\(i \\times m\\))",
      },
      practiceSet: [
        { prompt: "\\(i\\) for Al\\(_2\\)(SO\\(_4\\))\\(_3\\)?", answer: "\\(5\\)" },
        { prompt: "\\(i \\times m\\) for \\(0.05\\) m CaCl\\(_2\\)?", answer: "\\(0.15\\)" },
        { prompt: "Highest elevation: \\(0.1\\) m KCl, \\(0.05\\) m NaCl, \\(0.1\\) m BaCl\\(_2\\), \\(0.1\\) m MgSO\\(_4\\)?", answer: "\\(0.1\\) m BaCl\\(_2\\)" },
        { prompt: "Relative lowering equals the mole fraction of?", answer: "The solute" },
      ],
      pyqExampleId: "c55f7f73-fff8-4707-add9-f24894912c29",
      traps: [
        {
          title: "Counting AlPO₄ as five ions",
          body:
            "AlPO\\(_4\\) gives Al\\(^{3+}\\) and PO\\(_4^{3-}\\): TWO ions, \\(i = 2\\), like MgSO\\(_4\\). Al\\(_2\\)(SO\\(_4\\))\\(_3\\) is the one with five.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Depression of Freezing Point — the same formula with Kf",
      href: "/notes/mht-cet-chemistry/solutions/cetsol-freezing-point-depression",
    },
    {
      label: "Van't Hoff Factor — where i comes from when dissociation is incomplete",
      href: "/notes/mht-cet-chemistry/solutions/cetsol-vant-hoff-factor",
    },
  ],
};
