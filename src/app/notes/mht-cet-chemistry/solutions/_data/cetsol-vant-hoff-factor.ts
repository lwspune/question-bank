import type { SubtopicNote } from "@/app/notes/_types";

export const VANT_HOFF_FACTOR_NOTE: SubtopicNote = {
  subtopicName: "Van't Hoff Factor and Abnormal Molar Mass",
  title: "Van't Hoff Factor and Abnormal Molar Mass",
  oneLineDefinition:
    "i = (observed colligative property)/(calculated for no dissociation) = ΔTf/(Kf·m); i > 1 for dissociation, i < 1 for association, and the degree of dissociation is α = (i − 1)/(n − 1).",
  whyItMatters:
    "16 PYQs, none HARD — the page that makes the electrolyte stems on every other page honest. Two-thirds are i from a measured freezing point of a 0.15–0.2 m KCl-type solution (i comes out near 1.8), the rest are the 'x K for urea, so how much for CaCl₂' ratio (3x) or AlCl₃ (4x), one percent-dissociation calculation, and the recall of which properties are colligative. " +
    "Learn the ion counts and the two rearrangements; the arithmetic is one division.",
  concepts: [
    // 1 — definition and i from ΔTf
    {
      kind: "formula" as const,
      slug: "cetsol-vant-hoff-factor-definition",
      name: "The Van't Hoff Factor: i = ΔTf(observed)/(Kf · m), and the Ion Count for Complete Dissociation",
      intuition:
        "An electrolyte gives more particles than its formula count, so its colligative effect is larger than the molality predicts. The ratio of observed to expected is \\(i\\); a fully dissociated salt has \\(i\\) equal to its number of ions, a real solution a little less.",
      definition:
        "- \\(i = \\dfrac{\\Delta T_f^{\\text{obs}}}{K_f\\,m}\\): \\(0.2\\) m freezing at \\(-0.68^\\circ\\)C gives \\(\\dfrac{0.68}{1.86 \\times 0.2} = 1.83\\); \\(0.15\\) m at \\(-0.51^\\circ\\)C gives \\(1.82\\); \\(0.2\\) m at \\(-0.7\\) K gives \\(1.88\\); \\(0.18\\) m at \\(-0.54^\\circ\\)C gives \\(1.61\\); \\(0.01\\) m at \\(-0.056\\) K gives \\(3.00\\).\n" +
        "- Complete dissociation: KCl, NaCl \\(\\to 2\\); CaCl\\(_2\\), BaCl\\(_2\\), Na\\(_2\\)SO\\(_4\\) \\(\\to 3\\); AlCl\\(_3\\) \\(\\to 4\\); Al\\(_2\\)(SO\\(_4\\))\\(_3\\) \\(\\to 5\\). Non-electrolytes (urea, glucose, sucrose) \\(i = 1\\).\n" +
        "- Ratio stems: if \\(1\\) m urea gives \\(\\Delta T_f = x\\), \\(1\\) m CaCl\\(_2\\) gives \\(3x\\); if a non-electrolyte gives \\(\\Delta T_b = x\\), AlCl\\(_3\\) at the same molality gives \\(4x\\).\n" +
        "- \\(\\Delta T_f = i K_f m\\) forwards: \\(0.01\\) m formic acid with \\(i = 1.1\\) gives \\(1.1 \\times 0.01 \\times 1.86 = 0.020\\) K.\n" +
        "- Association (acetic acid dimerising in benzene) gives \\(i < 1\\) and an abnormally HIGH observed molar mass; dissociation gives an abnormally LOW one.",
      formula: {
        label: "Van't Hoff factor",
        latex:
          "i = \\frac{\\text{observed}}{\\text{calculated}} = \\frac{\\Delta T_f^{\\text{obs}}}{K_f\\,m} = \\frac{M_{\\text{calc}}}{M_{\\text{obs}}}",
      },
      authoredExample: {
        prompt: "A \\(0.1\\) m aqueous solution of an electrolyte freezes at \\(-0.465^\\circ\\)C. Find \\(i\\) and suggest the number of ions it gives.",
        steps: [
          "\\(i = \\dfrac{0.465}{1.86 \\times 0.1} = 2.5\\).",
          "Between \\(2\\) and \\(3\\): a salt of three ions partly dissociated, or a mixed picture — the exam asks only for \\(i\\).",
        ],
        answer: "\\(i = 2.5\\)",
      },
      selfCheckExample: {
        prompt: "\\(1\\) m sucrose has \\(\\Delta T_b = y\\) K. What is \\(\\Delta T_b\\) for \\(1\\) m Na\\(_2\\)SO\\(_4\\) and for \\(0.5\\) m AlCl\\(_3\\), assuming complete dissociation?",
        steps: [
          "Na\\(_2\\)SO\\(_4\\): \\(3y\\). AlCl\\(_3\\) at half the molality: \\(4 \\times 0.5\\,y = 2y\\).",
        ],
        answer: "\\(3y\\) and \\(2y\\)",
      },
      practiceSet: [
        { prompt: "\\(i\\) if \\(0.2\\) m freezes at \\(-0.68^\\circ\\)C?", answer: "\\(1.83\\)" },
        { prompt: "\\(i\\) for complete dissociation of CaCl\\(_2\\)?", answer: "\\(3\\)" },
        { prompt: "\\(\\Delta T_f\\) for \\(1\\) m CaCl\\(_2\\) if \\(1\\) m urea gives \\(x\\)?", answer: "\\(3x\\)" },
        { prompt: "\\(i\\) for a solute that associates?", answer: "Less than \\(1\\)" },
      ],
      pyqExampleId: "dee73012-5967-4ffd-884b-59309558a035",
      traps: [
        {
          title: "Using the calculated ΔTf as the observed one",
          body:
            "\\(K_f m = 0.372\\) is the EXPECTED depression for \\(0.2\\) m; the observed \\(0.68\\) goes on top. Inverting gives \\(0.55\\), option (D) on the \\(-0.660\\) K stem.",
        },
      ],
    },

    // 2 — degree of dissociation
    {
      kind: "formula" as const,
      slug: "cetsol-degree-of-dissociation-from-i",
      name: "Degree of Dissociation From i: α = (i − 1)/(n − 1)",
      intuition:
        "If a fraction \\(\\alpha\\) of the formula units split into \\(n\\) ions, one mole becomes \\(1 - \\alpha + n\\alpha = 1 + (n - 1)\\alpha\\) moles of particles. That is \\(i\\), so \\(\\alpha = \\dfrac{i - 1}{n - 1}\\). For association into \\(n\\)-mers, \\(i = 1 - \\alpha + \\dfrac{\\alpha}{n}\\).",
      definition:
        "- \\(0.02\\) m, \\(\\Delta T_f = 0.046\\) K, \\(n = 2\\): \\(i = \\dfrac{0.046}{0.0372} = 1.236\\), \\(\\alpha = 0.236\\), i.e. \\(23.6\\%\\) dissociation.\n" +
        "- KCl with \\(i = 1.83\\): \\(\\alpha = 0.83\\). A salt of three ions with \\(i = 2.5\\): \\(\\alpha = 0.75\\).\n" +
        "- Observed molar mass \\(= \\dfrac{M_{\\text{calc}}}{i}\\): smaller than the formula mass for dissociation, larger for association.",
      formula: {
        label: "Degree of dissociation",
        latex:
          "i = 1 + (n - 1)\\alpha \\ \\Rightarrow\\ \\alpha = \\frac{i - 1}{n - 1} \\qquad \\text{association: } i = 1 - \\alpha + \\frac{\\alpha}{n}",
      },
      authoredExample: {
        prompt: "A \\(0.1\\) m solution of a salt MX\\(_2\\) freezes at \\(-0.4092^\\circ\\)C. Find its percent dissociation.",
        steps: [
          "\\(i = \\dfrac{0.4092}{0.186} = 2.2\\); \\(n = 3\\): \\(\\alpha = \\dfrac{1.2}{2} = 0.6\\).",
        ],
        answer: "\\(60\\%\\)",
      },
      selfCheckExample: {
        prompt: "Acetic acid in benzene forms dimers. If \\(80\\%\\) of it is associated, find \\(i\\).",
        steps: [
          "\\(i = 1 - 0.8 + \\dfrac{0.8}{2} = 0.6\\).",
        ],
        answer: "\\(0.6\\)",
      },
      practiceSet: [
        { prompt: "\\(\\alpha\\) for \\(i = 1.236\\), \\(n = 2\\)?", answer: "\\(0.236\\)" },
        { prompt: "\\(\\alpha\\) for \\(i = 1.83\\), KCl?", answer: "\\(0.83\\)" },
        { prompt: "\\(i\\) if \\(\\alpha = 0.5\\) for a three-ion salt?", answer: "\\(2\\)" },
        { prompt: "Observed molar mass when \\(i = 2\\) and \\(M_{\\text{calc}} = 74.5\\)?", answer: "\\(37.25\\)" },
      ],
      pyqExampleId: "c60c1315-a54b-45e8-9384-88e92311d074",
      traps: [
        {
          title: "Dividing by n instead of n − 1",
          body:
            "\\(\\alpha = \\dfrac{i - 1}{n - 1}\\); for \\(n = 2\\) that is simply \\(i - 1\\). Dividing \\(0.236\\) by \\(2\\) gives \\(11.8\\%\\), close to option (A).",
        },
      ],
    },

    // 3 — colligative recall (reference)
    {
      kind: "reference" as const,
      slug: "cetsol-colligative-properties-recall",
      name: "Which Properties Are Colligative, and the Statements the Exam Tests",
      intuition:
        "A colligative property depends only on the NUMBER of solute particles, not their identity. There are exactly four; a boiling point on its own is a property of the pure liquid and is not one of them.",
      definition:
        "- The four: relative lowering of vapour pressure, elevation of boiling point, depression of freezing point, osmotic pressure.\n" +
        "- NOT colligative: boiling point, freezing point, vapour pressure themselves (they are the solvent's properties), osmosis (a process, not a property), density, viscosity.\n" +
        "- True statements: a non-volatile solute LOWERS the vapour pressure and RAISES the boiling point; \\(0.1\\) M NaCl has a HIGHER osmotic pressure than \\(0.1\\) M sucrose (\\(i \\approx 2\\)); \\(\\Delta T_f = K_f\\) numerically for a \\(1\\) molal solution.",
      table: {
        columns: ["Property", "Colligative?", "Formula"],
        rows: [
          { cells: ["Relative lowering of vapour pressure", "Yes", "\\(\\dfrac{P^\\circ - P}{P^\\circ} = x_2\\)"] },
          { cells: ["Elevation of boiling point", "Yes", "\\(\\Delta T_b = i K_b m\\)"] },
          { cells: ["Depression of freezing point", "Yes", "\\(\\Delta T_f = i K_f m\\)"] },
          { cells: ["Osmotic pressure", "Yes", "\\(\\pi = i C R T\\)"] },
          { cells: ["Boiling point (of the solution)", "No", "An intensive property of the liquid; its CHANGE is colligative"], noteAmber: "'Boiling point' alone is the standard wrong answer to 'which is not colligative'." },
          { cells: ["Osmosis", "No", "A process; osmotic PRESSURE is the property"], noteAmber: "'Osmosis is a colligative property' is a planted false statement." },
        ],
        caption: "Four properties, all proportional to particle count; the quantities they change are not themselves colligative.",
      },
      selfCheckExample: {
        prompt: "Which is NOT colligative: (i) osmotic pressure, (ii) freezing point, (iii) relative lowering of vapour pressure?",
        steps: [
          "The freezing point itself is the solvent's property; its DEPRESSION is colligative.",
        ],
        answer: "(ii) freezing point",
      },
      practiceSet: [
        { prompt: "How many colligative properties are there?", answer: "Four" },
        { prompt: "Is boiling point colligative?", answer: "No — its elevation is." },
        { prompt: "Higher osmotic pressure: \\(0.1\\) M NaCl or \\(0.1\\) M sucrose?", answer: "\\(0.1\\) M NaCl" },
        { prompt: "Concentration for which \\(\\Delta T_f = K_f\\)?", answer: "\\(1\\) m" },
      ],
      pyqExampleId: "4e5dab08-010c-42ac-9770-c8cf5d995ffd",
      traps: [
        {
          title: "Marking 'boiling point elevation' as the non-colligative one",
          body:
            "The option list mixes 'boiling point' with 'freezing point depression'. The bare property is the odd one out; anything with 'elevation', 'depression' or 'lowering' in its name is colligative.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Osmotic Pressure — π = iCRT",
      href: "/notes/mht-cet-chemistry/solutions/cetsol-osmotic-pressure",
    },
    {
      label: "Elevation of Boiling Point — the i × m rankings",
      href: "/notes/mht-cet-chemistry/solutions/cetsol-boiling-point-elevation",
    },
  ],
};
