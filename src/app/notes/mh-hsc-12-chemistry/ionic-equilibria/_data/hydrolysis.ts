import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_IE_HYDROLYSIS_NOTE: SubtopicNote = {
  subtopicName: "Hydrolysis of Salts",
  title: "Hydrolysis of Salts",
  oneLineDefinition:
    "Why a salt solution can be neutral, acidic or basic: the ion of a salt that comes from a weak acid or a weak base reacts with water and upsets the balance of H₃O⁺ and OH⁻ ions.",
  whyItMatters:
    "4 questions, all from the textbook exercises; no board paper from 2022 to 2026 set this section on its own. The exercises ask why KCl solution is neutral to litmus, why sodium carbonate solution is alkaline but ammonium chloride solution acidic, why sulphuric acid is added while preparing copper sulphate solution, and why ammonium acetate solution is neutral. Each is a short 'give reasons' answer built on the same idea.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccie-salt-types",
      name: "The four types of salt and the nature of their solutions",
      intuition:
        "Pure water has equal amounts of \\(\\text{H}_3\\text{O}^+\\) and \\(\\text{OH}^-\\). An ion that came from a strong acid or a strong base leaves water alone, because the product it could form would only ionise again. An ion that came from a weak acid or a weak base does react with water, pulling out \\(\\text{H}^+\\) or \\(\\text{OH}^-\\), and the leftover ion decides whether the solution turns acidic or basic.",
      definition:
        "- **Hydrolysis of a salt:** the reaction in which cations or anions or both ions of a salt react with ions of water to produce acidity or alkalinity (or sometimes even neutrality).\n" +
        "- **Strong acid + strong base** (NaCl): neither \\(\\text{Na}^+\\) nor \\(\\text{Cl}^-\\) reacts, since NaOH and HCl are strong electrolytes. No hydrolysis; neutral.\n" +
        "- **Strong acid + weak base** (\\(\\text{CuSO}_4\\)): \\(\\text{Cu}^{2+} + 4\\text{H}_2\\text{O} \\rightleftharpoons \\text{Cu(OH)}_2 + 2\\text{H}_3\\text{O}^+\\). Excess \\(\\text{H}_3\\text{O}^+\\): acidic, turns blue litmus red. The \\(\\text{Cu(OH)}_2\\) formed makes the solution turbid; adding \\(\\text{H}_2\\text{SO}_4\\) (more \\(\\text{H}_3\\text{O}^+\\)) shifts the equilibrium to the left and gives a clear solution.\n" +
        "- **Weak acid + strong base** (\\(\\text{CH}_3\\text{COONa}\\)): \\(\\text{CH}_3\\text{COO}^- + \\text{H}_2\\text{O} \\rightleftharpoons \\text{CH}_3\\text{COOH} + \\text{OH}^-\\). Excess \\(\\text{OH}^-\\): basic.\n" +
        "- **General rule:** salts of strong acids and strong bases give neutral solutions, salts of strong acids and weak bases acidic ones, and salts of strong bases and weak acids basic ones.",
      table: {
        columns: ["Salt of", "Examples", "Ion that reacts with water", "Solution"],
        rows: [
          {
            cells: ["Strong acid and strong base", "NaCl, KCl, Na₂SO₄, NaNO₃", "Neither ion", "Neutral (no hydrolysis)"],
            pyqExampleId: "ef24f8cb-1070-47ed-a7a1-56435b91934e",
          },
          {
            cells: ["Strong acid and weak base", "NH₄Cl, CuSO₄, CuCl₂, NH₄NO₃", "The cation (NH₄⁺, Cu²⁺)", "Acidic, turns blue litmus red"],
            pyqExampleId: "5844aa2a-ed08-4ad7-910a-abaa5ec74d0e",
            noteAmber: "The textbook asks why H₂SO₄ is added while preparing CuSO₄ solution: it pushes this hydrolysis back.",
          },
          {
            cells: ["Weak acid and strong base", "CH₃COONa, KCN, Na₂CO₃", "The anion (CH₃COO⁻, CN⁻, CO₃²⁻)", "Basic, turns red litmus blue"],
            pyqExampleId: "561098dc-b19c-4e8f-abc4-059f2fdf9687",
          },
          {
            cells: ["Weak acid and weak base", "CH₃COONH₄, NH₄CN", "Both ions", "Acidic, basic or neutral: compare Ka and Kb"],
          },
        ],
      },
      selfCheckExample: {
        prompt: "Is an aqueous solution of KCN acidic, basic or neutral? Write the hydrolysis equation.",
        steps: [
          "KCN is the salt of the weak acid HCN and the strong base KOH, so only the anion reacts.",
          "\\(\\text{CN}^- + \\text{H}_2\\text{O} \\rightleftharpoons \\text{HCN} + \\text{OH}^-\\): excess \\(\\text{OH}^-\\).",
        ],
        answer: "Basic",
      },
      practiceSet: [
        { prompt: "Is an aqueous solution of \\(\\text{NaNO}_3\\) acidic, basic or neutral?", answer: "Neutral: it is a salt of a strong acid and a strong base" },
        { prompt: "Why is an aqueous solution of HCOOK basic?", answer: "\\(\\text{HCOO}^-\\) from the weak acid HCOOH reacts with water and gives \\(\\text{OH}^-\\)" },
        { prompt: "Which ion of \\(\\text{CuSO}_4\\) hydrolyses?", answer: "\\(\\text{Cu}^{2+}\\); \\(\\text{SO}_4^{2-}\\) does not, as \\(\\text{H}_2\\text{SO}_4\\) is a strong acid" },
      ],
      pyqExampleId: "561098dc-b19c-4e8f-abc4-059f2fdf9687",
      traps: [
        {
          title: "Saying both ions of every salt react",
          body: "In a salt of a strong acid and a strong base, neither ion reacts with water. Write the reason: the possible products are strong electrolytes and would ionise completely again.",
        },
        {
          title: "No equation for the ion that hydrolyses",
          body: "'Give reasons' answers on hydrolysis need the equation of the ion that reacts with water, showing the \\(\\text{H}_3\\text{O}^+\\) or \\(\\text{OH}^-\\) it produces. A sentence alone usually gets half the marks.",
        },
        {
          title: "Why acid is added to copper sulphate",
          body: "\\(\\text{H}_2\\text{SO}_4\\) is added to push the hydrolysis back (Le Chatelier: \\(\\text{H}_3\\text{O}^+\\) is a product), which dissolves the turbid \\(\\text{Cu(OH)}_2\\). It is not added to 'neutralise' the salt.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccie-weak-weak",
      name: "Salts of a weak acid and a weak base",
      intuition:
        "When both the acid and the base behind a salt are weak, both ions react with water, one giving \\(\\text{H}_3\\text{O}^+\\) and the other \\(\\text{OH}^-\\). The contest is decided by which parent is stronger: compare \\(K_a\\) of the acid with \\(K_b\\) of the base.",
      definition:
        "- Salt BA of weak acid HA and weak base BOH: \\(\\text{B}^+ + \\text{A}^- + \\text{H}_2\\text{O} \\rightleftharpoons \\text{BOH} + \\text{HA}\\).\n" +
        "- If \\(K_a > K_b\\), the solution is acidic. Example: \\(\\text{NH}_4\\text{F}\\) (HF, \\(K_a = 7.2 \\times 10^{-4}\\); \\(\\text{NH}_4\\text{OH}\\), \\(K_b = 1.8 \\times 10^{-5}\\)).\n" +
        "- If \\(K_a < K_b\\), the solution is basic. Example: \\(\\text{NH}_4\\text{CN}\\) (HCN, \\(K_a = 4.0 \\times 10^{-10}\\)).\n" +
        "- If \\(K_a = K_b\\), the solution is neutral. Example: \\(\\text{CH}_3\\text{COONH}_4\\) (\\(K_a = K_b = 1.8 \\times 10^{-5}\\)): \\(\\text{NH}_4^+\\) produces as many \\(\\text{H}_3\\text{O}^+\\) ions as \\(\\text{CH}_3\\text{COO}^-\\) produces \\(\\text{OH}^-\\) ions.",
      formula: {
        label: "Weak acid with weak base",
        latex: "K_a > K_b: \\text{acidic}, \\quad K_a < K_b: \\text{basic}, \\quad K_a = K_b: \\text{neutral}",
      },
      authoredExample: {
        prompt:
          "Predict whether an aqueous solution of \\(\\text{NH}_4\\text{F}\\) is acidic, basic or neutral. For HF, \\(K_a = 7.2 \\times 10^{-4}\\); for \\(\\text{NH}_4\\text{OH}\\), \\(K_b = 1.8 \\times 10^{-5}\\).",
        steps: [
          "Both ions hydrolyse: \\(\\text{NH}_4^+ + 2\\text{H}_2\\text{O} \\rightleftharpoons \\text{NH}_4\\text{OH} + \\text{H}_3\\text{O}^+\\) and \\(\\text{F}^- + \\text{H}_2\\text{O} \\rightleftharpoons \\text{HF} + \\text{OH}^-\\).",
          "Compare: \\(K_a = 7.2 \\times 10^{-4}\\) is greater than \\(K_b = 1.8 \\times 10^{-5}\\).",
          "So \\(\\text{NH}_4^+\\) hydrolyses slightly more and gives more \\(\\text{H}_3\\text{O}^+\\) than \\(\\text{F}^-\\) gives \\(\\text{OH}^-\\).",
        ],
        answer: "Slightly acidic; it turns blue litmus red",
      },
      selfCheckExample: {
        prompt: "Is an aqueous solution of \\(\\text{NH}_4\\text{CN}\\) acidic or basic? For HCN, \\(K_a = 4.0 \\times 10^{-10}\\); for \\(\\text{NH}_4\\text{OH}\\), \\(K_b = 1.8 \\times 10^{-5}\\).",
        steps: ["\\(K_a < K_b\\), so \\(\\text{CN}^-\\) hydrolyses more than \\(\\text{NH}_4^+\\) and more \\(\\text{OH}^-\\) is produced."],
        answer: "Basic; it turns red litmus blue",
      },
      practiceSet: [
        { prompt: "A salt is made from a weak acid with \\(K_a = 1 \\times 10^{-6}\\) and a weak base with \\(K_b = 1 \\times 10^{-8}\\). Is its solution acidic or basic?", answer: "Acidic, because \\(K_a > K_b\\)" },
        { prompt: "Which solution turns red litmus blue: \\(\\text{NH}_4\\text{F}\\) or \\(\\text{NH}_4\\text{CN}\\)?", answer: "\\(\\text{NH}_4\\text{CN}\\)" },
        { prompt: "In a salt of a weak acid and a weak base, how many of its ions react with water?", answer: "Both the cation and the anion" },
      ],
      pyqExampleId: "2e155d05-dc79-4b59-87f3-b3587e0d1155",
      traps: [
        {
          title: "'Neutral' does not mean 'no hydrolysis'",
          body: "In ammonium acetate solution both ions DO react with water; the solution is neutral only because the two effects are equal. Saying it does not hydrolyse loses the mark.",
        },
        {
          title: "Comparing the wrong constants",
          body: "Compare \\(K_a\\) of the parent acid with \\(K_b\\) of the parent base. The larger one wins: larger \\(K_a\\) gives an acidic solution.",
        },
      ],
    },
  ],
};
