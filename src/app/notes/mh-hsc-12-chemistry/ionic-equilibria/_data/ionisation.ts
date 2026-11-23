import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_IE_IONISATION_NOTE: SubtopicNote = {
  subtopicName: "Ionisation of Acids and Bases",
  title: "Ionisation of Weak Acids and Bases: Ostwald's Dilution Law",
  oneLineDefinition:
    "Strong and weak electrolytes, the degree of dissociation, the dissociation constants Ka and Kb, Ostwald's dilution law and the hydrogen ion concentration of a weak acid.",
  whyItMatters:
    "14 questions, five of them from board papers: the hydrogen ion concentration of acetic acid from its Ka (2022), the percent dissociation of a weak acid at a new concentration (2023), the formula linking α and concentration (2025), and in 2026 both the derivation of Ostwald's dilution law and Ka of acetic acid that is 5% ionised. The textbook adds the weak base form of the law and its solved examples.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccie-ostwald",
      name: "Ostwald's dilution law",
      intuition:
        "A strong acid or base is almost fully broken into ions. A weak one is only partly ionised, so its ions and its whole molecules sit in equilibrium. Add water and the molecules spread out; the equilibrium answers by ionising a little more. So a weak electrolyte is more dissociated in a dilute solution. Ostwald's law puts a number on this.",
      definition:
        "- **Strong electrolytes** ionise completely or almost completely: strong acids (HCl, \\(\\text{HNO}_3\\), \\(\\text{H}_2\\text{SO}_4\\), HBr, HI), strong bases (NaOH, KOH) and salts. **Weak electrolytes** dissociate only partly: weak acids (\\(\\text{CH}_3\\text{COOH}\\), HCOOH, HF, \\(\\text{H}_2\\text{S}\\)) and weak bases (\\(\\text{NH}_4\\text{OH}\\), \\(\\text{Fe(OH)}_3\\), \\(\\text{Cu(OH)}_2\\)).\n" +
        "- **Degree of dissociation** \\(\\alpha\\): the fraction of the total number of moles of an electrolyte that dissociates into ions at equilibrium. \\(\\alpha = \\dfrac{\\text{moles dissociated}}{\\text{total moles}}\\); percent dissociation \\(= \\alpha \\times 100\\).\n" +
        "- **Derivation for a weak acid HA** (the board asks this for 3 to 4 marks):\n" +
        "- Step 1: \\(\\text{HA} \\rightleftharpoons \\text{H}^+ + \\text{A}^-\\), and \\(K_a = \\dfrac{[\\text{H}^+][\\text{A}^-]}{[\\text{HA}]}\\).\n" +
        "- Step 2: let 1 mol of HA be present in \\(V\\ \\text{dm}^3\\). At equilibrium \\(\\alpha\\) mol has dissociated and \\((1 - \\alpha)\\) mol remains.\n" +
        "- Step 3: \\([\\text{HA}] = \\dfrac{1 - \\alpha}{V}\\), \\([\\text{H}^+] = [\\text{A}^-] = \\dfrac{\\alpha}{V}\\).\n" +
        "- Step 4: \\(K_a = \\dfrac{(\\alpha/V)(\\alpha/V)}{(1 - \\alpha)/V} = \\dfrac{\\alpha^2}{(1 - \\alpha)V}\\). With \\(c = 1/V\\), \\(K_a = \\dfrac{\\alpha^2 c}{1 - \\alpha}\\).\n" +
        "- Step 5: for a weak acid \\(\\alpha\\) is very small, so \\(1 - \\alpha \\approx 1\\): \\(K_a = \\alpha^2 c\\), that is \\(\\alpha = \\sqrt{K_a/c} = \\sqrt{K_a V}\\).\n" +
        "- **Weak base BOH:** the same steps give \\(K_b = \\dfrac{\\alpha^2 c}{1 - \\alpha}\\) and \\(\\alpha = \\sqrt{K_b/c} = \\sqrt{K_b V}\\).\n" +
        "- **Statement:** the degree of dissociation of a weak electrolyte is inversely proportional to the square root of its concentration, or directly proportional to the square root of the volume of solution containing 1 mol of it.",
      formula: {
        label: "Ostwald's dilution law",
        latex: "K_a = \\frac{\\alpha^2 c}{1 - \\alpha} \\approx \\alpha^2 c, \\qquad \\alpha = \\sqrt{\\frac{K_a}{c}} = \\sqrt{K_a V}",
        symbols: [
          { symbol: "\\(\\alpha\\)", meaning: "degree of dissociation (a fraction, not a percentage)" },
          { symbol: "\\(c\\)", meaning: "initial concentration of the weak acid in mol per cubic decimetre" },
          { symbol: "\\(V\\)", meaning: "volume in cubic decimetres containing 1 mol of the acid, so V = 1/c" },
        ],
      },
      authoredExample: {
        prompt:
          "A solution of a weak acid is diluted from 0.08 M to 0.02 M. Using Ostwald's dilution law, find by what factor its degree of dissociation changes.",
        steps: [
          "Given: \\(c_1 = 0.08\\) M, \\(c_2 = 0.02\\) M. \\(K_a\\) does not change on dilution.",
          "Formula: \\(\\alpha = \\sqrt{K_a/c}\\), so \\(\\dfrac{\\alpha_2}{\\alpha_1} = \\sqrt{\\dfrac{c_1}{c_2}}\\).",
          "Substitution: \\(\\dfrac{\\alpha_2}{\\alpha_1} = \\sqrt{\\dfrac{0.08}{0.02}} = \\sqrt{4} = 2\\).",
        ],
        answer: "The degree of dissociation doubles",
      },
      selfCheckExample: {
        prompt: "A solution of a weak base is made nine times more concentrated. What happens to its degree of dissociation?",
        steps: ["\\(\\alpha \\propto \\dfrac{1}{\\sqrt{c}}\\).", "\\(c\\) becomes \\(9c\\), so \\(\\alpha\\) becomes \\(\\alpha/\\sqrt{9} = \\alpha/3\\)."],
        answer: "It falls to one third of its value",
      },
      practiceSet: [
        { prompt: "Write the expression for the dissociation constant \\(K_b\\) of a weak base BOH.", answer: "\\(K_b = \\dfrac{[\\text{B}^+][\\text{OH}^-]}{[\\text{BOH}]}\\)" },
        { prompt: "Why can \\(1 - \\alpha\\) be taken as 1 for a weak acid?", answer: "Because \\(\\alpha\\) is very small for a weak acid" },
        { prompt: "How does the degree of dissociation of a weak acid depend on the volume V containing 1 mol of it?", answer: "\\(\\alpha \\propto \\sqrt{V}\\): it rises as the solution is diluted" },
      ],
      pyqExampleId: "7977eef7-4f0a-44df-abd3-461a01413990",
      traps: [
        {
          title: "Jumping straight to the short form",
          body: "A derivation that writes \\(K_a = \\alpha^2 c\\) at once loses most of the marks. Show the concentrations at equilibrium, the exact form \\(K_a = \\alpha^2 c/(1 - \\alpha)\\), and only then the condition \\(\\alpha \\ll 1\\).",
        },
        {
          title: "Applying the law to a strong electrolyte",
          body: "Ostwald's dilution law is for weak electrolytes, which are in equilibrium with their ions. A strong acid such as HCl is almost completely ionised, so there is no \\(\\alpha\\) to calculate.",
        },
        {
          title: "Leaving out \\(c = 1/V\\)",
          body: "The book's derivation starts with 1 mol in \\(V\\ \\text{dm}^3\\). Say that \\(c = 1/V\\) before you replace \\(1/V\\) by \\(c\\); without it the step from \\(\\alpha^2/V\\) to \\(\\alpha^2 c\\) looks like a jump.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccie-ka-alpha",
      name: "Ka from percent dissociation, and α at a new concentration",
      intuition:
        "Two numbers are linked by Ostwald's law: how much of the acid ionises, and its dissociation constant. Give either one with the concentration, and you can find the other. Because \\(K_a\\) is a constant at a given temperature, it is also the bridge between two different concentrations of the same acid.",
      definition:
        "- Turn a percentage into \\(\\alpha\\) first: \\(\\alpha = \\dfrac{\\text{percent dissociation}}{100}\\).\n" +
        "- 'Decimolar' means 0.1 M; 'centimolar' means 0.01 M.\n" +
        "- Finding \\(K_a\\) from \\(\\alpha\\): use \\(K_a = \\alpha^2 c/(1 - \\alpha)\\) when \\(\\alpha\\) is a few percent (the textbook's answer for a 5% acid uses this form); \\(K_a = \\alpha^2 c\\) when \\(\\alpha\\) is very small.\n" +
        "- Finding \\(\\alpha\\) from \\(K_a\\): \\(\\alpha = \\sqrt{K_a/c}\\) (or \\(\\sqrt{K_b/c}\\) for a weak base).\n" +
        "- Same acid at two concentrations: \\(K_a = \\alpha_1^2 c_1 = \\alpha_2^2 c_2\\).",
      formula: {
        label: "Ka and α",
        latex: "K_a = \\frac{\\alpha^2 c}{1 - \\alpha}, \\qquad \\alpha_1^2 c_1 = \\alpha_2^2 c_2",
      },
      authoredExample: {
        prompt: "A weak monobasic acid is 2% dissociated in 0.05 M solution. Calculate its dissociation constant.",
        steps: [
          "Given: percent dissociation = 2, so \\(\\alpha = 2/100 = 0.02\\); \\(c = 0.05\\) M.",
          "Formula: \\(K_a = \\dfrac{\\alpha^2 c}{1 - \\alpha}\\).",
          "Substitution: \\(K_a = \\dfrac{(0.02)^2 \\times 0.05}{1 - 0.02} = \\dfrac{2 \\times 10^{-5}}{0.98}\\).",
          "\\(K_a = 2.04 \\times 10^{-5}\\). With the short form \\(K_a = \\alpha^2 c\\) the answer is \\(2.0 \\times 10^{-5}\\).",
        ],
        answer: "\\(K_a = 2.04 \\times 10^{-5}\\)",
      },
      selfCheckExample: {
        prompt: "The dissociation constant of a weak acid is \\(4 \\times 10^{-6}\\). Find its percent dissociation in 0.01 M solution.",
        steps: [
          "\\(\\alpha = \\sqrt{\\dfrac{K_a}{c}} = \\sqrt{\\dfrac{4 \\times 10^{-6}}{0.01}} = \\sqrt{4 \\times 10^{-4}} = 0.02\\).",
          "Percent dissociation \\(= 0.02 \\times 100 = 2\\%\\).",
        ],
        answer: "2%",
      },
      practiceSet: [
        { prompt: "A weak acid is 4% dissociated in 0.02 M solution. Find its percent dissociation in 0.08 M solution.", answer: "2% (four times the concentration halves \\(\\alpha\\))" },
        { prompt: "\\(K_b\\) of a weak base is \\(3.6 \\times 10^{-6}\\). Find its degree of dissociation in 0.01 M solution.", answer: "\\(\\alpha = \\sqrt{3.6 \\times 10^{-4}} = 0.019\\)" },
        { prompt: "What concentration does 'decimolar' mean?", answer: "0.1 M" },
      ],
      pyqExampleId: "aed4f2d0-efb0-46cf-9c83-020fbb703cf6",
      traps: [
        {
          title: "Putting the percentage in as \\(\\alpha\\)",
          body: "\\(\\alpha\\) is a fraction. A 2% acid has \\(\\alpha = 0.02\\), not 2. Substituting the percentage makes \\(K_a\\) ten thousand times too large.",
        },
        {
          title: "Thinking \\(K_a\\) changes on dilution",
          body: "On dilution \\(\\alpha\\) changes but \\(K_a\\) stays the same at a given temperature. That is exactly why \\(\\alpha_1^2 c_1 = \\alpha_2^2 c_2\\) works.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccie-h-ion",
      name: "Hydrogen ion concentration of a weak acid",
      intuition:
        "Each molecule of a monobasic acid that ionises gives one \\(\\text{H}_3\\text{O}^+\\) ion. So the hydrogen ion concentration is the dissociated part of the acid, \\(\\alpha c\\), always less than the acid taken. For a weak base, the same idea gives the hydroxide ion concentration.",
      definition:
        "- For a weak monobasic acid: \\([\\text{H}_3\\text{O}^+] = \\alpha c = \\sqrt{K_a c}\\), since \\(\\alpha = \\sqrt{K_a/c}\\).\n" +
        "- For a weak monoacidic base: \\([\\text{OH}^-] = \\alpha c = \\sqrt{K_b c}\\).\n" +
        "- Going the other way: from a measured \\([\\text{H}_3\\text{O}^+]\\), \\(\\alpha = [\\text{H}_3\\text{O}^+]/c\\), and then \\(K_a = \\alpha^2 c\\).\n" +
        "- Check every answer: for a monobasic acid \\([\\text{H}_3\\text{O}^+]\\) must be smaller than \\(c\\).",
      formula: {
        label: "Weak acid",
        latex: "[\\text{H}_3\\text{O}^+] = \\alpha c = \\sqrt{K_a\\,c}",
      },
      authoredExample: {
        prompt:
          "Calculate \\([\\text{H}_3\\text{O}^+]\\) and the degree of dissociation in a 0.04 M solution of a weak monobasic acid HA. \\(K_a = 9.0 \\times 10^{-6}\\).",
        steps: [
          "Given: \\(c = 0.04\\) M, \\(K_a = 9.0 \\times 10^{-6}\\).",
          "Formula: \\([\\text{H}_3\\text{O}^+] = \\sqrt{K_a c}\\).",
          "Substitution: \\([\\text{H}_3\\text{O}^+] = \\sqrt{9.0 \\times 10^{-6} \\times 0.04} = \\sqrt{3.6 \\times 10^{-7}} = 6.0 \\times 10^{-4}\\) mol dm\\(^{-3}\\).",
          "\\(\\alpha = \\dfrac{6.0 \\times 10^{-4}}{0.04} = 0.015\\).",
        ],
        answer: "\\([\\text{H}_3\\text{O}^+] = 6.0 \\times 10^{-4}\\) mol dm\\(^{-3}\\); \\(\\alpha = 0.015\\)",
      },
      selfCheckExample: {
        prompt: "Find \\([\\text{H}_3\\text{O}^+]\\) in 0.1 M HCN. \\(K_a = 4.0 \\times 10^{-10}\\).",
        steps: ["\\([\\text{H}_3\\text{O}^+] = \\sqrt{4.0 \\times 10^{-10} \\times 0.1} = \\sqrt{4.0 \\times 10^{-11}}\\)."],
        answer: "\\(6.32 \\times 10^{-6}\\) mol dm\\(^{-3}\\)",
      },
      practiceSet: [
        { prompt: "The pH of a 0.05 M solution of a weak monobasic acid is 3.0. Find its dissociation constant.", answer: "\\([\\text{H}^+] = 10^{-3}\\), \\(\\alpha = 0.02\\), \\(K_a = \\alpha^2 c = 2 \\times 10^{-5}\\)" },
        { prompt: "Find \\([\\text{OH}^-]\\) in a 0.1 M solution of a weak base BOH. \\(K_b = 4.9 \\times 10^{-6}\\).", answer: "\\(\\sqrt{4.9 \\times 10^{-7}} = 7.0 \\times 10^{-4}\\) mol dm\\(^{-3}\\)" },
        { prompt: "Can \\([\\text{H}_3\\text{O}^+]\\) in a solution of a weak monobasic acid be larger than the acid's concentration?", answer: "No. At most every molecule ionises, giving \\([\\text{H}_3\\text{O}^+] = c\\); a weak acid gives far less" },
      ],
      pyqExampleId: "673f4092-89d8-4b9c-8085-3206c4293c84",
      traps: [
        {
          title: "Treating a weak acid like a strong one",
          body: "For HCl, \\([\\text{H}_3\\text{O}^+] = c\\). For a weak acid it is \\(\\sqrt{K_a c}\\), much smaller. Writing \\(c\\) for acetic acid gives a pH that is far too low.",
        },
        {
          title: "Multiplying instead of square-rooting",
          body: "\\([\\text{H}_3\\text{O}^+]\\) is the square root of \\(K_a \\times c\\). Writing \\(K_a \\times c\\) alone gives a number many powers of ten too small.",
        },
      ],
    },
  ],
};
