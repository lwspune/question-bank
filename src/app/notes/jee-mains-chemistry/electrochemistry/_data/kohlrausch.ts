import type { SubtopicNote } from "@/app/notes/_types";

export const KOHLRAUSCH_ELEC_NOTE: SubtopicNote = {
  subtopicName: "Molar Conductivity, Dilution and Kohlrausch's Law",
  title: "Molar Conductivity, Dilution and Kohlrausch's Law",
  oneLineDefinition:
    "How molar conductivity changes with dilution for strong and weak electrolytes, how Kohlrausch's law builds a limiting value from ion values, and how that gives the degree of dissociation, Ka and solubility.",
  whyItMatters:
    "Twenty-one PYQs, twelve of them multiple choice, and four from 2026. Nine ask how Λm behaves with dilution, for strong and weak electrolytes or in a conductometric titration. Five build a limiting molar conductivity from other salts, and seven turn Λm into a degree of dissociation, a Ka or a solubility. Three ideas cover the page.",
  concepts: [
    // C1 — strong and weak electrolytes on dilution
    {
      kind: "formula" as const,
      slug: "jcelec-strong-weak",
      name: "Strong and weak electrolytes on dilution",
      intuition:
        "A strong electrolyte is fully ionised already. Dilution only lets its ions move a little more freely, so \\(\\Lambda_m\\) rises slowly and in a straight line against \\(\\sqrt c\\). A weak electrolyte ionises more as it is diluted, so its \\(\\Lambda_m\\) stays low and then shoots up near zero concentration.",
      definition:
        "- **Strong** (KCl, NaCl, HCl): \\(\\Lambda_m=\\Lambda_m^\\circ-A\\sqrt c\\). A plot of \\(\\Lambda_m\\) against \\(\\sqrt c\\) is a straight line with slope \\(-A\\) and intercept \\(\\Lambda_m^\\circ\\).\n" +
        "- The unit of \\(A\\) is \\(\\mathrm{S\\,cm^2\\,mol^{-1}\\,(mol\\,L^{-1})^{-1/2}}\\), that is \\(\\mathrm{S\\,cm^2\\,mol^{-3/2}\\,L^{1/2}}\\).\n" +
        "- **Weak** (\\(\\mathrm{CH_3COOH}\\), \\(\\mathrm{NH_4OH}\\), \\(\\mathrm{H_2CO_3}\\)): the plot is not a line. Its \\(\\Lambda_m^\\circ\\) cannot be found by extrapolation, only by Kohlrausch's law.\n" +
        "- A weak acid's \\(\\Lambda_m^\\circ\\) can still be LARGE: \\(\\mathrm{CH_3COOH}\\) is 390.5 against KCl's 149.8, because it contains \\(\\mathrm{H^+}\\).\n" +
        "- Conductometric titration with NaOH: a strong acid falls sharply (\\(\\mathrm{H^+}\\) replaced by the slower \\(\\mathrm{Na^+}\\)) then rises (excess \\(\\mathrm{OH^-}\\)). A weak acid dips slightly, rises gently as the salt forms, then rises steeply after the end point. A mixture of the two shows the fall, the gentle rise and the steep rise in turn.",
      formula: {
        label: "Debye–Hückel–Onsager (strong electrolytes)",
        latex: "\\Lambda_m=\\Lambda_m^\\circ-A\\sqrt c",
      },
      authoredExample: {
        prompt:
          "A strong electrolyte has \\(\\Lambda_m=141.0\\) S cm² mol⁻¹ at 0.01 M and 138.0 at 0.04 M. Find \\(A\\) and \\(\\Lambda_m^\\circ\\).",
        steps: [
          "\\(\\sqrt c\\) is 0.1 and 0.2.",
          "Slope \\(=\\frac{138.0-141.0}{0.2-0.1}=-30\\), so \\(A=30\\).",
          "\\(\\Lambda_m^\\circ=141.0+30\\times0.1=144.0\\) S cm² mol⁻¹.",
        ],
        answer: "\\(A=30\\); \\(\\Lambda_m^\\circ=144.0\\) S cm² mol⁻¹.",
      },
      selfCheckExample: {
        prompt:
          "A strong electrolyte has \\(\\Lambda_m^\\circ=150\\) S cm² mol⁻¹ and \\(A=80\\,\\mathrm{S\\,cm^2\\,mol^{-1}\\,(mol\\,L^{-1})^{-1/2}}\\). Find \\(\\Lambda_m\\) at 0.0025 M.",
        steps: [
          "\\(\\sqrt{0.0025}=0.05\\).",
          "\\(\\Lambda_m=150-80\\times0.05=146\\) S cm² mol⁻¹.",
        ],
        answer: "\\(146\\) S cm² mol⁻¹.",
      },
      practiceSet: [
        { prompt: "Shape of \\(\\Lambda_m\\) against \\(\\sqrt c\\) for acetic acid?", answer: "Low and flat, then rising steeply as \\(c\\to0\\)" },
        { prompt: "Can \\(\\Lambda_m^\\circ\\) of a weak acid be found by extrapolating the plot?", answer: "No; use Kohlrausch's law" },
        { prompt: "Strong or weak: \\(\\Lambda_m\\) rises only slightly on dilution?", answer: "Strong" },
        { prompt: "HCl titrated with NaOH: conductance before the end point?", answer: "Falls", method: "Fast \\(\\mathrm{H^+}\\) is replaced by slower \\(\\mathrm{Na^+}\\)." },
      ],
      pyqExampleId: "deee6b72-1c66-4bf8-89de-673dfeb1aca9", // 2026 — table of c and Λm; find A
      traps: [
        {
          title: "Extrapolating a weak electrolyte",
          body: "Only a strong electrolyte gives a straight line to read \\(\\Lambda_m^\\circ\\) from. For a weak one the curve is nearly vertical near zero, so there is no intercept to read.",
        },
        {
          title: "Plotting against c instead of √c",
          body: "The straight line is against \\(\\sqrt c\\). Taking the slope from \\(c\\) values gives the wrong \\(A\\).",
        },
      ],
    },

    // C2 — Kohlrausch's law
    {
      kind: "formula" as const,
      slug: "jcelec-kohlrausch",
      name: "Kohlrausch's law of independent migration",
      intuition:
        "At infinite dilution each ion moves on its own, so the limiting molar conductivity is just the sum of the ions' contributions. When the ion values are not given, add and subtract whole salts until the unwanted ions cancel.",
      definition:
        "- \\(\\Lambda_m^\\circ=\\nu_+\\lambda_+^\\circ+\\nu_-\\lambda_-^\\circ\\), where \\(\\nu\\) is the number of each ion in the formula.\n" +
        "- \\(\\Lambda_m^\\circ(\\mathrm{CH_3COOH})=\\Lambda_m^\\circ(\\mathrm{CH_3COONa})+\\Lambda_m^\\circ(\\mathrm{HCl})-\\Lambda_m^\\circ(\\mathrm{NaCl})\\).\n" +
        "- \\(\\Lambda_m^\\circ(\\mathrm{BaSO_4})=\\Lambda_m^\\circ(\\mathrm{BaCl_2})+\\Lambda_m^\\circ(\\mathrm{H_2SO_4})-2\\Lambda_m^\\circ(\\mathrm{HCl})\\).\n" +
        "- \\(\\Lambda_m^\\circ(\\mathrm{AgI})=\\Lambda_m^\\circ(\\mathrm{NaI})+\\Lambda_m^\\circ(\\mathrm{AgNO_3})-\\Lambda_m^\\circ(\\mathrm{NaNO_3})\\).\n" +
        "- A divalent salt MX (such as \\(\\mathrm{MgSO_4}\\)) has one of each ion: \\(\\Lambda_m^\\circ=\\lambda_+^\\circ+\\lambda_-^\\circ\\).\n" +
        "- Mohr's salt, \\(\\mathrm{FeSO_4\\cdot(NH_4)_2SO_4\\cdot6H_2O}\\): \\(\\lambda^\\circ(\\mathrm{Fe^{2+}})+2\\lambda^\\circ(\\mathrm{NH_4^+})+2\\lambda^\\circ(\\mathrm{SO_4^{2-}})\\).",
      formula: {
        label: "Kohlrausch's law",
        latex: "\\Lambda_m^\\circ=\\nu_+\\lambda_+^\\circ+\\nu_-\\lambda_-^\\circ",
      },
      authoredExample: {
        prompt:
          "\\(\\Lambda_m^\\circ\\) values in S cm² mol⁻¹: \\(\\mathrm{CH_3COONa}\\) 91.0, HCl 425.9, NaCl 126.4. Find \\(\\Lambda_m^\\circ(\\mathrm{CH_3COOH})\\).",
        steps: [
          "\\(\\mathrm{CH_3COONa+HCl-NaCl}\\) leaves \\(\\mathrm{CH_3COO^-}\\) and \\(\\mathrm{H^+}\\).",
          "\\(91.0+425.9-126.4=390.5\\).",
        ],
        answer: "\\(390.5\\) S cm² mol⁻¹.",
      },
      selfCheckExample: {
        prompt:
          "\\(\\Lambda_m^\\circ\\) values in S cm² mol⁻¹: \\(\\mathrm{BaCl_2}\\) 280, \\(\\mathrm{H_2SO_4}\\) 860, HCl 426. Find \\(\\Lambda_m^\\circ(\\mathrm{BaSO_4})\\).",
        steps: [
          "\\(\\mathrm{BaCl_2+H_2SO_4}\\) gives \\(\\mathrm{Ba^{2+}+SO_4^{2-}+2H^++2Cl^-}\\).",
          "Remove \\(\\mathrm{2H^++2Cl^-}\\), which is \\(2\\,\\mathrm{HCl}\\).",
          "\\(280+860-2(426)=288\\).",
        ],
        answer: "\\(288\\) S cm² mol⁻¹.",
      },
      practiceSet: [
        { prompt: "\\(\\lambda^\\circ(\\mathrm{Mg^{2+}})=106.0\\), \\(\\lambda^\\circ(\\mathrm{Cl^-})=76.3\\). \\(\\Lambda_m^\\circ(\\mathrm{MgCl_2})\\)?", answer: "\\(258.6\\) S cm² mol⁻¹" },
        { prompt: "\\(\\Lambda_m^\\circ\\): \\(\\mathrm{NH_4Cl}\\) 150, NaOH 248, NaCl 126. \\(\\Lambda_m^\\circ(\\mathrm{NH_4OH})\\)?", answer: "\\(272\\) S cm² mol⁻¹" },
        { prompt: "Divalent MX with \\(\\lambda_+^\\circ=60\\) and \\(\\lambda_-^\\circ=80\\). \\(\\Lambda_m^\\circ\\)?", answer: "\\(140\\) S cm² mol⁻¹", method: "One of each ion; do not double." },
        { prompt: "Which three ions make up Mohr's salt in solution?", answer: "\\(\\mathrm{Fe^{2+}}\\), \\(\\mathrm{NH_4^+}\\), \\(\\mathrm{SO_4^{2-}}\\)" },
      ],
      pyqExampleId: "e2aaacd6-4b95-4ebf-8301-be6506b33b9e", // 2025 — Λm°(NH₄OH) from NH₄Cl and ion values, then α
      traps: [
        {
          title: "Doubling a divalent salt",
          body: "\\(\\mathrm{MgSO_4}\\) has one \\(\\mathrm{Mg^{2+}}\\) and one \\(\\mathrm{SO_4^{2-}}\\). Its \\(\\Lambda_m^\\circ\\) is \\(\\lambda_+^\\circ+\\lambda_-^\\circ\\), not twice that.",
        },
        {
          title: "Leaving an ion uncancelled",
          body: "Write the ions of every salt you add and subtract. The ions left over must be exactly those of the target, with the right counts.",
        },
      ],
    },

    // C3 — α, Ka and solubility
    {
      kind: "formula" as const,
      slug: "jcelec-alpha-ka",
      name: "Degree of dissociation, Ka and solubility",
      intuition:
        "A weak electrolyte conducts only through the fraction that has ionised. So the ratio of what it does conduct to what it would conduct fully ionised is that fraction, \\(\\alpha\\). For a sparingly soluble salt the solution is so dilute that \\(\\Lambda_m\\) is \\(\\Lambda_m^\\circ\\), so conductivity gives the solubility.",
      definition:
        "- \\(\\alpha=\\frac{\\Lambda_m}{\\Lambda_m^\\circ}\\).\n" +
        "- \\(K_a=\\frac{c\\alpha^2}{1-\\alpha}\\approx c\\alpha^2\\) when \\(\\alpha\\ll1\\).\n" +
        "- From pH: \\([\\mathrm{H^+}]=c\\alpha\\), so \\(\\Lambda_m^\\circ=\\frac{1000\\,\\kappa}{c\\alpha}=\\frac{1000\\,\\kappa}{[\\mathrm{H^+}]}\\).\n" +
        "- Sparingly soluble salt: solubility \\(s=\\frac{1000\\,\\kappa}{\\Lambda_m^\\circ}\\) mol L⁻¹. Then \\(K_{sp}=s^2\\) for a 1:1 salt, and \\(108s^5\\) for \\(\\mathrm{A_2X_3}\\).\n" +
        "- A mixture of ions: \\(\\kappa=\\sum\\lambda_i^\\circ c_i\\), with \\(c\\) in mol m⁻³ for SI units.",
      formula: {
        label: "Degree of dissociation",
        latex: "\\alpha=\\frac{\\Lambda_m}{\\Lambda_m^\\circ},\\qquad K_a=\\frac{c\\alpha^2}{1-\\alpha}",
      },
      authoredExample: {
        prompt:
          "0.01 M acetic acid has \\(\\kappa=1.95\\times10^{-4}\\) S cm⁻¹. \\(\\Lambda_m^\\circ=390\\) S cm² mol⁻¹. Find \\(\\alpha\\) and \\(K_a\\).",
        steps: [
          "\\(\\Lambda_m=\\frac{1000\\times1.95\\times10^{-4}}{0.01}=19.5\\) S cm² mol⁻¹.",
          "\\(\\alpha=\\frac{19.5}{390}=0.05\\).",
          "\\(K_a=\\frac{0.01\\times0.0025}{0.95}=2.6\\times10^{-5}\\).",
        ],
        answer: "\\(\\alpha=0.05\\); \\(K_a\\approx2.6\\times10^{-5}\\).",
      },
      selfCheckExample: {
        prompt:
          "A saturated AgCl solution has \\(\\kappa=1.8\\times10^{-6}\\) S cm⁻¹ after subtracting water's. \\(\\Lambda_m^\\circ(\\mathrm{AgCl})=138\\) S cm² mol⁻¹. Find the solubility and \\(K_{sp}\\).",
        steps: [
          "\\(s=\\frac{1000\\times1.8\\times10^{-6}}{138}=1.30\\times10^{-5}\\) mol L⁻¹.",
          "\\(K_{sp}=s^2=1.7\\times10^{-10}\\).",
        ],
        answer: "\\(s\\approx1.3\\times10^{-5}\\) mol L⁻¹; \\(K_{sp}\\approx1.7\\times10^{-10}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\Lambda_m=39\\), \\(\\Lambda_m^\\circ=390\\): \\(\\alpha\\)?", answer: "\\(0.1\\)" },
        { prompt: "0.1 M weak acid with \\(\\alpha=0.01\\): \\(K_a\\)?", answer: "\\(\\approx10^{-5}\\)" },
        { prompt: "1:1 salt, \\(\\kappa=2\\times10^{-6}\\) S cm⁻¹, \\(\\Lambda_m^\\circ=200\\): \\(K_{sp}\\)?", answer: "\\(10^{-10}\\)", method: "\\(s=10^{-5}\\) M." },
        { prompt: "Weak acid, \\([\\mathrm{H^+}]=10^{-4}\\) M, \\(\\kappa=4\\times10^{-5}\\) S cm⁻¹: \\(\\Lambda_m^\\circ\\)?", answer: "\\(400\\) S cm² mol⁻¹" },
      ],
      pyqExampleId: "3e1b67f0-6b31-4465-b7e6-d67c612ba0b0", // 2026 — pH and conductance of HX give Λm°
      traps: [
        {
          title: "Dropping the 1000",
          body: "With \\(\\kappa\\) in S cm⁻¹ and \\(c\\) in mol L⁻¹, the 1000 converts litres to cm³. Leave it out and every answer is off by a thousand.",
        },
        {
          title: "The wrong Ksp expression",
          body: "\\(K_{sp}=s^2\\) only for a 1:1 salt. For \\(\\mathrm{A_2X_3}\\), \\(K_{sp}=(2s)^2(3s)^3=108s^5\\).",
        },
      ],
    },
  ],
};
