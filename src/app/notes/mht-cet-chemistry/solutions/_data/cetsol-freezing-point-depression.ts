import type { SubtopicNote } from "@/app/notes/_types";

export const FREEZING_POINT_DEPRESSION_NOTE: SubtopicNote = {
  subtopicName: "Depression of Freezing Point",
  title: "Depression of Freezing Point",
  oneLineDefinition:
    "A non-volatile solute lowers the freezing point by ΔTf = Kf · m (times i for an electrolyte); the molar-mass form is M₂ = 1000 Kf W₂/(ΔTf W₁), with Kf = 1.86 K kg mol⁻¹ for water.",
  whyItMatters:
    "16 PYQs, none HARD — the boiling-point page with a different constant, and the exam sets it the same way: molality from ΔTf (often given as a freezing point of −0.36 °C or −0.95 °C), Kf from a measured depression, molar mass from masses, and a ranking of electrolytes by i·m. " +
    "The one new habit is reading a negative Celsius freezing point as a positive ΔTf.",
  concepts: [
    // 1 — ΔTf = Kf m
    {
      kind: "formula" as const,
      slug: "cetsol-delta-tf-equals-kf-m",
      name: "ΔTf = Kf · m: Molality, Kf, or ΔTf From a Freezing Point",
      intuition:
        "Freezing point falls by \\(K_f\\) per molal. Water's \\(K_f\\) is \\(1.86\\) K kg mol\\(^{-1}\\); a solution freezing at \\(-0.93^\\circ\\)C has \\(\\Delta T_f = 0.93\\) K and molality \\(0.5\\).",
      definition:
        "- \\(m = \\dfrac{\\Delta T_f}{K_f}\\): \\(\\dfrac{0.93}{1.86} = 0.5\\), \\(\\dfrac{0.18}{1.6} = 0.113\\), \\(\\dfrac{0.95}{1.86} = 0.51\\), \\(\\dfrac{0.36}{1.86} = 0.193\\) mol kg\\(^{-1}\\).\n" +
        "- \\(\\Delta T_f = T_f^\\circ - T_f\\): water freezing at \\(-0.95^\\circ\\)C gives \\(\\Delta T_f = 0.95\\) K.\n" +
        "- \\(K_f = \\dfrac{\\Delta T_f}{m}\\): \\(\\dfrac{0.2}{0.18} = 1.11\\); from masses, \\(2.5\\) g of a \\(117\\) g mol\\(^{-1}\\) solute in \\(35\\) g solvent is \\(m = 0.611\\), so \\(K_f = \\dfrac{3}{0.611} = 4.91\\); \\(1\\) g of a \\(60\\) g mol\\(^{-1}\\) solute in \\(100\\) g with \\(\\Delta T_f = 0.3\\) gives \\(K_f = 1.8\\).\n" +
        "- \\(\\Delta T_f\\) from masses: \\(3.2\\) g of \\(128\\) g mol\\(^{-1}\\) in \\(80\\) g with \\(K_f = 4.8\\): \\(m = 0.3125\\), \\(\\Delta T_f = 1.5\\) K; \\(4\\) g of \\(126\\) g mol\\(^{-1}\\) in \\(80\\) mL water: \\(m = 0.397\\), \\(\\Delta T_f = 0.74\\) K.\n" +
        "- A \\(1\\) molal solution has \\(\\Delta T_f = K_f\\) numerically — 'which concentration makes \\(\\Delta T_f\\) and \\(K_f\\) equal' is \\(1\\) m.",
      formula: {
        label: "Freezing point depression",
        latex:
          "\\Delta T_f = K_f\\,m,\\qquad \\Delta T_f = T_f^\\circ - T_f \\qquad (K_f^{\\text{water}} = 1.86\\ \\text{K kg mol}^{-1})",
      },
      authoredExample: {
        prompt: "An aqueous solution freezes at \\(-1.24^\\circ\\)C. Find its molality, and the mass of glucose (\\(180\\) g mol\\(^{-1}\\)) in \\(500\\) g of water that would produce it.",
        steps: [
          "\\(m = \\dfrac{1.24}{1.86} = 0.667\\) mol kg\\(^{-1}\\).",
          "Moles \\(= 0.667 \\times 0.5 = 0.333\\); mass \\(= 60\\) g.",
        ],
        answer: "\\(0.667\\) mol kg\\(^{-1}\\); \\(60\\) g",
      },
      selfCheckExample: {
        prompt: "\\(6\\) g of a solute of molar mass \\(150\\) g mol\\(^{-1}\\) in \\(200\\) g of a solvent lowers its freezing point by \\(0.8\\) K. Find \\(K_f\\).",
        steps: [
          "\\(m = \\dfrac{0.04}{0.2} = 0.2\\); \\(K_f = \\dfrac{0.8}{0.2} = 4\\) K kg mol\\(^{-1}\\).",
        ],
        answer: "\\(4\\) K kg mol\\(^{-1}\\)",
      },
      practiceSet: [
        { prompt: "\\(\\Delta T_f\\) for a solution freezing at \\(-0.36^\\circ\\)C?", answer: "\\(0.36\\) K" },
        { prompt: "\\(m\\) if \\(\\Delta T_f = 0.93\\), \\(K_f = 1.86\\)?", answer: "\\(0.5\\) mol kg\\(^{-1}\\)" },
        { prompt: "\\(K_f\\) if \\(\\Delta T_f = 0.2\\), \\(m = 0.18\\)?", answer: "\\(1.11\\) K kg mol\\(^{-1}\\)" },
        { prompt: "Concentration at which \\(\\Delta T_f = K_f\\)?", answer: "\\(1\\) molal" },
      ],
      pyqExampleId: "f4fb73dc-a730-4aac-961f-efbe2f19bd07",
      traps: [
        {
          title: "Reading a freezing point as the depression",
          body:
            "\\(-0.95^\\circ\\)C is the freezing POINT; the depression is \\(+0.95\\) K. A stem in kelvin that says 'freezes at \\(-0.7\\) K' is using the same convention — take the magnitude.",
        },
      ],
    },

    // 2 — molar mass
    {
      kind: "formula" as const,
      slug: "cetsol-molar-mass-from-freezing-point",
      name: "Molar Mass From ΔTf: M₂ = 1000 Kf W₂ / (ΔTf W₁)",
      intuition:
        "The same rearrangement as for boiling: solute mass and \\(K_f\\) on top, depression and solvent mass below, with \\(1000\\) for the gram-to-kilogram conversion.",
      definition:
        "- \\(1\\) g in \\(100\\) g, \\(\\Delta T_f = 0.2\\), \\(K_f = 1.2\\): \\(\\dfrac{1000 \\times 1.2 \\times 1}{0.2 \\times 100} = 60\\). \\(1.5\\) g in \\(90\\) g, \\(0.25\\) K: \\(80\\). \\(15\\) g in \\(200\\) mL water, \\(0.75\\) K: \\(186\\). \\(5\\) g in \\(50\\) g water, \\(0.2\\) K: \\(930\\).\n" +
        "- Formula recognition: the correct option has \\(K_f \\times W_2\\) over \\(\\Delta T_f \\times W_1\\).\n" +
        "- Water's mass in grams equals its volume in millilitres (density \\(1\\)), so \\(200\\) mL means \\(W_1 = 200\\) g.",
      formula: {
        label: "Molar mass",
        latex:
          "M_2 = \\frac{1000\\,K_f\\,W_2}{\\Delta T_f\\,W_1}",
      },
      authoredExample: {
        prompt: "\\(2.5\\) g of a solute in \\(125\\) g of water lowers the freezing point by \\(0.372\\) K. Find the molar mass.",
        steps: [
          "\\(M_2 = \\dfrac{1000 \\times 1.86 \\times 2.5}{0.372 \\times 125} = \\dfrac{4650}{46.5} = 100\\).",
        ],
        answer: "\\(100\\) g mol\\(^{-1}\\)",
      },
      selfCheckExample: {
        prompt: "\\(0.6\\) g of a solute in \\(30\\) g of benzene (\\(K_f = 5.12\\)) lowers the freezing point by \\(0.64\\) K. Find the molar mass.",
        steps: [
          "\\(M_2 = \\dfrac{1000 \\times 5.12 \\times 0.6}{0.64 \\times 30} = \\dfrac{3072}{19.2} = 160\\).",
        ],
        answer: "\\(160\\) g mol\\(^{-1}\\)",
      },
      practiceSet: [
        { prompt: "\\(\\dfrac{1000 \\times 1.2 \\times 1}{0.2 \\times 100} = ?\\)", answer: "\\(60\\)" },
        { prompt: "\\(W_1\\) for \\(200\\) mL of water?", answer: "\\(200\\) g" },
        { prompt: "\\(M_2\\) for \\(5\\) g in \\(50\\) g water, \\(\\Delta T_f = 0.2\\)?", answer: "\\(930\\) g mol\\(^{-1}\\)" },
        { prompt: "Numerator of the molar-mass formula?", answer: "\\(1000\\,K_f\\,W_2\\)" },
      ],
      pyqExampleId: "b3ac2cb0-b247-436c-910a-4ce72436bb17",
      traps: [
        {
          title: "Choosing the formula with W₁ on top",
          body:
            "On the formula-recognition stem the four options permute \\(W_1\\), \\(W_2\\), \\(K_f\\) and \\(\\Delta T_f\\). Check with units: \\(K_f\\) (K kg mol\\(^{-1}\\)) \\(\\times\\) g \\(\\times 1000\\), over K \\(\\times\\) g, leaves g mol\\(^{-1}\\).",
        },
      ],
    },

    // 3 — comparing electrolytes
    {
      kind: "formula" as const,
      slug: "cetsol-comparing-freezing-depression-by-i-m",
      name: "Highest and Lowest Depression: Compare i × m",
      intuition:
        "\\(\\Delta T_f = i K_f m\\), so at the same solvent the largest \\(i \\times m\\) freezes lowest. Count the ions per formula unit for \\(i\\) and multiply by the molality.",
      definition:
        "- Highest among \\(0.1\\) m NaCl (\\(0.2\\)), \\(0.05\\) m MgSO\\(_4\\) (\\(0.1\\)), \\(1\\) m AlPO\\(_4\\) (\\(2\\)), \\(0.05\\) m Al\\(_2\\)(SO\\(_4\\))\\(_3\\) (\\(0.25\\)): AlPO\\(_4\\).\n" +
        "- Lowest among \\(0.1\\) m NaCl (\\(0.2\\)), \\(0.05\\) m MgSO\\(_4\\) (\\(0.1\\)), \\(0.08\\) m AlPO\\(_4\\) (\\(0.16\\)), \\(0.06\\) m Al\\(_2\\)(SO\\(_4\\))\\(_3\\) (\\(0.3\\)): MgSO\\(_4\\).\n" +
        "- Both salts of a \\(2+\\)/\\(2-\\) or \\(3+\\)/\\(3-\\) pairing (MgSO\\(_4\\), AlPO\\(_4\\)) give only two ions; the charge does not add particles.",
      formula: {
        label: "Electrolyte depression",
        latex:
          "\\Delta T_f = i\\,K_f\\,m \\qquad \\text{rank by } i \\times m",
      },
      authoredExample: {
        prompt: "Which freezes lowest: \\(0.1\\) m urea, \\(0.06\\) m KCl, \\(0.04\\) m CaCl\\(_2\\), \\(0.03\\) m AlCl\\(_3\\)?",
        steps: [
          "\\(i \\times m\\): \\(0.1\\), \\(0.12\\), \\(0.12\\), \\(0.12\\) — a three-way tie above urea.",
        ],
        answer: "KCl, CaCl\\(_2\\) and AlCl\\(_3\\) tie at \\(0.12\\); urea freezes highest.",
      },
      selfCheckExample: {
        prompt: "Find the freezing point of \\(0.1\\) m BaCl\\(_2\\) in water assuming complete dissociation.",
        steps: [
          "\\(\\Delta T_f = 3 \\times 1.86 \\times 0.1 = 0.558\\) K.",
        ],
        answer: "\\(-0.558^\\circ\\)C",
      },
      practiceSet: [
        { prompt: "\\(i \\times m\\) for \\(1\\) m AlPO\\(_4\\)?", answer: "\\(2\\)" },
        { prompt: "\\(i \\times m\\) for \\(0.05\\) m Al\\(_2\\)(SO\\(_4\\))\\(_3\\)?", answer: "\\(0.25\\)" },
        { prompt: "Lowest depression: \\(0.1\\) m NaCl or \\(0.05\\) m MgSO\\(_4\\)?", answer: "\\(0.05\\) m MgSO\\(_4\\)" },
        { prompt: "Freezing point of \\(0.5\\) m glucose in water?", answer: "\\(-0.93^\\circ\\)C" },
      ],
      pyqExampleId: "6fdaa8ab-63b0-403d-8a85-d0e278523d07",
      traps: [
        {
          title: "Ranking by molality alone",
          body:
            "\\(1\\) m AlPO\\(_4\\) beats \\(0.05\\) m Al\\(_2\\)(SO\\(_4\\))\\(_3\\) only after the ion count: \\(2\\) against \\(0.25\\). Without \\(i\\), the highest molality still wins here — but the LOWEST-depression stem is decided by \\(i\\).",
        },
      ],
    },
  ],
  related: [
    {
      label: "Elevation of Boiling Point — the twin formula with Kb",
      href: "/notes/mht-cet-chemistry/solutions/cetsol-boiling-point-elevation",
    },
    {
      label: "Van't Hoff Factor — i from a measured ΔTf",
      href: "/notes/mht-cet-chemistry/solutions/cetsol-vant-hoff-factor",
    },
  ],
};
