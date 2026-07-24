import type { SubtopicNote } from "@/app/notes/_types";

export const BUFFERS_NOTE: SubtopicNote = {
  subtopicName: "Buffer Solutions and Henderson-Hasselbalch",
  title: "Buffer Solutions and the Henderson-Hasselbalch Equation",
  oneLineDefinition:
    "A buffer resists changes in pH; the Henderson-Hasselbalch equation lets you compute its pH from the salt-to-acid ratio and the pKa (or pOH from pKb for a basic buffer).",
  whyItMatters:
    "This is one of the most reliably scored blocks in MHT-CET Ionic Equilibria — most PYQs are direct one-step plug-ins into pH = pKa + log([salt]/[acid]), and the numbers are picked so the log term is a clean log 2, log 5 or log 10. " +
    "Two things earn the marks every year: identifying which mixture is a buffer (weak acid + its salt, or weak base + its salt) and keeping the ratio the right way up (salt over acid). When the salt and acid concentrations are equal, the log term vanishes and pH = pKa.",
  concepts: [
    // Concept 1 — what a buffer is (reference)
    {
      kind: "reference" as const,
      slug: "cetie-buf-what-is-buffer",
      name: "What a buffer is and how to recognise one",
      intuition:
        "A buffer is a solution that barely changes its pH when a little acid or base is added to it. It works because it holds a reservoir of a weak acid AND its conjugate base at the same time — the acid mops up added base, the conjugate base mops up added acid. So a buffer is always a weak acid with its salt, or a weak base with its salt.",
      definition:
        "Two kinds of buffer:\n" +
        "- **Acidic buffer** (pH \\(< 7\\)): a **weak acid** together with **its salt with a strong base**. Example: \\(\\text{CH}_3\\text{COOH} + \\text{CH}_3\\text{COONa}\\) (acetic acid + sodium acetate).\n" +
        "- **Basic buffer** (pH \\(> 7\\)): a **weak base** together with **its salt with a strong acid**. Example: \\(\\text{NH}_4\\text{OH} + \\text{NH}_4\\text{Cl}\\) (ammonium hydroxide + ammonium chloride).\n" +
        "- **How it resists change (Le Chatelier):** the weak acid \\(\\text{HA} \\rightleftharpoons \\text{H}^+ + \\text{A}^-\\) sits in equilibrium. Added \\(\\text{H}^+\\) is consumed by the large store of \\(\\text{A}^-\\); added \\(\\text{OH}^-\\) is neutralised by the large store of \\(\\text{HA}\\). The ratio \\([\\text{salt}]/[\\text{acid}]\\) hardly moves, so the pH hardly moves.\n" +
        "- **Blood** is buffered by the bicarbonate system \\(\\text{H}_2\\text{CO}_3 / \\text{HCO}_3^-\\) (carbonic acid and its salt), holding pH near \\(7.4\\).",
      table: {
        columns: ["Buffer type", "Components", "Example"],
        rows: [
          {
            cells: [
              "Acidic buffer (pH < 7)",
              "Weak acid + salt of that acid with a strong base",
              "\\(\\text{CH}_3\\text{COOH} + \\text{CH}_3\\text{COONa}\\)",
            ],
            noteAmber:
              "The salt supplies the conjugate base (acetate). A strong acid + salt is NOT a buffer.",
          },
          {
            cells: [
              "Basic buffer (pH > 7)",
              "Weak base + salt of that base with a strong acid",
              "\\(\\text{NH}_4\\text{OH} + \\text{NH}_4\\text{Cl}\\)",
            ],
            noteAmber:
              "The salt supplies the conjugate acid (ammonium). Note the components: weak base + its salt with a strong acid.",
          },
          {
            cells: [
              "Blood buffer",
              "Carbonic acid + its salt (bicarbonate)",
              "\\(\\text{H}_2\\text{CO}_3 / \\text{HCO}_3^-\\)",
            ],
            noteAmber:
              "The bicarbonate buffer holds human blood pH near 7.4 — a frequently asked recall item.",
          },
        ],
        caption:
          "A buffer always pairs a weak partner with its conjugate (from the salt).",
      },
      pyqExampleId: "de60f511-115c-4299-a9d9-66aed4d34bb0", // which mixture acts as a buffer -> acetic acid + sodium acetate
      selfCheckExample: {
        prompt:
          "Which of these is an acidic buffer: (i) HCl + NaCl, (ii) CH3COOH + CH3COONa, (iii) NH4OH + NH4Cl?",
        steps: [
          "An acidic buffer needs a **weak acid** plus **its salt with a strong base**.",
          "HCl is a strong acid, so (i) is not a buffer at all.",
          "\\(\\text{NH}_4\\text{OH} + \\text{NH}_4\\text{Cl}\\) is a weak BASE + its salt — that is a basic buffer, not acidic.",
          "\\(\\text{CH}_3\\text{COOH} + \\text{CH}_3\\text{COONa}\\) is a weak acid + its salt — the acidic buffer.",
        ],
        answer: "(ii) CH3COOH + CH3COONa is the acidic buffer.",
      },
      practiceSet: [
        {
          prompt:
            "Acidic buffer = weak acid + its salt with which kind of base?",
          answer: "A strong base",
          method: "e.g. CH3COOH + CH3COONa",
        },
        {
          prompt: "Basic buffer = weak base + its salt with which kind of acid?",
          answer: "A strong acid",
          method: "e.g. NH4OH + NH4Cl",
        },
        {
          prompt: "Which buffer maintains the pH of human blood?",
          answer: "The bicarbonate buffer (carbonic acid + its salt)",
        },
        {
          prompt: "Is HCl + NaCl a buffer?",
          answer: "No",
          method: "HCl is a strong acid, not a weak acid",
        },
        {
          prompt: "Name an everyday acidic buffer.",
          answer: "Acetic acid + sodium acetate",
        },
      ],
      traps: [
        {
          title: "A strong acid + its salt is NOT a buffer",
          body:
            "A buffer needs a **weak** acid (or weak base). \\(\\text{HCl} + \\text{NaCl}\\) has no weak partner to soak up added base, so it cannot resist pH change. Only weak-acid/salt or weak-base/salt pairs buffer.",
        },
        {
          title: "Match the salt to the right partner",
          body:
            "An acidic buffer's salt comes from the **weak acid + strong base** (giving the conjugate base). A basic buffer's salt comes from the **weak base + strong acid** (giving the conjugate acid). Mixing acetic acid with ammonium chloride is NOT a buffer — the salt is not the conjugate of the acid.",
        },
      ],
    },

    // Concept 2 — Henderson-Hasselbalch for an acidic buffer (formula)
    {
      kind: "formula" as const,
      slug: "cetie-buf-henderson-acid",
      name: "Henderson-Hasselbalch equation — pH of an acidic buffer",
      intuition:
        "For an acidic buffer, the pH sits at the pKa of the weak acid, nudged up or down by the log of the salt-to-acid ratio. More salt (conjugate base) than acid pushes the pH above pKa; more acid than salt pulls it below. The ratio always goes salt over acid — get that the wrong way up and the answer lands on the mirror-image option.",
      definition:
        "Henderson-Hasselbalch (acidic buffer):\n" +
        "- \\(\\text{pH} = pK_a + \\log\\dfrac{[\\text{salt}]}{[\\text{acid}]}\\), where \\(pK_a = -\\log K_a\\).\n" +
        "- **[salt] over [acid]** — salt (conjugate base) on top, weak acid on the bottom.\n" +
        "- When the salt is more concentrated than the acid, \\(\\log > 0\\) and the pH rises above \\(pK_a\\).\n" +
        "- Because both concentrations share the same volume, you may use **moles or molarity directly** — the ratio is what matters, so no volume conversion is needed.\n" +
        "- Rearranged for hydrogen-ion concentration: \\([\\text{H}^+] = K_a\\,\\dfrac{[\\text{acid}]}{[\\text{salt}]}\\) (note the ratio flips to acid over salt).",
      formula: {
        label: "Henderson-Hasselbalch (acidic buffer)",
        latex: "\\text{pH} = pK_a + \\log\\dfrac{[\\text{salt}]}{[\\text{acid}]}",
        symbols: [
          { symbol: "pK_a", meaning: "acid dissociation exponent, \\(= -\\log K_a\\)" },
          { symbol: "\\([\\text{salt}]\\)", meaning: "concentration of the conjugate base (the salt)" },
          { symbol: "\\([\\text{acid}]\\)", meaning: "concentration of the weak acid" },
        ],
      },
      pyqExampleId: "6b04dd58-547b-48c2-8d9f-58f39f4eb58c", // 0.01 M acid, 0.02 M salt, pKa 4.680 -> 4.981
      authoredExample: {
        prompt:
          "A buffer is made from 0.05 M weak acid and 0.5 M of its salt with a strong base. The pKa of the acid is 4.60. Find the pH.",
        steps: [
          "Acidic buffer, so use \\(\\text{pH} = pK_a + \\log\\dfrac{[\\text{salt}]}{[\\text{acid}]}\\).",
          "Ratio \\(\\dfrac{[\\text{salt}]}{[\\text{acid}]} = \\dfrac{0.5}{0.05} = 10\\).",
          "\\(\\log 10 = 1\\), so \\(\\text{pH} = 4.60 + 1 = 5.60\\).",
        ],
        answer: "\\(\\text{pH} = 5.60\\).",
      },
      selfCheckExample: {
        prompt:
          "A buffer contains 0.02 M weak acid and 0.08 M of its salt with a strong base, with pKa = 4.30. What is the pH? (log 4 = 0.602)",
        steps: [
          "\\(\\text{pH} = pK_a + \\log\\dfrac{[\\text{salt}]}{[\\text{acid}]}\\).",
          "\\(\\dfrac{[\\text{salt}]}{[\\text{acid}]} = \\dfrac{0.08}{0.02} = 4\\).",
          "\\(\\text{pH} = 4.30 + \\log 4 = 4.30 + 0.602 = 4.902\\).",
        ],
        answer: "\\(\\text{pH} \\approx 4.90\\).",
      },
      practiceSet: [
        {
          prompt: "Buffer: 0.1 M acid, 0.2 M salt, pKa = 4.7. pH? (log 2 = 0.301)",
          answer: "5.00",
          method: "4.7 + log(0.2/0.1) = 4.7 + 0.301",
        },
        {
          prompt: "Buffer: 0.1 M salt, 0.01 M acid, pKa = 4.5. pH?",
          answer: "5.5",
          method: "4.5 + log(0.1/0.01) = 4.5 + 1",
        },
        {
          prompt:
            "Which concentration goes on top of the log ratio, salt or acid?",
          answer: "Salt (conjugate base)",
        },
        {
          prompt: "Buffer: Ka = 6.6e-10, acid 0.01 M, salt 0.02 M. Find [H+].",
          answer: "\\(3.3 \\times 10^{-10}\\) M",
          method: "[H+] = Ka x [acid]/[salt] = 6.6e-10 x (0.01/0.02)",
        },
      ],
      traps: [
        {
          title: "Ratio is salt over acid — don't invert it",
          body:
            "The most common wrong answer inverts the ratio to \\(\\log([\\text{acid}]/[\\text{salt}])\\), which flips the sign of the log term and lands on the decoy option. Keep it \\(\\log\\dfrac{[\\text{salt}]}{[\\text{acid}]}\\): more salt raises the pH. (Only in the \\([\\text{H}^+] = K_a\\,[\\text{acid}]/[\\text{salt}]\\) form does acid go on top.)",
        },
        {
          title: "Use concentrations directly — no volume conversion",
          body:
            "When equal volumes are mixed, both the salt and acid are diluted by the same factor, so the ratio is unchanged. Plug the given molarities straight in; converting to moles first is extra work that changes nothing.",
        },
      ],
    },

    // Concept 3 — equal concentrations -> pH = pKa (formula)
    {
      kind: "formula" as const,
      slug: "cetie-buf-equal-ratio",
      name: "Equal salt and acid — pH equals pKa",
      intuition:
        "When a buffer holds the salt and the weak acid at the SAME concentration, the ratio is 1, and log 1 = 0. The whole log term disappears and the pH is exactly the pKa of the weak acid. This is the maximum-buffering point, and it turns a calculation into a one-liner: just convert Ka to pKa.",
      definition:
        "Equal-concentration buffer:\n" +
        "- If \\([\\text{salt}] = [\\text{acid}]\\), then \\(\\dfrac{[\\text{salt}]}{[\\text{acid}]} = 1\\) and \\(\\log 1 = 0\\).\n" +
        "- So \\(\\text{pH} = pK_a = -\\log K_a\\).\n" +
        "- This is the point of **maximum buffer capacity** — the buffer resists pH change best when salt and acid are equal.\n" +
        "- Watch for the phrase **\"equal concentrations\"** or **\"equal moles\"** in the stem — it signals you skip the log term entirely.",
      formula: {
        label: "Buffer with equal salt and acid",
        latex: "[\\text{salt}] = [\\text{acid}] \\;\\Rightarrow\\; \\text{pH} = pK_a = -\\log K_a",
        symbols: [
          { symbol: "K_a", meaning: "acid dissociation constant of the weak acid" },
          { symbol: "pK_a", meaning: "\\(= -\\log K_a\\)" },
        ],
      },
      pyqExampleId: "1e22cd8b-ccd1-425b-84a0-bc336ddc5571", // equal conc, Ka=1.8e-5 -> pH = pKa = 4.7447
      authoredExample: {
        prompt:
          "A buffer contains equal concentrations of a weak acid and its salt. The acid's Ka is 1.0 x 10^-5. Find the pH.",
        steps: [
          "Equal concentrations, so \\(\\dfrac{[\\text{salt}]}{[\\text{acid}]} = 1\\) and \\(\\log 1 = 0\\).",
          "Then \\(\\text{pH} = pK_a = -\\log(1.0 \\times 10^{-5})\\).",
          "\\(-\\log(10^{-5}) = 5\\).",
        ],
        answer: "\\(\\text{pH} = 5\\).",
      },
      selfCheckExample: {
        prompt:
          "A weak acid with Ka = 4.0 x 10^-6 is mixed with an equal concentration of its sodium salt. What is the pH? (log 4 = 0.602)",
        steps: [
          "Equal concentrations \\(\\Rightarrow \\text{pH} = pK_a\\).",
          "\\(pK_a = -\\log(4.0 \\times 10^{-6}) = 6 - \\log 4 = 6 - 0.602\\).",
        ],
        answer: "\\(\\text{pH} = 5.398 \\approx 5.40\\).",
      },
      practiceSet: [
        {
          prompt: "Equal salt and acid, Ka = 1.0 x 10^-4. pH?",
          answer: "4",
          method: "pH = pKa = -log(1e-4)",
        },
        {
          prompt: "What is log 1?",
          answer: "0",
        },
        {
          prompt: "At which ratio does a buffer resist pH change best?",
          answer: "[salt] = [acid] (ratio 1)",
        },
        {
          prompt: "Equal salt and acid, Ka = 1.8 x 10^-5. pH? (log 1.8 = 0.255)",
          answer: "\\(\\approx 4.74\\)",
          method: "pKa = 5 - 0.255",
        },
      ],
      traps: [
        {
          title: "Equal concentrations means the log term is zero",
          body:
            "When \\([\\text{salt}] = [\\text{acid}]\\), \\(\\log\\dfrac{[\\text{salt}]}{[\\text{acid}]} = \\log 1 = 0\\), so \\(\\text{pH} = pK_a\\). Don't waste time on the log — just compute \\(-\\log K_a\\). If the stem gives \\(K_a\\) rather than \\(pK_a\\), converting it is the whole job.",
        },
      ],
    },

    // Concept 4 — basic buffer via pOH (formula)
    {
      kind: "formula" as const,
      slug: "cetie-buf-basic-poh",
      name: "Basic buffers — the pOH form and converting to pH",
      intuition:
        "A basic buffer (weak base + its salt) is handled the same way, but with the base version of the equation: pOH = pKb + log([salt]/[base]). You find the pOH first, then get pH by subtracting from 14. The single most common slip is forgetting that last step and quoting the pOH as the pH.",
      definition:
        "Henderson-Hasselbalch (basic buffer):\n" +
        "- \\(\\text{pOH} = pK_b + \\log\\dfrac{[\\text{salt}]}{[\\text{base}]}\\), where \\(pK_b = -\\log K_b\\).\n" +
        "- Here **[salt]** is the concentration of the salt (conjugate acid, e.g. \\(\\text{NH}_4\\text{Cl}\\)) and **[base]** is the weak base (e.g. \\(\\text{NH}_4\\text{OH}\\)).\n" +
        "- Convert to pH with **\\(\\text{pH} = 14 - \\text{pOH}\\)** at 25 °C.\n" +
        "- As with acidic buffers, equal volumes mixed keep the ratio unchanged — use the given concentrations directly.",
      formula: {
        label: "Henderson-Hasselbalch (basic buffer)",
        latex: "\\text{pOH} = pK_b + \\log\\dfrac{[\\text{salt}]}{[\\text{base}]} \\qquad \\text{pH} = 14 - \\text{pOH}",
        symbols: [
          { symbol: "pK_b", meaning: "base dissociation exponent, \\(= -\\log K_b\\)" },
          { symbol: "\\([\\text{salt}]\\)", meaning: "concentration of the salt (conjugate acid)" },
          { symbol: "\\([\\text{base}]\\)", meaning: "concentration of the weak base" },
        ],
      },
      pyqExampleId: "f80479eb-e176-4efb-aa1f-b4520e4d3592", // 0.4 M NH4OH, 0.5 M NH4Cl, pKb 4.730 -> pOH 4.83
      authoredExample: {
        prompt:
          "A basic buffer is made by mixing equal volumes of 0.1 M NH4OH and 1.0 M NH4Cl. The pKb of NH4OH is 4.75. Find the pOH and the pH.",
        steps: [
          "Basic buffer, so \\(\\text{pOH} = pK_b + \\log\\dfrac{[\\text{salt}]}{[\\text{base}]}\\).",
          "\\(\\dfrac{[\\text{salt}]}{[\\text{base}]} = \\dfrac{1.0}{0.1} = 10\\), and \\(\\log 10 = 1\\).",
          "\\(\\text{pOH} = 4.75 + 1 = 5.75\\).",
          "\\(\\text{pH} = 14 - 5.75 = 8.25\\).",
        ],
        answer: "\\(\\text{pOH} = 5.75\\), \\(\\text{pH} = 8.25\\).",
      },
      selfCheckExample: {
        prompt:
          "A buffer of 0.5 M weak base and 0.5 M of its salt has pKb = 4.60. Find the pH. (equal concentrations)",
        steps: [
          "Equal concentrations \\(\\Rightarrow \\log\\dfrac{[\\text{salt}]}{[\\text{base}]} = \\log 1 = 0\\).",
          "\\(\\text{pOH} = pK_b = 4.60\\).",
          "\\(\\text{pH} = 14 - 4.60 = 9.40\\).",
        ],
        answer: "\\(\\text{pH} = 9.40\\) (a basic buffer, so pH > 7).",
      },
      practiceSet: [
        {
          prompt: "Basic buffer: pOH = 5.6. What is the pH?",
          answer: "8.4",
          method: "pH = 14 - pOH",
        },
        {
          prompt: "Which equation gives pOH of a basic buffer?",
          answer: "pOH = pKb + log([salt]/[base])",
        },
        {
          prompt:
            "Basic buffer, equal base and salt, pKb = 4.74. pH?",
          answer: "9.26",
          method: "pOH = pKb = 4.74; pH = 14 - 4.74",
        },
        {
          prompt: "In pOH = pKb + log([salt]/[base]), what is [salt] for NH4OH/NH4Cl?",
          answer: "The NH4Cl concentration",
        },
      ],
      traps: [
        {
          title: "Find pOH first, then subtract from 14",
          body:
            "\\(pK_b + \\log([\\text{salt}]/[\\text{base}])\\) gives the **pOH**, not the pH. A basic buffer has pH \\(> 7\\), so quoting the pOH (a number below 7) as the pH is the classic decoy. Always finish with \\(\\text{pH} = 14 - \\text{pOH}\\).",
        },
        {
          title: "Use pKb for a base, pKa for an acid",
          body:
            "Don't plug a weak base's data into the acidic form. A basic buffer (weak base + its salt) uses \\(pK_b\\) and the pOH equation; an acidic buffer uses \\(pK_a\\) and the pH equation directly.",
        },
      ],
    },
  ],
  related: [
    {
      label: "The pH scale and common substances",
      href: "/notes/nda-chemistry/acids-bases-salts",
    },
  ],
};
