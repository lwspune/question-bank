import type { SubtopicNote } from "@/app/notes/_types";

export const BUFFER_EQ_NOTE: SubtopicNote = {
  subtopicName: "Buffer Solutions",
  title: "Buffer Solutions",
  oneLineDefinition:
    "Finding the pH of a weak acid or base mixed with its salt through the Henderson equation, including buffers made by part-neutralising a weak acid or base and buffers after strong acid is added.",
  whyItMatters:
    "Fourteen PYQs, seven of them numerical, and four from 2026. Seven apply the Henderson equation to a stated mixture; seven make the buffer by part-neutralising a weak acid or base, or add strong acid to one.",
  concepts: [
    // C1 — Henderson equation
    {
      kind: "formula" as const,
      slug: "jceq-henderson",
      name: "The Henderson equation",
      intuition:
        "A buffer holds a weak acid and its conjugate base in comparable amounts. Added acid is taken up by the base, and added base by the acid, so the pH barely moves. Taking the log of Ka gives the pH directly from the ratio of the two.",
      definition:
        "- Acidic buffer (weak acid + its salt): \\(\\mathrm{pH}=\\mathrm{p}K_a+\\log\\frac{[\\text{salt}]}{[\\text{acid}]}\\).\n" +
        "- Basic buffer (weak base + its salt): \\(\\mathrm{pOH}=\\mathrm{p}K_b+\\log\\frac{[\\text{salt}]}{[\\text{base}]}\\).\n" +
        "- For the base \\(\\mathrm{NH_3}\\), \\(\\mathrm{p}K_a(\\mathrm{NH_4^+})=14-\\mathrm{p}K_b\\).\n" +
        "- Both parts share one volume, so a mole ratio works as well as a concentration ratio.\n" +
        "- A buffer needs a **weak** acid or base with its conjugate, in comparable amounts. HCl with NaCl is not a buffer. Blood is buffered by \\(\\mathrm{H_2CO_3/HCO_3^-}\\).\n" +
        "- If a weak acid is ionised to a fraction x, then \\(\\mathrm{pH}-\\mathrm{p}K_a=\\log\\frac{x}{1-x}\\).",
      formula: {
        label: "Henderson equation",
        latex: "\\mathrm{pH}=\\mathrm{p}K_a+\\log\\frac{[\\text{salt}]}{[\\text{acid}]}",
      },
      authoredExample: {
        prompt:
          "A solution is 0.2 M in a weak acid HA (\\(\\mathrm{p}K_a=4.7\\)) and 0.4 M in its sodium salt. Find the pH. (\\(\\log2=0.30\\))",
        steps: [
          "\\(\\frac{[\\text{salt}]}{[\\text{acid}]}=\\frac{0.4}{0.2}=2\\).",
          "\\(\\mathrm{pH}=4.7+\\log2=4.7+0.30=5.0\\).",
        ],
        answer: "\\(\\mathrm{pH}=5.0\\).",
      },
      selfCheckExample: {
        prompt:
          "A solution is 0.1 M in \\(\\mathrm{NH_3}\\) and 0.05 M in \\(\\mathrm{NH_4Cl}\\). \\(\\mathrm{p}K_b(\\mathrm{NH_3})=4.74\\). Find the pH. (\\(\\log2=0.30\\))",
        steps: [
          "\\(\\mathrm{pOH}=4.74+\\log\\frac{0.05}{0.1}=4.74-0.30=4.44\\).",
          "\\(\\mathrm{pH}=14-4.44=9.56\\).",
        ],
        answer: "\\(\\mathrm{pH}=9.56\\).",
      },
      practiceSet: [
        { prompt: "\\(\\mathrm{p}K_a=5\\) and salt : acid = 10 : 1. pH?", answer: "\\(6\\)" },
        { prompt: "Equal amounts of weak acid and its salt. pH?", answer: "\\(\\mathrm{p}K_a\\)" },
        { prompt: "\\(\\mathrm{p}K_b(\\mathrm{NH_3})=4.75\\). \\(\\mathrm{p}K_a(\\mathrm{NH_4^+})\\)?", answer: "\\(9.25\\)" },
        { prompt: "Is HCl mixed with NaCl a buffer?", answer: "No, HCl is a strong acid" },
      ],
      pyqExampleId: "ec75f767-a2cc-4435-ae50-cd1fc6d7a845", // 2022 — propanoate/propanoic acid ratio for pH 4; 0.13
      traps: [
        {
          title: "The ratio flips for a basic buffer",
          body:
            "pOH uses salt over base: \\(\\mathrm{pOH}=\\mathrm{p}K_b+\\log\\frac{[\\text{salt}]}{[\\text{base}]}\\). Written for pH it becomes \\(\\mathrm{pH}=\\mathrm{p}K_a+\\log\\frac{[\\text{base}]}{[\\text{salt}]}\\). Mixing the two forms gives a pH on the wrong side of \\(\\mathrm{p}K_a\\).",
        },
        {
          title: "Salt over acid, not acid over salt",
          body:
            "For a weak acid ionised to a fraction x, the salt form is x and the acid form is \\(1-x\\), so \\(\\mathrm{pH}-\\mathrm{p}K_a=\\log\\frac{x}{1-x}\\). The inverted fraction is always offered.",
        },
      ],
    },

    // C2 — part-neutralisation and adding strong acid
    {
      kind: "formula" as const,
      slug: "jceq-partial-neutralisation",
      name: "Buffers made by part-neutralisation",
      intuition:
        "Mix a weak acid with less than an equal amount of strong base. The strong base is used up completely, and each mole of it turns one mole of weak acid into its salt. What is left is a weak acid with its salt, which is a buffer. Adding strong acid to a buffer works the same way in reverse.",
      definition:
        "- Weak acid \\(n_a\\) + strong base \\(n_b\\) with \\(n_b<n_a\\): salt \\(=n_b\\), acid left \\(=n_a-n_b\\).\n" +
        "- \\(\\mathrm{pH}=\\mathrm{p}K_a+\\log\\frac{n_b}{n_a-n_b}\\).\n" +
        "- Half-neutralised (\\(n_b=\\tfrac12n_a\\)): \\(\\mathrm{pH}=\\mathrm{p}K_a\\).\n" +
        "- Strong reagent equal to or more than the weak one: no buffer. It is a salt solution, or the excess strong reagent sets the pH.\n" +
        "- Strong acid added to a basic buffer turns base into salt: base falls, salt rises by the same amount.\n" +
        "- With equal molarities, the volumes can stand in for moles.",
      formula: {
        label: "Weak acid part-neutralised by strong base",
        latex: "\\mathrm{pH}=\\mathrm{p}K_a+\\log\\frac{n_b}{n_a-n_b}",
      },
      authoredExample: {
        prompt:
          "15 mL of 0.2 M NaOH is added to 40 mL of 0.1 M weak acid HA (\\(\\mathrm{p}K_a=4.8\\)). Find the pH. (\\(\\log3=0.477\\))",
        steps: [
          "NaOH: \\(15\\times0.2=3\\) mmol. HA: \\(40\\times0.1=4\\) mmol.",
          "NaOH is used up: salt 3 mmol, acid left \\(4-3=1\\) mmol.",
          "\\(\\mathrm{pH}=4.8+\\log\\frac31=4.8+0.477=5.28\\).",
        ],
        answer: "\\(\\mathrm{pH}\\approx5.28\\).",
      },
      selfCheckExample: {
        prompt:
          "One litre of buffer holds 0.2 mol \\(\\mathrm{NH_3}\\) and 0.2 mol \\(\\mathrm{NH_4Cl}\\) (\\(\\mathrm{p}K_b=4.75\\)). Find the pH after 0.05 mol HCl is added. (\\(\\log5=0.699\\), \\(\\log3=0.477\\))",
        steps: [
          "HCl turns 0.05 mol \\(\\mathrm{NH_3}\\) into \\(\\mathrm{NH_4^+}\\): \\(\\mathrm{NH_3}=0.15\\), \\(\\mathrm{NH_4^+}=0.25\\).",
          "\\(\\mathrm{pOH}=4.75+\\log\\frac{0.25}{0.15}=4.75+\\log\\frac53=4.75+0.222=4.97\\).",
          "\\(\\mathrm{pH}=14-4.97=9.03\\).",
        ],
        answer: "\\(\\mathrm{pH}\\approx9.03\\) (it was 9.25).",
      },
      practiceSet: [
        { prompt: "10 mmol weak acid (\\(\\mathrm{p}K_a=4\\)) + 5 mmol NaOH. pH?", answer: "\\(4\\)" },
        { prompt: "10 mmol weak acid + 10 mmol NaOH. A buffer?", answer: "No, only the salt is left" },
        { prompt: "0.1 mol each of acetic acid and acetate in 1 L, then 0.01 mol HCl. The new ratio salt : acid?", answer: "\\(0.09:0.11\\)" },
        { prompt: "x mL of HCl and y mL of a weak base, both 0.02 M. Moles of base left are proportional to?", answer: "\\(y-x\\)" },
      ],
      pyqExampleId: "8fd5bb21-22fa-4201-9c36-01ec8fcf3ec4", // 2023 — 20 mL 0.1 M NaOH + 50 mL 0.1 M acetic acid; pH 4.58
      traps: [
        {
          title: "Base left is y minus x, not y",
          body:
            "Mixing x mL of HCl with y mL of a weak base of the same molarity leaves salt x and base \\(y-x\\). Putting \\(x/y\\) into the Henderson equation instead of \\(x/(y-x)\\) gives a wrong pair of volumes that is always among the options.",
        },
        {
          title: "Excess strong acid is not a buffer",
          body:
            "\\(\\mathrm{NH_4OH}\\) with an equal or larger amount of HCl leaves no free base. For a pH of \\(\\mathrm{p}K_a(\\mathrm{NH_4^+})=9.25\\) the mixture must hold equal amounts of \\(\\mathrm{NH_3}\\) and \\(\\mathrm{NH_4^+}\\), so the base must be exactly twice the acid.",
        },
      ],
    },
  ],
};
