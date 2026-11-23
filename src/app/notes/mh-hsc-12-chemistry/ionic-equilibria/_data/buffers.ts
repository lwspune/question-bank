import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_IE_BUFFERS_NOTE: SubtopicNote = {
  subtopicName: "Buffer Solutions",
  title: "Buffer Solutions and the Henderson-Hasselbalch Equation",
  oneLineDefinition:
    "What a buffer solution is, acidic and basic buffers, how a buffer resists a change in pH, and the Henderson-Hasselbalch equation for its pH.",
  whyItMatters:
    "11 questions, four of them from board papers: define a buffer and write the Henderson-Hasselbalch equation (2024), explain the buffer action of the sodium acetate and acetic acid buffer (2024), define a buffer solution along with solubility product and common ion effect (2025), and find the pH of an HF and NaF buffer (2026). The textbook adds the basic buffer, classifying buffers, the properties of a buffer and the pH of blood.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccie-buffer-types",
      name: "Buffer solutions: acidic and basic",
      intuition:
        "A buffer is a solution with a shock absorber built in. It holds a weak acid or weak base together with its salt, so there is always something ready to soak up a little added acid and something ready to soak up a little added base. Its pH hardly moves.",
      definition:
        "- **Buffer solution:** a solution which resists drastic changes in pH when a small amount of strong acid or strong base or water is added to it.\n" +
        "- **Properties:** the pH of a buffer does not change appreciably (i) on adding a small amount of strong acid or strong base, (ii) on dilution, (iii) when it is kept for a long time.\n" +
        "- **Applications:** the pH of blood is kept at 7.36 to 7.42 by the \\((\\text{HCO}_3^- + \\text{H}_2\\text{CO}_3)\\) buffer, and a change of only 0.2 pH units can cause death; soils are buffered by carbonates, bicarbonates, phosphates and organic acids; penicillin is stabilised with sodium citrate; in qualitative analysis a pH of 8 to 10 for group IIIA is kept with \\((\\text{NH}_4\\text{OH} + \\text{NH}_4\\text{Cl})\\); buffers are also used in the paper, dye, ink, paint and drug industries.",
      table: {
        columns: ["Point", "Acidic buffer", "Basic buffer"],
        rows: [
          {
            cells: ["Made of", "A weak acid and its salt with a strong base", "A weak base and its salt with a strong acid"],
            pyqExampleId: "2bcf5d43-a6c5-482c-a3ad-158ae54443fd",
          },
          {
            cells: ["Example", "CH₃COOH + CH₃COONa", "NH₄OH + NH₄Cl"],
            pyqExampleId: "628e3d2d-33f6-4caa-b37f-903f7a5c5afb",
          },
          { cells: ["Keeps the pH", "Acidic", "Alkaline"] },
          {
            cells: [
              "Henderson-Hasselbalch equation",
              "\\(\\text{pH} = \\text{p}K_a + \\log_{10}\\dfrac{[\\text{salt}]}{[\\text{acid}]}\\)",
              "\\(\\text{pOH} = \\text{p}K_b + \\log_{10}\\dfrac{[\\text{salt}]}{[\\text{base}]}\\)",
            ],
          },
        ],
      },
      selfCheckExample: {
        prompt: "Is a solution of formic acid and sodium formate (HCOOH + HCOONa) a buffer? If it is, of which type?",
        steps: ["HCOOH is a weak acid and HCOONa is its salt with the strong base NaOH."],
        answer: "Yes, an acidic buffer",
      },
      practiceSet: [
        { prompt: "Which buffer keeps the pH of blood steady?", answer: "The \\((\\text{HCO}_3^- + \\text{H}_2\\text{CO}_3)\\) buffer" },
        { prompt: "Which buffer keeps a pH of 8 to 10 for precipitating group IIIA cations?", answer: "\\((\\text{NH}_4\\text{OH} + \\text{NH}_4\\text{Cl})\\)" },
        { prompt: "Is a mixture of HCl and NaCl a buffer?", answer: "No. HCl is a strong acid; a buffer needs a weak acid (or weak base) with its salt" },
      ],
      pyqExampleId: "795d2770-f0c4-462e-9d9d-d7bc8e50d5dd",
      traps: [
        {
          title: "A strong acid with its salt",
          body: "HCl + NaCl or HCl + \\(\\text{NH}_4\\text{Cl}\\) is not a buffer. One partner must be WEAK, and the other must be its own salt.",
        },
        {
          title: "Leaving 'small amount' out of the definition",
          body: "A buffer resists the change caused by a SMALL amount of strong acid or base. Without these words the definition is wrong: a large amount uses up the buffer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccie-buffer-action",
      name: "Buffer action",
      intuition:
        "In an acetate buffer the salt gives a large stock of acetate ions, and the weak acid stays mostly as whole molecules. Added \\(\\text{H}^+\\) is taken up by the acetate ions; added \\(\\text{OH}^-\\) is taken up by the acid molecules. Either way the newcomer is turned into something harmless, and the pH barely changes.",
      definition:
        "- The salt is a strong electrolyte and dissociates completely, giving a **large concentration of the conjugate base**: \\(\\text{CH}_3\\text{COONa} \\rightarrow \\text{CH}_3\\text{COO}^- + \\text{Na}^+\\).\n" +
        "- The acid is weak, so the concentration of **undissociated \\(\\text{CH}_3\\text{COOH}\\)** is high.\n" +
        "- **Added acid** is consumed by the conjugate base: \\(\\text{CH}_3\\text{COO}^- + \\text{H}^+ \\rightarrow \\text{CH}_3\\text{COOH}\\).\n" +
        "- **Added base** is neutralised by the acid: \\(\\text{CH}_3\\text{COOH} + \\text{OH}^- \\rightarrow \\text{CH}_3\\text{COO}^- + \\text{H}_2\\text{O}\\).\n" +
        "- **Dilution** has no effect on the pH, because the ratio [salt]/[acid] in the Henderson-Hasselbalch equation does not change.",
      authoredExample: {
        prompt: "Explain the buffer action of an ammonium hydroxide and ammonium chloride buffer.",
        steps: [
          "\\(\\text{NH}_4\\text{Cl}\\) is a strong electrolyte: \\(\\text{NH}_4\\text{Cl} \\rightarrow \\text{NH}_4^+ + \\text{Cl}^-\\), giving a large concentration of \\(\\text{NH}_4^+\\).",
          "\\(\\text{NH}_4\\text{OH}\\) is a weak base, so most of it stays undissociated.",
          "Added acid is neutralised by the weak base: \\(\\text{NH}_4\\text{OH} + \\text{H}^+ \\rightarrow \\text{NH}_4^+ + \\text{H}_2\\text{O}\\).",
          "Added base is taken up by the ammonium ions: \\(\\text{NH}_4^+ + \\text{OH}^- \\rightarrow \\text{NH}_4\\text{OH}\\).",
          "So neither \\([\\text{H}^+]\\) nor \\([\\text{OH}^-]\\) changes much, and the pH stays almost constant.",
        ],
        answer: "Added H⁺ is removed by NH₄OH and added OH⁻ by NH₄⁺, so the pH hardly changes",
      },
      selfCheckExample: {
        prompt: "In a buffer of formic acid and sodium formate, which species consumes a small amount of added \\(\\text{H}^+\\)? Write the equation.",
        steps: ["The formate ion from the fully dissociated salt takes up the proton."],
        answer: "\\(\\text{HCOO}^- + \\text{H}^+ \\rightarrow \\text{HCOOH}\\)",
      },
      practiceSet: [
        { prompt: "Why does diluting a buffer not change its pH?", answer: "Both concentrations fall equally, so the ratio [salt]/[acid] stays the same" },
        { prompt: "In a buffer of HF and NaF, which ion takes up added \\(\\text{H}^+\\)?", answer: "\\(\\text{F}^-\\)" },
        { prompt: "Why is the concentration of undissociated acid high in an acetate buffer?", answer: "Acetic acid is weak, and the common acetate ion from the salt suppresses its ionisation further" },
      ],
      pyqExampleId: "41d8199e-89ff-459c-a48c-6f09f44cfd84",
      traps: [
        {
          title: "Writing only one of the two reactions",
          body: "'Explain buffer action' needs BOTH: what happens when acid is added and what happens when base is added, each with its equation. One reaction is half the answer.",
        },
        {
          title: "Making the spectator ion do the work",
          body: "\\(\\text{Na}^+\\) and \\(\\text{Cl}^-\\) take no part. In an acetate buffer the work is done by \\(\\text{CH}_3\\text{COO}^-\\) and \\(\\text{CH}_3\\text{COOH}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccie-henderson",
      name: "pH of a buffer: Henderson-Hasselbalch equation",
      intuition:
        "The pH of a buffer sits close to the pKa of its acid and is nudged up or down by the ratio of salt to acid. More salt than acid pushes the pH above pKa; more acid than salt pulls it below. For a basic buffer the same equation gives the pOH, and the pH follows from 14.",
      definition:
        "- **Acidic buffer:** \\(\\text{pH} = \\text{p}K_a + \\log_{10}\\dfrac{[\\text{salt}]}{[\\text{acid}]}\\), with \\(\\text{p}K_a = -\\log_{10} K_a\\).\n" +
        "- **Basic buffer:** \\(\\text{pOH} = \\text{p}K_b + \\log_{10}\\dfrac{[\\text{salt}]}{[\\text{base}]}\\), with \\(\\text{p}K_b = -\\log_{10} K_b\\); then \\(\\text{pH} = 14 - \\text{pOH}\\).\n" +
        "- When [salt] = [acid], the log term is zero and \\(\\text{pH} = \\text{p}K_a\\).\n" +
        "- Amounts given as 'mol per litre' are molar concentrations and go straight into the ratio.",
      formula: {
        label: "Henderson-Hasselbalch equation",
        latex: "\\text{pH} = \\text{p}K_a + \\log_{10}\\frac{[\\text{salt}]}{[\\text{acid}]}, \\qquad \\text{pOH} = \\text{p}K_b + \\log_{10}\\frac{[\\text{salt}]}{[\\text{base}]}",
      },
      authoredExample: {
        prompt:
          "Calculate the pH of a buffer made of 0.2 M \\(\\text{NH}_4\\text{OH}\\) and 0.1 M \\(\\text{NH}_4\\text{Cl}\\). \\(K_b = 1.8 \\times 10^{-5}\\).",
        steps: [
          "Given: [base] = 0.2 M, [salt] = 0.1 M, \\(K_b = 1.8 \\times 10^{-5}\\). It is a basic buffer, so find pOH first.",
          "\\(\\text{p}K_b = -\\log_{10}(1.8 \\times 10^{-5}) = 5 - 0.2553 = 4.7447\\).",
          "Formula: \\(\\text{pOH} = \\text{p}K_b + \\log_{10}\\dfrac{[\\text{salt}]}{[\\text{base}]}\\).",
          "Substitution: \\(\\text{pOH} = 4.7447 + \\log_{10}\\dfrac{0.1}{0.2} = 4.7447 - 0.3010 = 4.4437\\).",
          "\\(\\text{pH} = 14 - 4.4437 = 9.5563\\).",
        ],
        answer: "pH = 9.56",
      },
      selfCheckExample: {
        prompt:
          "An acetic acid and sodium acetate buffer is to have pH 5.7447. \\(\\text{p}K_a\\) of acetic acid is 4.7447. What ratio [salt]/[acid] is needed?",
        steps: [
          "\\(5.7447 = 4.7447 + \\log_{10}\\dfrac{[\\text{salt}]}{[\\text{acid}]}\\).",
          "\\(\\log_{10}\\dfrac{[\\text{salt}]}{[\\text{acid}]} = 1\\), so the ratio is 10.",
        ],
        answer: "[salt]/[acid] = 10",
      },
      practiceSet: [
        { prompt: "A buffer has equal concentrations of a weak acid and its salt. The pKa of the acid is 4.2. What is the pH?", answer: "4.2" },
        { prompt: "\\(K_a\\) of a weak acid is \\(1 \\times 10^{-4}\\). What is its \\(\\text{p}K_a\\)?", answer: "\\(\\text{p}K_a = -\\log_{10}(10^{-4}) = 4\\)" },
        { prompt: "The pOH of a basic buffer is 4.8. What is its pH?", answer: "9.2" },
      ],
      pyqExampleId: "e35faaf3-889f-4b50-a86c-a392e36a69a5",
      traps: [
        {
          title: "Turning the ratio upside down",
          body: "It is [salt] over [acid] (or [salt] over [base]). With the ratio inverted, a buffer with more salt comes out MORE acidic than its pKa, which is the wrong way round.",
        },
        {
          title: "Stopping at pOH for a basic buffer",
          body: "The equation for a basic buffer gives pOH. If the question asks for pH, subtract from 14; the answer for an ammonia buffer must be above 7.",
        },
        {
          title: "Leaving out the log term",
          body: "pKa alone is the pH only when salt and acid are equal. Otherwise add \\(\\log_{10}\\) of the ratio, with its sign.",
        },
      ],
    },
  ],
};
