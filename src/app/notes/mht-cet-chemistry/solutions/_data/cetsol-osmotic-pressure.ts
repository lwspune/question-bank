import type { SubtopicNote } from "@/app/notes/_types";

export const OSMOTIC_PRESSURE_NOTE: SubtopicNote = {
  subtopicName: "Osmotic Pressure",
  title: "Osmotic Pressure",
  oneLineDefinition:
    "π = CRT = nRT/V, the van't Hoff equation: osmotic pressure is proportional to molar concentration and temperature; solved for n it gives the molar mass, and equal π at equal T means isotonic.",
  whyItMatters:
    "22 PYQs, none HARD. The van't Hoff equation solved for π, C, T or the molar mass (with R = 0.082 dm³ atm K⁻¹ mol⁻¹ and V in dm³), the isotonic pair of urea and sucrose solutions (three sittings), and rankings of electrolytes by i·m — the same ranking as the two previous pages. " +
    "Units are the whole difficulty: litres for V, kelvin for T, and mass in grams over molar mass for n.",
  concepts: [
    // 1 — π = CRT
    {
      kind: "formula" as const,
      slug: "cetsol-pi-equals-crt",
      name: "π = CRT: Solve for π, C, T or n",
      intuition:
        "Osmotic pressure behaves like the pressure of an ideal gas at the solution's molar concentration: \\(\\pi V = nRT\\). With \\(R = 0.082\\) dm\\(^3\\) atm K\\(^{-1}\\) mol\\(^{-1}\\), \\(V\\) in dm\\(^3\\) and \\(T\\) in kelvin, \\(\\pi\\) comes out in atmospheres.",
      definition:
        "- \\(\\pi = CRT\\): \\(0.5\\) M at \\(300\\) K gives \\(0.5 \\times 0.0821 \\times 300 = 12.32\\) atm; \\(0.025\\) mol in \\(100\\) mL gives \\(\\dfrac{0.025 \\times 0.082 \\times 300}{0.1} = 6.15\\) atm; \\(0.03\\) mol in \\(0.1\\) dm\\(^3\\): \\(7.4\\) atm.\n" +
        "- \\(C = \\dfrac{\\pi}{RT}\\): \\(12\\) atm at \\(300\\) K gives \\(\\dfrac{12}{24.63} = 0.487\\) M. \\(T = \\dfrac{\\pi}{CR}\\): \\(1.5\\) atm for \\(0.05\\) M gives \\(365.4\\) K.\n" +
        "- \\(\\pi \\propto C\\) at fixed \\(T\\): \\(0.2\\) M at \\(4.9\\) atm means \\(1.5\\) atm needs \\(0.06\\) M; \\(1\\) M urea has twice the osmotic pressure of \\(0.5\\) M urea.\n" +
        "- Osmotic pressure is the colligative property used for macromolecules because it is measurable at room temperature and large even for dilute solutions.",
      formula: {
        label: "Van't Hoff equation",
        latex:
          "\\pi = CRT = \\frac{n}{V}RT \\qquad (R = 0.082\\ \\text{dm}^3\\,\\text{atm K}^{-1}\\text{mol}^{-1})",
      },
      authoredExample: {
        prompt: "Find the osmotic pressure of a solution of \\(0.04\\) mol of a non-electrolyte in \\(250\\) mL of water at \\(27^\\circ\\)C.",
        steps: [
          "\\(T = 300\\) K, \\(V = 0.25\\) dm\\(^3\\): \\(\\pi = \\dfrac{0.04 \\times 0.082 \\times 300}{0.25} = 3.94\\) atm.",
        ],
        answer: "\\(3.94\\) atm",
      },
      selfCheckExample: {
        prompt: "At what temperature does a \\(0.1\\) M solution of a non-electrolyte have an osmotic pressure of \\(2.87\\) atm?",
        steps: [
          "\\(T = \\dfrac{2.87}{0.1 \\times 0.082} = 350\\) K.",
        ],
        answer: "\\(350\\) K",
      },
      practiceSet: [
        { prompt: "\\(\\pi\\) for \\(0.5\\) M at \\(300\\) K?", answer: "\\(12.3\\) atm" },
        { prompt: "\\(C\\) if \\(\\pi = 12\\) atm at \\(300\\) K?", answer: "\\(0.487\\) M" },
        { prompt: "\\(\\pi\\) of \\(1\\) M urea if \\(0.5\\) M urea has \\(x\\)?", answer: "\\(2x\\)" },
        { prompt: "\\(100\\) mL in dm\\(^3\\)?", answer: "\\(0.1\\)" },
      ],
      pyqExampleId: "56d46ebd-2d80-4ae3-865a-624ddfb05388",
      traps: [
        {
          title: "Volume in millilitres",
          body:
            "\\(0.025\\) mol in \\(100\\) mL is \\(0.25\\) M, not \\(0.00025\\) M. Convert to dm\\(^3\\) first; the mL version gives \\(0.00615\\) atm and a wrong pick.",
        },
      ],
    },

    // 2 — molar mass
    {
      kind: "formula" as const,
      slug: "cetsol-molar-mass-from-osmotic-pressure",
      name: "Molar Mass From Osmotic Pressure: M = W R T / (π V)",
      intuition:
        "Put \\(n = \\dfrac{W}{M}\\) into \\(\\pi V = nRT\\): \\(M = \\dfrac{WRT}{\\pi V}\\). The same equation solved for \\(W\\) tells how much solute produces a target osmotic pressure.",
      definition:
        "- \\(4\\) g in \\(1\\) dm\\(^3\\), \\(2\\) atm, \\(300\\) K: \\(M = \\dfrac{4 \\times 0.082 \\times 300}{2 \\times 1} = 49.2\\). \\(0.8\\) g in \\(0.3\\) dm\\(^3\\), \\(0.2\\) atm: \\(328\\). \\(0.4\\) g in \\(300\\) mL, \\(0.2\\) atm: \\(164\\). \\(1\\) g in \\(300\\) mL, \\(0.2\\) atm: \\(410\\). \\(8\\) g in \\(2\\) dm\\(^3\\), \\(0.6\\) atm: \\(164\\).\n" +
        "- \\(\\pi\\) from a known \\(M\\): \\(3\\) g of a \\(60\\) g mol\\(^{-1}\\) solute in \\(2\\) dm\\(^3\\) at \\(300\\) K: \\(\\dfrac{0.05}{2} \\times 24.63 = 0.62\\) atm.\n" +
        "- Mass for a target \\(\\pi\\): \\(0.245\\) atm in \\(2.5\\) dm\\(^3\\) at \\(300\\) K needs \\(n = \\dfrac{0.245 \\times 2.5}{24.63} = 0.0249\\) mol, i.e. \\(1.44\\) g of a \\(58\\) g mol\\(^{-1}\\) solute.\n" +
        "- Milligrams to grams (\\(400\\) mg \\(= 0.4\\) g) and millilitres to dm\\(^3\\) before substituting.",
      formula: {
        label: "Molar mass",
        latex:
          "M = \\frac{W\\,R\\,T}{\\pi\\,V}",
      },
      authoredExample: {
        prompt: "\\(2\\) g of a protein in \\(500\\) mL of water has an osmotic pressure of \\(0.0246\\) atm at \\(300\\) K. Find its molar mass.",
        steps: [
          "\\(M = \\dfrac{2 \\times 0.082 \\times 300}{0.0246 \\times 0.5} = \\dfrac{49.2}{0.0123} = 4000\\).",
        ],
        answer: "\\(4000\\) g mol\\(^{-1}\\)",
      },
      selfCheckExample: {
        prompt: "What mass of glucose (\\(180\\) g mol\\(^{-1}\\)) in \\(2\\) dm\\(^3\\) of solution gives an osmotic pressure of \\(1.23\\) atm at \\(300\\) K?",
        steps: [
          "\\(n = \\dfrac{1.23 \\times 2}{0.082 \\times 300} = 0.1\\) mol; mass \\(= 18\\) g.",
        ],
        answer: "\\(18\\) g",
      },
      practiceSet: [
        { prompt: "\\(M\\) for \\(4\\) g in \\(1\\) dm\\(^3\\), \\(2\\) atm, \\(300\\) K?", answer: "\\(49.2\\) g mol\\(^{-1}\\)" },
        { prompt: "\\(RT\\) at \\(300\\) K with \\(R = 0.0821\\)?", answer: "\\(24.63\\)" },
        { prompt: "\\(400\\) mg in grams?", answer: "\\(0.4\\) g" },
        { prompt: "\\(M\\) for \\(8\\) g in \\(2\\) dm\\(^3\\), \\(0.6\\) atm, \\(300\\) K?", answer: "\\(164\\) g mol\\(^{-1}\\)" },
      ],
      pyqExampleId: "922eb7e6-fa5e-4aee-ac8d-db1ea426e170",
      traps: [
        {
          title: "Leaving V in millilitres",
          body:
            "\\(300\\) mL is \\(0.3\\) dm\\(^3\\); with \\(300\\) in the denominator the molar mass comes out \\(1000\\) times too small. The options are spaced to catch a factor-of-ten slip, not this one — so the mistake shows as 'none of the options', a sign to recheck units.",
        },
      ],
    },

    // 3 — isotonic, hypertonic, electrolytes
    {
      kind: "formula" as const,
      slug: "cetsol-isotonic-hypertonic-and-electrolytes",
      name: "Isotonic and Hypertonic Solutions, and π = iCRT for Electrolytes",
      intuition:
        "Two solutions with the same osmotic pressure at the same temperature are isotonic and no solvent flows between them across a membrane; the one with higher \\(\\pi\\) is hypertonic. For a non-electrolyte that means equal molarity; for electrolytes, equal \\(i \\times C\\).",
      definition:
        "- \\(6\\) g dm\\(^{-3}\\) urea (\\(0.1\\) M) and \\(34.2\\) g dm\\(^{-3}\\) sucrose (\\(0.1\\) M) are isotonic; \\(3\\) g dm\\(^{-3}\\) urea and \\(17.1\\) g dm\\(^{-3}\\) sucrose (\\(0.05\\) M each) likewise. \\(6\\) g dm\\(^{-3}\\) urea against \\(17.12\\) g dm\\(^{-3}\\) sucrose (\\(0.05\\) M): urea is hypertonic.\n" +
        "- \\(\\pi = iCRT\\): \\(0.2\\) M KCl with \\(i = 1.83\\) at \\(273\\) K gives \\(8.2\\) atm; \\(1.7\\) g CaCl\\(_2\\) (\\(111\\) g mol\\(^{-1}\\)) in \\(1.25\\) dm\\(^3\\) with \\(i = 2.47\\) at \\(300\\) K gives \\(0.744\\) atm.\n" +
        "- Rankings by \\(i \\times m\\) (complete dissociation): \\(0.1\\) m BaCl\\(_2\\) (\\(0.3\\)) \\(<\\) \\(0.5\\) m KCl (\\(1\\)) \\(<\\) \\(0.5\\) m Li\\(_2\\)SO\\(_4\\) (\\(1.5\\)) \\(<\\) \\(0.5\\) m Al\\(_2\\)(SO\\(_4\\))\\(_3\\) (\\(2.5\\)); equimolar KCl \\(<\\) BaCl\\(_2\\) \\(<\\) AlCl\\(_3\\) \\(<\\) Al\\(_2\\)(SO\\(_4\\))\\(_3\\) (\\(i = 2, 3, 4, 5\\)); decreasing: \\(0.5\\) m Al\\(_2\\)(SO\\(_4\\))\\(_3\\) (\\(2.5\\)) \\(>\\) \\(0.3\\) m MgSO\\(_4\\) (\\(0.6\\)) \\(>\\) \\(0.2\\) m KCl (\\(0.4\\)) \\(>\\) \\(0.1\\) m BaCl\\(_2\\) (\\(0.3\\)).\n" +
        "- Isotonic in the exam's sense compares molar concentrations, not masses per litre; convert every 'g dm\\(^{-3}\\)' by the molar mass first.",
      formula: {
        label: "Electrolytes and isotonicity",
        latex:
          "\\pi = i\\,C\\,R\\,T \\qquad \\text{isotonic} \\iff \\pi_1 = \\pi_2 \\iff (iC)_1 = (iC)_2",
      },
      authoredExample: {
        prompt: "Are \\(9\\) g dm\\(^{-3}\\) glucose (\\(180\\)) and \\(3\\) g dm\\(^{-3}\\) urea (\\(60\\)) isotonic? If not, which is hypertonic?",
        steps: [
          "Glucose \\(0.05\\) M, urea \\(0.05\\) M: equal.",
        ],
        answer: "Isotonic.",
      },
      selfCheckExample: {
        prompt: "Find the osmotic pressure of \\(0.1\\) M Na\\(_2\\)SO\\(_4\\) at \\(300\\) K assuming complete dissociation.",
        steps: [
          "\\(i = 3\\): \\(\\pi = 3 \\times 0.1 \\times 0.082 \\times 300 = 7.38\\) atm.",
        ],
        answer: "\\(7.38\\) atm",
      },
      practiceSet: [
        { prompt: "Molarity of \\(34.2\\) g dm\\(^{-3}\\) sucrose?", answer: "\\(0.1\\) M" },
        { prompt: "Isotonic with \\(6\\) g dm\\(^{-3}\\) urea: how much sucrose per dm\\(^3\\)?", answer: "\\(34.2\\) g" },
        { prompt: "\\(\\pi\\) of \\(0.2\\) M KCl at \\(273\\) K with \\(i = 1.83\\)?", answer: "\\(8.2\\) atm" },
        { prompt: "Increasing \\(\\pi\\), equimolar: KCl, BaCl\\(_2\\), AlCl\\(_3\\), Al\\(_2\\)(SO\\(_4\\))\\(_3\\)?", answer: "KCl \\(<\\) BaCl\\(_2\\) \\(<\\) AlCl\\(_3\\) \\(<\\) Al\\(_2\\)(SO\\(_4\\))\\(_3\\)" },
      ],
      pyqExampleId: "9522454c-4ea4-4a3a-95de-b8f56ae17438",
      traps: [
        {
          title: "Comparing grams per litre directly",
          body:
            "\\(6\\) g of urea and \\(34.2\\) g of sucrose are the SAME number of moles. Isotonicity is about molarity; the mass-matched pair (\\(6\\) and \\(6\\)) is never the answer.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Van't Hoff Factor — the i in π = iCRT",
      href: "/notes/mht-cet-chemistry/solutions/cetsol-vant-hoff-factor",
    },
    {
      label: "Depression of Freezing Point — the same i × m rankings",
      href: "/notes/mht-cet-chemistry/solutions/cetsol-freezing-point-depression",
    },
  ],
};
